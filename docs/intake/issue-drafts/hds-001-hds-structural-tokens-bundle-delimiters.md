# HDS-001: High-Density Structural Tokens as Rosetta Bundle Delimiters and Role Markers (Phase C)

## Metadata

- **Type**: implementation
- **Status**: draft
- **Labels**: bootstrap, adapters, structural-tokens, pasigraphy
- **Created**: 2026-06-04
- **Source doc**: `docs/chats/20260325 - Chat GPT - Holistic Entif AI Redesign (MR. TECH LEAD).md`
- **Confidence**: high
- **Depends on**: Pasigraphy-001

## Problem Statement

In Phase C, the model needs to learn to consume and emit Rosetta structures. HDS structural tokens are the adapter layer that makes this possible: they represent Rosetta bundle syntax and control markers (delimiters, role markers, glyph classes), NOT full pasigraphic vocabulary. This is a controlled, tractable first step toward Rosetta-native model behavior.

## Design

### HDS Token Categories

1. **Bundle delimiters**: marks bundle boundaries (start/end of core, halo section, criteria block)
2. **Role markers**: marks which role a span plays (evidence, citation, uncertainty, constraint, modifier)
3. **Glyph classes**: marks semantic category of a tile (entity, action, event, time, causality, identity, request, permission, obligation, uncertainty, ambiguity, evidence)
4. **Control markers**: marks special states (abstention, ambiguity preservation, human-review flag, over-compliance risk flag)

### NOT in Scope for Phase C

- Full pasigraphic vocabulary (6000+ Ithkuil roots)
- Native tiling of full semantic concepts
- Tile minting through model generation

### Training Approach

- Use `trainable_token_indices` from PEFT to train ONLY the new structural token embeddings (not full embedding matrix)
- Train alongside LoRA adapters on projection heads
- Bundle I/O competence as primary training objective
- H-Neuron risk signal as auxiliary training signal (penalize high-risk unsupported emissions, reward abstention)

## Implementation Notes

- HDS tokens first represent Rosetta bundle syntax and control markers
- Only after bundle I/O competence proven should expansion to full pasigraphic vocabulary be considered
- PEFT `trainable_token_indices` supports training specific token embeddings alongside LoRA

## Expected Outcome

Model can read and write Rosetta bundle syntax with structural token markers; phase C training establishes bundle I/O competence.

## Test Scenarios

1. Model correctly delimits bundle core vs halo sections
2. Model correctly marks role of spans (evidence vs uncertainty vs constraint)
3. Model correctly flags ambiguous candidates for human review
4. H-Neuron risk penalizes unsupported high-risk emissions
5. Abstention rewarded when all candidates fail validation

## Reference

"a small set of trainable structural tokens for bundle delimiters / role markers / glyph classes" — source doc
"Phase C: train light adapters so the model gets better at consuming and producing those structures" — source doc