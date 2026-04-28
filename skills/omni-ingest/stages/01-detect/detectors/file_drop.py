#!/usr/bin/env python3
"""
file_drop.py — omni-ingest Stage 1 detector: watchdog directory watcher.

Uses watchdog to monitor a directory and emit a workflow manifest each time
a new file (or a modified file that was missing) is detected.

Two entry points:
  class  FileDropDetector(watch_path, manifest_cb=None, poll_interval=1.0)
         start() / stop()  — run the observer loop in a background thread

  fn    detect(path, content_type_hint=None, user_instructions=None)
         str -> dict       — one-shot: produce manifest for a specific file

Bus writes (one-shot detect):
  bus/content.<workflow_id>.md           — raw file bytes (decoded as utf-8)
  bus/content.<workflow_id>.meta.json    — content metadata
  bus/queue.01.<workflow_id>.jsonl       — Stage 1 ACK
  ledger/<workflow_id>.jsonl             — workflow ledger (Stage 1 entry)

Files starting with '.' or ending with .tmp / .swp / .bak / ~ are ignored.
"""

from __future__ import annotations

import hashlib
import json
import os
import queue
import threading
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Callable, Optional

from watchdog.events import (
    FileSystemEvent,
    FileSystemEventHandler,
    FileCreatedEvent,
)
from watchdog.observers import Observer

# Resolve relative to this file's location
_SKILL_ROOT = Path(__file__).parent.parent.parent
_BUS_DIR = _SKILL_ROOT / "bus"
_LEDGER_DIR = _SKILL_ROOT / "ledger"

_TRIGGER_TYPE = "file_drop"

# File name patterns to ignore
_IGNORED_PREFIXES = (".",
                     "~")
_IGNORED_SUFFIXES = (".tmp", ".swp", ".bak", ".ds_store", "._")


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _should_ignore(name: str) -> bool:
    """Return True for hidden files and common temp-file suffixes."""
    return (
        name.startswith(_IGNORED_PREFIXES)
        or any(name.endswith(s) for s in _IGNORED_SUFFIXES)
    )


