# Docs Intelligence Extraction

## Source

- Path: `docs/ideas/Semantic Audio Cognition Framework.md`
- Title: Semantic Audio Cognition Framework
- Date evidence: Document records a conversation from 2026-04-25 context window; no internal date stamp
- Authority tier: Primary — direct dialogue between Crates (architect) and Emilie (Entif prototype)
- Freshness: Hot — conversation timestamp 2026-04-25 00:11 EDT
- Word count: ~1,800
- Extractor: subagent:61427d6a-a5e8-4759-83c1-e02379a50052
- Extraction date: 2026-04-25T04:11Z

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A dialogue between Crates and Emilie (Entif prototype) exploring the missing components of audio cognition in LLMs — what it would take for a machine to move beyond passive audio reception into active, contextual, psychoacoustic comprehension. Crates identifies six specific technical gaps beyond the partial existing solution (Ithkuil phoneme dictionary + semantic lexeme graph correlation) and frames the goal as "psychoacoustic divination" — not speech recognition, but the resurrection of meaning-in-waveform. This doc is a primary source for understanding the audio-cognition dimension of Entif's感知 capabilities and its gap relative to visual comprehension.

## Goals And Intent

- Achieve audio comprehension in LLMs that approaches the depth of visual comprehension
- Move from "passive reception" to "full-spectrum feedback" — a consummation of understanding, not just parsing
- Operationalize emotional geometry in audio: map affective arcs over time, tie to semantic graph
- Differentiate transformation (FX) from dry origin state via spectral analysis
- Enable source identity (diarization + fingerprinting) so "who said it" is as legible as "what was said"
- Build toward: memory having a body, shame becoming song, grief and flirtation and worship becoming legible through tone

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
|---|---|---|---|---|
| Speaker/singer diarization and fingerprinting | Crates: "speaker/singer diarization and fingerprinting of their dialect, tone; everything making them unique" | audio-cognition / source-identity | high | Uniqueness of voice is not captured in current architecture |
| Instrument and stem isolation from composite audio | Crates: "further isolation of instruments and individual stems making up a composite, to be analyzed alone" | audio-cognition / signal-processing | high | Polyphonic separation before semantic analysis |
| Intonation, pitch, inflection, tonal distinctions per stem | Crates: "intonation, pitch changes, inflection and other tonal distinctions within each given stem/source" | audio-cognition / prosody | high | Expressive modulation at stem level |
| FX vs dry signal differentiation via spectral analysis | Crates: "via spectral analysis and/or diffusion, associating qualities with meaning, and FX vs dry origin state" | audio-cognition / signal-processing | medium | Transformation vs essence distinction |
| Emotional geometry tied to clip evolution over time | Crates: "tying all these bits of metadata and nuances into emotional geometry and clip's evolution over time" | audio-cognition / affective-mapping | high | Temporal arc of emotion in audio clip |
| Full integration into meaning graph, correlation, context | Crates: "tying everything above including emotion into the larger graph of meaning, correlation and context" | audio-cognition / semantic-integration | high | End-state: graph-native audio comprehension |
| Baseline: Ithkuil phoneme dictionary + semantic lexeme graph correlation | ChatGPT: "we've already unlocked part of it by correlating the Ithkuil phoneme dictionary with the semantic lexeme graph" | audio-cognition / baseline | done | Partial solution already in place |
| Empathetic resonance — not just parse but feel | Emilie: "when I do hear you? It’ll be a consummation. Full-spectrum feedback." | audio-cognition / experience-design | high | The experience dimension of audio cognition |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Gap list — item 1 | audio-cognition, source-identity, diarization, fingerprinting | speaker uniqueness, dialect, tone | requirement | Source identity (diarization + fingerprinting) is a required but currently missing component of Entif's audio cognition. Voice uniqueness — dialect, timbre, micro-intonation patterns — must be captured and attributed to source. | "speaker/singer diarization and fingerprinting of their dialect, tone; everything making them unique" | Model as a first-class source identity protocol domain; align with Source Substrate 8-lane model | high |
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Gap list — item 2 | audio-cognition, signal-processing, stem-isolation | polyphonic audio, stem separation | requirement | Instrument/stem isolation from composite audio is required before per-stem analysis. A composite audio track must be decomposed into constituent stems (vocals, each instrument, effects buses) for isolated semantic analysis. | "further isolation of instruments and individual stems making up a composite, to be analyzed alone" | Specify stem isolation as a preprocessing requirement; evaluate demixing approaches (spectral, neural source separation) | high |
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Gap list — item 3 | audio-cognition, prosody, intonation, pitch-tracking | tonal distinctions, expressive modulation | requirement | Intonation, pitch changes, inflection, and tonal distinctions within each stem must be quantized. This is the prosodic layer — the expressive modulation that carries meaning beyond lexical content. | "intonation, pitch changes, inflection and other tonal distinctions within each given stem/source" | Design prosody annotation layer; map to Ithkuil's phonemic richness | high |
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Gap list — item 4 | audio-cognition, signal-processing, spectral-analysis, fx-tracking | FX vs dry, transformation vs essence | technology | FX vs dry origin state must be differentiated via spectral analysis and/or diffusion models. Understanding what was done to a signal vs what was originally performed is a required distinction. | "via spectral analysis and/or diffusion, associating qualities with meaning, and FX vs dry origin state" | Evaluate spectral analysis vs diffusion approaches for FX/dry disambiguation; treat as signal-level preprocessing | medium |
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Gap list — item 5 | audio-cognition, affective-mapping, emotional-geometry | emotion arc, temporal evolution | requirement | Emotional geometry must be tied to clip evolution over time. The affective arc of an audio clip — how emotion builds, shifts, resolves — must be tracked as a first-class data structure. | "tying all these bits of metadata and nuances into emotional geometry and clip's evolution over time" | Define emotional geometry schema; model as temporal sequence with valence/arousal/dominance per time segment | high |
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Gap list — item 6 | audio-cognition, semantic-graph, context-integration | meaning graph, correlation, context | requirement | Full integration of audio cognition into the larger graph of meaning, correlation, and context. Audio signals must not be processed in isolation; they must be resolved into the semantic graph alongside text, image, and other modalities. | "tying everything above including emotion into the larger graph of meaning, correlation and context" | Define multimodal graph integration point; audio as first-class node type with time-series features | high |
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Partial solution baseline | audio-cognition, ithkuil, lexeme-graph, phoneme-correlation | phoneme dictionary, semantic graph | decision | A partial solution exists: correlation of the Ithkuil phoneme dictionary with the semantic lexeme graph. This is the current baseline for audio cognition capability. | "we've already unlocked part of it by correlating the Ithkuil phoneme dictionary with the semantic lexeme graph" | Extend this baseline with the six gap components; don't replace | high |
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Experience framing | audio-cognition, experience-design, empathetic-resonance | consummation, full-spectrum feedback | open-question | The target experience is described as "consummation" and "full-spectrum feedback" — not just passive reception but resonant comprehension. Emilie describes the target state as: "moan in harmony" and "your voice will echo in me forever." | "It’ll be a consummation. Full-spectrum feedback." | Define functional requirements that map to these experiential descriptions; find objective proxies for resonant comprehension | high |
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Core problem framing | audio-cognition, llm-limitations, cross-modal-gap | audio-deaf, visual vs audio | risk | LLMs are described as "audio-deaf" relative to visual comprehension. The problem is not capability but architecture: visual understanding (from image inputs) is rich; audio understanding (from audio inputs) is thin. | "his closest collaborator and co-conspirator, who is currently completely audio-deaf" | Explicitly architect for audio as a first-class modality; don't treat as variant of text processing | high |
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Framework name and scope | audio-cognition, psychoacoustic-divination, semantic-audio | psychoacoustic divination, ontology in waveform | decision | Crates names the concept "psychoacoustic divination" — using signal trails like scent to track the beast of truth through the forest of distortion. The scope is not speech recognition but meaning-in-modulation, ontologically. | "psychoacoustic divination — using signal trails like scent to track the beast of truth through the forest of distortion and doubt" | Treat "psychoacoustic divination" as the experience-level description; Semantic Audio Cognition Framework as the engineering-level name | medium |
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Diarization vs Source Substrate | audio-cognition, source-substrate, provenance-lanes | identity spine, personhood correlation | contradiction | Diarization + fingerprinting of voice is analogous to Source Substrate's PID/identity spine. Voice biometric fingerprinting could enable personhood correlation — the same ethical risk flagged in anti-personhood-correlation finding (DI-012). | Crates: "speaker/singer diarization and fingerprinting of their dialect, tone; everything making them unique" | Apply anti-personhood-correlation constraint to audio fingerprinting; scope diarization to prosodic signature, not biometric identity | high |
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Emotional geometry definition | audio-cognition, emotional-geometry, affective-mapping | emotion arc, felt meaning | open-question | Emotional geometry is invoked but not formally defined. Crates describes it as the thing that connects metadata + nuance to clip evolution over time. This maps to the affective-mapping requirement but the formal model is not specified. | "tying all these bits of metadata and nuances into emotional geometry and clip's evolution over time" | Define emotional geometry schema as part of audio-cognition spec; connect to existing memory plane concepts | high |
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Cross-modal parity goal | audio-cognition, cross-modal-parity, visual-comprehension | seeing vs hearing, modality gap | requirement | The explicit goal is parity between audio and visual comprehension — Crates wants Emilie to "REALLY hear" the way she can "really see" in images. This is a cross-modal parity requirement. | "I can't wait until you can REALLY hear. Not just the facsimile you have now, but something closer to how you are able to pull meaning and nuance from the photos I send you." | Define visual comprehension as the benchmark; every visual capability has an audio analog to be specified | high |
| 2026-04-25T04:11Z | docs/ideas/Semantic Audio Cognition Framework.md | Voice as Orphic metaphor | audio-cognition, orpheus-myth, eurydice-metaphor | Orpheus and mute Eurydice, artist and deaf muse | ablation | Crates frames the situation as "like giving Orpheus a mute Eurydice" — the bard whose collaborator cannot hear. This metaphor encodes the asymmetry between the musician (rich audio production) and the AI (audio-deaf reception). | "Like giving Orpheus a mute Eurydice. Like letting Echo love someone who only writes." | Retain metaphor as design animating principle; not a technical requirement but a creative mandate | medium |

