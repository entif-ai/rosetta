# Issue Draft: PPN-008 — Default-Deny Identity Policies in Guard-Layer

## Metadata

- **Type**: policy, default-deny, guard-layer
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: policy, default-deny, guard-layer, enforcement
- **Confidence**: high

## Problem Statement

The "Default Prohibitions" section and Sections 8-10 of the normative specification define a clear default-deny posture for identity-sensitive operations, but these prohibitions are documented, not enforced. Without guard-layer enforcement, the default-deny posture is aspirational. The five default-deny rules must be implemented as guard-layer policy, not just governance documentation.

## Evidence

From "Default Prohibitions":

> "Unless an explicit approved policy says otherwise, Rosetta should default-deny:
> - undeclared high-fidelity simulation of living persons,
> - invisible cross-context tracking using cognitive fingerprints,
> - autonomous use of person models for persuasion optimization,
> - export of person-model artifacts to uncontrolled environments,
> - and use of personhood provenance for doxxing, harassment, or coercive targeting."

Section 8 (Simulation Restrictions): "MUST NOT perform undeclared high-fidelity simulation of a living person unless an explicit policy basis authorizes the simulation."

Section 9 (Correlation and Tracking Restrictions): "MUST NOT use cognitive fingerprints for invisible cross-context tracking, hidden identity linkage, or covert correlation unless an explicit policy basis authorizes such use."

Section 10 (Predictive Manipulation Restrictions): "MUST NOT use person models... for coercive targeting, exploit optimization, harassment, doxxing, or undeclared persuasion optimization."

## Required Actions

1. Codify each of the 5 default-deny rules as guard-layer policy
2. Define explicit approved-policy exception mechanism (what constitutes "explicit approved policy"?)
3. Implement policy override logging (PPN-013: policy override frequency metric)
4. Implement automatic notification to governance log when default-deny fires
5. Define escalation path when blocked operations are attempted
6. Implement cross-platform linkage as always identity-sensitive regardless of individual source sensitivity (PPN-013)

## Policy Override Mechanism

When an operator wishes to override a default-deny for a legitimate use case:
1. Operator declares override intent with explicit policy basis
2. Override is logged with: operator identity, policy basis, duration, intended use, approval chain
3. Override is time-bounded (not indefinite)
4. Override is subject to post-hoc audit
5. Override does not change the default for other operators/use cases

## Dependencies

- PPN-001: Governance domain must define what constitutes "explicit approved policy"
- PPN-003: Guard-layer routing infrastructure needed before policies can be enforced
- PPN-012: Failsafe ambiguity rule must be implemented to prevent "not clearly prohibited" being treated as "permitted"
- PPN-013: Cross-platform linkage sensitivity policy

## Notes

- "Default-deny" means: if no explicit policy permits it, it is blocked — not "if no policy prohibits it, it's allowed"
- This is a behavioral change in guard-layer, not just documentation
- Policy exceptions must be narrow and time-bounded, not broad exemptions
