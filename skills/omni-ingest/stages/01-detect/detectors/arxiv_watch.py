"""
arxiv_watch.py — omni-ingest Stage 1 detector: arXiv RSS/API watcher.

Polls an arXiv RSS feed or queries the arXiv API for new papers,
extracts abstracts, and emits workflow manifests via user_submit.detect().

API:
  class ArxivWatcher(state_dir=None, feed_url=None, poll_interval=3600)
         poll()         — fetch new papers since last_seen, yield manifests
         last_seen_id    — property: most recently processed arXiv ID
         mark_seen(id)   — record an arXiv ID as processed

  def _fetch_paper(watcher, arxiv_id) -> dict  — fetch + normalize one paper

Bus writes (via user_submit.detect):
  bus/content.<workflow_id>.md
  bus/content.<workflow_id>.meta.json
  bus/queue.01.<workflow_id>.jsonl
  ledger/<workflow_id>.jsonl
"""

from __future__ import annotations

import feedparser
import json
import re
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

import requests

# Resolve relative to this file's location.
# For files in stages/01-detect/detectors/ we need 4 .parent calls to reach the
# omni-ingest root. For files in stages/01-detect/normalizers/ also 4 levels.
_SKILL_ROOT = Path(__file__).parent.parent.parent.parent
# Import user_submit by direct path exec — avoids digit-prefix package issues
_user_submit_path = _SKILL_ROOT / "stages" / "01-detect" / "detectors" / "user_submit.py"
_ns_user_submit: dict = {"__file__": str(_user_submit_path)}
exec(_user_submit_path.read_text(encoding="utf-8"), _ns_user_submit)
user_submit = _ns_user_submit

_ARXIV_ABSTRACT_URL = "https://export.arxiv.org/abs/{arxiv_id}"
_ARXIV_PDF_URL = "https://arxiv.org/pdf/{arxiv_id}.pdf"
_DEFAULT_FEED = "https://export.arxiv.org/rss/cs.AI?max_results=50"
_STATE_FILE = "last_arxiv_id.txt"


def _normalize_arxiv_id(raw: str) -> str:
    """Extract canonical arXiv ID from various input formats."""
    raw = raw.strip()
    # Strip URL prefix
    raw = re.sub(r"https?://arxiv\.org/(abs|pdf)/", "", raw)
    # Strip .pdf suffix
    raw = re.sub(r"\.pdf$", "", raw, flags=re.IGNORECASE)
    # Strip version suffix if user wants latest
    return raw


def _fetch_arxiv_abstract(arxiv_id: str) -> dict:
    """
    Fetch the abstract page for an arXiv paper and extract metadata.

    Returns dict with: title, authors, abstract, categories, submitted_date
    Raises RuntimeError on HTTP failure.
    """
    url = _ARXIV_ABSTRACT_URL.format(arxiv_id=arxiv_id)
    resp = requests.get(url, timeout=30)
    if resp.status_code == 404:
        raise RuntimeError(f"arXiv paper not found: {arxiv_id}")
    resp.raise_for_status()
    html = resp.text

    def _extract(name: str, default: str = "") -> str:
        m = re.search(rf'<meta name="{re.escape(name)}" content="([^"]*)"', html)
        return m.group(1).strip() if m else default

    def _extract_abstract() -> str:
        m = re.search(r'<blockquote class="abstract[^"]*">.*?<span class="descriptor">Abstract:</span>(.*?)</blockquote>', html, re.DOTALL)
        if not m:
            return ""
        text = m.group(1).strip()
        text = re.sub(r'\s+', ' ', text)
        return text

    title = _extract("citation_title", "Unknown Title")
    authors_raw = _extract("citation_author", "")
    # Multiple authors are separate meta tags — extract all
    authors = re.findall(r'<meta name="citation_author" content="([^"]*)"', html)
    if authors:
        authors_str = "; ".join(authors)
    else:
        authors_str = authors_raw
    abstract = _extract_abstract()
    categories = re.findall(r'<meta name="citation_arxiv_categories" content="([^"]*)"', html)
    submitted = _extract("citation_date", "")

    return {
        "title": title,
        "authors": authors_str,
        "abstract": abstract,
        "categories": categories,
        "submitted_date": submitted,
        "arxiv_url": url,
    }


def _paper_to_markdown(meta: dict, arxiv_id: str) -> str:
    """Format arXiv paper metadata as Markdown."""
    lines = [
        f"# {meta['title']}",
        "",
        f"**Authors:** {meta['authors']}",
        f"**arXiv ID:** {arxiv_id}",
        f"**Categories:** {', '.join(meta['categories'])}",
        f"**Submitted:** {meta['submitted_date']}",
        f"**URL:** {meta['arxiv_url']}",
        "",
        "## Abstract",
        "",
        meta["abstract"],
    ]
    return "\n".join(lines) + "\n"


