"""
normalize_arxiv.py — omni-ingest Stage 2 normalizer: arXiv paper → Markdown.

Fetches an arXiv paper by ID and converts it to structured Markdown with
metadata header (title, authors, abstract, categories).

API:
  def normalize_arxiv(
      arxiv_id: str,
      workflow_id: str,
      include_pdf_text: bool = False,
  ) -> tuple[str, dict]:
      # include_pdf_text: if True, also fetches PDF text (requires network)

Run: python -m pytest tests/test_normalize_arxiv.py -v
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

import requests

# Resolve relative to this file's location
_SKILL_ROOT = Path(__file__).parent.parent.parent
_BUS_DIR = _SKILL_ROOT / "bus"

_ARXIV_ABSTRACT_URL = "https://export.arxiv.org/abs/{arxiv_id}"


def _normalize_arxiv_id(raw: str) -> str:
    """Extract canonical arXiv ID from URL or bare ID."""
    raw = raw.strip()
    raw = re.sub(r"https?://arxiv\.org/(abs|pdf)/", "", raw)
    raw = re.sub(r"\.pdf$", "", raw, flags=re.IGNORECASE)
    return raw


def _fetch_abstract_html(arxiv_id: str) -> str:
    """Fetch the abstract HTML page."""
    url = _ARXIV_ABSTRACT_URL.format(arxiv_id=arxiv_id)
    resp = requests.get(url, timeout=30)
    if resp.status_code == 404:
        raise ValueError(f"arXiv paper not found: {arxiv_id}")
    resp.raise_for_status()
    return resp.text


def _extract_arxiv_meta(html: str) -> dict:
    """Parse title, authors, abstract, categories from arXiv abstract HTML."""
    def _meta(name: str, default: str = "") -> str:
        m = re.search(rf'<meta name="{re.escape(name)}" content="([^"]*)"', html)
        return m.group(1).strip() if m else default

    title = _meta("citation_title", "Unknown Title")
    authors = re.findall(r'<meta name="citation_author" content="([^"]*)"', html)
    author_str = "; ".join(authors) if authors else _meta("citation_author")
    abstract_raw = _meta("citationabstract", "")
    if not abstract_raw:
        m = re.search(
            r'<blockquote class="abstract[^"]*">.*?<span class="descriptor">Abstract:</span>(.*?)</blockquote>',
            html, re.DOTALL
        )
        if m:
            abstract_raw = re.sub(r"\s+", " ", m.group(1)).strip()
    categories = re.findall(r'<meta name="citation_arxiv_categories" content="([^"]*)"', html)
    submitted = _meta("citation_date", "")

    return {
        "title": title,
        "authors": author_str,
        "abstract": abstract_raw,
        "categories": categories,
        "submitted_date": submitted,
    }


def _to_markdown(meta: dict, arxiv_id: str, include_pdf: bool = False) -> str:
    """Format arXiv paper as Markdown document."""
    lines = [
        f"# {meta['title']}",
        "",
        f"**Authors:** {meta['authors']}",
        f"**arXiv ID:** {arxiv_id}",
        f"**Categories:** {', '.join(meta['categories'])}",
        f"**Submitted:** {meta['submitted_date']}",
        "",
        "## Abstract",
        "",
        meta["abstract"],
    ]
    if include_pdf:
        lines.append("")
        lines.append(f"**PDF:** https://arxiv.org/pdf/{arxiv_id}.pdf")
    return "\n".join(lines) + "\n"


def normalize_arxiv(
    arxiv_id: str,
    workflow_id: str,
    include_pdf_text: bool = False,
) -> tuple[str, dict]:
    """
    Fetch and normalize an arXiv paper by ID.

    Parameters
    ----------
    arxiv_id : str
        arXiv identifier (with or without URL prefix).
    workflow_id : str
        Workflow identifier.
    include_pdf_text : bool
        If True, also include PDF URL (not actual PDF text — that requires
        PyMuPDF processing; this normalizer focuses on abstract + metadata).

    Returns
    -------
    (markdown_content, meta_dict) tuple.

    Raises
    ------
    ValueError
        If the paper cannot be fetched or parsed.
    """
    canonical_id = _normalize_arxiv_id(arxiv_id)
    if not canonical_id:
        raise ValueError(f"invalid arXiv ID: {arxiv_id}")

    html = _fetch_abstract_html(canonical_id)
    meta = _extract_arxiv_meta(html)

    content = _to_markdown(meta, canonical_id, include_pdf=include_pdf_text)
    word_count = len(content.split())
    byte_size = len(content.encode("utf-8"))

    result_meta = {
        "originalFilename": f"{canonical_id}.md",
        "mimeType": "text/html",
        "normalizedMimeType": "text/markdown",
        "arxivId": canonical_id,
        "title": meta["title"],
        "authors": meta["authors"],
        "categories": meta["categories"],
        "submittedDate": meta["submitted_date"],
        "normalizedAt": datetime.now(timezone.utc).isoformat(),
        "lineCount": len(content.splitlines()),
        "wordCount": word_count,
        "sizeBytes": byte_size,
    }

    # Write bus files
    content_path = _BUS_DIR / f"content.{workflow_id}.md"
    meta_path = _BUS_DIR / f"content.{workflow_id}.meta.json"
    content_path.parent.mkdir(parents=True, exist_ok=True)
    content_path.write_text(content, encoding="utf-8")
    meta_path.write_text(json.dumps(result_meta, indent=2), encoding="utf-8")

    return content, result_meta


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 3:
        print("Usage: python normalize_arxiv.py <arxiv_id> <workflow_id>")
        sys.exit(1)
    arxiv_id, workflow_id = sys.argv[1], sys.argv[2]
    content, meta = normalize_arxiv(arxiv_id, workflow_id)
    print(f"Normalized: {meta['title']}")
