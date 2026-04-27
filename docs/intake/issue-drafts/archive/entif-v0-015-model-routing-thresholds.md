# ENTIF-v0-015: Model Routing Decision Flow — VOI and Impact Threshold Values Not Provided

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-015 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #17 in ledger |
| Confidence | `high` |
| Depends On | `ENTIF-v0-001` |

---

## Problem Statement

The model-routing decision flowchart shows a three-step decision path:

```
Start: Task arrives with Execution Envelope
  → B{Deterministic possible?}
    → Yes: Run deterministic middleware
    → No: D{Context burden high?}
      → No: G{Impact high?}
        → No: I[Use cheap fast model]
        → Yes: J[Use frontier reasoning model]
      → Yes: H[Use long-context frontier model]
  → K{Policy gate needed?}
    → Yes: L[Human/committee approval + receipt]
    → No: M[Finalize outputs + mint receipts + write graphs]
```

**But the threshold values for the decision nodes are not provided:**
- What is the "context burden high?" threshold? Measured in tokens? (128K? 512K?)
- What is the "Impact high?" threshold? Measured in blast radius units? (1-5 scale? Which dimension?)
- What triggers "Policy gate needed?" — which policy types require human approval?

---

## Evidence

The flowchart nodes show decision logic but not calibrated constants. The spec says "policy gate needed?" but does not define which policies require human approval vs automated decision.

The escalation triggers column in the routing matrix says things like "If disagreement across judges or policy-sensitive" but these are qualitative, not quantitative.

---

## Impact

- The flowchart is unimplementable without calibrated threshold values
- Different implementations will use different thresholds, leading to inconsistent model routing
- Cost control is unmeasurable without specific threshold values

---

## Dependencies

- `ENTIF-v0-001` (VOI threshold calibration — same root cause; shared fix)

---

## Suggested Resolution

1. Define context burden threshold: 128K tokens (the boundary where long-context frontier models become necessary)
2. Define impact classification rubric: blast_radius × probability of failure, scored 1-5; threshold = 4 for high
3. Define policy gate trigger conditions: which policy types require human approval (legal_review, exec_write, data_class=restricted per the execution envelope example)
4. Document the threshold values in the routing matrix table, not just in the flowchart
5. Add a routing decision log entry for each threshold evaluation (supporting telemetry minimum)

---

## Open Questions

- Should thresholds be configurable per envelope (passed as parameters) or fixed in the system?
- Does the impact classification rubric use the same dimensions as the workflow scoring rubric?