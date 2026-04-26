# Entif / Rosetta Addendum: Source Substrate, Repository Stewardship, Multi-Provenance, and Trust Graph Design

Date: 2026-04-13
Status: Draft addendum for Rosetta / Entif protocol suite
Intended relationship to existing corpus: companion addendum to Rosetta v3.0.0 Core Spine, ROCK-31XX, OMOC, Swarm Gnosis, and taxonomy / pack work.

## 0. Executive synthesis

The linked resources do **not** merely suggest that Entif should add "more repository connectors." They imply a deeper architectural demand:

**Entif must treat source systems, repositories, registries, aggregators, identifier authorities, indexers, mirrors, and stewardship frameworks as distinct first-class protocol objects.**

That is the central synthesis.

The repository ecosystem you pointed at is quietly teaching several lessons:

1. **A source is never just one thing.**
   A Zenodo record is a publication surface, a DOI-bearing object, a metadata object, a hosted file bundle, a version family, a rights declaration, a repository policy context, and often a downstream index target. Similar statements hold for Figshare, Dataverse, DaSCH, and national platforms.

2. **The same artifact can have multiple authorities at once.**
   The bytes may be hosted in one place, the DOI may be minted by another infrastructure, the author identity may be asserted through ORCID, the institution may be resolved through ROR, the citation graph may be enriched by Crossref or OpenAIRE, and the software artifact may have a parallel intrinsic identity via SWHID.

3. **Selection guides and registries are not the same thing as repositories, but they are operationally important.**
   re3data, funder guidance pages, library guides, and comparison charts are not primary evidence sources for the content of a dataset. They are evidence about repository suitability, stewardship posture, discoverability affordances, compliance expectations, and ecosystem topology.

4. **Rich metadata is not optional if Entif wants to scale without drowning.**
   FAIR, DataCite, Dataverse, Croissant, RO-Crate, OpenAIRE Graph, and allied infrastructures all converge on the same lesson: discoverability, interoperability, provenance, machine use, and re-use depend on structured metadata, persistent identifiers, explicit relationships, and lifecycle events.

5. **Trust is not a scalar.**
   You do not want "sourceTrust = 0.84" and call it a day. You want orthogonal dimensions: identity confidence, artifact integrity, stewardship quality, review posture, citation connectedness, preservation expectation, license clarity, correction behavior, coercion / manipulation risk, and so on.

6. **Entif should not collapse external identity into Rosetta-native identity.**
   Rosetta already points in the right direction: external systems remain external authorities and are incorporated via packs / anchors rather than absorbed into a monolithic "one true ontology." This addendum extends that posture specifically to repository and source ecosystems.

7. **The right early move is not universal ingestion.**
   The right early move is a **source substrate** and **source registry** that can classify, score, normalize, deduplicate, and cross-relate many classes of sources while keeping provenance loss visible.

In plainer language: before Entif tries to drink the ocean, it needs a vascular system.

This addendum defines that vascular system.

---

## 1. Why these linked resources matter to Entif

### 1.1 Repository platforms are design exemplars, not just ingestion targets

Zenodo, Figshare, Dataverse, SWISSUbase, and DaSCH are useful not only because they contain research outputs, but because each embodies a different combination of:

- stewardship and curation,
- identifier policy,
- versioning behavior,
- preservation promises,
- rights and access controls,
- machine interfaces,
- metadata richness,
- community scope,
- and interoperability posture.

Entif should model those differences explicitly because later reasoning quality depends on them.

### 1.2 Registries and comparison layers are repository intelligence sources

re3data, repository comparison charts, library guidance pages, and funder guidance pages are not the same as datasets. They are **meta-sources about sources**. They tell us:

- which repositories exist,
- which communities trust them,
- what metadata or PID support they offer,
- whether they are generalist or domain-specific,
- whether they meet funder criteria,
- and how they should be selected or interpreted.

Those are exactly the kinds of facts a galactic-scale knowledge system must store as first-class knowledge objects.

### 1.3 Scholarly graph infrastructure is a multiplier

Crossref, DataCite, ORCID, ROR, OpenAIRE, OpenAlex, Scholix / ScholeXplorer, and SWHID show that the highest-leverage knowledge systems are not just repositories. They are **interlinking infrastructures**.

Entif should therefore distinguish:

- origin repositories,
- metadata registries,
- graph enrichers,
- PID authorities,
- and derived scholarly knowledge graphs.

### 1.4 Packaging standards are the bridge between ingestion and transport

RO-Crate and Croissant are crucial because they illuminate a future in which source metadata is not just scraped and normalized internally. It is also **portable as a package** across systems. That strongly aligns with Rosetta tiles / tapestries and with Swarm Gnosis.

### 1.5 Your higher-level aim requires more than content provenance

