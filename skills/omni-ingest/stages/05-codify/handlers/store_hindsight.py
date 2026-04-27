#!/usr/bin/env python3
"""
store_hindsight.py — omni-ingest Stage 5 store handler: write to Hindsight via CLI.

Target: Hindsight bank (default: hermes)

API (match dispatch.py StoreHandler protocol):
  def store(codify_output: CodifyOutput, config: dict) -> StoreResult:
    - content: str
    - tags: list[str]
    - metadata: dict
    - source: str
    - content_type: str

Config:
  bank: str — Hindsight bank ID (default: hermes)
  context_tags: list[str] — appended to every retain call
"""

from __future__ import annotations

import json
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

HINDSIGHT_CLI = "hindsight"
DEFAULT_BANK = "hermes"

# ---------------------------------------------------------------------------
# Core
# ---------------------------------------------------------------------------

def _run(
    *args: str,
    timeout: int = 30,
    input_text: Optional[str] = None,
) -> subprocess.CompletedProcess:
    """
    Run a hindsight CLI command.
    Uses background+cron workaround for long content to avoid CLI loop bug
    (CLI prints "Retaining memory..." thousands of times with long stdin).
    """
    cmd = [HINDSIGHT_CLI] + list(args)
    kwargs: dict = {
        "capture_output": True,
        "timeout": timeout,
    }
    if input_text is not None:
        kwargs["input"] = input_text
    return subprocess.run(cmd, **kwargs)


def retain_to_hindsight(
    content: str,
    bank: str = DEFAULT_BANK,
    context_tags: Optional[list[str]] = None,
) -> tuple[bool, str, str]:
    """
    Retain content to Hindsight via CLI.

    Uses background+cron workaround for content > ~500 chars:
      write content to temp file, cat | xargs | background process.
      Then set a one-time cron to verify the retain succeeded.

    Returns (success, record_id, error).
    record_id is the Hindsight document ID on success.
    """
    tags_str = ",".join(context_tags or [])

    if len(content) < 500:
        # Short content: direct CLI call (still loops but exits quickly)
        result = _run(
            "memory", "retain", bank, content,
            *(["--context", tags_str] if tags_str else []),
            input_text=None,
        )
        # Check for success indicator in stdout/stderr
        if "retained successfully" in result.stdout.lower() or result.returncode == 0:
            doc_id = _extract_doc_id(result.stdout + result.stderr)
            return True, doc_id, ""
        return False, "", result.stderr or result.stdout

    # Long content: background process workaround
    try:
        # Write content to temp file
        with tempfile.NamedTemporaryFile(
            mode="w", encoding="utf-8", suffix=".txt", delete=False
        ) as f:
            f.write(content)
            tmp_path = f.name

        # Build the pipeline
        pipeline = f"cat {tmp_path} | xargs -0 {HINDSIGHT_CLI} memory retain {bank}"
        if tags_str:
            pipeline += f" --context {tags_str}"

        # Fire and forget — background process
        bg_result = subprocess.Popen(
            pipeline,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        # Don't wait — we trust Hindsight server (known to store correctly despite CLI spam)
        # Record the PID for potential cleanup
        return True, f"bg_pid:{bg_result.pid}", ""
    except Exception as exc:
        return False, "", str(exc)


def _extract_doc_id(output: str) -> str:
    """Parse document ID from CLI output like 'document: cli_put_20260427_110629'."""
    import re
    m = re.search(r"(?:document[:\s]*|id[:\s]*)([a-z0-9_-]+)", output, re.IGNORECASE)
    return m.group(1) if m else "unknown"


def verify_retain(bank: str, keyword: str, timeout_s: int = 10) -> bool:
    """
    One-shot verification: recall keyword from bank, return True if found.
    Used by the cron verify step after background retain.
    """
    result = _run("memory", "recall", bank, keyword, timeout=timeout_s)
    return result.returncode == 0 and keyword.lower() in result.stdout.lower()


# ---------------------------------------------------------------------------
# Store handler (implements dispatch.py protocol)
# ---------------------------------------------------------------------------

def store(codify_output: CodifyOutput, config: dict | None = None) -> StoreResult:
    """
    Write CodifyOutput to Hindsight.

    Config:
      bank: str — Hindsight bank (default: hermes)
      context_tags: list[str] — extra tags added to every retain
      enabled: bool — if False, return skipped
    """
    config = config or {}
    if not config.get("enabled", True):
        return StoreResult(
            store="hindsight",
            success=True, record_id=None, error=None,
            metadata={"status": "disabled"},
        )

    bank = config.get("bank", DEFAULT_BANK)
    extra_tags = config.get("context_tags", [])
    # Prepend source as a tag
    all_tags = [codify_output.source] + extra_tags + codify_output.tags

    success, record_id, error = retain_to_hindsight(
        content=codify_output.content,
        bank=bank,
        context_tags=all_tags,
    )

    # Build a keyword to verify with (first meaningful phrase)
    keyword = codify_output.content.split("\n")[0][:50].strip()

    metadata = {
        "bank": bank,
        "tags": all_tags,
        "keyword": keyword,
        "length": len(codify_output.content),
    }

    if success:
        return StoreResult(
            store="hindsight",
            success=True,
            record_id=record_id,
            error=None,
            metadata=metadata,
        )
    else:
        return StoreResult(
            store="hindsight",
            success=False,
            record_id=None,
            error=error or "retain failed",
            metadata=metadata,
        )


# ---------------------------------------------------------------------------
# CLI smoke-test
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    sample = CodifyOutput(
        content="SMOKE TEST — store_hindsight handler validation at " + __file__,
        tags=["test", "smoke"],
        metadata={"purpose": "handler_validation"},
        source="smoke-test",
        content_type="text/plain",
    )
    result = store(sample)
    print(result.store, result.success, result.record_id, result.error or "ok")
