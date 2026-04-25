# Issue Draft: Missing formal `cas://` URI scheme definition in rosetta-core

## Title

Missing: formal `cas://` URI scheme definition in rosetta-core

## Type

spec-gap

## Labels

- schema
- URI-scheme
- receipts
- provenance

## Depends On

- rosetta-core
- rosetta-schemas

## Evidence

The scaffold-forge output in `20260410 - Entif and Rosetta PRDs - ChatGPT - Pro-Extended Research.md` uses `cas://` URIs throughout receipt and tapestry examples:

```
"evidence_refs": [
  "cas://plan/sha256:abc123",
  "cas://obs/sha256:111",
  "cas://policy/sha256:222",
  "cas://method/sha256:333"
]
```

However, no formal `cas://` URI scheme definition exists in any rosetta-core schema or reference document. This is a content-addressed URI format that should be:
1. Formally specified (scheme name, host part semantics, path structure, hash algorithm profile)
2. Validated in canonicalization and CID generation
3. Documented in the Rosetta reference docs

The ambiguity: Is `sha256:abc123` using plain hex encoding or multihash (IPLD varint length prefix format)? Compatibility with IPFS CIDs is unclear.

## Recommendation

Define the `cas://` URI scheme in `rosetta-core` as part of the CID/canonicalization work. Evaluate multihash vs plain SHA-256 hex for IPFS compatibility. Write a schema for `CasUri` and add validation to `canon.ts`. ADR the decision.