You explicitly want to infer over trustworthiness, worldview, intent, methodology, bias, rationale, preference, review history, and what would falsify current beliefs. That cannot be done if Entif stores only:

- raw bytes,
- URL,
- fetched_at,
- and guessed author.

It requires a multi-layer model of the source ecology around each artifact.

---

## 2. Primary thesis for the protocol suite

### 2.1 New constitutional thesis

**Every externally acquired artifact SHALL be represented through a multi-object source model rather than a single flat source field.**

At minimum, Entif / Rosetta SHALL separately model:

1. **Artifact identity** - the actual thing acquired or referred to.
2. **Manifestation identity** - a specific downloadable / viewable embodiment of that thing.
3. **Acquisition event** - how, when, and under what conditions Entif obtained it.
4. **Hosting / custody context** - where it was fetched from and who serves it.
5. **Publication context** - which platform / repository / feed / forum / archive made it available.
6. **Identifier bindings** - DOI, Handle, ORCID, ROR, SWHID, URL, local record ID, etc.
7. **Authorship / agency claims** - who is said to have made or issued it.
8. **Identity evidence** - what supports or weakens those authorship claims.
9. **Stewardship / review posture** - curation, moderation, peer review, screening, or lack thereof.
10. **Rights / policy context** - access limits, licensing, embargoes, usage constraints.
11. **Lifecycle events** - corrections, retractions, supersessions, deletions, new versions.
12. **Trust and invalidation analysis** - Entif's current view of confidence, caveats, and what would change that view.

### 2.2 Non-collapse rule

No single object SHALL simultaneously stand in for all of the following:

- the record,
- the bytes,
- the platform,
- the publisher,
- the custodian,
- the claimed author,
- and the verified identity of that author.

Those are distinct.

### 2.3 External-authority rule

Rosetta MUST preserve its existing discipline:

- external identifiers remain anchored external authorities,
- external repositories remain external authorities in their domains,
- Entif stores mappings and judgments,
- but Entif does not silently replace those authorities with a Rosetta-native fake equivalent.

### 2.4 Multi-provenance rule

For every non-trivial artifact, provenance SHALL be represented in multiple dimensions, not a single chain:

- acquisition provenance,
- derivation provenance,
- authorship provenance,
- custody provenance,
- publication provenance,
- licensing provenance,
- identity-resolution provenance,
- and evaluation provenance.

---

## 3. Conceptual synthesis of the linked ecosystem

### 3.1 What Zenodo teaches

Zenodo shows the value of a general-purpose repository that:

- can host many research object types,
- mints DOIs,
- preserves version-specific records,
- keeps metadata public even when files are access-restricted,
- and links software release workflows to archival flows.

For Entif, the implication is not "Zenodo adapter." The implication is:

- support concept DOI vs version DOI families,
- separate public metadata from file accessibility,
- support software-specific metadata overlays,
- and treat repository workflows as evidence about preservation and publication posture.

Zenodo's GitHub and software flows also show that repository metadata may be partially derived from source control conventions such as `CITATION.cff`, `.zenodo.json`, and CodeMeta-like fields. That means Entif needs cross-surface source fusion, not repository-only parsers.

### 3.2 What Figshare teaches

Figshare emphasizes broad file-type support, DataCite DOI minting, browser preview, version control, ORCID linkage, and integrity checks such as MD5 display. It also makes clear that metadata and public dissemination workflows can be relatively open even when heavy curation is limited.

For Entif, the implication is that trust should not be inferred from polish or DOI presence alone. A platform can have strong PID and metadata affordances while still varying in curation depth. So Entif needs separate trust dimensions for:

- identifier quality,
- metadata richness,
- integrity checks,
- and review / curation rigor.

### 3.3 What Dataverse and Harvard Dataverse teach

Dataverse demonstrates a repository pattern with strong support for:

- data citation,
- version-aware datasets,
- file-level and dataset-level identifiers,
- harvesting and exchange via metadata standards,
- variable-level metadata and full-text indexing in some cases,
- restrictions and terms of use alongside open metadata,
- and machine interfaces for deposit, search, access, and metrics.

It also illustrates the difference between repository software and a specific repository instance. Harvard Dataverse is one deployment, not the entire concept.

For Entif, this means:

- source typing must distinguish platform software from repository instance,
- repository instance from specific collection / dataverse / dataset,
- and dataset from exported codebook / API view / downloadable manifestation.

Dataverse's long-standing use of UNF-style fingerprints on tabular data is also a reminder that content identity sometimes needs more than ordinary file checksums; domain-specific fingerprints can be important.

### 3.4 What re3data teaches

re3data is not itself a dataset repository. It is a global registry of research data repositories with an open schema, API, and open metadata. It tells Entif that source intelligence can itself be structured and harvested.

For Entif this is critical:

