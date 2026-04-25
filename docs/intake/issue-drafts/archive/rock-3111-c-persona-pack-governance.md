# PersonaPack "elevated governance" is undefined

Issue id: `rock-3111-c-persona-pack-governance`
Priority: `P3`
Effort: `L`
Labels: `packs`, `governance`, `persona-pack`, `definition`

## Problem

The RRP contract introduces "PersonaPack — identity/persona/council pack (non-core; elevated governance applies)" as a pack category but provides no definition of what "elevated governance" actually means, what requirements it imposes, or how it differs from standard pack governance.

## Source Evidence

- `docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md` — Section 5.2: PersonaPack introduced with no specifics
- Section 10: "elevated governance" mentioned but not elaborated

## Specific Findings

### Finding 1: Elevated governance not defined
The phrase "elevated governance applies" appears in the contract but is never defined. Questions: elevated relative to what? Who decides when elevated governance is required? What does it require?

**Recommended action:** Define "elevated governance" explicitly in the RRP spec — at minimum: what triggers it, who enforces it, and what criteria must be satisfied.

### Finding 2: PersonaPack boundaries unclear
PersonaPack is described as "identity/persona/council pack" but it's unclear what constitutes a PersonaPack vs a standard GovernancePack or other pack type.

**Recommended action:** Add explicit criteria for when a pack is classified as PersonaPack vs other types. Provide examples.

## Acceptance Criteria

- [ ] "Elevated governance" is defined with specific requirements
- [ ] PersonaPack classification criteria are explicit
- [ ] Boundaries between PersonaPack and GovernancePack are clear
- [ ] Who enforces elevated governance is specified

## Related Issues

- Related: open question from extraction — "What is the exact scope of elevated governance required for PersonaPack vs GovernancePack?"

## Status

candidate (from PR #37 extraction)