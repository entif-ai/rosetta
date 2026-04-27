# Stage 6: Notify

## Responsibility

Deliver status notification when workflow reaches terminal state.

## Terminal States

`completed` | `partially_completed` | `failed` | `rejected` | `quarantined`

## Notification Channels

| Channel | Status |
|---|---|
| `notify_discord.py` | not yet implemented |
| `notify_email.py` | not yet implemented |
| `notify_console.py` | not yet implemented |
| `notify_telegram.py` | not yet implemented |

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
    "05-codify": { "markdown": "ok", "hindsight": "ok", "openbrain_ob1": "ok", "honcho": "skipped" },
    "06-notify": "completed"
  },
  "packetRef": "bus/consolidated.<workflow_id>.json",
  "receiptsRef": "bus/receipts.<workflow_id>.json"
}
```
