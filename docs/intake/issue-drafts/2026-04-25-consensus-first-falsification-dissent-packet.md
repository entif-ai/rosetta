# Issue Draft: Implement Falsification & Dissent Packet with Protected Dissent Capture

**Draft date:** 2026-04-25
**Source doc:** docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md
**Extraction:** docs/intake/docs-intelligence/2026-04-25-consensus-first-commitment-scoping-framework.md

---

## Problem Statement

The Falsification & Dissent Packet is one of five required artifacts in the framework. It has three parts: (1) Premortem, (2) Contrarian challenge (devil's advocacy or Team A/Team B), and (3) Protected dissent capture — which requires a comprehension step where leadership must restate the dissenter's objection accurately before proceeding. No equivalent mechanism exists in Rosetta; dissent is not currently tracked as a first-class workflow element.

## Evidence

From the source PRD:

> "This is your anti-'silo god' mechanism and your anti-productivity-theater mechanism."

> "Protected dissent capture: identify 'high-context dissenters' (often noisy, sometimes abrasive) and force a comprehension step: leadership must restate their objection accurately before proceeding."

## Three Parts Required

### 1. Premortem
- Assume failure date
- List plausible causes (ranked by likelihood and impact)
- Preventive mitigations
- Early warning signals

### 2. Contrarian Challenge
- Run either devil's advocacy OR Team A/Team B (lightweight is acceptable)
- Purpose: pressure-test dominant narrative

### 3. Protected Dissent Capture
- Identify high-context dissenters
- Force a comprehension step: leadership must restate their objection accurately
- Explicit disposition required: accept / test / defer / reject with reasoning

## Questions to Resolve Before Implementation

1. Who qualifies as a "high-context dissenter"? Self-identified? Peer nominated? Lead appointed?
2. What is the mechanism for the comprehension step? Written restatement in the artifact? Verbal acknowledgment recorded as receipt?
3. What prevents the "protected" label from being abused to give disproportionate weight to objections that are not actually substantive?
4. How is "defer with reasoning" different from "reject with reasoning"? Is deferral a second-class disposition?
5. Does the Falsification Packet replace the Evidence Ledger, complement it, or is it a separate top-level artifact?

## Labels

governance, dissent, debiasing

## Status

draft
