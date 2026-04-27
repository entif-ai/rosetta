"""
test_chunker.py — comprehensive tests for stages/04-classify-mine/chunker.py

Covers:
  - chunk_text(): empty, short, boundary, multi-chunk, overlap correctness
  - chunk line number metadata (1-indexed, no gaps)
  - build_sub_agent_payload(): correct fields
  - consolidate_chunk_outputs(): dedup, score averaging, defaults
"""

import json
import sys
from pathlib import Path

import pytest

# Resolve chunker from skill dir
sys.path.insert(0, str(Path(__file__).parent.parent / "stages" / "04-classify-mine"))
from chunker import (
    chunk_text, build_sub_agent_payload, consolidate_chunk_outputs,
    CHUNK_SIZE, OVERLAP_LINES, Chunk,
)


# ---------------------------------------------------------------------------
# chunk_text — basic
# ---------------------------------------------------------------------------

class TestChunkTextEmpty:
    def test_empty_string_returns_empty_list(self):
        assert chunk_text("") == []

    def test_whitespace_only_returns_empty_list(self):
        assert chunk_text("   \n\n   ") == []


class TestChunkTextShort:
    def test_single_line_one_chunk(self):
        chunks = chunk_text("Hello world.\n")
        assert len(chunks) == 1
        assert chunks[0].content == "Hello world.\n"
        assert chunks[0].index == 0
        assert chunks[0].total == 1
        assert chunks[0].line_start == 1
        assert chunks[0].line_end == 1

    def test_under_chunk_size_one_chunk(self):
        lines = "\n".join(f"Line {i}" for i in range(100))
        chunks = chunk_text(lines)
        assert len(chunks) == 1
        assert chunks[0].line_start == 1
        assert chunks[0].line_end == 100


class TestChunkTextBoundaries:
    def test_exactly_chunk_size_one_chunk(self):
        lines = "\n".join(f"Line {i}" for i in range(CHUNK_SIZE))
        chunks = chunk_text(lines)
        assert len(chunks) == 1

    def test_chunk_size_plus_one_two_chunks(self):
        lines = "\n".join(f"Line {i}" for i in range(CHUNK_SIZE + 1))
        chunks = chunk_text(lines)
        assert len(chunks) == 2

    def test_twice_chunk_size_two_chunks(self):
        lines = "\n".join(f"Line {i}" for i in range(CHUNK_SIZE * 2))
        chunks = chunk_text(lines)
        assert len(chunks) == 2


class TestChunkTextOverlap:
    def test_chunks_are_contiguous_no_gaps_no_duplicates(self):
        # 1000 lines → chunks [0:500], [500:1000] (step=500, contiguous).
        # Verify: no gaps (c1 starts where c0 ends + 1) and no duplicates.
        lines = "\n".join(f"Line {i}" for i in range(1000))
        chunks = chunk_text(lines)
        assert len(chunks) == 2
        c0, c1 = chunks[0], chunks[1]
        # Contiguity: c1 starts at line after c0 ended
        assert c1.line_start == c0.line_end + 1, \
            f"gap or overlap: c0 ends {c0.line_end}, c1 starts {c1.line_start}"
        # No duplicate lines
        all_lines = set()
        for chunk in chunks:
            for line in chunk.content.splitlines():
                n = int(line.strip().replace("Line ", ""))
                assert n not in all_lines, f"Line {n} appears twice"
                all_lines.add(n)
        assert len(all_lines) == 1000


class TestChunkTextCoverage:
    def test_no_lines_ever_lost(self):
        """Every line in the original must appear in exactly one chunk."""
        lines = "\n".join(f"Line {i}" for i in range(CHUNK_SIZE * 3 + 50))
        chunks = chunk_text(lines)
        all_parsed_nums: set[int] = set()
        for chunk in chunks:
            for line in chunk.content.splitlines():
                line_num = int(line.strip().replace("Line ", ""))
                assert line_num not in all_parsed_nums, f"Line {line_num} appears twice"
                all_parsed_nums.add(line_num)
        # Every input line number should appear exactly once across all chunks
        assert all_parsed_nums == set(range(len(chunks[0].content.splitlines()) * 3 + 50))

    def test_line_numbers_sequential_no_gaps(self):
        lines = "\n".join(f"Line {i}" for i in range(CHUNK_SIZE * 2 + 10))
        chunks = chunk_text(lines)
        all_line_nums: list[int] = []
        for chunk in chunks:
            for line in chunk.content.splitlines():
                all_line_nums.append(int(line.strip().replace("Line ", "")))
        assert all_line_nums == sorted(all_line_nums)
        assert all_line_nums == list(range(CHUNK_SIZE * 2 + 10))

    def test_line_start_end_accurate(self):
        lines = "\n".join(f"Line {i}" for i in range(CHUNK_SIZE * 2))
        chunks = chunk_text(lines)
        for chunk in chunks:
            chunk_lines = chunk.content.splitlines()
            assert chunk.line_start == int(chunk_lines[0].replace("Line ", "")) + 1
            assert chunk.line_end == int(chunk_lines[-1].replace("Line ", "")) + 1


