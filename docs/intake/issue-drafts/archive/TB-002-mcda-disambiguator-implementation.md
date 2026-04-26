# Issue Draft

## Title
MCDA disambiguator: implement multi-criteria decision function with configurable weights and explain trace

## Type
issue-candidate

## Labels
`mcda` `wsd` `disambiguation` `rpp`

## Depends On
`rpp/wsd` module

## Evidence
Source: `docs/chats/20260225 - Chat GPT - Token boundaries explained.md`, response Section 7.8

Reference code:

```python
from collections import namedtuple
Scores = namedtuple("Scores", "proto_cos ppr role_fit gloss antonym_gap entropy")

def mcda_score(scores, w=None):
    if w is None:
        w = np.array([0.35, 0.25, 0.15, 0.15, 0.07, -0.02])
    v = np.array([scores.proto_cos, scores.ppr, scores.role_fit, scores.gloss, scores.antonym_gap, scores.entropy])
    return float((w * v).sum())
```

## Description

Implement `rpp/wsd/select.py` — the MCDA scoring layer for word sense disambiguation. The module must:

1. Accept a `Scores` namedtuple with fields: `proto_cos`, `ppr`, `role_fit`, `gloss`, `antonym_gap`, `entropy`
2. Compute convex combination `S = w · f` where `f` is the criterion vector
3. Default weights: `[0.35, 0.25, 0.15, 0.15, 0.07, -0.02]` (sums to ~1.0)
4. Support weight override for replay under different MCDA configurations
5. Include a calibration helper that learns weights from a human-audited dev set via margin loss
6. Provide an `explain()` function that returns human-readable breakdown of why a particular sense won

## Success Criteria
- `mcda_score()` returns a scalar for any valid Scores tuple
- Weights are configurable and validation rejects negative weight sums
- `explain()` returns a dict with per-criterion contributions
- Calibration script runs on a 100-example human-audited set and produces updated weights
- Tests pass: `python -m pytest tests/unit/test_mcda.py`

## Priority
P0

## Notes
The entropy penalty is negative weight (-0.02) meaning high entropy reduces the score — this penalizes ambiguous choices.
