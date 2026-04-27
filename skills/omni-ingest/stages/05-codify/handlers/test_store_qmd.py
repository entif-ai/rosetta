#!/usr/bin/env python3
"""
test_store_qmd.py — tests for store_qmd.py handler.

Covers:
- _slugify: edge cases
- ingest_to_qmd: qmd not found, success, failure, timeout
- store(): happy path, disabled, collection override
"""

import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch, MagicMock

sys.path.insert(0, str(Path(__file__).parent.parent / "stages" / "05-codify" / "handlers"))
from store_qmd import _slugify, ingest_to_qmd, store, DEFAULT_COLLECTION

# ---------------------------------------------------------------------------

class FakeCodifyOutput:
    def __init__(
        self,
        content: str = "test content",
        tags: list[str] | None = None,
        metadata: dict | None = None,
        source: str = "test-source",
        content_type: str = "text/plain",
    ):
        self.content = content
        self.tags = tags or ["test"]
        self.metadata = metadata or {}
        self.source = source
        self.content_type = content_type


# ---------------------------------------------------------------------------
# _slugify
# ---------------------------------------------------------------------------

class TestSlugify(unittest.TestCase):
    def test_alphanumeric_preserved(self):
        self.assertEqual(_slugify("Hello World 2024"), "Hello-World-2024")

    def test_strips_non_word(self):
        self.assertEqual(_slugify("foo@bar.com!"), "foobarcom")

    def test_unicode_preserved(self):
        # Slugify strips special chars but preserves unicode word chars
        self.assertEqual(_slugify("café résumé"), "café-résumé")

    def test_max_len(self):
        long_slug = "a" * 80
        result = _slugify(long_slug, max_len=50)
        self.assertEqual(len(result), 50)


# ---------------------------------------------------------------------------
# ingest_to_qmd — mocked subprocess
# ---------------------------------------------------------------------------

class TestIngestToQmd(unittest.TestCase):

    @patch("store_qmd._find_qmd")
    @patch("store_qmd.subprocess.run")
    def test_success(self, mock_run, mock_find):
        mock_find.return_value = "/opt/homebrew/bin/qmd"
        mock_run.return_value = MagicMock(returncode=0, stderr="", stdout="")
        ok, rid, err = ingest_to_qmd(
            content="qmd success test",
            tags=["unit", "test"],
            source="qmd-test",
        )
        self.assertTrue(ok)
        self.assertIn("qmd-success-test", rid[:30])
        self.assertEqual(err, "")

    @patch("store_qmd._find_qmd")
    def test_qmd_not_found(self, mock_find):
        mock_find.return_value = None
        ok, rid, err = ingest_to_qmd(content="nopath", tags=[], source="nopath")
        self.assertFalse(ok)
        self.assertEqual(rid, "")
        self.assertIn("not found", err)

    @patch("store_qmd._find_qmd")
    @patch("store_qmd.subprocess.run")
    def test_nonzero_exit(self, mock_run, mock_find):
        mock_find.return_value = "/usr/bin/qmd"
        mock_run.return_value = MagicMock(
            returncode=1, stderr="index locked", stdout=""
        )
        ok, rid, err = ingest_to_qmd(content="fail test", tags=[], source="fail")
        self.assertFalse(ok)
        self.assertIn("index locked", err)

    @patch("store_qmd._find_qmd")
    @patch("store_qmd.subprocess.run")
    def test_timeout(self, mock_run, mock_find):
        mock_find.return_value = "/usr/bin/qmd"
        import subprocess
        mock_run.side_effect = subprocess.TimeoutExpired("qmd", 60)
        ok, rid, err = ingest_to_qmd(content="timeout test", tags=[], source="timeout")
        self.assertFalse(ok)
        self.assertIn("timed out", err)


# ---------------------------------------------------------------------------
# store()
# ---------------------------------------------------------------------------

class TestStore(unittest.TestCase):

    @patch("store_qmd.ingest_to_qmd")
    def test_happy_path(self, mock_ingest):
        mock_ingest.return_value = (True, "qmd-record-abc", "")
        sample = FakeCodifyOutput(
            content="qmd store happy path",
            tags=["unit"],
            metadata={"via": "pytest"},
            source="qmd-store-test",
        )
        result = store(sample)
        self.assertTrue(result.success)
        self.assertEqual(result.store, "qmd")
        self.assertEqual(result.record_id, "qmd-record-abc")
        self.assertIsNone(result.error)
        self.assertEqual(result.metadata["collection"], DEFAULT_COLLECTION)
        self.assertEqual(result.metadata["content_length"], len(sample.content))

    @patch("store_qmd.ingest_to_qmd")
    def test_custom_collection(self, mock_ingest):
        mock_ingest.return_value = (True, "qmd-record-abc", "")
        sample = FakeCodifyOutput(content="custom col", tags=[], source="col-test")
        result = store(sample, config={"collection": "my-collection"})
        self.assertTrue(result.success)
        self.assertEqual(result.metadata["collection"], "my-collection")
        # Verify ingest_to_qmd received the right collection via kwargs
        _, kwargs = mock_ingest.call_args
        self.assertEqual(kwargs.get("collection"), "my-collection")

    @patch("store_qmd.ingest_to_qmd")
    def test_disabled(self, mock_ingest):
        sample = FakeCodifyOutput(content="skip", source="skip")
        result = store(sample, config={"enabled": False})
        self.assertTrue(result.success)
        self.assertIsNone(result.record_id)
        self.assertEqual(result.metadata["status"], "disabled")
        mock_ingest.assert_not_called()

    @patch("store_qmd.ingest_to_qmd")
    def test_failure(self, mock_ingest):
        mock_ingest.return_value = (False, "", "qmd crashed")
        sample = FakeCodifyOutput(content="crash", source="crash-test")
        result = store(sample)
        self.assertFalse(result.success)
        self.assertIsNone(result.record_id)
        self.assertIn("qmd crashed", result.error)


# ---------------------------------------------------------------------------

if __name__ == "__main__":
    unittest.main(verbosity=2)