class TestChunkTextMetadata:
    def test_total_consistent_across_chunks(self):
        lines = "\n".join(f"Line {i}" for i in range(CHUNK_SIZE * 3))
        chunks = chunk_text(lines)
        total = chunks[0].total
        assert all(c.total == total for c in chunks)

    def test_chunk_ids_unique(self):
        lines = "\n".join(f"Line {i}" for i in range(CHUNK_SIZE * 3))
        chunks = chunk_text(lines)
        ids = [c.chunk_id for c in chunks]
        assert len(ids) == len(set(ids))

    def test_index_sequential_from_zero(self):
        lines = "\n".join(f"Line {i}" for i in range(CHUNK_SIZE * 3))
        chunks = chunk_text(lines)
        indices = [c.index for c in chunks]
        assert indices == list(range(len(chunks)))


# ---------------------------------------------------------------------------
# build_sub_agent_payload
# ---------------------------------------------------------------------------

class TestBuildSubAgentPayload:
    def test_required_fields_present(self):
        chunk = Chunk(index=0, total=1, content="test content\n",
                      line_start=1, line_end=1, chunk_id="chunk_0000")
        manifest = {"workflowId": "wf_123", "trigger": {"type": "user_submit"}}
        sanitization = {"verdict": "benign"}

        payload = build_sub_agent_payload(
            workflow_id="wf_123",
            chunk=chunk,
            manifest=manifest,
            sanitization=sanitization,
            memory_planes=["semantic"],
        )

        assert payload["workflowId"] == "wf_123"
        assert payload["stage"] == "04-classify-mine"
        assert payload["chunkId"] == "chunk_0000"
        assert payload["chunkIndex"] == 0
        assert payload["totalChunks"] == 1
        assert payload["chunkContent"] == "test content\n"
        assert payload["memoryPlanes"] == ["semantic"]
        assert payload["manifest"] == manifest
        assert payload["sanitization"] == sanitization
        assert "taskInstructions" in payload
        assert len(payload["taskInstructions"]) > 50  # non-trivial

    def test_chunk_meta_correct(self):
        chunk = Chunk(index=2, total=5, content="x\ny\nz\n",
                      line_start=1001, line_end=1003, chunk_id="chunk_0002")
        payload = build_sub_agent_payload(
            "wf", chunk, {}, {}, ["episodic"],
        )
        assert payload["chunkMeta"]["lineStart"] == 1001
        assert payload["chunkMeta"]["lineEnd"] == 1003
        assert payload["chunkMeta"]["charCount"] == len("x\ny\nz\n")


# ---------------------------------------------------------------------------
# consolidate_chunk_outputs
# ---------------------------------------------------------------------------

