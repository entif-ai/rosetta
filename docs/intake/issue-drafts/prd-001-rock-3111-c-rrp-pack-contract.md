# PRD-001: Author ROCK-3111-C RRP Pack Filesystem Contract formally

## Metadata

| Field | Value |
| --- | --- |
| Title | Author ROCK-3111-C RRP Pack Filesystem Contract formally |
| Type | spec |
| Status | draft |
| Source doc | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` |
| Finding | Unified Decision 10; full draft spec in source |
| Confidence | high |

## Summary

The source document contains a complete draft of ROCK-3111-C (RRP Pack Filesystem Contract v0.1.0) as a ChatGPT synthesis export. It defines the pack root (`packs/rrp/`), required files (pack.json, schemas, SHACL shapes, vocabularies, test vectors, examples), required exports, three conformance tiers, and filesystem rules. This draft needs to be promoted to a formal RFC artifact in the `docs/RFCs/` directory with proper RFC metadata and review process.

## Problem

ROSETTA's normative artifact pipeline requires formal RFC authoring for spec-level documents. The ROCK-3111-C content exists only as a ChatGPT session export — it has not been formally authored as a Rosetta RFC. This creates a gap between "idea in chat export" and "adopted repo standard."

## Proposed Spec Content (from source)

```
DocID: ROCK-3111-C
Title: RRP Pack Filesystem Contract
Status: Draft
Depends on: Rosetta v3.0.0 Core Spine, ROCK-3111 / ROCK-3111-A / ROCK-3111-B

Pack root: packs/rrp/

Required files:
- pack.json
- README.md
- CHANGELOG.md
- schema/receipt-content.schema.json
- schema/receipt-bundle-tapestry.schema.json
- shacl/receipt.shapes.ttl
- shacl/tapestry-bundle.shapes.ttl
- vocab/receipt-types.json
- vocab/claim-types.json
- vocab/verdicts.json
- test-vectors/tv1.hash-input.json
- test-vectors/tv1.expected.json
- test-vectors/tv1.tampered.json
- examples/receipt.min.json
- examples/receipt-bundle.min.json

Required pack.json fields: pack_id, doc_id, version, kind="rosetta.pack", exports[], depends_on[], conformance_tiers[], canonicalization="JCS", cid_profile, compatibility.min/max_core_version

Required exports:
- schema:rrp/receipt-content@0.1.0
- schema:rrp/receipt-bundle-tapestry@0.1.0
- shacl:rrp/ReceiptTileShape@0.1.0
- shacl:rrp/ReceiptBundleTapestryShape@0.1.0
- vocab:rrp.receipt_types@0.1.0
- vocab:rrp.claim_types@0.1.0
- vocab:rrp.verdicts@0.1.0
- vectors:rrp.tv1@0.1.0

Conformance tiers: RRP-Light, RRP-Full, RRP-Auditor

Filesystem rules:
- all schemas MUST be immutable once published under a versioned filename
- new semantics MUST land via vocab/shapes/examples, not by redefining core tile kinds
- test vectors MUST include at least one positive and one tamper-negative case
- any bundle claiming "verified" MUST include a receipt-bundle tapestry profile export
```

## Action Required

1. Copy draft content from source into `docs/RFCs/ROCK-3111-C - RRP Pack Filesystem Contract.md`
2. Assign formal RFC ID (e.g., ROCK-3111-C)
3. Add RFC metadata header (status: draft, author, created date, depends on)
4. Resolve three open items: (a) criteria for each conformance tier not defined, (b) filesystem rules need mechanical enforcement plan, (c) tv1 test vector values need verification against actual JCS/CID implementation
5. Initiate RFC review process

## Labels

`rrp`, `pack-contract`, `spec`, `normative-artifact`

## Depends On

- Rosetta v3.0.0 Core Spine (already merged)
- ROCK-3111 / ROCK-3111-A / ROCK-3111-B (referenced but status unknown — check RFC coverage)
