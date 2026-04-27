# Stage 1: Detect

## Responsibility

Determine that new content exists to ingest and emit a workflow manifest.

## Detectors (pluggable)

| Detector | Status |
|---|---|
| `webhook.py` | not yet implemented |
| `cron_rss.py` | not yet implemented |
| `file_drop.py` | not yet implemented |
| `email_sensor.py` | not yet implemented |
| `arxiv_watch.py` | not yet implemented |
| `user_submit.py` | not yet implemented |

## Output

A workflow manifest appended to `bus/queue.01.<workflow_id>.jsonl` and a ledger entry in `ledger/<workflow_id>.jsonl`.

## Schema

See `manifest.schema.json` at the skill root for the canonical Stage 1 manifest schema.
