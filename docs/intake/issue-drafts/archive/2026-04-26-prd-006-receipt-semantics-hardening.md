# Issue Draft: PRD-006 — Receipt Semantics Hardening: Evidence Typing, Policy Linkage, Key Lifecycle

## Metadata

| Field | Value |
|---|---|
| **Source document** | `docs/PRDs/20260426 - Entif and Rosetta PRD.md` |
| **Extracted by** | DI-009 subagent |
| **Findings basis** | F-13, F-36, F-44 |
| **Confidence** | HIGH |
| **Status** | draft |

## Problem Statement

The `rosetta-receipts` package already implements real mechanics: creation of receipts as Rosetta tiles, digest derivation from canonical bodies, Ed25519 keypair signing of CIDs, cryptographic verification of signed receipts, and bundle closure checking against a tile store. These structural mechanics are correct and working.

However, the semantic layer on top of those mechanics is still thin. The Entif and Rosetta PRD (2026-04-26) identifies three areas needing hardening: (1) richer evidence typing — the current evidence structure (`cid` + optional `span`) doesn't distinguish between direct observation, derived inference, corroborating testimony, or authority citation; (2) stronger policy artifact linkage — receipts must point to the specific policy version and evaluation rules that governed the action; (3) key lifecycle — the current keypair model doesn't specify key rotation, revocation, or multi-signer scenarios.

## Evidence

- **F-13**: "The `rosetta-receipts` package already creates receipts as Rosetta tiles, derives digests from canonical bodies, signs CIDs using Ed25519 keypairs, verifies signed receipts cryptographically, and checks bundle closure against a tile store." — `turn8file14`, `turn27file0`
- **F-36**: "Receipt schema from `packs/rrp/schema/receipt.schema.json` requires `claims`, `digests`, `policyRefs`, `receiptType`, and `subjects`. Evidence structured as CID-linked objects with optional spans." — `turn22file0`, `turn23file0`
- **F-44**: "Slice 2 = receipt semantics hardening (richer evidence typing, stronger policy artifact linkage, key lifecycle posture, and deeper validation around evidence claim semantics)" — `turn27file0`
- **F-24**: "Each refinement stage — fetch, normalize, classify, dedupe decision, revision link, source-to-observation transform, extract, promote, compile — must either mint a receipt directly or become an explicit subject inside a receipt bundle." — `turn17file0`, `turn13file0`

## Requirements

1. **Evidence type taxonomy**: Distinguish at minimum: `direct-observation`, `derived-inference`, `corroborating-testimony`, `authority-citation`, `self-report`, `computed-result`. Each type has different trust semantics and verification requirements.
2. **Policy artifact linkage**: Every receipt must carry a `policyRef` pointing to the specific policy version (not just any policy) that governed the action. Policy must be retrievable and verifiable as a Rosetta tile.
3. **Key lifecycle management**: Define key generation, key rotation schedule, key revocation procedure, multi-signer threshold, and emergency key revocation. Keys must be stored in a manner consistent with rights-scoped access.
4. **Evidence span semantics**: Define what `span` means for each evidence type. Direct observation spans point to byte ranges in source. Derived inference spans point to the transformation receipt. Authority citation spans point to the cited authority tile.
5. **Receipt bundle closure verification**: Beyond structural closure, verify that all `policyRefs` in a bundle resolve to valid tiles and that evidence types are consistent with claim types.
6. **Explain/audit support**: Hardened receipts must support the three operator modes (summary/explain/audit). Audit mode must be able to reconstruct the full policy+evidence chain for any receipt.

## Evidence Type Definitions

```ts
type EvidenceType =
  | "direct-observation"   // raw capture from source system
  | "derived-inference"    // result of transformation or computation
  | "corroborating-testimony"  // external confirmation
  | "authority-citation"   // appeal to authority or policy
  | "self-report"          // claim by subject of observation
  | "computed-result";     // algorithmic output

interface TypedEvidenceRef {
  cid: CID;
  span?: string;
  evidenceType: EvidenceType;
  confidence?: number;
  authorityRef?: CID;  // for authority-citation type
}
```

## Acceptance Criteria

- [ ] Receipt schema updated to include `evidenceType` field on each evidence reference
- [ ] PolicyRef resolution verified at bundle closure time — receipts with broken policyRefs fail verification
- [ ] Key rotation can be performed without invalidating historical receipts (historical receipts verified against key at time of signing)
- [ ] Multi-signer receipts verifiable (threshold signature scheme implemented)
- [ ] Explain mode can walk the evidence chain and describe what each evidence type contributes to the claim
- [ ] Audit mode can reconstruct the complete policy+evidence chain for any receipt in the system

## Relationship to Other Issues

- Depends on IC-01 (Pack Conformance) for pack-level schema enforcement
- Feeds into IC-08 (Rights/Guard Hardening) because policy linkage is part of guard decision receipts
- Part of Phase 1 Constitutional Hardening (F-44)

## Recommended Labels

`receipts`, `semantics`, `evidence-typing`, `policy`, `key-lifecycle`, `phase-1`, `governance`