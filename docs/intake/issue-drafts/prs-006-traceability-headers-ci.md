# PRS-006: Check-Traceability-Headers.ts CI Enforcement

## Metadata

| Field | Value |
| --- | --- |
| Title | Check-Traceability-Headers.ts CI Enforcement |
| Type | devops |
| Status | candidate |
| Source doc | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` |
| Extraction | `2026-06-05-entif-rosetta-prds-revisions-synthesis.md` |
| Labels | ci, auditability, file-headers, devops |
| Confidence | high |

## Problem

The synthesis provides a concrete script (`tools/scripts/check-traceability-headers.ts`) for enforcing file-level traceability headers, but it is not yet integrated into CI. Without CI enforcement, the header discipline will decay over time as contributors forget or skip the requirement.

## Evidence

From the source document:
> "File-level traceability headers stay. Required fields: Purpose Summary, Rosetta Relevance, Governing References. Machine-checkable at check-traceability-headers.ts."

The provided script:
```typescript
const REQUIRED = ["Purpose Summary:", "Rosetta Relevance:", "Governing References:"];
const FILE_RE = /\.(ts|tsx|js|mjs|cjs|py)$/;
```

## Required Headers

Every protocol-sensitive file (`.ts`, `.tsx`, `.js`, `.mjs`, `.cjs`, `.py`) must begin with a comment block containing:

```typescript
/**
 * Purpose Summary:
 * - <one-line description of what this module does>
 *
 * Rosetta Relevance:
 * - <why this module matters to Rosetta's mission>
 *
 * Governing References:
 * - <relevant Rosetta docs, ROCK specs, RFCs>
 */
```

## Files to Skip

The script already handles these exclusions:
- `index.ts` files
- Files in `components/` directories
- Files in `__tests__/simple/` directories
- Files in `barrels/` directories

## CI Integration Steps

1. **Add script to repo**: `tools/scripts/check-traceability-headers.ts` (already drafted)
2. **Add Nx executor**: Create `tools/executors/check-headers/` Nx executor wrapping the script
3. **Wire into build**: Run on affected files during pre-commit hook (Husky) or CI pipeline
4. **Enforce in PR**: Block merge if check fails on any touched file

## CI Pipeline Suggestion

```yaml
# In nx-ci.yml or .github/workflows/
- name: Check traceability headers
  run: npx nx run-many -t check-headers --files-changed
  condition: files.match('\\.(ts|tsx|js|mjs|cjs|py)$')
```

Or in pre-commit (Husky):
```json
{
  "hooks": {
    "pre-commit": "nx run-many -t check-headers --files-changed"
  }
}
```

## Alternative: GitHub Actions Diff Check

```yaml
- name: Check traceability headers
  run: |
    CHANGED_FILES=$(git diff --name-only HEAD~1 | grep -E '\.(ts|tsx|js|mjs|cjs|py)$' || true)
    if [ -n "$CHANGED_FILES" ]; then
      node tools/scripts/check-traceability-headers.ts $CHANGED_FILES
    fi
```

## Relationship to Other Issues

- PRS-001 (ROCK-3111-C): packs should follow the same header discipline
- PRS-005 (Alpha RC staircase): RC gates should include header compliance check

## Implementation Notes

- Script should exit 0 if no files match or if all files pass
- Script should exit 1 with clear error messages listing failing files
- Script should not fail on files that are newly added and not yet committed (use `--staged` flag if needed)

## Open Questions

- Should the check run on all files or only changed files? (changed files is better for performance)
- Should Python files use `#` comments instead of `/**/` block comments?
- Should there be a grace period for existing files to add headers, with new files enforced immediately?