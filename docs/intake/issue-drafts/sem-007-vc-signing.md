# SEM-007: VC Signing for JSON-LD Provenance

## Type

`implementation`

## Summary

Add W3C Verifiable Credential Data Integrity suite signing to important JSON-LD documents (prices, availability, policy statements) so downstream agents can verify authenticity. Start with JWS-based signatures (v1), plan for BBS+ selective disclosure in v2.

## Problem

AI agents consuming Entif JSON-LD need cryptographic proof that data (especially prices and availability) has not been tampered with after publication. Without signing, agents must trust the HTTP channel alone, which is insufficient for high-stakes transactions.

## Proposed Approach

### v1: JWS-based signatures

```json
{
  "@context": ["https://schema.org", "https://enti.ai/contexts/app.jsonld"],
  "@type": "Offer",
  "@id": "https://dollahs.enti.ai/offer/01HXYZ",
  "price": "79.99",
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock",
  "proof": {
    "type": "DataIntegrityProof",
    "creator": "https://dollahs.enti.ai/keys/2026",
    "created": "2026-06-01T10:00:00Z",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "https://dollahs.enti.ai/keys/2026#key-1",
    "jws": "eyJhbGciOiJFZERTQSJ9..."
  }
}
```

### Key management

- Ed25519 key pairs per app, rotated annually
- Public keys published at `https://<app>.enti.ai/keys/<year>.jsonld`
- Private keys in HSM or secret manager (AWS KMS / GCP Cloud KMS)
- Key rotation: old keys retained for signature verification for 12 months

### BBS+ for selective disclosure (v2)

- When agent needs to prove only price without revealing full inventory count, BBS+ proves allow selective disclosure of predicates
- Deferred — requires v1 infrastructure first

### HTTP headers for verification hints

```
Link: <https://dollahs.enti.ai/keys/2026>; rel="author"
```

### What gets signed

- `Offer` entities (price, availability, currency)
- `PolicyStatement` entities (return policy, shipping terms)
- Any entity flagged `requiresSignature: true` in the schema

### Implementation

- Library: `jose` (Node.js) for JWS creation
- Sign on write to the entity store (before publish)
- Verify on read (fail-closed if signature invalid or missing when expected)
- Add `proof` block to JSON-LD body; do not rely on external headers alone

## Dependencies

- SEM-001 (public context)

## Labels

`verifiable-credentials`, `data-integrity`, `provenance`, `jws`, `implementation`

## Evidence

- `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md` — "Sign important JSON-LD documents... using W3C Verifiable Credential Data Integrity suites"; JWS then BBS+ for selective disclosure

## Status

draft