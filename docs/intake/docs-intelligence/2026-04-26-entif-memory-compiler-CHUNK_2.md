# Docs Intelligence Extraction — CHUNK 2/6

## Source

- **Path:** `Code/rosetta/docs/chats/20260426 - ChatGPT - Entif Memory Compiler.md`
- **Title:** Entif Memory Compiler (ChatGPT session, 2026-04-26)
- **Date evidence:** 2026-04-26 (session date)
- **Authority tier:** primary / first-party
- **Freshness:** current
- **Word count:** ~720 (this chunk)
- **Extractor:** subagent chunk-2
- **Extraction date:** 2026-04-26

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

This chunk (lines 456–935) covers the tail of the Memory Compiler kettle specification (kettles 5–15), the tier map (tiers 0–7), and Crates' direct critique of multiplicative scoring formulas. Key contributions: ScoreBundle v0 schema, Assimilation Packet v0 contract, Markdown projection, priority queue, claim/task extraction, near-dedupe approach, Rosetta-lite tile stubs, promotion gates, backend adapter interface, nightly coach, tier architecture map, and a substantive objection to score fusion methodology.

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Kettle 5: ScoreBundle v0 | score-bundle, heuristic, metadata, trust, value, urgency, novelty | scoring, metadata, trust | requirement | ScoreBundle v0 must add value/trust/urgency/priority as first-class document metadata using only heuristic scoring (no LLM in v0). Trust: local authored notes score higher, unknown web scrapes lower, quarantined zero. Value: project-name mentions, architecture/security/Rosetta/Entif keywords, task/decision/requirement language. Urgency: deadlines, dates, recency, user-triggered vs background. Novelty: inverse of dedupe confidence. | "Each document gets a ScoreBundle. Each score includes score, reasons[], and method = heuristic_v0. No LLM yet." | Surface ScoreBundle schema in architecture docs; ensure adapter contract accepts it | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Kettle 5: ScoreBundle v0 — Acceptance | acceptance-criteria, score-bundle, heuristic | scoring | decision | Acceptance criterion: each document gets a ScoreBundle with fields score, reasons[], method = heuristic_v0. No LLM in v0 scoring. | "Each score includes score, reasons[], and method = heuristic_v0." | Use this as acceptance test template for scoring components | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Kettle 6: Assimilation Packet v0 | assimilation-packet, contract, backbone, receipts | data-model, pipeline | requirement | Assimilation Packet v0 is the canonical data contract; backends are projections. Must include: source envelope, normalized document ref, chunk refs, hygiene result, dedupe links, score bundle, receipts, empty arrays for entities/claims/insights/tasks/risks/Rosetta fields. | "The packet is the truth. Backends are projections." | Codify this as the central schema; all adapters consume this type | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Kettle 6: Acceptance — emit-packet output | acceptance-criteria, assimilation-packet, output-format | pipeline, output | decision | `aaa ingest sample.md --emit-packet` must write three files: `out/<run_id>/assimilation.packet.json`, `out/<run_id>/projection.md`, `out/<run_id>/receipts.jsonl`. | "`aaa ingest sample.md --emit-packet` writes: out/<run_id>/assimilation.packet.json; out/<run_id>/projection.md; out/<run_id>/receipts.jsonl" | Use this as the integration contract for all ingest commands | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Kettle 7: Markdown projection v0 | markdown-projection, output, human-readable | output, presentation | requirement | Markdown projection v0 must generate a readable report covering: what was ingested, hashes, hygiene verdict, dedupe verdict, scores, chunk list, recommended next action. Must be human-usable without graph DBs or Rosetta packs. | "You can open one file and understand what happened." | Validate projection format early; it's the first value delivery | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Kettle 8: Priority queue v0 | priority-queue, idempotency, retry, state-store | pipeline, orchestration | requirement | Priority queue v0 needs `ingest_queue` table with: source ref, status, priority score, attempt count, last error, created/updated at, next eligible run. Directory scan enqueues files. Higher priority first. Duplicates deprioritized/skipped. Failures retry without blocking unrelated files. Explicitly requires idempotent message-bus-style handoffs and state store tracking fired events, outcomes, staleness, retries, subroutine counts, completion, duration. | "Your ingestion notes explicitly call for idempotent message-bus-style handoffs and a state store that knows what fired, what processed it, outcomes, staleness, retries, subroutine counts, completion, and duration." | Wire this into the orchestration layer; treat as async pipeline primitive | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Kettle 9: Claim/task/insight extraction v0 | extraction, claims, tasks, insights, JSON, grounding | cognition, extraction | requirement | Claim/task extraction v0: for each high-priority non-quarantined chunk, emit strict JSON with arrays: claims[], tasks[], decisions[], risks[], open_questions[], insights[]. Each item requires: text, source chunk ID, confidence, reason, suggested tags. Invalid JSON fails closed. Every object points to a chunk. Nothing promoted to "truth" — only candidate. | "Invalid JSON fails closed. Every extracted object points to a chunk. No object is promoted to 'truth.' It is only a candidate." | Implement fail-closed JSON parsing; treat all outputs as candidate tier | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Kettle 10: Near-dedupe v0 | near-dedupe, simhash, minhash, embedding, similarity | dedupe, similarity | requirement | Near-dedupe v0: use SimHash or MinHash over normalized chunks; optional local embedding. Create `similarity_links` with types: duplicate_candidate, revision_candidate, supports, overlaps, contradicts_candidate. System does NOT auto-merge semantic near-dupes. Human-readable projection shows possible duplicates. | "Two paraphrased chunks link as candidate duplicates. The system does not auto-merge semantic near-dupes yet." | Prioritize similarity_links schema; auto-merge is out of scope for v0 | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Kettle 11: Trust scoring v1 | trust-scoring, compositional, weighting | trust, scoring | requirement | Trust scoring v1 becomes compositional, not vibes. Weighted factors: source trust + hygiene trust + extraction confidence + corroboration count + dedupe/contradiction status + recency/staleness + authorship/provenance quality. A trusted local note with clear provenance scores higher than a web scrape with vague metadata. Contradicted claims get trust penalties. Explanation is visible. | "Trust score becomes weighted: source trust, hygiene trust, extraction confidence, corroboration count, dedupe/contradiction status, recency/staleness, authorship/provenance quality." | Design trust as additive weighted formula; do NOT use multiplicative fusion | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Kettle 12: Rosetta-lite tile stubs | rosetta-lite, tiles, observation, candidate, EGC | Rosetta, tiles, pasigraphy | requirement | Rosetta-lite tiles: define minimal tile-ish records — ObservationTile, CandidateClaimTile, CandidateTaskTile, EvidenceRef, ReceiptRef. No full EGC. No full frames. Stable IDs, content hashes, provenance, relations only. Aligns with MVP blueprint: typed events, deterministic CIDs, receipts, bundle closure, guarded verification before full semantic packs. | "Every extracted object can be represented as a tile-like JSON object. Every tile has provenance and receipt references." | Tile stubs must implement the provenance+receipt contract; no EGC in v0 | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Kettle 13: Promotion gates v0 | promotion, workflow, status, review-queue | workflow, memory | requirement | Promotion gates v0: candidate statuses: candidate, accepted, rejected, needs_review, promoted_to_memory, promoted_to_method, promoted_to_task. Rules: high trust + high value + low duplicate = suggest promotion; high urgency + medium trust = surface for review; low trust + high novelty = research lead not memory. System produces a review queue. Nothing silently becomes doctrine. | "Nothing silently becomes doctrine." | Implement promotion as explicit state machine with audit trail | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Kettle 14: Backend adapter interface | adapter, interface, MemoryAdapter, dry-run | adapters, interface | requirement | Backend adapter interface: MemoryAdapter contract with id, supports(packet), dryRun(packet), write(packet). Implement only markdownAdapter initially. Adapters consume packets, not raw files. Adapter failures produce receipts and do not corrupt the packet. Follows async export model: refined output to Markdown, QMD, Hindsight, OB1, Honcho, or future stores. | "Adapters consume packets, not raw files. Adapter failures produce receipts and do not corrupt the packet." | Codify MemoryAdapter interface; adapter failures must be isolated | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Kettle 15: Nightly coach v0 | coach, reporting, nightly, metrics | operations, reporting | requirement | Nightly coach v0: generate daily report covering files processed, duplicates skipped, quarantines, highest value items, highest urgency items, low-trust/high-value items needing review, failed stages, most common tags, suggested next improvements. Command: `aaa coach daily` outputs `daily_assimilation_report.md`. Connects to self-evaluation checklist and rubric refinement. | "One command creates: aaa coach daily → daily_assimilation_report.md" | Build reporting as first-class pipeline output; connect to rubric refinement loop | medium |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Tier map (Tiers 0–7) | tier-map, architecture, sequencing | architecture, sequencing | decision | Tier architecture map: Tier 0 Spine (schemas, receipts, source envelopes, hashes, ledger); Tier 1 Safe refinery (normalize, hygiene, dedupe, chunking); Tier 2 Value routing (scoring, queueing, skip/escalate); Tier 3 Candidate cognition (claims, tasks, insights, entities, relations); Tier 4 Rosetta-lite (tiles, candidate tiles, evidence refs, CIDs); Tier 5 Memory projection (Markdown, then QMD/Hindsight/OB1/Honcho); Tier 6 Retrieval twin (question → ranked packets → context bundle); Tier 7 Promotion (candidate → reviewed → promoted). Every tier creates leverage for the next without requiring it to exist. | "That's the order. Not because it's philosophically prettiest, but because every tier creates leverage for the next one without requiring the next one to exist." | Use tier map as canonical sequencing reference; no tier assumes next tier exists | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Rallying cry | principles, sequencing | methodology | decision | Rallying cry (five principles): Hash before hydrate. Score before store. Dedupe before deliberate. Candidate before canon. Receipts before religion. | "Hash before hydrate. Score before store. Dedupe before deliberate. Candidate before canon. Receipts before religion." | Post this as operational principles; encode in acceptance tests | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Crates critique: multiplicative scoring formula | scoring, critique, trust, formula, multiplicative | scoring methodology | contradiction | Crates explicitly rejects multiplicative scoring formula (multi-variable score fusion) as "horseshit and fuckery." Arguments: (1) scores relate to different projects/topics/entities differently — no single master score exists; (2) scores have different variable factors in decision theory — cannot be mashed together; (3) example: alchemist pitch has enormous value + urgency + novelty but uncertain trust, and a fused score would be misleading. Direct quote: "that sounds like a recipe for horseshit and fuckery." | "I don't like that multiplicative formula at all, for many reasons. ... [king/alchemist example] ... that sounds like a recipe for horseshit and fuckery." | Do NOT implement multiplicative score fusion. Treat trust, value, urgency, novelty as independent axes; scoring must be compositional per Kettle 11's additive model, not fused into one number | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Cross-reference: Kettle 6 — packet is truth, backends are projections | assimilation-packet, backend-adapter, projection | data-model, adapters | decision | Reinforced principle: Assimilation Packet is the single source of truth; all backends (Markdown, QMD, Hindsight, OB1, Honcho) are projections/consumers of the packet. This is the architectural inversion. | "The packet is the truth. Backends are projections." | Anchor all adapter work to this inversion; packets are immutable truth artifacts | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Cross-reference: Kettle 8 — idempotent message-bus | idempotency, message-bus, state-store, retry | reliability, pipeline | requirement | Kettle 8 explicitly calls for idempotent message-bus-style handoffs and a state store tracking fired events, outcomes, staleness, retries, subroutine counts, completion, and duration. References `20260426 - Automatically Analyzing, Assimilating and Associating Assorted Appendices.md` as local baby version. | "Your ingestion notes explicitly call for idempotent message-bus-style handoffs and a state store that knows what fired, what processed it, outcomes, staleness, retries, subroutine counts, completion, and duration." | This is a known requirement from prior session; ensure Kettle 8 satisfies it | high |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Cross-reference: Kettle 14 — async export model | adapter, async-export, MemoryAdapter | adapters, async | decision | Kettle 14 backend adapter interface follows async export model per `20260426 - Automatically Analyzing, Assimilating and Associating Assorted Appendices.md`. Adapter failures produce receipts and do not corrupt the packet. | "This directly follows your proposed async export model where refined output can be sent to Markdown, QMD, Hindsight, OB1, Honcho, or future stores through tailored mechanisms." | Confirm async export model spec in referenced doc; align adapter design | medium |
| 2026-04-26 | chats/20260426 - ChatGPT - Entif Memory Compiler.md | Cross-reference: Kettle 15 — self-evaluation checklist | coach, self-evaluation, rubric | operations, self-improvement | requirement | Kettle 15 nightly coach connects to self-evaluation checklist: constant rubric refinement, anticipating failures, scoring actions, preventing duplicated bloat, creating reversible checkpoints/tests before edits. References `20260426 - Automatically Analyzing, Assimilating and Associating Assorted Appendices.md`. | "This connects to the self-evaluation checklist: constant rubric refinement, anticipating failures, scoring actions, preventing duplicated bloat, and creating reversible checkpoints/tests before edits." | Cross-reference the checklist requirements in the appendices doc | medium |

