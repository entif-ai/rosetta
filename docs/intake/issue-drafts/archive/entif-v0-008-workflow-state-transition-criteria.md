# ENTIF-v0-008: Workflow State Transition Criteria (Draft→Certified→Released) Not Defined

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-008 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #19 in ledger |
| Confidence | `high` |
| Depends On | — |

---

## Problem Statement

The spec defines the workflow lifecycle state machine:

> Draft → Certified → Released → Deprecated → Retired

**But the transition criteria for each state are not specified.** What constitutes "Certified"? What triggers "Released"? Without acceptance criteria per state, the lifecycle is a label without a gate — any workflow could claim any state.

---

## Evidence

The spec says:
- "Draft → Certified (Petri-tested) → Released → Deprecated → Retired"
- "Artifacts produced each run: Execution envelope, receipts, scorecards, failure log, and update proposals"

The phrase "Petri-tested" is the only criteria hint, but:
- What is a Petri test? (Petri net verification? A specific test harness?)
- What are the pass/fail criteria for the Petri test?
- Who approves the transition from Draft → Certified?
- What constitutes a "release" — just passing tests, or also human sign-off?

---

## Impact

- Workflows can be released without adequate testing (the certification gate has no criteria)
- Different operators will have different standards, leading to inconsistent workflow quality
- Replay safety (one of the core doctrines) cannot be verified without certification criteria

---

## Dependencies

- None (workflow lifecycle is foundational)

---

## Suggested Resolution

1. Define Draft→Certified criteria: minimum test coverage (e.g., 80%), at least 3 successful replay runs in staging, no DLQ events in test runs
2. Define Certified→Released criteria: human approval gate for v0 (automated for v0.1+), receipt chain validated, scoring rubric baseline met
3. Define Released→Deprecated criteria: successor workflow available, no active running instances
4. Define Deprecated→Retired criteria: all instances completed, no dependent workflows
5. Define ownership per transition (who approves Draft→Certified, who approves Certified→Released)

---

## Open Questions

- Is there a draft-to-certified automated CI gate, or always manual approval?
- Should workflow replay success rate be a certification criterion (e.g., 100% replay success over last 10 runs)?