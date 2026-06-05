# IDI-003: Cache Invalidation Must Be Tied to Policy Tile Versioning, Not TTL Alone

## Metadata

- **Type**: reliability/correctness
- **Status**: draft
- **Source doc**: `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- **Evidence**: "Otherwise you get the most dangerous failure mode of all: a fast, confident, wrong internal answer."
- **Confidence**: high

## Problem

The company handbook example in the source document shows Entif intercepting internal policy questions, routing them to cached answers when the underlying tile has not changed. This only works if invalidation is tied to tile versioning — not just a time-based TTL.

TTL-only invalidation creates a window where:
1. Policy tile is updated
2. Entif serves stale cached answer (within TTL)
3. Employee acts on wrong policy
4. No receipt of the divergence exists

This is described as "the most dangerous failure mode" because the wrong answer is fast, confident, and appears authoritative.

## Required

- Tile version hash as a first-class invalidation trigger
- Rosetta `source-episode` provenance chain that links every cached answer to the exact tile version used
- Invalidation event emission (receipt) when a tile is superseded
- TTL as a fallback safety net, not the primary invalidation mechanism

## Connection to Existing Rosetta Work

- `tapestry`: Tile versioning is already in the tapestry model
- `receipts-law`: Invalidation events must emit receipts
- `rights-scoped-retrieval`: Rights changes also require cache invalidation for the affected domain

## TODO

- [ ] Add `tile_version_hash` to the cache entry schema
- [ ] Specify invalidation triggers: tile update, rights change, data residency boundary shift
- [ ] Ensure invalidation events emit structured receipts
- [ ] Add correctness test: stale tile answer served → receipt divergence alert
