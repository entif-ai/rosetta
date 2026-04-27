"""
test_dispatch.py — comprehensive tests for stages/05-codify/dispatch.py

Covers:
  - load_stores / filter_enabled
  - build_store_payload field correctness
  - dispatch: empty stores, all succeed, partial failure
  - format_report human-readable output
  - StoreResult dataclass
"""

import json
import tempfile
from pathlib import Path
from unittest.mock import patch, MagicMock

import pytest

import sys
from pathlib import Path

# Resolve dispatch.py from stages/05-codify/
sys.path.insert(0, str(Path(__file__).parent.parent / "stages" / "05-codify"))
from dispatch import (
    load_stores, filter_enabled, build_store_payload,
    dispatch, format_report,
    StoreResult, DispatchReport,
)


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture
def stores_file(tmp_path):
    path = tmp_path / "stores.json"
    return path


@pytest.fixture
def sample_packet():
    return {
        "kind": "entif.assimilation.packet",
        "packetId": "aap_test123",
        "sourceRef": "wf_test",
        "runRef": "run_001",
        "semantic": {
            "summaries": {"abstract": "Test doc"},
            "entities": [{"name": "Alice", "type": "person"}],
            "relations": [],
            "conceptRefs": ["ai"],
        },
        "epistemic": {
            "claims": ["Alice exists"],
            "evidenceRefs": [],
            "uncertainties": [],
            "contradictions": [],
        },
        "operational": {
            "tasks": ["Write tests"],
            "decisions": [],
            "risks": [],
            "openQuestions": [],
        },
        "associative": {
            "duplicates": [],
            "relatedArtifacts": [],
            "supportEdges": [],
            "conflictEdges": [],
        },
        "creative": {
            "optionalHypotheses": [],
        },
        "scores": {"novelty": 0.8, "relevance": 0.9},
        "memoryWrites": [],
        "promotionCandidates": [],
        "receipts": [],
    }


# ---------------------------------------------------------------------------
# load_stores
# ---------------------------------------------------------------------------

class TestLoadStores:
    def test_loads_valid_stores_json(self, stores_file):
        stores_file.write_text(json.dumps({
            "stores": [{"id": "hindsight", "enabled": True}]
        }))
        stores = load_stores(stores_file)
        assert len(stores) == 1
        assert stores[0]["id"] == "hindsight"

    def test_missing_file_returns_empty_list(self, tmp_path):
        assert load_stores(tmp_path / "nonexistent.json") == []

    def test_empty_stores_array(self, stores_file):
        stores_file.write_text('{"stores": []}')
        assert load_stores(stores_file) == []

    def test_stores_without_enabled_field_default_false(self, stores_file):
        stores_file.write_text('{"stores": [{"id": "test"}]}')
        stores = load_stores(stores_file)
        assert stores[0].get("enabled", False) is False


# ---------------------------------------------------------------------------
# filter_enabled
# ---------------------------------------------------------------------------

class TestFilterEnabled:
    def test_filters_disabled(self):
        stores = [
            {"id": "a", "enabled": True},
            {"id": "b", "enabled": False},
            {"id": "c", "enabled": True},
        ]
        result = filter_enabled(stores)
        assert [s["id"] for s in result] == ["a", "c"]

    def test_all_disabled_returns_empty(self):
        assert filter_enabled([{"id": "a", "enabled": False}]) == []

    def test_all_enabled_returns_all(self):
        stores = [{"id": str(i), "enabled": True} for i in range(3)]
        assert filter_enabled(stores) == stores


# ---------------------------------------------------------------------------
# build_store_payload
# ---------------------------------------------------------------------------

class TestBuildStorePayload:
    def test_required_fields_present(self, stores_file, sample_packet, tmp_path):
        stores_file.write_text(json.dumps({
            "stores": [{"id": "hindsight", "enabled": True, "config": {"bank": "hermes"}}]
        }))
        stores = load_stores(stores_file)
        payload = build_store_payload(
            stores[0], sample_packet, "wf_001", "disp_abc", tmp_path
        )
        assert payload["workflowId"] == "wf_001"
        assert payload["dispatchId"] == "disp_abc"
        assert payload["stage"] == "05-codify"
        assert payload["storeId"] == "hindsight"
        assert payload["handlerModule"] == "stages/05-codify/handlers/store_hindsight"
        assert payload["packetId"] == "aap_test123"
        assert payload["storeConfig"] == {"bank": "hermes"}
        assert "packet" in payload

    def test_unknown_store_no_handler_module(self, stores_file):
        stores_file.write_text('{"stores": [{"id": "unknown_store"}]}')
        stores = load_stores(stores_file)
        payload = build_store_payload(stores[0], {}, "wf", "dp", Path("/tmp"))
        assert payload["handlerModule"] == ""


# ---------------------------------------------------------------------------
# StoreResult dataclass
# ---------------------------------------------------------------------------

class TestStoreResult:
    def test_success_result(self):
        r = StoreResult(store_id="hindsight", success=True, receipt_id="rcpt_xyz")
        assert r.store_id == "hindsight"
        assert r.success is True
        assert r.receipt_id == "rcpt_xyz"
        assert r.error is None

    def test_failure_result(self):
        r = StoreResult(store_id="markdown", success=False, error="connection refused")
        assert r.success is False
        assert r.error == "connection refused"
        assert r.receipt_id is None

    def test_result_with_timing(self):
        r = StoreResult(store_id="qmd", success=True, receipt_id="r", duration_ms=42)
        assert r.duration_ms == 42


