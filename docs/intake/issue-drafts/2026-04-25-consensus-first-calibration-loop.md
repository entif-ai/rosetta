# Issue Draft: Implement Commitment Calibration Loop Automation

**Draft date:** 2026-04-25
**Source doc:** docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md
**Extraction:** docs/intake/docs-intelligence/2026-04-25-consensus-first-commitment-scoping-framework.md

---

## Problem Statement

The Commitment Calibration Loop runs continuously and has four components: (1) Update Board State → Update Commitment Canvas, (2) Update Evidence Ledger → Update Confidence + Disconfirmers, (3) Run periodic Premortems at major bet-size increases, (4) Re-check exit/pivot triggers before each new commitment tranche. This loop is the mechanism that prevents static commitments from becoming sunk costs. No equivalent continuous calibration mechanism exists in Rosetta.

## Evidence

From the source PRD:

> "This loop runs continuously:
> - Update Board State → Update Commitment Canvas
> - Update Evidence Ledger → Update Confidence + Disconfirmers
> - Run periodic Premortems at major bet-size increases
> - Re-check exit/pivot triggers before each new commitment tranche"

## Four Loop Components

| Component | Trigger | Action |
|---|---|---|
| Board state update | Ongoing, time-driven or event-driven | Reassess opportunity magnitude, edge durability, competitive pressure; update Commitment Canvas |
| Evidence update | New evidence added to ledger | Recalibrate confidence levels; update disconfirmers |
| Premortem | Major bet-size increase | Run premortem before bet is finalized |
| Exit/pivot re-check | New commitment tranche | Verify enter/continue/pivot/exit triggers are still valid |

## Questions to Resolve Before Implementation

1. What triggers a "major bet-size increase"? A percentage threshold? A fixed dollar/engineering-week threshold? A governance decision?
2. Is this loop event-driven (triggered by artifact changes), time-driven (periodic), or human-initiated?
3. Can the loop be partially automated (evidence updates automated, premortems human-run)?
4. How does the loop interact with the existing Bootstrap "next execution order" — does it require a full loop pass before each step?
5. What is the output of the loop? An updated artifact? A receipt? A log entry?

## Labels

governance, workflow, calibration

## Status

draft
