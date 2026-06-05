# ACM-001: Multi-Axis Cache Key Design

## Metadata

| Field | Value |
| --- | --- |
| type | issue-candidate |
| source_doc | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` |
| finding | "Cache key can't just be intent. It has to be something like: semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash" |
| confidence | high |
| draft_created | 2026-06-05 |

## Problem Statement

Current cache key designs for Entif/Context Fabric are typically intent-based (e.g., query text hash). However, when two users with different entitlements ask semantically similar questions, an intent-only key can leak cached answers across rights boundaries.

Example: User A (plan A entitlement) and User B (plan B entitlement) both ask "What are my health benefits?" — surface language is identical but answers must differ. An intent-only cache key would return the same answer to both.

## Root Cause

Intent-only keys ignore:
- **Rights domain** — which permission namespace applies to this user
- **Data classification** — what sensitivity tier the underlying data occupies
- **Policy version** — which version of the governing policy is active
- **Source bundle hash** — which specific artifact bundle is being queried

## Required Solution

Design and implement a multi-axis cache key of the form:

```
cache_key = hash(semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash)
```

Where:
- `semantic_intent` is the Rosetta-classified intent type (not raw query text)
- `rights_domain` is the ABAC/RBAC context evaluated at query time
- `data_classification` is the sensitivity tier of the data being queried
- `policy_version` is the version identifier of the active policy tile
- `source_bundle_hash` is the content-addressed hash of the relevant artifact pack

## Acceptance Criteria

1. Cache lookup must fail (not return a stale answer) when any axis differs from the cached entry
2. Reason codes for cache misses must be first-class: `CACHE_DOMAIN_MISMATCH`, `ABAC_CONDITION_FAILED`, `CLEARANCE_INSUFFICIENT`, `DATA_RESIDENCY_VIOLATION`
3. Cache key computation must be deterministic — same inputs must produce same key across processes
4. Policy version axis must update automatically when a tile is superseded
5. Rights domain evaluation must happen before cache lookup, not after

## Priority

high

## Related Issues

- ACM-003 (cache invalidation) is blocked by this — cannot have version-aware invalidation without a version axis in the key
- ACM-002 (transliteration) informs the `data_classification` axis definition

## Notes

This is a prerequisite for any demo that uses the handbook/benefits policy workflow as the wedge example — without it, the demo cannot demonstrate rights-respecting cache behavior.