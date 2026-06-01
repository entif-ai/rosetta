# TULP-002: SDialog → Entif Bridge — Sidecar REST Integration

## Meta

| Field | Value |
|---|---|
| Status | draft |
| Type | integration |
| Priority | medium |
| Area | Tulpamancy Protocol / Infrastructure |
| Discovered in | `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-01-sdialog-tulpamancy.md` |

## Summary

SDialog exposes an OpenAI/Ollama-compatible REST API (`sdialog.server`). This issue tracks the integration bridge between Entif and SDialog as a sidecar service — Entif talks HTTP/MCP to SDialog without deep coupling, enabling the Tulpa Lab capability.

## Problem Statement

- SDialog is a Python service; Entif is not a Python-native system (TypeScript-first per NOT LAME PRD)
- We need Entif to be able to: create personas, run dialog simulations, retrieve results, without SDialog being embedded in Entif's core
- `sdialog.server` provides an HTTP REST interface (OpenAI/Ollama-compatible) that can be MCP-wrapped
- Integration must preserve parse-only-default safety posture: SDialog should not be able to directly call Entif tools or make autonomous changes

## Evidence

From `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md`:

> "Spin it in its own Python service. Use the new `sdialog.server` REST layer (OpenAI/Ollama-ish) so Entif can talk via HTTP or MCP wrapper."

5-step integration sketch from the doc:
1. SDialog as sidecar Python service with REST API
2. Entif ↔ SDialog persona bridge: Entif stores persona config in graph; on spin-up, pulls spec and POSTs to SDialog
3. Simulation-only mode at first — SDialog does NOT call tools directly
4. Wrap outputs (Dialog JSON) in Entif receipts + Cognitive Tiles
5. Promotion gate to live roles

## Proposed Resolution

1. Create ADR: `docs/RFCs/20260601 - ADR-XXXX - SDialog Sidecar Integration.md`
2. Stand up `sdialog.server` as a local Python process (containerized for reproducibility)
3. Write MCP tool wrapper for SDialog endpoints:
   - `sdialog_create_persona(config)` → returns persona_id
   - `sdialog_run_dialogue(persona_ids, scenario, turns)` → returns Dialog JSON
   - `sdialog_get_eval_metrics(dialog_id)` → returns metrics
4. Configure SDialog sidecar in `sdialog.server` mode with no tool-calling enabled
5. Validate API stability with SDialog maintainers or by pinning to known version
6. Add sdialog-sidecar to `tools/` in workspace config

## Dependencies

- TULP-001 (needs schema to bridge)
- Bootstrap TC-005 (for MCP wrapper patterns; use existing MCP patterns from Rosetta)

## Risks

- SDialog REST API is not versioned; breaking changes in updates would break the bridge (mitigate: pin Docker image to specific version tag)
- Python dependency management in a TypeScript-first workspace (mitigate: containerized deployment, no direct import into Entif codebase)
- Network latency between Entif and SDialog sidecar for real-time persona interaction (mitigate: profile; if problematic, consider async dialog mode)

## Labels

`sdialog` `integration` `sidecar` `mcp` `rest-api` `tulpamancy`

## Related Issues

- TULP-001 (needs schema first)
- TULP-003 (Tulpa Lab uses this bridge)
- TULP-006 (parse-only vs live mode boundary enforced here)
