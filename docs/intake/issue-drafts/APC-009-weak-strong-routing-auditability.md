# APC-009: Weak-to-Strong Routing Must Be Auditable

**Status:** draft
**Priority:** medium
**Type:** architecture/observability
**Confidence:** HIGH

## Problem Statement

Entif's routing layer will frequently make a decision to:
1. Let a cheap/fast model (e.g., Gemini Flash, GPT-4o-mini) attempt to resolve a query
2. Escalate to a stronger/more expensive model if the cheap model fails confidence thresholds

This "weak-to-strong" generalization pattern is good for cost management but creates an audit problem:

**Without auditable handoffs, Entif becomes a "fancier black box with better invoices."**

The routing decision — why the cheap model was insufficient, why the strong model was invoked — must be a logged, challengeable artifact, not just an internal implementation detail.

## What Must Be Auditable

For each routing decision (cheap resolve vs. escalate to strong):

1. **The query** as it was received
2. **The cheap model that was attempted** and its response (or refusal/reasoning)
3. **The confidence signal** that triggered escalation (or lack thereof)
4. **The strong model that was invoked** and its response
5. **The delta**: what did the strong model add that the cheap model couldn't provide?
6. **The final answer delivered to the user**

This allows post-hoc review: "Did we correctly route this query?" and "Did we unnecessarily escalate (burning extra tokens)?"

## Why This Matters for Enterprise Customers

Regulated enterprises (banking, healthcare, legal) need to demonstrate:
- AI decisions are not arbitrary
- The system can explain why a given answer was chosen
- Cost attribution is traceable to routing decisions, not just final answers

Without this, Entif's audit trail is incomplete for procurement and compliance purposes.

## Source

`docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` (ChatGPT conversation, 4/11/2026), second response block ("5. Weak-to-strong routing must remain auditable")

## Requirements

- Entif's routing layer must produce a routing receipt as a first-class artifact for every query
- The routing receipt must be append-only and included in the global audit trail
- Escalation triggers (confidence thresholds) must be configurable and logged, not hardcoded silently
- Cost telemetry must be attributable to specific routing decisions, not just aggregate

## See Also

- `APC-004` (Entif provenance-native governance layer)
- `APC-008` (multi-provider composition provenance)
- `entif-v0-015-model-routing-thresholds.md`
- `omoc-lean-vs-learned-routing-paradigm.md`
