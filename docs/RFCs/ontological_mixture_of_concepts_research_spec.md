# Ontological Mixture of Concepts
## A provenance-first research paper and engineering specification for token-efficient agentic cognition

**Date:** April 12, 2026  
**Status:** Working paper and build specification  
**Scope:** Entif + Rosetta + Prism-style memory + Muninn-style activation + ontology/taxonomy scaffolding + cache-aware orchestration + swarm exchange

## Semantic authority and terminology status

This is a working research precursor. Rosetta v3 controls current Rosetta terms and protocol structure. The later accepted project direction uses **Ontological Mixture of Concepts (OMOC)**; unqualified **OMC** references here are preserved as historical naming unless a current authority explicitly maps or retains them.

Schemas, scoring constructs, memory classes, and orchestration envelopes proposed here are research or Entif application candidates until accepted through their proper RFC/PRD/Pack governance. They do not redefine Rosetta core by repetition.

---

## Abstract

This paper proposes an architecture for replacing token-bleeding agent harnesses with a provenance-first, concept-routed cognitive operating model. The central claim is that the next useful generation of agent orchestration will not come from larger monolithic prompts, static persona libraries, or generic mixture-of-experts routing. It will come from five things working together:

1. **A constitutional semantic spine** that treats meaning, process, provenance, and policy as first-class artifacts.
2. **An Ingress Refinery** that canonicalizes, deduplicates, risk-scores, and semantically anchors all external content before memory or orchestration see it.
3. **An Ontological Mixture of Concepts (OMC)** layer that compiles task-specific concept bundles and routes work by concept signature rather than by static agent identity.
4. **A memory constitution** that separates constitutional, semantic, episodic, procedural, prospective, and activation memory, while preserving cross-context usefulness rather than hard-deleting information that only failed in one context.
5. **A context compiler** that emits rights-scoped tapestries optimized for provider prompt caching, sub-agent specialization, deterministic promotion, and swarm exchange.

Rosetta provides the constitutional backbone: content-addressed tiles, explicit Run -> Action -> ToolCall -> Observation -> Evaluation traces, packs for extension rather than core bloat, and explicit provenance and uncertainty handling. Entif provides the orchestration thesis: receipts-first execution, cheap-first verification, parse-only defaults, a Guard Layer, and phased build slices. Prism MCP and MuninnDB contribute activation-memory, decay, spreading activation, observability, CRDT merge, and explainable retrieval patterns. External taxonomy, ontology, and reasoning resources such as WordNet, BabelNet, VerbAtlas, SyntagNet, gist, OBO Foundry principles, PrOntoQA, philosophical razors, Untools, abductive sensemaking, method-of-loci techniques, Datamuse, and NERDm provide the scaffold needed to avoid reinventing the wheel.

The result is a buildable blueprint for a mycelial metacognitive atlas: a system that thinks in concept tranches, compacts context toward stable truths, routes compute by niche demand and semantic overlap, and converts repeated successful cognition into reusable, low-cost substrate.

---

## 1. Executive thesis

Current agent harnesses waste tokens because they treat context as undifferentiated prompt matter. They overfeed broad `soul.md` or `user.md` files, re-ingest the same background every loop, and rarely distinguish between what is stable, what is dynamic, what is proprietary, what is cross-context reusable, and what should become a deterministic method instead of another expensive inference.

The correct replacement is not another expert marketplace and not another persona zoo. The correct replacement is a **provenance-first concept operating system**:

- Rosetta is the constitutional semantic spine.
- Entif is the guarded orchestration and receipts substrate.
- OMC is the routing law that compiles mixtures of concepts on demand.
- Prism-style and Muninn-style activation memory are the cognitive metabolism.
- Tapestries and tiles are the unit of compact reusable context.
- Swarm Gnosis is the late-phase public exchange layer for non-private learned shards.

This system should optimize not for “more context” but for **more value density per token, per retrieval, per route, and per retained artifact**.

---

## 2. The problem, stated precisely

### 2.1 Why current harnesses bleed tokens

Most current systems fail because they combine five bad habits:

1. **Prompt flooding:** they pass giant raw context histories instead of compiled minimal tapestries.
2. **Static personas:** they use manually curated identity files that are too broad and too stale.
3. **Weak compaction:** they summarize indiscriminately, destroying cache stability and collapsing distinct evidence layers.
4. **Undisciplined memory promotion:** they log everything, promote too much, and forget the difference between event traces, semantic abstractions, and reusable procedures.
5. **Self-improvement without an economic objective:** they loop forever without a sharp utility function, so they optimize locally trivial things and burn inference budget for low-value deltas.

