"""
bus.py — append-only queue file primitives for omni-ingest.

Every stage writes entries to its own queue file. Entries are immutable once written.
Readers scan from the beginning on each poll. No deletion, no in-place mutation.

Usage:
    from bus import Bus
    bus = Bus(workflow_id="abc123", base_path="~/.hermes/skills/omni-ingest/bus")

    # Stage N appends an ACK
    bus.append("queue.04", {"subAgentId": "leaf.1", "status": "completed"})

    # Stage N+1 reads all pending entries it hasn't seen yet
    entries = bus.read_all_new("queue.04", after_offset=last_offset)
"""

import json
import os
import uuid
from pathlib import Path
from datetime import datetime, timezone
from typing import Any


class Bus:
    def __init__(self, workflow_id: str, base_path: str | Path):
        self.workflow_id = workflow_id
        self.base_path = Path(base_path).expanduser().resolve()
        self.base_path.mkdir(parents=True, exist_ok=True)

    def _queue_path(self, stage: str) -> Path:
        """bus/queue.<stage>.<workflow_id>.jsonl"""
        return self.base_path / f"queue.{stage}.{self.workflow_id}.jsonl"

    def append(self, stage: str, entry: dict) -> Path:
        """
        Append a JSONL line to the named queue.
        Returns the path written to.
        """
        path = self._queue_path(stage)
        line = json.dumps(entry, ensure_ascii=True) + "\n"
        with open(path, "a", encoding="utf-8") as f:
            f.write(line)
        return path

    def read_all_new(self, stage: str, after_offset: int = 0) -> tuple[list[dict], int]:
        """
        Read all new entries from a queue after the given byte offset.
        Returns (entries, new_offset) where new_offset is the byte position
        after the last entry read — pass this back as after_offset on the next call.

        Empty file returns ([], 0).
        """
        path = self._queue_path(stage)
        if not path.exists():
            return [], 0

        with open(path, "r", encoding="utf-8") as f:
            f.seek(after_offset)
            lines = f.readlines()

        entries = []
        for line in lines:
            line = line.strip()
            if not line:
                continue
            try:
                entries.append(json.loads(line))
            except json.JSONDecodeError:
                # Log but skip malformed lines
                continue

        new_offset = after_offset + sum(len(l) for l in lines)
        return entries, new_offset

    def write_content(self, suffix: str, content: str, meta: dict | None = None) -> tuple[Path, Path]:
        """
        Write normalized content and metadata.

        Returns (content_path, meta_path).
        """
        content_path = self.base_path / f"content.{self.workflow_id}.{suffix}"
        meta_path = self.base_path / f"content.{self.workflow_id}.{suffix}.meta.json"

        with open(content_path, "w", encoding="utf-8") as f:
            f.write(content)

        meta_out = {
            "workflowId": self.workflow_id,
            "writtenAt": datetime.now(timezone.utc).isoformat(),
            "charCount": len(content),
            **(meta or {})
        }
        with open(meta_path, "w", encoding="utf-8") as f:
            json.dump(meta_out, f, ensure_ascii=True, indent=2)

        return content_path, meta_path

    def write_stage_output(self, stage_name: str, filename: str, data: Any) -> Path:
        """
        Write arbitrary structured data (dict/list/str) to a bus file.
        """
        path = self.base_path / filename.format(workflow_id=self.workflow_id)
        with open(path, "w", encoding="utf-8") as f:
            if isinstance(data, str):
                f.write(data)
            elif isinstance(data, (dict, list)):
                json.dump(data, f, ensure_ascii=True, indent=2)
            else:
                f.write(str(data))
        return path

    def read_stage_output(self, filename: str) -> Any:
        """Read structured data from a bus file. Handles both JSON and plain text."""
        path = self.base_path / filename.format(workflow_id=self.workflow_id)
        if not path.exists():
            return None
        raw = path.read_bytes()
        # Try JSON first; fall back to decoded text
        try:
            return json.loads(raw.decode("utf-8"))
        except (json.JSONDecodeError, UnicodeDecodeError):
            return raw.decode("utf-8")

    def queue_exists(self, stage: str) -> bool:
        return self._queue_path(stage).exists()

    def ack_count(self, stage: str) -> int:
        """Count entries in a queue file (for staleness checking)."""
        path = self._queue_path(stage)
        if not path.exists():
            return 0
        with open(path, "r", encoding="utf-8") as f:
            return sum(1 for line in f if line.strip())
