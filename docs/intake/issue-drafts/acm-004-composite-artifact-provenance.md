# ACM-004: Provenance Spine for Composite/Multi-Provider Artifacts

## Metadata

| Field | Value |
| --- | --- |
| type | issue-candidate |
| source_doc | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` |
| finding | "Once Entif fans out to medical, dental, life, disability, and local handbook sources, the merged answer itself becomes a derived artifact that needs receipts, version references, and challengeability" |
| confidence | medium |
| draft_created | 2026-06-05 |

## Problem Statement

When Entif serves a multi-provider composition query (e.g., "What are my complete benefits?") it fans out structured sub-queries to separate downstream providers (medical, dental, life, disability, handbook), retrieves scoped facts from each, and stitches them into a single answer. This composite answer is a derived artifact with a different provenance requirement than a single-provider answer.

## Root Cause

Single-provider caching has a single provenance chain (query → provider → answer). Multi-provider composition introduces intermediate artifacts from each provider that must be tracked and represented in the final artifact's provenance record.

## Required Solution

Design a provenance spine for composite artifacts:

1. **Receipt for each sub-query** — each fan-out call must emit its own receipt (provider call, scoped input, scoped output, timestamp)
2. **Merge receipt** — the composition operation itself must emit a receipt (what sub-receipts were combined, in what order, by what logic)
3. **Version references** — each sub-receipt must reference the version of the data returned (provider response version, not just request timestamp)
4. **Challengeability** — the composite receipt chain must allow an auditor to trace: which providers were consulted, what data each returned, what the final composition was, and what the basis for any entitlements was
5. **Invalidation propagation** — if any sub-receipt's underlying data changes (provider updates, tile supersession), the composite artifact must be re-evaluable

## Acceptance Criteria

1. Composite answer must carry a full receipt chain, not a single monolithic receipt
2. Each sub-receipt must be independently inspectable and time-bounded
3. The merge receipt must capture the composition logic (order, weighting, conflict resolution)
4. Re-evaluation triggered by any sub-receipt invalidation must be demonstrable
5. Auditors must be able to request "show me the provenance of this answer" and receive a complete trace

## Priority

medium

## Related Issues

- Independent of ACM-001/ACM-003; can run as a parallel workstream
- ACM-005 (weak-to-strong routing audit) is related but separate — this is about composite data provenance, not routing decisions

## Notes

This is a distinct engineering workstream from single-provider caching. The API cache management doc explicitly separates these as "the multi-provider composition needs its own provenance spine" — treat it as a separate project with its own acceptance criteria.