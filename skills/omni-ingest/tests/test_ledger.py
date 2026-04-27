"""
test_ledger.py — comprehensive tests for lib/ledger.py

Covers:
  - Ledger.__init__
  - fire() / ack() / complete() / fail() transitions
  - entries() and entries_by_stage()
  - stale_entries() — marks entries stale after timeout
  - workflow_state() — all terminal + intermediate states
  - init_workflow()
  - Multiple sub-agents per stage (leaf workers)
  - MAX_ATTEMPTS enforcement
"""

import json
import tempfile
from pathlib import Path
from unittest.mock import patch

import pytest

from lib.ledger import Ledger, MAX_ATTEMPTS


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture
def tmpdir():
    with tempfile.TemporaryDirectory() as d:
        yield Path(d)


@pytest.fixture
def ledger(tmpdir):
    return Ledger(workflow_id="wf_test_001", ledger_dir=tmpdir)


# ---------------------------------------------------------------------------
# Init
# ---------------------------------------------------------------------------

class TestInit:
    def test_creates_ledger_dir(self, tmpdir):
        Ledger(workflow_id="wf_xyz", ledger_dir=tmpdir / "nested")
        assert (tmpdir / "nested").is_dir()

    def test_ledger_path_format(self, ledger):
        assert ledger.path.name == "wf_test_001.jsonl"
        assert ledger.path.parent == ledger.ledger_dir
        # File not created until first write
        assert not ledger.path.exists()


# ---------------------------------------------------------------------------
# fire / ack / complete / fail
# ---------------------------------------------------------------------------

class TestTransitions:
    def test_fire_writes_entry(self, ledger):
        ledger.fire("01-detect")
        entries = ledger.entries()
        assert len(entries) == 1
        assert entries[0]["status"] == "fired"
        assert entries[0]["stage"] == "01-detect"
        assert entries[0]["attempts"] == 1
        assert "createdAt" in entries[0]
        assert "updatedAt" in entries[0]

    def test_fire_with_sub_agent_id(self, ledger):
        ledger.fire("04-classify-mine", sub_agent_id="leaf.chunk.1")
        e = ledger.entries()[0]
        assert e["subAgentId"] == "leaf.chunk.1"
        assert e["status"] == "fired"

    def test_ack_updates_status_and_reflects_output(self, ledger):
        ledger.fire("02-normalize")
        ledger.ack("02-normalize", output_ref="bus/content.md")
        e = ledger.entries()[0]
        assert e["status"] == "acknowledged"
        assert e["outputRef"] == "bus/content.md"

    def test_complete_updates_status(self, ledger):
        ledger.fire("03-sanitize")
        ledger.complete("03-sanitize", output_ref="bus/sanitization.json")
        e = ledger.entries()[0]
        assert e["status"] == "completed"
        assert e["outputRef"] == "bus/sanitization.json"

    def test_fail_increments_attempts_and_records_reason(self, ledger):
        ledger.fire("05-codify", sub_agent_id="store.hindsight")
        ledger.fail("05-codify", sub_agent_id="store.hindsight", reason="timeout")
        e = ledger.entries()[0]
        assert e["status"] == "failed"
        assert e["attempts"] == 2
        assert e["failureReason"] == "timeout"

    def test_multiple_sub_agents_per_stage(self, ledger):
        # Three chunk sub-agents for Stage 4
        for i in range(3):
            ledger.fire("04-classify-mine", sub_agent_id=f"leaf.chunk.{i}")
            ledger.complete("04-classify-mine", sub_agent_id=f"leaf.chunk.{i}")
        entries = ledger.entries_by_stage("04-classify-mine")
        assert len(entries) == 3
        assert all(e["status"] == "completed" for e in entries)

    def test_fail_at_max_attempts_boundary(self, ledger):
        ledger.fire("04-classify-mine")
        for _ in range(MAX_ATTEMPTS + 1):
            ledger.fail("04-classify-mine")
        e = ledger.entries()[0]
        assert e["status"] == "failed"
        assert e["attempts"] == MAX_ATTEMPTS + 2  # 1 initial + N fails


# ---------------------------------------------------------------------------
# Read helpers
# ---------------------------------------------------------------------------

class TestReadHelpers:
    def test_entries_empty_for_new_workflow(self, tmpdir):
        l = Ledger(workflow_id="fresh", ledger_dir=tmpdir)
        assert l.entries() == []

    def test_entries_by_stage(self, ledger):
        ledger.fire("01-detect")
        ledger.fire("02-normalize")
        ledger.fire("03-sanitize")
        assert len(ledger.entries_by_stage("01-detect")) == 1
        assert len(ledger.entries_by_stage("99-unknown")) == 0

    def test_init_workflow(self, ledger):
        manifest = {"workflowId": "wf_test_001", "trigger": {"type": "user_submit"}}
        ledger.init_workflow(manifest)
        entries = ledger.entries()
        assert len(entries) == 1
        assert entries[0]["stage"] == "00-init"
        assert entries[0]["status"] == "completed"
        assert entries[0]["manifest"] == manifest


# ---------------------------------------------------------------------------
# Staleness detection
# ---------------------------------------------------------------------------

