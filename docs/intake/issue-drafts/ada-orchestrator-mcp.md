# Issue Draft: Implement Ada orchestrator MCP CRUD surface

## Metadata
- **Extracted from:** `docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md`
- **Extraction date:** 2026-04-25
- **Status:** Draft

## Summary
Implement Ada's MCP tool surface: list_agents, create_agent, command_agent, observe, summarize, read_file, write_file. Ada is the orchestrator that owns receipts, routes by MCDA (cost, latency, accuracy, trust), and is the only entity that moves artifacts across boundaries.

## Details
Ada (Orchestrator) responsibilities:
- Realtime CRUD over agents and tools
- Owns receipts — every action routes through Ada
- Routes by MCDA: multi-criteria decision analysis (cost, latency, accuracy, trust scores)
- Fences backend/frontend write access by path
- Only Ada can move artifacts across boundaries (via spec artifacts, not raw code)

Agent roles (fenced, non-negotiable):
- **Sony** (Backend Builder): server code + tests; never writes UI
- **Blink** (Frontend Stylist): UI code + tests; never writes server
- **Cheap-Judge**: 2-sentence action summaries; low-cost gating before escalation
- **Browser Agent** (Critic): verifies acceptance checks; never writes code

MCP tools for Ada:
- `list_agents` — enumerate active sub-agents
- `create_agent` — spawn a named sub-agent with role
- `command_agent` — send a command to a named agent
- `observe` — read current state of an agent or tool
- `summarize` — Cheap-Judge summary of a run or artifact
- `read_file` — read file with path allow-list
- `write_file` — write file with path allow-list (not direct edit; goes through spec)

## Acceptance Checks
- [ ] `list_agents` returns array of {name, role, status}
- [ ] `create_agent` spawns a sub-agent and returns its ID
- [ ] `command_agent` sends a command; agent responds within timeout
- [ ] `observe` returns current state snapshot of agent/tool
- [ ] `summarize` produces 2-sentence summary at low cost
- [ ] `read_file` enforces path allow-list
- [ ] `write_file` enforces path allow-list; creates spec artifact, not raw code
- [ ] Sony cannot write to frontend paths; Blink cannot write to backend paths
- [ ] All actions produce a receipt logged to ledger
