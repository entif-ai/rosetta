# APC-CACHE-005: Auditable Weak-to-Strong Routing Handoffs

**Issue prefix:** APC-CACHE-005
**Type:** implementation
**Status:** draft
**Source:** docs/chats/20260411 - Chat GPT - API-driven Cache Management.md (Finding APC-009)
**Extracted:** 2026-06-05

---

## Problem Statement

Entif's inference router routes queries through a spectrum: cheap/fast models for triage and simple cases, expensive/slow frontier models for complex synthesis. The "weak-to-strong" generalization pattern is central to the cost-reduction thesis. However, the source explicitly calls out the risk:

> "If a cheap model triages and a stronger model resolves, the handoff rationale must be inspectable. Otherwise you just built a fancier black box with better invoices."

Non-auditable routing means:
- No way to reconstruct why a particular query was escalated
- No way to optimize the routing policy based on actual outcomes
- No way to debug why a weak model answered when a strong model was warranted (or vice versa)
- In regulated industries: no audit trail for why a particular inference decision was made

## Required Components

1. **Routing decision as a first-class artifact**: Every routing decision (weak model answer, escalation to strong model, composite answer) must produce a structured record that includes:
   - The input query (hashed for privacy)
   - The routing decision made
   - The rationale: which features/triggers caused the decision
   - The model(s) used
   - The outcome (answer served, escalation triggered, etc.)

2. **Rationale taxonomy**: Define a set of routing rationale codes (e.g., `AMBIGUITY_DETECTED`, `ENTITLEMENT_REQUIRES_STRONG`, `CACHE_MISS_STRONG_PREFERRED`, `USER_OVERRIDE`, `SYNTHESIS_DEPTH_EXCEEDED`) that encode why a particular routing path was chosen.

3. **Retention and access**: Routing decision logs must be retained as long as audit requirements demand, with access controls appropriate to the sensitivity of the data.

4. **Policy-tuned routing**: The routing policy should be tunable (not hardcoded) so it can be adjusted based on evidence. The tuning mechanism itself should be auditable.

## Relationship to Existing Work

- The "weak-to-strong generalization" is referenced in the source as part of Entif's value proposition
- The Guard Layer (admission controller) is a related gate; this is about the post-admission routing decision
- Tripwire is referenced in v0 spec as a pre-dispatch validation step; routing audit logs complement but are distinct from Tripwire captures

## Confidence

HIGH — Explicit from source document's "dragons" section, second response block.

## References

- docs/chats/20260411 - Chat GPT - API-driven Cache Management.md
- docs/PRDs/20260423 - Entif.AI - NOT LAME (v0.1) - PRD - Neurologic Orchestration Topology for Layered Agentic Memory and Evolution.md
