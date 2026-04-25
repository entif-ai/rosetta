# Docs Intelligence Extraction — 2026-04-25-deepcode-prototype-potential

## Source

- Path: `docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md`
- Title: DeepCode prototype potential
- Date evidence: Chat export dated 2026/2/25; conversation from 2025/12/12 to 2026/1/21
- Authority tier: ChatGPT with Entif AI Engine (g-p-68113a0ebebc819183ea60319883eb09)
- Freshness: References paper 2512.07921v1 (DeepCode); conversation from Dec 2025
- Word count: ~3593 lines; 142KB
- Extractor: heartbeat subagent
- Extraction date: 2026-04-25

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

Crates explored using DeepCode (a 3-phase doc→repo ML system from paper 2512.07921v1) to prototype parts of his universe (VieDay, SAFE Inventory, Entif). The conversation proposed a local agentic build orchestrator architecture using NVIDIA NIM endpoints as the model backend, with a "code atlas" project knowledge graph and 5 specialized "forge" agents (Spec Forge, Blueprint Forge, Code Forge, Consistency Forge, Reporter Forge). The core insight: DeepCode-style automation works well for scaffolding/glue (60-90%) but not for novel conceptual/behavioral intelligence (20-50%). The architecture described is a bootstrap path toward a self-building system.

## Goals And Intent

