# PRD-006: SQLite→PostgreSQL migration plan for Bootstrap

## Meta

| field | value |
| --- | --- |
| status | issue-candidate |
| type | architecture |
| priority | P1 |
| label | sqlite, postgres, migration, bootstrap, tc-006 |
| depends-on | — |
| evidence | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md; NOT LAME PRD |

## Summary

Define an explicit migration path from SQLite (current Bootstrap state) to PostgreSQL (NOT LAME canonical, required for pgvector baseline). Bootstrap currently uses SQLite; NOT LAME specifies PostgreSQL as canonical registry; TC-006 (tapestry v1 + rights + Postgres) is blocked until this is resolved.

## Problem Statement

The 2026-04-10 synthesis confirms "Storage starts local-first. Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite." However, no explicit migration path, timeline, or trigger is defined. Meanwhile:
- NOT LAME PRD specifies PostgreSQL as canonical registry
- TC-006 is blocked waiting for Postgres/pgvector baseline
- Bootstrap is currently SQLite — no documented migration plan exists

This is a known architectural gap that needs explicit resolution.

## Proposed Implementation

### Phase 1: Document current state

- Audit exactly which Bootstrap components use SQLite (schema, migrations, queries)
- Identify which tables/queries would need to change for Postgres
- Determine what's SQLite-specific (WAL behavior, path-based isolation, etc.)

### Phase 2: Define migration trigger

- What event/trigger initiates the migration? (TC-006 start? pgvector feature gate? explicit milestone?)
- Is there a co-existence period where both SQLite and Postgres are live?

### Phase 3: Define the adapter boundary

- Local CAS stays as files — does not migrate
- SQLite index migrates to Postgres
- What does "pgvector becomes an adapter" mean in practice? At what layer does the adapter sit?

### Phase 4: Migration execution

- Reversible migration scripts (PG ALTER TABLE, data backfill)
- RLS (Row Level Security) configuration for multi-tenancy
- Connection pooling (pgBouncer or similar)

## Constraints and Preconditions

- Depends on: NOT LAME PRD's PostgreSQL schema being finalized (12-table canonical schema)
- Blocks: TC-006

## Verification

- [ ] Current SQLite usage is fully audited
- [ ] Migration trigger is defined (date, event, or condition)
- [ ] Adapter boundary is specified (which layer converts SQLite→Postgres)
- [ ] Reversible migration scripts exist for the index layer
- [ ] TC-006 no longer blocked

## Notes

- This is P1 because TC-006 is on the critical path and Bootstrap is currently SQLite
- The migration must not corrupt or lose any receipts — append-only invariance must be preserved throughout