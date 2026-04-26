# Issue Draft: E2E-003 — Evaluate FastMCP vs TypeScript MCP SDK for Custom Server Implementations

## Type
`technology`

## Summary
Entif 2.0 Enriched recommends FastMCP (Python) for building custom MCP servers. No TypeScript evaluation was performed. We need a structured comparison before committing to a framework for the six proposed custom MCP servers.

## Evidence
From source: "FastMCP (Python) recommended for building thin custom MCP servers; 'decorate functions → server'" and "FastMCP keeps these tiny (decorate functions → server)."

The doc does not evaluate TypeScript alternatives (e.g., `@modelcontextprotocol/sdk`, `fastmcp` has a JS/TS port, or TypeScript-native alternatives).

## Comparison Criteria (proposed)

| Criterion | FastMCP (Python) | TypeScript SDK |
| --- | --- | --- |
| Runtime (Node.js vs Python) | Python ecosystem | Already TypeScript-first workspace |
| Type safety (end-to-end) | Requires py→ts codegen | Native |
| Deployment footprint | Extra runtime | Already deployed |
| Ecosystem maturity | Newer | MCP official SDK |
| Maintenance burden | Two runtimes | One runtime |

## Key Decisions Needed
1. Given Rosetta is TypeScript-first, should custom MCP servers also be TypeScript to avoid a Python runtime dependency?
2. If Python is preferred for some servers, how is the Python runtime managed in production?
3. Should we use `@modelcontextprotocol/sdk` (official) vs `fastmcp` (community) for TypeScript?

## Relations
- Downstream of: Phase 0 (D1-D2) — orchestrator stub
- Upstream of: six custom MCP servers

## Labels
`docs-intelligence`, `mcp`, `tooling`

## Status
`draft`
