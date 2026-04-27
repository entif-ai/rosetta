"""
stage_04_invoke.py — Stage 4: LLM-powered classify & mine invoker.

Architecture (matches document-factory pattern):
  1. Takes normalized+sanitized content, chunks it via chunker.chunk_text()
  2. Writes per-chunk payload JSON files to bus/
  3. Fires leaf sub-agents in parallel (max 3 at a time)
  4. Each sub-agent:
       - Reads its chunk payload file
       - Calls LLM API for structured extraction (entif.assimilation.packet fragment)
       - Writes result to bus/chunk.<workflow_id>.<chunk_id>.json
       - Prints 5-field summary to stdout
  5. Primary agent reads all chunk JSON files from disk
  6. Consolidates via chunker.consolidate_chunk_outputs()
  7. Writes bus/consolidated.<workflow_id>.json — the assimilation packet

Fault tolerance (document-factory anti-patterns):
  - Sub-agents write JSON to disk after each chunk (not CLI/Hindsight)
  - Sub-agents are leaf-only: cannot delegate further
  - If a sub-agent dies mid-flight, only its chunk is lost — completed chunks
    are already on disk and will be collected on the next run
  - Stage 5 fires when ALL chunks ACK OR retries exhausted (not 100% completion)
"""

from __future__ import annotations

import json
import subprocess
import time
import uuid
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

# Resolve relative to this file's location
_SKILL_ROOT = Path(__file__).parent.parent.parent
_BUS_DIR = _SKILL_ROOT / "bus"
_LEDGER_DIR = _SKILL_ROOT / "ledger"

# Import from sibling chunker module (same directory)
import sys
sys.path.insert(0, str(_SKILL_ROOT / "stages" / "04-classify-mine"))
from chunker import chunk_text, build_sub_agent_payload, consolidate_chunk_outputs

try:
    from hermes_agent import delegate_task  # noqa: F401
except ImportError:
    delegate_task = None  # Test environments without hermes_agent


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

MAX_CONCURRENT = 3          # document-factory: max 3 parallel sub-agents
CHUNK_TIMEOUT_SECONDS = 60  # per-chunk LLM call timeout


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------

@dataclass
class ChunkResult:
    chunk_id: str
    status: str           # "completed" | "failed" | "pending"
    output_ref: str | None
    error: str | None
    duration_ms: int | None
    chunk_index: int


@dataclass
class InvokeReport:
    workflow_id: str
    invoke_id: str
    total_chunks: int
    completed: int
    failed: int
    results: list[ChunkResult]
    consolidated_packet: dict | None
    duration_ms: int | None


# ---------------------------------------------------------------------------
# Sub-agent task builder
# ---------------------------------------------------------------------------

def _build_llm_payload(
    workflow_id: str,
    chunk_id: str,
    chunk_index: int,
    total_chunks: int,
    chunk_content: str,
    line_start: int,
    line_end: int,
    manifest: dict,
    sanitization: dict,
    memory_planes: list[str],
) -> dict:
    """
    Build the payload passed to a Stage 4 LLM sub-agent.

    The sub-agent script (run_llm_extract.py) receives this as a JSON file
    and calls the LLM API for structured extraction.
    """
    return {
        "workflowId": workflow_id,
        "stage": "04-classify-mine",
        "chunkId": chunk_id,
        "chunkIndex": chunk_index,
        "totalChunks": total_chunks,
        "chunkContent": chunk_content,
        "chunkMeta": {
            "lineStart": line_start,
            "lineEnd": line_end,
            "charCount": len(chunk_content),
        },
        "memoryPlanes": memory_planes,
        "manifest": manifest,
        "sanitization": sanitization,
        "taskInstructions": (
            "You are a Stage 4 leaf mining agent. Given one chunk of a document "
            "and its position metadata, produce a structured assimilation-packet "
            "fragment. Extract: (1) named entities, (2) semantic relations, "
            "(3) key claims or assertions, (4) operational items (tasks/decisions/risks), "
            "(5) any promotional candidates for downstream review. "
            "Preserve the original wording for evidence. "
            "Output a JSON object matching the entif.assimilation.packet schema."
        ),
    }


# ---------------------------------------------------------------------------
# Core invocation
# ---------------------------------------------------------------------------