- source registries should be ingestible as high-value meta-sources,
- repository capability profiles should be machine-readable,
- and repository selection knowledge should be explicit rather than buried in human habit.

### 3.5 What SWISSUbase teaches

SWISSUbase foregrounds projects, datasets, persons, institutions, contracts, downloads, multilingual and discipline-specific metadata, expert curation, and secure Swiss hosting. This is a powerful reminder that repository systems can be shaped around national governance and domain specificity, not just general upload mechanics.

For Entif, that implies:

- contracts and download rights may need to be modeled as first-class access objects,
- multilingual metadata is not an edge case,
- persons and institutions may be platform-native entities with their own identifiers,
- and national / legal hosting context can affect trust, rights, and retention policies.

### 3.6 What SNF and the library / funder guides teach

The Swiss National Science Foundation repository guidance page is valuable because it encodes repository selection criteria from a funder perspective. Library guides from EPFL and the Graduate Institute serve a similar role: they are curation layers about where one should put or find data.

For Entif, such pages should not be treated as primary evidence for underlying research claims. They should be treated as:

- repository-governance evidence,
- repository-suitability evidence,
- and policy / compliance evidence.

### 3.7 What DaSCH teaches

DaSCH is especially important for Entif because it is close to your own aspirations. It is not just a dump-and-forget repository. It combines archive, metadata, application, API, tools, and ingest components around FAIR humanities data and long-term stewardship.

It implies that mature source ecosystems often have at least these layers:

- user-facing application,
- API / graph / data core,
- ingest tooling,
- metadata services,
- preservation services.

That maps uncannily well onto Rosetta / Entif's pack, ingestion, storage, graph, and viewer layers.

### 3.8 What OpenAIRE, Scholix / ScholeXplorer, OpenAlex, Crossref, DataCite, ORCID, and ROR teach

These infrastructures show that the real research ecosystem is an identity-and-relationship lattice:

- DataCite defines rich metadata for research objects.
- Crossref exposes open metadata and work relationships, including data citations.
- ORCID identifies people.
- ROR identifies organizations.
- OpenAIRE aggregates and enriches a very large scholarly graph from many validated content providers and registries.
- OpenAlex disambiguates and links works, authors, institutions, and more.
- Scholix / ScholeXplorer focuses on publication-dataset and object-object links.

For Entif, this means source modeling must be able to represent:

- object <-> object links,
- person <-> work links,
- institution <-> person and institution <-> work links,
- and the difference between asserted and algorithmically matched relationships.

### 3.9 What RO-Crate, Croissant, Semantic Croissant, and CDIF teach

RO-Crate shows how to package research objects and contextual metadata as portable JSON-LD crates.
Croissant shows a machine-readable metadata vocabulary for datasets, especially ML datasets, using JSON-LD and schema.org-derived patterns.
Semantic Croissant / CDIF point toward a future where dataset descriptions carry stronger semantic and cross-domain interoperability hooks.

For Entif this means:

- tiles and tapestries should be exportable or representable through portable packaging profiles,
- packaging should preserve contextual entities such as persons, organizations, software, equipment, workflows, and licenses,
- and source descriptions should include both human and machine affordances.

### 3.10 What SWHID teaches

SWHID demonstrates that some classes of sources need **intrinsic, content-based identifiers** that do not depend on a central registry. That is deeply aligned with content-addressed Rosetta tiles.

For Entif, software and code ingestion should distinguish:

- repository URL,
- Git commit or release tag,
- package manager identity,
- DOI (if archived in Zenodo / DataCite),
- and intrinsic software hash identity (e.g. SWHID).

### 3.11 What the FSA / MEBS modeling article contributes

This article is not a normative standard, but it contributes an important design instinct: do not leave semantics, process, state, and constraints as separate floating islands if your goal is deterministic large-scale system coherence.

For Entif, the right interpretation is not adopting its claims wholesale. The right interpretation is:

- source and repository modeling should be mathematically / structurally disciplined,
- repository intelligence should not be bolted on later,
- and operational models should be close enough to semantics that the system can reason over source ecologies, not just store them.

---

## 4. New protocol domain: the Source Substrate

I propose a new Rosetta / Entif constitutional domain:

**Source Substrate**

Definition:
The Source Substrate is the domain concerned with the representation, classification, acquisition, linking, evaluation, packaging, retention, and governance of all external and internal information sources, source systems, source records, manifestations, and source-derived claims.

### 4.1 Responsibilities

The Source Substrate SHALL:

- classify source systems by facet rather than one rigid tree,
- preserve multiple provenance dimensions,
- bind external identifiers without collapsing them into Rosetta identity,
- separate record identity from artifact identity,
- support repository, registry, and graph infrastructures,
- support machine-readable capability profiles for sources,
- support trust scoring as a vector, not scalar,
- track lifecycle events such as retraction, supersession, embargo, and access changes,
- and expose all of the above to retrieval, evaluation, guard, and bundle systems.

