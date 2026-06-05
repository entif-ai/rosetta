# RSK-002: Risk Scoring — Social Engineering Literature Not Operationalized

## Metadata
- **Issue:** RSK-002
- **Priority:** P2
- **Confidence:** high
- **Source:** docs/intake/docs-intelligence/2026-06-05-email-driven-security-defenses.md

## Boundary
Artifact is issue-draft output for planning. Not final specification.

## Problem

The user explicitly proposed using Mitnick's *The Art of Deception*, government/institutional social engineering guidelines, and public handbooks as a source of scoring heuristics for the social-engineering risk axis. The conversation acknowledges this as a strong addition and generates a feature family list, but does not specify:
1. How to convert literature/guidelines into explicit feature rules
2. Benchmark/evaluation corpora derived from those sources
3. Labeling guidance for training the SE-risk classifier
4. How SE-risk scoring feeds routing/policy independently from attack-family risk

This is partially implemented intent — the dimension is identified but not operationalized.

## Impact

The SE-risk scoring dimension remains a feature family list rather than a trained/calibrated classifier. Without operationalization, the social-engineering lens cannot be systematically applied to incoming communications, forum posts, or skill markdown.

## Suggested Approach

1. Develop a conversion methodology: parse social engineering literature into explicit heuristic rules and labeling guidelines
2. Build benchmark corpus: labeled examples from BEC/fraud corpora, government guidelines, red-team materials
3. Train `risk.social_engineering` classifier on labeled data using the feature family as initial feature engineering
4. Define routing: if SE-risk is high and sensitive-action is high → approval-required or quarantine
5. Keep SE-risk scoring separate from prompt-injection/attack-family scoring — different threat model

## Related
- F4, F11
- risk.social_engineering pack
- identity.correlation pack (SE manipulation patterns in forum content)