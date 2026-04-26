# Docs Intelligence Extraction

## Source

- **Path:** `docs/chats/20260118 - Chat GPT - Taxonomic Standards for Software.md`
- **Title:** Taxonomic Standards for Software
- **Date evidence:** 2026/1/8 conversation; Rosetta 3.0 suite (ROCK-3001–3099) referenced with 2025 date for Design Tokens spec
- **Authority tier:** chat/external reference — Crates McD working session on taxonomy standards, contains reference to SEMAT, ISO, OMG, W3C, OMG standards plus Rosetta's own spec registry
- **Freshness:** 2026-01 conversation; Rosetta 3.0 spec referenced as current work-in-progress
- **Word count:** ~2,400 words (research quality, technical reference)

## Extraction Quality

- **Completeness:** high — full conversation captured in source; no sections skipped
- **Confidence:** high — standards referenced are well-known specifications; Rosetta spec registry is self-referential
- **Novelty:** high — taxonomy standards mapping across multiple ISO/OMG/W3C bodies into a tiered classification spine; Rosetta ROCK-3001–3099 registry is unique to this corpus

---

## Overview

Crates asked ChatGPT about existing standards for tiered taxonomic classification of software logic — from atomic computational moves to SDLC orchestration, UI theming, DevOps, and accessibility. The response surveys anchor standards and proposes a tiered classification spine combining multiple existing standards, concluding with a Rosetta 3.0 document registry (ROCK-3001–3099) and dependency graph.

---

## Formal Findings

### F-TXS-001: No Universal Taxonomy of All Software Logic Exists

**Confidence:** high
**Labels:** taxonomy, standards-gap, classification-spine

The conversation establishes that no single standard covers the full scope Crates described — from atomic pseudocode to SDLC, DevOps, analytics, a11y. Multiple anchor standards each cover a layer, but no unified taxonomy spine exists. This is a genuine standards gap that Rosetta's Pasigraphy is trying to address.

---

### F-TXS-002: SKOS (W3C) Validated as Lightweight Taxonomy Backbone

**Confidence:** high
**Labels:** w3c, skos, taxonomy, standards

ChatGPT recommended SKOS (Simple Knowledge Organization System) as the lightweight standard for nested/tiered classification. SKOS supports strict trees, loose concept schemes, and mapping predicates (exactMatch/broadMatch) without overcommitting to heavy logic (OWL). Cited: W3C REC-skos-reference-20090818.

---

### F-TXS-003: SEMAT Essence (OMG) as Kernel for SDLC Work/Products

**Confidence:** high
**Labels:** omg, semat, sdlc, kernel, standards

SEMAT Essence (Object Management Group) is recommended as a method-agnostic kernel for software engineering endeavors — covering requirements, work, team, software system. Claimed to be "one of the few things that even tries to be a universal vocabulary above specific methodologies." Cited: OMG Essence 1.2.

---

### F-TXS-004: ISO/IEC/IEEE 42010 as Architecture Description Standard

**Confidence:** high
**Labels:** iso, architecture, viewpoints, standards

ISO/IEC/IEEE 42010 is cited for architecture descriptions — covering stakeholders, concerns, viewpoints, views. Provides disciplined architecture tiering without hardcoding a single diagram style. Cited: ISO 74393.

---

### F-TXS-005: ArchiMate (The Open Group) as Layered Enterprise Architecture Language

**Confidence:** high
**Labels:** opengroup, archimate, enterprise-architecture, layers

ArchiMate is recommended as an enterprise architecture modeling language designed explicitly around layers and relationships — business/application/technology and migration. Cited: OpenGroup ArchiMate licensed downloads.

---

### F-TXS-006: BPMN + DMN + SCXML Cover Flow, Choice, and State

**Confidence:** high
**Labels:** bpmn, dmn, scxml, behavior, process, state-machine

Three complementary standards are identified:
- **BPMN** (OMG + ISO/IEC 19510): standardized process notation and interchange — covers _flow_
- **DMN** (OMG): standardized decision modeling (decision requirements graphs + expression language) — covers _choice logic_
- **SCXML** (W3C): executable state machine notation (statecharts in XML) — covers _stateful interaction and transitions_, including UI states

---

