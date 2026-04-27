# Stage 2: Normalize

## Responsibility

Fetch raw content and convert to standardized Markdown and/or JSON/YAML.

## Normalizers (pluggable per content type)

| Normalizer | Status |
|---|---|
| `normalize_html.py` | not yet implemented |
| `normalize_pdf.py` | not yet implemented |
| `normalize_email.py` | not yet implemented |
| `normalize_docx.py` | not yet implemented |
| `normalize_csv.py` | not yet implemented |
| `normalize_rss.py` | not yet implemented |
| `normalize_arxiv.py` | not yet implemented |

## Output

Normalized content in `bus/content.<workflow_id>.md` + `bus/content.<workflow_id>.meta.json`.
Append ACK to `bus/queue.02.<workflow_id>.jsonl`.
