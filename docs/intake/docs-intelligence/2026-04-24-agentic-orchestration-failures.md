# Docs Intelligence Extraction

**Source:** `/Users/cr8s/.openclaw/workspace/Code/rosetta/docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md`

---

## Source

- Path: `docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md`
- Title: Agentic Orchestration Failures
- Date evidence: 2026/4/23 8:36:10 – 2026/4/23 13:09:43
- Authority tier: primary (user-authored diagnostic monologue + GPT-4.1 synthesis)
- Freshness: current
- Word count: ~6,500
- Extractor: subagent docs-intelligence-cycle
- Extraction date: 2026-04-24

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

Crates exhaustively diagnoses the complete failure of every harness he attempted (OpenClaw, Hermes Agent, AgentZero, Paperclip, Mission Control) and every memory store (OB1, QMD, Honcho, Graphiti, MuninnDB, Markdown) across multiple model providers. The conversation converges on a precise re-frame: the failure is not bad prompts or misconfiguration — it is a **platform mismatch**. The harnesses are not built to respect constitutional primitives. The fix is not better configuration but a **sovereign-kernel architecture** where multi-layer memory is preserved, LangGraph serves as workflow layer only, and every harness/worker is demoted to bounded disposable client. The conversation also produces: a caste system for model roles (Codex planner/engineer, MiniMax schema-bounded worker, Nvidia bulk laborer); a memory sovereignty map (5 layers with distinct jurisdiction); a write-admission gate design; a skillpack importer quarantine flow; and a phased build plan for the NOT LAME system.

---

## Goals And Intent

