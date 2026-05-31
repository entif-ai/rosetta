# Issue Draft: PPN-002 — RRP Identity Receipt Families

## Metadata

- **Type**: RRP, receipts
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: rrp, receipts, personhood-provenance
- **Confidence**: high

## Problem Statement

RRP currently has no receipt families for identity-sensitive operations. The addendum proposes 10 new receipt families that MUST be defined before any identity-aware or identity-restricted implementation can operate. Without these receipt types, identity-sensitive operations cannot produce auditable artifacts as required by Section 6 of the normative specification.

## Evidence

From "Receipt and Bundle Extensions":

> "Recommended new receipt families:
> - `rrp:identity.feature_extraction`
> - `rrp:identity.correlation`
> - `rrp:person_model.creation`
> - `rrp:person_model.update`
> - `rrp:person_model.similarity_assessment`
> - `rrp:simulation.authorization`
> - `rrp:simulation.disclosure_attestation`
> - `rrp:impersonation.risk_assessment`
> - `rrp:identity.export_authorization`
> - `rrp:predictive_manipulation.block`"

Section 6 further specifies required bindings for each receipt: operation type, subject/pseudonymous handle, feature classes, input provenance basis, policy profile, authorization chain, verification outcome, disclosure obligations, retention/expiry, export restrictions.

## Required Actions

1. Define JSON schema for each of the 10 receipt families
2. Add schemas to RRP type registry
3. Define required vs. optional fields for each receipt type
4. Define pseudonymous subject handle scheme (privacy-preserving while preserving auditability)
5. Define how these receipt families interact with existing receipt infrastructure (RRP base receipt structure)
6. Write conformance tests for receipt emission under identity-sensitive conditions

## Schema Sketch

Each identity receipt must bind:
- `operationType`: one of the 10 operation types
- `subjectHandle`: pseudonymous subject reference (protected)
- `featureClasses`: array of identity feature classes used
- `provenanceInputs`: array of source artifact references
- `policyProfile`: applicable policy profile identifier
- `authorizationChain`: array of authorizing principals with timestamps
- `verificationOutcome`: verification result and confidence
- `disclosureObligations`: pending/fulfilled/dispensed with rationale
- `retentionExpiry`: retention class and expiry timestamp
- `exportRestrictions`: applicable export constraints
- `riskScore`: optional impersonation risk score (for relevant types)

## Dependencies

- PPN-001: Governance domain must be defined first to establish the authority for these receipt types
- Existing RRP receipt infrastructure

## Notes

- `rrp:predictive_manipulation.block` is unique in that it records a blocked operation — the receipt still needs to be emitted even when the action is denied
- Pseudonymous handles must support authorized reviewer audit (authorized reviewers can map to real identity under defined conditions)