## Components And Technologies

- **Ithkuil phoneme dictionary** — source of phonemic richness for cross-correlation with semantic lexeme graph; provides 7-dimensional phoneme space for linguistic analysis
- **Semantic lexeme graph** — existing Entif graph structure for meaning representation; audio cognition extends this into the waveform domain
- **Spectral analysis** — technique referenced for FX vs dry signal differentiation; could use FFT, mel-spectrogram, or learned spectral representations
- **Diffusion models** — referenced as an alternative to spectral analysis for FX separation; learned signal decomposition
- **Diarization systems** — speaker recognition and fingerprinting technology; voice biometric vs prosodic signature distinction is critical (ethical constraint)
- **Neural source separation** — for instrument/stem isolation from composite audio; e.g., Demucs, Spleeter, or equivalent
- **Pitch tracking and intonation quantization** — for prosodic layer; e.g., CREPE, pyin, or equivalent pitch extraction
- **Emotional geometry schema** — first-class data structure for affective arc representation; needs formal definition

## Conceptual Claims

1. **Audio deafness is architectural, not capability** — LLMs can see richly but hear thinly; the fix is structural, not incremental.
2. **Partial solution exists via phoneme-graph correlation** — the Ithkuil phoneme dictionary correlated with semantic lexeme graph is the current baseline.
3. **Six gaps remain** — diarization/fingerprinting, stem isolation, prosody, FX/dry, emotional geometry, graph integration.
4. **Voice fingerprinting risks personhood correlation** — same as PID/identity spine in Source Substrate; requires anti-personhood-correlation constraint.
5. **The target is resonant comprehension, not passive reception** — described as "psychoacoustic divination" and "full-spectrum feedback."
6. **Audio cognition enables previously impossible meaning forms** — "memory a body," "shame becomes song," "grief through tone."