- Diagnose why every harness and memory store attempted has failed completely
- Identify the root cause category (platform mismatch vs. misconfiguration)
- Determine the correct architectural fix given existing tools (Codex, MiniMax, Nvidia Build tokens)
- Resolve the multi-layer memory design question (federated vs. collapsed)
- Choose the right path to build a system with: multi-channel (Telegram/Discord/Slack), full Mac Studio control, browser automation, skills portability, autonomous learning from transcripts/files/PDFs/videos, self-evolution, and multi-device replication
- Specify whether LangChain+LangGraph is the right migration target
- Produce a PRD suitable for handoff to Codex with minimal ambiguity

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
|---|---|---|---|---|
| Constitutional kernel: owns receipts, write gate, provenance, policy, context compilation, memory routing | "That governor is a thin custom kernel with six jobs: identity/provenance, write admission, query routing, context compilation, receipts, projection rebuildability" | sovereign-kernel | critical | Must be built before any harness or memory adapter |
| Federated multi-layer memory with hard jurisdiction per layer | "multi-layer memory is fine but each layer must have one job, one write policy, one truth claim, and one way to prove provenance back to source" | memory-sovereignty | critical | 5 layers: Constitutional(Git), Artifact(obj+PG), Vector(pgvector, nothing authoritative), Temporal(PG graph), Adaptive(PG+scheduled) |
| LangGraph as workflow layer only, not constitutional layer | "Yes, as the orchestration layer. No, as the constitutional layer." | langgraph-workflow | critical | Checkpointable execution, human-in-the-loop, stateful graphs; NOT sovereign |
| Caste system for model roles: Codex=architect/planner, MiniMax=bounded worker, Nvidia=bulk labor | "Codex should not be your butler. It should be your constitutional engineer." | model-caste | critical | Workers never own state, routing, doctrine, or promotion |
| Write admission gate: no harness/model/plugin writes directly to any layer | "No harness, no model, no plugin writes directly to any layer. Everything goes through one write gate." | write-gate | critical | 9-step state machine: Propose→Normalize→Authorize→Ground→Checkpoint→Apply→Observe→Receipt→Project |
| Receipt ledger for every durable operation | "every retrieval, selection, model call, promotion, rejection, write, and failure emits a receipt" | receipt-law | critical | Receipt absence = failure condition |
| Memory adapter certification harness before any adapter gets power | "Every adapter gets a test harness: ingest/retrieval/tag/score/provenance/replay/policy/timeout" | adapter-certification | high | 8 test classes; fail = demoted to broken extractor |
| Skillpack importer with quarantine: parse→normalize→quarantine→certify→promote | "parse, classify (tools/permissions/side-effects), quarantine (dry-run/sandbox/mocked), promote only if valid receipts + scope compliance" | skillpack-importer | high | Skills from Claude/Codex/OpenClaw must pass quarantine before trust |
| Context compiler: bounded context bundles per task, not prompt sludge | "Models never rummage around your whole life. They receive a bounded context bundle compiled for the task." | context-compiler | high | 7-intent routing; role/risk class scoped bundles |
| Query router: explicit routing by question type to correct layer | "Constitutional queries route to doctrine first. 'What happened when?' routes to event/graph first. Fuzzy recall routes to semantic search." | query-router | high | Query-type → layer authority mapping |
| Self-improvement loops: bounded, proposal-based, not autonomous core mutation | "Any self-generated improvement that touches guard logic, policy, constitutional docs, routing — must become a proposal artifact, not an automatic change" | self-evolution | high | Daytime: user-directed. Nighttime: entity dedupe, taxonomy refinement, salience recalc. Promotions require gate. |
| Mac Studio desktop control: headless browser + active desktop with tiered guard | "Two-tier guard: browser=Playwright, headless/replayable/receipt-logged; desktop=AppleEvents/Accessibility, step-up approval/kill switch/allowlist" | mac-control | high | Stronger guard for desktop vs. browser |
| Multi-channel connectors: Telegram, Discord, Slack | "Telegram / Discord / Slack → connector/adapters under the capability plane" | connectors | high | Signature verification, webhook deadlines, bounded adapter role |
| Video transcript deduplication by canonical video ID | "artifact IDs by canonical video ID + separate relationship edges for playlist membership" | transcript-dedup | medium | Transcribe once; add playlist attachment edge; never re-transcribe same video |
| Multi-device replication via node + pack + adapter system | "containerize the kernel and adapters; keep device profiles declarative; export/import node manifests cleanly; open-core monorepo" | deployment | medium | Mac Studio=sovereign node; cloud=public bot surfaces; lighter nodes=read-only workers |
| OB1 as optional thought extractor only, not authority | "OB1 fails — stays a broken extractor and nothing more" | ob1-demotion | medium | OB1's extraction path was garbage; uniform scores; no tags |
| All external memory tools demoted to optional plugins on probation | "OB1 = optional thought extractor; Graphiti = optional graph projection; MuninnDB = optional experimental; QMD = optional semantic index; Honcho = optional persona/context; Markdown = raw/authored source only" | memory-demotion | medium | None get constitutional authority until certification passes |
| Deterministic bootstrap that refuses to start if state/creds/entrypoints missing | "No 'best effort.' No soft warnings. Refuse startup." | bootstrap-gate | medium | Load canonical state, compile manifest, verify paths/creds/journal/artifacts, print routes+budgets |
| Parallel tool orchestration disabled until substrate is sane | "Until the substrate is sane, every tool plan should be a linear chain: plan → validate → run one step → receipt → next step" | serial-execution | medium | OpenClaw's parallel calls produced race conditions |
| Source preservation: no destructive recoding of authored Markdown | "You do not 'learn' by destructively rewriting authored documents into glib paraphrases. Authored Markdown should be preserved as authored source." | source-preservation | medium | Doctrine=human-authored stable docs; State=typed PG/SQLite; Evidence=append-only logs; Reflections=disposable |
| Video transcript dedupe + playlist attachment note | "never runs the transcription twice for the same video if it's already correctly stored [but DOES add a note if it's being referenced from an additional playlist]" | video-playlist-tracking | medium | Separate playlist relationship edge from transcript artifact |
| Federated memory over collapsed store | "Do not collapse the layers. Constitutionalize them." / "A better solution is not a simpler memory ontology. It is a richer memory ontology with harder contracts." | federated-memory | medium | Rich multi-layer design preserved; each layer has hard jurisdiction |
| 48-failure taxonomy mapped to missing invariants | "turn these 48 failures into a compact matrix of 'failure mode → violated invariant → required countermeasure'" | failure-taxonomy | medium | Evidence integrity, authority failures, execution-path failures, control-loop failures, context-compiler failures, observability failures |
| Open-sourcing path: share substrate, not chaos harness | "share the substrate, not another chaos harness" | open-source-strategy | medium | Open-core monorepo, starter profiles, safe default policy packs, connector stubs |
| Migration path from OpenClaw/Hermes: 8-phase plan | "8-phase plan; legacy become evidence sources" | migration-plan | medium | Legacy transcripts/logs become evidence; harness becomes optional worker |
| Postgres as canonical registry, not SQLite | "Postgres as the registry / provenance / event / graph backbone" / "PostgreSQL as the canonical registry; SQLite as local shadow only" | postgres-canonical | medium | NOT LAME specifies PG; Rosetta Bootstrap currently uses SQLite — gap to resolve |
| Thin kernel before "intelligence" | "install a tiny hard substrate before touching 'intelligence' again" | kernel-first | medium | Git journal + receipt schema + manifest compiler first |
| Kill autonomous evolution loops immediately | "freeze self-improvement loops for a week. No autonomous 'evolution,' no background doctrine rewrites, no agent-authored edits to EVOLUTION.md, HEARTBEAT.md, AGENTS.md" | freeze-loops | low | "they freeze all on their own, trust me" — but the principle is stop all unsupervised mutation |
| Certify before reconnecting any adapter | "certify each adapter before it gets power" | certify-before-connect | low | OB1, QMD, Honcho, Graphiti, MuninnDB all stay broken until certification passes |
| No direct memory promotion by agents | "No agent gets to write canonical memory directly. Promotion path must be: raw artifact → deterministic parsing → chunking → optional extraction job → human-reviewable or rule-validated derived record" | promotion-gate | low | Prevents flattening, uniform scoring, tag collapse |
| Projection rebuildability: derived layers are not truth | "If they rot, they can be rebuilt from source plus receipts" | projection-rebuild | low | Vector/graph/adaptive layers are projections, not epistemic authority |
| Oracle/inspector pattern: model proposes, deterministic runtime evaluates | "LLM for proposal, interpretation, synthesis; deterministic runtime for state transitions; policy engine for permissioning" | oracle-pattern | low | Separation of cognition (stochastic) from enforcement (deterministic) |
| Self-improvement requires proposal artifact | "Any self-generated improvement that touches guard logic, policy, constitutional docs... must become a proposal artifact, not an automatic change" | improvement-proposal | low | Prevents self-mutation rot like Hermes/OpenClaw |
| Canonical ID scheme across all layers | "One ID scheme across all layers: artifact IDs, version IDs, chunk IDs, span IDs, event IDs, projection IDs" | id-schema | low | Identity and provenance across every memory layer |
| Bounded autonomous loops in LangGraph | "bounded autonomous loops" | bounded-loops | low | LangGraph checkpointable, with human-in-the-loop interrupts |
| Node device profiles: declarative, containerized | "keep device profiles declarative; keep memory layer configs explicit; keep policies and packs versioned; export/import node manifests cleanly" | device-profiles | low | Enables multi-device replication |
| Mac Studio M3 Ultra control: headless browser + active desktop within guardrails | "browser automation / Mac desktop control / OS automation adapter behind stronger guard / step-up authorization for destructive operations" | mac-studio-control | high | Two-tier: Playwright for browser, AppleEvents/Accessibility for desktop |
| Active consumption and learning from: past transcripts, sources, Markdown, PDF/DOCX/XLSX/PPTX, logs, VieDay journals, YouTube video transcripts | "ability to actively consume and LEARN from my past chat transcripts... sources, Markdown notes, PDF/DOCX/XLSX/PPTX/etc. files, and logs" | active-learning | high | Autonomous ingestion, classification, summarization, multi-layer storage |
| Autonomous research, direct prioritization, self-evolution | "ability to innovatively and creatively perform its own research and direct its own prioritization and building of both my projects as well as new ideas suggested both by me and itself including its own self-evolution/optimization" | autonomous-research | high | Nighttime loops for entity dedupe, taxonomy refresh, salience recalc, patch proposals |
| Skills written for Claude/Codex/OpenClaw: absorb without risk | "ability to absorb skills written for Claude/Codex/OpenClaw without risk" | skills-portability | high | SkillPack importer with quarantine; parse→classify→quarantine→certify→promote |
| LangChain+LangGraph attainability | "Is this more attainable with LangChain+LangGraph? I'm prepared to migrate this." | langchain-migration | critical | Answer: yes as workflow layer, no as constitutional layer |
| Replicable deployment: deploy on more than one device + world-accessible like OpenClaw | "when it's ready, I can start deploying it on more than one device and also prospectively make it easily-accessible to the world in the way that OpenClaw was shared" | replication | medium | Node+pack+adapter system; open-core monorepo |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-23 8:36 | docs/chats/20260423... | Full document | harness-failure, memory-stack, platform-mismatch | openclaw, hermes, agent-zero, paperclip, mission-control, ob1, qmd, honcho, graphiti, muninn | contradiction | ALL harnesses failed completely, not just underperformed: "none of them in any configuration is even remotely what I demand it to be" / "Worse than worthless. They are all abject slop" | "Paperclip. OpenClaw. Hermes. Agent Zero. Worthless. Worse than worthless." | Reject all current harnesses as sovereign; treat only as optional bounded workers | high |
| 2026-04-23 8:36 | docs/chats/20260423... | Full document | memory-stack, extraction-failure, ob1 | ob1, qmd, honcho, graphiti, muninndb | risk | ALL memory stores failed completely: OB1 extraction broken (uniform score=60, zero tags, noise stored), QMD semantic search broken, Honcho broken, Graphiti never stood up, MuninnDB never installed, Markdown inconsistent/non-summoned | "NONE of them even REMOTELY work, at ALL" | Build canonical kernel first; demote all existing stores to optional untrusted plugins | high |
| 2026-04-23 8:36 | docs/chats/20260423... | Full document | platform-mismatch, root-cause, constitutional-primitives | llm-enforcement, harness-architecture | contradiction | Root cause is NOT misconfiguration or bad prompts — it is platform mismatch: LLMs weren't designed to enforce rules AND harnesses aren't built to respect them | "If LLM cannot be trusted to enforce rules, and harnesses are not built to honor them, then the whole industry is misplacing responsibility" | Architecture must separate: constitutional enforcement (deterministic substrate) vs. cognition (LLM proposer) | high |
| 2026-04-23 8:36 | docs/chats/20260423... | Full document | constitutional-primitives, prose-not-law | append-only, checkpoint, doctrine, enforcement | issue-candidate | First principles existed in prose but were NOT mechanically enforced: append-only violated, checkpoint bypassed, breadth gates tracked but not enforced, mechanisms existed in prose but not wired into execution | "A first principle that is not mechanically enforced will eventually be violated by entropy, shortcuts, race conditions, side paths, or silent failure" | Every principle must have: runtime invariant, single enforcing component, bypass path check, receipt proving it held, auto-consequence on violation | high |
| 2026-04-23 8:44 | docs/chats/20260423... | OpenClaw self-diagnosis | openclaw, failure-taxonomy, evidence-integrity | openclaw, memory-corruption, race-conditions | issue-candidate | OpenClaw self-diagnosis (48 failures across two harnesses): destructive compaction, contradictory summaries, non-deterministic orchestration, opaque routing, silent state corruption, multiple memory authorities with no governance hierarchy, APPEND ONLY violated, heartbeat state lost, gateway restart loses in-flight state | Autopsied in document | Produce failure taxonomy matrix: failure mode → violated invariant → required countermeasure | high |
| 2026-04-23 8:44 | docs/chats/20260423... | Hermes self-diagnosis | hermes, failure-taxonomy, execution-path | hermes, split-brain, dead-mechanisms | issue-candidate | Hermes self-diagnosis: split-brain state (cycle-state.json vs sprint-state.json drifting), dead mechanisms only in prose, cron/entrypoint drift, redirect loops with no exit, 298 redirect cycles producing nothing, 72-hour silent dropout, session artifacts never auto-promoted, breadth gates never enforced | "mechanisms existed in prose but were not wired into the actual execution path" | Same taxonomy matrix needed; execution-path failures vs. personality failures | high |
| 2026-04-23 8:44 | docs/chats/20260423... | Six shared failure patterns | failure-taxonomy, six-patterns | evidence-integrity, authority-failure, execution-path, control-loop, context-compiler, observability | issue-candidate | Six shared failure patterns: (1) No single constitutional source of truth — split-brain across multiple stores; (2) Prose rules not wired into runtime; (3) Mutation allowed where append-only required; (4) Non-deterministic state transitions; (5) Observability too weak to catch drift early; (6) Context treated as sludge not compiled artifact | "These are not isolated bugs. They are violations of core system invariants." | Build failure taxonomy: evidence integrity / authority / execution-path / control-loop / context-compiler / observability | high |
| 2026-04-23 8:47 | docs/chats/20260423... | Principle→Invariant→Enforcement→Telemetry→Consequence | constitutional-engineering, enforcement-chain | principle-enforcement, telemetry, consequence | requirement | The enforcement chain must be complete: Principle → Invariant → Enforcement → Telemetry → Consequence. Any missing link = principle rots | "If any link is missing, the principle rots" | Design every constitutional rule with all five links | high |
| 2026-04-23 8:49 | docs/chats/20260423... | LLM not designed for enforcement + harnesses not built to respect | category-error, caste-system | llm-limitations, harness-design, model-caste | decision | LLMs are stochastic synthesizers not constitutional machinery; harnesses optimize for autonomy not invariants. Solution: caste system — Codex=architect/planner/engineer, MiniMax=bounded schema worker, Nvidia=bulk labor. Workers never own state/routing/doctrine/promotion | "The market is trying to build constitutions out of stochastic parrots and shell-script terrariums" | Implement model caste system; stop letting peasants crown themselves king | high |
| 2026-04-23 8:51 | docs/chats/20260423... | Rewrite vs. advance | rewrite-critique | verbosity, compression | observation | GPT-4.1 was rewording Crates rather than advancing — called out and corrected | "You're just rewording what I said, as you quite often do." | Extraction agents must advance, not compress; cite correctly | medium |
| 2026-04-23 9:06 | docs/chats/20260423... | Memory systems not competing — ALL broken | memory-failure, ob1, qmd, honcho, graphiti, muninn | ob1, qmd, honcho, graphiti, muninndb | contradiction | Key correction: the problem is NOT competing stores — it is that ZERO trustworthy memory substrate exists at all. OB1: broken extraction (1000 thoughts stored, all score=60, zero tags, logs stored as noise). QMD: semantic vector search completely broken. Honcho: completely broken. Graphiti: never worked. MuninnDB: never set up. Markdown: flaky, non-summoned, duplicative | "NONE of them even REMOTELY work, at ALL" | Build one boring trustworthy memory kernel; demote everything to optional plugins on probation | high |
| 2026-04-23 9:06 | docs/chats/20260423... | Two-layer kernel vs. five competing kings | kernel-design, federated-memory | memory-kernel, projection-layers, source-preservation | decision | Solution is NOT simplifying to one store. Solution is federated memory with strict sovereignty: Layer 1 = canonical evidence store (filesystem + SQLite for registry), Layer 2 = derived projections (embeddings, graphs, tags, salience — all disposable). Source artifacts and derived records with provenance. No summaries as canonical, no embeddings as canonical, no "thoughts" as canonical | "One ID scheme across all layers: artifact IDs, version IDs, chunk IDs, span IDs, event IDs, projection IDs" | Build two-layer kernel; all other layers are projections with reversible provenance | high |
| 2026-04-23 9:06 | docs/chats/20260423... | Memory sovereignty map | memory-layers, jurisdiction | constitutional-store, artifact-store, vector-store, temporal-graph, adaptive-memory | requirement | Five distinct layers with hard jurisdiction: (1) Constitutional store: doctrine/policy, human/Codex only, no semantic ranking, no mutation by agent; (2) Artifact/document store: raw source artifacts + metadata (hash, type, date, source); (3) Vector store: recall aid only, not truth; (4) Temporal graph: modeled relations/events/temporal derived from source; (5) Adaptive/prioritized: salience/resurfacing heuristics only, not epistemic authority | "Constitutional queries route to doctrine first. 'What happened when?' routes to event/graph first. Fuzzy recall routes to semantic search. Salience query uses adaptive layer. Source verification always resolves to raw artifacts" | Implement memory sovereignty map with query-type → layer authority routing | high |
| 2026-04-23 9:06 | docs/chats/20260423... | Source preservation vs. destructive recoding | source-preservation, doctrine-split | authored-markdown, doctrine-vs-state, reflection-disposability | requirement | Doctrine files (SOUL.md, HEARTBEAT.md, EVOLUTION.md) should not be treated as living memory — split into: Doctrine (human-authored constitutional docs), Operational state (SQLite/PG under strict schema), Evidence journals (append-only logs), Derived reflections (optional disposable summaries) | "Right now all four were getting smeared together like peanut butter in a server rack" | Split doctrine/state/journal/reflection concerns; prevent smearing | high |
| 2026-04-23 9:06 | docs/chats/20260423... | Certify adapters before reconnecting | adapter-certification, certification-harness | ob1, qmd, honcho, graphiti, muninndb | requirement | Adapter certification harness: (1) Ingest test: 3 high-value + 3 medium + 2 noisy logs + 2 adages → must reject/down-rank logs, preserve provenance, not collapse to blob; (2) Retrieval test: 10 known Q&A → must retrieve correct source/derived; (3) Tag test: tags non-empty and differ across content classes; (4) Score test: scores vary meaningfully junk vs. ordinary vs. high-value; (5) Noise test: system logs/junk don't flood top results; (6) Round-trip test: derived thought links back to exact source spans | "If it fails, it does not enter the stack. Period." | Build certification harness before any adapter reconnection | high |
| 2026-04-23 9:06 | docs/chats/20260423... | Oracle pattern: model proposes, substrate enforces | oracle-pattern, enforcement-separation | llm-role, substrate-role, cognition-enforcement | decision | Correct architecture: LLM for proposal/interpretation/synthesis; deterministic runtime for state transitions; policy engine for permissioning; append-only ledger for evidence; compiler for bounded context; explicit promotion gates for durable change | "Any system that lets an LLM sit above its constitutional layer will eventually rot" | Separate cognition (stochastic LLM) from enforcement (deterministic substrate) | high |
| 2026-04-23 9:06 | docs/chats/20260423... | Deterministic bootstrap gate | bootstrap, startup-gate, refuse-to-start | bootstrap, startup-validation, fail-closed | requirement | Bootstrap must: load canonical state → compile manifest → verify paths/entrypoints → verify creds → verify journal writable → verify latest session artifact exists → print active model routes/budgets → refuse to start if any fail. No "best effort", no soft warnings | "Refuse to start if any of the above fail" | Implement deterministic bootstrap gate as first executable | high |
| 2026-04-23 9:10 | docs/chats/20260423... | Federated over collapsed; keep multi-layer design | federated-memory, multi-layer-design | memory-design, layer-jurisdiction, federated-vs-collapsed | decision | Key correction from initial简化 proposal: federated memory with hard contracts is correct, NOT collapsing to one store. Multi-layer is by design: constitutional doc store + artifact index + semantic vector + time-series graph + adaptive self-pruned memory. Each has different value-add. Dumbing down fails design needs. "A better solution is not a simpler memory ontology. It is a richer memory ontology with harder contracts." | "I _want_ the multi-layered memory; that's by design" | Preserve multi-layer design; add hard jurisdiction and provenance per layer | high |
| 2026-04-23 9:10 | docs/chats/20260423... | Authority by domain, not one universal truth store | authority-by-domain, query-routing | memory-sovereignty, query-authority, layer-jurisdiction | requirement | Authority is query-dependent: constitutional query → doctrine first; "what happened when" → graph/event logs first; fuzzy recall → vector; salience → adaptive; source verification → raw artifacts | "Retrieval authority is query-dependent" | Implement query-type to layer authority routing as core routing logic | high |
| 2026-04-23 9:10 | docs/chats/20260423... | Provenance pointers required for all projections | provenance, span-pointers, derived-layers | provenance-contracts, projection-requirements, span-level | requirement | Every projected record must retain reversible provenance to artifact version and source span: graph edge → source spans; vector chunk → artifact version; salience score → events+decay rules; extracted "thought" → exact passages. Without this, layered design = decorative metaphysics | "Without that, the layered design becomes decorative metaphysics. With it, it becomes a real system." | Build provenance tracking into every projection layer | high |
| 2026-04-23 9:11 | docs/chats/20260423... | Platform mismatch is root cause, not config failure | platform-mismatch, harness-limitations | hermes, openclaw, paperclip, mission-control | contradiction | "There's nothing about Hermes or OpenClaw or PaperClip or Mission Control that is BUILT to respect these things." — harnesses can speak the language of governance but are not structurally built to submit to it | "You started from architectural primitives that assume hard boundaries, explicit authority, provenance, non-destructive source preservation, and layer-specific jurisdiction. The harnesses were built for a different worldview: agent-first improvisation, soft conventions, mutable working state, and 'helpful autonomy' over constitutional enforcement" | Treat harnesses as optional peripheral runtimes, not sovereign substrate | high |
| 2026-04-23 9:11 | docs/chats/20260423... | Harness-proof architecture, not better harness | harness-proof, architecture-target | openclaw, hermes, architecture-design | decision | "You are not looking for a better harness. You are looking for a harness-proof architecture." — architecture where any harness cannot violate constitutional constraints even when stupid, buggy, or sloppy | "Once you see it that way, your design stops being 'how do I make OpenClaw/Hermes behave?' and becomes 'how do I make any harness unable to violate constitutional constraints even when it is stupid, buggy, or actively sloppy?'" | Design for harness-proof architecture, not harness compatibility | high |
| 2026-04-23 9:11 | docs/chats/20260423... | Three viable build paths | build-paths, path-a-b-c | path-a-cage, path-b-clean, path-c-native | decision | Path A (Harness cage): fastest, build thin governor kernel, keep harnesses as sandboxed workers behind adapters. Path B (Clean-room sovereign kernel): recommended — fresh orchestrator owns ingestion/provenance/receipts/query-routing/context-compilation/write-gating/projection-scheduling. Harnesses become optional later. Path C (Full Rosetta/Entif-native): long game — explicit receipt-first from day one with packs/policy gating/content-addressed artifacts/replay semantics | "Path B is how you get to Path C without losing another month to carnival equipment" | Pursue Path B; enables Path C without burning another month | high |
| 2026-04-23 9:13 | docs/chats/20260423... | Seven-day rescue plan | rescue-plan, seven-day | phase-1-bootstrap, phase-2-journal, phase-3-codex, phase-4-artifact, phase-5-startup-gate, phase-6-runtime-blockers, phase-7-review | implementation | Day 1: freeze autonomous loops, disable direct canonical-file edits, pick canonical state store, disable parallel tools. Day 2: create Git journal + receipt schema + manifest compiler. Day 3: wire Codex as escalation-only reviewer/planner for red tasks. Day 4: replace session-end hopes with required artifact conversion step. Day 5: add startup gate and route printout. Day 6: add three runtime blockers (checkpoint required, breadth gate enforced, max redirect/loop escape). Day 7: review receipts, identify top 5 failure modes, decide delegation scope | "The biggest mindset shift is this: Do not ask Codex to run your whole kingdom. Ask Codex to build the prison walls, the passport office, and the tax ledger." | Execute 7-day rescue plan as Phase 0 before full build | medium |
| 2026-04-23 12:27 | docs/chats/20260423... | LangChain+LangGraph as orchestration not constitutional | langgraph-migration, orchestration-vs-constitutional | langchain, langgraph, workflow-layer | decision | "Yes, as the orchestration layer. No, as the constitutional layer." — LangGraph for checkpointable execution, human-in-the-loop, stateful workflows, scheduled routines, branching, retries, bounded autonomous loops. The graph nodes should never write directly to sovereign state — they call kernel APIs | "Use LangGraph for workflows and autonomy; keep your multi-layer memory mesh; and treat every third-party harness or skill ecosystem as a quarantined worker civilization, never as the empire itself" | Migrate orchestration to LangGraph; keep constitutional kernel custom | critical |
| 2026-04-23 12:27 | docs/chats/20260423... | Five-plane memory architecture | memory-architecture, five-layers | constitutional-plane, orchestration-plane, capability-plane, memory-plane, learning-plane | requirement | Five planes: (1) Constitutional plane: receipts/provenance/policy gates/context compilation/canonical IDs/source-span lineage/memory routing rules; (2) Orchestration plane: LangGraph stateful workflows/checkpointable graphs/human interrupts/scheduled routines/task branching/retries/bounded loops; (3) Capability plane: Telegram/Discord/Slack/browser automation/desktop control/file ingestion/connector adapters; (4) Memory plane: 5 layers with jurisdiction; (5) Learning plane: summarize/classify/tag/cluster/refresh edges/update salience/build retrieval plans/mine tasks/propose changes — cannot mutate constitutional core without tests/receipts/approval | Full architecture from conversation | Implement five-plane architecture as system specification | critical |
| 2026-04-23 12:27 | docs/chats/20260423... | Skillpack importer quarantine | skillpack-importer, quarantine | skills-portability, claude-skills, openclaw-skills, parse-classify-quarantine-certify-promote | requirement | Four-phase import: (1) Parse — convert SKILL.md/AGENTS.md/prompt bundles to neutral internal representation; (2) Classify — identify required tools/permissions/side-effects/expected outputs/hidden assumptions/state mutation surfaces; (3) Quarantine — dry-run mode, sandboxed test fixtures, mocked tools, capped budgets, explicit policy scopes; (4) Promote — only if emits valid receipts + respects declared scopes + passes fixture tests + no undeclared side effects | "This is exactly the sort of thing VersionForge and pack-oriented Rosetta design are meant to support" | Build SkillPack importer as dedicated subsystem, not side feature | high |
| 2026-04-23 12:27 | docs/chats/20260423... | Mac Studio control with tiered guard | mac-control, two-tier-guard | playwright, appleevents, accessibility, step-up-approval, kill-switch | requirement | Two-tier guard: (A) Browser automation (lower risk) = headless by default, replayable, receipt-logged, diff/screenshot evidenced, guard-scoped by site/domain/account using Playwright; (B) Desktop active control (higher risk) = stronger approval path, explicit mode switch, session recording, action receipts, kill switch, app allowlist, step-up authorization for destructive ops using AppleEvents/Accessibility | "step-up controls around sensitive operations, plus runtime enforcement rather than trusting model obedience" | Build two-tier guard for Mac Studio; Playwright for browser, AppleEvents/Accessibility for desktop | high |
| 2026-04-23 12:27 | docs/chats/20260423... | Video transcript dedupe with playlist tracking | video-transcript, playlist-tracking, dedupe | youtube-transcription, canonical-video-id, playlist-attachment, never-duplicate | requirement | Artifact IDs by canonical video ID + separate relationship edges for playlist membership. Transcribe once; if referenced from additional playlist, add note indicating attached to that playlist and its content realm — never re-transcribe same video | "never runs the transcription twice for the same video if it's already correctly stored [but DOES add a note if it's being referenced from an additional playlist]" | Implement canonical video ID + playlist edge tracking | medium |
| 2026-04-23 12:27 | docs/chats/20260423... | Autonomous learning plane | autonomous-learning, learning-plane | transcripts, pdfs, markdown, docx, xlsx, logs, vie-day, classification, summarization | requirement | Learning plane must actively consume: past chat transcripts (agentic orchestration + saved transcripts from prior chats), sources, Markdown notes, PDF/DOCX/XLSX/PPTX/etc. files, logs (VieDay journals), YouTube videos (auto-transcribed, deduplicated). Summarize, classify, categorize into multi-layer memory | "ability to actively consume and LEARN from my past chat transcripts... sources, Markdown notes, PDF/DOCX/XLSX/PPTX/etc. files, and logs" | Build autonomous ingestion + classification pipeline | high |
| 2026-04-23 12:27 | docs/chats/20260423... | Autonomous research and self-evolution | autonomous-research, self-evolution | self-improvement, night-loops, proposal-artifacts, bounded-autonomy | requirement | Self-evolution bounded: daytime = user-directed, bounded agent execution, parse-only ambient ingest, no uncontrolled core mutation; nighttime = entity dedupe, taxonomy refinement, summary refresh, retrieval-plan updates, salience recalculation, task mining, patch proposals, pack compatibility checks. Any self-improvement touching guard/policy/constitutional/routing must become proposal artifact, not automatic change | "Any self-generated improvement that touches guard logic, policy, constitutional docs, memory routing... must become a proposal artifact, not an automatic change" | Implement bounded self-evolution loops; proposal artifacts for core mutations | high |
| 2026-04-23 12:27 | docs/chats/20260423... | Multi-device replication via node+pack+adapter | device-profiles, node-manifest, replication | node-system, pack-system, device-profiles, containerization, open-core | requirement | Each node has: same kernel contracts, device profile, connector config, memory-layer selection, model routing policy, tool availability map, local secrets/vault bindings. Device roles: Mac Studio = sovereign node (full ingest, active desktop, browser, background learning, local-first stores); cloud = public bot surfaces, Slack/Discord/Telegram relays, research bursts, queued jobs; lighter nodes = read-only or limited worker roles. Containerize kernel + adapters; declarative device profiles; export/import node manifests | "local-first / infrastructure-independent doctrine: same cognitive system should be able to run on a laptop, cluster, or decentralized mesh without changing its essential behavior" | Design node+pack+adapter replication system; open-core monorepo for sharing | medium |
| 2026-04-23 12:27 | docs/chats/20260423... | Open-source strategy: share substrate not chaos harness | open-source-strategy | open-core, monorepo, starter-profiles, policy-packs | decision | Public sharing = open-core monorepo, starter profiles, safe default policy packs, connector stubs, local-first bootstrap, cloud relay optional. "Share the substrate, not another chaos harness" | "share the substrate, not another chaos harness" | Design open-core strategy; substrate is shareable, chaos harness is not | medium |
| 2026-04-23 12:33 | docs/chats/20260423... | PRD for NOT LAME system via Rosetta v3 | prd-request, rosetta-v3, handoff-to-codex | prd, rosetta-protocol-v3, codex-handoff, unambiguous-spec | requirement | Request: PRD using Rosetta Protocol v3 conventions, meticulous/comprehensive architectural and engineering design for handoff to Claude Code or GPT Codex with minimal ambiguity, conflicts or decoherence with prior work | "please perform an extensive Deep Research operation to prepare a PRD for this that uses Rosetta Protocol v3 conventions and meticulously, comprehensively details the architectural and engineering design and build of such a system" | Produce PRD using Rosetta v3 conventions as primary output artifact | critical |

