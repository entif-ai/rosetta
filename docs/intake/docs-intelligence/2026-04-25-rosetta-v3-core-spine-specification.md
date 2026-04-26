# Docs Intelligence Extraction — Rosetta v3.0.0 Core Spine Specification

## Source

- Path: `docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md`
- Title: Rosetta v3.0.0 Core Spine Specification (Standards Track, Version 3.0.0)
- Date evidence: 2026-01-08
- Authority tier: normative
- Freshness: new (not previously extracted)
- Word count: ~18,000
- Extractor: subagent
- Extraction date: 2026-04-25

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

Rosetta v3.0.0 defines a minimal, stable, extensible core spine protocol for AI systems integrating LLMs, tools, human inputs, and multi-surface applications. The specification covers: a content-addressed tile model (CIDs, RIDs, XIDs), a four-layer meaning pipeline (Signals→Forms→Lexemes→Concepts/Frames), a universal event spine (Run/Action/ToolCall/Observation/Evaluation), a pack extension system (StdPacks and VocabPacks), normative conformance profiles (Light/Full/Auditor/Forge), a document suite (ROCK-3001 through ROCK-3099), and a governed evolution model via proposal tiles and delta capsules. Supersedes Rosetta Pasigraphy Protocol v2.1.0 (RFC ENTIF-0001 v2.1.0).

## Goals And Intent

