# ENTIF-v0-002: Deterministic Middleware Lacks Escalation Queue, Retry Policy, and DLQ Semantics

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-002 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #12 in ledger |
| Confidence | `medium` |

---

## Problem Statement

The deterministic middleware emits `actions_suggested` with escalation candidates:

```json
"actions_suggested": [
  {"type": "escalate_to_agent", "agent_role": "research_sme"},
  {"type": "mint_engram_candidate"}
]
```

**But the spec defines no:**
- Maximum queue depth for the escalation channel
- Retry/backoff policy when an escalated event cannot be processed
- Dead-letter queue (DLQ) semantics for events that fail permanently
- Idempotency guarantees for escalation delivery

Without these, the escalation channel is a fire-and-forget pipe — loss of events is undetected and unrecoverable.

---

## Evidence

The spec defines `signal_event.v0` schema with `actions_suggested` but says nothing about:
- Queue depth limits (does the middleware buffer? drop? backpressure?)
- Retry policy (does the orchestrator retry? how many times? with what backoff?)
- DLQ (what happens to events that exhaust retries?)
- Delivery guarantees (at-least-once? at-most-once? exactly-once?)

The orchestration plane mentions "DLQ semantics" in the context of message bus and workflow engine but does not apply it to the escalation channel between middleware and orchestrator.

---

## Impact

- Events could be silently dropped if the queue fills
- No visibility into failed escalations (observability gap)
- Cannot replay failed events for debugging or recovery
- Receipt law is violated if a transformed signal is lost before a receipt can be minted

---

## Dependencies

- `ENTIF-v0-001` (VOI threshold calibration — escalation volume depends on threshold)

---

## Suggested Resolution

1. Define escalation queue depth limit (e.g., 1000 events max, configurable)
2. Define retry policy: 3 retries, exponential backoff (1s, 5s, 30s), then DLQ
3. Define DLQ destination: a dedicated `escalation-dlq` queue/topic with TTL
4. Add `escalation_status` to the signal event: `pending | processing | consumed | dlq`
5. Emit a receipt for each escalation state transition (supports receipt law + observability)
6. Add DLQ depth metric to telemetry minimum per workflow step

---

## Open Questions

- Does the orchestrator acknowledge escalation receipt, or is escalation fire-and-forget?
- Should failed escalations trigger a human notification, or only a metric/alert?