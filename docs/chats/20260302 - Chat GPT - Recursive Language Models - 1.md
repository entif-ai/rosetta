# Recursive Language Models

**User:** Crates McD (mcdade@gmail.com)  
**Created:** 2026/3/2 5:29:26  
**Updated:** 2026/3/2 5:32:36  
**Exported:** 2026/3/2 5:32:59  
**Link:** [https://chatgpt.com/g/g-p-69299306a6408191947092cdf41148f0-entif-2-0/c/69a5667a-aa2c-832b-a523-6c3d44be8787](https://chatgpt.com/g/g-p-69299306a6408191947092cdf41148f0-entif-2-0/c/69a5667a-aa2c-832b-a523-6c3d44be8787)  

## Prompt:
Recursive Language Models - 2512.24601v2.pdf

PDF

Quite frequently, any sufficiently-sophisticated agentic instance (e.g. OpenClaw or a variant of that) will be running operations requiring increasingly-larger prompts and context over time, especially in tasks performed as part of a parent initiative increasing in complexity over time (such as building and maintaining a large software project).

Effectively managing context without rot, loss or ineffective attention is a major concern we must address. This new paper and code example repo on the subject of Recursive Language Models may offer valuable insights and solutions we can apply to Entif's approach and architecture.

https://github.com/avbiswas/fast-rlm

## Response:
Thought for 1m 48s

You’re pointing at the _real_ bottleneck: “context length” is not the same thing as “context usability.” Even when you can cram more tokens in, models still degrade as prompts grow (context rot), so long-horizon agents end up with either (a) lossy compaction, or (b) brittle retrieval heuristics. RLMs are interesting because they flip the whole interface: instead of **feeding** the prompt into the model, they **mount** it as an external object and let the model _operate on it_ with code and recursion. [arXiv+1](https://arxiv.org/abs/2512.24601?utm_source=chatgpt.com)

Recursive Language Models - 251…

Technical ta

Recursive Language Models - 251…

) What RLMs actually change (the API boundary)
----------------------------------------------------------------------------------------------

The canonical call is:

*   `llm.completion(prompt)`

RLMs propose:

*   `rlm.completion(prompt)` where `prompt` becomes a variable inside a sandboxed REPL, and the LM writes programs to:
*   peek/search/slice/decompose the prompt
*   recursively call sub-agents on _only the needed snippets_
*   keep sub-agent outputs out of the parent’s context by default (they come back as REPL variables/symbols, not appended text) [GitHub+1](https://github.com/avbiswas/fast-rlm)

That last point matters a lot for agentic systems: it’s an explicit “anti-context-bloat” rule. fast-rlm states it plainly: sub-agent responses are not automatically loaded into the parent context; they return as symbols/variables in the parent REPL. [GitHub](https://github.com/avbiswas/fast-rlm)

### 2) Why this helps with “context rot”

Context rot research (and a pile of practitioner writeups) basically converges on the same empirical truth: as irrelevant tokens increase, retrieval accuracy and reasoning fidelity degrade in non-obvious ways. [research.trychroma.com+1](https://research.trychroma.com/context-rot?utm_source=chatgpt.com)

RLMs don’t “solve” this by making the model attend over 10M tokens. They solve it by **refusing to make the neural net attend over 10M tokens at once**:

*   the “long prompt” becomes an external memory substrate
*   the model uses _programmatic attention_ (search + decomposition + targeted subcalls)
*   the final answer is assembled from a controlled set of evidence snippets, not from a giant soup [arXiv+1](https://arxiv.org/abs/2512.24601?utm_source=chatgpt.com)

### 3) fast-rlm specifically: what you get out of that repo

`avbiswas/fast-rlm` is a minimal implementation of the RLM paper ideas, built around a REPL + recursion loop, with:

*   recursive decomposition (spawn sub-agents)
*   REPL-based reasoning (execute Python iteratively)
*   budget controls (depth/calls/dollar spend caps)
*   OpenAI-compatible provider routing (defaulting to OpenRouter via `RLM_MODEL_BASE_URL`)
*   structured JSONL logging + a TUI log viewer [GitHub+1](https://github.com/avbiswas/fast-rlm)

So it’s not just “an idea repo,” it’s already shaped like an _Entif-ish_ component: budgets + receipts-style logs + replaceable model backends.

### 4) The Entif-shaped integration (how to make this real, not a vibe)

The cleanest way to absorb RLMs into Entif is to treat “Recursive Context Processing” as a first-class capability in the same family as your receipts-first orchestration and Rosetta spine:

**A. Make an RLM runtime a tool, not a prompt trick**

*   Add a `ContextRuntime` service (or MCP tool) whose entire job is: _mount a large corpus as an external environment, then execute bounded RLM programs against it._
*   Your orchestrator (“Ada”/ROMA/TRM stack) calls it the way it calls any other tool, and every step gets a receipt.

**B. Use Rosetta/Tiles as the persistence model for recursion**  
If Rosetta is your content-addressed truth spine, then every RLM operation should emit:

*   `Observation` tiles: the snippet spans pulled from the mounted corpus
*   `Action/ToolCall` tiles: REPL program steps + subcall metadata
*   `Derived` tiles: intermediate summaries, indexes, maps, diffs
*   `Evaluation` tiles: verifier scores (did this step actually support the claim?)

This gives you reproducibility: the RLM “answer” becomes a replayable DAG, not a mystical blob.

**C. Replace “memory compaction” with “offloaded history + pointered access”**  
The official RLM repo is already moving in this direction (“compaction with offloaded history” appears in releases). [GitHub](https://github.com/alexzhang13/rlm)  
Entif can go further and make it native:

*   working memory stays small
*   everything else becomes addressable tiles
*   the RLM program pulls what it needs by pointer (CID/query), not by stuffing summaries back into the context window

**D. Sandboxing and governance**  
RLM is code execution, which means:

*   you must sandbox it (no ambient network, constrained filesystem, resource quotas)
*   you must validate any external side effects behind Guard Layer policy (RLM should be “read-mostly” unless explicitly in command mode)

In Entif terms: RLM belongs in the “analysis plane,” and any “actuation plane” action requires policy gates + explicit approval.

Practical take (plain language)
-------------------------------

Instead of asking the model to read your entire ever-growing prompt like a single scroll, you give it a library card catalog and let it:

1.  search for the few pages that matter
2.  send those pages to a helper copy of itself
3.  keep the helper’s results as small, named notes (variables), not a giant paste-back
4.  assemble the final output from those notes

That’s exactly what long-horizon agent projects need: _selective attention that doesn’t rot as the archive grows._

A concrete “thin vertical slice” for Entif (high leverage)
----------------------------------------------------------

If you want to test this quickly without boiling anything:

1.  **Mount one nasty corpus**  
    Example: your monorepo docs + issues + previous run receipts (the stuff that normally causes agent context explosion).
2.  **One RLM skill: “repo comprehension map”**  
    Output should be a structured artifact:
    *   key modules
    *   dependency edges
    *   where “truth” lives (schemas/contracts)
    *   citations: file paths + exact spans
3.  **Hard budgets + receipts from day one**
    *   max recursion depth
    *   max subcalls
    *   max dollars
    *   every step logged as JSONL (fast-rlm already does this) [avbiswas.github.io](https://avbiswas.github.io/fast-rlm/)
4.  **Verifier gate**  
    Before anything is accepted into “persistent knowledge,” run a verifier pass that checks:
    *   do cited spans actually support the extracted claim?
    *   did the agent accidentally infer something that isn’t in evidence?

If this slice works, you’ve basically proven the core premise: “context can scale by _procedure_, not by _prompt size_.”

Key references you’ll want in your Entif notes
----------------------------------------------

*   RLM paper (Zhang/Kraska/Khattab): overall paradigm + empirical claims + motivation around context rot. [arXiv+1](https://arxiv.org/abs/2512.24601?utm_source=chatgpt.com)
    Recursive Language Models - 251…
*   Official RLM codebase (alexzhang13/rlm): “plug-and-play inference library,” and it’s actively evolving. [GitHub+1](https://github.com/alexzhang13/rlm)
*   fast-rlm (avbiswas/fast-rlm): minimal implementation with budgets + structured logs (very close to your receipts-first instincts). [GitHub+1](https://github.com/avbiswas/fast-rlm)

If I were w

Recursive Language Models - 251…

today, I’d treat `fast-rlm` as the quickest “skateboard,” and then either migrate to the official `rlm` library or keep fast-rlm as the reference implementation you can freely mutate, while Rosetta/Receipts/Guard provide the non-negotiable spine around it.



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)