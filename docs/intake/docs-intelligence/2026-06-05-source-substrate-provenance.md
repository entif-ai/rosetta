# 2026-06-05 — Source Substrate and Repository Provenance Addendum

## Metadata
- **Source:** docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md
- **Extracted:** 2026-06-05
- **Confidence:** high

## Boundary
This artifact is docs-intelligence output for planning and orchestration. Not runtime ingestion.

## Summary
This addendum to Rosetta v3.0.0 Core Spine proposes a new constitutional domain — the **Source Substrate** — mandating that every externally acquired artifact be represented through a multi-object source model (separating artifact identity, manifestation, hosting context, publication context, identifier bindings, authorship claims, identity evidence, stewardship posture, rights context, lifecycle events, and trust analysis), introduces a facet-based source classification scheme (8 orthogonal facets: source role, stewardship posture, access posture, identifier posture, lifecycle posture, machine affordance, trust/review posture, legal/rights posture), defines a 15-axis trust vector model replacing scalar trust scores, specifies a multi-provenance lattice (acquisition, publication, custody, authorship, identity-resolution, derivation, rights, and evaluation provenance), provides a 4-layer deduplication model, and proposes 7 new pack families including `stdpack.source-substrate`, `stdpack.scholarly-infrastructure`, `stdpack.repository-capability-profile`, `vocabpack.source-taxonomy`, `stdpack.identity-and-authorship-provenance`, `stdpack.retraction-correction-and-supersession`, and `stdpack.portable-source-packaging`.

## Findings

### [F1] New constitutional domain: Source Substrate
**Confidence:** high
**Reference:** Section 4, Executive synthesis
**Content:** The Source Substrate is a new Rosetta / Entif constitutional domain concerned with the representation, classification, acquisition, linking, evaluation, packaging, retention, and governance of all external and internal information sources, source systems, source records, manifestations, and source-derived claims. It is positioned as the "vascular system" that connects raw ingestion to durable knowledge.

### [F2] Multi-object source model (12-component minimum)
**Confidence:** high
**Reference:** Section 2.1
**Content:** Every externally acquired artifact SHALL be represented through at minimum 12 separate objects: artifact identity, manifestation identity, acquisition event, hosting/custody context, publication context, identifier bindings, authorship/agency claims, identity evidence, stewardship/review posture, rights/policy context, lifecycle events, and trust/invalidation analysis. A "non-collapse rule" forbids any single object from simultaneously standing in for the record, bytes, platform, publisher, custodian, claimed author, and verified author identity.

