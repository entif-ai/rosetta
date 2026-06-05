# RRP-006: SQLite-to-Postgres Migration Path and Adapter Interface Unspecified

## Type
- `type`: open-question / architecture

## Status
- `status`: open

## Labels
- storage
- migration
- adapter
- sqlite
- postgres
- pgvector

## Summary

Alpha RC-4 establishes local CAS + SQLite as the initial storage backend, with an explicit decision to promote Postgres/pgvector to an adapter (not a prerequisite) in later milestones. However, neither the SQLite-to-Postgres migration path nor the storage adapter interface is specified. This creates a future migration risk: when the time comes to upgrade, there will be no defined contract for the adapter.

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` — Unified Decision 5:

> "Storage starts local-first. Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite."

Alpha RC-4:
> "local CAS + SQLite query surfaces stable; rights-scoped retrieval enforced"

The NOT LAME PRD specifies PostgreSQL as canonical registry with SQLite as local shadow only. This document explicitly inverts that for the MVP bootstrap, which is correct — but the eventual convergence point is undefined.

## Why This Matters

1. **Data portability**: When migrating from SQLite to Postgres, existing receipts, tapestries, and rights records must survive the migration
2. **Adapter contract**: Without an interface spec, the Postgres adapter cannot be implemented independently or tested against the SQLite implementation
3. **pgvector integration**: pgvector is a separate extension with its own schema; the adapter must expose a retrieval interface that is backend-agnostic
4. **NOT LAME alignment**: The NOT LAME PRD specifies PostgreSQL as canonical; this document's SQLite bootstrap is a deviation that needs explicit resolution

## Recommendation

1. Define a minimal storage adapter interface (abstract class or interface) with methods: `put(cid, content)`, `get(cid)`, `queryRights(subject, resource)`, `putReceipt(receipt)`, `getReceipts(toolcallCid)`
2. Implement SQLite adapter as MVP
3. Define Postgres/pgvector adapter as a P1 milestone with explicit test parity against the SQLite adapter
4. Add a migration note to the Rosetta Bootstrap documentation explaining that SQLite is a bootstrap convenience, not the canonical store

## Depends On
Alpha RC-4 completion; NOT LAME PRD alignment (DI-009 cross-reference)

## GitHub Issue
(Not yet filed)
