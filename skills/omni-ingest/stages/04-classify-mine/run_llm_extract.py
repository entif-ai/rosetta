#!/usr/bin/env python3
"""
run_llm_extract.py — Stage 4 LLM sub-agent entry point.

Each sub-agent calls this once per chunk:
  python3 run_llm_extract.py <payload_path>

What it does:
  1. Reads the payload JSON file (built by stage_04_invoke._build_llm_payload)
  2. Calls OpenAI structured output API for extraction
  3. Writes result to bus/chunk.<workflow_id>.<chunk_id>.json
  4. Prints 5-field JSON summary to stdout (the delegation result)

The output format (5-field summary to stdout):
  {
    "chunk_id": "<chunk_id>",
    "status": "completed" | "failed",
    "output_ref": "bus/chunk.<workflow_id>.<chunk_id>.json",
    "error": null | "<error message>",
    "duration_ms": 1234,
    "chunk_index": 0
  }
"""

import json
import sys
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Configuration — override via environment if needed
# ---------------------------------------------------------------------------

API_KEY = "OPENAI_API_KEY"
MODEL = "gpt-4.1"  # or gpt-4o, gpt-4o-mini, gpt-5, etc.
BASE_URL = "https://api.openai.com/v1"

# Resolve skill root relative to this script
_SCRIPT_DIR = Path(__file__).parent
_SKILL_ROOT = _SCRIPT_DIR.parent.parent
_BUS_DIR = _SKILL_ROOT / "bus"

# ---------------------------------------------------------------------------
# LLM extraction prompt (sent to the model)
# ---------------------------------------------------------------------------

