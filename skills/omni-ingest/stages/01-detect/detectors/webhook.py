"""
webhook.py — omni-ingest Stage 1 detector: GitHub/GitLab-compatible webhook receiver.

Receives POST /webhook with HMAC-SHA256 signature verification, parses the payload,
and delegates to user_submit.detect() for content ingestion.

API:
  Flask POST /webhook                     — receive & verify signed payload
  Flask GET  /webhook/health              — liveness probe

Environment / config:
  WEBHOOK_SECRET  — shared secret for HMAC verification (set in env or config)

Raises:
  401 if X-Hub-Signature-256 header is missing or invalid
  400 if payload is missing the required "content" field
  500 if user_submit.detect() raises an exception
"""

from __future__ import annotations

import hashlib
import hmac
import json
import os
from pathlib import Path
from typing import TYPE_CHECKING

from flask import Flask, request, jsonify

if TYPE_CHECKING:
    from typing import Any

# Resolve relative to this file's location
_SKILL_ROOT = Path(__file__).parent.parent.parent


def _make_hmac(payload: bytes, secret: str) -> str:
    """
    Compute the canonical HMAC-SHA256 hexdigest for a payload.

    Args:
        payload: Raw request body bytes.
        secret:   Shared secret string.

    Returns:
        hex-encoded HMAC (no 'sha256=' prefix — caller adds it for the header).
    """
    return hmac.new(secret.encode("utf-8"), payload, hashlib.sha256).hexdigest()


def _verify_hmac(payload: bytes, signature_header: str, secret: str) -> bool:
    """
    Verify an HMAC-SHA256 signature against a payload.

    Args:
        payload:          Raw request body bytes.
        signature_header: Value of the X-Hub-Signature-256 header
                          (expected format: 'sha256=<hex>').
        secret:           Shared secret string.

    Returns:
        True if the signature matches, False otherwise.
    """
    if not signature_header:
        return False
    # Strip 'sha256=' prefix if present
    sig = signature_header
    if sig.startswith("sha256="):
        sig = sig[len("sha256="):]
    expected = _make_hmac(payload, secret)
    return hmac.compare_digest(expected, sig)


def _parse_payload(payload: bytes) -> tuple[dict | None, str | None]:
    """
    Parse a JSON webhook payload.

    Args:
        payload: Raw request body bytes.

    Returns:
        A (parsed_dict, error_message) tuple.
        error_message is None on success; parsed_dict is None on error.
    """
    try:
        data = json.loads(payload.decode("utf-8"))
    except (ValueError, UnicodeDecodeError) as exc:
        return None, f"invalid JSON payload: {exc}"

    if not isinstance(data, dict):
        return None, "payload must be a JSON object"
    if "content" not in data:
        return None, "payload is missing required 'content' field"
    return data, None


def create_app(
    secret: str | None = None,
    user_submit_ns: dict[str, Any] | None = None,
) -> Flask:
    """
    Build and configure the Flask webhook application.

    Args:
        secret: Override for WEBHOOK_SECRET.
               If not provided, reads from WEBHOOK_SECRET env var.
        user_submit_ns: The exec namespace containing the user_submit module.
                       Allows test fixtures to inject patched detect.

    Returns:
        Configured Flask application.
    """
    # Use a static import_name so Flask can resolve the root path reliably
    # even when the module is loaded via exec() rather than a real import.
    # We must intercept auto_find_instance_path() before Flask's __init__
    # calls it; we do this by patching the class method temporarily.
    _root = str(Path(__file__).parent)

    # Patch Flask.auto_find_instance_path at the class level so that any
    # call to Flask() (including via exec'd code) picks up the override.
    import flask.app as _flask_app
    _orig_find_instance = _flask_app.Flask.auto_find_instance_path
    _flask_app.Flask.auto_find_instance_path = lambda self: _root
    try:
        app = Flask("stages._01_detect.detectors.webhook")
        app.instance_path = _root
    finally:
        _flask_app.Flask.auto_find_instance_path = _orig_find_instance

    app.config["WEBHOOK_SECRET"] = (
        secret if secret is not None
        else os.environ.get("WEBHOOK_SECRET", "")
    )

    # Store reference to the user_submit namespace for detect calls.
    # Tests patch this namespace's globals (e.g., _BUS_DIR, detect) before
    # calling create_app(), so the route handler will use the patched values.
    app._user_submit_ns = user_submit_ns  # type: ignore[attr-defined]

    # ------------------------------------------------------------------
    # Routes
    # ------------------------------------------------------------------

    @app.route("/webhook", methods=["POST"])
    def webhook():
        """
        Receive a signed webhook payload, verify HMAC, and invoke detect.

        Headers:
          X-Hub-Signature-256  — HMAC-SHA256 signature, format: sha256=<hex>
        """
        # --- HMAC verification ---
        raw_secret = app.config["WEBHOOK_SECRET"]
        if not raw_secret:
            return jsonify({"error": "webhook not configured: missing secret"}), 401

        signature = request.headers.get("X-Hub-Signature-256", "")
        if not signature:
            return jsonify({"error": "missing X-Hub-Signature-256 header"}), 401

        payload = request.get_data()
        if not _verify_hmac(payload, signature, raw_secret):
            return jsonify({"error": "invalid signature"}), 401

        # --- Parse payload ---
        data, parse_err = _parse_payload(payload)
        if parse_err:
            return jsonify({"error": parse_err}), 400

        # --- Call detect via the namespace (supports test patching) ---
        detect_fn = app._user_submit_ns["detect"]
        try:
            manifest = detect_fn(
                content=data["content"],
                content_type_hint=data.get("content_type_hint"),
                user_instructions=data.get("user_instructions"),
                original_filename=data.get("original_filename"),
                mtime=data.get("mtime"),
            )
        except Exception as exc:
            return jsonify({"error": f"detect failed: {exc}"}), 500

        return jsonify(manifest), 202

    @app.route("/webhook/health", methods=["GET"])
    def health():
        """Liveness probe."""
        return jsonify({"status": "ok"}), 200

    return app


# ------------------------------------------------------------------
# WSGI entry point (for gunicorn / uvicorn)
# ------------------------------------------------------------------

def _get_app():
    """WSGI factory compatible with gunicorn --wsgi-module."""
    return create_app()


if __name__ == "__main__":
    import os as _os
    port = int(_os.environ.get("WEBHOOK_PORT", 5001))
    secret = _os.environ.get("WEBHOOK_SECRET", "")
    app = create_app(secret=secret)
    app.run(host="0.0.0.0", port=port, debug=True)
