# PRD-REV-003: Guard Signature Verification Stubbed — Fail-Closed Requires Full Implementation

## Issue Metadata

| Field | Value |
| --- | --- |
| Title | verifyDecisionSignature() stub does not validate actual cryptographic signatures — fail-closed incomplete |
| Type | `issue-candidate` |
| Status | `draft` |
| Labels | `rosetta-guard`, `security`, `constitutional` |
| Depends On | PRD-REV-001 (canonicalization test vectors needed to validate signature input canonicalization) |
| Evidence | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` Finding 12 |

## Summary

The guard admission module's `verifyDecisionSignature()` function is a stub that only checks for the presence of `kid` and `sig_b64` fields:

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

This means any token with populated `kid` and `sig_b64` fields passes — regardless of whether the signature is cryptographically valid. This is a critical security gap: fail-closed requires that invalid signatures are rejected, not that signature fields merely exist.

## Context

Rosetta's constitutional guarantee depends on the guard being the gate for all durable mutations. The guard admission check must not allow unauthorized tool execution. A stub that accepts any populated token makes the guard an ineffective control.

Before alpha RC-2 ("Guard denies missing/expired/mismatched tokens; builtin.echo verified slice passes end to end"), this stub must be replaced with a proper signature verification implementation:

1. Canonicalize the token payload (without `sig` field — per RRP spec `sig` is excluded from CID computation)
2. Resolve the signing key from `token.sig.kid`
3. Verify the signature `token.sig.sig_b64` against the canonicalized payload using the resolved key's algorithm
4. Reject if key resolution fails, algorithm mismatch, or signature comparison fails

Key management and key rotation strategy are separate concerns (not in scope for this issue but should be tracked separately).

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Implement `verifyDecisionSignature()` with real cryptographic verification | Fail-closed security requirement | `packages/rosetta-guard/src/admission.ts` | P0 | Reject any token that doesn't pass full verification |
| Support Ed25519 signature verification (as per Entif v0 agentic messaging spec) | Entif messaging spec | `packages/rosetta-guard/src/` | P0 | The spec cites Ed25519 for signed envelopes |
| Add unit tests for valid signature, invalid signature, tampered payload cases | Test completeness | `packages/rosetta-guard/__tests__/` | P0 | Must cover: valid sig, bad sig, tampered payload, wrong key |
| Add deny-path test for `verifyDecisionSignature()` returning false | Denial-of-service on bad sig | `packages/rosetta-guard/__tests__/` | P0 | Guard must deny when signature verification fails |
| Document canonicalization requirements for token signing | RRP spec + this doc | `docs/reference/guard-signing-conventions.md` | P1 | The sig exclusion-from-CID rule specifically |

## Acceptance Criteria

1. `verifyDecisionSignature()` performs real cryptographic verification — no field-presence-only stubs
2. All signature-related test cases in `__tests__/` pass (valid, invalid, tampered payload, wrong key)
3. Guard denies tokens when signature verification fails
4. `check-traceability-headers` passes on all modified/new files
5. Documentation exists at `docs/reference/guard-signing-conventions.md`
