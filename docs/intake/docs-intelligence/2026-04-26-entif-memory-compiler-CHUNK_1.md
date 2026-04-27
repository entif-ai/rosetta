# Docs Intelligence Extraction — CHUNK 1/6

## Source

- **Path:** `~/.openclaw/workspace/Code/rosetta/docs/chats/20260426 - ChatGPT - Entif Memory Compiler.md`
- **Title:** Branch · Entif Memory Compiler Feedback
- **Date evidence:** 2026-04-26 (composed), exported 2026-04-26 17:39:17
- **Authority tier:** Primary — direct architecture response from ChatGPT/Entif-2.0 on uploaded `20260426 - Automatically Analyzing, Assimilating and Associating Assorted Appendices.md`
- **Freshness:** Current (2026-04-26)
- **Word count:** ~6,500 (chunk 1 of 6)
- **Extractor:** docs-intelligence subagent (chunk 1/6)
- **Extraction date:** 2026-04-26

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

ChatGPT/Entif-2.0 reviews the uploaded `20260426 - Automatically Analyzing, Assimilating and Associating Assorted Appendices.md` and delivers a detailed architecture review of the AAA (Assimilation Artifact Packet) compiler pipeline. It endorses the six-stage pipeline architecture but recommends splitting stage 4 into five parallel processing lanes, defines the canonical assimilation packet schema, and specifies a phased kettle/stage build order (Kettles 0–4) for the first increment. It also defines five scoring primitives and their formulas.

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-26 | entif-memory-compiler.md | Response, architecture endorsement | `aaa-architecture`, `compiler-vs-soup`, `pipeline` | AAA core concept | decision | The ingestion skill should be a **compiler pipeline** that turns raw experience into many different typed memory objects, not a monolithic brain or soup pot | `"The ingestion skill should not be the 'brain.' It should be the compiler pipeline that turns raw experience into many different memory objects."` | Build the compiler pipeline first; backends are projections | high |
| 2026-04-26 | entif-memory-compiler.md | Response, metaphor | `memory-soup`, `anti-pattern` | Memory architecture | risk | "Don't make one soup pot called 'memory.' Make a kitchen line." The current monolithic memory approach is an anti-pattern | `"Make a kitchen line. One station washes vegetables, one chops, one checks poison, one cooks, one plates, one labels leftovers, one writes down exactly who touched what and when."` | Replace memory-soup with typed pipeline stages | high |
| 2026-04-26 | entif-memory-compiler.md | Response, six-stage pipeline | `pipeline`, `stages`, `deterministic` | Ingestion pipeline | requirement | Six-stage pipeline explicitly named: **Detect → Retrieve/Normalize → Security/Hygiene → Classification/summarization/insight mining/valuation → Codification/insertion/updates → Notification** | `20260426 - Automatically Analyzing, Assimilating and Associating Assorted Appendices.md` | Preserve these six stages as the pipeline contract | high |
| 2026-04-26 | entif-memory-compiler.md | Response, lane split recommendation | `five-lanes`, `semantic`, `epistemic`, `operational`, `associative`, `creative` | Stage 4 decomposition | decision | Stage 4 (Classification/summarization/mining/valuation) must be split into five parallel lanes: **Semantic** (topics, tags, entities, relations, summaries, concept IDs), **Epistemic** (claims, evidence, uncertainty, observed/asserted/inferred/speculative), **Operational** (tasks, decisions, requirements, risks, TODOs), **Associative** (duplicate detection, related-project discovery, contradiction/support edges), **Creative** (speculative recombinations, research leads — optional, clearly marked) | `"I would split stage 4 into parallel lanes: Semantic lane, Epistemic lane, Operational lane, Associative lane, Creative lane"` | Implement five-lane parallel processing for stage 4 | high |
| 2026-04-26 | entif-memory-compiler.md | Response, canonical packet | `assimilation-packet`, `typed-artifacts`, `canonical-packet` | Memory object schema | decision | Stage 5 should receive a **canonical assimilation packet** with typed outputs (Source objects, Observation objects, Claim objects, Entity/relation candidates, Insight objects, Task candidates, Contradiction candidates, Method candidates, Memory-write receipts, Promotion decisions) and receipts, not a summary | `"Stage 5 should not receive 'the summary.' It should receive a canonical assimilation packet with typed outputs and receipts."` | Define typed artifact schema for assimilation packet | high |
| 2026-04-26 | entif-memory-compiler.md | Response, hierarchy | `source-of-truth`, `pantry-of-screaming-pickles`, `projection-stores` | Trust architecture | risk | **Do not let every backend become a source of truth.** That way lies the "Pantry of Screaming Pickles." Use hierarchy: (1) Immutable source archive, (2) Assimilation packet, (3) Projection stores, (4) Promotion layer, (5) Retrieval compiler | `"Do not let every backend become a source of truth. That way lies the Pantry of Screaming Pickles."` | Enforce single source of truth; backends are projections only | high |
| 2026-04-26 | entif-memory-compiler.md | Response, ledger requirement | `ledger`, `receipts`, `orchestration`, `idempotent` | Pipeline ops | requirement | Every stage and sub-agent needs **idempotent message-bus handoffs plus a ledger/state store** tracking: what fired, when, by whom, outcome, staleness, retries, subroutine count, completion, duration | `"Every stage and sub-agent needs idempotent message-bus handoffs plus a ledger/state store tracking what fired, when, by whom, outcome, staleness, retries, subroutine count, completion, and duration. That is not optional. That is the spine."` | Implement ledger before any other stage | high |
| 2026-04-26 | entif-memory-compiler.md | Response, AAA v0 spec | `aaa-v0`, `assimilation-packet-compiler`, `scope` | MVP scope | requirement | **AAA v0: Assimilation Packet Compiler** — Input: one Markdown file or plain-text document. Output: one JSON packet plus one Markdown projection. Stores: filesystem only. Ledger: SQLite. Queue: local durable job queue. No swarm, no graph, no Honcho/QMD/OB1 writes. Just prove the packet shape | Lines ~130–160 | Define narrow v0 scope; resist scope creep | high |
| 2026-04-26 | entif-memory-compiler.md | Response, AAA v0 acceptance criteria | `acceptance-criteria`, `receipts`, `rerun`, `resume`, `lineage` | AAA v0 | requirement | AAA v0 acceptance criteria: (1) File enters `/inbox`; (2) System computes content hash, source envelope, normalized text; (3) Deterministic hygiene runs first; (4) Chunks file; (5) Emits per-chunk summaries, tags, claims, entities, tasks, risks, links, unknowns; (6) Emits document-level rollup; (7) Writes `assimilation.packet.json`; (8) Writes `memory_projection.md`; (9) Writes receipt trail for every stage; (10) Can be rerun without duplicating memory objects; (11) Can be interrupted and resumed; (12) Can show "why is this here?" with source spans | Lines ~140–160 | Codify as test-driven acceptance criteria | high |
| 2026-04-26 | entif-memory-compiler.md | Response, v0.1 backend adapters | `adapters`, `backend-adapters`, `isolation` | Backend integration | decision | v0.1 adds **backend adapters**: `adapter.markdown.write`, `adapter.qmd.write`, `adapter.hindsight.write`, `adapter.ob1.write`, `adapter.honcho.write`. Each consumes the same packet. If one fails, others continue. Failed adapter gets retried from ledger | `"Each adapter consumes the same packet. If one fails, the others continue. The failed adapter gets retried from the ledger."` | Design adapters with failure isolation | high |
| 2026-04-26 | entif-memory-compiler.md | Response, v0.2 retrieval symmetry | `retrieval`, `symmetry`, `context-bundle` | Retrieval pipeline | decision | v0.2 adds **retrieval symmetry**: ingest compiler creates memory objects; retrieval compiler assembles context bundles. Same philosophy, inverse direction. Ingest: raw source → normalized observations → extracted objects → projections. Retrieval: question/task → rights-aware search plan → candidate objects → ranked context bundle → cited answer/action plan | `"The ingest compiler creates memory objects; the retrieval compiler assembles context bundles. Same philosophy, inverse direction."` | Plan retrieval as mirror of ingest pipeline | high |
| 2026-04-26 | entif-memory-compiler.md | Response, retrieval must use canonical objects | `retrieval`, `canonical-objects`, `markdown-not-source` | Retrieval architecture | risk | **Retrieval must happen against canonical objects, not random backend prose.** "Markdown can be beautiful. It cannot be the only brain." | `"Retrieval must happen against canonical objects, not random backend prose. Markdown can be beautiful. It cannot be the only brain."` | Enforce canonical object retrieval; Markdown is a projection only | high |
| 2026-04-26 | entif-memory-compiler.md | Response, self-evolution workflow | `self-evolution`, `event-pattern-method-test-promotion`, `delta-promotion` | Self-improvement | decision | Self-evolution should be **Event → Pattern → Method → Test → Promotion**: nightly job reviews receipts, identifies failures/wins, proposes candidate deltas (never silently mutates). Only deltas that pass tests get promoted into skill files, policies, routing rules, or memory schemas | `"Every run produces receipts. Receipts get mined for repeated failures and wins. Repeated wins become candidate methods. Candidate methods get tested against small evals. Passing methods become playbooks or rules."` | Implement delta promotion workflow, not silent mutation | high |
| 2026-04-26 | entif-memory-compiler.md | Response, AAP schema | `schema`, `assimilation-packet`, `packet-schema` | Data model | requirement | AAP (Assimilation Artifact Packet) suggested top-level schema fields: `packet_id`, `source` (source_id, uri, content_hash, retrieved_at, rights_scope, mime_type), `pipeline_run` (run_id, version, status, receipts), `hygiene` (verdict: benign/suspicious/quarantine/reject, reasons, normalization_notes), `chunks[]`, `entities[]`, `claims[]`, `relations[]`, `insights[]`, `tasks[]`, `risks[]`, `open_questions[]`, `memory_writes[]`, `retrieval_hints[]`, `promotion_candidates[]` | Lines ~220–250 | Implement this schema as the canonical packet | high |
| 2026-04-26 | entif-memory-compiler.md | Response, key fields emphasis | `key-fields`, `claims`, `relations`, `receipts` | Data model | requirement | Most important AAP fields are not summaries: they are **`source`, `claims`, `relations`, `receipts`, `retrieval_hints`, and `promotion_candidates`** | `"The most important fields are not the summaries. They're source, claims, relations, receipts, retrieval_hints, and promotion_candidates."` | Prioritize extraction of claims, relations, receipts | high |
| 2026-04-26 | entif-memory-compiler.md | Response, risk: over-subagenting | `subagent`, `orchestration`, `premature-decomposition` | Risk | risk | **Over-subagenting too early** creates more orchestration bugs than insight. Start as single deterministic pipeline with mockable stages. Fan out chunk processing only after contract is stable | `"Premature swarm decomposition will create more orchestration bugs than insight."` | Start monolithic; decompose only after stable contract | high |
| 2026-04-26 | entif-memory-compiler.md | Response, risk: schema sprawl | `schema-sprawl`, `backend-creep`, `projection-stores` | Risk | risk | **Schema sprawl:** every memory backend will tempt shaping the canonical packet around its needs. Do not. The packet is sovereign. Backends are projections | `"Every memory backend will tempt you to shape the canonical packet around its needs. Don't. The packet is sovereign. Backends are projections."` | Lock canonical schema; backends adapt to it | high |
| 2026-04-26 | entif-memory-compiler.md | Response, risk: semantic tag rot | `tags`, `concept-entities`, `semantic-drift` | Risk | risk | **Semantic tag rot:** normalized tag names alone won't carry the architecture. Need canonical concepts/entities with aliases, confidence, merge/split history, and "do not merge" scars | `"Tags alone won't carry the architecture. You need canonical concepts/entities with aliases, confidence, merge/split history, and 'do not merge' scars."` | Build concept/entity registry alongside tag system | high |
| 2026-04-26 | entif-memory-compiler.md | Response, risk: trust collapse | `trust`, `cheap-models`, `evidence-scoring` | Risk | risk | **Trust collapse:** cheap models can classify, summarize, and suggest, but should not promote knowledge without evidence scoring and/or review gates. Pipeline should mark uncertainty loudly | `"Cheap models can classify, summarize, and suggest, but they should not promote knowledge without evidence scoring and/or review gates."` | Gate promotion behind trust/evidence scoring | high |
| 2026-04-26 | entif-memory-compiler.md | Response, risk: self-modification theater | `self-evolution`, `self-modification`, `drift` | Risk | risk | **Self-modification theater:** "Update SOUL.md" is cute until it becomes unreviewed drift. Self-evolution should propose patches, not apply identity edits like a raccoon forging a driver's license | `"Self-evolution should propose patches, not apply identity edits like a raccoon forging a driver's license."` | Require review gates for self-modification proposals | high |
| 2026-04-26 | entif-memory-compiler.md | Response, crystallized recommendation | `recommendation`, `synapse-contract`, `swarm` | Strategy | decision | **"Don't build the swarm first. Build the synapse contract."** Core recommendation: build AAA v0 as local-first, receipts-first, deterministic-to-LLM staged ingestion compiler. Begin with canonical assimilation packet, local ledger, local projections, replayable tests. Then attach stores as adapters | `"Don't build the swarm first. Build the synapse contract."` | Prioritize synapse contract (packet + ledger) over swarm | high |
| 2026-04-26 | entif-memory-compiler.md | Response, scoring primitives | `scoring`, `dedupe-score`, `trust-score`, `value-score`, `urgency-score`, `priority-score` | Scoring system | requirement | Five scoring primitives (each 0.0–1.0): `dedupe_score` ("How likely is this already present?"), `trust_score` ("How reliable is the source/extraction/claim?"), `value_score` ("How useful is this?"), `urgency_score` ("How soon does this matter?"), `priority_score` (composite) | Lines ~300–320 | Implement all five scoring primitives | high |
| 2026-04-26 | entif-memory-compiler.md | Response, priority formula | `priority-formula`, `weighted-scoring` | Scoring system | requirement | Priority formula: `priority_score = 0.30 * value_score + 0.25 * urgency_score + 0.20 * novelty_score + 0.15 * trust_score + 0.10 * project_relevance_score` | Lines ~300–320 | Implement weighted priority formula | high |
| 2026-04-26 | entif-memory-compiler.md | Response, dedupe as gate | `dedupe`, `hash-match`, `semantic-similarity`, `archival` | Deduping | requirement | Deduping as gate: `exact_hash_match` → skip expensive processing; `normalized_hash_match` → link as duplicate_revision_candidate; `semantic_similarity_high` → process lightly, link as related_or_duplicate_candidate; `source_is_low_trust AND value_is_low` → archive, do not hydrate | `"Don't spend model money rereading the same sandwich wrapper unless it has a treasure map written on it."` | Implement tiered dedupe as cost gate | high |
| 2026-04-26 | entif-memory-compiler.md | Response, Kettle 0 spec | `kettle-0`, `skeleton`, `repo`, `schemas` | Kettle 0 | requirement | **Kettle 0: Repo + contracts skeleton.** Create `aaa/` or `packages/aaa-core/`. Add schemas: `SourceEnvelope`, `NormalizedDocument`, `IngestRun`, `PipelineReceipt`, `AssimilationPacket`, `ScoreBundle`. Add one fixture Markdown file and one golden expected JSON. Acceptance: `pnpm test` validates schemas. One fixture produces minimal packet. No LLMs, no graph, no swarm | Lines ~330–360 | Build Kettle 0 as the foundation | high |
| 2026-04-26 | entif-memory-compiler.md | Response, Kettle 1 spec | `kettle-1`, `file-ingestion`, `cli`, `hashing` | Kettle 1 | requirement | **Kettle 1: File ingestion v0.** CLI: `aaa ingest ./sample.md`. Computes: file path, mtime, byte size, MIME-ish type, raw SHA-256, normalized text SHA-256, run ID, timestamp. Acceptance: re-running same file produces same content hashes; run ledger records both attempts without duplicating source object | Lines ~360–380 | Build Kettle 1 file ingestion | high |
| 2026-04-26 | entif-memory-compiler.md | Response, Kettle 2 spec | `kettle-2`, `normalization`, `hygiene`, `deterministic` | Kettle 2 | requirement | **Kettle 2: Normalization + hygiene v0.** Normalize line endings, strip/flag binary/control characters, detect base64/minified junk, detect prompt-injection phrases. Emit: `hygiene.verdict = benign \| suspicious \| quarantine \| reject` and `hygiene.reasons[]`. No LLM call before this stage | Lines ~380–400 | Build Kettle 2 deterministic hygiene | high |
| 2026-04-26 | entif-memory-compiler.md | Response, Kettle 3 spec | `kettle-3`, `chunker`, `source-lineage`, `stable-ids` | Kettle 3 | requirement | **Kettle 3: Chunker v0.** Chunk by headings first, fall back to line count or paragraph blocks. Store: chunk_id, source hash, line start/end, char start/end, chunk text hash, heading path. Acceptance: every chunk can point back to exact source spans; re-running produces stable chunk IDs if content unchanged | Lines ~400–420 | Build Kettle 3 chunker with lineage | high |
| 2026-04-26 | entif-memory-compiler.md | Response, Kettle 4 spec | `kettle-4`, `dedupe`, `sqlite`, `dedupe-links` | Kettle 4 | requirement | **Kettle 4: Exact + normalized dedupe v0.** Create SQLite tables: `sources`, `normalized_docs`, `chunks`, `dedupe_links` | Lines ~420–480 | Build Kettle 4 dedupe layer | medium |

