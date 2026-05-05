## Priority

Tier 1.

## Parent

Child of COG-000. Depends on COG-001 vocabulary posture and COG-002 preflight artifacts.

## Problem

The system needs many reasoning lenses: philosophical razors, bias detectors, Socratic probes, decomposition methods, manipulation detectors, abductive rankers, inversion, extrapolation, and novelty filters.

If these are implemented ad hoc in prompts, they will drift, overlap, over-apply, and become untestable. If they are implemented as personas, the system will confuse operator behavior with roleplay identity.

Rosetta needs a **Cognitive Operator Registry** and `LensPack`/operator schema that describes each lens as a bounded transformation with known inputs, outputs, applicability, contraindications, and allowed use.

## Goal

Define the registry and schema surface for cognitive operators/lenses.

Operators should be callable by router/planner layers, auditable through receipts, and evaluable through fixtures.

## Scope

In scope:

1. Define `CognitiveOperator` registry entry shape.
2. Define operator families and namespaces.
3. Define `applicability_conditions` and `contraindications` fields.
4. Define `allowed_use` and `prohibited_use` fields.
5. Define per-operator evidence requirements and output schemas.
6. Add first operator fixtures for razors, bias analysis, Socratic inquiry, decomposition, manipulation detection, and synthesis.
7. Add negative fixtures where an operator is misapplied.

## First-wave operator families

```txt
razors/
  occam
  hanlon
  hitchens
  hume
  popper
  sagan

biases/
  confirmation
  availability
  anchoring
  motivated_reasoning
  fundamental_attribution_error

actionable_inquiry/
  socratic_assumptions
  socratic_counterexample
  socratic_definition
  socratic_consequence

decomposition/
  atomic_claims
  causal_chain
  dependency_graph
  constraint_split

manipulation/
  gaslighting
  coercive_framing
  motte_bailey
  false_dilemma
  loaded_question
  strategic_ambiguity

synthesis/
  abductive_ranker
  second_order_effects
  inversion
  steelman
  red_team
```

## Suggested operator entry shape

```ts
CognitiveOperator {
  operatorId: string;
  family: string;
  version: string;
  summary: string;
  inputSchemaRef: string;
  outputSchemaRef: string;
  conceptSignatureHints: string[];
  applicabilityConditions: string[];
  contraindications: string[];
  requiredEvidenceClasses: string[];
  allowedUse: string[];
  prohibitedUse: string[];
  knownFailureModes: string[];
  evalFixtureRefs: string[];
  receiptType?: string;
}
```

## Acceptance criteria

- [ ] Cognitive Operator Registry shape exists.
- [ ] Operator family namespaces are documented.
- [ ] At least 12 first-wave operators are registered as fixtures or scaffolded entries.
- [ ] Each registered operator has applicability, contraindication, required evidence, allowed use, prohibited use, and known failure mode fields.
- [ ] At least one positive and one negative fixture exist for each major operator family.
- [ ] Docs explicitly prohibit treating operator lenses as roleplay personas.
- [ ] Registry entries can be consumed by COG-004 router work.
- [ ] Registry entries can be referenced by COG-005 efficacy ledger work.

## Non-goals

- Do not implement all operators as fine-tuned models.
- Do not implement every philosophical razor in first release.
- Do not make any manipulation detector authoritative for punitive or compliance decisions without corroborating evidence.
- Do not create graph edges as truth claims from lens outputs alone.

## Validation

- Registry schema tests.
- Fixture tests for operator metadata completeness.
- Negative test for an operator entry lacking contraindications or prohibited-use notes.
