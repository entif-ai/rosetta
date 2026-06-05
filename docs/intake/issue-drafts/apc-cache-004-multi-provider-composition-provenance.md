# APC-CACHE-004: Multi-Provider Composition Provenance Spine

**Issue prefix:** APC-CACHE-004
**Type:** implementation
**Status:** draft
**Source:** docs/chats/20260411 - Chat GPT - API-driven Cache Management.md (Finding APC-008)
**Extracted:** 2026-06-05
**Depends on:** APC-CACHE-003 (tile/version invalidation must be defined before composition provenance can reference versioned sources)

---

## Problem Statement

Once Entif fans out structured sub-queries to multiple providers simultaneously (e.g., medical benefits + dental + life insurance + handbook), the merged answer is a derived artifact that must carry its own provenance chain. The merged answer must reference:
1. Each sub-query and which provider it went to
2. The version of each source at query time (policy version, content hash)
3. The schema contracts used for structured I/O
4. The Entif composition logic applied to stitch results together

This is distinct from single-provider provenance (which tracks one inference call's inputs/outputs). Composition provenance must track the orchestration graph itself.

## Required Components

1. **Sub-query receipts**: Each fan-out call must produce its own receipt (already implied by receipts-first doctrine). These receipts must be linked.

2. **Version references at query time**: At the moment of composition, record the policy_version and source_bundle_hash for each provider's response.

3. **Schema contract versioning**: The normalized schema used for structured I/O between Entif and providers must be versioned so old compositions can be replayed or audited.

4. **Composition metadata**: The Entif-level logic that stitched results together must be recorded (which providers were queried, in what order, how their responses were merged).

5. **Challengeability**: Any derived answer must be traceable back to its component sub-answers. If a user challenges "why did I get this answer?", the composition must be replayable.

## Example

User asks: "What are my total benefits?"  
Entif fans out:
- Provider A (medical): returns coverage scope + deductible
- Provider B (dental): returns coverage scope + annual max
- Provider C (handbook): returns eligibility rules
- Provider D (life): returns coverage amount

Entif's composition: applies eligibility check → computes total coverage → formats answer

The final receipt must reference: receipts from A, B, C, D; policy versions at time of query; composition logic applied; final answer.

## Confidence

HIGH — Explicit from source document's "dragons" section, second response block.

## References

- docs/chats/20260411 - Chat GPT - API-driven Cache Management.md
- docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md (receipts-law, provenance requirements)
- docs/PRDs/20260423 - Entif.AI - NOT LAME (v0.1) - PRD - Neurologic Orchestration Topology for Layered Agentic Memory and Evolution.md
