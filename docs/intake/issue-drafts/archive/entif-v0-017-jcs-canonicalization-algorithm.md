# ENTIF-v0-017: JCS Canonicalization Procedure Not Specified as a Deterministic Algorithm with Test Vectors

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-017 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #1 in ledger |
| Confidence | `high` |
| Depends On | — |

---

## Problem Statement

The spec establishes "Receipts-first, canonical-by-default" as doctrine:

> "Canonicalization must be deterministic so two agents independently producing the same semantic object converge to the same CID."
> 
> "RFC 8785's rationale is explicitly 'cryptographic operations like hashing and signing need the data to be expressed in an invariant format'"

**But the JCS (JSON Canonicalization Scheme, RFC 8785) canonicalization procedure is not specified as a deterministic algorithm with test vectors.** RFC 8785 is referenced but not described. Without a concrete canonicalization procedure and test vectors, two implementations of Entif will canonicalize the same JSON differently, producing different CIDs for identical objects — contradicting the core doctrine.

---

## Evidence

The spec says "RFC 8785's rationale is explicitly..." and "Canonicalization must be deterministic" but provides:
- No step-by-step canonicalization algorithm
- No handling of edge cases (JSON number formatting, Unicode normalization, key ordering)
- No test vectors proving same-input CID convergence

The nearest mention is in the receipt schema: `"canonicalization": "RFC8785_JCS"` as a field value, not as a procedure.

---

## Impact

- Receipts will have different CIDs across implementations — breaking the core receipt-law invariant
- Tile deduplication is impossible if canonicalization is inconsistent
- Cross-system receipt verification fails (two systems computing different CIDs for the same receipt)

---

## Dependencies

- None (foundational gap)

---

## Suggested Resolution

1. Specify the JCS canonicalization algorithm step-by-step (or reference a known-good implementation with a citation):
   - Step 1: Serialize to JSON (RFC 8259)
   - Step 2: Encode all strings as UTF-8
   - Step 3: Apply RFC 8785 rules (number formatting, key ordering, whitespace elimination)
   - Step 4: Compute SHA-256 hash of canonicalized bytes
   - Step 5: Encode as multihash (optional, for future hash agility)
2. Provide test vectors: for a given JSON input, the expected canonical form and the expected CID
3. Define a conformance test: any implementation must pass the test vectors before being certified for use in Entif
4. Define error handling: what happens if canonicalization fails (malformed JSON, encoding errors)?

---

## Open Questions

- Should the canonicalization be implemented as a shared library (so all implementations are identical), or as a specification that multiple implementations must pass?
- Should there be a canonicalization conformance test suite in the CI pipeline?