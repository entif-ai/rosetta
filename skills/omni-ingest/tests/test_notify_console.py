"""
test_notify_console.py — Tests for stages/06-notify/channels/notify_console.py

Test title format: test_<what>_<mechanism>_<expected_outcome>
"""

import sys
import io
from unittest.mock import patch

# ---------------------------------------------------------------------------
# Manual import via exec so we don't depend on the package layout
# ---------------------------------------------------------------------------
_notify_console_path = (
    ROOT := __import__('pathlib').Path(__file__).parent.parent
) / "stages" / "06-notify" / "channels" / "notify_console.py"

_ns = {}
exec(_notify_console_path.read_text(), _ns)
notify = _ns["notify"]
NotifyEvent = _ns["NotifyEvent"]
NotifyResult = _ns["NotifyResult"]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _capture(event: NotifyEvent):
    """Run notify() and capture stdout."""
    buf = io.StringIO()
    with patch("sys.stdout", buf):
        result = notify(event)
    return buf.getvalue(), result


# ---------------------------------------------------------------------------
# Tests
# ---------------------------------------------------------------------------

def test_notify_console_success_writes_timestamp_and_workflow_id():
    """notify_console writes a timestamped line to stdout on success."""
    event = NotifyEvent(
        workflow_id="wf_test_001",
        stage="06-notify",
        trigger="user_submit",
        status="success",
        message="Pipeline completed",
    )
    output, result = _capture(event)
    assert result.success is True
    assert result.channel == "console"
    assert "wf_test_001" in output
    assert "SUCCESS" in output
    assert "Pipeline completed" in output


def test_notify_console_success_includes_metadata():
    """notify_console includes metadata dict in output when provided."""
    event = NotifyEvent(
        workflow_id="wf_test_002",
        stage="06-notify",
        trigger="user_submit",
        status="failure",
        message="Stage 4 sub-agent died",
        metadata={"stage_failed": "04-classify-mine", "chunk_index": 2},
    )
    output, result = _capture(event)
    assert result.success is True
    assert "FAILURE" in output
    assert "stage_failed" in output
    assert "04-classify-mine" in output


def test_notify_console_always_succeeds():
    """console notify always returns success=True regardless of event content."""
    for status in ("success", "failure", "retry", "terminate"):
        event = NotifyEvent(
            workflow_id="wf_test_003",
            stage="06-notify",
            trigger="user_submit",
            status=status,
            message=f"Test {status}",
        )
        _, result = _capture(event)
        assert result.success is True, f"Expected success=True for status={status}"


def test_notify_console_status_uppercase():
    """notify_console uppercases the status field in output."""
    event = NotifyEvent(
        workflow_id="wf_test_004",
        stage="06-notify",
        trigger="webhook",
        status="retry",
        message="Transient error, will retry",
    )
    output, result = _capture(event)
    assert "RETRY" in output
    # The status word should appear uppercased; internal content unchanged
    assert "Transient error" in output


def test_notify_event_dataclass_fields():
    """NotifyEvent accepts all documented fields without error."""
    event = NotifyEvent(
        workflow_id="wf_abc",
        stage="06-notify",
        trigger="arxiv_watch",
        status="success",
        message="All stores written",
        metadata={"stores": ["hindsight", "markdown"], "chunks": 3},
    )
    assert event.workflow_id == "wf_abc"
    assert event.stage == "06-notify"
    assert event.trigger == "arxiv_watch"
    assert event.status == "success"
    assert event.metadata["chunks"] == 3


if __name__ == "__main__":
    import pytest
    sys.exit(pytest.main([__file__, "-v"]))
