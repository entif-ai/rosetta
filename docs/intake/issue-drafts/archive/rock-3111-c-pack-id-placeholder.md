# RRP pack_id is a placeholder — needs real content-addressed ID at freeze

Issue id: `rock-3111-c-pack-id-placeholder`
Priority: `P2`
Effort: `M`
Labels: `packs`, `rrp`, `identity`, `content-addressing`

## Problem

RRP pack.json files use a placeholder `pack_id` value (`"cid:rrp-pack-placeholder"`) at freeze time instead of a real content-addressed ID. The contract specifies the field exists but doesn't define how it's computed or verified when a pack is finalized.

## Source Evidence

- `docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md` — pack.json example shows `"pack_id": "cid:rrp-pack-placeholder"`
- Section 3.2: pack_id field is documented but no computation method described
- Section 9: mentions CID-based identification but placeholder persists in the example

## Specific Findings

### Finding 1: pack_id placeholder in example
The canonical pack.json example uses `"cid:rrp-pack-placeholder"` which is a literal string, not a computed CID. A pack released with this value would be misidentified.

**Recommended action:** Define the exact algorithm for computing pack_id from pack contents at freeze time. Suggest using a multihash CIDv1 with the pack's root directory hash.

### Finding 2: No verification mechanism
Nothing in the RRP contract specifies how a consumer would verify that a pack_id matches the actual pack contents.

**Recommended action:** Add a deterministic hash algorithm (e.g., SHA-256 of sorted file manifest) and include it in the contract spec.

## Acceptance Criteria

- [ ] pack_id computation algorithm is defined in RRP spec
- [ ] pack_id is derived from pack contents (not manually assigned)
- [ ] Verification method exists so consumers can confirm pack_id matches pack
- [ ] Example pack.json is updated to show a real CID, not placeholder

## Related Issues

- Depends on: ROCK-3111-C finalization (this issue is part of the RRP contract)

## Status

candidate (from PR #37 extraction)