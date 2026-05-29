# OB1-006: First Recipe Wave (10 Recipes) Not Scaffolded

## Meta

- **Type:** implementation
- **Severity:** medium
- **Confidence:** high
- **Tags:** recipes, implementation-targets, receipts
- **Source doc:** `docs/governance/20260410 - OpenBrain OB1 Assimilation Addendum (v0.1).md` §3
- **Extracted:** 2026-05-26

## Summary

Section 3 of the OB1 Assimilation Addendum names 10 approved recipes for the first wave, each dry-run-first and receipt-bearing. The addendum states these should be implemented as reusable workflow units with goal, prerequisites, typed inputs, and steps. However, the `recipes/` directory may not exist and no implementation of these recipes has started.

## Evidence

From §3, the approved first-wave recipes are:
1. Provenance bundle verification
2. Chatlog ingest
3. ArXiv ingest
4. Journal ingest
5. YouTube transcript ingest
6. Social thread ingest
7. Dedupe-revision refinery recipe
8. Schema-aware routing refinery recipe
9. Tapestry compile recipe
10. TruthLint dry-run recipe

The `recipes/` directory was one of 7 immediate implementation actions in §10, item 1. It is unclear if this directory exists in the current codebase.

No issues found in the backlog specifically tracking these 10 recipe implementations.

## Response Options

### Option A: Scaffold recipes/ directory and create tracking issues
Create the `recipes/` directory with the contribution folder contract (README.md, metadata.json, acceptance.md, examples/, tests/) and create individual tracking issues for each of the 10 recipes.

**Pros:** Full accountability; clear project board visibility; follows contribution grammar.

**Cons:** 10 new issues may be heavy; could be consolidated into a single epic.

### Option B: Create epic and one implementation PR per recipe
Create an epic issue for the first recipe wave and implement recipes incrementally via separate PRs as capacity allows.

**Pros:** Flexible; can ship recipes piecemeal; avoids big-bang PR.

**Cons:** May not maintain the urgency implied by the §10 action list.

### Option C: Defer to later phase
Mark OB1-006 as deferred; recipes are important but not blocking current TC work.

**Pros:** Focuses on critical path (TC-001-007).

**Cons:** OB1 addendum requirements remain unfilled; governance doc shows this as immediate action.

## Recommended Response

Option A (scaffold and track) is recommended. The recipes are explicitly named in the governance doc and represent concrete deliverables. Each recipe should follow the contribution folder contract.

## Dependencies

- Blocked by: OB1-001 (tracking gap; need tracking mechanism)
- Can proceed in parallel with: TC-001-007 development
