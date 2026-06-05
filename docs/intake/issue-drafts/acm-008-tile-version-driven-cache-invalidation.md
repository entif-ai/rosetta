# ACM-008: Stale Cache Poisoning — Tile-Version-Driven Invalidation Required

## Issue

The company handbook example in the API-driven cache management dialogue illustrates the highest-consequence cache failure mode: a fast, confident, wrong internal answer from a stale cached policy tile.

The premise: "Entif answers policy questions locally from its cache if the handbook tile hasn't been superseded by a revisionary tile." The failure mode: the cache invalidation is not tied ruthlessly to tile version changes, so a superseded tile continues to be served as authoritative — and because it's served from cache, it's fast and confident. The user has no signal that the answer is stale.

This is catastrophically worse than a cache miss (which causes a slower fresh fetch) because the user receives a wrong answer that *looks* authoritative and high-confidence.

## Why This Matters

Entif's value proposition includes "governance, risk reduction, compliance, auditability." A stale-cached-wrong-policy-answer in a financial services or healthcare context can cause regulatory violations, financial harm, or discrimination claims. This is the highest-severity failure mode for a system positioned as an enterprise governance layer.

## Scope

1. Define tile-level versioning as a first-class concept:
   - A `tile_version` is a content-addressable hash of the tile's full content at the time of write
   - A `tile_lifecycle_event` is emitted whenever a tile is created, superseded, deprecated, or archived
   - The event includes `{tile_id, event_type, new_version_hash, predecessor_hash, timestamp, signer}`

2. Cache invalidation rules (enforced at the Guard layer):
   - On `tile_superseded`: all cache entries whose `source_bundle_hash` matches the superseded tile's hash must be immediately invalidated and flagged `stale: true`
   - On `rights_change`: all cache entries whose `rights_domain` axis matches the changed domain must be invalidated
   - On `policy_version_bump`: equivalent to tile_superseded for policy tiles

3. A cache entry that is invalidated must not be served silently. The system must either: (a) re-fetch from source and compose, (b) return a `CACHE_INVALIDATED` refusal with reason and suggested re-fetch action, (c) escalate to human review for policy-critical content.

4. "Fast and confident" is not an acceptable signal. The system must distinguish "this is fast because it's correct and cached" from "this is fast because no one checked if it was still valid."

5. Add `cache_staleness_check` as a mandatory step in the write-admission gate's Observe step (post-Apply, pre-Receipt).

## References

- Source: docs/chats/20260411 - Chat GPT - API-driven Cache Management.md (operator: "if that policy's tile in the company's handbook has been superseded by a revisionary tile")
- Related: receipt-law; write-admission gate; NOT LAME provenance spine; TC-006 tapestry versioning

## Labels

cache, provenance, correctness

## Status

doc-candidate
