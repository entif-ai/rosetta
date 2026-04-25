# CCF-002: No Formal Consensus Protocol

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ccf-002 |
| Title | No Formal Consensus Protocol |
| Type | governance |
| Priority | P1 |
| Source doc | `docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md` |
| Extraction date | 2026-04-25 |
| Status | draft |

## Problem Statement

The framework defines operational consensus as three-part: (1) group understands the proposal, (2) strongest informed objection articulated and understood, (3) next step explicitly agreed as ready even if some disagree. However, no formal protocol exists to verify these three conditions at commitment gates. There is no mechanism to confirm the objection was actually understood, only that it was stated.

## Evidence

> "Consensus (operational): Not unanimity. Consensus means: (1) the group understands the proposal, (2) the strongest informed objection has been articulated and understood, (3) the next step is explicitly agreed as ready, even if some disagree." — §Definitions

> "The strongest informed objection must be understood before commitment." — §The box around it, rule 5

## Impact

"Consensus" can be claimed without the actual three-part check being performed. The strong-informed-objection condition is particularly vulnerable: understanding can be claimed without proof. This recreates the groupthink failure mode the framework was designed to prevent.

## Options

**Option A — Objection receipt:** Require a named "strongest objection" receipt file as part of the Falsification & Dissent Packet, signed by the objector, confirming comprehension was attempted and result recorded (accepted/tested/deferred/rejected with reasoning).

**Option B — Comprehension attestation:** The decision owner must include a comprehension attestation in the phase-gate checklist stating they have accurately restated the strongest objection.

**Option C — Structured dissent form:** A structured dissent capture form with mandatory fields for: objection text, objector name, decision owner restatement, disposition (accept/test/defer/reject), and reasoning.

**Option D — Protocol specification:** Write a formal consensus-verification protocol as a ROCK document, with machine-readable attestations.

## Recommendation

Option C first (structured dissent form) to establish the practice. Option D for long-term formalization.

## Next Steps

- [ ] Define structured dissent capture form fields
- [ ] Integrate with Falsification & Dissent Packet artifact format
- [ ] Add to phase-gate checklist requirements
- [ ] (Future) ROCK spec for formal consensus protocol