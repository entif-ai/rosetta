# SSP-005: Implement 9-Facet Orthogonal Source Classification

## Type
architecture / implementation

## Status
issue-candidate

## Priority
P0

## Labels
source-substrate, facet-classification, source-taxonomy, architecture

## Evidence
docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md, Section 6

## Summary

Source classification must use 9 orthogonal facets rather than a single hierarchical tree. Each facet captures an independent dimension of source character. SHACL profiles constrain which combinations are valid in a given operational context.

Facet A: source role — primary repository, institutional repository, disciplinary repository, generalist repository, identifier authority, metadata registry, scholarly graph aggregator, citation graph service, code forge, package registry, standards body, news/media outlet, blog/essay platform, discussion forum, social platform, archival mirror, internal file store, internal operational log (20 values)

Facet B: stewardship posture — unmanaged self-publish, moderated but lightly curated, curated repository, reviewed repository, preservation-focused archive, registry/index only, graph enrichment service, institutional/national infrastructure, community-governed open infrastructure, commercial platform (10 values)

Facet C: access posture — open metadata/open files, open metadata/restricted files, embargoed, authenticated open, by-request access, contractual access, internal only, public landing page/gated payload (8 values)

Facet D: identifier posture — DOI, Handle, ORCID, ROR, SWHID, URL only, local record ID only, multiple PID family, intrinsic hash only (9 values)

Facet E: lifecycle posture — immutable single version, version family, mutable metadata/immutable files, mutable both, append-only event stream, live continuously updated feed (6 values)

Facet F: machine affordance — HTML only, API, OAI-PMH, SPARQL/RDF, bulk snapshot, package export, schema publication, content negotiation, search endpoint (9 values)

Facet G: trust/review posture — unreviewed, spam screened, editorially screened, peer reviewed externally, peer review unknown, institutional review, community moderation, algorithmic enrichment layer (7 values)

Facet H: preservation promise — none stated, bit-level preservation, long-term archive claim, certified/standards-aligned preservation posture, mirror only (5 values)

Facet I: legal/rights posture — clear open license, metadata open/payload closed, unclear or mixed rights, contractual restriction, personal data sensitivity, export-control or jurisdiction-sensitive (6 values)

## Requirements

### MUST DO

1. **Facet vocabulary definitions**: Define controlled vocabularies for all 9 facets with all specified values.

2. **Facet annotation on source.system**: Every source.system object MUST carry annotations for all 9 applicable facets.

3. **SHACL profiles for valid combinations**: Define which facet combinations are valid for which operational contexts. (e.g., "preservation-focused archive" + "unreviewed" = invalid combination)

4. **Facet-based retrieval filtering**: Rights-scoped retrieval must be able to filter by facet values (e.g., "only peer-reviewed sources" or "only open-access sources").

5. **Repository capability profile alignment**: Facet B (stewardship) and Facet F (machine affordance) map to stdpack.repository-capability-profile@0.1.

## Dependencies
- SSP-001 (Source Substrate constitutional domain)
- SSP-011 (repository capability profiles)
- stdpack.repository-capability-profile@0.1

## Open Questions
- Which facet combinations are invalid? Need SHACL shape authoring.
- How are new source roles added to Facet A without breaking existing classifications?
- How do facets propagate from source.system to source.record?

## Affects
- Source Substrate constitutional domain
- Rights-scoped retrieval
- Source priority tiering (Section 11)
- Repository capability profiles