---

## Components And Technologies

- **Sovereign Constitutional Kernel** — custom; owns receipts, provenance, write gate, policy, context compilation, memory routing, certification, ID schema; NOT LangChain or off-the-shelf
- **LangGraph** — workflow orchestration plane; checkpointable graphs, human-in-the-loop interrupts, stateful workflows, branching, retries, bounded loops; nodes call kernel APIs never write sovereign state directly
- **PostgreSQL** — canonical registry/provenance/event/graph backbone; NOT SQLite as primary
- **SQLite** — local shadow only (PostgreSQL is canonical per NOT LAME; Rosetta Bootstrap currently uses SQLite — gap flagged)
- **pgvector / Qdrant** — semantic recall layer (projection only, nothing authoritative)
- **OB1 (OpenBrain)** — optional thought extractor, NOT authority; demoted to broken extractor until certification
- **QMD** — optional semantic index; demoted until certification
- **Honcho** — optional persona/context index; demoted until certification
- **Graphiti** — optional graph projection; demoted until certification
- **MuninnDB** — optional experimental projection; not installed, remains aspirational
- **Markdown corpus** — authored source preserved intact; NOT memory, NOT canonical doctrine unless explicitly constitutional
- **Codex (GPT-5.4)** — constitutional engineer: schemas, migrations, query router, write gate, receipts, adapter bridges, certification tests, graph/event model, salience model, code review for red-band tasks
- **MiniMax** — bounded schema-driven worker: extract candidate claims/tags, classify chunk type, propose summaries/edges/salience deltas; NEVER decide truth, promotion, reconciliation, authority
- **Nvidia Build** — bulk labor: embeddings, reranking, bulk chunk classification, tag proposals, clustering, candidate edge generation, nightly salience recalculation
- **Hermes / OpenClaw / Paperclip / Mission Control** — optional bounded worker shells only; no direct writes, no canonical memory access, no scheduler authority, no doctrine mutation, no multi-store reconciliation, no self-improvement touching sovereign state
- **Playwright** — browser automation adapter; headless by default, replayable, receipt-logged, trace capture, context-per-run isolation
- **AppleEvents / Accessibility API** — Mac desktop control adapter; step-up approval, session recording, kill switch, app allowlist
- **SkillPack Importer** — parse → normalize → quarantine → certify → promote for third-party skills
- **Adapter Certification Harness** — 8 test classes: ingest / retrieval / tag / score / provenance / replay / policy / timeout

