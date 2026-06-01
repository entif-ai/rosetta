# TULP-006: parse-only-default vs. Live Persona Mode — Clarify Safety Baseline Boundary

## Meta

| Field | Value |
|---|---|
| Status | draft |
| Type | safety |
| Priority | high |
| Area | Tulpamancy Protocol / Safety / Bootstrap |
| Discovered in | `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-01-sdialog-tulpamancy.md` |

## Summary

Rosetta's `parse-only-default` is a documented safety baseline — no side-effecting operations without an explicit guard token. The introduction of "live persona mode" (tulpas that can act, not just simulate) creates an implicit exception to parse-only that is not yet codified. This issue: (1) documents the tension, (2) proposes an explicit "persona mode" opt-in that is distinct from parse-only, and (3) ensures the safety boundary between simulation and live is architecturally enforced.

## Problem Statement

- `parse-only-default` means: Rosetta Bootstrap starts in a read-only/safe mode by default; no writes, no tool calls, no state changes unless explicitly gated
- A "live persona" that can take real actions, call tools, make commitments — is NOT parse-only by definition
- The boundary between "simulation mode" (where personas like SDialog run and can be studied but cannot act) and "live mode" (where promoted personas take real actions) is not explicitly modeled in any spec
- Without explicit modeling, there is a risk that a persona in "simulation" accidentally gets live permissions, or a live persona regresses to simulation-only behavior unexpectedly

## Evidence

From `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md`:

> "Entif asks SDialog: 'Simulate a 10-turn conversation between Tulpa A and Tulpa B about X.' Results come back as a Dialog JSON; Entif stores transcripts + metrics; does **not** let SDialog directly call tools."

> "At that point [after promotion], it can participate in live flows, but **still with Entif in the middle**."

This is the key boundary:
- Simulation mode: persona is a passive participant; Entif collects output; persona cannot call tools
- Live mode: promoted persona can initiate actions through Entif's guard layer

## Proposed Resolution

1. **Codify the mode distinction** in Bootstrap/Authority Stack:
   ```
   parse-only = default safety posture for all Rosetta operations
   tulpa-simulation = parse-only + persona is active but has no tool-call capability
   tulpa-live = explicit opt-in; persona CAN initiate actions through Guard/Tripwire; always mediated by Entif kernel
   ```
2. **Authority grant model**: A persona in `tulpa-live` mode is granted a specific `authority_scope` that defines which tool calls it is permitted to initiate. This scope is enforced at the Guard layer, not by the persona itself.
3. **State transition**: `tulpa-simulation` → `tulpa-live` requires passing TULP-004 promotion gate
4. **Regression protection**: if a `tulpa-live` persona's drift score exceeds threshold (TULP-005), it auto-reverts to `tulpa-simulation` pending re-qualification
5. **Audit trail**: every mode transition emits a Receipt (Receipt Law applies)
6. **Update REPO_SHAPE_AND_CONSTRAINTS.md** to explicitly document the two persona modes alongside parse-only

## Alignment with Existing Specs

- Consistent with `parse-only-default` in Bootstrap and Authority Stack
- Authority scope concept consistent with rights-scoped retrieval (no retrieve-then-filter; enforced at boundary)
- Receipt Law: mode transitions require receipts — consistent with NOT LAME's receipt-for-every-durable-mutation principle

## Dependencies

- TULP-004 (promotion gate is the only path to live mode)
- TULP-005 (drift-triggered regression back to simulation)
- Bootstrap REPO_SHAPE_AND_CONSTRAINTS update

## Risks

- The "Entif in the middle" guarantee depends on Guard/Tripwire being correctly implemented. If Guard has a gap, a live persona could act outside its scope. Mitigate: treat Guard implementation as highest-priority reliability item.
- parse-only is a Rosetta concept; Tulpamancy is an Entif concept above Rosetta. The mode boundary must be enforced at the Entif layer, not assumed from Rosetta's posture alone. Document this explicitly.

## Labels

`parse-only` `safety` `persona-mode` `live-agent` `guard` `tulpamancy` `bootstrap`

## Related Issues

- TULP-004 (promotion gate is the live-mode entry point)
- TULP-005 (drift regression from live to simulation)
- TULP-002 (SDialog bridge must enforce simulation-only at sidecar level)
