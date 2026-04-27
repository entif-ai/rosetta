# DF-010: Redis-free JSON file persistence may bottleneck under high concurrency

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

DeerFlow uses JSON file persistence for thread/channel state mapping (channel:chat → thread_id) and memory storage. No Redis or other database is used. Under high concurrency with many threads being created simultaneously, JSON file writes could serialize and become a bottleneck. Additionally, JSON file I/O has no transaction semantics — partial writes could corrupt state.

## Evidence

From IM Channels System > Store:
> "store.py - JSON-file persistence mapping `channel_name:chat_id[:topic_id]` → `thread_id` (keys are `channel:chat` for root conversations and `channel:chat:topic` for threaded conversations)"

From Memory System:
> "Data Structure (stored in `backend/.deer-flow/memory.json`)"

No mention of Redis, SQLite, or any database system.

## Implications

- JSON file writes are I/O bound and serialize on the file system
- Under high thread creation rate, store.py writes could queue up and delay responses
- No transaction semantics: if a write is interrupted, JSON file could be corrupt
- No atomic multi-key updates: updating two threads' state isn't atomic
- No connection pooling or caching — each read/writes directly to disk
- memory.json grows without bound unless explicitly compacted (no mention of compaction)

## Specific Concerns

1. store.py maps are updated on every new thread creation across all channels
2. memory.json is updated asynchronously but still writes to disk (atomic via temp file + rename, but frequency unknown)
3. No read replicas or caching — every read hits the file system
4. No query language — lookups are exact key match only; no range queries or aggregation

## Contrast with NOT LAME

NOT LAME explicitly requires PostgreSQL as canonical registry with proper transaction semantics, connection pooling, and query capabilities.

## Recommendations

1. Add a Redis layer for high-frequency reads/writes (thread lookup cache)
2. Add compaction/archival for memory.json as it grows
3. Add file locking around store.py updates to prevent corruption
4. Consider SQLite as a midpoint (transactions + local file) if Redis is too heavy
5. Add metrics on file I/O latency to detect when this becomes a bottleneck
6. Add a write-ahead log (WAL) for store.py to handle crash recovery

## Labels

scalability, persistence, concurrency, json-file, bottleneck

## Status

issue-candidate