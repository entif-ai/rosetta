# ACP-001: Adopt acpx as Rosetta's Standard Agent Delegation Mechanism (Replace PTY Scraping)

## Summary

Evaluate adopting `acpx` as the primary mechanism for delegating work to coding agents within Rosetta, replacing current PTY-scraping patterns.

## Context

Rosetta's docs-intelligence subagents currently delegate to coding agents via PTY session scraping — watching ANSI output from a pseudo-terminal to extract tool calls, results, and status. This pattern is fragile, non-structured, and requires brittle screen-scraping to extract information.

`acpx` is a headless CLI client for the Agent Client Protocol (ACP) that provides structured communication with ACP-compatible coding agents (Pi, OpenClaw ACP, Codex, Claude Code, and 11 others) via typed JSON messages (thinking, tool calls, diffs) instead of ANSI scraping.

The doc states: "AI agents and orchestrators can talk to coding agents over a structured protocol instead of PTY scraping."

## Evidence

From `docs/external/acpx.md`:
- "talk to coding agents over a structured protocol instead of PTY scraping" — core value proposition
- Structured output (JSON NDJSON events) with typed ACP messages
- 15 built-in agent adapters via ACP
- Multi-turn persistent sessions with crash reconnect

## Analysis

**Benefits:**
- Eliminates fragile PTY scraping in favor of structured ACP messages
- Unified surface across 15 built-in agents (Pi, OpenClaw, Codex, Claude, Gemini, Cursor, Copilot, Droid, iFlow, Kilocode, Kimi, Kiro, OpenCode, Qwen)
- Persistent sessions survive across invocations (better context continuity for long tasks)
- Crash reconnect preserves session investment
- Queue-based cooperative concurrency eliminates race conditions
- Fire-and-forget via `--no-wait` for non-blocking delegation

**Risks / Open Questions:**
- Bootstrap paradox: acpx requires npm to install, but agents without npm can't self-boot. How does Rosetta resolve this?
- OpenClaw already has a native `openclaw acp` command. Which is the preferred integration path?
- acpx stores sessions under `~/.acpx/sessions/` — how does this map to Rosetta's memory planes?
- Dependency on an external open-source project (openclaw/acpx) adds an upstream risk vector

## Decision Criteria

1. Does acpx's structured ACP messaging materially improve over Rosetta's current PTY-scraping delegation?
2. Can the bootstrap paradox be resolved (e.g., via npx pre-installed in base images)?
3. Is the OpenClaw native ACP bridge (`openclaw acp`) preferred over the acpx wrapper for OpenClaw-internal delegation?
4. Does the added external dependency (acpx npm package) introduce unacceptable upstream risk?

## Recommendation

Evaluate acpx as the delegation mechanism for Rosetta's next agent-onboarding workflow. Run a spike: use acpx to delegate a docs-intelligence extraction task to a coding agent and compare the experience against PTY scraping. If the structured output and session persistence prove valuable, adopt acpx as the standard; document the bootstrap solution for agents that lack npm.

## Labels

docs-intelligence, acpx, delegation, protocol

## Depends On

—