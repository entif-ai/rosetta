# RRP-007: Extract SHACL Shapes from ROCK-3111-A Inline Draft into Formal Normative Section

## Type
docs

## Summary

ROCK-3111-A (RRP v0.1 SHACL Profile Set) exists only as an embedded draft within the ROCK-31XX chat transcript — specifically within the GPT response at lines 1401-1700 of the source document. The SHACL shapes are real, well-formed Turtle syntax covering all major receipt structures (ReceiptTileShape, ReceiptContentShape, ClaimShape, DigestShape, EvidenceRefShape, SubjectRefShape, ConfidenceShape, VerdictValueShape, SignatureShape, AuthShape, ReceiptBundleTapestryShape).

These shapes have not been extracted into a formal normative artifact file. Without a standalone SHACL file, RRP conformance testing is not executable by any agent or tool — it requires manual transcription from the chat transcript.

## Evidence

Source: `docs/governance/ROCK-31XX - Rosetta Pasigraphy Protocol - Provenance, Receipts, TruthLint - 20260224.md`, GPT response section (lines ~1401-1700 containing Turtle SHACL shapes).

Shapes present:
- `rrp:VerdictValueShape` — enum constraint on verdict
- `rrp:SignatureShape` — structured sig (alg, kid, signed, sig_b64)
- `rrp:AuthShape` — authority (kid)
- `rrp:EvidenceRefShape` — evidence CID reference + optional span
- `rrp:SubjectRefShape` — subject CID + optional role
- `rrp:ConfidenceShape` — matrix_cid OR (value + rationale)
- `rrp:ClaimShape` — claim_type, statement, evidence, verdict, confidence
- `rrp:DigestShape` — alg, of, digest (sha256 hex pattern), cid_ref
- `rrp:ReceiptContentShape` — receipt_type, subjects, claims, digests, policy_refs
- `rrp:ReceiptTileShape` — targets rosetta.receipt tiles, enforces required fields + auth + sig + content + run + derived_from
- `rrp:ReceiptBundleTapestryShape` — targets rosetta.tapestry tiles with rrp:tapestry.profile.receipt_bundle profile

## Expected artifact

1. A new file `docs/governance/ROCK-3111-A-rrp-v0.1-shapol-profile-set.md` (or similar, following ROCK naming conventions) containing the extracted and formally formatted SHACL shapes, with:
   - Namespace declarations at top
   - Clear applicability statement (which RRP conformance tier each shape applies to)
   - Notes on the Tile→RDF projection (reference to RRP-004)
   - Formal status/preamble as a standards-track pack addendum
2. A companion `docs/governance/ROCK-3111-A-rrp-v0.1-shacl-spaces.ttl` Turtle file for direct SHACL tool ingestion
3. Update ROCK-3111 spec to reference the extracted formal file location

## Priority
medium (blocks RRP-Full conformance testing)

## Labels
- SHACL
- docs
- RRP

## Depends On
RRP-001 (DocID registration for ROCK-3111-A must precede formal extraction)
