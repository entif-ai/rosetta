# Extraction: Progressive-Disclosure Skill System

**Source:** `docs/chats/20260323 - Chat GPT - Progressive-Disclosure Skill System.md`
**Extracted:** 2026-04-26
**Confidence:** HIGH (detailed technical discussion, cited Anthropic docs/GitHub sources)

---

## 1. Core Concept: Progressive-Disclosure Skill System

**What it is:**
A three-stage on-demand loading model for skills that keeps always-loaded context tiny (~100 tokens per skill catalog entry) while full playbooks and resources load only when the broker is confident a skill is relevant.

**Stage A — Catalog Metadata (always loaded):** ~100 tokens per skill. Contains name + description + optional 1–2 tiny policy flags. This is the trigger surface the broker uses to decide relevance.

**Stage B — Full Skill Playbook (loaded when triggered):** The `SKILL.md` playbook containing instructions, constraints, steps, output contract, gotchas. Only loaded when a skill clears the broker's confidence threshold.

**Stage C — Resources (loaded/executed on-demand):** Scripts, references, assets. Scripts execute without stuffing their entire contents into context — only outputs consume tokens.

**Sources cited:**
- Anthropic Skills overview: https://claude.com/docs/skills/overview
- Anthropic public skills repo: https://github.com/anthropics/skills
- Anthropic best-practices (platform): https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices

**Confidence:** HIGH

---

## 2. Skill Object Model (Entif/Rosetta-native)

**SkillCatalogEntry (Stage A) fields:**
- `skill_id` (stable slug)
- `name`
- `description` (primary trigger surface)
- `capabilities`: short verb list (internal taxonomy)
- `risk_band`: e.g., `parse_only | local_content_reference`
- `tool_allowlist_hint`: tiny list of tool names (not schemas)
- `embeddings`: vector for `{name+description}`

**SkillPlaybook (Stage B) fields:**
- `skill_id`
- `version`
- `instructions_md` (or sections array)
- `io_contracts`: JSON Schema / Zod input/output schemas
- `evals`: test prompts + assertions harness hooks

**SkillResources (Stage C):**
- `scripts/` — callable utilities
- `references/` — docs, standards, cheat sheets
- `assets/` — templates

**YAML frontmatter compatibility:** For Anthropic format compatibility, `SKILL.md` should include `name` + `description` in YAML frontmatter; additional allowed keys: `license`, `allowed-tools`, etc.

**Sources cited:**
- DeepWiki skill format spec: https://deepwiki.com/anthropics/skills/2.2-skill.md-format-specification
- Anthropic skill-creator: https://raw.githubusercontent.com/anthropics/skills/main/skills/skill-creator/SKILL.md

**Confidence:** HIGH

---

## 3. Skill Broker Pipeline

**Inputs:**
- `need`: user ask + local task context (repo path, file types, mode)
- `mode`: Parse-Only vs Command (safety split)
- `available_tools`: what this agent instance can execute
- `budgets`: token/$/time caps + risk cap
- `history`: prior successful skills for similar asks (stats)

**Pipeline (cheap → expensive):**

1. **Hard Filters (O(1))**
   - Mode gate: in Parse-Only, exclude side-effect skills
   - Tool gate: exclude skills requiring unavailable tools
   - Domain gate: if ask is "PDF", prefer doc skills; if "git", prefer repo skills

2. **Lexical + Embedding Retrieval (O(logN))**
   - Hybrid search across Stage-A metadata: BM25 on name/description + vector similarity
   - Pull top K=25

3. **Graph Boost + Penalties (O(edges))**
   - Boost: skills linked to same domain tiles, same repo, same artifact type, same capability verb taxonomy branch
   - Penalize: low historical pass-rate in similar contexts; high cost/time variance

4. **Shortlist + Explain**
   - Return top 3–7 skills with: `why_selected`, expected cost band, risk band

5. **Escalation (confidence threshold miss)**
   - Preferred: "extend existing skill"
   - Last resort: "author new skill"

**Confidence:** HIGH

---

