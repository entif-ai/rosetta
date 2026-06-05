# SRC-003 — Design 8-Facet Source Classification Taxonomy

**Priority:** P2
**Labels:** docs-intake, taxonomy, source-substrate, vocabulary
**Milestone:** TBD

## Problem

Sources are currently likely classified under a single hierarchy (e.g., by domain or type), which is insufficient for modeling the multi-dimensional nature of source quality, trust, and function. A single tree cannot capture that a source can be simultaneously a "primary repository" (Facet A) + "preservation-focused archive" (Facet B) + "open metadata / restricted files" (Facet C) + "DOI-bearing" (Facet D) + "version family" (Facet E) + "API + SPARQL" (Facet F) + "peer reviewed externally" (Facet G) + "certified preservation posture" (Facet H) + "metadata open, payload closed" (Facet I).

## Expected Output

Design of the `vocabpack.source-taxonomy@0.1` vocabulary pack encoding the 8 orthogonal facets and their categories:

**Facet A — source role (20 categories):** primary repository, institutional repository, disciplinary repository, generalist repository, identifier authority, metadata registry, scholarly graph aggregator, citation graph service, code forge, package registry, standards body, news/media outlet, blog/essay platform, discussion forum, social platform, ecommerce/review platform, messaging/email source, archival mirror, internal file store, internal operational log

**Facet B — stewardship posture (10 categories):** unmanaged self-publish, moderated but lightly curated, curated repository, reviewed repository, preservation-focused archive, registry/index only, graph enrichment service, institutional/national infrastructure, community-governed open infrastructure, commercial platform

**Facet C — access posture (7 categories):** open metadata/open files, open metadata/restricted files, embargoed, authenticated open, by-request access, contractual access, internal only, public landing page/gated payload

**Facet D — identifier posture (9 categories):** DOI, Handle, ORCID, ROR, SWHID, URL only, local record ID only, multiple PID family, intrinsic hash only

**Facet E — lifecycle posture (5 categories):** immutable single version, version family [+ 4 more TBC from source]

**Facet F — machine affordance (8 categories):** HTML only, API, OAI-PMH, SPARQL/RDF, bulk snapshot, package export, schema publication, content negotiation, search endpoint

**Facet G — trust/review posture (7 categories):** unreviewed, spam screened, editorially screened, peer reviewed externally, peer review unknown, institutional review, community moderation, algorithmic enrichment layer

**Facet H — preservation promise (5 categories):** none stated, bit-level preservation, long-term archive claim, certified/standards-aligned preservation posture, mirror only

**Facet I — legal/rights posture (6 categories):** clear open license, metadata open/payload closed, unclear or mixed rights, contractual restriction, personal data sensitivity, export-control or jurisdiction-sensitive

Relationships to existing taxonomy work (e.g., software taxonomy via SHACL/profile constraints) should be documented. Implementation as a vocabulary pack (following the vocabpack pattern in the existing pack suite).

## Sources

- `docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md` — Section 6 (Facets A–I), Section 12.4
- `docs/intake/docs-intelligence/2026-06-05-source-substrate-provenance.md` — [F3]
