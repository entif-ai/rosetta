# PRD-006: JCS canonicalizer MVP stub vs RFC 8785 full compliance gap

## Metadata

| Field | Value |
| --- | --- |
| Title | JCS canonicalizer MVP stub vs RFC 8785 full compliance — needs standards-compliant implementation |
| Type | standards |
| Status | draft |
| Source doc | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` |
| Finding | Source explicitly states "MVP-safe subset, may not fully align with RFC 8785" for JCS canonicalizer |
| Confidence | high |

## Summary

The source document proposes using a "minimal canonicalizer using Node's built-ins like JSON.stringify" as an MVP for RRP TV1 (test vector 1 — the canonicalization test vector). The source explicitly acknowledges this is not RFC 8785 compliant: "MVP-safe subset, may not fully align with RFC 8785." This MVP concession creates a risk: if the MVP canonicalizer diverges from RFC 8785, all CIDs produced will be wrong when the real canonicalizer is introduced, invalidating all receipts produced during the MVP phase.

## Problem

RFC 8785 (JCS: JSON Canonicalization Scheme) has specific rules for canonicalization:
1. Whitespace must be preserved as-is (not normalized)
2. UTF-8 BOM must be stripped
3. Object keys must be sorted lexicographically
4. Number representations must follow specific rules (no leading zeros, etc.)
5. Strings must have Unicode codepoints escaped per specific rules

`JSON.stringify()` in V8 does not produce RFC 8785-compliant output. Key differences:
- `JSON.stringify()` may reorder keys differently than lexicographic order in edge cases
- `JSON.stringify()` escapes control characters differently than RFC 8785 requires
- `JSON.stringify()` handles Unicode differently than RFC 8785

If the MVP uses `JSON.stringify()` for CID computation and the real system uses RFC 8785, then:
- The MVP CIDs will be wrong
- All receipts issued during MVP will have wrong CIDs
- Any receipt bundle tapestry relying on those CIDs will fail verification
- The "MVP safe subset" assumption may mask a fundamental interoperability failure

## Proposed Resolution

Use a proper RFC 8785 implementation from day one. Available libraries:

- `rfc8785` (npm: `@decoton/rfc8785` or `rfc8785`) — reference implementation in TypeScript
- `jcs-ts` — TypeScript JCS implementation
- Custom implementation using RFC 8785 ABNF as the specification

The "MVP-safe subset" argument is only valid if the divergence from RFC 8785 is explicitly documented and the conditions under which it matters are narrow. For CIDs, any divergence matters because the hash would be different.

## Required Actions

1. Evaluate `rfc8785` npm packages for correctness (test against RFC 8785 test vectors)
2. If no suitable npm package, implement RFC 8785 from spec
3. Add RFC 8785 compliance test vectors to the RRP test suite
4. Document the MVP concession explicitly with a timeline for RFC 8785 upgrade
5. Audit any CID computation that used JSON.stringify() during MVP — may need re-emission of receipts

## Labels

`jcs`, `rfc8785`, `canonicalizer`, `standards`, `cid`, `receipts`

## Depends On

- RC-1 (JCS/CID deterministic conformance green — this is part of that work)
