# API-CACHE-001: Multi-dimensional Cache Key Schema

## Metadata

| Field | Value |
|---|---|
| Type | spec-gap |
| Status | draft |
| Labels | cache-orchestrator, rights-scoped, policy-aware |
| Depends On | — |
| Evidence | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` Finding: "Your cache key can't just be intent. It has to be something like: semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash" |

---

## Problem

Current `context-fabric` design assumes cache key = content hash (source bundle hash). This works for content-addressed static assets but fails for entitlement-differentiated queries.

Example failure: two employees ask semantically identical question "What are my health benefits?" but Employee A is on plan Gold ($200 deductible) and Employee B is on plan Platinum ($50 deductible). Intent-only cache key would give both the same answer. The cache key must incorporate rights_domain (plan tier) and data_classification (benefits tier).

More formally: `cache_key = H(intent × rights_domain × data_classification × policy_version × source_bundle_hash)`

---

## Scope

**In scope:**
- Formal multi-dimensional cache key schema
- Dimension definitions and types for each axis
- Canonical serialization for hashing
- Encoding in context-fabric adapter interface

**Out of scope:**
- Privacy budget discipline (API-CACHE-002)
- Invalidation triggers (API-CACHE-003)
- Per-provider key transport differences (separate ADR)

---

## Key Decisions Required

1. **Intent axis**: typed intent classification (enum) or vector embedding similarity threshold? Typed is more auditable; embedding is more flexible but less inspectable.
2. **Rights domain**: RBAC role, ABAC attribute bundle, or entitlement scope string? Needs to be serializable and hashable.
3. **Data classification**: static taxonomy (e.g., PUBLIC / INTERNAL / CONFIDENTIAL / RESTRICTED) or dynamic label per document? Static is simpler; dynamic is more precise.
4. **Policy version**: semantic version string, sequence number, or content hash of policy tile? Semantic version is human-readable; hash is more tamper-evident.
5. **Source bundle hash**: existing content-addressed hash; already defined.

---

## Implementation Notes

- Key must be deterministic: same inputs must produce same key regardless of serialization order
- All dimensions must be non-null; null axis means "do not use cache" (fail-open is not acceptable)
- Key must be logged at cache lookup time for audit trail

---

## Open Questions

- Is `semantic_intent` a classified intent (e.g., `BENEFITS_QUERY`) or a similarity threshold on an intent embedding?
- Should the key be compressible (e.g., rights_domain can be elided if user has default plan)?
- What is the maximum key length, and how do we prevent DoS via pathological key construction?