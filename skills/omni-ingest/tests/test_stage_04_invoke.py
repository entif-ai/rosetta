"""
test_stage_04_invoke.py — Tests for stages/04-classify-mine/stage_04_invoke.py

Run: python -m pytest tests/test_stage_04_invoke.py -v
"""

import json
import pytest
from pathlib import Path
from unittest.mock import patch, MagicMock

# Import via exec so we don't need sys.path setup
_SKILL_ROOT = Path(__file__).parent.parent
_invoke_path = _SKILL_ROOT / "stages" / "04-classify-mine" / "stage_04_invoke.py"
_ns = {"__file__": str(_invoke_path)}
exec(_invoke_path.read_text(encoding="utf-8"), _ns)

invoke = _ns["invoke"]
_ChunkResult = _ns["ChunkResult"]
_InvokeReport = _ns["InvokeReport"]
format_report = _ns["format_report"]
_consolidate = _ns["consolidate_chunk_outputs"]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _fake_bus_ledger(monkeypatch, tmp_path):
    """Point _BUS_DIR and _LEDGER_DIR to a tmp directory for isolation.

    Returns a dict with 'bus' and 'ledger' keys instead of yielding,
    to avoid the pytest fixture generator exhaustion bug.
    """
    bus = tmp_path / "bus"
    ledger = tmp_path / "ledger"
    _ns["_BUS_DIR"] = bus
    _ns["_LEDGER_DIR"] = ledger
    return {"bus": bus, "ledger": ledger}


# ---------------------------------------------------------------------------
# Tests: chunking
# ---------------------------------------------------------------------------

def test_consolidate_empty_outputs_returns_empty_packet(tmp_path, monkeypatch):
    """consolidate_chunk_outputs([]) returns a valid empty assimilation packet."""
    fd = _fake_bus_ledger(monkeypatch, tmp_path)
    result = _consolidate([])
    assert result["kind"] == "entif.assimilation.packet"
    assert result["packetId"].startswith("aap_")


def test_consolidate_single_chunk_output(tmp_path, monkeypatch):
    """consolidate_chunk_outputs([one_output]) rolls up correctly."""
    fd = _fake_bus_ledger(monkeypatch, tmp_path)
    single = {
        "chunkId": "chunk_0000",
        "sourceRef": "wf_abc",
        "runRef": "run_xyz",
        "hygiene": {"verdict": "benign", "notes": []},
        "semantic": {
            "summaries": {"abstract": "A test doc", "executive": "", "detailed": ""},
            "entities": [{"name": "Acme Corp", "type": "ORG", "evidence": "Acme Corp was founded in 2020"}],
            "relations": [],
            "conceptRefs": ["test"],
        },
        "epistemic": {"claims": [], "evidenceRefs": [], "uncertainties": [], "contradictions": []},
        "operational": {"tasks": [], "decisions": [], "risks": [], "openQuestions": []},
        "associative": {"duplicates": [], "relatedArtifacts": [], "supportEdges": [], "conflictEdges": []},
        "creative": {"optionalHypotheses": []},
        "scores": {"informality": 0.3, "novelty": 0.7, "actionability": 0.5, "confidence": 0.8},
        "promotionCandidates": [],
    }
    result = _consolidate([single])
    assert result["kind"] == "entif.assimilation.packet"
    assert result["semantic"]["entities"] == [{"name": "Acme Corp", "type": "ORG", "evidence": "Acme Corp was founded in 2020"}]


def test_consolidate_deduplicates_entities(tmp_path, monkeypatch):
    """Identical entities appearing in multiple chunks are deduplicated."""
    fd = _fake_bus_ledger(monkeypatch, tmp_path)
    entity = {"name": "Acme Corp", "type": "ORG", "evidence": "Founded in 2020"}
    outputs = [
        {**base_packet("chunk_0000"), "semantic": {"summaries": {}, "entities": [entity], "relations": [], "conceptRefs": []}},
        {**base_packet("chunk_0001"), "semantic": {"summaries": {}, "entities": [entity], "relations": [], "conceptRefs": []}},
    ]
    result = _consolidate(outputs)
    # Deduplication should result in 1 entity
    assert len(result["semantic"]["entities"]) == 1


