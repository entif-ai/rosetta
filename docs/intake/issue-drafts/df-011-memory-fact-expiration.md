# DF-011: No fact expiration or staleness mechanism in memory system

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

Memory system stores facts with id, content, category, confidence (0-1), createdAt, and source. But there is no mention of TTL, expiration, staleness detection, or automatic fact retirement. Facts accumulate forever unless manually deleted. High-confidence facts that are outdated could continue to be injected into prompts incorrectly.

## Evidence

From Memory System section:
> "**Facts**: Discrete facts with `id`, `content`, `category` (preference/knowledge/context/behavior/goal), `confidence` (0-1), `createdAt`, `source`"

No TTL, no expiration, no staleness detection mentioned.

## Implications

- Memory.json grows unbounded over time
- Outdated facts with high confidence are injected into prompts and could mislead the agent
- "User prefers dark mode" from 2 years ago could override a recent preference change
- No mechanism to detect conflicting facts (same entity, different values at different times)
- No garbage collection or archival for old facts

## Specific Scenarios

1. User changes their name — old name fact persists indefinitely
2. A project deadline changes — old deadline fact could be retrieved ahead of new one
3. User's preferences evolve — old preference facts not invalidated when new ones are added

## Contrast with NOT LAME

NOT LAME's memory sovereignty map has 5 layers including Plane 2 (temporal/history) which would presumably handle fact lifecycle. Rosetta's memory planes also have temporal awareness.

## Recommendations

1. Add fact TTL: configurable expiration time per category (e.g., preferences last 90 days, knowledge last forever)
2. Add staleness scoring: facts with old createdAt but high confidence get flagged
3. Add conflict detection: when a new fact contradicts an existing one, mark old as superseded rather than keeping both
4. Add compaction: periodically remove expired facts and merge superseded facts
5. Add fact version chain: each fact update creates a new version linked to the previous
6. Add injection logic that prefers recent facts over old ones even if old has higher confidence

## Labels

memory, lifecycle, staleness, ttl, fact-expiration, memory-management

## Status

issue-candidate