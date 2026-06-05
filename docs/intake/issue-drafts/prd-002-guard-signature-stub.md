# PRD-002: Guard Signature Verification is an MVP Stub

## Metadata

- **Type**: security
- **Status**: candidate
- **Priority**: high
- **Labels**: guard, security, crypto, production-readiness
- **Depends on**: 20260410 PRD revisions synthesis (code patches)
- **Confidence**: high

## Problem Statement

The `admission.ts` code patch from the 20260410 PRD revisions synthesis includes a `verifyDecisionSignature()` function that is explicitly a stub:

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

This stub only checks that `sig.kid` and `sig.sig_b64` are **present**, not that they are **cryptographically valid**. A malicious actor could:
1. Provide any valid JSON with `sig: { kid: "...", sig_b64: "..." }` — even random strings
2. Bypass the guard admission check entirely

The comment says "require signature object presence to avoid naked allows" — but a present-but-invalid signature is not meaningfully better than no signature.

## Evidence

From `admission.ts` in 20260410 PRD revisions synthesis:
> "// MVP stub: // 1. canonicalize token without transient fields if required // 2. resolve token.sig.kid // 3. verify token.sig.signed / sig_b64"

The `admit()` function calls `verifyDecisionSignature(token)` and returns `deny("INVALID_DECISION_SIGNATURE")` if it returns false. But the stub always returns `true` if `sig.kid` and `sig.sig_b64` are present, regardless of their actual validity.

## Scope

1. **Cryptographic verification**: Real signature verification requires: (a) canonicalizing the token without transient fields, (b) looking up the key by `sig.kid` from a trusted key store, (c) verifying the signature using the correct algorithm (EdDSA, ES256, etc.)
2. **Key management**: `sig.kid` must resolve to a real key. Where are Guard signing keys stored? How are they rotated?
3. **Algorithm agility**: What algorithms are supported? EdDSA? ES256? RS256? How is algorithm choice encoded in the token?
4. **Canonicalization**: Which fields are included in the bytes signed? The comment says "canonicalize token without transient fields" — what counts as transient? `sig` itself? `expires_at`? Timestamps?
5. **Production gate**: This stub cannot be shipped in any production deployment. It should be blocked behind a feature flag or build error.

## Implementation Notes

- Flag as **P0 security tech debt** before any production deployment
- Consider whether Guard should fail-closed by default (deny if verification fails or is unavailable) vs fail-open (allow if verification is unavailable)
- The MVP stub approach of "presence check" is acceptable for local dev, but must be gated behind `NODE_ENV=production` or similar

## Related

- rosetta-guard admission module
- RRP content model (sig field definition)
- GuardDecisionToken type
- DI-008 (ledger locking mechanism) — related to preventing duplicate work on guard verification