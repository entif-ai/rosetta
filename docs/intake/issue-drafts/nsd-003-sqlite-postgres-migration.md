# NSD-003: Clarify SQLite → PostgreSQL migration timeline for Bootstrap → Text-Core

## Meta

| field | value |
| --- | --- |
| Status | draft |
| Type | implementation |
| Labels | storage, bootstrap, text-core, postgresql |
| Source | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md`, Section 5.1; NOT LAME PRD |
| Extraction date | 2026-05-26 |

---

## Problem

Doctrine v0.2 Section 5.1 storage-by-phase law specifies: "Bootstrap: CAS + SQLite index acceptable and preferred." But NOT LAME PRD specifies PostgreSQL as canonical registry with SQLite as local shadow only. The current Bootstrap implementation uses SQLite. There is an acknowledged but unresolved migration gap between Rung A (SQLite) and Rung B (Postgres+pgvector).

This blocks:
- Clean upgrade path from Bootstrap to Text-Core
- Understanding what happens to receipts, tiles, and verification data during migration
- Planning TC-006 (tapestry v1 + rights + Postgres) without clarity on the migration path from TC-005

---

## Evidence

- Doctrine Section 5.1: "Bootstrap: CAS + SQLite index acceptable and preferred"
- Doctrine Section 5.1: "Text-Core / Alpha RC: Postgres JSONB + RLS/rights enforcement + pgvector"
- NOT LAME PRD: "PostgreSQL as canonical registry; SQLite as local shadow only"
- TC-006 (Promotion state machine) is critical path; TC-007 blocked until TC-005 is green
- Ledger DI-011: "Clarify SQLite→PostgreSQL Bootstrap migration" flagged as issue-candidate

---

## Requirements

1. Define explicit migration trigger: at what point during TC-005/TC-006 does Bootstrap flip to Postgres?
2. Document the migration path for existing Bootstrap data (receipts, tiles, verification bundles):
   - Which data migrates?
   - Which data is recomputed?
   - Which data is archived?
3. Define SQLite shadow semantics: what does "local shadow" mean operationally?
4. Clarify pgvector baseline: is it introduced during TC-005, TC-006, or a separate milestone?
5. Define rollback boundary: what happens if Text-Core fails to validate against Postgres?

---

## Acceptance Criteria

- [ ] Migration timeline is documented as a plan (not necessarily implemented)
- [ ] Bootstrap data migration path is defined (migrate vs recompute vs archive)
- [ ] SQLite shadow semantics are defined operationally
- [ ] pgvector introduction point is specified
- [ ] Rollback boundary for Text-Core Postgres validation is defined
- [ ] TC-005/TC-006 are not blocked by this clarification (clarity is enough)