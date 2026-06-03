# Issue Draft: PPN-009 — RRP-Identity Conformance Levels

## Metadata

- **Type**: conformance, RRP, identity-aware
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: rrp, conformance, identity-aware, compliance
- **Confidence**: high

## Problem Statement

Rosetta has no RRP-Identity conformance levels defined. Section 13 specifies three graduated profiles (RRP-Identity-Aware, RRP-Identity-Restricted, RRP-Identity-Auditor) but they do not exist in the conformance documentation. Without these profiles, implementations cannot self-certify, auditors cannot assess compliance, and the normative specification cannot be verified.

## Evidence

Section 13 "Conformance Levels":

> "An implementation claiming identity-aware conformance SHOULD declare one or more of the following profiles:
> **RRP-Identity-Aware**: The implementation can detect, classify, and label identity-sensitive workflows.
> **RRP-Identity-Restricted**: The implementation can enforce policy gates and authorization controls for person-model creation, update, comparison, export, and simulation.
> **RRP-Identity-Auditor**: The implementation can reconstruct, for authorized review, whether a person model was created, from what sources, under what authority, with what risk findings, under what disclosures, and with what retention or export state."

> "An implementation MUST NOT claim `RRP-Identity-Restricted` unless it enforces default-deny behavior for unauthorized person-model creation and undeclared high-fidelity simulation."

> "An implementation MUST NOT claim `RRP-Identity-Auditor` unless it can reconstruct the authorization and policy chain for identity-sensitive operations."

## Required Actions

1. Document the three conformance levels in the RRP conformance framework
2. Define specific behavioral requirements for each level
3. Define self-certification criteria for each level
4. Define third-party audit criteria for each level
5. Create conformance test suites for each level
6. Add conformance level declarations to implementation documentation
7. Define the relationship between levels (awareness is prerequisite for restriction is prerequisite for auditing)

## Conformance Level Requirements

### RRP-Identity-Aware
- Can detect identity-sensitive operations in workflow
- Can classify operations by identity-sensitive category
- Can label/dtag workflows as identity-sensitive
- Emits identity-risk notes via RPP lens (PPN-007)
- Does NOT enforce — detection only

### RRP-Identity-Restricted
- All RRP-Identity-Aware requirements
- Enforces default-deny for unauthorized person-model creation (PPN-008)
- Enforces default-deny for undeclared high-fidelity simulation (PPN-008)
- Enforces authorization chain for elevated operations (PPN-003)
- Emits typed identity-sensitive receipts (PPN-002)
- Implements retention/expiry for person-models (PPN-005)

### RRP-Identity-Auditor
- All RRP-Identity-Restricted requirements
- Can reconstruct full authorization chain for any identity-sensitive operation
- Can answer: was a person model created, from what sources, under what authority, with what risk findings, with what disclosures, with what retention state
- Can expose linkage confidence and contestability for identity linkage claims
- Can provide audit trail for all identity-sensitive events (PPN-010)

## Dependencies

- PPN-001: Governance domain provides the authority for conformance assessment
- PPN-002: Receipt families needed for auditor conformance
- PPN-003: Authorization controls needed for restricted conformance
- PPN-005: Retention/expiry needed for restricted conformance
- PPN-007: Lens notes needed for aware conformance
- PPN-008: Default-deny needed for restricted conformance
- PPN-010: Governance log needed for auditor conformance

## Notes

- Levels are cumulative (A → B → C), not independent choices
- The MUST-NOT claims for RRP-Identity-Restricted and RRP-Identity-Auditor are legally significant — false claims would be conformance fraud
