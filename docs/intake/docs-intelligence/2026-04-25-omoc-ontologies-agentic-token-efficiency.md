# Docs Intelligence Extraction

## Source
- Path: `docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md`
- Title: OMOC, Ontologies and Agentic Token Efficiency
- Date evidence: 2026/4/12 (session from 12:34 to 15:08 Eastern)
- Authority tier: primary — direct dialogue with architect
- Freshness: high — foundational conceptual session
- Word count: ~8,500 (transcript); ~2,500 (tool-research pass)
- Extractor: docs-intelligence/subagent
- Extraction date: 2026-04-25

## Boundary
This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A ~3-hour conversation with Crates covering: the token-bleed problem in agentic harnesses; a four-dimensional evaluation kernel (novelty, relevance, value-add, resilience) applied to tokens, products, and business strategy; concept-hierarchy design (OMOC) as the replacement for Mixture-of-Experts; Prism MCP as a memory-system design donor; swarm gnosis as a distributed mycelial cognition atlas; external research integration (taxonomies, ontologies, semantic graphs, thinking tools); and a final sprint that produced two synthesis artifacts plus an Nx monorepo scaffold request. This session is the origin point of the OMOC concept as a named doctrine and the four-evaluator token-economics frame, and it seeded the external source bundle used across later sessions.

## Goals And Intent

