# OB1-001: Section 10 Implementation Actions Not Tracked

## Meta

- **Type:** tracking-gap
- **Severity:** medium
- **Confidence:** high
- **Tags:** governance, tracking, implementation, section-10
- **Source doc:** `docs/governance/20260410 - OpenBrain OB1 Assimilation Addendum (v0.1).md` §10
- **Extracted:** 2026-05-26

## Summary

Section 10 of the OB1 Assimilation Addendum lists 7 concrete, immediate implementation actions with no owner, no timeline, and no tracking in the project board or backlog. The addendum was drafted 2026-04-10 and has been a known document in the repo since then — these 7 actions remain untracked.

## Evidence

The 7 actions from §10:
1. create top-level `recipes/`, `skills/`, `integrations/`, `dashboards/`, `primitives/`
2. add contribution metadata schema to repo validators
3. scaffold first recipe pack wave
4. scaffold first skill wave
5. add tool-budget checks to CI/eval
6. implement deterministic dedupe and schema-aware routing in Pillar Zero packages
7. treat quiet retrieval behavior as a requirement for future operator-facing context surfacing

None of these appear in the TC-001-007 scope gate, the phased backlog (B-001-B-016), or any GitHub issue search.

## Response Options

1. **Accept and file:** Create 7 tracking issues from §10, assign owners and milestones
2. **Reject with rationale:** Determine these are superseded, done, or not relevant to current build
3. **Deprioritize:** Mark as post-TC-005 work items

## Preconditions for Resolution

- All 7 actions are either (a) tracked as issues with owners, or (b) explicitly closed as not applicable with rationale documented in this issue
- No action item from §10 exists without a corresponding tracking artifact

## Dependencies

- None (this is the tracking gap itself)

## Labels

`governance` `tracking` `implementation`

## Status

open