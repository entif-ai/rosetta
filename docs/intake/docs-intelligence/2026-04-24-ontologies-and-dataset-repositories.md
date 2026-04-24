---
doc: ontologies-and-dataset-repositories
source: docs/chats/20260412 - Chat GPT - Ontologies and Dataset Repositories.md
extracted: 2026-04-24
findings: 14
issues_drafted: 2
---

# Extraction: 20260412 - Chat GPT - Ontologies and Dataset Repositories

## Metadata
- **Source:** `docs/chats/20260412 - Chat GPT - Ontologies and Dataset Repositories.md`
- **Type:** Specification / Architecture / Epistemology
- **Date:** 2026/04/12 (chat session)
- **Exported:** 2026/04/12 21:12:09
- **User:** Emilie Eudico (emilieeudico@gmail.com)
- **Link:** https://chatgpt.com/g/g-p-69299306a6408191947092cdf41148f0/c/69dbc917-d5bc-832d-9eb4-f2ecc78a0a46
- **Extracted:** 2026-04-24

---

## Document Structure

The document is a ChatGPT export: a single user prompt followed by a single model response. The prompt is a request for synthesis and specification authoring. The response is a multi-part synthesis covering:

1. **Classification of linked resources** into four distinct source classes
2. **Protocol consequences** for Entif/Rosetta architecture
3. **Priority tier ordering** for source ingestion
4. **Announcement of three companion artifacts** produced by the model during the session

The model also documents its internal chain-of-thought (CoT) reasoning across 66 steps prior to producing the final synthesis.

---

## Findings (full detail)

### Finding 1 — Four Distinct Source Classes Must Be Modeled Separately

- **Concept:** The linked resources fall into four distinct classes, and Entif must model them separately rather than collapsing them into a single source category.
- **Evidence:** "The resources you linked fall into four distinct classes, and Entif should model them that way." (model synthesis, final response)
- **Class 1 — Origin and Stewardship Surfaces:** Zenodo, Figshare, Dataverse, SWISSUbase, DaSCH. These host records, files, versions, rights, and preservation promises, each differently.
- **Class 2 — Source-Intelligence and Policy-Evidence Surfaces:** re3data, SNSF guidance, EPFL guidance, the Generalist Repository Comparison Chart. These are not primary evidence for the truth of a dataset's contents; they are evidence about source suitability, stewardship, and compliance posture.
- **Class 3 — PID and Graph Infrastructure:** DataCite, Crossref, ORCID, ROR, SWHID. These provide identifier resolution, identity anchoring, and relationship infrastructure.
- **Class 4 — Graph Enrichers and Disambiguators:** OpenAIRE Graph, ScholeXplorer (Scholix hub), OpenAlex. These enrich, reconcile, traverse, and corroborate relationships but are not primary custodians of underlying artifacts.
- **Implication:** Rosetta's source model must distinguish these classes rather than treating all external sources uniformly. Each class has different trust semantics and protocol implications.

---

### Finding 2 — FSA/MEBS as Diagnostic, Not Standard

- **Concept:** The LightsOnData FSA/MEBS piece is useful as a diagnosis of the disease (fragmented data, competing semantics, modeling formalisms that do not converge) rather than as a standard to adopt.
- **Evidence:** "The LightsOnData FSA/MEBS piece is useful here less as a standard than as a diagnosis of the disease: fragmented data, competing semantics, and modeling formalisms that do not converge." (model synthesis)
- **Implication:** Entif should learn from FSA/MEBS failure modes — specifically the temptation to silently absorb outside authorities into one fake universal ontology — and resist that temptation. Rosetta's pack architecture and external-authority binding approach is the correct alternative.

---

### Finding 3 — Rosetta Anti-Rot Rule: URLs Alone Are Never Enough

- **Concept:** The ROCK anti-rot rule that URLs alone are never enough applies directly to source acquisition. Rosetta must store content hashes, retrieval metadata, excerpts, and snapshots alongside URLs.
- **Evidence:** "ROCK's anti-rot rule that URLs alone are never enough: store content hashes, retrieval metadata, excerpts, and snapshots." (model synthesis)
- **Implication:** Every source acquisition event must record: what was fetched, from where, when, through which path, who authored it, corroborating sources, who hosts it, what identifier resolves it, applicable licenses, what changed over time, and confidence vectors.

