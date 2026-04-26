# Source Registry and Repository Profile Annex

Date: 2026-04-13
Companion to: Entif / Rosetta Addendum on Source Substrate and Repository Provenance

## 1. Purpose

This annex provides a more operational view of source categories, repository capability profiling, and early ingestion priority.

## 2. High-value source families

| Family | Canonical role in Entif | Why high leverage early | Primary cautions |
|---|---|---|---|
| DataCite | PID + metadata authority for many research objects | Strong metadata spine for datasets / software / presentations; excellent for record normalization | DOI is not authorship proof |
| Crossref | work metadata and relationship infrastructure | work-to-work relations, references, data citations, funder metadata | mostly publisher / member deposited metadata |
| ORCID | person PID infrastructure | author disambiguation and cross-system linkage | profile completeness varies; some assertions are user-controlled |
| ROR | organization PID infrastructure | institution normalization and affiliation linking | org hierarchy and naming can still be contested |
| OpenAIRE Graph | aggregated scholarly knowledge graph | source interlinking, graph retrieval, provenance-rich enrichments | imported vs inferred relations must stay distinct |
| OpenAlex | open scholarly graph and disambiguation layer | excellent for global discovery and relationship expansion | derived graph, not direct source of record for every field |
| re3data | repository registry | repository discovery, capability filtering, source intelligence | not primary evidence for dataset contents |
| Zenodo | generalist repository | DOI, versions, software / release workflows, public metadata | metadata richness varies by depositor |
| Figshare | dissemination / repository platform | DOI, versioning, previews, ORCID linkage, broad object types | curation rigor is uneven |
| Dataverse | repository software ecosystem | data citation, variable metadata, APIs, restricted file support | instance policies differ |
| SWISSUbase | national research data platform | curated project / data / institution aware environment | rights and access may be mediated |
| DaSCH | FAIR humanities service platform | metadata, ingest, archive, API, app, long-term stewardship | domain specificity may require richer mapping |
| SWHID / Software Heritage | intrinsic software identity | exact software artifact identity and provenance | not a replacement for publication metadata |
| RO-Crate | portable package standard | package-level metadata transport for research objects | package can still contain weak metadata |
| Croissant | dataset metadata packaging for ML and beyond | structured machine-usable dataset description | not a full truth / review layer |

## 3. Source system profile fields

### 3.1 Minimal profile fields

- `sourceSystemId`
- `canonicalName`
- `sourceRole[]`
- `operatorOrg[]`
- `jurisdiction[]`
- `supportsDOI`
- `supportsORCID`
- `supportsROR`
- `supportsSWHID`
- `supportsVersionFamilies`
- `supportsOpenMetadataWhenFilesRestricted`
- `supportsAPI`
- `supportsBulkExport`
- `supportsOaiPmh`
- `supportsRdfOrLinkedData`
- `supportsPackageExport`
- `curationPosture`
- `reviewPosture`
- `preservationPosture`
- `rightsPosture`
- `identitySupportNotes`
- `correctionRetractionSupport`
- `metadataProfile[]`
- `evidenceRefs[]`

### 3.2 Extended fields

- `repositorySelectionCriteria[]`
- `funderAcceptance[]`
- `disciplineCoverage[]`
- `languageSupport[]`
- `contractualObjectsSupported[]`
- `sourceScoreDefaults`
- `knownMirrors[]`
- `knownGraphIndexers[]`
- `knownRegistryListings[]`
- `knownPackageProfiles[]`
- `knownSoftwareMetadataProfiles[]`

## 4. Early ingestion priority matrix

| Priority | Source family | Primary use in Entif | Suggested first products |
|---|---|---|---|
| P0 | DataCite / Crossref / ORCID / ROR | identity and relationship spine | source registry, PID bindings, author-org-work graph |
| P0 | re3data | source-of-sources intelligence | repository capability profile registry |
| P1 | Zenodo / Figshare / Dataverse | structured research object ingestion | repository adapters, manifestation mapping, version family mapping |
| P1 | OpenAIRE / OpenAlex | graph enrichment and cross-source expansion | scholarly graph federation pack |
| P1 | SWHID / Software Heritage | exact software provenance | code artifact identity overlays |
| P2 | RO-Crate / Croissant | portable package interchange | package import / export profiles |
| P2 | SWISSUbase / DaSCH | curated domain and national repository patterns | advanced profile templates |
| P3 | blogs / forums / comments / social | novelty and discourse mining | volatile source pack, lower-trust retrieval profiles |

