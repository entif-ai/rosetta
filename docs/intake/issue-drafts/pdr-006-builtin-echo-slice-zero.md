# PDR-006: Slice-Zero `builtin.echo` Vertical Slice — Guard/Receipt/Tapestry Verification

## Metadata

| Field | Value |
|---|---|
| Type | implementation |
| Status | draft |
| Labels | slice-zero, builtin-echo, vertical-slice |
| Confidence | high |

## Evidence

Extraction: `docs/intake/docs-intelligence/2026-06-05-prd-revision-synthesis.md`
Finding: "Slice S0: `builtin.echo` with full guard/receipt/tapestry verification. Slice S1: `code.scaffold --dry-run`"

## Problem

The earlier scaffold-first approach placed `code.scaffold --dry-run` as the first slice. The synthesis supersedes this: slice zero must be `builtin.echo` with full guard/receipt/tapestry verification. `code.scaffold --dry-run` becomes slice one. The `builtin.echo` slice has not been implemented yet.

## Proposal

Implement `builtin.echo` as the first demonstrable vertical slice (slice zero):

**Slice-zero requirements:**
1. `builtin.echo` tool exists and is callable
2. Guard intercepts the call and runs `admit()` with a valid decision token
3. Receipt is emitted with RRP-conformant schema (subjects, claims, digests, policy_refs, nonce, auth, sig)
4. Receipt bundle (tapestry) is built with `rrp:tapestry.profile.receipt_bundle` profile
5. Bundle verifies successfully (receipt CID chains correctly, sig validates)
6. No side effects — echo only, but through the full constitutional loop

**Sequence:**
1. Nx workspace + canon/cid/validate (RC-0 prerequisite)
2. RRP receipt + tapestry schemas green (RC-1 prerequisite)
3. Guard admission + deny-path tests green (RC-2 prerequisite)
4. `builtin.echo` end-to-end slice passes

**Verification criteria:**
- Can call `builtin.echo` with a guard decision token
- Guard admits the call (valid token, correct tool, not expired)
- Receipt is emitted and CID is stable (JCS canonicalization)
- Receipt contains all RRP-required fields
- Tapestry bundles the receipt with correct profile
- Verification succeeds end-to-end

## Implementation Notes

- Depends on PDR-001 (staircase adoption), PDR-003 (RRP receipt schema), PDR-004 (guard token structure)
- This is the first proof that the constitutional loop works — must be done correctly, not fast
- `builtin.echo` can be in `rosetta-core` or a new `rosetta-builtin` package
- After slice zero, `code.scaffold --dry-run` reuses the same loop (slice one)

## Depends On

- PDR-001 (alpha RC staircase adopted)
- PDR-003 (RRP exact receipt schema implemented)
- PDR-004 (guard decision token structure implemented)

## References

- Source doc: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Extraction: `docs/intake/docs-intelligence/2026-06-05-prd-revision-synthesis.md`
- Related: "Final reconciled build order" — step 4 is `builtin.echo` verified slice