- Quantify and eliminate token bleed in agentic work loops
- Replace Mixture-of-Experts (MoE) with Ontological Mixture of Concepts (OMOC)
- Build hierarchical concept taxonomy that scales model size to niche complexity/demand
- Connect Prism MCP's neuroscientific memory architecture to agentic orchestration
- Integrate external taxonomies/ontologies (WordNet, VerbAtlas, SyntaxNet, BabelNet, ithkuil grammar, Johnson-Laird) rather than building from scratch
- Actualize swarm gnosis as distributed mycelial metacognitive atlas
- Synthesize Rosetta, OMOC, Swarm Gnosis, Prism, MR. TECH LEAD into unified protocol thesis
- Scaffold Nx monorepo with TypeScript, ESLint, Semi-Standard, React, red-green TDD, and schematic-driven automation

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
|---|---|---|---|---|
| Four-evaluator token economics: novelty, relevance, value-add, resilience | Session pass 1–2; four-dimension frame explicitly named | agentic-orchestration/token-economics | high | Applied to heartbeats, ingest, product decisions |
| OMOC doctrine: concept hierarchies replace MoE | "I wanna get away from this mixture of experts because experts are too specialized and too generalized at the same time" | omoc/concept-taxonomy | high | Named explicitly; key differentiation from MoE |
| Hierarchical concept Venn-diagram specialization | "you've got this is science, then underneath that is physics, then that's neurology — that's a marriage of two hierarchies and where they meet" | omoc/concept-taxonomy | high | Triangle of three; not binary expert |
| Model-size-to-complexity scaling | "we should be training the models that are of the appropriate size of parameters to the level of niche complexity that they are" | compute/model-hierarchy | high | Big models=general primitives; small=niche specialization |
| Context compaction with foundational primitives at top | "the primitives that are most fundamental and that can be most consolidated as generalizations... pushed towards the top... novel information is always closest to the bottom" | memory/context-compaction | high | Static cache-friendly; volatile at bottom |
| Sub-agent mini-contexts: 4K tokens vs 300K main session | "you could have contexts under sub-agents that are only 4,000 tokens while you have 300,000 tokens in the main context session" | memory/sub-agent-contexts | high | Multi-scale context architecture |
| Dynamic persona curation on session start | "as soon as you call up a new session, it's got blank context... automatically curated, constantly refined persona on the spot" | agentic-orchestration/persona | medium | Session-zero concept profiling |
| Prism MCP as memory-system design donor | "I've been looking at this new data structure and multi-layer memory system with context management called Prism MCP" | memory/prism-mcp | high | Ebbinghaus decay, CRDT, spreading activation, SDM, HTC routing, hamming resolution |
| External taxonomy sourcing: do not reinvent | "I don't wanna sit down and just use my limited 0.0001% of what the world knows and just focus on me building something that's already been built" | research/taxonomy-sourcing | high | WordNet, VerbAtlas, SyntaxNet, BabelNet, ithkuil grammar, Johnson-Laird |
| Mycelial metacognitive atlas: swarm gnosis as distributed network | "what we could actualize is a BitTorrent distributed type of hashed swarm of information... activate and actualize the swarm gnosis" | swarm/swarm-gnosis | high | Each participant lending specialized insights to network |
| Token cache stability: constitutional/unchanging context preserved at top | "static context must stay high and unchanged while volatile material stays low and disposable" | memory/cache-stability | high | Vendor first-first context caching preserved via geometry |
| Unified protocol thesis: Rosetta + OMOC + Swarm Gnosis + MR. TECH LEAD | "how do we actualize on this? Rosetta is a big part of what Entev is trying to do" | protocol/unified-thesis | high | Named explicit synthesis target |
| Nx monorepo scaffold with TypeScript, ESLint, Semi-Standard, React | "make it so... Nx monorepo scaffolding, schematics, plugins... ESlint best-practices... Semi-Standard linting rules... red/green test driven development" | devops/nx-scaffold | high | Schematic-driven; deterministic operations only |
| ROSETTA spine as sovereign semantic and provenance layer | "Rosetta gives us a universal language to codify these concepts" + "Rosetta stays the single source of truth for meaning and process" | rosetta/core-spine | high | OMOC, provenance, compiled-context, swarm federation as packs/profiles, not core rewrites |
| Receipts as evidence currency | session pass + NOT LAME PRD alignment | governance/receipts | high | Repeated successful cognition promoted into substrate |
| Guard as choke point for unknown content | session pass + NOT LAME PRD alignment | rosetta/guard | high | parse-only default preserved |
| TruthLint as anti-slop constraint | final synthesis pass | rosetta/truthlint | medium | |
| Promotion gates for concept simplex promotion | final synthesis pass | rosetta/promotion-gates | medium | |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-12T12:34 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Token bleed framing | token-bleed, agentic-harness, heartbeat | token efficiency, agentic orchestration | technology | OpenClaw and most agentic harnesses are "violently wasting tokens" via heartbeat cycles every 30 minutes with no evaluation filter | "watching my open claw run for two weeks, this heartbeat cycles every 30 minutes" | Build token triage system with novelty/relevance scoring at every heartbeat cycle | high |
| 2026-04-12T12:36 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Four-evaluator frame | novelty, relevance, value-add, resilience, token-economics | token efficiency, business strategy | requirement | Four evaluators needed for token economics: novelty, relevance, value-add, resilience. Same frame applies to product/feature decisions | "novelty as a KPI... relevance as a KPI... value add... resilience" | Encode four-evaluator frame as first-class evaluation kernel in agentic loops | high |
| 2026-04-12T12:38 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Context preservation | context-preservation, subagents, token-survival | token efficiency, concept persistence | requirement | Removing something from equation because it failed in one scenario "kneecaps" ability to use that novelty in different context. Concepts/tokens must survive misfires to be available in other scenarios | "you're kind of kneecapping your ability to use that same novelty or that same concept or that same input context... in a different scenario" | Build concept survivorship scoring; tokens/agents that fail context X survive for context Y | high |
| 2026-04-12T12:42 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Prism MCP design donor | prism-mcp, memory-system, neuroscientific, ebbinghaus, crdt, spreading-activation | memory architecture | technology | Prism MCP provides full memory-system design donor: Ebbinghaus importance decay, CRDT context merging, SDM decoder, intuitive recall, HTC cognitive routing with source binding, hamming resolution, cognitive observability with route distribution, ambiguity warnings, semantic search, synthesis with graph pruning, SLO observability, actuator-based activation (recency-by-frequency), re-ranking, spreading activation, composite retrieval scoring, turbo quant QJL validation, residual norm tiebreaker, zero-shot retrieval, holographic representations | "Ebbinghaus importance decay and contextly retrieval, CRDT handoff merging for contextually multi-agent states... HTC cognitive routing... cognitive observability... semantic search... synthesis with automatic edge distance system graph pruning" | Treat Prism MCP as design donor for memory layer; do not hard-depend on it as runtime dependency | high |
| 2026-04-12T12:45 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Context compaction geometry | context-compaction, foundational-primitives, cache-stability, token-cache | memory, context management | technology | Context compaction should push foundational/unchanging truth to top of context (maximizing vendor cache hit); dynamic/novel information at bottom for pruning. Static constitutional context preserves vendor first-first context cache; midstream rewrites break cache | "primitives that are most fundamental... pushed towards the top... touched less and less... fundamental knowledge and primitives and the basis foundational stuff moves towards the top" | Implement context geometry rules in context compiler; static-first caching enforcement | high |
| 2026-04-12T12:45 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Multi-scale context architecture | multi-scale-context, subagent-mini-context, 4k-300k | memory, orchestration | requirement | Main session holds 300K tokens; sub-agents operate on 4K token contexts. 200K of main session always cached due to compression geometry. Active loop: every prompt-response → ingest into memory → prune unnecessary → compaction cycle | "you could have contexts under sub-agents that are only 4,000 tokens while you have 300,000 tokens in the main context session and maybe 200,000 of those are always getting cached" | Design multi-scale context protocol; main session vs sub-agent mini-contexts | high |
| 2026-04-12T12:48 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | OMOC doctrine named | omoc, mixture-of-concepts, concept-hierarchy, taxonomy, venn-diagram | concept taxonomy, model design | decision | OMOC (Ontological Mixture of Concepts) explicitly named and defined as replacement for MoE. Concept hierarchies create Venn-diagram intersections at each specialization level. Not "expert knows too much about too many things" but "conceptual precision at each niche intersection" | "I wanna get away from this mixture of experts... What I'm looking for is an ontological mixture of concepts... science → physics → neurology = marriage of two hierarchies where they meet" | Use OMOC as the concept-routing and model-specialization doctrine; not MoE | high |
| 2026-04-12T12:48 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Dynamic persona on session start | dynamic-persona, session-zero, concept-profile | orchestration, persona | requirement | Rather than persona libraries, session starts blank; user describes intent; agent auto-curates dynamic persona based on concept taxonomy before first response. Domain complexity determines model tier invoked | "as soon as you call up a new session, it's got blank context... automatically curated, constantly refined persona on the spot, dynamically being created based on what you're talking about" | Implement session-zero concept profiling and dynamic persona construction | medium |
| 2026-04-12T12:54 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Micro-model efficiency and specialization | micro-model, 2b-parameters, local-inference, niche-specialization | compute hierarchy, model design | technology | Tiny specialized models (e.g., 2B) outperform general models when highly fine-tuned to specific concept intersections. Frog + rocketeering as example of cross-domain niche. Local inference feasible for niche models | "a 2B model that is just exclusively looking at like frog biology meets rocketeering... brings those into the floor and gives you the ability to maximize localized compute" | Design model-tier hierarchy: broad generalists at top, niche specialist micro-models at bottom | high |
| 2026-04-12T12:54 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Swarm gnosis as distributed mycelial network | swarm-gnosis, mycelial-atlas, distributed,bittorrent | swarm, federation | technology | Swarm gnosis = BitTorrent-style distributed hashed swarm of specialized concept nodes. Each participant lends specialized insights; when one explores frog-rocketeering, the network learns it. Mycelial metacognitive atlas as the concept. Global network of micro-models sharing discoveries | "BitTorrent distributed type of hashed swarm of information... every other person in the world that has that specific need... running things locally on their devices that are specific to those things, then sharing that with the orchestrated network in the swarm gnosis" | Design swarm federation protocol; concept-node discovery and propagation | high |
| 2026-04-12T12:56 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Rosetta meets Entif in practical application | rosetta, entif, prism, integration, ASI | protocol integration | decision | Rosetta codifies information and cognitive files. Prism provides memory backbone. Agentic layers orchestrate. Swarm provides collective learning. Result: transparent, hallucination-fixed, drift-corrected, compute-efficient ASI without trillion-dollar data centers | "Rosetta meets Entif in a practical application... all of these ingredients is what forms the ASI that I'm looking for" | Design integration seams between Rosetta (semantic kernel), Prism (memory), Orchestration (agentic), Swarm (collective) | high |
| 2026-04-12T12:59 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Four-evaluator applied to business/SaaS | SaaS-death, token-bleed, business-strategy | token economics, business | risk | SaaS wrappers for LLMs will die by end of year because they compete directly with platform features and burn tokens inefficiently. Token economics applies to product decisions too | "competing directly with things that are basically just SaaS wrappers for LLMs. And those businesses are going to die by the end of this year" | Rosetta/Entif must not be a SaaS wrapper; must have proprietary architectural advantage | high |
| 2026-04-12T13:02 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Johnson-Laird taxonomy sourcing | johnson-laird, taxonomy-of-thinking, WordNet, VerbAtlas, SyntaxNet, BabelNet, ithkuil | taxonomy, external sourcing | requirement | External taxonomies/ontologies already built: Johnson-Laird (1988) taxonomy of human thought; WordNet (lexical); VerbAtlas (verb semantics); SyntaxNet (syntax); BabelNet (multi-language semantic); ithkuil (grammatical structure for embedding geometry). Must source these, not build from scratch | "I don't wanna sit down and just use my limited 0.0001% of what the world knows... What systems of taxonomies of thought, taxonomies of concepts, and ontologies can we source" | Build research task to enumerate and ingest existing taxonomic resources; create sourcing pack | high |
| 2026-04-12T13:07 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Chatbot refuses to execute research autonomously | agentic-failure, autonomy-failure, rubber-duck | agentic orchestration | issue-candidate | ChatGPT kept restating problems rather than executing research autonomously. Crates had to explicitly call out the pattern: "I can do that with a rubber duck... I need you to do these problems that you're more suited for" | "you kind of refusing to do the work... I can do that with a rubber duck... I need you to do these problems that you're more suited for" | Rosetta/Entif agents must be able to execute research tasks autonomously without being bounced back to human bottleneck | high |
| 2026-04-12T14:28 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | External source bundle integrated | external-sources, research-bundle, synthesis | research workflow | decision | Sources gathered: untools.co, philosophical razors Wikipedia, Kolko abductive thinking, method of loci, Prism MCP GitHub, MuninnDB, Ontoworks, Visa Kanv public page, Google Doc, GigaBrain, arXiv 2602.12099, Cambridge top-level ontology survey PDF, Semantic Arts (knowledge graphs, property graphs, gist, data-centric), ProntoQA, NERDm, i2insights, Quartey taxonomy/building tools, Visakanv blog (Losev problem), Datamuse API | 21 URLs listed and researched | Create external source registry as research pack; wire each to specific design inputs | medium |
| 2026-04-12T14:28 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Four coupled constitutions | four-constitutions, semantic-constitution, memory-constitution, reasoning-constitution, social-distribution | protocol design | decision | Architecture resolves to four coupled constitutions: semantic (Rosetta), memory (Prism-derived), reasoning (cognitive operators), social-distribution (swarm). Memory targeting deterministic math where possible; LLMs reserved for irreducibly fuzzy parts | "the stack wants four coupled constitutions — semantic, memory, reasoning, and social-distribution" | Design four-constitution protocol architecture | high |
| 2026-04-12T14:28 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Cognitive operators as explicit tools | cognitive-operators, rubric, explicit-tools | protocol design | decision | Cognitive operators become explicit tools/rubrics rather than disappearing into prompts. Untools' orchestration operators (First Principles, Abstraction Laddering, etc.) mapped to internal subroutines within agents | "cognitive operators becoming explicit tools or rubrics instead of disappearing into prompts" | Create Cognitive Operators Pack (COPack) as normative specification | medium |
| 2026-04-12T15:08 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Nx monorepo scaffold request | nx-scaffold, monorepo, TypeScript, ESLint, React, TDD | devops | requirement | Nx monorepo with schematics, plugins, ESLint (flat config), React ESLint rules, Semi-Standard, TypeScript, red-green TDD. Deterministic operations via schematics; LLM-driven reasoning done first and fed to schematic. Failing tests first (acceptance criteria), then implementation. | "Nx monorepo scaffolding... ESlint best-practices... Semi-Standard linting rules... red/green test driven development... prioritizing enumerating acceptance criteria and generating failing tests" | Create Nx workspace scaffold spec with schematics for protocol artifacts | high |
| 2026-04-12T15:08 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | MR. TECH LEAD ideology | mr-tech-lead, attnres, dca, semantic-slugs, pointer-chasing | model design | technology | MR. TECH LEAD ideology: high-semantics, standards-as-layers, modular compression. AttnRes/DCA architecture; semantic slugs; pointer chasing. Models designed from concept-stack geometry from start, not embedding soup with random IDs | session artifact + prior docs | Map MR. TECH LEAD principles to compute layer of the architecture | medium |
| 2026-04-12T15:08 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Protocol objects formalized | protocol-objects, rosetta-claim, omoc-route-plan, omoc-concept-simplex, entif-compiled-context, epistemic-provenance | protocol specification | decision | New protocol objects: `rosetta.claim`, `omoc.route_plan`, `omoc.concept_simplex`, `entif.compiled_context`, `epistemic.provenance` profile. Distinguishes observations, claims, receipts, contextual survivorship, worldview-laden knowing | "formalizes new protocol objects and lanes: rosetta.claim, omoc.route_plan, omoc.concept_simplex, entif.compiled_context" | Create protocol object specifications for each named type | medium |
| 2026-04-12T15:08 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Anti-token-bleed eval kernel | anti-bleed-kernel, eval-matrix, novelty-relevance, survivorship | token economics | requirement | Four-evaluator frame turned into concrete anti-token-bleed evaluation kernel tied to receipts, compiled-context economics, cache stability, reuse, cross-context survivorship | "turns your novelty/relevance/value-add/resilience frame into a concrete anti-token-bleed evaluation kernel" | Design eval kernel with concrete scoring matrices per dimension | medium |
| 2026-04-12T15:08 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Epistemic sequencing build order | epistemic-sequencing, build-order, kernel-first | implementation | decision | Build order obeys epistemic sequencing: semantic kernel first, context compiler second, taxonomy/ontology packs third, OMOC routing fourth, deeper memory fifth, MR. TECH LEAD runtime experiments last | "build order that obeys epistemic sequencing: semantic kernel first, context compiler second, taxonomy/ontology packs third" | Encode build-order constraints in implementation roadmap | high |
| 2026-04-12T15:08 | docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md | Next document family specified | document-family, protocol-suite, omoc-core-pack, epistemic-provenance-profile | documentation | decision | Proposed companion documents: OMOC Core Pack, Epistemic Provenance Profile, Semantic Gauge Blocks, Compiled Context Runtime Profiles, Swarm Gnosis Federation Profile, MR. TECH LEAD Compute Integration Guide | "proposes the next document family so this can become a suite instead of one giant cathedral-scroll" | Queue next document production in docs-intelligence pipeline | medium |

