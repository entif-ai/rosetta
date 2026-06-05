# PDR-005: Integrate check-traceability-headers.ts into CI Pipeline

## Metadata

| Field | Value |
|---|---|
| Type | ci |
| Status | draft |
| Labels | ci, provenance, headers |
| Confidence | medium |

## Evidence

Extraction: `docs/intake/docs-intelligence/2026-06-05-prd-revision-synthesis.md`
Finding: "File-level traceability headers stay" + code patch provided

## Problem

The synthesis confirmed file-level traceability headers as a binding decision. A code patch was provided (`tools/scripts/check-traceability-headers.ts`) that checks for required headers (`Purpose Summary:`, `Rosetta Relevance:`, `Governing References:`). This script is not yet integrated into CI.

## Proposal

Integrate `tools/scripts/check-traceability-headers.ts` into the CI pipeline for all protocol-sensitive files (`.ts`, `.tsx`, `.js`, `.mjs`, `.cjs`, `.py`).

**Script behavior:**
- Requires three labels in first 1200 chars of each file: `Purpose Summary:`, `Rosetta Relevance:`, `Governing References:`
- Skips: `index.ts`, files in `/components/`, `/__tests__/simple/`, `/barrels/`
- Exit code 1 on any missing header; lists failing files

**CI integration:**
- Run on every PR push
- Check as part of the linting/check step
- Must be green before merge

## Implementation Notes

- Script is already provided in the synthesis as a code patch
- Need to add to nx project graph as a lint executor or standalone script
- Should run against: `packages/*/src/**`, `tools/**`
- Should NOT run against: generated files, node_modules, test fixtures

## Depends On

- _(no dependencies — script is provided and ready to integrate)_

## References

- Source doc: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Extraction: `docs/intake/docs-intelligence/2026-06-05-prd-revision-synthesis.md`
- Code patch: `tools/scripts/check-traceability-headers.ts`