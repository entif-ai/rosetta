# Refinement-first rule has no automated enforcement mechanism

Issue id: `rock-3111-c-refinement-enforcement`
Priority: `P2`
Effort: `M`
Labels: `packs`, `core-stability`, `enforcement`, `validation`

## Problem

The RRP contract states: "Packs MUST extend core semantics without redefining or silently mutating Rosetta core meanings." This is a semantic stability guarantee, but no automated enforcement mechanism is described. Violations would only be caught by human review, not by CI tooling.

## Source Evidence

- `docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md` — Section 4.1: refinement-first rule stated but no tooling described
- Section 8: compliance section mentions "validation tooling" but doesn't specify what it checks

## Specific Findings

### Finding 1: No automated validation for refinement rule
The refinement-first rule is stated as a MUST in the contract but there's no tooling described to detect violations — e.g., a pack that redefines a core term would only be caught manually.

**Recommended action:** Specify or create a validation step that compares pack terms against a published Rosetta core glossary. Any overlap with core terms not explicitly marked as "extended by pack" should be flagged.

### Finding 2: "Silent mutation" definition is ambiguous
The rule forbids "silently mutating Rosetta core meanings" but "silently" is not defined operationally. A pack could extend a term in a way that subtly shifts its meaning without an explicit redefinition.

**Recommended action:** Add explicit definition: any term in a pack's namespace that matches a Rosetta core term must be declared as `extends: <core-term>` in the pack metadata. Undeclared matches = violation.

## Acceptance Criteria

- [ ] Validation tooling is specified or created that checks pack namespace against core glossary
- [ ] Silent mutation is defined operationally (not just stated as a rule)
- [ ] CI can run the validation as part of pack certification

## Related Issues

- Depends on: ROCK-3111-C pack.json validator (from Project Board Suggestions in extraction)
- Related: rock-3111-c-pack-id-placeholder (pack identity resolution)

## Status

candidate (from PR #37 extraction)