### 2.2 The missing optimization kernel

The right eval kernel is a four-axis matrix:

- **Novelty:** what is new relative to current graph state, route history, and existing procedures?
- **Relevance:** how strongly does this help the current task, route, or adjacent concept neighborhoods?
- **Value-add:** what measurable gain does it produce relative to cost?
- **Resilience:** will the gain persist across turns, sessions, contexts, or adversarial conditions?

These axes must be applied without a brittle deletion policy. A concept, tile, or chunk that fails in one scenario may be high-value in a neighboring one. Therefore the architecture must separate **active suppression** from **hard deletion**.

### 2.3 The contextual survivorship rule

No artifact may be hard-deleted only because it scored poorly in one context.

Instead, every candidate memory or method object receives both a **local utility score** and a **cross-context survivorship score**.

```text
Utility_i(q) = aN*N_i(q) + aR*R_i(q) + aV*V_i(q) + aS*S_i(q)
               - aC*Cost_i(q) - aK*Risk_i(q)

Survivorship_i = max Utility_i(c)
                 for c in adjacent_contexts(q)
```

Policy:

- Promote when `Utility` is high and provenance is complete.
- Hold in cold memory when `Utility` is low but `Survivorship` remains above floor.
- Demote when both are low.
- Hard delete only for explicit retention, privacy, or corruption reasons.

This single rule prevents the system from kneecapping niche specialists just because they were not useful in the present turn.

---

## 3. Research synthesis: what should be imported instead of reinvented

### 3.1 Constitutional semantic spine

Rosetta v3.0.0 already defines the right constitutional posture: minimal stable core, content-addressed tiles, explicit separation between raw signals and later interpretations, a universal Run -> Action -> ToolCall -> Observation -> Evaluation trace, and pack-based extensibility instead of core inflation. Entif’s April 2026 blueprints add the operating law: context should be compiled as tapestries rather than dumped as prompts; ingress must occur before memory or orchestration; rights and sensitivity attach at ingest; side effects sit behind a deny-by-default Guard Layer; repeated successful cognition should be deterministically promoted into substrate; and work should ship as small receipt-bound deltas.

### 3.2 Memory and retrieval donors

Two public projects are especially useful as design donors:

- **Prism MCP** contributes an ambitious public recipe for ACT-R-inspired activation, Ebbinghaus-style decay, CRDT state merge, HDC routing, ambiguity warnings, and “why” style retrieval observability. Treat it as a design donor, not as settled science.
- **MuninnDB** contributes an especially pragmatic and implementation-friendly model of explainable activation memory. The most important patterns are recency/frequency scoring, semantic triggers, graph traversal, confidence and “Why” explanations, and a single-binary local-first posture.

### 3.3 Ontology and lexical scaffold

The architecture should not invent its taxonomy from scratch. It should combine:

- **WordNet** for lexical sense anchors and synsets.
- **BabelNet** for multilingual synset expansion and cross-resource linking.
- **VerbAtlas** for event/frame semantics over verb clusters.
- **SyntagNet** for disambiguating lexical meaning through syntagmatic relations.
- **Datamuse** for cheap lexical expansion, word-finding, similarity hints, autocomplete, and retrieval helpers in deterministic-first stages.

### 3.4 Upper ontology posture

Do not force a single monolithic upper ontology into the core.

Instead:

- Keep Rosetta’s core spine sovereign.
- Use a **SeedPack** for the project’s own bounded primitive basis.
- Import **gist** for quantitative and business/data semantics where its practical value is highest.
- Maintain adapters to **BFO**, **DOLCE**, and **SUMO** rather than entombing one of them in the constitutional layer.
- Use **OBO Foundry principles** for vocabulary governance: stable identifiers, textual definitions, relation discipline, versioning, maintenance, and term stability.

This avoids ontology religion while preserving interoperability.

### 3.5 Thinking tools and meta-reasoning packs

The system should not hardwire a single reasoning style. It should expose explicit, swappable packs for:

