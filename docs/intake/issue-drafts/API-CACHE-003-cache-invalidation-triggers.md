# API-CACHE-003: Cache Invalidation Triggers — Tile Supersession + Policy Version + Entitlement Delta

## Metadata

| Field | Value |
|---|---|
| Type | spec-gap |
| Status | draft |
| Labels | cache-orchestrator, tapestry, invalidation |
| Depends On | API-CACHE-001 |
| Evidence | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` Finding: "Your handbook example only works if invalidation is ruthlessly tied to superseding tiles, policy versions, and entitlement changes. Otherwise you get the most dangerous failure mode of all: a fast, confident, wrong internal answer" |

---

## Problem

The handbook example: employees ask "What are my health benefits?" and Entif serves a cached answer. The cache becomes dangerously stale when:
1. A policy tile is superseded (new version of the benefits plan)
2. A policy version changes (benefits structure changes)
3. An entitlement changes (employee switches plan, leaves company, etc.)

The failure mode is "fast, confident, wrong answer" — worse than a cache miss, because the system returns a wrong answer with high confidence and low latency. This is the most dangerous cache failure mode.

---

## Scope

**In scope:**
- Formal invalidation trigger model
- Tile supersession detection (what does "superseded" mean in the tapestry?)
- Policy version change detection
- Entitlement delta detection (RBAC/ABAC change for a subject)
- Invalidation propagation (how does a tile change invalidate dependent cache entries?)
- Staleness window management (how to handle propagation lag)

**Out of scope:**
- Cache key schema (API-CACHE-001) — this issue assumes multi-dim key is already designed
- Privacy budget (API-CACHE-002) — orthogonal

---

## Key Decisions Required

1. **Invalidation model**: push (tile publishes change event → cache subscribes) or pull (cache polls tile version on read)?
2. **Tile supersession**: does a new tile version automatically obsolete the old one, or is there an explicit deprecation flag?
3. **Entitlement delta detection**: how does the cache learn that a user's permissions changed? Is there a subscription to the rights database?
4. **Staleness window**: between tile supersession and cache invalidation propagating, should the cache serve stale content with a staleness flag, or block entirely?
5. **Granularity**: does a policy version change invalidate all cache entries for that policy, or only entries whose multi-dim key includes that policy_version?

---

## Relationship to Other Issues

- Depends on API-CACHE-001 (multi-dimensional cache key); policy_version is one of the key dimensions
- This is the enforcement mechanism that makes the handbook example safe
- Ties to `tapestry` concept: tiles have version, supersession, and lifecycle

---

## Open Questions

- Is there a tile subscription model, or does the cache query the tile's current version on every access?
- Can a tile be "deprecated but not superseded" (still visible, but serving stale answers)?
- How do we handle the case where the cache key doesn't include policy_version (legacy cache entries)?