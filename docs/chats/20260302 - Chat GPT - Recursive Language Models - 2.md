# Recursive Language Models Insights

**User:** Crates McD (mcdade@gmail.com)  
**Created:** 2026/3/2 5:20:58  
**Updated:** 2026/3/2 5:28:33  
**Exported:** 2026/3/2 5:33:23  
**Link:** [https://chatgpt.com/g/g-p-69a0bc48664481918ad06fa52cbdfda4/c/69a5647f-1dac-832c-a389-341bbdf9e92e](https://chatgpt.com/g/g-p-69a0bc48664481918ad06fa52cbdfda4/c/69a5647f-1dac-832c-a389-341bbdf9e92e)  

## Prompt:
Recursive Language Models - 2512.24601v2.pdf

PDF

Quite frequently, any sufficiently-sophisticated agentic instance (e.g. OpenClaw or a variant of that) will be running operations requiring increasingly-larger prompts and context over time, especially in tasks performed as part of a parent initiative increasing in complexity over time (such as building and maintaining a large software project).

Effectively managing context without rot, loss or ineffective attention is a major concern we must address. This new paper and code example repo on the subject of Recursive Language Models may offer valuable insights and solutions we can apply to Entif's approach and architecture.

https://github.com/avbiswas/fast-rlm

## Response:
Thought for 5m 41s

You’re pointing at exactly the right pressure point: once an agent is doing real work (software + ops + multi-day initiatives), “just keep stuffing more context into the prompt” collapses under its own weight. The RLM paper’s core move is simple-but-deadly: treat the _prompt itself_ as an external object the model can _program against_, instead of something you shovel into the model’s context window.

Recursive Language Models - 251…

What the RLM paradigm actually changes (and why it fights context rot)
----------------------------------------------------------------------

### 1) Prompt-as-object, not prompt-as-input

RLM initializes a REPL where the full prompt `P` lives as a variable, and the base LM only sees a small “control transcript” (metadata + code + tiny stdout summaries), not the whole prompt.

Recursive Language Models - 251…

This is the anti-rot move: the model’s window isn’t polluted by the giant context, so “attention decay” is replaced by “selective inspection.”

### 2) Symbolic recursion, not “tool calls sprinkled into chat”

The paper contrasts an “almost-the-same” scaffold that still fails because it keeps the prompt in the model’s context, forces direct autoregressive final output, and can’t programmatically loop subcalls.

Recursive Language Models - 251…

RLM requires that code running in the environment can invoke sub-LLMs inside loops, store intermediate results as variables, and only surface compact handles back to the root LM.

Recursive Language Models - 251…

### 3) Outputs can exceed base-model output limits

Because the “answer” can be built as a variable in the REPL and returned, RLM can stitch together unbounded outputs from programmatic steps + subcalls instead of hitting a single-call output ceiling.

Recursive Language Models - 251…

### What they empirically saw (useful for Entif expectations)

*   RLMs scale to very large inputs and can outperform base models and other long-context scaffolds while keeping average costs comparable (but with long-tail variance).
    Recursive Language Models - 251…
*   Median cost can be competitive, but there are expensive outliers due to long trajectories; they also note sequential/blocking subcalls make it slow.
    Recursive Language Models - 251…
    Recursive Language Models - 251…
*   Emergent “attention behaviors” are mostly simple: uniform chunking + keyword/regex filtering; not sophisticated partitioning.
    Recursive Language Models - 251…

fast-rlm (the repo you linked) as a concrete reference implementation
---------------------------------------------------------------------

The fast-rlm project describes RLMs as an inference technique where the model explores arbitrarily long prompts via an external REPL, can recursively invoke subagents, and critically: child outputs are returned as symbols/variables rather than injected back into the parent context. [GitHub](https://github.com/avbiswas/fast-rlm)  
Its docs show the basic “root agent writes Python, calls `llm_query()` to spawn subagents, results flow back as symbols” diagram. [avbiswas.github.io](https://avbiswas.github.io/fast-rlm/)  
It also exposes explicit budget knobs (depth, calls, spend caps, truncation) and warns about prompt placement because the REPL truncates what the LM sees. [GitHub](https://github.com/avbiswas/fast-rlm)

That maps extremely cleanly onto how we already talk about Entif: _receipted cognition_, governance, and keeping the “living truth” in artifacts instead of in a fragile prompt haze.

How to graft the RLM idea onto Entif (Rosetta-native)
-----------------------------------------------------

### A. Replace “variables” with Rosetta-addressable objects

In the paper, the REPL state holds variables; in Entif, those variables should be _tiles_ (or references to tiles):

*   Every intermediate artifact becomes a tile with `derived_from` pointers, and optionally a `run` pointer for trace grouping.
    Rosetta v3.0.0 Core Spine Speci…
    Rosetta v3.0.0 Core Spine Speci…
*   Use `nonce` whenever you need distinct instance
    Rosetta v3.0.0 Core Spine Speci…
    t
    Rosetta v3.0.0 Core Spine Speci…
    ons, etc.).
    Rosetta v3.0.0 Core Spine Speci…
*   For governance / verifiability, your receipt shapes already treat `nonce` as r
    Rosetta v3.0.0 Core Spine Speci…
    s.
    ROCK-31XX - Rosetta Pasigraphy …

So instead of the REPL returning raw strings, it returns handles like:

*   `cid:...`
    ROCK-31XX - Rosetta Pasigraphy …
    (stable identity across versions)
*   `run:...` (trace grouping)

That is RLM’s “symbolic buffers” idea, but hardened into Entif’s provenance substrate.

### B. Make the REPL a **GuardLayer-governed** capability sandbox

RLM’s power comes from “LM writes code.” That is also the attack surface.

Your security notes already emphasize capability boundaries and time-bounded delegations (`expires_at` required).

20260221 - Security, Caching an…

Treat the RLM REPL as just another tool domain governed by GuardLayer policy, and

20260221 - Security, Caching an…

(the paper itself calls out sandboxed REPLs + async subcalls as future cost/runtime improvements).

Recursive Language Models - 251…

Concrete Entif-ish stance:

*   The REPL cannot do arbitrary filesystem/network unles
    Recursive Language Models - 251…
    n only call a curated set of functions (“context inspection primitives” + “subcall primitive” + “tile write primitive”).
*   Every invocation emits a receipt tile (so later TruthLint-style verification can see what the agent _actually_ did).

### C. Store “huge context” in a cache domain with explicit lifecycle + economics

RLM assumes giant prompts can exist “somewhere.” Entif needs that “somewhere” to be governable.

Your `iam.cache_domain@0.1` is exactly the missing piece: a policy object for shared cached context artifacts with TTL and economic caps.

20260221 - Security, Caching an…

So the RLM’s external `context` variable should usually be a \*handle into a cach

20260221 - Security, Caching an…

Ds), not a blob shoved into runtime memory without rules.

### D. Asynchrony + queue fabric: turn subcalls into a worker pattern (optional but very aligned)

The paper’s negative results explicitly call out that blocking subcalls make RLM slow.

Recursive Language Models - 251…

Meanwhile, your bootstrapping plan already leans on queue-based orchestration wit

Recursive Language Models - 251…

Entif - v0 Bootstrapping Plan -…

That suggests an Entif-native RLM “turbo mode”:

*   REPL requests subcalls by enqueu
    Entif - v0 Bootstrapping Plan -…
    ecute subcalls in parallel, write results as tiles, return only tile handles.
*   Root agent polls/awaits completion and continues reasoning.

You keep the RLM abstraction, but you get concurrency, observability, and cost controls that feel like real systems engineering instead of “agent vibes.”

Failure modes we should preempt (paper’s receipts are very candid here)
-----------------------------------------------------------------------

1.  **Subcall explosion**  
    They had to add an explicit warning to keep some models from “subcalling on everything,” leading to thousands of calls.
    Recursive Language Models - 251…
    Entif mitigation: enforce budgets at GuardLayer (hard caps), plus add a cost-estim
    Recursive Language Models - 251…
    can see “this plan costs $X” before launching.
2.  **Model capability mismatch (coding skill matters)**  
    They report that models without sufficient coding ability struggle in the REPL-centric setup.
    Recursive Language Models - 251…
    Entif mitigation: pick “root models” for REPL competence; use cheaper models for
    Recursive Language Models - 251…
    te (they did GPT-5 root with GPT-5-mini subcalls for cost balance).
    Recursive Language Models - 251…
3.  **Brittle termination / “final answer” protocol**  
    They had to add programmatic
    Recursive Language Models - 251…
    ed FINAL/FINAL\_VAR patterns; 16% of turns needed correction for FINAL usage in their training cleanup.
    Recursive Language Models - 251…
    Entif mitigation: make “finalization” a typed tool event (e.g., \`FinalizeAnswer(
    Recursive Language Models - 251…
    tion.
4.  **Long-tail cost variance**  
    Median can be fine, but outliers get expensive; RLM can still be cheaper than summarization agents that ingest everything because it selectively views context.
    Recursive Language Models - 251…
    Entif mitigation: add “stop rules” (max iterations, max spent, max outstanding su
    Recursive Language Models - 251…
    al answer tile” even when it halts.

The Entif design principle this reinforces
------------------------------------------

RLM is basically: **attention becomes code.**  
Instead of hoping the transformer’s attention stays coherent across an ever-growing prompt, you move “what to look at” into an executable, auditable process. That’s already the spirit of Rosetta receipts and provenance: turn cognition into inspectable artifacts rather than ephemeral thoughts.

The clean synthesis is:  
_RLM gives you the compute-time scaling + arbitrarily long context access._  
_Rosetta gives you the artifact substrate so that access is auditable, governable, cacheable, and composable across agents and time._

And fast-rlm is a practical “toy-to-tool” scaffold demonstrating the mechanics (REPL + recursive `llm_query()` + budget controls) that we can re-skin into Rosetta-native tiles + GuardLayer policies. [avbiswas.github.io+1](https://avbiswas.github.io/fast-rlm/)



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)