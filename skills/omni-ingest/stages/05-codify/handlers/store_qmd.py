#!/usr/bin/env python3
"""
store_qmd.py — omni-ingest Stage 5 store handler: write to QMD (local markdown index).

Target: qmd CLI — qmd index updated in-place.

API (match dispatch.py StoreHandler protocol):
  def store(codify_output: CodifyOutput, config: dict) -> StoreResult:

Config:
  collection: str — QMD collection name to write to (default: "hermes-memory")
  index_cmd: str — override the qmd binary path (default: find via shutil.which)
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

# ---------------------------------------------------------------------------
# Protocol types
# ---------------------------------------------------------------------------

@dataclass
class CodifyOutput:
    content: str
    tags: list[str]
    metadata: dict
    source: str
    content_type: str

@dataclass
class StoreResult:
    store: str
    success: bool
    record_id: str | None
    error: str | None
    metadata: dict

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

QMD_CLI = None  # resolved at runtime
DEFAULT_COLLECTION = "hermes-memory"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _find_qmd() -> Optional[str]:
    """Locate qmd binary, or None if not on PATH."""
    return shutil.which("qmd")

def _slugify(text: str, max_len: int = 60) -> str:
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[_\s]+", "-", text.strip())
    return text[:max_len].strip("-")

# ---------------------------------------------------------------------------
# Core — write a temp .md file, ingest via qmd CLI
# ---------------------------------------------------------------------------

def ingest_to_qmd(
    content: str,
    tags: list[str],
    source: str,
    collection: str = DEFAULT_COLLECTION,
) -> tuple[bool, str, str]:
    """
    Write content as a temp .md file and ingest to QMD via:
        qmd ingest --stdin --collection {collection} --tag {tag1} --tag {tag2}
    qmd listens on stdin for content, with --collection and --tag flags.

    Returns (success, record_id, error).
    record_id is the temp filename we wrote.
    """
    qmd = _find_qmd()
    if qmd is None:
        return False, "", "qmd binary not found on PATH"

    # Build a slug for the temp file (record_id proxy)
    slug = _slugify(content, max_len=50)
    record_id = f"{slug}"

    try:
        with tempfile.NamedTemporaryFile(
            mode="w", encoding="utf-8",
            suffix=".md", delete=False,
        ) as f:
            # Write content with tags as YAML frontmatter so QMD can index them
            frontmatter = "---\n"
            frontmatter += f"source: {source}\n"
            frontmatter += f"tags: [{', '.join(tags)}]\n"
            frontmatter += "---\n\n"
            f.write(frontmatter + content)
            tmp_path = f.name

        cmd = [qmd, "ingest", "--collection", collection]
        for t in tags:
            cmd += ["--tag", t]

        with open(tmp_path, "rb") as fh:
            result = subprocess.run(
                cmd,
                stdin=fh,
                capture_output=True,
                timeout=60,
            )

        # Clean up temp file
        Path(tmp_path).unlink(missing_ok=True)

        if result.returncode == 0:
            return True, record_id, ""
        return False, "", (result.stderr or result.stdout).strip()[:200]
    except subprocess.TimeoutExpired:
        return False, record_id, "qmd ingest timed out (>60s)"
    except Exception as exc:
        return False, "", str(exc)

# ---------------------------------------------------------------------------
# Store handler (implements dispatch.py protocol)
# ---------------------------------------------------------------------------

def store(codify_output: CodifyOutput, config: dict | None = None) -> StoreResult:
    """
    Write CodifyOutput to QMD index.

    Config:
      collection: str — QMD collection (default: hermes-memory)
      enabled: bool — if False, return skipped
    """
    config = config or {}
    if not config.get("enabled", True):
        return StoreResult(
            store="qmd",
            success=True, record_id=None, error=None,
            metadata={"status": "disabled"},
        )

    collection = config.get("collection", DEFAULT_COLLECTION)

    success, record_id, error = ingest_to_qmd(
        content=codify_output.content,
        tags=codify_output.tags,
        source=codify_output.source,
        collection=collection,
    )

    return StoreResult(
        store="qmd",
        success=success,
        record_id=record_id or None,
        error=error or None,
        metadata={
            "collection": collection,
            "content_length": len(codify_output.content),
            "tag_count": len(codify_output.tags),
        },
    )


# ---------------------------------------------------------------------------
# CLI smoke-test
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    sample = CodifyOutput(
        content="SMOKE TEST — store_qmd handler validation.",
        tags=["test", "smoke"],
        metadata={"purpose": "handler_validation"},
        source="smoke-test",
        content_type="text/plain",
    )
    result = store(sample)
    print(result.store, result.success, result.record_id, result.error or "ok")
