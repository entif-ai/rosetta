# BH-001: Bootstrap handoff path mismatch — repo relocated

## Metadata

| Field | Value |
| --- | --- |
| Issue | BH-001 |
| Title | Bootstrap handoff path mismatch — repo relocated from `/Users/emilie/` to `/Users/cr8s/` |
| Type | investigation |
| Status | open |
| Labels | bootstrap, repo-state, path-migration |
| Depends on | — |
| Evidence | `docs/handoffs/2026-04-13-bootstrap-handoff.md` — "Path: `/Users/emilie/Code/entif-ai`" |
| Created | 2026-05-31 |

## Problem Statement

The 2026-04-13 bootstrap handoff document records the repo path as `/Users/emilie/Code/entif-ai`. The current workspace path is `/Users/cr8s/.openclaw/workspace/Code/rosetta`. This indicates either:

1. The handoff was from a different host (emilie → cr8s)
2. The repo was migrated/renamed after the handoff was written
3. This is an older snapshot that predates current repo conventions

This matters because the handoff also references:
- `/Users/emilie/Code/enti-ai/docs/governance`
- `/Users/emilie/Code/enti-ai/docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md`
- `/Users/emilie/Code/enti-ai/packs`

If any of these paths are still referenced by live docs or scripts, they will be broken.

## Investigation Tasks

- [ ] Identify whether `/Users/emilie/Code/` path appears in any living docs, scripts, or configs in the current repo
- [ ] Check whether BOOTSTRAP_EXECUTION_TRACK.md is still current and points to correct paths
- [ ] Determine if `docs/handoffs/2026-04-13-bootstrap-handoff.md` is a historical artifact or still referenced by any active bootstrap process
- [ ] Confirm whether the repo migration (enti-ai → rosetta) was intentional and when it occurred
- [ ] Check git history for the commit that moved or renamed the repo

## Expected Outcome

Either:
- A) All `/Users/emilie/` references are confirmed stale and can be cleaned up
- B) Some references are live and need path updates
- C) This handoff doc is itself stale and should be archived

## Priority

medium — low urgency but affects bootstrap-era traceability