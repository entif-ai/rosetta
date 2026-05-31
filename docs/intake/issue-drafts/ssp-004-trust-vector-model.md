# SSP-004: Implement 15-Axis Trust-as-Vector Model

## Type
architecture / implementation

## Status
issue-candidate

## Priority
P0

## Labels
source-substrate, trust-model, trust-vector, architecture

## Evidence
docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md, Sections 8.1, 8.2

## Summary

Trust is not a scalar. The Source Substrate requires trust to be represented as a matrix of 15 partially independent dimensions, evaluated per source and used contextually (not universally). Additionally, trust scores must be separated by function: retrieval priority, citation weight, policy automation, identity inference, and public-facing proof bundles may each use different subsets or weightings.

The 15 trust axes from Section 8.1:

1. Artifact integrity confidence
2. Record identity confidence
3. Authorship confidence
4. Institutional affiliation confidence
5. Repository stewardship confidence
6. Review/moderation rigor
7. Metadata richness / machine usability
8. Correction/retraction responsiveness
9. License clarity
10. Identity abuse risk
11. Manipulation/propaganda risk
12. Novelty yield
13. Rarity/scarcity yield
14. Cross-source corroboration density
15. Invalidation sensitivity

## Requirements

### MUST DO

1. **Trust vector data structure**: Define a TrustVector structure with 15 independent axes, each carrying a score and confidence interval. Must be storable per source.record or source.manifestation.

2. **Trust categories by function**: Separate trust computation and storage for:
   - Trust for retrieval priority
   - Trust for citation weight
   - Trust for policy automation
   - Trust for identity inference (see SSP-007)
   - Trust for public-facing proof bundles

   A source may score high for novelty scouting and low for public proof. These are not矛盾的 but functional.

3. **Dimensional explanation required**: The system MUST NOT produce a scalar trust score without dimensional breakdown. Negative Case 3 from Section 16: "The system MUST reject a trust score that lacks dimensional explanation."

4. **Trust evaluation receipt**: Trust vector scores MUST be emitted as a source.evaluation_receipt, preserving the evaluation method, inputs, and dimensional breakdown.

5. **Invalidation hooks**: Trust vectors MUST carry invalidation hooks per axis (Section 9.2): newer version exists, authorship disputed, DOI reassigned, repository record removed, legal hold, retraction notice, checksum mismatch, metadata drift, source policy changed.

6. **Anti-scalar enforcement**: Ingestion gate MUST reject any proposal to reduce the 15-axis vector to a single scalar trust value.

## Dependencies
- SSP-001 (Source Substrate constitutional domain)
- SSP-003 (evaluation provenance — feeds trust vector)
- DI-012 (anti-personhood-correlation — affects trust for identity inference axis)

## Open Questions
- What is the minimum viable trust vector for Text-Core MVP? (All 15 axes or a subset?)
- How does the trust vector interact with existing memory plane scoring?
- How are trust vectors updated when invalidation hooks fire?

## Affects
- Source Substrate constitutional domain
- Rights-scoped retrieval (trust affects retrieval eligibility)
- NOT LAME: context compiler (trust affects bundle composition)
- NOT LAME: query router (trust affects routing)
