# Issue Draft: PPN-013 — Cross-Platform Identity Linkage Treated as Identity-Sensitive

## Metadata

- **Type**: policy, correlation, tracking
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: policy, correlation, tracking, identity-sensitive
- **Confidence**: high

## Problem Statement

Section 9 requires that cross-platform identity linkage be treated as identity-sensitive even when individual sources appear non-sensitive in isolation. This "nothing sensitive in isolation" evasion path must be closed by policy enforcement. Currently, there is no mechanism to detect or prevent this evasion pattern.

## Evidence

Section 9 "Correlation and Tracking Restrictions":

> "A compliant implementation MUST treat cross-platform or cross-corpus identity linkage as identity-sensitive even when each individual source appears non-sensitive in isolation."

> "A compliant implementation SHOULD expose linkage confidence, uncertainty, and contestability rather than presenting inferred same-person conclusions as categorical fact."

## Required Actions

1. Define policy rule: combining any two or more sources for identity linkage purposes triggers identity-sensitive classification regardless of individual source sensitivity
2. Implement linkage detection: guard-layer must detect when multiple sources are being correlated for identity purposes
3. Implement linkage confidence scoring: expose confidence level and uncertainty for any same-person conclusion
4. Implement contestability mechanism: allow subjects to challenge linkage conclusions
5. Implement no-categorical-fact rule: same-person conclusions must always include confidence/uncertainty indicators, never be presented as definitive
6. Add to default-deny rules (PPN-008): covert cross-platform linkage without explicit policy basis and audit record is a default-deny violation

## Linkage Detection Patterns

| Pattern | Trigger | Risk |
|---|---|---|
| Multi-source corpus comparison | Two+ sources correlated for authorship analysis | Same-author inference without disclosure |
| Cross-platform behavioral correlation | Behavioral patterns from platform A matched to platform B | Hidden identity linkage |
| Aggregate profile construction | Multiple non-sensitive data points combined to infer identity | "Nothing sensitive in isolation" evasion |
| Temporal pattern stitching | Longitudinal behavior across platforms stitched together | Persistent surveillance |

## Dependencies

- PPN-001: Governance domain must define linkage sensitivity criteria
- PPN-003: Guard-layer must detect linkage patterns at routing time
- PPN-008: Default-deny policies must include cross-platform linkage
- PPN-012: Failsafe rule applies: if uncertain whether linkage is occurring, treat as identity-sensitive

## Notes

- This is the primary mechanism to close the "nothing sensitive in isolation" evasion path
- Linkage confidence/uncertainty exposure is also required by Section 9 — these are related but distinct requirements
- This policy should be auditable: who attempted cross-platform linkage, on what sources, with what confidence level
