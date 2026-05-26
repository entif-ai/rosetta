# NSD-004: Ingress refinery (Pillar Zero) must be operational before Text-Core claims

## Meta

| field | value |
| --- | --- |
| Status | draft |
| Type | implementation |
| Labels | ingress-refinery, text-core, pillar-zero |
| Source | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md`, Section 6.2 |
| Extraction date | 2026-05-26 |

---

## Problem

Doctrine v0.2 Section 6.2 states: "Ingress refinery is Pillar Zero. Before costly semantic hydration, perform cheap deterministic work first: normalization, hashing, dedupe, revision detection, source typing, metadata extraction, policy/safety screening, promotion gating, candidate-tapestry planning."

The ingress refinery is declared as Pillar Zero — foundational — but it is not yet implemented as a distinct, measurable stage in the build. TC-005 (Promotion state machine) and TC-006 (tapestry + rights + Postgres) cannot claim completion without Pillar Zero being operational, because the source → observation → interpretation → tapestry chain depends on it.

This blocks:
- TC-005 promotion state machine (requires source typing, dedupe, promotion gating)
- TC-006 tapestry compilation (requires candidate-tapestry planning from Pillar Zero)
- Any claim that Text-Core MVP is operational

---

## Evidence

- Section 6.2: "Ingress refinery is Pillar Zero"
- Section 3.2 Rung B mandatory scope: "deterministic ingress refinery" is required for Text-Core MVP
- TC-005 is critical path; TC-006 blocked until TC-005 is green
- No ingress refinery package/stub currently exists

---

## Requirements

1. Define Pillar Zero as a distinct package or module in the rosetta codebase
2. Implement the mandatory cheap deterministic work:
   - normalization
   - hashing
   - dedupe
   - revision detection
   - source typing
   - metadata extraction
   - policy/safety screening
   - promotion gating
   - candidate-tapestry planning
3. Each step must emit receipts
4. Pillar Zero must be testable in isolation from the full text-core chain
5. Pillar Zero must be operational before TC-005 claims promotion state machine completion

---

## Acceptance Criteria

- [ ] Pillar Zero is a distinct, measurable stage in the build
- [ ] All 9 cheap deterministic steps are implemented and testable
- [ ] Each step emits receipts
- [ ] Pillar Zero can be validated independently of semantic hydration
- [ ] TC-005 cannot claim green without Pillar Zero operational
- [ ] Ingress refinery is instrumented (metrics/logs) for observability