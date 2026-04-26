# Issue Draft: Implement Evidence Ledger Artifact Schema

**Draft date:** 2026-04-25
**Source doc:** docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md
**Extraction:** docs/intake/docs-intelligence/2026-04-25-consensus-first-commitment-scoping-framework.md

---

## Problem Statement

The Consensus-First Commitment Scoping Framework defines an Evidence Ledger as a first-class artifact to prevent single-source errors and motivated reasoning drift in commitment sizing. Every non-trivial claim in a spec or commitment must have a corresponding Evidence Ledger entry. The schema has seven required fields per claim, but no equivalent schema currently exists in the Rosetta artifact inventory.

## Evidence

From the source PRD:

> "Every claim must have: Claim statement (atomic and falsifiable if possible), Evidence type, Source provenance, Credibility score (contextual), Incentive/bias notes, Confidence level (calibrated), Disconfirmers."

> "This artifact is designed specifically to counter hallucination and overconfident synthesis being 'promoted' into strategy."

## Specific Fields Required

| Field | Purpose |
|---|---|
| claim_statement | Atomic, falsifiable claim; must be specific enough to be contradicted |
| evidence_type | One of: observed behavior, reported preference, expert inference, structural inference, competitive intelligence, internal measurement |
| source_provenance | Who/where/when of the source |
| credibility_score | Contextual: "is this source positioned to know this claim?" — NOT general reputation |
| incentive_bias_notes | What does the source stand to gain/avoid by framing it this way? |
| confidence_level | Calibrated, not inflated; must not exceed evidence quality |
| disconfirmers | What evidence would contradict this claim? |

## Questions to Resolve Before Implementation

1. Does the Evidence Ledger attach to individual claims within an artifact, or is it a separate document?
2. Is the ledger per-artifact, per-commitment, or per-session?
3. What is the machine-readable format? YAML? JSON? SQL rows?
4. Who validates that every non-trivial claim has a corresponding ledger entry?
5. How does the ledger interact with the RRP receipt model? Can a ledger entry be emitted as a structured receipt?

## Labels

governance, evidence, artifacts

## Status

draft
