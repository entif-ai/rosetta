# Assign owners for Text-Core Should-Have items

Issue draft id: `text-core-should-have-owners`
Priority: `P3`
Effort: `S`
Labels: `text-core`, `should-have`, `planning`, `ownership`

## Problem

The Text-Core MVP scope gate lists several Should-Have items, but they do not have implementation owners or sequencing notes. Without explicit ownership, agents may either ignore them indefinitely or accidentally promote them into the Must-Have lane.

## Scope

Define ownership and sequencing for GitHub text import, journal/time-log import, inspector-web trace view, evidence-derived trust scoring, and the NERDm-style resource manifest adapter.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-25-text-core-mvp-scope-gate.md` - Issue Candidates row: "Should-Have items lack implementation owners."
- `docs/backlog/20260424 - Rosetta Text-Core MVP Scope Gate (v0.1).md` - Should-Have section.

## Specific Findings

### Finding 1: Should-Have items need ownership without becoming blockers

The scope gate intentionally keeps these items outside Text-Core Green. The missing step is assigning owners and sequencing so they stay visible without expanding the critical path.

## Acceptance Criteria

- [ ] List each Should-Have item with a proposed owner area or package.
- [ ] Mark whether each item is parallel-safe, post-TC-005, or post-Text-Core Green.
- [ ] Cross-link any promoted issue back to the Text-Core scope gate instead of redefining the Must-Have list.