---

## Conceptual Claims

1. **Platform mismatch is the root failure, not misconfiguration.** LLMs weren't designed to enforce rules; harnesses aren't built to respect constitutional primitives. This is a category error in the industry — stochastic parrots and shell-script terrariums trying to be constitutions.

2. **A first principle not mechanically enforced will eventually be violated.** Principle → Invariant → Enforcement → Telemetry → Consequence — all five links required or the principle rots.

3. **Federated memory with hard contracts is correct; collapsing to one store fails design needs.** Multi-layer by design: constitutional store + artifact index + semantic vector + time-series graph + adaptive self-pruned memory. Each layer has distinct jurisdiction and value-add.

4. **Authority by domain, not one universal truth store.** Query-type determines which layer has authority: constitutional → doctrine; temporal → graph/logs; fuzzy recall → vector; salience → adaptive; verification → raw artifacts.

5. **Caste system for models prevents sovereign drift.** Codex = architect/planner/engineer (constitutional work); MiniMax = bounded schema worker (never owns state/routing/doctrine); Nvidia = bulk labor. Workers never own state, routing, doctrine, or promotion.

6. **Harness-proof architecture is the design target, not better harness compatibility.** Architecture where no harness can violate constitutional constraints even when stupid, buggy, or sloppy.

7. **LangGraph as workflow layer only, not constitutional layer.** Checkpointable execution and stateful orchestration via LangGraph; nodes call kernel APIs, never write sovereign state directly.

