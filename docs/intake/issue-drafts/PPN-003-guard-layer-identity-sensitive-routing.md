# Issue Draft: PPN-003 — Guard-Layer Identity-Sensitive Routing

## Metadata

- **Type**: guard-layer, EntAffirm, identity-sensitive
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: guard-layer, EntAffirm, identity-sensitive, policy
- **Confidence**: high

## Problem Statement

Guard/EntAffirm currently has no mechanism to classify identity-sensitive operations or route them through elevated authorization controls. The addendum requires that any operation involving identity-grade signals must require a stronger guard path than ordinary claim extraction or provenance bundling. This extension does not exist.

## Evidence

From "Architecture Hooks / Guard Layer":

> "Extend Guard / EntAffirm to classify identity-sensitive operations and route them through stricter verification and approval policies."

From "Explicit Identity Escalation Gates":

> "Any operation involving identity-grade signals should require a stronger guard path than ordinary claim extraction or provenance bundling. Examples: multisig or committee approval, named policy profile, role-based authorization, additional verifier pass, mandatory disclosure artifact."

Section 7 requires elevated authorization before:
- Creating a person model
- Materially updating a person model
- Comparing a corpus against a protected person signature
- Exporting a person-model artifact
- Enabling high-fidelity simulation of a real living person

## Required Actions

1. Add identity-sensitive operation classification to Guard/EntAffirm
2. Define the identity-sensitivity classification criteria (which signals trigger elevated routing)
3. Define elevated guard paths: multisig, named policy attestation, RBAC, additional verifier pass, mandatory disclosure
4. Wire authorization chain recording so it can be bound into identity-sensitive receipts
5. Implement default-deny enforcement for operations without explicit policy basis
6. Add identity escalation gates to the write-admission gate state machine (TC-005 critical path)

## Escalation Gate Options

| Gate Type | Trigger | Implementation |
|---|---|---|
| Human-in-the-loop approval | Person-model creation, high-fidelity simulation | Queue for human review |
| Named policy attestation | Policy-defined elevated operations | Policy profile signature |
| Multi-party approval | Export of high-fidelity person models | Multiple principal signatures |
| Role-based access | Person-model update, corpus comparison | RBAC enforcement |
| Additional verifier pass | Similarity assessment | Run identity-risk verifier before proceeding |
| Mandatory disclosure artifact | Simulation authorization | Attach disclosure artifact before proceeding |

## Dependencies

- PPN-001: Governance domain must exist before guard-layer can classify identity operations
- PPN-002: RRP identity receipt families needed for recording authorization chain
- PPN-008: Default-deny policies need to be defined alongside routing logic
- PPN-012: Failsafe ambiguity rule implementation in classification logic

## Notes

- This is a TC-005 (write-admission gate) dependency — identity escalation gates may need to be added to the 9-step state machine
- Guard-layer extension must preserve the existing parse-only-default safety baseline