class TestStaleness:
    def test_not_stale_under_timeout(self, ledger):
        ledger.fire("04-classify-mine")
        assert ledger.stale_entries() == []

    def test_stale_beyond_timeout(self, ledger):
        ledger.fire("04-classify-mine")
        # Rewrite entry's createdAt to simulate time passage
        entries = ledger.entries()
        entries[0]["createdAt"] = "2020-01-01T00:00:00+00:00"
        with open(ledger.path, "w") as f:
            for e in entries:
                f.write(json.dumps(e) + "\n")
        stale = ledger.stale_entries()
        assert len(stale) == 1
        assert stale[0]["stage"] == "04-classify-mine"
        assert stale[0]["status"] == "stale"

    def test_completed_never_stale(self, ledger):
        ledger.fire("04-classify-mine")
        # Simulate old completed entry
        entries = ledger.entries()
        entries[0]["createdAt"] = "2020-01-01T00:00:00+00:00"
        entries[0]["status"] = "completed"
        with open(ledger.path, "w") as f:
            for e in entries:
                f.write(json.dumps(e) + "\n")
        assert ledger.stale_entries() == []


# ---------------------------------------------------------------------------
# Workflow state via derive_state
# ---------------------------------------------------------------------------

class TestWorkflowState:
    def test_unknown_no_entries(self, tmpdir):
        l = Ledger(workflow_id="fresh", ledger_dir=tmpdir)
        assert l.workflow_state() == "unknown"

    def test_in_progress_single_stage_fired(self, ledger):
        ledger.init_workflow({})
        ledger.fire("01-detect")
        assert ledger.workflow_state() == "in_progress"

    def test_in_progress_stages_not_all_complete(self, ledger):
        ledger.init_workflow({})
        for stage in ["01-detect", "02-normalize", "03-sanitize"]:
            ledger.fire(stage)
            ledger.ack(stage)
        # Stage 3 hasn't completed
        assert ledger.workflow_state() == "in_progress"

    def test_completed_full_pipeline_no_stores(self, ledger):
        ledger.init_workflow({})
        for stage in ["01-detect", "02-normalize", "03-sanitize", "04-classify-mine"]:
            ledger.fire(stage)
            ledger.complete(stage)
        # 0 stores configured → Stage 5 trivially complete
        assert ledger.workflow_state(num_enabled_stores=0) == "completed"

    def test_partially_completed_some_stores_fail(self, ledger):
        ledger.init_workflow({})
        for stage in ["01-detect", "02-normalize", "03-sanitize", "04-classify-mine"]:
            ledger.fire(stage)
            ledger.complete(stage)
        # Store 1: success; Store 2: failed
        ledger.fire("05-codify", sub_agent_id="store.hindsight")
        ledger.complete("05-codify", sub_agent_id="store.hindsight")
        ledger.fire("05-codify", sub_agent_id="store.markdown")
        ledger.fail("05-codify", sub_agent_id="store.markdown")
        assert ledger.workflow_state(num_enabled_stores=2) == "partially_completed"

    def test_failed_all_stores_fail(self, ledger):
        ledger.init_workflow({})
        for stage in ["01-detect", "02-normalize", "03-sanitize", "04-classify-mine"]:
            ledger.fire(stage)
            ledger.complete(stage)
        ledger.fire("05-codify", sub_agent_id="store.hindsight")
        ledger.fail("05-codify", sub_agent_id="store.hindsight")
        ledger.fire("05-codify", sub_agent_id="store.markdown")
        ledger.fail("05-codify", sub_agent_id="store.markdown")
        assert ledger.workflow_state(num_enabled_stores=2) == "failed"

    def test_failed_at_stage4_max_attempts(self, ledger):
        ledger.init_workflow({})
        for stage in ["01-detect", "02-normalize"]:
            ledger.fire(stage)
            ledger.complete(stage)
        ledger.fire("03-sanitize")
        ledger.complete("03-sanitize")
        ledger.fire("04-classify-mine")
        for _ in range(MAX_ATTEMPTS + 1):
            ledger.fail("04-classify-mine")
        assert ledger.workflow_state(num_enabled_stores=0) == "failed"

    def test_in_progress_s4_fired_but_not_complete(self, ledger):
        ledger.init_workflow({})
        for stage in ["01-detect", "02-normalize", "03-sanitize"]:
            ledger.fire(stage)
            ledger.complete(stage)
        ledger.fire("04-classify-mine")
        # Not yet complete
        assert ledger.workflow_state(num_enabled_stores=0) == "in_progress"


# ---------------------------------------------------------------------------
# Full lifecycle integration
# ---------------------------------------------------------------------------

class TestFullLifecycle:
    def test_full_workflow_completes(self, ledger):
        manifest = {"workflowId": "wf_test_001", "trigger": {"type": "user_submit"}}
        ledger.init_workflow(manifest)
        # Stages 1-4
        for stage in ["01-detect", "02-normalize", "03-sanitize", "04-classify-mine"]:
            ledger.fire(stage)
            ledger.complete(stage, output_ref=f"bus/{stage}.json")
        # One store
        ledger.fire("05-codify", sub_agent_id="store.hindsight")
        ledger.complete("05-codify", sub_agent_id="store.hindsight")
        # Notify
        ledger.fire("06-notify")
        ledger.complete("06-notify")
        assert ledger.workflow_state(num_enabled_stores=1) == "completed"

    def test_workflow_fails_at_s4_chunk(self, ledger):
        """Chunk 2 fails after max retries → workflow fails."""
        ledger.init_workflow({})
        for stage in ["01-detect", "02-normalize", "03-sanitize"]:
            ledger.fire(stage)
            ledger.complete(stage)
        # Chunk 0 succeeds
        ledger.fire("04-classify-mine", sub_agent_id="leaf.chunk.0")
        ledger.complete("04-classify-mine", sub_agent_id="leaf.chunk.0")
        # Chunk 1 exhausts retries
        ledger.fire("04-classify-mine", sub_agent_id="leaf.chunk.1")
        for _ in range(MAX_ATTEMPTS + 1):
            ledger.fail("04-classify-mine", sub_agent_id="leaf.chunk.1")
        assert ledger.workflow_state(num_enabled_stores=0) == "failed"
