# ACM-003: Ruthless Cache Invalidation via Policy Tile Supersession

## Metadata

| Field | Value |
| --- | --- |
| type | issue-candidate |
| source_doc | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` |
| finding | "Handbook example only works if invalidation is ruthlessly tied to superseding tiles, policy versions, and entitlement changes. Otherwise you get the most dangerous failure mode of all: a fast, confident, wrong internal answer" |
| confidence | high |
| draft_created | 2026-06-05 |

## Problem Statement

Entif's context fabric caches answers to employee queries (e.g., "What are my health benefits?") to avoid repeated inference costs. However, if a cached answer reflects a superseded policy tile, the fast-cached-wrong answer becomes more dangerous than a slow-miss — it is confident and fast, two properties that make it resistant to correction.

## Root Cause

Cache invalidation is not tied to the event that actually changes correctness: tile supersession (policy version change, plan update, entitlement modification).

## Required Solution

Tie cache invalidation explicitly to tile supersession events:

1. **Tile supersession event** — when a policy tile is superseded (new version, revocation, replacement), emit an invalidation event for all cache entries keyed to that tile
2. **Entitlement change propagation** — when a user's entitlements change (role change, plan change, departure), emit invalidation for all cache entries in that user's rights_domain
3. **TTL as safety net, not primary** — TTL provides floor protection but must not be the primary invalidation mechanism for correctness-sensitive content
4. **Invalidation audit log** — every invalidation event must be logged with reason, triggering event, and affected cache entries

## Acceptance Criteria

1. Tile supersession must trigger invalidation within one propagation cycle (no human-in-the-loop delay)
2. Entitlement change must invalidate within the same processing cycle (not next query)
3. Stale cache hit must be detectable and flaggable (not silently returned)
4. Invalidation must be traceable: operators can query "why was this cache entry invalidated and when"

## Priority

high

## Related Issues

- Blocked by ACM-001 (multi-axis cache key has the policy_version axis that drives invalidation)
- ACM-004 (composite artifact provenance) needs its own invalidation logic for merged answers

## Notes

The "fast-confident-wrong" failure mode is especially acute for internal policy answers where employees act on stale information. This is a governance risk, not just a correctness issue.