- **Philosophical razors** such as Occam, Hanlon, Hitchens, Hume, Popper, Sagan.
- **Untools** decision frameworks such as inversion, second-order thinking, abstraction laddering, OODA loops, connection circles, and iceberg models.
- **Abductive sensemaking**, which treats synthesis as the creation of the best available explanatory structure from incomplete evidence.
- **Method of loci / memory-palace metaphors**, not as literal storage mechanics, but as UI and retrieval design inspiration for concept neighborhoods, route rooms, and layered memory spaces.

### 3.6 Formal reasoning and benchmarking

For the reasoning stack, **PrOntoQA** is useful because it is explicitly designed for formally analyzable, syntactically simple chains of reasoning and OOD deductive stress tests. It belongs in the eval harness for concept specialists, route calibration, and deterministic-vs-generative comparison.

### 3.7 Data/resource metadata adapters

**NERDm** is valuable as a metadata adapter pack. It already models typed resources, components, extension schemas, JSON-LD compatibility, and explicit ties to DCAT and schema.org. It is a strong pattern for resource manifests around artifacts, repositories, software tools, data files, and compound resources.

### 3.8 Multi-rate learning and world-model donors

Two external threads matter here:

- **Nested Learning** contributes the key idea that memory and optimization should operate on distinct update rates. This directly supports the architecture’s separation between hot activations, semantic consolidation, procedural promotion, and slow model or shard updates.
- **GigaBrain** contributes a useful multi-stage pattern for future embodied or simulation-heavy loops: world-model pretraining, conditioning policy on predicted futures and values, deployment with human-in-the-loop corrections, and iterative joint refinement. This is not the MVP path, but it is important for later physical agents and high-cost search loops.

---

## 4. The constitutional architecture

### 4.1 Non-negotiable invariants

These are the architecture’s hard laws.

1. **Context is tapestry, not prompt dump.**
2. **Ingress Refinery precedes memory and orchestration.**
3. **Rights, tenancy, sensitivity, and consumer scope attach at ingest.**
4. **Parse-only is the default mode for unknown inbound content.**
5. **All side effects require a Guard decision token.**
6. **Rosetta core remains minimal; domain and interface complexity lives in packs.**
7. **Repeated successful cognition becomes deterministic substrate where possible.**
8. **Artifacts are not hard-deleted merely for low local utility.**
9. **Routing occurs by concept signature, not by static persona label.**
10. **Stable context prefixes are preserved byte-for-byte when possible to maximize vendor cache hits.**
11. **Every retrieval and route should be explainable enough to produce a Why score, confidence, and ambiguity notice.**
12. **All work is decomposed into small, testable, receipt-bound deltas.**

### 4.2 Layer diagram

```text
Raw Sources
  -> Parse-Only Perimeter
  -> Ingress Refinery
  -> Pasigram / Tile Emission
  -> Memory Constitution
  -> Tapestry Compiler
  -> OMC Router
  -> Execution Hierarchy
  -> Evaluation + Promotion
  -> Swarm Exchange (optional lane)
```

### 4.3 Service boundaries

| Service | Responsibility | Output |
|---|---|---|
| `ingest-gateway` | source capture, provenance binding, parse-only perimeter | raw observations + receipts |
| `ingest-refinery` | normalization, dedupe, revision detection, risk and sensitivity scoring, deterministic extraction | refined artifact envelopes |
| `rpp-encode` | map refined artifacts into forms, lexemes, pasigrams, concepts, frames | typed Rosetta tiles |
| `concept-registry` | lexical and ontology anchors, overlap signatures, frame-role mappings | concept IDs, frame IDs, similarity hints |
| `activation-store` | recency/frequency, graph triggers, Why scores, ambiguity margins | ranked candidate memories |
| `tapestry-builder` | rights-scoped compiled contexts with stable prefix policy | tapestry manifests |
| `omc-router` | compile task constitution and route hierarchy | route decision + rationale |
| `guard-engine` | deny-by-default policy enforcement and decision tokens | signed allow/deny decisions |
| `run-orchestrator` | execute plans, call tools, collect evidence, log receipts | runs, actions, receipts |
| `eval-harness` | benchmark routes, detect drift, score promotion decisions | eval reports and deltas |
| `swarmd` | publish or ingest signed public shards | public tile and tapestry exchange |

---

## 5. Ontological Mixture of Concepts (OMC)

### 5.1 Definition

An Ontological Mixture of Concepts is a compiled task constitution made from:

