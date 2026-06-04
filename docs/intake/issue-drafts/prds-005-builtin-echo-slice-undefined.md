# PRDS-005: builtin.echo Slice Scope Undefined

## Summary

S0 is defined as `builtin.echo` with "full guard/receipt/tapestry verification" but no concrete interface, input/output contract, or boundary definition exists for `builtin.echo` in the document. What exactly does it echo? What are its input/output types? What is its retry behavior? What happens if the guard denies?

## Problem

The synthesis says: "A `code.scaffold --dry-run` loop is useful, but the truly smallest honest constitutional proof is the alternate run's **guarded non-side-effect toolcall** using `builtin.echo`, with full receipt-bundle verification."

But `builtin.echo` is never defined beyond the name. Before S0 can be implemented and verified, the slice needs an explicit contract:
- Input: what triggers `builtin.echo`?
- Output: what does it echo back?
- Guard: what decision token does it require?
- Receipt: what receipt does it produce?
- Boundary: what is NOT included in `builtin.echo`?

## Evidence

- Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Section: "Unified decisions, decision 2"
- Quote: "Slice S0: `builtin.echo` with full guard/receipt/tapestry verification"
- Quote: "`builtin.echo` ... should be slice zero"

## Criteria for Closing

- [ ] `builtin.echo` interface defined: input schema, output schema, error schema
- [ ] Guard token requirements documented (what policy_version, what constraints)
- [ ] Receipt shape documented (what claims does `builtin.echo` make?)
- [ ] Test cases defined: allow path, deny path, expired token path, policy mismatch path
- [ ] Slice boundaries documented (what is NOT part of `builtin.echo`)

## Labels

builtin-echo, s0, slice, spec

## Depends On

PRDS-001 (S0/S1 sequencing)

## Linked PR

`docs/intake/docs-intelligence/2026-06-04-entif-rosetta-prds-revisions-synthesis.md`
