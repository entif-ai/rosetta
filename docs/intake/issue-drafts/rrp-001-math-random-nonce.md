# RRP-001: Math.random() in cryptoNonce — Replace with crypto.randomBytes()

## Type
- `type`: security bug

## Status
- `status`: open

## Labels
- security
- bug
- rrp
- receipt-bundle

## Summary

`packages/rosetta-tapestry/src/receipt-bundle.ts` uses `Math.random()` to generate nonces in the `cryptoNonce()` function. This is NOT cryptographically secure. In a receipt-bundle context, nonce values must be unpredictable to guarantee receipt uniqueness and prevent replay attacks.

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` — "New work product 3: code patches" → receipt-bundle.ts:

```typescript
function cryptoNonce(): string {
  return `nonce_${Math.random().toString(36).slice(2, 12)}`;
}
```

`Math.random()` is a seeded PRNG with predictable output given enough observations. A motivated attacker who observes enough receipts can predict future nonces, enabling:
1. Receipt uniqueness collision (duplicate nonces)
2. Replay injection (predicted nonces for targeted insertion)

## Recommendation

Replace `cryptoNonce()` with `crypto.randomBytes()` or `crypto.randomUUID()`:

```typescript
import { randomBytes } from 'node:crypto';

function cryptoNonce(): string {
  return `nonce_${randomBytes(16).toString('hex')}`;
}
```

Or use `crypto.randomUUID()` (Node 14.17+) which is RFC 4122 compliant.

## Depends On
(None — independent fix)

## GitHub Issue
(Not yet filed)
