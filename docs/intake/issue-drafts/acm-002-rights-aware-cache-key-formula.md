# ACM-002: Rights-Domain-Aware Cache Key Formula

## Issue

Standard intent-keyed caching fails when users with different entitlements ask semantically or lexically similar questions. Two users asking "What are my health benefits?" may receive materially different answers based on plan tier, tenure, or company. If the cache key is only the normalized intent, the wrong answer may be returned to the wrong entitlement domain.

The API-driven cache management dialogue (2026-04-11) explicitly identifies the formula:

```
cache_key = semantic_intent
          × rights_domain
          × data_classification
          × policy_version
          × source_bundle_hash
```

This formula appears in the dialogue as established product direction but is not in the NOT LAME spec or any implementation document.

## Why This Matters

Cache poisoning from rights-domain confusion is catastrophically worse than a cache miss. A missed cache causes latency and cost (re-fetch). A poisoned cache causes wrong authoritative answers served confidently — the most dangerous failure mode in a governance-relevant system.

## Scope

1. Formalize the `rights_domain` axis: define what constitutes a rights domain boundary (RBAC role? ABAC attribute set? Lease scope? Plan tier?). Each must be independently hashable.

2. Formalize the `data_classification` axis: classify source content into tiers (public, internal, confidential, restricted). A cache storing confidential content must not be readable by a subject whose clearance level is below confidential.

3. Formalize `policy_version`: the source tile or policy document's version identifier. Cache entries must be invalidated whenever the source version changes. No ambiguous "last modified" — explicit version hash.

4. Formalize `source_bundle_hash`: the content-addressable hash of the exact source bundle used to construct the prompt prefix. If two cache entries had the same intent and rights domain but different source bundle content (different version), they are distinct cache entries.

5. The NOT LAME context compiler spec must adopt this full key formula as the canonical cache key definition.

## References

- Source: docs/chats/20260411 - Chat GPT - API-driven Cache Management.md
- Related: NOT LAME context compiler (bounded bundles by role/risk class); ABAC requirement in NOT LAME threat model

## Labels

cache, rights, security, abac

## Status

doc-candidate
