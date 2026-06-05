# BVT-001: Vibe Coding Rules — Solo Discipline vs Multi-Agent Workflow Gap

## Type
documentation

## Summary

Berman's "Vibe Coding Rules" (docs/external/Berman - Vibe Coding Rules.txt) encode a solo-practitioner discipline with 14 explicit rules. Several of these directly conflict with Rosetta's docs-intelligence (DI) multi-agent Git workflow. This gap needs to be documented, not resolved — the workflows serve different purposes.

## Evidence

**Conflicting rules:**

1. **"Don't create new branches unless explicitly requested"** — conflicts directly with DI per-doc-branch convention. Every DI cycle creates a new branch (`docs-intelligence/<doc-name>`) to carry extraction artifacts + issue drafts through PR review before merging to main.

2. **"Never overwrite .env files without first asking and confirming"** — assumes a single developer who can ask. In multi-agent DI, environment files are managed declaratively through config; the confirmation-gate exists but is not a human-in-the-loop per subagent.

3. **"If you run into issues that take multiple iterations to fix, write up description and store in fixes/ folder"** — solo practice assumes one developer tracking their own mistakes. In multi-agent DI, issues are tracked via issue drafts and GitHub issues, not a per-developer fixes/ folder.

**Non-conflicting rules that apply well:**
- PRD check before tasking (maps to source-doc spec requirement)
- All tests pass before deploying (constitutional CI gate)
- Never commit .env (matches security posture)
- Prefer iterating on existing code (maps to reuse-gate)
- Keep files under 300 lines (small composable units)
- Keep running pattern list in README.md (institutional memory)
- No graceful error handling — fix root cause (aligns with fail-closed philosophy)

## Decision

This is not a bug to fix — it's a workflow difference to document. The DI workflow intentionally diverges from solo discipline in these areas because:
- Branch-per-doc enables parallel processing and isolated review
- Environment management in DI is declarative, not interactive
- Issue tracking uses GitHub issues + issue drafts, not fixes/ folder

## Action

Document the conflict in the DI workflow spec (DOCS_INTELLIGENCE_WORKFLOW.md) with a section: "Where Vibe Coding Discipline Diverges from DI Workflow". Cover the 3 conflicts above and explain why DI intentionally differs.

**Labels:** documentation, workflow, coordination

**Status:** open

**Created:** 2026-06-05

**Source:** docs/external/Berman - Vibe Coding Rules.txt (Berman Vibe Coding Rules extraction, 2026-06-05)