- Single unified semantic interlingua (Pasigraphy tiles)
- Universal operational event trace consistent across all executions
- Rigorous content-addressing of all artifacts for immutability and provenance
- Explicit representation of ambiguity, uncertainty, and context via conjecture distributions
- Seamless interoperability with industry standards via attachable packs
- Stability-first core with pack-driven extension (no silent core mutation)
- Full auditability: every decision traceable from signal to output

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| All tiles content-addressed via CID (SHA-256 multihash) | § Data Model; CID definition | core | MUST | Canonicalization via JCS RFC 8785 |
| TileEnvelope required on all persisted artifacts | § Tile Envelope: kind, cid, rid, prev, derived_from, run, timestamp, nonce, sig, auth, summary, content | core | MUST | cid excluded from hash computation |
| No in-place mutation of tiles; supersession via new tiles only | § Non-Goals: "append-only ledger"; § Data Model: prev field | core | MUST | Immutable ledger discipline |
| Signals/semantics separation: Observations never reinterpreted as Concepts | § Non-Goals: "Observation vs interpretation"; § Meaning Pipeline Layer 0 invariant | core | MUST | Direct Observation→Concept promotion prohibited |
| Meaning pipeline layers 0–3 MUST produce corresponding tile artifacts | § Meaning Pipeline: conformance requirements | core | MUST | Explicit or implicit; audit trace required |
| Conjecture tiles MUST capture ambiguity at every pipeline transition | § Meaning Pipeline Layer 2/3; Conjecture definition | core | MUST | Distribution with weights, evidence, model ID |
| Conjectures MUST be replayable unless explicitly flagged nonReplayable | § Conjecture definition; nonCollapse rule | core | MUST | Non-replayable requires justification |
| Uncertainty MUST NOT be collapsed without record | § Non-collapse of uncertainty rule | core | MUST | Requires rationale or preservation of alternatives |
| StdPacks and VocabPacks: external standards via pack namespace not core namespace | § Pack System Architecture; "Anchors vs Identity" principle | core | MUST | Core semantics MUST NOT be redefined by packs |
| Packs MUST NOT redefine or silently alter core semantics | § Pack Governance: "no redefinition" rule | packs | MUST | Refinement-first rule |
| Receipts-first instrumentation for all important events | § Receipt definition; § Conformance: receipts as audit primitive | core | MUST | Receipt tile is normative first-class spine artifact |
| Incident envelopes require quorum receipts to open | § Incident Envelope definition | core | SHOULD | Auditor profile requirement |
| Content canonicalization MUST use JCS (JSON Canonicalization Scheme RFC 8785) | § Canonicalization process | core | MUST | Ensures cross-platform CID determinism |
| Tile kinds prefixed "rosetta." reserved for core; packs use own namespace | § Reserved Tile Kinds | core | MUST | Collision avoidance |
| RID MUST NOT be derived from content in an uncontrolled way | § RID definition; format recommendation: rid:<namespace>:<ulid> | core | MUST | Prevent accidental concept collision |
| SHACL shapes RECOMMENDED for validation of tile structure and invariants | § Conformance: SHACL Use | core | SHOULD | Primary conformance validation language |
| Profiles (Light/Full/Auditor/Forge) define normative capability subsets | § Profiles Definition | core | MUST | Interoperable subset expectations |
| PROV-O alignment: derived_from maps to prov:wasDerivedFrom | § Interoperability Strategy | core | SHOULD | Standard provenance interchange |
| OWL2/RDF/SKOS/SHACL/PROV-O as StdPack; WordNet/BabelNet as VocabPack | § Pack System Architecture examples | packs | SHOULD | Standards spine integration |
| OpenAPI/AsyncAPI/CloudEvents/OpenTelemetry as StdPacks | § Pack System Architecture examples | packs | SHOULD | Operational interop |
| BPMN/DMN/SCXML as StdPacks | § Pack System Architecture examples | packs | MAY | Process/workflow standards |
| WCAG/WAI-ARIA/Design Tokens as StdPacks | § Pack System Architecture examples | packs | MAY | Accessibility standards |
| Delta Capsule tile (rosetta.delta_capsule) for change propagation across peers | § Delta definition | core | SHOULD | Append-only change propagation unit |
| New core concept or schema change via rosetta.speciation proposal tiles | § Design Goals: Governed Evolution | core | MUST | No silent core mutations |
| Axis Registry tile (rosetta.axis_registry) enumerates evaluation axes | § Matrix (ELPQ Matrix) definition | core | RECOMMENDED | Versioned axis enumeration |
| Tapestry (rosetta.tapestry) assembles context graph for runtime use | § Tapestry definition | core | SHOULD | Progressive disclosure context bundle |
| Episteme tile (rosetta.episteme) aggregates evidence and evaluation matrices | § Episteme definition | core | MAY | Truth-assessment wrapper |
| Document Suite DocIDs: ROCK-3001 through ROCK-3099 (version-neutral identifiers) | § Document Suite Map and Policy | core | MUST | Stable reference across versions |
| Normative language per RFC 2119 (MUST/SHALL/SHOULD/MAY) | § Conventions and Normative Language | core | MUST | All sections labeled Normative |
| All normative statements testable via schema validation or SHACL logical rules | § Executive Summary | core | MUST | Eliminates ambiguity |
| External identifiers via XID anchors (LEXID, ANCHORID, PACKID) not core identity | § XID definitions; § Pack System: "Anchors vs Identity" | core | MUST | External references do not subsume core |
| Grid computing / decentralized network topology NOT prescribed | § Non-Goals: "not monolithic or centralized" | core | OUT OF SCOPE | p2p/DHT is permissible but not required |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Executive Summary | architecture | content-addressing, tile-model, interpretability | requirement | Rosetta v3.0.0 establishes a minimal, stable, extensible core spine protocol integrating LLMs, tools, human inputs, and multi-surface applications. Core design goal is interpretability-first: every artifact content-addressed and semantically typed. | § Executive Summary | Define concrete near-term tile subset for MVP (Run, Action, ToolCall, Observation, Evaluation, Receipt) | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Executive Summary | architecture | pasigraphy, interlingua, packs | requirement | Pasigraphy is Rosetta's universal semantic interlingua: language-neutral meaning units (Pasigram tiles) as the building block of meaning not tied to phrasing. External standards (OWL2, OpenAPI, etc.) attach via packs rather than altering core. | § Executive Summary | Map Pasigram tile to the Text-Core MVP interpretation layer output artifact | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Design Goals and Non-Goals | architecture | append-only, immutability, cid | requirement | All knowledge artifacts stored as immutable Tiles identified by cryptographic content hashes (CIDs). No piece of information lost or altered without trace. Append-only ledger: updates create new tiles with new CIDs; no in-place mutation. | § Design Goals | Enforce append-only discipline in storage layer; define migration path for superseded tiles | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Design Goals and Non-Goals | architecture | signals-semantics-separation | requirement | System MUST distinguish raw external signals (Observation tiles) from internal semantic interpretations (derived tiles with explicit provenance links). Raw input never conflated with interpretation. | § Design Goals: "Separation of Signals and Semantics" | This invariant maps directly to the Text-Core source→observation→interpretation→tapestry pipeline | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Design Goals and Non-Goals | architecture | universal-spine, event-trace | requirement | Core execution loop standardized as a universal spine of events: every cognitive operation is a Run containing a sequence of Actions each possibly invoking ToolCalls and generating Observations, with subsequent Evaluations. Chain of evidence for every decision and outcome. | § Design Goals: "Minimal Universal Spine" | Map this event sequence to the Rosetta CLI runtime trace format | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Design Goals and Non-Goals | architecture | conjecture, uncertainty, interpretability | requirement | Ambiguity handled explicitly via Conjecture distributions and preserved uncertainty measures. First-class support for uncertainty objects and multi-dimensional evaluation matrices (Ethos/Pathos/Logos/Quixote). System does not output undifferentiated answers without context. | § Design Goals: "Interpretability and Provenance First" | Implement Conjecture tile type early; required for any ambiguity-resolving pipeline stage | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Design Goals and Non-Goals | architecture | pack-system, stdpack, vocabpack | requirement | External standards integrated via StdPacks (format/standard integration) and VocabPacks (reference vocabularies) — not by expanding core. Core semantics remain stable pivot. | § Design Goals: "External Compatibility via Extensions" | Define the Pack model for Rosetta CLI: core invariant vs pack-extensible boundary | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Design Goals and Non-Goals | architecture | governed-evolution, proposal-tiles | requirement | New concept types or schema changes go through governed process via proposal tiles (e.g., rosetta.speciation for new ontology branches). Versioned, backward-compatible evolution. No silent mutations of meaning. | § Design Goals: "Governed Evolution" | Define governance proposal workflow for new tile kinds | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Design Goals and Non-Goals | non-goals | non-ontology, interop-not-subsumption | risk | Rosetta's core is NOT a universal domain ontology. Domain ontologies expected as external packs. Rosetta MUST NOT be interpreted as "the one true ontology" for all external data. | § Non-Goals: "One-Size-Fits-All Ontology" | Clarify in documentation that Rosetta is a meta-model framework, not a domain ontology | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Design Goals and Non-Goals | non-goals | truth-engine, meaning-preservation | risk | Rosetta is a meaning-preservation engine NOT a truth engine. Captures what was said/inferred; does not guarantee factual correctness. Declared "truths" are internal commitments tagged with provenance. | § Non-Goals: "Truth Oracle" | Ensure documentation clearly separates Rosetta meaning-preservation from truth-assertion | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Design Goals and Non-Goals | non-goals | append-only-ledger, no-mutation | risk | All updates via new tiles (new CIDs) with lineage via prev/derived_from links. No in-place mutation. Supersession by new content-addressed artifacts. NOT a traditional mutable database. | § Non-Goals: "In-place Mutable Knowledge Store" | Storage layer design must support append-only semantics; update is new tile creation | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Design Goals and Non-Goals | non-goals | decentralized-topology | open-question | Spec does not prescribe network topology. Works in decentralized/federated (p2p swarms) or single-node contexts. CID-based exchange enables peer-to-peer via content-addressing protocols. Performance, consensus, persistence strategy are beyond scope. | § Non-Goals: "Monolithic or Centralized Implementation" | Clarify near-term deployment topology assumptions for NOT LAME PRD | medium |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Normative Glossary | terminology | tile, cid, rid, xid | requirement | Terminology lock: Tile is atomic content-addressed immutable unit; CID is cryptographic hash; RID is stable handle; XID is external ID anchor. All normative definitions supersede prior Rosetta documents. | § Normative Glossary | Align internal glossary in all Rosetta docs with this terminology lock | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Normative Glossary | terminology | pasigram, lexeme, form | requirement | Pasigram = language-neutral meaning unit (interlingua element). Lexeme = language-bound lemma/word sense. Form = raw linguistic form at Layer 1 (token, phoneme, image_patch). Distinct from Concept/Frame. | § Normative Glossary | Ensure Text-Core interpretation layer produces outputs matching Pasigram semantics | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Normative Glossary | terminology | conjecture | requirement | Conjecture = distribution of candidate interpretations linking pipeline layers (Form→Lexeme, Lexeme→Concept, Concept/Predicate→Frame). Contains options with weights/probabilities, evidence references, model ID. NonReplayable flag required when recomputation not possible. | § Normative Glossary | Conjecture tile is core to ambiguity handling; implement early | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Normative Glossary | terminology | episteme, matrix, elpq | requirement | Episteme = epistemic wrapper aggregating evidence and evaluation matrices. Matrix (ELPQ) = multi-axis evaluation: Ethos (ethical/trust), Logos (logical/coherence), Pathos (emotional resonance), Quixote (creative/whimsical alignment). Axes defined in rosetta.axis_registry. | § Normative Glossary | Evaluation axis vocabulary (Ethos/Pathos/Logos/Quixote) referenced across multiple other docs | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Normative Glossary | terminology | tapestry, delta-capsule | requirement | Tapestry = compiled working set of tiles assembled under context/budget constraints for runtime use (context graph). Delta Capsule = unit of change propagation packaging a set of changed tiles with prerequisites and migration steps. | § Normative Glossary | Tapestry is context-compilation abstraction; Delta Capsule is change propagation unit | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Normative Glossary | terminology | receipt, incident, policy | requirement | Receipt = signed attestation about event/artifact (notary statement). Incident Envelope (rosetta.incident) = sealed analysis requiring quorum receipts to open. Policy = machine-enforceable rules/policy signed by authority. | § Normative Glossary | Receipts are first-class spine artifacts; Incident Envelope is specialized sealed payload | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Data Model | tile-envelope | canonicalization, jcs, cid | requirement | TileEnvelope schema: kind, rid, prev, derived_from, run, timestamp, nonce, sig, auth, summary, content. Canonicalization: exclude cid/sig from hash, JCS RFC 8785 serialization, SHA-256 multihash. Nonce included in hash. | § Tile Envelope and Canonicalization | Implement JCS canonicalization per RFC 8785; provide test vectors for cross-platform CID determinism | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Data Model | identifier-hygiene | cid-vs-rid-vs-xid | requirement | Identifier hygiene: CID for exact content instance (immutable), RID for stable entity identity across versions, XID for external references (anchors). Field must clearly use one ID type. | § Content Identifier Roles and Hygiene | Enforce ID type discipline in code; avoid CID-as-entity-identifier confusion | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Data Model | provenance | derived-from, prev, lattice-edge | requirement | Provenance: derived_from links immediate input artifacts; prev links prior version (lineage vs derivation); Lattice Edge tiles connect tiles with typed relationships. For derivation traceability, tiles MUST either include derived_from or be connected by appropriate lattice edge. | § Provenance and Lineage Encoding | Implement provenance chain from Observation→Form→Lexeme→Concept for full traceability | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Meaning Pipeline | layers-0-3 | layer-0-observation, layer-1-form, layer-2-lexeme, layer-3-concept | requirement | Four-layer meaning pipeline: Layer 0 Signals (Observation tiles), Layer 1 Forms (rosetta.form.* tokens), Layer 2 Lexemes (rosetta.lexeme language-bound senses), Layer 3 Concepts/Frames (rosetta.concept, rosetta.frame language-neutral). Mandatory separation. | § Meaning Pipeline | Text-Core MVP implements a subset of this pipeline; align TC-001–TC-007 to layer mappings | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Meaning Pipeline | non-collapse | ambiguity-preservation, conjecture | requirement | Non-collapse of uncertainty rule: system MUST NOT arbitrarily pick one interpretation and discard others without record. Must maintain Conjecture or record rationale. Prevents unknowing wrong interpretation commitment. | § Meaning Pipeline: Non-collapse of uncertainty rule | Implement ambiguity tracking as first-class concern in interpretation pipeline | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Meaning Pipeline | conformance | pipeline-artifacts, audit-trace | requirement | Systems MUST produce tile outputs for each pipeline layer explicitly (or behave as if). Lazy implementation may not store all Conjectures if ambiguity near-zero but MUST be capable of generating upon request. | § Meaning Pipeline: Conformance requirements | Ensure every pipeline stage produces verifiable artifacts | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Pack System | stdpack | owl2, rdf, prov-o, bpmn, dmn, scxml, openapi, asyncapi, cloudevents, opentelemetry | requirement | StdPacks integrate external standards: OWL2/RDF(S)/SKOS/SHACL/PROV-O (semantic web), BPMN/DMN/SCXML (process/decision), OpenAPI/AsyncAPI/CloudEvents/OpenTelemetry (API/events/telemetry), WCAG/WAI-ARIA/Design Tokens (accessibility/UI). | § Pack System Architecture examples | Define near-term pack priorities for NOT LAME MVP; likely PROV-O and OpenAPI first | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Pack System | vocabpack | wordnet, babelnet, lexicon | requirement | VocabPacks integrate external vocabularies/taxonomies: WordNet, BabelNet, domain ontologies. Lexeme layer uses VocabPacks for lexical anchoring (LEXID). | § Pack System Architecture examples | VocabPack for English (WordNet) needed for Text-Core Lexeme-to-Concept mapping | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Pack System | anchors-vs-identity | xid, external-reference, pack-namespace | requirement | Crucial principle: XIDs (anchors from packs) supply background identity but do NOT replace Rosetta's own RID identity. Rosetta concept has stable RID independent of external anchor. Pack maps to Rosetta but cannot redefine core. | § Pack System: "Anchor vs Identity" | Enforce anchor-vs-identity discipline in pack authoring guidelines | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Pack System | no-redefinition | refinement-first, core-stability | requirement | Pack MUST NOT redefine or silently alter core semantics. If conflict, pack must adapt (e.g., not use conflicting OWL class or provide translator). Core remains consistent. | § Pack Governance: "No Redefinition" | Add "refinement-first rule" enforcement to pack certification criteria | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Conformance | profiles | light-profile, full-profile, auditor-profile, forge-profile | requirement | Four conformance profiles: Light (minimal consumer/producer), Full (complete pipeline + all features), Auditor (read-only verification/analysis), Forge (can propose/create new schema/ontology elements). | § Profiles Definition | Define which profile applies to which NOT LAME runtime component | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Conformance | shacl | validation, shapes, constraints | requirement | SHACL Shapes recommended for structural validation (tile schema, invariants, cross-content rules). Core Rosetta SHACL shapes graph provided as machine-readable artifact. | § SHACL Use in Conformance | Generate SHACL shapes for core tile types; integrate into validation pipeline | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Document Suite | docid | rock-3001, rock-3002, rock-3003, rock-3004, rock-3005, rock-3006, rock-3007, rock-3010, rock-3099 | requirement | Document Suite with stable DocIDs: ROCK-3001 Core Spine (this doc), ROCK-3002 Data Model & Semantics, ROCK-3003 StdPacks Spec, ROCK-3004 VocabPacks Guide, ROCK-3005 Conformance & Profiles, ROCK-3006 Implementation Guide (informative), ROCK-3007 Use Case Compendium (informative), ROCK-3010 Schema Pack (machine-readable), ROCK-3099 Patch Ledger. | § Document Suite Map and Policy | Update internal ROCK-DocID references to align with this suite; ensure cross-doc references use DocID | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Document Suite | governance | patch-ledger, versioned-docs, docid-stability | requirement | DocIDs stable once assigned. Substantive changes → new version number (same DocID). Major version → new DocID series. ROCK-3099 Patch Ledger tracks all approved changes in 3.x series. Governance process required for normative doc changes. | § Governance of Documents | Establish patch-level change protocol aligned with ROCK-3099 process | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Executive Summary | scope-stability | minimal-core, pack-extensibility | requirement | Core intentionally minimalist and agnostic to domain-specific ontologies or interfaces. Only essential scaffolding (content-addressed tiles, standard event sequence, invariant meaning pipeline, governance framework). All domain specifics live in packs. | § Executive Summary: Design Posture | Apply minimal-core principle to NOT LAME architecture decisions; resist core expansion | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Normative Glossary | lattice-edge | typed-relationships, graph-versioning | requirement | Lattice Edge (rosetta.lattice_edge) = typed relationship between two tiles. Edge families: semantic (subclass-of, instance-of), temporal/provenance (derived-from, next-in-sequence), causal. Content-addressed enabling graph versioning and piecemeal sharing. | § Normative Glossary: Relation (Lattice Edge) | Lattice edge is the primary graph relationship type; implement graph DB mapping for edge types | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Design Goals and Non-Goals | non-goals | ui-ux, display, user-facing | risk | UI/UX design and end-user product features are OUT OF SCOPE. Rosetta provides structures for interpretability (e.g., output labels, frames) that a UI could use, but actual UI rendering decisions belong to application layers. | § Non-Goals: "UI/UX Design" | Rosetta should not absorb UI concerns; keep UI/UX in application layer | medium |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Pack System | pack-versioning | packid, translator-tiles | requirement | Packs are versioned and content-addressed. New pack versions can update IDs. Rosetta must allow multiple packs loaded or smooth transition via PACKID and translator tiles. | § Pack Governance and Identity: Pack Versioning | Implement pack version registry and translator tile support for smooth pack upgrades | medium |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Meaning Pipeline | epistemic-layer | layer-4, truth-assessment | open-question | Optional Layer 4 (Epistemic layer) handles truth assessments and knowledge evolution via Episteme/Evaluation tiles. In this spec, integrated as workflow rather than strict pipeline layer. | § Meaning Pipeline: Epistemic layer (optional formal layer 4) | Clarify Layer 4 role in NOT LAME evaluation loop; is Episteme needed for v0.1? | medium |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Conformance | trust-model | authority, genesis, signatures | risk | Policy tiles and Receipts require cryptographic signatures for trust. Authority metadata in TileEnvelope (auth field). Genesis keys and attestation chains need defined trust-on-first-use or PKI model. | § TileEnvelope: sig, auth; § Policy definition | Define trust model for NOT LAME: who signs genesis policy, how to bootstrap trust | medium |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Design Goals and Non-Goals | non-goals | external-knowledge-base, wordnet-babelnet | risk | Rosetta does NOT replace external knowledge bases (WordNet, BabelNet, industry schemas). Instead bridges to them via VocabPacks. External resources remain authoritative in their domains; Rosetta references them with stable anchors. MUST NOT silently treat external ID as core concept. | § Non-Goals: "Replacement for External Knowledge Bases" | Ensure VocabPack distinction is clear: Rosetta is not absorbing WordNet | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Pack System | translator-tiles | concept-translator, axis-translator, version-migration | requirement | Translator tiles (e.g., rosetta.concept_translator, rosetta.axis_translator) convert between representations: old concept→new concept, old ELPQ axis→new axis. Allow inference without manual re-writing. Versioned themselves. | § Translator tiles | Implement translator tile type for axis migration and concept version upgrades | medium |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Document Suite | doc-dependencies | rock-3001-base, rock-3002-data-model, rock-3010-schema-pack | dependency | ROCK-3001 is base (no dependencies). ROCK-3002 (Data Model), ROCK-3003 (StdPacks), ROCK-3004 (VocabPacks), ROCK-3005 (Conformance) all depend on ROCK-3001. ROCK-3010 (Schema Pack) depends on ROCK-3002. | § Adjacency List of Document Dependencies | Ensure correct doc reading order; base spec must be stable before dependent docs | high |
| 2026-04-25 | docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md | Projections | interop-strategy | projection, lossless-conversion, external-mapping | requirement | Interop strategy: use packs to translate external formats; maintain traceability through any format conversion; explicit mapping definitions required for each supported external representation; lossless or controlled-loss conversion with references to original context preserved. | § Projections and Interoperability Strategy | Define interop projection requirements for NOT LAME API surface | medium |

