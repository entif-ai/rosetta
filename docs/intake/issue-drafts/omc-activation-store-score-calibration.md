# Calibrate OMC activation-store composite score weights

Issue draft id: `omc-activation-store-score-calibration`
Priority: `P2`
Effort: `M`
Labels: `omc`, `activation-memory`, `weights`, `eval`

## Problem

The OMC research spec defines an activation-store composite score with b1-b8 weight variables, but does not define initial values, normalization rules, or an evaluation loop for tuning them.

## Scope

Define the first calibration procedure for activation-store weights. This is a research/implementation planning issue, not runtime document ingestion.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-24-ontological-mixture-of-concepts-research-spec.md` - Issue Candidates row for activation-store composite score.
- Source spec section cited there: Section 6.3 formula with 8 uncalibrated weight variables.

## Specific Findings

### Finding 1: Weight variables are named but not operationalized

The extraction identifies b1-b8 as unresolved score weights. Without a baseline, future activation retrieval behavior cannot be compared across runs.

## Acceptance Criteria

- [ ] Define the b1-b8 feature meanings and normalization ranges.
- [ ] Pick an initial default weight vector with rationale.
- [ ] Define an eval dataset or fixture set for score calibration.
- [ ] Document how calibration results update defaults without silently changing constitutional behavior.