### 4.2 It SHALL NOT

- claim that a DOI alone proves truth,
- equate platform account name with verified real-person identity,
- equate repository hosting with authorship,
- treat mirrors and canonical records as identical without explicit relation,
- or silently merge conflicting identity claims.

---

## 5. Core object model additions

Below are proposed object families. They can be realized as Rosetta tile kinds, pack-specific tile kinds, or pack-specific overlays referencing core tiles.

### 5.1 Source system objects

#### `source.system`
Represents a platform or source system.
Examples:
- Zenodo,
- Figshare,
- Harvard Dataverse,
- Dataverse software platform,
- Crossref,
- DataCite,
- ORCID,
- ROR,
- OpenAIRE Graph,
- OpenAlex,
- a specific news site,
- a forum,
- a mailing list system,
- a Git forge.

Key fields:
- source_system_id
- canonical_name
- source_kind
- operator_orgs
- jurisdiction
- pid_support
- metadata_profiles_supported
- api_profiles_supported
- access_models_supported
- curation_posture
- review_posture
- preservation_posture
- correction_policy_summary
- source_policy_refs
- source_license_metadata
- trust_baseline_profile

#### `source.registry`
Represents a registry about sources.
Examples:
- re3data,
- OpenDOAR,
- FAIRsharing,
- a private internal repository registry.

#### `source.graph_infrastructure`
Represents an interlinking / enrichment graph service.
Examples:
- OpenAIRE Graph,
- OpenAlex,
- Crossref relationship layer,
- ScholeXplorer.

### 5.2 Artifact and manifestation objects

#### `source.record`
Represents a record in a source system.
Examples:
- a Zenodo record,
- a Figshare item,
- a Dataverse dataset,
- a Crossref work record,
- a forum thread,
- a blog post page.

Key fields:
- record_local_id
- source_system_ref
- stable_locator_set
- record_title
- record_type
- publication_status
- created_at_claimed
- updated_at_claimed
- version_label_claimed
- rights_summary
- metadata_blob
- metadata_profile_refs
- source_collection_ref
- record_lineage_refs

#### `source.manifestation`
Represents a concrete manifestation of a record.
Examples:
- HTML landing page,
- PDF file,
- ZIP dataset download,
- API JSON response,
- OAI-PMH metadata record,
- RIS export,
- CSV file,
- codebook export,
- screenshot,
- local snapshot blob.

Key fields:
- manifestation_kind
- media_type
- byte_hashes
- canonicalization_profile
- size_bytes
- rendered_from_record
- access_requirements
- fetchable_url
- content_language
- structure_profile
- manifestation_timestamp

#### `source.package`
Represents a portable packaging form.
Examples:
- RO-Crate package,
- Croissant metadata package,
- source bundle export,
- Rosetta tapestry import / export package.

### 5.3 Event objects

#### `source.fetch_receipt`
Represents an acquisition event.

Key fields:
- requested_locator
- resolved_locator
- fetched_at
- method
- requester_identity
- auth_context_used
- robots_or_terms_context
- response_code
- bytes_received
- snapshot_hash
- parser_used
- extraction_profile
- errors_or_warnings

#### `source.normalization_receipt`
Represents the transformation from fetched manifestation into normalized internal forms.

#### `source.identity_resolution_receipt`
Represents the process that linked a claimed author / institution / funder / repository to one or more external identifiers or internal entities.

#### `source.evaluation_receipt`
Represents trust, rights, provenance, risk, and validity analysis.

### 5.4 Agency and claim objects

#### `source.authorship_claim`
A claim that one or more actors created or issued a work.

#### `source.custody_claim`
A claim about who hosts, stewards, or preserves the artifact.

#### `source.publication_claim`
A claim about where / when / how the artifact was published.

#### `source.identity_evidence`
Evidence about identity mappings.
Examples:
- ORCID binding,
- verified institutional profile,
- signed release,
- repository account link,
- prior publication linkage,
- stylometric evidence (identity-sensitive and policy-gated),
- ROR affiliation resolution,
- domain / email authority.

#### `source.review_claim`
Captures claims about peer review, moderation, editorial checks, spam screening, or lack thereof.

#### `source.correction_event`
Correction, retraction, withdrawal, supersession, versioning event, policy takedown, metadata update.

---

## 6. Facet-based source classification model

Do not force one source tree. Use orthogonal facets.

### 6.1 Facet A: source role

- primary repository
- institutional repository
- disciplinary repository
- generalist repository
- identifier authority
- metadata registry
- scholarly graph aggregator
- citation graph service
- code forge
- package registry
- standards body
- news / media outlet
- blog / essay platform
- discussion forum
- social platform
- ecommerce / review platform
- messaging / email source
- archival mirror
- internal file store
- internal operational log

