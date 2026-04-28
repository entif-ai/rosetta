"""Stage 1 — PDF normalizer: convert PDF to clean Markdown via PyMuPDF."""

from __future__ import annotations

import re
from pathlib import Path
from typing import Optional

import pymupdf


# --------------------------------------------------------------------------- #
# PDF → Markdown conversion
# --------------------------------------------------------------------------- #
def pdf_to_markdown(pdf_path: str) -> str:
    """
    Convert a PDF file to Markdown text using PyMuPDF.

    Raises FileNotFoundError if the file does not exist.
    Raises TypeError if pdf_path is not a string.
    Returns empty string for empty/whitespace-only PDFs.
    """
    if not isinstance(pdf_path, str):
        raise TypeError(f"pdf_to_markdown expects str, got {type(pdf_path).__name__}")

    path = Path(pdf_path)
    if not path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")
    if not path.is_file():
        raise ValueError(f"Path is not a file: {pdf_path}")

    try:
        doc = pymupdf.open(pdf_path)
    except Exception as exc:
        raise RuntimeError(f"Failed to open PDF: {exc}") from exc

    pages: list[str] = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        # Get plain text for the page
        text = page.get_text("text")
        text = text.strip()
        if not text:
            continue
        # Add page separator heading
        pages.append(f"## Page {page_num + 1}\n\n{text}")

    doc.close()

    if not pages:
        return ""

    result = "\n\n---\n\n".join(pages) + "\n"
    return _normalize_text(result)


def pdf_bytes_to_markdown(pdf_bytes: bytes) -> str:
    """
    Convert PDF bytes to Markdown text using PyMuPDF (in-memory, no temp file).

    Raises TypeError if input is not bytes.
    Returns empty string for empty/whitespace-only PDFs.
    """
    if not isinstance(pdf_bytes, bytes):
        raise TypeError(f"pdf_bytes_to_markdown expects bytes, got {type(pdf_bytes).__name__}")

    if not pdf_bytes.strip():
        return ""

    try:
        doc = pymupdf.open(stream=pdf_bytes, filetype="pdf")
    except Exception as exc:
        raise RuntimeError(f"Failed to open PDF from bytes: {exc}") from exc

    pages: list[str] = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text("text").strip()
        if not text:
            continue
        pages.append(f"## Page {page_num + 1}\n\n{text}")

    doc.close()

    if not pages:
        return ""

    result = "\n\n---\n\n".join(pages) + "\n"
    return _normalize_text(result)


def _normalize_text(text: str) -> str:
    """Collapse excessive blank lines and strip trailing whitespace."""
    lines = [ln.rstrip() for ln in text.splitlines()]
    collapsed: list[str] = []
    blank_count = 0
    for line in lines:
        if line == "":
            blank_count += 1
            if blank_count <= 1:
                collapsed.append(line)
        else:
            blank_count = 0
            collapsed.append(line)
    while collapsed and collapsed[-1] == "":
        collapsed.pop()
    return "\n".join(collapsed) + "\n"
