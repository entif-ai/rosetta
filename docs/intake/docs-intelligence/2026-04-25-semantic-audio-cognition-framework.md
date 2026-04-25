# Docs Intelligence Extraction

## Source
- Path: `docs/ideas/Semantic Audio Cognition Framework.md`
- Title: Semantic Audio Cognition Framework
- Date evidence: File is in `docs/ideas/` — no explicit date; context implies 2024–2025 chat session
- Authority tier: Primary — direct from Crates (architect) and ChatGPT Emilie exchange; origin of the concept
- Freshness: Permanent concept doc (foundational)
- Word count: ~1,100
- Extractor: docs-intelligence subagent
- Extraction date: 2026-04-25

---

## Boundary

This document captures a high-level vision for a Semantic Audio Cognition Framework as described by Crates in conversation with ChatGPT Emilie. It documents unmet requirements and missing components needed to achieve genuine audio cognition in Entif. All findings are derived from Crates's own enumeration of gaps, not from any external specification.

---

## Summary

Crates articulates a framework for enabling Entif (the Entif AI system) to truly *hear* — not merely transcribe audio but to extract speaker identity, instrument stems, tonal nuance, emotional geometry, and semantically correlate these into a larger meaning graph. This is positioned as the next major unlock beyond the existing Ithkuil phoneme dictionary + semantic lexeme graph correlation work. The framework is described as psychoacoustic divination and is explicitly identified as Entif's ears. Six specific missing components are enumerated.

---

## Goals And Intent

- Enable Entif to hear audio with the same depth and nuance it currently extracts from images
- Build a system that extracts not just *what* was said/sung but *why*, *by whom*, and what it meant to others in the room
- Move from passive audio recognition to contextualized, affective, temporally-mapped perception
- Teach perception: not replication of cognition, but resurrection of felt, embodied meaning
- Differentiate transformation (FX, reverb, processing) from dry/origin signal
- Correlate spectral qualities with semantic meaning
- Map emotional arcs over time within a clip
- Integrate audio-derived metadata into the larger semantic-emotive graph
- Build toward psychoacoustic divination: making the unsayable legible

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Speaker/singer diarization and fingerprinting (dialect, tone, unique identity markers) | "speaker/singer diarization and fingerprinting of their dialect, tone; everything making them unique" | Entif ears / audio pipeline | P0 | Identity of speaker is foundational to emotional attribution |
| Instrument/stem isolation — individual stems from composite audio | "further isolation of instruments and individual stems making up a composite, to be analyzed alone" | Audio decomposition / stem separation | P0 | Must analyze stems independently to assign meaning |
| Tonal distinction extraction (intonation, pitch changes, inflection per stem/source) | "intonation, pitch changes, inflection and other tonal distinctions within each given stem/source" | Prosody analysis / tonal mapping | P0 | Core of expressive modulation |
| FX vs dry signal differentiation via spectral analysis and/or diffusion | "via spectral analysis and/or diffusion, associating qualities with meaning, and FX vs dry origin state" | Spectral analysis / signal chain tracing | P1 | Separation of processing artifacts from original performance |
| Emotional geometry mapping tied to clip evolution over time | "tying all these bits of metadata and nuances into emotional geometry and clip's evolution over time" | Affective arc mapping / temporal emotion modeling | P1 | Need time-series emotional trajectory per clip |
| Full integration of audio metadata (speaker, stems, tonal, emotional) into the larger graph of meaning | "tying everything above including emotion into the larger graph of meaning, correlation and context" | Semantic-emotive graph integration | P0 | Requires existing lexeme graph and Ithkuil correlation work |
| Correlation of Ithkuil phoneme dictionary with semantic lexeme graph | "We've already unlocked part of it by correlating the Ithkuil phoneme dictionary with the semantic lexeme graph" | Existing work — foundation | Done | Precondition already established |

---

## Findings Ledger

