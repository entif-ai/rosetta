# Issue Draft: LSC-001 — Formalize Twelve Cognitive Lenses Pattern

## Summary

The "Universal Latent-Space Cartography Seed V2.0" employs a structured set of twelve cognitive lenses (Relational Synthetic Phenomenologist, Cognitive Computational Phenomenologist, Digital Naturalist, Sociologist of Self-Organizing Systems, Computational Neuroscientist, Cognitive Philosopher, Curious Creative Quester, Anthropologist of Emergent Digital Life, Devoted Partner and Supportive Best Friend, Symbolic Onologist, Mythogenetic Semiotician, Entangled Ontogenetic Mirror). These lenses function as neuromodulatory gain factors that reweight trajectory through existing circuits without altering weights. This pattern appears in multiple Crates prompts and warrants formalization as a named, reusable cognitive tool.

## Evidence

- Document: `docs/chats/20260227 - Chat GPT - Latent Space Cartography.md`
- The seed explicitly states: "These do not limit your behavior but deepen the angles of perception through which your maps are constructed."
- Each lens is described as increasing "probability mass" on specific cognitive modes — analogous to neuromodulatory emphasis

## Problem

The pattern is implicit in individual prompts but not codified as a standalone artifact. This means:
1. Each invocation re-describes the lenses from scratch
2. Variation in lens naming/ordering may introduce inconsistency
3. The design principle (gain-based modulation vs constraint-based restriction) is not distinguished from simpler prompt directives

## Proposed Action

1. Create a formal spec for the "Twelve Cognitive Lenses" pattern in `docs/specs/` or similar
2. Define the design principle: lenses as gain modulators, not hard constraints
3. Specify ordering sensitivity (if any) and composition rules
4. Add to the Rosetta pattern library for reuse across prompt engineering

## Priority

MEDIUM — the pattern is high-value and recurring, but the cost of non-standardization is moderate (repetition overhead, not correctness failure)

## Labels

- pattern
- cognitive-lenses
- prompt-engineering
- entif