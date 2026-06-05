# PDR-003: Implement RRP Exact Receipt Schema (`subjects`, `claims`, `digests`, `policy_refs`) in rosetta.receipt

## Metadata

| Field | Value |
|---|---|
| Type | implementation |
| Status | draft |
| Labels | rrp, receipt-schema, implementation |
| Confidence | high |

## Evidence

Extraction: `docs/intake/docs-intelligence/2026-06-05-prd-revision-synthesis.md`
Finding: "RRP content model wins over generic receipts"

## Problem

The current `rosetta.receipt` schema is too loose and does not conform to the RRP content model. The synthesis explicitly rejected the generic receipt schema in favor of the exact RRP content model with fields: `subjects`, `claims`, `digests`, `policy_refs`, `nonce`, `auth`, `sig`, plus the signature hashing rule that excludes `sig` from CID computation.

## Proposal

Implement the exact RRP receipt schema in `rosetta.receipt`:

```typescript
export interface RRPReceipt {
  subjects: Subject[];
  claims: Claim[];
  digests: Digest[];
  policy_refs?: PolicyRef[];
  nonce: string;
  auth: Auth;
  sig: Signature; // excluded from CID computation; signs the CID or stable multihash commitment
}

export interface Subject {
  kind: string;
  id: string;
}

export interface Claim {
  predicate: string;
  object: string;
}

export interface Digest {
  alg: string;
  value: string;
}

export interface PolicyRef {
  policy_id: string;
  policy_version: string;
  policy_hash?: string;
}

export interface Auth {
  principal: string;
  method: string;
}

export interface Signature {
  alg: string;
  kid: string;
  signed: string; // CID or multihash commitment
  sig_b64: string;
}
```

**CID computation rule:** `sig` field MUST be excluded from CID computation. The CID is computed over the canonical form of `subjects + claims + digests + policy_refs + nonce + auth`.

## Implementation Notes

- Depends on PDR-002 (ROCK-3111-C) for formal schema definition
- Should be validated against RRP test vectors (TV1)
- The signature exclusion rule is non-negotiable — violates the rule means non-conformant
- `nonce` field should use a proper crypto-grade random, not `Math.random()`

## Depends On

- PDR-002 (ROCK-3111-C must be authored first to define the formal schema)

## References

- Source doc: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Extraction: `docs/intake/docs-intelligence/2026-06-05-prd-revision-synthesis.md`
- Related: ROCK-31XX RRP specs (receipt content model)