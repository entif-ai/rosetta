# APC-005: Semantic Equivalence Cache Keys Require Compound Structure (Intent × Rights Domain × Classification × Version)

**Status:** draft
**Priority:** high
**Type:** technical/design
**Confidence:** HIGH

## Problem Statement

Naive semantic equivalence — "two differently worded questions are the same" — fails in enterprise contexts where entitlement stratification matters.

**The failure mode:**
- User A is entitled to Plan A; User B is entitled to Plan B
- Both ask semantically similar questions using overlapping surface language
- If cache key = intent only, User B could receive User A's answer
- Result: authorization bypass via cache poisoning

**The required compound cache key:**

```
semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash
```

Each dimension must be part of the cache lookup:

- `semantic_intent`: Rosetta-classified intent (e.g., "health-benefits-query")
- `rights_domain`: ABAC evaluation result (e.g., "medical-plan-B-entitled")
- `data_classification`: sensitivity level of data involved (e.g., "phi-restricted")
- `policy_version`: version identifier of the policy tile(s) being queried
- `source_bundle_hash`: content hash of the source material(s) being referenced

## Existing Grounding in Entif Materials

This directly aligns with the v0 acceptance criteria's typed reason codes:
- `CACHE_DOMAIN_MISMATCH`
- `ABAC_CONDITION_FAILED`
- `CLEARANCE_INSUFFICIENT`
- `DATA_RESIDENCY_VIOLATION`

These are the failure modes the compound cache key is designed to prevent.

## Source

`docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` (ChatGPT conversation, 4/11/2026), second response block ("1. Semantic equivalence is not free")

## Requirements

- Entif's Context Fabric / Cache Orchestrator must support compound cache keys, not just content-addressed keys
- Rosetta's intent classification must produce a structured intent type that feeds the cache key
- ABAC evaluation must be part of cache lookup, not just cache admission
- Policy version and source bundle hash must be tracked as first-class cache metadata
- Cache invalidation must trigger on any of the five dimensions changing

## See Also

- `APC-004` (Entif product category)
- `APC-007` (cache poisoning / stale certainty — invalidation requirements)
- `entif-v0-005-graph-router-join-strategy.md`
- `SCRU-001-cache-orchestrator-architecture.md`