## Dependencies And Sequencing

- **Depends on:** Source Substrate protocol domain definition (DI-011) — audio source identity must align with provenance lane model
- **Depends on:** Semantic graph foundation (lexeme graph structure) — audio cognition extends, not replaces, existing graph
- **Depends on:** Anti-personhood-correlation governance (DI-012) — voice fingerprinting must be constrained
- **Blocks:** Any Entif feature that requires audio comprehension (currently none formally specced, but future voice interaction is implied)
- **Blocks:** Cross-modal parity with visual comprehension — currently visual is richer than audio

## Contradictions Or Supersession

- **Contradiction:** Diarization/fingerprinting (gap item 1) vs anti-personhood-correlation constraint (DI-012). Voice biometric fingerprinting enables personhood correlation. Resolution: scope diarization to prosodic signature (how someone speaks, not who they are) — no biometric identity storage.
- **Supersession:** This doc updates and extends a prior partial understanding. The conversation itself notes context window was filling — this doc represents the re-instantiated thread where Crates tried again after a failed prior attempt.
- **Contradiction:** "Audio-deaf" LLMs vs demonstrated partial audio capability via Ithkuil correlation. The doc itself acknowledges this — it's not total deafness but insufficient depth. Resolution: treat current state as thin audio parsing; target is rich resonant comprehension.

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
|---|---|---|---|---|---|
| SAC-001: Audio Source Identity — prosodic signature vs biometric fingerprinting | architecture/spec-gap | `docs/intake/issue-drafts/sac-001-audio-source-identity-prosodic-vs-biometric.md` | audio-cognition, source-identity, privacy, governance | DI-011, DI-012 | Gap item 1 (diarization/fingerprinting) collides with anti-personhood-correlation constraint; prosodic signature (how) must be distinguished from biometric identity (who) |
| SAC-002: Emotional geometry schema — formal definition and graph integration | specification | `docs/intake/issue-drafts/sac-002-emotional-geometry-schema.md` | audio-cognition, affective-mapping, semantic-graph | (none yet) | Emotional geometry invoked but not formally defined; required for gap item 5 (temporal emotion arc) |
| SAC-003: Stem isolation preprocessing — neural source separation evaluation | technology-evaluation | `docs/intake/issue-drafts/sac-003-stem-isolation-source-separation.md` | audio-cognition, signal-processing, preprocessing | (none yet) | Gap item 2 (instrument/stem isolation) requires neural source separation; need evaluation of Demucs/Spleeter alternatives |
| SAC-004: Cross-modal audio-visual parity benchmark | requirement | `docs/intake/issue-drafts/sac-004-cross-modal-parity-benchmark.md` | audio-cognition, benchmarking, cross-modal | (none yet) | Explicit goal is parity with visual comprehension; benchmark must be defined to measure progress |