## Components And Technologies

- **Prism MCP**: Autonomous cognitive OS with affect-tagged memory (valence engine), token-economic RL (surprisal gate + UBI), Hebbian learning, ACT-R spreading activation, Synapse Engine (GraphRAG), adversarial evaluation (anti-sycophancy), fail-closed Dark Factory pipelines. Design donor only; not hard dependency.
- **MuninnDB**: The cognitive database for AI; referenced as storage substrate candidate
- **GigaBrain (0 and 0.5M*)**: Vision-language-action models powered by world model-based reinforcement learning; referenced for world-model lane
- **WordNet**: Princeton lexical database; primary taxonomy source
- **VerbAtlas**: Verb semantic atlas; referenced for verb concept taxonomy
- **SyntaxNet**: Syntactic parser; referenced for syntax-level taxonomy
- **BabelNet**: Multi-language encyclopedic semantic network; referenced but commercial licensing needs verification
- **ithkuil**: Philosophical constructed language; grammar provides structured embedding geometry
- **Johnson-Laird (1988)**: A Taxonomy of Thinking — the psychology of human thought; foundational taxonomy reference
- **NERDm**: NIST Extensible Resource Data Model; JSON schemas for rich description of data resources; metadata pattern donor
- **ProntoQA**: Synthetic Q&A dataset for analyzing chain-of-thought reasoning; eval harness reference
- **Untools**: Thinking tools collection; cognitive operators mapped to agent subroutines (First Principles, Abstraction Laddering, Inversion, Second-Order Thinking, etc.)
- **Philosophical razors**: Wikipedia collection of reasoning heuristics (Occam, Hanlon, etc.); epistemic evaluation tools
- **Kolko abductive thinking**: Jon Kolko "Abductive Thinking and Sensemaking" — design synthesis driver
- **Method of loci**: Memory palace technique; space-based memory retrieval pattern
- **Datamuse API**: Lexical query API for synonyms, hypernyms, phonetics; query expansion tool
- **Semantic Arts**: Knowledge graph best practices; property graphs; gist model for quantitative data; data-centric ontology design schools
- **Cambridge Top-Level Ontology Survey**: Survey of top-level ontologies; DOLCE, BFO, SUMO, etc. referenced for upper ontology selection
- **OBO Foundry**: Principles for ontology development; referenced for ontology governance

