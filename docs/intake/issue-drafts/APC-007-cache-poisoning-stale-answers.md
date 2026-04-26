# APC-007: Cache Poisoning and Stale Certainty — Most Dangerous Cache Failure Mode

**Status:** draft
**Priority:** high
**Type:** reliability/safety
**Confidence:** HIGH

## Problem Statement

For Entif's company-handbook example (and any cached policy/benefits use case), the most dangerous failure mode is not "slow answer" or "no answer."

The most dangerous failure mode is: **fast, confident, wrong internal answer.**

Without rigorous invalidation, Entif could serve stale policy content as authoritative truth — worse than saying "I don't know" because the answer appears validated and immediate.

## Required Invalidation Triggers

Cache entries must be invalidated when:

1. **Policy tile supersession**: The handbook section/tile being queried has been revised → invalidate the relevant cache entry
2. **Policy version change**: Any version identifier increment on a source bundle → invalidate all related cache entries
3. **Entitlement change**: A user's access rights change → invalidate any cache entries that would return results the user is no longer entitled to
4. **Source bundle hash change**: The content hash of any source material changes → invalidate related entries
5. **TTL expiry**: Time-based expiry as a backstop (short TTL for policy content, longer TTL for static reference material)

## Alignment with Existing Entif Work

This aligns directly with the v0 acceptance criteria:
- **Activity-based TTL** — content that changes frequently gets shorter TTL
- **Policy-version-keyed cache domains** — cache key includes policy version
- **Content hash as cache key component** — changes in source automatically invalidate
- **Reason codes**: `CACHE_DOMAIN_MISMATCH` as an explicit invalidation signal

## The Handbook Example (from Source)

> "Requests regarding the company handbook, which is equally available to all employees, are intercepted at the Entif on-premise server layer. Entif's box then uses Rosetta to qualify the underlying intent of the request, deduplicates/unifies questions that essentially are asking for the same thing using slightly different language, and returns a cached response without hitting ANY off-site inference/AI service if there hasn't been a cache invalidation since the last-such request (e.g., if that policy's tile in the company's handbook has been superseded by a revisionary tile)."

**The italicized condition is the entire engineering problem.**

## Source

`docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` (ChatGPT conversation, 4/11/2026), second response block ("3. Cache poisoning and stale certainty")

## Requirements

- Entif's cache layer must have explicit invalidation signals integrated with content management systems (handbook, policy DB, benefits systems)
- Cache entries must carry provenance metadata that includes: source version, content hash, authoritative timestamp
- A "last modified" or "superseded" event from upstream content systems must trigger Entif cache invalidation
- Audit trail must record what cache entries were served vs. recomputed — stale answers served need to be detectable post-hoc
- Consider a "confidence decay" model: cached answers become less authoritative over time even without explicit invalidation

## See Also

- `APC-005` (compound cache key — policy_version and source_bundle_hash are the invalidation triggers)
- `APC-004` (Entif product category)
- `YAAC-005-shared-caching-architecture.md`
- `entif-v0-008-workflow-state-transition-criteria.md`
- `CW-008-capability-tiles-cache-invalidation-missing.md` (existing issue-draft)
