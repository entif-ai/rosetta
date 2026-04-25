# AM-012: GuardLayer vs Mailroom Call Sequence and Error Propagation

## Status

draft — `docs/intake/issue-drafts/am-012-guardlayer-mailroom-call-sequence.md`

## Metadata

- **Type:** open-question
- **Priority:** P2
- **Source doc:** `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md`
- **Section:** Section 6.1, Section 9
- **Confidence:** medium

## Problem

The spec describes two enforcement layers:

1. **Mailroom (coarse policy):** domain, schema, replay, routing_key validation (Stage 1-2 of the pipeline)
2. **GuardLayer (fine policy):** RBAC/ABAC, budget, tool allowlists, egress restrictions, approvals (Section 9)

But the call sequence between them is unspecified:

- **When is Guard invoked?** After mailroom stages 1-6? Before routing? Only for control plane messages?
- **Sync vs async?** If Guard is async, what does the executor do while waiting?
- **Guard timeout?** If Guard doesn't respond, does the executor fail-closed (deny) or fail-open (allow)?
- **Guard error propagation?** If Guard returns an error (not a denial, but an internal error), what happens?
- **Retry semantics?** Can the executor retry a Guard decision? With what backoff?
- **Partial failure?** If Guard approves the ACTION_REQUEST but the subsequent execution fails, is the Guard decision consumed or can it be reused?

Section 7.2 says executors "MUST fail closed if constraints are missing or not understood" — but if Guard itself is missing or not understood, is that a fail-closed condition?

## Evidence

> "The mailroom enforces coarse policy (domain, schema, replay, routing)." — Section 9

> "The GuardLayer enforces fine policy: RBAC/ABAC checks, budget checks, tool allowlists, egress restrictions, approvals required." — Section 9

> "Executors MUST fail closed if constraints are missing or not understood." — Section 7.2

## Open Questions

1. Guard invocation point: when exactly in the pipeline is Guard called?
2. Sync vs async: is Guard a blocking call or an event-driven response?
3. Guard timeout: fail-closed or fail-open? Default: fail-closed
4. Error propagation: what happens when Guard returns a system error (not a decision)?
5. Retry: can an executor retry an ACTION_REQUEST with the same iam.decision ref? Is the decision idempotent?
6. Decision lifecycle: can an iam.decision be used once, or does it have a use-count or TTL?
7. Guard unavailability: what is the system behavior if Guard itself is down?

## Required Deliverables

1. **Guard call protocol:** document when Guard is invoked (after mailroom Stage 2 for control plane; not invoked for data plane)
2. **Sync vs async decision:** if sync, define timeout threshold; if async, define callback or polling mechanism
3. **Timeout behavior:** fail-closed by default; configurable timeout threshold
4. **Error handling:** Guard system errors (not denials) produce INCIDENT_ENVELOPE; executor receives error response, does not process action
5. **Retry policy:** same ACTION_REQUEST + same iam.decision ref → idempotent; different ACTION_REQUEST → new decision required
6. **Guard availability:** Guard is a hard dependency for control plane; if Guard is unavailable, control plane messages are queued (not dropped)
7. **Sequence diagram:** one-page diagram showing mailroom → Guard → executor flow with all error paths

## Acceptance Criteria

- [ ] Guard invocation point documented (after mailroom Stage 2, control plane only)
- [ ] Timeout behavior defined (fail-closed)
- [ ] Error handling for Guard system errors defined
- [ ] Retry/idempotency semantics documented
- [ ] Sequence diagram produced
- [ ] Section 7.2 fail-closed behavior is implementable given the call protocol

## Dependencies

- AM-005 (Guard Decision API — this defines the call protocol on top of the API)
- AM-011 (mailroom scope — determines what goes to Guard)

## Labels

`agentic-messaging`, `guard`, `reliability`

## References

- Source: `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md` Section 6.1, 7.2, 9
- Related: AM-005 (Guard API), AM-011 (mailroom scope)
