# DF-002: Subagent timeout lacks retry/requeue mechanism

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

Subagent tasks time out after 15 minutes with no retry, no re-queue, and no dead-letter handling. Timed-out tasks are simply marked failed and the main agent receives a task_timed_out event. This means long-running subagent tasks have no recovery path.

## Evidence

From Subagent System section:
> "MAX_CONCURRENT_SUBAGENTS = 3 enforced by `SubagentLimitMiddleware` (truncates excess tool calls in `after_model`), 15-minute timeout"
> "Events: `task_started`, `task_running`, `task_completed`/`task_failed`/`task_timed_out`"

No mention of retry, re-queue, or dead-letter handling for timed-out tasks.

## Implications

- Long-running subagent tasks (code generation, research, multi-step operations) have no second chance
- If the main agent is waiting on a subagent result and it times out, the main agent's task fails
- No visibility into why it timed out (resource contention, infinite loop, external API failure)
- No partial results salvageable from a timed-out task

## Contrast with Message Bus Architecture

The message_bus.py has a pub/sub hub with callbacks for outbound messages, but there's no mention of retry queues or scheduled re-try for failed subagent tasks.

## Recommendations

1. Add a dead-letter queue for timed-out subagent tasks with reason, timestamp, and partial state
2. Add an optional retry policy (max_attempts, backoff_multiplier, jitter)
3. Surface timeout reason to main agent so it can decide whether to retry
4. Add subagent task timeout monitoring to memory system for pattern detection
5. Consider a "pause and resume" mechanism instead of hard timeout for long tasks

## Labels

reliability, subagents, timeout, retry, dead-letter

## Status

issue-candidate