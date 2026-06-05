# PRD-003: Guard decision token signature verification is an MVP stub

## Metadata

| Field | Value |
| --- | --- |
| Title | Guard decision token signature verification is an MVP stub — needs real cryptographic implementation |
| Type | security |
| Status | draft |
| Source doc | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` |
| Finding | admission.ts code patch; verifyDecisionSignature stub |
| Confidence | high |

## Summary

The `verifyDecisionSignature()` function in `rosetta-guard/src/admission.ts` (from the source document's code patch) is an MVP stub that only checks for the *presence* of signature fields, not their *validity*. It returns true if `!!token.sig?.kid && !!token.sig?.sig_b64` — meaning any token with a populated sig object passes, regardless of whether the signature is cryptographically correct.

## Problem

This is a security-critical gap. The admission gate relies on guard decision tokens to authorize tool execution. If any token with a populated `sig` object bypasses the guard, an attacker who can inject a fake token with fake `kid`/`sig_b64` values would be admitted. The guard would appear to be enforcing signatures when it is not.

From the source: "MVP stub: require signature object presence to avoid 'naked allows'." The presence check does prevent naked allows (tokens with no sig at all), but it does not prevent arbitrary signature injection.

## Required Fix

Replace the stub with real cryptographic verification:

```typescript
async function verifyDecisionSignature(token: GuardDecisionToken): Promise<boolean> {
  // 1. Canonicalize token payload (excluding sig field per RRP hashing rule)
  // 2. Resolve key from token.sig.kid (key ID → public key lookup)
  // 3. Decode Base64 signature from token.sig.sig_b64
  // 4. Verify: Ed25519/EdDSA verify(signingKey, canonicalizedPayload, signature)
  // 5. Return true only on successful verification
  //
  // Key management questions to resolve:
  // - Where are guard signing keys stored?
  // - How is kid mapped to public key?
  // - What is the key rotation strategy?
  // - How is the guard's own identity bootstrapped (who signs the first guard decision)?
}
```

## Additional Context

The admission.ts patch also shows `sig` excluded from CID computation ("the signature hashing rule that excludes sig from CID computation and signs the CID or stable multihash commitment") — this is correct per RRP but needs to be verified against the actual CID computation implementation.

## Security Considerations

- Guard signing key bootstrap: if the guard's own identity key isn't bootstrapped securely, the entire token verification chain is compromised
- Key rotation: if signing keys rotate, existing tokens must either be invalidated or the rotation must be handled in the verification logic
- Denial of service: signature verification is expensive; rate limiting or timeout on verification needed

## Labels

`guard`, `security`, `signature`, `mvp`, `admission`, `cryptography`

## Depends On

- TC-005 (Promotion state machine — guard admission is part of write gate)
- Key bootstrap strategy decision
