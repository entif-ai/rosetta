# GAP-001: Guard Layer Missing Identity-Sensitive Operation Classification

**Priority:** P1
**Status:** draft
**Source:** docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md §Threat Model Expansion; §Technical Control Objectives; §Classification Requirements

## Problem

The Guard/EntAffirm layer does not classify identity-sensitive operations. The addendum requires that any workflow involving identity-grade signals — cognitive fingerprints, stylometric traces, longitudinal behavioral signatures, response-pattern fingerprints, social graph patterns, or cross-modal identity linkages — must be routed through stricter verification and approval paths, bound to an applicable identity policy profile, and recorded in receipts with elevated authorization controls.

Without Guard-level classification, downstream components (RPP Lens, Bundle Builder, Governance Log) cannot reliably apply the five new identity policy classes. No downstream gate can compensate for an absent first checkpoint.

## Required Action

Extend the Guard layer to classify whether a workflow contains one or more identity-sensitive operation types, at minimum:
- feature extraction
- similarity assessment
- cross-corpus correlation
- person-model creation
- person-model update
- high-fidelity simulation
- identity export
- predictive person-targeting

When an identity-sensitive operation is detected, Guard must:
1. mark the workflow as identity-sensitive in internal execution state
2. bind the workflow to the applicable identity policy profile
3. record the classification in receipts
4. route through elevated authorization controls (human-in-the-loop, multi-party approval, named policy attestation, or additional verifier pass)

## Acceptance Criteria

- Guard classifies all seven identity-sensitive operation types listed in §3 of the normative spec
- Identity-sensitive workflows produce rrp:identity.feature_extraction or equivalent typed receipts
- Guard enforces default-deny when no explicit identity policy applies to a person-model creation, high-fidelity simulation, or identity export operation
- Guard surfaces unresolved identity-sensitivity ambiguity to authorized reviewers per the failsafe rule

## Notes

This is a protocol-level gap. Downstream components cannot enforce what upstream classification does not detect.
