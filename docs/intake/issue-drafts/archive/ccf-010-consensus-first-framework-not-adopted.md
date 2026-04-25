# CCF-010: Consensus-First Framework Not Adopted

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ccf-010 |
| Title | Consensus-First Commitment Scoping Framework Not Adopted in Rosetta Workflows |
| Type | planning |
| Priority | P0 |
| Source doc | `docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md` |
| Extraction date | 2026-04-25 |
| Status | draft |
| Depends on | ccf-001, ccf-002, ccf-003, ccf-004, ccf-005, ccf-006 |

## Problem Statement

The Consensus-First Commitment Scoping Framework v0.1 exists as a formal document defining five required artifacts, phase-transition handshake, calibration loop, and anti-delusion mechanisms. None of these are currently operationalized in Rosetta planning or commitment workflows. The framework was designed to prevent specific, well-documented failure modes (premature closure, automation bias, LLM overconfidence, hallucination, groupthink). These failure modes continue to operate unchecked because the framework is not adopted.

## Evidence

> "This v0.1 is intentionally 'codified enough to execute' but explicitly not 'complete.'" — §Conclusion

> "This spec therefore treats 'readiness,' 'dissent,' and 'exit logic' as first-class design objects, not afterthoughts." — §Why this spec exists

The spec exists, is well-defined, and is not being used in any existing Rosetta workflow.

## Impact

All failure modes the framework was designed to prevent continue to operate:
- Specs continue to be produced without Evidence Ledger entries (hallucination unchallenged)
- Phase transitions continue to be automatic (no handshake)
- Exit/pivot triggers continue to be undefined (sunk-cost worship)
- Dissent continues to be informally suppressed (groupthink)
- LLM overconfidence continues to masquerade as readiness ("spec by fluent synthesis")
- Premortems never run (anti-delusion mechanism absent)

## Options

**Option A — Incremental adoption:** Sequentially address ccf-001 through ccf-009 in dependency order, then declare the framework adopted once foundational pieces are in place.

**Option B — Pilot with one epic/feature:** Apply the full framework to one active epic or feature as a pilot, validate the artifacts and process, then generalize.

**Option C — Adopt framework as project governance policy:** Add the framework to the AUTHORITY_STACK or governing documents as a required commitment-sizing process for all P0/P1 work.

## Recommendation

Option B (pilot) + Option A (incremental resolution of blocking issues). Option C for organizational adoption after pilot validation.

## Next Steps

- [ ] Select one active epic or feature as pilot
- [ ] Produce all five required artifacts for pilot case using the framework
- [ ] Run phase-transition handshake for pilot
- [ ] Document gaps and learnings from pilot
- [ ] Sequentially resolve ccf-001 through ccf-009 based on pilot learnings
- [ ] Update governance documents (AUTHORITY_STACK or equivalent) with framework adoption
- [ ] Train team on framework operation