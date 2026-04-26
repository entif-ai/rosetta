# ROSETTA-v3-001: Append-Only Ledger Enforcement Gap

**Type:** implementation  
**Priority:** P2  
**Source document:** `docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md`  
**Extraction date:** 2026-04-25  
**Confidence:** high  

## Summary

The spec mandates append-only ledger semantics (updates create new tiles with new CIDs; in-place mutation is prohibited) but does not describe any enforcement mechanism. A non-compliant implementation could mutate tiles in place, breaking CID-based invariants, provenance chains, and auditability.

## Evidence

From § Non-Goals: "In-place Mutable Knowledge Store":

> All updates in Rosetta occur via the creation of new tiles (with new CIDs) rather than in-place mutation... Rosetta is NOT a traditional mutable database; it's an append-only ledger of knowledge. Supersession is achieved by new content-addressed artifacts, never by altering or deleting old ones.

From § Design Goals:

> All knowledge artifacts (inputs, interpretations, outputs, models of evaluation) are stored as immutable **Tiles** identified by cryptographic content hashes (CIDs).

## Problem

No mechanism (database constraints, CI gates, SHACL shapes, or runtime enforcement) is described to prevent in-place mutation of existing tiles. A buggy or malicious implementation could write to an existing tile, recompute its CID, and propagate the false CID, breaking the immutability invariant that all downstream trust depends on.

## Recommendation

Specify an enforcement approach:
1. **Storage layer:** Use a append-only storage backend (append-only filesystem, append-only DB mode, or MVCC with logical deletes)
2. **SHACL shape:** Define a SHACL constraint that flags any operation modifying an existing tile in place
3. **CI gate:** Add an integration test that attempts an in-place mutation and fails if it succeeds
4. **Receipt confirmation:** Require a Receipt tile confirming append-only enforcement was validated before any tile is considered committed

## References

- Core Spine Spec § Non-Goals
- Core Spine Spec § Data Model (CID definition)
- Core Spine Spec § Tile Envelope

## GitHub Issue

(`rosetta-v3-001-append-only-enforcement.md` — draft)
