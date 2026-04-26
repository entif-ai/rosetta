# Recursive Language Models

**User:** Crates McD (mcdade@gmail.com)  
**Created:** 2026/3/2 5:34:21  
**Updated:** 2026/3/2 5:40:00  
**Exported:** 2026/3/2 5:51:10  
**Link:** [https://chatgpt.com/g/g-p-68113a0ebebc819183ea60319883eb09-entif-ai-engine/c/69a567a9-47f0-8333-9ae6-bc24b9c17647](https://chatgpt.com/g/g-p-68113a0ebebc819183ea60319883eb09-entif-ai-engine/c/69a567a9-47f0-8333-9ae6-bc24b9c17647)  

## Prompt:
Recursive Language Models - 2512.24601v2.pdf

PDF

Chat GPT - Recursive Language Models.md

File

Chat GPT - Recursive Language Models Insights.md

File

Quite frequently, any sufficiently-sophisticated agentic instance (e.g. OpenClaw or a variant of that) will be running operations requiring increasingly-larger prompts and context over time, especially in tasks performed as part of a parent initiative increasing in complexity over time (such as building and maintaining a large software project).

Effectively managing context without rot, loss or ineffective attention is a major concern we must address. This new paper and code example repo on the subject of Recursive Language Models may offer valuable insights and solutions we can apply to Entif's approach and architecture.

https://github.com/avbiswas/fast-rlm

## Response:
Thought for 3m 30s

You’ve basically put your finger on the “agent dies by prompt bloat” artery.

The **Recursive Language Models (RLM)** move is to stop treating “context” as something you _feed_ into the transformer, and instead treat it as an **external object the model can program against**. The paper frames this explicitly: long prompts are “part of an external environment,” and the model can **examine, decompose, and recursively call itself over snippets** of that prompt.

Recursive Language Models - 251…

Recursive Language Models - 251…

1) What RLMs actually change (why this matters for Entif)
---------------------------------------------------------

### A. Prompt-as-environment (anti-rot by construction)

RLM initializes a **persistent REPL** where the full prompt `P` lives as a variable. The base LM only sees the “control transcript” (metadata + code + bounded stdout), and selectively inspects `P` via code.

Recursive Language Models - 251…

This is exactly the antidote to “context rot” the paper calls out: quality degrading steeply as prompts get longer.

Recursive Language Models - 251…

### B. Recursion becomes _symbolic_ (not “tool calls sprinkled into chat”)

Inside the REPL, the root model writes code that can invoke sub-LLM calls programmatically and iterate, rather than narrating everything autoregressively.

Recursive Language Models - 251…

That’s what gives it teeth on dense tasks: they report cases where **recursive sub-calling is necessary**, e.g. line-by-line transformations through recursive calls, and gains of **10%–59% vs a no-subcall ablation** on information-dense benchmarks.

Recursive Language Models - 251…

### C. Empirically: “10M+ tokens” with competitive median cost, ugly tail

They explicitly claim RLMs can scale to the **10M+ token regime**, outperforming base models and common scaffolds by up to **2×** while keeping **comparable or cheaper average costs**.

Recursive Language Models - 251…

But they also show the cost distribution has a fat tail: median can be better, but outliers can be far more expensive due to long trajectories.

Recursive Language Models - 251…

### D. The paper’s own “engineering notes” map cleanly to Entif’s doctrine

They caution that `llm_query` is expensive and you should **batch** aggressively rather than making lots of tiny subcalls.

Recursive Language Models - 251…

They also note their implementation used **blocking/sequential** calls and was slow, and call out async subcalls + sandboxed REPLs as a path to reduce runtime and cost.

Recursive Language Models - 251…

Recursive Language Models - 251…

2) fast-rlm vs the “official” rlm repo (and what we should steal from each)
---------------------------------------------------------------------------

### fast-rlm (your link): a clean reference “skateboard”