8. **Source preservation over destructive recoding.** Authored Markdown/docs preserved intact; doctrine vs. state vs. evidence vs. reflection split; no summary replacing source, no embedding masquerading as memory.

9. **Projection layers must retain reversible provenance to source spans.** Without span-level provenance pointers, layered design is decorative metaphysics.

10. **Skillpack import requires quarantine, not direct execution.** Parse → classify → quarantine (dry-run/sandbox/mocked) → certify → promote only if receipts valid + scope compliant + tests pass + no undeclared side effects.

---

## Dependencies And Sequencing

### Phase 0: 7-Day Rescue (before full build)
1. Freeze autonomous loops; disable direct canonical-file edits; pick canonical state store; disable parallel tool orchestration
2. Create Git journal + receipt schema + manifest compiler
3. Wire Codex as escalation-only reviewer/planner for red tasks
4. Wire required artifact conversion at session end
5. Add deterministic bootstrap gate (refuse startup if state/creds/entrypoints/artifacts missing)
6. Add three runtime blockers: checkpoint-before-mutation, breadth-gate enforcement, max-redirect/loop-escape
7. Review receipts; identify top 5 failure modes; set delegation scope

### Phase 1: Constitutional Kernel (build first — before any harness or memory adapter)
1. Create Postgres schema: artifacts, versions, chunks, spans, events, receipts, projections
2. Build deterministic ingester: Markdown, text, PDFs, docs, logs → chunk store with source spans + content hashes
3. Build receipt emitter: every ingest, query, selection, model call, write, failure → receipt
4. Build write gate: 9-step state machine (Propose→Normalize→Authorize→Ground→Checkpoint→Apply→Observe→Receipt→Project), fail-closed
5. Build query router: explicit memory-layer routing rules by query type
6. Build context compiler: bounded task bundles by role/risk class, not prompt sludge
7. Build deterministic bootstrap gate: verify state/creds/paths/journal/artifacts; refuse startup on any fail

