# BH-002: Node version constraint may be stale

## Metadata

| Field | Value |
| --- | --- |
| Issue | BH-002 |
| Title | Node version constraint (24.14.1) may be stale — runtime drift since April 2026 |
| Type | investigation |
| Status | open |
| Labels | bootstrap, runtime, version-drift |
| Depends on | — |
| Evidence | `docs/handoffs/2026-04-13-bootstrap-handoff.md` — "Use Node `24.14.1` unless fresh local receipts justify change" |
| Created | 2026-05-31 |

## Problem Statement

The bootstrap handoff prescribes Node `24.14.1` as the runtime version unless "fresh local receipts justify change." Since the handoff was written (2026-04-13), multiple sessions have run. The current runtime is Node `v24.14.0` (per session context). The prescribed version (24.14.1) is one minor version ahead of what's currently running.

It is unclear:
- Whether 24.14.1 was ever adopted
- Whether the current 24.14.0 is intentional (two versions behind the handoff recommendation)
- Whether any receipts exist that justify the current version

## Investigation Tasks

- [ ] Check `package.json` engines field and `.nvmrc` for prescribed Node version
- [ ] Check current runtime version (`node --version`) and compare to 24.14.1
- [ ] Search for any receipts, changelogs, or session notes that discuss Node version decisions
- [ ] Determine if version constraint is enforced (npm engines check, CI pipeline check)
- [ ] Assess whether moving to 24.14.1 or staying at 24.14.0 requires explicit decision

## Expected Outcome

Either:
- A) Current version (24.14.0) is documented and intentional — update the handoff with the actual version
- B) Version should be updated to 24.14.1 — document the upgrade path
- C) Version constraint is not enforced and can be removed from bootstrap guidance

## Priority

low — no current failure, but version uncertainty is a risk for reproducibility