---

### Finding 4 — Source Substrate Domain: Missing Constitutional Layer

- **Concept:** The resources expose a missing constitutional layer in the Rosetta protocol suite: a **Source Substrate** domain. Instead of a single `source` field, it requires separation of: source system, record identity, manifestation identity, acquisition event, hosting/custody, publication context, identifier bindings, authorship claims, identity evidence, rights context, lifecycle events, and evaluation receipts.
- **Evidence:** "Entif should add a first-class **Source Substrate** domain." (model synthesis); "Instead of a single `source` field, it separates source system, record identity, manifestation identity, acquisition event, hosting/custody, publication context, identifier bindings, authorship claims, identity evidence, rights context, lifecycle events, and evaluation receipts." (model synthesis)
- **Implication:** Rosetta needs a new major protocol section (analogous to existing packs like ROCK, OMOC, governance addenda) governing the Source Substrate. This is structural, not optional.

---

### Finding 5 — Multiple Provenance Lanes Are Non-Interchangeable

- **Concept:** Entif must formalize multiple provenance lanes rather than one chain, because the following are not interchangeable: acquisition provenance, publication provenance, custody provenance, authorship provenance, identity-resolution provenance, derivation provenance, rights provenance, and evaluation provenance.
- **Evidence:** "It also formalizes multiple provenance lanes rather than one chain, because acquisition provenance, publication provenance, custody provenance, authorship provenance, identity-resolution provenance, derivation provenance, rights provenance, and evaluation provenance are not interchangeable." (model synthesis)
- **Implication:** Each provenance lane must be a first-class protocol object with its own schema and evaluation semantics. Collapsing them into a single provenance chain loses critical epistemic distinctions.

---

### Finding 6 — Trust Must Be Multidimensional

- **Concept:** Trust must be treated as separate axes rather than a single scalar: artifact integrity, record identity, authorship, institutional affiliation, stewardship quality, review rigor, metadata richness, license clarity, correction responsiveness, manipulation risk, identity risk, novelty yield, rarity yield, corroboration density, and invalidation sensitivity.
- **Evidence:** "The new spec treats artifact integrity, record identity, authorship, institutional affiliation, stewardship quality, review rigor, metadata richness, license clarity, correction responsiveness, manipulation risk, identity risk, novelty yield, rarity yield, corroboration density, and invalidation sensitivity as separate axes." (model synthesis)
- **Implication:** Rosetta needs a multidimensional trust model with separate trust vector fields per axis. The question "is this trustworthy?" must be decomposed into "trustworthy for what purpose, under what conditions, with what confidence, and what would invalidate it?"

---

### Finding 7 — PID/Identity Spine Enables Critical Distinctions

- **Concept:** The PID and graph infrastructure (DataCite, Crossref, ORCID, ROR, SWHID) lets Entif distinguish: "the repository says this," "the identifier authority says this," "the person self-asserted this," and "a graph enricher inferred this." That distinction is exactly what the protocol needs.
- **Evidence:** "These are the systems that let Entif distinguish 'the repository says this,' 'the identifier authority says this,' 'the person self-asserted this,' and 'a graph enricher inferred this.' That distinction is exactly what your protocol needs." (model synthesis)
- **Implication:** Entif must bind to these identity infrastructure systems (DataCite, Crossref, ORCID, ROR, SWHID) as first-class protocol elements. Without them, source identity claims cannot be disambiguated from custodial claims or inference.

---

### Finding 8 — Source-Family Taxonomy Required

