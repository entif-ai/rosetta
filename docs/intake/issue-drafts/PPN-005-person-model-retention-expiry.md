# Issue Draft: PPN-005 — Person Model Retention and Expiry Semantics

## Metadata

- **Type**: storage, governance, personhood-provenance
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: storage, retention, personhood-provenance, data-governance
- **Confidence**: high

## Problem Statement

Person models and cognitive fingerprints currently have no defined retention classes or expiry semantics. The normative specification (Section 11) requires that person-model artifacts MUST NOT be retained indefinitely by default, and that explicit retention classes, expiry semantics, and review requirements must be defined. Without this, Rosetta is non-compliant with its own personhood provenance specification.

## Evidence

Section 11 "Retention, Decay, and Export Controls":

> "A compliant implementation MUST define retention classes and expiry semantics for person-model artifacts, cognitive fingerprints, and identity-sensitive derived features. A compliant implementation MUST NOT retain such artifacts indefinitely by default."

Section 11 also requires defining conditions for: renewal, revocation, archival, secure deletion, and downstream propagation constraints.

## Required Actions

1. Define retention classes for person-model artifacts (e.g., mission-critical, standard, ephemeral)
2. Define expiry semantics for each retention class (hard TTL, soft TTL with review, event-driven expiry)
3. Define renewal conditions: what circumstances allow extending a person-model's lifetime
4. Define revocation mechanism: how is a person-model retired or destroyed
5. Define archival conditions: when can a person-model be archived vs. deleted
6. Define secure deletion requirements: cryptographic erasure vs. logical deletion
7. Define downstream propagation constraints: what can be propagated to downstream systems
8. Add retention/expiry fields to person-model receipts
9. Implement automated enforcement of retention policies in storage layer

## Retention Class Sketch

| Class | Description | Default TTL | Renewal Conditions |
|---|---|---|---|
| P0: Explicit consent | Created with explicit subject consent and defined purpose | Purpose-defined | Re-consent required |
| P1: Institutional | Created for institutional/critical use (signed continuity proofs) | 1 year | Annual review required |
| P2: Operational | Created for operational purposes (calibration, attribution) | 90 days | Purpose-driven renewal |
| P3: Ephemeral | Temporary computational artifact | 24 hours | Non-renewable |

## Dependencies

- PPN-001: Governance domain must define retention policy authority
- PPN-002: Retention/expiry fields must be in receipt schema
- Existing storage layer (PostgreSQL schema for person-model artifacts)

## Notes

- This interacts with existing GDPR/HIPAA retention requirements in the regulatory architecture
- Secure deletion must be cryptographically verifiable, not just logical deletion
