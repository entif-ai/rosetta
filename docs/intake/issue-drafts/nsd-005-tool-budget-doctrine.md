# NSD-005: Implement tool-budget doctrine with measurable per-role budgets

## Meta

| field | value |
| --- | --- |
| Status | draft |
| Type | implementation |
| Labels | tool-budget, guard, context-compiler |
| Source | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md`, Section 8.4 |
| Extraction date | 2026-05-26 |

---

## Problem

Doctrine v0.2 Section 8.4 declares tool-budget discipline as a constitutional requirement:
- "Tool budgets must be defined per role/session"
- "Routing ambiguity must be tested"
- "CRUD-ish surfaces should be consolidated where that improves clarity"
- "Tool-surface size is a measurable systems concern"
- "Routing ambiguity and context waste treated as regressions"

There is no current implementation of tool budgets. Tool surfaces are not instrumented for budget tracking. Routing ambiguity is not tested. Context waste is not measured.

This creates:
- No measurable compliance with ADR-0013 (Tool-budget doctrine)
- No way to detect when tool-surface growth becomes a regression
- No empirical basis for tool consolidation decisions

---

## Evidence

- ADR-0013: Status = Accepted
- Section 8.4: "Tool budgets must be defined per role/session"
- Section 8.4: "Tool-surface size is a measurable systems concern"
- Section 8.4: "Routing ambiguity and context waste treated as regressions"
- No current tool-budget implementation in rosetta packages

---

## Requirements

1. Define a tool-budget schema: what constitutes a "budget" (token count? call count? time? combinations?)
2. Instrument tool calls with budget tracking per role and per session
3. Define thresholds: what triggers a budget-exhausted condition?
4. Implement routing ambiguity tests: how do we measure "routing ambiguity" empirically?
5. Implement context waste measurement: what counts as context waste?
6. Define tool-surface consolidation criteria: what combination of size, ambiguity, and waste triggers consolidation?
7. Integrate budget reporting into mission-control/inspection view

---

## Acceptance Criteria

- [ ] Tool-budget schema is defined and documented
- [ ] Tool calls are instrumented for budget tracking per role and session
- [ ] Budget-exhausted thresholds are defined and enforced
- [ ] Routing ambiguity is tested (tests can be written and run)
- [ ] Context waste is measured (metrics available)
- [ ] Tool-surface size is visible in mission-control/inspection view
- [ ] ADR-0013 compliance is measurable, not just aspirational