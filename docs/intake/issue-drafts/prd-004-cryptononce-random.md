# PRD-004: cryptoNonce() Uses Math.random() — Not Cryptographically Random

## Metadata

- **Type**: security
- **Status**: candidate
- **Priority**: high
- **Labels**: crypto, security, randomness, receipts, tapestry
- **Depends on**: 20260410 PRD revisions synthesis (receipt-bundle.ts code patch)
- **Confidence**: high

## Problem Statement

The `buildReceiptBundleTapestry()` function in the receipt-bundle.ts code patch uses `Math.random()` to generate nonces:

```typescript
function cryptoNonce(): string {
  return `nonce_${Math.random().toString(36).slice(2, 12)}`;
}
```

`Math.random()` is a **pseudo-random number generator (PRNG)**, not a cryptographically secure random number generator (CSPRNG). It is predictable, seeded from internal state, and not suitable for security-sensitive operations.

Receipt bundle nonces are security-sensitive: they serve as unique identifiers and entropy sources in the bundle closure. If an attacker can predict or influence nonce generation, they may be able to:
1. **Collide with existing nonces**: Generate bundles that collide with prior receipts
2. **Fingerprint bundles**: Correlate nonce generation patterns with specific builds/sessions
3. **Break closure integrity**: A predictable nonce reduces the entropy of the bundle's Merkle closure

## Evidence

From receipt-bundle.ts (20260410 PRD revisions synthesis):
```typescript
function cryptoNonce(): string {
  return `nonce_${Math.random().toString(36).slice(2, 12)}`;
}
```

`Math.random()` is explicitly documented by the ECMAScript spec as producing values "deterministically reproducible" given the same seed, and is explicitly **not** recommended for security-sensitive purposes.

## Scope

1. **Replace Math.random() with crypto.randomUUID()**: Node.js `crypto` module provides `crypto.randomUUID()` (RFC 4122) which uses a CSPRNG. This is the minimal fix.
2. **Replace with crypto.getRandomValues()**: For more control, `crypto.getRandomValues(new Uint8Array(16))` provides raw CSPRNG bytes.
3. **Nonce format**: Current format `nonce_${10-char-base36}` has limited entropy (approximately log2(36^10) ≈ 51.5 bits). For security-sensitive use, 128-bit UUIDs (122 bits of entropy) are preferred.
4. **Audit all nonce usage**: Are there other nonce generation sites in the codebase using insecure random sources?
5. **Add CSPRNG requirement to RRP spec**: The RRP Pack Filesystem Contract should require cryptographic nonce generation for all receipt and tapestry artifacts.

## Implementation Notes

- The fix is trivial: replace `Math.random()` with `crypto.randomUUID()`
- However, existing receipts generated with the insecure nonce format may need migration or re-generation
- This issue should be fixed before any alpha RC that includes receipt bundle generation

## Related

- receipt-bundle.ts (receipt-bundle tapestry profile)
- RRP Pack Filesystem Contract
- GuardDecisionToken (also uses nonce field — check for similar issue)