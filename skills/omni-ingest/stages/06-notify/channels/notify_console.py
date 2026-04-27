#!/usr/bin/env python3
"""
notify_console.py — omni-ingest Stage 6 notification channel: console output.

Writes pipeline status to stdout/stderr. Dead simple, always available.

API (matches notify channel protocol):
  def notify(event: NotifyEvent) -> NotifyResult:
"""

from __future__ import annotations

import sys
from dataclasses import dataclass
from datetime import datetime, timezone


@dataclass
class NotifyEvent:
    workflow_id: str
    stage: str  # "06-notify"
    trigger: str  # detector that started the workflow
    status: str  # "success" | "failure" | "retry" | "terminate"
    message: str
    metadata: dict | None = None


@dataclass
class NotifyResult:
    success: bool
    channel: str = "console"
    error: str | None = None


def notify(event: NotifyEvent) -> NotifyResult:
    """
    Write a human-readable status line to stdout.
    Always succeeds — console is always available.
    """
    ts = datetime.now(timezone.utc).isoformat(timespec="seconds")
    line = f"[{ts}] omni-ingest [{event.workflow_id}] {event.status.upper()}: {event.message}"
    if event.metadata:
        line += f" | meta: {event.metadata}"
    print(line, file=sys.stdout)
    return NotifyResult(success=True, channel="console")


if __name__ == "__main__":
    # Smoke test
    result = notify(NotifyEvent(
        workflow_id="test_wf_001",
        stage="06-notify",
        trigger="user_submit",
        status="success",
        message="Pipeline completed",
        metadata={"stages_completed": 6},
    ))
    print(f"Result: {result}", file=sys.stderr)
