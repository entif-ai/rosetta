## Priority

Tier 3 research/build bridge.

## Parent

Child of COG-000. Depends on COG-003 operator registry and COG-010 benchmark harness before any fine-tuning is accepted as useful.

## Problem

The proposed long-term architecture may use smaller specialist models for narrow cognitive operators: Occam lens, confirmation-bias detector, Socratic assumption probe, manipulation detector, decomposition operator, inversion pass, and so on.

However, fine-tuning before tasks and evals are stable will produce expensive little goblins with uncertain value.

Rosetta needs a lane that defines when a cognitive operator is ready for specialist-model treatment, how training data is generated, how outputs are constrained, and how models are evaluated against prompted, deterministic, and hybrid baselines.

## Goal

Define the training/evaluation contract for specialist operator models without requiring immediate fine-tuning.

## Scope

In scope:

1. Define `SpecialistOperatorModelCandidate` criteria.
2. Define dataset record shape for operator input/output pairs.
3. Define eval harness requirements before training is accepted.
4. Define baseline comparisons:
   - deterministic rule/check
   - prompted small model
   - prompted frontier model
   - LoRA/adapted small model
   - distilled specialist model
5. Define output schema compliance requirements.
6. Define safety boundaries for operators that detect manipulation, motive, or bias.
7. Add first-wave candidate list but mark all training deferred until fixtures exist.

## Promotion ladder

Specialist model work should follow this order:

1. Prompted operator.
2. Eval dataset.
3. Deterministic/rule baseline where possible.
4. Small classifier/scorer.
5. LoRA/adapters.
6. Distilled specialist model.
7. Deterministic compiled procedure if the operator becomes rule-like.

## Acceptance criteria

- [ ] Specialist operator candidate schema exists.
- [ ] Dataset record shape is defined.
- [ ] Required baseline comparisons are documented.
- [ ] Output schema compliance is mandatory.
- [ ] Evaluation requires quality, calibration, cost, and replayability metrics.
- [ ] Safety caveats exist for manipulation/bias/motive detectors.
- [ ] Docs state that fine-tuning is not first-line unless operator tasks are stable and benchmarked.
- [ ] Candidate list includes razors, bias probes, Socratic inquiry, decomposition, manipulation detection, and synthesis.

## Non-goals

- Do not fine-tune models in this issue.
- Do not create persona roleplay models.
- Do not use specialist outputs as sole authority for punitive, safety, or compliance decisions.
- Do not skip schema/eval work.

## Validation

- Schema tests for dataset records and candidate entries.
- Negative tests where a specialist candidate lacks evals, output schema, or safety boundaries.
