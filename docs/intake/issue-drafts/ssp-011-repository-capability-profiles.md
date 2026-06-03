# SSP-011: Define and Implement Repository Capability Profiles

## Type
implementation / architecture

## Status
issue-candidate

## Priority
P1

## Labels
source-substrate, repository, capability-profile, architecture

## Evidence
docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md, Sections 5.1, 12.3, 14

## Summary

Each source.system in the Source Substrate must carry a machine-readable repository capability profile. This profile encodes what the repository can do, how it handles PIDs, metadata, access, preservation, and correction — enabling automated source selection and trust evaluation.

The addendum defines repository-specific profiles for: Zenodo, Figshare, Dataverse/Harvard Dataverse, re3data, SWISSUbase, DaSCH, OpenAIRE/ScholeXplorer/OpenAlex.

Required capability profile fields (Section 12.3):
- PID support (DOI, Handle, ORCID, ROR, SWHID, URL, local ID, intrinsic hash)
- Metadata schema support (DataCite, Dublin Core, custom)
- API support (yes/no, endpoint types)
- OAI-PMH / SPARQL / bulk availability
- Curation posture (unmanaged, lightly curated, curated, reviewed, preservation-focused)
- Preservation posture (none, bit-level, long-term, certified)
- Access modes (open, embargoed, authenticated, by-request, contractual)
- Correction / retraction support (yes/no, mechanism)
- Software/data/publication support (which types)

## Requirements

### MUST DO

1. **Repository capability profile schema**: Define a structured schema for source.repository_capability_profile objects, aligned with Facet B (stewardship posture) and Facet F (machine affordance) from SSP-005.

2. **Tier 0 repository profiles first**: Implement profiles for Tier 0 priority repositories first: DataCite, Crossref, ORCID, ROR, re3data, OpenAIRE, OpenAlex, SWHID/Sotware Heritage.

3. **Tier 1 repository profiles**: Implement profiles for Zenodo, Figshare, Dataverse/Harvard Dataverse, SWISSUbase, DaSCH per Sections 14.1-14.7.

4. **re3data as meta-source**: Ingest re3data API as a machine-readable registry, populating repository_capability_profiles for known repositories automatically.

5. **Source selection integration**: Repository capability profiles MUST inform the source priority tier model (SSP-008) and the ingestion pipeline's source classification step.

6. **Profile versioning**: Repository capabilities change over time; profiles must be versioned and carry last-verified timestamps.

## Dependencies
- SSP-001 (Source Substrate constitutional domain)
- SSP-005 (facet classification — Facets B and F map to capability profiles)
- SSP-008 (stdpack.repository-capability-profile@0.1)
- SSP-009 (Step 7 builds capability profiles)

## Open Questions
- How are new repository profiles created? Manually authored? Auto-generated from re3data?
- How are profile discrepancies detected when a repository changes its capabilities?
- What is the minimum viable profile for Text-Core MVP?

## Affects
- Source Substrate constitutional domain
- Ingestion/refinery pipeline
- Rights-scoped retrieval (capability profiles inform access constraints)