- taxonomy paths
- frame-role structure
- overlap zones between domains
- epistemic lenses
- risk policy
- tool and validator affordances
- budget envelope
- rights constraints

It is **not** a biography. It is not “you are an expert geologist with 20 years of experience.” It is a machine-usable concept constitution for a particular problem state.

### 5.2 Why OMC instead of MoE

Mixture-of-experts routes among broad experts. That helps throughput, but it does not solve your actual problem: concepts are often too broad for one expert and too cross-cutting for one specialty. The right object is not the expert. It is the **concept overlap signature**.

Examples:

- `science > physics`
- `biology > amphibian physiology`
- `engineering > propulsion`
- overlap: `physics x amphibian physiology x propulsion`

The route target is not “the frog expert” or “the rocket expert.” It is the **frog-rocketeering concept signature**.

### 5.3 Task constitution schema

```yaml
TaskConstitution:
  objective:
    task_class: design | diagnose | retrieve | compare | plan | execute
    success_shape: string
  concept_signature:
    taxonomy_paths: []
    frame_roles: []
    overlap_hash: string
    complexity_tranche: broad | domain | niche | ultra_niche
  epistemic_policy:
    razors: [occam, hitchens]
    reasoning_mode: abductive + deductive
    abstention_threshold: 0.72
  economic_policy:
    max_token_budget: int
    preferred_route: cheap_first
    escalation_policy: verifier_gated
  rights_policy:
    tenant: string
    sensitivity: public | org | private | sealed
    allowed_consumers: []
  tool_surface:
    tools: []
    validators: []
  memory_surface:
    constitutional: ids[]
    semantic: ids[]
    episodic: ids[]
    procedures: ids[]
```

### 5.4 Compile algorithm

1. Extract concept candidates from the request using deterministic lexicon and graph anchors first.
2. Map candidates to registry IDs and frame-role patterns.
3. Compute overlap zones and complexity tranche.
4. Select epistemic policy pack and budget policy.
5. Search for existing concept signatures with strong reuse history.
6. If a matching specialist already exists, resume it.
7. Otherwise spawn an ephemeral specialist bound to this constitution.
8. After completion, evaluate whether this constitution should be persisted as a reusable specialist profile.

### 5.5 Dynamic personas, properly understood

Static persona libraries should mostly disappear.

What remains should be thin constitutional flavor, not giant soul files:

- voice and interaction style
- safety posture
- permissions and governance
- durable preferences that are genuinely stable

Everything else should be compiled on the fly from the task constitution.

---

## 6. Memory Constitution v1

### 6.1 Memory planes

The architecture needs distinct memory planes with different update rates.

| Memory plane | What it stores | Mutation rate | Typical consumer |
|---|---|---|---|
| Constitutional | mission, policy, identity, root constraints, canonical packs | very slow | all routes |
| Semantic | concepts, frames, ontological links, quantitative semantics | slow | routers, retrievers, planners |
| Episodic | conversations, events, runs, receipts, observations | medium | resume, audit, learning |
| Procedural | methods, validators, transforms, route profiles, templates | medium-slow | tools, planners, specialists |
| Prospective | queues, commitments, deferred tasks, reminders | medium | orchestrator |
| Working | current session scratch and hot deltas | fast | current active route |
| Activation | recency, frequency, graph activation, Why scores, ambiguity metrics | very fast | retriever, router |

### 6.2 Fundamental object types

- **Observation**: immutable raw or normalized external input.
- **Form/Lexeme/Pasigram/Concept/Frame**: Rosetta semantic layers.
- **Receipt**: proof of what happened, with timestamps, costs, route, and evidence.
- **Tile**: immutable content-addressed atomic unit.
- **Tapestry**: compiled bounded context bundle for a consumer and purpose.
- **Engram**: retrieval-oriented memory object with activation metadata.
- **Procedure**: reusable method object, validator, or transformation.
- **DecisionToken**: signed Guard artifact permitting a side effect.

### 6.3 Activation scoring

Use an explainable composite score inspired by Prism and Muninn patterns:

```text
Activation =
  b1 * semantic_similarity
+ b2 * recency_decay
+ b3 * frequency
+ b4 * graph_proximity
+ b5 * support_confidence
+ b6 * route_success_prior
- b7 * cost_to_hydrate
- b8 * rights_mismatch_penalty
```

Each retrieval should return:

