# Calibrate OMC RouteScore weights with an eval harness

Issue draft id: `omc-routescore-calibration-harness`
Priority: `P2`
Effort: `M`
Labels: `omc`, `routing`, `weights`, `eval`

## Problem

The OMC research spec defines a RouteScore formula with c1-c8 coefficients, but does not define values, calibration data, or acceptance thresholds.

## Scope

Define the first eval harness for OMC routing coefficient calibration.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-24-ontological-mixture-of-concepts-research-spec.md` - Issue Candidates row for RouteScore c1-c8 weights.
- Source spec section cited there: Section 9.2 RouteScore formula has 8 uncalibrated coefficients.

## Specific Findings

### Finding 1: Routing cannot be tuned without expected outcomes

The extraction identifies the formula as incomplete for implementation because no target behavior or fixture corpus is named.

## Acceptance Criteria

- [ ] Define c1-c8 feature meanings and allowed ranges.
- [ ] Add an eval fixture set for route selection.
- [ ] Define baseline acceptance thresholds.
- [ ] Document how calibration changes are reviewed and versioned.
