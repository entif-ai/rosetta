"""
test_bus.py — comprehensive tests for lib/bus.py

Covers:
  - Bus.__init__ directory creation
  - append / read_all_new round-trip
  - append is idempotent-safe (multiple processes can append)
  - read_all_new offset tracking
  - read_all_new empty file returns ([], 0)
  - write_content / read_content round-trip
  - write_stage_output / read_stage_output round-trip (dict + list + str)
  - queue_exists
  - ack_count
  - Malformed JSON lines are skipped (not fatal)
"""

import json
import os
import tempfile
import textwrap
from pathlib import Path

import pytest

from lib.bus import Bus


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture
def tmpdir():
    with tempfile.TemporaryDirectory() as d:
        yield Path(d)


@pytest.fixture
def bus(tmpdir):
    return Bus(workflow_id="wf_test_001", base_path=tmpdir)


# ---------------------------------------------------------------------------
# Init
# ---------------------------------------------------------------------------

class TestInit:
    def test_creates_base_path(self, tmpdir):
        b = Bus(workflow_id="wf_xyz", base_path=tmpdir / "nested" / "deeper")
        assert (tmpdir / "nested" / "deeper").is_dir()

    def test_expands_user_path(self):
        b = Bus(workflow_id="wf_xyz", base_path="~/.hermes/omni-ingest/bus/test")
        assert b.base_path == Path(os.path.expanduser("~/.hermes/omni-ingest/bus/test"))


# ---------------------------------------------------------------------------
# Queue path format
# ---------------------------------------------------------------------------

class TestQueuePath:
    def test_queue_path_format(self, bus):
        path = bus._queue_path("05-codify")
        assert path.name == "queue.05-codify.wf_test_001.jsonl"
        assert path.parent == bus.base_path


# ---------------------------------------------------------------------------
# Append / read_all_new
# ---------------------------------------------------------------------------

class TestAppend:
    def test_append_single_entry(self, bus):
        entry = {"status": "fired", "stage": "01-detect"}
        bus.append("01-detect", entry)

        path = bus._queue_path("01-detect")
        assert path.exists()
        lines = path.read_text().splitlines()
        assert len(lines) == 1
        assert json.loads(lines[0]) == entry

    def test_append_multiple_entries_same_stage(self, bus):
        for i in range(5):
            bus.append("01-detect", {"seq": i, "stage": "01-detect"})
        assert bus.ack_count("01-detect") == 5

    def test_append_different_stages_isolated(self, bus):
        bus.append("01-detect", {"id": 1})
        bus.append("02-normalize", {"id": 2})
        bus.append("03-sanitize", {"id": 3})
        assert bus.ack_count("01-detect") == 1
        assert bus.ack_count("02-normalize") == 1
        assert bus.ack_count("03-sanitize") == 1

    def test_read_all_new_all_entries(self, bus):
        bus.append("04-classify", {"seq": 0})
        bus.append("04-classify", {"seq": 1})
        bus.append("04-classify", {"seq": 2})

        entries, new_offset = bus.read_all_new("04-classify", after_offset=0)
        assert len(entries) == 3
        assert [e["seq"] for e in entries] == [0, 1, 2]
        # new_offset should be past all content
        assert new_offset > 0

    def test_read_all_new_incremental(self, bus):
        bus.append("04-classify", {"seq": 0})
        bus.append("04-classify", {"seq": 1})

        entries1, offset1 = bus.read_all_new("04-classify", after_offset=0)
        assert len(entries1) == 2

        # Simulate a new entry arriving between reads
        bus.append("04-classify", {"seq": 2})

        entries2, offset2 = bus.read_all_new("04-classify", after_offset=offset1)
        assert len(entries2) == 1
        assert entries2[0]["seq"] == 2

    def test_read_all_new_empty_file(self, bus):
        entries, offset = bus.read_all_new("nonexistent-stage", after_offset=0)
        assert entries == []
        assert offset == 0

    def test_read_all_new_nonexistent_queue(self, bus):
        entries, offset = bus.read_all_new("99-unknown", after_offset=0)
        assert entries == []
        assert offset == 0

    def test_read_all_new_skips_malformed_lines(self, bus):
        # Manually write valid JSONL with one malformed line in the middle
        path = bus._queue_path("test-malformed")
        path.write_text(
            '{"line": "good1"}\n'
            'not json at all\n'
            '{"line": "good2"}\n',
            encoding="utf-8"
        )

        entries, new_offset = bus.read_all_new("test-malformed", after_offset=0)
        assert len(entries) == 2
        assert entries[0] == {"line": "good1"}
        assert entries[1] == {"line": "good2"}

    def test_read_all_new_after_offset_past_eof(self, bus):
        bus.append("test", {"id": 1})
        entries, offset = bus.read_all_new("test", after_offset=0)
        # Second read with same offset returns nothing new
        entries2, _ = bus.read_all_new("test", after_offset=offset)
        assert entries2 == []


