# ACM-005: Weak-to-Strong Routing Handoff Audit Trail

## Metadata

| Field | Value |
| --- | --- |
| type | issue-candidate |
| source_doc | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` |
| finding | "If a cheap model triages and a stronger model resolves, the handoff rationale needs to be inspectable. Otherwise you just built a fancier black box with better invoices" |
| confidence | medium |
| draft_created | 2026-06-05 |

## Problem Statement

Entif implements weak-to-strong generalization: a cheap/fast model triages incoming queries (classifying intent, complexity, rights requirements) and a stronger model handles cases that exceed the cheap model's resolution threshold. Without inspectable handoff reasoning, this creates an undebuggable layer that can drift in quality or cost without operators noticing.

## Root Cause

Model routing decisions are typically implemented as opaque passes. When the cheap model escalates to strong, the rationale for escalation is lost. Over time, routing thresholds can drift, cost can balloon, and quality can degrade without any traceable cause.

## Required Solution

Instrument every routing handoff with an auditable record:

1. **Handoff receipt** — when cheap model escalates to strong, emit a receipt capturing: query summary, cheap model output, escalation reason (explicit classification: complexity, ambiguity, rights requirement), threshold that was crossed, strong model input
2. **Escalation taxonomy** — define explicit escalation reason codes: `COMPLEXITY_THRESHOLD_EXCEEDED`, `AMBIGUITY_DETECTED`, `RIGHTS_DOMAIN_UNRESOLVABLE`, `POLICY_VERSION_UNCERTAIN`, `SEMANTIC_EQUIVALENCE_CONFLICT`
3. **Cost attribution** — each handoff must be tagged with cost center and user context so ROI can be computed post-hoc
4. **Routing drift detection** — flag when escalation rate exceeds defined threshold (e.g., >30% of queries escalate) — this indicates cheap model is under-performing and needs retuning
5. **Threshold auditability** — routing thresholds must be configurable and versioned; changing a threshold must emit a governance event

## Acceptance Criteria

1. Every query must show which model handled it (cheap, strong, or both)
2. Every escalation must show: reason code, cheap model output summary, threshold crossed, timestamp, user context
3. Cost per query must be attributable to a cost center
4. Escalation rate must be monitorable and alertable (dashboard + alert)
5. Routing threshold changes must be governance events (who changed, when, what was the old/new value)

## Priority

medium

## Related Issues

- Related to ACM-001 (rights domain unresolvable is a routing trigger that depends on cache key design)
- Separate from ACM-004 (composite provenance) — this is about inference routing decisions, not data provenance

## Notes

This is particularly important for enterprise customers who need to justify AI spend to procurement or compliance. A traceable routing layer turns "we paid $X to AI vendors" into "we paid $X and here's what each tier handled and why."