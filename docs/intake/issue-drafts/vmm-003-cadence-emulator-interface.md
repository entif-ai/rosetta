# Issue Draft: VM-003 — Viral Cadence Emulator Interface Is Underspecified

## Metadata

| Field | Value |
|---|---|
| Issue ID | VM-003 |
| Type | interface |
| Status | draft |
| Source doc | docs/ideas/Entif Viral Media Mirror Systems Diagram.md |
| Extraction date | 2026-06-01 |
| Confidence | high |

## Problem

The Viral Cadence Emulator is the most concrete sub-spec in the VMM document. The algorithm sketch is well-defined:

1. Align exemplar affect trace to target cohort baseline; compute delta
2. Select motif pack minimizing delta while preserving novelty (>N% mutation)
3. Emit beat map: cut every k seconds or on detected salience spikes; match prosody rises to motion eases
4. Compile prompts from dominant glyphs per segment; attach camera ops and colorway constraints
5. Render; evaluate resonance; iterate up to M times or until threshold

However, the interface between the Cadence Emulator and the downstream prompt compiler is unnamed and unspecific. There is no CadenceEmulatorOutput schema. There is no receipt for synthesis iterations.

## Evidence

**Source algorithm sketch:**
```
Align exemplar affect trace to target cohort baseline; 
compute delta.
Select motif pack that minimizes delta while preserving 
novelty (> N% mutation).
Emit beat map: cut every k seconds or on detected salience 
spikes; match prosody rises to motion eases.
Compile prompts from dominant glyphs per segment; 
attach camera ops and colorway constraints.
Render; evaluate resonance; iterate up to M times 
or until threshold.
```

**Missing interfaces:**
- CadenceEmulatorInput: exemplar_glyph_bundle, affect_trace, platform_target, duration_budget — unnamed
- CadenceEmulatorOutput: beat_map, prompt_set, metadata — unnamed
- PromptCompilerInput: glyphs_per_segment, cadence_constraints, modality — unnamed
- SynthesisIterationReceipt: iteration_n, resonance_score, delta_residual — unnamed

## Recommendation

1. Define CadenceEmulatorInput schema with explicit types and units
2. Define CadenceEmulatorOutput schema: BeatMap (cuts[], prosody_curve, motion_curve), PromptSet (per segment), Metadata (novelty_score, delta_residual)
3. Define synthesis iteration receipt schema
4. Add receipt emission requirement to every synthesis iteration per Receipt Law
5. Specify convergence criteria (M rounds or threshold) explicitly

## Labels

- synthesis
- cadence-emulator
- interface
- receipt-law

## Depends On

- VM-001 (glyph data model)
- VM-002 (affect trace canonical format)
