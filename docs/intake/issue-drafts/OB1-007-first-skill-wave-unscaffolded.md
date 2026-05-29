# OB1-007: First Skill Wave (8 Skills) Not Scaffolded

## Meta

- **Type:** implementation
- **Severity:** medium
- **Confidence:** high
- **Tags:** skills, implementation-targets, behavior-packs
- **Source doc:** `docs/governance/20260410 - OpenBrain OB1 Assimilation Addendum (v0.1).md` §4
- **Extracted:** 2026-05-26

## Summary

Section 4 of the OB1 Assimilation Addendum names 8 approved skills as the first wave, each as a behavior pack that packages role capability into a distributable unit. The section establishes that skills must meet criteria for acceptance (goal, prerequisites, typed inputs, steps, traces, acceptance tests). The `skills/` directory may not exist and no skill implementation has started.

## Evidence

From §4, the approved first-wave skills are:
1. Rosetta truthlint skill
2. Rosetta graphiti skill
3. Rosetta muninn skill
4. Rosetta refinery skill
5. Rosetta tapestry compile skill
6. Rosetta truthcraft diagnostic skill
7. Rosetta context-surfacing skill
8. Rosetta deduplication skill

The `skills/` directory was one of 7 immediate implementation actions in §10, item 1. It is unclear if this directory exists in the current codebase.

No issues found in the backlog specifically tracking these 8 skill implementations.

## Response Options

### Option A: Scaffold skills/ directory and create tracking issues
Create the `skills/` directory with the contribution folder contract and create individual tracking issues for each of the 8 skills.

**Pros:** Full accountability; clear project board visibility; follows contribution grammar.

**Cons:** 8 new issues; could be consolidated into a single epic.

### Option B: Create epic and one implementation PR per skill
Create an epic issue for the first skill wave and implement skills incrementally via separate PRs.

**Pros:** Flexible; can ship skills piecemeal; avoids big-bang PR.

**Cons:** May not maintain urgency implied by §10 action list.

### Option C: Defer to later phase
Mark OB1-007 as deferred; skills work may depend on the recipe wave and TC-001-007.

**Pros:** Focuses on critical path.

**Cons:** OB1 addendum requirements remain unfilled.

## Recommended Response

Option A (scaffold and track) is recommended. Skills are explicitly named in the governance doc and represent concrete capability deliverables. Skills can be scaffolded in parallel with the recipe wave.

## Dependencies

- Blocked by: OB1-001 (tracking gap; need tracking mechanism)
- Can proceed in parallel with: OB1-006 (recipe wave), TC-001-007 development
