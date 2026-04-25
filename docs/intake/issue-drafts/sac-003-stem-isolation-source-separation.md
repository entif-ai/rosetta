# SAC-003: Stem Isolation Preprocessing — Neural Source Separation Evaluation

## Meta

- Type: technology-evaluation
- Priority: high
- Status: draft
- Source: docs/ideas/Semantic Audio Cognition Framework.md — gap item 2

## Problem Statement

Crates requires "isolation of instruments and individual stems making up a composite, to be analyzed alone." A composite audio track (e.g., a full music mix or multi-person recording) must be decomposed into constituent stems before per-stem semantic analysis can occur.

This is neural source separation — a well-established but compute-intensive problem. Several open-source and commercial options exist; Entif must evaluate for its specific use case.

## Options Under Evaluation

### Demucs (Hybrid Transformer)
- Source: facebookresearch/demucs
- Quality: State-of-the-art for music source separation
- Models: HTDemucs (4 stems: drums, bass, vocals, other), HTDemucs_ft (fine-tuned), MDX (music extensions)
- Compute: GPU strongly recommended; CPU inference is slow
- License: MIT
- Notes: Trained on MusDB dataset; strong vocal/instrument separation

### Spleeter (Deezer)
- Source: deezer/spleeter
- Quality: Good; slightly older than Demucs
- Models: 2-stem (vocals/accompaniment), 4-stem (vocals/drums/bass/other), 5-stem
- Compute: Moderate; can run on CPU with acceptable latency for batch processing
- License: MIT
- Notes: Pre-trained models available for download; faster than Demucs on CPU

### Meta's AudioSeperation (Fairsion)
- Source: facebookresearch/fairseq
- Quality: Competitive with Demucs
- Models: SINGING-VOCALS separation, instrument models
- Compute: GPU recommended
- License: FAIRseq (non-commercial clause may apply)
- Notes: May have licensing constraints for commercial use

### Open-Unmix
- Source: sigsep/open-unmix-py
- Quality: Good for music stems
- Models: vocals, drums, bass, other
- Compute: Moderate; CPU-friendly
- License: MIT

## Evaluation Criteria for Entif

1. **Stem fidelity:** Does separation preserve semantic content (lyrics, timbre, pitch) or just spectral energy?
2. **Compute cost:** Latency and GPU/CPU requirements for real-time vs batch processing
3. **Licensing:** Commercial use compatibility with Entif's licensing model
4. **Language coverage:** Does model handle non-English vocals well?
5. **Voicing separation:** Can it separate overlapping voices or just instrument stems?
6. **API surface:** Can it be packaged as a Rosetta preprocessing step with clear I/O contract?

## Questions for Crates

- Is batch (offline) stem isolation acceptable or does Entif need real-time (streaming) separation?
- What is the minimum number of stems required? 2 (vocals vs everything else) or full 4-5 stem decomposition?
- Are overlapping voices (multiple speakers) in scope or only music instrument separation?
- GPU compute budget: is GPU acceleration available in the target deployment environment?