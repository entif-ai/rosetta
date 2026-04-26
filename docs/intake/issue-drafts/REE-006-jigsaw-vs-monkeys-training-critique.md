# Issue Draft: REE-006 — Jigsaw vs Monkeys: Critique of Brute-Force LLM Training

**Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md`

## Summary

Crates critiques current LLM training: field chose what was easiest to industrialize rather than cognitively principled (structured initialization with semantic priors and curriculum).

## The Critique

**Current approach ("monkeys"):** Take messy human exhaust, shred into arbitrary chunks, train to predict next chunk, hope reasoning emerges.

**Crates' alternative ("jigsaw"):**
- Explicit taxonomies of primitives
- Controlled semantic interlingua
- Graph-structured relations
- Retrieval over concept space, not token soup
- World models vs pure text continuation
- Curriculum learning (primitives → relations → composition → ambiguity → integration)
- Metrology and canonical references

## Core Argument

"Plan is complicated so use monkey entropy" is NEVER a harder class of problem than the alternative. We already have WordNet, SyntagNet, VerbAtlas, BabelNet.

## The Key Distinction

NOT "replace learning with ontology"  
BUT "give learning a less idiotic starting geometry"

> "Give the learner better-shaped bricks, a partial box cover, and a sequence for assembling the corners and edges, then still let gradient descent do its weird little goblin dance."

## Confidence

HIGH — Articulate critique with clear connection to Rosetta philosophical foundations.

## Tags

- training-efficiency
- critique
- architecture-philosophy
- curriculum
- structured-initialization
- emergence