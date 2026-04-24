# Split Postgres and pgvector operational baseline from broad TC-006 scope

Issue draft id: `text-core-postgres-pgvector-operational-baseline`
Priority: `P2`
Effort: `M`
Labels: `text-core`, `storage`, `retrieval`, `postgres`, `pgvector`

## Problem

The Text-Core scope extraction flags that TC-006 may be too broad because it combines tapestry v1, rights retrieval, and the Postgres/pgvector baseline.

## Scope

Define a standalone draft for the storage and retrieval operational baseline so TC-006 can stay focused if implementation scope grows.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-24-batch-1-highest-authority-rosetta-direction.md` - Issue Candidates row for Postgres/pgvector operational baseline.
- Charter Text-Core exit criteria and Phased Backlog B-011/9.2 are cited in that extraction row.

## Specific Findings

### Finding 1: Storage baseline is a separable implementation surface

The extraction marks this as a draft candidate because rights-scoped retrieval depends on storage behavior that can be specified independently.

## Acceptance Criteria

- [ ] Define required Postgres tables or logical records for Text-Core baseline retrieval.
- [ ] Define pgvector use as retrieval support, not canonical authority.
- [ ] Define rights-scope filters required before returning results.
- [ ] Cross-link any promoted issue back to TC-006 (#11) rather than replacing it.
