# SSP-012: Ingest Tier 0 Scholarly Infrastructure Sources

## Type
implementation / ingestion

## Status
issue-candidate

## Priority
P1

## Labels
source-substrate, tier-0, scholarly-infrastructure, ingestion

## Evidence
docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md, Section 11

## Summary

The Source Substrate source priority tier model (Section 11) defines Tier 0 as the highest-priority ingestion targets because they improve identity resolution, citation linking, repository understanding, source selection, and trust analysis across everything else.

Tier 0 sources:
- DataCite (DOI metadata, rich research object metadata)
- Crossref (work relationships, data citations, open metadata)
- ORCID (person identity)
- ROR (organization identity)
- re3data (global registry of research data repositories, open schema + API)
- OpenAIRE Graph (large scholarly graph from validated content providers)
- OpenAlex (works, authors, institutions, disambiguation and linking)
- SWHID / Software Heritage relevant surfaces (intrinsic software identity)

Tier 1 (next priority): Zenodo, Figshare, Dataverse, SWISSUbase, DaSCH

## Requirements

### MUST DO

1. **re3data ingestion first**: re3data is both a registry and a machine-readable API. Ingest it as a meta-source first — it provides repository capability profiles for all Tier 0 and Tier 1 targets.

2. **ORCID integration**: ORCID provides person identity. Map ORCID records to source.identity_evidence objects with appropriate provenance.

3. **ROR integration**: ROR provides organization identity. Map ROR records to institutional affiliation claims.

4. **Crossref and DataCite**: These provide work metadata, DOI relationships, and citation graphs. Map to source.record and source.manifestation objects.

5. **OpenAlex integration**: OpenAlex provides disambiguated works, authors, institutions, and links. Use for deduplication (SSP-006) and identity resolution (SSP-003).

6. **SWHID/Sotware Heritage**: Intrinsic software identity independent of central registry. Map to source.identifier_bindings with SWHID as an external authority.

7. **OpenAIRE Graph**: Large scholarly graph aggregation. Use for cross-source corroboration density in trust evaluation (SSP-004).

8. **Source priority ordering in pipeline**: The ingestion pipeline (SSP-009) must respect Tier 0 → Tier 1 → Tier 2 ordering when deciding acquisition priority.

## Dependencies
- SSP-003 (identity-resolution provenance — ORCID/ROR bindings)
- SSP-004 (trust vector — cross-source corroboration density axis)
- SSP-006 (deduplication — OpenAlex for disambiguation)
- SSP-008 (scholarly-infrastructure pack)
- SSP-009 (12-step pipeline)

## Open Questions
- What API rate limits apply to these services? How is throttling handled?
- Which of the Tier 0 sources are strictly required vs. nice-to-have for Text-Core MVP?
- How is the scholarly graph kept current without overwhelming external APIs?

## Affects
- Ingestion/refinery pipeline
- Identity resolution
- Trust vector scoring
- Deduplication
