# PSI-001: Pack schema validation CI missing

## Metadata

| Field | Value |
|---|---|
| **Issue draft ID** | `PSI-001` |
| **Source document** | `docs/packs/PACK_SUITE_INDEX.md` |
| **Finding reference** | Finding 6 |
| **Confidence** | medium |
| **Labels** | `packs`, `ci`, `conformance` |
| **Status** | draft |

## Problem Statement

The pack suite defines a machine-readable schema contract at `packs/_schemas/pack-manifest.schema.json`, but no CI pipeline validates that pack contents actually conform to the schema. The PACK_SUITE_INDEX.md states the goal is "increasing machine validation coverage so pack files and runtime validators converge further" — yet without automated validation, pack conformance is enforced only by manual review.

## Expected Behavior

Every pack added or modified in the repo should be validated against `pack-manifest.schema.json` in CI before merge. Validation should cover:
- Required manifest fields present
- Schema references valid
- SHACL shapes parseable
- Test vectors execute successfully

## Gap Description

- Schema file exists at `packs/_schemas/pack-manifest.schema.json`
- No mention of CI job validating pack contents
- ROCK-3111-C (RRP Pack Filesystem Contract) calls for conformance testing
- Bootstrap relies on pack directories being correctly structured (bootstrap contract path)
- Runtime validators and pack files are not yet converged

## References

- `packs/_schemas/pack-manifest.schema.json` — schema definition
- `docs/intake/docs-intelligence/2026-04-24-upstream-and-backup-plan.md` — recovery rule gap (related to enforcement gap)
- ROCK-3111-C RRP Pack Filesystem Contract

## Owner

TBD — likely TC-007 (Tapestry v1 + rights + conformance) owner

## Acceptance Criteria

1. CI job exists that validates all pack directories against `pack-manifest.schema.json`
2. Job runs on every PR that modifies files under `packs/`
3. Job blocks merge on schema violations
4. All three current packs (`packs/rrp`, `packs/stdpack-source-substrate`, `packs/vocabpack-source-taxonomy`) pass validation