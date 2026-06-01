# Issue Draft: VM-008 — Viral Media Mirror Has No Integration Path to Rosetta/Entif Architecture

## Metadata

| Field | Value |
|---|---|
| Issue ID | VM-008 |
| Type | architecture |
| Status | draft |
| Source doc | docs/ideas/Entif Viral Media Mirror Systems Diagram.md |
| Extraction date | 2026-06-01 |
| Confidence | high |

## Problem

The VMM document proposes a 7-layer, end-to-end pipeline for viral media synthesis. It exists in the `docs/ideas/` directory and is not referenced by any existing Rosetta spec, Entif PRD, NOT LAME spec, or known backlog item.

The document does not:
- Reference the Rosetta sovereign kernel
- Reference the NOT LAME write admission gate
- Reference any memory plane
- Reference rights-scoped retrieval
- Reference the 3-rung staircase (Bootstrap → Text-Core MVP → Alpha RC)
- Reference LangGraph as workflow layer
- Reference any adapter certification requirements
- Reference the Source Substrate provenance model

A viral media synthesis pipeline that bypasses the sovereign kernel and memory planes is a parallel system, not an extension of Rosetta.

## Evidence

**Architecture layers in VMM:**
```
[Acquisition] → [Normalization] → [Semantic Glyph Engine] 
  → [Emotional–Cognitive Layer] → [Trend Dynamics] 
  → [Synthesis] → [Governance & Guardrails]
```

**Rosetta sovereign kernel responsibilities (NOT LAME PRD):**
- owns receipts, write gate, policy, provenance, memory routing, certification, context compilation
- LangGraph is workflow layer only

**VMM governance integration (all missing):**
- No mention of rights-scoped retrieval
- No mention of write admission gate
- No mention of adapter certification for ingest
- No mention of Source Substrate provenance lanes

**Current VMM location:** `docs/ideas/` — ideas tier, not committed to roadmap

## Integration Requirements

For VMM to be a legitimate part of the Rosetta/Entif ecosystem, it must define:

1. **Ingest adapter:** How does VMM acquisition layer integrate with Rosetta's adapter certification harness? Which adapter class?
2. **Memory plane ownership:** Which memory plane(s) owns glyphs, affect traces, motif embeddings, and trend state?
3. **Write gate:** Does VMM synthesis require going through the 9-step write admission gate? For which operations?
4. **Rights-scoped retrieval:** Does VMM synthesis use rights-scoped retrieval for glyph access? Or does it bypass this?
5. **Provenance lane:** Which Source Substrate provenance lane does VMM emit to?
6. **Governance co-design:** Do VMM guardrails extend the NOT LAME guard layer, or are they a separate system?
7. **Context compilation:** Does VMM use the context compiler for synthesis planning?

## Recommendation

1. Add explicit "Integration with Rosetta/Entif Architecture" section to VMM spec
2. Map each VMM layer to a corresponding Rosetta/Entif component (or explicitly mark as net-new)
3. Specify which memory planes VMM artifacts occupy
4. Specify whether VMM synthesis operations must pass through the write admission gate
5. Add VMM to the NOT LAME implementation roadmap with explicit integration tickets
6. File as a pre-MVP requirement: no VMM MVP may ship until integration path is defined

## Labels

- architecture
- integration
- sovereign-kernel
- memory-planes
- rights-scoped-retrieval

## Depends On

- VM-001 (glyph data model — must be compatible with Rosetta tile schema)
- VM-002 (affect trace — must align with memory plane 3)
- VM-004/VM-005/VM-006 (governance — must co-design with NOT LAME guard layer)
- NOT LAME write admission gate (TC-005)
- Source Substrate specs (SSP-0xx)
