# Issue: Enforce Rosetta Traceability Header Consistency

## Type
issue-candidate

## Labels
documentation, linting, rosetta

## Depends On
Phase 1 (scaffold)

## Evidence

The Pro-tier DR prompt introduces a file-level Rosetta traceability header requirement for protocol-sensitive files. It mandates:
- Purpose Summary (2-6 lines)
- Rosetta Relevance
- Governing References (minimum identifiers)
- Optional Implementation Notes

The prompt also requires emitting: "one lint/check/enforcement approach for header consistency" and defines an Nx executor called `headers-check`.

However, the actual ESLint custom rule implementation and the `headers-check` Nx executor are not detailed in the output — only described as needed. The gap:
1. No ESLint rule code is provided
2. No `headers-check` executor implementation is provided
3. The rule for when headers may be omitted is textual but not machine-checkable in ESLint
4. No generator template is provided that auto-stamps headers for new protocol-sensitive files

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - ChatGPT - Pro-Extended Research.md`, FILE-LEVEL TRACEABILITY HEADER REQUIREMENT section and Phase 15.

## Suggested Action

1. Implement `packages/workspace-generators/src/executors/headers-check/` Nx executor
2. Create ESLint custom rule for missing protocol headers on configured paths
3. Create Nx generator template that auto-stamps headers for `rosetta-lib`, `mcp-tool`, `policy-pack` generated files
4. Add `headers-check` as a blocking CI gate for protocol-sensitive packages

## Priority
medium

## Status
open
