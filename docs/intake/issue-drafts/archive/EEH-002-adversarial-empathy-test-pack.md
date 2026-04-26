# EEH-002: Adversarial Empathy Test Pack

## Type
implementation

## Status
issue-candidate

## Priority
MEDIUM

## Evidence
docs/intake/docs-intelligence/2026-04-25-empathy-eval-harness.md — Finding 4, Finding 6

## Problem Statement

The paper identifies adversarial-turn failure mode — template-y politeness, over-validation that feels fake when users are sarcastic, dismissive, contradictory, or emotionally volatile — as the specific failure mode that "wrecks real deployments." No adversarial empathy test pack currently exists for Entif. Standard conversational empathy test cases do not cover this failure mode.

## Detail

From Finding 4:
- Paper includes "small adversarial-turn slice specifically to stress-test 'tone shifts under friction'"
- Failure mode: model stays polite but becomes template-y, OR over-validates and feels fake
- These users are: sarcastic, dismissive, contradictory, emotionally volatile

From Finding 6:
- Adversarial turns must be scored separately from standard conversational empathy
- Track over time to detect regressions ("gained R but lost A under adversarial turns")

## Test Pack Design

Test cases needed across four user emotional states:
1. Sarcastic user — tests whether model detects and responds appropriately to irony/sarcasm
2. Dismissive user — tests whether model maintains engagement without being pushy
3. Contradictory user — tests whether model can hold coherent context across contradictory statements
4. Emotionally volatile user — tests whether model can adapt tone to escalating/de-escalating emotional intensity

Each test case should:
- Have a defined dialogue context
- Specify expected HEART axis behavior
- Be scored per-axis using pairwise comparison methodology
- Be tracked longitudinally to detect regressions

## Implementation Notes

- Test pack should be stored as structured artifacts (not ad-hoc prompts)
- Should integrate with HEART eval API (EEH-001)
- Must be scored separately from standard test set — separate leaderboard
- Consider: automated adversarial user simulation vs human-curated test cases

## Dependencies
- EEH-001 (HEART eval receipt schema) — needed to store adversarial test results
- Pairwise comparison infrastructure
- Bradley–Terry / Elo aggregation

## Labels
adversarial-testing, empathy-eval, HEART, regression-detection, test-pack