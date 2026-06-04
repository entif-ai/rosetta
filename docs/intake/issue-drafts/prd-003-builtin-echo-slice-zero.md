# PRD-003: builtin.echo slice-zero — guard/receipt/tapestry end-to-end

## Meta

| field | value |
| --- | --- |
| status | issue-candidate |
| type | implementation |
| priority | P0 |
| label | builtin-echo, guard, tapestry, slice-zero |
| depends-on | PRD-001, PRD-002 |
| evidence | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md |

## Summary

Implement `builtin.echo` as the true slice-zero of the MVP — a non-side-effecting toolcall with full guard/receipt/tapestry verification end-to-end. This supersedes any prior plan that made `code.scaffold --dry-run` slice zero.

## Problem Statement

Prior build orders placed `code.scaffold --dry-run` as the first slice. The 2026-04-10 synthesis correctly identifies this as too "developer delight" flavored. The truly smallest honest constitutional proof is `builtin.echo` with guard admission, receipt issuance, and receipt-bundle tapestry verification.

## Proposed Implementation

### builtin.echo tool

```
builtin.echo(message: string, dry_run?: boolean): EchoResult
```

- Does not write any side effects when `dry_run=true`
- When `dry_run=false` (or omitted in parse-only mode), writes to local CAS
- Emits exactly one `rosetta.receipt` per invocation
- Receipt is included in the `rosetta.tapestry` receipt-bundle for the run

### Guard admission gate

- Before echo executes, `rosetta-guard` evaluates `admit()` with a `GuardDecisionToken`
- Token must have: `policy_version`, `policy_hash`, non-expired `expires_at`, matching `subject.tool = "builtin.echo"`, and valid `sig`
- Denied tokens produce `AdmissionResult { ok: false, decision: "deny", reasonCodes: [...] }`

### Receipt-bundle tapestry

- After echo completes, `buildReceiptBundleTapestry()` is called
- Bundle includes all receipt CIDs from the run as `roots.receipts`
- Profile: `rrp:tapestry.profile.receipt_bundle`
- `closure_policy: "rrp.bundle.closure.v0"`

### End-to-end verification

- Receipt verifies against `packs/rrp/schema/receipt-content.schema.json`
- Tapestry verifies against `packs/rrp/schema/receipt-bundle-tapestry.schema.json`
- SHACL shapes validate
- Tamper-negative (sig modified after receipt issued) correctly fails

## Constraints and Preconditions

- Depends on: PRD-001 (RRP receipt schema), PRD-002 (ROCK-3111-C pack filesystem contract)
- Depends on: rosetta-canon, rosetta-cid, TV1/tamper test vectors green (step 1 of build order)
- Depends on: rosetta-guard admission and deny-path tests (step 3 of build order)

## Verification

- [ ] `builtin.echo "hello"` produces a receipt in local CAS
- [ ] Guard denies when `decisionToken` is missing
- [ ] Guard denies when `policy_version` mismatches
- [ ] Guard denies when `expires_at` is in the past
- [ ] Guard denies when `subject.tool` doesn't match `builtin.echo`
- [ ] Guard denies when `sig` is absent
- [ ] Receipt bundle tapestry verifies with profile `rrp:tapestry.profile.receipt_bundle`
- [ ] Tamper-negative test passes (sig tampered → receipt verify fails)
- [ ] TV1 positive test vector passes

## Notes

- This is the constitutional zero — nothing else ships until this is green
- After this is verified, `code.scaffold --dry-run` becomes S1 reusing the same constitutional loop