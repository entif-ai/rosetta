## Priority

Tier 1.

## Parent

Child of COG-000.

Coordinates with #1118 pack conformance, #1114 schema catalog, and #1127 SkillPack/RecipePack triage work.

## Problem

The cognitive axiom list is currently doctrine in prose. That is too weak for Rosetta.

If “identify, label, describe,” “probe soft spots,” “humbly compel dubiousity,” “score and refine,” and “weight decisions matristically” remain prompt instructions, agents will obey them inconsistently, compaction will erase them, and lower-parameter agents will route around them whenever the context becomes tight or confusing.

Rosetta needs a first-class **Cognitive Doctrine Pack** that turns these axioms into named operators, schemas, examples, acceptance gates, and conformance tests.

## Goal

Create a pack root for Cognitive Doctrine that defines the first Rosetta-native reasoning operator vocabulary and minimum artifact schemas.

Working path:

```txt
packs/cognitive-doctrine/
  pack.json
  README.md
  CHANGELOG.md
  acceptance.md
  metadata.json
  vocab/
  schema/
  policy/
  examples/
  tests/
```

The pack should be machine-checkable under the repo's pack contract once #1118-style conformance gates are available.

## Scope

In scope:

1. Define the first cognitive operator vocabulary.
2. Define pack identity, namespace, category, version, compatibility range, and exports.
3. Define minimum artifact schemas for first-wave operator outputs.
4. Add examples for simple reasoning, architecture decision, hallucination recovery, and branch exploration.
5. Add acceptance tests that fail when mandatory reasoning artifacts are missing.
6. Document how this pack is governance-adjacent without redefining Guard or Rosetta core.

Recommended primary category:

- `GovernancePack`

Recommended cross-category exports:

- `VocabPack` concepts for operators and failure types
- `SchemaPack` schemas for operator artifacts
- `RecipePack` recipes for standard reasoning flows

## First-wave operator vocabulary

The initial vocabulary should include at least:

```txt
identify.label.describe
extrapolate.ideate.unpack
falsify.soft_spots
inquiry.dubiety
taxonomy.compartmentalize
ontology.weighted_graph
creativity.fuzz
novelty.germane_suss
unknowns.shadow_scan
visualize.concept
atomize.granular_quanta
metadata.classify_enrich
topography.multidimensional_chart
scorecard.define_score_refine
template.fragment_score_refine
branch.random_forest_trails
decision.matristic_weight
```

## Suggested schemas

First pack pass should scaffold or define:

- `cognitive-operator.schema.json`
- `operator-output.schema.json`
- `assumption-ledger.schema.json`
- `unknowns-packet.schema.json`
- `falsification-packet.schema.json`
- `decision-matrix.schema.json`
- `scorecard-definition.schema.json`
- `branch-sampler.schema.json`
- `strategy-episode.schema.json`

## Acceptance criteria

- [ ] `packs/cognitive-doctrine/pack.json` exists and declares stable pack identity.
- [ ] Required generic pack files exist: README, CHANGELOG, acceptance, metadata, examples, tests.
- [ ] First-wave cognitive operator vocabulary is defined in a machine-readable file.
- [ ] Operator entries include `operator_id`, purpose, inputs, outputs, applicability notes, contraindications, and evidence requirements.
- [ ] First-wave schemas exist or are scaffolded with clear TODO status.
- [ ] At least three examples demonstrate how a reasoning run emits doctrine artifacts.
- [ ] Acceptance gates specify what must pass, what must fail, merge blockers, and release blockers.
- [ ] Docs explain that the pack extends Rosetta via pack semantics and must not mutate core spine definitions.
- [ ] Pack entries are wired or reserved for the schema catalog once #1114 is available.

## Non-goals

- Do not implement the full router in this issue.
- Do not train specialist models here.
- Do not make the doctrine pack a runtime policy engine.
- Do not redefine core Rosetta observations, actions, tool calls, evaluations, or receipts.

## Validation

- Pack filesystem validation once available.
- JSON schema validation for pack manifests and operator vocabulary.
- Negative fixture where a claimed operator lacks an output schema or evidence requirement.
- `pnpm`/Nx affected tests for any package exports touched.
