# BH-003: Ingress Refinery + canonical corpus cache — status unknown

## Metadata

| Field | Value |
| --- | --- |
| Issue | BH-003 |
| Title | Ingress Refinery + canonical corpus cache prerequisites for corpus ingest — status unknown |
| Type | investigation |
| Status | open |
| Labels | bootstrap, ingress-refinery, corpus-ingest, critical-path |
| Depends on | — |
| Evidence | `docs/handoffs/2026-04-13-bootstrap-handoff.md` — "Do not perform large-scale corpus ingest until the Ingress Refinery and canonical corpus cache exist" |
| Created | 2026-05-31 |

## Problem Statement

The bootstrap handoff is explicit: large-scale corpus ingest is blocked until both:
1. **Ingress Refinery** exists
2. **Canonical corpus cache** exists

These are hard gates. However, this handoff is from 2026-04-13, and it's now 2026-05-31. There has been no systematic check of whether these components exist now. The NOT LAME PRD and later governance docs may have superseded this bootstrap-era constraint, but no confirmation exists.

The docs-intelligence ledger notes that "docs-intelligence is the planning lane that must not be blocked by runtime ingestion readiness" — but for actual source ingestion into Rosetta, these gates may still be required.

## Investigation Tasks

- [ ] Search codebase for "ingress refinery" implementation (packages, source files, tests)
- [ ] Search codebase for "canonical corpus cache" or "corpus cache" implementation
- [ ] Check `docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md` for Ingress Refinery status
- [ ] Check `docs/governance/` for any Ingress Refinery specs or ADRs
- [ ] Determine whether the "source-aware bootstrap slice" described in the handoff fully implements the Ingress Refinery or just its parse-only mode
- [ ] Assess impact on TC-006/TC-007 if Ingress Refinery is incomplete

## Expected Outcome

Either:
- A) Ingress Refinery and canonical corpus cache are implemented — confirm and close this issue
- B) They are partially implemented — scope what's missing and create corresponding issues
- C) They are not implemented — this is a blocker for any corpus ingest that the planning lane needs to track

## Priority

high — if corpus ingest is on the roadmap, these gates must be resolved before TC-006/TC-007 can proceed