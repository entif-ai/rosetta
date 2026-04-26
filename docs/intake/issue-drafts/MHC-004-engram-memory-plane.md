# MHC-004: Memory Plane Integration with Deterministic Lookup (Engram-style)

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `memory-plane`, `engram`, `deterministic-lookup`, `memory`, `retroactive-refinement`
**Depends on:** MHC-002-canonical-key-scheme

## Problem Statement

Engram provides a separable plane for static knowledge with deterministic addressability. Rosetta's memory planes (Plane 1/2/3) have no defined integration with such a primitive. The memory stack needs a native mechanism for deterministic lookup, retroactive refinement, and host-memory management for large identity tables.

## Specific Findings

- **F-ENG-001** (confidence: high): Engram is a native retrieval primitive inside the model — not external RAG
- **F-ENG-002** (confidence: high): Deterministic addressing for memory slots with reproducible attribution
- **F-ENG-004** (confidence: high): Retroactive refinement without full retrain — update, version, attach supersession edge
- **F-SYN-005** (confidence: high): Semantic Identity Registry with normalization rules, alias sets, ambiguity sets, provenance receipts, supersession chain

## Action Required

1. Define how CanonicalKey scheme interacts with memory Plane 1/2/3 — which plane holds canonical identity registry
2. Deterministic prefetch strategy: given a surface form, prefetch canonical key before tile processing begins
3. Host memory management: Engram's "negligible overhead under deterministic prefetch" — what is the memory budget, how are tables sharded, what's the eviction policy
4. Retroactive refinement protocol: update a memory entry, create new version, attach supersession edge, propagate invalidation to referencing tiles
5. Receipt/attestation at memory slot level: for each memory lookup, record which slot was used, what input triggered it
6. Integration with Receipts Ledger: memory slot lookups should emit receipt entries