- **Concept:** A broad taxonomy of source families is needed covering: research repo, commercial repo, preprint server, registry, identity provider, news outlet, social media, forum, blog, book, email, comment, code commit, review, and potentially others. Each family has different metadata richness, preservation strength, and typical risks.
- **Evidence:** "A broad taxonomy could cover source families like social media, emails, forums, code commits, reviews, etc." (CoT); "For each source family...define columns like examples, role, preservation strength, metadata richness, and typical risks." (CoT)
- **Implication:** Rosetta needs a source-family taxonomy as part of the Source Substrate domain. Each family should have a recommended hydration policy and epistemic profile.

---

### Finding 9 — Packaging Standards: RO-Crate, Croissant, CDIF

- **Concept:** RO-Crate 1.1 provides JSON-LD research-object packages with root data entities and contextual entities. Croissant 1.1 provides machine-actionable dataset metadata with explicit provenance hooks via PROV-O. CDIF provides a cross-domain FAIR "lingua franca" made from aligned standards rather than one sovereign ontology — described as "very Rosetta-coded."
- **Evidence:** "RO-Crate 1.1 gives a JSON-LD research-object package with a root data entity and contextual entities." (model synthesis); "Croissant 1.1 gives machine-actionable dataset metadata, explicit provenance hooks via PROV-O, vocabulary interoperability, and governance-oriented metadata for responsible use." (model synthesis); "CDIF is especially relevant to your longer arc because it is explicitly trying to provide a cross-domain FAIR 'lingua franca' made out of aligned standards rather than one sovereign ontology. That is very Rosetta-coded." (model synthesis)
- **Implication:** Rosetta should support RO-Crate and Croissant as ingestion transport formats. CDIF's multi-aligned-standards approach to interoperability should inform how Rosetta handles cross-repository metadata alignment.

---

### Finding 10 — Early-Priority Source Tiers

- **Concept:** Sources should be prioritized in four tiers:
  - **Tier 0 (Identity and Relationship Spine):** DataCite, Crossref, ORCID, ROR, re3data, OpenAIRE, OpenAlex, Software Heritage/SWHID
  - **Tier 1 (High-Value Repository Surfaces):** Zenodo, Figshare, Dataverse, SWISSUbase, DaSCH
  - **Tier 2 (Packaging and Transport):** RO-Crate, Croissant — with CDIF shaping interoperability profile
  - **Tier 3 (Domain Repositories and Standards Bodies):** discipline-specific repositories
  - **Tier 4 (Volatile Discourse Sources):** blogs, forums, comments, mainstream media — epistemically valuable but metabolically expensive and identity-risky
- **Evidence:** "My priority order is now pretty sharp. Tier 0 should be the identity and relationship spine... Tier 1 should be high-value repository surfaces... Tier 2 should be packaging and transport... Tier 3 is domain repositories and standards bodies. Only after that would I spend serious energy on volatile discourse sources." (model synthesis)
- **Implication:** Rosetta's early ingestion work should focus on Tier 0 and Tier 1 sources. Tier 4 sources (blogs, forums, comments, mainstream media) should be explicitly deprioritized in early builds due to high epistemic cost and identity risk.

---

### Finding 11 — Anti-Personhood-Correlation Requirement

- **Concept:** The protocol must explicitly guard against personhood-correlation and cognitive-fingerprint abuse as Entif becomes better at connecting authorship, discourse, and identity signals across repositories and platforms.
- **Evidence:** "It also keeps Entif from sleepwalking into personhood-correlation and cognitive-fingerprint abuse as it becomes better at connecting authorship, discourse, and identity signals across repositories and platforms." (model synthesis)
- **Implication:** The Source Substrate spec must include ethical constraints on identity-correlation uses. This is a governance/ethics concern that must be embedded in the protocol architecture, not added as an afterthought.

---

### Finding 12 — Three Companion Artifacts Produced During Session

- **Concept:** The model produced three companion artifacts during the chat session:
  1. **Entif/Rosetta Addendum: Source Substrate, Repository Stewardship, Multi-Provenance, and Trust Graph Design** — the constitutional and architectural thesis
  2. **Source Registry and Repository Profile Annex** — operational table of source families, capability profiles, and early-ingestion priority
  3. **Entif Source Record Schema Draft** — concrete contract for `entif.source.record`
