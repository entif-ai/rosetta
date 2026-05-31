# SSP-009: Implement 12-Step Source Ingestion Pipeline

## Type
implementation / ingestion

## Status
issue-candidate

## Priority
P1

## Labels
source-substrate, ingestion-pipeline, workflow, implementation

## Evidence
docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md, Section 13.1

## Summary

The Source Substrate requires a 12-step ingestion pipeline for external sources. This is the "vascular system" that replaces "raw URL + fetch" pattern with structured, receipt-backed, multi-provenance source acquisition.

The 12 steps:
1. Discover source candidate
2. Classify source system and role facets (SSP-005)
3. Acquire manifestation with fetch receipt (SSP-003)
4. Extract source record metadata
5. Bind identifiers (DOI, ORCID, ROR, SWHID, URL, local IDs)
6. Resolve authorship/institution claims (SSP-003 + SSP-007)
7. Build repository capability profile (SSP-011)
8. Canonicalize content, emit internal tile(s)
9. Run trust vector evaluation (SSP-004)
10. Cluster for dedupe/equivalence proposals (SSP-006)
11. Attach lifecycle watchers if source is mutable (SSP-010)
12. Publish tiles/tapestries/proof bundles

## Requirements

### MUST DO

1. **Pipeline orchestration**: Implement the 12-step pipeline as an orchestrated workflow (LangGraph node or equivalent), with clear state transitions and error handling at each step.

2. **Receipt emission at each step**: Each step MUST emit a structured receipt capturing what happened, what was decided, and what evidence supports it.

3. **Step 3 — fetch receipt**: Acquire manifestation with source.fetch_receipt including: requested_locator, resolved_locator, fetched_at, method, requester_identity, auth_context, robots_or_terms_context, response_code, bytes_received, snapshot_hash, parser_used, extraction_profile, errors_or_warnings.

4. **Step 5 — identifier binding**: Bind all applicable PIDs (DOI, ORCID, ROR, SWHID, URL, local IDs) as source.identifier_bindings with provenance.

5. **Step 6 — authorship resolution**: Resolve authorship claims against ORCID, institutional profiles, prior publications. Apply SSP-007 escalation if stylometric or fingerprinting methods are attempted.

6. **Step 7 — capability profiles**: Build or retrieve source.repository_capability_profile for the source system.

7. **Step 9 — trust vector**: Run the 15-axis trust evaluation per SSP-004, emit source.evaluation_receipt.

8. **Step 10 — dedupe clustering**: Run 4-layer dedupe proposals, flag canonical merge candidates for gated review.

9. **Step 11 — lifecycle watchers**: For mutable sources (Facet E: version family, mutable metadata, live feed), attach lifecycle watchers for: new version, metadata update, retraction, access change.

10. **Failure handling**: Each step must define failure modes and how they affect downstream steps.

## Dependencies
- SSP-001 through SSP-007 (all upstream requirements)
- SSP-010 (lifecycle watchers)
- SSP-011 (repository capability profiles)
- Existing Rosetta ingest/refinery layer

## Open Questions
- How does the 12-step pipeline interact with existing Bootstrap ingest gate?
- Can steps be parallelized where independence allows?
- What is the minimum viable pipeline for Text-Core MVP gate?

## Affects
- Ingestion/refinery pipeline
- Bootstrap ingest gate
- Text-Core MVP scope gate
