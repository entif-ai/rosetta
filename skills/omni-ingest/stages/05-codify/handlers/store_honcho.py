#!/usr/bin/env python3
"""
store_honcho.py — omni-ingest Stage 5 store handler: write to Honcho memory via CLI.

Target: honcho CLI → Docker API (localhost:8000)

API (match dispatch.py StoreHandler protocol):
  def store(codify_output: CodifyOutput, config: dict) -> StoreResult:

Config:
  workspace: str — Honcho workspace name (default: hermes)
  enabled: bool — if False, return skipped
  mode: str — "cli" (default, uses honcho ingest --stdin) or "http" (direct REST)
  api_url: str — override for http mode (default: http://localhost:8000/v3)
"""

from __future__ import annotations

import json
import shutil
import subprocess
import tempfile
import urllib.error
import urllib.request
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

DEFAULT_WORKSPACE = "hermes"
HONCHO_CLI = None  # resolved lazily

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _find_honcho() -> Optional[str]:
    """Find honcho CLI (procfile manager, NOT the memory layer)."""
    return shutil.which("honcho")

# ---------------------------------------------------------------------------
# Core — two ingestion paths
# ---------------------------------------------------------------------------

def ingest_via_cli(
    content: str,
    tags: list[str],
    workspace: str = DEFAULT_WORKSPACE,
) -> tuple[bool, str, str]:
    """
    Pipe content to `honcho ingest --stdin --workspace {ws} --tag {t}`.

    The memory-layer honcho CLI accepts ingest via --stdin.
    Falls back gracefully if the command is not available.

    Returns (success, record_id, error).
    """
    honcho = _find_honcho()
    if honcho is None:
        return False, "", "honcho CLI not found on PATH"

    try:
        cmd = [
            honcho, "ingest",
            "--stdin",
            "--workspace", workspace,
        ] + [f"--tag={t}" for t in tags]

        result = subprocess.run(
            cmd,
            input=content.encode("utf-8"),
            capture_output=True,
            timeout=30,
        )
        if result.returncode == 0:
            return True, f"honcho-cli:{workspace}", ""
        # Non-zero exit — check stderr for diagnostics
        err = (result.stderr or result.stdout).decode("utf-8", errors="replace").strip()[:200]
        return False, "", err or f"honcho ingest failed (exit {result.returncode})"
    except subprocess.TimeoutExpired:
        return False, "", "honcho ingest timed out (>30s)"
    except Exception as exc:
        return False, "", str(exc)


def ingest_via_http(
    content: str,
    tags: list[str],
    workspace: str = DEFAULT_WORKSPACE,
    api_url: str = "http://localhost:8000/v3",
) -> tuple[bool, str, str]:
    """
    POST content directly to Honcho REST API.

    Uses the messages endpoint:
      POST /v3/workspaces/{workspace}/sessions/{session}/messages

    Falls back gracefully if auth fails or API unreachable.

    Returns (success, record_id, error).
    """
    import urllib.request
    import urllib.error
    # Create or get the agent's session in the workspace
    # Use a fixed session name for bulk ingest (omni-ingest-producer)
    session_id = "omni-ingest-session"

    url = f"{api_url}/workspaces/{workspace}/sessions/{session_id}/messages"
    payload = {
        "content": content,
        "sender": {"name": "omni-ingest", "role": "agent"},
        "tags": tags,
    }

    try:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            url,
            data=data,
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            if resp.status in (200, 201):
                parsed = json.loads(body)
                msg_id = parsed.get("id", "unknown")
                return True, f"http:{msg_id}", ""
            return False, "", f"HTTP {resp.status}: {body[:200]}"
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")[:200]
        return False, "", f"HTTP {exc.code}: {body}"
    except urllib.error.URLError as exc:
        return False, "", f"connection error: {exc.reason}"
    except Exception as exc:
        return False, "", str(exc)


# ---------------------------------------------------------------------------
# Store handler (implements dispatch.py protocol)
# ---------------------------------------------------------------------------

def store(codify_output: CodifyOutput, config: dict | None = None) -> StoreResult:
    """
    Write CodifyOutput to Honcho memory.

    Config:
      workspace: str — Honcho workspace name (default: hermes)
      mode: str — "cli" (default) or "http"
      api_url: str — override for http mode
      enabled: bool — if False, return skipped
    """
    config = config or {}
    if not config.get("enabled", True):
        return StoreResult(
            store="honcho",
            success=True, record_id=None, error=None,
            metadata={"status": "disabled"},
        )

    workspace = config.get("workspace", DEFAULT_WORKSPACE)
    mode = config.get("mode", "cli")
    api_url = config.get("api_url", "http://localhost:8000/v3")

    tags = [codify_output.source] + list(codify_output.tags)

    if mode == "http":
        success, record_id, error = ingest_via_http(
            content=codify_output.content,
            tags=tags,
            workspace=workspace,
            api_url=api_url,
        )
    else:
        success, record_id, error = ingest_via_cli(
            content=codify_output.content,
            tags=tags,
            workspace=workspace,
        )

    return StoreResult(
        store="honcho",
        success=success,
        record_id=record_id or None,
        error=error or None,
        metadata={
            "workspace": workspace,
            "mode": mode,
            "content_length": len(codify_output.content),
            "tag_count": len(tags),
        },
    )


# ---------------------------------------------------------------------------
# CLI smoke-test
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    sample = CodifyOutput(
        content="SMOKE TEST — store_honcho handler validation.",
        tags=["test", "smoke"],
        metadata={"purpose": "handler_validation"},
        source="smoke-test",
        content_type="text/plain",
    )
    result = store(sample)
    print(result.store, result.success, result.record_id, result.error or "ok")
