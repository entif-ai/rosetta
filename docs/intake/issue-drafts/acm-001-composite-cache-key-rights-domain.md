# ACM-001: Composite Cache Key Must Encode rights_domain Alongside Semantic Intent

## Issue Metadata

| Field | Value |
|---|---|
| Title | ACM-001: Composite Cache Key Must Encode rights_domain Alongside Semantic Intent |
| Type | requirement |
| Status | draft |
| Source doc | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-05-api-driven-cache-mgmt.md` |
| Confidence | high |
| Labels | cache, rights, context-fabric |
| Related concepts | semantic-intent, rights_domain, cache-key, abac, multi-tenant-caching |
| Depends on | — |

## Problem Statement

Rosetta's Context Fabric cache router must avoid returning cached answers that are semantically correct but unauthorized for the requesting user. A cache key derived solely from semantic intent is insufficient in any multi-tenant or rights-differentiated environment. Two users asking semantically identical questions may receive different answers based on their entitlements (e.g., "What are my health benefits?" depends on the user's insurance plan tier).

If `rights_domain` is absent from the cache key, a user with plan-A entitlements receives the cached answer computed for a user with plan-B entitlements, or vice versa. This is a data-leakage-equivalent failure mode: wrong answer presented as authoritative.

## Evidence

From the source document (2026-04-11 chat, ChatGPT's recommendation):

> "Your cache key can't just be intent. It has to be something like:
> `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash`"

The cache key formula is explicitly proposed as a multi-axis composite. The rights_domain axis is treated as non-negotiable alongside semantic_intent.

## Proposed Resolution

Specify that Rosetta's Context Fabric cache router implements a composite cache key of at minimum:

```
cache_key = hash(
  semantic_intent_id,
  rights_domain,
  data_classification,
  policy_version,
  source_bundle_hash
)
```

Where:
- `semantic_intent_id` is the canonical intent type derived from Rosetta's intent classification
- `rights_domain` is the ABAC/RBAC context of the requesting principal
- `data_classification` is the sensitivity level of the underlying source data
- `policy_version` is the version of the policy/tile governing the source
- `source_bundle_hash` is the content-addressed hash of the source pack/tile

The cache router MUST NOT serve a cached response if `rights_domain` in the request does not match `rights_domain` used to compute the cached entry.

## Implementation Notes

- This requirement applies to Rosetta's internal cache router AND to any Entif proxy-layer cache
- The composite key applies to both deterministic context packs (Rosetta tiles) and LLM provider response caches (OpenAI/Anthropic/Gemini)
- For LLM provider caches: Rosetta must ensure the prompt includes rights context so that provider-side prefix caching does not bypass the rights check
- `policy_version` in the key handles staleness: a tile update changes `policy_version`, creating a new cache key, preventing stale-authoritative-answer delivery

## Verification

- Unit test: two requests with identical `semantic_intent_id` but different `rights_domain` produce different cache keys
- Unit test: `policy_version` change produces new cache key for same intent+rights
- Integration test: rights-domain-mismatched cache lookup returns MISS (not HIT with filtered response)

## Open Questions

- What is the canonical representation of `rights_domain` in the Rosetta data model? Is it a role string, a capability set, or an ABAC attribute vector?
- Does `data_classification` need its own axis, or is it subsumed by `rights_domain`?
- Is `source_bundle_hash` computed over the full tile pack, or just the relevant fragment?

## Related Issues

- ACM-002 (transliteration correlation leakage) — same privacy-correctness concern but at the anonymization layer, not the cache layer
- ACM-003 (semantic cache staleness) — same composite key concern but focused on temporal validity
