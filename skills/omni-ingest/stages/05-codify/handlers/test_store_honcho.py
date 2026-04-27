#!/usr/bin/env python3
"""
test_store_honcho.py — tests for store_honcho.py handler.

Covers:
- ingest_via_cli: honcho not found, success, failure, timeout, tag passthrough
- ingest_via_http: success, HTTP error, connection error (mocked at function level)
- store(): happy path, disabled, mode switching, workspace override, tag assembly
"""

import sys
import unittest
from pathlib import Path
from unittest.mock import patch, MagicMock

sys.path.insert(0, str(Path(__file__).parent.parent / "stages" / "05-codify" / "handlers"))
from store_honcho import (
    ingest_via_cli,
    ingest_via_http,
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
# ingest_via_cli
# ---------------------------------------------------------------------------

class TestIngestViaCli(unittest.TestCase):

    @patch("store_honcho._find_honcho")
    @patch("store_honcho.subprocess.run")
    def test_success(self, mock_run, mock_find):
        mock_find.return_value = "/usr/local/bin/honcho"
        mock_run.return_value = MagicMock(returncode=0, stderr="", stdout="")
        ok, rid, err = ingest_via_cli("test content", ["tag1"], workspace="hermes")
        self.assertTrue(ok)
        self.assertEqual(rid, "honcho-cli:hermes")
        self.assertEqual(err, "")

    @patch("store_honcho._find_honcho")
    def test_honcho_not_found(self, mock_find):
        mock_find.return_value = None
        ok, rid, err = ingest_via_cli("content", [])
        self.assertFalse(ok)
        self.assertIn("not found", err)

    @patch("store_honcho._find_honcho")
    @patch("store_honcho.subprocess.run")
    def test_nonzero_exit(self, mock_run, mock_find):
        mock_find.return_value = "/usr/local/bin/honcho"
        mock_run.return_value = MagicMock(
            returncode=1, stderr=b"some error", stdout=b""
        )
        ok, rid, err = ingest_via_cli("content", ["tag"])
        self.assertFalse(ok)
        self.assertIn("some error", err)

    @patch("store_honcho._find_honcho")
    @patch("store_honcho.subprocess.run")
    def test_timeout(self, mock_run, mock_find):
        mock_find.return_value = "/usr/local/bin/honcho"
        import subprocess
        mock_run.side_effect = subprocess.TimeoutExpired("honcho", 30)
        ok, rid, err = ingest_via_cli("content", [])
        self.assertFalse(ok)
        self.assertIn("timed out", err)

    @patch("store_honcho._find_honcho")
    @patch("store_honcho.subprocess.run")
    def test_tags_passed_to_cli(self, mock_run, mock_find):
        mock_find.return_value = "/usr/bin/honcho"
        mock_run.return_value = MagicMock(returncode=0, stderr="", stdout="")
        ingest_via_cli("content", ["alpha", "beta"], workspace="test-ws")
        args = mock_run.call_args[0][0]
        self.assertIn("--tag=alpha", args)
        self.assertIn("--tag=beta", args)
        self.assertIn("--workspace", args)
        self.assertIn("test-ws", args)


# ---------------------------------------------------------------------------
# ingest_via_http — mock urllib at the function level
# ---------------------------------------------------------------------------

class TestIngestViaHttp(unittest.TestCase):

    @patch("store_honcho.urllib.request.urlopen")
    def test_success(self, mock_urlopen):
        mock_resp = MagicMock()
        mock_resp.status = 201
        mock_resp.read.return_value = b'{"id": "msg-abc-123"}'
        mock_ctx = MagicMock()
        mock_ctx.__enter__.return_value = mock_resp
        mock_ctx.__exit__.return_value = None
        mock_urlopen.return_value = mock_ctx

        ok, rid, err = ingest_via_http("http content", ["t1"], workspace="hermes")
        self.assertTrue(ok)
        self.assertEqual(rid, "http:msg-abc-123")
        self.assertEqual(err, "")

    @patch("store_honcho.urllib.request.urlopen")
    def test_http_error(self, mock_urlopen):
        import urllib.error
        mock_urlopen.side_effect = urllib.error.HTTPError(
            url="http://localhost:8000/v3",
            code=401,
            msg="Unauthorized",
            hdrs={},
            fp=None,
        )
        ok, rid, err = ingest_via_http("content", [])
        self.assertFalse(ok)
        self.assertIn("401", err)

    @patch("store_honcho.urllib.request.urlopen")
    def test_connection_error(self, mock_urlopen):
        import urllib.error
        mock_urlopen.side_effect = urllib.error.URLError("connection refused")
        ok, rid, err = ingest_via_http("content", [])
        self.assertFalse(ok)
        self.assertIn("connection refused", err)


# ---------------------------------------------------------------------------
# store()
# ---------------------------------------------------------------------------

class TestStore(unittest.TestCase):

    @patch("store_honcho.ingest_via_cli")
    def test_cli_mode_happy_path(self, mock_cli):
        mock_cli.return_value = (True, "honcho-cli:hermes", "")
        sample = FakeCodifyOutput(
            content="honcho cli happy path",
            tags=["unit", "test"],
            metadata={"via": "pytest"},
            source="honcho-test",
        )
        result = store(sample)
        self.assertTrue(result.success)
        self.assertEqual(result.store, "honcho")
        self.assertEqual(result.record_id, "honcho-cli:hermes")
        self.assertIsNone(result.error)
        self.assertEqual(result.metadata["mode"], "cli")
        self.assertEqual(result.metadata["workspace"], "hermes")

    @patch("store_honcho.ingest_via_http")
    def test_http_mode(self, mock_http):
        mock_http.return_value = (True, "http:msg-xyz", "")
        sample = FakeCodifyOutput(content="http mode test", tags=["test"], source="http-test")
        result = store(sample, config={"mode": "http", "workspace": "crates"})
        self.assertTrue(result.success)
        self.assertEqual(result.metadata["mode"], "http")
        self.assertEqual(result.metadata["workspace"], "crates")
        mock_http.assert_called_once()
        _, kwargs = mock_http.call_args
        self.assertEqual(kwargs["workspace"], "crates")

    @patch("store_honcho.ingest_via_cli")
    def test_disabled(self, mock_cli):
        sample = FakeCodifyOutput(content="skip", source="skip-test")
        result = store(sample, config={"enabled": False})
        self.assertTrue(result.success)
        self.assertIsNone(result.record_id)
        self.assertEqual(result.metadata["status"], "disabled")
        mock_cli.assert_not_called()

    @patch("store_honcho.ingest_via_cli")
    def test_failure(self, mock_cli):
        mock_cli.return_value = (False, "", "honcho crashed")
        sample = FakeCodifyOutput(content="crash", source="crash-test")
        result = store(sample)
        self.assertFalse(result.success)
        self.assertIn("honcho crashed", result.error)

    @patch("store_honcho.ingest_via_cli")
    def test_source_prepended_to_tags(self, mock_cli):
        mock_cli.return_value = (True, "ok", "")
        sample = FakeCodifyOutput(content="tag test", tags=["my-tag"], source="my-source")
        store(sample)
        _, kwargs = mock_cli.call_args
        tags_passed = kwargs.get("tags") or []
        self.assertIn("my-source", tags_passed)
        self.assertIn("my-tag", tags_passed)

    @patch("store_honcho.ingest_via_cli")
    def test_custom_workspace(self, mock_cli):
        mock_cli.return_value = (True, "ok", "")
        sample = FakeCodifyOutput(content="ws test", source="ws-test")
        result = store(sample, config={"workspace": "vieday"})
        self.assertEqual(result.metadata["workspace"], "vieday")
        _, kwargs = mock_cli.call_args
        self.assertEqual(kwargs["workspace"], "vieday")


# ---------------------------------------------------------------------------

if __name__ == "__main__":
    unittest.main(verbosity=2)