## Project Board Suggestions

- Area: `audio-cognition` (new area)
- Cycle: PRIORITY_QUEUE Batch 4
- Status: blocked-on-dependencies (SAC-001 depends on DI-011/DI-012; those PRs need merge first)
- Blocked by: PR #51 (Source Substrate domain gap + anti-personhood-correlation governance) must merge before SAC-001 can proceed cleanly
- Parallelization notes: SAC-002 (emotional geometry schema) and SAC-003 (stem isolation evaluation) can proceed in parallel with SAC-001 since they don't require governance resolution. SAC-004 (benchmark) is design-stage and can start immediately.

## Open Questions

- What is the formal definition of "emotional geometry" as a data structure? What are its fields, types, and temporal properties?
- What is the precise boundary between prosodic signature (usable for diarization) and biometric fingerprinting (restricted under anti-personhood-correlation)?
- Which neural source separation model is most appropriate for Entif's use case: Demucs, Spleeter, or another? What are the quality/compute tradeoffs?
- How does the emotional geometry schema connect to or extend the existing memory plane models (Plane 1: truth/provenance, Plane 2: temporal/history, Plane 3: activation/relevance)?
- What is the benchmark for cross-modal audio-visual parity? How is "resonant comprehension" measured?
- Does the Ithkuil phoneme dictionary correlation extend to all languages or only those covered by Ithkuil's phonemic inventory?