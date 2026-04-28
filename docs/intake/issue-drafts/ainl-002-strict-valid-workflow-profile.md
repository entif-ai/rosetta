# AINL-002: Add strict-valid conformance profile for Rosetta workflow artifacts

## Title

Add a strict-valid conformance profile for Rosetta workflow and agent artifacts.

## Source Evidence Link/Path

- AINL whitepaper: https://www.ainativelang.com/whitepaper
- AINL repository README: https://github.com/sbhooley/ainativelang
- Local synthesis: `docs/intake/competitor-intelligence/ainativelang-2026-04-28.md`

## Existing Representation Check

Adjacent issues exist:

- #43: coverage reporting and package acceptance matrices.
- #69/#74/#79: pack conformance and pack dependency validation.
- #240: Rosetta v3 conformance test harness.

This candidate should not duplicate pack conformance. It is specifically about workflow/agent artifacts that enter Rosetta execution or review lanes.

## Entif/Rosetta Mapping

Rosetta should have named validation profiles for workflow artifacts:

- `draft`: human/agent planning artifact, may be incomplete.
- `strict-valid`: all required graph, receipt, guard, artifact, and pack references resolve.
- `audit-ready`: strict-valid plus replay/evidence closure and operator explanation coverage.

## Priority

P1 - it converts "workflow shape" from prose into CI-testable acceptance.

## Rationale

AINL's strict-valid lane is productively blunt: only curated artifacts count for headline claims. Rosetta needs the same honesty boundary so examples, demos, drafts, and certified workflow artifacts are not collapsed into one status. This directly supports the user's existing preference for precise labels such as implemented, modeled, fixture-backed, and not yet implemented.

## Acceptance Criteria

- [ ] Define workflow artifact status labels and what each allows.
- [ ] Add `strict-valid` rules for graph structure, required receipt references, guard references, and pack references.
- [ ] Add fixture-backed validation tests for strict-valid pass/fail cases.
- [ ] Document how strict-valid differs from pack conformance, docs-intelligence drafts, and runtime ingestion.
- [ ] Ensure validation errors are actionable enough for an agent to repair the artifact.

## Test Strategy

- Add unit tests for strict-valid profile validation.
- Include invalid fixtures for unknown node references, unresolved policy refs, missing receipt refs, and accidental side effects.
- Run the focused validator test plus `pnpm run docs:intake` when docs are touched.

## Non-Goals

- Do not broaden pack conformance in this issue unless a workflow fixture requires it.
- Do not create a new language syntax.
- Do not certify existing examples retroactively without validation evidence.