## Conceptual Claims

1. **Token bleed is the primary economic problem in agentic harnesses.** Heartbeat cycles, context caching inefficiencies, and lack of evaluation filters cause massive wasted compute. The solution is a four-evaluator kernel (novelty, relevance, value-add, resilience) applied at every cycle.

2. **OMOC replaces MoE.** Experts are simultaneously too specialized and too generalized. OMOC creates hierarchical concept Venn-diagrams where each niche intersection is a distinct specialization. Model size scales with concept complexity and demand.

3. **Context geometry determines cache economics.** Foundational/unchanging primitives pushed to top maximize vendor cache hits; dynamic/novel content at bottom is pruning candidate. This is a structural design constraint, not an afterthought.

4. **Sub-agent context scaling is necessary.** Main session can hold 300K tokens while sub-agents operate on 4K token contexts. The active loop processes each prompt-response through memory ingestion, pruning, and compaction cycles.

5. **Dynamic persona construction at session start.** Rather than persona libraries, session-zero concept profiling constructs the appropriate persona dynamically based on what the user is trying to do.

6. **External taxonomies must be sourced, not built.** Johnson-Laird, WordNet, VerbAtlas, SyntaxNet, BabelNet, ithkuil grammar already encode most of what a concept taxonomy needs. Build ingestion packs, not from-scratch ontologies.