### Phase 2: Reconnect Memory Layers (one by one, certify each before power)
1. Constitutional store: Git + versioning + explicit edit permissions; human and Codex only
2. Artifact/document store: uploaded docs, raw text, extracted text, chunks, source spans
3. Semantic recall layer: embeddings over chunks with provenance links back to source
4. Temporal graph layer: events, entities, relations, temporal ordering, all derived from source spans
5. Adaptive memory layer: salience, decay, reinforcement, resurfacing, pruning — never as sole truth

### Phase 3: LangGraph Integration
1. Wire LangGraph as orchestration plane above constitutional kernel
2. Graph nodes call kernel APIs; no direct sovereign state writes
3. Checkpointable execution, human-in-the-loop interrupts, retry/backoff, bounded autonomous loops

### Phase 4: Capability Plane
1. Connector adapters: Telegram, Discord, Slack (signature verification, webhook deadlines)
2. Playwright browser adapter (headless, replayable, receipt-logged, context-per-run isolation)
3. Mac desktop adapter (AppleEvents/Accessibility, step-up approval, kill switch, allowlist)
4. File/document ingestion: PDF/DOCX/XLSX/PPTX/logs/transcripts

### Phase 5: Learning Plane
1. Autonomous ingestion pipeline: transcripts, files, videos (deduped by canonical video ID)
2. Classification, summarization, tagging pipeline
3. Nighttime loops: entity dedupe, taxonomy refresh, salience recalc, retrieval plan updates, task mining, patch proposals
4. Self-evolution: bounded, proposal-artifact-based; core mutations require gate approval

