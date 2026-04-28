# AINL-006: Refine MCP validate/compile/run/inspect contract for Rosetta

## Title

Refine Rosetta MCP/operator contract around validate, compile, run, inspect, and health surfaces.

## Source Evidence Link/Path

- AINL repository README: https://github.com/sbhooley/ainativelang
- AINL whitepaper: https://www.ainativelang.com/whitepaper
- Existing Rosetta issue: https://github.com/entif-ai/rosetta/issues/513
- Local synthesis: `docs/intake/competitor-intelligence/ainativelang-2026-04-28.md`

## Existing Representation Check

This is represented by #513 (`ESA-006: Target MCP compliance for Rosetta agent interface layer`). Do not publish this as a new issue unless #513 is closed without covering concrete tool contracts.

## Entif/Rosetta Mapping

AINL's operator-friendly surface suggests a Rosetta MCP/API split:

- `validate`: check graph/profile/manifest without side effects.
- `compile`: convert source or draft material into a Rosetta workflow artifact, still parse-only.
- `run`: execute only when Guard authorizes the requested side-effect posture.
- `inspect`: return graph, receipts, policy refs, and execution tape summaries.
- `health`: expose capability manifest and degraded-mode status.

## Priority

P2 - important operator ergonomics, but should follow workflow graph and strict-valid profile definition.

## Rationale

Rosetta's MCP work will be more usable if it names the core lifecycle verbs early. The risk is premature runtime construction; the safe move is to refine #513 with parse-only and guard-first contracts.

## Acceptance Criteria

- [ ] Add a comment or child issue to #513 mapping lifecycle verbs to Rosetta-native semantics.
- [ ] Define parse-only guarantees for `validate`, `compile`, and `inspect`.
- [ ] Define Guard prerequisites for `run`.
- [ ] Define health/capability output shape without exposing credentials or private local paths.
- [ ] Include fixture responses for success, validation failure, guard denial, and degraded dependency state.

## Test Strategy

- For docs-only refinement, run `pnpm run docs:intake`.
- For MCP implementation, add protocol contract tests for request/response shape and denial behavior.

## Non-Goals

- Do not build a full HTTP service before the graph/profile work exists.
- Do not bypass Guard for convenience.
- Do not create a duplicate issue while #513 is open.
