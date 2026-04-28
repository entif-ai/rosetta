# AINL-003: Add adapter capability and privilege manifest

## Title

Add a Rosetta adapter capability and privilege manifest for effect safety.

## Source Evidence Link/Path

- AINL whitepaper adapter model: https://www.ainativelang.com/whitepaper
- AINL repository README: https://github.com/sbhooley/ainativelang
- Local synthesis: `docs/intake/competitor-intelligence/ainativelang-2026-04-28.md`

## Existing Representation Check

Related:

- #42 covers broader schema and SHACL coverage.
- #513 covers MCP compliance for the agent interface layer.
- #805 covers rights/guard hardening.
- `docs/intake/issue-drafts/archive/2026-04-26-prd-005-live-source-adapter.md` covers live source adapters.

This issue is distinct if it stays focused on a shared adapter manifest vocabulary used by Guard, source/refinery adapters, and future workflow validation.

## Entif/Rosetta Mapping

AINL's adapter inventory and privilege-tier metadata map naturally onto Rosetta's guard and source boundaries:

- Pure adapters: deterministic local transforms.
- Local-state adapters: cache, SQLite, filesystem, in-memory state.
- Network adapters: HTTP, GitHub, source registries, external APIs.
- Operator-sensitive adapters: shell, credentials, writes, deployments, payment, destructive actions.

Each adapter capability should declare verbs, privilege tier, side-effect posture, required guard claims, input/output schema refs, and test fixture expectations.

## Priority

P1 - without this, workflow validation cannot know whether a node is pure, local, networked, or operator-sensitive.

## Rationale

Rosetta has deny-by-default guard posture, but adapter capability metadata needs to be explicit enough for validators and agents to reason about side effects before execution. A manifest also prevents MCP, source adapters, and operator tools from inventing incompatible capability taxonomies.

## Acceptance Criteria

- [ ] Define `adapter-capability-manifest-v1` fields.
- [ ] Include privilege tier, side-effect class, destructive flag, network-facing flag, idempotency expectation, required guard claims, input schema, output schema, and fixture path fields.
- [ ] Add example manifests for at least one pure adapter, one source/read adapter, and one operator-sensitive placeholder.
- [ ] Validate that side-effecting capabilities require a guard claim reference.
- [ ] Document how the manifest interacts with MCP tools and Rosetta packs.

## Test Strategy

- Add schema/validator tests for valid and invalid manifests.
- Include negative tests for missing guard requirements on network/destructive capabilities.
- Add a docs-intake validation receipt if only docs change.

## Non-Goals

- Do not implement new live adapters in this issue.
- Do not grant capabilities by default.
- Do not replace Guard; this manifest feeds Guard and validators.
