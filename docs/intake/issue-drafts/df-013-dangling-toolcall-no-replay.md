# DF-013: DanglingToolCall middleware marks interrupted tool calls but doesn't replay them

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

DanglingToolCallMiddleware injects placeholder ToolMessages for AIMessage tool_calls that lack responses (e.g., due to user interruption). This marks the interruption gracefully but does not replay the tool call when the user provides a response. The interrupted tool call is effectively lost.

## Evidence

From Middleware Chain section:
> "DanglingToolCallMiddleware - Injects placeholder ToolMessages for AIMessage tool_calls that lack responses (e.g., due to user interruption)"

No mention of replay, resume, or re-execution of the interrupted tool call.

## Implications

- User interrupts a long-running tool call (e.g., file search, code generation)
- Middleware marks it as "interrupted" with placeholder
- User provides additional context or changes direction
- The original tool call never completes — its partial results are lost
- If the original intent was to execute that tool, it must be manually re-invoked by the user or re-synthesized by the agent

## Contrast with Subagent Timeout

Subagent timeout marks tasks as failed and notifies the main agent. The main agent can then decide to retry. DanglingToolCall does not provide this — the tool call is just silently marked as having no result.

## Recommendations

1. Add a tool call queue: interrupted tool calls are re-queued and available for replay
2. Add an explicit "resume interrupted tool" mechanism: agent can choose to replay
3. Add partial result capture: even if tool call is interrupted, capture what it computed so far
4. Add user-facing UI: "You interrupted this operation. Would you like to resume it?"
5. Consider a "tool call checkpoint" that saves intermediate state for resumable operations

## Labels

middleware, tool-calls, interruption, replay, resume, reliability

## Status

issue-candidate