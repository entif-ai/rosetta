"""
ledger.py — per-workflow operation ledger with ACK tracking and staleness detection.

Schema per entry:
{
  "workflowId": "uuid",
  "stage": "04-classify-mine",
  "subAgentId": "leaf.chunk.1",
  "status": "fired|acknowledged|completed|failed|stale",
  "attempts": 1,
  "createdAt": "2026-04-26T21:02:00Z",
  "updatedAt": "2026-04-26T21:02:45Z",
  "outputRef": "bus/chunk.<workflow_id>.1.json"
}

Staleness: no ACK within stage_timeout_seconds → mark stale → increment attempts.
After max_attempts, transition to failed.

Workflow state is derived: completed / partially_completed / failed / rejected / quarantined.
"""

import json
import os
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Literal


# Per-stage defaults (seconds)
STAGE_TIMEOUT = {
    "01-detect": 30,
    "02-normalize": 60,
    "03-sanitize": 30,
    "04-classify-mine": 300,
    "05-codify": 120,
    "06-notify": 30,
}
DEFAULT_TIMEOUT = 60
MAX_ATTEMPTS = 3


class Ledger:
    def __init__(self, workflow_id: str, ledger_dir: str | Path):
        self.workflow_id = workflow_id
        self.ledger_dir = Path(ledger_dir).expanduser().resolve()
        self.ledger_dir.mkdir(parents=True, exist_ok=True)
        self.path = self.ledger_dir / f"{workflow_id}.jsonl"

    # -------------------------------------------------------------------------
    # Write
    # -------------------------------------------------------------------------

    def fire(self, stage: str, sub_agent_id: str | None = None) -> None:
        """Record that a stage or sub-agent has been fired."""
        self._write_entry({
            "workflowId": self.workflow_id,
            "stage": stage,
            "subAgentId": sub_agent_id,
            "status": "fired",
            "attempts": 1,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "updatedAt": datetime.now(timezone.utc).isoformat(),
        })

    def ack(self, stage: str, sub_agent_id: str | None = None,
            output_ref: str | None = None) -> None:
        """Record acknowledgment from a stage or sub-agent."""
        entries = self.entries()
        for e in entries:
            if e["stage"] == stage and e.get("subAgentId") == sub_agent_id:
                e["status"] = "acknowledged"
                e["updatedAt"] = datetime.now(timezone.utc).isoformat()
                if output_ref:
                    e["outputRef"] = output_ref
                self._rewrite(entries)
                return

    def complete(self, stage: str, sub_agent_id: str | None = None,
                 output_ref: str | None = None) -> None:
        """Mark a stage or sub-agent as completed."""
        entries = self.entries()
        for e in entries:
            if e["stage"] == stage and e.get("subAgentId") == sub_agent_id:
                e["status"] = "completed"
                e["updatedAt"] = datetime.now(timezone.utc).isoformat()
                if output_ref:
                    e["outputRef"] = output_ref
                self._rewrite(entries)
                return

    def fail(self, stage: str, sub_agent_id: str | None = None,
             reason: str | None = None) -> None:
        """Mark a stage or sub-agent as failed."""
        entries = self.entries()
        for e in entries:
            if e["stage"] == stage and e.get("subAgentId") == sub_agent_id:
                e["status"] = "failed"
                e["attempts"] = e.get("attempts", 1) + 1
                e["updatedAt"] = datetime.now(timezone.utc).isoformat()
                if reason:
                    e["failureReason"] = reason
                self._rewrite(entries)
                return

    # -------------------------------------------------------------------------
    # Read
    # -------------------------------------------------------------------------

    def entries(self) -> list[dict]:
        """Return all ledger entries for this workflow."""
        if not self.path.exists():
            return []
        with open(self.path, "r", encoding="utf-8") as f:
            return [json.loads(line) for line in f if line.strip()]

    def entries_by_stage(self, stage: str) -> list[dict]:
        return [e for e in self.entries() if e.get("stage") == stage]

    def stale_entries(self) -> list[dict]:
        """Return entries that have timed out without completion."""
        now = datetime.now(timezone.utc)
        stale = []
        for entry in self.entries():
            if entry["status"] in ("completed", "failed"):
                continue
            timeout = STAGE_TIMEOUT.get(entry["stage"], DEFAULT_TIMEOUT)
            created = datetime.fromisoformat(entry["createdAt"].replace("Z", "+00:00"))
            if (now - created) > timedelta(seconds=timeout):
                entry["status"] = "stale"
                stale.append(entry)
        return stale

    def workflow_state(self, num_enabled_stores: int = 0,
                       failed_stores: list[str] | None = None) -> str:
        """
        Derive the overall workflow state from ledger entries.
        Delegates to the standalone derive_state() in workflow_state.py.

        States: completed | partially_completed | failed | rejected | quarantined
        """
        from lib.workflow_state import derive_state
        ws = derive_state(self.path, num_enabled_stores)
        return ws.state

    # -------------------------------------------------------------------------
    # Internal
    # -------------------------------------------------------------------------

    def _write_entry(self, entry: dict) -> None:
        with open(self.path, "a", encoding="utf-8") as f:
            f.write(json.dumps(entry, ensure_ascii=True) + "\n")

    def _find_entry(self, stage: str,
                    sub_agent_id: str | None) -> dict | None:
        """Find mutable entry reference by rewriting the file."""
        entries = self.entries()
        for e in entries:
            if e["stage"] == stage and e.get("subAgentId") == sub_agent_id:
                return e
        return None

    def _rewrite(self, entries: list[dict] | None = None) -> None:
        """
        Rewrite the ledger file.

        If entries is provided, write those directly (used after in-memory mutation).
        Otherwise re-read from disk (legacy / for compatibility).
        """
        if entries is None:
            entries = self.entries()
        with open(self.path, "w", encoding="utf-8") as f:
            for e in entries:
                f.write(json.dumps(e, ensure_ascii=True) + "\n")

    def init_workflow(self, manifest: dict) -> None:
        """Write the initial manifest as the first ledger entry."""
        self._write_entry({
            "workflowId": self.workflow_id,
            "stage": "00-init",
            "status": "completed",
            "manifest": manifest,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "updatedAt": datetime.now(timezone.utc).isoformat(),
        })
