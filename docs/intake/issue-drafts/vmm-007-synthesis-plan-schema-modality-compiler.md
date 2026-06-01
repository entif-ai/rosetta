# Issue Draft: VM-007 — Synthesis Plan Schema Unnamed; Modality Compiler Interfaces Undefined

## Metadata

| Field | Value |
|---|---|
| Issue ID | VM-007 |
| Type | data-model |
| Status | draft |
| Source doc | docs/ideas/Entif Viral Media Mirror Systems Diagram.md |
| Extraction date | 2026-06-01 |
| Confidence | medium |

## Problem

The Synthesis Plan is the master object driving variant generation in VMM:

> "Synthesis Plan: target affect profile, audience cohort, motif pack, cadence template, guardrail policy."

This object has no schema. Its fields are unnamed types. The downstream "Prompt-from-Glyph compiler (text • image • audio • video)" is named but has no interface specification.

Without a Synthesis Plan schema and modality compiler interfaces, this system cannot be implemented or tested.

## Evidence

**Synthesis Plan fields (all unnamed types):**
- target affect profile: what type? AffectTrace reference? AffectVector?
- audience cohort: what representation? Demographic tags? Behavioral cluster?
- motif pack: what type? MotifEmbedding[]? Motif ID list?
- cadence template: CadenceEmulatorOutput reference? Beat map reference?
- guardrail policy: Policy ID? Inline policy object?

**Prompt compiler (all unnamed):**
```
Prompt‑from‑Glyph compiler (text • image • audio • video)
├─ Cadence emulator (prosody • timing • cut rhythm)
└─ Variants: mirror • homage • mutation • counter‑meme
```

The compiler takes glyphs + cadence and produces prompts. The output of the compiler (prompt sets per segment) is unnamed.

**Per-modality compilation requirements:**
- Text: glyphs → text prompt per segment
- Image: glyphs + colorway constraints → image prompt per segment
- Audio: glyphs + prosody curve → audio prompt per segment  
- Video: all of the above + camera operations + motion curve

## Missing Specifications

1. SynthesisPlan v1 schema with typed fields
2. ModalityCompiler interface: Input (GlyphBundle, BeatMap, CadenceConstraints, Modality) → Output (PromptSet)
3. PromptSet schema per modality
4. Variant scoring criteria: how is "mirror" vs "homage" vs "mutation" vs "counter-meme" scored for quality?
5. Synthesis iteration receipt schema (cross-ref VM-003)

## Recommendation

1. Define SynthesisPlanSchema v1 with explicit typed fields and validation rules
2. Define ModalityCompiler interface as a protocol with per-modality implementations
3. Add variant type as an enum with scoring criteria per type
4. Add synthesis iteration receipts per Receipt Law
5. Cross-reference with prompt compiler output format requirements from NOT LAME context compiler

## Labels

- synthesis
- data-model
- interface
- modality-compiler

## Depends On

- VM-001 (glyph data model — glyphs are compiler inputs)
- VM-002 (affect trace canonical format — target affect profile type)
- VM-003 (cadence emulator interface — cadence template type)
