# Entif 2.0 — Enriched by External Advancements

## Source

- **Path:** `docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md`
- **Title:** Entif 2.0 — Enriched by External Advancements
- **Date evidence:** Document header states 20251016 (YYYYMMDD); session context 2026-04-25
- **Authority tier:** Primary design document; authoritative architectural intent
- **Freshness:** Supersedes prior Entif.ai blueprint documents
- **Word count:** ~5,500 (estimated from 1083-line document)
- **Extractor:** subagent / docs-intelligence pipeline
- **Extraction date:** 2026-04-25

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

Entif 2.0 is a comprehensive architecture and execution plan for a voice-first, MCP-orchestrated "command center" that combines ambient audio ingest (Limitless), semantic glyph mapping, knowledge-graph reasoning (GraphRAG), autonomous agent orchestration (Ada), nightly self-improvement (ELIXIR/Coach), and a media-trading engine (Attention-as-Capital). The document synthesizes multiple design streams — Voice-MCP Command Center, Limitless Pendant Integration, Ada+Orchestra, Semantic Glyph Engine, Realtime Pipeline — into a unified 14-day compounding build plan with 4-hour sprint cadence.

---

## Goals And Intent

- Build a voice-first, MCP-driven command center with sub-700ms command acknowledgment and sub-3s tool execution
- Establish ambient parse-only ingest from Limitless audio with diarization, redaction, and graph persistence
- Create a self-improving cognitive loop: nightly entity deduplication, taxonomy refinement, summarization refresh
- Deploy multi-agent orchestration (Ada/Sony/Blink/Cheap-Judge) via MCP with receipt ledger and observability
- Operationalize the "Attention-as-Capital" media-trading stack: content engine, trend indicators, automated distribution
- Unify all subsystems under a single data shape: `session → task → step → artifact → check → outcome → receipt`
- Enable Parse-Only ambient capture as default; Command mode required for any side-effecting action

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Wake-word + VAD with sub-200ms responsiveness | "local VAD and wake-word for sub-200 ms responsiveness" | voice-daemon/audio | P0 | Foundation of voice-first UX |
| Streaming ASR with partials every 150ms, endpointing at 500–800ms silence | "streaming ASR via a fast local model or a small hosted model, partials every 150 ms, endpointing when silence exceeds 500–800 ms" | asr/stream | P0 | Must support barge-in |
| Barge-in that pauses TTS and flushes pending prompts | "barge-in that pauses TTS and flushes pending prompts" | voice-daemon | P0 | Critical for real-time feel |
| MCP tool surface: fs, git, shell, editor, repo_init, code_scaffold, token_meter | "fs for safe file IO with allow-lists, git for branch, commit, and patch application, shell for audited commands, editor for AST-aware edits, repo_init for bootstrapping, code_scaffold for opinionated service templates, token_meter for spend and routing telemetry" | packages/tools.mcp/* | P0 | Each tool returns machine log + human-readable summary |
| Strict JSON schemas and temperature-zero for all tool-selection LLM calls | "All calls are wrapped with structured outputs, strict JSON schemas, and temperature zero for tool selection" | llm/structured | P0 | Non-negotiable for deterministic routing |
| Orchestrator: incremental intent hypothesis, locks intent on endpoint or confidence threshold | "event loop that consumes ASR partials, maintains a rolling transcript window, performs incremental intent hypothesis, and only locks the intent when either endpoint detected or confidence exceeds a threshold" | orchestrator | P0 | Core loop; never edits files directly |
| Receipt ledger: ts, user_said, intent, tool_invocations, tokens_in/out, usd, latency_ms, success_label | "Run ledger entry: ts, user_said, intent, tool_invocations, tokens_in, tokens_out, usd, latency_ms, success_label" | metrics/ledger | P0 | Single source of truth for ELIXIR |
| Parse-only ambient ingest (Limitless → diarized → redact → persist) | "Parse-only enforcement: policy gate checks mode; ambient jobs may write graph/summaries but cannot call side-effecting MCP tools" | ingest, policies | P0 | Parse-only is default; Command mode required for actions |
| Entity resolution and dedupe (MinHash/LSH + cosine on dense embeddings) | "MinHash/LSH on name + context; cosine on dense embeddings; rule assist (emails, phones); produce same_as merges with reversible records" | kg/normalize | P1 | Nightly job |
| Taxonomy refinement via topic clustering (HDBSCAN/k-means++) | "Topic clustering (HDBSCAN/k-means++) over chunk embeddings per domain (family, client, eng, yt)" | kg/taxonomy | P1 | Nightly job; weak supervision labeling |
| Graph normalization: canonicalize relations, collapse chains, enforce cardinalities | "Canonicalize relation types; collapse chains like mentions→about into about with weights; enforce cardinalities" | kg/normalize | P1 | Nightly job |
| Evidence compaction: LSH dedup, duplicates edges, primary/secondary span marking | "Detect duplicates with locality-sensitive hashing; set duplicates edges; keep highest-quality span as primary" | kg/compact | P1 | Nightly job |
| Summary pyramid refresh (map-reduce: chunk → section → doc → topic → entity) | "Map-reduce: chunk → section → doc → topic → entity rollup. Store abstractive and extractive variants" | summarize | P1 | Nightly job |
| Retrieval plan builder: precompute per-intent retrieval recipes | "Precompute per-intent retrieval recipes (e.g., proposal draft = {entities: client+project, evidence: decisions+requirements last 30d, risks})" | kg/retrieval | P1 | Daytime fast path |
| Task mining: mine Task candidates from imperatives/commitments, surface only (never execute) | "Mine Task candidates from imperatives/commitments; link to evidence; score by immediacy and impact; never execute, only surface" | tasker | P1 | Suggest-only in Ambient/Spotlight |
| Quality gates: contradiction detection, drift detector | "Spot contradictions: same entity, same predicate, conflicting values → flag contradicts. Drift detector: if new nightly embedding centroid for a concept moves > threshold" | kg/quality | P1 | Nightly job |
| Cheap-first routing default: cheap model intent parsing, escalate only on low confidence | "a cheap fast default for intent parsing and tool-arg extraction, a mid-tier model for code planning and diffs, an optional heavy model only when the mid-tier signals low confidence" | router | P0 | Policy-encoded model selection |
| Budget header + cost metering on every LLM call; downgrade/chunk/confirm if budget exceeded | "The router attaches a budget header to every call, meters tokens in and out, and records cost per outcome. If the budget would be exceeded, it downgrades, chunks, or asks a targeted confirmation" | router/cost | P0 | Non-negotiable cost control |
| Consent and redaction profiles per contact | "Consent/retention: per-contact consent and redaction profiles; retention tiers; one-click purge by entity with cascade" | policies/consent | P0 | Privacy enforcement |
| Dual-track audio: never store raw audio; transcripts are artifact with PII masking at ingest | "Dual-track audio: never store raw audio by default; transcripts are the artifact with PII masking at ingest" | ingest/redact | P0 | Privacy by default |
| Monorepo layout with pnpm workspaces and turbo caching | "packages/orchestrator, packages/router, packages/protocol, packages/metrics, packages/tools.mcp/*, packages/llm, packages/asr, packages/tts, packages/utils" | root package.json | P1 | Build hygiene |
| Nightly self-tuner: merge duplicate glyphs by hash + embedding | "Cron or async job that merges duplicate glyphs (by hash + embedding)" | coach | P1 | Compaction metric + summary email |
| Ada orchestrator MCP tools: list_agents, create_agent, command_agent, observe, summarize, read_file, write_file | "Tools exposed by Ada: list_agents, create_agent, command_agent, observe, summarize, read_file, write_file" | orchestrator | P0 | Core agent CRUD surface |
| Coach loop: cheap → strong → receipt → weight-update | "Coach logic: cheap → strong → receipt → weight-update" | coach | P1 | Persistent self-tuning |
| Zettelkasten vault fed by n8n runners | "Zettelkasten vault fed by n8n runners from email/docs/calendar" | vault | P2 | Long-term memory |
| Browser agent for acceptance verification | "Browser agent (Critic): verifies acceptance checks on living UI; emits evidence (screens, HAR, verdicts); no code writes" | agents/browser | P1 | Verification only |
| Content engine: parse long-form into scene cards with tone/pacing/persona/polarity/emotion/novelty metadata | "Parse long-form transcripts, lyrics, and essays into scene cards with metadata: Tone, pacing, persona, polarity, emotional vector, novelty, nostalgia, tribe alignment" | content/engine | P2 | Attention-as-Capital pipeline |
| Trend signals table: topic, velocity, longevity, breadth, acceleration, cultural_impact | "Store in trend_signals table: topic, velocity, longevity, breadth, acceleration, cultural_impact" | content/trends | P2 | Media-trading engine |
| Video generation pipeline: Runway/Sora API, auto-title/thumb/distribution via n8n | "Text-to-video via Runway/Sora API or local V2V. Auto-title, description, tags, thumbnail using small LLMs. Distribute via n8n connectors" | content/distribution | P2 | Automated content foundry |
| Genesis Document as immutable root node; nightly drift check against it | "Genesis Document is an immutable root node in the graph. Nightly drift check compares summaries and router policies against Genesis" | kg/genesis | P1 | Conceptual anchor |
| ELIXIR: test_failures table fed by failing receipts | "ELIXIR seed: test_failures table fed by failing receipts" | metrics/elixir | P1 | Epistemic recalibration |
| Veracity Vectors and Emotional Geometry protocol slots (reserved, not active) | "Veracity Vectors and Emotional Geometry slots reserved in protocol; not active yet" | protocol | P2 | Future capability |
| Glyph Engine precision hooks reserved for later | "Language & Truthfulness — outside voice remains natural; inside, Glyph Engine precision hooks reserved for later" | glyph | P2 | Semantic reasoning layer |
| Attention Engine / Content Lanes as portfolio rebalancing read-only lens | "Attention Engine (Content Lanes): treat what to post now as portfolio rebalancing across lanes; expose read-only lens in Spotlight mode; no actions in Ambient" | content/attention | P2 | Strategic content planning |
| r8s.net integration as Entif's market-data eye | "Realtime Pipeline ⇆ r8s.net Interface: Treat r8s.net as Entif's eye: high-frequency ingest showing the same glyph mechanics in market data" | realtime/r8s | P2 | Market data integration |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | North Star | voice, latency, routing | voice-mcp, performance | requirement | Voice-first command center target: sub-700ms command acknowledgment, sub-3s simple tool runs, reliable barge-in, live token/cash burn tracking | "Latency under 700 ms for command acknowledgment, sub-3 s for simple tool runs" | Architect for latency from day one; instrument every call | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | System Shape | voice, orchestrator, mcp | orchestration, tools | decision | Orchestrator brokers between LLMs and MCP tools, maintains short-term working memory, enforces guardrails. Tools speak MCP, not ad-hoc RPC | "An Orchestrator brokers between LLMs and MCP tools, maintains short-term working memory, and enforces guardrails. Tools speak MCP, not ad-hoc RPC" | Enforce MCP as the only tool protocol from day one | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Thin Vertical Slice (Skateboard) | voice, mcp, thin-slice | voice-mcp | decision | First loop: single wake word, single mic, streaming ASR, scaffold_service intent with language+endpoint params, 3 MCP tools (repo_init, code_scaffold, token_meter) | "single wake word, single mic, streaming ASR, one core intent: scaffold a service [...] The tool surface exposes exactly three MCP tools: repo_init, code_scaffold, token_meter" | Ship the skateboard first; do not expand tool surface before the loop is stable | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Concrete Components / Audio | voice, vad, asr | audio, latency | requirement | Local VAD+wake-word for sub-200ms, streaming ASR partials every 150ms, endpointing at 500–800ms silence, barge-in pausing TTS | "local VAD and wake-word for sub-200 ms responsiveness, streaming ASR via a fast local model or a small hosted model, partials every 150 ms, endpointing when silence exceeds 500–800 ms" | VAD + wake-word is the first audio component to implement | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Concrete Components / LLMs | routing, cost | llm, routing | decision | Cheap model for intent parsing/arg extraction; mid-tier for code planning/diffs; heavy model only when mid-tier signals low confidence. All calls: structured outputs, JSON schemas, temp=0 | "a cheap fast default for intent parsing and tool-arg extraction, a mid-tier model for code planning and diffs, an optional heavy model only when the mid-tier signals low confidence. All calls are wrapped with structured outputs, strict JSON schemas, and temperature zero for tool selection" | Encode routing policy and enforce structured output for all LLM calls | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Orchestrator | intent, routing | orchestration | requirement | Event loop: consume ASR partials, maintain rolling transcript window, incremental intent hypothesis, lock intent on endpoint or confidence threshold. Emit single tool call with validated args. Never edit files directly | "event loop that consumes ASR partials, maintains a rolling transcript window, performs incremental intent hypothesis, and only locks the intent when either endpoint detected or confidence exceeds a threshold" | Implement incremental intent hypothesis before expanding to full tool surface | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Routing and Costing | cost, routing | cost, routing | requirement | Router attaches budget header to every call, meters tokens in/out, records cost per outcome. If budget exceeded: downgrade, chunk, or ask confirmation | "The router attaches a budget header to every call, meters tokens in and out, and records cost per outcome. If the budget would be exceeded, it downgrades, chunks, or asks a targeted confirmation" | Instrument cost metering from first LLM call | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Safety | safety, dry-run | safety | decision | Read-only dry-run mode by default; explicit confirmation before destructive shell or network actions; per-tool capability caps; diff viewer read-back when files change | "read-only dry-run mode by default, explicit confirmation before destructive shell or network actions, per-tool capability caps" | Default all tools to dry-run; require explicit opt-in for writes | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Self-Improvement Loop | self-improvement, nightly | coaching, improvement | decision | Every run produces labeled tuples of task, route, cost, latency, outcome. Nightly batch mines for misroutes and low-confidence repairs, updates routing thresholds, extends tool arg schemas | "Every run produces labeled tuples of task, route, cost, latency, and outcome. A nightly batch mines these for misroutes and low-confidence repairs, updates routing thresholds" | Implement nightly batch job as soon as receipt ledger exists | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Operating model | ingest, parse-only | ingest, privacy | decision | Parse-only Ambient as default: Limitless → diarized segments → redact → persist. No actions unless explicitly commanded in Command mode | "Parse-only enforcement: policy gate checks mode; ambient jobs may write graph/summaries but cannot call side-effecting MCP tools" | Build policy gate first in ingest pipeline | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Nightly Jobs / Entity Resolution | entity-resolution, dedup | knowledge-graph | requirement | MinHash/LSH on name+context + cosine on dense embeddings + rule assist (emails, phones) → same_as merges with reversible records | "MinHash/LSH on name + context; cosine on dense embeddings; rule assist (emails, phones); produce same_as merges with reversible records" | Plan entity resolution as first nightly job | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Nightly Jobs / Task Mining | task-mining | tasker | decision | Mine Task candidates from imperatives/commitments; link to evidence; score by immediacy/impact; surface only (never execute in Ambient/Spotlight) | "Mine Task candidates from imperatives/commitments; link to evidence; score by immediacy and impact; never execute, only surface" | Task mining must remain suggest-only until Command mode | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Privacy & Policy | privacy, consent | privacy, consent | requirement | Per-contact consent and redaction profiles; retention tiers (raw segments short, summaries longer); one-click purge by entity with cascade. Never store raw audio by default | "Consent/retention: per-contact consent and redaction profiles; retention tiers (raw segments short; summaries/tasks longer); one-click purge by entity with cascade. Dual-track audio: never store raw audio by default" | Build consent/purge infrastructure before any data persisted | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Ada + Orchestra Notes | orchestration, agents | orchestration | decision | Ada (Orchestrator): realtime CRUD over agents/tools, owns receipts, routes by MCDA. Sony (Backend Builder): server code+tests. Blink (Frontend Stylist): UI code+tests. Cheap-Judge: 2-sentence summaries, low-cost gating before escalation | "Ada (Orchestrator): Realtime, CRUD over agents/tools, owns receipts, routes by MCDA (cost, latency, accuracy, trust). Sony (Back-of-house Builder): server code + tests; no UI writes. Blink (Front-of-house Stylist): UI code + tests; no server writes" | Establish clear agent role boundaries before parallelizing work | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Genesis Document | genesis, alignment | knowledge-graph | decision | Genesis Document is immutable root node in graph. Nightly drift check compares summaries and router policies against Genesis; deviations flagged for review | "Genesis Document is an immutable root node in the graph. Nightly drift check compares summaries and router policies against Genesis; deviations flagged for review. Backups scheduled" | Create Genesis Document artifact before first nightly run | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Receipt Ledger | receipt, metrics | metrics | decision | Every action yields a receipt: route decision, cost (tokens, $), latency, artifacts changed, acceptance verdict, model rationale. Console + SQLite sink as canonical | "Every action yields a receipt: route decision, cost (tokens, $), latency, artifacts changed, acceptance verdict, model rationale. Console + SQLite sink now canonical" | Receipt ledger is the first metric to instrument; ELIXIR depends on it | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Data Shape (canonical) | data-model | data-model | decision | Canonical shape: session, task, step, artifact, check, outcome, receipt — single source of truth for router, coach, and pane | "session, task, step, artifact, check, outcome, receipt — single source of truth for router, coach, and pane" | All packages must emit events in this shape | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | 14-Day Compounding Plan / Phase 0 | phasing, plan | planning | decision | Phase 0 (Autonomic Loop): limitless_connector, receipt_ledger, coach_loop, orchestrator_stub — all shippable in 4-hour blocks | "Phase 0 – Autonomic Loop: 1. Build or stub limitless_connector 2. Add receipt_ledger 3. Wire a minimal coach_loop 4. Wrap with simplest orchestrator_stub voice call" | Start with Phase 0; do not skip to Phase 1 | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | 14-Day Compounding Plan / Phase 1 | phasing, plan | planning | decision | Phase 1 (Semantic Layer): glyph_mapper, graph_store_v1, summarizer_styles — WordNet-synset-based semantic normalization | "glyph_mapper: Converts any text to Entif glyph JSON (WordNet synset ID, role, emotion tags)" | Glyph mapping is the semantic backbone — prioritize schema design | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | 14-Day Compounding Plan / Phase 2 | phasing, plan | planning | decision | Phase 2 (Orchestration & Self-Management): ada_orchestrator_v1, scheduler, observability_pane — Ada coordinates all sub-agents | "ada_orchestrator_v1: MCP runtime for tool CRUD + routing; scheduler: n8n-based or custom routine engine; observability_pane: simple web dashboard" | Ada must be MCP-native from the start | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | 14-Day Compounding Plan / Phase 3 | phasing, plan | planning | decision | Phase 3 (Reflexive Reasoning): elixir_engine, policy_optimizer, alignment_checker — system evaluates own performance, evolves policies | "elixir_engine: Integrates receipt ledger + regression table; policy_optimizer: Adjusts router heuristics using ELIXIR data; alignment_checker: Genesis Document diff + drift detector" | ELIXIR requires receipt_ledger as prerequisite | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | 14-Day Compounding Plan / Phase 4 | phasing, plan | planning | decision | Phase 4 (Externalization): browser agent, voice-first build-a-project workflows, trading/attention engine integration | "Add browser agent (proof/validation); Launch voice-first build-a-project workflows; Integrate the trading/attention engine" | Phases 1-3 must be stable before Phase 4 | medium |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | 14-Day Compounding Plan / Next recommended sprint | phasing, plan | planning | decision | Immediate next sprint: Ada's Realtime orchestrator skeleton + Cheap Judge summarizer; deliverable: CLI or voice interface that executes a single micro-spec and logs a receipt | "Task: Implement Ada's Realtime orchestrator skeleton (Phase 1, step 1) + Cheap Judge summarizer. Deliverable: CLI or voice interface that executes a single micro-spec" | First sprint should complete orchestrator skeleton + receipt ledger | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Monorepo Layout | monorepo, architecture | architecture | decision | pnpm workspaces monorepo: apps/voice-daemon, apps/cli; packages/orchestrator, router, protocol, metrics, tools.mcp/*, llm, asr, tts, utils; configs/, scripts/, turbo.json | "voice-mcp/ apps/* packages/* packages/tools.mcp/* packages/" | Use pnpm workspaces; do not mix package managers | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Protocol Types | types, schema | protocol | requirement | Four core protocol types: AsrSegment, Intent, ToolCall, ToolResult — all zod-typed with JSON schema generation | "AsrSegment, Intent, ToolCall, ToolResult" with zod | Define all four types before any package implements them | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Voice Event Loop | voice, loop | orchestration | requirement | Event loop: stream ASR partials → update intent hypothesis → on endpoint/high-confidence freeze intent → validate args → announce plan in one sentence → invoke tool → emit confirmation+metrics → append run ledger → resume listening | "stream partials, update intent hypothesis, on endpoint or high confidence, freeze intent, validate args, announce planned action in one sentence, invoke tool, emit short confirmation and metrics, append run to ledger, resume listening with barge-in enabled" | Implement full event loop as the core orchestration primitive | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Limitless Pendant Integration / Operating Modes | ingest, mode | ingest | decision | Three modes: Ambient Parse-Only (default, no actions), Spotlight (summaries to brief, suggested intents), Command (actions permitted, barge-in allowed). Red Zones: geofence/calendar hard blocks | "Ambient Parse-Only (default): ingest all Limitless transcripts; classify, summarize, index; no actions permitted. Spotlight (context boost): same + route summaries to daily brief. Command (opt-in): actions permitted behind one-shot approval; barge-in allowed" | Policy gate must enforce mode before any action | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | MCP Tool Surface (new) | mcp, tools | tools | requirement | Six new MCP tools: limitless_pull, transcript_ingest, segment_classify, segment_summarize, task_mine (suggest-only), proposal_draft (Command mode only) | "limitless_pull — pull by cursor/timebox, dedupe, emit segments. transcript_ingest — apply policy, redact, store to KG & ledger. segment_classify — role/domain/actionability labels. segment_summarize — style templates. task_mine — produce suggested tasks. proposal_draft — Command mode only" | Implement policy gate before task_mine and proposal_draft | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Classification Heuristics | classification, heuristics | classify | decision | Speaker/relation seeded from phone contacts and calendar attendees; channel inferred from Limitless tags or YouTube player state; actionability upgrade only on imperative verbs + commitment phrases | "Speaker and relation seeded from your phone contacts and calendar attendees. Channel inference: if Limitless tag contains call, map to participant set; if YouTube player active, channel yt with URL in metadata. Actionability upgrade only when imperative verbs + commitment phrase appear" | Build contact/calendar integration early | medium |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Summarization Styles | summarization, styles | summarize | decision | Three summarization styles: Family call (brief, tone markers, commitments, next check-in), Client meeting (MoM: agenda, decisions, requirements, risks, next steps), YT learning (bullets: claims, methods, links, hypotheses to test) | "Family call → brief, tone markers, commitments, next check-in. Client meeting → MoM: agenda, decisions, requirements, risks, next steps. YT learning → bullets: claims, methods, links, hypotheses to test" | Define summarization style templates before building summarizer | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Implementation Order | phasing, plan | planning | dependency | Recommended order: connectors/limitless → ingest+policies → classify → summarize → tasker → proposal_draft (Command-gated) | "Implementation Order: 1. connectors/limitless with cursor polling, retries, and idempotency. 2. ingest + policies to enforce parse-only and redaction. 3. classify minimal role/domain/actionability model with rules + small LLM. 4. summarize map-reduce and styles. 5. tasker to mine suggestions; wire to morning digest. 6. proposal_draft gated behind Command mode" | Do not reorder; each step is prerequisite for next | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Evaluation Loop | evaluation, coaching | coaching | decision | Cheap summarize → plan cache → attempt → browser verify → one low-cost self-fix → escalate with rationale. Router learns weak→strong via bandit reward; weights stored in coach table | "Cheap summarize → plan cache → attempt → browser verify → one low-cost self-fix → escalate with rationale. Router learns weak→strong via bandit reward; weights stored in coach table" | Browser verification must exist before evaluation loop can close | medium |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Veracity Vectors / Emotional Geometry | reserved, protocol | protocol | issue-candidate | Protocol slots for Veracity Vectors and Emotional Geometry are reserved but not yet active; no implementation path defined | "Veracity Vectors and Emotional Geometry slots reserved in protocol; not active yet" | These are high-value differentiators — define scope and approach before deferring indefinitely | medium |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Glyph Engine | glyph, semantics | glyph | decision | Glyph schema: LABEL, DEFINITION, RELATIONS — canonical node/edge contract for GraphRAG. WordNet/BabelNet synset IDs for semantic grounding. Nightly dedup by hash + embedding | "Glyph Engine precision hooks reserved for later. Glyph schema as the canonical node/edge contract; RAG handles retrieval, Glyph handles reasoning" | Prioritize glyph schema design; WordNet synset mapping is the semantic backbone | high |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Content Engine | content, media | content | decision | Parse long-form transcripts, lyrics, essays into scene cards with: tone, pacing, persona, polarity, emotional vector, novelty, nostalgia, tribe alignment — using WordNet/BabelNet IDs | "Parse long-form transcripts, lyrics, and essays into scene cards with metadata: Tone, pacing, persona, polarity, emotional vector, novelty, nostalgia, tribe alignment, etc. (Use WordNet / BabelNet IDs for consistency)" | Scene card schema is prerequisite for content engine | medium |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | r8s.net Integration | realtime, market-data | realtime | issue-candidate | r8s.net is positioned as Entif's market-data eye for high-frequency glyph-mechanics ingest, but no concrete integration contract defined | "Treat r8s.net as Entif's eye: high-frequency ingest showing the same glyph mechanics in market data" | Define data shape and pull cadence for r8s.net before Phase 4 | low |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | Nightly Self-Tuner Mock | nightly, dedup | coaching | decision | Nightly async job: merge duplicate glyphs by hash + embedding; output: compression metric + summary email | "Cron or async job that merges duplicate glyphs (by hash + embedding). Compression metric + summary email" | Implement glyph dedup as first nightly job once glyph schema exists | medium |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | "Never Build Twice" Enforcement | reuse, dedup | engineering | decision | Content hashes on chunks and AST fingerprints on code artifacts before generating code-suggesting summaries; link duplicates via duplicates/derived_from edges; preferred-libs registry | "Content hashes on chunks and on AST of code artifacts. Before any code-suggesting summaries are generated, check for functionally equivalent snippets via AST/IR fingerprints; link with duplicates/derived_from. Library bias: preferred libs registry" | Build hash/fingerprint infrastructure before code generation is operational | medium |
| 2026-04-25 | docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md | 4-Hour Sprint Cadence | planning, velocity | planning | decision | Every sprint unit must: be self-contained and runnable locally; produce an artifact or automation replacing a current manual bottleneck; chain forward into ecosystem goals | "Each unit of work must: 1. Be self-contained, runnable locally. 2. Produce an artifact or automation that replaces a current manual bottleneck. 3. Chain forward into larger Entif ecosystem goals" | Enforce 4-hour timebox; ship thin vertical slices | high |

---

## Components And Technologies

- **Audio front end:** local VAD + wake-word (sub-200ms), streaming ASR (partials every 150ms, endpointing 500–800ms silence), barge-in with TTS flush
- **LLM layer:** cheap/fast model (intent parsing, arg extraction) → mid-tier (code planning, diffs) → heavy (on mid-tier low-confidence signal only; all calls: structured outputs, JSON schemas, temp=0)
- **Orchestrator:** event loop with incremental intent hypothesis, rolling transcript window, confidence-gated intent lock, typed tool calls via MCP
- **MCP tool providers:** fs (allow-listed), git (branch/commit/patch), shell (audited), editor (AST-aware), repo_init, code_scaffold, token_meter + limitless_pull, transcript_ingest, segment_classify, segment_summarize, task_mine, proposal_draft
- **Router:** budget header per call, token metering, cost-per-outcome recording, downgrade/chunk/confirm on budget exceeded
- **Memory:** short-term scratchpad (session), persistent run journal (prompts, tool calls, diffs, metrics), long-term via vault + n8n runners
- **Metrics spine:** token count (in/out), USD cost, latency (ms), success labels; SQLite + Console sinks; ELIXIR seed: test_failures table
- **Protocol types (zod):** AsrSegment, Intent, ToolCall, ToolResult + Segment, Classification, MinedTask extensions
- **Graph stores:** fast property graph (entity ↔ relation ↔ evidence) + vector index per namespace (family, client, eng, yt) + blob (summaries, artifacts, content-addressed)
- **Nightly jobs:** entity resolution (MinHash/LSH + cosine embeddings), taxonomy refinement (HDBSCAN/k-means++), graph normalization, evidence compaction (LSH dedup), summary pyramid refresh (map-reduce), retrieval plan builder, task mining (suggest-only), quality gates (contradiction detection, drift)
- **Summarization styles:** Family call (brief + tone), Client meeting (MoM format), YT learning (bullets + hypotheses)
- **Operating modes:** Ambient Parse-Only (default), Spotlight (brief + suggested intents), Command (actions permitted), Red Zones (geofence/calendar hard blocks)
- **Agent roles:** Ada (orchestrator/receipts/router), Sony (backend builder), Blink (frontend stylist), Cheap-Judge (2-sentence summaries), Browser Agent (verifier, no code writes)
- **Build tooling:** pnpm 9 workspaces, turbo 2.1 caching, TypeScript 5.5, ts-node 10.9, zod 3.23, eslint 9.3
- **External APIs/integrations:** Limitless (audio stream), Runway/Sora (video generation), n8n (workflow connectors for YT/TikTok/Instagram distribution), r8s.net (market data)
- **Knowledge resources:** WordNet, BabelNet, VerbAtlas (semantic grounding for glyphs)

---

## Conceptual Claims

1. **Voice-first is the primary UX paradigm** — all capabilities must be operable via voice with latency comparable to human reflex thresholds (<700ms acknowledgment, <3s execution)
2. **Parse-only is the safe default** — ambient ingest must never take side-effecting actions; Command mode is an explicit opt-in requiring one-shot approval
3. **Receipts are the feedback currency** — every model/tool action must emit a structured receipt; without a receipt the action did not happen
4. **Self-improvement is autonomous and nightly** — all heavy recomputation (dedup, taxonomy, summaries, routing weights) occurs during sleep-time; daytime is for fast-path retrieval
5. **Cheap-first routing is the economic policy** — escalation from cheap→mid→heavy is gated on low-confidence signals; never pre-escalate
6. **Agent roles are fenced** — Sony never writes UI; Blink never writes server code; Ada is the only entity that moves artifacts across boundaries
7. **Glyphs are the semantic unit** — all ingested content maps to glyphs (LABEL/DEFINITION/RELATIONS) with WordNet synset IDs; this is the canonical contract between ingest, graph, and reasoning
8. **Genesis Document is the conceptual anchor** — all summaries, routing policies, and architectural decisions are checked nightly against it; deviations are flagged
9. **Content is a portfolio** — attention and content distribution should be treated as portfolio rebalancing across lanes (topics, platforms, formats)
10. **Never build twice** — all code and content artifacts carry content hashes and AST fingerprints; functionally equivalent artifacts are linked, not duplicated

---

## Dependencies And Sequencing

```
Phase 0 (Autonomic Loop — Week 1):
  limitless_connector → receipt_ledger → coach_loop (thin) → orchestrator_stub

Phase 1 (Semantic Layer — Week 2–3):
  glyph_schema_design → glyph_mapper → graph_store_v1 → summarizer_styles

Phase 2 (Orchestration & Self-Management — Week 4–5):
  ada_orchestrator_v1 → scheduler → observability_pane

Phase 3 (Reflexive Reasoning — Week 6–7):
  receipt_ledger must be live → elixir_engine → policy_optimizer → alignment_checker

Phase 4 (Externalization — Beyond):
  requires Phases 1–3 stable → browser_agent → voice-build workflows → trading/attention engine
```

Key cross-cutting dependencies:
- **receipt_ledger** is prerequisite for: coach_loop, ELIXIR, policy_optimizer, evaluation loop
- **glyph_schema** is prerequisite for: glyph_mapper, nightly dedup, scene card parsing
- **policy_gate** is prerequisite for: task_mine, proposal_draft, any MCP tool with side effects
- **browser_agent** is prerequisite for: evaluation loop closure

---

## Contradictions Or Supersession

- **Contradiction (minor):** The document header claims "Entif 2.0 — Enriched by External Advancements" but internally describes a system labeled "voice-mcp" throughout the code examples and monorepo layout. No explicit tie to prior Entif.ai documents. Recommend creating explicit Entif.ai integration note or renaming the monorepo to clarify branding.
- **Supersession:** This document (2025-10-16) supersedes earlier Entif.ai blueprint documents referenced within it. The 14-day compounding plan and 4-hour sprint cadence represent a significant shift from prior build methodology (which appears to have been less structured/timeboxed).

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| Implement receipt ledger (SQLite + Console sink) | requirement | `docs/intake/issue-drafts/receipt-ledger-sqlite.md` | phase-0, metrics, elixir | — | "Every action yields a receipt: route decision, cost (tokens, $), latency, artifacts changed, acceptance verdict, model rationale. Console + SQLite sink now canonical" |
| Implement policy gate for parse-only enforcement | requirement | `docs/intake/issue-drafts/policy-gate-parse-only.md` | ingest, policy, safety | — | "Parse-only enforcement: policy gate checks mode; ambient jobs may write graph/summaries but cannot call side-effecting MCP tools" |
| Design glyph schema (LABEL/DEFINITION/RELATIONS + WordNet synset IDs) | requirement | `docs/intake/issue-drafts/glyph-schema-design.md` | glyph, semantic-layer | — | "Glyph schema as the canonical node/edge contract; RAG handles retrieval, Glyph handles reasoning" |
| Implement Limitless connector with cursor polling and idempotency | requirement | `docs/intake/issue-drafts/limitless-connector.md` | ingest, connectors, limitless | policy-gate-parse-only | "connectors/limitless with cursor polling, retries, and idempotency" |
| Implement nightly entity resolution (MinHash/LSH + embeddings) | requirement | `docs/intake/issue-drafts/entity-resolution-nightly.md` | nightly, knowledge-graph | glyph-schema-design, receipt-ledger | "MinHash/LSH on name + context; cosine on dense embeddings; produce same_as merges with reversible records" |
| Implement Ada orchestrator MCP CRUD surface | requirement | `docs/intake/issue-drafts/ada-orchestrator-mcp.md` | orchestration, agents, mcp | receipt-ledger | "Tools exposed by Ada: list_agents, create_agent, command_agent, observe, summarize, read_file, write_file" |
| Define Veracity Vectors and Emotional Geometry implementation scope | open-question | `docs/intake/issue-drafts/veracity-emotional-geometry-scope.md` | protocol, future-capability | glyph-schema-design | "Veracity Vectors and Emotional Geometry slots reserved in protocol; not active yet" |
| Define r8s.net integration contract (data shape + pull cadence) | open-question | `docs/intake/issue-drafts/r8s-net-integration.md` | realtime, market-data | glyph-schema-design | "Treat r8s.net as Entif's eye: high-frequency ingest showing the same glyph mechanics in market data" |
| Implement cheap-first routing policy with budget header | requirement | `docs/intake/issue-drafts/cheap-first-routing-policy.md` | routing, cost, policy | receipt-ledger | "The router attaches a budget header to every call, meters tokens in and out, and records cost per outcome. If the budget would be exceeded, it downgrades, chunks, or asks a targeted confirmation" |
| Implement summarization style templates (Family/MoM/YT) | requirement | `docs/intake/issue-drafts/summarization-styles.md` | summarize, templates | glyph-schema-design | "Family call → brief, tone markers, commitments, next check-in. Client meeting → MoM. YT learning → bullets" |
| Implement browser agent for acceptance verification | requirement | `docs/intake/issue-drafts/browser-agent-acceptance.md` | agents, verification | ada-orchestrator-mcp | "Browser agent (Critic): verifies acceptance checks on living UI; emits evidence (screens, HAR, verdicts); no code writes" |
| Build Genesis Document artifact and nightly drift detector | requirement | `docs/intake/issue-drafts/genesis-document-drift.md` | knowledge-graph, alignment | ada-orchestrator-mcp | "Genesis Document is an immutable root node in the graph. Nightly drift check compares summaries and router policies against Genesis" |

---

## Project Board Suggestions

- **Area:** Entif.ai / Voice-MCP Command Center
- **Cycle:** 14-Day Compounding Plan (v0.1)
- **Status:** Planning complete; Phase 0 execution pending
- **Blocked by:** None for Phase 0 start
- **Parallelization notes:**
  - limitless_connector and receipt_ledger can be built in parallel (no interdependency)
  - coach_loop thin stub requires receipt_ledger but is minimal
  - orchestrator_stub depends on both
  - glyph_schema_design should begin immediately in parallel with Phase 0 (design-only, no code)

---

## Open Questions

1. **WordNet/BabelNet licensing:** Are there commercial usage restrictions for BabelNet in the Entif.ai product? Need to confirm before committing to BabelNet as primary semantic resource.
2. **Limitless API rate limits and quota:** What are the pull cadence limits? The document assumes high-frequency ambient ingest, but API throttling could require queue-based backpressure.
3. **Runway/Sora cost model:** Video generation pipeline is Phase 4-dependent, but cost per minute/generated video needs estimation for attention-as-capital ROI modeling.
4. **Browser agent runtime:** What browser stack does the browser agent use? Chromium-based (required for Playwright) may have installation overhead on the target host.
5. **Genesis Document authorship:** Who owns the Genesis Document — Crates (human) or Ada (system)? The document implies it is immutable and human-authored, but drift detection implies system ownership.
6. **Veracity Vectors implementation path:** Reserved in protocol but no concrete approach. Is this a future research thread or a planned Phase 5 item with a defined owner?
7. **ELIXIR epistemic engine details:** The document references "receipt ledger + regression table" but the actual inference/update mechanism for ELIXIR is underspecified. What model/bayes/rule system drives it?
8. **Graph store technology selection:** Document mentions "fast property graph (or Postgres + pgvector + edge tables)" as options — no definitive choice made. This affects data model design.
9. **n8n workflow engine vs custom scheduler:** Phase 2 mentions both. Which is the actual choice? n8n adds a dependency but provides visual debugging; custom is leaner but less observable.
10. **Multilingual / multi-speaker support:** The document focuses on English diarization. What is the strategy for non-English audio (e.g., Spanish lyrics, multilingual calls)?
