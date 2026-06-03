# Docs Intelligence Extraction — Context Management Techniques

## Source

- **Path:** `docs/chats/20260301 - Chat GPT - Context Management Techniques.md`
- **Title:** Context Management Techniques
- **Date evidence:** 2026/2/28 (chat date)
- **Authority tier:** Chat-derived design guidance; white paper reference (2602.20478v1.pdf) as upstream authority
- **Freshness:** Current (references OpenClaw/Entif as live project)
- **Word count:** ~1,500
- **Extractor:** heartbeat subagent
- **Extraction date:** 2026-06-01

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

A chat deriving lessons from a white paper (2602.20478v1.pdf) on context management for large-scale engineering, mapped onto OpenClaw/Entif architecture. The central contribution: **context is not a prompt, it is a 3-tier infrastructure system** — Constitution (hot), Specialist Agents (primed), Subsystem Knowledge Base (cold). The paper reports context infrastructure growing to ~24% of a 108k-line codebase. Key mechanism: **trigger-based routing** that enforces correct context retrieval automatically. All findings are HIGH confidence as they derive from a published white paper with explicit OpenClaw mapping.

---

## Goals And Intent

- Translate white-paper context-management techniques into OpenClaw/Entif implementation artifacts
- Treat context retrieval as executable policy, not advisory prompts
- Prevent planner-coder drift, inter-agent misalignment, and goldfish-brain chaos in agentic systems
- Provide concrete starter artifacts: Constitution template, agent spec skeletons, Tier 3 doc templates

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| T1 | docs/chats/20260301... | "The central move: codify context as a 3-tier system" | `context-management`, `architecture`, `three-tier` | 3-tier context system | technology | Context is codified as a 3-tier system: Tier 1 Project Constitution (hot memory), Tier 2 Specialist Agents (domain priming), Tier 3 Subsystem Knowledge Base (cold memory, retrieved on demand). At 108k-line scale, context infrastructure grew to ~24% of the codebase. | "context infrastructure grew to ~24% of the codebase" | Treat context as first-class infrastructure, not scattered prompts. Allocate architecture budget for it. | HIGH |
| T2 | docs/chats/20260301... | "Tier 1: A Project Constitution" | `context-management`, `constitution`, `hot-memory` | Tier 1 Constitution | requirement | Tier 1 "Project Constitution" is a single concise file present in every session — operating law, not prose documentation. Must answer "what rules must you always follow?" not "explain subsystem X." Contains: code quality standards, naming conventions, build/run commands, architectural summaries (linking to Tier 3), checklists, known failure modes, orchestration protocols. | "conciseness... The constitution answers: 'What rules must you always follow?' Not: 'Explain subsystem X.'" | Create `/context/constitution.md` as a hard dependency of every run. Enforce conciseness as a design constraint. | HIGH |
| T3 | docs/chats/20260301... | "Tier 2: Specialist Agents" | `context-management`, `specialist-agents`, `domain-priming` | Tier 2 Specialist Agents | technology | Tier 2 Specialist Agents are domain-expert context bundles with constraints, not generalist personalities. Each agent spec includes: scope boundaries, tools/permissions, which Tier 3 docs to consult, output formats, common domain mistakes as preemptive guardrails. Agents hit the right level of rigor because they carry the right context. | "agents aren't just 'different personalities'. They're context bundles with constraints" | Design every agent as a constrained context bundle, not a persona. Write agent specs like code: versioned, reviewed, pruned. | HIGH |
| T4 | docs/chats/20260301... | "Tier 3: Subsystem Knowledge Base" | `context-management`, `cold-memory`, `retrieval` | Tier 3 Knowledge Base | technology | Tier 3 is dozens of narrowly-scoped, AI-readable subsystem documents — not prose essays. Each doc has explicit file paths, parameter names, expected behaviors/invariants, failure modes with symptoms→causes→fixes. Written for AI consumption. Living docs updated as system changes. | "AI-readable specs (not prose essays)... living docs updated as the system changes" | Write Tier 3 docs in the paper's style: explicit patterns, file paths, invariants, failure modes. Target subsystems that repeatedly break or are safety-critical. | HIGH |
| T5 | docs/chats/20260301... | "Retrieval is not optional: you need a context API" | `context-management`, `retrieval`, `mcp`, `executable` | Retrieval as infrastructure | requirement | Retrieval must be executable — a tool call, not a vibe. The paper implements a keyword-based MCP server with tools: list_subsystems, map_subsystem_files, find_relevant_context, search_docs, suggest_agent. "Make 'get the right context' executable." | "If retrieval is a vibe, it won't happen. If retrieval is a tool call, it becomes policy." | Build a Context Router / retrieval service as a first-class MCP tool. Make incorrect retrieval harder than correct retrieval. | HIGH |
| T6 | docs/chats/20260301... | "The highest leverage mechanism: trigger-based routing" | `context-management`, `trigger-routing`, `orchestration` | Trigger-based routing | technology | The Constitution includes a trigger table routing tasks to agents based on observable signals (file paths/modules touched). Enforced redundantly: "Before you change networking files, you must consult the networking agent." "After you change ECS/network files, you must run the code reviewer agent." "If exploring unfamiliar code, call suggest_agent(task)." | "This is bigger than convenience. It's how you prevent planner-coder drift, inter-agent misalignment." | Implement trigger table v0 as file-glob → agent routing. Bake routing enforcement into orchestrator layer. | HIGH |
| T7 | docs/chats/20260301... | "How to integrate into Entif/OpenClaw" | `context-management`, `openclaw-integration`, `context-router` | OpenClaw integration | decision | Maps directly to OpenClaw/Entif: Mailroom/GuardLayer ethos for deterministic auditable routing; Context Router making it harder to do wrong thing than right thing; routing at orchestrator layer; mandatory retrieval on uncertainty detection; automatic post-change review on sensitive paths. | "For OpenClaw, this maps cleanly to: your Mailroom/GuardLayer ethos" | Align context routing architecture with existing GuardLayer patterns. Context Router is the enforcement surface. | HIGH |
| T8 | docs/chats/20260301... | "Ship the Constitution first" | `context-management`, `constitution`, `openclaw` | Constitution v0 | decision | Minimum viable Constitution sections: Non-negotiables (style, naming, error handling, logging, test expectations); Repo commands (build, lint, test, run, migration, formatting); Architecture skeleton (1-page map with links); Invariants & threat model; Orchestration rules (when to route, retrieve, review); Trigger table v0 (file globs → agent). | "If it doesn't fit comfortably in every session, it's not Tier 1." | Create `/context/constitution.md` as hard dependency. Enforce size constraint. | HIGH |
| T9 | docs/chats/20260301... | "Add 6–10 high-correction agents next" | `context-management`, `specialist-agents`, `guard-layer` | High-correction agents | implementation | 6–10 "high-correction" agents starting where mistakes are expensive: (1) Security/GuardLayer agent — read-only unless authorized; (2) Orchestration + message schema agent (Envelope, nonce/TTL, DLQ rules); (3) Storage/memory agent (cache semantics, provenance, redaction); (4) Repo hygiene agent (tests, CI, lint, formatting); (5) API contract agent (versioning, compatibility, breaking-change protocol); (6) Code review agent (post-change regression). Additional candidates: networking, testing patterns. | "Start where mistakes are expensive or subtle" | Prioritize Security/GuardLayer agent and Orchestration agent as first two. Treat agent specs like code: versioned, reviewed, pruned. | HIGH |
| T10 | docs/chats/20260301... | "Build Tier 3 docs only for subsystems that hurt" | `context-management`, `tier-3`, `prioritization` | Tier 3 prioritization | decision | Tier 3 docs target subsystems that: repeatedly break; require invariant preservation; have subtle coupling; are safety-critical. Early Tier 3 hits identified: Envelope schema + replay protection + DLQ/quarantine rules; AuthN/AuthZ model, key rotation, signing, trust boundaries; Cache semantics (TTL, invalidation, provenance); Tool-call safety policy; "state machine of the system" (mailroom pipeline, guard checks, routing). | "Don't document everything. Document the parts that hurt." | Use the four-criteria filter for Tier 3 doc creation. Start with Envelope schema and AuthN/AuthZ model. | HIGH |
| T11 | docs/chats/20260301... | "Make retrieval and routing policy, not advice" | `context-management`, `enforcement`, `orchestration` | Enforcement mindset | requirement | Routing at orchestrator layer; retrieval mandatory when uncertainty detected (new module, high-risk area, missing invariants); post-change review automatic on sensitive paths. If enforcement isn't baked in, it won't stick. | "If you want this to actually stick, bake it into the same enforcement mindset as your GuardLayer." | Treat context routing failures as security-equivalent events. Log and escalate context misses. | HIGH |
| T12 | docs/chats/20260301... | "The meta-lesson: context must be maintained like production code" | `context-management`, `governance`, `lifecycle` | Context governance | requirement | Context infrastructure works because it is: versioned, intentionally scoped, routinely updated, used automatically through triggers and tooling. Not one-time setup. | "governance: this infrastructure works because it is versioned, intentionally scoped, routinely updated, used automatically" | Add context-maintenance to definition-of-done. Version context artifacts in Git. Prune stale context. | HIGH |

