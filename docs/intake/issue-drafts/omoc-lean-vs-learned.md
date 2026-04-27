# OMOC Lean vs. Learned: First Implementation Routing Approach

## Source Document
- RFC: 20260412 - Rosetta - Ontological Mixture of Concepts (OMOC) - Swarm Gnosis Protocol Spec
- Extraction: 2026-04-24-omoc-swarm-gnosis-protocol-spec.md

## Context

OMOC is the routing doctrine that assembles task-specific mixtures of concepts rather than static expert identities. The system decomposes a task into concept tranches (Foundational / Domain / Intersection / Problem / Execution) and compiles a concept simplex — a weighted conceptual mixture that determines which delegates, tools, and model substrates are invoked.

Section 18, Question 1 of the source RFC surfaces the core unresolved question:

> "How much of OMOC routing should be deterministic, and how much learned?"

This issue draft formalizes that question as an architectural decision point that must be resolved before Tack 3 (OMOC routing prototype) can begin.

## The Two Positions

### Position A: Lean / Deterministic-First

**Thesis:** The first OMOC implementation should be rule-based deterministic routing over the concept tranche schema. The concept simplex is compiled from explicit feature extraction against declared facet taxonomies; no trained weights involved.

**Arguments for:**
- Deterministic routing is auditable, explainable, and reproducible — essential for a system that is itself built on receipts and provenance
- Avoids cold-start training data problem: no concept-tranche outcome corpus exists yet
- Faster to iterate: rule changes are code changes, not data/weight pipelines
- Satisfies the acceptance gate for Tack 3: "system chooses different conceptual delegate sets for different tasks without manual persona curation" — achievable with rule-based feature extraction
- Simpler to debug when routing decisions go wrong
- Aligns with Rosetta's emphasis on explicit semantics over latent manifold hoping

**Arguments against:**
- Will not capture subtle contextual cues that a learned system might exploit
- Rigid boundary between tranche categories may miss genuine crossover concepts
- Does not improve from experience without manual rule updates

### Position B: Learned / Scoring-Network

**Thesis:** The first OMOC implementation should include a learned scoring component that predicts tranche weights and delegate selection based on outcome data.

**Arguments for:**
- Can capture subtle concept interactions that rule-based systems miss
- Improves over time as outcome data accumulates
- Better handles the "intersection tranche" where domain boundaries genuinely blur
- More similar to how human experts actually route complex problems

**Arguments against:**
- Requires training data that does not yet exist
- Interpretability cost: harder to explain why a particular delegate set was selected
- Adds infrastructure (training pipeline, model registry, weight management) that is out of scope for early tacks
- Not auditable in the same way receipts require

## Decision Criteria

The following should be evaluated before the decision is made:

1. **Tack 3 acceptance gate definition:** Is the gate satisfied by deterministic routing? If yes, lean/deterministic is sufficient. If the gate requires demonstrated quality improvement from learning, learned may be necessary.
2. **Outcome data availability:** Is there an existing corpus of task→delegate→outcome data sufficient to train a scoring model? If not, learned approach requires a data collection phase.
3. **Interpretability requirements:** Do Guard and receipts require that routing decisions be traceable to explicit rules? If yes, lean approach is more compatible.
4. **Iteration speed:** Is a fast Tack 3 demo more valuable than a more sophisticated one that takes longer to stabilize?
5. **Future migration cost:** How costly is it to evolve from deterministic to learned if rules prove insufficient? Is the schema designed to support future weight attachment?

## Recommended Action

Before Tack 3 begins, define the acceptance gate precisely. If the gate can be satisfied by deterministic routing demonstrating that the system "chooses different conceptual delegate sets for different tasks without manual persona curation," then:

1. Implement OMOC as deterministic rule-based routing for Tack 3
2. Instrument all routing decisions with enough metadata to build an outcome corpus
3. Plan a learned scoring layer as a Tack 5+ refinement once outcome data exists
4. Design the delegate schema to accommodate future weight fields without schema migration

If the gate requires demonstrated quality improvement (not just diversity of selection), the decision is deferred pending data.

## Labels
- `omoc`
- `build-order`
- `architecture`
- `research`

## Status
Open — awaiting architectural decision before Tack 3 kickoff.