- Assess DeepCode paper (2512.07921v1) applicability to VieDay, SAFE Inventory, Entif
- Design a local agentic build orchestrator running on Mac M3 Pro with NIM endpoints
- Map project-by-project automation ceilings (what % of work is automatable)
- Define "code atlas" as project knowledge graph
- Plan bootstrapping path toward self-building system (DeepCode re-implementing itself)

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Orchestrator core (local, task queue, project graph storage, CLI/API) | "A small service (Python is fine) that does: task queue/event loop, project graph storage (SQLite or simple graph DB), API endpoints/CLI for ask/plan_module/build_module/status" | orchestrator | high | Local service; does not call models directly |
| Model broker (NIM integration) | "A small adapter layer that knows how to: call NIM's LLM endpoints for general reasoning and code generation, choose models based on task" | nim-broker | high | Abstraction: run_model(task, prompt, schema) → ParsedResult |
| Project knowledge graph ("code atlas") | Core data model: SpecDoc, ModuleSpec, FileSpec, InterfaceSpec, BuildArtifact, Issue | code-atlas | high | Central to the whole architecture |
| Spec Forge agent | Input: raw notes/markdown/PDFs; Output: structured SpecDoc + ModuleSpec objects; Jobs: normalize language, identify boundaries, attach verification criteria | spec-forge | high | Mirror of DeepCode Phase 1 (Concept Agent) |
| Blueprint Forge agent | Input: ModuleSpec + project graph; Output: blueprint JSON (files, language, functions, tests) | blueprint-forge | high | Mirror of DeepCode Phase 1 (Planning Agent) |
| Code Forge agent | Input: blueprint + current repo state; Output: code files + tests; Iterates on error with stack trace feedback | code-forge | high | Mirror of DeepCode Phase 2 (CodeRAG + CodeMem) |
| Consistency Forge agent | Input: updated code + project graph; Output: updated InterfaceSpec, BuildArtifact, Issue; Jobs: scan signatures, flag incompatible modules, suggest refactors | consistency-forge | medium | New forge; not in original DeepCode paper |
| Reporter Forge agent | Input: project graph + logs; Output: human-readable reports (module status, test results, roadmap) | reporter-forge | medium | Human-facing summary layer |
| Module lifecycle (5-step loop) | Conversation→Task → Spec Refinement → Blueprint → Code Generation & Verification → Atlas Update & Report | module-lifecycle | high | Core operational loop |
| Contracts as first-class objects | InterfaceSpec: endpoint/function name, args/types, return types, invariants | contracts | high | Prevents interface drift |
| Shared types / canonical schema | Single source of truth for User, Entry, Item, TrajectoryVector etc. (shared package or IDL) | shared-types | high | Prevents schema fragmentation |
| Impact analysis before edits | Query atlas: "what depends on this?" before changing a module | impact-analysis | medium | Gates breaking changes |
| Coherence checks (automated) | Periodic: InterfaceSpec vs actual code, test coverage of contracts; outputs "coherence score" | coherence-scoring | medium | Quality gate |
| NIM model access (unlimited free SOTA) | NVIDIA NIM developer program: "almost unlimited free access to every SODA model that exists" | nim-access | high | Infrastructure prerequisite |
| Self-building bootstrap path | Treat DeepCode as spec → bootstrap pass → gated self-modification → spec-as-code discipline | self-building | high | Long-horizon goal |
| ModuleSpec JSON schema | Schema for: name, purpose, inputs/outputs, dependencies, verification criteria | module-spec-schema | high | First concrete artifact to define |
| InterfaceSpec JSON schema | Schema for: function signatures, data contracts, preconditions/postconditions | interface-spec-schema | high | First concrete artifact to define |
| Blueprint JSON schema | Schema for: files to create, language/framework, major functions/classes, test plan | blueprint-schema | high | First concrete artifact to define |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §1 DeepCode 3-phase system | deepcode,doc-to-repo,blueprint-generation,coderag,codemem | deepcode-2512,code-generation | technology | DeepCode (paper 2512.07921v1) is a 3-phase doc→repo machine: (1) Blueprint generation (Concept Agent maps system, Algorithm Agent handles low-level details, Planning Agent merges into Implementation Blueprint), (2) Code generation with CodeMem (summarizes each file for compact coherent context) and CodeRAG (pulls patterns from existing repos), (3) Automated verification (static analysis + sandbox run + iterative LSP-style edits). | "Blueprint generation (Phase 1) → Code generation with memory & RAG (Phase 2) → Automated verification (Phase 3)" | Read original paper for full algorithm details. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §2 Ideal input characteristics | ideal-input,specialization | deepcode,spec-quality | requirement | DeepCode's ideal inputs: clear section structure (Intro/Objectives/Architecture/Data Model/API/UX/Ops/Validation), explicit components & boundaries, pseudo-code/workflows/state machines, success criteria / testable behavior. Crates' specs map well: VieDay (structured, process-y), SAFE (concrete entities/workflows), Entif (deep conceptual stack). | "The better your doc is in that style, the more it can carry through Phase 2 & 3 without babysitting." | Audit existing specs for DeepCode-readiness. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §3.1 VieDay automation ceiling | automation-ceiling,vieday | automation-potential,vieday | requirement | VieDay automation ceiling: Backend & admin UI = HIGH (most of v1); Behavioral intelligence (heuristics, prioritization, emotional geometry) = MEDIUM (implementation, not invention); Deep behavioral ML = LOW unless algorithmically spelled out. | "Bootstrapping & plumbing: high automation potential. Deep behavioral intelligence: low–medium, depends on how algorithmically you write it down." | Prioritize VieDay backend/admin for first doc→repo experiment. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §3.2 SAFE automation ceiling | automation-ceiling,safe-inventory | automation-potential,safe-inventory | requirement | SAFE automation ceiling: Data model, APIs, admin, import/export = HIGH; Hardware + advanced CV/OCR = MEDIUM-LOW (nonstandard pipelines); Risk modeling / cross-system reasoning = LOW unless formalized. | "Backend, CLI tools, admin panels, and import/export flows" = high hit-rate for doc→repo | Prioritize SAFE backend/admin for second doc→repo experiment. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §3.3 Entif automation ceiling | automation-ceiling,entify | automation-potential,entify | requirement | Entif automation ceiling: Infra, services, pipelines, sandboxes = MEDIUM-HIGH; Core epistemic engine & "soul math" (Markov blankets, active inference, reverse-KL training, energy-based stack) = FIRMLY HUMAN (won't discover, only implement if spelled out like a paper). | "A doc→repo agent can implement these once they're spelled out like a paper, but it won't discover them." | Treat Entif core theory as non-automatable input; only scaffold is automatable. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §4 "Boilerplate turbine" model | boilerplate-turbine,automation-model | deepcode,workflow | decision | Proposed model: Let agent do services, modules, tests, basic UIs, configs, Docker, CI skeleton. Human stays focused on theory, objectives, scoring, UX feel, hard integration edge-cases. Over time, accumulate library of spec-patterns known to generate working code. | "Let the agent do: Services, modules, tests, basic UIs. You stay focused on: Theory, objectives, scoring, UX feel, hard integration edge-cases." | Adopt "boilerplate turbine" as default mode for early experiments. | medium |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §2.1 Orchestrator core | orchestrator-core,local-service | orchestrator | technology | Orchestrator core: small Python service with task queue/event loop, project graph storage (SQLite or graph DB), CLI/API endpoints (ask, plan_module, build_module, status), tools (file read/write, git integration, test runner, static analysis). Never calls model directly; uses Model Broker. | "This thing never calls a model directly; it uses a 'Model Broker.'" | Build minimal orchestrator core first as foundation. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §2.2 Model broker | model-broker,nim-integration | nim,model-broker | technology | Model broker: adapter layer that calls NIM LLM endpoints for general reasoning (spec refinement, planning, reporting) and code generation. Chooses model based on task type. Abstraction: run_model(task, prompt, schema) → ParsedResult. Enables model swap without changing orchestrator. | "Abstraction here: run_model(task: Task, prompt: Prompt, schema: JSONSchema) -> ParsedResult. This gives flexibility to swap models without touching orchestrator logic." | Define run_model interface; implement NIM adapter; enable future model swap. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §2.3 Code atlas data model | code-atlas,project-knowledge-graph | code-atlas,data-model | technology | Code atlas data model: SpecDoc (id, title, path, sections, tags, linked entities), ModuleSpec (name, purpose, inputs/outputs, dependencies), FileSpec (path, language, owned_by ModuleSpec), InterfaceSpec (function signatures, data contracts), BuildArtifact (file path, git commit, tests, last_status), Issue (type, linked modules/files). | Full schema in §2.3 | Define these as JSON Schema; implement storage in SQLite or Neo4j. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §3 Agent types (5 forges) | spec-forge,blueprint-forge,code-forge,consistency-forge,reporter-forge | forges,agent-types | technology | 5 forge agents: (1) Spec Forge = refines raw notes into SpecDoc+ModuleSpec; (2) Blueprint Forge = generates Implementation Blueprint JSON from ModuleSpec; (3) Code Forge = generates code+tests from blueprint, iterates on errors; (4) Consistency Forge = updates InterfaceSpec + BuildArtifact after code changes, flags incompatibilities; (5) Reporter Forge = generates human-readable status reports. | "Each of these is just an agent profile + prompt + JSON schema on top of the same underlying models." | Implement each forge as LLM task profile with JSON output schema. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §4 Module lifecycle (5 steps) | module-lifecycle,5-step-loop | orchestrator,workflow | decision | 5-step module lifecycle: (1) Conversation→Task (orchestrator identifies request, links/creates ModuleSpec, queues PlanModule task), (2) Spec Refinement (Spec Forge reads existing specs + related modules, outputs updated ModuleSpec), (3) Blueprint (Blueprint Forge generates file-level plan with key functions + tests), (4) Code Generation & Verification (Code Forge generates code+tests, runs tests, iterates on failure), (5) Atlas Update & Report (Consistency Forge updates module graph + InterfaceSpecs; Reporter Forge generates build report). | "From your POV, you're basically chatting with 'Entif-Builder.' From its POV, it's running these forges in sequence." | Implement 5-step loop as core orchestrator workflow. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §5 Contracts as first-class | contracts-first-class,interfaces | contracts,architecture | decision | Every cross-module interaction has structured InterfaceSpec: endpoint/function name, args+types, return types, invariants/preconditions. Generate both code (stubs/handlers) and tests that enforce contracts. | "For every cross-module interaction, keep a structured InterfaceSpec... Generate both: Code (function stubs/handlers) + Tests that enforce these contracts." | Make InterfaceSpec mandatory for all cross-module interfaces. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §5 Shared types (single source of truth) | shared-types,canonical-schema | shared-types,schema | decision | Shared types package or IDL definitions (OpenAPI/Protobuf/YAML/JSON schema). Exactly one canonical schema per entity: User, Entry, Item, TrajectoryVector. | "For any User, Entry, Item, TrajectoryVector, there is exactly one canonical schema." | Create shared-types package in monorepo; generate from IDL. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §5 Impact analysis before edits | impact-analysis,breaking-changes | architecture,change-management | requirement | Before a module is changed: orchestrator queries atlas "what depends on this?" Either blocks interface changes unless all dependents updated, or schedules follow-up module updates. | "When a module is changed: Orchestrator queries atlas: 'What depends on this?' It either: blocks interface changes unless all dependents are updated, or schedules follow-up module updates." | Implement impact-analysis as pre-commit/push gate. | medium |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §5 Coherence score | coherence-score,automated-checks | quality,testing | requirement | Periodic automated jobs: (1) check InterfaceSpec definitions still match actual code; (2) check tests cover all declared contracts. Reporter compiles into "coherence score." | "Reporter compiles these into a 'coherence score.'" | Implement as scheduled CI job; surface in Reporter Forge output. | medium |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §6 Self-building bootstrap path | self-building,bootstrap,spec-as-code | self-building,bootstrap | decision | Self-building path: (1) Treat "DeepCode" as just another spec (write Entif Builder v1 spec), (2) Bootstrap pass: use v0 orchestrator to implement v1 orchestrator, (3) Gated self-modification: system proposes PR-like bundles (diffs+rationale+updated specs+tests); human approves/rejects; auto-merge for docs/refactors with 100% coverage, manual for architecture changes, (4) Spec-as-code discipline: every nontrivial change to orchestrator must update spec + blueprints. | "Allow the system to propose changes to its own code: It creates PR-like bundles: diffs + rationales + updated specs + tests." | Plan this as Phase 2; v1 must be stable before attempting. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §7 Concrete first step | concrete-first-step,json-schema | planning | decision | First step: pick one target (e.g., "VieDay Core Journal Service"), define atlas/ (modules.yaml, interfaces.yaml), orchestrator/ (Python script: plan_module + build_module commands wrapping NIM calls + test runner), reports/ (markdown file updated by Reporter). Wire one forge end-to-end: Spec+Blueprint+Code Forge as separate prompts with JSON output. | "Define three things in a small repo: atlas/, orchestrator/, reports/" | Execute this "hello world" as first concrete experiment. | high |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §2.3 Issue tracking in atlas | issue-tracking,atlas-model | code-atlas,issue-tracking | technology | Atlas Issue model: type (test_fail, spec_gap, mismatch), linked modules/files. All agent activities read/write Issue objects. | "Issue: type (test_fail, spec_gap, mismatch), linked modules/files" | Add Issue tracking to atlas data model; surface in Reporter Forge. | medium |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §3 CodeMem concept | codemem,context-compression | deepcode,memory | technology | CodeMem: summarizes each generated file (purpose, public interface, dependency edges) and uses those summaries instead of raw code to keep context small but coherent. | "CodeMem: summarizes each generated file (purpose, public interface, dependency edges) and uses those summaries instead of raw code to keep context small but coherent." | Consider implementing CodeMem-like summarization for multi-file context. | medium |
| 2025-12-12 | docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md | §3 CodeRAG concept | coderag,pattern-injection | deepcode,rag | technology | CodeRAG: pulls patterns from existing repos and injects them ONLY when useful to fill in underspecified implementation details. Prevents hallucinated boilerplate. | "CodeRAG: pulls patterns from existing repos and injects them only when useful to fill in underspecified implementation details." | Build CodeRAG as part of Code Forge; seed with Crates' existing codebase patterns. | medium |

## Components And Technologies

- DeepCode (paper 2512.07921v1): 3-phase doc→repo system (Blueprint → CodeMem/CodeRAG → Verify)
- CodeMem: per-file summarization for compact coherent context
- CodeRAG: pattern injection from existing repos
- Orchestrator core: Python service, task queue, SQLite/graph DB
- Model Broker: NIM adapter, run_model(task, prompt, schema) abstraction
- Code Atlas: SpecDoc, ModuleSpec, FileSpec, InterfaceSpec, BuildArtifact, Issue data model
- 5 Forges: Spec Forge, Blueprint Forge, Code Forge, Consistency Forge, Reporter Forge
- NVIDIA NIM: model backend (unlimited free SOTA access)
- Coherence score: automated contract compliance + test coverage metric
- Spec-as-code discipline: every orchestrator change requires spec + blueprint update

## Conceptual Claims

- Automation ceiling varies by subsystem: scaffolding/glue (60-90%), novel conceptual work (20-50%)
- "Boilerplate turbine" model: agent handles boilerplate, human handles theory/edge-cases
- Module lifecycle is a 5-step loop: Conversation→Task → Spec Refinement → Blueprint → CodeGen&Verify → AtlasUpdate&Report
- DeepCode-like system for Crates' universe = orchestrator + model broker + atlas + 5 forges
- Self-building: treat DeepCode as spec → bootstrap pass → gated self-modification → spec-as-code discipline
- Code atlas is the "single source of truth" that makes coherence checks and impact analysis possible
- "Spec patterns library": over time, accumulate which spec structures reliably generate working code

## Dependencies And Sequencing

- Orchestrator core must be built first (everything else depends on it)
- Model broker depends on: NIM API credentials/access
- Atlas data model (ModuleSpec, InterfaceSpec, Blueprint schemas) must be defined before any forge can emit JSON
- Concrete first step: define schemas → build minimal orchestrator → wire Spec+Blueprint+Code Forge for one module
- Self-building (Phase 2) depends on: stable v1 orchestrator + high coherence score + spec-as-code discipline
- NIM access is prerequisite for everything (model calls)

## Contradictions Or Supersession

- No contradictions found in this document
- Related to: NOT LAME PRD (sovereign kernel, 5 memory layers), Cognitive Tiles (tiles as capability representation), Rosetta Bootstrap (initial scaffolding approach)
- Potential tension: DeepCode-style build orchestrator vs. Rosetta's build protocol — need to ensure compatibility or explicit boundary

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| DCP-001: ModuleSpec/InterfaceSpec/Blueprint JSON schemas undefined | issue-candidate | `docs/intake/issue-drafts/DCP-001-json-schemas-undefined.md` | enhancement,schema,code-atlas | — | §7 concrete first step requires these schemas; no implementation exists |
| DCP-002: Orchestrator core not built | issue-candidate | `docs/intake/issue-drafts/DCP-002-orchestrator-core-not-built.md` | enhancement,orchestrator,foundational | DCP-001 (schemas) | "A small service (Python is fine) that does: task queue/event loop, project graph storage" — not built |
| DCP-003: Model broker (NIM adapter) not implemented | issue-candidate | `docs/intake/issue-drafts/DCP-003-model-broker-nim-unimplemented.md` | enhancement,nim,model-broker | — | "Abstraction: run_model(task, prompt, schema) → ParsedResult" — interface only; no adapter exists |
| DCP-004: Code Atlas data model not implemented | issue-candidate | `docs/intake/issue-drafts/DCP-004-code-atlas-not-implemented.md` | enhancement,code-atlas,data-model | DCP-001 | SpecDoc, ModuleSpec, FileSpec, InterfaceSpec, BuildArtifact, Issue — schemas defined but no storage |
| DCP-005: All 5 forges not implemented | issue-candidate | `docs/intake/issue-drafts/DCP-005-five-forges-unimplemented.md` | enhancement,forges,agent-types | DCP-001, DCP-002, DCP-003 | Spec Forge, Blueprint Forge, Code Forge, Consistency Forge, Reporter Forge — described but not implemented |
| DCP-006: Coherence scoring not implemented | issue-candidate | `docs/intake/issue-drafts/DCP-006-coherence-scoring-unimplemented.md` | enhancement,quality,coherence | DCP-002, DCP-004 | "Check that all InterfaceSpec definitions still match actual code" + "coherence score" — not implemented |
| DCP-007: Self-building bootstrap path not planned | issue-candidate | `docs/intake/issue-drafts/DCP-007-self-building-not-planned.md` | enhancement,self-building,bootstrap | DCP-001 through DCP-006 | "Treat DeepCode as just another spec" → bootstrap pass → gated self-modification — no concrete plan |
| DCP-008: CodeRAG not implemented (pattern injection from existing repos) | issue-candidate | `docs/intake/issue-drafts/DCP-008-coderag-unimplemented.md` | enhancement,rag,coderag | DCP-002 | "CodeRAG: pulls patterns from existing repos and injects them only when useful" — not built |
| DCP-009: Impact analysis not wired as pre-change gate | issue-candidate | `docs/intake/issue-drafts/DCP-009-impact-analysis-not-gated.md` | enhancement,change-management,architecture | DCP-002, DCP-004 | "Orchestrator queries atlas: what depends on this?" — not implemented as gate |
| DCP-010: Automation ceiling audit not done for existing specs | issue-candidate | `docs/intake/issue-drafts/DCP-010-automation-ceiling-audit-needed.md` | documentation,automation-potential | — | "Audit existing specs for DeepCode-readiness" — not done; needed to prioritize first experiments |

## Project Board Suggestions

- Area: entif-core / orchestrator / code-atlas
- Cycle: Backlog; concrete first step is executable this week
- Status: Discovery/Architecture (concrete enough to start coding)
- Blocked by: NIM API access; JSON schema definitions (ModuleSpec, InterfaceSpec, Blueprint)
- Parallelization notes: Schema definitions (DCP-001) can proceed independently; orchestrator core (DCP-002) depends on schemas; model broker (DCP-003) depends on NIM access; forges (DCP-005) depend on all prior

## Open Questions

- Should Code Atlas use SQLite (simpler) or Neo4j/ECGG (graph traversal for impact analysis)?
- What is the coherence score formula? (InterfaceSpec match % + test coverage %?)
- Should forges be separate processes or just prompt profiles in the same orchestrator?
- How to seed CodeRAG: scan existing repos for patterns, or manually curate?
- What is the right NIM model for each forge? (general LLM for spec/blueprint; code-specialized for code generation?)
- How does this orchestrator interact with (or replace) Rosetta's build protocol?
- When is coherence high enough to attempt self-building bootstrap pass?
