#!/usr/bin/env python3
"""
test_store_ob1.py — tests for store_ob1.py handler.

Covers:
- call_ob1: SSE parsing, error handling, JSON parse errors
- ingest_to_ob1: happy path, error propagation
- store(): happy path, disabled, URL override
"""

import sys
import unittest
from pathlib import Path
from unittest.mock import patch, MagicMock

sys.path.insert(0, str(Path(__file__).parent.parent / "stages" / "05-codify" / "handlers"))
from store_ob1 import call_ob1, ingest_to_ob1, store, CodifyOutput

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
# call_ob1
# ---------------------------------------------------------------------------

class TestCallOB1(unittest.TestCase):

    @patch("store_ob1.subprocess.run")
    def test_success_parses_sse_data(self, mock_run):
        mock_run.return_value = MagicMock(
            returncode=0,
            stdout='event: message\ndata: {"result": {"id": "thought-123", "content": "test"}}',
            stderr="",
        )
        result = call_ob1("capture_thought", {"content": "hello"})
        self.assertEqual(result.get("id"), "thought-123")

    @patch("store_ob1.subprocess.run")
    def test_error_from_ob1(self, mock_run):
        mock_run.return_value = MagicMock(
            returncode=0,
            stdout='event: message\ndata: {"error": "invalid request"}',
            stderr="",
        )
        result = call_ob1("capture_thought", {})
        self.assertEqual(result.get("error"), "invalid request")

    @patch("store_ob1.subprocess.run")
    def test_curl_failure(self, mock_run):
        mock_run.return_value = MagicMock(returncode=7, stdout="", stderr="connection refused")
        result = call_ob1("capture_thought", {})
        self.assertIn("error", result)
        self.assertIn("connection refused", result["error"])

    @patch("store_ob1.subprocess.run")
    def test_malformed_sse(self, mock_run):
        mock_run.return_value = MagicMock(returncode=0, stdout="not sse format at all", stderr="")
        result = call_ob1("capture_thought", {})
        self.assertIn("error", result)
        self.assertIn("Could not parse", result["error"])

    @patch("store_ob1.subprocess.run")
    def test_json_parse_error(self, mock_run):
        mock_run.return_value = MagicMock(
            returncode=0,
            stdout='event: message\ndata: {invalid json}',
            stderr="",
        )
        result = call_ob1("capture_thought", {})
        self.assertIn("error", result)
        self.assertIn("JSON parse error", result["error"])

    @patch("store_ob1.subprocess.run")
    def test_timeout(self, mock_run):
        import subprocess
        mock_run.side_effect = subprocess.TimeoutExpired("curl", 25)
        result = call_ob1("capture_thought", {})
        self.assertIn("error", result)


# ---------------------------------------------------------------------------
# ingest_to_ob1
# ---------------------------------------------------------------------------

class TestIngestToOB1(unittest.TestCase):

    @patch("store_ob1.call_ob1")
    def test_success(self, mock_call):
        mock_call.return_value = {"id": "ob1-thought-abc", "content": "test memory"}
        ok, rid, err = ingest_to_ob1(
            content="my test thought",
            metadata={"source": "test", "tags": ["unit"]},
        )
        self.assertTrue(ok)
        self.assertEqual(rid, "ob1-thought-abc")
        self.assertEqual(err, "")

    @patch("store_ob1.call_ob1")
    def test_error_propagates(self, mock_call):
        mock_call.return_value = {"error": "server error 500"}
        ok, rid, err = ingest_to_ob1(
            content="failing thought",
            metadata={"source": "fail"},
        )
        self.assertFalse(ok)
        self.assertEqual(err, "server error 500")

    @patch("store_ob1.call_ob1")
    def test_nested_result_id(self, mock_call):
        mock_call.return_value = {"result": {"data": {"id": "nested-id-xyz"}}}
        ok, rid, err = ingest_to_ob1(content="nested test", metadata={})
        self.assertTrue(ok)
        self.assertEqual(rid, "nested-id-xyz")


# ---------------------------------------------------------------------------
# store()
# ---------------------------------------------------------------------------

class TestStore(unittest.TestCase):

    @patch("store_ob1.ingest_to_ob1")
    def test_happy_path(self, mock_ingest):
        mock_ingest.return_value = (True, "ob1-abc123", "")
        sample = FakeCodifyOutput(
            content="ob1 happy path test",
            tags=["unit", "test"],
            metadata={"via": "pytest"},
            source="ob1-store-test",
        )
        result = store(sample)
        self.assertTrue(result.success)
        self.assertEqual(result.store, "openbrain_ob1")
        self.assertEqual(result.record_id, "ob1-abc123")
        self.assertIsNone(result.error)
        self.assertEqual(result.metadata["content_length"], len(sample.content))
        self.assertEqual(result.metadata["tag_count"], 2)

    @patch("store_ob1.ingest_to_ob1")
    def test_custom_url(self, mock_ingest):
        mock_ingest.return_value = (True, "ob1-custom", "")
        sample = FakeCodifyOutput(content="custom url test", tags=[], source="url-test")
        result = store(sample, config={"ob1_url": "https://custom.example.com/mcp"})
        self.assertTrue(result.success)
        self.assertEqual(result.metadata["ob1_url"], "https://custom.example.com/mcp")
        _, kwargs = mock_ingest.call_args
        self.assertEqual(kwargs.get("ob1_url"), "https://custom.example.com/mcp")

    @patch("store_ob1.ingest_to_ob1")
    def test_disabled(self, mock_ingest):
        sample = FakeCodifyOutput(content="skip", source="skip-test")
        result = store(sample, config={"enabled": False})
        self.assertTrue(result.success)
        self.assertIsNone(result.record_id)
        self.assertEqual(result.metadata["status"], "disabled")
        mock_ingest.assert_not_called()

    @patch("store_ob1.ingest_to_ob1")
    def test_failure(self, mock_ingest):
        mock_ingest.return_value = (False, "", "OB1 endpoint unreachable")
        sample = FakeCodifyOutput(content="fail", source="fail-test")
        result = store(sample)
        self.assertFalse(result.success)
        self.assertIsNone(result.record_id)
        self.assertIn("OB1 endpoint unreachable", result.error)


# ---------------------------------------------------------------------------

if __name__ == "__main__":
    unittest.main(verbosity=2)
