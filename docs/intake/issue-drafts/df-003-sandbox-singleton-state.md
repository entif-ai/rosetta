# DF-003: Local sandbox singleton may have mutable state concurrency risk

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

LocalSandboxProvider is explicitly a singleton that manages local filesystem execution with path mappings. The singleton pattern with multiple concurrent threads all sharing the same provider instance could have mutable shared state beyond the static path mappings. No thread-safety mechanism is mentioned.

## Evidence

From Sandbox System section:
> "LocalSandboxProvider - Singleton local filesystem execution with path mappings"

And:
> "Detection: `is_local_sandbox()` checks `sandbox_id == "local"`

No mention of thread-safety, locking, or atomic operations on the singleton instance.

## Implications

- If LocalSandboxProvider holds any mutable state beyond the static path mapping (e.g., connection handles, caches, counters), concurrent thread access could cause race conditions
- A thread that modifies shared state while another thread reads it could get incorrect path translation
- Could cause cross-thread data leakage if the singleton maintains per-thread state incorrectly

## Specific Concerns

1. Path mapping dictionary: is it read-only after initialization? If not, concurrent writes cause corruption
2. Any caching layer in the provider: stale reads across threads
3. `is_local_sandbox()` checks `sandbox_id == "local"` — if sandbox_id is mutable and not thread-safe, this check could return incorrect results

## Recommendations

1. Audit LocalSandboxProvider for any mutable state beyond initialization-time path mapping
2. Make path mapping immutable after construction (frozen dict or equivalent)
3. Add concurrency tests that simulate multiple threads accessing the sandbox simultaneously
4. If mutable state is required, add proper locking (threading.Lock or equivalent)
5. Document the thread-safety guarantees (or lack thereof) clearly

## Labels

concurrency, sandbox, singleton, thread-safety, local-sandbox

## Status

issue-candidate