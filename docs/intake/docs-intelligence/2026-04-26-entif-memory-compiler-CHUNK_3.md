# Docs Intelligence Extraction — Chunk 3/6

## Source

- Path: `~/.openclaw/workspace/Code/rosetta/docs/chats/20260426 - ChatGPT - Entif Memory Compiler.md`
- Title: Entif Memory Compiler (ChatGPT session, 2026-04-26)
- Date evidence: 2026-04-26 (timestamps: 3:55 PM – 4:13 PM)
- Authority tier: session transcript — high information density, design rationale
- Freshness: near-fresh (current design sprint)
- Word count: ~8,400 words in chunk
- Extractor: docs-intelligence subagent
- Extraction date: 2026-04-26

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

Chunk 3 covers the design rationale rejection of a prior multiplicative trust formula, and the introduction of a proper multi-dimensional, scoped trust-scoring architecture for the Memory Compiler. It introduces the Temporal Kinematics Layer (volatility profiles, decay curves, multiple lifecycle clocks), the Invalidation Graph concept, the Decision Route taxonomy, and the Kinematic Profile object schema. Also covers the 7-tier promotion ladder and the Rallying Cry for the ingestion pipeline.

---

## Goals And Intent

- Replace universal master-score formula with scoped multi-axis decision vectors
- Define Temporal Kinematics Layer as a mandatory system component
- Establish Decision Route taxonomy as routing output of scoring engine
- Ground Kinematic Profile in four signal families

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-26 | MC chunk 3 | Tier 7: Promotion | promotion, memory-lifecycle | promotion ladder, memory canonization | requirement | Memory promotion ladder requires ordered sequence: Candidate → reviewed → promoted (memory/method/task/policy). This is an architectural invariant, not a suggestion. | "Candidate → reviewed → promoted memory/method/task/policy." | Implement as hard-gated pipeline with no bypass shortcuts | high |
| 2026-04-26 | MC chunk 3 | Rallying cry | pipeline-ethics, ingestion-philosophy | pipeline sequencing | decision | The pipeline rallying cry is five-part: "Hash before hydrate. Score before store. Dedupe before deliberate. Candidate before canon. Receipts before religion." | Full text in source | Codify as pipeline linter rules / invariant checks | high |
| 2026-04-26 | MC chunk 3 | Rejection of multiplicative formula | trust-architecture, scoring-philosophy | trust scoring | contradiction | A prior multiplicative formula (brilliance-casserole) is explicitly rejected because trust scores, value scores, novelty scores, and relevance scores are domain-variant and non-commensurable; mashing them into one master score produces nonsense decisions. | "What we actually need is multi-context, multi-axis scoring, where the score does not answer 'is this good?'" | Abandon any scalar aggregation of trust/value/urgency; use vector output per scope | high |
| 2026-04-26 | MC chunk 3 | Multi-dimensional trust model | trust-architecture, multi-scope-scoring | trust, epistemic gating | decision | Trust should function as a gate, a scoped multiplier in specific decision frames, or a routing variable — NOT as a component of a universal master score. High value + low trust = verification priority, not belief. | "Trust should not be blended into value. Trust should often be a gate, a multiplier only in specific decision frames, or a routing variable." | Architecture must treat trust as a separate axis from value, novelty, relevance | high |
| 2026-04-26 | MC chunk 3 | Multi-scope scoring example (alchemist) | scoring-schema, trust-scoring, epistemic-routing | scoped scoring object | technology | Illustrated with the alchemist/kingdom example. Each item gets scopes with: relevance, possible_value, urgency, novelty, trust (with status, score, evidence_quality, ratification), risk (fraud, opportunity_cost, execution_harm), recommended_route, decision_class. | JSON schema example in source | Use this schema as v1 template for scoped scoring objects | high |
| 2026-04-26 | MC chunk 3 | Decision Route taxonomy | routing, pipeline-stages, decision-engine | decision routing | technology | Ten DecisionRoute types defined: archive_only, dedupe_and_link, summarize_lightly, extract_candidates, verify_before_promotion, surface_for_review, promote_to_memory, promote_to_method, create_task, block_or_quarantine. | Full enum list in source | Implement DecisionRoute as a typed enum in the Memory Compiler routing layer | high |
| 2026-04-26 | MC chunk 3 | Scoring vs. decisioning separation | architecture, separation-of-concerns | scoring, decisioning | decision | Core architectural doctrine: scores are observations about dimensions; decision policies interpret those dimensions per action type. Score vectors emit routes; routes have their own policies. | "Scores are observations about dimensions. Decision policies interpret those dimensions differently depending on the action being considered." | Enforce strict layering: scoring module outputs vectors; routing module consumes vectors and emits DecisionRoutes | high |
| 2026-04-26 | MC chunk 3 | Per-action priority differentiation | priority-routing, epistemic-routing | priority, routing | decision | Same item can have different priority per action type: Ingestion priority (novelty+relevance+source), Verification priority (spikes on high value + low trust), Execution priority (requires high trust+relevance+risk-acceptable), Memory promotion (requires provenance+dedupe+corroboration+stability), Research priority (novelty+possible value+uncertainty), Alert priority (urgency+harm+optionality destruction). | "Low execution priority. Low canonization priority. High research priority. High verification priority. Medium alert priority. High strategic-watch priority." | Build per-action priority logic into routing engine; each action type has its own policy | high |
| 2026-04-26 | MC chunk 3 | Temporal Kinematics Layer intro | temporal-kinematics, lifecycle, volatility | kinematics, lifecycle | decision | The Temporal Kinematics Layer answers: "How fast does this knowledge move, what might invalidate it, what should we do before trusting or forgetting it, and when should we look again?" Computed as a scoped epistemic lifecycle profile. | "The missing Temporal Kinematics Layer. Not 'is this true?' Not 'is this useful?' But: How fast does this knowledge move..." | This layer must be implemented as a mandatory pass in the ingestion pipeline | high |
| 2026-04-26 | MC chunk 3 | KinematicProfile object schema | kinematics-schema, lifecycle-schema | kinematics profile, schema | technology | Schema fields: scope (item_id, entity_refs, topic_neighborhoods), stability (domain_volatility, source_volatility, neighborhood_volatility, consensus_stability), decay (assumed_half_life_days, decay_curve, decay_basis), revisit (next_revisit_at, revisit_policy, triggers), pruning (prunability, prune_mode, retain_reason, promotion_requirements), revision (revision_likelihood, revision_urgency, revision_blast_radius). | JSON schema example in source | Implement KinematicProfile as a first-class object attached to every ingested item | high |
| 2026-04-26 | MC chunk 3 | Multiple lifecycle clocks | lifecycle-clocks, temporal-kinematics | lifecycle clocks | decision | Six distinct clocks per item: Truth clock (how likely claim becomes false), Usefulness clock (practical utility lifespan), Implementation clock (technical instructions staleness), Strategic clock (strategic relevance change rate), Evidence clock (validity as proof source said something), Identity/history clock (preservation as developmental memory). | "A React framework benchmark may decay in two weeks as a recommendation, in six months as ecosystem history, and never as 'we considered this on April 26, 2026.'" | Design storage schema to support multiple independent clocks per artifact | high |
| 2026-04-26 | MC chunk 3 | Four signal families for kinematics | signal-families, kinematics-computation | signal families, kinematics | decision | Signal Family 1: Intrinsic source signals (publication date, version, content type, artifact class, domain). Content-type default volatility priors: software docs=high, security advisories=very high, architecture principles=medium, personal design intent=low-medium, mathematics=extremely low, market recommendations=very high, legal/tax=high, agent framework comparisons=high. | "Each content type gets a default volatility prior." | Build content-type → volatility-class mapping as a static reference table | high |
| 2026-04-26 | MC chunk 3 | Signal Family 2: Semantic neighborhood signals | neighborhood-signals, graph-kinematics | semantic neighborhood, drift | decision | Topic neighborhoods maintain rolling stats: arrival frequency, contradiction frequency, summary refresh frequency, entity split/merge frequency, dependency release frequency, priority change frequency, retrieval miss frequency. Prior plan already includes nightly entity resolution, taxonomy refinement, evidence compaction, summary pyramid refresh with drift scores, retrieval-plan building, task mining, contradiction/drift detection. | "The system needs explicit state labels: observed, asserted, inferred, assumed, verified, deprecated, superseded, contested, speculative." | Leverage existing nightly job definitions as the empirical substrate for neighborhood volatility computation | high |
| 2026-04-26 | MC chunk 3 | Signal Family 3: Epistemic-state signals | epistemic-state, graph-state | epistemic state, verification | decision | Compare incoming item against prior state: known, inferred, expected, assumed, verified, disputed, deprecated, contradicted, hypothesized. Routing outcomes: supports verified→increase confidence; contradicts verified→revision proposal; confirms expectation→low novelty corroboration; violates assumption→high revision urgency; new+low-trust→research lead; new+high-trust+fast-domain→immediate refresh. | Epistemic-state comparison logic in source | Ingestion pipeline must perform epistemic-state diff against graph prior before routing | high |
| 2026-04-26 | MC chunk 3 | Signal Family 4: Consequence and action signals | consequence-signals, risk-kinematics | consequence, risk, urgency | decision | Two separate outputs: revision likelihood (probability of needing revision soon) and revision urgency (cost of not revising). Examples: celebrity biography (low/low), dependency version guide (high/medium), security exploit note (high/very high), speculative theory (medium/low). Staleness consequence drives urgency independently from volatility. | "Decay is not just 'how fast facts change.' It is also 'how costly it is if we fail to notice.'" | Design consequence scoring as orthogonal axis from volatility scoring | high |
| 2026-04-26 | MC chunk 3 | Invalidation Graph concept | invalidation-graph, dependency-tracking | invalidation graph, blast radius | decision | "If this thing changes, what else has to be revisited?" An Invalidation Graph tracks downstream dependencies: summaries, project plans, task priorities, agent skills, architecture decisions, routing policies, retrieval recipes, trust scores, derived claims, published documents, code scaffolds. Blast radius determines revision urgency. | "Meaningful revisions should evaluate invalidation impact, rival survivorship, conditional coexistence, testability, and downstream consequence." | Design Invalidation Graph as a separate adjacency-list structure updated on each promotion/revision | high |
| 2026-04-26 | MC chunk 3 | KinematicProfile TypeScript schema | kinematics-schema, typescript | schema, kinematics | technology | VolatilityClass: static | slow | moderate | fast | volatile; ConsensusStability: settled | mostly_settled | contested | chaotic; ConsequenceClass: low | moderate | high | critical; RevisionLikelihood: low | medium | high | unknown; RevisionUrgency: low | medium | high | critical; Prunability: never | compressible | prunable_after_superseded | ephemeral. | "type KinematicProfile = { volatilityClass... }" | Use as v1 TypeScript enum basis | high |
| 2026-04-26 | MC chunk 3 | Kinematic Profile routing outputs | routing, kinematics-actions | routing, kinematics | technology | Routing outputs for KinematicProfile: archive_immutable, compress_after_reading, keep_hot, schedule_revisit, watch_for_events, verify_now, refresh_summary, re-run_retrieval_plan, create_revision_proposal, mark_superseded, preserve_parallel_frames, prune_to_source_only. | List in source | Cross-reference with DecisionRoute taxonomy; merge or differentiate | medium |
| 2026-04-26 | MC chunk 3 | Core kinematics algorithm (9-step) | kinematics-algorithm, pipeline | algorithm, kinematics | decision | 9-step algorithm: 1. Classify by artifact type, claim type, domain, source, entities, topics; 2. Retrieve prior neighborhood state; 3. Compare assertions against known/inferred/assumed/verified graph; 4. Estimate volatility via source priors + neighborhood empirical drift; 5. Estimate consequence surface via affected projects and downstream actions; 6. Compute lifecycle clocks; 7. Create revisit policy; 8. Update invalidation graph and downstream re-evaluation queue; 9. Decide projection (hot memory/warm summary/cold archive/verification queue/prune/compress). | Full 9-step algorithm in source | Implement as the Kinematics Analyzer pipeline stage | high |
| 2026-04-26 | MC chunk 3 | Milk label metaphor for lifecycle | lifecycle-metaphor, documentation | lifecycle, metadata | open-question | Each ingested item gets: milk label (when it probably spoils), passport (provenance and scope jurisdictions), leash (where it is allowed to influence decisions), tripwire (what events force re-examination). | "Every ingested thing gets a milk label, passport, leash, and tripwire." | Consider as user-facing metadata labels for transparency/debugging | medium |
| 2026-04-26 | MC chunk 3 | Pipeline vs. throne room framing | philosophy, ingestion-ethics | philosophy, trust | decision | "Don't punish wild upside for being uncertain, but don't let uncertainty sneak into the throne room wearing the robes of truth." Core principle: low-trust high-value claims should go to verification, NOT be buried or promoted. | "This might save the kingdom, but it might also be some velvet-hat bastard with a smoke bomb. Send inspectors. Don't rewrite the monetary system yet." | Encode as a design principle in the Memory Compiler documentation | high |

