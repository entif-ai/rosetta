# RRP-002: Guard Decision Token Signature Verification is an MVP Stub

## Type
- `type`: security / implementation gap

## Status
- `status`: open

## Labels
- security
- guard
- implementation
- rrp

## Summary

The `verifyDecisionSignature()` function in `packages/rosetta-guard/src/admission.ts` is an MVP stub that only checks for the presence of `kid` and `sig_b64` fields in the signature object. It does NOT perform actual cryptographic signature verification (e.g., Ed25519 verification). This means any token with a populated `sig` object (regardless of whether the signature is valid) will pass verification.

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` — "New work product 3: code patches" → admission.ts:

```typescript
function verifyDecisionSignature(token: GuardDecisionToken): boolean {
  // MVP stub:
  // 1. canonicalize token without transient fields if required
  // 2. resolve token.sig.kid
  // 3. verify token.sig.signed / sig_b64
  // For now, require signature object presence to avoid "naked allows".
  return !!token.sig?.kid && !!token.sig?.sig_b64;
}
```

The stub comment acknowledges it is MVP-only and lists the proper steps, but the implementation is NOT complete. A Guard decision token with a forged `sig` object would pass admission if it contains `kid` and `sig_b64` fields — regardless of whether the signature is cryptographically valid.

## Impact

- An attacker who can inject a fake Guard decision token with a well-formed but invalid `sig` object could bypass admission checks
- The "allow" decision in `admit()` depends on `verifyDecisionSignature()` returning `true`
- This is a fail-open risk in the current code

## Recommendation

1. Implement proper Ed25519 (or appropriate algorithm) signature verification:
   - Resolve `kid` to public key
   - Canonicalize the token (excluding `sig` field per RRP spec)
   - Verify `sig.signed` against the canonicalized bytes using the resolved public key
2. Add integration tests with forged, malformed, and valid signatures
3. Document the key management approach (how are Guard signing keys provisioned?)

## Depends On
(None — can be addressed independently)

## GitHub Issue
(Not yet filed)
