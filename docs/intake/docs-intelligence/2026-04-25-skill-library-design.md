# Extraction: 20260323 - Chat GPT - Entif Skill Library Design

## Doc Meta

- **Source:** `docs/chats/20260323 - Chat GPT - Entif Skill Library Design.md`
- **Date:** 2026-03-23 (exported)
- **Participants:** Crates McD (user), ChatGPT (g-p-69299306a6408191947092cdf41148f0)
- **Lines:** 460
- **Topics:** Anthropic Skills paradigm replication, progressive disclosure, skill broker, skill versioning, hot/cold skill library, skill telemetry
- **Confidence:** HIGH (detailed technical spec with examples, YAML frontmatter, structured steps)

---

## Findings

### Finding 1: Anthropic's Progressive Disclosure Model (3-Tier Architecture)

**Confidence: HIGH**

Anthropic's Skills system uses a 3-tier progressive disclosure model:
1. **Tier 0 (Metadata stub):** Only `name` + `description` preloaded at startup (~100 tokens per skill)
2. **Tier 1 (Full spec):** `SKILL.md` loaded only when a task matches the skill
3. **Tier 2 (Resources):** Additional bundled files loaded only when explicitly needed

**Reference cited:** [Claude Developer Platform](https://claude.com/docs/skills/overview) and [Claude Blog - Building Agents with Skills](https://claude.com/blog/building-agents-with-skills-equipping-agents-for-specialized-work)

**Source doc quote:**
> "Anthropic's core trick is **progressive disclosure**: at startup Claude only loads a tiny metadata stub per skill (they call out ~100 tokens each), then loads the full `SKILL.md` only when relevant, and only loads additional bundled files when needed."

**Related finding:** Crates explicitly does NOT want a global SKILLS.md file used as a machine-loaded catalog. The agent should NOT carry all skill metadata in context.

**Related finding:** Crates wants only a "Hot Skills Pack" of ≤50 per agent template to be loaded in markdown. Everything else is broker-discovered.

**Implication:** The metadata-first, load-when-needed model mirrors the Tiles posture (content addressing, lineage, verification, evaluation harness) already in Rosetta.

---

### Finding 2: Tier 0 — SkillCard Specification (~100 token stub)

**Confidence: HIGH**

The SkillCard is the broker-indexed stub. Fields:
- `id` — content-addressed CID or hash
- `name` — short slash-command friendly
- `one_line` — <= 140 chars
- `triggers` — 3–8 keywords or EGC glyph tags
- `io` — 1-line: inputs/outputs
- `risk_class` — `read_only | write_local | write_external | financial | identity | admin`
- `tool_scopes` — allowlisted tool families
- `version`
- `provenance` — origin + trust score pointer

**Example from source doc:**
```yaml
name: "yt_transcript_ingest"
description: "Ingest YouTube transcripts (captions-first, ASR fallback), store provenance + receipts."
version: "0.1.0"
risk_class: "write_local"
tool_scopes: ["net.http", "fs.write_scoped", "proc.exec_sandbox"]
triggers: ["youtube", "transcript", "yt-dlp", "captions", "ingest"]
io: "urls[] -> transcript_tiles + provenance"
acceptance_checks:
  - "Every transcript has source_url, retrieved_at, method, language_actual, hash."
  - "429/backoff handled; pipeline resumes from checkpoint."
```

**Key constraint:** SkillCard MUST be forced to ~100 tokens (or a byte limit) so broker can return 10–30 without pain.

**Issue prefix candidate:** SLD-001

---

### Finding 3: Tier 1 — SKILL.md Format Specification

**Confidence: HIGH**

The full skill spec mirrors Anthropic's format. Body structure:
- Purpose
- Non-goals
- Preconditions
- Steps (written as "constraints + heuristics", not brittle scripts)
- Tool usage rules
- **Acceptance checks** (what counts as done)
- Failure modes / recovery
- Examples (few, surgical)

Frontmatter includes: `name`, `description` (strict size cap), `version`, `risk_class`, `tool_scopes`, `triggers`, `io`, `acceptance_checks`.

**Reference cited:** [DeepWiki - skill.md format specification](https://deepwiki.com/anthropics/skills/2.2-skill.md-format-specification)

**Key difference from Anthropic:** Entif's body should be "opinionatedly structured" per Crates's preferences.

---

### Finding 4: Tier 2 — Resources (Loaded Only When Invoked)

**Confidence: HIGH**

Resources include:
- code snippets, scripts, templates
- eval fixtures
- reference docs
- domain dictionaries

**Implementation note:** Resources should be behind **explicit resource handles** so the orchestrator pulls them only if needed.

---

### Finding 5: Trustworthy Ingestion / Vetting Pipeline

**Confidence: HIGH**

Every ingested skill must pass a gating pipeline:

1. **Ingest** skill from source
2. **Normalize** into canonical schema (card/spec/resources)
3. **Static lint:**
   - metadata size budget check
   - forbidden tools by risk_class
   - required acceptance checks
4. **Petri-style eval pack run:**
   - golden path
   - common failure path
   - prompt-injection attempts
5. **Sign + store:**
   - signer = Entif key (or multi-sig later)
   - publish to graph/vector/sql indexes
6. **Enable** only after `certified=true`

**Source doc quote:**
> "This is how 'skills gleaned from trustworthy sources' stops being a vibe and becomes a measurable gate."

**Reference:** This pipeline mirrors the skillpack-importer-quarantine-flow issue already drafted (parse → classify → quarantine → certify → promote).

**Issue prefix candidate:** SLD-006

---

### Finding 6: Skill Broker Middleware — Multi-Stage Retrieval

**Confidence: HIGH**

The broker sits between "agent need" and "skills that might help."

**Inputs to broker:**
- `NeedSpec` (structured):
  - intent family (EGC / taxonomy)
  - constraints (time, budget, offline/online, data sensitivity)
  - available tools/runtime
  - desired output type

**Retrieval stages (cheap-first, then sharpen):**

1. **SQL prefilter** (fast faceting):
   - risk_class compatible?
   - tool_scopes allowed?
   - environment constraints (offline, mac/linux, etc.)

2. **Vector recall** (top 200):
   - embed NeedSpec
   - similarity over `skill.card + distilled spec summary`

3. **Graph re-rank** (top 50):
   - dependency edges ("uses tool X", "touches domain Y")
   - conflict edges ("superseded_by", "deprecated")

4. **Receipt-aware final rank** (top 10–20 returned):
   - win_rate, avg cost, avg latency, last_used
   - failure modes matched to current constraints

**Output to the agent:**
- 10–20 SkillCards (Tier 0 stubs)
- "why these" rationale
- plus the **one best** recommended skill (if confidence high)

If the agent selects a skill, **then** load Tier 1.

**Issue prefix candidate:** SLD-003

---

### Finding 7: Extend vs Author New Policy

**Confidence: HIGH**

**Use-as-is if:**
- match score high
- receipts show reliability in same intent family

**Extend if:**
- match high but missing one capability (detectable via acceptance-check gap)
- propose a "delta" to the skill (new section, new example, new resource)

**New skill only if:**
- no match passes threshold
- or risk_class/tool constraints require a clean-room variant

**Implementation note:** Store extensions as a **new version tile** with `supersedes` edges, like the tile version lineage model.

**Issue prefix candidate:** SLD-004

---

### Finding 8: Safety Posture — Two Hard Rules

**Confidence: HIGH**

**Rule A: Skill metadata and risk class enforcement**

The Guard should enforce:
- "non-amplification" delegations
- budget requirements for spendful actions
- fail-closed on uninterpretable

**Rule B: High-risk skill requires dry-run first**

This is described as straight out of the code interception + sandboxed validation architecture (20251026 - Entif 2.0 - Secure A...).

**Source doc quote:**
> "So the 'skill' is just a _plan generator plus constraints_. Execution is still adjudicated."

**Implication:** The skill itself never bypasses the Guard. Skills are plan generators, not execution authorities.

**Issue prefix candidate:** SLD-008

---

### Finding 9: Hot Skills Pack vs Cold Library (Two-Level Registry)

**Confidence: HIGH**

**A. Always-loaded "Hot Skills Pack" (≤ 50 per agent template)**
- Skills invoked constantly across that agent class
- Infrastructural skills (routing, brokering, receipts, safety checks)
- Bootstrapping primitives even when broker is down

**B. Broker-backed "Cold Library" (unbounded)**
- All other skills live out-of-context
- Stored in graph/vector/sql stores + object store or repo
- Agent never sees their metadata in bulk

**Source doc quote:**
> "You can have 100k skills and the agent still starts with the same tiny prompt."

**Per agent template customization:**
- Hot Skills Pack (≤ 50)
- Default broker filters (risk ceilings, tool scopes, domain lanes)
- Default selection heuristics (opt for reuse vs authoring aggressiveness)

**Examples given:**
- "Research Scout" template: hot skills for web/paper ingestion, summarization receipts, citation discipline
- "Repo Maintainer" template: hot skills for git workflows, CI triage, patch etiquette

**Issue prefix candidate:** SLD-005

---

### Finding 10: `skill_broker_query_and_select` as First-Class Hot Skill

**Confidence: HIGH**

This is the skill that must be pinned into the Hot Skills Pack:

**Purpose:** take a tightly-scoped NeedSpec, query broker, shortlist, decide use vs extend vs author, then register.

**Inputs:**
- NeedSpec (intent, constraints, env, risk posture, success criteria)
- Context summary (what we already tried + results)
- Budget (time/spend tokens)

**Steps:**
1. Normalize NeedSpec into canonical schema
2. Call broker with intent family/taxonomy tags, constraints, desired output type
3. Broker returns: top N SkillCards, plus "best single pick" if confidence > threshold, plus "closest existing skill to extend" if gap is small
4. Agent decision policy: use-as-is / extend / new skill
5. If extend/new: generate new skill artifact (Tier 0 card + Tier 1 spec + eval pack), then register

**Issue prefix candidate:** SLD-003 (included in broker middleware scope)

---

### Finding 11: Skills as Signed, Versioned Tiles

**Confidence: HIGH**

Every skill is a tile set:
- `skill.card` (Tier 0)
- `skill.spec` (Tier 1)
- `skill.resource_pack` (tests, canaries, adversarial prompts)
- `skill.receipt/*` (every invocation outcome)

**Enforced properties:**
- content-addressed IDs (hash/CID)
- version lineage (`supersedes`, `deprecated_by`)
- provenance and certification status
- eval pack results and ongoing receipts

**Source doc quote:**
> "This is how you prevent 'skill sprawl' turning into 'skill swamp.'"

---

### Finding 12: Skill Telemetry as First-Class Query Surface

**Confidence: HIGH**

Every skill run produces:
- what skill was chosen
- what it cost
- whether it succeeded
- why it failed
- what should be edited

These are **SkillReceipts** — a first-class query surface:

**Query examples:**
- "top skills by win_rate in this domain"
- "skills that fail under offline constraint"
- "skills that trend toward prompt-injection incidents"

**Source doc quote:**
> "That turns your broker into a [living system] of a static catalog."

**Issue prefix candidate:** SLD-007

---

### Finding 13: Anthropic Skills Repo Reference

**Confidence: HIGH**

Anthropic's public skills repo: `https://github.com/anthropics/skills`

**Key reference:** This is the primary source to model Entif's skill library after, while keeping it vendor-agnostic and aligned with the Receipts-first spine.

---

### Finding 14: No Global SKILLS.md Used as Machine-Loaded Catalog

**Confidence: HIGH (explicitly stated by Crates)**

Crates's requirement: "at most, perhaps only the top 50 or less that are used extremely commonly by that class/template of agent instance (which we can customize, certainly, per agentic template)."

**Rule:** No global `SKILLS.md` used as a machine-loaded catalog. Only a human-facing "Top Skills for this Agent Template" markdown doc (≤ 50 entries) that is always loaded.

**This differs from Anthropic's default** mainly in _where_ the metadata lives: Anthropic preloads metadata for "installed skills" into prompt; Entif preloads metadata into broker indexes and only returns the handful that match.

---

## Distinct Issue Candidates (SLD-XXX prefix)

| # | Issue ID | Title | Priority |
|---|----------|-------|----------|
| 1 | SLD-001 | SkillCard schema (Tier 0 ~100-token metadata stub) | HIGH |
| 2 | SLD-002 | 3-tier progressive disclosure architecture (SkillCard → SKILL.md → Resources) | HIGH |
| 3 | SLD-003 | Skill broker middleware with multi-stage retrieval (SQL prefilter → vector → graph → receipt rank) | CRITICAL |
| 4 | SLD-004 | Extend vs Author-new decision policy and delta-based skill extension | HIGH |
| 5 | SLD-005 | Hot Skills Pack (≤50 per agent template) vs Cold Library (broker-discovered) | HIGH |
| 6 | SLD-006 | Skill vetting/ingestion pipeline (Ingest → Normalize → Static lint → Petri eval → Sign+store → Enable) | HIGH |
| 7 | SLD-007 | Skill telemetry and SkillReceipts as first-class query surface | MEDIUM |
| 8 | SLD-008 | Safety posture: Guard enforces skill metadata/risk_class; high-risk skills require dry-run | CRITICAL |
| 9 | SLD-009 | skill_broker_query_and_select as first-class hot skill | MEDIUM |

---

## Cross-Reference

- **Related existing issues:** `skillpack-importer-quarantine-flow` (quarantine/certify pipeline), `df-009-skill-versioning-contract` (versioning)
- **Related external refs:** anthropics/skills repo, Claude Skills overview docs
- **Related internal concepts:** Tiles posture (content addressing, lineage, verification), Receipt-law, Write Admission Gate, sovereign-kernel
- **Projects affected:** Entif (primary), Rosetta (skill-as-tile model)

---

## Confidence Summary

| Topic | Confidence | Notes |
|-------|-----------|-------|
| 3-tier progressive disclosure | HIGH | Multiple explicit examples, cited Anthropic refs |
| SkillCard schema | HIGH | Full YAML example given, all fields enumerated |
| SKILL.md format | HIGH | Structured body described, cited DeepWiki |
| Broker middleware | HIGH | 4-stage retrieval described in detail |
| Extend vs Author policy | HIGH | Explicit decision tree given |
| Hot/Cold library split | HIGH | Explicit ≤50 constraint, example agent templates |
| Vetting pipeline | HIGH | 6-step pipeline described with checks |
| Safety rules | HIGH | Two explicit rules, Guard enforcement described |
| Skill telemetry | HIGH | Explicit receipts schema and query examples |
| skill_broker_query_and_select | HIGH | Full step-by-step protocol given |

---

*Extracted: 2026-04-25*
*Agent: heartbeat subagent*
*Branch: docs-intelligence/2026-04-25-skill-library-design*
