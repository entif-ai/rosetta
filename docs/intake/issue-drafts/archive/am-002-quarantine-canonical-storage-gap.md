# AM-002: Quarantine-to-Canonical Write Gate and Storage Schema

## Status

draft — `docs/intake/issue-drafts/am-002-quarantine-canonical-storage-gap.md`

## Metadata

- **Type:** implementation
- **Priority:** P1
- **Source doc:** `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md`
- **Section:** Section 6.1 Stage 3→4, Section 8.2
- **Confidence:** high

## Problem

The mailroom pipeline has six mandatory stages (Section 6.1): (1) Authenticate & Validate → (2) Schema Validate → (3) Quarantine Raw (append-only) → (4) Canonicalize to Rosetta tiles/tapestries → (5) Route → (6) Persist. The quarantine→canonical transition (Stage 3→4) is described narratively but has no storage schema, no write gate specification, and no schema for the resulting canonical Rosetta objects.

Section 8.2 provides a type-level mapping:
- `TASK_RECEIPT` → `rosetta.receipt` + linked `rosetta.observation/evaluation`
- `INCIDENT_ENVELOPE` → `rosetta.incident` (sealed if needed)
- `WORK_UNIT_UPDATE` → state tile for convoy/work unit progress
- `ACTION_DECISION` → `iam.decision` + `rosetta.receipt` attestation

But the actual storage schemas (PostgreSQL DDL, object schemas, field-level types) are unspecified. The write gate between quarantine (append-only, unprocessed) and canonical (verified, queryable) storage is the most security-critical transition in the pipeline — it determines what becomes authoritative.

Without this:
- The Section 8.2 mapping cannot be implemented
- No basis for schema validation at Stage 4
- Quarantine→canonical promotion criteria are undefined
- Cannot integrate with NOT LAME PRD write-admission gate (9-step state machine)

## Evidence

> "Quarantine Raw (store ciphertext + metadata; append-only)" — Section 6.1 Stage 3 (no schema)

> "Canonicalize into Rosetta tiles/tapestries where applicable" — Section 6.1 Stage 4 (no schema, no gate)

> Section 8.2 maps message types to Rosetta objects but provides no storage schema or write criteria

## Required Deliverables

1. Storage schema for `rosetta.receipt` (from `TASK_RECEIPT`) — PostgreSQL DDL or equivalent
2. Storage schema for `rosetta.incident` (from `INCIDENT_ENVELOPE`) — including sealed variant
3. Storage schema for state tiles (from `WORK_UNIT_UPDATE`)
4. Write gate definition: criteria for quarantine→canonical promotion (deterministic? Guard-reviewed? receipt-required?)
5. Integration point with NOT LAME write-admission gate (9-step: Propose→Normalize→Authorize→Ground→Checkpoint→Apply→Observe→Receipt→Project)
6. Append-only integrity verification: how to prove quarantine record has not been modified before canonicalization

## Acceptance Criteria

- [ ] PostgreSQL DDL (or equivalent) committed for all four Rosetta object types
- [ ] Write gate documented with deterministic promotion criteria
- [ ] Gate integrates with NOT LAME write-admission state machine
- [ ] Receipt-law compliance: every canonical write emits a receipt
- [ ] Quarantine integrity can be verified (append-only proof)

## Dependencies

- AM-001 (JSON schemas must be stable before storage schemas can be derived)
- NOT LAME PRD write-admission gate definition
- Rosetta receipt schema (from existing governing docs)

## Labels

`agentic-messaging`, `storage`, `quarantine`

## References

- Source: `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md` Section 6.1, 8.2
- Related: AM-001 (schemas), NOT LAME PRD (write-admission gate), receipt-law