---

## Components And Technologies

- KinematicProfile object (TypeScript type defined)
- DecisionRoute enum (10 types)
- Temporal Kinematics Layer (pipeline stage)
- Invalidation Graph (adjacency-list dependency structure)
- Multi-clock lifecycle model (six clocks per artifact)
- Four Signal Families: intrinsic source, semantic neighborhood, epistemic-state, consequence/action

---

## Conceptual Claims

1. Trust and value are orthogonal axes; trust should gate or route, not blend into value scores.
2. Every ingested artifact needs six independent lifecycle clocks, not one decay value.
3. Temporal kinematics must be a mandatory pipeline stage, not optional post-processing.
4. Invalidation blast radius — not just likelihood — determines revision urgency.
5. The Invalidation Graph must be maintained incrementally as items are promoted/revised.
6. Content-type domain priors are the fastest path to a useful v0 kinematics estimate.

---

## Dependencies And Sequencing

- Depends on: upstream scoring vector output (from scoring engine), graph state for epistemic comparison, nightly job outputs for neighborhood drift stats
- Enables: revisit scheduler, revision proposal generator, prune/compress decisions, alert routing
- This chunk references Entif 2.0 Enriched doc and ChatGPT Agentic Workflows overview for nightly job / kinematics framing — those sources should be ingested if not already

