# Issue Draft: PPN-011 — Policy Profile Relaxation Declaration Mechanism

## Metadata

- **Type**: policy, governance, conformance
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: policy, governance, conformance, transparency
- **Confidence**: medium

## Problem Statement

The addendum allows forkable policy profiles but requires explicit declaration whenever a deployment relaxes identity restrictions relative to the default safety baseline. No mechanism exists to make this declaration, track it, or audit it. Without this mechanism, "relaxed restrictions" can be silently deployed without governance visibility.

## Evidence

From "Architecture Hooks / Policy Profiles":

> "Allow forkable policy profiles, but require an explicit declaration whenever a deployment relaxes identity restrictions compared with the default safety baseline."

## Required Actions

1. Define the declaration format for policy profile relaxation
2. Implement declaration tracking in governance log
3. Define what counts as a "relaxation" vs. a legitimate use-case-specific configuration (needs a baseline definition)
4. Define who can approve/sign off on relaxation declarations (operator self-declaration? supervisor approval? governance committee?)
5. Add relaxation declaration to policy profile metadata
6. Define consequences for undeclared relaxations
7. Add to conformance assessment (undeclared relaxations are conformance violations)

## Declaration Schema Sketch

```json
{
  "declarationType": "identity_restriction_relaxation",
  "policyProfileId": "policy:identity/custom/variant-xyz",
  "baselineProfileId": "policy:identity/default/safety-baseline",
  "relaxedRestrictions": [
    {
      "restriction": "default_deny:high_fidelity_simulation",
      "originalRule": "MUST deny unless explicit policy authorizes",
      "relaxedRule": "Allow with human-in-the-loop approval",
      "justification": "Institutional use case: authorized biographer with subject consent"
    }
  ],
  "declaredBy": "principal:op/main/456",
  "approvedBy": "principal:gov/committee/789",
  "declarationTimestamp": "2026-05-31T18:00:00Z",
  "validFrom": "2026-05-31T18:00:00Z",
  "validUntil": "2027-05-31T18:00:00Z",
  "reviewTriggers": ["subject_revokes_consent", "policy_committee_flags"]
}
```

## Dependencies

- PPN-001: Governance domain must define what constitutes "default safety baseline"
- PPN-008: Default-deny policies must be defined to know what can be relaxed
- PPN-010: Governance log must track declarations
- Existing policy profile infrastructure

## Notes

- Relaxation declarations are not approvals to violate the law or third-party rights — they are internal governance mechanisms
- Undeclared relaxations should trigger automatic conformance violation flagging
- Time-bounded declarations prevent permanent weakening of the baseline