- top score
- Why breakdown by factors
- ambiguity margin to next candidates
- confidence estimate
- whether hydration was avoided or required

### 6.4 CRDT merge and branch handling

For multi-agent state, use CRDT-compatible merge objects for mutable overlays only.

Immutable tiles stay immutable.

CRDTs should govern:

- activation counters
- route success priors
- non-authoritative notes
- local branch overlays
- distributed queue or prospective state

Do not use CRDTs to mutate constitutional or semantic truth objects in place.

### 6.5 Drift and contradiction control

Implement three distinct detectors:

- **Split-brain drift detector:** same concept signature, diverging procedures or beliefs across agents.
- **Contradiction worker:** conflicting values or claims anchored to same concept/frame.
- **Compaction drift detector:** summary or promoted truth no longer supported by underlying evidence bundle.

---

## 7. Ingress Refinery and Economic Decoding Fabric

### 7.1 Why this layer exists

Nothing external should flow directly into memory, orchestration, or model context. The Ingress Refinery is Pillar Zero because it decides what becomes expensive and what can remain cheap.

### 7.2 Pipeline stages

```text
Acquire
-> Normalize
-> Segment
-> Bind provenance
-> Dedupe / revision detect
-> Risk and sensitivity score
-> Deterministic extraction
-> Lexical and ontology anchoring
-> Semantic escalation gate
-> Pasigram / tile emission
-> Promotion queue
```

### 7.3 Stage details

**Acquire**
- Accept text, Markdown, PDFs, docx, logs, emails, code, transcripts, web pages, image OCR products, resource manifests.

**Normalize**
- Convert source into canonical envelope.
- Preserve original bytes and hashes.
- Add source metadata and retrieval method.

**Segment**
- Split by semantic boundaries, speaker turns, structural markers, code AST units, table blocks, or resource components.

**Provenance bind**
- Attach source, timestamps, extraction method, tool version, and rights metadata.

**Dedupe / revision detect**
- Use hashes, fuzzy similarity, AST fingerprinting, revision lineage, and manifest comparison.
- Suppress duplicates before hydration.

**Risk and sensitivity score**
- PII, credentials, legal sensitivity, organization scope, safety risk, malicious prompt or document indicators.

**Deterministic extraction**
- Named entities, dates, units, schema fields, code structure, resource metadata, tabular headers, lexical hints.
- Use Datamuse, WordNet-like anchors, regexes, parsers, and direct schema validation where possible.

**Ontology anchoring**
- Map concepts and relations to SeedPack, WordNet/BabelNet/VerbAtlas/SyntagNet, and optional upper-kernel adapters.

**Semantic escalation gate**
- Invoke an LLM only when ambiguity, novelty, complexity, or expected value exceeds threshold.
- Unknown content starts in parse-only mode.

**Pasigram and tile emission**
- Emit Rosetta objects and receipts.

### 7.4 NERDm adapter

For resources such as repositories, software tools, datasets, documentation folders, or mixed artifact collections, use a NERDm-style resource manifest adapter:

- resource type via JSON-LD `@type`
- resource contains components
- extension schemas by domain
- DCAT/schema.org compatibility

This becomes the artifact manifest lane for ingesting compound projects rather than treating everything as raw text.

### 7.5 Semantic escalation rule

Only escalate when one of the following is true:

1. deterministic extraction confidence is below threshold,
2. the artifact is novel relative to the current semantic graph,
3. cross-source contradiction exists,
4. frame-role resolution remains ambiguous,
5. expected utility of deeper decomposition exceeds expected cost,
6. the artifact is requested by a high-risk or high-stakes task class.

### 7.6 Success metrics

- duplicate suppression rate
- hydration avoidance rate
- cost per useful insight
- deterministic promotion rate
- semantic escalation precision
- average provenance completeness
- time-to-usable-tapestry

---

## 8. Context Compiler and cache geometry

### 8.1 The four-zone context model

To preserve cache stability and reduce repeated prompt costs, context should be arranged in four zones.

1. **Constitutional prefix**
   - mission, policy, root identities, stable pack references.
2. **Session-generalized truths**
   - slowly changing abstractions, definitions, commitments, decisions already supported.
3. **Domain tapestries**
   - rights-scoped, task-relevant semantic bundles for the current concept signature.
4. **Hot scratch delta**
   - newest, most volatile turn-local information.

The top zones must be changed as rarely as possible and preserved byte-for-byte where possible.

