# PRS-002: Local CAS + SQLite Before Postgres — Explicit Migration Path

## Metadata

| Field | Value |
| --- | --- |
| Title | Local CAS + SQLite Before Postgres — Explicit Migration Path |
| Type | architecture |
| Status | candidate |
| Source doc | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` |
| Extraction | `2026-06-05-entif-rosetta-prds-revisions-synthesis.md` |
| Labels | storage, migration, sqlite, postgres-adapter |
| Confidence | high |

## Problem

The decision to start with local CAS + SQLite and promote Postgres/pgvector to an adapter later is clear, but there is no documented migration path or trigger conditions for when to make the transition. Without this, teams may prematurely introduce the Postgres dependency or delay it indefinitely without criteria.

## Evidence

From the source document:
> "Storage starts local-first. Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite. This honors Rosetta's append-only, immutable tile posture while letting the later workflows doc's indexing ambitions land without contaminating alpha."

## Decision

Storage topology decision:
1. **Phase 1 (Alpha)**: Local CAS (content-addressed store) + SQLite index
2. **Phase 2 (Post-Alpha)**: Postgres/pgvector as adapter layer, triggered by explicit criteria

## Trigger Conditions for Migration

- When rights-scoped retrieval at SQLite scale shows performance degradation
- When multi-tenant isolation requirements exceed SQLite WAL capabilities
- When vector search against tapestries becomes a runtime requirement (not just planning)
- When pgvector extension availability is confirmed on all target deployment platforms

## Adapter Design Principle

Postgres/pgvector must be implemented as an **adapter** behind the same interface that SQLite implements. The storage layer must not know whether it is backed by SQLite or Postgres. This preserves the append-only immutable tile posture.

## Implementation Notes

- Define a storage adapter interface upfront (before choosing SQLite implementation)
- SQLite WAL mode for concurrent reads
- All storage operations produce receipts regardless of backend
- Migration path must preserve existing receipts and tapestries

## Dependencies

- PRS-001 (ROCK-3111-C) for schema definitions
- TC-006 (tapestry v1) for the tapestry backing store requirements

## Open Questions

- What is the exact size/complexity trigger for the Postgres migration decision?
- Should the adapter interface be defined in a separate RFC before Alpha implementation begins?
- Does the migration require a data migration tool or is it a fresh-start with re-ingestion?