### 6.2 Facet B: stewardship posture

- unmanaged self-publish
- moderated but lightly curated
- curated repository
- reviewed repository
- preservation-focused archive
- registry / index only
- graph enrichment service
- institutional / national infrastructure
- community-governed open infrastructure
- commercial platform

### 6.3 Facet C: access posture

- open metadata / open files
- open metadata / restricted files
- embargoed
- authenticated open
- by-request access
- contractual access
- internal only
- public landing page but gated payload

### 6.4 Facet D: identifier posture

- DOI
- Handle
- ORCID
- ROR
- SWHID
- URL only
- local record ID only
- multiple PID family
- intrinsic hash only

### 6.5 Facet E: lifecycle posture

- immutable single version
- version family
- mutable metadata / immutable files
- mutable both
- append-only event stream
- live continuously updated feed

### 6.6 Facet F: machine affordance

- HTML only
- API
- OAI-PMH
- SPARQL / RDF
- bulk snapshot
- package export
- schema publication
- content negotiation
- search endpoint

### 6.7 Facet G: trust / review posture

- unreviewed
- spam screened
- editorially screened
- peer reviewed externally
- peer review unknown
- institutional review
- community moderation
- algorithmic enrichment layer

### 6.8 Facet H: preservation promise

- none stated
- bit-level preservation
- long-term archive claim
- certified / standards-aligned preservation posture
- mirror only

### 6.9 Facet I: legal / rights posture

- clear open license
- metadata open, payload closed
- unclear or mixed rights
- contractual restriction
- personal data sensitivity
- export-control or jurisdiction-sensitive

This facet approach is highly compatible with your software taxonomy work: many classification dimensions coexist, and SHACL / profiles can constrain which combinations are valid in a given operational context.

---

## 7. Multi-provenance lattice

### 7.1 Acquisition provenance

What did Entif fetch, from where, when, by what method, under what auth context, and what exactly was received?

Minimum fields:
- fetch URL / endpoint,
- transport protocol,
- timestamp,
- requesting principal,
- auth artifacts used,
- byte hash of received body,
- parsing toolchain,
- local snapshot reference.

### 7.2 Publication provenance

What publication surface claims to publish or expose this artifact?
Examples:
- Zenodo record page,
- Figshare item page,
- Dataverse dataset landing page,
- news article URL,
- GitHub release page,
- mailing list archive.

### 7.3 Custody provenance

Who hosts or stewards the thing now?
Examples:
- CERN / OpenAIRE for Zenodo,
- institution-backed Dataverse instance,
- DaSCH as service platform,
- Swiss-hosted SWISSUbase environment.

### 7.4 Authorship provenance

Who is claimed to have created, written, issued, deposited, or otherwise authored the thing?
This MUST distinguish:
- named creator string,
- account holder,
- depositing actor,
- repository distributor,
- publisher,
- curator,
- software tool that generated a transformation.

### 7.5 Identity-resolution provenance

How do we know that "Jane Smith" here is the same or not the same as another Jane Smith elsewhere?
This may use:
- ORCID,
- ROR-linked affiliation evidence,
- repository account linkage,
- signed release metadata,
- DOI metadata,
- institutional domain evidence,
- graph-based disambiguation,
- or human curation.

Identity-resolution provenance MUST store:
- method,
- evidence set,
- confidence distribution,
- and invalidation hooks.

### 7.6 Derivation provenance

How is a new artifact derived from an older one?
This includes:
- format conversion,
- OCR,
- metadata extraction,
- translation,
- summarization,
- claim extraction,
- entity linking,
- package generation,
- graph enrichment.

### 7.7 Rights provenance

Which license, terms, embargo, consent, or use restriction applies, according to whom, and where was that assertion taken from?

### 7.8 Evaluation provenance

How did Entif arrive at its current trust / risk / relevance / novelty / value-add / resilience judgments?
This is especially important if those judgments later affect routing or retrieval.

---

## 8. Trust model: vector, not scalar

Trust should be represented as a matrix of partially independent dimensions.

### 8.1 Recommended trust axes

1. **Artifact integrity confidence**
   Confidence that the bytes referenced are stable and correctly identified.

2. **Record identity confidence**
   Confidence that this record is the canonical or appropriate record for the thing.

3. **Authorship confidence**
   Confidence in who created or issued the content.

4. **Institutional affiliation confidence**
   Confidence in the affiliation claim linking people to orgs.

5. **Repository stewardship confidence**
   Confidence in preservation, metadata maintenance, and operational continuity.

6. **Review / moderation rigor**
   Whether the content passed peer review, editorial review, moderation, or only spam checks.

7. **Metadata richness / machine usability**
   How well the thing supports discovery, interop, and automated reasoning.

8. **Correction / retraction responsiveness**
   Whether the source ecosystem visibly tracks corrections, updates, retractions, or supersessions.

