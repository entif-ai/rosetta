#!/usr/bin/env python3
"""
store_markdown.py — omni-ingest Stage 5 store handler: write to Markdown files.

Target: ~/.hermes/memory/YYYY-MM-DD/{source}/slug.md

Each record gets:
  - Frontmatter: source, tags, content_type, ingested_at, content_hash
  - Body: the cleaned content
  - Idempotent via content_hash in frontmatter (skip if already written)

API (match dispatch.py StoreHandler protocol):
  def store(codify_output: CodifyOutput, config: dict) -> StoreResult:
    - content: str
    - tags: list[str]
    - metadata: dict
    - source: str  (e.g. "email", "document", "chat", "web")
    - content_type: str  (e.g. "text/plain", "text/markdown")
"""

from __future__ import annotations

import hashlib
import re
import textwrap
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Protocol types (must match dispatch.py)
# ---------------------------------------------------------------------------

@dataclass
class CodifyOutput:
    """Output from Stage 4 classify-mine."""
    content: str
    tags: list[str]
    metadata: dict
    source: str
    content_type: str

@dataclass
class StoreResult:
    """Result returned by every store handler."""
    store: str
    success: bool
    record_id: str | None
    error: str | None
    metadata: dict

# ---------------------------------------------------------------------------
# Disk layout root
# ---------------------------------------------------------------------------

HERMES_ROOT = Path.home() / ".hermes"
MEMORY_ROOT = HERMES_ROOT / "memory"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()

def slugify(text: str, max_len: int = 60) -> str:
    """Make a URL-safe filename slug from content."""
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[_\s]+", "-", text.strip())
    return text[:max_len].strip("-")

def content_hash(content: str) -> str:
    """Stable SHA-256 content fingerprint (first 16 hex chars)."""
    return hashlib.sha256(content.encode("utf-8")).hexdigest()[:16]

def _ensure_dir(path: Path) -> None:
    MEMORY_ROOT.mkdir(parents=True, exist_ok=True)
    path.parent.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# Core storage logic (pure — no network, no subprocess)
# ---------------------------------------------------------------------------

def write_memory_file(
    content: str,
    source: str,
    tags: list[str],
    metadata: dict,
    content_type: str = "text/plain",
) -> tuple[Path, str]:
    """
    Write one memory record as a Markdown file.

    Layout: memory/YYYY-MM-DD/{source}/YYYYMMDD-HHMMSS-{slug}.md

    Returns (path, record_id).
    Raises FileExistsError only if the file already exists with the same hash
    (idempotent guard).
    """
    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%d")
    timestamp_str = now.strftime("%Y%m%d-%H%M%S")
    slug = slugify(content, max_len=55)
    chash = content_hash(content)
    record_id = f"{timestamp_str}-{chash}"

    source_dir = MEMORY_ROOT / date_str / (source or "unknown")
    filename = f"{timestamp_str}-{slug}-{chash}.md"
    file_path = source_dir / filename

    _ensure_dir(file_path)

    # Idempotent guard — skip if a file with the same hash already exists
    # in this source dir (checked via frontmatter).
    if file_path.exists():
        existing = file_path.read_text(encoding="utf-8")
        if chash in existing:
            return file_path, record_id  # already stored

    # Build frontmatter
    frontmatter_lines = [
        "---",
        f"source: {source}",
        f"content_type: {content_type}",
        f"tags: [{', '.join(tags)}]",
        f"ingested_at: {utc_now()}",
        f"record_id: {record_id}",
        f"content_hash: {chash}",
    ]
    if metadata:
        for k, v in metadata.items():
            key = re.sub(r"[^\w]", "_", k)
            val = str(v).replace("\n", " ")[:200]
            frontmatter_lines.append(f"{key}: {val}")
    frontmatter_lines.append("---\n")

    file_body = "\n".join(frontmatter_lines) + content.rstrip() + "\n"
    file_path.write_text(file_body, encoding="utf-8")
    return file_path, record_id

# ---------------------------------------------------------------------------
# Store handler (implements dispatch.py protocol)
# ---------------------------------------------------------------------------

def store(codify_output: CodifyOutput, config: dict | None = None) -> StoreResult:
    """
    Write CodifyOutput to Markdown files in ~/.hermes/memory/.

    Config (optional):
      enabled: bool — if False, return skipped
      subdir: str  — override default date-based subdir (e.g. "daily")
    """
    config = config or {}
    if not config.get("enabled", True):
        return StoreResult(
            store="markdown",
            success=True,
            record_id=None,
            error=None,
            metadata={"status": "disabled"},
        )

    try:
        # Default to 'source' field from codify_output as the subdir
        source = codify_output.source or config.get("subdir", "unknown")
        path, record_id = write_memory_file(
            content=codify_output.content,
            source=source,
            tags=codify_output.tags,
            metadata=codify_output.metadata,
            content_type=codify_output.content_type,
        )
        return StoreResult(
            store="markdown",
            success=True,
            record_id=record_id,
            error=None,
            metadata={
                "status": "written",
                "path": str(path),
                "size_bytes": path.stat().st_size,
                "tag_count": len(codify_output.tags),
            },
        )
    except Exception as exc:
        return StoreResult(
            store="markdown",
            success=False,
            record_id=None,
            error=str(exc),
            metadata={},
        )

# ---------------------------------------------------------------------------
# CLI smoke-test
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    sample = CodifyOutput(
        content="This is a test memory entry for smoke-validation.",
        tags=["test", "smoke"],
        metadata={"purpose": "handler_validation"},
        source="smoke-test",
        content_type="text/plain",
    )
    result = store(sample)
    print(result.store, result.success, result.record_id, result.error or "ok")
