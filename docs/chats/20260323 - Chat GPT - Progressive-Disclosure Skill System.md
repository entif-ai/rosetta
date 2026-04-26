# Progressive-Disclosure Skill System

**User:** Crates McD (mcdade@gmail.com)  
**Created:** 2026/3/2 23:07:14  
**Updated:** 2026/3/19 9:54:25  
**Exported:** 2026/3/23 4:08:32  
**Link:** [https://chatgpt.com/g/g-p-69a0bc48664481918ad06fa52cbdfda4-entif-v0/c/69a65e3e-54e8-832d-9ceb-1fe6740ba0c8](https://chatgpt.com/g/g-p-69a0bc48664481918ad06fa52cbdfda4-entif-v0/c/69a65e3e-54e8-832d-9ceb-1fe6740ba0c8)  

## Prompt:
From day one, I want to have our Entif agents using skills gleaned from trustworthy sources (though, no matter the source, always thoroughly interpreted and vetted before being used).

I'd like us to replicate the ~100 token per skill metadata size used in selection by applicability, and further, aim to reproduce any other novel paradigms and processes Anthropic uses to maximize Claude Code's efficacy- without being locked into using their platform or stack.

As the library grows, we'll leverage our graph, vector and SQL databases (along various stats from each time we've used any of our skills previously) so when the agent feeds a given need or use case to our skill broker middleware, that returns a short targeted list of skills related to the ask.

Then, the agent may opt to use a given skill in our internal library as-is, or extend one we've already got to enhance its capabilities, or (only when truly necessary) author a new skill from scratch. 

https://x.com/i/status/2028549738371658008

https://github.com/anthropics/skills/tree/main/skills

## Response:
Thought for 43s

You’re describing (and should absolutely build) a **progressive-disclosure skill system**: keep a tiny always-loaded “catalog blurb” per skill, then pull the full playbook only when a broker is confident it’s relevant, then pull heavyweight resources only when needed. Anthropic explicitly documents that exact 3-stage loading model, including the “~100 tokens each” metadata target. [Claude](https://claude.com/docs/skills/overview)

Below is a clean way to reproduce the _paradigms_ without inheriting their platform lock-in, while still keeping the good parts: selection efficiency, low context bloat, eval discipline, and safe execution posture.

* * *

1) Mirror the core paradigm: progressive disclosure + “metadata budget”
-----------------------------------------------------------------------

**Stage A: Catalog metadata (always loaded)**