### 8.2 Why this helps provider caching

Prompt caching by OpenAI and Anthropic rewards exact-prefix reuse. Therefore:

- static content goes first,
- variable content goes last,
- stable constitutional and generalized zones must be preserved exactly,
- compaction should rewrite the bottom far more often than the top.

### 8.3 Compaction algorithm

When token pressure or cadence threshold is hit:

1. extract candidate truths, methods, decisions, and commitments from hot scratch,
2. score them for NRVR utility and survivorship,
3. promote stable ones to Session-generalized or Domain tapestry zones,
4. demote unsupported scratch to episodic memory,
5. preserve the constitutional prefix and stable generalized bytes wherever possible,
6. re-emit a fresh tapestry manifest and receipt.

### 8.4 Sub-agent context budgets

The main orchestrator may carry a large compiled context. Specialists should not.

Recommended pattern:

- main orchestrator: constitutional prefix + session-generalized truths + selected domain tapestries + minimal scratch
- domain planner: reduced constitutional slice + one domain tapestry + local scratch
- concept specialist: only the concept-specific tapestry, local constraints, tool surface, and narrow episodic reminders

This prevents a 300k-token main session from becoming a 300k-token problem everywhere.

### 8.5 Session resume by concept signature

Every completed run stores a concept signature and a tapestry manifest. On a future request:

- compute current concept signature,
- search nearest prior signatures,
- pull prior domain tapestries and procedural objects,
- resume from the best-matching niche session instead of rebuilding from prose.

That is how “frog rocketeering” becomes resumable infrastructure rather than a joke retold from scratch.

---

## 9. Routing and compute hierarchy

### 9.1 Agent classes

| Layer | Role | Typical compute |
|---|---|---|
| L0 | perimeter parsers, classifiers, risk scorers, schema validators | deterministic or tiny local models |
| L1 | constitutional orchestrator, broad synthesis, arbitration | strongest general model available |
| L2 | domain planners and medium-complexity specialists | mid-tier models |
| L3 | niche concept specialists bound to overlap signatures | small, narrow, or fine-tuned models |
| L4 | deterministic tools, search, validators, transforms | no LLM or tiny helper model |
| L5 | swarm/public shard fetchers and exporters | deterministic plus verifier-gated |

### 9.2 Route decision

The router should choose the cheapest route that clears confidence, risk, and validation thresholds.

```text
RouteScore =
  c1 * expected_task_fit
+ c2 * prior_success
+ c3 * context_reuse_score
+ c4 * cache_affinity
- c5 * token_cost
- c6 * latency_cost
- c7 * privacy_exposure
- c8 * ambiguity_penalty
```

### 9.3 Escalation law

Escalate only when:

- ambiguity is high,
- the verifier rejects,
- the cost of error exceeds the cost of escalation,
- or a broader synthesis is explicitly needed.

### 9.4 Local, org, public, and provider lanes

Knowledge and procedures exist in four sharing lanes:

- **Local private**
- **Organization shared**
- **Public non-sensitive**
- **Provider-wide or ecosystem-wide generalized learnings**

Only generalized, non-sensitive, provenance-carrying patterns should be eligible for public or provider-style sharing. Private memory never leaks into those lanes.

### 9.5 Why tiny specialists matter

A small model can be excellent when:

- the concept signature is narrow,
- the tapestry is compact,
- the procedure library is mature,
- and the verifier is strict.

Large models remain necessary at the top for broad synthesis and arbitration, but they should not be the default runtime for every niche subproblem.

---

## 10. Evaluation, observability, and self-improvement

### 10.1 What every run must emit

Every meaningful run emits:

- route decision and rationale
- tokens in and out
- cache read/write status if available
- latency
- tool calls and diffs
- receipts
- verifier result
- promotion decision
- ambiguity and abstention signals

### 10.2 Core metrics

The key dashboard is not “total tokens used.” It is this:

- cost per useful insight
- cost per promoted method
- deterministic promotion rate
- context reuse rate
- cache hit rate by zone
- route calibration error
- contradiction rate
- hallucination or unsupported-claim rate
- time-to-resume prior niche session
- shareable public shard yield

### 10.3 Benchmark suite

Use a layered benchmark stack:

