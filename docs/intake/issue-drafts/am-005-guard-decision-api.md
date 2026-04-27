# AM-005: Guard Decision API — `iam.decision` Format and Validation Protocol

## Status

draft — `docs/intake/issue-drafts/am-005-guard-decision-api.md`

## Metadata

- **Type:** implementation
- **Priority:** P1
- **Source doc:** `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md`
- **Section:** Section 4, Section 7.2, Section 9
- **Confidence:** high

## Problem

Control plane messages (specifically `ACTION_REQUEST`) require a valid `iam.decision` reference before the executor can proceed (Section 7.2: "An ACTION_REQUEST without a valid iam.decision ref MUST be denied"). The GuardLayer (Section 9) is described as the policy enforcement component that issues decisions, but:

- No `iam.decision` format or schema is defined
- No Guard API endpoint is specified (sync vs async? gRPC? REST? message bus?)
- No validation protocol for executors to verify `iam.decision` authenticity
- No TTL or expiry semantics for decisions
- No decision revocation mechanism

Without this, `ACTION_REQUEST` cannot be validated, and the control plane invariant ("MUST be denied without valid iam.decision") cannot be enforced.

## Evidence

> "ACTION_DECISION (issued by Guard; contains iam.decision ref)" — Section 4

> "An ACTION_REQUEST without a valid iam.decision ref MUST be denied." — Section 7.2

> "GuardLayer enforces fine policy: RBAC/ABAC checks, budget checks, tool allowlists, egress restrictions, approvals required" — Section 9 (no API defined)

## Required Deliverables

1. `iam.decision` schema: fields, types, version, expiry, signature/attestation
2. Guard API: `POST /guard/decide` (or equivalent) — input is ACTION_REQUEST, output is ACTION_DECISION with `iam.decision` ref
3. Executor validation protocol: how does an executor verify the `iam.decision` ref (lookup? cryptographic verification? local cache?)
4. Decision TTL: how long is a decision valid? (recommend aligned with message `expires_at`)
5. Decision revocation: can a decision be revoked before expiry? (e.g., human rescinds approval)
6. Async approval flow: APPROVAL_REQUEST/RESPONSE (Section 4) implies human-in-loop — how does this integrate with the Guard API?
7. Audit trail: every decision emits a receipt per receipt-law

## Acceptance Criteria

- [ ] `iam.decision` schema defined (JSON Schema)
- [ ] Guard API endpoint documented (request/response format, auth, errors)
- [ ] Executor can verify `iam.decision` validity before executing ACTION_REQUEST
- [ ] Section 7.2 fail-closed behavior is implementable
- [ ] Async human-in-loop (APPROVAL_REQUEST) is supported
- [ ] Every decision emits a receipt

## Dependencies

- AM-001 (iam.decision schema requires JSON schema infrastructure)
- NOT LAME PRD GuardLayer design
- Receipt schema (existing or AM-002)

## Labels

`agentic-messaging`, `guard`, `security`

## References

- Source: `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md` Section 4, 7.2, 9
- Related: AM-001 (schemas), NOT LAME PRD (GuardLayer)
