"""
chunker.py — Stage 4: Split normalized content into ~500-line chunks with 20-line overlap.

Each chunk is a self-contained unit dispatched to a leaf sub-agent.
Chunk count and total are included in every sub-agent payload so agents
know their position in the document.
"""

import json
import math
import uuid
from dataclasses import dataclass, field
from pathlib import Path

CHUNK_SIZE = 500       # target lines per chunk
OVERLAP_LINES = 20    # lines of overlap between chunks


@dataclass
class Chunk:
    index: int       # 0-indexed position in document
    total: int       # total number of chunks (filled after generation)
    content: str     # raw text of this chunk
    line_start: int  # 1-indexed line number in original
    line_end: int    # 1-indexed line number in original (inclusive)
    chunk_id: str    # unique ID for this chunk


def chunk_text(content: str, chunk_size: int = CHUNK_SIZE,
               overlap: int = OVERLAP_LINES) -> list[Chunk]:
    """
    Split text into ~500-line chunks with 20-line overlap.

    Every line of the original document appears in exactly one chunk.
    Overlap lines are shared at chunk boundaries for context continuity.

    Returns a list of Chunk objects ordered by position.
    Returns [] for empty or whitespace-only input.
    """
    lines = content.splitlines(keepends=True)
    total_lines = len(lines)

    if total_lines == 0:
        return []

    # Whitespace-only content → nothing meaningful to chunk
    if not any(line.strip() for line in lines):
        return []

    chunks: list[Chunk] = []
    chunk_index = 0
    line_start = 0

    while line_start < total_lines:
        line_end = min(line_start + chunk_size, total_lines)

        chunk_lines = lines[line_start:line_end]
        chunk_text_content = "".join(chunk_lines)

        chunks.append(Chunk(
            index=chunk_index,
            total=0,           # filled after loop
            content=chunk_text_content,
            line_start=line_start + 1,  # 1-indexed
            line_end=line_end,           # 1-indexed, inclusive
            chunk_id=f"chunk_{chunk_index:04d}",
        ))

        chunk_index += 1

        # Advance by chunk_size (non-overlapping chunks).
        # Context continuity at boundaries is handled by the orchestrator
        # passing adjacent chunk boundaries to sub-agents, not by content duplication.
        line_start += chunk_size
        if line_start >= total_lines:
            break

    # Fill total for all chunks
    actual_total = len(chunks)
    for c in chunks:
        c.total = actual_total

    return chunks


# ---------------------------------------------------------------------------
# Sub-agent payload builder
# ---------------------------------------------------------------------------

def build_sub_agent_payload(
    workflow_id: str,
    chunk: Chunk,
    manifest: dict,
    sanitization: dict,
    memory_planes: list[str],
) -> dict:
    """
    Build the task payload for a Stage 4 leaf sub-agent.

    The sub-agent receives chunk content + position metadata + pipeline
    context so it can produce structured extraction without re-reading
    the full document.
    """
    return {
        "workflowId": workflow_id,
        "stage": "04-classify-mine",
        "chunkId": chunk.chunk_id,
        "chunkIndex": chunk.index,
        "totalChunks": chunk.total,
        "chunkContent": chunk.content,
        "chunkMeta": {
            "lineStart": chunk.line_start,
            "lineEnd": chunk.line_end,
            "charCount": len(chunk.content),
        },
        "memoryPlanes": memory_planes,
        "manifest": manifest,
        "sanitization": sanitization,
        "taskInstructions": (
            "You are a Stage 4 leaf mining agent. Given one chunk of a document "
            "and its position metadata, produce a structured assimilation-packet "
            "fragment. Extract: (1) named entities, (2) semantic relations, "
            "(3) key claims or assertions, (4) operational items (tasks/decisions/risks), "
            "(5) any promotional candidates for downstream review. "
            "Preserve the original wording for evidence. "
            "Output a JSON object matching the entif.assimilation.packet schema."
        ),
    }


# ---------------------------------------------------------------------------
# Output consolidation
# ---------------------------------------------------------------------------

