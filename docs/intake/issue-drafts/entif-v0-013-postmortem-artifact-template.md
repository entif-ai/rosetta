# ENTIF-v0-013: Postmortem Artifact Template Not Defined

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-013 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #26 in ledger |
| Confidence | `medium` |
| Depends On | `ENTIF-v0-009` |

---

## Problem Statement

The spec states: "each scored at completion with postmortem artifacts."

**But the postmortem artifact template is not defined.** Without a template, postmortems will be inconsistent across operators, workflows, and time. The required fields (root cause, reproduction steps, envelope snapshot, receipt chain, suggested rubric changes, proposed evolution) are listed as prose requirements but not as a structured template.

---

## Evidence

The spec says "Postmortem artifact should include: root cause, reproduction steps, envelope snapshot, receipt chain, suggested rubric changes, and proposed skill/workflow evolution."

This is a list, not a template. There's no schema, no required/optional distinction, no format for the evidence fields.

---

## Impact

- Postmortems will be incomparable (different operators produce different field sets)
- Telemetry data from postmortems cannot be systematically analyzed without a consistent schema
- The scoring frameworks (ENTIF-v0-009) cannot use postmortem data reliably if the schema is inconsistent

---

## Dependencies

- `ENTIF-v0-009` (postmortem scoring depends on rubric definitions being available to inform "suggested rubric changes")

---

## Suggested Resolution

1. Define the postmortem artifact schema (YAML or JSON):
   - Required: workflow_id, step_id, envelope_id, timestamp, root_cause (string), reproduction_steps (array), receipt_chain (array of receipt IDs), outcome_class (PASS | FAIL | PARTIAL)
   - Optional: suggested_rubric_changes (array of {scorecard, dimension, proposed_new_threshold}), proposed_evolution (array of {type, target, change}), attachments (array of CID references)
2. Define the trigger condition: postmortem generated on every workflow step with outcome_class = FAIL or PARTIAL
3. Define the owner: orchestrator node generates; human review required for FAIL outcomes
4. Define retention: postmortems kept for 90 days in warm storage, then archived to cold

---

## Open Questions

- Should successful workflows also produce lightweight postmortems (for pattern analysis)?
- Should postmortems be human-editable after generation?