# PRDS-002: Formalize ROCK-3111-C RRP Pack Filesystem Contract

## Summary

The 2026-04-10 PRD synthesis produces a draft spec for the RRP Pack Filesystem Contract (ROCK-3111-C v0.1.0). This is "the missing bridge between 'we have RRP ideas' and 'the repo knows exactly how to lay them down.'" The spec needs to be formalized as a tracked spec document in the repo.

## Problem

The draft ROCK-3111-C defines a `packs/rrp/` directory layout with required files (pack.json, README, CHANGELOG, schema/, shacl/, vocab/, test-vectors/, examples/), required pack.json fields, required exports, conformance tiers, and filesystem rules. But it exists only as a prose code block in a chat document. It needs to become a first-class spec document.

## Evidence

- Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Section: "New work product 2: ROCK-3111-C draft"
- Key elements:
  - Pack root: `packs/rrp/`
  - Required pack.json fields: pack_id, doc_id, version, kind="rosetta.pack", exports[], depends_on[], conformance_tiers[], canonicalization, cid_profile, compatibility
  - Three conformance tiers: RRP-Light, RRP-Full, RRP-Auditor
  - Filesystem rules: schemas immutable once published; new semantics via vocab/shapes/examples only; test vectors need positive and tamper-negative cases

## Proposed Pack Layout

```
packs/rrp/
  pack.json
  README.md
  CHANGELOG.md
  schema/
    receipt-content.schema.json
    receipt-bundle-tapestry.schema.json
  shacl/
    receipt.shapes.ttl
    tapestry-bundle.shapes.ttl
  vocab/
    receipt-types.json
    claim-types.json
    verdicts.json
  test-vectors/
    tv1.hash-input.json
    tv1.expected.json
    tv1.tampered.json
  examples/
    receipt.min.json
    receipt-bundle.min.json
```

## Criteria for Closing

- [ ] ROCK-3111-C exists as a first-class spec document at `docs/specs/ROCK-3111-C.md` or similar
- [ ] `packs/rrp/pack.json` exists and validates against the spec
- [ ] All required directories and files are present
- [ ] SHACL shapes validate receipt and tapestry bundle instances
- [ ] At least one positive and one tamper-negative test vector exists

## Labels

rrp, packs, filesystem-contract, shacl, spec

## Depends On

(none)

## Linked PR

`docs/intake/docs-intelligence/2026-06-04-entif-rosetta-prds-revisions-synthesis.md`
