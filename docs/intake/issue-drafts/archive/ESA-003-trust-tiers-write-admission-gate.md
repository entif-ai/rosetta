# ESA-003: Map trust tiers to write admission gate

**Type:** docs-intelligence  
**Draft or Existing Issue:** draft  
**Labels:** entif-governance, trust-tiers, blast-radius  
**Depends On:** —  
**Evidence:** `docs/chats/20260226 - Chat GPT - Entif.AI Systems Architecture Synthesis.md`

## Summary

The synthesis identifies 4 trust tiers (Copilot → Assisted execution → constrained autonomy → production autonomy) but the write admission gate (9-step state machine) is defined separately in NOT LAME PRD. These must be explicitly mapped: which trust tier maps to which gate states, required approvals, and blast-radius limits.

## Trust Tiers (from synthesis)

1. **Copilot** — human in full control, AI assists only
2. **Assisted execution** — AI proposes, human approves
3. **Constrained autonomy** — AI acts within tight bounds, human reviews
4. **Production autonomy** — AI acts independently, full blast radius

## Write Admission Gate (from NOT LAME PRD)

9-step state machine: Propose → Normalize → Authorize → Ground → Checkpoint → Apply → Observe → Receipt → Project (fail-closed)

## Required Mapping

| Trust Tier | Gate States Available | Required Approvals | Blast Radius Limit |
| --- | --- | --- | --- |
| Copilot | Propose only | Human reviews all | None (no Apply) |
| Assisted | Propose, Normalize, Authorize | Human approves each | Low |
| Constrained | Propose–Observe | Human reviews Receipt | Medium |
| Production | Full gate | Automated Receipt verification | Full (per policy) |

## Recommended Action

1. Create explicit mapping table in Entif v0 governance docs
2. Implement trust-tier enforcement in adapter certification harness (8 test classes)
3. Ensure TC-005 (Promotion state machine) gates trust tier escalation
4. Add blast-radius tracking to receipts

## Status

Open.
