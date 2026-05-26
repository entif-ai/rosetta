# RRP-004: Define Formal Tile→RDF Canonical Projection for SHACL Conformance

## Type
validation/shacl

## Summary

ROCK-3111-A §A1 defines a minimal Tile→RDF projection (how Rosetta JSON TileEnvelopes map to RDF triples for SHACL validation), but the projection is incomplete and leaves several implementation decisions open. Conformance testing for RRP receipts requires a stable, deterministic projection algorithm — implementations that extend the projection in different ways will not produce compatible SHACL validation results.

## Evidence

Source: `docs/governance/ROCK-31XX - Rosetta Pasigraphy Protocol - Provenance, Receipts, TruthLint - 20260224.md`, ROCK-3111-A §A1 (lines ~1401-1500 of doc).

Minimal projection rules defined:
1. Tile identity: CID as IRI (`cid:zQm...`)
2. Envelope fields: JSON keys → `rosetta:` namespace predicates (kind, timestamp, nonce, run, derived_from, summary, auth, sig, content)
3. Content fields: content.* keys → `rrp:` namespace
4. CID references: string CID values → `cid:` IRI scheme

Known gaps:
- Canonicalization rules for JSON (the particular JSON canonicalization algorithm is not specified; CBOR vs JSON-LD vs plain canonical JSON matters for byte-identical CID computation)
- Array handling in RDF (ordered vs unordered; SHACL does not have native ordering)
- Blank node usage in `content` projection
- How `run` and `derived_from` IRIs are resolved when they're RIDs (relative identifiers) vs full CIDs
- Auth/sig nested structure projection (auth, sig are objects in examples; §A1 defines some fields separately)

## Expected artifact

A normative section (either as part of ROCK-3111-A normative body or as a separate reference doc) that specifies:
1. The canonicalization algorithm name or definition (e.g., RFC 8785 JSON Canonicalization or equivalent)
2. Complete predicate mapping table (JSON envelope key → RDF predicate IRI)
3. Array projection rules (RDF collection vs sequence)
4. RID resolution rules (relative vs absolute CIDs)
5. Reference to the SHACL shapes file (ROCK-3111-B test vectors should include Tile→RDF projection test cases)

## Priority
medium

## Labels
- SHACL
- RDF
- validation
- conformance

## Depends On
RRP-001 (DocID registration)
