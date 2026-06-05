# APC-CACHE-001: Compound Cache Key Schema for Entif Context Fabric

**Issue prefix:** APC-CACHE-001
**Type:** implementation
**Status:** draft
**Source:** docs/chats/20260411 - Chat GPT - API-driven Cache Management.md (Finding APC-005)
**Extracted:** 2026-06-05

---

## Problem Statement

Naive semantic-equivalence caching ("two differently worded questions are the same") fails in enterprise multi-tenant environments where surface language overlaps across entitlement domains. Example: User A is entitled to Plan A, User B to Plan B, but both ask semantically identical questions using the same surface language. A cache key that includes only semantic intent will incorrectly serve A's answer to B (or vice versa).

## Required Solution

A compound cache key must encode all factors that affect the answer:

```
semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash
```

## Specific Requirements

1. **`semantic_intent`**: Derived from Rosetta's intent classification (refinery output). Must be deterministic and stable across paraphrases of the same underlying question.

2. **`rights_domain`**: The user's ABAC rights context at the time of the request. Must include: tenant ID, user role, clearance level, data classification of requested content.

3. **`data_classification`**: Classification tier of the information being queried (e.g., PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED).

4. **`policy_version`**: The version identifier of the policy tile(s) relevant to this query. If the policy changes, the cache must invalidate.

5. **`source_bundle_hash`**: Content-addressed hash of the source artifact(s) being queried. If any source content changes, the cache must invalidate.

## Implied Components

- Typed reason codes that can be emitted when cache lookup fails due to key mismatch:
  - `CACHE_DOMAIN_MISMATCH`
  - `ABAC_CONDITION_FAILED`
  - `CLEARANCE_INSUFFICIENT`
  - `DATA_RESIDENCY_VIOLATION`
  - `POLICY_VERSION_STALE`
  - `SOURCE_BUNDLE_CHANGED`

- These are already partially referenced in the v0 spec; this issue is about formalizing the complete cache key schema and reason code taxonomy.

## Confidence

HIGH — Explicit from source document's "dragons" section, second response block.

## References

- docs/chats/20260411 - Chat GPT - API-driven Cache Management.md
- docs/PRDs/20260423 - Entif.AI - NOT LAME (v0.1) - PRD - Neurologic Orchestration Topology for Layered Agentic Memory and Evolution.md (Context Fabric requirements)
