# Issue Draft — PRD-REV-005: Write check-traceability-headers.ts and wire into CI

## Title

PRD-REV-005: Write check-traceability-headers.ts and wire into CI

## Type

implementation

## Labels

ci, traceability-headers, file-headers

## Depends On

—

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`

The doc provides a full code patch for `tools/scripts/check-traceability-headers.ts`:

```typescript
const REQUIRED = ["Purpose Summary:", "Rosetta Relevance:", "Governing References:"];
```

The script walks specified paths, checks first 1200 chars of `.ts/.tsx/.js/.mjs/.cjs/.py` files for required headers, and exits 1 on missing headers.

## Description

File-level traceability headers keep provenance, governing references, and local invariants visible without bloating files. Every protocol-sensitive module should carry:

```
/**
 * Purpose Summary:
 * - [what this module does]
 *
 * Rosetta Relevance:
 * - [how it relates to Rosetta architecture/constitution]
 *
 * Governing References:
 * - [which specs, RFCs, or docs govern this module]
 */
```

The `check-traceability-headers.ts` tool enforces this via CI for files matching:
- `.ts`, `.tsx`, `.js`, `.mjs`, `.cjs`, `.py`
- Excludes: `index.ts`, files under `components/`, `__tests__/simple/`, `barrels/`

## Proposed Action

- Write `tools/scripts/check-traceability-headers.ts` from the code patch
- Add to Nx CI pipeline (as a lint or pre-commit hook)
- Add to protocol-sensitive packages: rosetta-guard, rosetta-tapestry, rosetta-canon, rosetta-cid
- Add test coverage for header detection and skip logic
