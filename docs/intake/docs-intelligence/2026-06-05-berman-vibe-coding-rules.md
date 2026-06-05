# Docs Intelligence Extraction — Berman Vibe Coding Rules

## Source

- Path: `docs/external/Berman - Vibe Coding Rules.txt`
- Title: Vibe Coding Rules (Berman)
- Date evidence: Unknown (external reference file)
- Authority tier: external reference
- Freshness: unknown
- Word count: ~250 words
- Extractor: heartbeat subagent
- Extraction date: 2026-06-05

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

Berman's "vibe coding" rules encode a personal engineering discipline for AI-assisted development: PRD-first tasking, small-file architecture (under 300 lines), iterate-on-existing over create-new, test-gate deploys, fixes-folder for major issues, single-branch default, no .env commits, and no grace-of-error — fix root causes. These rules reflect a solo-practitioner style that maps partially to Rosetta's architectural constraints (thin slices, receipts, CI gates) but has several direct conflicts with multi-agent Git-based workflows and Rosetta's provenance requirements.

## Goals And Intent

- Provide a stable, repeatable AI-assisted engineering discipline
- Reduce code churn, duplicate artifacts, and unnecessary complexity
- Ensure every fix is documented in a fixes/ folder for major issues
- Enforce test-gate deploys and clean state before production
- Keep files small and codebase organized

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| PRD check before task start | "Always check for a PRD before starting a new task" | intake/planning | high | Maps to Rosetta source-doc specs; pre-flight gate for DI |


## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-05T05:14 | docs/external/Berman - Vibe Coding Rules.txt | entire doc | vibe-coding, engineering-discipline, process, solo-practitioner | Berman's rules; 14 distinct rules | technology | Vibe coding rules encode a solo-practitioner discipline with 14 rules covering tasking, iteration, file size, testing, branching, env management, and reuse | Full doc text | Map to Rosetta process docs; flag multi-agent conflicts | medium |
| 2026-06-05T05:14 | docs/external/Berman - Vibe Coding Rules.txt | Rule: "Keep files under 300 lines" | architecture, small-units, composability | File size constraint | requirement | File-size ceiling (300 lines) as a hard design constraint enforces small composable units | "Keep files under 300 lines of code; refactor when approaching this limit" | Align with Rosetta module/pack size limits; check existing architectural constraints | medium |
| 2026-06-05T05:14 | docs/external/Berman - Vibe Coding Rules.txt | Rule: "All tests must pass before deploying" | testing, ci, quality-gate, receipt-law | Test-gate before deploy | requirement | Every code change requires all tests green before deploy — absolute gate | "All tests should always pass before deploying to production" | Rosetta CI should enforce this as a constitutional layer constraint | high |
| 2026-06-05T05:14 | docs/external/Berman - Vibe Coding Rules.txt | Rule: "Never commit .env files" | security, env-vars, secrets, compliance | No .env in version control | requirement | Environment files with secrets are explicitly prohibited from version control | "Never commit .env files to version control" | Rosetta must enforce this; matches openbrain/env-utils pattern in Berman-PRD | high |
| 2026-06-05T05:14 | docs/external/Berman - Vibe Coding Rules.txt | Rule: "Prefer iterating on existing code" | reuse, existing-code-first, thin-slices | Reuse existing implementations | requirement | When solving problems, prefer iterating on existing code before creating new solutions | "Prefer iterating on existing code rather than creating new solutions" | Maps to Rosetta's "never build twice" and "receipt-reuse" principles | high |
| 2026-06-05T05:14 | docs/external/Berman - Vibe Coding Rules.txt | Rule: "Don't create new branches unless explicitly requested" | branching, git-workflow, multi-agent, coordination | Branch creation is restricted | contradiction | Solo-discipline rule conflicts directly with Rosetta's per-doc-branch convention for docs-intelligence — each cycle creates a new branch | "Don't create new branches unless explicitly requested" | This rule is incompatible with DI workflow; document the conflict | high |
| 2026-06-05T05:14 | docs/external/Berman - Vibe Coding Rules.txt | Rule: "Keep a running list of patterns in README.md" | documentation, pattern-log, institutional-memory | Continuous pattern documentation | requirement | As project evolves, maintain a running README.md of patterns and technologies used | "Keep a running list of patterns and technology used in the README.md file" | Rosetta should maintain this — matches receipt-chain for architectural decisions | medium |
| 2026-06-05T05:14 | docs/external/Berman - Vibe Coding Rules.txt | Rule: "Fixes folder for major issues" | fixes-folder, documentation, institutional-memory | Major issues get dedicated fix docs | requirement | For issues taking multiple iterations, write up description and store in fixes/ folder as individual .md files | "For issues that are taking multiple iterations to fix... store it in a folder called 'fixes'" | Maps to Rosetta's receipt/artifact system; each fix is a provenance trace | medium |
| 2026-06-05T05:14 | docs/external/Berman - Vibe Coding Rules.txt | Rule: "Exhaust existing implementations before new patterns" | reuse-gate, never-build-twice, architecture | New patterns require existing exhaustion first | requirement | Must check for existing implementations before introducing new patterns | "Exhaust all options using existing implementations before introducing new patterns" | Rosetta reuse-gate should enforce this; tool-surface de-dup check before adding new adapter | high |
| 2026-06-05T05:14 | docs/external/Berman - Vibe Coding Rules.txt | Rule: "No graceful error handling — fix root cause" | error-handling, fail-closed, root-cause-fix | Error handling philosophy | decision | Instead of gracefully handling errors, fix the underlying issue | "Unless explicitly instructed, instead of trying to gracefully handle an error or failure, make sure to fix the underlying issue" | Aligns with Rosetta's fail-closed write admission gate philosophy | medium |
| 2026-06-05T05:14 | docs/external/Berman - Vibe Coding Rules.txt | Rule: "Check fixes folder for same issue before struggling" | pattern-matching, reuse, institutional-memory | Reuse prior fix documentation | requirement | Before struggling with a persistent error, check fixes/ folder to see if same issue was fixed before | "check the fixes folder for previous fixes and see if the same issue has been fixed before" | Rosetta should have a similar mechanism — cross-doc issue dedup before creating new issue drafts | medium |
| 2026-06-05T05:14 | docs/external/Berman - Vibe Coding Rules.txt | no .env overwrite without asking | safety, confirmation-gate, env-vars | Confirmation required before overwriting env | requirement | Never overwrite .env without first asking and confirming | "Never overwrite .env files without first asking and confirming" | Aligns with Rosetta's operator-shell gating and confirmation-gate principles | medium |


