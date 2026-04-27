# Semantic Audio Cognition: Instrument and Stem Isolation

Issue draft id: `semantic-audio-stem-isolation`
Priority: `P2`
Effort: `M`
Labels: `audio`, `decomposition`, `entif-ears`, `research-spike`

## Problem

The Semantic Audio Cognition source says composite audio must be separated into instruments and stems before each source can be analyzed independently.

## Scope

- Compare stem separation tools and model families.
- Define an evaluation set for vocal/instrument separation quality.
- Decide whether this belongs in a batch lane or a future real-time lane.

## Source Evidence

- `docs/ideas/Semantic Audio Cognition Framework.md`: "further isolation of instruments and individual stems making up a composite, to be analyzed alone"

## Acceptance Criteria

- [ ] Candidate stem-separation tools are compared.
- [ ] Minimum quality metrics are proposed.
- [ ] Downstream dependencies for tonal and emotional analysis are documented.