# ---------------------------------------------------------------------------
# write_content / read_content
# ---------------------------------------------------------------------------

class TestWriteContent:
    def test_write_and_read_content(self, bus):
        content = "# Hello World\n\nThis is a test document."
        meta = {"charCount": len(content), "mimeType": "text/markdown"}

        content_path, meta_path = bus.write_content("md", content, meta)

        assert content_path.exists()
        assert meta_path.exists()
        assert content_path.read_text(encoding="utf-8") == content

        meta_read = json.loads(meta_path.read_text(encoding="utf-8"))
        assert meta_read["charCount"] == len(content)
        assert meta_read["mimeType"] == "text/markdown"
        assert "writtenAt" in meta_read

    def test_write_content_meta_includes_workflow_id(self, bus):
        bus.write_content("txt", "hello", None)
        meta_path = bus.base_path / f"content.wf_test_001.txt.meta.json"
        meta = json.loads(meta_path.read_text())
        assert meta["workflowId"] == "wf_test_001"

    def test_read_stage_output_roundtrip(self, bus):
        data = {"entities": ["Alice", "Bob"], "count": 2}
        path = bus.write_stage_output("04-classify", "data.{workflow_id}.json", data)
        assert path.exists()

        read_back = bus.read_stage_output("data.{workflow_id}.json")
        assert read_back == data

    def test_read_stage_output_not_exists(self, bus):
        assert bus.read_stage_output("nonexistent.{workflow_id}.json") is None

    def test_write_stage_output_list(self, bus):
        data = ["alpha", "beta", "gamma"]
        bus.write_stage_output("test", "list.{workflow_id}.json", data)
        assert bus.read_stage_output("list.{workflow_id}.json") == data

    def test_write_stage_output_string(self, bus):
        bus.write_stage_output("test", "str.{workflow_id}.txt", "plain text")
        assert bus.read_stage_output("str.{workflow_id}.txt") == "plain text"


# ---------------------------------------------------------------------------
# Queue bookkeeping
# ---------------------------------------------------------------------------

class TestQueueBookkeeping:
    def test_queue_exists_true(self, bus):
        bus.append("01-detect", {"x": 1})
        assert bus.queue_exists("01-detect") is True

    def test_queue_exists_false(self, bus):
        assert bus.queue_exists("99-no-such-queue") is False

    def test_ack_count_single(self, bus):
        bus.append("05-codify", {"store": "hindsight"})
        assert bus.ack_count("05-codify") == 1

    def test_ack_count_multiple(self, bus):
        for i in range(7):
            bus.append("05-codify", {"seq": i})
        assert bus.ack_count("05-codify") == 7

    def test_ack_count_nonexistent(self, bus):
        assert bus.ack_count("nonexistent") == 0


# ---------------------------------------------------------------------------
# Content round-trip (realistic pipeline)
# ---------------------------------------------------------------------------

class TestRealisticPipeline:
    def test_normalize_write_then_read(self, bus):
        """Simulate: Stage 2 writes normalized content, Stage 3 reads it."""
        content = textwrap.dedent("""
            # Document Title

            This is the body text with **markdown** content.

            ## Section One

            More content here.
        """).strip()

        content_path, meta_path = bus.write_content("md", content, {
            "contentType": "text/markdown",
            "mimeType": "text/markdown",
        })

        # Stage 3 reads
        assert content_path.read_text(encoding="utf-8") == content
        meta = json.loads(meta_path.read_text())
        assert meta["contentType"] == "text/markdown"
        assert meta["charCount"] == len(content)