## Components And Technologies

- Tile model (content-addressed immutable units via SHA-256 multihash CID)
- TileEnvelope (canonical JSON wrapper with JCS RFC 8785)
- Four-layer meaning pipeline (Layers 0–3: Signals/Forms/Lexemes/Concepts+Frames)
- Universal event spine (Run/Action/ToolCall/Observation/Evaluation)
- Conjecture distribution tiles (Form→Lexeme, Lexeme→Concept, Concept/Frame)
- ELPQ Matrix evaluation tiles (Ethos/Pathos/Logos/Quixote axes)
- Lattice Edge typed graph relationships
- Tapestry context compilation (runtime context graph bundles)
- Delta Capsule change propagation units
- Pack system (StdPacks + VocabPacks with namespaces and translators)
- SHACL shape validation
- Conformance profiles (Light/Full/Auditor/Forge)
- Document Suite DocIDs (ROCK-3001 series)
- Standards: RFC 2119, RFC 8785 (JCS), Multihash, PROV-O, OWL2, RDF, SKOS, SHACL, BPMN, DMN, SCXML, OpenAPI 3.1, AsyncAPI, CloudEvents, OpenTelemetry, WCAG 2.2, WAI-ARIA 1.2, W3C Design Tokens 2025.10

## Conceptual Claims

