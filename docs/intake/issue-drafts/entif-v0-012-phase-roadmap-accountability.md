# ENTIF-v0-012: Phase Roadmap (v0/v0.1/v1) Lacks Owners, Milestone Acceptance Criteria, and Dependency Chain

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-012 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #21 in ledger |
| Confidence | `high` |
| Depends On | `ENTIF-v0-011` |

---

## Problem Statement

The phased roadmap is defined as:

- **v0**: 2–4 weeks, thin vertical slice (prove the spine)
- **v0.1**: next 4–8 weeks (PersonaForge + council + transferability + license + security)
- **v1**: 3–6 months (multi-graph federation + Muninn memory tiering + PROV mapping + marketplace packaging)

**But the roadmap has:**
- No owner assignments per phase
- No milestone acceptance criteria (what does "v0 slice complete" mean?)
- No detailed dependency chain beyond the high-level ordering
- No tracking mechanism for progress

A roadmap without owners, gates, and dependency links is a wish list, not a plan.

---

## Evidence

The spec says "2–4 weeks" for v0 and "next 4–8 weeks" for v0.1, but no owners, no milestone acceptance criteria, no detailed dependency links.

The v0 slice description lists 7 steps but no owner, no timeline per step, and no definition of done per step.

---

## Impact

- No one is accountable for any phase
- Teams cannot track progress without acceptance criteria
- Dependency conflicts between phases are not visible until late in execution
- Resource allocation cannot be optimized without phase-level ownership

---

## Dependencies

- `ENTIF-v0-011` (Rosetta tile minting API is a v0 dependency, so its delay impacts the v0 timeline)

---

## Suggested Resolution

1. Assign an owner per phase (e.g., v0 Owner: Entif Core team; v0.1 Owner: PersonaForge team; v1 Owner: Architecture lead)
2. Define milestone acceptance criteria per phase:
   - v0: deterministic middleware live + contributor graph writeable + receipt minted + tile retrieved via API
   - v0.1: PersonaForge contracts enforceable + council workflow + Transferability scorer v1 + license classifier + security gating
   - v1: multi-graph federation operational + memory tier transition rules enforced + PROV-O receipts + capability marketplace
3. Define a detailed dependency chain: which issues/tickets block which phase transitions
4. Define a tracking mechanism: weekly status report with % complete per phase + blockers

---

## Open Questions

- Should the roadmap be maintained in GitHub Projects or a separate artifact?
- Is there a phase-gate review process (similar to the workflow state machine)?