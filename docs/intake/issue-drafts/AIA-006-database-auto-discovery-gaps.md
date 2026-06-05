# AIA-006: Database Auto-Discovery Doesn't Cover Critical Systems

**Type:** spec-gap / reliability
**Confidence:** MEDIUM
**Severity:** medium
**Source:** `docs/external/Berman - AI Assistant.txt`, Finding AIA-009

## Problem

Berman's Database Backups spec auto-discovers SQLite databases via file pattern matching:
> "Auto-discover all SQLite databases in the project (no manual config needed, new databases get picked up automatically)"

Auto-discovery via file patterns only catches databases that:
- Are regular files on the filesystem (not custom VFS)
- Follow the expected naming pattern (e.g., `*.db`, `*.sqlite`)
- Are opened from a known path (not in-memory-only)

Auto-discovery **will not** catch:
1. **Custom VFS SQLite databases** — opened via `sqlite3_open_v2()` with a custom VFS
2. **In-memory databases** — `sqlite3_open(":memory:")` or `:temp:`
3. **Databases opened through foreign keys in other DBs** — when DB-A opens DB-B via foreign key, DB-B's path may not be discoverable from filesystem scan
4. **Network-mounted databases** — if the DB is on a mounted volume with different semantics

## Gap

For critical systems like the DI ledger or knowledge graph, missed backups are catastrophic. Auto-discovery is appropriate for opportunistic backup of user data files, but not for mission-critical data stores.

## Suggested Action

1. For the DI ledger (`rosetta-di-ledger.md` in workspace), add explicit backup configuration
2. For any database opened via a path that isn't a simple file (custom VFS, foreign key reference), require explicit `backup-spec.json` entry
3. Document the auto-discovery limitations in the backup system's README

**Labels:** backups, sqlite, auto-discovery, reliability, critical-data
**Related:** AIA-002 (Gmail quota cost model)