def _checksum(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _read_file_bytes(path: Path) -> tuple[bytes, str]:
    """
    Read file as bytes; decode as utf-8 for the bus content file.
    Returns (raw_bytes, content_str).
    """
    raw = path.read_bytes()
    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError:
        # Fall back to latin-1 so we still capture something
        text = raw.decode("latin-1")
    return raw, text


def _write_bus_content(workflow_id: str, content: str,
                       content_type_hint: Optional[str],
                       original_filename: Optional[str],
                       mtime: Optional[str]) -> dict:
    """
    Write decoded text to bus/content.<workflow_id>.md and
    bus/content.<workflow_id>.meta.json.
    Returns the contentMeta dict.
    """
    content_path = _BUS_DIR / f"content.{workflow_id}.md"
    content_bytes = content.encode("utf-8")
    size_bytes = len(content_bytes)

    meta = {
        "originalFilename": original_filename,
        "mtime": mtime or datetime.now(timezone.utc).isoformat(),
        "mimeType": content_type_hint or "application/octet-stream",
        "sizeBytes": size_bytes,
        "checksum": _checksum(content_bytes),
    }

    content_path.parent.mkdir(parents=True, exist_ok=True)
    content_path.write_text(content, encoding="utf-8")
    meta_path = _BUS_DIR / f"content.{workflow_id}.meta.json"
    meta_path.write_text(json.dumps(meta, indent=2), encoding="utf-8")

    return meta


def _init_ledger(workflow_id: str) -> None:
    """Append Stage 1 entry to the per-workflow ledger."""
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
    """Append Stage 1 ACK to bus/queue.01.<workflow_id>.jsonl."""
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


def _build_manifest(
    workflow_id: str,
    source_path: Path,
    content: str,
    content_type_hint: Optional[str] = None,
    user_instructions: Optional[str] = None,
) -> dict:
    """Assemble a Stage 1 manifest dict for a detected file."""
    triggered_at = datetime.now(timezone.utc).isoformat()
    content_bytes = content.encode("utf-8")
    raw_bytes, _ = _read_file_bytes(source_path)

    manifest = {
        "workflowId": workflow_id,
        "stage": "01-detect",
        "triggeredAt": triggered_at,
        "trigger": {
            "type": _TRIGGER_TYPE,
            "sourceRef": str(source_path.resolve()),
            "contentTypeHint": content_type_hint,
            "userInstructions": user_instructions,
            "signature": None,
        },
        "contentMeta": {
            "originalFilename": source_path.name,
            "mtime": datetime.fromtimestamp(
                source_path.stat().st_mtime, tz=timezone.utc
            ).isoformat(),
            "mimeType": content_type_hint or "application/octet-stream",
            "sizeBytes": len(content_bytes),
            "checksum": _checksum(content_bytes),
        },
        "retryCount": 0,
        "parentWorkflowId": None,
    }
    return manifest


# ---------------------------------------------------------------------------
# Watchdog handler
# ---------------------------------------------------------------------------

class _DropHandler(FileSystemEventHandler):
    """
    Watchdog handler that fires manifest_cb for every new file that is
    not filtered out by _should_ignore().
    """

    def __init__(
        self,
        watch_path: Path,
        manifest_cb: Optional[Callable[[dict], None]] = None,
        poll_interval: float = 1.0,
    ):
        super().__init__()
        self._watch_path = watch_path
        self._manifest_cb = manifest_cb
        self._poll_interval = poll_interval

    def on_created(self, event: FileSystemEvent) -> None:
        if event.is_directory:
            return
        path = Path(event.src_path)
        if _should_ignore(path.name):
            return
        self._process(path)

    def _process(self, path: Path) -> None:
        """Build and dispatch manifest for a new file."""
        # Wait briefly for the file to be fully written
        time.sleep(self._poll_interval)

        # Re-check the file is still there
        if not path.exists():
            return

        try:
            raw, text = _read_file_bytes(path)
        except OSError:
            return

        workflow_id = str(uuid.uuid4())
        manifest = _build_manifest(workflow_id, path, text)

        # Write bus + ledger
        _write_bus_content(
            workflow_id,
            text,
            content_type_hint=None,
            original_filename=path.name,
            mtime=None,
        )
        _init_ledger(workflow_id)
        _append_bus_ack(workflow_id, manifest)

        if self._manifest_cb:
            try:
                self._manifest_cb(manifest)
            except Exception:
                # Callback errors must not crash the observer thread
                pass


# ---------------------------------------------------------------------------
# FileDropDetector
# ---------------------------------------------------------------------------

class FileDropDetector:
    """
    Background watchdog observer that watches a directory for new files.

    Parameters
    ----------
    watch_path : Path | str
        Directory to monitor.
    manifest_cb : callable, optional
        Called with the manifest dict on each new-file event.
    poll_interval : float
        Seconds to wait after a file-appeared event before reading the file,
        to avoid reading a partial in-progress write.  Default 1.0.
    """

    def __init__(
        self,
        watch_path: Path | str,
        *,
        manifest_cb: Optional[Callable[[dict], None]] = None,
        poll_interval: float = 1.0,
    ):
        self._watch_path = Path(watch_path)
        self._manifest_cb = manifest_cb
        self._poll_interval = poll_interval
        self._observer: Optional[Observer] = None
        self._thread: Optional[threading.Thread] = None
        self._thread_name = "file-drop-watcher"
        self.__running = False

    # -----------------------------------------------------------------------
    # Properties
    # -----------------------------------------------------------------------

    @property
    def watch_path(self) -> Path:
        return self._watch_path

    @watch_path.setter
    def watch_path(self, value: Path | str) -> None:
        if self.__running:
            raise RuntimeError("Cannot change watch_path while running")
        self._watch_path = Path(value)

    @property
    def _running(self) -> bool:
        return self.__running

    # -----------------------------------------------------------------------
    # Lifecycle
    # -----------------------------------------------------------------------

    def start(self) -> None:
        """Start the watchdog observer in a background thread."""
        if self._running:
            return
        self.__running = True
        self._observer = Observer()
        handler = _DropHandler(
            self._watch_path,
            manifest_cb=self._manifest_cb,
            poll_interval=self._poll_interval,
        )
        self._observer.schedule(handler, str(self._watch_path), recursive=False)
        self._observer.start()
        # The observer runs in its own thread; track it via _thread flag
        self._thread = threading.Thread(
            target=_noop,
            name=self._thread_name,
            daemon=True,
        )
        self._thread.start()

    def stop(self) -> None:
        """Stop the watchdog observer and wait for the thread to finish."""
        if not self._running:
            return
        self.__running = False
        assert self._observer is not None
        self._observer.stop()
        self._observer.join(timeout=5.0)
        self._observer = None
        self._thread = None


def _noop() -> None:
    """Sentinel target so we have a named thread to check."""
    pass


# ---------------------------------------------------------------------------
# One-shot detect()
# ---------------------------------------------------------------------------

def detect(
    path: str,
    content_type_hint: Optional[str] = None,
    user_instructions: Optional[str] = None,
) -> dict:
    """
    Produce a Stage 1 manifest for an already-existing file at *path*.

    Writes content + metadata to the bus, initialises the ledger, and
    appends a Stage 1 ACK, then returns the manifest dict.

    Raises
    ------
    FileNotFoundError
        When *path* does not exist.
    ValueError
        When *path* is a directory.
    """
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(f"No such file: {path}")
    if path.is_dir():
        raise ValueError(f"Cannot detect a directory: {path}")

    workflow_id = str(uuid.uuid4())
    raw, text = _read_file_bytes(path)

    manifest = _build_manifest(
        workflow_id, path, text,
        content_type_hint=content_type_hint,
        user_instructions=user_instructions,
    )

    _write_bus_content(
        workflow_id, text,
        content_type_hint=content_type_hint,
        original_filename=path.name,
        mtime=None,
    )
    _init_ledger(workflow_id)
    _append_bus_ack(workflow_id, manifest)

    return manifest
