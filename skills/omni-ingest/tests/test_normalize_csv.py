"""
test_normalize_csv.py — Tests for stages/02-normalize/normalize_csv.py
Run: python -m pytest tests/test_normalize_csv.py -v
"""
import pytest
from pathlib import Path

_SKILL_ROOT = Path(__file__).parent.parent
_norm_path = _SKILL_ROOT / "stages" / "02-normalize" / "normalize_csv.py"


def _load(ns, tmp_path):
    """Exec normalize_csv.py into ns, patching _BUS_DIR in __globals__ post-exec."""
    bus = tmp_path / "bus"
    bus.mkdir(parents=True, exist_ok=True)
    ns["__file__"] = str(_norm_path)
    exec(_norm_path.read_text(encoding="utf-8"), ns)
    # Critical: patch the function's own globals, not just the ns dict
    ns["normalize_csv"].__globals__["_BUS_DIR"] = bus
    ns["_rows_to_markdown"].__globals__["_BUS_DIR"] = bus
    ns["_escape_cell"].__globals__["_BUS_DIR"] = bus
    ns["_detect_dialect"].__globals__["_BUS_DIR"] = bus
    return bus


# --------------------------------------------------------------------------
# Unit helpers
# --------------------------------------------------------------------------

def test_escape_cell_plain():
    ns = {}
    _load(ns, _SKILL_ROOT)
    assert "hello" in ns["_escape_cell"]("hello")


def test_escape_cell_pipes():
    ns = {}
    _load(ns, _SKILL_ROOT)
    result = ns["_escape_cell"]("a|b|c")
    assert r"\|" in result


def test_escape_cell_number():
    ns = {}
    _load(ns, _SKILL_ROOT)
    assert ns["_escape_cell"](42) == "42"


def test_rows_to_markdown_empty():
    ns = {}
    _load(ns, _SKILL_ROOT)
    assert ns["_rows_to_markdown"]([], ["A", "B"]) == ""
    assert ns["_rows_to_markdown"]([], None) == ""


def test_rows_to_markdown_with_headers():
    ns = {}
    _load(ns, _SKILL_ROOT)
    md = ns["_rows_to_markdown"]([["Alice", "25"], ["Bob", "30"]], ["Name", "Age"])
    assert "| Name | Age |" in md
    assert "| Alice | 25 |" in md
    assert "| Bob | 30 |" in md


def test_rows_to_markdown_auto_header():
    ns = {}
    _load(ns, _SKILL_ROOT)
    md = ns["_rows_to_markdown"]([["Alice", "25"], ["Bob", "30"]], None)
    assert "| Alice | 25 |" in md  # first row = body when headers=None


def test_rows_to_markdown_escapes_pipes():
    ns = {}
    _load(ns, _SKILL_ROOT)
    md = ns["_rows_to_markdown"]([["A|B", "C"]], ["X", "Y"])
    assert r"|" in md


# --------------------------------------------------------------------------
# normalize_csv — good cases
# --------------------------------------------------------------------------

def test_normalize_minimal_csv(tmp_path):
    ns = {}
    bus = _load(ns, tmp_path)
    csv_text = "Name,Age\nAlice,25\nBob,30"
    content, meta = ns["normalize_csv"](csv_text, "wf-csv-1")
    assert "Alice" in content
    assert "Bob" in content
    assert meta["rowCount"] == 2
    assert meta["columnCount"] == 2


def test_normalize_csv_no_headers(tmp_path):
    ns = {}
    bus = _load(ns, tmp_path)
    csv_text = "Alice,25\nBob,30"
    # headers=False: explicit — treat ALL rows as data, auto-gen column names
    content, meta = ns["normalize_csv"](csv_text, "wf-csv-2", headers=False)
    assert meta["autoHeader"] is False   # headers were explicitly provided (False)
    assert meta["rowCount"] == 2        # all rows = data rows


def test_normalize_csv_custom_headers(tmp_path):
    ns = {}
    bus = _load(ns, tmp_path)
    csv_text = "Alice,25\nBob,30"
    content, meta = ns["normalize_csv"](csv_text, "wf-csv-3", headers=["Person", "Years"])
    assert meta["autoHeader"] is False
    assert "Person" in content


def test_normalize_csv_writes_bus(tmp_path):
    ns = {}
    bus = _load(ns, tmp_path)
    ns["normalize_csv"]("a,b\n1,2\n3,4", "wf-csv-4")
    assert (bus / "content.wf-csv-4.md").exists()
    assert (bus / "content.wf-csv-4.meta.json").exists()


def test_normalize_csv_rejects_empty():
    ns = {}
    _load(ns, _SKILL_ROOT)  # uses real bus dir — no tmp_path needed for rejection test
    try:
        ns["normalize_csv"]("", "wf-empty")
        assert False, "Expected ValueError"
    except ValueError:
        pass


def test_normalize_csv_column_limit():
    ns = {}
    _load(ns, _SKILL_ROOT)
    try:
        ns["normalize_csv"]("a,b,c\n" + ",".join(str(i) for i in range(60)), "wf-cols")
        assert False, "Expected ValueError"
    except ValueError as e:
        assert "columns" in str(e)


if __name__ == "__main__":
    import sys
    sys.exit(pytest.main([__file__, "-v"]))
