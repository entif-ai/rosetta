"""
notify_telegram.py — omni-ingest Stage 6: Telegram notification channel.

Sends workflow completion notifications to a Telegram chat via a bot API token
and chat ID.

API:
  def notify_telegram(
      payload: dict,    # Stage 6 notification payload schema
      bot_token: str,  # Telegram bot token (from @BotFather)
      chat_id: str,    # Telegram numeric chat ID
  ) -> dict:           # Returns {"success": bool, "message_id": int|None}

  def notify(
      payload: dict,
      config: dict,   # {"bot_token": str, "chat_id": str}
  ) -> dict:

Run: python -m pytest tests/test_notify_telegram.py -v
"""

from __future__ import annotations

import json
import requests

DEFAULT_TIMEOUT = 10
_TELEGRAM_API = "https://api.telegram.org/bot{token}/sendMessage"


def _build_message(payload: dict) -> str:
    """Format a Stage 6 notification payload as a readable Telegram message."""
    status = payload.get("status", "unknown")
    workflow_id = payload.get("workflowId", "?")
    completed_at = payload.get("completedAt", "")
    stages = payload.get("stages", {})
    packet_ref = payload.get("packetRef", "")
    receipts_ref = payload.get("receiptsRef", "")

    # Emoji map
    STATUS_EMOJI = {
        "completed": "✅",
        "partially_completed": "⚠️",
        "failed": "❌",
        "rejected": "🚫",
        "quarantined": "🔶",
    }
    emoji = STATUS_EMOJI.get(status, "📋")

    lines = [
        f"{emoji} *Workflow {status.replace('_', ' ').upper()}*",
        f"🆔 `{workflow_id}`",
    ]

    if completed_at:
        lines.append(f"🕐 {completed_at[:19]}Z")

    if packet_ref:
        lines.append(f"📦 Packet: `{packet_ref}`")

    if receipts_ref:
        lines.append(f"🧾 Receipts: `{receipts_ref}`")

    # Stage breakdown
    if stages:
        lines.append("")
        lines.append("*Stage Status:*")
        for stage_name, stage_status in stages.items():
            if isinstance(stage_status, dict):
                sub = ", ".join(f"{k}: `{v}`" for k, v in stage_status.items())
                lines.append(f"  • `{stage_name}`: {sub}")
            else:
                icon = "✅" if stage_status == "completed" else "❌"
                lines.append(f"  {icon} `{stage_name}`: `{stage_status}`")

    return "\n".join(lines)


def notify_telegram(
    payload: dict,
    bot_token: str,
    chat_id: str,
) -> dict:
    """
    Send a Stage 6 notification to a Telegram chat.

    Parameters
    ----------
    payload : dict
        Stage 6 notification payload.
    bot_token : str
        Telegram bot token from @BotFather.
    chat_id : str
        Numeric chat ID (from getUpdates or a channel post).

    Returns
    -------
    {"success": bool, "message_id": int|None, "error": str|None}
    """
    if not bot_token or not chat_id:
        return {"success": False, "message_id": None, "error": "bot_token and chat_id are required"}

    url = _TELEGRAM_API.format(token=bot_token)
    text = _build_message(payload)

    try:
        resp = requests.post(
            url,
            json={
                "chat_id": chat_id,
                "text": text,
                "parse_mode": "MarkdownV2",
            },
            timeout=DEFAULT_TIMEOUT,
            headers={"Content-Type": "application/json"},
        )
        data = resp.json()
        if data.get("ok"):
            return {"success": True, "message_id": data.get("result", {}).get("message_id"), "error": None}
        return {"success": False, "message_id": None, "error": data.get("description", "unknown error")}
    except requests.Timeout:
        return {"success": False, "message_id": None, "error": "request timeout"}
    except Exception as exc:
        return {"success": False, "message_id": None, "error": str(exc)}


def notify(
    payload: dict,
    config: dict,
) -> dict:
    """
    Stage 6 channel entry point.

    config must contain: {"bot_token": str, "chat_id": str}
    """
    bot_token = (config.get("bot_token", "") or "") if config else ""
    chat_id = (config.get("chat_id", "") or "") if config else ""
    return notify_telegram(payload, bot_token, chat_id)


if __name__ == "__main__":
    import sys, os, json
    payload = json.loads(os.environ.get("NOTIFY_PAYLOAD", "{}"))
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat = os.environ.get("TELEGRAM_CHAT_ID", "")
    result = notify_telegram(payload, token, chat)
    print(json.dumps(result))