## 5. Suggested trust defaults by class

These are defaults only. All are overridable by evidence.

| Class | Retrieval priority | Citation weight | Automation weight | Notes |
|---|---|---|---|---|
| PID authority / metadata registry | High | Medium | High | strong for identity / linking, not always direct truth source |
| curated repository | High | High | Medium | strong stewardship, content may still vary in quality |
| graph aggregator | High | Medium | High for discovery | best used as relation expander with provenance retention |
| funder / library repository guidance | Medium | Low for content claims | High for repository selection | use as policy evidence |
| self-publish platform | Medium | Low to Medium | Low | useful for novelty, weak default trust |
| moderated discussion forum | Medium | Low | Low | good for signals, not proof |
| standards body | High | High | High | strong for normative definitions |

## 6. Example repository capability profile: Zenodo

- source role: generalist repository, software archiving bridge
- identifiers: DOI, external DOI reuse, account linking to ORCID / GitHub / OpenAIRE accounts in platform flows
- lifecycle: draft -> publish, metadata editable post-publication, files immutable per version, new version creates linked new record
- access: public metadata always available; files may be open or restricted
- software overlays: CodeMeta-related software metadata support, `CITATION.cff`, `.zenodo.json`, GitHub release archiving
- preservation: bit-level preservation posture stated
- caution: generalist repository; deposition quality uneven

## 7. Example repository capability profile: Figshare

- source role: generalist dissemination platform and institutional / publisher repository platform
- identifiers: DataCite DOI for public items on figshare.com, handles or DOIs in institutional contexts
- lifecycle: version control for files and metadata
- access: public landing pages and previews; institutional variants may differ
- integrity: MD5 integrity checks surfaced
- identity: ORCID linkage supported
- caution: moderation and curation depth are not equivalent to peer review

## 8. Example repository capability profile: Dataverse / Harvard Dataverse

- source role: repository platform plus instance-specific repository
- identifiers: DOIs and Handles supported; file PIDs supported in software capabilities
- metadata: rich dataset metadata, some variable-level metadata, citation exports
- access: open metadata even when files are restricted; customizable terms of use
- APIs: search, deposit, access, metrics, harvesting-related features depending on deployment
- lifecycle: versions tracked; citations include versioning and may include file fingerprints
- caution: software capabilities must be separated from local repository policy and moderation

## 9. Example source relationship pattern

A single scholarly dataset may have:

- a DataCite DOI minted through Zenodo,
- creators with ORCID IDs,
- institutions resolvable to ROR,
- a landing page in Zenodo,
- downloadable ZIP and PDF manifestations,
- indexing in OpenAIRE,
- citation relationships in Crossref,
- package export as RO-Crate or Croissant-like metadata in other ecosystems,
- and software components with SWHIDs.

Entif should store all of those as linked but distinct facts.

## 10. Recommended JSON-LD / graph relations

- `publishedInSourceSystem`
- `hostedBy`
- `curatedBy`
- `mintedIdentifierBy`
- `claimsCreator`
- `supportedByIdentityEvidence`
- `indexedBy`
- `mirroredAt`
- `packagedAs`
- `derivedFromManifestation`
- `supersedesRecord`
- `hasVersion`
- `hasManifestation`
- `hasAccessPolicy`
- `hasTrustAssessment`
- `hasCorrectionEvent`
- `hasRetractionEvent`
- `linkedToInstitution`
- `linkedToAuthor`
- `linkedToSoftwareArtifact`
- `linkedToDataset`

## 11. High-leverage implementation advice

1. Build the source registry before broad ingestion.
2. Keep source profiles editable and versioned as receipts, not mutable blobs.
3. Store repository capability profiles separately from individual records.
4. Treat identity resolution as evidence-producing work, not as a hidden side effect.
5. Separate source discovery from trust certification.
6. Preserve invalidation hooks so later corrections can propagate without data amnesia.