## 4. Key Efficacy Patterns from Claude Code (to replicate without platform lock-in)

**A) Description is the trigger surface**
The `description` field drives discoverability and triggering. Treated as a _mini classifier prompt_ including:
- "what it does" + "when to use"
- common synonyms and user phrasings
- explicit exclusions (when NOT to use)

**B) Keep playbooks concise**
Concise is key; only add context the model doesn't already have. SKILL.md should be mostly "constraints + steps + output contract + gotchas."

**C) Evals are first-class**
Every skill has:
- 2–5 canonical eval prompts
- assertions where objective (file exists, schema validates, diff matches patterns)
- grading harness + benchmark report saved as receipts

**D) Scripts execute without bloating context**
Push deterministic transforms into scripts/tools, not instruction text. Only outputs consume tokens.

**Source:** Anthropic skill-creator playbook (GitHub raw)

**Confidence:** HIGH

---

## 5. Safety Architecture

**Principle:** Skill selection is advisory; tool invocation is always checked by Guard policy.

**Requirements:**
- Deny-by-default capability execution through Guard gateway
- Receipts for every step
- Strict mode split (Parse-Only default; Command explicitly invoked)
- Every skill run emits a receipt: selected skill IDs, versions, resources loaded, tools called, costs

**Confidence:** HIGH

---

## 6. Bootstrapping Plan

**v1 — Implement Skill Registry:**
- Store Stage-A metadata in SQL + vectors
- Store Stage-B/Stage-C as content-addressed blobs/tiles

**v2 — Implement Broker v0:**
- Hybrid search + top-5 return
- No graph boosts at first (just stats + basic filter)

**v3 — Seed "happy-path" skills:**
- doc transforms (pdf/docx/xlsx/pptx)
- repo hygiene (git commits, changelogs, release notes)
- ingestion tasks (transcript normalization, tagging)
- Use Anthropic public repo as _pattern reference only_; keep own licenses clean

**v4 — Wire eval harness:**
- Every skill run writes benchmark receipt (pass/fail, tokens, latency, tool errors)
- Broker uses stats for ranking

**v5 — Add graph boosts:**
- Map skills to taxonomy nodes once KG exists; boost by proximity

**Confidence:** MEDIUM (implementation sequencing is suggested, not committed)

---

## 7. Named Concept: "Skill Economy"

**Definition given:** A **Skill Economy** where "knowledge" is a tiny ad and "execution" is an audited transaction.
- Progressive disclosure = the economic trick
- Rosetta = the ledger
- Broker = the selection intelligence

**Confidence:** MEDIUM (framing/terminology, cited in conversation as rhetorical crystallization)

---

## 8. Alignment with Existing Rosetta Patterns

**Selection-first cognition:** Intelligence is largely "refuse to consider most of the space" — matches the broker's greedy decision tree approach.

**Content-addressed tiles:** Skills implemented as content-addressed artifacts so they're auditable, versioned, and diffable (matches Rosetta spine).

**Receipts for every step:** Complies with existing Rosetta architecture requirement.

**Confidence:** HIGH

---

## 9. Relevant URLs Referenced

- https://x.com/i/status/2028549738371658008 (original source post)
- https://github.com/anthropics/skills/tree/main/skills (Anthropic public skills repo)
- https://claude.com/docs/skills/overview (Anthropic skills overview)
- https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices (best-practices doc)
- https://deepwiki.com/anthropic/skills/2.2-skill.md-format-specification (format spec)
- https://raw.githubusercontent.com/anthropics/skills/main/skills/skill-creator/SKILL.md (skill-creator playbook)

---

## Confidence Summary

| Topic | Confidence |
|-------|------------|
| Progressive disclosure 3-stage model | HIGH |
| Skill object model fields | HIGH |
| Broker pipeline stages | HIGH |
| Claude Code efficacy patterns | HIGH |
| Safety architecture | HIGH |
| Bootstrap sequencing | MEDIUM |
| "Skill Economy" framing | MEDIUM |

**Overall extraction confidence:** HIGH
