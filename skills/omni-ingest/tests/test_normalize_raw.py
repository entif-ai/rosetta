"""
test_normalize_raw.py — Tests for stages/02-normalize/normalize_raw.py

Run: python -m pytest tests/test_normalize_raw.py -v
"""

import json
import pytest
from pathlib import Path

# Import via exec
_SKILL_ROOT = Path(__file__).parent.parent
_norm_path = _SKILL_ROOT / "stages" / "02-normalize" / "normalize_raw.py"
_ns = {"__file__": str(_norm_path)}
exec(_norm_path.read_text(encoding="utf-8"), _ns)
normalize = _ns["normalize"]
_is_markdown = _ns["_is_markdown"]
_cleanup_text = _ns["_cleanup_text"]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

@pytest.fixture
def bus_dir(tmp_path, monkeypatch):
    bus = tmp_path / "bus"
    _ns["_BUS_DIR"] = bus
    yield bus
    _ns["_BUS_DIR"] = _SKILL_ROOT / "bus"


# ---------------------------------------------------------------------------
# Tests: normalize
# ---------------------------------------------------------------------------

def test_normalize_returns_content_and_meta_paths(bus_dir):
    result = normalize("Hello world", "wf_test_1")
    assert "content_path" in result
    assert "meta_path" in result
    assert "meta" in result
    assert "was_markdown" in result
    assert "line_count" in result
    assert "word_count" in result


def test_normalize_writes_content_file(bus_dir):
    result = normalize("Hello world", "wf_test_2")
    content_path = Path(result["content_path"])
    assert content_path.exists()
    assert content_path.read_text() == "Hello world\n"


def test_normalize_writes_meta_file(bus_dir):
    result = normalize("Hello world", "wf_test_3")
    meta = result["meta"]
    assert meta["normalizedMimeType"] == "text/plain"
    assert meta["wordCount"] == 2
    assert meta["lineCount"] == 1


def test_normalize_detects_markdown(bus_dir):
    md = "# Heading\n\nSome text with **bold**."
    result = normalize(md, "wf_md_1")
    assert result["was_markdown"] is True
    assert result["meta"]["normalizedMimeType"] == "text/markdown"


def test_normalize_plain_text_not_markdown(bus_dir):
    plain = "Just some plain text. No formatting here."
    result = normalize(plain, "wf_plain_1")
    assert result["was_markdown"] is False
    assert result["meta"]["normalizedMimeType"] == "text/plain"


def test_normalize_rejects_empty_content(bus_dir):
    for content in ("", "   ", "\n\t  "):
        try:
            normalize(content, "wf_empty")
            assert False, f"Expected ValueError for: {content!r}"
        except ValueError:
            pass


def test_normalize_preserves_original_filename(bus_dir):
    result = normalize("Doc content", "wf_fn_1", original_filename="report.txt")
    assert result["meta"]["originalFilename"] == "report.txt"


def test_normalize_word_count_approximate(bus_dir):
    text = "one two three four five"
    result = normalize(text, "wf_wc_1")
    assert result["word_count"] == 5


def test_normalize_line_count(bus_dir):
    text = "line one\nline two\nline three"
    result = normalize(text, "wf_lc_1")
    assert result["line_count"] == 3


# ---------------------------------------------------------------------------
# Tests: _cleanup_text
# ---------------------------------------------------------------------------

def test_cleanup_normalizes_crlf(bus_dir):
    result = _cleanup_text("line1\r\nline2\r\n")
    assert "\r" not in result


def test_cleanup_strips_trailing_whitespace(bus_dir):
    result = _cleanup_text("line with trailing   \nnormal line\n")
    assert "trailing   " not in result


def test_cleanup_collapses_extra_blank_lines(bus_dir):
    text = "para1\n\n\n\n\npara2"
    result = _cleanup_text(text)
    # Max 2 consecutive blank lines
    assert result.count("\n\n\n") == 0


def test_cleanup_strips_trailing_final_newlines(bus_dir):
    result = _cleanup_text("text\n\n\n")
    assert not result.endswith("\n\n\n")


# ---------------------------------------------------------------------------
# Tests: _is_markdown
# ---------------------------------------------------------------------------

def test_is_markdown_heading(bus_dir):
    assert _is_markdown("# Hello\n\nSome text") is True


def test_is_markdown_bullet_list(bus_dir):
    assert _is_markdown("* Item one\n* Item two") is True


def test_is_markdown_code_block(bus_dir):
    assert _is_markdown("```\nsome code\n```") is True


def test_is_markdown_bold(bus_dir):
    assert _is_markdown("This is **bold** text.") is True


def test_is_markdown_plain_text_is_false(bus_dir):
    assert _is_markdown("Just plain text with no markdown.") is False


if __name__ == "__main__":
    import sys
    sys.exit(pytest.main([__file__, "-v"]))
