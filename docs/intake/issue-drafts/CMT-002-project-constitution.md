# CMT-002: Build Project Constitution as Hard Dependency of Every Agentic Run

## Metadata

- **Type:** implementation
- **Status:** draft
- **Labels:** `context-management`, `openclaw`, `bootstrap`
- **Evidence:** `docs/chats/20260301 - Chat GPT - Context Management Techniques.md` (Findings T2, T8)
- **Extraction:** `docs/intake/docs-intelligence/2026-06-01-context-management-techniques.md`
- **Depends on:** CMT-001

## Summary

Create `/context/constitution.md` (or equivalent) as the Tier 1 Project Constitution — a single, deliberately concise file that is present in every session. It is operating law, not documentation. It must be maintained like production code.

## Problem Statement

OpenClaw/Entif currently lacks a mandatory hot-memory context artifact that every agentic run consults automatically. Without a Constitution, each run starts with implicit context that may be inconsistent, incomplete, or wrong.

## Proposed Resolution

Create `context/constitution.md` with these minimum sections:
1. **Non-negotiables:** Code quality standards, naming conventions, error handling, logging, test expectations
2. **Repo commands:** build, lint, test, run, migration, formatting — all in one place
3. **Architecture skeleton:** 1-page map with links to Tier 3 docs
4. **Invariants & threat model:** Rules that must not be broken
5. **Orchestration rules:** When to route, when to retrieve, when to review
6. **Trigger table v0:** File globs → agent routing table

**Design constraint:** If it doesn't fit comfortably in every session, it's not Tier 1. Enforce a strict size budget.

**Maintenance:** Version in Git. Review on every significant architecture change. Prune stale items.

## Acceptance Criteria

- [ ] `context/constitution.md` exists in the repo
- [ ] Every agentic run (bootstrap, heartbeat, subagent) loads Constitution before executing task logic
- [ ] Constitution has all 6 minimum sections defined above
- [ ] Size constraint is enforced (e.g., CI check or linter)
- [ ] Constitution is reviewed and updated as part of definition-of-done for architecture changes

## Dependencies

- CMT-001 (3-tier architecture adoption)
- TC-005 (Promotion state machine — Constitution may be consulted at promotion gate)

## Related Issues

- CMT-001, CMT-003, CMT-005, CMT-006, CMT-007
- NOT LAME: Context Compiler + Query Router
