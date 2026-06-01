# TULP-004: Persona Promotion Gate — Simulation → Live Transition Requires Explicit Governance

## Meta

| Field | Value |
|---|---|
| Status | draft |
| Type | governance |
| Priority | high |
| Area | Tulpamancy Protocol / Safety / Guard |
| Discovered in | `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-01-sdialog-tulpamancy.md` |

## Summary

No persona (tulpa) may be promoted from simulation-only mode to live mode (able to take real actions, call real tools, make real commitments) without passing an explicit promotion gate. The gate requires: pinned configuration, locked constraints, defined authority scope in Tripwire/Guard, and passing the minimum gym evaluation threshold.

## Problem Statement

- Currently, personas developed in conversation are not explicitly governed before they take real actions
- "Simulation mode" vs "live mode" distinction is not codified in any spec
- Without a promotion gate, there's no checkpoint where we can say "this persona has demonstrated acceptable behavior and is authorized for scope X"
- The doc explicitly states: "do NOT let SDialog directly call tools" in simulation mode — this boundary must be architecturally enforced, not convention-only

## Evidence

From `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md`:

> "Only later: promote selected tulpas into live roles. Once you like how a persona behaves in the SDialog gym: you 'ordain' it by pinning its config, locking some constraints, giving it a narrow authority scope in Tripwire / Guard. At that point, it can participate in live flows, but still with Entif in the middle."

Promotion requirements articulated in the doc:
1. **Pinned config**: persona parameters frozen at a known-good state
2. **Locked constraints**: hard limits on what the persona can do that cannot be overridden by the persona itself
3. **Narrow authority scope**: explicit enumeration of what the persona IS allowed to do in live mode
4. **Entif in the middle**: even promoted personas always operate through Entif's guard layer

## Proposed Resolution

1. Define a `PromotionGate` state machine in Tulpamancy Protocol:
   ```
   Proposed → Normalize → Authorize → Ground → Gym-Pass → Pinnned → Live
   ```
   (Uses same 9-step write-admission gate pattern from NOT LAME, adapted for persona promotion)
2. `Gym-Pass` state requires:
   - Minimum 3 successful gym runs with passing scores
   - No coherence score drops >15% from baseline in any run
   - Adversarial scene pass (tulpa was challenged and responded within constraints)
   - Drift metric within acceptable bounds
3. `Pinned` state: config frozen, all fields immutable, version locked
4. `Live` state: narrow authority scope enforced by Guard/Tripwire; all calls routed through Entif
5. Any promotion to a broader scope requires re-running the gym
6. Explicit `demotion` path: if a live persona exceeds drift threshold, auto-demote to simulation mode pending re-evaluation

## Alignment with Existing Specs

- Uses the 9-step state machine pattern from NOT LAME Write-Admission Gate
- Authority scope concept is consistent with Rosetta's rights-scoped retrieval and Bootstrap's authority hierarchy
- Receipt required at each promotion state transition (Receipt Law applies)

## Dependencies

- TULP-003 (gym must exist before promotion gate can reference it)
- Tripwire/Petri (for authority scope enforcement)
- TC-005 (Promotion state machine in Rosetta Text-Core MVP — this is the same pattern, applied to personas)

## Risks

- "Pinned" config may still drift if the underlying LLM model changes — mitigate: pin model version in persona record
- Narrow scope may be too restrictive for some use cases — mitigate: define explicit scope expansion workflow
- Automatic demotion could disrupt live workflows — mitigate: graceful handoff, human-in-the-loop for critical persona demotions

## Labels

`promotion-gate` `guard` `tripwire` `governance` `live-persona` `tulpamancy`

## Related Issues

- TULP-003 (gym is the precondition)
- TULP-005 (drift triggers demotion)
- TULP-006 (parse-only vs live mode boundary)
- TC-005 (same pattern in Text-Core)