---

## Conceptual Claims

1. **Compiler vs. Brain:** The AAA system is a compiler pipeline (deterministic, staged, ledgered) rather than a "brain" or monolithic memory soup. Typed artifacts replace summaries as the primary output unit.
2. **Five-Lane Stage 4:** Stage 4 classification/summarization/mining must be decomposed into five parallel lanes (semantic, epistemic, operational, associative, creative) to prevent monolithicity.
3. **Packet Sovereignty:** The canonical assimilation packet is the single source of truth. All backends (Markdown, QMD, Hindsight, OB1, Honcho, graph DB, vector DB) are projection stores only — they do not become independent sources of truth.
4. **Retriever as Mirror:** The retrieval compiler is the inverse of the ingest compiler — same philosophy, opposite direction. Retrieval must target canonical objects, not backend prose.
5. **Synapse Contract Priority:** The packet shape + ledger is the "synapse contract." The swarm (multi-backend, multi-agent) should not be built until the contract is stable.
6. **Event → Pattern → Method → Test → Promotion:** Self-evolution is a literal promotion workflow, not ambient drift or un-reviewed SOUL.md edits.

---

## Dependencies And Sequencing

- Kettle 0 (repo skeleton + schemas) must complete before Kettles 1–4
- Kettle 1 (file ingestion) must complete before Kettle 2 (hygiene needs ingest receipts)
- Kettle 2 (hygiene) gates all LLM calls; nothing expensive happens before hygiene verdict
- Kettle 3 (chunker) feeds Kettle 4 (dedupe) and all downstream lane processing
- Kettle 4 (dedupe) gates expensive repeated processing
- v0.1 (backend adapters) requires v0 packet shape to be stable
- v0.2 (retrieval symmetry) requires v0 packet + at least one projection store

---

## Issue Candidates

*(Not produced — extraction findings only, per instructions)*

---

## Project Board Suggestions

- **Area:** Entif / Rosetta / AAA Core
- **Cycle:** Kettle 0–4 incremental build
- **Status:** Planning/architecture review complete; first kettle implementation pending
- **Blocked by:** None — Kettle 0 can start immediately
- **Parallelization notes:** Kettles 1–4 are sequential dependencies; within each kettle, schema/fixtures can be defined in parallel with implementation

---

## Open Questions

- What is the exact schema for `claims[]` and `relations[]` in the AAP? The document references them but doesn't define the nested field structure
- What is the naming convention for `concept IDs` referenced in the semantic lane?
- How is `novelty_score` computed in the priority formula? The document doesn't specify the method (semantic similarity? embedding distance?)
- What is the interface contract for the `adapter.X.write` methods? Are they sync or async?
- What is the retry/backoff policy for failed adapter writes recorded in the ledger?
- How does the "do not merge" scar mechanism work for concept entities?
- What is the expected latency SLA for the durable job queue in v0?
- The document references `Entif 2.0 - Comprehensive Action Plans.md` and the uploaded appendix — do these need to be ingested as additional sources for context?
