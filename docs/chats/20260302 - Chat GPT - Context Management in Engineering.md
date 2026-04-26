# Context Management in Engineering

**User:** Crates McD (mcdade@gmail.com)  
**Created:** 2026/2/28 19:37:30  
**Updated:** 2026/3/2 0:06:49  
**Exported:** 2026/3/2 0:06:57  
**Link:** [https://chatgpt.com/g/g-p-69299306a6408191947092cdf41148f0/c/69a38a3f-90f8-8327-b950-77b3cbef162d](https://chatgpt.com/g/g-p-69299306a6408191947092cdf41148f0/c/69a38a3f-90f8-8327-b950-77b3cbef162d)  

## Prompt:
2602.20478v1.pdf

PDF

The lessons and techniques in this white paper on context management while engineering larger scale projects feels quintessentially crucial for us to integrate in order to succeed.

## Response:
Thought for 1m 26s

Yep. This paper is basically a field manual for “how to keep agentic engineering from turning into amnesia-driven improv theater once the codebase gets big”.

Also: I can see this PDF (2602.20478v1) just fine. Separately, I was notified that _some earlier uploads in this chat have expired_; if you want me to reference any of those older files again, you’ll need to re-upload them.

What the white paper is really saying (in one sentence)
-------------------------------------------------------

When projects scale, you stop “prompting” and start building **context infrastructure**: durable, machine-readable artifacts that encode rules, routing, and subsystem truth, so agents behave like long-tenured team members instead of goldfish.

The core model: 3-tier “codified context” infrastructure
--------------------------------------------------------

The author reports building a 108k-line C# distributed system across 283 sessions using three tiers:

### Tier 1: Project Constitution (hot memory, always loaded)

A single concise Markdown file that’s injected into every session. It includes:

*   non-negotiable conventions (naming, quality bars, commands)
*   architectural summaries with pointers to deeper specs
*   checklists for common operations
*   known failure modes
*   orchestration rules that route work to the right specialist

Design constraint: **must be short enough to always fit**.

### Tier 2: Specialized Agents (domain experts, invoked per task)

A stable set of role specs (19 in the paper) that embed:

*   domain scope and responsibilities
*   tools/permissions (some read-only for safety)
*   common pitfalls and “symptom → cause → fix” tables
*   _project-specific_ domain knowledge (often over half the agent content)

Key pattern: agents are created when a domain repeatedly burns time or produces recurring mistakes.

### Tier 3: Codified Context Base (cold memory, retrieved on demand)

A set of subsystem specs (34 docs in the paper), each:

*   written for AI consumption (file paths, function names, explicit do/don’t)
*   scoped to one subsystem for targeted retrieval
*   treated as _living_ documentation updated alongside code changes

These are served via an MCP retrieval service with tools like:

*   find\_relevant\_context(task)
*   suggest\_agent(task)
*   search\_context\_documents(query)

The practitioner guidelines you should staple to the ceiling
------------------------------------------------------------

The paper’s “Figure 4” guidance distills to (paraphrased, but faithful):

1.  **A basic constitution does heavy lifting**  
    Start early, even minimal.
2.  **Let the planner gather context**  
    Run planning before implementation to surface which specs and specialists are needed.
3.  **Route automatically or forget constantly**  
    Human memory doesn’t scale; encode routing in triggers/search conventions.
4.  **If you explained it twice, write it down**  
    Repeated explanations are a signal to codify.
5.  **When in doubt, create an agent and restart**  
    Specialist priming can unblock what generic sessions stall on.
6.  **Stale specs are poison**  
    Agents trust docs absolutely; outdated specs cause silent failures.

How this maps onto Entif 2.0 (very directly)
--------------------------------------------

Entif is _already_ an architecture-first project with lots of conceptual surface area: schemas, agents, trust tiers, memory layers, governance, etc. That’s the exact environment where context drift quietly kills velocity.

So: implement this as first-class repo infrastructure, not “prompt craft”.

### A concrete integration blueprint (thin vertical slice first)

**Week 0 goal:** make the next session measurably better than the last.

**Repo layout (suggested)**

*   `/context/CONSTITUTION.md` (Tier 1)
*   `/context/agents/` (Tier 2)
*   `/context/specs/` (Tier 3)
*   `/context/mcp/` (retrieval server + index)
*   `/context/triggers.yaml` (file-pattern → agent + spec pointers)
*   `/context/drift-detector/` (optional, but high ROI)

### Step 1: Write the minimal Constitution (keep it tight)

Include only what must always be true:

*   mission + non-goals (prevents scope creep)
*   canonical terms (your taxonomy and naming rules)
*   “how we work” (tests, linting, doc update rule)
*   routing protocol (how to consult triggers + when to call planner)
*   a small “known failure modes” list (the ones we’ve already seen)

### Step 2: Add a Planner pass as mandatory

A lightweight planning agent (or planning mode) that must:

*   restate the task
*   list impacted subsystems/files
*   call retrieval for relevant specs
*   select the correct specialist agent(s)
*   produce a short execution plan + verification steps

This is how you stop “oops, we forgot the Rosetta constraint” regressions.

### Step 3: Stand up the first 5–10 Tier 3 specs (load-bearing ones)

Don’t document everything. Document the _rails_:

*   Rosetta Protocol compliance rules (what “compatible” concretely means)
*   schema conventions (IDs, versioning, canonicalization)
*   security/trust model (your “trust tiers” equivalent)
*   memory model (hot vs cold vs retrieval semantics)
*   repo structure + ownership boundaries

Write them for an agent:

*   explicit file paths
*   “do this / don’t do this”
*   invariants + examples
*   failure modes and how to detect them

### Step 4: Create only 3 specialist agents at first

Start with the domains that are expensive when wrong:

*   **Architect** (system boundaries, interfaces, invariants)
*   **Schema/Taxonomy Steward** (Rosetta alignment, naming, canonicalization)
*   **Security/Trust Analyst** (threat model, permissions, “safe changes” review)

Add more only when repeated pain proves the need.

### Step 5: Encode routing triggers so you’re not relying on your own RAM

Add a trigger table that maps:

*   file patterns (or subsystems) → recommended agent + required specs

Example (conceptual):

*   `/rosetta/**` → Taxonomy Steward + “Rosetta v3 compatibility spec”
*   `/auth/**` → Security Analyst + “Auth/cache invariants spec”
*   `/agents/**` → Architect + “Agent orchestration spec”

### Step 6: Prevent spec drift (this is where the real wins live)

Adopt two rules:

1.  **Spec updates happen in the same session as code changes** (the paper reports this costing minutes, not hours).
2.  Add a lightweight **drift detector**: if files in a mapped subsystem change, warn if the corresponding spec wasn’t touched.

This is how you avoid “the docs lied, and the agent believed them”.

Translating this into plain language
------------------------------------

Think of it like training a pit crew:

*   The **Constitution** is the big laminated checklist everybody reads before touching the car.
*   The **Specialist agents** are your mechanics (engine, brakes, telemetry).
*   The **Specs** are the service manuals, each focused on one subsystem, easy to grab when needed.
*   The **Retrieval + triggers** are the radio dispatch so you don’t have to remember who does what while the car is on fire.

If you want, I can do the first concrete artifact pass
------------------------------------------------------

If you tell me which repo structure you’re using for Entif 2.0 right now (even roughly), I can draft:

*   a minimal `/context/CONSTITUTION.md` tailored to Entif (Rosetta-first, trust-tier aware)
*   an initial `/context/triggers.yaml`
*   3 starter agent specs
*   5 starter subsystem specs (the ones that will reduce re-explaining immediately)

No ceremony, just load-bearing scaffolding.



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)