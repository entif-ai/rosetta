# AINL-007: Preserve graph-memory project isolation and typed memory-plane mapping

## Title

Preserve project isolation and typed memory-plane mapping for graph-memory work.

## Source Evidence Link/Path

- AINL Claude Code plugin repository: https://github.com/sbhooley/ainativelang-claudecode
- AINL whitepaper graph-memory addenda: https://www.ainativelang.com/whitepaper
- Existing Rosetta issue: https://github.com/entif-ai/rosetta/issues/807
- Existing Rosetta issue: https://github.com/entif-ai/rosetta/issues/361
- Existing Rosetta issue: https://github.com/entif-ai/rosetta/issues/171
- Local synthesis: `docs/intake/competitor-intelligence/ainativelang-2026-04-28.md`

## Existing Representation Check

Already represented:

- #807 covers truth, temporal, and activation memory-plane separation.
- #361 covers memory adapter certification.
- #171 covers adaptive memory/self-evolution loop.

Keep this as a local refinement note unless those issues need a comment.

## Entif/Rosetta Mapping

The competitor plugin's Episode/Semantic/Procedural/Persona/Failure node set should not be copied directly. Rosetta should map any graph-memory feature through:

- truth plane: immutable receipted artifacts
- temporal plane: transitions and history
- activation plane: recency, frequency, confidence, and recall
- project/workspace isolation: no cross-project leakage without explicit policy
- memory adapter certification: no memory surface gets power before tests

## Priority

P2 - important, but duplicate as a new issue while #807/#361/#171 remain open.

## Rationale

Graph-memory ergonomics are attractive, but Rosetta's risk is collapse: procedural memory, persona state, failure traces, and evidence truth can blur together. The backlog should explicitly preserve project boundaries and plane boundaries before any ergonomic memory layer ships.

## Acceptance Criteria

- [ ] Add project/workspace isolation as a non-negotiable requirement to the relevant memory-plane issue.
- [ ] Require memory node types to declare which plane owns them.
- [ ] Require cross-project memory reads to fail closed unless a policy grants access.
- [ ] Require memory adapter certification fixtures for read, write, search, replay, and degraded-mode behavior.

## Test Strategy

- Existing memory-plane implementation should include cross-project leak tests.
- Adapter certification should include deny-by-default and graceful-degradation cases.

## Non-Goals

- Do not introduce a new memory taxonomy that bypasses truth/temporal/activation.
- Do not store private session traces in a shared graph by default.
- Do not publish as a duplicate issue while #807/#361/#171 are open.
