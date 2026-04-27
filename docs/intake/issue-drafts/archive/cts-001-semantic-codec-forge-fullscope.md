# CTS-001: SemanticCodecForge Fullscope Implementation

## Type
`implementation`

## Labels
`semantic-codec-forge`, `core-infrastructure`, `priority`

## Depends On
`MCPForge hub (existing or prior spec)`

## Evidence
PRD Section 2: "This isn't a replacement for our other forges. It's a new, central service that they all depend on. SemanticCodecForge is responsible for the entire lifecycle of slugs: encoding, decoding, storing, and verifying."

## Problem Statement
SemanticCodecForge is the central service for Semantic Latticing. It manages the full lifecycle of optical and symbolic slugs: encoding (compress), decoding (rehydrate), storing (SlugPassport + WitnessPack persistence), and verifying (cryptographic validation). This is the most fundamental new capability in the Entif 2.0 architecture.

## Scope

### Must Include
- [ ] Define `SlugURI` type: `entif://slug/{optical|symbolic}/${string}`
- [ ] Define `WitnessPack` interface: id, content_hashes[], optical_refs[], model_versions{}, executable_proof{}, test_harness_id, receipt_ids[]
- [ ] Define `SlugPassport` interface: id, kind, latent_codes[], canonical_hash, witness_pack_id, summary, glyph_tags[], created_at, version
- [ ] Implement `semantic.codec.encode` MCP surface: input { kind, content, witness_pack } → output SlugPassport
- [ ] Implement `semantic.codec.decode` MCP surface: input { slug_uri, target_format: 'human'|'machine'|'graph' } → output { rehydrated_content, receipt_id }
- [ ] Implement `semantic.codec.verify` MCP surface: input { slug_uri } → output { is_valid, reason?, receipt_id }
- [ ] Optical codec pipeline: render → SAM → compressor → CLIP → VQ → encode; dequantize → MoE → decode
- [ ] Symbolic codec pipeline: canonicalize graph → GNN encode → VQ → encode; dequantize → GNN/transformer decode → regenerate
- [ ] WitnessPack immutable storage (content-addressed)
- [ ] SlugPassport versioning with previous_version link

### Should Include
- [ ] glyph_tags auto-generation from WordNet/BabelNet
- [ ] MCPForge hub routing: auto-route to appropriate codec based on kind
- [ ] Telemetry: encode/decode latency, compression ratio, fidelity scores

### Could Include
- [ ] Batch encode/decode operations
- [ ] Cross-codec optimization (when to use optical vs symbolic)

## Acceptance Criteria
- [ ] All three MCP surfaces (encode/decode/verify) are functional and return valid receipts
- [ ] Roundtrip fidelity: optical encode→decode recovers original text with edit distance < 0.05 @ 10x compression
- [ ] Symbolic encode→decode recovers original graph structure (nodes + edges preserved)
- [ ] WitnessPack is immutable once committed; any modification creates new version
- [ ] entif://slug/ URIs are resolvable via SemanticCodecForge

## Notes
This is the P0 gate for all subsequent CTS issues. Slice 1 of the thin-slice plan targets this for 4-hour POC.

## Status
`draft`