---

## Components And Technologies

- **Project Constitution (Tier 1):** Single-file hot-memory operating law. Sections: Non-negotiables, Repo commands, Architecture skeleton, Invariants & threat model, Orchestration rules, Trigger table. Hard dependency of every session. Size-constrained.
- **Specialist Agents (Tier 2):** Domain-expert constrained context bundles. Spec includes: scope boundaries, tools/permissions, Tier 3 doc references, output formats, domain mistake guardrails. Not generalist personas.
- **Subsystem Knowledge Base (Tier 3):** AI-readable, narrowly-scoped subsystem documents. Explicit file paths, parameter names, invariants, failure modes (symptoms→causes→fixes). Living docs.
- **Context Router / Retrieval Service:** MCP-server-based. Tools: list_subsystems, map_subsystem_files, find_relevant_context, search_docs, suggest_agent. Executable, not advisory.
- **Trigger Table:** File-glob → agent routing table. Redundantly enforced at orchestrator layer.
- **White paper source:** arXiv 2602.20478v1.pdf — context management at 108k-line engineering scale, ~24% context infrastructure ratio.

---

## Conceptual Claims

- Context infrastructure at scale is a first-class production asset, not a prompt engineering afterthought — it grows to ~24% of codebase.
- The Constitution pattern (hot, always-loaded operating law) prevents drift and enforces invariants across sessions.
- Specialist agents as constrained context bundles (not personas) is the correct abstraction for domain expertise in agentic systems.
- Trigger-based routing based on observable signals (file paths) is the mechanism that prevents planner-coder drift at scale.
- Retrieval must be executable policy (tool call), not advisory "you might want to look at this" (vibe).
- Context governance is the meta-requirement: versioned, scoped, updated, automatically enforced — or it degrades.
- The Mailroom/GuardLayer architecture in OpenClaw is the natural enforcement surface for context routing policy.

