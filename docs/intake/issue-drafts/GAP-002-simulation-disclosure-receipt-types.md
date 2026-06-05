# GAP-002: Missing Simulation Disclosure and Impersonation Risk Receipt Types

**Priority:** P1
**Status:** draft
**Source:** docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md §Receipt and Bundle Extensions; §Receipt Requirements

## Problem

Rosetta's RRP receipt vocabulary lacks the simulation disclosure attestation and impersonation risk receipt families required by the addendum. The addendum specifies ten new receipt families that must be emitted or bound when identity-sensitive operations occur:

Required receipt types:
- `rrp:simulation.disclosure_attestation` — attests that simulation disclosure was made and records the disclosure basis, policy profile, and any downstream use restrictions
- `rrp:impersonation.risk_assessment` — records the impersonation similarity score, false attribution risk, and declared basis for any high-fidelity simulation attempt

Additional required receipt types from the addendum:
- `rrp:identity.feature_extraction`
- `rrp:identity.correlation`
- `rrp:person_model.creation`
- `rrp:person_model.update`
- `rrp:person_model.similarity_assessment`
- `rrp:simulation.authorization`
- `rrp:identity.export_authorization`
- `rrp:predictive_manipulation.block`

Each receipt must bind to: subject identities or pseudonymous handles, feature classes used, provenance inputs, policy references, authorization chain, verifier outcome, disclosure requirements, retention/expiry constraints, and risk score or matrix reference.

Without typed attestation receipts, there is no auditable record of simulation events, making disclosure enforcement impossible and auditor reconstruction of identity-sensitive workflows incomplete.

## Required Action

1. Add `rrp:simulation.disclosure_attestation` receipt family to the RRP receipt vocabulary with all required binding fields
2. Add `rrp:impersonation.risk_assessment` receipt family with impersonation similarity score, false attribution risk, and simulation basis fields
3. Add the remaining eight receipt families from the addendum's §6 specification
4. Update Bundle Builder to emit these receipts when Guard classifies an identity-sensitive operation
5. Support protected pseudonymous subject references where subject exposure would create unacceptable privacy or safety risk

## Acceptance Criteria

- All ten specified receipt families exist in the RRP vocabulary
- Each receipt type binds to all fields specified in §6: operation type, subject/pseudonymous handle, feature classes, provenance inputs, policy profile, authorization chain, verifier outcome, disclosure obligations, retention/expiry, and export restrictions
- Bundles containing identity-sensitive operations include the appropriate typed receipts
- Audit trail can reconstruct whether simulation occurred, the declared basis, the policy profile permitting it, and any downstream use restrictions

## Notes

The simulation disclosure receipt is the primary enforcement mechanism for the addendum's Simulation Disclosure Policy (class C) and the impersonation prohibition default-deny. Without it, undeclared simulation is undetectable in the receipt chain.
