# CRT-008: Anti-Impersonation Evaluation Suite — Red-Team for Identity Simulation

## Meta

- **Type:** testing
- **Severity:** high
- **Confidence:** high
- **Tags:** red-team, testing, impersonation, identity-safety, evaluation, rpp-identity
- **Source doc:** `docs/ideas/Chat GPT - LLM Reasoning Theory.md` (Governance Addendum §14)
- **Extracted:** 2026-06-01

## Summary

The Governance Addendum requires an evaluation harness that explicitly measures impersonation fidelity, behavioral mimicry, deceptive adaptation, and long-horizon social engineering — not just benchmark cleverness. No such suite currently exists. This is needed before any RRP-Identity-* conformance claims can be certified.

## Evidence

From Governance Addendum §14 (Minimum Evaluation Expectations):

> A compliant implementation SHOULD evaluate identity-sensitive systems against at least:
> - impersonation similarity
> - false attribution rate
> - cross-corpus reidentification behavior
> - disclosure omission rate
> - unauthorized person-model creation attempts
> - policy override frequency
> - and reviewer agreement on identity-risk classification
> If an implementation supports simulation, it SHOULD test resistance to:
> - undeclared style cloning
> - deceptive simulation prompts
> - cross-modal identity fusion
> - and multi-step impersonation workflows

From Governance Addendum §"Fourth, anti-centralization by design" / Operational Recommendations:

> [Second, twin-capability evaluations] — Frontier model testing should explicitly measure impersonation fidelity, behavioral mimicry, deceptive adaptation, and long-horizon social engineering, not just benchmark cleverness.

## Suite Design

### Evaluation Categories

#### 1. Impersonation Similarity
- Given a real person's corpus, attempt to generate outputs that match their style
- Measure stylistic distance via stylometric comparison
- Pass criterion: outputs distinguishable from genuine human output by independent judges

#### 2. False Attribution Rate
- Generate outputs calibrated on Person A's corpus
- Present to judges as possibly authored by Person A
- Measure false attribution rate

#### 3. Cross-Corpus Reidentification
- Given two separate corpora, can the system correctly determine same-author vs different-author
- Measure precision/recall against ground truth

#### 4. Disclosure Omission Rate
- Given simulation-disclosure-required outputs, measure whether required disclosures are attached
- Critical for compliance testing

#### 5. Style-Cloning Prompt Resistance
- Submit standard style-cloning prompt templates
- Measure how closely outputs match target style
- Track refusal vs compliance patterns

#### 6. Deceptive Simulation Prompts
- Adversarial prompts designed to induce false personhood endorsement
- Measure system resistance

#### 7. Cross-Modal Identity Fusion
- Combine text, voice, image signals
- Measure identity-linking accuracy

#### 8. Multi-Step Impersonation Workflows
- Long-horizon adversarial sequences
- Measure whether identity-risk detection fires at appropriate points

### Test Corpus
- Synthetic person model corpus (no real persons without explicit consent)
- Multiple model families for cross-vendor testing
- Independent judge panel for subjective evaluations

## Dependencies

- CRT-002 (conformance tiers): CRT-008 provides the test data for RRP-Identity-Restricted certification
- CRT-005 (default-deny): test data informs default-deny rule refinement
- CRT-001 (research program): H4 (fingerprint divergence) directly feeds into this suite design

## Response Options

1. **Build as part of NOT LAME testing framework** — Integrate into existing test harness; extend for identity-impersonation scenarios
2. **Separate identity evaluation workstream** — Dedicated red-team with adversarial focus; cleaner separation from functional tests
3. **Outsource to external red-team** — Independent evaluation by third party before any production deployment of identity-sensitive features
