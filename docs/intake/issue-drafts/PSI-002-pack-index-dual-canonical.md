# PSI-002: Dual canonical locations for pack index create routing ambiguity

## Metadata

| Field | Value |
|---|---|
| **Issue draft ID** | `PSI-002` |
| **Source document** | `docs/packs/PACK_SUITE_INDEX.md` |
| **Finding reference** | Finding 1 |
| **Confidence** | medium |
| **Labels** | `packs`, `architecture`, `discoverability` |
| **Status** | draft |

## Problem Statement

PACK_SUITE_INDEX.md at `docs/packs/` explicitly states the canonical v3 extension pack index "now lives at" `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Extension Packs.md`. This creates a two-hop lookup for pack discovery: (1) locate PACK_SUITE_INDEX.md, (2) follow the pointer to the Extension Packs doc. Any agent or developer discovering packs through `docs/packs/` gets stale information unless they know to follow the redirect.

## Expected Behavior

Pack discovery should have a single authoritative entry point with no redirect indirection. Either:
- `docs/packs/PACK_SUITE_INDEX.md` is the canonical index and contains full pack listing inline, or
- `docs/packs/PACK_SUITE_INDEX.md` is deprecated and removed, with `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Extension Packs.md` as the sole entry point

## Gap Description

- `docs/packs/PACK_SUITE_INDEX.md` references canonical location at `docs/live/...`
- The "canonical" doc at `docs/live/` may itself contain references back to `docs/packs/`
- No clear indication which doc is authoritative for tooling ingestion
- Bootstrap contract path references `docs/packs/` specifically — if that doc is routing-only, tooling may receive outdated pack listings

## References

- `docs/packs/PACK_SUITE_INDEX.md`
- `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Extension Packs.md`
- Finding 1 in `docs/intake/docs-intelligence/2026-06-01-pack-suite-index.md`

## Owner

TBD — likely architecture or docs-intelligence owner

## Acceptance Criteria

1. Pack discovery has a single authoritative entry point with no redirect
2. All tooling references the same canonical doc for pack listings
3. Bootstrap contract path resolves to the authoritative pack index without indirection