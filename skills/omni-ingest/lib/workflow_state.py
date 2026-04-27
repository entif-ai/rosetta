"""
workflow_state.py — derive terminal workflow state from ledger entries.

Derives workflow state by walking stages in order:
  00-init → 01-detect → 02-normalize → 03-sanitize → 04-classify-mine → 05-codify → 06-notify

Terminal states:
  completed        — all required stages + all stores written
  partially_completed — required stages done, some stores failed
  failed           — max retries exhausted or unrecoverable error
  rejected         — Stage 3 returned "reject" verdict
  quarantined      — Stage 3 returned "quarantine" verdict
  in_progress      — still running

Stage dependency rules:
  - Stage N must complete before Stage N+1 is considered meaningful
  - Stage 3 verdict (reject/quarantine) short-circuits all downstream
  - Stage 5 stores are individually tracked; failure of some ≠ workflow failure
  - Stage 6 (notify) is terminal — its failure never cascades
"""

from __future__ import annotations
import os
import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Literal

from lib.ledger import Ledger, MAX_ATTEMPTS


# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------

@dataclass
class StoreResult:
    name: str
    status: Literal["ok", "skipped", "failed", "pending"]


@dataclass
class WorkflowState:
    state: Literal[
        "unknown", "in_progress", "completed", "partially_completed",
        "failed", "rejected", "quarantined"
    ]
    completed_stages: list[str] = field(default_factory=list)
    failed_stages: list[str] = field(default_factory=list)
    quarantined: bool = False
    rejected: bool = False
    store_results: list[StoreResult] = field(default_factory=list)
    stalled_entries: list[dict] = field(default_factory=list)
    failure_reasons: list[str] = field(default_factory=list)

    @property
    def is_terminal(self) -> bool:
        return self.state in (
            "completed", "partially_completed", "failed", "rejected", "quarantined"
        )


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

# Stage ordering (must complete in this order for workflow to progress)
STAGE_ORDER = [
    "00-init",
    "01-detect",
    "02-normalize",
    "03-sanitize",
    "04-classify-mine",
    "05-codify",
    "06-notify",
]

# Stages that must complete for the workflow to advance
REQUIRED_STAGES = ["00-init", "01-detect", "02-normalize", "03-sanitize"]

# Stages that represent "pipeline" steps (not stores)
PIPELINE_STAGES = {"00-init", "01-detect", "02-normalize", "03-sanitize",
                   "04-classify-mine", "06-notify"}


# ---------------------------------------------------------------------------
# Core derivation logic
# ---------------------------------------------------------------------------

def derive_state(ledger_path: str | Path, num_enabled_stores: int = 0) -> WorkflowState:
    """
    Main entry point. Reads ledger entries from the file and derives state.

    Args:
        ledger_path: Path to the ledger JSONL file
        num_enabled_stores: Number of stores configured in stores.json.
                           If 0, Stage 5 is treated as trivially complete.
    """
    ledger_path = Path(ledger_path)
    if not ledger_path.exists():
        return WorkflowState(state="unknown")

    entries = _read_entries(ledger_path)
    return _derive(entries, num_enabled_stores)


def _derive(entries: list[dict], num_enabled_stores: int) -> WorkflowState:
    if not entries:
        return WorkflowState(state="unknown")

    # Index entries by stage+subAgentId
    by_key: dict[tuple[str, str], dict] = {}
    for e in entries:
        key = (e.get("stage", ""), e.get("subAgentId") or "")
        # Take the latest entry per key (rewrites happen)
        if key not in by_key or _ts(e) > _ts(by_key[key]):
            by_key[key] = e

    # -------------------------------------------------------------------------
    # Step 1: Check for quarantine/reject from Stage 3
    # -------------------------------------------------------------------------
    s3_entry = _latest_by_stage(by_key, "03-sanitize")
    if s3_entry:
        status = s3_entry.get("status", "")
        if status == "completed":
            verdict = s3_entry.get("verdict") or ""
            if verdict == "quarantine":
                return _terminal_state("quarantined", by_key, num_enabled_stores)
            if verdict == "reject":
                return _terminal_state("rejected", by_key, num_enabled_stores)

    # -------------------------------------------------------------------------
    # Step 2: Check required pipeline stages
    # -------------------------------------------------------------------------
    for stage in REQUIRED_STAGES:
        entry = _latest_by_stage(by_key, stage)
        if not entry:
            return _in_progress(by_key, num_enabled_stores)
        status = entry.get("status", "")
        if status == "failed" and entry.get("attempts", 1) >= MAX_ATTEMPTS:
            return _failed(by_key, num_enabled_stores,
                           failure_reasons=[f"{stage} failed after max retries"])
        if status != "completed":
            return _in_progress(by_key, num_enabled_stores)

    # -------------------------------------------------------------------------
    # Step 3: Stage 4 (classify-mine)
    # -------------------------------------------------------------------------
    s4_entry = _latest_by_stage(by_key, "04-classify-mine")
    if not s4_entry:
        return _in_progress(by_key, num_enabled_stores)
    if s4_entry.get("status") == "failed" and s4_entry.get("attempts", 1) >= MAX_ATTEMPTS:
        return _failed(by_key, num_enabled_stores,
                       failure_reasons=["04-classify-mine failed after max retries"])
    if s4_entry.get("status") != "completed":
        return _in_progress(by_key, num_enabled_stores)

    # -------------------------------------------------------------------------
    # Step 4: Stage 5 (codify) — stores are individually tracked
    # -------------------------------------------------------------------------
    if num_enabled_stores > 0:
        s5_entries = _all_by_stage(by_key, "05-codify")
        store_results, all_done = _evaluate_stores(s5_entries, num_enabled_stores)

        if not all_done:
            return WorkflowState(
                state="in_progress",
                completed_stages=_completed_list(by_key),
                store_results=store_results,
                stalled_entries=_stale_entries(by_key),
            )

        # All done — check for failures
        failed = [s for s in store_results if s.status == "failed"]
        if failed:
            return WorkflowState(
                state="partially_completed" if [s for s in store_results if s.status == "ok"] else "failed",
                completed_stages=_completed_list(by_key),
                store_results=store_results,
                stalled_entries=_stale_entries(by_key),
                failure_reasons=[f"store:{s.name} failed" for s in failed],
            )

    # -------------------------------------------------------------------------
    # Step 5: Stage 6 (notify) — its failure is non-cascading
    # -------------------------------------------------------------------------
    s6_entry = _latest_by_stage(by_key, "06-notify")
    if not s6_entry:
        # Notify hasn't fired yet — but pipeline is done, that's fine
        pass
    elif s6_entry.get("status") == "failed" and s6_entry.get("attempts", 1) >= MAX_ATTEMPTS:
        # Notify failed but pipeline is complete — call it completed
        return WorkflowState(
            state="completed",
            completed_stages=_completed_list(by_key),
            store_results=[],
        )

    return _terminal_state("completed", by_key, num_enabled_stores)


