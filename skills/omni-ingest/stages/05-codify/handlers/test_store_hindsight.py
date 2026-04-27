#!/usr/bin/env python3
"""
test_store_hindsight.py — tests for store_hindsight.py handler.

Covers:
- _extract_doc_id: various output formats
- retain_to_hindsight: short vs long content path, error handling
- verify_retain: basic logic
- store(): happy path, disabled, config bank override
"""

import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch, MagicMock

sys.path.insert(0, str(Path(__file__).parent.parent / "stages" / "05-codify" / "handlers"))
from store_hindsight import (
    _extract_doc_id,
    retain_to_hindsight,
    verify_retain,
    store,
    CodifyOutput,
)

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
# _extract_doc_id
# ---------------------------------------------------------------------------

class TestExtractDocId(unittest.TestCase):
    def test_document_prefix(self):
        out = "Memory retained successfully (document: cli_put_20260427_110629)"
        self.assertEqual(_extract_doc_id(out), "cli_put_20260427_110629")

    def test_id_prefix(self):
        out = "some noise before id: abcd1234_def more noise"
        self.assertEqual(_extract_doc_id(out), "abcd1234_def")

    def test_no_match_returns_unknown(self):
        out = "just some random stdout with no id"
        self.assertEqual(_extract_doc_id(out), "unknown")

    def test_case_insensitive(self):
        out = "DOCUMENT: test_id_123"
        self.assertEqual(_extract_doc_id(out), "test_id_123")


# ---------------------------------------------------------------------------
# retain_to_hindsight — mocked
# ---------------------------------------------------------------------------

class TestRetainToHindsight(unittest.TestCase):

    @patch("store_hindsight._run")
    def test_short_content_uses_direct_cli(self, mock_run):
        mock_run.return_value = MagicMock(
            returncode=0,
            stdout="Memory retained successfully (document: short_123)",
            stderr="",
        )
        ok, doc_id, err = retain_to_hindsight("short content under 500 chars", bank="hermes")
        self.assertTrue(ok)
        self.assertEqual(doc_id, "short_123")
        mock_run.assert_called_once()
        # Verify it called 'retain' (not the background pipeline)
        args = mock_run.call_args[0]
        self.assertIn("retain", args)

    @patch("store_hindsight.subprocess.Popen")
    def test_long_content_uses_background_pipeline(self, mock_popen):
        mock_popen.return_value = MagicMock(pid=12345)
        long_content = "x" * 600
        ok, record_id, err = retain_to_hindsight(long_content, bank="hermes")
        self.assertTrue(ok)
        self.assertIn("bg_pid", record_id)
        mock_popen.assert_called_once()

    @patch("store_hindsight._run")
    def test_cli_failure_returns_error(self, mock_run):
        mock_run.return_value = MagicMock(
            returncode=1,
            stdout="",
            stderr="connection refused",
        )
        ok, doc_id, err = retain_to_hindsight("short content", bank="hermes")
        self.assertFalse(ok)
        self.assertEqual(err, "connection refused")


# ---------------------------------------------------------------------------
# verify_retain — mocked
# ---------------------------------------------------------------------------

class TestVerifyRetain(unittest.TestCase):

    @patch("store_hindsight._run")
    def test_keyword_found(self, mock_run):
        mock_run.return_value = MagicMock(
            returncode=0,
            stdout="found: keyword in context",
        )
        self.assertTrue(verify_retain("hermes", "keyword"))

    @patch("store_hindsight._run")
    def test_keyword_not_found(self, mock_run):
        mock_run.return_value = MagicMock(
            returncode=0,
            stdout="no matches",
        )
        self.assertFalse(verify_retain("hermes", "missing"))

    @patch("store_hindsight._run")
    def test_recall_error(self, mock_run):
        mock_run.return_value = MagicMock(returncode=1, stderr="timeout")
        self.assertFalse(verify_retain("hermes", "keyword"))


# ---------------------------------------------------------------------------
# store()
# ---------------------------------------------------------------------------

class TestStore(unittest.TestCase):

    @patch("store_hindsight.retain_to_hindsight")
    def test_happy_path(self, mock_retain):
        mock_retain.return_value = (True, "doc_abc123", "")
        sample = FakeCodifyOutput(
            content="some test memory",
            tags=["unit", "test"],
            metadata={"via": "pytest"},
            source="store-test",
        )
        result = store(sample)
        self.assertTrue(result.success)
        self.assertEqual(result.store, "hindsight")
        self.assertEqual(result.record_id, "doc_abc123")
        self.assertIsNone(result.error)
        # source should be prepended to tags
        args = mock_retain.call_args
        self.assertIn("store-test", args[1].get("context_tags", []))

    @patch("store_hindsight.retain_to_hindsight")
    def test_bank_override_from_config(self, mock_retain):
        mock_retain.return_value = (True, "doc_xyz", "")
        sample = FakeCodifyOutput(content="custom bank test", source="bank-test")
        result = store(sample, config={"bank": "vieday"})
        self.assertTrue(result.success)
        # Check the bank argument
        call_args = mock_retain.call_args
        self.assertEqual(call_args[1]["bank"], "vieday")

    @patch("store_hindsight.retain_to_hindsight")
    def test_disabled_returns_skipped(self, mock_retain):
        sample = FakeCodifyOutput(content="should not retain", source="skip-test")
        result = store(sample, config={"enabled": False})
        self.assertTrue(result.success)
        self.assertIsNone(result.record_id)
        self.assertEqual(result.metadata["status"], "disabled")
        mock_retain.assert_not_called()

    @patch("store_hindsight.retain_to_hindsight")
    def test_failure_returns_error(self, mock_retain):
        mock_retain.return_value = (False, "", "server timeout")
        sample = FakeCodifyOutput(content="failing content", source="fail-test")
        result = store(sample)
        self.assertFalse(result.success)
        self.assertIsNone(result.record_id)
        self.assertEqual(result.error, "server timeout")

    @patch("store_hindsight.retain_to_hindsight")
    def test_context_tags_from_config(self, mock_retain):
        mock_retain.return_value = (True, "doc_tags", "")
        sample = FakeCodifyOutput(content="tags test", tags=["z-tag"], source="tag-test")
        result = store(sample, config={"context_tags": ["config-tag"]})
        self.assertTrue(result.success)
        # Should have: source tag + config tag + original tags
        call_kwargs = mock_retain.call_args[1]
        tags = call_kwargs.get("context_tags", [])
        self.assertIn("tag-test", tags)
        self.assertIn("config-tag", tags)
        self.assertIn("z-tag", tags)


# ---------------------------------------------------------------------------

if __name__ == "__main__":
    unittest.main(verbosity=2)
