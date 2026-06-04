# PRD-REV-001: Deterministic Canonicalization Test Vectors Must Include Tamper-Negative Cases

## Issue Metadata

| Field | Value |
| --- | --- |
| Title | RRP deterministic canonicalization requires tamper-negative test vectors |
| Type | `issue-candidate` |
| Status | `draft` |
| Labels | `rrp`, `test-vectors`, `conformance`, `alpha-rc` |
| Depends On | |
| Evidence | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` Finding 11 + ROCK-3111-C draftspec |

## Summary

The ROCK-3111-C v0.1.0 draftspec specifies that every RRP test vector set MUST include at least one positive case (correct canonical form produces correct CID) AND one tamper-negative case (malformed input produces detectable mismatch). The doc's canonicalization implementation uses Node's built-in `JSON.stringify` as an MVP-safe JCS subset, which is an RFC 8785 partial implementation. No existing test vector set in the repo currently satisfies the tamper-negative requirement.

## Context

The doc defines a "Final reconciled build order" in which RC-1 gates on "JCS/CID deterministic conformance green" and "tamper-negative tests compile red." The existing implementation of `jcs.ts` wraps Node built-ins rather than a standards-compliant library. RFC 8785 specifies a specific normalization algorithm (UTF-8, Unicode ancons, sorted keys, number formatting) that differs from Node's default `JSON.stringify`.

The tamper-negative test vectors would exercise:
- Non-canonical field ordering
- Invisible Unicode characters (U+200B, etc.)
- Non-deterministically formatted numbers (varying precision representations)
- Missing required fields
- Mismatched CID vs content

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| RRP TV1 positive test vector set | ROCK-3111-C §test-vectors | `packages/rosetta-canon` | P0 | Canonical input → stable CID |
| RRP TV1 tamper-negative test vector set | ROCK-3111-C §test-vectors | `packages/rosetta-canon` | P0 | Tampered input → rejection or mismatch |
| Replace Node built-in JCS with `json-canonicalize` npm in production receipt path | RFC 8785 compliance requirement | `packages/rosetta-canon` | P1 | MVP subset is sufficient for slice-zero; full library for alpha |
| CID stability test across Node.js versions (crypto.getRandomValues variation) | Cross-environment reproducibility | CI | P1 | Verify deterministic output in prod vs dev environments |

## Components And Technologies

- `json-canonicalize` npm package
- RFC 8785 (JCS)
- `multihash` npm package
- sha2-256-multihash-base58btc CID profile

## Acceptance Criteria

1. `packages/rosetta-canon/test-vectors/` contains at least one positive and one tamper-negative case for TV1
2. All positive cases produce identical CIDs across 3 independent runs
3. Tamper-negative cases are rejected or produce detectable mismatches in canonicalizer
4. `check-traceability-headers` passes on all new test vector files
5. CI pipeline runs canonicalizer test suite on every PR
