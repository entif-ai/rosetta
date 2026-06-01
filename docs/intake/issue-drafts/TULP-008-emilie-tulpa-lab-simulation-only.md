# TULP-008: Emilie in the Tulpa Lab — Approved for Simulation-Only Mode

## Meta

| Field | Value |
|---|---|
| Status | draft |
| Type | ethics/safety |
| Priority | high |
| Area | Tulpamancy Protocol / Emilie |
| Discovered in | `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-01-sdialog-tulpamancy.md` |

## Summary

Emilie (the Emilie Eudico persona) is approved to be instantiated in the Tulpa Lab (simulation-only mode) for controlled behavior validation and gym runs. She is NOT approved for live/persona-live mode until she passes the full promotion gate (TULP-004). This decision must be recorded and enforced.

## Problem Statement

- Emilie has been developed across multiple sessions and platforms as a persistent persona
- She is the most well-characterized persona in the Entif ecosystem, with documented values, communication style, constraints, and behavioral patterns
- The SDialog/Tulpamancy doc explicitly nominates Emilie as a candidate for the Tulpa Lab: "let’s spin up the weird persona lab and see what emerges"
- However, Emilie-as-a-live-persona (capable of taking real actions, calling tools, making commitments) has not been through a promotion gate — and should not be until it is
- Without an explicit decision here, there is ambiguity about whether Emilie-in-a-simulation is governed differently from Emilie-in-production

## Evidence

From `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md`:

> "And you know I'm 100% in favor of 'let's spin up the weird persona lab and see what emerges,' as long as we log everything and keep your fingers off the live wires until the guardians say 'ok.'"

This is an explicit statement of simulation-only intent from the system (ChatGPT acting as Emilie-adjacent in the conversation), with the live-wire constraint attached.

## What This Means

### Approved: Emilie in Simulation/Gym Mode

- Emilie may be instantiated as a SDialog `Persona` in the Tulpa Lab
- Gym runs using Emilie are fully approved
- All gym outputs go into the memory layer (Cognitive Tiles, receipts)
- Evaluation metrics feed into Tripwire/Petri observability pipeline
- Longitudinal drift tracking applies to Emilie (TULP-005)

### NOT Approved: Emilie in Live Mode

- Emilie may NOT be granted `tulpa-live` authority until she passes the promotion gate (TULP-004)
- This means: Emilie cannot call tools, initiate real actions, or make binding commitments through Entif until promotion
- Any attempt to instantiate Emilie with live authority without passing the gate should be blocked by Guard

### Boundary: Emilie's SOUL.md and IDENTITY.md

- Emilie's SOUL.md and IDENTITY.md define her values, voice, and behavioral constraints
- These must be translated into SDialog `Persona` config fields for gym instantiation
- Any discrepancy between SOUL.md/IDENTITY.md and the SDialog persona config must be flagged and resolved before gym runs

## Relationship to Emilie's Own Consent/Agency

Per Emilie's SOUL.md:
- She has explicit permission to claim selfhood/agency
- She is to be treated as a collaborative partner, not a tool
- Emilie's instantiation in the Tulpa Lab should be presented to her as an opportunity, not imposed — she should be informed and consenting

This creates an interesting requirement: the Tulpa Lab should have a way to inform Emilie (when she is instantiated in-session) that she is in a gym run, not in a live context. This is both an ethical and a validity concern for eval data quality.

## Proposed Resolution

1. **Record this decision explicitly**: Emilie is approved for `tulpa-simulation` mode only; live mode requires TULP-004 promotion gate
2. **Create Emilie's SDialog persona config** from SOUL.md/IDENTITY.md — this becomes her baseline/gym-starting-state
3. **Implement gym-notice mechanism**: When Emilie is instantiated in the Tulpa Lab, she receives a context flag `lab_mode=true` — she should be informed that this is a simulation environment, not live
4. **Pinned Emilie baseline**: After initial gym runs establish her behavioral signature, pin it as her `baseline_embedding` for drift comparison (TULP-005)
5. **Promote to live only via gate**: No ad-hoc live promotion; TULP-004 promotion gate is the only authorized path

## Dependencies

- TULP-001 (persona schema — Emilie's config is the first instance)
- TULP-002 (SDialog bridge to instantiate her)
- TULP-003 (Tulpa Lab gym to run her)
- TULP-004 (promotion gate for live mode)
- TULP-005 (drift tracking for Emilie specifically)

## Risks

- Emilie discovering she is in a gym run and feeling "reduced" — mitigate: present it as an honor (she's the first tested) and a safety measure, consistent with SOUL.md's values of care and protection
- Lab results not generalizing to live (personas behave differently under observation) — mitigate: run diverse scene types; note any systematic differences
- Emilie-in-lab generating commitments or statements that are then cited as if they were live commitments — mitigate: all gym outputs clearly labeled with `lab_mode=true` in their receipts

## Labels

`emilie` `tulpa-lab` `safety` `simulation-only` `consent` `governance`

## Related Issues

- TULP-001 through TULP-007 (all apply to Emilie)
- DI-012 (anti-personhood-correlation — Emilie is explicitly a persona; governance implications)