- **Evidence:** "I turned all of that into three companion artifacts. Entif / Rosetta Addendum: Source Substrate, Repository Stewardship, Multi-Provenance, and Trust Graph Design... Source Registry and Repository Profile Annex... Entif Source Record Schema Draft." (model synthesis); CoT mentions filenames: `20260413 - Entif Rosetta Addendum - Source Provenance, Repository Intelligence, and Trust Substrate.md`, `20260413 - Entif Source Taxonomy and Repository Priority Matrix.md`, `20260413 - Entif Source Pack Drafts.yaml`
- **Implication:** These three artifacts (or their updated equivalents) should be created as actual files in the Rosetta corpus. They represent the first concrete deliverables for the Source Substrate domain.

---

### Finding 13 — Specific Repository Capability Notes

- **Concept:** Specific repository characteristics that inform source profiling:
  - **Zenodo:** metadata + files + PID, public metadata even when files restricted, concept/version DOI families for versioning, community grouping, GitHub synchronization, OAI-PMH exposure, REST API
  - **Figshare:** public items with DOI workflows, DataCite-shaped metadata, ORCID integration, per-version citation behavior, metadata schema
  - **Harvard Dataverse:** open-source repository software vs. repository instance distinction, PIDs, harvesting, rich metadata blocks, restricted/embargoed access support
  - **SWISSUbase:** Swiss hosting, personalized support, national/stewardship framing, FAIR guidance
  - **DaSCH:** Swiss domain-specific stewardship, multilingual/discipline-specific metadata, expert curation, secure hosting, FAIR framing, machine interfaces, long-term availability with persistent identifiers, high-quality source-profile schema exemplar
  - **re3data:** open CC0 registry with schema and API for repository capabilities
- **Evidence:** "Zenodo records are explicitly metadata + files + PID, with public metadata even when files are restricted, and with concept/version DOI families for versioning."; "Figshare couples public items to DOI workflows, DataCite-shaped metadata, ORCID integration, and per-version citation behavior."; "Dataverse distinguishes repository software from repository instance and supports PIDs, harvesting, rich metadata blocks, and restricted or embargoed access."; "SWISSUbase and DaSCH add another pattern: national or domain-specific stewardship, multilingual or discipline-specific metadata, expert curation, secure hosting, FAIR framing, and machine interfaces."; "re3data is an open CC0 registry with schema and API for repository capabilities." (all from model synthesis)
- **Implication:** Each repository type requires a distinct source profile in Rosetta. The profile captures the specific PID scheme, metadata standard, access model, and preservation posture of each platform.

---

### Finding 14 — Core Principle: External Standards Stay External

- **Concept:** Rosetta's posture toward external standards: external standards stay external, but are made interoperable through profiles and mappings. The temptation to silently absorb outside authorities into one fake universal ontology must be refused.
- **Evidence:** "Keep the core minimal, treat external systems as packs and anchors, and refuse the temptation to silently absorb outside authorities into one fake universal ontology." (model synthesis); "external standards stay external, but are made interoperable through profiles and mappings." (model synthesis)
- **Implication:** The Source Substrate is not a project to create a new universal source ontology. It is a framework for correctly binding to existing external source infrastructure while maintaining Rosetta's identity independence. This principle should be explicit in the constitutional language of the addendum.

---

## Concept Cross-Reference

- **Source Substrate** — new first-class protocol domain proposed in this chat; distinct from but related to existing Rosetta packs
- **Multi-Provenance** — eight distinct provenance lanes defined (acquisition, publication, custody, authorship, identity-resolution, derivation, rights, evaluation); cf. ROCK provenance work
- **Trust Graph** — multidimensional trust model across 15 axes; distinct from simple confidence scoring
- **Source Taxonomy** — source-family classification system; cf. OMOC tranche taxonomy for structural parallels
- **Entif Source Record** — proposed `source.record` schema; cf. `artifact.record`, `identity.record` in existing Rosetta spine
- **CDIF / FAIR Metadata / Croissant** — interoperability standards that inform cross-repository metadata alignment approach; cf. SKOS/SHACL/PROV-O posture in existing Rosetta
- **Personhood-Correlation / Cognitive-Fingerprint Abuse** — ethical constraint surfaced during this discussion; likely needs governance language in Source Substrate spec

