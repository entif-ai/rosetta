# DCP-007: Self-building bootstrap path not planned

**Type:** issue-candidate  
**Confidence:** medium  
**Source:** `docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md` §6

## Problem

The self-building bootstrap path (system eventually re-implements itself) is described conceptually but has no concrete plan or criteria.

## Evidence

"1. Treat DeepCode as just another spec (write Entif Builder v1 spec). 2. Bootstrap pass: use v0 orchestrator to implement v1 orchestrator. 3. Gated self-modification: system proposes PR-like bundles (diffs+rationale+updated specs+tests); human approves; auto-merge for docs/refactors with 100% coverage, manual for architecture. 4. Spec-as-code discipline."

## Required

1. Define "Entif Builder v1" spec: what the orchestrator does, in spec form
2. Define bootstrap pass criteria: what coherence score + test coverage enables it?
3. Define PR-like bundle format: diffs + rationale + updated specs + tests
4. Define approval workflow: auto-merge for what categories? Manual for what?
5. Define spec-as-code enforcement: every orchestrator change requires spec+blueprint update
6. Write implementation plan with gates/criteria

## Notes

- Phase 2 goal; depends on DCP-001 through DCP-006 all being stable
- Important: must define exit criteria before attempting
