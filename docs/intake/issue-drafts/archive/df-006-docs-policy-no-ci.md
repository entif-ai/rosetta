# DF-006: Documentation update policy has no CI enforcement

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

CLAUDE.md mandates updating README.md and CLAUDE.md after every code change, but this policy is manually enforced with no CI check. In a fast-moving or multi-contributor codebase, documentation drift is likely.

## Evidence

From Documentation Update Policy section:
> "CRITICAL: Always update README.md and CLAUDE.md after every code change"
> "When making code changes, you MUST update the relevant documentation"
> "Keep documentation synchronized with the codebase at all times"

No CI check, no automated enforcement, no pre-commit hook mentioned.

## Implications

- Developers can land code changes without updating docs — no automated catch
- Documentation and code can diverge over time, especially in fast-moving areas
- New contributors have no automated signal that they've missed a documentation update
- The CLAUDE.md itself (which is the documentation enforcement policy) will eventually drift from actual practice

## Contrast with NOT LAME

NOT LAME's "receipt-law" requires receipts for every meaningful step — documentation updates could be considered meaningful steps that should emit receipts. A CI check for doc-vs-code synchronization would be a receipt-equivalent.

## Recommendations

1. Add a pre-commit hook that checks if any source file was modified more recently than its corresponding README.md or CLAUDE.md
2. Add a CI job that compares file mtimes and fails if source files are newer than docs
3. Consider a structured approach where code change PRs must include a doc update or explicitly waive it
4. Track documentation coverage as a metric (what percentage of source files have corresponding docs)
5. Consider a "docs need update" label that can be applied automatically by CI

## Labels

documentation, ci, process, enforcement, drift

## Status

issue-candidate