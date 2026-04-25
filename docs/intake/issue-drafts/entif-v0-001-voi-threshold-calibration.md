# ENTIF-v0-001: VOI Threshold Calibration — Escalation Gate Is Uncalibrated

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-001 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #3 in ledger |
| Confidence | `high` |
| Priority | `P1` |

---

## Problem Statement

The spec references VOI (value-of-information) as the primary gate for escalating signals from deterministic middleware to agentic deep analysis throughout. The model-routing decision flowchart uses VOI as a decision node. The deterministic middleware event schema includes `voi_estimate` in its `heuristics` block. The execution envelope includes `voI_estimate: 0.72` as an example field.

**But the VOI threshold is never specified.** What numeric value triggers escalation? 0.5? 0.7? 0.9? Without a calibrated threshold, the escalation gate is a structural placeholder — it cannot be implemented, tested, or measured.

---

## Evidence

From the spec:

> "deterministic heuristics catch commit explosions and network signals, then agentic deep analysis is invoked selectively"
> 
> "EscalationCandidates" are emitted by deterministic middleware when VOI >= threshold

The flowchart shows:
```
E -->|Yes| D    # (VOI >= threshold → escalate)
```

But no numeric threshold value appears anywhere in the document.

---

## Impact

- The v0 slice (GitHub trend ingestion → deterministic triage → ...) cannot be implemented without a calibrated VOI threshold
- Without a threshold, cost control is undefined — the system cannot enforce "cheapest model that meets envelope's correctness risk"
- All downstream scoring (Workflow score, Persona score) depends on correctly gated escalations; uncalibrated VOI means scoring is unreliable

---

## Dependencies

- None (this is a root-level calibration gap)

---

## Suggested Resolution

1. Define a default VOI threshold (recommended: 0.65 for v0, based on similar agentic triage systems)
2. Define the VOI estimation procedure: which features contribute, what weights, what model if any is used
3. Define a calibration loop: how is the threshold tuned based on post-escalation outcomes (was the escalated analysis worth the cost?)
4. Add VOI threshold to the deterministic middleware event schema as a mandatory field
5. Add the calibration loop to the scoring frameworks (Output score should include VOI calibration accuracy as a subdimension)

---

## Open Questions

- Is VOI estimated by the deterministic middleware (rule-based) or by a lightweight model?
- Does the VOI threshold differ by domain (GitHub vs Research vs Product)?
- What is the cost of a false positive vs false negative at the escalation gate?