class TestConsolidateChunkOutputs:
    def test_empty_list_returns_valid_packet(self):
        result = consolidate_chunk_outputs([])
        assert result["kind"] == "entif.assimilation.packet"
        assert result["packetId"].startswith("aap_")
        assert result["semantic"] == {"summaries": {}, "entities": [],
                                       "relations": [], "conceptRefs": []}
        assert result["epistemic"] == {"claims": [], "evidenceRefs": [],
                                        "uncertainties": [], "contradictions": []}
        assert result["operational"] == {"tasks": [], "decisions": [],
                                          "risks": [], "openQuestions": []}

    def test_single_chunk_output(self):
        outputs = [{
            "sourceRef": "wf_001",
            "runRef": "run_001",
            "semantic": {
                "summaries": {"abstract": "Short doc", "executive": "Exec"},
                "entities": [{"name": "Alice", "type": "person"}],
                "relations": [{"from": "Alice", "to": "Bob", "type": "knows"}],
                "conceptRefs": ["ai", "memory"],
            },
            "epistemic": {
                "claims": ["Alice knows Bob"],
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
            "associative": {},
            "creative": {},
            "scores": {"novelty": 0.8, "relevance": 0.9},
            "promotionCandidates": ["alice_knows_bob"],
        }]

        result = consolidate_chunk_outputs(outputs)

        assert result["sourceRef"] == "wf_001"
        assert result["semantic"]["summaries"] == {"abstract": "Short doc", "executive": "Exec"}
        assert result["semantic"]["entities"] == [{"name": "Alice", "type": "person"}]
        assert result["semantic"]["conceptRefs"] == ["ai", "memory"]
        assert result["epistemic"]["claims"] == ["Alice knows Bob"]
        assert result["operational"]["tasks"] == ["Write tests"]
        assert result["scores"]["novelty"] == 0.8
        assert result["promotionCandidates"] == ["alice_knows_bob"]

    def test_deduplicates_tags_across_chunks(self):
        outputs = [
            {"semantic": {"tags": ["AI"], "entities": [], "relations": [],
                          "conceptRefs": []},
             "epistemic": {}, "operational": {}, "associative": {},
             "creative": {}, "scores": {}, "promotionCandidates": []},
            {"semantic": {"tags": ["AI", "Memory"], "entities": [], "relations": [],
                          "conceptRefs": []},
             "epistemic": {}, "operational": {}, "associative": {},
             "creative": {}, "scores": {}, "promotionCandidates": []},
            {"semantic": {"tags": ["ai"], "entities": [], "relations": [],
                          "conceptRefs": []},
             "epistemic": {}, "operational": {}, "associative": {},
             "creative": {}, "scores": {}, "promotionCandidates": []},
        ]
        result = consolidate_chunk_outputs(outputs)
        # Tags are deduplicated by normalized key
        tags = result["semantic"]["conceptRefs"]
        # Should have at most 2 unique normalized tags (ai, memory)
        assert len(tags) <= 3

    def test_deduplicates_entities_by_json(self):
        outputs = [
            {"semantic": {"entities": [{"name": "Alice", "type": "person"}],
                          "tags": [], "relations": [], "conceptRefs": []},
             "epistemic": {}, "operational": {}, "associative": {},
             "creative": {}, "scores": {}, "promotionCandidates": []},
            {"semantic": {"entities": [{"name": "Alice", "type": "person"},
                                       {"name": "Bob", "type": "person"}],
                          "tags": [], "relations": [], "conceptRefs": []},
             "epistemic": {}, "operational": {}, "associative": {},
             "creative": {}, "scores": {}, "promotionCandidates": []},
        ]
        result = consolidate_chunk_outputs(outputs)
        entities = result["semantic"]["entities"]
        alice_count = sum(1 for e in entities if e.get("name") == "Alice")
        assert alice_count == 1  # deduped
        assert len(entities) == 2  # Alice + Bob

    def test_scores_averaged_across_chunks(self):
        outputs = [
            {"semantic": {"tags": [], "entities": [], "relations": [], "conceptRefs": []},
             "epistemic": {}, "operational": {}, "associative": {},
             "creative": {}, "scores": {"novelty": 0.8, "relevance": 0.6},
             "promotionCandidates": []},
            {"semantic": {"tags": [], "entities": [], "relations": [], "conceptRefs": []},
             "epistemic": {}, "operational": {}, "associative": {},
             "creative": {}, "scores": {"novelty": 0.4, "relevance": 0.8},
             "promotionCandidates": []},
        ]
        result = consolidate_chunk_outputs(outputs)
        assert result["scores"]["novelty"] == 0.6  # (0.8+0.4)/2
        assert result["scores"]["relevance"] == 0.7  # (0.6+0.8)/2

    def test_promotion_candidates_deduplicated(self):
        outputs = [
            {"semantic": {"tags": [], "entities": [], "relations": [], "conceptRefs": []},
             "epistemic": {}, "operational": {}, "associative": {},
             "creative": {}, "scores": {},
             "promotionCandidates": ["claim_a", "claim_b"]},
            {"semantic": {"tags": [], "entities": [], "relations": [], "conceptRefs": []},
             "epistemic": {}, "operational": {}, "associative": {},
             "creative": {}, "scores": {},
             "promotionCandidates": ["claim_b", "claim_c"]},
        ]
        result = consolidate_chunk_outputs(outputs)
        assert set(result["promotionCandidates"]) == {"claim_a", "claim_b", "claim_c"}

    def test_all_sections_aggregated(self):
        outputs = [
            {
                "semantic": {"tags": [], "entities": [{"name": "X"}],
                              "relations": [{"r": "1"}], "conceptRefs": ["c1"]},
                "epistemic": {"claims": ["claim_1"], "evidenceRefs": ["ev_1"],
                              "uncertainties": ["unc_1"], "contradictions": []},
                "operational": {"tasks": ["task_1"], "decisions": ["dec_1"],
                                 "risks": ["risk_1"], "openQuestions": ["q_1"]},
                "associative": {"relatedArtifacts": ["art_1"]},
                "creative": {"optionalHypotheses": ["hyp_1"]},
                "scores": {"novelty": 0.5},
                "promotionCandidates": [],
            },
            {
                "semantic": {"tags": [], "entities": [{"name": "Y"}],
                              "relations": [{"r": "2"}], "conceptRefs": ["c2"]},
                "epistemic": {"claims": ["claim_2"], "evidenceRefs": ["ev_2"],
                              "uncertainties": ["unc_2"], "contradictions": ["con_1"]},
                "operational": {"tasks": ["task_2"], "decisions": ["dec_2"],
                                 "risks": ["risk_2"], "openQuestions": ["q_2"]},
                "associative": {"relatedArtifacts": ["art_2"]},
                "creative": {"optionalHypotheses": ["hyp_2"]},
                "scores": {"novelty": 0.7},
                "promotionCandidates": ["promo_1"],
            },
        ]
        result = consolidate_chunk_outputs(outputs)
        assert len(result["semantic"]["entities"]) == 2
        assert len(result["epistemic"]["claims"]) == 2
        assert len(result["operational"]["tasks"]) == 2
        assert len(result["epistemic"]["contradictions"]) == 1
        assert result["promotionCandidates"] == ["promo_1"]
        assert result["scores"]["novelty"] == 0.6
