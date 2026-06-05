# API-CACHE-005: Weak-to-Strong Routing Audit Log

## Metadata

| Field | Value |
|---|---|
| Type | spec-gap |
| Status | draft |
| Labels | routing, audit-spine, governance |
| Depends On | — |
| Evidence | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` Finding: "If a cheap model triages and a stronger model resolves, the handoff rationale needs to be inspectable. Otherwise you just built a fancier black box with better invoices" |

---

## Problem

Entif's routing uses weak-to-strong generalization: a cheap/fast model triages the query (classify intent, assess complexity) and a stronger/more expensive model resolves it if needed. This is good for cost and latency. But the handoff is currently implicit — there is no auditable log of why the cheap model escalated to the strong model, what the cheap model concluded, and what the strong model actually resolved.

This creates a governance liability: when an auditor asks "why did this query get routed to the expensive model?", there is no answer. When a user challenges "you charged my company $4.20 for this answer when a $0.05 answer existed", there is no trace.

---

## Scope

**In scope:**
- Routing decision log schema (what gets logged at each handoff)
- Reason codes for escalation (why did cheap model defer to strong model?)
- Audit trail for cost attribution (which query caused which cost?)
- Query complexity scoring model (what makes a query "simple enough for cheap model"?)
- Challenge interface (how does a user or auditor inspect a specific routing decision?)

**Out of scope:**
- Provider selection (which specific provider handles the strong model call)
- Privacy budget — orthogonal to routing audit

---

## Key Decisions Required

1. **Routing decision log entry**: what fields are logged at triage time and at resolution time? Timestamp, input hash, intent classification, complexity score, escalation reason code, resolved-by provider, output hash, cost?
2. **Escalation reason codes**: what are the valid reasons for escalating from cheap to strong? `AMBIGUITY_DETECTED`, `COMPLEXITY_EXCEEDS_THRESHOLD`, `ENTITLEMENT_REQUIRES_STRONG_MODEL`, `EXPLICIT_USER_REQUEST`, etc.?
3. **Complexity scoring**: is it a numeric threshold (e.g., > 7 = escalate), a taxonomy (simple/medium/complex), or a learned model? Numeric is most auditable.
4. **Retention**: how long are routing decision logs retained? Forever? Until audit? One year?
5. **Challenge interface**: can a user query "show me the routing decision for my query at timestamp X" and get the full trace?

---

## Relationship to Other Issues

- Ties to `audit-spine` concept — routing decisions are a form of durable action requiring receipts
- Ties to `receipts-law` — every escalation is a durable action with cost implications
- Could be combined with multi-source composition audit (API-CACHE-004) since composition also involves handoffs

---

## Open Questions

- Is the routing decision log itself a receipt? Should it use the RRP receipt format?
- What is the latency overhead of logging each routing decision? Can it be async/batched?
- How do we prevent routing decision logs from becoming a privacy liability (they contain query intent and user identity)?