# AIA-008: 14 SQLite Databases Create Operational Visibility Gap

**Type:** operational / observability
**Confidence:** HIGH
**Severity:** medium
**Source:** `docs/external/Berman - AI Assistant.txt`, Cross-cutting finding + Berman-PRD.md

## Problem

Berman's system operates **14 separate SQLite databases** (from Berman-PRD: interactions-db, cron-log, llm-calls, api-calls, plus social media per-platform DBs, etc.). Each database has its own:
- WAL file and write pattern
- Compaction/archival policy (or none)
- Failure mode
- Health indicator

With 14 separate databases and no operational dashboard described, the system has 14 independent failure points with no holistic view.

## Specific Risks

1. **Write amplification** — if all 14 DBs are on the same disk, they compete for I/O
2. **Storage budget overflow** — no described compaction policy; WAL files grow unboundedly
3. **Failure cascade** — if the disk fills, all 14 databases fail simultaneously
4. **No cross-DB query** — can't ask "show me all recent activity for contact X across all stores" without custom application logic

## Gap

Berman's Platform Health Council (Prompt 22) checks "storage (databases growing too large?)" but this is a binary check (is it too large?) not a taxonomy of what's in each database and why.

## Question for Emilie

What's the current size of the largest Berman SQLite database? Is there a compaction or archival policy in place?

## Suggested Action

1. Document the 14-database taxonomy: what each DB stores, expected size range, compaction policy
2. Add a unified operational state store that aggregates health signals from all 14 DBs
3. Add storage budget alerts per-database with clear thresholds
4. Consider whether some of the 14 DBs could be consolidated (e.g., separate cron-log tables in a single ops.db)

**Labels:** data-silos, sqlite, operational-visibility, storage, observability
**Related:** AIA-006 (auto-discovery gaps), AIA-004 (multi-format RAG complexity)