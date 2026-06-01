# Issue Draft: VM-006 — Watermarking Synthetic Variants Is Unnamed Technology

## Metadata

| Field | Value |
|---|---|
| Issue ID | VM-006 |
| Type | technology |
| Status | draft |
| Source doc | docs/ideas/Entif Viral Media Mirror Systems Diagram.md |
| Extraction date | 2026-06-01 |
| Confidence | high |

## Problem

The VMM document states:

> "Watermark synthetic variants; log provenance."

Watermarking is a non-functional placeholder. No watermarking technology is named, no modality-specific approach is described, no imperceptibility requirement is specified, and no robustness requirement is defined.

For a production viral content synthesis system, watermarking is a critical provenance and attribution mechanism. A system that can synthesize convincing variants of viral content without watermarking creates a deepfake amplification risk.

## Evidence

**Guardrails & Ethics (full):**
```
- Distinguish style mirroring from creator impersonation.
- Respect platform policies and rightsholder licenses.
- Watermark synthetic variants; log provenance.
- Opt‑out registry and cohort‑level constraints.
```

**Watermarking modalities required (per Synthesis layer):**
- Text: imperceptible textual watermarks (e.g., synonym substitution patterns, sentence structure signatures)
- Image: perceptible + imperceptible visual watermarks (steganographic or robust hash)
- Audio: audio watermarking (ultrasonic or spectral)
- Video: frame-level + audio watermarking; compositor signature

**Existing watermarking approaches in adjacent specs:**
- WitnessPack model (Cognitive Tapestries): cryptographic evidence bundles
- RRP provenance receipts (Pasigraphy Protocol): content-addressed receipts

Neither is a watermarking technology for rendered multimodal content.

## Watermarking Requirements Missing from Spec

1. **Technology selection:** Which watermarking approach per modality?
2. **Perceptibility:** Must be imperceptible to end viewers (or clearly labeled as perceptible for disclosure)
3. **Robustness:** Must survive common transformations (re-encoding, cropping, recompression, screen recording)
4. **Capacity:** How much information must the watermark carry? (variant ID? attribution? synthesis parameters?)
5. **Detection:** Who can detect the watermark? Is there a detection API?
6. **Unwatermarked exception:** When is a variant permitted without a watermark?
7. **Cross-modality:** Can watermarks survive format conversion (image → video thumbnail)?

## Recommendation

1. Specify watermarking technology per modality (text, image, audio, video)
2. For text: evaluate natural language watermarking approaches (AAPD, Gumbel watermark, etc.)
3. For image/video: select steganographic + robust hash approach; evaluate against screen recording survivability
4. For audio: evaluate ultrasonic/spectral watermarking approaches
5. Define watermark payload schema: variant_id, source_artifacts[], synthesis_parameters_hash, timestamp
6. Add watermark detection to the governance review queue
7. Cross-reference with provenance logging (VM-005) so watermark and receipts are co-specified

## Labels

- governance
- provenance
- watermarking
- deepfake-risk

## Depends On

- VM-005 (attribution and provenance co-design)
