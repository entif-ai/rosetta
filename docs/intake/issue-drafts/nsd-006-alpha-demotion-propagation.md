# NSD-006: Propagate "alpha demotion" correction to prior PRD/backlog docs

## Meta

| field | value |
| --- | --- |
| Status | draft |
| Type | documentation |
| Labels | documentation, scope-corrections, three-rung-staircase |
| Source | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md`, Section 3 |
| Extraction date | 2026-05-26 |

---

## Problem

Doctrine v0.2 Section 3 formally demotes the prior "alpha" notion to bootstrap proof:

> "The older tiny dry-run-only 'alpha' notion is formally demoted to bootstrap proof."

> "This is the real alpha threshold. The older tiny dry-run-only 'alpha' notion is formally demoted to bootstrap proof."

Prior PRD and backlog documents used "alpha" as a release gate. If those docs still reference the old "alpha" notion without cross-referencing the demotion, they implicitly claim bootstrap-proof features as if they were the true Rung C threshold. This creates confusion about what constitutes a valid alpha claim.

---

## Evidence

- Section 3: old "alpha" notion demoted to bootstrap proof
- Section 3: "Rung C: MVP Alpha RC" is the true ratified threshold
- Prior PRDs and backlog docs may reference old "alpha" without correction
- No propagation of the demotion correction to prior docs

---

## Requirements

1. Audit all PRD and backlog documents for references to "alpha" as a release gate
2. For each reference, add a cross-reference note: "See Doctrine v0.2 Section 3 — prior 'alpha' demoted to bootstrap proof"
3. Identify which prior docs need correction vs. which already have correct three-rung framing
4. Create a checklist of affected docs
5. Apply corrections via PR (not direct commit) following normal review process

---

## Acceptance Criteria

- [ ] All PRD and backlog docs are audited for "alpha" references
- [ ] Each old "alpha" reference is annotated with cross-reference to Doctrine v0.2 Section 3
- [ ] Bootstrap vs. Rung C (MVP Alpha RC) distinction is clear in all affected docs
- [ ] No prior doc makes an alpha claim that is actually only bootstrap-proof without annotation
- [ ] Corrections are applied via PR with normal review