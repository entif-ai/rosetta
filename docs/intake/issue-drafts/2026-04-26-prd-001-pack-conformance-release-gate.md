# Issue Draft: PRD-001 — Entif and Rosetta PRD: Pack Conformance Release Gate

## Metadata

| Field | Value |
|---|---|
| **Source document** | `docs/PRDs/20260426 - Entif and Rosetta PRD.md` |
| **Extracted by** | DI-009 subagent |
| **Findings basis** | F-39, F-44 |
| **Confidence** | HIGH |
| **Status** | draft |

## Problem Statement

The ROCK-3111-C RRP Pack Filesystem Contract specifies that `rosetta-pack-id-v1` values must be computed deterministically from pack metadata plus sorted file hashes, declared `pack_id` must be verified, entrypoint/export paths must be checked, and self/cyclic `depends_on` relationships must be rejected. However, pack conformance is not yet a release-gating requirement. Packs can ship without valid `pack_id`, without cycle detection, and without CI enforcement.

The Entif and Rosetta PRD (2026-04-26) explicitly promotes pack conformance from "good hygiene" to a mandatory release gate, stating that the current branch (`codex/pack-conformance-foundation`) already computes deterministic pack IDs and performs cycle detection, but broader CI enforcement across all packs is still incomplete.

## Evidence

- **F-39**: "The PRD should elevate pack conformance from 'good hygiene' to 'release-gating requirement'" — `turn13file0`, `turn22file0`
- **F-44**: "Slice 1 = pack conformance completion (deterministic pack IDs, cycle detection, CI enforcement)" — `turn13file0`, `turn22file0`, `turn23file0`
- Repo README confirms `rosetta-cid`, `rosetta-receipts`, and `packs/rrp/` already implement real mechanics
- `packs/rrp/pack.json` shows correct manifest format but `pack_id` remains a placeholder in some packs

## Requirements

1. Deterministic `rosetta-pack-id-v1` values computed from pack metadata + sorted file hashes for ALL packs, not just RRP
2. Declared `pack_id` verification against computed value — reject mismatches at CI gate
3. Entrypoint/export path existence checking at CI gate
4. `depends_on` cycle detection (SCC-based) — reject cyclic/self-referential dependencies
5. Required root file enforcement (`pack.json` must exist, required sections populated)
6. Traceability header enforcement per ROCK-3111-C
7. Conformance test suite that can run against any pack and report pass/fail

## Acceptance Criteria

- [ ] `pnpm run conformance:all` passes for `rrp`, `stdpack-source-substrate`, `vocabpack-source-taxonomy`
- [ ] `pnpm run conformance:check --pack=<name>` reports pass/fail with clear failure reason
- [ ] Cycle detection rejects any pack with self-reference or circular dependency
- [ ] Pack with missing or mismatched `pack_id` fails CI
- [ ] Pack with missing entrypoint files fails CI
- [ ] New packs added via `nx generate` automatically get correct `pack.json` scaffold

## Relationship to Other Issues

- IC-02 (TC-005 Promotion State) depends on valid pack IDs being available for promotion receipts
- IC-03 (Durable Canonical Cache) will need to index packs by verified `pack_id`
- Part of Phase 1 Constitutional Hardening (F-44)

## Recommended Labels

`governance`, `pack-conformance`, `CI`, `release-gate`, `phase-1`