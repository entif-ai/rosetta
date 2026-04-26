# Issue Draft: Anti-Motivated-Reasoning Guardrails Enforcement

**Draft date:** 2026-04-25
**Source doc:** docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md
**Extraction:** docs/intake/docs-intelligence/2026-04-25-consensus-first-commitment-scoping-framework.md

---

## Problem Statement

Motivated reasoning is defined in the framework as "a cognitive tendency where goals and incentives bias belief construction and evaluation." It is not a character flaw — it is a structural condition requiring structural countermeasures. The framework specifies four required guardrails, but without enforcement, they remain advisory. This issue covers the enforcement of all four guardrails.

## Evidence

From the source PRD:

> "Motivated reasoning is not a character flaw; it is a cognitive tendency where goals and incentives bias belief construction and evaluation."

> Required guardrails:
> 1. Explicit incentive notes in the Evidence Ledger
> 2. Premortems at bet-size increases
> 3. Team A/Team B or devil's advocacy on contested decisions
> 4. Explicit disconfirmers and "what would change our mind" statements

## Four Required Guardrails

| Guardrail | Description | Enforcement Question |
|---|---|---|
| Incentive notes in Evidence Ledger | Every source in the Evidence Ledger must have incentive/bias notes | What if a claim is entered without incentive notes? Reject the entry? |
| Premortem at bet-size increases | Premortem must run before any major commitment size increase | What constitutes "major"? Who validates that the premortem was run? |
| Team A/Team B or devil's advocacy | Contested decisions require structured contrarian challenge | Who decides which decisions are "contested"? Is this self-assessed or gate-assessed? |
| "What would change our mind" statement | Every major decision requires an explicit disconfirmer statement | Is this a free-text field? A structured rubric? Required before spec finalization? |

## Questions to Resolve Before Implementation

1. Are these guardrails required for all commitments or only those above a certain threshold?
2. What is the enforcement mechanism — rejection of the artifact, warning receipt, governance escalation?
3. How does "Team A/Team B" scale to an automated workflow? Is this human-only or can agents run a lightweight version?
4. What prevents motivated reasoning in the guardrail itself — i.e., someone gaming the "what would change our mind" statement to appear compliant while actually fixed?
5. Do all four guardrails need to be implemented together, or can they be staged?

## Labels

governance, debiasing, motivated-reasoning

## Status

draft
