# Stage 2: Normalize

## Responsibility

Fetch raw content and convert to standardized Markdown and/or JSON/YAML.

## Normalizers (pluggable per content type)

| Normalizer | Status |
|---|---|
| `normalize_raw.py` | implemented — 18 passing tests |
| `normalize_html.py` | implemented — html2text-based |
| `normalize_pdf.py` | implemented — PyMuPDF-based |
| `normalize_email.py` | implemented — RFC 822 → Markdown |
| `normalize_docx.py` | implemented — python-docx → Markdown |
| `normalize_csv.py` | implemented — CSV → Markdown table |
| `normalize_rss.py` | implemented — RSS/Atom → Markdown |
| `normalize_arxiv.py` | implemented — arXiv paper → Markdown |

## Output

Normalized content in `bus/content.<workflow_id>.md` + `bus/content.<workflow_id>.meta.json`.
Append ACK to `bus/queue.02.<workflow_id>.jsonl`.

## Testing

```bash
cd ~/.hermes/rosetta/skills/omni-ingest
python -m pytest tests/test_normalize_raw.py -v
python -m pytest tests/test_normalize_email.py -v
python -m pytest tests/test_normalize_docx.py -v
python -m pytest tests/test_normalize_csv.py -v
```
