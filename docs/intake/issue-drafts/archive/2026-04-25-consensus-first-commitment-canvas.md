# Issue Draft: Implement Commitment Canvas Artifact with Eight Fields

**Draft date:** 2026-04-25
**Source doc:** docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md
**Extraction:** docs/intake/docs-intelligence/2026-04-25-consensus-first-commitment-scoping-framework.md

---

## Problem Statement

The Commitment Canvas is one of five required artifacts. Its purpose is to determine the wager size that is justified now (not later). It has eight fields covering opportunity value, downside exposure, loss tolerance, reversibility, tempo & decay, and recommended commitment posture. No equivalent commitment-sizing instrument exists in Rosetta's artifact inventory.

## Evidence

From the source PRD:

> "Purpose: determine wager size that is justified now, not later."

## Eight Fields

| Field | Purpose |
|---|---|
| Opportunity value (direct) | Revenue, users, margin |
| Opportunity value (derivative) | Data position, brand position, intel, options created, competitor denial |
| Downside exposure | Worst-case operational, reputational, legal, customer trust harms |
| Loss tolerance | How much the org can stand to lose; include "blast radius containment plan" |
| Reversibility | Classify as two-way vs one-way door; identify "points of no return" |
| Tempo & decay | What waiting costs; what acting early risks |
| Edge decay estimate | What causes edge to decay over time |
| Recommended commitment posture | One of: Observe / Probe / Incubate / Parallel-path / Strike aggressively / Partner / Acquire / Pause / Exit |

## Questions to Resolve Before Implementation

1. How does the Commitment Canvas relate to the existing Bootstrap "next execution order" — is it the same instrument or a different one?
2. Who has authority to set "loss tolerance" and "downside exposure" — engineering, finance, governance?
3. What is the relationship between "recommended commitment posture" and the scoring rubric? Is the rubric the decision procedure for the posture?
4. Does the Commitment Canvas replace or augment the existing planning context before each build decision?
5. How is "parallel-path" different from "incubate"? What are the distinct decision criteria for each?

## Labels

governance, artifacts, commitment-sizing

## Status

draft
