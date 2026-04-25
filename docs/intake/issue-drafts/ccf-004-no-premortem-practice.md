# CCF-004: No Premortem Practice

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ccf-004 |
| Title | No Premortem Practice |
| Type | process-orchestration |
| Priority | P2 |
| Source doc | `docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md` |
| Extraction date | 2026-04-25 |
| Status | draft |

## Problem Statement

The framework references premortem as a core anti-delusion mechanism: "assume failure date, list plausible causes, rank by likelihood and impact" and requires it "at major bet-size increases." A template is provided in the spec. However, no operational practice exists to trigger, conduct, or record premortems in Rosetta workflows. The template exists in prose; no process schedules it.

## Evidence

> "Run periodic Premortems at major bet-size increases" — §Commitment calibration loop

> "A premortem deliberately assumes failure and asks the team to generate reasons why—an established debiasing technique" — §Anti-delusion: falsification, premortems

> "Minimal premortem writeup: assume failure date, failure headlines (top 5), root causes under each, preventive mitigations, early warning signals" — §Minimal premortem writeup

## Impact

Premortems are deferred indefinitely in practice because no process or tooling triggers them. The "major bet-size increase" threshold is undefined, so the trigger never fires. The anti-delusion mechanism is present in prose but absent from operations.

## Options

**Option A — Bet-size threshold definition + calendar trigger:** Define "major bet-size increase" as a specific percentage or absolute threshold (e.g., >20% increase in commitment tranche). When threshold is crossed, a premortem session is scheduled and the output filed as a Falsification & Dissent Packet artifact.

**Option B — Premortem gate in phase transition:** Add premortem completion as a required input to the phase-transition handshake for commits above a size threshold.

**Option C — Embedded in Commitment Canvas:** Premortem key failure modes are embedded directly in the Commitment Canvas artifact as a mandatory section, auto-triggered when the Recommended Commitment Posture is Strike aggressively or Acquire.

## Recommendation

Option B for enforcement via phase-gate mechanism. Option C for smaller commitments where full premortem is disproportionate overhead.

## Next Steps

- [ ] Define "major bet-size increase" threshold
- [ ] Add premortem to phase-gate checklist
- [ ] Integrate with Commitment Canvas for high-risk postures
- [ ] Document premortem facilitation guide for team use