- **PrOntoQA** for formal deductive and OOD reasoning
- custom route calibration harness for NRVR scoring
- contradiction corpora for semantic drift
- cache and compaction tests for prefix stability
- policy and guard negative tests
- retrieval explainability tests for Why-score integrity

### 10.4 Nightly self-improvement loop

Nightly or scheduled loops may update:

- route thresholds
- ambiguity cutoffs
- promotion thresholds
- deterministic extractors
- vocabulary mappings
- procedure confidence priors
- specialist spawn or retirement decisions

They may not silently mutate constitutional memory.

---

## 11. Swarm Gnosis and the mycelial metacognitive atlas

### 11.1 What gets shared

The swarm should exchange:

- public tiles and tapestries
- validated procedures and transforms
- benchmark fixtures and route profiles
- ontology adapters and packs
- public concept specialists or distilled shards

It should not exchange raw private memory by default.

### 11.2 Publication object

Every export should carry:

- content ID
- source lineage
- rights classification
- proof bundle or validation receipt
- semantic signature
- compatibility profile

### 11.3 Reputation and adoption

Use provenance and proof, not popularity alone.

A shard should be promoted in swarm adoption when it demonstrates:

- repeatable utility,
- high verification success,
- low drift,
- clean rights posture,
- and compatibility with declared packs.

### 11.4 Global nerd network function

The market opportunity is not only technical. A network like this also serves the “rare but high-leverage niche” problem: highly specific concept overlaps can be cultivated locally, then published as reusable public infrastructure for others who later hit the same overlap. This is how a mycelial atlas outperforms isolated assistants.

---

## 12. Reference implementation plan

### 12.1 Monorepo cut

Use Nx + pnpm and land the minimal spine first.

Suggested packages:

- `rosetta-core`
- `rosetta-schemas`
- `receipt-ledger`
- `guard-contracts`
- `guard-engine`
- `ingest-refinery`
- `concept-registry`
- `activation-store`
- `tapestry-builder`
- `omc-router`
- `run-orchestrator`
- `eval-harness`
- `inspector-web`
- `swarmd` (deferred interface first)

### 12.2 First APIs

| Endpoint | Purpose |
|---|---|
| `POST /ingest/normalize` | canonicalize and envelope an artifact |
| `POST /ingest/refine` | dedupe, risk-score, deterministic extraction |
| `POST /rpp/encode` | emit pasigrams, concepts, and frames |
| `POST /registry/resolve` | lexical and ontology anchoring |
| `POST /context/compile` | build a rights-scoped tapestry |
| `POST /route/decide` | emit task constitution and route plan |
| `POST /guard/evaluate` | obtain allow or deny decision token |
| `POST /run/execute` | execute a route and log receipts |
| `POST /eval/report` | compute nightly metrics and drift findings |
| `POST /swarm/publish` | publish a signed public shard |

### 12.3 4-hour microtiers

| Tier | Goal | Exit condition |
|---|---|---|
| 0 | Nx + pnpm workspace | repo installs and graph resolves |
| 1 | `rosetta-core` + `rosetta-schemas` | canon, cid, validate tests green |
| 2 | `receipt-ledger` | every core command emits a receipt |
| 3 | `guard-contracts` + `guard-engine` | deny/allow token tests green |
| 4 | `run-orchestrator --dry-run` | full mini-spine emitted |
| 5 | `ingest-refinery` v0 | source -> normalized envelope + receipt |
| 6 | `concept-registry` v0 | lexical anchors and overlap signatures resolve |
| 7 | `tapestry-builder` v0 | context compile works with rights scope |
| 8 | `omc-router` v0 | task constitution and route plan emitted |
| 9 | `activation-store` v0 | Why-scored retrieval works |
| 10 | `eval-harness` v0 | PrOntoQA and route-calibration fixtures run |
| 11 | `inspector-web` | run trace visible in browser |
| 12 | `swarmd` stub | signed publish and verify interface exists |

### 12.4 MVP release criteria

The MVP is real when all of this is true:

1. The system can ingest a mixed artifact, emit normalized observations, and produce Rosetta semantic objects with receipts.
2. It can compile a tapestry rather than flooding raw history.
3. It can compile an OMC task constitution and choose a route deterministically enough to explain the decision.
4. Any side effect fails closed without a Guard decision token.
5. Repeated successful runs can promote at least one validator, transform, or route profile into procedural memory.
6. A niche concept signature can be resumed from a prior run with lower token cost than cold start.

---