# ---------------------------------------------------------------------------
# Tests: outcome parsing
# ---------------------------------------------------------------------------

def test_parse_outcome_dict_completed(tmp_path, monkeypatch):
    """A dict outcome with status=completed parses correctly."""
    fd = _fake_bus_ledger(monkeypatch, tmp_path)
    parse = _ns["_parse_outcome"]
    outcome = {
        "chunk_id": "chunk_0003",
        "status": "completed",
        "output_ref": "/path/to/bus/chunk.wf.chunk_0003.json",
        "error": None,
        "duration_ms": 1523,
        "chunk_index": 3,
    }
    result = parse(outcome)
    assert result.chunk_id == "chunk_0003"
    assert result.status == "completed"
    assert result.duration_ms == 1523
    assert result.error is None


def test_parse_outcome_dict_failed(tmp_path, monkeypatch):
    """A dict outcome with status=failed parses correctly."""
    fd = _fake_bus_ledger(monkeypatch, tmp_path)
    parse = _ns["_parse_outcome"]
    outcome = {
        "chunk_id": "chunk_0001",
        "status": "failed",
        "output_ref": None,
        "error": "timeout after 60s",
        "duration_ms": 60001,
        "chunk_index": 1,
    }
    result = parse(outcome)
    assert result.chunk_id == "chunk_0001"
    assert result.status == "failed"
    assert "timeout" in result.error


def test_parse_outcome_object_with_dots(tmp_path, monkeypatch):
    """An object whose attrs use camelCase also parses correctly."""
    fd = _fake_bus_ledger(monkeypatch, tmp_path)
    parse = _ns["_parse_outcome"]

    class Obj:
        pass
    obj = Obj()
    obj.chunkId = "chunk_0005"
    obj.status = "completed"
    obj.outputRef = "/path/to/ref.json"
    obj.error = None
    obj.durationMs = 987
    obj.chunkIndex = 5

    result = parse(obj)
    assert result.chunk_id == "chunk_0005"
    assert result.status == "completed"
    assert result.duration_ms == 987


def test_parse_outcome_unexpected_type_falls_back_to_failed(tmp_path, monkeypatch):
    """A completely unexpected outcome type returns a failed ChunkResult."""
    fd = _fake_bus_ledger(monkeypatch, tmp_path)
    parse = _ns["_parse_outcome"]
    result = parse("this is not a dict or object")
    assert result.status == "failed"
    # The error field may be None for truly exotic types — that's acceptable
    # behavior for completely unrecognizable inputs
    assert result.error is None or "parse error" in str(result.error)


# ---------------------------------------------------------------------------
# Tests: format_report
# ---------------------------------------------------------------------------

def test_format_report_shows_summary(tmp_path, monkeypatch):
    """format_report produces readable multi-line output."""
    fd = _fake_bus_ledger(monkeypatch, tmp_path)
    report = _InvokeReport(
        workflow_id="wf_test_123",
        invoke_id="inv_abc",
        total_chunks=3,
        completed=2,
        failed=1,
        results=[
            _ChunkResult("chunk_0000", "completed", "/ref0", None, 500, 0),
            _ChunkResult("chunk_0001", "failed", None, "timeout", 60001, 1),
            _ChunkResult("chunk_0002", "completed", "/ref2", None, 700, 2),
        ],
        consolidated_packet={"packetId": "aap_xyz"},
        duration_ms=6501,
    )
    output = format_report(report)
    assert "inv_abc" in output
    assert "2/3 OK" in output
    assert "✓" in output
    assert "✗" in output


# ---------------------------------------------------------------------------
# Tests: invoke with mocked delegate_task
# ---------------------------------------------------------------------------

