"""
test_notify_discord.py — Tests for stages/06-notify/channels/notify_discord.py
Run: python -m pytest tests/test_notify_discord.py -v
"""
import pytest
from pathlib import Path
from unittest.mock import patch

_SKILL_ROOT = Path(__file__).parent.parent
_discord_path = _SKILL_ROOT / "stages" / "06-notify" / "channels" / "notify_discord.py"


def _load(ns):
    """Exec notify_discord.py into ns dict."""
    ns["__file__"] = str(_discord_path)
    exec(_discord_path.read_text(encoding="utf-8"), ns)
    return ns


# --------------------------------------------------------------------------
# notify_discord — good path
# --------------------------------------------------------------------------

@patch("requests.post")
def test_notify_discord_success(mock_post):
    ns = {}
    _load(ns)
    mock_post.return_value.status_code = 200
    mock_post.return_value.text = "OK"

    payload = {"status": "completed", "workflowId": "wf-1", "completedAt": "2026-01-01T00:00:00Z"}
    result = ns["notify_discord"](payload, "https://discord.com/api/webhooks/test/abc")

    assert result["success"] is True
    assert result["response"] == "OK"
    mock_post.assert_called_once()
    call_kwargs = mock_post.call_args.kwargs
    assert call_kwargs["json"]["embeds"][0]["title"] == "Workflow Completed"


@patch("requests.post")
def test_notify_discord_builds_embed_with_stages(mock_post):
    ns = {}
    _load(ns)
    mock_post.return_value.status_code = 200
    mock_post.return_value.text = ""

    payload = {
        "status": "completed",
        "workflowId": "wf-2",
        "completedAt": "2026-01-01T00:00:00Z",
        "stages": {"01-detect": "ok", "02-normalize": {"markdown": "ok"}},
    }
    result = ns["notify_discord"](payload, "https://discord.com/api/webhooks/test/abc")
    assert result["success"] is True
    embed = mock_post.call_args.kwargs["json"]["embeds"][0]
    assert "wf-2" in embed["description"]


# --------------------------------------------------------------------------
# notify_discord — validation / error handling
# --------------------------------------------------------------------------

def test_notify_discord_rejects_empty_webhook():
    ns = {}
    _load(ns)
    result = ns["notify_discord"]({"status": "completed", "workflowId": "wf-x"}, "")
    assert result["success"] is False
    assert "required" in result["response"]


@patch("requests.post")
def test_notify_discord_handles_http_error(mock_post):
    ns = {}
    _load(ns)
    mock_post.return_value.status_code = 403
    mock_post.return_value.text = "Forbidden"

    result = ns["notify_discord"]({"status": "completed", "workflowId": "wf-3"}, "https://discord.com/api/webhooks/test/bad")
    assert result["success"] is False
    assert "403" in result["response"]


@patch("requests.post")
def test_notify_discord_handles_timeout(mock_post):
    ns = {}
    _load(ns)
    import requests
    mock_post.side_effect = requests.Timeout("timed out")

    result = ns["notify_discord"]({"status": "completed", "workflowId": "wf-4"}, "https://discord.com/api/webhooks/test/slow")
    assert result["success"] is False
    assert "timeout" in result["response"]


@patch("requests.post")
def test_notify_discord_handles_exception(mock_post):
    ns = {}
    _load(ns)
    mock_post.side_effect = OSError("connection refused")

    result = ns["notify_discord"]({"status": "completed", "workflowId": "wf-5"}, "https://discord.com/api/webhooks/test/bad")
    assert result["success"] is False
    assert "connection refused" in result["response"]


# --------------------------------------------------------------------------
# notify — config-based entry point
# --------------------------------------------------------------------------

@patch("requests.post")
def test_notify_uses_config_webhook_url(mock_post):
    ns = {}
    _load(ns)
    mock_post.return_value.status_code = 204

    result = ns["notify"](
        {"status": "completed", "workflowId": "wf-config"},
        {"webhook_url": "https://discord.com/api/webhooks/test/config"}
    )
    assert result["success"] is True


@patch("requests.post")
def test_notify_tolerates_missing_config(mock_post):
    ns = {}
    _load(ns)
    mock_post.return_value.status_code = 200
    mock_post.return_value.text = ""

    result = ns["notify"]({"status": "completed", "workflowId": "wf-noconfig"}, None)
    assert result["success"] is False  # empty webhook_url rejected


if __name__ == "__main__":
    import sys
    sys.exit(pytest.main([__file__, "-v"]))
