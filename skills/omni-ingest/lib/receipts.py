"""
receipts.py — emit machine-readable receipts for every operation.

A receipt is the immutable proof-of-execution for any operation in the
omni-ingest pipeline. Every stage, every sub-agent, every store write,
and every significant decision emits a receipt. Receipts are append-only
and written to bus/receipts.<workflow_id>.jsonl.

Receipt schema:
{
  "kind": "omni-ingest.receipt",
  "receiptId": "rcpt_<hex>",
  "workflowId": "uuid",
  "stage": "05-codify",
  "subAgentId": "store.hindsight",
  "operation": "store.write",
  "timestamp": "2026-04-27T11:10:00Z",
  "input": { ... },
  "output": { ... },
  "status": "ok | error",
  "error": null | { "type": "...", "message": "..." },
  "checksum": "sha256:<hex>",        # of input+output payload
  "upstreamReceiptIds": ["rcpt_...", ],  # receipts this operation depended on
}

Design laws:
  1. Every operation emits a receipt or is provably bound into one
  2. Receipts are immutable — never rewrite, only append new corrected receipts
  3. Checksum enables tamper detection
  4. upstreamReceiptIds creates a causal chain for debugging
  5. Failure receipts are as important as success receipts
"""

from __future__ import annotations
import hashlib
import json
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

KIND = "omni-ingest.receipt"
RECEIPT_PREFIX = "rcpt_"


# ---------------------------------------------------------------------------
# Core
# ---------------------------------------------------------------------------

def emit(
    workflow_id: str,
    operation: str,
    *,
    stage: str | None = None,
    sub_agent_id: str | None = None,
    input_data: dict | None = None,
    output_data: dict | None = None,
    status: str = "ok",
    error: dict | None = None,
    upstream_receipt_ids: list[str] | None = None,
    receipt_file: Path | None = None,
) -> dict:
    """
    Emit and persist a receipt.

    Returns the full receipt dict (also written to receipt_file if provided).
    """
    receipt_id = f"{RECEIPT_PREFIX}{uuid.uuid4().hex[:12]}"

    payload = {
        "kind": KIND,
        "receiptId": receipt_id,
        "workflowId": workflow_id,
        "stage": stage,
        "subAgentId": sub_agent_id,
        "operation": operation,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "input": input_data or {},
        "output": output_data or {},
        "status": status,
        "error": error,
        "upstreamReceiptIds": upstream_receipt_ids or [],
        "checksum": _checksum(input_data, output_data),
    }

    if receipt_file:
        receipt_file = Path(receipt_file)
        receipt_file.parent.mkdir(parents=True, exist_ok=True)
        with open(receipt_file, "a", encoding="utf-8") as f:
            f.write(json.dumps(payload, ensure_ascii=True) + "\n")

    return receipt_id, payload


def _checksum(input_data: dict | None, output_data: dict | None) -> str:
    """SHA-256 of the serialized payload."""
    payload = json.dumps({"i": input_data, "o": output_data}, sort_keys=True, ensure_ascii=True)
    return "sha256:" + hashlib.sha256(payload.encode()).hexdigest()[:16]


# ---------------------------------------------------------------------------
# Stage-specific receipt helpers
# ---------------------------------------------------------------------------

def receipt_manifest(
    workflow_id: str,
    manifest: dict,
    receipt_dir: Path,
) -> tuple[str, dict]:
    """Receipt for Stage 1: manifest creation."""
    path = receipt_dir / f"receipts.{workflow_id}.jsonl"
    return emit(
        workflow_id=workflow_id,
        operation="manifest.create",
        stage="01-detect",
        input_data={"trigger": manifest.get("trigger", {})},
        output_data={
            "workflowId": workflow_id,
            "contentMeta": manifest.get("contentMeta", {}),
        },
        receipt_file=path,
    )


def receipt_normalize(
    workflow_id: str,
    content_ref: str,
    meta_ref: str,
    char_count: int,
    chunk_count: int,
    receipt_dir: Path,
    upstream_ids: list[str],
) -> tuple[str, dict]:
    """Receipt for Stage 2: normalization complete."""
    path = receipt_dir / f"receipts.{workflow_id}.jsonl"
    return emit(
        workflow_id=workflow_id,
        operation="normalize.complete",
        stage="02-normalize",
        input_data={"upstream": upstream_ids},
        output_data={
            "contentRef": content_ref,
            "metaRef": meta_ref,
            "charCount": char_count,
            "chunkCount": chunk_count,
        },
        receipt_file=path,
    )


