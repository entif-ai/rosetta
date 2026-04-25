# Issue Draft: CONTRIBUTING.md Does Not Reference the "Done Language" Vocabulary

## Metadata

- **Source document:** `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md`
- **Extraction date:** 2026-04-25
- **Finding type:** `issue-candidate`
- **Tags:** `docs-intelligence`, `governance`

## Problem Statement

The Pasigraphy Protocol v3 Architecture document establishes a precise four-term vocabulary for describing implementation status:
- **implemented** — executable validated mechanism in code
- **modeled** — shape/type/tile exists, no live evidence
- **fixture-backed** — real code over bootstrap/demo data
- **not yet implemented** — conceptual or deferred

This vocabulary is essential for maintaining consistency across documentation and PRs. However, it appears only in the architecture document and the docs-intelligence extraction template — it is not referenced in CONTRIBUTING.md or any other contributor-facing guide.

Contributors who don't read the architecture doc (or this extraction) will not encounter this vocabulary and may use imprecise language in PR descriptions and documentation.

## Evidence

> "Use these phrases precisely" — "Done" Language To Use Carefully

> Vocabulary does not appear in CONTRIBUTING.md or any linked contributor guide.

## Proposed Resolution

1. Add a "Done Language" section to CONTRIBUTING.md (or a linked STANDARDS.md) that reproduces the four-term vocabulary and examples from the architecture doc
2. Optionally link to `docs/intake/docs-intelligence/2026-04-25-pasigraphy-protocol-v3.md` as the canonical source
3. Consider adding this vocabulary check to the PR review checklist

## Labels

`docs-intelligence`, `governance`, `contributor-experience`
