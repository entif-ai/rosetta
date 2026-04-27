#!/usr/bin/env python3
"""
store_registry.py — omni-ingest Stage 5 store registry.

Loads stores.json and resolves store IDs to handler module paths.
Hot-reloads on every call so edits take effect without restart.

API:
  def load_registry() -> list[dict]:
  def get_handler_path(store_id: str) -> str | None:
  def get_enabled_stores() -> list[dict]:
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

_SKILL_ROOT = Path(__file__).parent.parent
_STORES_PATH = _SKILL_ROOT / "stores.json"


def load_stores() -> list[dict[str, Any]]:
    """Load and return the full stores registry. Raises if file is missing or malformed."""
    if not _STORES_PATH.exists():
        raise FileNotFoundError(f"stores.json not found at {_STORES_PATH}")
    with open(_STORES_PATH, "r", encoding="utf-8") as fh:
        data = json.load(fh)
    if not isinstance(data, dict) or "stores" not in data:
        raise ValueError(f"stores.json must contain a top-level 'stores' key; got {list(data.keys())}")
    return data["stores"]


def get_enabled_stores() -> list[dict[str, Any]]:
    """Return only stores where enabled == True."""
    return [s for s in load_stores() if s.get("enabled", False)]


def get_handler_path(store_id: str) -> str | None:
    """
    Map a store_id (e.g. 'hindsight', 'markdown') to the dotted module path
    for import by dispatch.py. Returns None if store is not found or disabled.
    """
    for store in get_enabled_stores():
        if store.get("id") == store_id:
            return store.get("handler")
    return None


def get_store_config(store_id: str) -> dict[str, Any] | None:
    """Return full config dict for a store_id, or None if not found/disabled."""
    for store in get_enabled_stores():
        if store.get("id") == store_id:
            return store.get("config", {})
    return None


# ---- CLI smoke test ----
if __name__ == "__main__":
    try:
        stores = get_enabled_stores()
        print(f"Enabled stores ({len(stores)}):", file=sys.stderr)
        for s in stores:
            print(f"  [{s['id']}] handler={s.get('handler')} config={s.get('config', {})}", file=sys.stderr)
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)