### F-TXS-007: W3C Design Tokens 2025.10 Reached First Stable Version

**Confidence:** high
**Labels:** w3c, design-tokens, ui, theming, cross-platform

W3C Design Tokens reached first stable version as of 2025.10 — enables declarative cross-tool, cross-platform design decisions. Cited: W3C Design Tokens spec October 2025 stable release.

---

### F-TXS-008: OpenAPI 3.1 + AsyncAPI + CloudEvents Cover API Contracts

**Confidence:** high
**Labels:** openapi, asyncapi, cloudevents, api-contracts

Three complementary standards for API description and event declaration:
- **OpenAPI 3.1**: REST API contract specification
- **AsyncAPI**: async API specification
- **CloudEvents** (CNCF): event declaration and delivery spec

---

### F-TXS-009: OpenTelemetry (CNCF) Covers Telemetry and Observability

**Confidence:** high
**Labels:** opentelemetry, observability, telemetry, cncfe

OpenTelemetry is the CNCF standard for collecting and exporting telemetry (traces, metrics, logs). Cited: opentelemetry.io.

---

### F-TXS-010: WCAG 2.2 + WAI-ARIA 1.2 Cover Accessibility

**Confidence:** high
**Labels:** wcag, wai-aria, accessibility, a11y

W3C accessibility standards:
- **WCAG 2.2**: Web Content Accessibility Guidelines
- **WAI-ARIA 1.2**: Accessible Rich Internet Applications

---

### F-TXS-011: Rosetta 3.0 Document Registry (ROCK-3001–3099)

**Confidence:** high
**Labels:** rosetta, spec, rock, documentation, registry

A formal document registry is defined for Rosetta 3.0 suite with 11 entries:

| DocID | Title | Type | Dependencies |
|---|---|---|---|
| ROCK-3001 | Rosetta 3.0 Core Spine Specification | Normative | — (base) |
| ROCK-3002 | Rosetta 3.0 Data Model & Semantics Reference | Normative | 3001 |
| ROCK-3003 | Rosetta 3.0 Standard Packs Specification | Normative | 3001 |
| ROCK-3004 | Rosetta 3.0 Vocabulary Packs and Lexicon Guide | Normative | 3001 |
| ROCK-3005 | Rosetta 3.0 Conformance & Compliance Profiles | Normative | 3001 |
| ROCK-3006 | Rosetta 3.0 Implementation Guide | Informative | 3001, 3002 |
| ROCK-3007 | Rosetta 3.0 Use Case Compendium | Informative | 3001 |
| ROCK-3010 | Rosetta 3.0 Schema Pack (Machine-Readable) | Artifact | 3002 |
| ROCK-3099 | Rosetta 3.x Patch Ledger and Change Log | Informative (process) | 3001 |

Reserved: ROCK-3000–3099 for core and companion specs; 3100+ for extension packs; 4000+ for Rosetta 4.0.

---

### F-TXS-012: DocID Maps to Canonical URI and File Naming

**Confidence:** high
**Labels:** rosetta, uri, file-naming, docid

Each DocID corresponds to a canonical URI (e.g., `https://spec.rosetta.org/ROCK-3001`) and a recommended file naming convention (e.g., `ROCK-3001_Rosetta3_CoreSpineSpec_v3.0.0.pdf`). Within docs, references use DocID plus section/fragment.

---

### F-TXS-013: Document Dependency Graph Defined

**Confidence:** high
**Labels:** rosetta, dependencies, graph, architecture

A machine-readable dependency adjacency list is defined. ROCK-3001 is the base with no dependencies; ROCK-3002/3003/3004/3005 depend on 3001; ROCK-3006 depends on 3001 and 3002; ROCK-3010 depends on 3002; ROCK-3099 depends on 3001. Includes mermaid graph visualization.

---

### F-TXS-014: Governance Policy for DocID Stability

**Confidence:** high
**Labels:** rosetta, governance, versioning, docid

DocIDs are stable once assigned. Document titles and scopes are authoritative. Any _substantive change_ to a normative document (other than patch-level errata) results in a new version number but not a new DocID, unless the change is fundamental enough to warrant a new document (e.g., splitting one spec into two).

---

### F-TXS-015: JSON Schema + SHACL + RDF as Machine-Readable Schema Stack