# ---------------------------------------------------------------------------
# dispatch — mocking delegate_task
# ---------------------------------------------------------------------------

class TestDispatch:
    def test_dispatch_empty_stores_returns_zero_report(self, sample_packet, tmp_path):
        report = dispatch(sample_packet, [], "wf_001", tmp_path)
        assert report.stores_attempted == 0
        assert report.stores_succeeded == 0
        assert report.stores_failed == 0
        assert report.results == []

    @patch("dispatch.delegate_task")
    def test_dispatch_all_stores_succeed(self, mock_delegate, sample_packet, tmp_path):
        # delegate_task returns a list of result dicts
        mock_delegate.return_value = [
            {"storeId": "hindsight", "success": True, "receiptId": "rcpt_h", "error": None},
            {"storeId": "markdown",  "success": True, "receiptId": "rcpt_m", "error": None},
        ]
        stores = [
            {"id": "hindsight", "enabled": True},
            {"id": "markdown",   "enabled": True},
        ]
        report = dispatch(sample_packet, stores, "wf_001", tmp_path)
        assert report.stores_attempted == 2
        assert report.stores_succeeded == 2
        assert report.stores_failed == 0
        assert len(report.results) == 2
        assert all(r.success for r in report.results)

    @patch("dispatch.delegate_task")
    def test_dispatch_partial_failure(self, mock_delegate, sample_packet, tmp_path):
        mock_delegate.return_value = [
            {"storeId": "hindsight", "success": True,  "receiptId": "rcpt_h", "error": None},
            {"storeId": "markdown",   "success": False, "receiptId": None,  "error": "timeout"},
        ]
        stores = [
            {"id": "hindsight", "enabled": True},
            {"id": "markdown",   "enabled": True},
        ]
        report = dispatch(sample_packet, stores, "wf_001", tmp_path)
        assert report.stores_succeeded == 1
        assert report.stores_failed == 1
        assert report.results[1].error == "timeout"

    @patch("dispatch.delegate_task")
    def test_dispatch_all_fail(self, mock_delegate, sample_packet, tmp_path):
        mock_delegate.return_value = [
            {"storeId": "hindsight", "success": False, "receiptId": None, "error": "auth failed"},
        ]
        report = dispatch(sample_packet, [{"id": "hindsight", "enabled": True}], "wf", tmp_path)
        assert report.stores_failed == 1
        assert report.stores_succeeded == 0

    @patch("dispatch.delegate_task")
    def test_dispatch_passes_correct_task_count(self, mock_delegate, sample_packet, tmp_path):
        mock_delegate.return_value = []
        stores = [{"id": f"store_{i}", "enabled": True} for i in range(3)]
        dispatch(sample_packet, stores, "wf_001", tmp_path)
        # delegate_task called once with 3 tasks
        mock_delegate.assert_called_once()
        tasks_arg = mock_delegate.call_args.kwargs["tasks"]
        assert len(tasks_arg) == 3

    @patch("dispatch.delegate_task")
    def test_dispatch_max_concurrent_passed(self, mock_delegate, sample_packet, tmp_path):
        mock_delegate.return_value = []
        stores = [{"id": "h", "enabled": True}]
        dispatch(sample_packet, stores, "wf", tmp_path, max_concurrent=2)
        mock_delegate.assert_called_once()
        assert mock_delegate.call_args.kwargs.get("max_concurrent") == 2


# ---------------------------------------------------------------------------
# format_report
# ---------------------------------------------------------------------------

class TestFormatReport:
    def test_all_ok_report(self):
        report = DispatchReport(
            dispatch_id="dp_001",
            workflow_id="wf_001",
            packet_id="aap_xyz",
            stores_attempted=2,
            stores_succeeded=2,
            stores_failed=0,
            duration_ms=150,
            results=[
                StoreResult(store_id="hindsight", success=True, receipt_id="rcpt_1"),
                StoreResult(store_id="markdown",  success=True, receipt_id="rcpt_2"),
            ],
        )
        lines = format_report(report).splitlines()
        assert any("2/2 OK" in l for l in lines)
        assert any("dp_001" in l for l in lines)
        assert any("rcpt_1" in l for l in lines)

    def test_failures_shown(self):
        report = DispatchReport(
            dispatch_id="dp_002",
            workflow_id="wf_001",
            packet_id="aap_xyz",
            stores_attempted=2,
            stores_succeeded=1,
            stores_failed=1,
            duration_ms=80,
            results=[
                StoreResult(store_id="hindsight", success=True,  receipt_id="rcpt_1"),
                StoreResult(store_id="markdown",  success=False, error="conn refused"),
            ],
        )
        report_text = format_report(report)
        assert "FAILURES(1)" in report_text
        assert "conn refused" in report_text

    def test_no_receipt_shown(self):
        report = DispatchReport(
            dispatch_id="dp_003",
            workflow_id="wf",
            packet_id="aap",
            stores_attempted=1,
            stores_succeeded=0,
            stores_failed=1,
            results=[StoreResult(store_id="qmd", success=False, error="boom")],
        )
        assert "NO RECEIPT" in format_report(report)
