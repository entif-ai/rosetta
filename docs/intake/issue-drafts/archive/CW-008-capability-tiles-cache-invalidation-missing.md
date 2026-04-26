# CW-008: Capability tiles not cached/invalidated on git changes

**Type:** issue-candidate  
**Confidence:** medium  
**Source:** `docs/chats/20260225 - Chat GPT - Code Wiki integration.md` §6

## Problem

The conversation proposes keeping "cached capability tiles per repo" to avoid hitting CodeWiki on every query, but no cache invalidation strategy is defined. The system doesn't know when to refresh tiles.

## Evidence

> "For routine commands, you don't want every 'does this exist?' query to trigger a full Code Wiki refresh. So: keep your own cached capability tiles per repo, only re-hit Code Wiki when: the repo has new commits, or you need a deeper, one-off check about a specific feature."

## Required

1. Define cache storage: where are cached tiles persisted? (PostgreSQL? Redis? Local JSON files?)
2. Implement git webhook or scheduled job to detect new commits
3. Define invalidation: full repo refresh vs. incremental (per-file changed) refresh
4. Implement "deep check" mode that bypasses cache and queries CodeWiki directly
5. Add cache freshness metadata (last_refreshed_at, stale_threshold)

## Notes

- Depends on: CW-002 (CodeWikiForge adapter)
- Without this, tiles become stale and the reuse recommendation quality degrades
- Consider: read-through cache vs. write-through cache semantics
