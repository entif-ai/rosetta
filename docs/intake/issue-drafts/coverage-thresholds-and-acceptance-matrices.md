# Add coverage reporting and package acceptance matrices

Issue draft id: `coverage-thresholds-and-acceptance-matrices`
Priority: `P2`
Effort: `M`
Labels: `testing`, `coverage`, `acceptance`

## Problem

The current test suite is stronger than before, but coverage expectations and package-level acceptance matrices are not yet explicit.

## Scope

- Add coverage reporting for bootstrap packages.
- Define initial thresholds that are realistic but non-vacuous.
- Create acceptance matrices for current bootstrap package/app contracts.

## Acceptance Criteria

- [ ] Coverage command is documented and runnable locally.
- [ ] Threshold failures are easy to interpret.
- [ ] Acceptance matrices map package contracts to tests and docs.

## Source Evidence

- `docs/handoffs/2026-04-13-bootstrap-handoff.md`; hash 27ff548837e0: Calls out missing quantitative coverage thresholds and targeted acceptance matrices as possible next decisions.
- `docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md`; hash 2baec5fab6f5: Defines merge-blocking test categories and backlog-only red test policy.

## Non-Goals

- No broad refactor of existing tests unless required for reliable reporting.

## Publishing Notes

- Local status: `candidate`
- Active draft path: `docs/intake/issue-drafts/coverage-thresholds-and-acceptance-matrices.md`
- Archived draft path: `not archived`
- GitHub issue: `pending`
- Recommended publish command shape: `gh issue create --title "Add coverage reporting and package acceptance matrices" --body-file docs/intake/issue-drafts/coverage-thresholds-and-acceptance-matrices.md --label testing,coverage,acceptance`
