# PRDS-008: Alpha RC-0 Through RC-4 Gate Criteria Need Formal Tickets

## Summary

The synthesis defines an Alpha RC staircase (RC-0 through RC-4) with specific gate criteria in prose, but these are not tracked as formal tickets. Each RC level needs explicit acceptance criteria that can be verified in CI/code review.

## Problem

The prose defines:
- **RC-0**: Nx workspace boots; `canon`, `cid`, `validate` exist; TV1 and tamper-negative tests compile red
- **RC-1**: JCS/CID deterministic conformance green; `rosetta.receipt` schema green; `rosetta.tapestry` receipt-bundle schema green
- **RC-2**: Guard denies missing/expired/mismatched tokens; `builtin.echo` vertical slice passes end-to-end; receipt bundle verifies successfully
- **RC-3**: `code.scaffold --dry-run` reuses same constitutional loop; no real side effects yet; CLI/API both green
- **RC-4**: local CAS + SQLite query surfaces stable; rights-scoped retrieval enforced; operator UI stub exists but is non-gating

These are gate criteria but they exist only in a chat document. They need to become:
1. Milestone/epic covering all 5 RC levels
2. Individual tickets per RC level with checklist criteria
3. CI gate definitions that assert each RC level's requirements

## Evidence

- Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Section: "New work product 1: merged MVP staircase"
- Full prose definitions for RC-0 through RC-4

## Criteria for Closing

- [ ] Milestone "Alpha RC Gates" created in GitHub project
- [ ] RC-0 ticket with checklist: Nx workspace boots, canon/cid/validate exist, TV1 compiles red
- [ ] RC-1 ticket with checklist: JCS/CID conformance green, receipt schema green, tapestry schema green
- [ ] RC-2 ticket with checklist: guard denies bad tokens, builtin.echo passes E2E, receipt bundle verifies
- [ ] RC-3 ticket with checklist: code.scaffold --dry-run works, no side effects, CLI/API green
- [ ] RC-4 ticket with checklist: local CAS + SQLite stable, rights-scoped retrieval enforced, UI stub non-gating
- [ ] Each RC ticket blocks the next (RC-1 blocked by RC-0, etc.)

## Labels

alpha-rc, mvp, tracking, gate-criteria

## Depends On

PRDS-001 (S0/S1 sequencing), PRDS-005 (builtin.echo definition)

## Linked PR

`docs/intake/docs-intelligence/2026-06-04-entif-rosetta-prds-revisions-synthesis.md`
