# Issue Draft: Evaluate ACP as Rosetta's Agent-Delegation Protocol Layer

**Source:** `docs/external/acpx.md`  
**Extraction date:** 2026-04-25  
**Draft file:** `docs/intake/issue-drafts/rosetta-acp-interop-strategy.md`

---

## Issue Summary

acpx implements the Agent Client Protocol (ACP) as a structured replacement for PTY scraping when communicating with coding agents. ACP provides typed message envelopes (thinking, tool_calls, diffs), persistent session management, crash recovery, and queue-based prompt orchestration. Rosetta's agent-delegation strategy should be evaluated against ACP as either an adoption target or an interop layer.

---

## Evidence

From `docs/external/acpx.md`:

> "acpx is a headless CLI client for the Agent Client Protocol (ACP), so AI agents and orchestrators can talk to coding agents over a structured protocol instead of PTY scraping."

Key capabilities relevant to Rosetta:
1. **Structured output** — typed ACP messages replace ANSI parsing
2. **Crash reconnect** — session survives agent process restarts via `session/load` / `session/new` fallback
3. **Prompt queueing** — cooperative multi-prompt orchestration with TTL
4. **Named parallel sessions** — multi-workstream support per repo
5. **Soft-close** — session state preserved without live process
6. **Permission controls** — `fs/*` and `terminal/*` handlers with cwd sandboxing
7. **14 built-in agent adapters** — broad coverage including openclaw

---

## Recommendation

Rosetta should conduct a formal evaluation of ACP as the protocol layer for its agent-delegation architecture:

1. Assess ACP spec version and coverage relative to Rosetta's delegation requirements
2. Determine whether to adopt acpx directly, wrap it, or implement ACP natively
3. Identify gaps between ACP's session model and Rosetta's desired workflow model
4. Evaluate authentication requirements across heterogeneous agents
5. Define the upgrade path if ACP is adopted before it stabilizes (alpha warning applies)

---

## Priority

medium-high

---

## Labels

- strategy
- acp
- agentic-tooling
- interop

---

## Dependencies

- Requires access to full ACP specification (agentclientprotocol.com)
- Depends on resolution of `acp-coverage-roadmap-access` issue (obtaining or replicating the coverage roadmap)

---

## Notes

The alpha stability warning in acpx ("CLI/runtime interfaces are likely to change") is a material risk for hard-coupled integrations. Version pinning and interface monitoring should be part of any adoption plan.