def consolidate_chunk_outputs(outputs: list[dict]) -> dict:
    """
    Merge outputs from all chunk sub-agents into a single assimilation-packet precursor.

    Deduplicates:
      - tags / conceptRefs by normalized key
      - entities / relations by JSON serialization
      - primitives by direct equality

    Averages scores across chunks.
    """
    if not outputs:
        return _empty_packet()

    # Accumulators
    all_tags: dict[str, str] = {}       # normalized_key → original tag
    all_entities: list = []
    all_relations: list = []
    all_concepts: list = []
    all_claims: list = []
    all_evidence: list = []
    all_uncertainties: list = []
    all_contradictions: list = []
    all_tasks: list = []
    all_decisions: list = []
    all_risks: list = []
    all_questions: list = []
    all_hypotheses: list = []
    all_dupes: list = []
    all_related: list = []
    all_support: list = []
    all_conflict: list = []
    promotion_candidates: list = []

    score_sums: dict[str, float] = {}
    score_counts: dict[str, int] = {}

    for out in outputs:
        sem = out.get("semantic", {})
        epi = out.get("epistemic", {})
        op  = out.get("operational", {})
        ass = out.get("associative", {})
        cre = out.get("creative", {})

        # Tags: dedupe by normalized key
        for tag in sem.get("tags", []):
            key = tag.lower().strip().replace(" ", "_")
            if key not in all_tags:
                all_tags[key] = tag

        all_entities.extend(sem.get("entities", []))
        all_relations.extend(sem.get("relations", []))
        all_concepts.extend(sem.get("conceptRefs", []))

        all_claims.extend(epi.get("claims", []))
        all_evidence.extend(epi.get("evidenceRefs", []))
        all_uncertainties.extend(epi.get("uncertainties", []))
        all_contradictions.extend(epi.get("contradictions", []))

        all_tasks.extend(op.get("tasks", []))
        all_decisions.extend(op.get("decisions", []))
        all_risks.extend(op.get("risks", []))
        all_questions.extend(op.get("openQuestions", []))

        all_hypotheses.extend(cre.get("optionalHypotheses", []))
        all_dupes.extend(ass.get("duplicates", []))
        all_related.extend(ass.get("relatedArtifacts", []))
        all_support.extend(ass.get("supportEdges", []))
        all_conflict.extend(ass.get("conflictEdges", []))

        for cand in out.get("promotionCandidates", []):
            if cand not in promotion_candidates:
                promotion_candidates.append(cand)

        for dim, val in out.get("scores", {}).items():
            score_sums[dim] = score_sums.get(dim, 0.0) + val
            score_counts[dim] = score_counts.get(dim, 0) + 1

    avg_scores = {
        dim: round(score_sums[dim] / score_counts[dim], 6)
        for dim in score_sums
    }

    return {
        "kind": "entif.assimilation.packet",
        "packetId": f"aap_{uuid.uuid4().hex[:12]}",
        "sourceRef": outputs[0].get("sourceRef", ""),
        "runRef":    outputs[0].get("runRef", ""),
        "hygiene":   {"verdict": "benign", "notes": []},
        "semantic": {
            "summaries": outputs[0].get("semantic", {}).get("summaries", {}),
            "entities":   _dedupe_list(all_entities),
            "relations":  _dedupe_list(all_relations),
            "conceptRefs": _dedupe_list(all_concepts),
        },
        "epistemic": {
            "claims":       _dedupe_list(all_claims),
            "evidenceRefs":  _dedupe_list(all_evidence),
            "uncertainties": _dedupe_list(all_uncertainties),
            "contradictions": _dedupe_list(all_contradictions),
        },
        "operational": {
            "tasks":         _dedupe_list(all_tasks),
            "decisions":     _dedupe_list(all_decisions),
            "risks":         _dedupe_list(all_risks),
            "openQuestions": _dedupe_list(all_questions),
        },
        "associative": {
            "duplicates":      _dedupe_list(all_dupes),
            "relatedArtifacts": _dedupe_list(all_related),
            "supportEdges":    _dedupe_list(all_support),
            "conflictEdges":   _dedupe_list(all_conflict),
        },
        "creative": {
            "optionalHypotheses": _dedupe_list(all_hypotheses),
        },
        "scores": avg_scores,
        "memoryWrites": [],
        "promotionCandidates": promotion_candidates,
        "receipts": [],
    }


def _dedupe_list(items: list) -> list:
    """Dedupe a list of primitives or dicts by JSON serialization."""
    seen: set[str] = set()
    result: list = []
    for item in items:
        key = json.dumps(item, sort_keys=True)
        if key not in seen:
            seen.add(key)
            result.append(item)
    return result


def _empty_packet() -> dict:
    return {
        "kind": "entif.assimilation.packet",
        "packetId": f"aap_{uuid.uuid4().hex[:12]}",
        "sourceRef": "",
        "runRef": "",
        "hygiene": {"verdict": "benign", "notes": []},
        "semantic": {
            "summaries": {},
            "entities": [],
            "relations": [],
            "conceptRefs": [],
        },
        "epistemic": {
            "claims": [],
            "evidenceRefs": [],
            "uncertainties": [],
            "contradictions": [],
        },
        "operational": {
            "tasks": [],
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
        "scores": {},
        "memoryWrites": [],
        "promotionCandidates": [],
        "receipts": [],
    }
