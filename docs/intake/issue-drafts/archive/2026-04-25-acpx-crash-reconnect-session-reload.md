# ACP-002: Implement Crash-Reconnect with session/load Semantics in Rosetta Agent Sessions

## Summary

Implement crash-reconnect semantics in Rosetta's agent session management, matching acpx's pattern of detecting dead agent processes, respawning, attempting `session/load`, and falling back to `session/new` on failure.

## Context

Rosetta spawns subagents for tasks (e.g., docs-intelligence extraction). If a subagent process dies mid-task, Rosetta currently has no automatic recovery — the task fails and must be manually retried. This creates fragility in long-running agentic workflows.

`acpx` implements crash-reconnect: "If a saved session pid is dead on the next prompt, acpx respawns the agent, attempts session/load, and transparently falls back to session/new if loading fails."

## Evidence

From `docs/external/acpx.md` — Crash reconnect section:
> If a saved session pid is dead on the next prompt, acpx respawns the agent, attempts `session/load`, and transparently falls back to `session/new` if loading fails.

## Analysis

**Current Rosetta behavior (inferred):**
- Subagent sessions are spawned per task
- No persistent session state across invocations (each spawn is independent)
- Process death = task failure with no automatic recovery
- No session/load or session/new semantics

**Proposed behavior:**
1. Detect that the agent process pid is no longer alive
2. Respawn the agent process
3. Attempt to load the previous session state (if session persistence is implemented)
4. Fall back to creating a new session if load fails
5. Resume the task from the point of failure (or restart with context)

**Implementation requirements:**
- Session state persistence (save after each significant step)
- Pid tracking + heartbeat detection
- Agent respawn mechanism
- session/load vs session/new fallback logic
- Max retry limits to prevent infinite crash loops

**Alignment with existing Rosetta concepts:**
- Rosetta already has a concept of receipts (action evidence logs)
- Receipt persistence could serve as the session state store for crash recovery
- The "evaluate loop" concept (attempt → browser verify → self-fix → escalate) already has retry semantics

## Recommendation

Implement crash-reconnect in Rosetta's agent session layer. The minimum viable version:
1. Track agent pid and heartbeat
2. On pid death detection, respawn agent
3. Attempt session/load with receipt log as session state
4. Fall back to session/new if load fails
5. Resume task with available context

Align with acpx's `session/load` and `session/new` ACP message types.

## Labels

docs-intelligence, fault-tolerance, session-management, resilience

## Depends On

— (can be implemented independently)