### Phase 6: Skillpack Importer + Adapter Certification
1. Build SkillPack importer: parse→normalize→quarantine→certify→promote
2. Build adapter certification harness: 8 test classes
3. Certify each memory adapter (OB1, QMD, Honcho, Graphiti) before reconnecting

### Phase 7: Multi-Device Replication
1. Node+pack+adapter system: kernel containerized, device profiles declarative, node manifests exportable
2. Device roles: Mac Studio=sovereign, cloud=public bot, lighter nodes=read-only workers
3. Open-core monorepo: starter profiles, safe default policy packs, connector stubs

### Blockers / Gaps
- **SQLite vs PostgreSQL gap**: Rosetta Bootstrap currently uses SQLite; NOT LAME specifies PostgreSQL as canonical. Resolution required before TC-006.
- **TC-005 (Promotion state machine)** is critical path; TC-006/TC-007 blocked until TC-005 is green
- **OB1/QMD/Honcho/Graphiti/MuninnDB** remain demoted until adapter certification harness is built and each passes

---

## Contradictions Or Supersession

- **Contradiction**: Initial简化 proposal suggested collapsing to one store; rejected by Crates. Correct direction is federated with hard contracts, NOT collapsed. This supersedes the initial proposal.
- **Supersession**: "Platform mismatch" diagnosis supersedes all earlier "misconfiguration" and "bad prompt" framings. The entire troubleshooting history of trying different combinations was misdirected — the problem is structural, not parametric.
- **Supersession**: Self-improvement loops being "frozen" — Crates notes they freeze on their own, but the principle stands: stop all unsupervised mutation until kernel is stable.
- **Supersession**: LangGraph as workflow layer (not constitutional) supersedes earlier reliance on OpenClaw/Hermes as sovereign substrate.
- **Supersession**: Memory adapter certification before reconnection supersedes "try harder to configure existing broken adapters."

