# Issue Draft: PPN-014 — Selective Disclosure for Personhood Provenance Proofs

## Metadata

- **Type**: privacy, tapestry, selective-disclosure
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: privacy, tapestry, selective-disclosure, personhood-provenance
- **Confidence**: medium

## Problem Statement

The addendum requires that systems prove integrity without exposing raw person-model internals, full personal corpora, or unnecessary quasi-biometric features. This selective disclosure requirement has no implementation — currently there is no mechanism to prove identity-related integrity claims while keeping sensitive person-model internals private.

## Evidence

"Technical Control Objectives / Selective Disclosure by Default":

> "Systems should prove integrity without exposing raw person-model internals, full personal corpora, or unnecessary quasi-biometric features."

Section 6 allows pseudonymous subject references "provided the authorization and audit chain remain reconstructable to authorized reviewers."

## Required Actions

1. Design selective disclosure proof architecture for personhood provenance claims
2. Define what constitutes "necessary" vs. "unnecessary" exposure of identity features
3. Implement zero-knowledge-style proofs where possible (prove identity continuity without revealing underlying features)
4. Define authorized reviewer access model: who can see full person-model internals under what conditions
5. Implement tiered disclosure: public (minimal) → authorized reviewer (full) → subject (complete transparency)
6. Implement revocation of disclosure: if a person model is revoked, prior disclosures must be computationally invalidated
7. Define interaction with retention/expiry (PPN-005): selective disclosure must respect TTL

## Disclosure Tier Model

| Tier | Recipient | What's Exposed | What's Hidden |
|---|---|---|---|
| Public | Anyone | That identity continuity was verified; risk score | Raw features; subject identity; full corpus |
| Authorized Reviewer | Governance auditors | Full identity evidence chain; subject pseudonym | Subject real identity (unless authorized) |
| Subject | Person being modeled | Full evidence; all features used; confidence scores | Nothing hidden from subject |

## Dependencies

- PPN-001: Governance domain must define disclosure tier authorization
- PPN-004: Bundle viewer must implement tiered display
- PPN-005: Retention/expiry must apply to disclosed artifacts as well
- Existing cryptography infrastructure (for zero-knowledge proof mechanisms)

## Notes

- This is architecturally similar to privacy-preserving authentication proofs
- The challenge: proving identity continuity (I am the same person who authorized X) without revealing the underlying behavioral model
- This may require research-level cryptographic work for the full zero-knowledge implementation; an intermediate implementation may use access controls and audit trails