---

## Contradictions Or Supersession

- Prior multiplicative trust formula (chunk 1 or earlier) is explicitly rejected and superseded by the scoped vector approach described here.

---

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
|---|---|---|---|---|
| Implement KinematicProfile as first-class pipeline stage | feature | kinematics, lifecycle, pipeline | scoring-vector-output, graph-state | "Temporal Kinematics Layer must be a mandatory pass in the ingestion pipeline" |
| Build DecisionRoute enum and routing engine | feature | routing, decision-engine | none | 10-route taxonomy fully specified |
| Design Invalidation Graph adjacency structure | feature | invalidation-graph, dependency-tracking | promotion-pipeline, revision-proposals | "downstream structures must track what depends on upstream commitments" |
| Implement content-type → volatility-class prior mapping table | feature | kinematics, volatility-priors | none | content-type volatility priors fully enumerated |
| Merge KinematicProfile routing outputs with DecisionRoute taxonomy | refactor | routing, kinematics | both above | Two separate output enumerations need reconciliation |

---

## Project Board Suggestions

- Area: Entif Memory Compiler — Core Engine
- Cycle: 2026-04 sprint (chunk-based extraction is feeding PRD)
- Status: Design phase — kinematics layer defined, scoring refactored
- Blocked by: ConCEPT_INDEX.json and KNOWLEDGE_GRAPH.yaml not yet created (intake in progress)
- Parallelization notes: Chunk 1-2 findings already extracted; chunks 4-6 can run in parallel once scoring/routing findings are merged

---

## Open Questions

- How is the "decay_basis" array (in KinematicProfile) populated from the four signal families in practice? Algorithm not fully specified.
- The 10 DecisionRoute types and the 12 KinematicProfile routing outputs overlap but are not identical — should they be unified or kept as separate layers?
- "preserve_parallel_frames" appears in routing outputs — what is the semantic definition of a "parallel frame" in this architecture?
- The alchemist example demonstrates a single scope (kingdom_treasury) — should multi-scope items route differently per scope or consolidate to one route?
