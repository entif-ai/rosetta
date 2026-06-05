# RRP-004: check-traceability-headers.ts Not Enforced in CI or Pre-commit

## Type
- `type`: reliability / tooling gap

## Status
- `status`: open

## Labels
- ci
- audit
- tooling
- traceability

## Summary

The document produces `tools/scripts/check-traceability-headers.ts` as a script to enforce file-level traceability headers (Purpose Summary, Rosetta Relevance, Governing References). However, there is no evidence of this script being integrated into CI or a pre-commit hook. Files can be committed without traceability headers if developers do not manually run the check.

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` — "New work product 3: code patches" → check-traceability-headers.ts:

The script is provided as a standalone tool but the document does not mention:
- Integration into CI pipeline (e.g., NX affected, GitHub Actions)
- A pre-commit hook (e.g., Husky + lint-staged)
- A required check in the PR review process

Without enforcement, the traceability header discipline will degrade over time as new files are added.

## Impact

- New protocol-sensitive files committed without provenance headers
- Loss of machine-checkable governing-reference traceability
- The "governing references" requirement (Unified Decision 9) becomes aspirational rather than enforced

## Recommendation

1. Add `check-traceability-headers.ts` as a required step in the CI pipeline (e.g., as part of `nx run-many --target=lint` or a dedicated step)
2. Consider a Husky pre-commit hook with lint-staged to catch issues before commit
3. Add the check to the PR template or PR CI requirements
4. Document the exceptions (index.ts, barrel files, test fixtures) as explicit `shouldSkip()` rules

## Depends On
(None — tooling-only fix)

## GitHub Issue
(Not yet filed)