### [F3] Facet-based source classification (8 orthogonal facets)
**Confidence:** high
**Reference:** Section 6 (Facets A–I)
**Content:** Sources are classified across 8 independent facets rather than a single hierarchy: Facet A — source role (20 categories from primary repository to internal operational log); Facet B — stewardship posture (10 categories from unmanaged self-publish to commercial platform); Facet C — access posture (7 categories from open/open to gated payload); Facet D — identifier posture (9 categories from DOI to intrinsic hash; Facet E — lifecycle posture (5 categories from immutable to live continuous feed); Facet F — machine affordance (8 categories from HTML-only to content negotiation); Facet G — trust/review posture (7 categories from unreviewed to algorithmic enrichment); Facet H — preservation promise (5 categories from none stated to certified preservation); Facet I — legal/rights posture (6 categories from clear open license to export-control sensitive).

### [F4] Trust as a 15-axis vector
**Confidence:** high
**Reference:** Section 8.1
**Content:** Trust is modeled as a matrix of 15 partially independent dimensions: artifact integrity confidence, record identity confidence, authorship confidence, institutional affiliation confidence, repository stewardship confidence, review/moderation rigor, metadata richness/machine usability, correction/retraction responsiveness, license clarity, identity abuse risk, manipulation/propaganda risk, novelty yield, rarity/scarcity yield, cross-source corroboration density, and invalidation sensitivity. Trust for retrieval priority is separated from trust for citation weight, policy automation, identity inference, and public-facing proof bundles.

### [F5] Multi-provenance lattice (8 provenance dimensions)
**Confidence:** high
**Reference:** Section 7
**Content:** Provenance is represented across 8 distinct dimensions: acquisition provenance (fetch URL, transport, timestamp, requesting principal, byte hash, parser toolchain), publication provenance (claim about publication surface), custody provenance (current host/steward), authorship provenance (distinguishing named creator string, account holder, depositing actor, publisher, curator, software tool), identity-resolution provenance (method, evidence set, confidence distribution, invalidation hooks), derivation provenance (format conversion, OCR, metadata extraction, translation), rights provenance (license, embargo, consent), and evaluation provenance (how Entif arrived at its trust/risk/relevance judgments).

### [F6] 4-layer deduplication model
**Confidence:** high
**Reference:** Section 10
**Content:** Deduplication occurs at four layers: (1) byte identity dedupe (same bytes, same hash); (2) manifestation dedupe (different URLs/mirrors, same manifestation); (3) record-family dedupe (same work/dataset/release as multiple records); (4) conceptual dedupe (multiple artifacts describing the same conceptual object). Entif should cluster aggressively and merge cautiously, with canonical merges gated by evidence thresholds. Recommended structure maintains separate references for canonical work ID, version family ID, manifestation IDs, external PIDs, intrinsic hash IDs, and local tile IDs.

### [F7] 5-tier source ingestion priority
**Confidence:** high
**Reference:** Section 11
**Content:** Sources are prioritized in 5 tiers: Tier 0 — source infrastructure and identity graph foundations (DataCite, Crossref, ORCID, ROR, re3data, OpenAIRE Graph, OpenAlex, SWHID); Tier 1 — generalist and institutional research repositories (Zenodo, Figshare, Dataverse, SWISSUbase, DaSCH); Tier 2 — standards and normative bodies (W3C, IETF, MLCommons, RO-Crate, CodeMeta); Tier 3 — high-signal public knowledge and policy surfaces (PubMed/PMC, arXiv, government portals, institutional documentation); Tier 4 — discussion, blogs, forums, reviews, social sources (LessWrong, product reviews, threads); Tier 5 — broad web sludge (deferred until Source Substrate is disciplined).

### [F8] 7 proposed new pack families
**Confidence:** high
**Reference:** Section 12
**Content:** Seven new pack families are proposed: `stdpack.source-substrate@0.1` (canonical external-source object model), `stdpack.scholarly-infrastructure@0.1` (crosswalk to DataCite, Crossref, ORCID, ROR, OpenAIRE, OpenAlex, Scholix, re3data), `stdpack.repository-capability-profile@0.1` (machine-readable repository capability profiles), `vocabpack.source-taxonomy@0.1` (facet-based classification vocabularies), `stdpack.identity-and-authorship-provenance@0.1` (authorship claims, ORCID/ROR bindings, personhood-sensitive escalation hooks), `stdpack.retraction-correction-and-supersession@0.1` (corrections, retractions, withdrawals, versioning events), and `stdpack.portable-source-packaging@0.1` (RO-Crate/Croissant import/export for Rosetta tiles/tapestries).

### [F9] 12 specific source system object types
**Confidence:** high
**Reference:** Section 5 (5.1–5.4)
**Content:** Twelve new object types are proposed: `source.system` (platforms and source systems with 15 key fields including pid_support, metadata_profiles_supported, curation_posture, trust_baseline_profile), `source.registry` (source registries such as re3data, OpenDOAR, FAIRsharing), `source.graph_infrastructure` (interlinking services such as OpenAIRE Graph, OpenAlex, Crossref relationship layer), `source.record` (records in source systems with 14 key fields including record_local_id, stable_locator_set, metadata_blob, record_lineage_refs), `source.manifestation` (concrete manifestations with 14 fields including media_type, byte_hashes, canonicalization_profile, access_requirements, structure_profile), `source.package` (portable packaging forms including RO-Crate, Croissant, tapestry import/export packages), `source.fetch_receipt` (acquisition events with 14 fields including requested_locator, auth_context_used, robots_or_terms_context, snapshot_hash), `source.normalization_receipt`, `source.identity_resolution_receipt`, `source.evaluation_receipt`, plus event/claim objects for authorship, custody, publication, review, correction, and identity evidence.

### [F10] Positive and negative acceptance criteria
**Confidence:** high
**Reference:** Section 16
**Content:** Five positive acceptance criteria are specified: (1) a Zenodo dataset can be represented without conflating record/version/manifestation/creator/ORCID/repository-host; (2) a Harvard Dataverse dataset with restricted files but public metadata keeps metadata discoverable while files remain access-controlled; (3) a repository discovered via re3data can be represented as a capability profile before any record is ingested; (4) a software release archived via Zenodo can carry Git identity, DOI identity, SWHID identity, and repository hosting identity simultaneously; (5) a Croissant or RO-Crate description can be imported without erasing original package structure. Five negative criteria require the system to reject: DOI-as-verified-authority equivalence, repository-host-as-author collapse, dimensionless trust scores, silent external-identifier replacement, and identity-sensitive inference hidden behind ordinary provenance labels.

### [F11] Proposed ROCK series for Source Substrate
**Confidence:** high
**Reference:** Section 17
**Content:** Seven follow-on ROCK documents are recommended: ROCK-31YA (Source Substrate Core Pack), ROCK-31YB (Scholarly Infrastructure Alignment Pack), ROCK-31YC (Repository Capability Profile Pack), ROCK-31YD (Authorship and Identity Resolution Provenance Pack), ROCK-31YE (Correction, Retraction, and Supersession Pack), ROCK-31YF (Portable Source Packaging Pack), and ROCK-31YG (Source Trust Matrix and Invalidation Rules).

### [F12] Identity-sensitive escalation threshold
**Confidence:** high
**Reference:** Section 15
**Content:** When analysis relies on stylometry, voice or behavior fingerprints, cross-platform same-author inference, quasi-biometric cognitive signatures, or person-model construction, it SHALL trigger the stronger identity-sensitive governance path from the personhood provenance addendum. Content provenance, authorship evidence, identity continuity evidence, and model-generated identity inference are always distinguished.

## Issue Candidates

### [SRC-001] Define Source Substrate constitutional domain
**Priority:** P1
**Description:** Rosetta/Entif lacks an architectural domain for representing source systems, repositories, registries, and the source ecology around artifacts. Section 4 proposes a new Source Substrate constitutional domain with specific responsibilities: classify source systems by facet, preserve multiple provenance dimensions, bind external identifiers without collapsing them, separate record from artifact identity, support repository/registry/graph infrastructures, support machine-readable capability profiles, support trust scoring as a vector, track lifecycle events, and expose all to retrieval/evaluation/guard/bindle systems. This requires new protocol text in the Rosetta core spine.

### [SRC-002] Design multi-object source model for artifact representation
**Priority:** P1
**Description:** The current ingestion model likely conflates record, bytes, platform, publisher, custodian, claimed author, and verified author identity into a single flat source field. Section 2.1 specifies that every externally acquired artifact SHALL be represented through 12 separate model objects. The section also specifies a non-collapse rule (no single object may represent more than one role) and an external-authority rule preserving Rosetta's existing discipline. Requires new tile kinds, pack-specific overlays, or object schemas.

### [SRC-003] Design 8-facet source classification taxonomy
**Priority:** P2
**Description:** Section 6 defines 8 orthogonal classification facets (source role with 20 categories, stewardship posture with 10 categories, access with 7, identifier with 9, lifecycle with 5, machine affordance with 8, trust/review with 7, preservation promise with 5, legal/rights with 6). These need to be encoded as `vocabpack.source-taxonomy@0.1` in the vocabulary pack system. The facet approach is positioned as compatible with existing software taxonomy work and SHACL/profile constraints.

### [SRC-004] Design 15-axis trust vector model
**Priority:** P2
**Description:** Section 8 replaces scalar trust scores with 15 independent dimensions across artifact integrity, record identity, authorship, institutional affiliation, stewardship, review rigor, metadata richness, correction responsiveness, license clarity, identity abuse risk, manipulation risk, novelty yield, rarity yield, corroboration density, and invalidation sensitivity. Each axis is for a different use function (retrieval priority vs citation weight vs policy automation vs identity inference vs proof bundles). Requires schema design and evaluation infrastructure.

### [SRC-005] Design multi-provenance lattice (8 dimensions)
**Priority:** P2
**Description:** Provenance is currently represented as a single chain. Section 7 specifies 8 distinct provenance dimensions that must all be tracked: acquisition, publication, custody, authorship, identity-resolution, derivation, rights, and evaluation provenance. Each dimension has specific minimum fields. The identity-resolution provenance dimension is especially important for the personhood-sensitive work and must store method, evidence set, confidence distribution, and invalidation hooks.

### [SRC-006] Implement 4-layer deduplication model
**Priority:** P2
**Description:** Section 10 specifies 4 distinct deduplication layers (byte identity dedupe, manifestation dedupe, record-family dedupe, conceptual dedupe) and a cluster-aggressively/merge-cautiously policy with evidence-threshold gating for canonical merges. The section also recommends a specific identity family structure (canonical work ID, version family ID, manifestation IDs, external PIDs, intrinsic hash IDs, local tile IDs) to handle cases like one conceptual dataset with many versions, mirrors, DOI families, and downloadable files.

### [SRC-007] Define 7 new pack families for Source Substrate
**Priority:** P2
**Description:** Section 12 proposes 7 new pack families: `stdpack.source-substrate@0.1`, `stdpack.scholarly-infrastructure@0.1`, `stdpack.repository-capability-profile@0.1`, `vocabpack.source-taxonomy@0.1`, `stdpack.identity-and-authorship-provenance@0.1`, `stdpack.retraction-correction-and-supersession@0.1`, and `stdpack.portable-source-packaging@0.1`. These are early-stage proposals requiring scoping and design work before first-cut drafts. Recommend tracking as separate design tracks under the 7 proposed ROCKs (ROCK-31YA through ROCK-31YG).

### [SRC-008] Design source ingestion workflow (13-step pipeline)
**Priority:** P3
**Description:** Section 13 specifies a 13-step ingestion pipeline (discover source candidate → classify source system facets → acquire manifestation → extract record metadata → bind identifiers → resolve authorship → build repository capability profile → canonicalize → evaluate trust → cluster for dedupe → attach lifecycle watchers → publish tiles/tapestries/proof bundles) and a retrieval workflow that can answer not just "what does this artifact say?" but a full provenance suite of questions. This workflow should be documented as a Rosetta protocol design note.
