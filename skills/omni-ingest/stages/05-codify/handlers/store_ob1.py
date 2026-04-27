#!/usr/bin/env python3
"""
store_ob1.py — omni-ingest Stage 5 store handler: write to OpenBrain OB1 via MCP.

Target: OB1 MCP endpoint (Supabase Edge Function — curl over SSE)

API (match dispatch.py StoreHandler protocol):
  def store(codify_output: CodifyOutput, config: dict) -> StoreResult:

Config:
  ob1_url: str — OB1 MCP endpoint URL
              (env: OB1_MCP_URL; default: https://fqdshevycyscugjichjb.supabase.co/functions/v1/open-brain-mcp)
  enabled: bool — if False, return skipped
"""

from __future__ import annotations

import json
import os
import re
import subprocess
from dataclasses import dataclass
from datetime import datetime, timezone
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

DEFAULT_OB1_URL = os.getenv(
    "OB1_MCP_URL",
    "https://fqdshevycyscugjichjb.supabase.co/functions/v1/open-brain-mcp",
)

# ---------------------------------------------------------------------------
# Core
# ---------------------------------------------------------------------------

def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()

def call_ob1(method: str, args: dict, ob1_url: str | None = None) -> dict:
    """
    Call an OB1 MCP method via curl SSE.

    OB1 uses JSON-RPC 2.0 over HTTP with SSE responses:
      POST → event: message data: {json}

    Returns parsed result dict, or {"error": ...} on failure.
    """
    url = ob1_url or DEFAULT_OB1_URL
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": {"name": method, "arguments": args},
    }

    try:
        result = subprocess.run(
            [
                "curl", "--max-time", "20", "-sS",
                url,
                "-H", "content-type: application/json",
                "-d", json.dumps(payload),
            ],
            capture_output=True,
            text=True,
            timeout=25,
        )

        if result.returncode != 0:
            return {"error": f"curl failed: {result.stderr}"}

        # Parse SSE format: "event: message data: {JSON}"
        output = result.stdout.strip()
        m = re.search(r"data:\s*(\{.*\})", output, re.DOTALL)
        if not m:
            return {"error": f"Could not parse OB1 response: {output[:200]}"}

        parsed = json.loads(m.group(1))
        # Unwrap MCP result envelope if present, so callers get the
        # actual data object directly regardless of nesting depth.
        result = parsed.get("result", parsed)
        if isinstance(result, dict) and "result" in result:
            result = result["result"]
        return result

    except json.JSONDecodeError as exc:
        return {"error": f"JSON parse error: {exc}"}
    except Exception as exc:
        return {"error": str(exc)}


def ingest_to_ob1(
    content: str,
    metadata: dict,
    ob1_url: str | None = None,
) -> tuple[bool, str, str]:
    """
    Capture a thought to OB1 via capture_thought.

    Returns (success, record_id, error).
    record_id is the OB1 thought ID from the response.
    """
    args = {
        "content": content,
        "metadata": {
            "source": metadata.get("source", "omni-ingest"),
            "tags": metadata.get("tags", []),
            "content_type": metadata.get("content_type", "text/plain"),
            "ingested_at": utc_now(),
            **metadata,
        },
    }

    result = call_ob1("capture_thought", args, ob1_url)

    if "error" in result:
        return False, "", str(result["error"])

    # OB1 returns the captured thought object; use its id as record_id.
    # Support flat response, nested MCP envelope {result: {data: {id}}},
    # and nested thought {result: {id}} shapes.
    thought_id = (
        result.get("id")
        or result.get("thought_id")
        or result.get("data", {}).get("id")
        or (result.get("result", {}).get("data", {}).get("id"))
        or (result.get("result", {}).get("id"))
        or "unknown"
    )
    return True, str(thought_id), ""


# ---------------------------------------------------------------------------
# Store handler (implements dispatch.py protocol)
# ---------------------------------------------------------------------------

def store(codify_output: CodifyOutput, config: dict | None = None) -> StoreResult:
    """
    Write CodifyOutput to OpenBrain OB1.

    Config:
      ob1_url: str — override default OB1 endpoint
      enabled: bool — if False, return skipped
    """
    config = config or {}
    if not config.get("enabled", True):
        return StoreResult(
            store="openbrain_ob1",
            success=True, record_id=None, error=None,
            metadata={"status": "disabled"},
        )

    ob1_url = config.get("ob1_url") or DEFAULT_OB1_URL

    success, record_id, error = ingest_to_ob1(
        content=codify_output.content,
        metadata={
            "source": codify_output.source,
            "tags": codify_output.tags,
            "content_type": codify_output.content_type,
            **codify_output.metadata,
        },
        ob1_url=ob1_url,
    )

    return StoreResult(
        store="openbrain_ob1",
        success=success,
        record_id=record_id or None,
        error=error or None,
        metadata={
            "ob1_url": ob1_url,
            "content_length": len(codify_output.content),
            "tag_count": len(codify_output.tags),
        },
    )


# ---------------------------------------------------------------------------
# CLI smoke-test
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    sample = CodifyOutput(
        content="SMOKE TEST — store_ob1 handler validation.",
        tags=["test", "smoke"],
        metadata={"purpose": "handler_validation"},
        source="smoke-test",
        content_type="text/plain",
    )
    result = store(sample)
    print(result.store, result.success, result.record_id, result.error or "ok")
