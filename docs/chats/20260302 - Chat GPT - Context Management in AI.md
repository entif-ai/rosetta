# Context Management in AI

**User:** Crates McD (mcdade@gmail.com)  
**Created:** 2026/2/28 19:50:12  
**Updated:** 2026/2/28 19:52:32  
**Exported:** 2026/3/2 0:07:34  
**Link:** [https://chatgpt.com/g/g-p-68113a0ebebc819183ea60319883eb09-entif-ai-engine/c/69a38d1a-45cc-8326-8f73-491f773033f5](https://chatgpt.com/g/g-p-68113a0ebebc819183ea60319883eb09-entif-ai-engine/c/69a38d1a-45cc-8326-8f73-491f773033f5)  

## Prompt:
2602.20478v1.pdf

PDF

The lessons and techniques in this white paper on context management while engineering larger scale projects are a gold mine: quintessentially crucial for us to integrate in order to succeed.

## Response:
Thought for 1m 47s

Yep. This paper is basically a field manual for “how to keep AI agents sane inside a real codebase” (as opposed to a toy repo where vibes are enough).

At a high level, the author’s core move is to **turn “context” into infrastructure**: not a blob of chat history, but a layered system with explicit contracts that agents can fetch, trust, and propagate across sessions.

The core model to steal wholesale: codified context in 3 tiers
--------------------------------------------------------------

### Tier 1: Hot-memory “Project Constitution”

A small, always-loaded document that encodes:

*   **Objectives + non-goals**
*   **Tech stack and invariants**
*   **House conventions** (naming, layering, error handling, logging, tests)
*   **Retrieval hooks** (how to find the right spec or specialist)
*   **Orchestration protocols** (how agents should plan, ask, route work)

Why it matters: it prevents an entire class of recurring “agent amnesia” mistakes from day one, and it becomes the anchor that keeps style and architecture consistent across sessions.

### Tier 2: Specialized agents (domain experts)

Instead of “one agent does everything,” you maintain a stable cast:

*   UI / API / persistence / infra / test / build / security / performance / etc.
*   Each has **embedded domain assumptions** and “what good looks like” for that slice.

Why it matters: when you hit a thorny domain corner, a specialist can be the difference between progress and a looping hallucination spiral.

### Tier 3: Cold-memory knowledge base (spec docs)

On-demand docs written **for agents**, not humans:

*   Explicit file paths, function names, module boundaries
*   “Do this / don’t do this”
*   Decision records and invariants
*   Trigger phrases for routing (“If touching X, consult spec Y”)

Why it matters: you stop re-explaining the same thing, and you can scale coordination across time and across multiple agent sessions.

The six practitioner guidelines (Figure 4) translated into “do this Monday morning”
-----------------------------------------------------------------------------------

These are the most operationally valuable bits, because they’re simple and compounding:

1.  **A basic constitution does heavy lifting**  
    Even minimal: objectives, stack, core conventions. You get quality lift immediately.
2.  **Let the planner gather context**  
    Run a planning pass that identifies which specs and specialists are needed _before_ implementation.
3.  **Route automatically or forget constantly**  
    Human memory doesn’t scale. Encode routing rules (trigger tables / search conventions) so the system knows what expertise and docs to pull for each area.
4.  **If you explained it twice, write it down**  
    Repeated domain explanations are a signal to codify them as a spec.
5.  **When in doubt, create an agent and restart**  
    If you’re stalled, build a specialist with embedded domain knowledge and rerun the workflow.
6.  **Stale specs mislead efforts**  
    Agents trust docs absolutely. Out-of-date specs create “syntactically correct, semantically wrong” output and silent failures.

How to integrate this into _your_ engineering flow (concrete, not inspirational)
--------------------------------------------------------------------------------

### 1) Create a “Context Infrastructure” directory in the repo

Suggested structure (works for mono or polyrepo):

*   `/context/constitution.md`
*   `/context/routing.yaml` (or `.json`)
*   `/context/agents/` (profiles, prompts, tool policies)
*   `/context/specs/` (cold-memory docs, one per subsystem)
*   `/context/adr/` (architecture decision records)
*   `/context/index.md` (map of all specs and when to use them)

### 2) Make the constitution tiny but mandatory

Keep it short enough that it’s always included.  
Sections that pay rent:

*   Goals / non-goals
*   Stack / constraints
*   Conventions (naming, layering, error, logging)
*   “Definition of done”
*   Retrieval protocol (how to look up specs)
*   Orchestration protocol (plan → fetch → implement → test → document)

### 3) Implement a routing table you can actually maintain

This is the hidden superpower.

Examples of routing rules:

*   “If path matches `src/payments/**` → load `specs/payments.md` and use `PaymentsAgent`”
*   “If touching migrations → require `DBAgent` and `specs/persistence.md`”
*   “If adding endpoints → require `APIAgent` and `specs/api_contracts.md`”
*   “If tests failing → invoke `TestAgent` and consult `specs/testing.md`”

This single file turns “context selection” into a deterministic process instead of a memory game.

### 4) Enforce the “planner-first” protocol

Before any implementation:

*   planner reads constitution
*   planner scans diff/paths and consults routing table
*   planner lists required specs + agents
*   planner outputs an execution plan with checkpoints

This prevents the classic failure mode: coding immediately with partial context, then spending 3x time correcting.

### 5) Add two maintenance mechanisms from day one

These are the difference between a living system and a decaying wiki:

**A. Spec freshness checks**

*   Every spec has: last-updated date, owner, “still true?” checklist
*   Any refactor that changes an invariant must update relevant spec(s)

**B. “Confusion is a signal” rule**  
If an agent asks the same clarification twice across sessions, that’s not “annoying,” it’s a **missing/stale spec detection event**. Write/update the doc.

Plain-language summary
----------------------

You’re building a library, not having a conversation.

*   The **constitution** is your library’s rulebook.
*   The **routing table** is the librarian.
*   The **specs** are the shelves.
*   The **specialists** are the subject-matter librarians who know where the weird books are hidden.

Once you do this, context stops being a fragile, per-chat artifact and becomes **portable, composable, and upgradeable**.

If you want, I can turn this into a ready-to-drop-in starter kit for your repos (constitution template, routing schema, spec template, and an orchestration protocol that matches how you build thin vertical slices).



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)