"""
normalize_email.py — omni-ingest Stage 2 normalizer: RFC 822 email → Markdown.

Parses an email message (raw RFC 822 bytes or text), extracts subject/from/to/date,
body text (text/plain preferred; text/html via html2text fallback), and attachments
(metadata only — Stage 1 handles file attachments).

API:
  def normalize_email(
      raw: str | bytes,
      workflow_id: str,
      original_filename: str | None = None,
  ) -> tuple[str, dict]:
      # Returns (markdown_content, meta_dict)

Run: python -m pytest tests/test_normalize_email.py -v
"""

from __future__ import annotations

import email.policy
import email.parser
import email.message
import email.utils
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

# Resolve relative to this file's location
_SKILL_ROOT = Path(__file__).parent.parent.parent
_BUS_DIR = _SKILL_ROOT / "bus"


# ---------------------------------------------------------------------------
# Email parsing
# ---------------------------------------------------------------------------

def _raw_to_message(raw: str | bytes) -> email.message.Message:
    """Parse raw email bytes/string into an email.message.Message."""
    if isinstance(raw, str):
        raw = raw.encode("utf-8")
    parser = email.parser.BytesParser(policy=email.policy.default)
    return parser.parsebytes(raw)


def _get_header(msg: email.message.Message, name: str, default: str = "") -> str:
    val = msg.get(name, "")
    if not val:
        return default
    try:
        decoded = email.utils.decode_safely(val)
        if isinstance(decoded, list):
            decoded = " ".join(decoded)
        return decoded.strip()
    except Exception:
        return val.strip()


def _get_date(msg: email.message.Message) -> str:
    date_str = msg.get("Date", "")
    if not date_str:
        return datetime.now(timezone.utc).isoformat()
    try:
        parsed = email.utils.parsedate_to_datetime(date_str)
        return parsed.isoformat()
    except Exception:
        return date_str


def _get_sender(msg: email.message.Message) -> str:
    sender = _get_header(msg, "From")
    if not sender:
        sender = _get_header(msg, "Sender")
    if not sender:
        sender = _get_header(msg, "Return-Path", "unknown")
    return sender


def _get_recipients(msg: email.message.Message) -> str:
    to = _get_header(msg, "To")
    cc = _get_header(msg, "Cc")
    parts = [p for p in [to, cc] if p]
    return "; ".join(parts)


def _get_subject(msg: email.message.Message) -> str:
    return _get_header(msg, "Subject", "(no subject)")


def _get_body(msg: email.message.Message) -> str:
    """
    Extract the best text body from an email message.
    Prefers text/plain; falls back to text/html (converted via html2text).
    """
    if msg.is_multipart():
        for part in msg.walk():
            ct = part.get_content_type()
            if ct == "text/plain":
                payload = part.get_payload(decode=True)
                if payload:
                    charset = part.get_content_charset() or "utf-8"
                    return payload.decode(charset, errors="replace").strip()
        # No plain text — try HTML
        for part in msg.walk():
            if part.get_content_type() == "text/html":
                payload = part.get_payload(decode=True)
                if payload:
                    charset = part.get_content_charset() or "utf-8"
                    html = payload.decode(charset, errors="replace")
                    return _html_to_text(html).strip()
    else:
        ct = msg.get_content_type()
        payload = msg.get_payload(decode=True)
        if payload is None:
            return ""
        charset = msg.get_content_charset() or "utf-8"
        text = payload.decode(charset, errors="replace")
        if ct == "text/html":
            return _html_to_text(text).strip()
        return text.strip()
    return ""


def _html_to_text(html: str) -> str:
    """Convert HTML to Markdown using html2text."""
    try:
        import html2text
        h = html2text.HTML2Text()
        h.body_width = 0
        h.ignore_links = False
        h.ignore_images = True
        return h.handle(html)
    except Exception:
        return re.sub(r"<[^>]+>", "", html)


def _extract_attachments(msg: email.message.Message) -> list[dict]:
    """Extract attachment metadata from a message."""
    attachments = []
    for part in msg.walk():
        if part.is_multipart():
            continue
        filename = part.get_filename()
        if not filename:
            disposition = str(part.get("Content-Disposition", ""))
            if "attachment" not in disposition:
                continue
            filename = "unnamed-attachment"
        payload = part.get_payload(decode=True)
        size = len(payload) if payload else 0
        attachments.append({
            "filename": filename,
            "content_type": part.get_content_type(),
            "size_bytes": size,
        })
    return attachments


# ---------------------------------------------------------------------------
# Markdown conversion
# ---------------------------------------------------------------------------

def _to_markdown(
    subject: str,
    sender: str,
    recipients: str,
    date: str,
    body: str,
    attachments: list[dict],
) -> str:
    """Format email fields as a Markdown document."""
    lines = [
        f"# {subject}",
        "",
        f"**From:** {sender}",
        f"**To:** {recipients}",
        f"**Date:** {date}",
    ]
    if attachments:
        att_lines = [f"**Attachments ({len(attachments)}):**"]
        for att in attachments:
            att_lines.append(f"  - {att['filename']} ({att['content_type']}, {att['size_bytes']} bytes)")
        lines.append("")
        lines.extend(att_lines)
    lines.extend(["", "---", "", body])
    return "\n".join(lines) + "\n"


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def normalize_email(
    raw: str | bytes,
    workflow_id: str,
    original_filename: str | None = None,
) -> tuple[str, dict]:
    """
    Parse an RFC 822 email and emit a normalized Markdown document.
    """
    if not raw or (isinstance(raw, str) and not raw.strip()):
        raise ValueError("email content must be non-empty")

    if isinstance(raw, str):
        raw_bytes = raw.encode("utf-8")
    else:
        raw_bytes = raw

    try:
        msg = _raw_to_message(raw_bytes)
    except Exception as exc:
        raise ValueError(f"failed to parse email: {exc}") from exc

    subject = _get_subject(msg)
    sender = _get_sender(msg)
    recipients = _get_recipients(msg)
    date = _get_date(msg)
    body = _get_body(msg)
    attachments = _extract_attachments(msg)

    markdown_content = _to_markdown(subject, sender, recipients, date, body, attachments)

    content_path = _BUS_DIR / f"content.{workflow_id}.md"
    meta_path = _BUS_DIR / f"content.{workflow_id}.meta.json"

    content_path.parent.mkdir(parents=True, exist_ok=True)
    content_path.write_text(markdown_content, encoding="utf-8")

    meta = {
        "originalFilename": original_filename,
        "mimeType": "message/rfc822",
        "normalizedMimeType": "text/markdown",
        "emailSubject": subject,
        "emailFrom": sender,
        "emailTo": recipients,
        "emailDate": date,
        "attachmentCount": len(attachments),
        "normalizedAt": datetime.now(timezone.utc).isoformat(),
        "lineCount": len(markdown_content.splitlines()),
        "wordCount": len(markdown_content.split()),
    }
    meta_path.write_text(json.dumps(meta, indent=2), encoding="utf-8")

    return markdown_content, meta


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: cat email_raw.txt | python normalize_email.py <workflow_id>")
        sys.exit(1)
    workflow_id = sys.argv[1]
    raw = sys.stdin.read().encode("utf-8")
    content, meta = normalize_email(raw, workflow_id)
    print(f"Wrote: content.{workflow_id}.md")
    print(json.dumps(meta, indent=2))