9. **License clarity**
   Whether use rights are explicit and machine-interpretable.

10. **Identity abuse risk**
    Risk that identity claims are weak, synthetic, spoofed, or behaviorally inferred in a dangerous way.

11. **Manipulation / propaganda risk**
    Risk that the source is optimized for persuasion rather than accuracy.

12. **Novelty yield**
    Potential to provide new information or uncommon perspective.

13. **Rarity / scarcity yield**
    Potential to provide hard-to-find information not well represented elsewhere.

14. **Cross-source corroboration density**
    How richly the thing is linked / supported / contested by independent sources.

15. **Invalidation sensitivity**
    How easily current assumptions could be overturned by new evidence.

### 8.2 Trust categories by function

Entif should separate:
- trust for retrieval priority,
- trust for citation weight,
- trust for policy automation,
- trust for identity inference,
- and trust for public-facing proof bundles.

A source may be great for novelty scouting and terrible for public proof.

---

## 9. Lifecycle and invalidation model

### 9.1 Required lifecycle events

The model shall support:
- create / publish,
- metadata update,
- new version,
- supersession,
- correction,
- withdrawal,
- retraction,
- access change,
- rights change,
- mirror creation,
- re-hosting,
- repository migration,
- tombstone creation.

### 9.2 Invalidation hooks

Every trust-bearing object should support explicit invalidation hooks such as:
- newer version exists,
- authorship disputed,
- DOI reassigned or duplicated,
- repository record removed,
- legal hold,
- retraction or correction notice,
- broken checksum or mismatch,
- metadata no longer matches fetched manifestation,
- source policy changed.

### 9.3 Source drift rule

Raw URL alone is never enough.

Entif should follow the anti-rot rule already implicit in your provenance work:
- store content hash,
- retrieval metadata,
- excerpt or structural span,
- and optional local snapshot blob.

---

## 10. Deduplication model

### 10.1 Four-layer dedupe

Deduplication should happen at four distinct layers:

1. **Byte identity dedupe**
   Same bytes, same hash.

2. **Manifestation dedupe**
   Different URLs / exports / mirrors, same manifestation.

3. **Record-family dedupe**
   Same underlying work / dataset / release expressed as multiple records.

4. **Conceptual dedupe**
   Multiple artifacts describing or instantiating the same conceptual object.

### 10.2 Do not merge by default

Entif should cluster aggressively, merge cautiously.

A safe rule:
- dedupe proposals can be high-recall,
- canonical merges should be gated by evidence thresholds and retained as reversible assertions.

### 10.3 Recommended identity family structure

For scholarly / repository objects, maintain separate references for:
- canonical work ID,
- version family ID,
- manifestation IDs,
- external PIDs,
- intrinsic hash IDs,
- local tile IDs.

This lets Entif model cases like:
- one conceptual dataset,
- many versions,
- multiple mirrors,
- one DOI family,
- several downloadable files,
- and a local normalized tile cluster.

---

## 11. Early source priority tiers for Entif

The question is not "what can we ingest?" but "what should we prioritize if we want maximum leverage per unit of complexity?"

### Tier 0: source infrastructure and identity graph foundations

High priority because they make many later sources better.

- DataCite
- Crossref
- ORCID
- ROR
- re3data
- OpenAIRE Graph
- OpenAlex
- SWHID / Software Heritage relevant surfaces

Why first:
They improve identity resolution, citation linking, repository understanding, source selection, and trust analysis across everything else.

### Tier 1: generalist and institutional research repositories

- Zenodo
- Figshare
- Dataverse instances (especially major ones such as Harvard Dataverse)
- national / regional systems such as SWISSUbase
- domain-focused FAIR repositories such as DaSCH

Why early:
These expose structured metadata, PIDs, repository lifecycle behavior, and higher-quality scientific / data objects than the average web page.

### Tier 2: standards and normative bodies

- W3C
- IETF / RFC Editor
- MLCommons (Croissant)
- research packaging and metadata specs (RO-Crate, CodeMeta, schema.org relevant classes)

Why early:
These shape how Entif should represent and exchange meaning, packages, provenance, and validation.

### Tier 3: high-signal public knowledge and policy surfaces

- PubMed / PMC / Europe PMC
- arXiv
- government data portals and regulatory filings
- official institutional documentation and standards repositories

Why early:
Excellent signal-to-structure ratio.

### Tier 4: discussion, blogs, forums, reviews, and social sources

- LessWrong
- blogs
- product review ecosystems
- comments
- threads
- social discussions

Why later but still important:
High novelty, bias visibility, methodological insight, and cultural context, but more volatile trust posture and noisier identity claims.

### Tier 5: broad web sludge

Still important eventually, but do not start here. Too much cost for too little certainty unless the source substrate is already disciplined.

---

