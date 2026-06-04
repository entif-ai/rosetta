# PRD-001: Adopt RRP receipt schema (subjects/claims/digests/policy_refs)

## Meta

| field | value |
| --- | --- |
| status | issue-candidate |
| type | implementation |
| priority | P0 |
| label | rrp, receipt-schema, rosetta-receipt |
| depends-on | — |
| evidence | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md |

## Summary

Replace the current generic receipt/tapestry schemas with the exact RRP content model: `subjects`, `claims`, `digests`, `policy_refs`, `nonce`, `auth`, and `sig` fields, plus the signature-hashing rule that excludes `sig` from CID computation and signs the CID or stable multihash commitment.

## Problem Statement

Current receipt and tapestry schemas are loose and generic. The RRP content model provides exact, testable, SHACL-shapable schemas that align with Rosetta's constitutional bedrock and enable:
- Precise conformance testing against RRP test vectors
- SHACL shape validation at ingest
- Signature verification that excludes transient fields from CID computation
- Clear separation of concerns (subjects do what, claims say what, digests prove what)

## Proposed Implementation

### Schema changes

1. **`rosetta.receipt` schema** — adopt RRP receipt-content schema:
   ```typescript
   interface RRPReceipt {
     kind: "rosetta.receipt";
     subjects: Subject[];
     claims: Claim[];
     digests: Digest[];
     policy_refs?: PolicyRef[];
     nonce: string;
     auth?: AuthBlock;
     sig?: SignatureBlock;
   }
   ```
   Fields map to `packs/rrp/schema/receipt-content.schema.json` once ROCK-3111-C is implemented.

2. **Signature hashing rule** — `sig` field is excluded from CID computation. The CID signs the stable multihash commitment (subjects + claims + digests + policy_refs + nonce, without sig). Signature block is attached separately.

3. **`rosetta.tapestry` schema** — receipt-bundle profile:
   ```typescript
   interface ReceiptBundleTapestry {
     kind: "rosetta.tapestry";
     timestamp: string;
     nonce: string;
     content: {
       profile: "rrp:tapestry.profile.receipt_bundle";
       roots: { receipts: string[] };  // receipt CIDs
       members: string[];              // all member CIDs
       build: {
         builder: string;
         built_at: string;
         closure_policy: "rrp.bundle.closure.v0";
       };
     };
   }
   ```

### Adapter layer

- Keep generic receipt interfaces internally but convert to/from RRP shape at the boundary.
- Document the conversion rules in `docs/intake/docs-intelligence/PRRD-001-rrp-receipt-schema.md` boundary doc.

## Constraints and Preconditions

- Depends on: ROCK-3111-C RRP Pack Filesystem Contract (PRD-002) being drafted first, so the schema paths are known
- Guard admission code (`admission.ts`) must be updated to handle the new structured tokens (policy_version, policy_hash, etc.) — see PRD-007
- TV1 test vectors must be updated to cover the new schema fields

## Verification

- [ ] `rosetta.receipt` schema validates against `packs/rrp/schema/receipt-content.schema.json`
- [ ] Signature exclusion rule is encoded in CID computation
- [ ] SHACL shapes in `packs/rrp/shacl/receipt.shapes.ttl` validate correctly
- [ ] TV1 positive test vector passes
- [ ] Tamper-negative test vector (sig field modified) correctly fails

## Notes

- This is P0 because the MVP alpha is RRP-first — receipts are the fundamental proof mechanism
- Do not defer; blocking S0 builtin.echo slice