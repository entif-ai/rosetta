# ROSETTA-v3-002: JCS Canonicalization Test Vectors Not Provided

**Type:** docs-intelligence  
**Priority:** P2  
**Source document:** `docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md`  
**Extraction date:** 2026-04-25  
**Confidence:** high  

## Summary

The spec requires JCS (JSON Canonicalization Scheme, RFC 8785) for CID canonicalization but provides no cross-platform test vectors. Without canonical test vectors, implementations cannot verify they produce identical CIDs for the same tile content, breaking interoperability.

## Evidence

From § Tile Envelope and Canonicalization:

> **Determinism:** All implementations must produce the same CID for the same tile content. This is critical... **Multi-platform test vectors will be provided in the Schema Pack to verify that independent implementations indeed hash the example tiles to the same CIDs.**

No such test vectors appear in the spec or in ROCK-3010 (Schema Pack is referenced but not included in this spec).

## Problem

JCS RFC 8785 is complex — it specifies canonical serialization for JSON but leaves some implementation choices (e.g., IEEE 754 vs string representation of numbers, unicode normalization form). Without concrete test vectors:
- Each implementation may produce subtly different canonical forms
- CIDs from different language runtimes may diverge for the same tile content
- The interop guarantee ("two full nodes exchange tiles, they should interpret them identically") is unverifiable

## Recommendation

1. Produce a set of canonical TileEnvelope JSON examples covering: simple observation tile, tile with nested content, tile with unicode, tile with floating-point numbers, tile with special characters in strings
2. Include expected SHA-256 CIDs in both base16 and base58 representation
3. Provide these in ROCK-3010 (Schema Pack) as machine-readable JSON test vectors
4. Add a CI step that runs implementations against the test vector suite

## References

- RFC 8785 (JCS)
- Core Spine Spec § Canonicalization
- Core Spine Spec § Determinism

## GitHub Issue

(`rosetta-v3-002-jcs-canonicalization-test-vectors.md` — draft)
