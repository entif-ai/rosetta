# AINL-005: Define portable agent workflow bundle manifest

## Title

Define a portable Rosetta agent workflow bundle manifest.

## Source Evidence Link/Path

- AINL whitepaper: https://www.ainativelang.com/whitepaper
- AINL repository README: https://github.com/sbhooley/ainativelang
- Local synthesis: `docs/intake/competitor-intelligence/ainativelang-2026-04-28.md`

## Existing Representation Check

Related:

- #69/#74/#79 cover RRP pack identity and CI.
- #515 covers persona/frame/boundary packs.
- `docs/intake/issue-drafts/archive/TB-006-bundle-validator-explainer.md` covers meaning bundle validation.
- `docs/intake/issue-drafts/archive/TXS-004-schema-pack-artifact.md` covers schema pack artifacts.

This issue should define an agent workflow bundle manifest that references existing Rosetta primitives instead of replacing them.

## Entif/Rosetta Mapping

AINLBundle's "workflow + memory + persona + tools" pressure maps to a Rosetta manifest that references:

- workflow graph profile id
- execution tape refs
- receipt bundle refs
- policy and guard refs
- pack ids and adapter capability manifests
- memory-plane refs, never raw ungoverned memory dumps
- optional human/operator summary

## Priority

P1 - bundle boundaries determine whether agent workflows can be moved, reviewed, cached, and audited safely.

## Rationale

Rosetta already has many bundle-like concepts, but agent workflows need a manifest that says what travels together and what must remain a reference. The boundary matters for portability, privacy, replay, and supply-chain review.

## Acceptance Criteria

- [ ] Define `agent-workflow-bundle-v1` manifest fields.
- [ ] Specify which fields embed content and which fields must be content-addressed refs.
- [ ] Require policy refs, pack refs, and adapter capability refs for any executable workflow bundle.
- [ ] Define privacy rules for memory-plane references and persona/frame material.
- [ ] Add valid and invalid manifest fixtures.
- [ ] Document relationship to packs, receipt bundles, and meaning bundles.

## Test Strategy

- Add schema/validator tests for manifest fixtures.
- Add negative tests for raw memory dumps, unresolved pack ids, missing policy refs, and missing workflow graph refs.
- Run docs-intake and focused validator tests if implemented.

## Non-Goals

- Do not create a package manager.
- Do not serialize private memory by default.
- Do not import AINL bundle files.
- Do not collapse this with semantic/tapestry bundles.