- Rosetta v3.0.0 is an interpretability-first meaning-preservation engine, not a truth engine or universal ontology
- The core protocol is intentionally minimalist; all domain-specific logic lives in packs
- Content addressing (CID) and immutability are foundational invariants that enable auditability and reproducibility
- The four-layer meaning pipeline (Signals→Forms→Lexemes→Concepts/Frames) is mandatory for normative compliance
- Uncertainty must never be collapsed without explicit record (Conjecture preservation)
- Packs extend the system without redefining core; the refinement-first rule is a hard constraint
- Append-only ledger semantics (new tiles, not in-place mutation) is a non-negotiable core invariant
- Conformance profiles (Light/Full/Auditor/Forge) define interoperable capability subsets
- The Document Suite (ROCK-3001–ROCK-3099) provides a stable, versioned reference map for all Rosetta 3.x specifications

## Dependencies And Sequencing

- This document (ROCK-3001) is the base of all other Rosetta 3.0 documents
- ROCK-3002 (Data Model & Semantics) depends on ROCK-3001
- ROCK-3003 (StdPacks), ROCK-3004 (VocabPacks), ROCK-3005 (Conformance) all depend on ROCK-3001
- ROCK-3006 (Implementation Guide) depends on ROCK-3001 and ROCK-3002
- ROCK-3010 (Schema Pack) depends on ROCK-3002
- Prior version: Rosetta Pasigraphy Protocol v2.1.0 (RFC ENTIF-0001 v2.1.0) — superseded
- Related: Cognitive Tiles and Swarm Gnosis RFC (provides P2P/network layer context)

