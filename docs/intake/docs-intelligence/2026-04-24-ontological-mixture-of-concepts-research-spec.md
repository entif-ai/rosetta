# Docs Intelligence Extraction

## Source

- **Path:** `docs/RFCs/ontological_mixture_of_concepts_research_spec.md`
- **Title:** Ontological Mixture of Concepts — A Provenance-First Research Paper and Engineering Specification
- **Date evidence:** April 12, 2026 (document header)
- **Authority tier:** Tier 2 (internal engineering spec / working paper)
- **Freshness:** 12 days old as of extraction date
- **Word count:** ~6,000 (estimated)
- **Extractor:** docs-intelligence subagent
- **Extraction date:** 2026-04-24 UTC

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

This document is the foundational engineering specification for the Ontological Mixture of Concepts (OMC) layer — a concept-routed cognitive operating model positioned above Rosetta's constitutional spine. It defines the complete architecture stack: Ingress Refinery (Pillar Zero), memory constitution with six distinct planes, OMC task constitutions, context compiler with four-zone cache geometry, compute hierarchy (L0–L5), Guard-based side-effect gating, eval/observability harness, and the late-phase Swarm Gnosis public exchange layer. It identifies and designates external donor technologies (Prism MCP, MuninnDB, WordNet/BabelNet/VerbAtlas/SyntagNet, gist, BFO/DOLCE/SUMO, OBO Foundry, PrOntoQA, NERDm, GigaBrain, Nested Learning) and provides a 13-tier micro-build plan culminating in an MVP exit-condition checklist. The document is the primary engineering blueprint for replacing token-bleeding agent harnesses with a provenance-first concept operating system.

---

## Goals And Intent

