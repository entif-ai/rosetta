# BH-005: Bootstrap-era decisions may be superseded by NOT LAME PRD

## Metadata

| Field | Value |
| --- | --- |
| Issue | BH-005 |
| Title | Bootstrap-era decisions may be superseded by NOT LAME PRD architecture (PostgreSQL canonical, write-admission gate) |
| Type | supersession |
| Status | open |
| Labels | bootstrap, supersession, architecture |
| Depends on | BH-003 (Ingress Refinery status) |
| Evidence | `docs/handoffs/2026-04-13-bootstrap-handoff.md` predates NOT LAME PRD; bootstrap decisions (SQLite, raw guard) may conflict with later canonical registry decisions |
| Created | 2026-05-31 |

## Problem Statement

The 2026-04-13 bootstrap handoff describes a state where:
- Rosetta kernel uses SQLite locally (implicit from the context)
- Guard logic is described as "guard logic implemented in packages" — raw, not a formal state machine
- No mention of PostgreSQL as canonical registry
- No mention of write-admission gate
- No mention of 5-layer memory sovereignty map

The NOT LAME PRD (dated 2026-04-23) specifies:
- **PostgreSQL as canonical registry** (SQLite as local shadow only)
- **9-step write-admission gate** (fail-closed, receipts for every durable mutation)
- **5-layer memory sovereignty map**
- **9-step state machine for durable mutations**

The bootstrap handoff predates NOT LAME by 10 days. If the bootstrap-era decisions are still in force as defaults, they conflict with NOT LAME's architecture.

## Investigation Tasks

- [ ] Determine the actual storage layer in use: check `packages/rosetta-storage` or equivalent for SQLite vs PostgreSQL
- [ ] Check whether the 9-step write-admission gate (NOT LAME) has been implemented or if raw guard logic (bootstrap-era) is still active
- [ ] Check whether BOOTSTRAP_EXECUTION_TRACK.md has been updated since NOT LAME was published
- [ ] Identify which bootstrap-era decisions are still active defaults vs which have been superseded
- [ ] Determine if a formal migration from bootstrap-era storage to NOT LAME canonical storage is needed

## Expected Outcome

Either:
- A) Bootstrap-era decisions have been formally superseded by NOT LAME implementation — confirm and clean up stale references
- B) Bootstrap-era storage/guard is still in use and conflicts with NOT LAME specs — create migration issue
- C) Both exist as parallel layers (SQLite shadow + PostgreSQL canonical) as intended by NOT LAME — confirm and document

## Priority

medium — architectural inconsistency between bootstrap-era defaults and NOT LAME specs can cause confusion and integration gaps