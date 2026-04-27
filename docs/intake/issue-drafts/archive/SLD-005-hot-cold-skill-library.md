# SLD-005: Hot Skills Pack vs Cold Library — Two-Level Skill Registry

## Meta

- **Drafted:** 2026-04-25
- **Source:** docs/chats/20260323 - Chat GPT - Entif Skill Library Design.md
- **Extraction:** 2026-04-25-skill-library-design.md (Finding 9, 14)
- **Confidence:** HIGH
- **Labels:** skills, hot-pack, cold-library, agent-template, registry, context-window

## Summary

Implement a two-level skill registry: (A) Hot Skills Pack — a ≤50-skill always-loaded set per agent template, stored in markdown and preloaded into agent context; (B) Cold Library — an unbounded broker-indexed skill store, never preloaded, only discovered via the broker. This is the key to scaling to 100k+ skills without context-window blowup.

## Problem Statement

Loading all skill metadata into context is not scalable. Even at 100 tokens per skill:
- 100 skills = 10k tokens
- 1,000 skills = 100k tokens
- 100,000 skills = 10M tokens (impossible)

Crates's requirement: "at most, perhaps only the top 50 or less that are used extremely commonly by that class/template of agent instance."

The solution: a two-level registry where Hot Skills are always in context, and Cold Skills are broker-discovered on demand.

## Level A: Hot Skills Pack (Always Loaded)

### Definition

- ≤ 50 skills per agent template
- Loaded into agent context as markdown (or equivalent structured format)
- Loaded at agent initialization, always available
- Does NOT require broker lookup

### Contents

Hot Skills should be:
1. **Constantly invoked** across that agent class
2. **Infrastructural** — routing, brokering, receipts, safety checks, Guard interactions
3. **Bootstrapping primitives** — skills that work even when the broker is down

### Per-Agent Template Customization

Each agent template defines its own Hot Skills Pack:

**Example: Research Scout template**
- `skill_broker_query_and_select` (hot)
- `web_search_and_summarize` (hot)
- `citation_discipline` (hot)
- `receipt_emit` (hot)
- `guard_check` (hot)

**Example: Repo Maintainer template**
- `skill_broker_query_and_select` (hot)
- `git_workflow` (hot)
- `ci_triage` (hot)
- `patch_etiquette` (hot)
- `receipt_emit` (hot)

### Storage

Hot Skills Pack is stored as a markdown file (or equivalent) per agent template:
```
configs/agent-templates/research-scout/hot-skills.md
configs/agent-templates/repo-maintainer/hot-skills.md
```

This file contains the full Tier 1 specs (not just cards), because there are so few of them.

## Level B: Cold Library (Broker-Discovered)

### Definition

- Unbounded number of skills
- Metadata stored in broker indexes (SQL, Vector, Graph)
- Agent NEVER sees their metadata in bulk
- Only discovered via broker query when Hot Skills Pack doesn't cover the need

### Storage Layers

- **SQL:** SkillCard fields for fast faceting
- **Vector:** `one_line + triggers + distilled spec summary` for semantic search
- **Graph:** dependency/conflict edges, category taxonomy
- **Object store:** Full Tier 1 + Tier 2 artifacts (not in context)

## The Rule

> **No global `SKILLS.md` used as a machine-loaded catalog.**
> Only per-agent-template Hot Skills Pack is preloaded.
> Everything else is broker-discovered.

## Acceptance Criteria

- [ ] Hot Skills Pack defined per agent template (≤ 50 skills each)
- [ ] Hot Skills Pack loaded into agent context at initialization (full Tier 1 specs, not just cards)
- [ ] Cold Library has no size limit (100k+ skills design target)
- [ ] Cold Library skills never preloaded into agent context
- [ ] Broker query is the ONLY way to discover Cold Library skills
- [ ] `skill_broker_query_and_select` is a mandatory hot skill in every template
- [ ] Agent template system supports hot pack customization (add/remove/reorder)
- [ ] Cold Library skills can be "promoted" to Hot Skills Pack based on usage frequency (receipts)

## Implementation Notes

- Hot Skills Pack is essentially a static config per agent template, not a dynamic index.
- The broker does NOT search Hot Skills Pack — Hot Skills are already in context. Broker only searches Cold Library.
- Crates's rule: even metadata at 100 tokens/skill fills context with irrelevant skills. The Hot Pack is the ONLY preloaded set.

## Dependencies

- SLD-003 (skill broker)
- SLD-009 (skill_broker_query_and_select hot skill)
- Agent template system (existing or TBD)

## Status

issue-candidate