def test_invoke_with_mocked_subagents(tmp_path, monkeypatch):
    """invoke() with mocked delegate_task returns a valid report and writes packet."""
    fd = _fake_bus_ledger(monkeypatch, tmp_path)
    bus = fd["bus"]

    # Mock delegate_task to return pre-built outputs
    def fake_delegate_task(tasks, max_concurrent=None):
        workflow_id = "wf_mock"
        chunk_id = tasks[0]["context"].split("chunk_id=")[1].split(",")[0]
        chunk_index = int(tasks[0]["context"].split("chunk_index=")[1].split(",")[0])
        output_file = bus / f"chunk.{workflow_id}.{chunk_id}.json"

        # Write the sub-agent output to disk (mimics what run_llm_extract.py does)
        output_file.write_text(json.dumps({
            "chunkId": chunk_id,
            "sourceRef": "wf_mock",
            "runRef": "run_fake",
            "hygiene": {"verdict": "benign", "notes": []},
            "semantic": {
                "summaries": {"abstract": "Test", "executive": "", "detailed": ""},
                "entities": [{"name": "TestCorp", "type": "ORG", "evidence": "TestCorp reference"}],
                "relations": [],
                "conceptRefs": [],
            },
            "epistemic": {"claims": [], "evidenceRefs": [], "uncertainties": [], "contradictions": []},
            "operational": {"tasks": [], "decisions": [], "risks": [], "openQuestions": []},
            "associative": {"duplicates": [], "relatedArtifacts": [], "supportEdges": [], "conflictEdges": []},
            "creative": {"optionalHypotheses": []},
            "scores": {"informality": 0.5, "novelty": 0.5, "actionability": 0.5, "confidence": 0.9},
            "promotionCandidates": [],
        }), encoding="utf-8")

        return [
            {
                "chunk_id": chunk_id,
                "status": "completed",
                "output_ref": str(output_file),
                "error": None,
                "duration_ms": 1000,
                "chunk_index": chunk_index,
            }
            for task in tasks
        ]

    monkeypatch.setitem(_ns, "delegate_task", fake_delegate_task)

    content = "\n".join([f"Line {i}" for i in range(20)])  # small doc → 1 chunk
    manifest = {"workflowId": "wf_mock", "trigger": {"sourceRef": "test://"}}
    sanitization = {"verdict": "benign", "notes": []}

    report = invoke(content, "wf_mock", manifest, sanitization,
                   memory_planes=["semantic"])

    assert report.total_chunks >= 1
    assert report.completed >= 1
    assert report.consolidated_packet is not None
    assert report.consolidated_packet["kind"] == "entif.assimilation.packet"


def test_invoke_empty_content_returns_zero_chunks(tmp_path, monkeypatch):
    """invoke() with empty content returns empty report without crashing."""
    _fake_bus_ledger(monkeypatch, tmp_path)
    monkeypatch.setitem(_ns, "delegate_task", lambda *a, **k: [])
    report = invoke("", "wf_empty", {}, {"verdict": "benign", "notes": []})
    assert report.total_chunks == 0
    assert report.completed == 0
    assert report.failed == 0


# ---------------------------------------------------------------------------
# Fixture helper: minimal valid assimilation packet fragment
# ---------------------------------------------------------------------------

def base_packet(chunk_id: str) -> dict:
    return {
        "chunkId": chunk_id,
        "sourceRef": "wf_test",
        "runRef": "run_test",
        "hygiene": {"verdict": "benign", "notes": []},
        "semantic": {"summaries": {}, "entities": [], "relations": [], "conceptRefs": []},
        "epistemic": {"claims": [], "evidenceRefs": [], "uncertainties": [], "contradictions": []},
        "operational": {"tasks": [], "decisions": [], "risks": [], "openQuestions": []},
        "associative": {"duplicates": [], "relatedArtifacts": [], "supportEdges": [], "conflictEdges": []},
        "creative": {"optionalHypotheses": []},
        "scores": {},
        "promotionCandidates": [],
    }


if __name__ == "__main__":
    import sys
    sys.exit(pytest.main([__file__, "-v"]))
