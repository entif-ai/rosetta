# GAP-004: Missing Cross-Corpus Identity Linkage and Invisible Tracking Controls

**Priority:** P2
**Status:** draft
**Source:** docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md §Threat Model Expansion; §Correlation and Tracking Restrictions; §Simulation Restrictions

## Problem

The addendum identifies "Invisible Tracking" as a specific threat class: treating cognitive or linguistic patterning as a quasi-biometric signal for persistent surveillance across platforms and contexts. The normative spec (§9) requires that cross-platform or cross-corpus identity linkage be treated as identity-sensitive even when each individual source appears non-sensitive in isolation.

Rosetta currently has no policy controls enforcing this constraint. An actor could:
- correlate separate non-sensitive corpora to infer same-person identity across contexts
- use cognitive fingerprint extraction to link disparate accounts without triggering identity-sensitive gates
- expose linkage confidence, uncertainty, and contestability as categorical same-person conclusions

The addendum explicitly requires that linkage confidence, uncertainty, and contestability be exposed rather than presented as categorical fact.

Additionally, the addendum's simulation restriction (§8) requires that high-fidelity simulation of a real living person not be performed undeclared — yet without cross-corpus linkage controls, an actor could first build a person model from silently correlated cross-platform corpora, then deploy it for simulation without any visible disclosure chain.

## Required Action

1. Add policy controls in the Guard or Policy Profiles layer that flag cross-corpus identity linkage as identity-sensitive regardless of whether individual sources are classified as sensitive
2. Require that cross-corpus same-person inference workflows emit `rrp:identity.correlation` receipts with linkage confidence, uncertainty, and contestability fields exposed separately — not collapsed into a categorical same-person assertion
3. Enforce that any cross-corpus correlation operation where the combined inference reaches identity-grade fidelity must be treated as a person-model creation event (triggering §7 elevated authorization requirements)
4. Add to Default Prohibitions: invisible cross-context tracking using cognitive fingerprints as a default-deny class

## Acceptance Criteria

- Cross-corpus identity linkage is classified as identity-sensitive even when individual sources are non-sensitive
- `rrp:identity.correlation` receipts expose linkage confidence, uncertainty, and contestability as distinct fields
- Combined cross-corpus inference reaching identity-grade fidelity triggers person-model creation authorization gates
- Invisible tracking via cognitive fingerprints is in the default-deny enumeration

## Notes

This issue is adjacent to GAP-001 (Guard classification). The classification layer must be aware that multi-source aggregation can produce identity-grade output from individually non-sensitive inputs — a subtle but critical property of the threat model.
