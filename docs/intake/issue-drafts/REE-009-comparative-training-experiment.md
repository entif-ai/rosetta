# Issue Draft: REE-009 — Comparative Training Experiment for Structured Initialization

**Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md`

## Summary

A concrete falsifiable experiment to validate whether structured initialization (Ithkuil-seeded + WordNet/BabelNet/VerbAtlas/SyntagNet anchoring) outperforms brute-force token-soup initialization.

## Experimental Design

**Control:** Ordinary token-soup initialization (current mainstream)

**Treatment:** Ithkuil-seeded lexeme geometry + WordNet/BabelNet/VerbAtlas/SyntagNet anchoring + curriculum following grammar and validated translated texts

**Constraints:** Same model architecture, same training budget, same computational resources

## Measurement Dimensions

1. **Sample efficiency** — training data to reach performance threshold
2. **WSD accuracy** — word sense disambiguation
3. **Frame-role binding** — correct semantic role assignment
4. **Compositional generalization** — novel combinations of known elements
5. **Memory footprint** — efficiency of representation storage
6. **Retrieval/compression behavior** — semantic organization of stored knowledge

## Expected Outcome

Treatment model learns cleaner semantic organization earlier, with less waste, giving a saner substrate for Rosetta-style structure later.

> "It would likely learn cleaner semantic organization earlier, with less waste, and give you a much saner substrate for Rosetta-style structure later."

## Confidence

HIGH — Concrete, falsifiable experiment design.

## Tags

- experiment
- validation
- structured-initialization
- ithkuil
- training-comparison