- Replace token-bleeding agent harnesses (prompt flooding, static personas, weak compaction, undisciplined promotion, local-only optimization) with a provenance-first concept operating system
- Define OMC as the routing law — concept signature routing rather than static persona label routing
- Establish Ingress Refinery as Pillar Zero (mandatory before memory or orchestration sees any external content)
- Define memory constitution with six planes (constitutional, semantic, episodic, procedural, prospective, working) plus activation memory
- Specify the four-zone context model for cache geometry (constitutional prefix, session-generalized truths, domain tapestries, hot scratch delta)
- Design the compute hierarchy L0–L5 (from deterministic perimeter to swarm/public shard exchange)
- Establish Guard-based deny-by-default side-effect gating with signed DecisionTokens
- Define Swarm Gnosis as the late-phase public exchange lane for non-private learned shards
- Provide a 13-tier micro-build plan with explicit exit conditions per tier
- Define MVP release criteria (six concrete conditions)
- Identify and designate external donor technologies to import rather than reinvent

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
|---|---|---|---|---|
| Rosetta constitutional spine as minimal stable core with content-addressed tiles and explicit trace | Section 4.1 invariant #1, Section 4.2 layer diagram | `rosetta-core` | P0 | Non-negotiable invariant |
| Ingress Refinery precedes ALL memory and orchestration (Pillar Zero) | Section 4.1 invariant #2, Section 7 full pipeline | `ingest-refinery` | P0 | Must land before ingest-memory |
| Rights, tenancy, sensitivity, consumer scope attach at ingest | Section 4.1 invariant #3, Section 7 risk/sensitivity scoring | `ingest-refinery` | P0 | Deny-by-default Guard basis |
| Parse-only is default mode for unknown inbound content | Section 4.1 invariant #4, Section 7.5 semantic escalation rule | `ingest-refinery` | P0 | LLM escalation only on threshold breach |
| All side effects require a Guard DecisionToken | Section 4.1 invariant #5, Section 8 service boundaries | `guard-engine` | P0 | Fail-closed enforcement |
| Stable context prefixes preserved byte-for-byte for vendor cache hits | Section 4.1 invariant #10, Section 8.2 | `tapestry-builder` | P0 | Top zones rarely or never change |
| Every retrieval returns Why score, confidence, ambiguity margin, hydration status | Section 6.3 activation scoring output contract | `activation-store` | P0 | Explainability requirement |
| Sub-agents carry reduced context budgets; main orchestrator does not flood specialists | Section 8.4 sub-agent context budgets | `omc-router`, `tapestry-builder` | P1 | 300k-token main ≠ 300k-token everywhere |
| Session resume by concept signature (niche sessions respawnable) | Section 8.5 session resume | `omc-router`, `activation-store` | P1 | Concept signature → prior tapestry manifest |
| No hard-delete on low local utility alone; use active suppression + cross-context survivorship scoring | Section 2.3 contextual survivorship rule | `activation-store` | P1 | Prevents kneecapping niche specialists |
| Six memory planes distinct from activation memory | Section 6.1 memory planes table | `activation-store`, `tapestry-builder` | P1 | Constitutional very-slow, Working very-fast |
| CRDT merge for mutable overlays only; immutable tiles stay immutable | Section 6.4 CRDT merge policy | `activation-store` | P1 | Constitutional/semantic truth objects excluded |
| Three drift detectors: split-brain, contradiction worker, compaction drift | Section 6.5 drift control | `eval-harness` | P1 | |
| Nightly self-improvement loop may NOT silently mutate constitutional memory | Section 10.4 nightly loop constraints | `eval-harness` | P1 | Hard constraint |
| Nx + pnpm monorepo workspace | Section 12.1 monorepo cut | Infrastructure | P0 | First infrastructure action |
| MVP exit conditions: ingest→tiles, tapestry compile, OMC task constitution, Guard fail-closed, promotion, resume by signature | Section 12.4 MVP release criteria | All packages | P0 | Six concrete conditions |
| Do NOT commit to single upper ontology in core; use adapter posture | Section 3.4 upper ontology posture, Section 13 do-not list | `concept-registry` | P1 | BFO/DOLCE/SUMO/gist via adapters |
| Do NOT build huge persona library | Section 13 do-not list | `omc-router` | P1 | Static personas → thin constitutional flavor only |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Abstract + Section 1 | omoc, architecture, provenance, routing | OMC, Rosetta, Entif, Prism, Muninn, tapestry | technology | OMC is defined as a compiled task constitution made from taxonomy paths, frame-role structure, overlap zones, epistemic lenses, risk policy, tool/validator affordances, budget envelope, and rights constraints — NOT a biography or static persona | Abstract: "An Ontological Mixture of Concepts is a compiled task constitution" + Section 5.1 definition | Build OMC compiler before persona library; route by concept signature not persona label | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 2.1 | token-bleeding, performance | agent harnesses | risk | Five bad habits cause token bleed: prompt flooding, static personas, weak compaction, undisciplined memory promotion, self-improvement without economic objective | Section 2.1: items 1–5 | Treat each as a separate ablation target in eval harness | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 2.2 | nrvr, eval-kernel, novelty, relevance | eval framework | requirement | Four-axis eval kernel: Novelty, Relevance, Value-add, Resilience — must be applied without brittle deletion policy | Section 2.2: NRVR matrix | Implement NRVR scoring in eval-harness before autonomous self-editing | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 2.3 | survivorship, memory, suppression | memory architecture | requirement | Contextual survivorship rule: no artifact hard-deleted for low local utility alone; cross-context survivorship score computed over adjacent contexts | Section 2.3 formula + policy bullets | Implement survivorship scoring in activation-store; suppress not delete | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 3.1 | rossettta, constitutional-spine, entif | Rosetta, Entif | decision | Rosetta v3.0.0 provides constitutional spine: minimal core, content-addressed tiles, explicit Run→Action→ToolCall→Observation→Evaluation trace, pack extensibility | Section 3.1 | Land Rosetta core first; do not reinvent spine | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 3.2 | prism-mcp, muninndb, activation-memory, donor | Prism MCP, MuninnDB | technology | Prism MCP: ACT-R-inspired activation, Ebbinghaus decay, CRDT state merge, HDC routing, ambiguity warnings, "why" retrieval observability — treat as design donor not settled science. MuninnDB: explainable activation memory, recency/frequency, semantic triggers, graph traversal, Why scores, single-binary local-first | Section 3.2 | Favor MuninnDB clarity over Prism ambition for first activation-memory slice | medium |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 3.3 | wordnet, babelnet, verbAtlas, syntagNet, datamuse, ontology-scaffold | external lexical resources | technology | WordNet: lexical sense anchors/synsets. BabelNet: multilingual synset expansion. VerbAtlas: event/frame semantics over verb clusters. SyntagNet: disambiguating via syntagmatic relations. Datamuse: cheap lexical expansion, similarity, autocomplete — for deterministic-first stages | Section 3.3 | Import Datamuse for early deterministic lexical tooling; WordNet/BabelNet/VerbAtlas for semantic anchoring | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 3.4 | upper-ontology, gist, bfo, dolce, sumo, obo-foundry | ontology governance | technology | Do NOT force single monolithic upper ontology. Keep Rosetta core sovereign. Use SeedPack for project primitives. Import gist for quantitative/business semantics. Maintain adapters to BFO, DOLCE, SUMO. Use OBO Foundry principles for vocabulary governance: stable IDs, textual definitions, relation discipline, versioning | Section 3.4 | Adapter-first posture for upper ontologies; OBO Foundry governance for term stability | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 3.5 | thinking-tools, razors, untools, abductive-reasoning, loci | meta-reasoning | technology | Expose swappable packs for: philosophical razors (Occam, Hanlon, Hitchens, Hume, Popper, Sagan), Untools frameworks (inversion, 2nd-order, OODA, abstraction laddering, connection circles, iceberg), abductive sensemaking, method-of-loci as UI/retrieval metaphor | Section 3.5 | Pack-based reasoning toolkit; not hardwired | medium |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 3.6 | prontoqa, benchmarking, formal-reasoning | PrOntoQA | technology | PrOntoQA: formally analyzable, syntactically simple reasoning chains; OOD deductive stress tests — belongs in eval harness for concept specialist route calibration and deterministic-vs-generative comparison | Section 3.6 | Include in eval-harness benchmark suite | medium |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 3.7 | nerdm, metadata-adapter, json-ld, dcat | NERDm | technology | NERDm: typed resources, components, extension schemas, JSON-LD compatibility, DCAT/schema.org ties — strong pattern for resource manifests around artifacts, repositories, software tools, data files, compound resources | Section 3.7 | Use as artifact manifest adapter for compound project ingestion | medium |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 3.8 | gigabrain, nested-learning, world-model | GigaBrain, Nested Learning | technology | Nested Learning: distinct update rates for memory vs optimization (supports hot activations, semantic consolidation, procedural promotion, slow shard updates). GigaBrain: world-model pretraining, conditioning policy on predicted futures, deployment with HITL corrections, iterative joint refinement — later-phase for physical agents and high-cost search loops | Section 3.8 | Not MVP path; architecture should accommodate these for later phases | low |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 4.1 | invariants, non-negotiable | architecture | requirement | 12 non-negotiable invariants: (1) context=tapestry not prompt dump, (2) Ingress Refinery precedes memory/orchestration, (3) rights attach at ingest, (4) parse-only default, (5) Guard DecisionToken for all side effects, (6) Rosetta core minimal, (7) repeated success → deterministic substrate, (8) no hard-delete for low utility, (9) routing by concept signature not persona label, (10) stable prefix byte-for-byte, (11) every retrieval explainable with Why/confidence/ambiguity, (12) small receipt-bound deltas | Section 4.1 items 1–12 | These are the constitutional law of the system; test each in eval-harness | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 4.2 | layer-diagram, architecture | architecture | technology | Layer diagram: Raw Sources → Parse-Only Perimeter → Ingress Refinery → Pasigram/Tile Emission → Memory Constitution → Tapestry Compiler → OMC Router → Execution Hierarchy → Evaluation+Promotion → Swarm Exchange (optional) | Section 4.2 layer diagram | Implement layers in order; do not skip Ingress Refinery | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 4.3 | service-boundaries, microservices | service architecture | requirement | 13 services defined with clear boundaries: ingest-gateway, ingest-refinery, rpp-encode, concept-registry, activation-store, tapestry-builder, omc-router, guard-engine, run-orchestrator, eval-harness, swarmd | Section 4.3 table | Each service is a separate package; clear responsibility and output contract per service | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 5.2 | moe, concept-signature, routing | OMC vs MoE | requirement | OMC routes by concept overlap signature (e.g., `physics x amphibian physiology x propulsion`) NOT by static expert persona. Route target is "frog-rocketeering concept signature" not "frog expert" or "rocket expert" | Section 5.2 example | Design concept registry with overlap zone computation before building router | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 5.3 | task-constitution-schema, yaml | OMC schema | requirement | Task Constitution YAML schema defined: objective (task_class, success_shape), concept_signature (taxonomy_paths, frame_roles, overlap_hash, complexity_tranche), epistemic_policy (razors, reasoning_mode, abstention_threshold), economic_policy (max_token_budget, preferred_route, escalation_policy), rights_policy (tenant, sensitivity, allowed_consumers), tool_surface (tools, validators), memory_surface (constitutional/semantic/episodic/procedural ids) | Section 5.3 schema | Encode as `rosetta-schemas` package; validate before route compilation | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 5.4 | compile-algorithm, spawn, resume | OMC compile | requirement | Compile algorithm: (1) extract concept candidates via deterministic lexicon+graph anchors, (2) map to registry IDs and frame-role patterns, (3) compute overlap zones and complexity tranche, (4) select epistemic+budget policy, (5) search existing signatures with reuse history, (6) resume existing specialist if match, else spawn ephemeral specialist, (7) post-completion evaluate persist-or-discard | Section 5.4 | Implement compile algorithm in `omc-router`; step 6 enables session resume | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 5.5 | personas, static-lib | persona management | risk | Static persona libraries should mostly disappear; only thin constitutional flavor remains (voice/style, safety posture, permissions, durable stable preferences). Everything else compiled on-the-fly from task constitution | Section 5.5 | Do not build large persona library; treat as anti-pattern | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 6.1 | memory-planes, six-planes | memory architecture | requirement | Six distinct memory planes + activation memory: Constitutional (very slow), Semantic (slow), Episodic (medium), Procedural (medium-slow), Prospective (medium), Working (fast), Activation (very fast) | Section 6.1 table | Implement plane separation; different update rates per plane | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 6.2 | object-types, tile, tapestry, engram, receipt | object model | requirement | Fundamental object types: Observation (immutable raw/normalised external input), Form/Lexeme/Pasigram/Concept/Frame (Rosetta semantic layers), Receipt (proof with timestamps/costs/route/evidence), Tile (immutable content-addressed atomic), Tapestry (compiled bounded context bundle), Engram (retrieval-oriented memory with activation metadata), Procedure (reusable method/validator/transform), DecisionToken (signed Guard artifact) | Section 6.2 | Encode in `rosetta-schemas`; these are the core data model | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 6.3 | activation-scoring, why-score, composite-score | activation memory | requirement | Composite activation score: semantic_similarity + recency_decay + frequency + graph_proximity + support_confidence + route_success_prior − cost_to_hydrate − rights_mismatch_penalty. Every retrieval returns: top score, Why breakdown, ambiguity margin, confidence estimate, hydration status | Section 6.3 formula | Implement in `activation-store`; explainability is mandatory output contract | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 6.4 | crdt, merge, mutable-overlay | distributed state | requirement | CRDT governs mutable overlays ONLY: activation counters, route success priors, non-authoritative notes, local branch overlays, distributed queue/prospective state. CRDTs must NOT mutate constitutional or semantic truth objects in place | Section 6.4 | CRDT policy in `activation-store`; immutable tiles always immutable | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 6.5 | drift-detectors, contradiction, split-brain | eval/observability | requirement | Three drift detectors: (1) split-brain drift: same concept signature, diverging procedures/beliefs across agents, (2) contradiction worker: conflicting values/claims anchored to same concept/frame, (3) compaction drift: promoted truth no longer supported by underlying evidence bundle | Section 6.5 | Implement in `eval-harness`; all three needed for multi-agent safety | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 7 | ingress-refinery, pipeline, pillar-zero | ingest layer | requirement | Ingress Refinery is Pillar Zero: Acquire → Normalize → Segment → Bind provenance → Dedupe/revision detect → Risk/sensitivity score → Deterministic extraction → Lexical/ontology anchoring → Semantic escalation gate → Pasigram/tile emission → Promotion queue. Semantic escalation only when: deterministic confidence below threshold, artifact novel relative to semantic graph, cross-source contradiction, frame-role ambiguity, expected utility > cost, high-risk/high-stakes task class | Sections 7.2, 7.5 | Land before ingest-memory; escalation rule prevents premature LLM hydration | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 7.4 | nerdm-adapter, resource-manifest | artifact manifest | technology | NERDm adapter for compound project ingestion: resource type via JSON-LD @type, resource contains components, extension schemas by domain, DCAT/schema.org compatibility | Section 7.4 | Use for repository and dataset artifact ingestion; not raw text dump | medium |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 7.6 | success-metrics, ingest-metrics | observability | requirement | Success metrics for Ingress Refinery: duplicate suppression rate, hydration avoidance rate, cost per useful insight, deterministic promotion rate, semantic escalation precision, average provenance completeness, time-to-usable-tapestry | Section 7.6 | Instrument from day 1; these are leading indicators | medium |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 8.1 | four-zone-context, cache-geometry | context compiler | requirement | Four-zone context model: (1) Constitutional prefix [mission, policy, root identities, stable pack refs — change rarely], (2) Session-generalized truths [slowly changing abstractions, definitions, commitments, decisions], (3) Domain tapestries [rights-scoped, task-relevant semantic bundles for current concept signature], (4) Hot scratch delta [newest, most volatile turn-local info]. Top zones must be changed as rarely as possible and preserved byte-for-byte | Section 8.1 | This is the cache geometry contract; tapestry-builder implements it | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 8.2 | vendor-cache, prompt-caching | context compiler | requirement | OpenAI and Anthropic prompt caching rewards exact-prefix reuse: static content first, variable last, stable zones preserved exactly | Section 8.2 | Architectural constraint; compaction should rewrite bottom far more than top | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 8.3 | compaction-algorithm | context compiler | requirement | Compaction algorithm triggered on token pressure or cadence threshold: extract candidate truths/methods/decisions/commitments from hot scratch → NRVR score → promote stable ones to Session-generalized or Domain tapestry → demote unsupported scratch to episodic → preserve constitutional prefix bytes → re-emit tapestry manifest and receipt | Section 8.3 | Implement in `tapestry-builder`; preserve constitutional prefix at all costs | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 8.4 | sub-agent-context-budgets | context compiler | requirement | Main orchestrator: constitutional prefix + session-generalized truths + selected domain tapestries + minimal scratch. Domain planner: reduced constitutional slice + one domain tapestry + local scratch. Concept specialist: only concept-specific tapestry, local constraints, tool surface, narrow episodic reminders. Prevents 300k-token main session from becoming 300k-token everywhere | Section 8.4 | Enforce context budget hierarchy in `omc-router` dispatch | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 8.5 | session-resume, concept-signature | context compiler | requirement | Every completed run stores concept signature + tapestry manifest. Future requests: compute current signature → search nearest prior signatures → pull prior domain tapestries and procedural objects → resume from best-matching niche session instead of rebuilding from prose | Section 8.5 | Enable "frog rocketeering" to become resumable infrastructure; key differentiator | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 9.1 | compute-hierarchy, l0-l5 | compute routing | requirement | Five-layer compute hierarchy: L0 (deterministic perimeter parsers/classifiers/risk scorers), L1 (constitutional orchestrator/broad synthesis/arbitration — strongest model), L2 (domain planners/medium-complexity specialists — mid-tier), L3 (niche concept specialists bound to overlap signatures — small/narrow/fine-tuned), L4 (deterministic tools/validators — no LLM), L5 (swarm/public shard fetchers — deterministic + verifier-gated) | Section 9.1 table | Route cost increases with layer number; escalation should move up, not sideways | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 9.2 | route-score, escalation | routing | requirement | RouteScore formula: expected_task_fit + prior_success + context_reuse_score + cache_affinity − token_cost − latency_cost − privacy_exposure − ambiguity_penalty. Router chooses cheapest route clearing confidence/risk/validation thresholds | Section 9.2 | Implement in `omc-router`; cheapest-valid not best-fit is the law | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 9.3 | escalation-law | routing | requirement | Escalate only when: ambiguity is high, verifier rejects, cost of error exceeds escalation cost, or broader synthesis explicitly needed | Section 9.3 | Hard rule; do not escalate for comfort or habit | medium |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 9.4 | sharing-lanes, local-org-public-provider | data governance | requirement | Four sharing lanes: Local private, Organization shared, Public non-sensitive, Provider/ecosystem-wide generalized learnings. Only generalized, non-sensitive, provenance-carrying patterns eligible for public/provider sharing. Private memory never leaks | Section 9.4 | Rights policy enforcement in `tapestry-builder` and `swarmd` | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 9.5 | tiny-specialists, small-models | compute routing | requirement | Small model excellence when: narrow concept signature, compact tapestry, mature procedure library, strict verifier. Large models remain necessary at top for broad synthesis/arbitration but not default runtime for every niche subproblem | Section 9.5 | Architect for L3 tiny specialists from the start; do not default to largest model | medium |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 10.1 | run-emissions, receipts | eval/observability | requirement | Every run emits: route decision + rationale, tokens in/out, cache read/write status, latency, tool calls + diffs, receipts, verifier result, promotion decision, ambiguity + abstention signals | Section 10.1 | Receipt contract; all fields required for eval-harness to function | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 10.2 | core-metrics, dashboard | observability | requirement | Core dashboard metrics: cost per useful insight, cost per promoted method, deterministic promotion rate, context reuse rate, cache hit rate by zone, route calibration error, contradiction rate, hallucination/unsupported-claim rate, time-to-resume prior niche session, shareable public shard yield. NOT "total tokens used" | Section 10.2 | Define these as primary KPIs; total tokens is vanity metric | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 10.3 | benchmark-suite | eval/observability | requirement | Layered benchmark stack: PrOntoQA (formal deductive + OOD reasoning), custom route calibration harness for NRVR scoring, contradiction corpora for semantic drift, cache/compaction tests for prefix stability, policy/guard negative tests, retrieval explainability tests for Why-score integrity | Section 10.3 | Build eval-harness around this layered stack | medium |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 10.4 | nightly-loop, self-improvement | eval/observability | requirement | Nightly self-improvement may update: route thresholds, ambiguity cutoffs, promotion thresholds, deterministic extractors, vocabulary mappings, procedure confidence priors, specialist spawn/retirement decisions. May NOT silently mutate constitutional memory | Section 10.4 | Hard constraint; constitutional memory immutability is the firewall | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 11.1 | swarm-exchange, what-gets-shared | swarm gnosis | requirement | Swarm exchanges: public tiles/tapestries, validated procedures/transforms, benchmark fixtures/route profiles, ontology adapters/packs, public concept specialists/distilled shards. Does NOT exchange raw private memory by default | Section 11.1 | Privacy boundary for swarmd; private never touches public lane by default | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 11.2 | publication-object, signed-export | swarm gnosis | requirement | Every export carries: content ID, source lineage, rights classification, proof bundle/validation receipt, semantic signature, compatibility profile | Section 11.2 | Schema for `swarmd` publication objects | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 11.3 | reputation, adoption, provenance | swarm gnosis | requirement | Use provenance and proof not popularity for shard promotion. Shard promoted in swarm when: repeatable utility, high verification success, low drift, clean rights posture, declared pack compatibility | Section 11.3 | Anti-viral design; popularity ≠ quality in mycelial atlas | medium |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 12.1 | nx, pnpm, monorepo | infrastructure | requirement | Monorepo: Nx + pnpm workspace. Packages: rosetta-core, rosetta-schemas, receipt-ledger, guard-contracts, guard-engine, ingest-refinery, concept-registry, activation-store, tapestry-builder, omc-router, run-orchestrator, eval-harness, inspector-web, swarmd (deferred interface first) | Section 12.1 | First infrastructure action; 14 packages defined | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 12.2 | apis, first-apis | API surface | requirement | 11 first API endpoints: POST /ingest/normalize, /ingest/refine, /rpp/encode, /registry/resolve, /context/compile, /route/decide, /guard/evaluate, /run/execute, /eval/report, /swarm/publish | Section 12.2 | API contract; these become integration test targets | medium |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 12.3 | microtiers, build-plan, 4-hour | build sequencing | requirement | 13 microtiers (4-hour target each): Tier 0 (Nx+pnpm workspace), Tier 1 (rosetta-core + schemas, canon/CID/validate tests), Tier 2 (receipt-ledger), Tier 3 (guard-contracts + guard-engine, deny/allow tests), Tier 4 (run-orchestrator dry-run), Tier 5 (ingest-refinery v0, source→normalized envelope+receipt), Tier 6 (concept-registry v0, lexical anchors + overlap signatures), Tier 7 (tapestry-builder v0, rights-scoped compile), Tier 8 (omc-router v0, task constitution + route plan), Tier 9 (activation-store v0, Why-scored retrieval), Tier 10 (eval-harness v0, PrOntoQA + route calibration), Tier 11 (inspector-web, run trace in browser), Tier 12 (swarmd stub, signed publish + verify interface) | Section 12.3 table | Explicit exit condition per tier; 4-hour target keeps momentum | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 12.4 | mvp-release-criteria | milestone | requirement | MVP is real when: (1) ingest mixed artifact → normalized observations → Rosetta semantic objects with receipts, (2) compile tapestry not raw history flood, (3) compile OMC task constitution + route decision with explainable rationale, (4) side effect fails closed without Guard DecisionToken, (5) repeated successful runs promote ≥1 validator/transform/route profile into procedural memory, (6) niche concept signature resumed from prior run with lower token cost than cold start | Section 12.4 | Six concrete conditions; all must be true for MVP claim | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 13 | do-now-do-not, sequencing | build strategy | decision | Do now: Rosetta spine, Ingress Refinery before memory, concept registry + overlap signatures, tapestries + stable-prefix compaction, Guard + receipts everywhere, Why-scored retrieval + ambiguity notices, eval harness + route calibration before autonomous self-editing. Do NOT: huge public swarm first, single upper ontology in core, bespoke niche model training before route+eval evidence, hard-delete underperforming memories on local utility alone, huge persona library, letting OCR/multimodal/robotic delay ingest+tapestry MVP | Section 13 | Clear sequencing guardrails; follow do-now order | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 14 | source-incorporation-map, donor-list | external dependencies | dependency | Source incorporation map: 20+ external sources designated as donors with incorporation rationale. Key donors: Untools, philosophical razors, Kolko abductive thinking, method of loci, Prism MCP, MuninnDB, Roam, Ontoworks ontology index, Visakanv Google Doc (title-only), GigaBrain, top-level ontology survey, Semantic Arts gist, PrOntoQA, NERDm, i2Insights, Quartey taxonomy, Visakanv Losev essay, Datamuse API | Section 14 table | Track as external dependency list; some have access limitations noted in Section 15 | high |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 15 | evidence-quality, limitations | data quality | risk | Evidence limitations: Prism MCP evidence lives in repo docs/release notes (design donor only, not constitutional authority), MuninnDB stronger implementation clarity, Roam page content not directly accessible (directional only), Google Doc exposed only title (not evidentially usable), upper ontology commitment should remain adapter-first until SeedPack and concept registry stabilize | Section 15 | Flag these as evidence-quality caveats; do not overclaim authority from these sources | medium |
| 2026-04-24 | docs/RFCs/ontological_mixture_of_concepts_research_spec.md | Section 16 | final-verdict, build-order | build strategy | decision | Final build order: Rosetta spine → Ingress Refinery → concept registry → tapestries → OMC router → Guarded orchestration → eval harness → public swarm interfaces. Everything else is cathedral work after foundation cures | Section 16 | Authoritative sequencing; this is the canonical build order | high |

