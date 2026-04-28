"""
normalize_rss.py — omni-ingest Stage 2 normalizer: RSS/Atom feed → Markdown.

Parses an RSS or Atom feed and converts each entry to structured Markdown
with a metadata header.

API:
  def normalize_rss(
      feed_url: str,
      workflow_id: str,
      max_entries: int = 100,
  ) -> tuple[str, dict]:
      # Returns (markdown_content, meta_dict)
      # feed_url can also be raw XML bytes for testing

Run: python -m pytest tests/test_normalize_rss.py -v
"""

from __future__ import annotations

import feedparser
import html2text
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

# Resolve relative to this file's location
_SKILL_ROOT = Path(__file__).parent.parent.parent
_BUS_DIR = _SKILL_ROOT / "bus"


def _html_to_text(html: str) -> str:
    """Convert HTML to clean text using html2text."""
    h = html2text.HTML2Text()
    h.body_width = 0
    h.ignore_links = False
    h.ignore_images = True
    return h.handle(html)


def _get_entry_text(entry) -> tuple[str, str, str, str]:
    """
    Extract (title, link, description, author) from a feedparser entry.

    Handles RSS 2.0, Atom, and JSON Feed variants.
    """
    title = getattr(entry, "title", "") or ""
    link = getattr(entry, "link", "") or ""

    # Atom: entry.links may have href
    if not link:
        for lnk in getattr(entry, "links", []):
            if lnk.get("rel") == "alternate" or not lnk.get("rel"):
                link = lnk.get("href", "")
                break

    description = getattr(entry, "description", "") or ""
    if not description:
        description = getattr(entry, "summary", "") or ""
    if not description:
        content_list = getattr(entry, "content", [])
        if content_list:
            description = content_list[0].get("value", "") or ""

    author = ""
    # RSS-style author
    author = getattr(entry, "author", "") or ""
    # Atom author
    if not author:
        atom_authors = getattr(entry, "authors", [])
        if atom_authors:
            author = atom_authors[0].get("name", "") or ""
    if not author:
        author = getattr(entry, "author_detail", {}).get("name", "") or ""

    return title, link, description, author


def _entry_to_markdown(
    entry_num: int,
    title: str,
    link: str,
    description: str,
    author: str,
    published: str,
) -> str:
    """Format a single feed entry as Markdown."""
    desc_html = _html_to_text(description or "")
    desc_html = re.sub(r"\n{3,}", "\n\n", desc_html).strip()

    lines = [
        f"## [{entry_num}] {title}",
        "",
        f"**Published:** {published}",
        f"**Author:** {author}",
        f"**Link:** {link}",
        "",
        desc_html,
    ]
    return "\n".join(lines) + "\n"


def normalize_rss(
    feed_url: str,
    workflow_id: str,
    max_entries: int = 100,
) -> tuple[str, dict]:
    """
    Fetch and normalize an RSS/Atom feed.

    Parameters
    ----------
    feed_url : str
        Feed URL or raw XML bytes.
    workflow_id : str
        Workflow identifier.
    max_entries : int
        Maximum number of entries to process (oldest first). Default 100.

    Returns
    -------
    (markdown_content, meta_dict) tuple.

    Raises
    ------
    ValueError
        If the feed cannot be fetched or parsed.
    """
    if not feed_url:
        raise ValueError("feed_url must be non-empty")

    # Allow raw XML bytes for testing
    if isinstance(feed_url, bytes):
        feed = feedparser.parse(feed_url.decode("utf-8", errors="replace"))
    else:
        feed = feedparser.parse(feed_url)

    if feed.bozo and not feed.entries:
        raise ValueError(f"failed to parse feed: {feed.bozo_exception}")

    feed_title = feed.feed.get("title", "") or "Untitled Feed"
    feed_link = feed.feed.get("link", "") or ""
    feed_description = feed.feed.get("description", "") or ""

    entries_md: list[str] = []
    entry_count = 0

    for i, entry in enumerate(feed.entries[:max_entries]):
        title, link, description, author = _get_entry_text(entry)
        published = getattr(entry, "published", "") or getattr(entry, "updated", "") or ""

        entries_md.append(
            _entry_to_markdown(i + 1, title, link, description, author, published)
        )
        entry_count += 1

    header = [
        f"# {feed_title}",
        "",
        f"**URL:** {feed_link}",
        f"**Description:** {feed_description}",
        f"**Entries:** {entry_count}",
        "",
        "---",
        "",
    ]

    full_content = "\n".join(header) + "\n".join(entries_md)

    meta = {
        "originalFilename": feed_url[:200] if len(feed_url) > 200 else feed_url,
        "mimeType": "application/rss+xml",
        "normalizedMimeType": "text/markdown",
        "feedTitle": feed_title,
        "feedUrl": feed_link,
        "entryCount": entry_count,
        "normalizedAt": datetime.now(timezone.utc).isoformat(),
        "lineCount": len(full_content.splitlines()),
        "wordCount": len(full_content.split()),
    }

    # Write bus files
    content_path = _BUS_DIR / f"content.{workflow_id}.md"
    meta_path = _BUS_DIR / f"content.{workflow_id}.meta.json"
    content_path.parent.mkdir(parents=True, exist_ok=True)
    content_path.write_text(full_content, encoding="utf-8")
    meta_path.write_text(json.dumps(meta, indent=2), encoding="utf-8")

    return full_content, meta


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python normalize_rss.py <feed_url> <workflow_id>")
        sys.exit(1)
    url, workflow_id = sys.argv[1], sys.argv[2]
    content, meta = normalize_rss(url, workflow_id)
    print(f"Normalized {meta['entryCount']} entries from {meta['feedTitle']}")
