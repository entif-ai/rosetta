# SLD-002: Three-Tier Progressive Disclosure Architecture

## Meta

- **Drafted:** 2026-04-25
- **Source:** docs/chats/20260323 - Chat GPT - Entif Skill Library Design.md
- **Extraction:** 2026-04-25-skill-library-design.md (Finding 1, 3, 4)
- **Confidence:** HIGH
- **Labels:** skills, progressive-disclosure, architecture, tier-0, tier-1, tier-2

## Summary

Implement the 3-tier progressive disclosure model for skill loading: Tier 0 (SkillCard stub) → Tier 1 (full SKILL.md spec) → Tier 2 (resources, loaded only when needed). This is the architectural pattern that makes an unbounded skill library scalable — the agent never carries irrelevant skill metadata in context.

## Problem Statement

Without progressive disclosure, the agent's context window becomes a bottleneck as the skill library grows. Loading 100 skills × 100 tokens = 10k tokens of irrelevant metadata on every request. Loading 1000 skills = 100k tokens. Loading 100k skills is impossible.

The solution: only load what the agent needs, when the agent needs it. The broker handles retrieval; the orchestrator handles loading.

## Tier Architecture

### Tier 0: SkillCard (Stub, Always Available to Broker)

- ~100 tokens max per skill
- Broker-indexed for retrieval decisions
- Pre-authorization check by Guard
- Stored in: SQL (faceting), Vector (similarity), Graph (edges)

### Tier 1: SKILL.md Equivalent (Loaded On-Demand When Skill Is Selected)

- Full instruction spec with structured body
- Loaded only AFTER broker returns a candidate AND agent selects it
- NOT preloaded into agent context
- Body structure: Purpose, Non-goals, Preconditions, Steps (constraints + heuristics), Tool usage rules, Acceptance checks, Failure modes / recovery, Examples

### Tier 2: Resources (Loaded Only When Invoked Within Skill Execution)

- code snippets, scripts, templates
- eval fixtures
- reference docs
- domain dictionaries
- Loaded only when skill explicitly requests them via resource handles
- NOT loaded at broker query time

## Loading Flow

```
Agent Need → Broker Query → SkillCard (Tier 0) returned
    → Agent selects skill N
    → Orchestrator loads SKILL.md (Tier 1) for skill N
    → Skill execution may request Tier 2 resources via explicit handles
```

## Key Design Decisions

1. **No global SKILLS.md used as machine-loaded catalog.** Only per-agent-template Hot Skills Pack (≤50 skills) is preloaded. Everything else is broker-discovered.
2. **Resources behind explicit handles.** The orchestrator MUST NOT eagerly load all resources for a skill. Only load when the skill's execution explicitly requests them.
3. **Tier 1 is content-addressed.** SKILL.md is immutable per version. Changing it produces a new version with a new CID.

## Acceptance Criteria

- [ ] SkillCard (Tier 0) is defined and broker-indexed (see SLD-001)
- [ ] SKILL.md (Tier 1) format is defined with structured body spec
- [ ] Tier 2 resource loading is triggered only by explicit resource handles in skill execution
- [ ] No eager loading of Tier 1 or Tier 2 at broker query time
- [ ] Documented loading flow with Guard involvement at each tier transition
- [ ] Hot Skills Pack (≤50 per agent template) is the only exception to "load only on selection"

## Implementation Notes

- This is an architectural pattern, not a single component. It affects: broker, orchestrator, Guard, and storage layer.
- The three tiers map to the three "tiles" already in Rosetta: `skill.card` (Tier 0), `skill.spec` (Tier 1), `skill.resource_pack` (Tier 2).
- Anthropic's public skills repo (`github.com/anthropics/skills`) is the reference implementation.

## Dependencies

- SLD-001 (SkillCard schema)
- SLD-005 (Hot Skills Pack)
- SLD-008 (Guard enforcement at tier transitions)

## Status

issue-candidate