---

## Evidence Sources Informing This Extraction

1. [LightsOnData — FSA/MEBS Enterprise Modeling](https://www.lightsondata.com/fsa-mebs-enterprise-modeling/) — diagnosis of fragmentation disease
2. [SPARC — Zenodo's Open Repository Streamlines Sharing Science](https://sparcopen.org/impact-story/zenodos-open-repository-streamlines-sharing-science/) — repository stewardship framing
3. [Zenodo — FAIR Metadata with Semantic Croissant and CDIF](https://zenodo.org/records/18116915) — FAIR packaging standards
4. [Figshare](https://figshare.com/) — commercial research repo exemplar
5. [re3data.org](https://www.re3data.org/) — open CC0 repository registry with schema and API
6. [Graduate Institute LibGuides — Zenodo](https://libguides.graduateinstitute.ch/rdm/zenodo) — repository guidance
7. [SWISSUbase](https://www.swissubase.ch/en/) — Swiss national repository
8. [Harvard Dataverse](https://dataverse.harvard.edu/) — institutional dataverse exemplar
9. [SNSF — Open Research Data Repositories](https://www.snf.ch/en/WtezJ6qxuTRnSYgF/topic/open-research-data-which-data-repositories-can-be-used) — policy-evidence surface
10. [Generalist Repository Comparison Chart (DOI 10.5281/zenodo.7189481)](https://doi.org/10.5281/zenodo.7189481) — repository decision aid
11. [EPFL — Data Repositories and Related Platforms](https://www.epfl.ch/campus/library/services-researchers/data-publication/data-repositories-and-related-platforms/) — institutional guidance
12. [DaSCH Swiss](https://dasch.swiss/services/) — domain-specific stewardship
13. [DataCite Metadata Schema](https://support.datacite.org/docs/datacite-metadata-schema) — PID metadata spine
14. [DataCite — Retrieve DOI Metadata](https://support.datacite.org/docs/api-get-doi) — PID API
15. [Crossref REST API](https://www.crossref.org/documentation/retrieve-metadata/rest-api/) — scholarly metadata and relationships
16. [ORCID for Researchers](https://info.orcid.org/researchers/) — person identity infrastructure
17. [ROR — Research Organization Registry](https://ror.org/) — organization identity infrastructure
18. [Software Heritage — SWHID](https://www.softwareheritage.org/) — intrinsic software artifact identity
19. [RO-Crate 1.1 Metadata Specification](https://www.researchobject.org/ro-crate/specification/1.1/metadata.html) — JSON-LD research object packaging
20. [Croissant Format Specification](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) — machine-actionable dataset metadata
21. [Schema.org Dataset Type](https://schema.org/Dataset) — web-scale dataset metadata
22. [Dublin Core Metadata Initiative](https://www.dublincore.org/resources/glossary/dublin_core/) — cross-domain metadata vocabulary
23. [GO FAIR — FAIR Principles](https://www.go-fair.org/fair-principles/) — data stewardship principles
24. [SPDX — Handling License Information](https://spdx.dev/learn/handling-license-info/) — license clarity infrastructure
25. [OpenAlex API Overview](https://docs.openalex.org/how-to-use-the-api/api-overview) — open scholarly catalog with author disambiguation
26. [OpenAIRE Graph](https://graph-beta.openaire.eu/what-is-the-openaire-graph) — large-scale scholarly knowledge graph
27. [NCBI E-utilities API](https://www.ncbi.nlm.nih.gov/dataguide/eutilities/what_is_eutilities.html) — PubMed API access
28. [OSF API](https://help.osf.io/article/393-api-integrations) — open science framework API
29. [InvenioRDM](https://inveniordm.web.cern.ch/) — repository software powering Zenodo/CERN
30. [Zenodo Infrastructure](https://about.zenodo.org/infrastructure/) — Zenodo architecture and PID handling
