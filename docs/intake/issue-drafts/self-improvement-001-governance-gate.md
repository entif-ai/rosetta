# SelfImprovement-001: Self-Proposing Human-Reviewable Evidence-Bound Expansion Governance Gate

## Metadata

- **Type**: governance
- **Status**: draft
- **Labels**: self-improvement, governance, safety
- **Created**: 2026-06-04
- **Source doc**: `docs/chats/20260325 - Chat GPT - Holistic Entif AI Redesign (MR. TECH LEAD).md`
- **Confidence**: high

## Problem Statement

The goal of Entif self-enrichment is self-proposing, human-reviewable, evidence-bound expansion. Without a governance gate, "self-enrichment" can become "elegant factory for ontology drift wearing a fake mustache." The near-term target must not be full autonomous self-revision.

## Design

### Governance Gate Requirements

Every self-proposed expansion must pass through:

1. **Self-proposal**: Entif proposes candidate new tiles, edges, frames, pack mappings
2. **Evidence binding**: scored against anchor resources (WordNet/VerbAtlas/SyntagNet) and existing lattice coherence
3. **Ambiguity preservation**: competing interpretations kept as frames/conjectures, not collapsed early
4. **Human review**: only graduates new structure into canon through tests, governance, and receipts
5. **Receipts**: every durable mutation emits receipts; receipt absence = failure condition

### What Is NOT Permitted Without Gate

- Silent ontology drift
- Unilateral tile/frame adoption into canonical registry
- Collapsing ambiguity without evidence
- Self-revision that bypasses human review
- Pack propagation without conformance checks

### Integration with Draft-and-Prune

D&P provides the external verification loop:
- draft multiple candidates
- prune by well-definedness + Rosetta type/constraint/graph checks
- aggregate by equivalence-aware CID normalization
- flag for human review when ambiguity cannot be resolved

H-Neurons provides internal risk sensor:
- over-compliance tendency detection
- high-risk candidates flagged for human review

### Self-Evolution Bounded

Rosetta's self-evolution mechanism must remain bounded:
- proposals come with evidence, confidence, competing interpretations
- human reviewer has final say on canonization
- receipts track every mutation for audit trail
- regression prevention: existing tiles/frames cannot be silently superseded

## Expected Outcome

Entif can propose new semantic structure under constraints; human review gates canonization; ontology drift prevented; self-enrichment remains trustworthy.

## Test Scenarios

1. Entif proposes new tile → scored against anchor resources → passes evidence threshold → human review approves → canonized with receipt
2. Entif proposes ambiguous candidate → multiple interpretations preserved → human review resolves → canonized with both frames
3. Entif proposes tile that contradicts existing lattice → rejected at evidence check → logged → not silently adopted
4. Over-compliant candidate flagged by H-Neurons → human review required → not canonized without review

## Reference

"I think the right near-term target is not full autonomous self-revision. It is: self-proposing, human-reviewable, evidence-bound expansion" — source doc
"that can become a very elegant factory for ontology drift wearing a fake mustache" — source doc