def invoke(
    content: str,
    workflow_id: str,
    manifest: dict,
    sanitization: dict,
    memory_planes: Optional[list[str]] = None,
    max_concurrent: int = MAX_CONCURRENT,
    llm_script_path: Optional[str] = None,
) -> InvokeReport:
    """
    Entry point for Stage 4 classification and mining.

    1. Chunks content using chunker.chunk_text()
    2. Writes per-chunk payload files
    3. Fires leaf sub-agents in batches of max_concurrent
    4. Reads results from disk and consolidates into assimilation packet
    5. Writes consolidated packet and returns InvokeReport

    Returns InvokeReport with consolidated packet embedded.
    """
    if memory_planes is None:
        memory_planes = ["semantic", "episodic"]

    invoke_id = f"inv_{uuid.uuid4().hex[:12]}"
    start_ms = int(time.time() * 1000)

    # Ensure directories exist
    _BUS_DIR.mkdir(parents=True, exist_ok=True)

    # ---- Step 1: chunk ----
    chunks = chunk_text(content)
    if not chunks:
        return InvokeReport(
            workflow_id=workflow_id,
            invoke_id=invoke_id,
            total_chunks=0,
            completed=0,
            failed=0,
            results=[],
            consolidated_packet=None,
            duration_ms=int(time.time() * 1000) - start_ms,
        )

    # ---- Step 2: write per-chunk payload files ----
    chunk_payloads: list[dict] = []
    for chunk in chunks:
        payload = _build_llm_payload(
            workflow_id=workflow_id,
            chunk_id=chunk.chunk_id,
            chunk_index=chunk.index,
            total_chunks=chunk.total,
            chunk_content=chunk.content,
            line_start=chunk.line_start,
            line_end=chunk.line_end,
            manifest=manifest,
            sanitization=sanitization,
            memory_planes=memory_planes,
        )
        payload_path = _BUS_DIR / f"chunk.{workflow_id}.{chunk.chunk_id}.payload.json"
        payload_path.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
        payload["_payloadPath"] = str(payload_path)
        chunk_payloads.append((chunk, payload))

    # ---- Step 3: fire sub-agents in batches of max_concurrent ----
    results: list[ChunkResult] = []

    if delegate_task is None:
        # Fallback for test environments: run synchronously in-process
        for chunk, payload in chunk_payloads:
            result = _run_chunk_sync(payload)
            results.append(result)
    else:
        # Fire in batches
        for i in range(0, len(chunk_payloads), max_concurrent):
            batch = chunk_payloads[i:i + max_concurrent]

            tasks = [
                {
                    "goal": (
                        f"Run: python3 {llm_script_path or 'run_llm_extract.py'} '{payload['_payloadPath']}'\n"
                        f"Chunk {chunk.index + 1}/{chunk.total}: {chunk.chunk_id} "
                        f"(lines {chunk.line_start}-{chunk.line_end})"
                    ),
                    "context": (
                        f"workflow_id={workflow_id}, "
                        f"chunk_id={chunk.chunk_id}, "
                        f"chunk_index={chunk.index}, "
                        f"total_chunks={chunk.total}"
                    ),
                    "toolsets": ["terminal", "file"],
                    "role": "leaf",
                }
                for chunk, payload in batch
            ]

            outcomes = delegate_task(tasks=tasks, max_concurrent=len(tasks))

            for outcome in outcomes:
                chunk_result = _parse_outcome(outcome)
                results.append(chunk_result)

    # ---- Step 4: collect outputs from disk ----
    outputs: list[dict] = []
    for chunk, _payload in chunk_payloads:
        chunk_file = _BUS_DIR / f"chunk.{workflow_id}.{chunk.chunk_id}.json"
        if chunk_file.exists():
            try:
                outputs.append(json.loads(chunk_file.read_text(encoding="utf-8")))
            except (json.JSONDecodeError, OSError):
                pass  # corrupted — skip

    # ---- Step 5: consolidate outputs ----
    if outputs:
        consolidated = consolidate_chunk_outputs(outputs)
    else:
        consolidated = consolidate_chunk_outputs([])

    # Patch source references from manifest
    consolidated["sourceRef"] = manifest.get("workflowId", workflow_id)
    consolidated["runRef"] = invoke_id

    # ---- Step 6: write assimilation packet to bus ----
    packet_path = _BUS_DIR / f"consolidated.{workflow_id}.json"
    packet_path.write_text(
        json.dumps(consolidated, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )
    consolidated["_packetPath"] = str(packet_path)

    duration_ms = int(time.time() * 1000) - start_ms

    completed = sum(1 for r in results if r.status == "completed")
    failed = sum(1 for r in results if r.status == "failed")

    return InvokeReport(
        workflow_id=workflow_id,
        invoke_id=invoke_id,
        total_chunks=len(chunks),
        completed=completed,
        failed=failed,
        results=results,
        consolidated_packet=consolidated,
        duration_ms=duration_ms,
    )


# ---------------------------------------------------------------------------
# Synchronous fallback for tests
# ---------------------------------------------------------------------------

def _run_chunk_sync(payload: dict) -> ChunkResult:
    """Run a single chunk through the LLM script synchronously (test fallback)."""
    import sys as _sys
    payload_path = payload.get("_payloadPath", "")
    script_path = str(_SKILL_ROOT / "stages" / "04-classify-mine" / "run_llm_extract.py")

    chunk_id = payload.get("chunkId", "?")
    start_ms = int(time.time() * 1000)

    try:
        result = subprocess.run(
            [sys.executable, script_path, payload_path],
            capture_output=True,
            text=True,
            timeout=CHUNK_TIMEOUT_SECONDS,
            cwd=str(_SKILL_ROOT),
        )
        duration_ms = int(time.time() * 1000) - start_ms

        output_ref = str(_BUS_DIR / f"chunk.{payload['workflowId']}.{chunk_id}.json")

        if result.returncode == 0:
            return ChunkResult(
                chunk_id=chunk_id,
                status="completed",
                output_ref=output_ref,
                error=None,
                duration_ms=duration_ms,
                chunk_index=payload.get("chunkIndex", -1),
            )
        else:
            return ChunkResult(
                chunk_id=chunk_id,
                status="failed",
                output_ref=None,
                error=result.stderr or result.stdout,
                duration_ms=duration_ms,
                chunk_index=payload.get("chunkIndex", -1),
            )
    except subprocess.TimeoutExpired:
        return ChunkResult(
            chunk_id=chunk_id,
            status="failed",
            output_ref=None,
            error=f"timeout after {CHUNK_TIMEOUT_SECONDS}s",
            duration_ms=int(time.time() * 1000) - start_ms,
            chunk_index=payload.get("chunkIndex", -1),
        )
    except Exception as exc:
        return ChunkResult(
            chunk_id=chunk_id,
            status="failed",
            output_ref=None,
            error=str(exc),
            duration_ms=int(time.time() * 1000) - start_ms,
            chunk_index=payload.get("chunkIndex", -1),
        )


# ---------------------------------------------------------------------------
# Outcome parsing
# ---------------------------------------------------------------------------

def _parse_outcome(outcome) -> ChunkResult:
    """
    Parse a delegate_task outcome into a ChunkResult.

    Sub-agents print a 5-field JSON summary to stdout:
      {chunk_id, status, output_ref, error, duration_ms, chunk_index}
    """
    try:
        if hasattr(outcome, "__dict__"):
            d = vars(outcome) if not isinstance(outcome, dict) else outcome
        elif isinstance(outcome, dict):
            d = outcome
        else:
            d = {}

        chunk_id = d.get("chunk_id", d.get("chunkId", "unknown"))
        status = d.get("status", "failed")
        output_ref = d.get("output_ref", d.get("outputRef", None))
        error = d.get("error", None)
        duration_ms = d.get("duration_ms", d.get("durationMs", None))
        chunk_index = d.get("chunk_index", d.get("chunkIndex", -1))

        return ChunkResult(
            chunk_id=str(chunk_id),
            status=str(status),
            output_ref=str(output_ref) if output_ref else None,
            error=str(error) if error else None,
            duration_ms=int(duration_ms) if duration_ms else None,
            chunk_index=int(chunk_index) if chunk_index is not None else -1,
        )
    except Exception as exc:
        return ChunkResult(
            chunk_id="unknown",
            status="failed",
            output_ref=None,
            error=f"parse error: {exc}",
            duration_ms=None,
            chunk_index=-1,
        )


# ---------------------------------------------------------------------------
# Formatter
# ---------------------------------------------------------------------------

def format_report(report: InvokeReport) -> str:
    """Human-readable Stage 4 invoke report."""
    ok = report.failed == 0
    lines = [
        f"=== Stage 4 Invoke {report.invoke_id} ===",
        f"  Workflow:  {report.workflow_id}",
        f"  Chunks:    {report.completed}/{report.total_chunks} OK "
        f"{'✓' if ok else f'✗ ({report.failed} failed)'}",
        f"  Duration:  {report.duration_ms}ms",
        "",
    ]
    for r in sorted(report.results, key=lambda x: x.chunk_index):
        icon = {"completed": "✓", "failed": "✗", "pending": "○"}.get(r.status, "?")
        err = f" | {r.error[:60]}" if r.error else ""
        lines.append(f"  {icon} {r.chunk_id} [{r.chunk_index}]: "
                     f"{r.duration_ms}ms{err}")

    packet_id = (
        report.consolidated_packet.get("packetId", "?")
        if report.consolidated_packet else "?"
    )
    lines.append(f"  Packet:    {packet_id}")
    return "\n".join(lines)
