# ENTIF-v0-009: Five Scoring Frameworks Lack Rubrics (Scale, Frequency, Responsible Actor, Thresholds)

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-009 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #20 in ledger |
| Confidence | `high` |
| Depends On | `ENTIF-v0-008` |

---

## Problem Statement

The spec defines "five orthogonal scorecards":

1. Output score: correctness, completeness, calibration, citation density, and policy compliance
2. Workflow score: latency, cost, failure rate, replay success, DLQ frequency
3. Capability score: contract stability, performance, security posture, and composability
4. Transferability score: see separate transferability schema
5. Persona score: novelty contribution, calibration, "false friction" rate, and drift stability

**But the scoring rubric for each is not specified.** No scale, frequency, responsible actor, or threshold values for any of the five scorecards.

---

## Evidence

The spec names the scorecards and their subdimensions but provides no rubric definition. For example:
- "correctness" — measured how? 0-1? 0-5? LIKERT? Binary pass/fail?
- "citation density" — what is the target? Minimum citations per output? What counts as a valid citation?
- "DLQ frequency" — what threshold triggers a concern? 1%? 5%? Per workflow run or per time window?

Without rubrics, scoring is subjective and incomparable across runs, operators, or time.

---

## Impact

- Scoring results will be inconsistent and non-comparable
- Postmortems cannot use scoring data reliably because the measurements are undefined
- The "scoring over bikeshedding" doctrine cannot be operationalized

---

## Dependencies

- `ENTIF-v0-008` (Workflow scoring depends on workflow state criteria being defined)

---

## Suggested Resolution

1. Define Output score rubric:
   - Scale: 0-1 normalized (0 = failed, 1 = perfect)
   - Subdimension weights: correctness 40%, completeness 25%, calibration 20%, citation_density 10%, policy_compliance 5%
   - Scoring trigger: on workflow completion
   - Responsible actor: orchestrator node that produced the output
2. Define Workflow score rubric:
   - Scale: 0-100 composite
   - Subdimensions: latency_p95 (budget vs actual), cost_usd (budget vs actual), failure_rate (%), replay_success_rate (%), dlq_depth (absolute)
   - Scoring trigger: per workflow run
   - Responsible actor: workflow engine
3. Define Capability score rubric, Transferability rubric (reference the schema), and Persona score rubric similarly
4. Define per-scorecard threshold values for "acceptable" vs "concerning" vs "critical" outcomes

---

## Open Questions

- Who owns the scoring rubric evolution process? Can operators customize rubrics per deployment?
- Should scoring be mandatory or opt-in?