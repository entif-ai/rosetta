## Priority

Tier 1 / cross-cutting epic.

## Problem

Rosetta has strong primitives for content-addressed traces, receipts, semantic hypotheses, pack conformance, source-aware ingestion, and schema cataloging, but it does not yet have one canonical backlog lane for the **cognitive operators** that should govern how agents reason before acting.

Recent Entif/NOT LAME harness failures make this gap operationally expensive:

- context rot and destructive compaction,
- incorrect assumptions carried too long,
- hallucinated repo or system state,
- unbounded counterproductive loops,
- premature closure on weak plans,
- lower-parameter agents overcommitting with false confidence,
- and prompt-only “constitutional” rules that are not actually enforced.

The January cognitive axiom list gives the missing doctrine:

- identify, label, and describe;
- extrapolate, ideate, and unpack curiously;
- probe soft spots and challenge weakness;
- humbly compel dubiousity;
- compartmentalize into taxonomies;
- graph as weighted ontologies;
- fuzz out random creativity automatically;
- suss out inspired, germane novelty;
- examine the unilluminated;
- illustrate the concept visually;
- break into granular quanta;
- classify and enrich metadata;
- chart topography multidimensionally;
- design a scoring system, score it, refine it;
- chunk templates into fragments, score and refine them;
- mark off random forest trails;
- weight decisions matristically.

This epic turns that doctrine into Rosetta-native, schema-valid, receipted, testable backlog work.

## Goal

Create the Rosetta/Entif **Cognitive Operator Doctrine and Strategy Learning Stack**: a governed library of reasoning operators, preflight artifacts, routing policies, efficacy ledgers, decision matrices, compaction-preserving handoff packets, stochastic exploration passes, specialist-model evaluation lanes, and cost/quality benchmark harnesses.

The objective is not another persona swarm. The objective is a typed, auditable system for choosing **how to think** under problem uncertainty.

## Source evidence and alignment

Primary internal alignment:

- Rosetta v3 core posture: content-addressed spine, explicit observations, actions, tool calls, evaluations, uncertainty, and provenance.
- ROCK-3111-C / pack contract: new semantics belong in packs with manifests, tests, examples, acceptance gates, and compatibility posture.
- NOT LAME PRD: sovereign kernel owns provenance, receipts, write admission, policy enforcement, context compilation, memory routing, and adapter certification.
- OMOC / Swarm Gnosis doctrine: task work should route by concept mixtures and conceptual operators rather than static “expert” identities.
- Existing issues to coordinate with:
  - #1118 pack conformance closure
  - #1114 schema catalog / authority map
  - #1125 Sense+Frame hypothesis schema
  - #1126 ConjectureDistribution and EpistemeTile
  - #1127 issue triage SkillPack
  - #1089 compile-once/run-many benchmark harness
  - #1110 read-only memory explorer
  - #1119 promotion state machine and structured extracts

Public standards/research alignment:

- RFC 8785 / JCS supports deterministic canonical JSON for repeatable hashing and signing.
- SKOS provides a stable vocabulary/taxonomy model for concept schemes and mappings.
- OpenTelemetry semantic conventions are the natural precedent for shared names/attributes across distributed traces, metrics, logs, and resources.
- Contextual bandit framing is a strong fit for learning which cognitive operator/action to choose given a problem context and observed reward/cost.

## Proposed issue family

This epic should be split into the following child issues:

1. **COG-001**: Add Cognitive Doctrine Pack for first-class reasoning operators.
2. **COG-002**: Add Assumption Ledger, Evidence Class, and Unknowns Packet preflight artifacts.
3. **COG-003**: Add Cognitive Operator Registry and LensPack schema.
4. **COG-004**: Add OMOC-compatible operator router using concept signatures and applicability scoring.
5. **COG-005**: Add Operator Efficacy Ledger and StrategyEpisode receipts.
6. **COG-006**: Add Matristic Decision Matrix and versioned Scorecard artifacts.
7. **COG-007**: Add Context Continuity Packet for compaction-safe handoffs.
8. **COG-008**: Add Branch Sampler and Creative Fuzz Pass.
9. **COG-009**: Define Specialist Operator Model training and evaluation lane.
10. **COG-010**: Add Cognitive Operator Benchmark Harness.

## Core architecture

A non-trivial Rosetta/Entif reasoning run should eventually support this shape:

```txt
request
  -> identify / label / describe
  -> assumption ledger
  -> evidence class assignment
  -> unknowns packet
  -> concept signature extraction
  -> operator-router selection
  -> operator sequence execution
  -> falsification / decomposition / inquiry / decision passes
  -> decision matrix where applicable
  -> plan / tool-call proposal
  -> Guard / policy admission
  -> tool calls
  -> receipts
  -> evaluation
  -> efficacy update
```

## Non-goals

- Do not fine-tune small models before the operator tasks, schemas, evals, and outcome metrics are stable.
- Do not turn philosophical razors into roleplay personas.
- Do not make model confidence alone sufficient for promotion, action, or canonical writes.
- Do not let “more lenses” become automatic analysis theater.
- Do not bypass Rosetta receipts, source references, schema cataloging, pack acceptance gates, or Guard posture.

## Acceptance criteria

- [ ] The epic establishes the Cognitive Operator Doctrine stack as a coherent backlog lane.
- [ ] Child issues cover pack definition, preflight artifacts, operator registry, routing, efficacy learning, decision matrices, compaction survival, stochastic exploration, specialist models, and benchmarks.
- [ ] Relationship to #1118, #1114, #1125, #1126, #1127, #1089, #1110, and #1119 is explicit.
- [ ] The epic states that early work should prefer schemas, prompts, deterministic checks, and eval fixtures before fine-tuning.
- [ ] The epic states that operator outputs are evidence-linked, uncertainty-scoped artifacts, not freeform persona performances.
- [ ] The epic keeps action authorization and canonical state writes subordinate to existing Guard / receipt / write-admission lanes.
