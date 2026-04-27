# Issue Draft: Define Credibility Scoring Rubric for Evidence Ledger

**Draft date:** 2026-04-25
**Source doc:** docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md
**Extraction:** docs/intake/docs-intelligence/2026-04-25-consensus-first-commitment-scoping-framework.md

---

## Problem Statement

The Evidence Ledger requires a "credibility score" field per claim, defined as contextual: "not 'is this reputable,' but 'is this source positioned to know this claim?'" This is epistemically precise but v0.1 provides no explicit rubric, scale, or decision procedure for scoring. Without a concrete rubric, the field will be inconsistently applied and lose its anti-delusion value.

## Evidence

From the source PRD:

> "Credibility score (contextual): not 'is this reputable,' but 'is this source positioned to know this claim?'"

## Open Questions to Resolve

1. What scale? Low/Medium/High? Numeric 1-5? Binary (positioned/not positioned)?
2. Does "positioned to know" mean: direct observation, relevant domain expertise, access to internal data, historical accuracy?
3. Who scores credibility — the evidence gatherer, a verifier, a consensus process?
4. Can a low-credibility source be compensated by volume (multiple low-credibility sources agreeing)?
5. How does credibility interact with evidence type? (e.g., "observed behavior" from a disinterested party vs. "expert inference" from a biased expert)

## Suggested Initial Rubric (Draft)

**Positioning factors (score up):**
- Direct observation of the claim (first-party, not reported)
- Domain expertise in the specific claim area
- Access to internal data not available to external parties
- Historical accuracy on similar claims (track record)

**Positioning factors (score down):**
- Stated preference without behavioral evidence
- General reputation cited but no specific expertise in the claim domain
- Incentivized to frame the claim in a particular direction
-二手 or filtered source (someone reporting what they heard)

## Labels

governance, evidence, open-question

## Status

draft
