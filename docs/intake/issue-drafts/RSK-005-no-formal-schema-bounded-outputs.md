# RSK-005: Content-Risk Middleware — No Formal Schema for Bounded Structured Outputs

## Metadata
- **Issue:** RSK-005
- **Priority:** P2
- **Confidence:** high
- **Source:** docs/intake/docs-intelligence/2026-06-05-email-driven-security-defenses.md

## Boundary
Artifact is issue-draft output for planning. Not final specification.

## Problem

The architecture repeatedly specifies that downstream agents should receive structured bounded outputs (not narrative prose), and scoring packs produce risk vectors. The conversation itself proposes producing JSON Schema for:
- risk.scorecard
- truthlint.claim
- identity.sensitivity_classification
- gov.policy_profile
- rrp.bundle_profile

These schemas were never delivered — only example payload snippets appear inline.

Without formal schemas:
1. Scoring packs have no canonical output contract — each can emit slightly different shapes
2. Downstream policy engines cannot reliably parse outputs — parser drift becomes likely
3. Bundle verification cannot validate output shape — no structural conformance test
4. Interop projections (PROV-O, DMN, BPMN) cannot be generated reliably from undefined output structures

## Impact

The modular middleware architecture depends on consistent structured outputs between stages. Without formal schemas, integration points become fragile, and the "source-agnostic reusable layer" promise breaks down in practice.

## Suggested Approach

1. Produce JSON Schema documents for each of the five named types (risk.scorecard, truthlint.claim, identity.sensitivity_classification, gov.policy_profile, rrp.bundle_profile)
2. Add to rrp.* or truthlint.* pack as schema pack (rrp.schemas or truthlint.schemas)
3. Include in rrp:export.projection receipts for lossiness declarations
4. Use SHACL shapes for structural conformance validation at bundle build time
5. Define versioning scheme for schemas — must be pinned in scorer_profile within receipts

## Related
- F5, F6, F7, F11
- rrp.bundles, rrp.verifier packs
- risk.scorecard payload example (existing inline, needs formalization)
- truthlint.claim payload example (existing inline, needs formalization)
- identity.sensitivity_classification payload example (existing inline, needs formalization)