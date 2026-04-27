# CTS-015: GNN Decoder Fidelity — Transformer vs GAT vs GIN Benchmark

## Type
`research`

## Labels
`gnn`, `decoder`, `fidelity`, `benchmark`, `symbolic-codec`

## Depends On
`Symbolic Codec (CTS-003)`

## Evidence
PRD Section 2.4.2: "Decompress: Use a GNN decoder (or a simple transformer) to regenerate the canonical graph object, which can then be rendered into human-readable text, a VizForge dashboard, or executable code."

PRD: "This is where the [document's] more novel and riskier component of Semantic Latticing."

## Problem Statement
The symbolic codec decoder is the least-established part of the architecture. The document proposes "GNN decoder (or a simple transformer)" without specifying which, and provides no basis for choosing. We need benchmark data comparing GAT, GIN, and transformer approaches for graph regeneration fidelity.

## Scope

### Must Include
- [ ] Test corpus: representative DecisionReceipt + ROMA plan + APISpec graph samples
- [ ] Decoder candidates: GAT decoder, GIN decoder, transformer decoder
- [ ] Fidelity metrics: node preservation rate, edge preservation rate, attribute fidelity (semantic accuracy)
- [ ] Latency: encode + decode time per approach
- [ ] Size comparison: latent code size per approach
- [ ] Recommendation: best decoder per use case (speed vs accuracy vs compactness)
- [ ] Minimum fidelity threshold: what node/edge preservation % is acceptable

### Should Include
- [ ] Scalability: how does each decoder perform on larger graphs?
- [ ] Generalization: can decoder trained on DecisionReceipts generalize to ROMA plans?
- [ ] Roundtrip: full encode-decode roundtrip fidelity per decoder type
- [ ] Memory usage: peak GPU/RAM per approach

### Could Include
- [ ] Hybrid decoder: GNN + transformer combination
- [ ] Learned decoder vs fixed decoder comparison
- [ ] Cross-vendor: compare open-source GNN libraries (PyTorch Geometric, DGL)

## Acceptance Criteria
- [ ] All three decoder types implemented and benchmarked
- [ ] Fidelity data: node/edge preservation at each graph size
- [ ] Latency data: encode + decode time per approach
- [ ] Recommendation documented with rationale
- [ ] Minimum threshold defined and justified

## Notes
This is a research issue. Results inform CTS-003 implementation. Until benchmarks exist, the decoder choice is unresolved. The document's "or a simple transformer" fallback suggests the transformer may be the safer choice.

## Status
`draft`
