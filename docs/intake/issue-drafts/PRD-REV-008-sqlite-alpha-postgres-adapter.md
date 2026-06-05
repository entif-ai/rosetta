# Issue Draft — PRD-REV-008: Adopt SQLite local index as alpha storage (Postgres as later adapter)

## Title

PRD-REV-008: Adopt SQLite local index as alpha storage (Postgres as later adapter)

## Type

architecture

## Labels

storage, sqlite, postgres-adapter, alpha-storage

## Depends On

PRD-REV-001

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`

> "Storage starts local-first. Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite. This honors Rosetta's append-only, immutable tile posture while letting the later workflows doc's indexing ambitions land without contaminating alpha."

## Description

The alpha storage posture is explicitly defined as:
- **Content Addressable Store (CAS)**: local filesystem, immutable tiles
- **Index**: SQLite (not Postgres)
- **Postgres/pgvector**: promoted to "adapter" role, not a prerequisite for alpha green

This is a significant scope constraint: TC-006 (tapestry v1 + rights + Postgres) may need to be re-scoped. If SQLite is sufficient for alpha, the Postgres dependency for TC-006 can be treated as a P1 post-alpha enhancement rather than a blocker.

Rationale:
1. SQLite avoids infrastructure dependencies for alpha
2. SQLite WAL mode + FTS5 provides local lexical search
3. Postgres/pgvector is the recommended production target, not the alpha target
4. This keeps the alpha proof-of-concept self-contained

## Proposed Action

- Update TC-006 scope to clarify SQLite vs Postgres dependency
- Define the SQLite schema for alpha index (receipts, tiles, rights)
- Define the adapter interface that Postgres will implement
- Document the promotion path from SQLite to Postgres
- Ensure the adapter interface is storage-agnostic in the core code
