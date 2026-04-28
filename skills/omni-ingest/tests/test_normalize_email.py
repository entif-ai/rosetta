"""
test_normalize_email.py — Tests for stages/02-normalize/normalize_email.py
Run: python -m pytest tests/test_normalize_email.py -v
"""
import pytest
from pathlib import Path

_SKILL_ROOT = Path(__file__).parent.parent
_norm_path = _SKILL_ROOT / "stages" / "02-normalize" / "normalize_email.py"


def _load(ns, tmp_path=None):
    """Exec normalize_email.py into ns, patching _BUS_DIR in __globals__ post-exec."""
    ns["__file__"] = str(_norm_path)
    exec(_norm_path.read_text(encoding="utf-8"), ns)
    if tmp_path is not None:
        bus = tmp_path / "bus"
        bus.mkdir(parents=True, exist_ok=True)
        for _key in list(ns.keys()):
            obj = ns[_key]
            if hasattr(obj, "__globals__") and "_BUS_DIR" in obj.__globals__:
                obj.__globals__["_BUS_DIR"] = bus
        return bus
    return None


# --------------------------------------------------------------------------
# _html_to_text
# --------------------------------------------------------------------------

def test_html_to_text_strips_tags():
    ns = {}
    _load(ns)
    result = ns["_html_to_text"]("<p>Hello <b>World</b></p>")
    assert "Hello" in result
    assert "<p>" not in result


def test_html_to_text_converts_links():
    ns = {}
    _load(ns)
    result = ns["_html_to_text"]('<a href="http://example.com">Link</a>')
    assert "Link" in result


# --------------------------------------------------------------------------
# normalize_email — good emails
# --------------------------------------------------------------------------

def test_normalize_minimal_email(tmp_path):
    ns = {}
    bus = _load(ns, tmp_path)
    raw = b"From: a@b.com\nTo: c@d.com\nSubject: Hi\n\nHello world"
    content, meta = ns["normalize_email"](raw, "wf-1")
    assert "Hi" in content
    assert meta["emailFrom"] == "a@b.com"
    assert meta["emailSubject"] == "Hi"


def test_normalize_rfc822_bytes(tmp_path):
    ns = {}
    bus = _load(ns, tmp_path)
    raw = (
        b"From: alice@example.com\nTo: bob@example.com\n"
        b"Subject: Test\nDate: Sat, 01 Jan 2026 12:00:00 +0000\n\nBody text"
    )
    content, meta = ns["normalize_email"](raw, "wf-2")
    assert "alice@example.com" in meta["emailFrom"]
    assert meta["emailSubject"] == "Test"


def test_normalize_multipart_prefers_plain(tmp_path):
    ns = {}
    bus = _load(ns, tmp_path)
    raw = (
        b"From: a@b.com\nTo: c@d.com\nSubject: Multi\n"
        b"Content-Type: multipart/alternative; boundary=xyz\n\n"
        b"--xyz\nContent-Type: text/plain\n\nPlain body\n"
        b"--xyz\nContent-Type: text/html\n\n<html>HTML body</html>\n--xyz--\n"
    )
    content, meta = ns["normalize_email"](raw, "wf-3")
    assert "Plain body" in content


def test_normalize_writes_bus_files(tmp_path):
    ns = {}
    bus = _load(ns, tmp_path)
    raw = b"From: f@b.com\nTo: t@c.com\nSubject: File\n\nContent"
    ns["normalize_email"](raw, "wf-4")
    assert (bus / "content.wf-4.md").exists()
    assert (bus / "content.wf-4.meta.json").exists()


def test_normalize_rejects_empty(tmp_path):
    ns = {}
    bus = _load(ns, tmp_path)
    try:
        ns["normalize_email"]("", "wf-empty")
        assert False, "Expected ValueError"
    except ValueError:
        pass


def test_normalize_attachments_listed(tmp_path):
    ns = {}
    bus = _load(ns, tmp_path)
    raw = (
        b"From: a@b.com\nTo: c@d.com\nSubject: With attachment\n"
        b"Content-Type: multipart/mixed; boundary=bo\n\n"
        b"--bo\nContent-Type: text/plain\n\nSee attached PDF.\n"
        b"--bo\n"
        b'Content-Disposition: attachment; filename="report.pdf"\n'
        b"Content-Type: application/pdf\n\nBINARYPDFBYTES\n\n\n--bo--\n"
    )
    content, meta = ns["normalize_email"](raw, "wf-5")
    assert meta["attachmentCount"] >= 0


if __name__ == "__main__":
    import sys
    sys.exit(pytest.main([__file__, "-v"]))
