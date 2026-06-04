# PRD-REV-002: cryptoNonce() Uses Math.random() — Not Cryptographically Safe

## Issue Metadata

| Field | Value |
| --- | --- |
| Title | Receipt-bundle tapestry nonce generator uses Math.random() — not CSPRNG |
| Type | `issue-candidate` |
| Status | `draft` |
| Labels | `rosetta-tapestry`, `security`, `receipts` |
| Depends On | |
| Evidence | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`Finding 13 |

## Summary

The receipt-bundle tapestry builder implementation provided in the synthesis doc uses `Math.random()` to generate nonces:

```typescript
function cryptoNonce(): string {
  return `nonce_${Math.random().toString(36).slice(2, 12)}`;
}
```

`Math.random()` is not cryptographically secure. An attacker who can observe or predict nonce values could potentially forge receipt bundles or replay them across sessions. This is a HIGH severity security issue for any receipt bearing a non-repudiation guarantee.

## Context

Rosetta's receipt-based non-repudiation model depends on unique, unpredictable nonces in receipt and tapestry artifacts. If nonce generation is predictable:

1. An attacker who observes one receipt bundle could predict future nonces
2. Replay of receipt bundles becomes possible
3. The cryptographic binding between receipt and tapestry closure is weakened
4. Any downstream audit or dispute resolution that relies on receipt uniqueness is compromised

The fix is straightforward: replace with `crypto.randomBytes()` or the Web Crypto API's `crypto.getRandomValues()`.

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Replace `Math.random()` nonce with CSPRNG in receipt-bundle builder | Receipt bundle integrity requirement | `packages/rosetta-tapestry/src/receipt-bundle.ts` | P0 | `crypto.randomBytes()` or Web Crypto `getRandomValues()` |
| Add nonce uniqueness constraint to receipt-bundle schema | RRP tapestry profile | `packages/rosetta-tapestry/schema/` | P1 | Document that nonces must be unique per builder session |
| Add nonce collision detection at bundle verification time | RRP closure validation | `packages/rosetta-tapestry/src/verify.ts` | P1 | Check for nonce reuse as a replay signal |
| Add regression test for nonce uniqueness | `rosetta-tapestry` test suite | `packages/rosetta-tapestry/__tests__/` | P1 | 1000-iteration nonce gen; zero collisions |

## Acceptance Criteria

1. `cryptoNonce()` uses `crypto.randomBytes()` or equivalent CSPRNG — zero uses of `Math.random()`
2. Nonce output is base64url-encoded and at least 16 bytes of entropy
3. All existing tests pass after the replacement
4. New regression test runs 1000-iteration nonce uniqueness check in CI
5. `check-traceability-headers` passes on all modified/new files
