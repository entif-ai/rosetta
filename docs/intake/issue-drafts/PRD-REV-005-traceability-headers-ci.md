# PRD-REV-005: check-traceability-headers.ts Missing from CI Pipeline

## Issue Metadata

| Field | Value |
| --- | --- |
| Title | Traceability header checker script provided in doc but not implemented in repo or CI |
| Type | `issue-candidate` |
| Status | `draft` |
| Labels | `ci`, `traceability`, `developer-experience` |
| Depends On | |
| Evidence | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` Finding 13 |

## Summary

The synthesis doc provides a complete TypeScript script (`check-traceability-headers.ts`) that scans source files for required file-level provenance headers (Purpose Summary, Rosetta Relevance, Governing References) and fails the build if any are missing from protocol-sensitive modules. This script is a concrete implementation, not a stub. It is not yet present in the repo and is not enrolled in CI or pre-commit hooks.

## Context

The "Unified decisions" section of the synthesis doc (item 9) confirms file-level traceability headers as a standing requirement validated by both competing PRD runs. The script provided:

- Walks directories recursively from specified roots
- Scans `.ts`, `.tsx`, `.js`, `.mjs`, `.cjs`, `.py` files
- Checks first 1200 characters for the three required labels
- Skips `index.ts`, `components/`, `__tests__/simple/`, and barrel files
- Exits with code 1 and a list of failing files on any miss

The script must be:
1. Added to the repo at `tools/scripts/check-traceability-headers.ts`
2. Added to pre-commit hooks
3. Integrated into CI pipeline (fail on new files missing headers, warn on existing)
4. Documented in `CONTRIBUTING.md` or a dev-guide

The skip logic for `__tests__/simple/` may be too permissive — test files in simple(test) fixtures may still benefit from traceability headers. Review before merging.

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Add script to repo | Code from doc | `tools/scripts/check-traceability-headers.ts` | P0 | Exact implementation from synthesis doc |
| Add `node:` shebang and make executable | Unix convention | `tools/scripts/check-traceability-headers.ts` | P0 | `#!/usr/bin/env node` at top |
| Wire into pre-commit hook (e.g., lint-staged or Husky) | Dev experience | `.husky/` or `lint-staged.config.js` | P1 | Run on staged files only |
| Add to CI pipeline (Nx executor or standalone step) | CI | `.github/workflows/` or Nx executor | P1 | Fail PR if new files missing headers |
| Document the three required header labels | Developer onboarding | `CONTRIBUTING.md` or `docs/reference/dev-guide.md` | P1 | Include examples |
| Review skip logic for `__tests__/simple/` — decide if tests need headers too | Risk vs ergonomics | `tools/scripts/check-traceability-headers.ts` | P2 | Decide before alpha |

## Acceptance Criteria

1. `tools/scripts/check-traceability-headers.ts` exists in repo and runs without errors on source tree
2. Pre-commit hook runs on staged files and blocks commits missing headers
3. CI step fails on any new file missing required headers
4. Documentation exists explaining the three required labels and their purpose
5. Script handles empty/whitespace-only files gracefully (no false positives)
