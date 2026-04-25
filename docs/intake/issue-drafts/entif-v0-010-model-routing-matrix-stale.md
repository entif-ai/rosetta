# ENTIF-v0-010: Model Routing Matrix Is Static — No Update Process as Model Landscape Evolves

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-010 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #18 in ledger |
| Confidence | `medium` |
| Depends On | — |

---

## Problem Statement

The spec defines a model routing matrix (6 task types with default model classes and escalation triggers). The matrix is presented as static guidance.

**The model landscape changes frequently.** GPT-4.1, GPT-5.4, Gemini 2.5 Flash, Claude 3.5 Haiku — these models and their relative capabilities, pricing, and latency profiles change quarterly or faster. A static matrix will become stale within weeks of publication.

---

## Evidence

The routing matrix shows:
- "Frontier non-reasoning generalists": OpenAI GPT-4.1
- "Frontier reasoning models": OpenAI GPT-5.4, o-series reasoning
- "Fast/cheap models for classifiers": Google Gemini Flash, Claude Haiku

These are presented as fixed references with no version, no review cadence, and no ownership for updates.

---

## Impact

- Model routing will become suboptimal as new models release and old models are deprecated
- Cost control degrades (outdated matrix may route to expensive models when cheaper equivalents exist)
- No traceability for matrix changes (who updated it, why, when)

---

## Dependencies

- None (process gap independent of implementation)

---

## Suggested Resolution

1. Treat the routing matrix as a versioned artifact with a change log
2. Define a review cadence: quarterly minimum, event-driven on major model releases
3. Define ownership: a "Model Catalog Owner" role responsible for matrix updates
4. Define the update trigger: new model release → evaluate against matrix → update if better cost/performance for any task type
5. Define an ADR requirement: any routing matrix change with cost impact > X% requires an ADR
6. Add `matrix_version` to the model routing request context so the router logs which matrix version was used for each routing decision

---

## Open Questions

- Should routing matrix updates go through the same consensus process as other architectural changes (Consensus-First Commitment Scoping)?
- Is there an automated model benchmarking pipeline that feeds routing matrix updates?