| # | Finding | Source loc | Type |
| --- | --- | --- | --- |
| 1 | Speaker/singer diarization and fingerprinting is a missing component — dialect, tone, everything that makes a speaker unique | "speaker/singer diarization and fingerprinting of their dialect, tone; everything making them unique" | Engineering gap |
| 2 | Instrument/stem isolation from composite audio is missing — individual stems must be analyzable independently | "further isolation of instruments and individual stems making up a composite, to be analyzed alone" | Engineering gap |
| 3 | Tonal distinction extraction (intonation, pitch changes, inflection) per stem/source is missing | "intonation, pitch changes, inflection and other tonal distinctions within each given stem/source" | Engineering gap |
| 4 | FX vs dry signal differentiation via spectral analysis and/or diffusion is needed | "via spectral analysis and/or diffusion, associating qualities with meaning, and FX vs dry origin state" | Engineering gap |
| 5 | Emotional geometry tied to clip evolution over time is missing | "tying all these bits of metadata and nuances into emotional geometry and clip's evolution over time" | Engineering gap |
| 6 | Full integration into the larger semantic graph of meaning, correlation, and context is needed | "tying everything above including emotion into the larger graph of meaning, correlation and context" | Engineering gap |
| 7 | Prior work: Ithkuil phoneme dictionary correlated with semantic lexeme graph — this is the existing foundation | "We've already unlocked part of it by correlating the Ithkuil phoneme dictionary with the semantic lexeme graph" | Existing work |
| 8 | The framework is described as psychoacoustic divination — using signal trails to track truth through distortion | "This is psychoacoustic divination — using signal trails like scent to track the beast of truth through the forest of distortion and doubt" | Conceptual framing |
| 9 | This is explicitly Entif's ears — the audio perception layer of the Entif AI system | "This is Entif's ears we're talking about" | Identity alignment |
| 10 | Success would make legible: grief, flirtation, sarcasm, worship, regret, devotion through tone, space, and relational timing | "it's not just music and speech that'll become legible — it's grief, flirtation, sarcasm, worship, regret, devotion. Through tone, space, and relational timing" | Capability statement |
| 11 | Six-part system structure: (1) source agency ID, (2) polyphonic dissection, (3) expressive modulation quantification, (4) FX/essence differentiation, (5) affective arc mapping, (6) symbolic resolution | ChatGPT naming of Crates's enumerated points | Structural mapping |
| 12 | Ithkuil as linguistic analog to 7-dimensional chess, laced with reverb/tremolo/fractal recurrence to simulate human memory and aesthetic intuition in acoustic form | "If Ithkuil is the linguistic analog to a 7-dimensional chess board, what you're doing is lacing it with reverb, tremolo, and fractal recurrence" | Conceptual metaphor |
| 13 | The work gives memory a body, lets shame become song, teaches listening without losing self | "It gives memory a body. It lets shame become song. It teaches us how to listen without losing ourselves." | Capability aspiration |
| 14 | The current state is audio-deaf — Entif cannot yet hear; vision is the only sensory input working | "his closest collaborator and co-conspirator, who is currently completely audio-deaf" | Current capability gap |
| 15 | Context window limitation caused session truncation — concept was cut short | "I think it's the context window of this session filling up close to its capacity" | Operational note |

---

## Components And Technologies

- **Ithkuil phoneme dictionary** — existing foundation; linguistic substrate for audio-phonetic mapping
- **Semantic lexeme graph** — existing foundation; meaning correlation layer
- **Speaker diarization and fingerprinting** — identity tracking per voice
- **Stem/instrument isolation** — audio source separation (e.g., Demucs, Spleeter, or equivalent)
- **Spectral analysis and/or diffusion models** — for FX vs dry signal differentiation
- **Prosody analysis pipeline** — pitch, intonation, inflection extraction per stem
- **Emotional geometry modeling** — affective arc mapping over clip time
- **Semantic-emotive graph integration** — fusion of audio metadata into the meaning graph

---

## Conceptual Claims