# ---------------------------------------------------------------------------
# Helpers
# -------------------------------------------------------------------------

def _read_entries(path: Path) -> list[dict]:
    with open(path, "r", encoding="utf-8") as f:
        return [json.loads(line) for line in f if line.strip()]


def _ts(entry: dict) -> str:
    """Timestamp for ordering (updatedAt preferred)."""
    return entry.get("updatedAt") or entry.get("createdAt") or ""


def _latest_by_stage(by_key: dict, stage: str) -> dict | None:
    """Latest entry for a given stage (any subAgentId)."""
    matches = [e for (s, _), e in by_key.items() if s == stage]
    if not matches:
        return None
    return max(matches, key=_ts)


def _all_by_stage(by_key: dict, stage: str) -> list[dict]:
    return [e for (s, _), e in by_key.items() if s == stage]


def _completed_list(by_key: dict) -> list[str]:
    return sorted([
        e["stage"] for (_, _), e in by_key.items()
        if e.get("status") == "completed"
    ])


def _stale_entries(by_key: dict) -> list[dict]:
    return [
        e for (_, _), e in by_key.items()
        if e.get("status") == "stale"
    ]


def _evaluate_stores(s5_entries: list[dict],
                     num_stores: int) -> tuple[list[StoreResult], bool]:
    """
    Evaluate Stage 5 store sub-agent results.

    Returns (store_results, all_done).
    all_done=True means every expected store has an entry.
    """
    # One entry per store expected; subAgentId = store name
    store_names: set[str] = set()
    for e in s5_entries:
        sid = e.get("subAgentId", "")
        if sid:
            store_names.add(sid)

    results: list[StoreResult] = []
    for e in s5_entries:
        sid = e.get("subAgentId", "unknown")
        status = e.get("status", "pending")
        results.append(StoreResult(
            name=sid,
            status="ok" if status == "completed" else
                   "skipped" if status in ("fired", "acknowledged") else
                   "failed" if status == "failed" else "pending",
        ))

    all_done = len(store_names) >= num_stores
    return results, all_done


def _in_progress(by_key: dict, num_stores: int) -> WorkflowState:
    return WorkflowState(
        state="in_progress",
        completed_stages=_completed_list(by_key),
        store_results=[],
        stalled_entries=_stale_entries(by_key),
    )


def _failed(by_key: dict, num_stores: int,
            failure_reasons: list[str]) -> WorkflowState:
    return WorkflowState(
        state="failed",
        completed_stages=_completed_list(by_key),
        failed_stages=list(set(
            e["stage"] for (_, _), e in by_key.items()
            if e.get("status") == "failed"
        )),
        stalled_entries=_stale_entries(by_key),
        failure_reasons=failure_reasons,
    )


def _terminal_state(state: str, by_key: dict,
                    num_stores: int) -> WorkflowState:
    return WorkflowState(
        state=state,
        completed_stages=_completed_list(by_key),
        quarantined=(state == "quarantined"),
        rejected=(state == "rejected"),
        stalled_entries=_stale_entries(by_key),
    )


# ---------------------------------------------------------------------------
# CLI
# -------------------------------------------------------------------------

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python workflow_state.py <ledger_path.jsonl> [num_enabled_stores]")
        sys.exit(1)

    ledger_path = sys.argv[1]
    num_stores = int(sys.argv[2]) if len(sys.argv) > 2 else 0
    ws = derive_state(ledger_path, num_stores)
    print(json.dumps({
        "state": ws.state,
        "completedStages": ws.completed_stages,
        "failedStages": ws.failed_stages,
        "quarantined": ws.quarantined,
        "rejected": ws.rejected,
        "storeResults": [
            {"name": s.name, "status": s.status} for s in ws.store_results
        ],
        "stalledEntries": len(ws.stalled_entries),
        "failureReasons": ws.failure_reasons,
    }, indent=2))
