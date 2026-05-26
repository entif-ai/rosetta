# SEC-007: Ledger substrate conflict — blockchain vs. PostgreSQL canonical

## Type
`decision`

## Problem

The Secure Architecture Companion Paper (October 2025) specifies a blockchain-backed append-only ledger for audit trails. The NOT LAME PRD (April 2026) specifies PostgreSQL as canonical registry for all durable state. These are mutually exclusive for the canonical audit trail function. Without resolving this conflict, any Guard Layer audit trail implementation could be built on the wrong substrate.

## Evidence

From this document, Section 4:
> "Every significant action or decision in the Entif system can be logged as a transaction on a permissioned blockchain ledger... immutable, append-only audit trail for the ecosystem"

From NOT LAME PRD (`docs/PRDs/20260423 - Entif.AI - NOT LAME (v0.1) - PRD - Neurologic Orchestration Topology for Layered Agentic Memory and Evolution.md`):
> "PostgreSQL as canonical registry (SQLite as local shadow only)"

From Rosetta Bootstrap:
> Append-only receipts implemented in PostgreSQL; receipt-law mandates receipts for all meaningful steps

## Acceptance Criteria

- [ ] Decision record: canonical audit trail is PostgreSQL (NOT LAME direction), blockchain is a scalability/enterprise future option
- [ ] Architecture docs updated to reflect resolved decision
- [ ] All SEC-* issue draft references to "blockchain audit trail" updated to specify "PostgreSQL append-only receipts"
- [ ] Blockchain alternative documented as a future federation/enterprise ledger option alongside PostgreSQL

## Priority
`P1`

## Labels
`ledger`, `decision`, `postgresql`, `blockchain`

## Depends On
None (requires architectural decision, not implementation)
