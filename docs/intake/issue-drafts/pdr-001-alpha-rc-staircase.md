# PDR-001: Adopt 8-step Alpha RC Staircase as Binding MVP Gate Criteria

## Metadata

| Field | Value |
|---|---|
| Type | implementation |
| Status | draft |
| Labels | mvp, alpha-rc, staircase |
| Confidence | high |

## Evidence

Extraction: `docs/intake/docs-intelligence/2026-06-05-prd-revision-synthesis.md`
Finding: "Alpha RC-0 through RC-4 staircase" — 8-step Alpha RC staircase defined in synthesis

## Problem

The MVP gate criteria are not formally defined. The synthesis produced an 8-step Alpha RC staircase (RC-0 through RC-4) that should serve as the binding acceptance criteria for MVP, but it has not been adopted as formal project criteria.

## Proposal

Adopt the following 8-step Alpha RC staircase as the binding MVP gate criteria:

**Alpha RC-0:** Nx workspace boots; `canon`, `cid`, `validate` exist; TV1 and tamper-negative tests compile red

**Alpha RC-1:** JCS/CID deterministic conformance green; `rosetta.receipt` schema green; `rosetta.tapestry` receipt-bundle schema green

**Alpha RC-2:** Guard denies missing/expired/mismatched tokens; `builtin.echo` vertical slice passes end to end; receipt bundle verifies successfully

**Alpha RC-3:** `code.scaffold --dry-run` reuses same constitutional loop; no real side effects yet; CLI/API both green

**Alpha RC-4:** local CAS + SQLite query surfaces stable; rights-scoped retrieval enforced; operator UI stub can inspect runs but is non-gating

The staircase should be captured as a project document with explicit acceptance criteria for each step.

## Implementation Notes

- Each RC step should have a corresponding test suite that gates advancement
- RC-0 through RC-2 are sequential blockers; cannot proceed to next without prior green
- RC-3 and RC-4 can be parallelized once RC-2 is green
- The staircase should be referenced in the MVP gate definition

## Depends On

- _(no dependencies)_

## References

- Source doc: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Extraction: `docs/intake/docs-intelligence/2026-06-05-prd-revision-synthesis.md`