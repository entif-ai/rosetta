# PDR-002: Author and Land ROCK-3111-C RRP Pack Filesystem Contract v0.1.0

## Metadata

| Field | Value |
|---|---|
| Type | spec |
| Status | draft |
| Labels | spec, rrp, rock-3111-c, pack |
| Confidence | high |

## Evidence

Extraction: `docs/intake/docs-intelligence/2026-06-05-prd-revision-synthesis.md`
Finding: "ROCK-3111-C draft" — new normative artifact explicitly requested

## Problem

ROCK-3111-C is the missing bridge between "we have RRP ideas" and "the repo knows exactly how to lay them down." The synthesis explicitly calls it out: "The next normative artifact should be a pack filesystem contract." It is not yet authored as a formal spec.

## Proposal

Author ROCK-3111-C as a formal spec with the following required structure:

**Pack root:** `packs/rrp/`

**Required files:**
- `pack.json` (with pack_id, doc_id, version, kind="rosetta.pack", exports[], depends_on[], conformance_tiers[], canonicalization="JCS", cid_profile, compatibility fields)
- `README.md`
- `CHANGELOG.md`
- `schema/receipt-content.schema.json`
- `schema/receipt-bundle-tapestry.schema.json`
- `shacl/receipt.shapes.ttl`
- `shacl/tapestry-bundle.shapes.ttl`
- `vocab/receipt-types.json`
- `vocab/claim-types.json`
- `vocab/verdicts.json`
- `test-vectors/tv1.hash-input.json`
- `test-vectors/tv1.expected.json`
- `test-vectors/tv1.tampered.json`
- `examples/receipt.min.json`
- `examples/receipt-bundle.min.json`

**Required exports:**
- `schema:rrp/receipt-content@0.1.0`
- `schema:rrp/receipt-bundle-tapestry@0.1.0`
- `shacl:rrp/ReceiptTileShape@0.1.0`
- `shacl:rrp/ReceiptBundleTapestryShape@0.1.0`
- `vocab:rrp.receipt_types@0.1.0`
- `vocab:rrp.claim_types@0.1.0`
- `vocab:rrp.verdicts@0.1.0`
- `vectors:rrp.tv1@0.1.0`

**Conformance tiers:** RRP-Light, RRP-Full, RRP-Auditor

**Filesystem rules:**
- All schemas MUST be immutable once published under a versioned filename
- New semantics MUST land via vocab/shapes/examples, not by redefining core tile kinds
- Test vectors MUST include at least one positive and one tamper-negative case
- Any bundle claiming "verified" MUST include a receipt-bundle tapestry profile export

## Implementation Notes

- Depends on Rosetta v3.0.0 Core Spine and ROCK-3111/3111-A/3111-B
- Should be authored as a proper ROCK spec with RFC 2119 keywords
- Test vectors must be compatible with the existing TV1 from prior RRP work

## Depends On

- _(no dependencies — can be authored independently)_

## References

- Source doc: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Extraction: `docs/intake/docs-intelligence/2026-06-05-prd-revision-synthesis.md`
- Related: ROCK-3111 / ROCK-3111-A / ROCK-3111-B (RRP family)