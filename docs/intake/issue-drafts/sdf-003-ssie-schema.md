# SDF-003: SSIE (Sealed Spatial Incident Envelope) Schema — `sdf.ssie.v1`

## Status
Candidate

## Evidence
`docs/ideas/Chat GPT - UWB Devices Overview.md` — full JSON schema produced in SDF-GM v0.1 spec

## Summary
Define the `sdf.ssie.v1` tile_kind for Rosetta: a minimal, one-time-opened encrypted envelope containing the smallest sufficient spatial threat payload, governed by Tripwire quorum policy and TTL-bound privacy constraints.

## Schema

```json
{
  "kind": "sdf.ssie.v1",
  "timestamp_utc": "...",
  "anchor_time": { "t": "...", "sigma_ms": 0.3 },
  "venue": { "site_id": "...", "zone_id": "...", "anchor_set_id": "..." },
  "threat": {
    "class": "stampede|weapon_report|explosive_signature|gunshot|other",
    "confidence": 0.86,
    "severity": 4,
    "explain": ["radial_dispersion", "acoustic_impulse_cluster", "rf_occlusion_anomaly"]
  },
  "location": {
    "frame": "venue_local",
    "xyz_m": [12.4, 3.1, 1.7],
    "sigma_m": [0.8, 0.6, 1.2]
  },
  "evidence": {
    "vsv_digest": "cid:...",
    "features_digest": ["cid:...", "cid:..."],
    "witness_set": { "n": 27, "method": "threshold_sig" }
  },
  "privacy": {
    "no_identity_claim": true,
    "raw_media_included": false,
    "ttl_hours": 72,
    "one_time_open": true
  },
  "tripwire_hash": "sha256(...)",
  "temp_id": "ephemeral_device_fingerprint",
  "key_fingerprint": "..."
}
```

## Key Design Constraints

- `no_identity_claim: true` — explicit constitutional-style flag; cannot be overridden
- `raw_media_included: false` — raw audio/video never included by default
- `one_time_open: true` — envelope destroyed after first read unless legal hold applies
- `ttl_hours: 72` — auto-shred if quorum not reached within TTL
- Unsealing requires `min_approvals_to_open = k` and `approved_roles` in clear metadata
- Every unseal attempt emits a Rosetta audit receipt

## Open Questions

- Does SSIE require a new Rosetta tile_kind registration or does it extend the existing semantic incident tile?
- What is the minimum viable witness set size (`n`) for quorum stability?
- Should `features_digest` point to encrypted blobs or is `vsv_digest` sufficient?

## Labels
`sdf`, `ssie`, `sealed-incident`, `governance`, `tile-kind`

## Depends On
SDF-001 (Guardian Mode)
