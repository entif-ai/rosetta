# Context Management Techniques

**User:** Crates McD (mcdade@gmail.com)  
**Created:** 2026/2/28 19:16:14  
**Updated:** 2026/2/28 19:37:06  
**Exported:** 2026/3/1 23:58:06  
**Link:** [https://chatgpt.com/g/g-p-69a0bc48664481918ad06fa52cbdfda4/c/69a38548-43c0-8332-b0c8-04e4d51fb3b0](https://chatgpt.com/g/g-p-69a0bc48664481918ad06fa52cbdfda4/c/69a38548-43c0-8332-b0c8-04e4d51fb3b0)  

## Prompt:
2602.20478v1.pdf

PDF

The lessons and techniques in this white paper on context management while engineering larger scale projects feels quintessentially crucial for us to integrate in order to succeed.

## Response:
Thought for 54s

Yes. This paper is basically a field report on “how to stop agentic development from turning into goldfish-brain chaos” by **turning context into first-class infrastructure** instead of scattered prompts.

Here are the core lessons and the techniques I’d treat as non-optional for OpenClaw/Entif.

The central move: codify context as a 3-tier system
---------------------------------------------------

The author built a 108k-line system and reports that their **context infrastructure grew to ~24% of the codebase** (constitution + agent specs + subsystem docs). That ratio is the tell: at scale, “context” stops being a prompt and becomes a maintained asset.

### Tier 1: A “Project Constitution” (hot memory, always loaded)

A single, deliberately concise file that is present in every session. It’s not “docs”. It’s the **operating law**:

*   code quality standards, naming conventions, build/run commands
*   architectural summaries (with links out to Tier 3 for detail)
*   checklists for common operations
*   known failure modes (“things we keep screwing up”)
*   orchestration protocols: how work gets routed, when to retrieve, when to review

Key constraint: **conciseness**. The constitution answers:

*   “What rules must you always follow?”  
    Not:
*   “Explain subsystem X”

That distinction is architectural. It prevents the constitution from bloating into an unreadable novella.

### Tier 2: Specialist Agents (domain priming, invoked per task)

Instead of one generalist that vaguely “tries its best”, you maintain **domain-expert agent specs** (networking, security, orchestration, schema, build/release, etc.).

Each agent spec includes:

*   scope boundaries (what it handles, what it refuses)
*   tools/permissions (including read-only agents where safety matters)
*   which Tier 3 docs it must consult
*   output formats (diff-first, checklist-first, RFC-style, etc.)
*   common domain mistakes (preemptive guardrails)

Important pattern: agents aren’t just “different personalities”. They’re **context bundles with constraints**, designed to consistently hit the right level of rigor.

### Tier 3: A subsystem knowledge base (cold memory, retrieved on demand)

Dozens of narrowly-scoped documents, each **one subsystem**. Written for AI consumption:

*   explicit file paths
*   parameter names
*   expected behaviors and invariants
*   “correctness pillars”
*   failure modes with symptoms → causes → fixes

The author’s key design decisions here are _exactly_ what you want for Entif:

*   AI-readable specs (not prose essays)
*   living docs updated as the system changes
*   strict scoping so retrieval can be targeted

Retrieval is not optional: you need a context API, not just files
-----------------------------------------------------------------

The paper implements a simple retrieval service (keyword-based MCP server) with tools like:

*   list subsystems
*   map subsystem → files
*   find relevant context for a task
*   search docs
*   suggest the right agent

The real lesson: **make “get the right context” executable**. If retrieval is a vibe, it won’t happen. If retrieval is a tool call, it becomes policy.

For OpenClaw, this maps cleanly to:

*   your Mailroom/GuardLayer ethos: deterministic, auditable, routable
*   a “Context Router” that makes it harder to do the wrong thing than the right thing

The highest leverage mechanism: trigger-based routing
-----------------------------------------------------

The constitution includes a **trigger table** that routes tasks to agents based on observable signals (usually file paths / modules touched), and it enforces that routing redundantly:

*   “Before you change networking files, you must consult the networking agent.”
*   “After you change ECS/network files, you must run the code reviewer agent.”
*   “If you’re exploring unfamiliar code, call suggest\_agent(task).”

This is bigger than convenience. It’s how you prevent:

*   planner-coder drift
*   inter-agent misalignment
*   the developer having to remember which expertise applies

How to integrate this into Entif/OpenClaw without boiling the ocean
-------------------------------------------------------------------

### 1) Ship the Constitution first (and keep it mean)

Create `/context/constitution.md` as a hard dependency of every run.

Minimum viable sections (tight, ruthless):

*   **Non-negotiables**: style, naming, error handling, logging, test expectations
*   **Repo commands**: build, lint, test, run, migration, formatting
*   **Architecture skeleton**: a 1-page “map” with links
*   **Invariants & threat model**: the rules that must not be broken
*   **Orchestration rules**: when to route, when to retrieve, when to review
*   **Trigger table v0**: file globs → agent

If it doesn’t fit comfortably in every session, it’s not Tier 1.

### 2) Add 6–10 “high-correction” agents next

Start where mistakes are expensive or subtle:

*   Security/GuardLayer agent (read-only unless explicitly authorized)
*   Orchestration + message schema agent (your Envelope, nonce/TTL, DLQ rules)
*   Storage/memory agent (cache semantics, provenance, redaction boundaries)
*   Repo hygiene agent (tests, CI, lint, formatting)
*   API contract agent (versioning, compatibility, breaking-change protocol)
*   Code review agent (post-change regression hunting)

Agent specs should be treated like code: versioned, reviewed, pruned.

### 3) Build Tier 3 docs only for the subsystems that hurt

Don’t document everything. Document the parts that:

*   repeatedly break
*   require invariant preservation
*   have subtle coupling
*   are safety-critical

Your early Tier 3 hits (based on your current architecture direction) are obvious:

*   Envelope schema + replay protection + DLQ/quarantine rules
*   AuthN/AuthZ model, key rotation, signing, trust boundaries
*   Cache semantics (what can be cached, TTL, invalidation, provenance)
*   Tool-call safety policy (what agents can do, with which permissions)
*   Any “state machine of the system” (mailroom pipeline, guard checks, routing)

Write them in the paper’s style: explicit patterns, file paths, invariants, failure modes.

### 4) Make retrieval and routing “policy”, not “advice”

This is the part most teams skip, then wonder why everything degenerates.

In OpenClaw terms:

*   routing happens at the orchestrator layer
*   retrieval is a mandatory step when uncertainty is detected (new module, high-risk file area, missing invariants)
*   post-change review is automatic on sensitive paths

If you want this to actually stick, bake it into the same enforcement mindset as your GuardLayer.

The meta-lesson: context must be maintained like production code
----------------------------------------------------------------

The paper’s most valuable implicit claim is governance: this infrastructure works because it is:

*   versioned
*   intentionally scoped
*   routinely updated
*   used automatically through triggers and tooling

If you do this, OpenClaw won’t just be “an agent that writes code”.  
It becomes a system with **institutional memory**, where “how we do things here” is executable.

If you want, I can translate this into concrete starter artifacts for your repo:

*   a constitution template tailored to IronClaw/Mailroom/GuardLayer
*   8 initial agent spec skeletons
*   6 Tier 3 doc templates (Envelope/Auth/Cache/Orchestration/Tool safety/Threat model)



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)