# HNeuro-001: H-Neuron Signals as Path-Risk Prior in Draft-and-Prune

## Metadata

- **Type**: implementation
- **Status**: draft
- **Labels**: safety, self-improvement, risk, draft-and-prune
- **Created**: 2026-06-04
- **Source doc**: `docs/chats/20260325 - Chat GPT - Holistic Entif AI Redesign (MR. TECH LEAD).md`
- **Confidence**: high
- **Depends on**: D&P-001

## Problem Statement

H-Neurons (arXiv 2512.01797v2) shows that <0.1% of FFN neurons predict hallucination via over-compliance tendency (accepting false premises, misleading contexts, skeptical pressure). This circuit originates in pretraining and is preserved through instruction tuning.

D&P asks "Is this candidate well-defined?" but does not ask "Did the model produce this in a risky, compliance-driven way?" H-Neuron signals provide that internal risk dimension.

## Proposed Implementation

1. **Instrument base model with H-Neuron activation monitoring**: identify the sparse FFN neurons predictive of hallucination; during D&P draft generation, track activation levels on those neurons per candidate
2. **Risk scoring per candidate**: combine H-Neuron activation levels with D&P's existing well-definedness checks; penalize candidates that are (a) well-defined but (b) generated under high over-compliance signal
3. **Pruning integration**: candidates with both high over-compliance signal AND low semantic support should be pruned aggressively; candidates with high risk but strong evidence may be flagged for human review
4. **Training signal (Phase C)**: penalize bundle emissions that are both unsupported AND high-risk; reward abstention/ambiguity preservation when all candidates fail validation
5. **Progressive disclosure**: high-risk candidates flagged rather than silently discarded; human reviewer sees both semantic quality and risk profile

Key design constraint: H-Neuron monitoring must not itself become an over-compliance trigger (model second-guessing the risk signal rather than the content).

## Expected Outcome

D&P candidates scored on both semantic quality AND over-compliance risk; hallucination-prone generations caught before they become bundle emissions.

## Dependencies

- D&P-001 (D&P harness with Rosetta bundle candidates)
- Phase B/C (model alignment and H-Neuron instrumentation)

## Test Scenarios

1. Candidate passes solver-based well-definedness but triggers high H-Neuron over-compliance signal → pruned or flagged
2. Ambiguous candidate with low over-compliance signal → preserved with uncertainty notation
3. High-risk candidate with strong evidence → flagged for human review, not silently discarded
4. Risk signal itself does not cause model to over-comply with risk-scoring mechanism

## Reference

"D&P asks: 'Is this candidate well-defined?' H-Neurons asks: 'Did the model likely produce this candidate in a risky, compliance-driven way?' Those are not the same question, and that is precisely why they combine well." — source doc