# APC-CACHE-003: Tile/Version-Based Cache Invalidation as First-Class Mechanism

**Issue prefix:** APC-CACHE-003
**Type:** implementation
**Status:** draft
**Source:** docs/chats/20260411 - Chat GPT - API-driven Cache Management.md (Finding APC-007)
**Extracted:** 2026-06-05

---

## Problem Statement

The most dangerous failure mode for a cache-governed enterprise AI system is "fast, confident, wrong internal answer." This happens when:
1. A cached answer is served for a question whose relevant source content has changed
2. The answer appears authoritative because it was generated from the now-stale cache
3. The user has no indication the the underlying policy/tile has been superseded

The handbook example in the source: "what are my health benefits?" must invalidate when the relevant policy tile is updated. Without this, Entif serves authoritative-sounding but wrong answers that are worse than "I don't know."

## Required Mechanism

Cache invalidation must be tied to:
- **Superseding tiles**: When a policy tile is revised, all cached answers derived from that tile must invalidate
- **Policy versions**: Each version of a policy tile must have its own cache namespace; updating the policy creates a new version and invalidates the old
- **Entitlement changes**: When a user's rights change (role change, access revocation), cached answers tied to those rights must invalidate
- **Content hash changes**: For source artifacts, invalidation must trigger when the source bundle hash changes

This is distinct from TTL-based invalidation (which is a backstop). The primary invalidation mechanism must be event-driven, not time-driven.

## Relationship to Existing Work

- The v0 spec already references "activity-based TTL" and "policy-version-keyed cache domains" — this issue is about making those requirements concrete
- Receipts should record which policy version and source bundle hash were used to generate a cached answer, enabling deterministic invalidation

## Confidence

HIGH — Explicit from source document's "dragons" section, second response block.

## References

- docs/chats/20260411 - Chat GPT - API-driven Cache Management.md
- docs/PRDs/20260423 - Entif.AI - NOT LAME (v0.1) - PRD - Neurologic Orchestration Topology for Layered Agentic Memory and Evolution.md (Context Fabric requirements)
