# Issue: Define RPP Task Numbering Reference

## Type
issue-candidate

## Labels
documentation, RPP, sequencing

## Depends On
none

## Evidence

The Pro-tier Deep Research Master Prompt references tasks numbered 1-19 in its Phase 6 execution order:

> "You MUST explicitly preserve this ordering logic:
> 1. tasks 1, 2, 3, 5, 4 first
> 2. then 6 and 7
> 3. then 8 and 19
> 4. then 9 and 18
> 5. then 10, 11, 13
> 6. then parallelize 14, 15, 16, 17"

This sequencing constraint is load-bearing — it determines build priority across the MVP. However, no document in the Rosetta corpus defines what tasks 1 through 19 actually are. The task IDs appear in:

- `docs/intake/docs-intelligence/2026-04-25-entif-rosetta-prds-pro-extended-research.md` (this extraction)
- `docs/chats/20260410 - Entif and Rosetta PRDs - ChatGPT - Pro-Extended Research.md` (source chat)

Without a canonical task list that maps numbers to named work items, the sequencing constraint is unenforceable: any implementor could interpret the ordering arbitrarily.

## Suggested Action

Create `docs/reference/RPP-task-map.md` (or similar) that:
1. Lists all 19 RPP task IDs with their canonical names and brief descriptions
2. Maps each to the relevant package/area
3. Is referenced by the extraction ledger as the authoritative source for task sequencing

## Priority
high

## Status
open
