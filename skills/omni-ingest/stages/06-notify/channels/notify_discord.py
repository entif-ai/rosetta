"""
notify_discord.py — omni-ingest Stage 6: Discord notification channel.

Sends workflow completion notifications to a Discord channel via a webhook URL.

API:
  def notify_discord(
      payload: dict,     # Stage 6 notification payload schema
      webhook_url: str,  # Discord webhook URL
  ) -> dict:             # Returns {"success": bool, "response": str}

  def notify(
      payload: dict,
      config: dict,   # {"webhook_url": str}
  ) -> dict:

Run: python -m pytest tests/test_notify_discord.py -v
"""

from __future__ import annotations

import json
import requests

DEFAULT_TIMEOUT = 10


def _build_embed(payload: dict) -> dict:
    """Convert Stage 6 notification payload into a Discord embed."""
    status = payload.get("status", "unknown")
    workflow_id = payload.get("workflowId", "?")
    completed_at = payload.get("completedAt", "")
    stages = payload.get("stages", {})
    packet_ref = payload.get("packetRef", "")

    # Status color: green=completed, yellow=partial, red=failed
    COLOR_MAP = {
        "completed": 0x28A745,
        "partially_completed": 0xFFC107,
        "failed": 0xDC3545,
        "rejected": 0xDC3545,
        "quarantined": 0xFD7E14,
    }
    color = COLOR_MAP.get(status, 0x6C757D)

    # Stage summary as field text
    stage_lines = []
    for stage_name, stage_status in stages.items():
        if isinstance(stage_status, dict):
            # e.g. "05-codify": {"markdown": "ok", "hindsight": "ok"}
            sub = ", ".join(f"{k}: {v}" for k, v in stage_status.items())
            stage_lines.append(f"**{stage_name}**: {sub}")
        else:
            stage_lines.append(f"**{stage_name}**: {stage_status}")

    embed = {
        "title": f"Workflow {status.replace('_', ' ').title()}",
        "description": f"ID: `{workflow_id}`",
        "color": color,
        "fields": [
            {
                "name": "Completed At",
                "value": completed_at[:19] if completed_at else "—",
                "inline": True,
            },
            {
                "name": "Packet Ref",
                "value": packet_ref or "—",
                "inline": False,
            },
        ],
        "footer": {
            "text": "omni-ingest pipeline",
        },
        "timestamp": completed_at[:19] + "Z" if completed_at else None,
    }

    # Add stage details as a separate field if there are stages
    if stage_lines:
        embed["fields"].insert(2, {
            "name": "Stages",
            "value": "\n".join(stage_lines),
            "inline": False,
        })

    return embed


def notify_discord(
    payload: dict,
    webhook_url: str,
) -> dict:
    """
    Send a Stage 6 notification to a Discord channel via webhook.

    Parameters
    ----------
    payload : dict
        Stage 6 notification payload.
    webhook_url : str
        Discord webhook URL (from Discord channel settings > Integrations).

    Returns
    -------
    {"success": bool, "response": str}
        success=True if Discord returns HTTP 200; response is the response body.
    """
    if not webhook_url:
        return {"success": False, "response": "webhook_url is required"}

    embed = _build_embed(payload)
    data = {"embeds": [embed]}

    try:
        resp = requests.post(
            webhook_url,
            json=data,
            timeout=DEFAULT_TIMEOUT,
            headers={"Content-Type": "application/json"},
        )
        if resp.status_code == 204:
            return {"success": True, "response": "no content"}
        body = resp.text[:500]
        if resp.status_code == 200:
            return {"success": True, "response": body}
        return {"success": False, "response": f"HTTP {resp.status_code}: {body}"}
    except requests.Timeout:
        return {"success": False, "response": "request timeout"}
    except Exception as exc:
        return {"success": False, "response": str(exc)}


def notify(
    payload: dict,
    config: dict,
) -> dict:
    """
    Stage 6 channel entry point.

    config must contain: {"webhook_url": str}
    """
    webhook_url = config.get("webhook_url", "") if config else ""
    return notify_discord(payload, webhook_url)


if __name__ == "__main__":
    import sys, os, json
    payload = json.loads(os.environ.get("NOTIFY_PAYLOAD", "{}"))
    webhook = os.environ.get("DISCORD_WEBHOOK_URL", "")
    result = notify_discord(payload, webhook)
    print(json.dumps(result))
