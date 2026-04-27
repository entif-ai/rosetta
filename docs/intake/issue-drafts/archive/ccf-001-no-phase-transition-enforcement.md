# CCF-001: No Phase-Transition Enforcement Mechanism

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ccf-001 |
| Title | No Phase-Transition Enforcement Mechanism |
| Type | architecture |
| Priority | P1 |
| Source doc | `docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md` |
| Extraction date | 2026-04-25 |
| Status | draft |

## Problem Statement

The Consensus-First Commitment Scoping Framework v0.1 asserts as a hard rule: "no transition (ideation → spec, spec → build, build → GA, etc.) is automatic." The spec defines four mandatory questions that must be answered affirmatively before the next artifact may be produced.

However, the spec describes no enforcement mechanism — no automated gate, no checklist format, no tooling, and no process by which the next-phase agent knows whether the previous-phase human has actually completed the handshake. The rule exists only as prose.

## Evidence

> "Hard rule: no transition (ideation → spec, spec → build, build → GA, etc.) is automatic." — §Phase transition handshake

> "Only after explicit 'yes' (or explicit 'yes, with reservations documented') does the agent produce the next artifact." — §Phase transition handshake

## Impact

Without enforcement, the phase-transition handshake is a suggestion, not a constraint. Agents in automated or semi-automated workflows will proceed to the next artifact whenever they determine the prior artifact is "ready enough," violating the core premise of the framework. Premature closure failure modes persist.

## Options

**Option A — Checklist artifact:** Require a signed phase-transition checklist file (e.g., `phase-gate/{phase}-{timestamp}.checklist.md`) before the next artifact can be authored. Agent refuses to produce next artifact if checklist is absent.

**Option B — Guard-engine integration:** Integrate the handshake into the Guard engine as a write gate; the gate checks for explicit consent receipt before allowing the next artifact write.

**Option C — Triage workflow:** Add a manual "ready?" step in the project triage workflow that must be explicitly approved before the agent proceeds.

**Option D — Hybrid:** Combine Option A (checklist artifact) with Option B (Guard gate check) for defense-in-depth.

## Recommendation

Option B or D — integrate into Guard engine for hard enforcement in agentic contexts. Checklist as fallback for manual contexts.

## Next Steps

- [ ] Design phase-gate checklist artifact format
- [ ] Evaluate Guard engine write-gate integration points
- [ ] Produce implementation spec for phase-gate enforcement
- [ ] File follow-up issue for tooling if needed