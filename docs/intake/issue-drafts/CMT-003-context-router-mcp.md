# CMT-003: Build Context Router as First-Class MCP Retrieval Service

## Metadata

- **Type:** implementation
- **Status:** draft
- **Labels:** `context-management`, `mcp`, `retrieval`, `implementation`
- **Evidence:** `docs/chats/20260301 - Chat GPT - Context Management Techniques.md` (Finding T5)
- **Extraction:** `docs/intake/docs-intelligence/2026-06-01-context-management-techniques.md`
- **Depends on:** CMT-001

## Summary

Build a Context Router as an MCP server / retrieval service that makes context retrieval executable policy, not advisory vibes. Implements the 5 core tools from the white paper: list_subsystems, map_subsystem_files, find_relevant_context, search_docs, suggest_agent.

## Problem Statement

Without an executable retrieval mechanism, agents either retrieve context inconsistently or don't retrieve at all. "If retrieval is a vibe, it won't happen. If retrieval is a tool call, it becomes policy."

## Proposed Resolution

1. Implement a Context Router MCP server with these tools:
   - `list_subsystems` — enumerate all Tier 3 subsystem documents
   - `map_subsystem_files` — given a subsystem, list all relevant files
   - `find_relevant_context` — given a task, retrieve relevant context from Tier 3 docs
   - `search_docs` — full-text search across all context artifacts
   - `suggest_agent` — given a task, suggest which specialist agent should handle it

2. Integrate with GuardLayer / orchestrator so retrieval is:
   - Mandatory when uncertainty is detected (new module, high-risk area, missing invariants)
   - Logged as a first-class event
   - Treated as a security-equivalent failure when context is missing

3. Initially keyword-based (paper's approach); can be upgraded to semantic/vector search later

## Acceptance Criteria

- [ ] Context Router MCP server is implemented and registered
- [ ] All 5 tools are functional
- [ ] Retrieval is wired into orchestrator as mandatory on high-risk paths
- [ ] Context misses are logged and escalated
- [ ] Basic test harness: trigger router on sample tasks, verify correct context is returned

## Dependencies

- CMT-001 (3-tier architecture)
- MCP infrastructure in OpenClaw

## Related Issues

- CMT-001, CMT-004, CMT-006
- NOT LAME: Context Compiler + Query Router
