# PRD-002: Local SQLite → PostgreSQL migration path needs explicit spec

## Metadata

| Field | Value |
| --- | --- |
| Title | Local SQLite → PostgreSQL migration path needs explicit spec |
| Type | architecture |
| Status | draft |
| Source doc | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` |
| Finding | Unified Decision 5 + Decision 5 rationale |
| Confidence | high |

## Summary

Decision 5 of the PRD revision synthesis establishes local-first storage: "Storage starts local-first. Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite." However, the Bootstrap currently uses SQLite, the NOT LAME PRD specifies PostgreSQL as canonical, and TC-006 (tapestry v1 + rights + Postgres) is on the critical path. No migration path between SQLite MVP and PostgreSQL target has been specified. This is a known gap (DI-004 / SQLite→PostgreSQL Bootstrap migration).

## Problem

Three conflicting signals about SQLite vs PostgreSQL:
1. **Current Bootstrap**: Uses SQLite (confirmed in `BOOTSTRAP_EXECUTION_TRACK.md`)
2. **NOT LAME PRD**: Specifies PostgreSQL as canonical registry; SQLite only as local shadow
3. **PRD Revision synthesis**: Says SQLite is correct MVP posture; Postgres is an adapter

These signals don't contradict each other if there's an explicit migration plan. But that migration plan doesn't exist in any processed document.

## Known Gaps

- No migration trigger defined (what event/criterion graduates from SQLite to PostgreSQL?)
- No schema diff between SQLite MVP schema and PostgreSQL target schema
- No data migration strategy (backfill existing SQLite data? re-emit receipts? start fresh?)
- No dual-write period defined
- Bootstrap SQLite usage may hard-code assumptions that need to be extracted

## Relationship to TC-006

TC-006 is described as "tapestry v1 + rights + Postgres" — the Postgres component of TC-006 may actually be the SQLite→PostgreSQL migration. This scope should be clarified explicitly.

## Proposed Action

1. Author a migration spec doc: `docs/backlog/SQLITE_TO_POSTGRES_MIGRATION.md`
2. Define trigger criteria (e.g., "first multi-tenant deployment" or "first production workload")
3. Define schema translation rules (SQLite WAL mode → PostgreSQL with RLS)
4. Define data migration path (re-emit receipts from local CAS into PostgreSQL canonical store)
5. Clarify TC-006 scope: does TC-006 include the migration, or does TC-006 assume migration is pre-existing?

## Labels

`storage`, `sqlite`, `postgres`, `migration`, `tc-006`, `bootstrap`

## Depends On

- TC-005 (Promotion state machine — must be green before SQLite→Postgres changes can be tested)
- TC-006 scope clarification
