# Issue Draft: EDG-002 — Resolve Blockchain Ledger vs PostgreSQL Canonical Registry Conflict

## Metadata

| Field | Value |
|---|---|
| Issue ID | EDG-002 |
| Type | architecture |
| Status | draft |
| Source doc | docs/governance/Entif 2.0 - Decentralization and Governance.md |
| Extraction date | 2026-05-26 |
| Confidence | high |

## Problem

Two governing documents specify incompatible storage substrates for the audit/ledger function:

| Document | Specified substrate | Function |
|---|---|---|
| "Entif 2.0 - Decentralization & Governance" (Section 4) | Permissioned blockchain ledger | Audit trail and governance transactions |
| NOT LAME PRD | PostgreSQL as canonical registry | All durable state, receipts, artifacts |

These are in direct conflict. Only one can be the canonical answer.

## Evidence

- "Entif 2.0 - Decentralization & Governance.md" Section 4: "Every significant action or decision in the Entif system can be logged as a transaction on a permissioned blockchain ledger"
- NOT LAME PRD: "PostgreSQL as canonical registry; SQLite only as local shadow"
- Doctrine v0.2 Section 5.1: "Postgres JSONB + RLS/rights enforcement... pgvector for portable vector baseline" for Text-Core/Alpha RC

## Analysis

Possible resolutions:

1. **NOT LAME wins (PostgreSQL canonical)** — Blockchain is aspirational future work. PostgreSQL handles audit trail via append-only tables with hash chains. Simpler near-term.
2. **Blockchain wins (deferred to future)** — PostgreSQL becomes "local shadow" and blockchain becomes canonical. More complex, requires new infrastructure.
3. **Split model** — PostgreSQL for operational data; blockchain for cross-node governance audit only. Requires clear boundary definition.

## Recommended Action

Resolve in next NOT LAME review cycle:
- ADR to explicitly state: "PostgreSQL is the canonical registry for all durable state including audit receipts. Blockchain is out of scope for MVP phases."
- If blockchain is desired long-term, document as a separate future initiative with explicit migration path from PostgreSQL.

## Labels

storage, canonical-registry, not-lame, blockchain, architecture, conflict-resolution

## Depends On

NOT LAME PRD ratification

## Related Issues

- EDG-001 (terminology mapping — will need to reflect resolution)
- DI-009 (knowledge graph — cross-doc concept linking)
- NOT LAME write-admission-gate spec