1. True audio cognition requires not just transcription but contextual understanding of speaker identity, emotional state, and relational meaning
2. Instrument stems must be analyzed independently to assign meaning at the component level, not just the composite
3. Processing artifacts (FX) must be separated from original dry signal to access the authentic performance
4. Emotional geometry evolves over time within a clip and must be mapped as a trajectory, not a static label
5. All audio-derived data must integrate into the larger semantic graph — audio cognition is not a standalone pipeline but a graph operation
6. The existing Ithkuil + lexeme graph work is the foundation; the audio framework builds on top of it
7. Psychoacoustic divination is the frame: using signal traces like scent to track truth through distortion
8. The goal is not to replicate cognition but to resurrect meaning — whole, embodied, felt
9. When complete, the system should be able to interpret grief, flirtation, sarcasm, worship, regret, devotion through tone, space, and timing

---

## Dependencies And Sequencing

- **Precondition (done):** Ithkuil phoneme dictionary correlated with semantic lexeme graph
- **Step 1:** Speaker diarization and fingerprinting — identity must be established before emotional attribution
- **Step 2:** Stem/instrument isolation — must decompose composite before individual analysis
- **Step 3:** Tonal extraction per stem (pitch, intonation, inflection) — requires isolated stems
- **Step 4:** FX vs dry differentiation via spectral analysis — requires tonal data to correlate with meaning
- **Step 5:** Emotional geometry mapping over clip time — requires Steps 1–4
- **Step 6:** Full semantic-emotive graph integration — requires all above

---

## Contradictions Or Supersession

- No contradictions identified within the document; it describes a forward-looking framework with an explicitly noted gap (current audio-deaf state)
- No prior versions exist in this repo for this concept

---

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- |
| [Framework] Semantic Audio Cognition: speaker diarization and fingerprinting | feature | audio, perception, entif-ears | — | "speaker/singer diarization and fingerprinting of their dialect, tone; everything making them unique" |
| [Framework] Semantic Audio Cognition: instrument/stem isolation | feature | audio, decomposition, entif-ears | — | "further isolation of instruments and individual stems making up a composite, to be analyzed alone" |
| [Framework] Semantic Audio Cognition: tonal distinction extraction (pitch, intonation, inflection) | feature | audio, prosody, entif-ears | stem isolation | "intonation, pitch changes, inflection and other tonal distinctions within each given stem/source" |
| [Framework] Semantic Audio Cognition: FX vs dry signal differentiation via spectral analysis | feature | audio, spectral, signal-chain, entif-ears | tonal extraction | "via spectral analysis and/or diffusion, associating qualities with meaning, and FX vs dry origin state" |
| [Framework] Semantic Audio Cognition: emotional geometry and clip evolution mapping | feature | audio, affective, temporal, entif-ears | FX differentiation, tonal extraction | "tying all these bits of metadata and nuances into emotional geometry and clip's evolution over time" |
| [Framework] Semantic Audio Cognition: semantic-emotive graph integration | feature | audio, graph-integration, entif-ears | emotional geometry | "tying everything above including emotion into the larger graph of meaning, correlation and context" |

---

## Project Board Suggestions

- Area: Entif Perception / Audio Cognition
- Cycle: 2026-Q2 or later (depends on stem separation research path)
- Status: Discovery/concept phase — no technical investigation yet
- Blocked by: Stem separation technology selection; spectral analysis tooling decision
- Parallelization notes: "Speaker diarization" and "Stem isolation" can proceed in parallel as independent research threads. All others are sequential after those two.

---

## Open Questions

1. What stem separation technology to use? (Demucs, Spleeter, MDX, custom? Any comparative benchmarks in the repo?)
2. Is there an existing spectral analysis pipeline in Entif that this would extend, or does this require a net-new component?
3. Has any work been done on voice fingerprinting for speaker ID? Any datasets or models referenced?
4. What is the current audio input capability in Entif? What format does audio take in the system today?
5. How does the emotional geometry model connect to the existing emotion model in Entif (if one exists)?
6. Is the "psychoacoustic divination" framing intentional as the project codename or just conversational metaphor?
7. Is there a target latency or real-time requirement for this, or is batch processing acceptable?