---

## Components And Technologies

- **rosetta-core** — constitutional semantic spine, minimal stable core with content-addressed tiles, explicit Run→Action→ToolCall→Observation→Evaluation trace
- **rosetta-schemas** — canonical schemas for all Rosetta object types (Tile, Tapestry, Engram, Receipt, DecisionToken, TaskConstitution, etc.)
- **receipt-ledger** — every core command emits a receipt; audit and trace infrastructure
- **guard-contracts** — deny-by-default policy contracts
- **guard-engine** — Guard decision token enforcement; fail-closed
- **ingest-gateway** — source capture, provenance binding, parse-only perimeter
- **ingest-refinery** — normalization, dedupe, revision detection, risk/sensitivity scoring, deterministic extraction, lexical/ontology anchoring, semantic escalation gate, pasigram/tile emission
- **rpp-encode** — map refined artifacts into forms, lexemes, pasigrams, concepts, frames
- **concept-registry** — lexical and ontology anchors, overlap signatures, frame-role mappings; adapters to WordNet/BabelNet/VerbAtlas/SyntagNet/Datamuse
- **activation-store** — recency/frequency, graph triggers, Why scores, ambiguity margins, CRDT merge for mutable overlays
- **tapestry-builder** — rights-scoped compiled contexts with stable prefix policy, four-zone context model
- **omc-router** — compile task constitution, compute overlap zones, choose cheapest-valid route, explain decision
- **run-orchestrator** — execute plans, call tools, collect evidence, log receipts
- **eval-harness** — benchmark routes, detect drift, score promotion decisions; layered benchmark stack (PrOntoQA, NRVR, contradiction corpora, cache tests, guard negative tests)
- **inspector-web** — run trace visible in browser
- **swarmd** — publish or ingest signed public shards; reputation and adoption via provenance/proof

