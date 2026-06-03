# SRP-005: Map 20 JSON-LD predicates to Rosetta graph schema; file ADR for vocabulary reconciliation

## Metadata

| Field | Value |
|---|---|
| Title | SRP-005: Map 20 JSON-LD predicates to Rosetta graph schema; file ADR for vocabulary reconciliation |
| Type | architecture |
| Status | candidate |
| Labels | `source-substrate`, `graph-schema`, `json-ld`, `adr` |
| Evidence | `docs/governance/20260412 - Source Registry and Repository Profile Annex.md`, §10 |
| Extraction date | 2026-05-31 |
| Extraction artifact | `docs/intake/docs-intelligence/2026-05-31-source-registry-repository-profile-annex.md` |

## Summary

The Source Registry and Repository Profile Annex (§10) proposes 20 JSON-LD/graph relation predicates for linking scholarly objects across source systems. However, the companion Source Substrate Addendum (PR #1186) defines an 8-dimension provenance lattice using different vocabulary. These two schemas must be reconciled to avoid a graph-schema divergence. This issue requires both mapping work and an architectural decision record (ADR) to document the chosen vocabulary.

## Context

Annex §10 predicates:
`publishedInSourceSystem`, `hostedBy`, `curatedBy`, `mintedIdentifierBy`, `claimsCreator`, `supportedByIdentityEvidence`, `indexedBy`, `mirroredAt`, `packagedAs`, `derivedFromManifestation`, `supersedesRecord`, `hasVersion`, `hasManifestation`, `hasAccessPolicy`, `hasTrustAssessment`, `hasCorrectionEvent`, `hasRetractionEvent`, `linkedToInstitution`, `linkedToAuthor`, `linkedToSoftwareArtifact`, `linkedToDataset`

SSP provenance lattice dimensions (from PR #1186 extraction): the 8-dimension provenance lattice uses different semantic names for what appear to be overlapping concepts.

Example potential conflicts:
- `publishedInSourceSystem` vs SSP's equivalent (terminology TBD)
- `hostedBy` vs SSP's hosting dimension
- `mintedIdentifierBy` vs SSP's PID minting dimension
- `hasVersion` vs SSP's version tracking dimension

## Requirements

1. Create a mapping table between the 20 Annex predicates and the SSP provenance lattice dimensions.
2. Where predicates map cleanly to existing dimensions, document the mapping in an ADR.
3. Where predicates introduce new semantic dimensions not covered by SSP, evaluate whether to extend SSP or adopt the Annex predicate.
4. Adopt a canonical predicate vocabulary for Rosetta's graph layer (either SSP-derived, Annex-derived, or a merged vocabulary).
5. Ensure Rosetta's graph schema supports all necessary predicates from the chosen vocabulary.

## Scope

- ADR: document vocabulary reconciliation decision
- Graph schema: extend or align Rosetta graph schema with chosen vocabulary
- Mapping table: publish at `docs/RFCs/SRP-005-predicate-mapping.md` or similar
- Cross-reference: update SSP documentation to reflect reconciliation

## Open Questions

1. Should Rosetta adopt the Annex predicate names verbatim, extend SSP's lattice, or invent new canonical names?
2. Are there existing linked-data standards (PROV-O, Dublin Core Terms, Schema.org) that should supersede both SSP and Annex predicates?
3. Should the predicate vocabulary be treated as a constitutional artifact (immutable except via ADR)?

## Depends On

- SSP (PR #1186) — must have the provenance lattice defined before mapping
- SRP-002 (source-profile schema — graph predicates relate to source profiles)

## Blocks

- None directly; this is a schema alignment task

## Related Issues

- DI-011 (Source Substrate missing as first-class protocol domain — already filed as github:#51)
- SSP-001 through SSP-013 (Source Substrate Addendum issue drafts from PR #1186)
