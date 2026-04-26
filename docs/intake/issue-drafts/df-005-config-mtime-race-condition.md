# DF-005: Config mtime reload race condition between LangGraph and Gateway

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

get_app_config() caches parsed config but reloads when the file's mtime increases. If the config file changes between when LangGraph reads it and when Gateway reads it, or between a read and a write within the same process, the two services could end up with different config state. No file locking or atomic reload mechanism is mentioned.

## Evidence

From Configuration System section:
> "Config Caching: `get_app_config()` caches the parsed config, but automatically reloads it when the resolved config path changes or the file's mtime increases. This keeps Gateway and LangGraph reads aligned with `config.yaml` edits without requiring a manual process restart."

No mention of file locking, atomic operations, or cross-process synchronization.

## Implications

- If config.yaml is updated while both LangGraph and Gateway are running, they might reload at different times
- If Gateway reloads first and then LangGraph reloads from the same file, they could briefly diverge
- No atomic "read-modify-write" cycle for config updates — if the file is truncated during a write, services could read partial content
- The "atomic reload" described is based on mtime only, which is not a reliable cross-process synchronization mechanism on all filesystems

## Specific Scenarios

1. User edits config.yaml with an editor that writes atomically to a temp file then renames — mtime changes but content is valid
2. User edits config.yaml with an editor that writes in-place — during write, content is partially invalid but mtime may or may not have updated
3. Two processes (Gateway and LangGraph) both detect mtime change and both try to reload simultaneously — no coordination

## Recommendations

1. Add file-based locking (fcntl.flock or equivalent) around config reads/writes
2. Use atomic file operations (write to temp file, then atomic rename)
3. Add a config version counter that both services must agree on before applying changes
4. Consider a config service that owns all config state and pushes updates to subscribers
5. Add a config validation step after reload to catch malformed config before applying

## Labels

config, concurrency, race-condition, reload, file-system

## Status

issue-candidate