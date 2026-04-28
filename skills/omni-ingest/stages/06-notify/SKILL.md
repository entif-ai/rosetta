# Stage 6: Notify

## Responsibility

Deliver status notification when workflow reaches terminal state.

## Terminal States

`completed` | `partially_completed` | `failed` | `rejected` | `quarantined`

## Notification Channels

| Channel | Status |
|---|---|
| `notify_console.py` | implemented — logs to stdout/stderr |
| `notify_discord.py` | implemented — Discord webhook; returns {success, response} |
| `notify_telegram.py` | implemented — Telegram bot API |

## Notification Payload Schema

```json
{
  "workflowId": "uuid",
  "status": "completed",
  "completedAt": "2026-04-26T21:05:00Z",
  "stages": {
    "01-detect": "completed",
    "02-normalize": "completed",
    "03-sanitize": "completed",
    "04-classify-mine": "completed",
    "05-codify": { "markdown": "ok", "hindsight": "ok" },
    "06-notify": "completed"
  },
  "packetRef": "bus/consolidated.<workflow_id>.json",
  "receiptsRef": "bus/receipts.<workflow_id>.json"
}
```

## API

Each channel module exposes:
```python
notify_channel(payload: dict, config: dict) -> dict
# returns {"success": bool, "response": str}
```

Config schema per channel:
- Discord: `{"webhook_url": "https://discord.com/api/webhooks/..."}`
- Telegram: `{"bot_token": "...", "chat_id": "..."}`

## Testing

```bash
cd ~/.hermes/rosetta/skills/omni-ingest
python -m pytest tests/test_notify_discord.py -v
```
