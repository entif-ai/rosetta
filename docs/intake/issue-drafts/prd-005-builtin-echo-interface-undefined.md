# PRD-005: builtin.echo interface undefined — S0 vertical slice needs contract

## Metadata

| Field | Value |
| --- | --- |
| Title | builtin.echo interface undefined — S0 vertical slice needs contract before implementation |
| Type | spec |
| Status | draft |
| Source doc | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` |
| Finding | Unified Decision 2; Alpha RC-2 definition; "Slice S0: builtin.echo with full guard/receipt/tapestry verification" |
| Confidence | medium |

## Summary

The S0 vertical slice is defined as "builtin.echo with full guard/receipt/tapestry verification" but the actual interface and behavior of `builtin.echo` is not specified. No input contract, output contract, error behavior, or toolcall metadata is defined. Before S0 can be implemented, the `builtin.echo` tool contract must be authored.

## Problem

S0 is the foundational constitutional proof — the first thing that proves the RRP loop works end-to-end. If `builtin.echo`'s contract is undefined, implementation will either be guessed (leading to inconsistency across implementations) or blocked (leading to schedule slip).

From the context: "the truly smallest honest constitutional proof is the alternate run's guarded non-side-effect toolcall using builtin.echo" — but "echo" is underspecified. What does it echo? A string? A JSON payload? Does it write to a receipt? Does it touch the filesystem?

## Open Questions

1. **Input contract**: What does builtin.echo accept as input? (String argument? Structured payload? Both?)
2. **Output contract**: What does builtin.echo return? (Echoed input? A CID? A receipt CID?)
3. **Side effects**: Does it produce a receipt? Does it write to CAS? What is its footprint?
4. **Guard interaction**: Does builtin.echo require a guard decision token to execute? What happens without one?
5. **Toolcall CID**: What is the toolcall CID for builtin.echo? Is it stable?
6. **Error cases**: What happens on invalid input? On guard denial?

## Proposed Contract

```typescript
// Minimum viable builtin.echo contract (proposed, needs review)

interface EchoInput {
  payload: string | unknown;  // echo accepts anything serializable
  mode: 'parse_only' | 'dry_run' | 'execute';
}

interface EchoOutput {
  echo_cid: string;           // CID of the echoed payload
  toolcall_cid: string;        // CID of this toolcall invocation
  receipt_cid: string;         // CID of the produced receipt
  mode_used: 'parse_only' | 'dry_run' | 'execute';
  guard_decision?: string;     // guard decision ID if executed
}

// Tool metadata
const builtinEchoTool = {
  name: 'builtin.echo',
  version: '0.1.0',
  description: 'Echoes input back with full RRP receipt verification',
  input_kind: 'json',
  output_kind: 'json',
  side_effects: 'produces_receipt_only',
  guard_required: true,
  parse_only_default: true,
};
```

## Action Required

1. Author a tool contract doc for `builtin.echo` in `docs/RFCs/` or `docs/specs/`
2. Define input, output, error, and toolcall CID contracts
3. Specify guard interaction behavior
4. Add test vectors for builtin.echo in the RRP test vector suite
5. Align with TC-005 (Promotion state machine) — builtin.echo should be the first tool through the full state machine

## Labels

`builtin-echo`, `tool-contract`, `spec`, `vertical-slice`, `s0`, `tool`

## Depends On

- TC-005 (Promotion state machine — builtin.echo should exercise the full state machine)