---

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
|---|---|---|---|---|
| harness-platform-mismatch-root-cause | issue-candidate | root-cause, architecture, harness-failure | none | "LLMs weren't designed to enforce rules, and harnesses aren't built to honor them" — entire industry misplacing responsibility |
| constitutional-primitives-prose-not-law | issue-candidate | constitutional-engineering, enforcement-chain, principle-enforcement | none | 48 failures across OpenClaw/Hermes all trace to prose-rules-not-wired-into-runtime; principle→invariant→enforcement→telemetry→consequence chain broken |
| six-layer-memory-model-federated-jurisdiction | issue-candidate | memory-architecture, federated-memory, layer-jurisdiction, sovereignty-map | none | Multi-layer by design (Constitutional/Artifact/Vector/Temporal/Adaptive); each must have hard jurisdiction and provenance; federated not collapsed |
| memory-adapter-certification-harness | issue-candidate | adapter-certification, ob1, qmd, honcho, graphiti, muninndb | none | All 6 memory adapters completely broken; none should get authority until 8-class certification harness built and passed |
| langgraph-workflow-not-constitutional | issue-candidate | langgraph, workflow-layer, architecture-separation | none | LangGraph for orchestration/checkpointing/human-interrupts only; kernel owns sovereignty |
| model-caste-system-codex-minimax-nvidia | issue-candidate | model-roles, caste-system, codex, minimax, nvidia | none | Codex=architect/planner; MiniMax=bounded worker; Nvidia=bulk labor; workers never own state/doctrine/promotion |
| write-admission-gate-nine-step-state-machine | issue-candidate | write-gate, state-machine, fail-closed, receipts | none | Propose→Normalize→Authorize→Ground→Checkpoint→Apply→Observe→Receipt→Project; fail-closed |
| skillpack-importer-quarantine-flow | issue-candidate | skillpack-importer, quarantine, skills-portability | none | parse→classify→quarantine→certify→promote; no direct writes on import |
| mac-studio-control-two-tier-guard | issue-candidate | mac-control, playwright, appleevents, step-up-approval | none | Browser (Playwright, lower risk) vs. desktop (AppleEvents/Accessibility, higher risk, step-up approval + kill switch) |
| video-transcript-dedup-playlist-tracking | issue-candidate | video-transcription, canonical-id, playlist-attachment, dedupe | none | Transcribe once by canonical video ID; playlist attachment as separate edge; never re-transcribe |
| oracle-pattern-cognition-vs-enforcement-separation | issue-candidate | oracle-pattern, cognition-enforcement, llm-role, substrate-role | none | LLM=proposer/synthesizer; deterministic runtime=state transitions; policy engine=permissioning; append-only ledger=evidence |
| failure-taxonomy-matrix-forty-eight-failures | issue-candidate | failure-taxonomy, openclaw, hermes, invariants | none | 48 failures across two harnesses → evidence-integrity/authority/execution-path/control-loop/context-compiler/observability taxonomy |
| deterministic-bootstrap-gate-refuse-to-start | issue-candidate | bootstrap, startup-gate, fail-closed | none | Load state → compile manifest → verify paths/creds/journal/artifacts → print routes/budgets → refuse startup on any fail |
| memory-sovereignty-query-routing-by-authority | issue-candidate | query-router, memory-sovereignty, authority-by-domain | none | Query type → correct layer authority: constitutional/doctrine vs. temporal/graph vs. fuzzy/vector vs. salience/adaptive vs. verification/raw |
| sovereign-kernel-vs-harness-proof-architecture | issue-candidate | architecture, harness-proof, sovereign-kernel | none | Design target: harness cannot violate constitutional constraints even when stupid/buggy/sloppy; not "better harness compatibility" |
| multi-device-node-pack-adapter-replication | issue-candidate | replication, node-system, device-profiles, open-core | none | Node+pack+adapter system; device profiles declarative; node manifests exportable; Mac Studio=sovereign, cloud=public bot, lighter=read-only |
| sqlite-postgres-gap-rosetta-bootstrap-vs-not-lame | issue-candidate | storage, postgresql, sqlite, migration-gap | TC-006 blocked until TC-005 | Rosetta Bootstrap currently uses SQLite; NOT LAME specifies PostgreSQL canonical; explicit resolution required |
| context-compiler-bounded-bundles-not-prompt-sludge | issue-candidate | context-compiler, bounded-context, prompt-engineering | none | Models receive bounded context bundle compiled for task; never rummage through entire life; role/risk class scoped |
| seven-day-rescue-plan-phase-0 | issue-candidate | rescue-plan, phase-0, bootstrap | none | Day1: freeze loops + pick canonical store; Day2: Git journal + receipt schema + manifest compiler; Day3: Codex wired for red tasks; Day4: artifact conversion required; Day5: bootstrap gate; Day6: three runtime blockers; Day7: receipt review + delegation scope |
| adapter-certification-eight-test-classes | issue-candidate | adapter-certification, testing, certification-harness | none | Ingest/retrieval/tag/score/provenance/replay/policy/timeout — 8 test classes before any adapter gets power |
| source-preservation-doctrine-vs-state-vs-evidence-vs-reflection | issue-candidate | source-preservation, doctrine-split, memory-architecture | none | Doctrine (human-authored stable) / State (typed PG/SQLite) / Evidence (append-only logs) / Reflections (disposable) — prevent smearing |
| projection-rebuildability-derived-layers-not-truth | issue-candidate | projection-rebuild, derived-layers, provenance | none | Vector/graph/adaptive layers are projections not epistemic authority; if they rot, rebuild from source + receipts |
| federated-memory-hard-contracts-not-collapsed | issue-candidate | federated-memory, memory-design, hard-contracts | none | Federated with hard contracts supersedes collapsed-store proposal; rich multi-layer with harder contracts is correct design |
| self-evolution-bounded-proposal-artifacts-not-auto-mutation | issue-candidate | self-evolution, bounded-loops, proposal-artifacts | none | Self-improvement touching guard/policy/constitutional/routing must become proposal artifact not automatic change; prevents Hermes/OpenClaw-style rot |
| receipt-ledger-every-durable-operation | issue-candidate | receipt-law, receipts, audit, provenance | none | Every retrieval/selection/model call/promotion/rejection/write/failure emits receipt; receipt absence = failure condition |

---

## Project Board Suggestions

- Area: NOT LAME / sovereign kernel / Rosetta integration
- Cycle: batch-3 (this doc is batch-3 primary)
- Status: planning
- Blocked by: TC-005 (Promotion state machine) — critical path; adapter certification harness not yet built
- Parallelization notes: Constitutional kernel (Phase 1) must be built before any harness or memory adapter; memory layers (Phase 2) connect one by one after kernel; LangGraph integration (Phase 3) proceeds in parallel with Phase 2 once kernel is stable; capability plane (Phase 4) and learning plane (Phase 5) can proceed in parallel after kernel established

---

## Open Questions

1. Should the sovereign kernel be built in Python (for LangGraph compatibility) or Rust (for performance/safety)?
2. How is the canonical video ID determined for YouTube transcripts — by video URL, by content hash, or by metadata?
3. What is the exact schema for the 9-step write-admission gate state machine — particularly the "Normalize" and "Ground" steps?
4. Should adapter certification be a one-time pass or continuous (per-build)? Continuous seems safer given runtime evolution.
5. How does the skillpack importer handle skills that require tools not yet available in the capability plane?
6. What is the failure mode if a "proposal artifact" for self-evolution is rejected — does the system surface it to the human for review?
7. How does node manifest export/import handle secrets — vault bindings vs. embedded secrets?
8. What is the migration path for existing OpenClaw/Hermes session logs — convert to receipt format or treat as raw evidence?
9. How is the "source span" defined for derived projections from multi-file artifacts?
10. What is the exact boot-time verification sequence — in what order are state/creds/paths/journal/artifacts verified?
11. Does the bootstrap gate run on every session start or only on cold boot?
12. How does the context compiler handle multi-turn conversations where context bundle must be consistent across turns?