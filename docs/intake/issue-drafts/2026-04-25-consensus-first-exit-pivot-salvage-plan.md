# Issue Draft: Implement Exit/Pivot/Salvage Plan with Four Trigger Sets

**Draft date:** 2026-04-25
**Source doc:** docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md
**Extraction:** docs/intake/docs-intelligence/2026-04-25-consensus-first-commitment-scoping-framework.md

---

## Problem Statement

The Exit/Pivot/Salvage Plan is a required artifact with four trigger sets (enter, continue, pivot, exit), each with five fields: metric/signal, threshold(s), decision owner, containment steps, salvage paths. This implements the discovery-driven planning logic to stop sunk-cost worship. No equivalent artifact exists in Rosetta's planning framework.

## Evidence

From the source PRD:

> "Purpose: stop sunk-cost worship."

> "Define four trigger sets: Enter triggers, Continue triggers, Pivot triggers, Exit triggers."

> "For each trigger, specify: the metric/signal, threshold(s) or qualitative conditions, decision owner, containment steps (how to reduce damage), salvage paths (what components/data/relationships remain valuable even if thesis fails)."

## Four Trigger Sets

| Trigger Set | Purpose |
|---|---|
| Enter triggers | What must be true to start or raise bet size |
| Continue triggers | What must be true to keep investing |
| Pivot triggers | Which signals require changing direction |
| Exit triggers | Which signals require stopping and unwinding |

## Per-Trigger Fields

1. **Metric/signal** — what observable fact indicates the trigger condition
2. **Threshold(s)** — quantitative or qualitative conditions that activate the trigger
3. **Decision owner** — who is authorized to act on this trigger
4. **Containment steps** — how to reduce damage if the trigger fires
5. **Salvage paths** — what components/data/relationships retain value even if the thesis fails

## Questions to Resolve Before Implementation

1. Is the Exit Plan per-artifact, per-epic, per-commitment-tranche, or per-project?
2. Who owns the "decision owner" field — is this a single role or a governance body?
3. What is the format for salvage paths? A list of reusable components? Data export formats?
4. How does the Exit Plan interact with existing Bootstrap contract stability gates (operator-shell surfaces deferred until contracts are stable)?
5. Can a trigger fire automatically, or does it require human authorization?

## Labels

governance, exit-logic, sunk-cost

## Status

draft
