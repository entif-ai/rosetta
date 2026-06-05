# Issue Draft — PRD-REV-002: Implement builtin.echo as slice-zero vertical slice

## Title

PRD-REV-002: Implement builtin.echo as slice-zero vertical slice

## Type

implementation

## Labels

builtin-echo, slice-zero, guard-verification

## Depends On

PRD-REV-001

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`

> "the truly smallest honest constitutional proof is the alternate run's **guarded non-side-effect toolcall** using `builtin.echo`, with full receipt-bundle verification. That should be slice zero."

This is a supersession: prior PRD runs listed `code.scaffold --dry-run` as the first vertical slice. The synthesis resolves this — `builtin.echo` is slice zero, `code.scaffold --dry-run` is S1.

## Description

`builtin.echo` is a minimal guarded non-side-effect toolcall that serves as the smallest honest constitutional proof for the Rosetta MVP. It must:

1. Accept a guard decision token
2. Emit a `rosetta.receipt` 
3. Include the receipt in a `rosetta.tapestry` receipt-bundle
4. Pass full verification end-to-end (Alpha RC-2 milestone)

The slice zero vertical slice establishes the complete constitutional loop — guard → toolcall → receipt → bundle → verification — before any real side-effecting work is attempted.

This is a prerequisite for the `code.scaffold --dry-run` S1 slice.

## Proposed Action

- Define `builtin.echo` tool interface (input/output shapes)
- Implement `builtin.echo` in the Rosetta tool surface
- Implement guard admission check for `builtin.echo`
- Implement `rosetta.receipt` emission
- Implement `rosetta.tapestry` receipt-bundle closure
- Implement verification pass
- Wire into Alpha RC-2 milestone