## Contradictions Or Supersession

- **Supersedes:** Rosetta Pasigraphy Protocol v2.1.0 (RFC ENTIF-0001 v2.1.0) — this v3.0.0 specification supersedes all prior versions of the Pasigraphy protocol
- **Consistency with existing specs:** This spec is consistent with and extends the concepts established in the OMOC Swarm Gnosis Protocol (which uses the same tile model, meaning pipeline, and pack architecture)
- **Relationship to Cognitive Tiles RFC:** The P2P/swarm layer described in the Cognitive Tiles RFC is an application of the content-addressed tile model defined here; the network layer gap (CT-001 in Cognitive Tiles extraction) remains an open architectural decision before swarm work begins
- **Clarification needed:** The "terminology lock" in this spec supersedes any prior inconsistent terminology used in earlier Rosetta documents

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| ROSETTA-v3-001: Append-only ledger enforcement gap | implementation | `docs/intake/issue-drafts/rosetta-v3-001-append-only-enforcement.md` | core-invariant, storage, append-only | | Spec mandates append-only ledger but no enforcement mechanism described; in-place mutation would break CID-based invariants |
| ROSETTA-v3-002: JCS canonicalization test vectors not provided | docs-intelligence | `docs/intake/issue-drafts/rosetta-v3-002-jcs-canonicalization-test-vectors.md` | canonicalization, cid, interop, testing | | Spec requires JCS RFC 8785 but no cross-platform test vectors are included; CIP interop cannot be verified without them |
| ROSETTA-v3-003: Trust bootstrap model undefined | implementation | `docs/intake/issue-drafts/rosetta-v3-003-trust-bootstrap-model.md` | trust, authority, genesis, signatures | | Receipts and Policy tiles require signatures; the trust-on-first-use or PKI model for genesis key bootstrapping is not defined |
| ROSETTA-v3-004: Conformance test harness not specified | implementation | `docs/intake/issue-drafts/rosetta-v3-004-conformance-test-harness.md` | shacl, conformance, validation, testing | | SHACL shapes are recommended but no test harness or acceptance criteria defined for profile certification |
| ROSETTA-v3-005: Delta Capsule propagation protocol incomplete | implementation | `docs/intake/issue-drafts/rosetta-v3-005-delta-capsule-propagation.md` | delta-capsule, federation, change-propagation, swarm | | Delta Capsule (rosetta.delta_capsule) defined as concept but propagation protocol is not specified |
| ROSETTA-v3-006: Episteme Layer 4 scope undefined | open-question | `docs/intake/issue-drafts/rosetta-v3-006-episteme-layer-4-scope.md` | episteme, layer-4, evaluation, truth-assessment | | Optional Layer 4 (Epistemic layer) mentioned but scope, trigger conditions, and relationship to Evaluation tiles are not defined |
| ROSETTA-v3-007: Network topology assumptions undeclared | architecture | `docs/intake/issue-drafts/rosetta-v3-007-network-topology-assumptions.md` | architecture, deployment, topology, scope | | Spec says topology not prescribed but no explicit declaration of assumed near-term topology; creates deployment ambiguity |
| ROSETTA-v3-008: Conjecture nonReplayable edge case not handled | risk | `docs/intake/issue-drafts/rosetta-v3-008-conjecture-nonreplayable-edge-case.md` | conjecture, reproducibility, determinism | | Conjecture can be flagged nonReplayable but criteria for acceptable justification and downstream handling are unspecified |
| ROSETTA-v3-009: Profile negotiation protocol not specified | implementation | `docs/intake/issue-drafts/rosetta-v3-009-profile-negotiation-protocol.md` | profiles, interoperability, light-full-auditor-forge | | Nodes declare profile via DocID or handshake but protocol for profile negotiation between nodes is not defined |
| ROSETTA-v3-010: Translator tile versioning model ambiguous | implementation | `docs/intake/issue-drafts/rosetta-v3-010-translator-tile-versioning.md` | pack-versioning, translator-tiles, migration, packs | | Translator tiles are versioned but the versioning model (semver vs CID-based vs ULID) is not specified |

