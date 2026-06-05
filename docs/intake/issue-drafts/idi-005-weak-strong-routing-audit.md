# IDI-005: Weak-to-Strong Routing Requires Auditable Handoff Receipt

## Metadata

- **Type**: governance
- **Status**: draft
- **Source doc**: `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- **Evidence**: "If a cheap model triages and a stronger model resolves, the handoff rationale needs to be inspectable."
- **Confidence**: medium

## Problem

Entif's routing layer may use a cheap/fast model for initial triage (e.g., "Can this be answered from the handbook cache?") and escalate to a more capable/expensive model when triage fails. This is a form of weak-to-strong generalization at the system level.

Without an auditable handoff record:
- No way to verify the triage decision was correct
- No basis for challenging "why did you escalate?" vs. "why didn't you?"
- Cost attribution becomes opaque (which model burned which tokens on whose behalf?)
- The escalation chain becomes an unaccountable black box

## Required

A `RoutingHandoffReceipt` that records:
- Input classification at triage stage
- Model tier used for triage (with provider/version)
- Decision: escalate or resolve
- Escalation trigger: which condition triggered the upgrade
- Final model tier and provider used for resolution
- Round-trip latency per tier (for cost attribution)
- Entitlements active at each tier

## Connection to Rosetta

- `receipts-law`: Handoff between tiers is a durable event requiring a receipt
- `context-compiler`: The context bundle must carry the handoff chain
- `write-admission-gate`: Escalation to a higher-capability model is a gate-worthy event

## TODO

- [ ] Define `RoutingHandoffReceipt` schema
- [ ] Specify minimum trigger conditions for escalation (ambiguity threshold, cost ceiling, etc.)
- [ ] Add handoff chain to the context bundle passed to the resolving model
- [ ] Add test cases: challenged escalation, challenged non-escalation
