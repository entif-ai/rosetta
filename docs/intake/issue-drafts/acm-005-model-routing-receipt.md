# ACM-005: Model Routing Receipt Schema for Weak-to-Strong Handoffs

## Issue

Entif is described as a semantic cache router that can route questions to the cheapest model capable of resolving them — "weak-to-strong generalization on an agentic swarm level." When a cheap model triages (decides the question is simple enough to answer locally or with a lightweight model) and a stronger model is escalated to resolve, the handoff rationale must be inspectable.

The API-driven cache management dialogue explicitly flags this as a risk: "If a cheap model triages and a strong model resolves, the handoff rationale needs to be inspectable. Otherwise you just built a fancier black box with better invoices."

No `model_routing_receipt` schema exists in any Rosetta/Entif document.

## Why This Matters

Without routing receipts, Entif's model selection is a black box. When a user asks why their question was routed to GPT-4o instead of GPT-4o-mini, there's no answer. When a model-selection failure leads to a wrong answer, there's no way to audit whether the routing layer made the right call. This defeats the accountability requirement of a provenance-native system.

## Scope

1. Define a `model_routing_receipt` schema:
   ```
   {
     "routing_id": UUID,
     "question_id": UUID,          // reference to the original query
     "triage_model": string,       // model used for triage/classification
     "triage_signal": object,      // {entropy, confidence, rule_hit, escalate: bool}
     "triage_timestamp": ISO8601,
     "escalation_reason": string,  // human-readable why escalation happened
     "resolution_model": string,  // model used for final answer
     "resolution_ref": string,    // pointer to resolution receipt or artifact
     "routing_policy_version": string,  // which routing policy was applied
     "total_tokens": number,
     "cost_usd": number,
     "signer": Entif instance ID
   }
   ```

2. The `triage_signal` must include enough metadata to reconstruct why escalation happened: entropy score, confidence score, which rule fired (if rule-based), or which learned signal triggered escalation (if ML-based).

3. Routing receipts are immutable appends. No deletion, no in-place modification. Challenging a routing decision means adding a `dispute` field to the receipt, not rewriting it.

4. The NOT LAME provenance spine section must include `model_routing_receipt` as a first-class receipt type alongside `source_receipt`, `ingestion_receipt`, and `mutation_receipt`.

## References

- Source: docs/chats/20260411 - Chat GPT - API-driven Cache Management.md (weak-to-strong routing section)
- Related: receipt-law; NOT LAME provenance spine; NOT LAME write-admission gate

## Labels

provenance, routing, governance

## Status

doc-candidate
