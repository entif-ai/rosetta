# Issue Draft: PPN-012 — Failsafe Ambiguity Classification Rule

## Metadata

- **Type**: guard-layer, failsafe, classification
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: guard-layer, failsafe, classification, identity-sensitive
- **Confidence**: high

## Problem Statement

Section 15 requires that in cases of ambiguity, the implementation MUST prefer the safer interpretation when determining whether an operation is identity-sensitive, and MUST NOT silently downgrade an identity-sensitive workflow to an ordinary provenance workflow. This failsafe rule is not currently implemented in any classification logic — it needs explicit implementation, not implicit behavior.

## Evidence

Section 15 "Failsafe Interpretation Rule":

> "In cases of ambiguity, a compliant implementation MUST prefer the safer interpretation when determining whether an operation is identity-sensitive. Where uncertainty remains unresolved, the implementation MUST surface that uncertainty to authorized reviewers and MUST NOT silently downgrade an identity-sensitive workflow to an ordinary provenance workflow."

## Required Actions

1. Define what "safer interpretation" means in the classification context:
   - If uncertain whether an operation is identity-sensitive → treat it as identity-sensitive
   - If uncertain about severity level → classify at higher severity
   - If uncertain about policy applicability → apply the more restrictive policy
2. Implement uncertainty surfacing mechanism: when classification uncertainty exists, surface to authorized reviewer, do not guess
3. Implement "identity-sensitive downgrade prevention": once classified as identity-sensitive, cannot be reclassified as non-identity-sensitive without explicit review and documented rationale
4. Add uncertainty quantification to classification output (confidence score, ambiguity flags)
5. Implement audit trail for all classification decisions (including uncertain ones)
6. Add to conformance tests: verify that ambiguous cases are always classified as identity-sensitive

## Classification Uncertainty Schema

```json
{
  "operationId": "op/uuid/123",
  "classificationResult": "identity_sensitive",
  "confidenceScore": 0.65,
  "uncertaintyFlags": [
    "ambiguous_feature_signature",
    "mixed_source_corpus"
  ],
  "appliedRule": "failsafe:ambiguity_prefers_sensitive",
  "surfaceToReviewer": true,
  "reviewerDecision": null,
  "reviewerDeadline": "2026-06-01T18:00:00Z"
}
```

## Dependencies

- PPN-001: Governance domain must define what counts as identity-sensitive for the classification to reference
- PPN-003: Guard-layer classification logic is where this rule must be implemented
- PPN-010: Governance log must record classification uncertainty events
- Existing classification infrastructure

## Notes

- The failsafe rule is specifically designed to prevent "I wasn't sure so I treated it as normal" evasion
- This is a MUST-level requirement in the normative spec — not optional
- Confidence scores should be auditable: reviewers need to see why the system was uncertain
