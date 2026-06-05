# PRD-001: SQLite → PostgreSQL Migration Gap

## Metadata

- **Type**: implementation
- **Status**: candidate
- **Priority**: high
- **Labels**: storage, migration, sqlite, postgres, text-core
- **Depends on**: NOT LAME PRD, 20260410 PRD revisions synthesis
- **Confidence**: high

## Problem Statement

The 20260410 PRD revisions synthesis establishes "Storage starts local-first — Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite."

However, the NOT LAME PRD explicitly specifies PostgreSQL as the canonical registry. This creates an unresolved conflict: the canonical registry spec says PostgreSQL, but the build order defers it indefinitely.

If SQLite is the working storage for the MVP, and PostgreSQL is the canonical registry per NOT LAME, then there is an implicit migration step that must happen before TC-006/TC-007 (tapestry + rights + Postgres) can be considered complete.

## Evidence

From 20260410 PRD revisions synthesis:
> "Storage starts local-first — Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite. This honors Rosetta's append-only, immutable tile posture while letting the later workflows doc's indexing ambitions land without contaminating alpha."

From NOT LAME PRD (batch-2 extraction):
> "PostgreSQL as canonical registry (SQLite as local shadow only)"

These two positions are in direct conflict for any doc that assumes PostgreSQL from the start.

## Scope

1. **Define the migration trigger**: When does the SQLite → PostgreSQL migration happen? Is it gate-driven (TC-006 green), time-driven (MVP complete), or event-driven (first production workload)?
2. **Schema mapping**: SQLite schema → PostgreSQL schema — what tables, indexes, constraints map directly? What does not?
3. **Data migration**: Existing SQLite data (receipts, tapestries, tiles) must migrate with provenance preserved. Is there a migration receipt type?
4. **pgvector upgrade path**: Local SQLite has no vector store. PostgreSQL + pgvector is the target. The migration must include vector data migration or re-embedding.
5. **Zero-downtime requirement**: Production inference must not halt during migration. What is the migration strategy (dual-write? blue-green? read-shadow then cutover?)?
6. **Rights-scoped retrieval in PostgreSQL**: Does the PostgreSQL schema support rights-scoped retrieval natively, or is application-level enforcement required?

## Implementation Notes

- This issue likely blocks TC-006 and TC-007, which are currently marked as blocked until TC-005 (Promotion state machine) is green
- The migration gap should be tracked as its own work item, not assumed to be trivial
- Consider whether the SQLite-first approach is actually incompatible with NOT LAME's "PostgreSQL as canonical" stance, or if "canonical" means something different (e.g., authoritative for rights decisions, while SQLite handles local caching)

## Related

- TC-006 (tapestry v1 + rights + Postgres)
- TC-007 (Postgres/pgvector baseline)
- NOT LAME PRD
- 20260410 PRD revisions synthesis