# DF-012: No thread state persistence strategy documented for restarts

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

ThreadState schema is documented (extends AgentState with sandbox, thread_data, title, artifacts, todos, uploaded_files, viewed_images). The embedded client mentions `checkpointer` parameter for state persistence. But there's no documented strategy for how thread state survives LangGraph server restarts, and no clear checkpointer configuration in the main deployment.

## Evidence

From Agent System section:
> "ThreadState extends `AgentState` with: `sandbox`, `thread_data`, `title`, `artifacts`, `todos`, `uploaded_files`, `viewed_images`"

From Embedded Client section:
> "Supports `checkpointer` parameter for state persistence across turns"

No checkpointer configured in the main LangGraph deployment described in the architecture.

## Implications

- If LangGraph server restarts, thread state is lost (unless checkpointer is configured and not mentioned)
- Users could lose conversation context mid-task after a server restart
- No documented recovery procedure for thread state after crash
- Artifacts and todos accumulated in a thread could be lost

## Specific Concerns

1. ThreadDataMiddleware creates per-thread directories on first access — if server restarts, those directories persist but the in-memory thread state mapping may not
2. Memory queue (debounced) could lose in-flight updates if server crashes before they're written
3. Subagent tasks in progress at restart time have no recovery mechanism (per DF-002)

## Recommendations

1. Document the checkpointer configuration and confirm it's enabled in production deployment
2. Add thread state recovery: on server restart, reload thread state from checkpointer store
3. Add a durability guarantee for memory updates: synchronous write before next interaction
4. Document the recovery procedure for users whose threads were in-progress during a restart
5. Add thread state snapshot interval so restarts don't lose all recent progress

## Labels

thread-state, persistence, restart, recovery, checkpointer

## Status

issue-candidate