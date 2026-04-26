# CCF-008: No Anti-Motivated Reasoning Automation

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ccf-008 |
| Title | No Anti-Motivated Reasoning Automation |
| Type | governance |
| Priority | P2 |
| Source doc | `docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md` |
| Extraction date | 2026-04-25 |
| Status | draft |
| Depends on | ccf-005 (evidence ledger implementation) |

## Problem Statement

The framework defines four anti-motivated reasoning guardrails: explicit incentive notes in Evidence Ledger, premortems at bet-size increases, Team A/Team B or devil's advocacy on contested decisions, and explicit disconfirmers and "what would change our mind." None of these are automated, tracked, or enforced in any existing tooling or process. The incentive/bias note requirement is particularly vulnerable: without tooling, it will become a check-the-box exercise rather than a genuine analytical step.

## Evidence

> "Therefore v0.1 requires: explicit incentive notes in the Evidence Ledger, premortems at bet-size increases, Team A/Team B or devil's advocacy on contested decisions, explicit disconfirmers and 'what would change our mind'." — §Anti-motivated reasoning guardrails

## Impact

Without tooling or automation:
- Incentive/bias notes become pro-forma and ineffective
- Premortem scheduling depends on individual recall
- Contrarian challenge (Team A/Team B) has no triggering or tracking mechanism
- "What would change our mind" statements are omitted from specs
- The guardrails exist in prose but do not function operationally

## Options

**Option A — Evidence ledger enforcement (dependency):** When ccf-005 is implemented, add an `incentive_bias_notes` validation that requires non-empty content and rejects entries that are obviously pro-forma.

**Option B — Anti-motivated reasoning checklist in Falsification Packet:** Add a mandatory checklist to the Falsification & Dissent Packet covering all four guardrails, requiring explicit checkboxes and content for each.

**Option C — Bet-size trigger for premortem:** When the commitment canvas is updated and the wager increases beyond a threshold, an automated prompt triggers the premortem session and logs the output.

**Option D — Devil's advocate scheduler:** For contested decisions (indicated by dissent receipt), a devil's advocate session is auto-scheduled with arotating team member assigned to the Team A/Team B role.

## Recommendation

Option B (checklist in Falsification Packet) for immediate coverage. Option A for when ccf-005 is resolved. Option C for automated premortem triggering.

## Next Steps

- [ ] Add anti-motivated reasoning checklist to Falsification & Dissent Packet template
- [ ] Define bet-size threshold for premortem trigger (coordinate with ccf-004)
- [ ] Design devil's advocate rotation for contested decisions
- [ ] Coordinate with ccf-005 for evidence ledger bias-note validation
- [ ] Add "what would change our mind" field to spec header requirements