def _paper_to_meta(meta: dict, arxiv_id: str, content_len: int) -> dict:
    """Build the contentMeta dict for a paper."""
    return {
        "originalFilename": f"{arxiv_id}.md",
        "mimeType": "text/markdown",
        "sizeBytes": content_len,
        "checksum": None,
    }


class ArxivWatcher:
    """
    Monitor an arXiv RSS feed for new papers.

    Parameters
    ----------
    state_dir : str | Path, optional
        Directory for persisting last_seen_id across runs.
    feed_url : str, optional
        RSS feed URL. Defaults to cs.AI papers.
    poll_interval : float
        Seconds between polls when poll() is called in a loop.
    """

    def __init__(
        self,
        state_dir: str | Path | None = None,
        feed_url: str | None = None,
        poll_interval: float = 3600.0,
    ):
        self._state_dir = Path(state_dir) if state_dir else _SKILL_ROOT / "state"
        self._state_dir.mkdir(parents=True, exist_ok=True)
        self._feed_url = feed_url or _DEFAULT_FEED
        self._poll_interval = poll_interval
        self._last_seen_id = self._load_last_seen()

    # --------------------------------------------------------------------------
    # Properties
    # --------------------------------------------------------------------------

    @property
    def feed_url(self) -> str:
        return self._feed_url

    @property
    def state_dir(self) -> str:
        return str(self._state_dir)

    @property
    def last_seen_id(self) -> str:
        return self._last_seen_id

    # --------------------------------------------------------------------------
    # Persistence
    # --------------------------------------------------------------------------

    def _state_path(self) -> Path:
        return self._state_dir / _STATE_FILE

    def _load_last_seen(self) -> str:
        p = self._state_path()
        if p.exists():
            return p.read_text().strip()
        return ""

    def mark_seen(self, arxiv_id: str) -> None:
        """Record an arXiv ID as processed; persists to disk."""
        self._last_seen_id = arxiv_id
        self._state_path().write_text(arxiv_id)

    # --------------------------------------------------------------------------
    # Poll
    # --------------------------------------------------------------------------

    def poll(self) -> list[dict]:
        """
        Fetch the RSS feed and return manifests for any new papers.

        Papers newer than last_seen_id are processed; the watcher state
        is updated to the newest ID found.
        """
        feed = feedparser.parse(self._feed_url)
        if not feed.entries:
            return []

        manifests = []
        newest_id = self._last_seen_id

        for entry in feed.entries:
            # Extract arXiv ID from entry.id (e.g. https://arxiv.org/abs/2301.00001)
            raw_id = getattr(entry, "id", "")
            arxiv_id = _normalize_arxiv_id(raw_id)
            if not arxiv_id:
                continue

            # Skip already-seen
            if self._last_seen_id and arxiv_id <= self._last_seen_id:
                continue

            try:
                paper_meta = _fetch_arxiv_abstract(arxiv_id)
                content = _paper_to_markdown(paper_meta, arxiv_id)
                meta = _paper_to_meta(paper_meta, arxiv_id, len(content.encode("utf-8")))
            except Exception as exc:
                # Network errors should not abort the poll
                continue

            # Write to bus via user_submit.detect()
            try:
                manifest = user_submit.detect(
                    content=content,
                    content_type_hint="text/markdown",
                    user_instructions=None,
                    original_filename=f"{arxiv_id}.md",
                    mtime=paper_meta.get("submitted_date"),
                )
            except Exception:
                continue

            manifests.append(manifest)
            newest_id = arxiv_id  # keep advancing

        if newest_id and newest_id != self._last_seen_id:
            self.mark_seen(newest_id)

        return manifests


# --------------------------------------------------------------------------
# CLI entry point
# --------------------------------------------------------------------------

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="arXiv RSS watcher")
    parser.add_argument("--state-dir", default=None)
    parser.add_argument("--feed-url", default=None)
    parser.add_argument("--once", action="store_true", help="Poll once and exit")
    args = parser.parse_args()

    w = ArxivWatcher(state_dir=args.state_dir, feed_url=args.feed_url)
    if args.once:
        results = w.poll()
        print(f"Processed {len(results)} new paper(s)")
    else:
        print(f"Watching {w.feed_url} — Ctrl-C to stop")
        while True:
            results = w.poll()
            if results:
                print(f"Processed {len(results)} new paper(s)")
            time.sleep(w._poll_interval)