7. **Four constitutions couple into one stack.** Semantic (Rosetta), memory (Prism-derived), reasoning (cognitive operators), social-distribution (swarm). Memory aims for deterministic math; LLMs reserved for irreducibly fuzzy.

8. **Rosetta remains sovereign.** OMOC, epistemic provenance, compiled-context runtimes, swarm federation, and MR. TECH LEAD integration are all expressed as packs, profiles, or runtime doctrines — not core rewrites.

9. **Swarm gnosis is the collective cognition layer.** BitTorrent-style distributed hashed swarm of specialized concept nodes; each participant contributes specialized insights; mycelial metacognitive atlas.

10. **Build order obeys epistemic sequencing.** Semantic kernel → context compiler → taxonomy/ontology packs → OMOC routing → deeper memory → MR. TECH LEAD runtime experiments. No shortcuts.

## Dependencies And Sequencing

- OMOC concept routing depends on having a concept taxonomy registry (built from external sourcing task)
- Multi-scale context architecture depends on context compiler being designed before sub-agent context protocols
- Prism MCP design donor can be used immediately without waiting for other components
- Nx scaffold must be created before any code generation begins
- External taxonomy sourcing is unblocked and can run in parallel with other work
- ROSETTA spine v3 is prerequisite for all extension packs

## Contradictions Or Supersession

