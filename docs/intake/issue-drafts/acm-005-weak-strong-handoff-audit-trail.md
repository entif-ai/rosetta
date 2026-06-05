# ACM-005: Weak-to-Strong Handoff Audit Trail Missing

## Issue Metadata

| Field | Value |
|---|---|
| Title | ACM-005: Weak-to-Strong Handoff Audit Trail Missing |
| Type | risk |
| Status | draft |
| Source doc | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-05-api-driven-cache-mgmt.md` |
| Confidence | medium |
| Labels | routing, audit, weak-to-strong, escalation |
| Related concepts | weak-to-strong, escalation, audit, handoff, guard |
| Depends on | — |

## Problem Statement

Rosetta's Entif architecture proposes a weak-to-strong model routing pattern: a cheaper or faster model performs initial triage (classifying intent, determining scope), and a stronger/more expensive model handles cases that exceed the triage model's capability threshold.

This is a sensible cost-optimization pattern. However, the source document identifies that without an audit trail of the handoff rationale, weak-to-strong routing becomes "a fancier black box with better invoices" — opaque escalation that obscures cost allocation, accountability, and correctness reasoning.

Specifically, if a triage model's incorrect classification causes a problem in the final answer, there must be a way to trace: what did the triage model conclude, what triggered the escalation, what did the resolver model do differently.

## Evidence

From the source document (2026-04-11 chat):

> "If a cheap model triages and a stronger model resolves, the handoff rationale needs to be inspectable. Otherwise you just built a fancier black box with better invoices."

No handoff receipt mechanism is described in any current Rosetta spec. The Guard layer handles admission control but not intra-request model-tier escalation.

## Proposed Resolution

Define a weak-to-strong handoff receipt as a first-class Rosetta artifact:

1. **Triage receipt**: Records the triage model's input, output classification, confidence score, and the escalation trigger condition (e.g., "ambiguity_score > 0.7" or "requires_external_knowledge == true").
2. **Escalation receipt**: Records the decision to escalate, referencing the triage receipt, the target model tier, and the reason.
3. **Resolution receipt**: Records the resolver model's output, referencing the escalation receipt.
4. **Composition receipt**: The final answer receipt references all three and records the assembly logic.

This creates a full DAG for any weak-to-strong composed answer.

The escalation trigger conditions must be configurable and auditable — not hard-coded behavior invisible to operators.

## Implementation Notes

- This requires the Guard layer to intercept and record model-tier transitions
- The escalation receipt should be emitted even for cases where the triage model correctly handles the request without escalation (to record the non-escalation decision)
- Cost attribution: each receipt should record the model used and token count for billing attribution
- The trigger conditions should be defined in a policy tile (configurable by the enterprise operator)

## Open Questions

- Is the handoff receipt part of the Guard layer or the Orchestration layer (LangGraph workflow)?
- What is the minimum viable handoff receipt — does it need the full triage output, or just the decision + confidence score?
- Should non-escalation also be recorded (to distinguish "easy case handled cheaply" from "never escalated")?
- How does this interact with caching? If a cached answer is served, was there a weak-to-strong handoff in its computation? Should the cached answer carry the handoff receipt history?

## Related Issues

- ACM-004 (multi-provider provenance spine) — related concern about composed-answer accountability
- TC-005 (Write-Admission Gate) — Guard layer as the natural place to implement handoff receipts
- ACM-001 (composite cache key) — the handoff receipt should be part of the cache key computation for weak-to-strong answers