def receipt_sanitize(
    workflow_id: str,
    verdict: str,
    checks: dict,
    notes: list[str],
    receipt_dir: Path,
    upstream_ids: list[str],
) -> tuple[str, dict]:
    """Receipt for Stage 3: sanitization gate result."""
    path = receipt_dir / f"receipts.{workflow_id}.jsonl"
    status = "ok" if verdict in ("benign", "quarantine") else "error"
    return emit(
        workflow_id=workflow_id,
        operation="sanitize.complete",
        stage="03-sanitize",
        input_data={"upstream": upstream_ids},
        output_data={"verdict": verdict, "checks": checks, "notes": notes},
        status=status,
        receipt_file=path,
    )


def receipt_chunk(
    workflow_id: str,
    chunk_index: int,
    total_chunks: int,
    chunk_id: str,
    receipt_dir: Path,
    upstream_ids: list[str],
    status: str = "ok",
    error: dict | None = None,
) -> tuple[str, dict]:
    """Receipt for a single Stage 4 chunk sub-agent."""
    path = receipt_dir / f"receipts.{workflow_id}.jsonl"
    return emit(
        workflow_id=workflow_id,
        operation="chunk.classify_mine",
        stage="04-classify-mine",
        sub_agent_id=f"leaf.{workflow_id}.chunk.{chunk_index}",
        input_data={
            "upstream": upstream_ids,
            "chunkIndex": chunk_index,
            "totalChunks": total_chunks,
            "chunkId": chunk_id,
        },
        output_data={"chunkId": chunk_id},
        status=status,
        error=error,
        receipt_file=path,
    )


def receipt_consolidate(
    workflow_id: str,
    packet_id: str,
    num_chunks: int,
    receipt_dir: Path,
    chunk_receipt_ids: list[str],
) -> tuple[str, dict]:
    """Receipt for Stage 4: consolidation of all chunks."""
    path = receipt_dir / f"receipts.{workflow_id}.jsonl"
    return emit(
        workflow_id=workflow_id,
        operation="consolidate.complete",
        stage="04-classify-mine",
        input_data={"chunkReceipts": chunk_receipt_ids, "numChunks": num_chunks},
        output_data={"packetId": packet_id},
        receipt_file=path,
    )


def receipt_store_write(
    workflow_id: str,
    store_name: str,
    units_written: int,
    total_units: int,
    receipt_dir: Path,
    upstream_ids: list[str],
    status: str = "ok",
    error: dict | None = None,
) -> tuple[str, dict]:
    """Receipt for Stage 5: individual store write."""
    path = receipt_dir / f"receipts.{workflow_id}.jsonl"
    return emit(
        workflow_id=workflow_id,
        operation="store.write",
        stage="05-codify",
        sub_agent_id=store_name,
        input_data={"upstream": upstream_ids},
        output_data={
            "store": store_name,
            "unitsWritten": units_written,
            "totalUnits": total_units,
        },
        status=status,
        error=error,
        receipt_file=path,
    )


def receipt_notify(
    workflow_id: str,
    terminal_state: str,
    stages_summary: dict,
    receipt_dir: Path,
    upstream_ids: list[str],
    status: str = "ok",
    error: dict | None = None,
) -> tuple[str, dict]:
    """Receipt for Stage 6: notification sent."""
    path = receipt_dir / f"receipts.{workflow_id}.jsonl"
    return emit(
        workflow_id=workflow_id,
        operation="notify.complete",
        stage="06-notify",
        input_data={"upstream": upstream_ids},
        output_data={"terminalState": terminal_state, "stages": stages_summary},
        status=status,
        error=error,
        receipt_file=path,
    )


# ---------------------------------------------------------------------------
# Utilities
# ---------------------------------------------------------------------------

def load_receipts(receipt_file: Path) -> list[dict]:
    """Load all receipts for a workflow."""
    if not receipt_file.exists():
        return []
    with open(receipt_file, "r", encoding="utf-8") as f:
        return [json.loads(line) for line in f if line.strip()]


def receipt_chain(receipt_file: Path) -> list[dict]:
    """
    Return receipts in causal order (topological by upstreamReceiptIds).
    Receipts with no deps come first; each subsequent receipt comes after
    all of its upstream receipts.
    """
    receipts = load_receipts(receipt_file)
    by_id = {r["receiptId"]: r for r in receipts}
    emitted: set[str] = set()
    result: list[dict] = []

    def emit_chain(rid: str):
        if rid in emitted or rid not in by_id:
            return
        for dep in by_id[rid].get("upstreamReceiptIds", []):
            emit_chain(dep)
        emitted.add(rid)
        result.append(by_id[rid])

    for r in receipts:
        emit_chain(r["receiptId"])

    return result


def verify_checksums(receipt_file: Path) -> list[dict]:
    """
    Verify all checksums in a receipt file.
    Returns list of failed receipts (each includes 'receiptId' and 'expected').
    """
    receipts = load_receipts(receipt_file)
    failures = []
    for r in receipts:
        expected = _checksum(r.get("input"), r.get("output"))
        if r.get("checksum") != expected:
            failures.append({"receiptId": r["receiptId"], "expected": expected})
    return failures