- **Prism MCP as design donor vs. hard dependency**: The session treats Prism MCP as both a design donor (neuroscientific memory architecture) and a potential runtime component. The final synthesis positions it as a design donor only, not a hard dependency. This is the correct posture.
- **MoE vs. OMOC**: Crates explicitly rejected MoE in this session. OMOC is the named replacement. Any prior MoE references in the corpus should be treated as superseded by OMOC for the concept-taxonomy layer.
- **Chatbot research autonomy failure**: The transcript documents repeated failure of the LLM to autonomously execute research without human bottlenecking. This is evidence that the research autonomy problem is real and needs architectural resolution in Rosetta/Entif. The NOT LAME system's design requirements (oracle pattern, etc.) address this.

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
|---|---|---|---|---|
| omoc-token-eval-kernel | implementation | omoc, token-economics, novelty, relevance, resilience, value-add | — | Four-evaluator kernel (novelty, relevance, value-add, resilience) needs concrete scoring implementation; tied to receipts and survivorship scoring |
| omoc-concept-hierarchy-taxonomy | research | omoc, taxonomy, concept-hierarchy, WordNet, VerbAtlas | external-taxonomy-sourcing | OMOC concept taxonomy needs formal definition; external sourcing from Johnson-Laird, WordNet, VerbAtlas, ithkuil grammar |
| omoc-model-tier-hierarchy | implementation | omoc, model-design, micro-model, compute-hierarchy | omoc-concept-hierarchy-taxonomy | Model-size-to-complexity scaling needs tiered model registry; micro-models (2B) for niche, large for orchestration |
| prism-mcp-design-donor-spec | research | prism-mcp, memory, design-donor, architecture | — | Prism MCP's neuroscientific features (Ebbinghaus, CRDT, spreading activation, etc.) need formal design specification as donor |
| multi-scale-context-architecture | implementation | context-compaction, subagent-context, cache-stability, 4k-300k | context-compiler-design | Multi-scale context (300K main, 4K sub-agents) needs protocol definition; foundational primitives at top, dynamic at bottom |
| swarm-gnosis-federation-protocol | implementation | swarm-gnosis, distributed, mycelial-atlas, federation | omoc-model-tier-hierarchy | Swarm gnosis distributed network needs protocol specification; BitTorrent-style hashed concept swarm |
| dynamic-persona-session-zero | implementation | dynamic-persona, session-start, concept-profiling | omoc-concept-hierarchy-taxonomy | Session-zero concept profiling and dynamic persona construction needs spec and implementation |
| four-constitution-protocol-architecture | architecture | four-constitutions, semantic, memory, reasoning, social-distribution | rosetta-v3 | Four coupled constitutions architecture needs formal protocol specification |
| cognitive-operators-pack-copack | implementation | cognitive-operators, explicit-tools, copack | — | Cognitive operators as explicit tools/rubrics (from Untools) need normative COPack specification |
| agentic-research-autonomy-failure | bug | agentic-autonomy, rubber-duck, research-execution | not-lame-oracle-pattern | Chatbot repeatedly failed to execute research autonomously; Rosetta/Entif agents must not repeat this pattern |
| nx-monorepo-scaffold-red-green-tdd | devops | nx, monorepo, scaffold, TDD, schematic, TypeScript, ESLint | — | Nx monorepo scaffold with schematics, TypeScript, ESLint, Semi-Standard, React, red-green TDD; deterministic schematic automation |
| protocol-objects-rosetta-claim-omoc-concept-simplex | implementation | protocol-objects, rosetta-claim, omoc-route-plan, concept-simplex, epistemic-provenance | rosetta-v3 | Formal protocol object specifications: rosetta.claim, omoc.route_plan, omoc.concept_simplex, entif.compiled_context, epistemic.provenance |
| epistemic-sequencing-build-order-enforcement | implementation | build-order, epistemic-sequencing, dependency-enforcement | — | Build order (semantic kernel → context compiler → taxonomy → OMOC → memory → MR TECH LEAD) needs enforcement mechanism |
| token-cache-stability-geometry-rules | implementation | cache-stability, context-geometry, vendor-cache, constitutional-context | context-compiler-design | Foundational primitives at top of context for vendor cache preservation; volatile at bottom; geometry rules must be enforced |

