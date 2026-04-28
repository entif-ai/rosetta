# AINL-001: Define Rosetta agent workflow graph IR profile

## Title

Define a Rosetta-native agent workflow graph IR profile.

## Source Evidence Link/Path

- AINL whitepaper: https://www.ainativelang.com/whitepaper
- AINL repository README: https://github.com/sbhooley/ainativelang
- Local synthesis: `docs/intake/competitor-intelligence/ainativelang-2026-04-28.md`

## Existing Representation Check

Related but not identical:

- #240 covers a general conformance test harness gap.
- #69, #74, and #79 cover pack IDs, dependency cycles, and recipes/skills CI.
- `docs/intake/issue-drafts/archive/RLM-001-TILES-rosetta-rlm-tile-extensions.md` covers RLM-specific replayable artifacts.

This candidate is narrower than "build a workflow engine" and broader than pack conformance: it defines the graph shape Rosetta will accept for deterministic agent/workflow runs.

## Entif/Rosetta Mapping

Map AINL's "canonical IR = nodes/edges" design pressure into Rosetta terms:

- Nodes are receiptable workflow steps, not opaque prompt turns.
- Edges are explicit data, control, evidence, and policy dependencies.
- Inputs and outputs are content-addressed artifacts or typed external handles.
- Side-effecting nodes require a guard decision reference.
- The graph is a validation and audit surface before it is a runtime surface.

## Priority

P1 - this is a foundation issue for deterministic agent workflows, execution tapes, replay, and MCP/operator contracts.

## Rationale

Rosetta already has tiles, receipts, guard decisions, and pack conformance. What is missing is a small, named graph profile that says how an agent workflow is represented when it crosses from "conversation" into Rosetta-governed execution. Without that profile, later MCP, replay, and workflow-product work will keep inventing step schemas independently.

## Acceptance Criteria

- [ ] Add a short spec or RFC section defining `rosetta-agent-workflow-graph-v1`.
- [ ] Define required fields for graph id, nodes, edges, inputs, outputs, policy refs, receipt refs, and pack refs.
- [ ] Define edge kinds: `control`, `data`, `evidence`, `policy`, and `side_effect`.
- [ ] Define validation failures for missing node ids, dangling edges, cycles where not allowed, missing guard refs on side-effecting nodes, and missing artifact refs on data/evidence edges.
- [ ] Include at least two valid fixtures and at least four invalid fixtures.
- [ ] Keep the profile Rosetta-native; no AINL syntax, opcodes, or source code are vendored.

## Test Strategy

- Add focused schema or validator tests for valid/invalid graph fixtures.
- Add one fixture that references existing receipt/guard concepts without requiring a live runtime.
- Run the narrowest package or docs-intake validation affected by the spec location.

## Non-Goals

- Do not build a full workflow runtime in this issue.
- Do not import or execute AINL programs.
- Do not replace existing tile, receipt, or pack semantics.
- Do not claim runtime ingestion of competitor material.