---

## Components And Technologies

- **ScoreBundle** — heuristic scoring metadata (trust/value/urgency/novelty + reasons array)
- **AssimilationPacket** — canonical data contract; central schema type
- **Priority queue** (`ingest_queue` table) — idempotent, message-bus-style with retry and state tracking
- **Claim/task extraction JSON schema** — claims/tasks/decisions/risks/open_questions/insights per chunk
- **Near-dedupe** — SimHash or MinHash; `similarity_links` table with typed relations
- **Trust scoring v1** — additive weighted composition, not multiplicative fusion
- **Rosetta-lite tiles** — ObservationTile, CandidateClaimTile, CandidateTaskTile, EvidenceRef, ReceiptRef
- **Promotion gates** — explicit status state machine (candidate → accepted/rejected/needs_review/promoted_*)
- **MemoryAdapter interface** — id, supports(), dryRun(), write(); markdownAdapter as v0 implementation
- **Nightly coach** — `aaa coach daily` → daily_assimilation_report.md

---

## Conceptual Claims

- The packet is the canonical truth; backends are projections of it (architectural inversion)
- Every tier creates leverage for the next without requiring the next to exist
- Nothing silently becomes doctrine; promotion gates enforce explicit review
- Adapters consume packets, not raw files; adapter failures produce receipts, not corruption
- Scoring must be compositional (additive weighted) not multiplicative fusion
- Near-dupes are linked candidates, not auto-merged

