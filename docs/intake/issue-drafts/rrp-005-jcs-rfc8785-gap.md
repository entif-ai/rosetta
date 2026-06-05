# RRP-005: JCS MVP Canonicalizer May Not Be RFC 8785 Compliant — CID Stability Risk

## Type
- `type`: risk / spec-gap

## Status
- `status`: open

## Labels
- canonicalization
- rfc8785
- risk
- cid
- jcs

## Summary

The MVP canonicalizer uses Node's built-in `JSON.stringify` (or a minimal wrapper) for JCS canonicalization. The document explicitly acknowledges this is "an MVP-safe subset, which may not fully align with RFC 8785." Node's `JSON.stringify` does NOT guarantee stable object key ordering across all cases, which could cause CID instability — the same logical content producing different CIDs depending on object structure or Node version.

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` — "Deciding on JSON Canonicalizer for MVP":

> "For the rrp-tv1.spec.ts, I'll produce a minimal canonicalizer using Node's built-ins like JSON.stringify for the job. I'll mention that this is an MVP-safe subset, which may not fully align with RFC 8785."

RFC 8785 (JCS: JSON Canonicalization Scheme) requires:
1. Deterministic key ordering (sort keys)
2. Specific whitespace handling
3. Number serialization (no trailing zeros, etc.)
4. Unicode escaping rules

`JSON.stringify` satisfies (1) for most cases in current Node versions but is NOT specified as stable across versions, and it does NOT handle items 2-4.

## Why This Matters

- CIDs are computed over canonicalized content — if canonicalization is non-deterministic, the same artifact produces different CIDs
- Receipt verification depends on stable CIDs
- Tapestry bundle closure depends on stable content addressing
- Upgrading from the MVP subset to RFC 8785 later may break existing CIDs if the canonicalizer output changes

## Impact

- **High** for receipt verification: if CID changes between sign-time and verify-time, receipts fail
- **Medium** for storage: local CAS lookups could miss content due to CID mismatches
- **Medium** for cross-version compatibility: Node upgrade could subtly change canonicalization output

## Recommendation

1. Add explicit test cases that verify key-order independence: serialize the same logical object with different key orders and verify the same CID results
2. Track RFC 8785 compliance upgrade as a P1 post-alpha milestone
3. Consider using a known-compliant library (e.g., `json-canonicalize` on npm) even for MVP rather than relying on `JSON.stringify`
4. Add a comment in the canonicalizer code explicitly documenting this as a known gap with a link to this issue

## Depends On
RRP TV1 test vectors (which can serve as regression detection)

## GitHub Issue
(Not yet filed)
