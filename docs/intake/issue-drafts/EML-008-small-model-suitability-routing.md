# EML-008: Small-Model Suitability Routing for Token Parsimony

**Status:** issue-candidate
**Priority:** MEDIUM
**Type:** architecture/efficiency
**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md` — EML-F008

---

## Problem Statement

Content can be routed to smaller/non-frontier models based on risk profiles for token parsimony. High-risk content should be rejected before reaching any model. Medium-risk content goes to a robust model with constrained output schema. Low-risk informational content can be handled by a smaller, cheaper model.

## Use Cases

1. **Web pre-screening:** Reject pages with strong prompt-injection markers before sending to a cheaper model
2. **Email triage:** Low-risk informational mail → small-model summarization; high-risk → robust model with constrained schema
3. **Forum/MoltBook content:** Pre-screen for hidden jailbreak text or adversarial content before routing to any model

## Output Schema

```json
{
  "content_risk": "medium",
  "small_model_safe": false,
  "requires_frontier_model": false,
  "requires_rule_based_processing": true,
  "requires_human_review": false
}
```

## Recommended Action

- Implement `risk.small_model_suitability` pack as part of the `risk.*` family
- Route content based on suitability scores before model selection
- Never send high-risk content directly to a small model without screening

## Notes

This is directly relevant to the Rosetta `small_model_suitability` scoring dimension in EML-F006.