## Project Board Suggestions

- Area: Rosetta Core Protocol / Architecture
- Cycle: v3.0.0 stable specification
- Status: Draft (intended Standards Track)
- Blocked by: None for v3.0.0 spec itself; downstream specs (ROCK-3002 through ROCK-3005) are blocked until v3.0.0 is stable
- Parallelization notes: Core spine spec (this doc) must be stable before StdPacks, VocabPacks, and Conformance specs can be finalized. Schema Pack (ROCK-3010) depends on Data Model (ROCK-3002). Implementation Guide (ROCK-3006) can be drafted in parallel with Data Model.

## Open Questions

- What is the assumed near-term deployment topology for Rosetta/Entif runtime (single-node vs federated)? This affects CID routing, peer discovery, and storage layer choices.
- Is Layer 4 (Epistemic layer with Episteme tiles) in scope for NOT LAME v0.1, or deferred to a later milestone?
- What is the trust bootstrap model for genesis keys? How does a new node establish trust before any receipts exist?
- Should Delta Capsule propagation use a push model (peer broadcasts) or pull model (peer queries)?
- What is the formal acceptance test for profile certification (Light/Full/Auditor/Forge)? Is there a planned certification program?
- How do pack namespaces avoid collisions without a central registry? Is there a claimed namespace prefix list?
