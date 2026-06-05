# MTC-002: Engram O(1) Memory Plane — Rosetta Memory Plane 3 Implementation Candidate

## Issue Metadata

- **Type**: implementation
- **Status**: draft
- **Labels**: memory, memory-planes, tapestry, text-core
- **Depends on**: MTC-001 (tokenizer identity constraint)
- **Evidence source**: `docs/chats/20260413 - Chat GPT - Model Training Cost and Design.md`

## Problem Statement

The source document proposes Engram (DeepSeek, paper 2601.07372 "Conditional Memory via Scalable Lookup") as the memory plane for a custom training stack. Engram provides O(1) deterministic lookup for static/local patterns, reportedly improving knowledge, reasoning, and context retrieval in 27B-parameter experiments. This aligns directly with Rosetta's memory plane 3 (activation/relevance) and the tapestry proposal.

The document states: "Engram's O(1) memory improves knowledge, reasoning, and context retrieval" and "Engram gives you cheap deterministic retrieval of static/local patterns, which is exactly the kind of burden you do not want your tiny generator re-deriving every time."

## Proposed Action

1. **Evaluate Engram paper (arXiv 2601.07372)** for architecture fit with Rosetta's memory planes and tapestry spec
2. **Map Engram's conditional lookup to memory plane 3** (activation/relevance) — does it fit the plane model or does it represent a different memory kind?
3. **Assess integration with existing memory-sovereignty-map** — PostgreSQL canonical vs. the O(1) lookup approach
4. **Consider as implementation candidate for TC-006** (tapestry + rights + Postgres)

## Relevant Findings

- Engram: DeepSeek paper 2601.07372 "Conditional Memory via Scalable Lookup"
- O(1) deterministic addressable memory for static patterns
- 27B-parameter experiments showing gains in knowledge, reasoning, and context retrieval
- Aligns with tapestry proposal for bounded compiled package of receipts
- On-theme with ReasoningBank (procedural reuse without weight updates)

## Open Questions

- Does Engram's O(1) lookup fit within the PostgreSQL canonical storage model, or does it require a separate lookup structure?
- How does Engram interact with the receipt law (every meaningful step emits receipts)?
- Is there a Rosetta-specific variant needed, or can the upstream Engram approach be adopted directly?