---

## Dependencies And Sequencing

- **Depends on:** Rosetta Bootstrap (TC-001–TC-004 merged, TC-005 critical path), NOT LAME PRD (memory sovereignty map, 5-layer model), Context Compiler design from NOT LAME.
- **Blocks/Precedes:** TC-006 (Tapestry) and TC-007 (Rights-Scoped Retrieval) — context management infrastructure is prerequisite for promotion state machine; context routing may affect promotion gate design.
- **Sequencing:** Constitution first (hard dependency of every run); then 6–10 high-correction specialist agents; then Tier 3 docs for highest-risk subsystems; then Context Router enforcement.

---

## Contradictions Or Supersession

- No contradictions detected. Document aligns with and elaborates existing NOT LAME PRD context-compiler and query-router concepts. Does not supersede any prior extraction; rather, provides implementation pattern for the context-compiler bounded bundle design.

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
|---|---|---|---|---|---|
| CMT-001: Adopt 3-tier context architecture as explicit Rosetta design principle | architecture | `docs/intake/issue-drafts/CMT-001-3-tier-context-architecture.md` | `context-management`, `architecture`, `docs-intelligence` | — | Finding T1: context as 3-tier system; 24% codebase ratio at scale |
| CMT-002: Build Project Constitution as hard dependency of every agentic run | implementation | `docs/intake/issue-drafts/CMT-002-project-constitution.md` | `context-management`, `openclaw`, `bootstrap` | CMT-001 | Finding T2, T8: Constitution as operating law; minimum viable sections defined |
| CMT-003: Implement Context Router as first-class MCP retrieval service | implementation | `docs/intake/issue-drafts/CMT-003-context-router-mcp.md` | `context-management`, `mcp`, `retrieval`, `implementation` | CMT-001 | Finding T5: retrieval as executable tool; MCP server with 5 named tools |
| CMT-004: Implement trigger-based routing table for agent dispatch | implementation | `docs/intake/issue-drafts/CMT-004-trigger-routing-table.md` | `context-management`, `orchestration`, `trigger-routing` | CMT-003 | Finding T6: trigger table from file-glob → agent; enforced at orchestrator |
| CMT-005: Design and ship 6–10 high-correction specialist agents | implementation | `docs/intake/issue-drafts/CMT-005-specialist-agents.md` | `context-management`, `specialist-agents`, `guard-layer` | CMT-002 | Finding T3, T9: specialist agents as context bundles; 6 candidates listed |
| CMT-006: Enforce context retrieval as mandatory policy, not advisory | requirement | `docs/intake/issue-drafts/CMT-006-retrieval-as-policy.md` | `context-management`, `enforcement`, `orchestration` | CMT-003 | Finding T11: retrieval as policy, baked into GuardLayer mindset |
| CMT-007: Treat context maintenance as production code — versioned, pruned, governed | governance | `docs/intake/issue-drafts/CMT-007-context-governance.md` | `context-management`, `governance`, `lifecycle` | CMT-002 | Finding T12: context governance; versioned, scoped, updated, automatically enforced |