**Confidence:** high
**Labels:** json-schema, shacl, rdf, machine-readable, standards

ROCK-3002 cites JSON Schema (for tile schemas), SHACL Shapes (for validation), and RDF Concepts (for graph model) as the machine-readable schema layer. ROCK-3010 Schema Pack is the artifact bundle containing JSON Schemas for all tiles, SHACL shapes, and a TTL (Turtle) file representing core ontology.

---

### F-TXS-016: RFC 2119 (Normative Language) Referenced in Standards Track Docs

**Confidence:** high
**Labels:** rfc2119, normative-language, standards

ROCK-3001 and ROCK-3005 cite RFC 2119 for normative language requirements levels (MUST, SHOULD, MAY etc.).

---

### F-TXS-017: Content Addressing via Multihash Referenced

**Confidence:** high
**Labels:** multihash, content-addressing, merkle

ROCK-3001 references Multihash for content addressing (append-only integrity mechanism). A Google Drive link is provided as reference.

---

### F-TXS-018: PROV-O (W3C) Ontology Referenced in StdPacks

**Confidence:** medium
**Labels:** prov-o, provenance, standards

ROCK-3003 (Standard Packs) lists PROV-O (W3C Provenance Ontology) among integrated standards for provenance tracking.

---

### F-TXS-019: OWL2 Referenced in Standard Packs

**Confidence:** medium
**labels:** owl2, ontology, standards

ROCK-3003 lists W3C OWL2 (Web Ontology Language) among integrated standards alongside RDF, SKOS, SHACL, PROV-O.

---

### F-TXS-020: WordNet (Princeton) + BabelNet + Ontolex for VocabPacks

**Confidence:** medium
**Labels:** wordnet, babelnet, ontolex, lexicon, vocabulary

ROCK-3004 (Vocabulary Packs) references WordNet (Princeton), BabelNet, and W3C Ontolex standards for lexical anchors (LEXID) and concept anchors (ANCHORID) integration with domain ontologies.

---

### F-TXS-021: RFC 7282 (Rough Consensus) Referenced in Patch Ledger

**Confidence:** medium
**Labels:** rfc7282, consensus, governance, patch-process

ROCK-3099 references RFC 7282 (on rough consensus and running code) as the process standard for spec evolution and patch approval.

---

### F-TXS-022: Profiles (Light, Full, Auditor, Forge) Have SHACL-Based Test Cases

**Confidence:** high
**Labels:** profiles, shacl, conformance, compliance, testing

ROCK-3005 defines four official profiles (Light, Full, Auditor, Forge) with SHACL-based test cases for validation and a "Self-Consistency Checklist" for implementers.

---

### F-TXS-023: TTL (Turtle) File for Core Ontology Represented

**Confidence:** medium
**Labels:** rdf, turtle, ontology, schema-pack

ROCK-3010 Schema Pack includes a TTL (Turtle) file representing core ontology (for concept types and edge types), alongside JSON Schemas and SHACL shapes.

---

### F-TXS-024: Patch ID + DocID + Tile Tracking in Patch Ledger

**Confidence:** high
**Labels:** patch-ledger, change-log, governance

ROCK-3099 tracks patches with: Patch ID, description, linked DocID or tile (if patch is encoded as tile), and status (draft/approved). Living document for 3.x series evolution.

---

## Issue Drafts

### Issue Draft 1: TXS-001 — Rosetta DocID Registry Implementation

**Draft file:** `docs/intake/issue-drafts/TXS-001-rosetta-docid-registry.md`

| Field | Value |
|---|---|
| **Labels** | `rosetta`, `documentation`, `registry`, `governance` |
| **Depends on** | none |
| **Status** | issue-candidate |

**Evidence:** F-TXS-011, F-TXS-012, F-TXS-013, F-TXS-014

**Description:** ROCK-3001–3099 document registry exists as prose; no machine-readable registry file (e.g., `doc-registry.json` or YAML) currently in the repo. Implementation needed:
1. Machine-readable DocID registry (JSON/YAML) with all 11 DocIDs, titles, scopes, dependencies, types, aligned standards
2. DocID-to-canonical-URI mapping logic
3. File naming convention enforcement
4. Governance rules for DocID stability and versioning

---

