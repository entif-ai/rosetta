# D&P-001: Draft-and-Prune Integration with Rosetta Canonical Bundle Space

## Metadata

- **Type**: implementation
- **Status**: draft
- **Labels**: draft-and-prune, verification, text-core
- **Created**: 2026-06-04
- **Source doc**: `docs/chats/20260325 - Chat GPT - Holistic Entif AI Redesign (MR. TECH LEAD).md`
- **Confidence**: high

## Problem Statement

Draft-and-Prune (arXiv 2603.17233, zyni2001/draft-and-prune) provides a strong control loop for auto-formalization: draft multiple plans → generate formal programs → repair syntax → execute → prune contradictory/ambiguous → aggregate survivors. Pruning lifts AR-LSAT AF-only accuracy from ~45% to ~78%. However, D&P lacks equivalence-aware aggregation: it currently aggregates by answer-level majority voting over token strings, which fails when semantically identical formalizations use different surface wording.

Rosetta's canonical bundle/tile/tapestry infrastructure provides exactly the equivalence layer D&P explicitly identifies as missing.

## Proposed Implementation

1. **Adopt D&P harness** from zyni2001/draft-and-prune (provider configs for Azure OpenAI, OpenAI-compatible, Gemini, Anthropic; prompt templates; path analysis; pruning/ensemble simulation scripts)
2. **Replace D&P's token-string aggregation** with Rosetta CID-normalized semantic object comparison:
   - same concept URI
   - same frame URI
   - same role bindings
   - same contradiction/ambiguity state
   - same or equivalent CID-normalized semantic object
3. **Rosetta bundle as D&P candidate representation**: instead of raw NL plans, draft Rosetta bundles (core + halo + criteria scores + trace metadata)
4. **Pruning criteria extended**: existing solver-based well-definedness + Rosetta type/constraint/graph checks + pack compatibility + CID/tile consistency
5. **Do not collapse ambiguity early**: preserve multiple valid interpretations in bundle form; let downstream evaluation handle resolution

## Expected Outcome

D&P candidates aggregated by semantic equivalence rather than surface string similarity; dramatically better handling of paraphrased-but-identical formalizations.

## Dependencies

- Phase A (Rosetta registry, tile schema, bundle schema, codec layer)
- D&P-002 (equivalence-aware aggregation mechanism)

## Test Scenarios

1. Two semantically identical D&P candidates using different surface wording → same canonical bundle → aggregated correctly
2. Two candidates with different semantic content → different bundles → kept separate
3. D&P pruning still functions with Rosetta bundle candidates (syntax/type/constraint checks pass)
4. Ambiguous candidates preserved rather than collapsed to single answer

## Reference

"Rosetta gives both of them a canonical object space to operate on." — source doc, section on D&P + H-Neurons + Rosetta composition
"Equivalence-aware aggregation" listed as future work in D&P paper