---

## Dependencies And Sequencing

- ScoreBundle (K5) → needed by K6 (packet), K8 (priority), K11 (trust v1)
- Assimilation Packet (K6) → consumed by all adapters (K14), projection (K7), Rosetta-lite (K12)
- Dedupe (K4 from prior chunk) → feeds K5 (novelty), K8 (deprioritization), K10 (near-dedupe)
- Priority queue (K8) → orchestrates all subsequent processing
- Claim extraction (K9) → feeds promotion (K13), Rosetta-lite tiles (K12)
- Promotion gates (K13) → gates access to memory projection (K5 tier)
- Tier map defines canonical sequencing: 0→1→2→3→4→5→6→7

---

## Contradictions Or Supersession

- **Contradiction (chunk 2):** Crates directly rejects multiplicative score fusion introduced in prior scoring discussion. Kettle 5/11 scoring must use additive compositional model, NOT multiplicative formula. This is an explicit design constraint from the primary authority (C8/Crates).

---

## Issue Candidates

*(Not produced in this pass — extraction findings only)*

---

## Project Board Suggestions

- **Area:** Entif Memory Compiler / Rosetta ingestion pipeline
- **Cycle:** kettles 5–15 build-out (this chunk)
- **Status:** Foundational architecture defined; implementation pending
- **Blocked by:** Kettle 4 dedupe (prior chunk dependency); K6 packet schema must be finalized before K14 adapter work
- **Parallelization notes:** K5 (ScoreBundle), K7 (Markdown projection), K8 (priority queue) are independently schedulable after K4/K6 schema stabilizes

---

## Open Questions

- **[mc-chunk2-oq-1]** Does the additive trust scoring model in K11 need explicit per-axis thresholds or is it purely rank-order? (Kettle 11 spec is additive but doesn't define whether scores per-axis are normalized 0–1 or raw values)
- **[mc-chunk2-oq-2]** Is there a specified max retry count or backoff strategy for the ingest queue in Kettle 8? ("failures retry without blocking" is stated but retry limits/backoff not defined)
- **[mc-chunk2-oq-3]** What is the failure mode when an adapter's `dryRun` succeeds but `write` fails? Is the packet re-emitted or dead-lettered?
- **[mc-chunk2-oq-4]** Kettle 9 extraction uses a "cheap model" — is the model provider configurable or hardcoded in the v0 implementation?
