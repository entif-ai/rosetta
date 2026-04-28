"""Stage 1 — HTML normalizer: convert raw HTML to clean Markdown via html2text."""

from __future__ import annotations

import re
from typing import Optional

import html2text


# --------------------------------------------------------------------------- #
# html2text consumer-grade config
# --------------------------------------------------------------------------- #
def _make_h2t() -> html2text.HTML2Text:
    h = html2text.HTML2Text()
    h.body_width = 0          # no wrapping — preserve raw line lengths
    h.ignore_links = False    # keep links
    h.ignore_images = False   # keep image alt text
    h.ignore_emphasis = False
    h.ignore_tables = False
    h.unicode_snob = False
    h.skip_internal_links = True
    h.inline_links = True     # [text](url) style
    h.default_image_alt = "image"
    return h


# --------------------------------------------------------------------------- #
# Public API
# --------------------------------------------------------------------------- #
def html_to_markdown(raw_html: str) -> str:
    """
    Convert raw HTML to clean Markdown using html2text.

    Raises TypeError if input is not a string.
    Returns empty string for empty/whitespace-only input.
    """
    if not isinstance(raw_html, str):
        raise TypeError(
            f"html_to_markdown expects str, got {type(raw_html).__name__}"
        )
    if not raw_html.strip():
        return ""

    h = _make_h2t()
    try:
        markdown = h.handle(raw_html)
    except Exception:
        # html2text is forgiving but can still raise on truly pathological input
        return ""

    # Normalize: collapse >2 consecutive blank lines, strip trailing ws
    lines = [ln.rstrip() for ln in markdown.splitlines()]
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


def normalize_text(text: str) -> str:
    """
    Fallback text normalization: strip all HTML tags and collapse whitespace.
    Used when HTML parsing fails or input is not HTML.
    """
    if not isinstance(text, str):
        raise TypeError(f"normalize_text expects str, got {type(text).__name__}")
    stripped = re.sub(r"<[^>]+>", "", text)
    stripped = re.sub(r"[ \t]+", " ", stripped)
    stripped = re.sub(r"\n{3,}", "\n\n", stripped).strip()
    return stripped
