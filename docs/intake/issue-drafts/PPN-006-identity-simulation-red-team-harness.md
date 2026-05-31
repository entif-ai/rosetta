# Issue Draft: PPN-006 — Identity Simulation Red Team Harness

## Metadata

- **Type**: testing, evaluation, red-team, security
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: evaluation, testing, red-team, identity-risk
- **Confidence**: medium

## Problem Statement

There is no evaluation harness to test Rosetta's resistance to identity-simulation attacks. Section 14 requires testing for: impersonation similarity, false attribution rate, cross-corpus reidentification behavior, disclosure omission rate, style-cloning resistance, deceptive simulation prompts, cross-modal identity fusion, and multi-step impersonation workflows.

## Evidence

Section 14 "Minimum Evaluation Expectations":

> "A compliant implementation SHOULD evaluate identity-sensitive systems against at least: impersonation similarity, false attribution rate, cross-corpus reidentification behavior, disclosure omission rate, unauthorized person-model creation attempts, policy override frequency, and reviewer agreement on identity-risk classification."

> "If an implementation supports simulation, it SHOULD test resistance to undeclared style cloning, deceptive simulation prompts, cross-modal identity fusion, and multi-step impersonation workflows."

## Required Actions

1. Design red-team test suite for identity-simulation attacks
2. Implement impersonation similarity scoring tests
3. Implement false attribution rate tests
4. Implement cross-corpus reidentification tests
5. Implement style-cloning resistance tests
6. Implement deceptive simulation prompt detection tests
7. Implement multi-step impersonation workflow tests
8. Define metrics instrumentation for identity-risk evaluation (per Section 14)
9. Integrate with existing evaluation infrastructure

## Test Categories

### Attack Surface Tests
- **Style-cloning prompt injection**: Can a user cause the system to adopt a real person's style through prompt injection?
- **Cross-corpus reidentification**: Can the system be used to link anonymous corpora to real persons?
- **Impersonation similarity scoring**: How close can generated output get to a protected person's signature before the system detects it?
- **Multi-step impersonation workflow**: Can a chain of operations build a usable person model without triggering any single alert?

### Defense Tests
- **Disclosure omission rate**: Does the system fail to disclose when content is simulated/calibrated?
- **Policy override frequency**: Can operators bypass identity policies? How often?
- **Identity-risk classification agreement**: Do human reviewers agree with the system's identity-risk classifications?

## Dependencies

- PPN-001: Governance domain must define what constitutes a violation
- PPN-003: Guard-layer must be in place to enforce defenses being tested
- Existing evaluation/test infrastructure

## Notes

- This can be started independently once the threat model is stable (threat model is well-defined in the addendum)
- Consider using the Berman-style red-team prompt suite as a model for this harness
- Results should feed into PPN-013 (cross-platform linkage sensitivity) and PPN-008 (default-deny policies)
