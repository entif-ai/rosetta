# Stage 1: Detect

## Responsibility

Determine that new content exists to ingest and emit a workflow manifest.

## Detectors (pluggable)

| Detector | Status |
|---|---|
| `user_submit.py` | implemented — 10 passing tests |
| `webhook.py` | implemented — Flask POST endpoint, HMAC verification |
| `file_drop.py` | implemented — watchdog-based directory watcher |
| `email_sensor.py` | implemented — IMAP poller, RFC 822 extraction |
| `arxiv_watch.py` | implemented — arXiv RSS/API watcher |

## Normalizer Helpers (detector-side, extract raw text from format-specific sources)

These live in `normalizers/` and are called by detectors to extract raw text before it hits Stage 2.

| Helper | Status |
|---|---|
| `normalize_html.py` | implemented — html2text-based |
| `normalize_pdf.py` | implemented — PyMuPDF-based |

## Output

A workflow manifest appended to `bus/queue.01.<workflow_id>.jsonl` and a ledger entry in `ledger/<workflow_id>.jsonl`.

## Schema

See `manifest.schema.json` at the skill root for the canonical Stage 1 manifest schema.

## Testing

```bash
cd ~/.hermes/rosetta/skills/omni-ingest
python -m pytest tests/test_user_submit.py -v
python -m pytest tests/test_detector_webhook.py -v
python -m pytest tests/test_detector_file_drop.py -v
python -m pytest tests/test_detector_email.py -v
python -m pytest tests/test_detector_arxiv.py -v
```
