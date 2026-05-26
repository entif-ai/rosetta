# SEC-001: Define GuardDecisionToken schema and contract

## Type
`implementation`

## Problem

The Guard Layer design in the Secure Architecture Companion Paper (October 2025) requires a signed decision token emitted by Guard before any task reaches an executor. The token schema (task_id, MCP_uris[], policy_version, nonce, sign, trace_id) must be formally defined before Guard service implementation can proceed.

## Evidence

From `docs/governance/20251026 - Entif 2.0 - Secure Architecture Companion Paper.md`, Section 1:

> "Decision tokens include non-replayable counters or short-lived nonces to prevent reuse or escalation."

Guard token is the core admission credential for the executor admission controller. Missing schema blocks Day 1 Guard service, Day 2 Volcano admission controller, and downstream Guard-integrated tests.

## Acceptance Criteria

- [ ] `GuardDecisionToken` schema defined in `rosetta-schemas` package
- [ ] Fields: `task_id` (string), `mcp_uris` (string[]), `policy_version` (string), `nonce` (string, non-replayable), `signature` (string), `trace_id` (string)
- [ ] Token envelope schema included in TC-005 promotion state machine inputs
- [ ] Token validation logic in a `guard-verifier` utility package
- [ ] Tests: valid token accepted, tampered token rejected, stale/nonce replay rejected

## Priority
`P0`

## Labels
`guard`, `schema`, `bootstrap`, `tc-005`

## Depends On
None (can proceed immediately)
