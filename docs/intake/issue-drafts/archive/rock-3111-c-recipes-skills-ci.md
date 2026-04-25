# recipes/ and skills/ subtrees lack CI enforcement

Issue id: `rock-3111-c-recipes-skills-ci`
Priority: `P3`
Effort: `S`
Labels: `packs`, `ci`, `recipes`, `skills`, `enforcement`

## Problem

Section 10 of the RRP contract recommends recipes/ and skills/ as optional pack subtree conventions but explicitly states they are "not RRP pack roots." No CI enforcement is described for these directories, meaning their contents could diverge from the pack contract without detection.

## Source Evidence

- `docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md` — Section 10: "recommended but not RRP pack roots"; no CI enforcement described
- Section 4: core pack structure has validation, but recipes/ and skills/ fall outside that structure

## Specific Findings

### Finding 1: recipes/ and skills/ are unvalidated
These directories can hold arbitrary content with no contract validation, testing, or CI checks. A pack could ship broken recipes or malformed skills with no failure triggered.

**Recommended action:** Add a CI target in the RRP validator that at minimum validates: (a) recipes/ contains valid recipe JSON files, (b) skills/ contains valid skill manifest files. Even if they're not pack roots, they should have a schema.

### Finding 2: Optional status means no enforcement
Because recipes/ and skills/ are "recommended, not required," there's no incentive for pack authors to maintain them correctly — no validation = no quality bar.

**Recommended action:** If these directories exist in a pack, they should conform to a defined schema. If they don't conform, the pack should still be certifiable but the validator should emit a warning.

## Acceptance Criteria

- [ ] RRP validator includes schema check for recipes/ if directory exists
- [ ] RRP validator includes schema check for skills/ if directory exists
- [ ] Non-conforming recipes/skills emit warning, not error (they're optional)
- [ ] CI can run RRP validation as a gate before pack promotion

## Related Issues

- Related: rock-3111-c-refinement-enforcement (both add validation to RRP)
- Related: rock-3111-c-dependency-cycle-detection (both require validator tooling)

## Status

candidate (from PR #37 extraction)