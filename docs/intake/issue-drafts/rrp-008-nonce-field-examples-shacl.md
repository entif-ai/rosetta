# RRP-008: Add Nonce to All RRP Receipt Examples; Enforce in SHACL via Optional-Required

## Type
docs/shacl

## Summary

ROCK-3111 §3.1 (Receipt Envelope Rules) explicitly lists `nonce` as a recommended field for rosetta.receipt tiles, noting it "prevents accidental duplication collisions." However, the example receipts embedded in the ROCK-3111 specification body do NOT include a `nonce` field. This inconsistency means:
1. Implementers following the examples will emit nonce-less receipts
2. Those receipts technically satisfy the intent but not the form
3. The SHACL shape in ROCK-3111-A correctly requires `nonce` via `sh:minCount 1` on `rosetta:nonce`, which would reject the documented example receipts as non-conformant — a self-contradiction

## Evidence

Source: `docs/governance/ROCK-31XX - Rosetta Pasigraphy Protocol - Provenance, Receipts, TruthLint - 20260224.md`

ROCK-3111 §3.1 normative requirement:
> "`nonce` (recommended by core especially for receipts to avoid accidental duplication collisions)"

Example receipt JSON in §4.4 (shows `receipt_type`, `subjects`, `claims`, `digests`, `policy_refs` — no `nonce` field):
```
{
  "receipt_type": "rrp:toolcall.execution",
  "subjects": [...],
  "claims": [...],
  "digests": [...],
  "policy_refs": [...]
}
```

SHACL shape (ROCK-3111-A, `rrp:ReceiptTileShape`) that would reject the example:
```
sh:property [
  sh:path rosetta:nonce ;
  sh:datatype xsd:string ;
  sh:minCount 1 ;
  sh:maxCount 1 ;
] ;
```

## Proposed Fix

Two-part fix:
1. Add `nonce` field to all example receipts in ROCK-3111 (explain it as a randomly generated string, UUID or base64 random bytes, generated at authoring time)
2. In SHACL: change `sh:minCount 1` to `sh:maxCount 1` constraint only (nonce is a uniqueness guarantee but if missing at RRP-Light level, the receipt is still valid — only RRP-Auditor should require it). Alternatively: require nonce in RRP-Full and above; allow in RRP-Light.

Better SHACL approach per RRP conformance tiers:
- RRP-Light: nonce allowed but not required (`sh:maxCount 1`)
- RRP-Full/Auditor: nonce required (`sh:minCount 1, sh:maxCount 1`)

## Expected artifact

1. Updated example receipts in ROCK-3111 with `nonce` field (explicitly named, generated at authoring time, with an example value like `"nonce": "17af3c81e2"` or a UUID)
2. Updated RRP-007 SHACL file with tier-aware nonce constraints (if conforming to RRP-007 is not yet done, note this as a prerequisite edit in RRP-007)

## Priority
low

## Labels
- docs
- SHACL
- nonce
- receipts

## Depends On
RRP-001 (DocID registration), RRP-007 (SHACL extraction — once extracted, this fix applies there)