## 12. Proposed pack suite extensions

This addendum implies at least the following new pack family.

### 12.1 `stdpack.source-substrate@0.1`

Purpose:
Define the canonical external-source object model for source systems, repositories, registries, graph infrastructures, records, manifestations, fetch receipts, and lifecycle events.

Should include:
- source system classes,
- source role taxonomy,
- access / rights fields,
- lifecycle event classes,
- record vs manifestation separation,
- package and export objects.

### 12.2 `stdpack.scholarly-infrastructure@0.1`

Purpose:
Crosswalk Rosetta / Entif source objects to scholarly infrastructure patterns.

Mappings:
- DataCite
- Crossref
- ORCID
- ROR
- OpenAIRE
- OpenAlex
- Scholix / ScholeXplorer
- re3data

### 12.3 `stdpack.repository-capability-profile@0.1`

Purpose:
Represent repository capability profiles as machine-readable objects.

Fields:
- PID support,
- metadata schema support,
- API support,
- OAI-PMH / SPARQL / bulk availability,
- curation posture,
- preservation posture,
- access modes,
- correction / retraction support,
- software / data / publication support,
- license metadata posture.

### 12.4 `vocabpack.source-taxonomy@0.1`

Purpose:
Facet-based classification vocabularies for source roles, stewardship, lifecycle, access, trust, and content classes.

### 12.5 `stdpack.identity-and-authorship-provenance@0.1`

Purpose:
Represent authorship claims, depositor roles, institution claims, ORCID / ROR bindings, ambiguous or disputed identity states, and personhood-sensitive identity escalation hooks.

This should integrate with the existing identity-risk addendum.

### 12.6 `stdpack.retraction-correction-and-supersession@0.1`

Purpose:
Represent corrections, retractions, withdrawals, new versions, supersessions, and invalidation signals.

### 12.7 `stdpack.portable-source-packaging@0.1`

Purpose:
Define how Rosetta tiles / tapestries can import from or export to RO-Crate and Croissant-like packaging profiles where appropriate.

---

## 13. Recommended source evaluation workflow

### 13.1 Ingestion pipeline

1. **Discover source candidate**
2. **Classify source system and role facets**
3. **Acquire manifestation with fetch receipt**
4. **Extract source record metadata**
5. **Bind identifiers (DOI, ORCID, ROR, SWHID, URL, local IDs)**
6. **Resolve authorship / institution claims**
7. **Build repository capability profile (if source system not already known)**
8. **Canonicalize content and emit internal tile(s)**
9. **Run trust vector evaluation**
10. **Cluster for dedupe / equivalence proposals**
11. **Attach lifecycle watchers if source is mutable**
12. **Publish tiles / tapestries / proof bundles**

### 13.2 Retrieval workflow

At retrieval time, the system should be able to answer not only:
- what does this artifact say?

but also:
- where did it come from?
- who says who wrote it?
- what supports that identity?
- what repository policies surround it?
- what PID families identify it?
- how preserved is it likely to be?
- has it been corrected, superseded, or retracted?
- why is Entif treating it as high-value, low-value, risky, novel, or fragile?

---

## 14. Repository-specific profile sketches

### 14.1 Zenodo profile sketch

Source role:
- generalist repository
- software archive bridge
- DOI-bearing publication surface

Strengths:
- version-aware publication,
- DOI registration,
- public metadata,
- broad object-type support,
- software archiving workflows,
- repository recommendation to consider subject-specific repositories first.

Cautions:
- generalist repository means domain-specific metadata depth may vary,
- bit-level preservation does not imply semantic preservation of proprietary formats.

### 14.2 Figshare profile sketch

Source role:
- generalist repository / dissemination platform
- institutional / publisher deployment platform

Strengths:
- broad file support,
- DOI issuance,
- version control,
- ORCID linkage,
- visible integrity checks,
- broad institutional footprint.

Cautions:
- curation depth varies,
- repository polish should not be confused with domain-review rigor.

### 14.3 Dataverse / Harvard Dataverse profile sketch

Source role:
- repository software ecosystem plus specific repository instance
- strong data citation and metadata posture

Strengths:
- rich metadata and citation workflows,
- versioning,
- file and dataset identifiers,
- metadata harvesting / APIs,
- restricted files with open metadata,
- codebook / variable-level affordances.

Cautions:
- instance-specific policies vary,
- repository software capability and local deployment policy must be modeled separately.

### 14.4 re3data profile sketch

Source role:
- repository registry / source-of-sources

Strengths:
- open metadata,
- schema and API,
- capability discovery,
- excellent for source selection reasoning.

Cautions:
- not a primary content repository,
- tells us about repositories, not the truth of research claims within them.

### 14.5 SWISSUbase profile sketch

Source role:
- national research data platform
- project / dataset / person / institution / contract aware system

