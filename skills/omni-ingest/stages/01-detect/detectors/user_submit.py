#!/usr/bin/env python3
"""
user_submit.py — omni-ingest Stage 1 detector: user-initiated content submission.

Accepts raw text content and emits a workflow manifest. This is the simplest
detector — it requires no external fetch, just a content payload.

API:
  def detect(
      content: str,
      content_type_hint: str | None = None,
      user_instructions: str | None = None,
      original_filename: str | None = None,
      mtime: str | None = None,
  ) -> dict:   # the manifest

Writes:
  bus/content.<workflow_id>.md          — raw content
  bus/content.<workflow_id>.meta.json    — content metadata
  bus/queue.01.<workflow_id>.jsonl     — Stage 1 ACK
  ledger/<workflow_id>.jsonl             — workflow ledger (Stage 1 entry)
"""

from __future__ import annotations

import hashlib
import json
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

# Resolve relative to this file's location
_SKILL_ROOT = Path(__file__).parent.parent.parent
_BUS_DIR = _SKILL_ROOT / "bus"
_LEDGER_DIR = _SKILL_ROOT / "ledger"

_TRIGGER_TYPE = "user_submit"


def _checksum(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()


def _write_bus_content(workflow_id: str, content: str,
                       content_type_hint: str | None,
                       original_filename: str | None = None,
                       mtime: str | None = None) -> dict:
    """
    Write content to bus/content.<workflow_id>.md and
    bus/content.<workflow_id>.meta.json.
    Returns the contentMeta dict (not yet written — caller finalizes).
    """
    content_path = _BUS_DIR / f"content.{workflow_id}.md"

    content_bytes = content.encode("utf-8")
    size_bytes = len(content_bytes)

    meta = {
        "originalFilename": original_filename,
        "mtime": mtime or datetime.now(timezone.utc).isoformat(),
        "mimeType": content_type_hint or "text/plain",
        "sizeBytes": size_bytes,
        "checksum": _checksum(content),
    }

    content_path.parent.mkdir(parents=True, exist_ok=True)
    content_path.write_text(content, encoding="utf-8")
    meta_path = _BUS_DIR / f"content.{workflow_id}.meta.json"
    meta_path.write_text(json.dumps(meta, indent=2), encoding="utf-8")

    return meta


def _init_ledger(workflow_id: str) -> None:
    """Initialize the per-workflow ledger with Stage 1 entry."""
    ledger_path = _LEDGER_DIR / f"{workflow_id}.jsonl"
    ledger_path.parent.mkdir(parents=True, exist_ok=True)
    now = datetime.now(timezone.utc).isoformat()
    entry = {
        "workflowId": workflow_id,
        "stage": "01-detect",
        "subAgentId": None,
        "status": "completed",
        "attempts": 1,
        "createdAt": now,
        "updatedAt": now,
        "outputRef": None,
    }
    with open(ledger_path, "a", encoding="utf-8") as fh:
        fh.write(json.dumps(entry, ensure_ascii=True) + "\n")


def _append_bus_ack(workflow_id: str, manifest: dict) -> Path:
    """Append Stage 1 ACK to the bus queue file."""
    bus_path = _BUS_DIR / f"queue.01.{workflow_id}.jsonl"
    bus_path.parent.mkdir(parents=True, exist_ok=True)
    ack = {
        "workflowId": workflow_id,
        "stage": "01-detect",
        "subAgentId": None,
        "status": "acknowledged",
        "outputRef": f"bus/content.{workflow_id}.md",
    }
    with open(bus_path, "a", encoding="utf-8") as fh:
        fh.write(json.dumps(ack, ensure_ascii=True) + "\n")
    return bus_path


def detect(
    content: str,
    content_type_hint: str | None = None,
    user_instructions: str | None = None,
    original_filename: str | None = None,
    mtime: str | None = None,
) -> dict:
    """
    Entry point for the user_submit detector.

    Generates a workflow manifest, writes content + metadata to the bus,
    initializes the ledger, and returns the manifest dict.

    Returns a manifest dict conforming to manifest.schema.json.
    """
    if not content or not content.strip():
        raise ValueError("content must be non-empty")

    workflow_id = str(uuid.uuid4())
    triggered_at = datetime.now(timezone.utc).isoformat()

    manifest = {
        "workflowId": workflow_id,
        "stage": "01-detect",
        "triggeredAt": triggered_at,
        "trigger": {
            "type": _TRIGGER_TYPE,
            "sourceRef": None,
            "contentTypeHint": content_type_hint,
            "userInstructions": user_instructions,
            "signature": None,
        },
        "contentMeta": {
            "originalFilename": original_filename,
            "mtime": mtime,
            "mimeType": content_type_hint or "text/plain",
            "sizeBytes": len(content.encode("utf-8")),
            "checksum": _checksum(content),
        },
        "retryCount": 0,
        "parentWorkflowId": None,
    }

    # Write content + metadata to bus
    content_meta = _write_bus_content(
        workflow_id, content, content_type_hint,
        original_filename=original_filename, mtime=mtime)
    manifest["contentMeta"] = content_meta

    # Initialize ledger
    _init_ledger(workflow_id)

    # Append Stage 1 ACK to bus
    _append_bus_ack(workflow_id, manifest)

    return manifest


# ---- CLI smoke test ----
if __name__ == "__main__":
    import sys

    # Read from stdin if no args
    if len(sys.argv) > 1:
        content = sys.argv[1]
    else:
        print("Usage: echo 'text' | python user_submit.py [text]", file=sys.stderr)
        print("  or: python user_submit.py 'text to ingest'", file=sys.stderr)
        sys.exit(0)

    manifest = detect(content, content_type_hint="text/plain",
                      user_instructions="smoke test")
    print(json.dumps(manifest, indent=2))
    print(f"\nContent written to: bus/content.{manifest['workflowId']}.md")
