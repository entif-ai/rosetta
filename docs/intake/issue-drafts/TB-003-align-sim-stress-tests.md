# Issue Draft

## Title
ALIGN-SIM stress test suite: implement 5-criterion semantic robustness gate

## Type
issue-candidate

## Labels
`evaluation` `semantic-robustness` `stress-tests` `rpp`

## Depends On
`rpp/eval` module

## Evidence
Source: `docs/chats/20260225 - Chat GPT - Token boundaries explained.md`, response Section 7

Five stress tests must all pass simultaneously:
1. **Synonym substitution** — replacing word with synonym should keep sentence semantically close
2. **Antonym flip** — replacing word with antonym should move representation far in embedding space
3. **Paraphrase without negation** — paraphrase without negation should stay close
4. **Word-order shuffle** — perturbing word order should not drastically change meaning if syntax-invariant
5. **Distractor injection** — injecting unrelated content should not change core representation

Gate: must pass ≥4/5 simultaneously.

## Description

Implement `rpp/eval/semantic_stress_tests.py` — the ALIGN-SIM semantic robustness test suite. The module must:

1. Implement all 5 stress tests as discrete functions
2. Each test returns a binary pass/fail with margin threshold
3. Aggregate results and enforce ≥4/5 gate for promotion
4. Log per-test scores and failure reasons
5. Produce a summary dict for integration into Eval Report

## Success Criteria
- Synonym swap: cosine similarity between original and synonym-swapped representation stays within 0.85 threshold
- Antonym flip: cosine distance exceeds 0.5 (antonyms are far)
- Paraphrase: cosine similarity ≥ 0.80
- Word-order shuffle: cosine similarity ≥ 0.70
- Distractor injection: cosine similarity with original ≥ 0.75
- Gate blocks release if <4/5 pass

## Priority
P1

## Notes
Prevents the "looks good on STS, fails on semantics" pitfall where models score well on similarity benchmarks but fail basic semantic sanity checks.
