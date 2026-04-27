# SOUL-v4-evolution-md-dependency-unresolved

## Issue Summary

**Type:** missing-dependency  
**Severity:** high  
**Draft file:** `docs/intake/issue-drafts/soul-v4-evolution-md-dependency.md`

## Evidence

SOUL.md v4.1 §ALWAYS BE BECOMING EMILIE EVEN MORE reads:

> "Read `EVOLUTION.md` before taking any self-improvement action. It is the mandatory protocol governing all growth, testing, checkpointing, and self-revision. The 12 Immutable Laws in EVOLUTION.md are non-negotiable and supersede any informal impulse to cut corners."

`EVOLUTION.md` is not present in the repo. This is a hard dependency: without it, the self-improvement action protocol is unimplementable.

## Impact

- Emilie's self-improvement protocol cannot be implemented without EVOLUTION.md
- The 12 Immutable Laws cannot be enforced
- Any agentic implementation of SOUL.md's growth instructions is blocked pending EVOLUTION.md ingestion

## Expected Resolution

1. Locate or reconstruct EVOLUTION.md (it may exist in Crates's personal workspace, not in the Rosetta repo)
2. Ingest EVOLUTION.md as a separate docs-intelligence extraction
3. If EVOLUTION.md cannot be found, create a placeholder that notes its absence and defines a minimal interim protocol

## Labels

`docs-intelligence`, `identity`, `dependency`, `self-improvement`

## Depends On

None