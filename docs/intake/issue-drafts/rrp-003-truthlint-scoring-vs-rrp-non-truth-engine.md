# RRP-003: Clarify TruthLint Scoring vs RRP Non-Truth-Engine Posture

## Type
spec-gap

## Summary

ROCK-31XX contains an internal contradiction between two stated goals:

1. **RRP non-truth-engine posture (ROCK-3111 §3 non-goals)**: "No 'truth engine': receipts attest to events/conditions, not objective truth. We provide typed claims + provenance + transparent confidence, not omniscience."

2. **TruthLint MVP scoring features**: The product PRD includes per-claim scoring (confidence values, weighted source type scoring, source diversity index, staleness index, "unsupported claim count" prominently displayed) — functionally a truth-adjudication signal even if not framed as such.

The result: an implementer cannot tell whether scoring is advisory (a confidence/revision signal for the human author) or evaluative (a gate or badge system). This ambiguity risks either over-claiming ("truth-verified posts") or under-delivering on useful author feedback.

## Evidence

Source: `docs/governance/ROCK-31XX - Rosetta Pasigraphy Protocol - Provenance, Receipts, TruthLint - 20260224.md`

RRP non-goal (lines 1314-1400):
> "No 'truth engine': receipts attest to events/conditions, not objective truth — receipts provide typed claims + provenance + transparent confidence, not omniscience."

TruthLint scoring (lines 624-682):
> "Per-claim confidence factors (MVP): source type weight (official/dataset > reputable primary > secondary > commentary > social), recency vs time sensitivity, corroboration count, specificity..." and "Bundle-level indicators: unsupported claim count."

## Proposed Resolution

Three-layer model (recommend adopting explicitly):

1. **RRP layer (attestational)**: Receipts record what happened (tool call, policy check, authorization, etc.) — descriptive only, no truth value assigned. This is the RRP non-truth-engine layer.

2. **TruthLint advisory layer**: Claim scoring (confidence 0-1, source type weights, unsupported claim count) is advisory — shown to the author as a "track gauge" or "spellcheck result" to inform revision, not as an objective truth assertion. Clear label: "Confidence: advisory signal, not truth claim."

3. **Optional verified badge (future)**: A separately declared, auditable verification format (distinct from receipt attestation) where a known verifier (human, committee, or integration) makes a declared attestation under a named policy. This is not truth adjudication by the system but a declared verdict by a named attester.

Implication: Any "verified" badge in the TruthLint UI must reference the attester identity + policy, not just system-computed scoring.

## Expected artifact

A specification addition or architecture note that explicitly defines the TruthLint three-layer model, with clear naming: what's RRP-mechanical, what's advisory author feedback, and what's optional named-verifier attestation. This note should accompany both the TruthLint MVP PRD and the RRP spec to prevent drift.

## Priority
medium (gates TruthLint MVP1 claim scoring UI; blocks RRP-002 if scoring is the use case driving bundle schema shape)

## Labels
- spec-gap
- scoring
- RRP
- TruthLint

## Depends On
RRP-002 (bundle schema resolution may influence whether scoring data lives in the bundle or in a separate advisory layer)