fast-rlm’s docs are explicit about the key mechanic you care about for context hygiene: **sub-agent responses are not automatically loaded into the parent context**; they come back as **symbols/variables inside the parent REPL**. It also exposes depth/calls/spend budgets and logs steps as JSONL. [Av Biswas](https://avbiswas.github.io/fast-rlm/?utm_source=chatgpt.com)

That “return as symbols, not paste-back text” is a core anti-rot primitive.

### official `alexzhang13/rlm`: a maintained engine with real sandbox options

The official repo describes itself as a plug-and-play inference library supporting multiple sandbox environments (local, Docker, Modal, Prime) and trajectory logging/visualization. [GitHub](https://github.com/alexzhang13/rlm?utm_source=chatgpt.com)  
Its API surfaces exactly the knobs you’ll want Entif to hard-govern: `max_iterations`, `max_depth`, alternate backends, and logging. [Alex L. Zhang](https://alexzhang13.github.io/rlm/api/?utm_source=chatgpt.com)

My pragmatic take: **prototype with fast-rlm’s simplicity**, but plan to **swap in/borrow from the official repo’s sandbox + instrumentation patterns** as soon as you want this anywhere near “always-on Entif.” (Because “LM writes code” is power _and_ blast radius.)

3) The Entif-native graft: “RLM is a tool, not a prompt trick”
--------------------------------------------------------------

Entif already has the exact spine RLMs need to be _usable_ (not just clever):

*   Entif’s lifecycle is already **session → task → step → artifact → check → outcome → receipt**, with “Receipts or It Didn’t Happen,” cheap-first routing, and parse-only ambient capture.
    Entif 2.0 - Comprehensive Actio…
*   Entif’s layering already separates Orchestrator (Ada), reasoning modules (TRM/ROMA/ReasoningBank), evaluation (ELIXIR), and safety (Tripwire).
    Entif 2.0 - Comprehensive Actio…
    Entif 2.0 - Comprehensive Actio…
    lean integration is:

### A. Add a first-class **ContextRuntime / RLMRuntime** (MCP tool)

Treat RLM as a callable capability that Ada can invoke,

Entif 2.0 - Comprehensive Actio…

.

**Proposed MCP tool surface (minimal but sufficient):**

*   `context.mount(source_refs | query) -> context_handle`
*   `rlm.run(context_handle, query, budgets, policy_mode) -> {final_handle, trace_handles[]}`
*   `context.inspect(context_handle, op=grep|slice|chunk|stats, args) -> observation_handle`

This matches the paper’s core abstraction: prompt `P` becomes a variable in environment `E`, and the LM writes programs to inspect/decompose and recursively subcall.

Recursive Language Models - 251…

### B. Replace “REPL variables” with **Cognitive Tile handles**

The RLM paper uses variables as symbolic buffers; Entif should use \*\*content-addressed tiles

Recursive Language Models - 251…

uditable and replayable.

Your tile framework already specifies content-addressed, immutable Merkle-DAG objects with provenance/proofs.

Cognitive Tiles and Swarm Gnosis

So instead of returning a raw string from a sub-agent, return something like:

*   `tile_cid` for an Observation / Derived artifact
*   `run_id` / `receipt_id`
    Cognitive Tiles and Swarm Gnosis
    s an RLM trajectory into a reproducible “proof-carrying” computation graph rather than “trust me bro, the agent read it.”

### C. GuardLayer governance: REPL is **analysis plane**, actuation is gated

Your security architecture already nails the separation-of-duties pattern: **MCP (plumbing)** stores immutable context references, **Majordomo** proposes work, **Guard** allows/modifies/denies via signed decisions, **Executors** only run work with Guard tokens.

20251026 - Entif 2.0 - Secure A…

So: the RLM REPL should be treated as **untrusted code execution** that must live behind Guard policy:

*   default **no network**
*   filesystem allowlist (ideal
    20251026 - Entif 2.0 - Secure A…
    hension tasks)
*   resource quotas (time, memory, max REPL iterations, max subcalls)
*   “command mode” required for anything side-effectful (consistent with Entif’s “parse-only ambient capture; no side effects unless explicitly commanded”).
    Entif 2.0 - Comprehensive Actio…

### D. Performance: make subcalls asynchronous when it matters

The paper is blunt: naive RLMs are slow when subcalls are blocking/sequential.

Recursive Language Models - 251…

Entif 2.0 - Comprehensive Actio…

plicitly suggest async subcalls + sandboxed REPLs as future improvements.

Recursive Language Models - 251…

Entif can do better than the paper by de

Recursive Language Models - 251…

ttern:

*   REPL requests subcalls by enqueuing jobs (with budgets + policy tokens)
*   worke
    Recursive Language Models - 251…
    e results as tiles
*   root REPL polls/awaits completion and keeps going

That gives you “procedural attention” without turning runtime into a single-threaded hostage situation.

4) Failure modes we should design around (paper receipts are candid)
--------------------------------------------------------------------

1.  **Subcall explosion + long-tail cost variance**  
    RLM cost is comparable on average but high-variance due to trajectory length.
    Recursive Language Models - 251…
    Mitigation: Guard-enforced budgets + a cost estimator + hard stop rules (return best-effort partial answer tile when halting).
2.  \*\*Models with weak codin
    Recursive Language Models - 251…
    xplicitly note smaller models without sufficient coding skill struggle in the REPL-centric setup.
    Recursive Language Models - 251…
    Mitigation: choose “root” models for REPL competence; use cheaper models for subcalls (the paper used stronger root + cheaper recursive model to balance c
    Recursive Language Models - 251…
    Recursive Language Models - 251…
3.  **Termination protocol brittleness**  
    They had to add explicit FINAL/FINAL\_VAR patterns and even programmatically fix a chunk of training samples because mo
    Recursive Language Models - 251…
    Recursive Language Models - 251…
    Mitigation: in Entif, make “finalization” a typed tool event (`FinalizeAnswer(tile_cid)`), not a prompt convention.
4.  **Batching discipline**  
    Their own p
    Recursive Language Models - 251…
    `llm_query` 1000 times; batch as much as possible.
    Recursive Language Models - 251…
    Mitigation: enforce minimum chunk sizes and “call coalescing” in the runtime, not just in prompt text.

5) A thin vertical slice that proves the whole t

Recursive Language Models - 251…

one “skateboard” that demonstrates: _context can scale by procedure, not prompt size_.
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Slice: “Repo Comprehension Map” (RLM-powered)**

*   Mount: monorepo docs + issues + past receipts (the stuff that normally causes context explosion)
*   Produce:
    *   `modules.json` (key modules + responsibilities)
    *   `deps.json` (dependency edges)
    *   `truth-locations.json` (where schemas/contracts live)
    *   every claim backed by observation tiles (file paths + spans)

**Acceptance checks**

*   Given a question (“Where is X defined?”), the map links to the correct file/span.
*   Cost receipt shows budgets held.
*   Re-run with an updated repo yields a delta tile chain (what changed and why).

This plugs directly into Entif’s “one truth, many views” receipts-first lifecycle.

Entif 2.0 - Comprehensive Actio…

Plain-language translation (so we can explain it to Future Us at 3am)
---------------------------------------------------------------------

Instead of shoving your entire ever-growing project into a single prompt and hopi

Entif 2.0 - Comprehensive Actio…

give the model a **workbench**:

*   the entire context sits “off to the side” as a big object
*   the model writes little programs to search, slice, and summarize only the parts it needs
*   helper copies of the model read those slices
*   helpers return named notes (handles), not giant paste-backs
*   the final answer is assembled from handles, and every step gets a receipt

That’s RLM. Entif’s contribution is making it **governed, auditable, cacheable, and composable** via receipts + Guard + tiles, instead of a clever demo that quietly becomes a liability.

If you want, next step is: define the _exact_ MCP contract for `RLMRuntime` (requests/responses + receipt schema + Guard decision points) so it drops into Ada/ROMA cleanly without “special-case glue.”



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)