### Issue Draft 2: TXS-002 — Standards Mapping: Pasigraphy StdPacks for BPMN/DMN/SCXML

**Draft file:** `docs/intake/issue-drafts/TXS-002-bpmn-dmn-scxml-stdpacks.md`

| Field | Value |
|---|---|
| **Labels** | `standards`, `bpmn`, `dmn`, `scxml`, `stdpacks`, `pasigraphy` |
| **Depends on** | none |
| **Status** | issue-candidate |

**Evidence:** F-TXS-006, F-TXS-011 (ROCK-3003)

**Description:** ROCK-3003 Standard Packs lists BPMN, DMN, SCXML as aligned standards but no tile mappings or pack specs exist yet. Need to:
1. Define Pasigraphy tile types that map to BPMN process elements
2. Define tile types that map to DMN decision tables and boxed expressions
3. Define tile types that map to SCXML state machine components
4. Specify conversion/serialization rules for each direction

---

### Issue Draft 3: TXS-003 — Standards Mapping: Pasigraphy StdPacks for SKOS/SHAM/SEMAT

**Draft file:** `docs/intake/issue-drafts/TXS-003-skos-semt-archimate-stdpacks.md`

| Field | Value |
|---|---|
| **Labels** | `standards`, `skos`, `semt`, `archimate`, `stdpacks`, `pasigraphy` |
| **Depends on** | none |
| **Status** | issue-candidate |

**Evidence:** F-TXS-002, F-TXS-003, F-TXS-004, F-TXS-005, F-TXS-011 (ROCK-3003)

**Description:** Standard Packs spec needs mappings for the architecture/taxonomy layer (SKOS, SEMAT Essence, ISO 42010, ArchiMate). No tile definitions or semantic anchors exist for these. Need:
1. SKOS concept scheme mapping to Pasigraphy anchor hierarchy
2. SEMAT kernel alpha states as Pasigraphy tile types
3. ISO 42010 viewpoint/view model as Pasigraphy viewpoint tiles
4. ArchiMate layer/stakeholder mapping to Pasigraphy layer definitions

---

### Issue Draft 4: TXS-004 — Rosetta Schema Pack (ROCK-3010) Machine-Readable Artifact

**Draft file:** `docs/intake/issue-drafts/TXS-004-schema-pack-artifact.md`

| Field | Value |
|---|---|
| **Labels** | `schema-pack`, `json-schema`, `shacl`, `rdf`, `artifact`, `machine-readable` |
| **Depends on** | `TXS-002-bpmn-dmn-scxml-stdpacks` |
| **Status** | issue-candidate |

**Evidence:** F-TXS-015, F-TXS-022, F-TXS-023

**Description:** ROCK-3010 is defined as an artifact bundle containing JSON Schemas for all tile types, SHACL shapes for profile validation, and a TTL file for core ontology. No such artifact currently exists. Need:
1. JSON Schema files for all defined tile types (from ROCK-3002)
2. SHACL shapes for Light/Full/Auditor/Forge profiles (from ROCK-3005)
3. Turtle ontology file for concept types and edge types
4. Versioning and release process for the artifact bundle

---

### Issue Draft 5: TXS-005 — Design Tokens StdPack: WCAG 2.2 + WAI-ARIA + Design Tokens

**Draft file:** `docs/intake/issue-drafts/TXS-005-design-tokens-wcag-stdpacks.md`

| Field | Value |
|---|---|
| **Labels** | `design-tokens`, `wcag`, `wai-aria`, `accessibility`, `stdpacks` |
| **Depends on** | none |
| **Status** | issue-candidate |

**Evidence:** F-TXS-007, F-TXS-010, F-TXS-011 (ROCK-3003)

**Description:** ROCK-3003 Standard Packs lists WCAG 2.2, WAI-ARIA 1.2, and Design Tokens 2025.10 as accessibility and UI theming standards. No tile mappings or integration specs exist. Need:
1. Pasigraphy tile types for WCAG success criteria (per SC, not per level)
2. WAI-ARIA role/state/property mapping to Pasigraphy accessibility tiles
3. Design Token standard mapping to Pasigraphy design token tile format
4. Cross-device declarative accessibility tile schema

---

### Issue Draft 6: TXS-006 — Telemetry StdPack: OpenTelemetry + CloudEvents Mapping

