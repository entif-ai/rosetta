"""
normalize_csv.py — omni-ingest Stage 2 normalizer: CSV → Markdown table.

Uses Python's csv module with dialect detection. Converts tabular data to
a Markdown table with optional headers.

API:
  def normalize_csv(
      csv_content: str,
      workflow_id: str,
      headers: list[str] | None = None,  # None = first row is header
      original_filename: str | None = None,
  ) -> tuple[str, dict]:

Run: python -m pytest tests/test_normalize_csv.py -v
"""

from __future__ import annotations

import csv
import io
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

# Resolve relative to this file's location
_SKILL_ROOT = Path(__file__).parent.parent.parent
_BUS_DIR = _SKILL_ROOT / "bus"


def _detect_dialect(content: str) -> csv.Dialect:
    """Sniff the CSV dialect from content."""
    try:
        sample = content[:8192]
        return csv.Sniffer().sniff(sample)
    except csv.Error:
        return csv.excel


def _escape_cell(value: str) -> str:
    """Escape pipe characters in cells for Markdown table."""
    return str(value).replace("|", "\\|")


def _rows_to_markdown(rows: list[list[str]], headers: list[str] | None) -> str:
    """Convert row arrays to a Markdown table string."""
    if not rows:
        return ""

    # Build header row
    header_row = rows[0] if headers is None else list(headers)
    body_rows = rows[1:] if headers is None else rows

    md_lines = [
        "| " + " | ".join(_escape_cell(h) for h in header_row) + " |",
        "| " + " | ".join("---" for _ in header_row) + " |",
    ]
    for row in body_rows:
        cells = [_escape_cell(c) for c in row]
        # Pad missing cells
        while len(cells) < len(header_row):
            cells.append("")
        md_lines.append("| " + " | ".join(cells[:len(header_row)]) + " |")

    return "\n".join(md_lines) + "\n"


def normalize_csv(
    csv_content: str,
    workflow_id: str,
    headers: Optional[list[str]] = None,
    original_filename: Optional[str] = None,
    column_limit: int = 50,  # safety: stop processing if >50 cols
) -> tuple[str, dict]:
    """
    Convert CSV content to a Markdown table.

    Parameters
    ----------
    csv_content : str
        Raw CSV text.
    workflow_id : str
        Workflow identifier.
    headers : list[str] | None
        Column names. None = first row of CSV is the header.
    original_filename : str | None
        Original filename for metadata.

    Returns
    -------
    (markdown_content, meta_dict) tuple.

    Writes bus/content.<workflow_id>.md + bus/content.<workflow_id>.meta.json.

    Raises
    ------
    ValueError
        If the content is empty or cannot be parsed as CSV.
    """
    if not csv_content or not csv_content.strip():
        raise ValueError("CSV content must be non-empty")

    dialect = _detect_dialect(csv_content)
    reader = csv.reader(io.StringIO(csv_content), dialect=dialect)

    rows: list[list[str]] = []
    col_count = 0
    for i, row in enumerate(reader):
        if i > 10_000:  # Safety: limit row processing
            break
        if len(row) > column_limit:
            raise ValueError(f"CSV has {len(row)} columns, limit is {column_limit}")
        if len(row) > col_count:
            col_count = len(row)
        rows.append(row)

    if not rows:
        raise ValueError("CSV has no data rows")

    # Auto-generate headers if not provided and not obvious from first row
    auto_header = headers is None and bool(rows)
    if auto_header:
        auto_col_names = [f"col_{i+1}" for i in range(col_count)]
        markdown_table = _rows_to_markdown(rows, None)   # rows[0] = header, rows[1:] = body
    elif headers is False:
        # Explicit False = no header row at all; all rows are data, auto-gen col names
        auto_col_names = [f"col_{i+1}" for i in range(col_count)]
        markdown_table = _rows_to_markdown(rows, auto_col_names)  # all rows = body
    else:
        auto_col_names = None
        markdown_table = _rows_to_markdown(rows, headers)

    # Metadata header
    meta = {
        "originalFilename": original_filename,
        "mimeType": "text/csv",
        "normalizedMimeType": "text/markdown",
        "rowCount": len(rows) - (1 if auto_header else 0),
        "columnCount": col_count,
        "autoHeader": auto_header,
        "dialect": type(dialect).__name__,
        "normalizedAt": datetime.now(timezone.utc).isoformat(),
        "lineCount": len(markdown_table.splitlines()),
        "wordCount": len(markdown_table.split()),
    }

    # Write bus files
    content_path = _BUS_DIR / f"content.{workflow_id}.md"
    meta_path = _BUS_DIR / f"content.{workflow_id}.meta.json"
    content_path.parent.mkdir(parents=True, exist_ok=True)
    content_path.write_text(markdown_table, encoding="utf-8")
    meta_path.write_text(json.dumps(meta, indent=2), encoding="utf-8")

    return markdown_table, meta


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: cat data.csv | python normalize_csv.py <workflow_id>")
        sys.exit(1)
    import sys
    workflow_id = sys.argv[1]
    csv_content = sys.stdin.read()
    content, meta = normalize_csv(csv_content, workflow_id)
    print(f"Converted {meta['rowCount']} rows x {meta['columnCount']} cols")