---

## Project Board Suggestions

- **Area:** Context Management / Docs Intelligence / OpenClaw bootstrap
- **Cycle:** Batch 6 (exploratory / implementation-pattern docs)
- **Status:** Ready for triage
- **Blocked by:** TC-005 (Promotion state machine) — context management may need to gate promotion decisions; NOT LAME Context Compiler design
- **Parallelization notes:** CMT-001 through CMT-003 are sequential (architecture → Constitution → Context Router). CMT-005 (specialist agents) can run in parallel with CMT-003 once Constitution exists. CMT-006 and CMT-007 are cross-cutting and can proceed once CMT-003 is stable.

---

## Open Questions

- How does the 3-tier context system interact with the 5 memory planes in NOT LAME? Are Tier 1/2/3 mapped to specific memory planes, or are they orthogonal dimensions?
- What is the sizing constraint for the Constitution? The paper says "if it doesn't fit comfortably in every session, it's not Tier 1" — but what is the practical token/computation budget for hot-context?
- How does the Context Router handle cross-subsystem tasks that touch multiple Tier 3 domains? Is there a composition strategy?
- What is the failure mode when retrieval returns no relevant context for a task? Does the system halt, warn, or fall back to Constitution-only?
- How does trigger-based routing interact with emergent/subagent tasks that don't have a predetermined file-path signal?
- The paper references a specific white paper (2602.20478v1.pdf) — should this be ingested as a source document for the external reference corpus?
