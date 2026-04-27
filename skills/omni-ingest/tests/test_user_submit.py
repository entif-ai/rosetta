"""
test_user_submit.py — Tests for stages/01-detect/detectors/user_submit.py

Run: python -m pytest tests/test_user_submit.py -v
"""

import json
import tempfile
import pytest
from pathlib import Path
from unittest.mock import patch

# Import via exec (matches the exec-based pattern used in this project)
_SKILL_ROOT = Path(__file__).parent.parent
_user_submit_path = (
    _SKILL_ROOT / "stages" / "01-detect" / "detectors" / "user_submit.py"
)
_ns = {"__file__": str(_user_submit_path)}
exec(_user_submit_path.read_text(encoding="utf-8"), _ns)
detect = _ns["detect"]


# ---------------------------------------------------------------------------
# Fixture
# ---------------------------------------------------------------------------

@pytest.fixture
def tmp_dirs(tmp_path, monkeypatch):
    """
    Redirect _BUS_DIR and _LEDGER_DIR to a tmp directory for test isolation.
    Also redirects _SKILL_ROOT so that subsequent imports resolve correctly.
    """
    # Patch the module-level path constants used by the detector
    import sys
    # Find the user_submit module in sys.modules and patch its globals
    mod_name = "stages/01-detect/detectors/user_submit"
    # Since we used exec(), the namespace is in _ns, not in sys.modules
    # Patch the path constants directly in the namespace
    bus_dir = tmp_path / "bus"
    ledger_dir = tmp_path / "ledger"

    _ns["_BUS_DIR"] = bus_dir
    _ns["_LEDGER_DIR"] = ledger_dir

    yield bus_dir, ledger_dir

    # No cleanup needed — tmp_path handles it


# ---------------------------------------------------------------------------
# Tests
# ---------------------------------------------------------------------------

def test_detect_returns_valid_manifest(tmp_dirs):
    """detect returns a dict with all required manifest fields."""
    bus, ledger = tmp_dirs
    manifest = detect("Hello world", content_type_hint="text/plain",
                     user_instructions="test")
    assert "workflowId" in manifest
    assert manifest["stage"] == "01-detect"
    assert manifest["trigger"]["type"] == "user_submit"
    assert manifest["retryCount"] == 0
    assert manifest["parentWorkflowId"] is None


def test_detect_rejects_empty_content(tmp_dirs):
    """detect raises ValueError when content is empty or whitespace-only."""
    bus, ledger = tmp_dirs
    for content in ("", "   ", "\n\t  "):
        try:
            detect(content)
            assert False, f"Expected ValueError for: {content!r}"
        except ValueError as e:
            assert "non-empty" in str(e).lower()


def test_detect_generates_unique_workflow_ids(tmp_dirs):
    """Two calls generate different workflow IDs."""
    bus, ledger = tmp_dirs
    ids = {detect("text")["workflowId"] for _ in range(5)}
    assert len(ids) == 5


def test_detect_writes_content_file(tmp_dirs):
    """detect writes raw content to bus/content.<workflow_id>.md."""
    bus, ledger = tmp_dirs
    manifest = detect("Secret content 42", user_instructions="test")
    content_file = bus / f"content.{manifest['workflowId']}.md"
    assert content_file.exists()
    assert content_file.read_text() == "Secret content 42"


def test_detect_writes_meta_file(tmp_dirs):
    """detect writes content metadata to bus/content.<workflow_id>.meta.json."""
    bus, ledger = tmp_dirs
    manifest = detect("Test", content_type_hint="text/markdown",
                     user_instructions="test meta")
    meta_file = bus / f"content.{manifest['workflowId']}.meta.json"
    assert meta_file.exists()
    meta = json.loads(meta_file.read_text())
    assert meta["mimeType"] == "text/markdown"
    assert meta["sizeBytes"] == len(b"Test")
    assert len(meta["checksum"]) == 64  # SHA-256 hex


def test_detect_writes_ledger_entry(tmp_dirs):
    """detect initializes ledger/<workflow_id>.jsonl with Stage 1 entry."""
    bus, ledger = tmp_dirs
    manifest = detect("Ledger test")
    ledger_file = ledger / f"{manifest['workflowId']}.jsonl"
    assert ledger_file.exists()
    lines = ledger_file.read_text().splitlines()
    assert len(lines) == 1
    entry = json.loads(lines[0])
    assert entry["workflowId"] == manifest["workflowId"]
    assert entry["stage"] == "01-detect"
    assert entry["status"] == "completed"


def test_detect_writes_bus_ack(tmp_dirs):
    """detect appends Stage 1 ACK to bus/queue.01.<workflow_id>.jsonl."""
    bus, ledger = tmp_dirs
    manifest = detect("ACK test")
    ack_file = bus / f"queue.01.{manifest['workflowId']}.jsonl"
    assert ack_file.exists()
    entry = json.loads(ack_file.read_text().splitlines()[0])
    assert entry["status"] == "acknowledged"
    assert entry["stage"] == "01-detect"


def test_detect_checksum_is_sha256(tmp_dirs):
    """The checksum matches SHA-256 of the content."""
    import hashlib
    bus, ledger = tmp_dirs
    raw = "Consistent checksum check"
    expected = hashlib.sha256(raw.encode()).hexdigest()
    manifest = detect(raw)
    assert manifest["contentMeta"]["checksum"] == expected


def test_detect_user_instructions_preserved(tmp_dirs):
    """userInstructions appear in the manifest trigger."""
    bus, ledger = tmp_dirs
    instructions = "Check for Rosetta v3 references"
    manifest = detect("Content", user_instructions=instructions)
    assert manifest["trigger"]["userInstructions"] == instructions


def test_detect_original_filename_in_meta(tmp_dirs):
    """originalFilename is stored in contentMeta when provided."""
    bus, ledger = tmp_dirs
    manifest = detect("Doc content", original_filename="report.txt")
    meta_file = bus / f"content.{manifest['workflowId']}.meta.json"
    meta = json.loads(meta_file.read_text())
    assert meta["originalFilename"] == "report.txt"


if __name__ == "__main__":
    import sys
    sys.exit(pytest.main([__file__, "-v"]))
