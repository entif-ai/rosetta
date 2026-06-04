# Pasigraphy-001: Pasigraphy as Semantic OS Before Native Alphabet — Four-Phase Bootstrap Path

## Metadata

- **Type**: documentation
- **Status**: draft
- **Labels**: bootstrap, pasigraphy, text-core
- **Created**: 2026-06-04
- **Source doc**: `docs/chats/20260325 - Chat GPT - Holistic Entif AI Redesign (MR. TECH LEAD).md`
- **Confidence**: high

## Problem Statement

The temptation is to replace the base model's tokenizer with pasigraphic vocabulary on day one. This is the wrong target. Rosetta tiles should become the model's semantic operating system before they become its native alphabet. The four-phase path exists to make this transition tractable without training a foundation model from scratch.

## Four-Phase Path

### Phase A: Externalize Meaning First
Build the Rosetta registry, tile schema, bundle schema, and codec layer before attempting any model integration.
- Concept/frame registry
- Bundle with `core` + ranked `halo`
- Disambiguator
- Aligner
- Codec endpoints
- Content-addressed package validation

### Phase B: Align Host Model to Rosetta Space
Wrap an open model so it can ingest text/image/audio and emit Rosetta bundles without changing most of the base model weights.
- Compute orthogonal Procrustes map from host embedding space into Rosetta prototype space
- Use anchor pairs from high-confidence matches
- "Alignment does not require retraining the host"
- After alignment: host model wrapped by Rosetta bundle codec

### Phase C: Teach Model Rosetta Bundle I/O
Add lightweight adaptation so the model gets better at consuming and producing Rosetta structures.
- Small set of trainable structural tokens for bundle delimiters / role markers / glyph classes
- Projector heads mapping hidden states to Rosetta prototype space
- LoRA or QLoRA on selected attention/output layers
- HDS tokens first represent Rosetta bundle syntax and control markers (NOT full pasigraphy)
- H-Neuron risk as auxiliary training signal

### Phase D: Continued Pretraining on Mixed Corpora
Only after Phase C works, consider deeper continued pretraining.
- Natural language
- Rosetta bundles
- HDS structural tokens
- Pasigraphic realizations
- Only after bundle I/O competence is proven

## Key Principle

**Rosetta tiles should become the model's semantic operating system before they become its native alphabet.**

This means:
- Phase A/B: external substrate works without touching most base model weights
- Phase C: model learns to read/write bundles with adapters
- Phase D: future models trained more deeply on HDS/pasigraphic corpora

## What This Is NOT

Not "train on a bunch of words and pray." Not "invent a universal language from scratch." This is:
- mint a disciplined primitive basis
- expand compositionally using a mature distinction-ordering system (New Ithkuil curriculum)
- consult anchor resources (WordNet/VerbAtlas/SyntagNet) when context gets slippery
- use Rosetta as canonical substrate

## Expected Outcome

Rosetta tiles operational as semantic OS; model can read/write bundles; full pasigraphic fluency deferred until infrastructure proves out.

## Dependencies

- Phase A must complete before Phase B
- Phase B must show stable output before Phase C
- Phase C must validate before Phase D

## Reference

"Rosetta tiles should become the model's semantic operating system before they become its native alphabet." — source doc