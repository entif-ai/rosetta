# PRD-002: Implement ROCK-3111-C RRP Pack Filesystem Contract

## Meta

| field | value |
| --- | --- |
| status | issue-candidate |
| type | implementation |
| priority | P0 |
| label | rrp-pack, rock-3111-c, pack-spec |
| depends-on | — |
| evidence | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md |

## Summary

Implement the RRP Pack Filesystem Contract as specified in the 2026-04-10 synthesis doc. This is the missing bridge between "we have RRP ideas" and "the repo knows exactly how to lay them down." Establishes `packs/rrp/` layout with required schemas, SHACL shapes, vocab, test vectors, and examples, plus conformance tier definitions.

## Proposed Implementation

### Pack root layout

```
packs/rrp/
├── pack.json                    # required
├── README.md                    # required
├── CHANGELOG.md                 # required
├── schema/
│   ├── receipt-content.schema.json    # required
│   └── receipt-bundle-tapestry.schema.json  # required
├── shacl/
│   ├── receipt.shapes.ttl             # required
│   └── tapestry-bundle.shapes.ttl     # required
├── vocab/
│   ├── receipt-types.json             # required
│   ├── claim-types.json               # required
│   └── verdicts.json                  # required
├── test-vectors/
│   ├── tv1.hash-input.json            # required
│   ├── tv1.expected.json              # required
│   └── tv1.tampered.json             # required (tamper-negative)
└── examples/
    ├── receipt.min.json               # required
    └── receipt-bundle.min.json        # required
```

### pack.json required fields

```json
{
  "pack_id": "rrp",
  "doc_id": "ROCK-3111-C",
  "version": "0.1.0",
  "kind": "rosetta.pack",
  "exports": [
    "schema:rrp/receipt-content@0.1.0",
    "schema:rrp/receipt-bundle-tapestry@0.1.0",
    "shacl:rrp/ReceiptTileShape@0.1.0",
    "shacl:rrp/ReceiptBundleTapestryShape@0.1.0",
    "vocab:rrp.receipt_types@0.1.0",
    "vocab:rrp.claim_types@0.1.0",
    "vocab:rrp.verdicts@0.1.0",
    "vectors:rrp.tv1@0.1.0"
  ],
  "depends_on": [
    "rosetta.v3.core.spine",
    "rock-3111",
    "rock-3111-a",
    "rock-3111-b"
  ],
  "conformance_tiers": ["RRP-Light", "RRP-Full", "RRP-Auditor"],
  "canonicalization": "JCS",
  "cid_profile": "sha2-256-multihash-base58btc",
  "compatibility": {
    "min_core_version": "3.0.0",
    "max_tested_core_version": "3.1.0"
  }
}
```

### Conformance tiers

- **RRP-Light**: receipt schema valid, sig optional, no SHACL enforcement required
- **RRP-Full**: receipt schema + SHACL validation + signature verification required
- **RRP-Auditor**: full RRP-Full + audit trail closure + tamper-negative test vectors pass

### Filesystem rules

1. All schemas MUST be immutable once published under a versioned filename
2. New semantics MUST land via vocab/shapes/examples, not by redefining core tile kinds
3. Test vectors MUST include at least one positive and one tamper-negative case
4. Any bundle claiming "verified" MUST include a receipt-bundle tapestry profile export

## Constraints and Preconditions

- Depends on: Rosetta v3.0.0 Core Spine finalized (reference spec, not implementation)
- Blocking: PRD-001 (RRP receipt schema) depends on these schema files existing

## Verification

- [ ] `packs/rrp/pack.json` parses and exports are resolvable
- [ ] All 8 required exports exist and point to valid files
- [ ] `schema/receipt-content.schema.json` validates a conforming receipt
- [ ] `schema/receipt-bundle-tapestry.schema.json` validates a bundle
- [ ] SHACL shapes validate against positive test vectors
- [ ] SHACL shapes reject `tv1.tampered.json`
- [ ] Conformance tier CI job passes for RRP-Light, RRP-Full, RRP-Auditor

## Notes

- This is P0 because all other RRP work (receipt schema, guard token structure, conformance testing) depends on having the contract definition
- Draft v0.1.0 exists in the source doc — implement exactly as specified
- Do not invent new required files beyond what the spec lists