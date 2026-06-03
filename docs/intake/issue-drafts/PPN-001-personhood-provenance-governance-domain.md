# Issue Draft: PPN-001 — Personhood Provenance Governance Domain

## Metadata

- **Type**: governance / constitutional
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: governance, personhood-provenance, constitutional
- **Confidence**: high

## Problem Statement

Rosetta currently lacks an explicit governance domain for personhood provenance. The addendum (Finding PPN-001) proposes introducing a new first-class governance domain with the following responsibilities:

1. Classify whether a workflow touches real-person identity features
2. Define escalation thresholds for person-modeling operations
3. Require stronger authorization and logging for identity-sensitive tasks
4. Separate content verification from personhood claims
5. Ensure auditability of any operation that infers, stores, compares, or simulates human signatures

This is not currently represented in the Rosetta governance hierarchy.

## Evidence

From `rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`, "New Governance Domain: Personhood Provenance":

> "Introduce a governance domain for personhood provenance with the following responsibilities:
> - classify whether a workflow touches real-person identity features,
> - define escalation thresholds for person-modeling operations,
> - require stronger authorization and logging for identity-sensitive tasks,
> - separate content verification from personhood claims,
> - ensure auditability of any operation that infers, stores, compares, or simulates human signatures."

## Required Actions

1. Create a new governance tile or section for "Personhood Provenance" in the Rosetta governance hierarchy
2. Define the scope and responsibilities of this new domain
3. Establish the relationship between personhood provenance and existing domains (content provenance, source substrate, etc.)
4. Define the integration point with the three RRP-Identity conformance levels (PPN-009)
5. Draft the constitutional-level language making personhood provenance a mandatory governance concern

## Dependencies

- PPN-002: RRP identity receipt families (receipt vocabulary needed for the domain to function)
- PPN-009: RRP-Identity conformance levels (conformance profiles need the domain to be defined first)

## Notes

- This is the foundational deliverable of the personhood provenance addendum
- The governance domain should be positioned at the same hierarchy level as content provenance, not subordinate to it
- Related to DI-012 (anti-personhood-correlation governance from Source Substrate addendum) — see PPN-015 for coordination