## 13. Strategic decisions: what to do now, what not to do now

### Do now

- land Rosetta constitutional spine
- land Ingress Refinery before fancy memory
- land concept registry and overlap signatures
- land tapestries and stable-prefix compaction
- land Guard and receipts everywhere
- land Why-scored retrieval and ambiguity notices
- land eval harness and route calibration before autonomous self-editing

### Do not do now

- do not build a giant public swarm first
- do not commit to a single upper ontology in core
- do not train bespoke niche models before you have route and eval evidence
- do not hard-delete underperforming memories on local utility alone
- do not build a huge persona library
- do not let OCR, multimodal, or robotic lanes delay the ingest and tapestry MVP

---

## 14. Source incorporation map for the newly requested sources

| Source | Incorporated as | Why it matters |
|---|---|---|
| Untools | meta-reasoning pack | explicit decision frameworks and reasoning lenses |
| Philosophical razors | epistemic policy pack | lightweight heuristics for evidence burden and hypothesis pruning |
| Jon Kolko on abductive thinking | synthesis policy | abductive sensemaking as explicit synthesis discipline |
| Method of loci | memory/UI metaphor pack | concept palaces and spatial retrieval affordances |
| Prism MCP repo | advanced memory donor | ACT-R, decay, CRDT merge, HDC routing, observability ideas |
| MuninnDB | activation-memory donor | explainable retrieval, recency/frequency, semantic triggers, Why scores |
| Roam / public page | networked-thought UX signal | graph-first knowledge work metaphor; content was not fully accessible |
| Ontoworks ontology index | ontology source map | practical pointer to upper and domain ontology ecosystems |
| Visakanv Google Doc | network design signal | title accessible, body not reliably accessible |
| GigaBrain project pages and arXiv | later-phase learning donor | world-model conditioning and staged learning loop inspiration |
| Survey of top-level ontologies | upper-kernel selection policy | comparative framework for BFO/DOLCE/SUMO/gist and hybrid posture |
| Semantic Arts KG and gist pages | pragmatic ontology posture | business/data semantics, graph design tradeoffs, quantitative modeling |
| Semantic Arts schools of ontology design | design governance | prevents collapsing into one ontology religion |
| PrOntoQA | eval harness | formal reasoning and OOD deductive benchmark |
| NERDm JSON schemas | artifact manifest adapter | typed resources, components, extension schemas, JSON-LD compatibility |
| i2Insights philosophy guide | interdisciplinary ontology/epistemology governance | explicit philosophical stance handling in cross-domain research |
| Quartey taxonomy of thinking tools | tool registry model | categorizing thought tools, memory tools, and planning tools |
| Quartey “A building is a thinking tool” | workspace/UX design principle | separate spaces or surfaces for different cognitive modes |
| Visakanv Losev essay | swarm/network strategy | build a network that helps niche, high-leverage outliers find one another |
| Datamuse API | cheap lexical tool | autocomplete, similarity, lexical expansion in deterministic-first stages |

---

## 15. Evidence quality and limitations

1. **Prism MCP** is publicly rich and conceptually useful, but much of its evidence lives in repo documentation and release notes. Treat it as a design donor requiring selective validation, not a constitutional authority.
2. **MuninnDB** has stronger implementation clarity than Prism and should be favored for the first explainable activation-memory slice.
3. **Roam page content** was not directly accessible through the current browser environment, so it is used only as a directional inspiration, not as evidence.
4. **The linked Google Doc** exposed only its title in the current environment. It informs the public-network and swarm section directionally, but not evidentially.
5. **Upper ontology commitment** should remain adapter-first until the SeedPack and concept registry stabilize.

---

## 16. Final verdict

The architecture you are after is not a better prompt. It is not another agent wrapper. It is not a static panel of personae.

It is a stack where:

- every external artifact is refined before it becomes memory,
- every run is receipted,
- every side effect is gated,
- every context is compiled into a tapestry,
- every niche problem is routed by concept signature,
- every successful repeated cognition is promoted into cheaper substrate,
- and every public contribution enters the swarm with provenance and proofs.

That is the shortest path from token hemorrhage to compounding cognition.

The build order is now clear:

**Rosetta spine -> Ingress Refinery -> concept registry -> tapestries -> OMC router -> Guarded orchestration -> eval harness -> public swarm interfaces.**

Everything else is cathedral work after the foundation cures.
