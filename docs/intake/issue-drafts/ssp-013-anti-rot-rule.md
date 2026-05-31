# SSP-013: Implement Anti-Rot Rule for Source References

## Type
implementation / architecture

## Status
issue-candidate

## Priority
P1

## Labels
source-substrate, anti-rot, provenance, architecture

## Evidence
docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md, Section 9.3

## Summary

The anti-rot rule is a provenance discipline that prevents source references from becoming stale or misleading over time. It states:

> "Raw URL alone is never enough. Entif should follow the anti-rot rule already implicit in your provenance work: store content hash + retrieval metadata + excerpt or structural span + optional local snapshot blob."

This is a direct application of Receipt Law to source references.

## Requirements

### MUST DO

1. **Reject URL-only references**: The ingestion gate MUST reject any source reference that consists only of a URL without additional provenance.

2. **Minimum anti-rot fields**: Every source.manifestation or source.fetch_receipt MUST contain at minimum:
   - Content hash (at least one: SHA-256 or stronger)
   - Retrieval metadata (fetched_at, method, requester_identity, response_code)
   - Structural span or excerpt (not just bytes — actual extracted content reference)
   - Optional local snapshot blob (for mutable or high-value sources)

3. **Snapshot policy**: Define a snapshot policy: which sources require local snapshot blobs, which can rely on hash + excerpt only.

4. **Anti-rot in retrieval**: At retrieval time, the system must be able to verify that the stored hash still matches the fetched content (if re-fetchable) or that the snapshot is still current.

5. **Constitutional alignment**: The anti-rot rule is an expression of Receipt Law for source references. It should be referenced in the constitutional documentation alongside Receipt Law.

## Dependencies
- SSP-003 (fetch receipt fields include hash and retrieval metadata)
- Receipt Law (existing Bootstrap constraint)
- SSP-009 (ingestion pipeline — Step 3 emits fetch receipt)

## Open Questions
- What is the snapshot retention policy? (Storage cost vs. anti-rot benefit)
- How does anti-rot interact with immutable source.manifestation objects?
- What hash algorithm is required? (SHA-256 minimum?)

## Affects
- Ingestion/refinery pipeline
- Source Substrate constitutional domain
- Rights-scoped retrieval (anti-rot affects source freshness guarantees)
