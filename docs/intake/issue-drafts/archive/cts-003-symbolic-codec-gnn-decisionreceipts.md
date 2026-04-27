# CTS-003: Symbolic Codec — GNN Encoder/Decoder for DecisionReceipt Slugs

## Type
`implementation`

## Labels
`symbolic-codec`, `gnn`, `decision-receipts`, `markov-blanket`

## Depends On
`SemanticCodecForge core (CTS-001)`

## Evidence
PRD Section 2.4.2: "Encoder: Input: A structured object—a DecisionReceipt, a ROMA plan, an APISpec, a RefactorForge codemod plan, a subgraph from our GraphRAG. Canonicalize: Convert the object into a standardized graph representation (nodes are claims/entities, edges are relations). This is where your Markov Blanket insight comes in—we only include the nodes and edges essential for the concept's meaning. Compress: Use a Graph Neural Network (GNN) encoder (like GIN or GAT) to compress the entire graph's structure and features into a single, fixed-size vector. Quantize (VQ-VAE style): Map this vector to discrete integer codes (latent_codes)."

PRD Section 2.4.2 decoder: "De-quantize: Convert back to a float vector. Decompress: Use a GNN decoder (or a simple transformer) to regenerate the canonical graph object, which can then be rendered into human-readable text, a VizForge dashboard, or executable code."

## Problem Statement
The symbolic codec is the conceptual-layer implementation of Semantic Latticing. It compresses abstract structures (DecisionReceipts, ROMA plans, APISpecs, GraphRAG subgraphs) into compact, addressable slugs using GNN-based graph compression and VQ-VAE quantization. This is the more novel and riskier component compared to the optical codec.

## Scope

### Must Include
- [ ] Define canonical graph schema: nodes (claims/entities), edges (relations)
- [ ] Implement Markov Blanket extraction: filter to essential nodes/edges only
- [ ] GNN encoder: GIN or GAT variant; compress graph to fixed-size vector
- [ ] VQ-VAE quantization: float vector → discrete integer latent_codes
- [ ] Decoder: dequantize → GNN decoder or transformer → regenerate canonical graph
- [ ] Render options: human-readable text, VizForge dashboard, executable code
- [ ] DecisionReceipt as the first symbolic object type to compress
- [ ] SlugPassport versioning with previous_version link

### Should Include
- [ ] APISpec canonical graph schema
- [ ] ROMA plan canonical graph schema
- [ ] GraphRAG subgraph canonical graph schema
- [ ] Fidelity testing: node/edge preservation rate after roundtrip

### Could Include
- [ ] Cross-object type encoding (multiple types in one slug)
- [ ] Incremental encoding (update existing slug without full recompress)

## Acceptance Criteria
- [ ] DecisionReceipt encodes to slug and decodes back with all claims/entities/relations preserved
- [ ] Latent_codes are small enough (target: <64 integers) to fit cheaply in prompts
- [ ] Markov Blanket filtering produces materially smaller graphs than full graphs
- [ ] GNN decoder fidelity meets minimum threshold (define threshold in implementation)
- [ ] Graph regeneration renders correctly to all three target formats

## Notes
This is Slice 2 of the thin-slice plan. The GNN decoder is the less-established component; document explicitly mentions "GNN decoder (or a simple transformer)" as the fallback. See CTS-015 for the decoder fidelity benchmark issue.

## Status
`draft`
