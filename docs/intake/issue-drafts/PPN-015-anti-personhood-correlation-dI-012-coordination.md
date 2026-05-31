# Issue Draft: PPN-015 — Anti-Personhood-Correlation Governance: Coordinate DI-012 and This Addendum

## Metadata

- **Type**: ethics, governance, di-012, coordination
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`; related: `docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md` (DI-012)
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: ethics, governance, di-012, coordination, personhood-provenance
- **Confidence**: high

## Problem Statement

DI-012 (from the Source Substrate addendum, Finding 11) identified that PID/identity spine enables personhood correlation and that no constitutional prohibition language exists in Source Substrate. This personhood provenance addendum is the comprehensive governance response. These two efforts are closely related but developed independently and have not been reconciled. There is a risk of overlapping, contradictory, or gap-leaving governance language.

## Evidence

From `docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md` (extracted in PR #1186):

> "DI-012: Anti-personhood-correlation constraint missing from governance. Finding 11 — PID/identity spine enables personhood correlation; no constitutional prohibition language in Source Substrate."

From this addendum's Core Thesis:

> "Rosetta must not treat these as merely 'misuse at the application layer.' They are protocol-relevant risks because provenance, policy, receipt structure, and conformance rules determine whether such acts are visible, attributable, deniable, or governable."

## Required Actions

1. Compare DI-012's requirements with this addendum's requirements for overlap, gaps, and contradictions
2. Determine whether DI-012's finding is fully addressed by this addendum or if it has additional requirements
3. Consolidate into a single personhood provenance governance framework:
   - Source Substrate addendum provides: PID/identity spine personhood correlation risk
   - This addendum provides: comprehensive governance domain, policy classes, receipt vocabulary, conformance levels
4. Identify any remaining gap between DI-012 and this addendum
5. Draft unified personhood provenance governance text that incorporates both
6. Close DI-012 as "addressed by PPN-001" or "partially addressed, see remaining gap"

## Coordination Matrix

| Concern | DI-012 Source | This Addendum | Status |
|---|---|---|---|
| PID/identity spine personhood correlation | Identified as risk | Addresses via correlation/tracking restrictions (Section 9) | Partially addressed |
| Constitutional prohibition language | Missing | Proposed (new governance domain) | Needs integration |
| Anti-personhood-correlation constraint | Recommended | Implied by default-deny + separation of claims | Needs explicit constitutional language |
| Source Substrate as constitutional domain | Defined in Source Substrate addendum | References Source Substrate | Needs explicit relationship definition |
| Voice fingerprinting (DI-012 related) | Source Substrate has 15-axis trust model | Quasi-biometric signals include voice features | Needs explicit mapping |

## Dependencies

- DI-012: Source Substrate addendum (already extracted, PR #1186)
- PPN-001: Personhood provenance governance domain (will supersede or incorporate DI-012)
- PPN-003, PPN-008: Enforcement mechanisms for anti-correlation constraints

## Notes

- DI-012 was flagged as "Ethics / Governance" type — this is a high-priority coordination issue
- The Source Substrate addendum's 15-axis trust model and this addendum's quasi-biometric signal definitions may need harmonization
- SAC-004 (Semantic Audio Cognition Framework) also touched voice fingerprinting — three documents touch this area
- This issue should be resolved before any of the PPN-001 through PPN-014 implementation begins
