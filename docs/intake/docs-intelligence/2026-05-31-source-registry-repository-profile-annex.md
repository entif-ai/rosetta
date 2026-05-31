# Docs Intelligence Extraction — Source Registry and Repository Profile Annex

## Source

- Path: `docs/governance/20260412 - Source Registry and Repository Profile Annex.md`
- Title: Source Registry and Repository Profile Annex
- Date evidence: 2026-04-13
- Authority tier: governance / operational annex
- Freshness: 2026-04-13 — companion to Source Substrate Addendum (also processed as PR #1186 on 2026-05-31)
- Word count: ~1,200
- Extractor: heartbeat subagent
- Extraction date: 2026-05-31

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

This annex provides an operational complement to the Source Substrate Addendum (SSP). It enumerates 15 high-value source families with canonical roles, leverage assessments, and cautions; defines 22 minimal and 10 extended source system profile fields; proposes a 4-tier ingestion priority matrix (P0–P3); proposes trust defaults by source class; gives three worked repository capability profiles (Zenodo, Figshare, Dataverse); illustrates the multi-source relationship pattern for a single scholarly dataset; and catalogs 20 recommended JSON-LD/graph relation predicates. Six implementation advice items close the document.

The document is a pure planning/operational artifact: it does not conflict with any existing Rosetta spec but has zero runtime implementation and zero code. It is a direct pre-implementation dependency for SSP's source registry and PID-binding work.

## Goals And Intent

- Provide Rosetta/Entif implementors with a canonical source family taxonomy and capability profile schema before broad ingestion begins.
- Anchor the Source Substrate Addendum's (SSP) conceptual model in concrete, prioritized, operational guidance.
- Separate source discovery (ingestion priority) from trust certification (overridable defaults by class).
- Ensure identity resolution is treated as evidence-producing work with explicit invalidation hooks.

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
|---|---|---|---|---|
| Source registry must exist before broad ingestion | §11, advice item 1 | SSP, Text-Core MVP (TC-005/TC-006) | P0 | blocker for any adapter that ingests from external sources |
| Source profiles must be stored as editable, versioned receipts | §11, advice item 2 | SSP, receipt-law | P0 | not mutable blobs; every change emits a receipt |
| Repository capability profiles must be stored separately from individual records | §11, advice item 3 | SSP, tapestry | P1 | profile ≠ record; prevents profile drift from record evidence |
| Identity resolution must produce evidence and support invalidation | §11, advice items 4 & 6 | SSP, write-admission gate | P0 | no silent identity collapsing; corrections must propagate |
| Source discovery must be separated from trust certification | §11, advice item 5 | SSP, trust-vector | P0 | discovery and certification are two different gates |
| Text-Core MVP must support two text-source families per gate criteria | §4, P0 sources | TC-005, TC-006 | P0 | DataCite/Crossref/ORCID/ROR are P0 candidates |
| Ingestion priority matrix must gate what gets ingested first | §4 | SSP, ingress-refinery | P0 | P0 = identity/relationship spine; P1 = structured research objects; P2 = portable packages; P3 = volatile discourse |
| Trust defaults by class must be overridable by evidence | §5 | SSP, trust-vector, rights-scoped retrieval | P1 | no hard trust; every class default can be overridden |
| 20 JSON-LD/graph predicates must be mappable to Rosetta's graph schema | §10 | SSP, Rosetta graph layer | P1 | predicates must be Rosetta-compatible, not ad-hoc |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §2, table | `source-substrate`, `source-families`, `pid`, `ingestion-priority` | 15 source families defined | requirement | 15 source families are enumerated with canonical role, leverage, and cautions. No existing Rosetta spec defines this taxonomy. | §2 table | Rosetta must adopt or reconcile this taxonomy before any source adapter is implemented | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §3.1, minimal profile fields | `source-substrate`, `schema`, `metadata-profile` | 22 minimal profile fields | requirement | 22 minimal source system profile fields are specified: sourceSystemId, canonicalName, sourceRole[], operatorOrg[], jurisdiction[], supportsDOI, supportsORCID, supportsROR, supportsSWHID, supportsVersionFamilies, supportsOpenMetadataWhenFilesRestricted, supportsAPI, supportsBulkExport, supportsOaiPmh, supportsRdfOrLinkedData, supportsPackageExport, curationPosture, reviewPosture, preservationPosture, rightsPosture, identitySupportNotes, correctionRetractionSupport, metadataProfile[], evidenceRefs[]. These are not yet in any Rosetta schema. | §3.1 | Add to Rosetta schema; this is the canonical source-profile data model | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §3.2, extended fields | `source-substrate`, `schema`, `extended-profile` | 10 extended profile fields | requirement | 10 extended fields go beyond minimal: repositorySelectionCriteria[], funderAcceptance[], disciplineCoverage[], languageSupport[], contractualObjectsSupported[], sourceScoreDefaults, knownMirrors[], knownGraphIndexers[], knownRegistryListings[], knownPackageProfiles[], knownSoftwareMetadataProfiles[]. These support richer trust and routing decisions. | §3.2 | Plan for extended fields as Phase 2 of source-profile schema | medium |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §4, priority matrix | `ingestion-priority`, `source-substrate`, `p0-p3` | 4-tier ingestion priority | decision | Priority matrix: P0 = DataCite/Crossref/ORCID/ROR/re3data (identity spine); P1 = Zenodo/Figshare/Dataverse/OpenAIRE/OpenAlex/SWHID (structured research objects); P2 = RO-Crate/Croissant/SWISSUbase/DaSCH (portable packages); P3 = blogs/forums/comments/social (volatile discourse). | §4 table | Use P0/P1/P2/P3 as the ingestion gate sequencing in SSP | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §5, trust defaults table | `trust-vector`, `trust-defaults`, `source-substrate` | 6 trust classes with overridable defaults | decision | Trust defaults proposed for 6 classes: PID authority (high retrieval, medium citation, high automation), curated repository (high/high/medium), graph aggregator (high/medium/high for discovery), funder/library guidance (medium/low/high for selection), self-publish platform (medium/low/low), moderated forum (medium/low/low), standards body (high/high/high). All overridable by evidence. | §5 table | Encode these as initial trust-vector defaults in SSP; implement override mechanism | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §6, Zenodo profile | `repository-profile`, `zenodo`, `source-families` | Zenodo worked example | technology | Zenodo profile: generalist repository, DOI, ORCID/GitHub/OpenAIRE linking, draft→publish lifecycle, files immutable per version, CodeMeta/CITATION.cff support, bit-level preservation posture stated, deposition quality uneven caution. | §6 | Use Zenodo as the reference implementation for first repository adapter | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §7, Figshare profile | `repository-profile`, `figshare`, `source-families` | Figshare worked example | technology | Figshare profile: DataCite DOI, version control for files and metadata, MD5 integrity checks, ORCID linkage, institutional variants differ from public platform, moderation not equivalent to peer review. | §7 | Plan Figshare as second repository adapter after Zenodo | medium |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §8, Dataverse profile | `repository-profile`, `dataverse`, `source-families` | Dataverse worked example | technology | Dataverse profile: DOI/Handles, rich dataset/variable metadata, open metadata even when files restricted, search/deposit/access/metrics APIs, version tracking with citation fingerprints, instance policies differ. | §8 | Dataverse as third adapter candidate; instance policy variability is a known risk | medium |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §9, multi-source relationship | `source-substrate`, `pid`, `cross-referencing` | single dataset spans 10+ source systems | decision | A single scholarly dataset may have: DataCite DOI (Zenodo), ORCID for creators, ROR for institutions, Zenodo landing page, OpenAIRE index, Crossref citations, RO-Crate/Croissant export, SWHID for software components. Entif must store these as linked but distinct facts. | §9 | This is the core cross-source deduplication challenge; Rosetta must model identity separately from record | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §10, JSON-LD predicates | `source-substrate`, `graph-schema`, `json-ld`, `predicate-catalogue` | 20 recommended predicates | requirement | 20 JSON-LD/graph predicates proposed: publishedInSourceSystem, hostedBy, curatedBy, mintedIdentifierBy, claimsCreator, supportedByIdentityEvidence, indexedBy, mirroredAt, packagedAs, derivedFromManifestation, supersedesRecord, hasVersion, hasManifestation, hasAccessPolicy, hasTrustAssessment, hasCorrectionEvent, hasRetractionEvent, linkedToInstitution, linkedToAuthor, linkedToSoftwareArtifact, linkedToDataset. | §10 | Map these to Rosetta graph schema; gaps vs existing schema need an ADR | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §11, advice items | `implementation-order`, `source-registry`, `receipt-law` | 6 implementation advice items | decision | Six advice items: (1) build source registry before broad ingestion; (2) store profiles as versioned receipts; (3) store profiles separately from records; (4) identity resolution is evidence-producing; (5) separate discovery from certification; (6) preserve invalidation hooks for corrections. | §11 | Convert each advice item into a concrete implementation requirement | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §2, DataCite caution | `source-subamilies`, `pid`, `identity`, `metadata` | DataCite limitation | risk | DataCite DOI is not authorship proof. Cannot be used alone for creator attribution without ORCID binding. | §2, DataCite row, Primary cautions column | Rosetta source adapters must never treat DOI as proof of authorship | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §2, ORCID caution | `source-families`, `identity`, `orcid` | ORCID profile completeness varies | risk | ORCID profile completeness varies; some assertions are user-controlled and self-asserted. Cannot be treated as authoritative identity. | §2, ORCID row | ORCID assertions need evidence grading; self-asserted vs third-party verified must be distinguished | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §2, OpenAlex caution | `source-families`, `graph-aggregator` | OpenAlex is a derived graph | risk | OpenAlex is a derived graph, not a direct source of record for every field. Retrieval from OpenAlex must carry provenance stating it is derived. | §2, OpenAlex row | OpenAlex records must carry source-of-record provenance flag; cannot be treated as primary evidence | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §2, re3data caution | `source-families`, `re3data`, `repository-discovery` | re3data is not dataset content evidence | risk | re3data is a repository registry/discovery tool, not primary evidence for dataset contents. Using it as a content source would be a category error. | §2, re3data row | re3data should only inform repository selection, not content provenance assessment | medium |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §2, Figshare caution | `source-families`, `figshare`, `curation` | curation rigor is uneven | risk | Figshare curation depth is not equivalent to peer review. Item-level trust assessment still required. | §2, Figshare row | Figshare items need explicit trust scoring; cannot inherit repository-level trust | medium |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §2, Zenodo caution | `source-families`, `zenodo`, `curation` | deposition quality uneven | risk | Zenodo deposition quality is uneven. Generalist nature means no consistent curation standard. | §2, Zenodo row | Zenodo items need per-record trust scoring; cannot assume uniform quality | medium |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §6–8, Dataverse caution | `source-families`, `dataverse`, `instance-policies` | Dataverse instance policies differ | risk | Dataverse software capabilities must be separated from local repository policy and moderation. Instance-level variability is a known confounder. | §8, caution | Adapter must profile each Dataverse instance separately; global Dataverse trust profile is insufficient | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §9, cross-source dedup | `source-substrate`, `cross-referencing`, `identity`, `dedupe` | single artifact spans multiple source systems | open-question | When one scholarly object appears in DataCite, Crossref, OpenAlex, and Zenodo simultaneously, what is the canonical identity binding? SSP does not resolve this; it only describes the multi-source pattern. | §9 | Rosetta must define a canonical identity resolution strategy for multi-source objects | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §3.1, evidenceRefs | `source-substrate`, `provenance`, `evidence` | evidenceRefs field in minimal profile | open-question | The evidenceRefs[] field in the minimal profile suggests each source profile can cite its own evidence base. How is this evidence stored, retrieved, and invalidated? Not specified. | §3.1 | Clarify evidenceRefs storage and invalidation semantics in SSP | medium |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §5, overridable defaults | `trust-vector`, `evidence`, `overridable` | trust defaults are overridable by evidence | dependency | Trust defaults by class are overridable — but the override mechanism (who authorizes, what evidence is required, how overrides are scoped) is not defined here. | §5 | This is a gap that SSP must resolve; it affects rights-scoped retrieval | high |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §3.1, posture fields | `source-substrate`, `curation-posture`, `review-posture`, `preservation-posture`, `rights-posture` | 4 posture fields | issue-candidate | Four posture fields (curationPosture, reviewPosture, preservationPosture, rightsPosture) appear in §3.1 but are not defined. What are the valid values? Who assigns posture? How does posture interact with trust-vector? | §3.1 | Define posture taxonomy in SSP before implementing source profiles | medium |
| 2026-05-31 | docs/governance/20260412 - Source Registry and Repository Profile Annex.md | §3.1, metadataProfile[] | `source-substrate`, `metadata-profile` | metadataProfile[] is underspecified | issue-candidate | metadataProfile[] field is listed but its value schema is not defined. Is it a controlled vocabulary? An open list of schema URIs? A list of supported standards (Dublin Core, MARC, etc.)? | §3.1 | Define metadataProfile[] schema in SSP; coordinate with existing schema standards work | medium |

## Components And Technologies

- DataCite (PID + metadata authority)
- Crossref (work metadata and relationship infrastructure)
- ORCID (person PID infrastructure)
- ROR (organization PID infrastructure)
- OpenAIRE Graph (aggregated scholarly knowledge graph)
- OpenAlex (open scholarly graph and disambiguation layer)
- re3data (repository registry)
- Zenodo (generalist repository; DOI, versioning, software overlays)
- Figshare (dissemination/repository platform; DOI, versioning, ORCID)
- Dataverse (repository software ecosystem; APIs, variable metadata)
- SWISSUbase (national research data platform)
- DaSCH (FAIR humanities service platform)
- SWHID / Software Heritage (intrinsic software identity)
- RO-Crate (portable package standard)
- Croissant (dataset metadata packaging for ML)
- JSON-LD (graph serialization)
- Trust vectors (class-based overridable trust defaults)
- Source system profile schema (22 minimal + 10 extended fields)
- Ingestion priority matrix (P0/P1/P2/P3)

## Conceptual Claims

1. Source families are not interchangeable: each has a distinct canonical role, PID type, and trust posture. A source registry must capture this heterogeneity explicitly.
2. Ingestion priority should follow identity spine first (P0), then structured research objects (P1), then portable packages (P2), then volatile discourse (P3).
3. Trust defaults by source class are useful starting points but must always be overridable by evidence — no hard trust, only evidence-graded trust.
4. Source discovery (finding what exists) must be architecturally separated from trust certification (assigning trust weight to what was found).
5. Identity resolution for scholarly objects is inherently multi-source and must store linked-but-distinct facts, not attempt to collapse to a single authoritative record without evidence.
6. Repository capability profiles are distinct from individual scholarly records and must be stored, versioned, and receipted separately.

## Dependencies And Sequencing

- **Depends on:** SSP (Source Substrate Addendum) which this annex operationalizes; the Source Substrate Addendum was extracted in PR #1186 on 2026-05-31.
- **Precedes:** Any repository adapter implementation (Zenodo, Figshare, Dataverse), any PID-binding work (DOI, ORCID, ROR, SWHID), any trust-vector implementation.
- **Sequence:** Build source registry (advice #1) before any adapter; source profiles as versioned receipts (advice #2) before profile population; identity resolution evidence work before cross-source dedup.
- **Related:** Crossref/ORCID/ROR are already mentioned in the SSP extraction (SSP-003, SSP-004); this annex provides the ingestion-priority context for those PID bindings.

## Contradictions Or Supersession

- No contradictions detected. This annex is wholly consistent with and complementary to the Source Substrate Addendum (PR #1186). No supersession needed.
- Minor gap: the SSP extraction (PR #1186) identifies 12-element multi-object source model and 8-dimension provenance lattice; this annex's 20 JSON-LD predicates (§10) are a concrete instantiation of those dimensions but use different naming. An ADR should reconcile the predicate vocabulary with the SSP provenance lattice to ensure schema consistency.

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
|---|---|---|---|---|---|
| SRP-001: Define source-registry as a first-class Rosetta artifact before ingestion adapters | architecture/spec-gap | `docs/intake/issue-drafts/srp-001-source-registry-first-class-artifact.md` | `source-substrate`, `source-registry`, `tc-005`, `priority:p0` | — | §11 advice #1; no existing Rosetta spec defines a source registry as a first-class artifact |
| SRP-002: Define source-profile schema (22 minimal + 10 extended fields) in Rosetta schema | schema | `docs/intake/issue-drafts/srp-002-source-profile-schema.md` | `source-substrate`, `schema`, `metadata-profile` | SSP (PR #1186) | §3.1 + §3.2; no existing Rosetta schema for source profiles |
| SRP-003: Define posture taxonomy (curationPosture, reviewPosture, preservationPosture, rightsPosture) | schema | `docs/intake/issue-drafts/srp-003-posture-taxonomy.md` | `source-substrate`, `posture`, `schema` | SRP-002 | §3.1 posture fields undefined; SSP does not define posture semantics |
| SRP-004: Define metadataProfile[] field schema and controlled vocabulary | schema | `docs/intake/issue-drafts/srp-004-metadata-profile-schema.md` | `source-substrate`, `metadata-profile`, `schema` | SRP-002 | §3.1 metadataProfile[] is listed but not defined |
| SRP-005: Map 20 JSON-LD predicates to Rosetta graph schema; file ADR for vocabulary reconciliation | architecture | `docs/intake/issue-drafts/srp-005-json-ld-predicate-mapping.md` | `source-substrate`, `graph-schema`, `json-ld`, `adr` | SSP (PR #1186), SRP-002 | §10 predicates vs SSP provenance lattice naming mismatch |
| SRP-006: Define trust-override mechanism (who authorizes, what evidence, scope) | architecture/spec-gap | `docs/intake/issue-drafts/srp-006-trust-override-mechanism.md` | `source-substrate`, `trust-vector`, `rights`, `governance` | SRP-002 | §5 trust defaults overridable but mechanism undefined; affects rights-scoped retrieval |
| SRP-007: Zenodo repository adapter as first-priority adapter implementation | implementation | `docs/intake/issue-drafts/srp-007-zenodo-adapter-priority.md` | `source-substrate`, `adapter`, `zenodo`, `p0` | SRP-001, SRP-002 | §6 worked profile; §4 Zenodo is P1; §11 advice #1 source registry must precede |
| SRP-008: Identity resolution strategy for multi-source scholarly objects | architecture/spec-gap | `docs/intake/issue-drafts/srp-008-multi-source-identity-resolution.md` | `source-substrate`, `identity`, `pid`, `dedupe` | SRP-001, SSP (PR #1186) | §9 multi-source pattern; §2 DataCite caution; §2 ORCID caution |
| SRP-009: evidenceRefs[] storage and invalidation semantics | architecture/spec-gap | `docs/intake/issue-drafts/srp-009-evidence-refs-invalidation.md` | `source-substrate`, `evidence`, `provenance`, `invalidation` | SRP-002 | §3.1 evidenceRefs[] field defined but storage/invalidation unspecified; §11 advice #6 |
| SRP-010: Implement P0 ingestion priority matrix (DataCite/Crossref/ORCID/ROR/re3data as identity spine) | implementation | `docs/intake/issue-drafts/srp-010-p0-ingestion-priority-matrix.md` | `source-substrate`, `ingestion-priority`, `p0`, `tc-005` | SRP-001, SRP-002, SRP-008 | §4 P0 sources; Text-Core MVP gate requires two text-source families |

## Project Board Suggestions

- Area: Source Substrate / Rosetta Bootstrap / Text-Core MVP
- Cycle: batch-3 (DI-003 pending; this doc is in batch-3 scope)
- Status: Extracted 2026-05-31; 10 issue candidates
- Blocked by: SSP PR #1186 (companion doc; already merged), source registry definition (SRP-001) before adapter work
- Parallelization notes: SRP-001 and SRP-002 are independent and can run in parallel; SRP-003 through SRP-010 are sequential on SRP-002; Zenodo adapter (SRP-007) is on the critical path for Text-Core MVP ingestion readiness

## Open Questions

1. What is the canonical identity resolution strategy when one scholarly object appears simultaneously in DataCite, Crossref, OpenAlex, and Zenodo? (SRP-008)
2. Who is authorized to override a trust default for a given source class, and what evidence is required? (SRP-006)
3. How are evidenceRefs[] stored, retrieved, and invalidated? Is there a separate evidence store, or are refs embedded in source profiles? (SRP-009)
4. What are the valid values for the four posture fields (curationPosture, reviewPosture, preservationPosture, rightsPosture)? A controlled vocabulary? An ordinal scale? (SRP-003)
5. What is the schema for metadataProfile[] — controlled vocabulary, schema URI list, list of supported standards (Dublin Core, MARC, etc.)? (SRP-004)
6. How should the §10 JSON-LD predicates be reconciled with the SSP provenance lattice dimensions (different naming, potentially overlapping semantics)? (SRP-005)
