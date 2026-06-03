# SSP-006: Implement 4-Layer Deduplication Strategy

## Type
implementation / architecture

## Status
issue-candidate

## Priority
P1

## Labels
source-substrate, deduplication, architecture

## Evidence
docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md, Section 10

## Summary

Deduplication must happen at 4 distinct layers, and canonical merges must be gated by evidence thresholds and retained as reversible assertions. The 4 layers are:

1. **Byte identity dedupe**: Same bytes, same hash → same artifact
2. **Manifestation dedupe**: Different URLs/exports/mirrors of the same manifestation → cluster
3. **Record-family dedupe**: Same underlying work/dataset/release expressed as multiple records → cluster with provenance
4. **Conceptual dedupe**: Multiple artifacts describing or instantiating the same conceptual object → conceptual equivalence proposal

The key rule: "dedupe proposals can be high-recall, canonical merges should be gated by evidence thresholds and retained as reversible assertions."

## Requirements

### MUST DO

1. **4-layer dedupe algorithm**: Implement dedupe at all 4 layers with clear separation of concerns. Each layer must be independently configurable and traceable.

2. **Reversible assertions**: All canonical merge decisions MUST be stored as reversible assertions with evidence references and confidence thresholds. No silent irreversible merges.

3. **Identity family structure**: Maintain separate IDs for: canonical work ID, version family ID, manifestation IDs, external PIDs, intrinsic hash IDs, local tile IDs.

4. **High-recall proposal mode**: Provide a high-recall dedupe proposal mode that produces clusters without committing to canonical merges.

5. **Evidence-gated merging**: Canonical merges MUST require explicit evidence threshold (e.g., same DOI family, same SWHID chain, same creator string + same title + same date).

6. **No default merge**: The system must not merge by default. Aggressive clustering with cautious merging.

## Dependencies
- SSP-001 (Source Substrate constitutional domain)
- Source identity family structure (Section 10.3)
- SWHID support (Section 3.10)

## Open Questions
- What are the evidence thresholds for canonical merges at each layer?
- How are dedupe decisions propagated to existing tiles in the corpus?
- How does 4-layer dedupe interact with existing Rosetta tile deduplication?

## Affects
- Ingestion/refinery pipeline
- Corpus normalization
- Trust scoring (dedupe affects corroboration density axis)
