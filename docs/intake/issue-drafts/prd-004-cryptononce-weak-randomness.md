# PRD-004: cryptoNonce() uses Math.random() — not cryptographically secure

## Metadata

| Field | Value |
| --- | --- |
| Title | receipt-bundle.ts cryptoNonce() uses Math.random() — replace with crypto.randomBytes() |
| Type | security |
| Status | draft |
| Source doc | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` |
| Finding | receipt-bundle.ts code patch; cryptoNonce() implementation |
| Confidence | high |

## Summary

The `buildReceiptBundleTapestry()` function in the source's `receipt-bundle.ts` code patch uses `Math.random()` to generate nonces: `nonce_${Math.random().toString(36).slice(2, 12)}`. This is not cryptographically secure. If this code (or a derivative) is used in production, the nonce can be predicted, enabling replay attacks or nonce collision attacks on receipt bundles.

## Problem

`Math.random()` is a PRNG with predictable output on V8 (JavaScript engine). Anyone who can observe the JS engine's state can predict future random values. For cryptographic nonces used in receipt bundles:

1. **Predictability**: An attacker who can observe some nonce values can predict subsequent nonces
2. **Collision risk**: `Math.random()` in V8 has ~53 bits of mantissa; combined with the slice operation, the effective entropy is low (~22 bits). Nonce collisions in high-volume receipt bundle generation are plausible
3. **Compliance**: FIPS 140-2/3 compliant systems, and any system making security claims about receipt integrity, cannot use non-crypto RNGs for nonce generation

## Required Fix

Replace with `crypto.randomBytes()` (Node.js built-in, FIPS-compliant when Node is in FIPS mode):

```typescript
import { randomBytes } from 'node:crypto';

function cryptoNonce(): string {
  return `nonce_${randomBytes(16).toString('hex')}`;
}
```

This provides 128 bits of cryptographic randomness — collision probability is negligible.

## Scope

This issue appears in a code *patch* from a chat export, not from production code. The question is whether this pattern exists elsewhere in the codebase. A grep for `Math.random()` across all TypeScript files should be performed to find other non-crypto RNG usages in security-relevant paths.

## Labels

`security`, `nonce`, `random`, `crypto`, `receipt-bundle`

## Depends On

— (standalone fix; no blockers)
