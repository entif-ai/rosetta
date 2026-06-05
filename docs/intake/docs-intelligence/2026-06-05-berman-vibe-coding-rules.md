# Docs Intelligence Extraction — docs/external/Berman - Vibe Coding Rules.txt

**Extracted:** 2026-06-05
**Source:** `docs/external/Berman - Vibe Coding Rules.txt`
**Confidence:** high
**Extracted by:** heartbeat subagent (docs-intelligence cycle)

---

## Document Overview

Short prescriptive list of software development rules. Authored as "vibe coding" guidelines — a set of norms about how to work as an AI pair-programmer in a Berman-coded project. Not a technical spec, not a product spec. A rules-of-engagement for an AI-assisted development workflow.

**Document length:** ~35 lines, plain text rules.
**Key theme:** Discipline and process guardrails for AI-assisted coding.

---

## Findings

**F1 (high): PRD-first requirement** — Explicit requirement to read and follow a Product Requirements Document before starting any task. The PRD is treated as a binding contract that overrides local judgment. This aligns with Rosetta's "thin-vertical-slices" and "exit-criteria-first" philosophy, though it predates the Rosetta context.

**F2 (high): Fixes folder pattern for recurring bugs** — When an issue requires multiple iteration cycles to resolve, the protocol is to document the problem + solution in a `fixes/<issue-name>.md` file after fixing it. This is a knowledge-capture protocol analogous to Rosetta's receipt-law, but specific to persistent bug patterns. Important for institutional memory in AI-assisted workflows.

**F3 (high): 300-line file limit + mandatory refactor trigger** — Files must be kept under 300 lines. A refactor is mandatory when approaching this limit. This is a structural constraint similar to parse-only-default — a hard guardrail, not a guideline.

**F4 (medium): Check fixes folder before struggling** — Before spending time on a recurring error, check the fixes folder to see if it's already been documented. This is a retrieval-before-compute protocol. Low-tech but effective. Aligns with rights-scoped retrieval: don't recompute what you could retrieve.

**F5 (medium): Iterate on existing code before creating new** — Prefer modifying existing solutions to creating new ones. Anti-waffle principle: reduce solution space before generating. Relevant to Rosetta's "thin-vertical-slices" — fix what exists before adding more surface area.

**F6 (medium): Kill servers before restarting** — All related running servers must be killed before starting a new one. Clean-state restart policy. This prevents state bleed between runs.

**F7 (medium): Tests must pass before deploying** — All tests must pass before deploying to production. Explicit fail-closed gate. If they don't pass, the developer (human) must be notified rather than deployed.

**F8 (medium): Check for duplicate code before writing new** — When refactoring, look for duplicate code, duplicate files, and similar existing functionality. Do not copy-and-rename files to create parallel implementations. Edit existing files.

**F9 (medium): Don't mock data except in tests** — Mock data is forbidden in dev or prod environments. Only in test contexts. This is a data-integrity constraint.

**F10 (medium): No one-time scripts in permanent files** — Avoid writing one-time scripts in permanent files. This prevents the accumulation of cruft in the codebase.

**F11 (medium): Don't name files "improved-something" or "refactored-something"** — Naming convention guardrail against vanity renaming. Prevents future confusion about file purpose.

**F12 (low): README.md as living pattern reference** — A running list of patterns and technologies used must be maintained in the project's README.md. This is a lightweight knowledge management protocol.

**F13 (low): Consider environments (dev/test/prod)** — When writing code, consider the different environments. This is a basic good practice but the rule is only stated, not specified.

**F14 (low): Never commit .env files** — Explicit prohibition against committing .env files to version control.

**F15 (low): Don't overwrite .env without confirmation** — Explicit requirement to ask before overwriting .env files.

**F16 (low): One new branch at a time** — Don't create new branches unless explicitly requested. Keeps the branch topology clean.

**F17 (low): Remove old implementation when introducing new pattern** — If a new pattern replaces an old one, the old implementation must be removed, not left as legacy code. Analogous to "receipt closure" in Rosetta.

**F18 (low): Explicit notification for test failures** — No graceful degradation on test failures for production deploys; must notify human developer.

**F19 (low): Consider affected code areas before changing** — Must consider what other code areas might be affected by changes before making them.

---

## Issue Candidates

**BVR-001: No enforcement mechanism for 300-line limit** — Confidence: medium
The 300-line file limit is a stated rule but has no enforcement (no lint rule, no CI check). If an AI assistant generates files above this limit, there's no automated gate. Recommend adding a lint rule (e.g., max-lines-per-file in ESLint or similar).

**BVR-002: Fixes folder protocol lacks structure** — Confidence: medium
The fixes folder pattern is described but not structured: no naming convention, no required fields, no deduplication against existing entries. If the same bug recurs after many months, there is no guarantee the second occurrence will find the first fix. Consider a lightweight structured format (markdown with: date, symptoms, root cause, solution, related issues).

**BVR-003: PRD-first rule assumes PRD exists and is current** — Confidence: low
The rule says to follow the PRD closely but doesn't address what happens when the PRD is stale, missing sections, or contradicts other docs. In a multi-doc project like Rosetta, this could lead to version conflicts. No PRD staleness check in the protocol.

---

## Concepts Captured

- `prd-first` — PRD is binding contract, not suggestion
- `fixes-folder` — knowledge capture for recurring bugs
- `300-line-limit` — file size hard guardrail
- `test-gate` — tests must pass before deploy
- `no-mock-prod` — no mock data in dev/prod
- `env-guard` — .env files never committed or overwritten without approval
- `one-branch-at-a-time` — clean branch topology
- `readme-pattern-tracker` — lightweight knowledge management

---

## Observations

This is a process-discipline document, not a technical architecture document. Its value for Rosetta is limited to the workflow-level rules. The most resonant finding is **F2 (fixes folder pattern)** — a lightweight knowledge-capture protocol that could complement Rosetta's receipt-law for bug patterns that don't rise to the level of a formal issue but recur across sessions.

The document does not introduce any novel technical concepts. It is not a reference doc for Rosetta's build — it is a workflow contract between a human developer and an AI coding assistant.