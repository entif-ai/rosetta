# SDF-001: Spatial Data Fabric Guardian Mode — Formal Rosetta Tile Kind

## Status
draft

## Type
architecture

## Summary
Formalize SDF-GM v0.1 (Spatial Tripwire Guardian Mode) as a first-class Rosetta tile_kind "sdf.ssie" for quorum-gated spatial incident sealed envelopes.

## Problem

SDF-GM v0.1 defines a spatial incident envelope schema (SSIE) with threat class, location, confidence, evidence digests, witness set, and privacy metadata. Tripwire Protocol already supports semantic/text incident envelopes. SDF-GM extends Tripwire to spatial incidents but lacks a formal Rosetta tile_kind definition.

## Proposed Solution

1. Define `tile_kind: sdf.ssie.v1` as a sealed incident subtype in Rosetta's tile registry
2. Schema (from SDF-GM v0.1):
   - `kind`: `sdf.ssie.v1`
   - `timestamp_utc`, `anchor_time` (with sigma_ms)
   - `venue`: site_id, zone_id, anchor_set_id
   - `threat`: class, confidence, severity, explain[]
   - `location`: frame, xyz_m[], sigma_m[]
   - `evidence`: vsv_digest, features_digest[], witness_set{n, method}
   - `privacy`: no_identity_claim, raw_media_included, ttl_hours, one_time_open
   - `tripwire_hash`, `temp_id`, `key_fingerprint`
3. Quorum policy: `min_approvals_to_open = k`, `approved_roles`, receipt-logged unsealing
4. TTL + shred behavior: delete locally if quorum fails within TTL

## References

- Source: `docs/intake/docs-intelligence/2026-06-01-uwb-sdf-non-profits.md` Finding: SDF-GM v0.1 Guardian Mode spec
- Tripwire Protocol: `docs/governance/20250710 - Tripwire Protocol - EntifAI.md`
- Rosetta RFC ENTIF-0001 v2.1.0 sealed incident tile semantics

## Depends On

- (none — foundational)

## Labels

spatial-fabric, guardian-mode, tripwire, ssie, tile-kind

## Priority

high