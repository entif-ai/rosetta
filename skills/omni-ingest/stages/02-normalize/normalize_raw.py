"""
normalize_raw.py — Stage 2: Normalize raw content to Markdown.

Accepts raw text content and emits:
  - content.md   — normalized Markdown (or plain text if conversion not possible)
  - meta.json    — content metadata

This is the simplest normalizer — content is already text, so it's mostly
a pass-through with light cleanup: strip trailing whitespace, normalize
line endings, detect if it's already Markdown.
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

# Resolve relative to this file's location
_SKILL_ROOT = Path(__file__).parent.parent.parent
_BUS_DIR = _SKILL_ROOT / "bus"


def normalize(
    content: str,
    workflow_id: str,
    content_type_hint: Optional[str] = None,
    original_filename: Optional[str] = None,
) -> dict:
    """
    Normalize raw text to Markdown and write to bus/.

    Returns a dict with:
      - content_path: str   — path to the written content file
      - meta_path: str       — path to the written metadata file
      - meta: dict           — the metadata that was written
      - was_markdown: bool   — whether the content was detected as Markdown
      - line_count: int      — lines in the normalized content
      - word_count: int      — approximate word count
    """
    if not content or not content.strip():
        raise ValueError("content must be non-empty and not whitespace-only")

    # Light cleanup
    normalized = _cleanup_text(content)

    # Detect Markdown features
    was_markdown = _is_markdown(normalized)

    # Count lines and words
    lines = normalized.splitlines()
    line_count = len(lines)
    word_count = len(normalized.split())

    # Build metadata
    meta = {
        "originalFilename": original_filename,
        "mimeType": content_type_hint or "text/plain",
        "normalizedMimeType": "text/markdown" if was_markdown else "text/plain",
        "lineCount": line_count,
        "wordCount": word_count,
        "normalizedAt": datetime.now(timezone.utc).isoformat(),
        "wasMarkdown": was_markdown,
    }

    # Write content file
    content_path = _BUS_DIR / f"content.{workflow_id}.md"
    content_path.parent.mkdir(parents=True, exist_ok=True)
    content_path.write_text(normalized, encoding="utf-8")

    # Write metadata file
    meta_path = _BUS_DIR / f"content.{workflow_id}.meta.json"
    meta_path.write_text(json.dumps(meta, indent=2), encoding="utf-8")

    return {
        "content_path": str(content_path),
        "meta_path": str(meta_path),
        "meta": meta,
        "was_markdown": was_markdown,
        "line_count": line_count,
        "word_count": word_count,
    }


def _cleanup_text(text: str) -> str:
    """
    Light normalization: normalize line endings, strip trailing whitespace,
    remove unreasonable quantities of trailing newlines.
    """
    # Normalize CRLF → LF
    text = text.replace("\r\n", "\n")
    # Remove leading/trailing whitespace per line
    lines = [line.rstrip() for line in text.splitlines()]
    # Collapse more than 2 consecutive blank lines to 2
    collapsed: list[str] = []
    blank_count = 0
    for line in lines:
        if line == "":
            blank_count += 1
            if blank_count <= 1:   # max 2 consecutive blank lines
                collapsed.append(line)
        else:
            blank_count = 0
            collapsed.append(line)
    # Strip trailing newlines from end
    while collapsed and collapsed[-1] == "":
        collapsed.pop()
    return "\n".join(collapsed) + "\n"


# Markdown detection heuristics — conservative (any clear indicator counts)
_MARKDOWN_INDICATORS = [
    re.compile(r"^#{1,6}\s+\S", re.MULTILINE),   # headings
    re.compile(r"^\*\s+\S", re.MULTILINE),          # unordered lists
    re.compile(r"^\d+\.\s+\S", re.MULTILINE),       # ordered lists
    re.compile(r"\[.+\]\(.+\)", re.MULTILINE),      # markdown links
    re.compile(r"```"),                             # code blocks
    re.compile(r"^\s*[-*_]{3,}\s*$", re.MULTILINE), # thematic breaks
    re.compile(r"[*_]{1,2}\S.*?[*_]{1,2}"),        # bold/italic
]


def _is_markdown(text: str) -> bool:
    """Return True if text has clear Markdown formatting."""
    for pattern in _MARKDOWN_INDICATORS:
        if pattern.search(text):
            return True
    return False


# ---------------------------------------------------------------------------
# CLI smoke test
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage: echo 'text' | python normalize_raw.py [workflow_id]")
        sys.exit(1)

    content = sys.stdin.read()
    workflow_id = sys.argv[1] if len(sys.argv) > 1 else "test_wf"
    result = normalize(content, workflow_id, content_type_hint="text/plain")
    print(json.dumps(result, indent=2))