## Components And Technologies

- Fixes/ folder (per-project documentation of major issue solutions)
- README.md with running pattern/technology list
- PRD-first tasking protocol
- Test-gate deployment enforcement
- Single-branch default (conflicts with DI workflow)

## Conceptual Claims

- Solo-practitioner discipline can be encoded as explicit rules
- AI-assisted development requires stricter discipline than solo human development due to context window and idempotency challenges
- File-size limits enforce composability and reviewability
- Reuse over creation is a first-class engineering virtue
- Persistent errors should be documented and searchable before re-solving

## Dependencies And Sequencing

- PRD check before task start is a prerequisite gate — maps to Rosetta's source-doc specification requirement before intake
- Test-gate deploy requires CI infrastructure — Rosetta's CI layer must support this
- Fixes folder pattern could be generalized to Rosetta's receipt/artifacts system

## Contradictions Or Supersession

- **Branch creation rule conflicts with DI**: Berman's "don't create new branches unless explicitly requested" directly contradicts Rosetta's docs-intelligence per-doc-branch convention. Each DI cycle creates a new branch for the extracted doc + issue drafts. This is a necessary workflow difference, not a conflict to resolve.
- **Solo vs multi-agent**: All 14 rules assume a single developer with full context. Rosetta's multi-agent Git workflow necessarily diverges from several of these (branch creation, .env management, file size review).
- **Graceful error handling**: Berman's "no graceful error handling" conflicts with Rosetta's guard-layer which does graceful handling at the boundary before rejecting; the difference is architectural role vs application code.

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| VR-001: Vibe Coding Rules — Solo Discipline vs Multi-Agent Workflow Gap | documentation | `docs/intake/issue-drafts/bvt-001-solo-discipline-multi-agent-gap.md` | docs-intelligence, workflow, coordination | — | Berman's "no new branches" rule conflicts with DI per-doc-branch convention; document the workflow difference and when to apply each |
| VR-002: Establish fixes/ pattern for persistent issues in Rosetta | process | `docs/intake/issue-drafts/bvt-002-fixes-folder-pattern.md` | process, documentation, receipts | — | Berman's fixes/ folder for major multi-iteration issues maps to Rosetta's receipt system; consider formalizing this as a named artifact type |
| VR-003: Align file-size limits with existing architectural constraints | architecture | `docs/intake/issue-drafts/bvt-003-file-size-limit-alignment.md` | architecture, constraints, composability | — | Berman's 300-line ceiling not currently in Rosetta spec; check existing pack/module constraints and either formalize or supersede |


## Project Board Suggestions

- Area: docs-intelligence
- Cycle: batch-6
- Status: candidate
- Blocked by: none
- Parallelization notes: small doc; quick extraction; no dependent docs

## Open Questions

- Does Rosetta have an explicit file-size or module-size limit? Berman enforces 300 lines; Rosetta packs/modules may need similar constraints.
- Should Rosetta's issue-drafts/ folder adopt the fixes/ folder naming convention for multi-iteration issues?
- Is the branch-creation rule conflict documented anywhere in Rosetta's workflow specs?