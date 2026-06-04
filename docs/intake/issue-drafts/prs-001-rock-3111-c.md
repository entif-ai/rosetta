# PRS-001: Create ROCK-3111-C RRP Pack Filesystem Contract

## Metadata

| Field | Value |
| --- | --- |
| Title | Create ROCK-3111-C RRP Pack Filesystem Contract |
| Type | spec |
| Status | candidate |
| Source doc | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` |
| Extraction | `2026-06-05-entif-rosetta-prds-revisions-synthesis.md` |
| Labels | spec, rrp, packs |
| Confidence | high |

## Problem

The repo has RRP (Rosetta Pasigraphy Protocol) ideas documented but lacks a formal spec for how packs are laid out on the filesystem. The synthesis explicitly calls this "the missing bridge between RRP ideas and the repo knowing exactly how to lay them down."

## Evidence

From the source document:
> "The next normative artifact should be a pack filesystem contract. The alternate run practically asks for it."

The draft structure proposed:
```
DocID: ROCK-3111-C
Title: RRP Pack Filesystem Contract
Status: Draft
Depends on:
- Rosetta v3.0.0 Core Spine
- ROCK-3111 / ROCK-3111-A / ROCK-3111-B

Pack root: packs/rrp/

Required files:
packs/rrp/pack.json
packs/rrp/README.md
packs/rrp/CHANGELOG.md
packs/rrp/schema/receipt-content.schema.json
packs/rrp/schema/receipt-bundle-tapestry.schema.json
packs/rrp/shacl/receipt.shapes.ttl
packs/rrp/shacl/tapestry-bundle.shapes.ttl
packs/rrp/vocab/receipt-types.json
packs/rrp/vocab/claim-types.json
packs/rrp/vocab/verdicts.json
packs/rrp/test-vectors/tv1.hash-input.json
packs/rrp/test-vectors/tv1.expected.json
packs/rrp/test-vectors/tv1.tampered.json
packs/rrp/examples/receipt.min.json
packs/rrp/examples/receipt-bundle.min.json
```

## Proposed Spec Content

### Required pack.json fields
- `pack_id`
- `doc_id`
- `version`
- `kind = "rosetta.pack"`
- `exports[]`
- `depends_on[]`
- `conformance_tiers[]`
- `canonicalization = "JCS"`
- `cid_profile = "sha2-256-multihash-base58btc"`
- `compatibility.min_core_version`
- `compatibility.max_tested_core_version`

### Required exports
- `schema:rrp/receipt-content@0.1.0`
- `schema:rrp/receipt-bundle-tapestry@0.1.0`
- `shacl:rrp/ReceiptTileShape@0.1.0`
- `shacl:rrp/ReceiptBundleTapestryShape@0.1.0`
- `vocab:rrp.receipt_types@0.1.0`
- `vocab:rrp.claim_types@0.1.0`
- `vocab:rrp.verdicts@0.1.0`
- `vectors:rrp.tv1@0.1.0`

### Conformance tiers
- RRP-Light
- RRP-Full
- RRP-Auditor

### Filesystem rules
- all schemas MUST be immutable once published under a versioned filename
- new semantics MUST land via vocab/shapes/examples, not by redefining core tile kinds
- test vectors MUST include at least one positive and one tamper-negative case
- any bundle claiming "verified" MUST include a receipt-bundle tapestry profile export

## Dependencies

- Rosetta v3.0.0 Core Spine
- ROCK-3111 / ROCK-3111-A / ROCK-3111-B

## Related Issues

- PRS-005 (Alpha RC staircase) depends on having RRP schemas defined
- PRS-006 (traceability headers CI) depends on pack filesystem structure being stable

## Notes

This spec should be authored as a standalone markdown document under `docs/RFCs/` or `docs/packs/` following the ROCK naming convention.