"""
test_store_registry.py — Tests for lib/store_registry.py

Run: python -m pytest tests/test_store_registry.py -v
"""

import pytest
import json
import tempfile
from pathlib import Path
from unittest.mock import patch, mock_open

import sys
sys.path.insert(0, str(Path(__file__).parent.parent / "lib"))
from store_registry import (
    load_stores,
    get_enabled_stores,
    get_handler_path,
    get_store_config,
)


# ---------------------------------------------------------------------------
# Fixture data
# ---------------------------------------------------------------------------

_STORES_FIXTURE = {
    "stores": [
        {"id": "hindsight", "enabled": True,
         "handler": "stages/05-codify/handlers/store_hindsight",
         "config": {"bank": "hermes"}},
        {"id": "markdown",  "enabled": True,
         "handler": "stages/05-codify/handlers/store_markdown",
         "config": {"path": "/tmp/md"}},
        {"id": "qmd",       "enabled": False,
         "handler": "stages/05-codify/handlers/store_qmd",
         "config": {"collection": "default"}},
        {"id": "ob1",       "enabled": True,
         "handler": "stages/05-codify/handlers/store_ob1",
         "config": {}},
    ]
}


# ---------------------------------------------------------------------------
# Tests
# ---------------------------------------------------------------------------

def test_load_stores_parses_valid_json():
    """load_stores returns a list when the JSON file is valid."""
    fixture = json.dumps(_STORES_FIXTURE)
    with patch("builtins.open", mock_open(read_data=fixture)):
        stores = load_stores()
    assert isinstance(stores, list)
    assert len(stores) == 4


def test_load_stores_raises_on_missing_file():
    """load_stores raises FileNotFoundError when the file does not exist."""
    with patch("builtins.open", side_effect=FileNotFoundError):
        try:
            load_stores()
            assert False, "Expected FileNotFoundError"
        except FileNotFoundError:
            pass


def test_load_stores_raises_on_malformed_json():
    """load_stores raises ValueError when the JSON lacks a 'stores' key."""
    with patch("builtins.open", mock_open(read_data='{"not": "stores"}')):
        try:
            load_stores()
            assert False, "Expected ValueError"
        except ValueError:
            pass


def test_get_enabled_stores_filters_disabled():
    """get_enabled_stores returns only stores with enabled=True."""
    fixture = json.dumps(_STORES_FIXTURE)
    with patch("builtins.open", mock_open(read_data=fixture)):
        enabled = get_enabled_stores()
    ids = {s["id"] for s in enabled}
    assert "hindsight" in ids
    assert "markdown"  in ids
    assert "ob1"       in ids
    assert "qmd" not in ids  # disabled → excluded


def test_get_handler_path_returns_correct_path():
    """get_handler_path returns the handler string for a valid enabled store_id."""
    fixture = json.dumps(_STORES_FIXTURE)
    with patch("builtins.open", mock_open(read_data=fixture)):
        path = get_handler_path("hindsight")
    assert path == "stages/05-codify/handlers/store_hindsight"


def test_get_handler_path_returns_none_for_disabled():
    """get_handler_path returns None for a disabled store_id."""
    fixture = json.dumps(_STORES_FIXTURE)
    with patch("builtins.open", mock_open(read_data=fixture)):
        path = get_handler_path("qmd")
    assert path is None


def test_get_handler_path_returns_none_for_unknown():
    """get_handler_path returns None for an unknown store_id."""
    fixture = json.dumps(_STORES_FIXTURE)
    with patch("builtins.open", mock_open(read_data=fixture)):
        path = get_handler_path("no_such_store")
    assert path is None


def test_get_store_config_returns_config_dict():
    """get_store_config returns the config dict for an enabled store."""
    fixture = json.dumps(_STORES_FIXTURE)
    with patch("builtins.open", mock_open(read_data=fixture)):
        config = get_store_config("hindsight")
    assert config == {"bank": "hermes"}


def test_get_store_config_returns_none_for_disabled():
    """get_store_config returns None for a disabled store_id."""
    fixture = json.dumps(_STORES_FIXTURE)
    with patch("builtins.open", mock_open(read_data=fixture)):
        config = get_store_config("qmd")
    assert config is None


def test_get_store_config_returns_none_for_unknown():
    """get_store_config returns None for an unknown store_id."""
    fixture = json.dumps(_STORES_FIXTURE)
    with patch("builtins.open", mock_open(read_data=fixture)):
        config = get_store_config("no_such_store")
    assert config is None


if __name__ == "__main__":
    sys.exit(pytest.main([__file__, "-v"]))
