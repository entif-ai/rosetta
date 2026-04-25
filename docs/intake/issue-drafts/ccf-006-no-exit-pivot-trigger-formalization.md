# CCF-006: No Exit/Pivot Trigger Formalization

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ccf-006 |
| Title | No Exit/Pivot Trigger Formalization |
| Type | process-orchestration |
| Priority | P1 |
| Source doc | `docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md` |
| Extraction date | 2026-04-25 |
| Status | draft |

## Problem Statement

The Exit/Pivot/Salvage Plan requires four trigger sets (enter/continue/pivot/exit) each with: metric/signal, threshold(s), decision owner, containment steps, and salvage paths. This is the primary defense against sunk-cost worship. No formal trigger system, monitoring setup, or tooling exists to actually evaluate these triggers at the specified times (before each new commitment tranche, continuously in the calibration loop).

## Evidence

> "Define four trigger sets: Enter triggers, Continue triggers, Pivot triggers, Exit triggers" — §Exit, Pivot, and Salvage Plan

> "For each trigger: the metric/signal, threshold(s) or qualitative conditions, decision owner, containment steps, salvage paths." — §Exit, Pivot, and Salvage Plan

> "Re-check exit/pivot triggers before each new commitment tranche" — §Commitment calibration loop

## Impact

Without trigger formalization and monitoring:
- Exit and pivot triggers are never actually evaluated
- Sunk-cost worship continues; teams continue failed bets past the point of reason
- The calibration loop cannot function without an automated or semi-automated trigger checking step
- Decision owners are named but have no trigger-data to act on

## Options

**Option A — Trigger doc in project file:** Each commitment gets a `exit-pivot-triggers.md` file with the four trigger sets, stored alongside the spec. Reviewed at each new tranche decision.

**Option B — Integrated into project board:** Exit/pivot/continue trigger thresholds are stored as metadata on project board items; dashboard shows current trigger status per active commitment.

**Option C — Automated monitoring with alerts:** Define trigger metrics as observable signals with automated checks (e.g., via scheduled cron job), alerting decision owners when thresholds are approached.

**Option D — Hybrid:** Option A for documentation + Option C for high-stakes commitments where automated monitoring is warranted.

## Recommendation

Option A for immediate coverage. Option B for integration with existing project board tooling. Option C for P1/high-stakes commitments.

## Next Steps

- [ ] Define trigger doc format (four sections, five subfields each)
- [ ] Establish trigger review cadence (per-tranche gate)
- [ ] Evaluate project board integration for trigger metadata
- [ ] Design automated trigger monitoring for high-stakes bets
- [ ] Define decision owner notification protocol