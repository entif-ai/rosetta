# REE-005: Multi-Dimensional Semantic Representation for Rosetta Concept Space

## Issue Metadata

- **Type:** architecture / representation
- **Status:** draft
- **Created:** 2026-06-04
- **Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md`

## Summary

Rosetta's semantic layer needs multiple overlapping coordinate systems (not a single taxonomy) to represent meaning. A single clean ontology is insufficient. No architectural design exists for how these multiple semantic dimensions interact with Rosetta's concept registry, graph priors, and concept bundle system.

## Background

From the source document: "Semantic usefulness is not just: synonymy, ontology membership, lexical relation, or taxonomic adjacency. A good model also needs to represent: contextual usage patterns, entailment, discourse relations, analogical structure."

This means a concept like "bank" exists simultaneously in multiple geometric spaces:
- **Synonymy space:** "bank" near "shore", "border", "financial institution"
- **Taxonomic space:** bank is a type of financial-organization, which is a type of organization
- **Contextual usage space:** "bank" in "river bank" vs "investment bank" — same surface form, different geometric region
- **Entailment space:** "deposit" → "bank" (implication relations)
- **Discourse space:** "bank" in financial discourse clusters with "loan", "interest", "mortgage"
- **Analogical space:** "bank" as reservoir (water bank, blood bank, memory bank) — conceptual metaphor structure

## Rosetta Architecture Implication

If Rosetta's concept registry only supports one canonical representation per concept ID, this creates problems:
1. Polysemy: "bank" has multiple meanings — which geometric representation is canonical?
2. Context-dependence: meaning is determined by surrounding context, not intrinsic to the concept
3. Cross-domain analogy: analogical reasoning requires traversing multiple coordinate systems simultaneously

## Proposed Architecture

A multi-coordinate concept representation:

```yaml
concept: bank
  canonical_id: rosetta:concept:bank
  coordinates:
    synonymy:
      vector_space: wordnet-synonymy-v1
      position: [0.23, -0.71, ...]
    taxonomic:
      vector_space: rosetta-taxonomy-v1
      position: [0.87, 0.12, ...]
    contextual_usage:
      vector_space: context-activation-v1
      distributions:
        financial: 0.72
        river: 0.21
        other: 0.07
    discourse:
      vector_space: discourse-role-v1
      position: [0.45, -0.33, ...]
    analogical:
      vector_space: metaphor-geometry-v1
      position: [0.61, 0.89, ...]
      analogical_targets:
        - reservoir
        - repository
        - depository
  graph_edges:
    entailment: [deposit, withdraw, transfer]
    taxonomic_parent: financial-organization
    discourse_partner: [loan, interest, credit]
```

## Open Questions

1. How many coordinate systems are needed? Is there a minimum viable set?
2. How are cross-coordinate queries routed? (e.g., "find all concepts that are near 'bank' in synonymy AND discourse spaces")
3. How do you update one coordinate system without invalidating others?
4. What is the storage cost for multi-coordinate concepts vs single-coordinate?
5. How does this interact with the existing concept bundle system (receipt bundles, tapestry profiles)?

## Dependencies

- REE-001 (structured init experiment) — multi-dim representation is needed to construct structured priors
- REE-002 (tokenization quality blocker) — concept-to-token mapping must be resolved
- KG-009 / KG-010 in the main knowledge graph for concept registry design

## Labels

- semantic-layer
- representation-architecture
- concept-registry
- multi-dimensional-semantics
- graph-priors