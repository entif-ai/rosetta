# PRD-REV-004: RRP Pack Filesystem Contract Needs Formalization as ROCK-3111-C

## Issue Metadata

| Field | Value |
| --- | --- |
| Title | RRP Pack Filesystem Contract exists as draft prose but not as formal ROCK spec in repo |
| Type | `issue-candidate` |
| Status | `draft` |
| Labels | `rock`, `pack-contract`, `rrp`, `alpha-rc` |
| Depends On | PRD-REV-001 (test vectors), PRD-REV-003 (guard signature verification) |
| Evidence | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` Finding 11 |

## Summary

The synthesis doc produced a concrete draftspec for the RRP Pack Filesystem Contract (ROCK-3111-C v0.1.0) — the first concrete artifact defining how RRP packs are organized on the filesystem, required files, schema locations, vocabularies, conformance tiers, and filesystem rules. This spec is the missing bridge between "we have RRP ideas" and "the repo knows exactly how to lay them down." It must be formalized as a ROCK spec file in the repo.

## Context

The draftspec defines:
- `packs/rrp/` as the canonical pack root
- Required files: `pack.json`, `README.md`, `CHANGELOG.md`, schema files, SHACL shapes, vocabularies, test vectors, examples
- Required pack.json fields: `pack_id`, `doc_id`, `version`, `kind`, `exports[]`, `depends_on[]`, `conformance_tiers[]`, `canonicalization`, `cid_profile`, compatibility fields
- Required exports: schema, SHACL, vocab, and test vector exports
- Three conformance tiers: RRP-Light, RRP-Full, RRP-Auditor
- Filesystem rules: immutability of versioned schemas, new semantics via vocab/shapes, required test vector cases, bundle closure requirements

Gaps between draft and formal spec:
- No `doc_id` field schema collision detection against existing ROCK series
- No CI enforcement for filesystem contract rules
- `pack.kind = "rosetta.pack"` — not yet in the PACK_SUITE_INDEX
- Conformance tier verification logic not implemented
- No escalation path for non-conforming packs

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Create `ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.1.0.md` in repo | This doc's Finding 11 | `docs/reference/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.1.0.md` | P0 | Full markdown spec from draft prose |
| Register `rosetta.pack` kind in PACK_SUITE_INDEX | PACK_SUITE_INDEX contract | `docs/packs/PACK_SUITE_INDEX.md` | P0 | Add before first RRP pack is published |
| Add filesystem contract CI check | ROCK-3111-C filesystem rules | `tools/scripts/` | P1 | Verify required files present, pack.json fields valid |
| Implement conformance tier verification in pack certifier | RRP-Light/Full/Auditor tiers | `packages/rosetta-pack/` | P1 | Tiers affect what claims a pack can make |
| Add RRP pack to CI smoke test (local pack loads and exports resolve) | Pack lifecycle | CI | P1 | Test pack install, validate, load sequence |

## Components And Technologies

- `packs/rrp/` directory structure
- `pack.json` schema
- SHACL shapes (`receipt.shapes.ttl`, `tapestry-bundle.shapes.ttl`)
- `vocab/receipt-types.json`, `vocab/claim-types.json`, `vocab/verdicts.json`
- Test vectors directory

## Acceptance Criteria

1. `ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.1.0.md` exists in `docs/reference/` with complete spec
2. `PACK_SUITE_INDEX.md` includes `rosetta.pack` kind
3. CI confirms required files present in `packs/rrp/` when pack is present
4. First RRP pack can be loaded by pack certifier without errors
5. `check-traceability-headers` passes on all new spec files
