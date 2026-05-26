# RRP-002: Resolve TruthLint Proof Bundle vs rosetta.tapestry Profile Relationship

## Type
architecture/spec-gap

## Summary

ROCK-31XX defines two conceptually overlapping provenance-bundling artifacts that are not formally unified:

1. **TruthLint MVP Proof Bundle**: a portable JSON object (bundle_id, created_at, author_identity, text_hash, claims[], sources[], assertions[], policy_profile, signatures[]) — defined in the product PRD section.

2. **ROCK-3111 RRP Receipt Bundle**: a rosetta.tapestry tile using profile ID `rrp:tapestry.profile.receipt_bundle` — defined in the RRP spec §6.

The doc does not clarify whether a TruthLint bundle IS a Rosetta tapestry (with the RRP profile applied) or a distinct lightweight format. This leaves an implementation gap: two provenance bundle concepts without a unification rule.

## Evidence

Source: `docs/governance/ROCK-31XX - Rosetta Pasigraphy Protocol - Provenance, Receipts, TruthLint - 20260224.md`, lines 624-682 (TruthLint Proof Bundle schema) vs lines 1501-1600 (RRP tapestry profile).

Relevant TruthLint Proof Bundle schema:
```
{
  "bundle_id": "b0f5b0c0-...",
  "created_at": "2026-02-23T20:12:04Z",
  "author_identity": { "handle": "@crates", "did": "did:example:123" },
  "text_hash": "sha256:...",
  "policy_profile": { "id": "baseline-v1", "version": "1.0.0" },
  "claims": [...],
  "sources": [...],
  "signatures": [...]
}
```

Relevant RRP §6.1 closure requirement:
> "If a system presents a user with a claim labeled as 'verified' or 'audited,' it MUST also present a Receipt Bundle tapestry containing at minimum: the Subject tiles + receipt tile(s) + evidence tiles + policy tiles + derived_from chains."

## Options to Resolve

**Option A (unification)**: Declare that TruthLint Proof Bundles are RRP-compliant rosetta.tapestry tiles under `rrp:tapestry.profile.receipt_bundle`. The portable JSON schema maps directly onto the tapestry tile envelope fields — bundle_id = tile CID, claims = tile content, sources = evidence references. Validates under existing RRP SHACL shapes.

**Option B (separation)**: Keep TruthLint bundles as a separate lightweight external format (non-tapestry) for use cases outside Rosetta runtime (e.g., third-party cross-platform sharing). RRP Receipt Bundles remain Rosetta-native internal artifacts. Explicitly document the boundary and when to use each.

**Option C (hybrid)**: Define a bidirectional translator tile: a "BundleProjection" tile that converts a rosetta.tapestry (RRP bundle) into a TruthLint portable JSON bundle and vice versa, preserving all required fields.

**Recommendation**: Option A is preferred — unification to rosetta.tapestry keeps the artifact model clean, enables bundle verification using RRP's deterministic verifier, and aligns with the "refinement not extension" posture. Requires confirming that all required TruthLint fields map onto existing tapestry content fields without new additions.

## Expected artifact

A decision document or architecture note resolving the unification question, with the chosen option formally documented. If Option A: update the TruthLint MVP spec to reference rosetta.tapestry + rrp:tapestry.profile.receipt_bundle explicitly.

## Priority
high — gates TruthLint MVP implementation and RRP-003 (scoring posture resolution)

## Labels
- architecture
- tapestry
- proof-bundle
- RRP

## Depends On
RRP-001 (DocID registration must precede this work framing)
