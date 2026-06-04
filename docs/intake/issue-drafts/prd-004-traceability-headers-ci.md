# PRD-004: Implement check-traceability-headers.ts CI gate

## Meta

| field | value |
| --- | --- |
| status | issue-candidate |
| type | implementation |
| priority | P1 |
| label | ci, traceability-headers, file-headers |
| depends-on | — |
| evidence | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md |

## Summary

Implement `tools/scripts/check-traceability-headers.ts` as a pre-commit hook and/or CI gate that enforces machine-checkable traceability headers at the top of protocol-sensitive files. Required headers: `Purpose Summary:`, `Rosetta Relevance:`, `Governing References:`.

## Proposed Implementation

### Script behavior

- Walks `.ts`, `.tsx`, `.js`, `.mjs`, `.cjs`, `.py` files under given paths
- Reads first 1200 characters of each file
- Fails if any of the three required header labels are missing
- Exits 1 on failure with a list of files missing headers

### Skip rules (unchanged from code patch)

```typescript
function shouldSkip(p: string): boolean {
  return (
    p.endsWith("/index.ts") ||
    p.includes("/components/") ||
    p.includes("/__tests__/simple/") ||
    p.includes("/barrels/")
  );
}
```

### Integration points

1. **Pre-commit hook** — add to `.husky/pre-commit` or equivalent
2. **CI gate** — add as a `lint:headers` npm script run on all packages
3. **Nx executor** — create an nx executor wrapping the script for project-graph awareness

### Exit codes

- `0` — all files pass
- `1` — one or more files missing required headers
- `2` — usage error (no paths provided)

## Constraints and Preconditions

- No blocking dependencies
- Can be implemented in parallel with PRD-001, PRD-002, PRD-003

## Verification

- [ ] Script exits 0 when all target files have required headers
- [ ] Script exits 1 with file list when headers are missing
- [ ] Script correctly skips index.ts, components/, __tests__/simple/, barrels/
- [ ] Pre-commit hook fires on commit
- [ ] CI job fails when headers are missing

## Notes

- This is P1 (not P0) — it supports auditability but does not block builtin.echo slice-zero
- The three required header labels are intentionally narrow: forcing developers to write verbose prose defeats the machine-checkable goal