*   Keep this to roughly **name + description** (and optionally 1–2 tiny policy flags).
*   Anthropic’s docs: “Metadata loading … (~100 tokens each)”. [Claude](https://claude.com/docs/skills/overview)
*   Their public skills repo also emphasizes each skill is a folder with `SKILL.md` containing “instructions and metadata” in YAML frontmatter. [GitHub](https://github.com/anthropics/skills)

**Stage B: Full skill instructions (loaded when triggered)**

*   `SKILL.md` is the “playbook” that teaches the agent what to do.
*   Anthropic’s best-practices doc is explicit: only metadata is preloaded; `SKILL.md` loads only when relevant; additional files load only as needed. [Claude Developer Platform](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

**Stage C: Resources (loaded/executed on-demand)**

*   Scripts should run _without_ stuffing their entire contents into context whenever possible; only outputs consume tokens (a crucial cost lever). [Claude Developer Platform](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

This “winnowing-first” posture is also perfectly aligned with your own selection-first cognition framing: intelligence is largely “refuse to consider most of the space.”

20260223 - Chat GPT - Rosetta's…

* * *

2) Skill object model you can standardize in Entif (Rosetta-native)
-------------------------------------------------------------------

Implement skills as **content-addressed artifacts** (tiles) so they’re auditable, versioned, and diffable. That matches Rosetta’s “content-addressed, semantically typed tiles” spine

20260223 - Chat GPT - Rosetta's…

ibility” posture.

20251130 - ChatGPT 5.1 - Taxono…

### Recommended minimal fields

**SkillCatalogEntry (Stage A)**

*   `skill_id` (stable slug)
*   `name`
*   `description` (the _primary trigger surface_, keep it crisp)
*   `capabilities`: short list of verbs (your internal taxonomy)
*   `risk_band`: `parse_only | lo:contentReference[oaicite:8]{index=8}ect`
*   `tool_allowlist_hint`: tiny list (names, not schemas)
*   `embeddings`: one vector for `{name+description}`

**SkillPlaybook (Stage B)**

*   `skill_id`
*   `version`
*   `instructions_md` (or “sections” array if you want structured)
*   `io_contracts`: input/output schemas (JSON Schema / Zod)
*   `evals`: test prompts + assertions harness hooks (more below)

**SkillResources (Stage C)**

*   `scripts/` (callable utilities)
*   `references/` (docs, standards, cheat sheets)
*   `assets/` (templates)

If you want compatibility with the “feel” of the Anthropic format, keep a YAML frontmatter header in `SKILL.md` with at least `name` + `description`, and optionally allow extra keys (license, tool constraints). DeepWiki’s summary of their format shows additional allowed keys like `license`, `allowed-tools`, etc. [DeepWiki](https://deepwiki.com/anthropics/skills/2.2-skill.md-format-specification)

* * *

3) The Skill Broker: how it returns a short targeted list
---------------------------------------------------------

You want the broker to behave like a bouncer with a clipboard: fast “no’s,” a handful of “maybe’s,” and only then the full frisk.

### Broker inputs

*   `need`: user ask + local task context (repo path, file types, mode)
*   `mode`: Parse-Only vs Command (your safety split)
*   `available_tools`: what this agent instance can even execute
*   `budgets`: token/$/time caps, plus risk cap (no high side effects)
*   `history`: prior successful skills for similar asks (your “stats”)

### Broker pipeline (cheap → expensive)

1.  **Hard filters (O(1) cheap)**
    *   Mode gate: in Parse-Only, exclude anything with side effects.
    *   Tool gate: exclude skills requiring unavailable tools.
    *   Domain gate: if ask is “PDF”, prefer doc skills; if “git”, prefer repo skills.
2.  **Lexical + embedding retrieval (O(logN))**
    *   Hybrid search across Stage-A metadata:
        *   BM25 on `name/description`
        *   Vector similarity on same
    *   Pull top K=25.
3.  **Graph boost + penalties (O(edges))**
    *   Boost skills linked to:
        *   same domain tiles / same repo / same artifact type
        *   same “capability verb” taxonomy branch
    *   Penalize skills with:
        *   low historical pass-rate in similar contexts
        *   high cost/time variance
4.  **Shortlist + explain**
    *   Return top 3–7 skills with:
        *   `why_selected` (1–2 sentences)
        *   expected cost band (based on receipts)
        *   risk band
5.  **Escalation**
    *   Only if nothing clears a confidence threshold:
        *   propose “extend existing skill” (preferred)
        *   last resort: “author new skill”

This is exactly the “selection pressure” you’ve been circling: a greedy decision tree of “what do we consider next?” instead of flooding the model with everything.

20260223 - Chat GPT - Rosetta's…

* * *

4) Reproducing Claude Code’s _efficacy_ patterns (without copying the product)
------------------------------------------------------------------------------

These are the high-leverage patterns worth cloning:

### A) Description is the trigger surface

Anthropic repeatedly stresses that the `description` drives discoverability and triggering. In their skill-creator playbook, they even recommend wri

20260223 - Chat GPT - Rosetta's…

shy” to avoid under-triggering. [GitHub](https://raw.githubusercontent.com/anthropics/skills/main/skills/skill-creator/SKILL.md)

**Entif move:** treat `description` as a _mini classifier prompt_:

*   include “what it does” + “when to use”
*   include common synonyms and user phrasings
*   include explicit exclusions (when NOT to use)

### B) Keep playbooks concise; assume the model is smart

Their best-practices doc: “concise is key” and “only add context Claude doesn’t already have.” [Claude Developer Platform](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)  
**Entif move:** make SKILL.md mostly “constraints + steps + output contract + gotchas”.

### C) Evals are first-class (skill quality becomes measurable)

Their skill-creator skill is basically an iterative loop: draft → run evals → grade → benchmark → improve. [GitHub](https://raw.githubusercontent.com/anthropics/skills/main/skills/skill-creator/SKILL.md)  
**Entif move:** every skill has:

*   2–5 canonical eval prompts
*   assertions where objective (file exists, schema validates, diff matches patterns)
*   a grading harness and benchmark report saved as receipts

### D) Scripts should execute without bloating context

Anthropic explicitly notes scripts can be executed and only their output costs tokens. [Claude Developer Platform](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)  
**Entif move:** push deterministic transforms into scripts (or tools), not into instruction text.

* * *

5) Safety: skills must route through Guard + receipts
-----------------------------------------------------

A skill is not “permission.” It’s “procedure.” Execution still must be mediated.

Your own baseline architecture already expects:

*   deny-by-default capability execution through a Guard gateway
*   receipts for every step
*   strict mode split (Parse-Only default; Command explicitly invoked)
    20251130 - ChatGPT 5.1 - Taxono…

So for skills:

*   **Skill selection** is advisory.
*   **Tool invocation** is always checked by Guard policy.
*   **Every step** emits a receipt: selected skill IDs, versions, resources loaded, tools called, costs.

That gives you a provable chain: “why did we choose this skill, what did it do, what evidence did it produce,” which is the whole Rosetta spine vibe.

20251130 - ChatGPT 5.1 - Taxono…

* * *

6) Bootstrapping plan (thin vertical slice that compounds)
----------------------------------------------------------

1.  **Implement Skill Registry v0**
    *   Store Stage-A metadata in SQL + vectors
*   Store Stage-B/Stage-C as content-addressed blobs/tiles
    2.  **Implement Broker v0**
    *   Hybrid search + top-5 return
*   No graph boosts at first, just stats + basic filte
    20251130 - ChatGPT 5.1 - Taxono…
    hy-source” skills\*\*
*   Start with:
    *   doc transforms (pdf/docx/xlsx/pptx patterns are common)
    *   repo hygiene (git commits, changelogs, release notes)
    *   ingestion tasks (transcript normalization, tagging)
*   Use the public Anthropic repo strictly as _pattern reference_, and keep your own licenses clean. Their repo also notes some subfolders are “source-availa
    20251130 - ChatGPT 5.1 - Taxono…
    [GitHub](https://github.com/anthropics/skills)
    4.  **Wire eval harness**
    *   Every skill run writes a benchmark receipt (pass/fail, tokens, latency, tool errors)
*   Broker uses those stats for ranking
    5.  **Add graph boosts**
    *   Once your KG exists, map skills to taxonomy nodes and boost by proximity.

* * *

If you want a north-star definition: you’re building a **Skill Economy** where “knowledge” is a tiny ad and “execution” is an audited transaction. Anthropic’s progressive disclosure gives you the economic trick; Rosetta gives you the ledger; your broker gives you the selection intelligence. [Claude](https://claude.com/docs/skills/overview)



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)