Strengths:
- multilingual and discipline-specific metadata,
- expert curation,
- secure hosting,
- explicit project-data relationship posture.

Cautions:
- some access paths may be contractual or mediated,
- national platform context matters for legal / governance assumptions.

### 14.6 DaSCH profile sketch

Source role:
- FAIR-oriented humanities data service platform
- archive + metadata + ingest + app + API + tools stack

Strengths:
- long-term humanities focus,
- RDF / API flavored core,
- ingest and metadata tooling,
- preservation-aware service orientation.

Cautions:
- domain specificity means not every field maps cleanly to a universal model without packs.

### 14.7 OpenAIRE / ScholeXplorer / OpenAlex profile sketch

Source role:
- graph enrichment / interlinking / aggregation layer

Strengths:
- broad cross-source linking,
- metadata enrichment,
- graph-style access,
- dedupe and relationship discovery.

Cautions:
- some relationships are imported, some enriched, some inferred,
- Entif must preserve provenance of those link origins rather than flatten them.

---

## 15. Identity-sensitive escalation

Because you explicitly want to infer trustworthiness, domain expertise, and who is trustworthy about what, this addendum must bind to the existing personhood provenance work.

### 15.1 General rule

The system may reason about:
- authorship credibility,
- institutional context,
- methodological rigor,
- track record,
- citation behavior,
- and correction behavior,

without automatically crossing into forbidden identity-fingerprinting territory.

### 15.2 Escalation threshold

When source analysis starts to rely on:
- stylometry,
- voice or behavior fingerprints,
- cross-platform same-author inference,
- quasi-biometric cognitive signatures,
- or person-model construction,

it SHALL trigger the stronger identity-sensitive governance path defined in the personhood addendum.

### 15.3 Separation of layers

Entif viewers and bundles should always distinguish:
- content provenance,
- authorship evidence,
- identity continuity evidence,
- and any model-generated identity inference.

---

## 16. Acceptance criteria

The addendum is only useful if it is testable.

### 16.1 Positive cases

1. A Zenodo dataset with DOI, version history, creators, rights, and public metadata can be represented without conflating:
   - record,
   - version,
   - manifestation,
   - creator string,
   - ORCID binding,
   - and repository host.

2. A Harvard Dataverse dataset with restricted files but public metadata can be represented such that:
   - metadata remains discoverable,
   - files remain access-controlled,
   - and rights / access constraints are explicit.

3. A repository discovered via re3data can be represented as a source capability profile even before any record from that repository is ingested.

4. A software release archived via Zenodo and also represented in Git and Software Heritage can carry:
   - Git identity,
   - DOI identity,
   - SWHID identity,
   - and repository hosting identity simultaneously.

5. A Croissant or RO-Crate description can be imported as package metadata without erasing original package structure.

### 16.2 Negative cases

1. The system MUST reject a mapping that treats a DOI as equivalent to verified author identity.
2. The system MUST reject a merge that collapses repository host and original author into the same role without explicit evidence.
3. The system MUST reject a trust score that lacks dimensional explanation.
4. The system MUST reject silently replacing an external identifier with a Rosetta core identifier.
5. The system MUST reject hiding an identity-sensitive inference behind an ordinary provenance label.

---

## 17. Practical next document set

I recommend the following immediate follow-on documents:

1. **ROCK-31YA - Source Substrate Core Pack**
2. **ROCK-31YB - Scholarly Infrastructure Alignment Pack**
3. **ROCK-31YC - Repository Capability Profile Pack**
4. **ROCK-31YD - Authorship and Identity Resolution Provenance Pack**
5. **ROCK-31YE - Correction, Retraction, and Supersession Pack**
6. **ROCK-31YF - Portable Source Packaging Pack (RO-Crate / Croissant)**
7. **ROCK-31YG - Source Trust Matrix and Invalidation Rules**

---

## 18. Final position

The right way to think about your linked resources is this:

They are not just content pools.
They are glimpses of the missing constitutional layer between raw web ingestion and a true knowledge substrate.

Entif is trying to build a civilization-scale cognition engine.
Civilization-scale cognition does not survive on documents alone.
It survives on:
- identity discipline,
- stewardship awareness,
- explicit lifecycle modeling,
- multi-axis trust,
- packaging standards,
- and source-aware provenance that can survive platform churn.

That is what this addendum is really about.

It is the difference between:

> "we fetched a PDF from some URL"

and

> "we acquired one manifestation of a versioned scholarly object from a repository hosted by a specific steward, identified by a DOI, connected to named creators with partially-resolved ORCID identities and institution claims, indexed by graph infrastructures, subject to rights constraints, with known correction and preservation posture, and evaluated under explicit trust dimensions with visible invalidation hooks."

The latter is how Entif stops becoming a majestic garbage hoard and starts becoming a durable civilization memory.
