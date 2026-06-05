# BVR-001: No Enforcement Mechanism for 300-Line File Limit

**Type:** quality/process
**Status:** draft
**Confidence:** medium
**Source:** docs/external/Berman - Vibe Coding Rules.txt

## Problem

The "vibe coding" rules include a 300-line-per-file limit with mandatory refactor trigger. This rule has no automated enforcement — no lint rule, no CI gate, no pre-commit hook. In an AI-assisted workflow where the AI can generate files without an explicit size check, this limit will be routinely violated unless enforced.

## Evidence

- Rule states: "Keep files under 300 lines of code; refactor when approaching this limit"
- No tooling mentioned to enforce this
- No CI check referenced
- Berman workflow is specifically AI-assisted (AI generates code)

## Impact

Files will accumulate beyond 300 lines in practice. The rule becomes aspirational rather than enforced. Technical debt compounds silently.

## Suggested Action

Add a max-lines-per-file lint rule (e.g., ESLint `max-lines-per-function` or a custom rule in the project's lint config). Add a pre-commit hook or CI gate that fails on files exceeding the threshold. Document the threshold in the project's lint configuration as a named constant.

## Related

- BVR-002 (fixes folder lacks structure)
- BVR-003 (PRD staleness not checked)