EXTRACTION_SCHEMA = {
    "name": "AssimilationPacketFragment",
    "description": "Structured extraction from one document chunk — Stage 4 leaf agent output.",
    "schema": {
        "type": "object",
        "properties": {
            "chunkId": {"type": "string"},
            "sourceRef": {"type": "string"},
            "runRef": {"type": "string"},
            "hygiene": {
                "type": "object",
                "properties": {
                    "verdict": {"type": "string", "enum": ["benign", "suspicious", "quarantine"]},
                    "notes": {"type": "array", "items": {"type": "string"}},
                },
            },
            "semantic": {
                "type": "object",
                "properties": {
                    "summaries": {
                        "type": "object",
                        "properties": {
                            "abstract": {"type": "string"},
                            "executive": {"type": "string"},
                            "detailed": {"type": "string"},
                        },
                    },
                    "entities": {"type": "array", "items": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "type": {"type": "string"},
                            "evidence": {"type": "string"},
                        },
                    }},
                    "relations": {"type": "array", "items": {"type": "object"}},
                    "conceptRefs": {"type": "array", "items": {"type": "string"}},
                },
            },
            "epistemic": {
                "type": "object",
                "properties": {
                    "claims": {"type": "array", "items": {"type": "object"}},
                    "evidenceRefs": {"type": "array", "items": {"type": "string"}},
                    "uncertainties": {"type": "array", "items": {"type": "object"}},
                    "contradictions": {"type": "array", "items": {"type": "object"}},
                },
            },
            "operational": {
                "type": "object",
                "properties": {
                    "tasks": {"type": "array", "items": {"type": "object"}},
                    "decisions": {"type": "array", "items": {"type": "object"}},
                    "risks": {"type": "array", "items": {"type": "object"}},
                    "openQuestions": {"type": "array", "items": {"type": "object"}},
                },
            },
            "associative": {
                "type": "object",
                "properties": {
                    "duplicates": {"type": "array", "items": {"type": "object"}},
                    "relatedArtifacts": {"type": "array", "items": {"type": "string"}},
                    "supportEdges": {"type": "array", "items": {"type": "object"}},
                    "conflictEdges": {"type": "array", "items": {"type": "object"}},
                },
            },
            "creative": {
                "type": "object",
                "properties": {
                    "optionalHypotheses": {"type": "array", "items": {"type": "string"}},
                },
            },
            "scores": {
                "type": "object",
                "additionalProperties": {"type": "number"},
            },
            "promotionCandidates": {"type": "array", "items": {"type": "string"}},
        },
        "required": ["chunkId", "sourceRef", "runRef", "hygiene", "semantic",
                     "epistemic", "operational", "associative", "creative",
                     "scores", "promotionCandidates"],
    },
}


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python3 run_llm_extract.py <payload_path>", file=sys.stderr)
        sys.exit(1)

    payload_path = Path(sys.argv[1])
    if not payload_path.exists():
        _die("payload file not found", payload_path, None)

    try:
        payload = json.loads(payload_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        _die(f"invalid JSON in payload: {e}", payload_path, None)

    chunk_id = payload.get("chunkId", "?")
    workflow_id = payload.get("workflowId", "?")
    chunk_index = payload.get("chunkIndex", -1)
    total_chunks = payload.get("totalChunks", -1)
    chunk_content = payload.get("chunkContent", "")
    sanitization = payload.get("sanitization", {})
    manifest = payload.get("manifest", {})
    task_instructions = payload.get(
        "taskInstructions",
        "Extract structured entities, claims, tasks, risks, and relations from the chunk."
    )

    run_ref = f"run_{uuid.uuid4().hex[:12]}"
    start_ms = int(time.time() * 1000)

    # ------------------------------------------------------------------
    # Build the extraction prompt
    # ------------------------------------------------------------------
    system_message = (
        "You are a Stage 4 leaf mining agent. "
        "Your job is to extract structured information from one chunk of a document. "
        "Be precise: preserve original wording for evidence. "
        "Output valid JSON matching the provided schema."
    )

    user_message = (
        f"Extract structured information from this document chunk.\n\n"
        f"Metadata:\n"
        f"  chunk_id: {chunk_id}\n"
        f"  chunk_index: {chunk_index} of {total_chunks}\n"
        f"  lines: {payload.get('chunkMeta', {}).get('lineStart', '?')}–"
        f"{payload.get('chunkMeta', {}).get('lineEnd', '?')}\n"
        f"  sanitization verdict: {sanitization.get('verdict', 'unknown')}\n"
        f"  source: {manifest.get('trigger', {}).get('sourceRef', 'unknown')}\n\n"
        f"Task instructions: {task_instructions}\n\n"
        f"Content to analyze:\n"
        f"{'='*60}\n"
        f"{chunk_content}\n"
        f"{'='*60}\n\n"
        f"Output a JSON object with fields: chunkId, sourceRef, runRef, hygiene, "
        f"semantic (entities, relations, conceptRefs), epistemic (claims, evidenceRefs, "
        f"uncertainties, contradictions), operational (tasks, decisions, risks, openQuestions), "
        f"associative (duplicates, relatedArtifacts, supportEdges, conflictEdges), "
        f"creative (optionalHypotheses), scores (informal/1-5, novelty/1-5, "
        f"actionability/1-5, confidence/0-1), promotionCandidates."
    )

    # ------------------------------------------------------------------
    # Call OpenAI structured output API
    # ------------------------------------------------------------------
    try:
        import os as _os
        api_key = _os.environ.get(API_KEY, "")
        if not api_key:
            raise ValueError(f"${API_KEY} not set")

        import urllib.request as _urllib
        import urllib.error as _urllib_error

        url = f"{BASE_URL}/chat/completions"
        req_body = {
            "model": MODEL,
            "messages": [
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message},
            ],
            "response_format": {
                "type": "json_schema",
                "json_schema": EXTRACTION_SCHEMA,
            },
            "temperature": 0.2,
        }

        req = _urllib.Request(
            url,
            data=json.dumps(req_body).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )

        with _urllib.urlopen(req, timeout=55) as resp:
            resp_text = resp.read().decode("utf-8")
            resp_data = json.loads(resp_text)

        choice = resp_data["choices"][0]
        raw_output = choice["message"]["content"].strip()

        # Strip markdown code fences if present
        if raw_output.startswith("```"):
            raw_output = raw_output.split("```")[1]
            if raw_output.startswith("json"):
                raw_output = raw_output[4:]
            raw_output = raw_output.strip().strip("`").strip()

        extraction = json.loads(raw_output)

    except Exception as exc:
        _die(f"LLM API call failed: {exc}", payload_path, start_ms,
             chunk_id=chunk_id, workflow_id=workflow_id, chunk_index=chunk_index)

    # ------------------------------------------------------------------
    # Write output JSON to bus
    # ------------------------------------------------------------------
    duration_ms = int(time.time() * 1000) - start_ms
    output_ref = f"chunk.{workflow_id}.{chunk_id}.json"
    output_path = _BUS_DIR / output_ref

    try:
        _BUS_DIR.mkdir(parents=True, exist_ok=True)
        output_path.write_text(
            json.dumps(extraction, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
    except Exception as exc:
        _die(f"failed to write output: {exc}", payload_path, start_ms,
             chunk_id=chunk_id, workflow_id=workflow_id, chunk_index=chunk_index)

    # ------------------------------------------------------------------
    # Print 5-field summary to stdout (this is the delegation result)
    # ------------------------------------------------------------------
    summary = {
        "chunk_id": chunk_id,
        "status": "completed",
        "output_ref": str(output_path),
        "error": None,
        "duration_ms": duration_ms,
        "chunk_index": chunk_index,
    }
    print(json.dumps(summary), flush=True)


def _die(
    error: str,
    payload_path: Path | None,
    start_ms: int | None,
    **kwargs,
) -> None:
    """Print error summary to stdout (JSON) and exit non-zero."""
    duration_ms = int(time.time() * 1000) - (start_ms or 0)
    chunk_id = kwargs.get("chunk_id", "?")
    workflow_id = kwargs.get("workflow_id", "?")
    chunk_index = kwargs.get("chunk_index", -1)

    print(json.dumps({
        "chunk_id": chunk_id,
        "status": "failed",
        "output_ref": None,
        "error": error[:200],
        "duration_ms": duration_ms,
        "chunk_index": chunk_index,
    }), flush=True)
    sys.exit(1)


if __name__ == "__main__":
    main()
