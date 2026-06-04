# PRS-004: JCS MVP Canonicalizer Compliance Gap — RFC 8785 Full Compliance Later

## Metadata

| Field | Value |
| --- | --- |
| Title | JCS MVP Canonicalizer Compliance Gap — RFC 8785 Full Compliance Later |
| Type | tech-debt |
| Status | candidate |
| Source doc | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` |
| Extraction | `2026-06-05-entif-rosetta-prds-revisions-synthesis.md` |
| Labels | jcs, rfc8785, canonicalization, technical-debt |
| Confidence | medium |

## Problem

The MVP uses Node built-ins (`JSON.stringify`) for JCS canonicalization, which may not fully comply with RFC 8785 (JSON Canonicalization Scheme). This is an intentional MVP shortcut, but the gap must be tracked so it doesn't silently persist into production.

## Evidence

From the source document:
> "For rrp-tv1.spec.ts, I'll produce a minimal canonicalizer using Node's built-ins like JSON.stringify for the job. I'll mention that this is an MVP-safe subset, which may not fully align with RFC 8785, and recommend using a full standards-compliant library later."

## Technical Debt Description

| Aspect | MVP State | Target State |
| --- | --- | --- |
| Canonicalization | `JSON.stringify` with ad-hoc ordering | Full RFC 8785 JCS |
| Key ordering | Assumed stable but unverified | Deterministic per RFC 8785 §4 |
| Whitespace handling | Not explicitly specified | RFC 8785 §2.1 |
| Unicode normalization | Not implemented | NFC form per RFC 8785 |
| Number formatting | Platform-dependent | RFC 8785 §2.2 (no unnecessary trailing zeros) |

## Why This Matters

The RRP receipts use CID/multihash commitments that depend on stable canonical input. If JCS canonicalization is not RFC 8785 compliant, receipts generated on different platforms or Node versions could produce different CIDs for identical content — violating the core append-only immutability guarantee.

## Upgrade Path

1. **Before Alpha RC-1**: Identify a Node.js JCS library (e.g., `json-canonicalize` npm package or equivalent)
2. **Alpha RC-1 milestone**: Replace MVP canonicalizer with standards-compliant library
3. **Verify TV1 test vectors**: Ensure new library produces identical output to expected test vectors

## Test Vector Requirement

ROCK-3111-C requires that test vectors include both positive (valid canonical) and tamper-negative (invalid canonical) cases. The MVP canonicalizer should at minimum:
- Produce consistent output on repeated calls (determinism)
- Handle nested objects, arrays, strings, numbers, booleans, null
- Be tested against the TV1 hash-input test vector

## Risk

If the MVP canonicalizer produces non-RFC 8785 output, it may:
- Produce platform-dependent CIDs
- Fail interoperability with other RRP-compliant implementations
- Cause receipt verification failures in multi-platform deployments

## Related Issues

- PRS-001 (ROCK-3111-C) requires test vectors that expose this gap
- PRS-005 (Alpha RC staircase) should include RFC 8785 compliance gate

## Notes

The MVP canonicalizer is acceptable for alpha but must be explicitly tracked as technical debt, not silently accepted as production-ready.