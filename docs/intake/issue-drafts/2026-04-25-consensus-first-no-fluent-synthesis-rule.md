# Issue Draft: Define "Spec by Fluent Synthesis" Prohibition Enforcement

**Draft date:** 2026-04-25
**Source doc:** docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md
**Extraction:** docs/intake/docs-intelligence/2026-04-25-consensus-first-commitment-scoping-framework.md

---

## Problem Statement

The framework explicitly forbids "spec by fluent synthesis" — generating a spec from LLM synthesis output without corresponding Evidence Ledger entries. The prohibition exists but has no enforcement mechanism defined. This is a known gap: hallucination and overconfident synthesis can still be "promoted" into strategy without mechanical prevention.

## Evidence

From the source PRD:

> "Because LLMs can hallucinate and may be miscalibrated (overconfident), this framework forbids 'spec by fluent synthesis': any non-trivial claim in a spec must have a ledger entry (or be labeled as hypothesis)."

> "The agent must express confidence bounded by evidence quality (preventing the model's 'ready to spec' impulse from masquerading as certainty)."

## What "Spec by Fluent Synthesis" Means

- Agent generates a fluent, well-structured spec that reads as authoritative
- The spec contains claims that are plausible-sounding but not backed by Evidence Ledger entries
- The fluency of the output masquerades as correctness (overconfidence)
- No human or guard checks whether claims have supporting evidence before the spec is treated as authoritative

## Enforcement Mechanism Options

1. **Lint rule:** Reject specs that contain non-trivial claims without corresponding Evidence Ledger IDs
2. **Guard token:** Require a special token (e.g., `EVIDENCE_VERIFIED`) before a spec can advance past a certain gate
3. **Receipt requirement:** Spec advancement requires a receipt that references the Evidence Ledger entries for all non-trivial claims
4. **Confidence bound check:** Any claim with LLM-native confidence > Evidence Ledger confidence score must be flagged before spec finalization

## Questions to Resolve Before Implementation

1. What is the definition of "non-trivial claim" for enforcement purposes? All claims? Claims above a confidence threshold?
2. Does "labeled as hypothesis" exempt a claim from the prohibition? What label format is required?
3. Who or what enforces this — human reviewer, guard token, lint rule, automated receipt validation?
4. How does this interact with the existing parse-only default (no side-effecting without guard token)?
5. What is the UX for a rejected spec due to missing Evidence Ledger entries?

## Labels

governance, ai-safeguards, hallucination

## Status

draft