---

## Conceptual Claims

- The correct replacement for token-bleeding harnesses is NOT another expert marketplace or persona zoo — it is a provenance-first concept operating system where routing occurs by concept signature rather than static persona label
- OMC (Ontological Mixture of Concepts) is superior to MoE (Mixture of Experts) because concepts are often too broad for one expert and too cross-cutting for one specialty; the route target is the concept overlap signature not the expert
- No artifact may be hard-deleted only because it scored poorly in one context; active suppression + cross-context survivorship scoring replaces brittle deletion policy
- Parse-only is the correct default for unknown inbound content; LLM escalation is expensive and should only trigger when deterministic extraction confidence is below threshold or other escalation conditions are met
- Stable context prefixes must be preserved byte-for-byte to maximize vendor prompt cache hits; compaction should rewrite the bottom far more often than the top
- Sub-agents must carry reduced context budgets; a 300k-token main orchestrator should not become a 300k-token problem everywhere
- Nightly self-improvement loops may update thresholds, mappings, and priors but may NOT silently mutate constitutional memory
- The Swarm Gnosis public exchange lane must use provenance and proof for shard promotion, not popularity; popularity ≠ quality in a mycelial atlas

---

## Dependencies And Sequencing

- **Prerequisite:** Rosetta v3.0.0 constitutional spine must be landed first (Section 3.1, Section 12.3 Tier 1)
- **Ingress Refinery must land before ingest-memory** (Section 4.1 invariant #2, Section 13 do-now)
- **eval-harness + route calibration must land before autonomous self-editing** (Section 13 do-now)
- **concept-registry** (Tier 6) must precede **omc-router** (Tier 8) because router depends on registry for overlap signatures
- **activation-store** (Tier 9) must precede full eval-harness operation (Tier 10)
- **guard-engine** (Tier 3) must precede **run-orchestrator** (Tier 4) because orchestration requires Guard DecisionTokens
- **tapestry-builder** (Tier 7) is prerequisite for **omc-router** (Tier 8) task constitution compilation
- **swarmd** (Tier 12) is explicitly deferred interface first; not on critical path
- External donors with access limitations (Roam page content, Google Doc body) are directional only, not evidence-grade
- Upper ontology commitment deferred until SeedPack and concept registry stabilize (Section 15 caveat)

---

## Contradictions Or Supersession

- **No contradiction found with prior processed documents** — this spec is consistent with and expands upon the OMOC Swarm Gnosis Protocol Spec (which was already processed). This spec provides deeper architectural detail, more complete service boundary definitions, and the 13-tier micro-build plan where the prior spec provided the protocol layer.
- **Important refinement over prior spec:** This spec explicitly defines the four-zone context model (Section 8.1) with byte-for-byte prefix preservation — a concrete cache geometry mechanism not fully articulated in the prior spec.
- **Important refinement:** Section 6.3 composite activation scoring formula is new detail — explicit weight variables (b1–b8) for activation components, not present in prior spec.
- **Important refinement:** Section 2.3 contextual survivorship rule with the explicit Utility_i(q) and Survivorship_i formulas — mathematically precise policy that was conceptual in the prior spec.
- **Supersession candidate:** The microtier build plan (Section 12.3, 13 tiers) supersedes any informal build sequencing from prior specs; it is the authoritative build order.
- **Supersession candidate:** Section 13 do-now/do-not list is the authoritative sequencing guardrail for the build; prior spec did not have an explicit do-not list.

---

## Issue Candidates

| Title | Type | Draft | Labels | Depends On | Evidence |
|---|---|---|---|---|---|
| Activation-store composite score: normalize b1-b8 weights empirically | issue-candidate | `docs/intake/issue-drafts/omc-activation-store-score-calibration.md` | activation-memory, weights, eval | Tier 9 (activation-store v0) | Section 6.3 formula with 8 uncalibrated weight variables; current values unknown |
| CRDT implementation choice: select library for mutable overlay merge | issue-candidate | `docs/intake/issue-drafts/omc-crdt-overlay-library-choice.md` | crdt, distributed-state, infrastructure | Tier 9 (activation-store v0) | Section 6.4 requires CRDT for mutable overlays; no specific library named |
| Datamuse API rate limits and caching strategy for deterministic lexical expansion | issue-candidate | `docs/intake/issue-drafts/omc-datamuse-rate-limits-and-cache.md` | datamuse, rate-limits, caching | Tier 6 (concept-registry v0) | Section 3.3 designates Datamuse for deterministic-first stages; no rate-limit plan documented |
| Four-zone compaction trigger: define token-pressure and cadence-threshold values | issue-candidate | `docs/intake/issue-drafts/omc-four-zone-compaction-thresholds.md` | compaction, cache, thresholds | Tier 7 (tapestry-builder v0) | Section 8.3 references token pressure or cadence threshold trigger; concrete values TBD |
| Sub-agent context budget limits: define max tokens per layer (L1/L2/L3) | issue-candidate | `docs/intake/issue-drafts/omc-subagent-context-budget-limits.md` | context-budget, routing, subagents | Tier 8 (omc-router v0) | Section 8.4 describes budget hierarchy but no concrete token limits per layer |
| RouteScore c1-c8 weights: calibrate via eval-harness route calibration harness | issue-candidate | `docs/intake/issue-drafts/omc-routescore-calibration-harness.md` | routing, weights, eval | Tier 8 (omc-router v0), Tier 10 (eval-harness v0) | Section 9.2 RouteScore formula has 8 uncalibrated coefficients |
| Nightly self-improvement: mutation policy for constitutional memory - how is it enforced? | issue-candidate | `docs/intake/issue-drafts/omc-constitutional-memory-mutation-policy.md` | self-improvement, constitutional-memory, governance | Tier 10 (eval-harness v0) | Section 10.4 says "may NOT silently mutate constitutional memory" but no enforcement mechanism defined |
| NERDm adapter: JSON-LD context document and schema version to use | issue-candidate | `docs/intake/issue-drafts/omc-nerdm-jsonld-context-version.md` | nerdm, json-ld, metadata | Tier 5 (ingest-refinery v0) | Section 7.4 designates NERDm pattern but no specific schema version or context document chosen |
| Tiny specialist model selection: criteria for when L3 spawns small model vs delegates to L1/L2 | issue-candidate | `docs/intake/issue-drafts/omc-tiny-specialist-model-selection.md` | tiny-specialists, routing, llm-selection | Tier 8 (omc-router v0) | Section 9.5 gives necessary conditions but no decision tree for model selection |
| Swarms reputation: how is "repeatable utility" and "low drift" measured operationally? | issue-candidate | `docs/intake/issue-drafts/omc-swarm-reputation-metrics.md` | swarm, reputation, metrics | Tier 12 (swarmd stub) | Section 11.3 says use provenance/proof not popularity but no concrete metric definitions |

---

## Project Board Suggestions

- **Area:** Entif/Rosetta core infrastructure
- **Cycle:** MVP build (Tiers 0–11, 4-hour microtiers)
- **Status:** Ready to queue — this spec is the build specification for OMC layer above Rosetta spine
- **Blocked by:** Rosetta v3.0.0 constitutional spine (Tier 1 prerequisite); Ingress Refinery must precede memory
- **Parallelization notes:**
  - Tier 1 (rosetta-core + schemas) and Tier 2 (receipt-ledger) can be parallelized after Tier 0 workspace setup
  - Tier 3 (guard contracts) is independent until Tier 4 (orchestrator dry-run)
  - Tier 5 (ingest-refinery) and Tier 6 (concept-registry) can run in parallel after Tier 3
  - Tier 7 (tapestry-builder) and Tier 8 (omc-router) have shared interface dependency on Tier 6 output
  - Tier 9 (activation-store) is independent after Tier 6
  - Tier 10 (eval-harness) depends on Tiers 5, 7, 8, 9 all being green
  - Tier 11 (inspector-web) and Tier 12 (swarmd stub) are deferred and can be parallel to each other but not on critical MVP path

---

## Open Questions

1. **RouteScore and Activation weight calibration:** 16 uncalibrated coefficients (b1–b8 for activation, c1–c8 for routing) — how are initial values set and by what empirical process are they refined?
2. **CRDT library selection:** Which specific CRDT library is appropriate for the mutable overlay use case? Yjs? Automerge? Something lighter?
3. **Datamuse API rate limits:** What caching strategy prevents rate-limit failures during high-throughput ingest? What is the fallback when Datamuse is unavailable?
4. **Compaction trigger threshold:** What are the concrete token-pressure and cadence-threshold values that trigger compaction? Are these tunable per tenant?
5. **Constitutional memory mutation policy:** If nightly loops may NOT silently mutate constitutional memory, what is the authorized mutation path? Who approves? Is there a versioned constitutional update mechanism?
6. **Upper ontology adapter completeness:** Which specific terms from BFO/DOLCE/SUMO/gist are mapped in the SeedPack v1? What is the criteria for including vs deferring to adapter?
7. **Swarm shard "repeatable utility" metric:** How is this measured operationally? Through eval-harness? Through direct swarm adoption metrics? Over what time window?
8. **Tiny specialist model registry:** Where is the registry of approved small/narrow/fine-tuned models for L3 specialists? Who governs what can be spawned?
9. **L3 model selection decision tree:** Given a concept signature and complexity tranche, what exact logic determines whether to spawn a tiny specialist (L3) vs delegate to mid-tier (L2) or escalate to L1?
10. **NERDm schema version:** Which NERDm schema version (1.0, 1.1, 1.2) and JSON-LD context document is used? Is there a custom Rosetta extension schema atop NERDm?
11. **Multi-agent split-brain detection:** What is the communication protocol between agents for detecting split-brain drift? Is there a shared concept registry heartbeat?
12. **Abstention threshold calibration:** Section 5.3 TaskConstitution schema includes `abstention_threshold: 0.72` — is this a universal constant or per-domain tunable?
13. **Swarmd reputation propagation:** When a shard is adopted by one node and then rejected by another, does reputation flow backward? What is the decay model for reputation?
14. **Scope creep risk — OCR/multimodal/robotic lanes:** Section 13 explicitly says do not let these delay the ingest+tapestry MVP, but what is the integration path for these modalities post-MVP? Are they separate packs or first-class citizens?
