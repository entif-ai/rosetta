# RSK-003: Rosetta Integration — No Implementation Path for Codec-and-Alignment

## Metadata
- **Issue:** RSK-003
- **Priority:** P1
- **Confidence:** high
- **Source:** docs/intake/docs-intelligence/2026-06-05-email-driven-security-defenses.md

## Boundary
Artifact is issue-draft output for planning. Not final specification.

## Problem

The conversation proposes codec-and-alignment (prototype embeddings + orthogonal Procrustes) as the first step toward a Rosetta-native model — rather than scratch pretraining. This is the right architectural direction given the redesign notes. However, the conversation does not produce:
1. A concrete spec for the prototype bank of Rosetta concept/frame embeddings
2. Choice of base model (open-weights spec)
3. The Procrustes alignment training loop mechanics
4. The bundle codec interface (input/output contracts, when to call codec vs paraphrase)
5. The disambiguator/graph prior layer specification

Without these, the Rosetta-native model training cannot begin.

## Impact

This is the highest-value ungrounded element in the conversation. The entire Rosetta-as-semantic-operating-system story depends on the host model being able to consume and emit Rosetta structures. Without an implementation path for the codec-and-alignment layer, the vision remains conceptual.

## Suggested Approach

1. Define prototype bank: encode all concept/frame tiles as dense vectors (which embedding model? what dimensionality?)
2. Select base model: preference for open-weights (Llama, Mistral, Qwen) with sufficient context window for tapestry bundles
3. Build projection head: linear or MLP layer mapping base model hidden states to Rosetta prototype space
4. Procrustes alignment: supervised alignment of projection output to prototype bank using canonical Rosetta corpus pairs
5. Bundle codec: define Rosetta bundle syntax (structural tokens, delimiters), implement encoder/decoder
6. Disambiguator: given competing concept/frame candidates, use graph priors (ontology fit, role fit, CID consistency) to rank and select

## Related
- F8 (Rosetta-native model training strategy)
- rrp.bundles pack
- truthlint.claims pack (provides training signal)
- D&P pipeline (data refinery for bundle corpora)