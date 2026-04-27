# CTS-002: Optical Codec — DeepSeek-OCR Integration + VQ-VAE Quantization

## Type
`implementation`

## Labels
`optical-codec`, `deepseek-ocr`, `vq-vae`, `compression`

## Depends On
`SemanticCodecForge core (CTS-001)`

## Evidence
PRD Section 2.3.1: "Encoder: Input: A document file (PDF, PNG, etc.) from FileForge. Process: Render it to a canonical high-resolution image (MediaForge). Compress: Use a DeepEncoder-style model to transform the image into a small set of vision tokens (e.g., 256 floats). Quantize: Use Vector Quantization (VQ) to map these continuous floats to a small set of discrete integer codes (e.g., [102, 5, 834, ...]). These are the latent_codes."

PRD Section 1: "DeepEncoder... uses a clever two-stage architecture: 1. A local attention stage (using SAM) processes the high-resolution image in patches, preserving fine-grained detail. 2. A convolutional compressor then drastically reduces the number of tokens (by a factor of 16x). 3. A global attention stage (using CLIP) then processes these compressed tokens to build a holistic understanding of the document."

## Problem Statement
The optical codec is the perceptual-layer implementation of Semantic Latticing. It compresses rendered documents into compact latent codes and can rehydrate them with high fidelity. This is the most immediately implementable part of SemanticCodecForge, requiring integration of DeepSeek-OCR's DeepEncoder with a VQ-VAE quantization layer.

## Scope

### Must Include
- [ ] Containerize DeepSeek-OCR model as `deepseek.ocr.mcp` MCP server
- [ ] Implement two-stage DeepEncoder: SAM local attention (patch-level) → convolutional compressor (16x reduction) → CLIP global attention
- [ ] VQ-VAE quantization: map float vectors to discrete integer codes (latent_codes)
- [ ] Decoder: dequantize integer codes back to float vectors → DeepSeek-MoE decoder → text output
- [ ] MCPForge shim wrapping deepseek.ocr.mcp server
- [ ] FileForge pipeline integration: PDF → pdftoppm render → optical_extract step → ExtractedText artifact
- [ ] Support qualifiers: raw_text, structured_json, markdown, deep_parse_chart
- [ ] SLO: p95_ms 5000, accuracy "Edit distance < 0.05 @ 10x comp"
- [ ] Compression ratio targeting: 10x near-lossless, 20x still-useful

### Should Include
- [ ] Petri packs adversarial tests (weird fonts, rotated text, complex layouts, low-contrast)
- [ ] Provider selection based on compression_ratio/required_precision/is_structured_data routing
- [ ] Model version tracking in WitnessPack model_versions field

### Could Include
- [ ] Multi-page document handling (batch render)
- [ ] Layout-preserving extraction (bounding box tracking)

## Acceptance Criteria
- [ ] DeepSeek-OCR containerized and accessible via MCP hub
- [ ] 10x compression: encode 100K-token document to ≤1000 vision tokens; decode with edit distance < 0.05
- [ ] 20x compression: encode to ≤500 vision tokens; decode still useful (subjective quality threshold TBD)
- [ ] deep_parse_chart qualifier returns structured JSON from chart regions
- [ ] All operations emit receipts with model_versions tracked

## Notes
Slice 1 of the thin-slice plan. DeepSeek-OCR is open-source and available. The VQ-VAE layer is the novel component that converts vision-token sequences into compact discrete codes.

## Status
`draft`