**Draft file:** `docs/intake/issue-drafts/TXS-006-otel-cloudevents-stdpacks.md`

| Field | Value |
|---|---|
| **Labels** | `opentelemetry`, `cloudevents`, `telemetry`, `observability`, `stdpacks` |
| **Depends on** | none |
| **Status** | issue-candidate |

**Evidence:** F-TXS-008, F-TXS-009, F-TXS-011 (ROCK-3003)

**Description:** ROCK-3003 Standard Packs lists OpenTelemetry and CloudEvents as integration standards. Need:
1. Pasigraphy tile types for OpenTelemetry spans, metrics, log records
2. CloudEvents envelope mapping to Pasigraphy event tiles
3. Telemetry tile-to-OTLP export adapter
4. Rosetta telemetry injection points (where tiles carry telemetry metadata)

---

### Issue Draft 7: TXS-007 — VocabPacks: WordNet + BabelNet + Ontolex Integration

**Draft file:** `docs/intake/issue-drafts/TXS-007-vocabpacks-wordnet-babelnet.md`

| Field | Value |
|---|---|
| **Labels** | `vocabpack`, `wordnet`, `babelnet`, `ontolex`, `lexicon`, `vocabulary` |
| **Depends on** | none |
| **Status** | issue-candidate |

**Evidence:** F-TXS-020, F-TXS-011 (ROCK-3004)

**Description:** ROCK-3004 VocabPacks spec references WordNet (Princeton), BabelNet, and W3C Ontolex for LEXID (lexical anchor) and ANCHORID (concept anchor) integration. No VocabPack definitions currently exist. Need:
1. WordNet synset-to-Pasigraphy-ANCHORID mapping schema
2. BabelNet multilingual sense anchoring
3. Ontolex lexical entry format for Pasigraphy LEXID tiles
4. Namespace conventions for VocabPack registry

---

### Issue Draft 8: TXS-008 — Self-Consistency Checklist for Implementers

**Draft file:** `docs/intake/issue-drafts/TXS-008-self-consistency-checklist.md`

| Field | Value |
|---|---|
| **Labels** | `profiles`, `conformance`, `self-check`, `testing` |
| **Depends on** | `TXS-004-schema-pack-artifact` |
| **Status** | issue-candidate |

**Evidence:** F-TXS-022, F-TXS-011 (ROCK-3005)

**Description:** ROCK-3005 promises a "Self-Consistency Checklist" for implementers of the four profiles (Light, Full, Auditor, Forge). SHACL-based test cases are specified but not implemented. Need:
1. Human-readable self-check checklist (markdown)
2. SHACL shapes for each profile's compliance requirements
3. Profile-level validation test harness
4. Self-certification documentation

---

## Open Questions

- What is the taxonomy gap that Rosetta Pasigraphy fills that existing standards (SKOS, SEMAT, ISO 42010) don't? Need to articulate this precisely to avoid duplicating existing work.
- Is SEMAT Essence actively maintained and adopted? Worth verifying community adoption before recommending as a Rosetta anchor standard.
- Should Rosetta's ROCK-3001–3099 DocIDs be serialized into a machine-readable registry file? The registry itself is documentation-quality prose but could be tooling-consumable.
- For the four profiles (Light/Full/Auditor/Forge) — what are the concrete SHACL shapes? Are they written anywhere or just described?
- Design Tokens 2025.10 is new (October 2025 stable). What's the adoption curve? Is it realistic to map Pasigraphy to it in Phase 1?
- TTL (Turtle) for core ontology — is RDF-native representation actually needed or would JSON-LD suffice for the schema pack?

---

## Project Board Suggestions

- **Area:** Rosetta Spec Suite / Standards Integration
- **Cycle:** 2026-04-25
- **Status:** Discovery/requirements; no implementation yet
- **Blocked by:** TXS-004 depends on TXS-002; TXS-008 depends on TXS-004; all others independent
- **Parallelization notes:** TXS-001, TXS-003, TXS-005, TXS-006, TXS-007 are all independent and can proceed in parallel. TXS-002 (BPMN/DMN/SCXML) is the highest-value highest-effort target given Rosetta's focus on Pasigraphy tile mapping.
