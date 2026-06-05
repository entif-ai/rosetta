# ACM-003: Semantic Cache Staleness — Tile-Version-Gated Invalidation Required

## Issue Metadata

| Field | Value |
|---|---|
| Title | ACM-003: Semantic Cache Staleness — Tile-Version-Gated Invalidation Required |
| Type | risk |
| Status | draft |
| Source doc | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-05-api-driven-cache-mgmt.md` |
| Confidence | high |
| Labels | cache, staleness, tile-version, correctness |
| Related concepts | cache-invalidation, tile-version, staleness, fast-confident-wrong |
| Depends on | — |

## Problem Statement

Rosetta's Context Fabric cache router can serve cached answers to semantically equivalent user questions. The correctness of this caching depends on the underlying source content being unchanged since the cache entry was computed.

If a policy tile is updated (e.g., the employee handbook is revised), cached answers based on the old tile version become stale. Worse: they are fast and confident (because they were computed by a capable model and cached) but wrong (because they reflect superseded content).

The source document identifies this as "the most dangerous failure mode of all: a fast, confident, wrong internal answer."

TTL-based cache expiration is insufficient for this failure mode, because TTL does not know when the source content changed — only when a time threshold passed.

## Evidence

From the source document (2026-04-11 chat):

> "Your handbook example only works if invalidation is ruthlessly tied to superseding tiles, policy versions, and entitlement changes. Otherwise you get the most dangerous failure mode of all: a fast, confident, wrong internal answer."

The specific example given: an employee asks about health benefits, and a cached answer is served without checking whether the benefits policy tile has been updated since the cache entry was computed.

## Proposed Resolution

Implement tile-version-gated cache invalidation as a first-class mechanism in Rosetta's Context Fabric:

1. **Content-addressed tiles with version hash**: Every tile/tapestry has a content hash that changes when the tile content changes. The cache key includes `source_bundle_hash` (per ACM-001), which is the content hash of the source tile.
2. **Write-gate emits invalidation events**: When the Write-Admission Gate (TC-005) processes a tile update, it emits a `CACHE_INVALIDATE` event with the old and new content hashes. The cache router subscribes to these events.
3. **Cache entry tagged with source content hash**: Every cache entry records the `source_bundle_hash` of the tile(s) it was computed from. On invalidation event, matching entries are immediately evicted.
4. **Policy version in cache key**: Per ACM-001, the `policy_version` axis of the composite cache key ensures that policy changes create new cache keys automatically.

This makes staleness a function of source content changes, not wall-clock time.

## Implementation Notes

- This requires that tiles/tapestries are content-addressed with immutable hashes (append-only behavior)
- The Write-Admission Gate's `Observe` step must emit cache invalidation as a side effect
- Cache invalidation events should be recorded in the audit trail (Receipt Law)
- For external LLM provider caches (OpenAI/Anthropic/Gemini): Rosetta must include enough source content context in the prompt that the provider's prefix cache is keyed to the specific content version

## Open Questions

- Does the invalidation event propagate to external provider caches, or only to Rosetta's internal cache?
- What is the latency between a tile update and cache invalidation propagation? Can a window of stale-answer service exist?
- Should invalidation be push (event-driven) or pull (check on read)?
- Is there a distinction between "major" policy changes (full invalidation) and "minor" edits (selective invalidation)?

## Related Issues

- ACM-001 (composite cache key) — `policy_version` and `source_bundle_hash` are both required in the cache key
- TC-005 (Promotion state machine) — the Write-Admission Gate's Observe step is where invalidation events should be emitted
