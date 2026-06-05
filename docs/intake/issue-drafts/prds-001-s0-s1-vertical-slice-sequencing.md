# PRDS-001: S0/S1 Vertical Slice Sequencing — builtin.echo Before code.scaffold

## Summary

The 2026-04-10 PRD synthesis establishes a two-step vertical slice ordering where `builtin.echo` (S0) must complete before `code.scaffold --dry-run` (S1) can begin. S0 is the "truly smallest honest constitutional proof" — a guarded non-side-effect toolcall with full receipt-bundle verification. S1 reuses the same constitutional loop but is not the starting point.

## Problem

The earlier "developer delight" MVP framing put `code.scaffold --dry-run` too early in the sequence. The correct ordering is:

1. **S0**: `builtin.echo` with full guard/receipt/tapestry verification
2. **S1**: `code.scaffold --dry-run` using the same constitutional loop

This matters because S0 establishes the constitutional proof pattern that S1 extends. Skipping S0 means S1 has no guard/receipt loop to extend.

## Evidence

- Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Section: "Unified decisions, decision 2"
- Quote: "Slice S0: `builtin.echo` with full guard/receipt/tapestry verification. Slice S1: `code.scaffold --dry-run` using the same constitutional loop."
- Quote: "`builtin.echo` ... should be slice zero. `code.scaffold --dry-run` becomes slice one."

## Criteria for Closing

- [ ] S0 (`builtin.echo`) slice defined with explicit interface and boundaries
- [ ] S0 passes end-to-end with guard admission, receipt issuance, and receipt-bundle tapestry verification
- [ ] S1 (`code.scaffold --dry-run`) builds on S0's constitutional loop, not a parallel path
- [ ] Build order documentation reflects S0-before-S1 constraint

## Labels

build-order, sequencing, alpha-rc, s0, s1

## Depends On

(none — this is the foundational sequencing decision)

## Linked PR

`docs/intake/docs-intelligence/2026-06-04-entif-rosetta-prds-revisions-synthesis.md`