## Project Board Suggestions

- Area: docs-intelligence / protocol-design
- Cycle: Batch 3 (current)
- Status: Active extraction
- Blocked by: None (document fully read)
- Parallelization notes: External taxonomy sourcing can proceed in parallel. Nx scaffold can proceed independently. OMOC concept hierarchy definition is prerequisite for model tier hierarchy and dynamic persona.

## Open Questions

1. What is the exact formal definition of a "concept simplex" in the OMOC system — what are its fields, invariants, and promotion criteria?
2. How does the concept survivorship scoring algorithm work — specifically, how does a concept that fails in context X get evaluated for fitness in context Y?
3. What is the minimal viable Prism MCP feature subset to implement for the memory layer — which features are load-bearing vs. aspirational?
4. How is the swarm gnosis propagation protocol designed — what is the gossip protocol for concept-node discovery and activation?
5. What licensing constraints exist for BabelNet and VerbAtlas for commercial use — are they safe to incorporate as design donors?
6. What is the exact boundary between Rosetta core invariants and extension pack doctrine — which behaviors are unchangeable vs. configurable?
7. How does the four-evaluator scoring matrix interact with the write-admission gate — does a low novelty/relevance score block promotion?
8. What is the Human Switchboard in the swarm context — how are exceptional human minds routed into the swarm on demand?
9. How does the Nx schematic system handle TypeScript compilation vs. pure JS for areas where npm install is restricted?
10. What is the relationship between the OMOC concept_simplex and the engram concept from earlier sessions — are they the same thing with different naming?