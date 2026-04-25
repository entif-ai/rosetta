# AM-001: Formal JSON Schema for Agentic Messaging Envelope and Message Types

## Status

draft — `docs/intake/issue-drafts/am-001-json-schema-missing.md`

## Metadata

- **Type:** implementation
- **Priority:** P1
- **Source doc:** `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md`
- **Section:** Section 5.1, Section 4, Section 12
- **Confidence:** high

## Problem

The Agentic Messaging spec lists 13 required envelope fields and 8 message types (5 data plane + 3 control plane) but provides no JSON schemas for any of them. Section 5.1 defines envelope fields by name and type (e.g., `msg_id` as UUID, `msg_type` as enum, `sig` as ed25519) but not as machine-readable schema. Section 12 defers JSON schema work ("Turn this outline into a compact spec document with JSON schemas for each message type") without assigning owners or timelines.

Without formal schemas:
- Stage 2 schema validation ("Schema Validate per msg_type") cannot be implemented
- No basis for schema versioning or migration
- Interoperability between nodes cannot be verified programmatically
- Quarantine decisions for "schema invalid" (Section 6.2) cannot be automated

## Evidence

> "Every message MUST be wrapped in a signed envelope." — Section 5 (no schema provided)

> "Turn this outline into a compact spec document with: JSON schemas for each message type" — Section 12 (no schema, no owner, no timeline)

## Required Deliverables

1. JSON Schema for the signed envelope (13 required fields)
2. JSON Schema for each data plane message type: `TASK_RECEIPT`, `INCIDENT_ENVELOPE`, `WORK_UNIT_UPDATE`, `ARTIFACT_PUBLISH`, `HEALTH_REPORT`
3. JSON Schema for each control plane message type: `ACTION_REQUEST`, `ACTION_DECISION`, `APPROVAL_REQUEST`, `APPROVAL_RESPONSE`
4. `$id` / version field in each schema for registry and migration tracking
5. Schema registry location (file path in `rosetta/` or published via a schema endpoint)
6. Validation checklist mapping each field to its processing rule

## Acceptance Criteria

- [ ] All 9 schemas (1 envelope + 8 message types) committed to repo
- [ ] Schema version field present in each
- [ ] Stage 2 mailroom validation uses schemas to reject invalid messages
- [ ] "schema invalid" quarantine trigger (Section 6.2) is automated
- [ ] Schema migration strategy defined for breaking changes (e.g., `schema_version` field bumping)

## Dependencies

- None (this is the foundational spec work)

## Labels

`agentic-messaging`, `schema`, `priority`

## References

- Source: `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md` Section 4, 5.1, 12
- Related: AM-002 (storage schema for canonical objects), AM-006 (data/control plane type enforcement)
