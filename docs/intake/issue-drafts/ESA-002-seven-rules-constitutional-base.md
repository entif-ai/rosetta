# ESA-002: Adopt 7 Rules as Entif constitutional base

**Type:** docs-intelligence  
**Draft or Existing Issue:** draft  
**Labels:** entif-governance, constitutional  
**Depends On:** —  
**Evidence:** `docs/chats/20260226 - Chat GPT - Entif.AI Systems Architecture Synthesis.md`

## Summary

Adopt the 7-rule non-contradiction framework as the Entif constitutional base governing all system behavior, decision-making, and architectural evolution.

## The 7 Rules

1. **Meaning is an artifact.** If it isn't serialized (tile), it isn't trusted.
2. **Raw signals and derived claims must be separable and traceable.** Meaning and interpretation are dissociable.
3. **All side effects are gated.** Parse-Only default; high-impact actions require approvals.
4. **Every compute step emits receipts.** "Nothing happens off-ledger."
5. **Cheap-first cognition.** Retrieve broadly, prune aggressively, synthesize deeply only then.
6. **No hidden costs.** Budgets, caching, routing, and context discipline are first-class.
7. **Security posture scales with autonomy.** Trust tier determines required controls and blast-radius limits.

## Rationale

These 7 rules emerged from a non-conspiratorial pragmatic synthesis of 12+ source documents. They function as a constitutional compact: rules that prevent self-contradiction across all Entif subsystems.

Rule 1–2 establish the epistemic foundation (meaning as artifact, signals vs. claims).  
Rule 3 establishes the action governance (parse-only default).  
Rule 4 establishes the audit trail requirement (receipts).  
Rule 5 establishes the cognitive economics (cheap-first).  
Rule 6 establishes resource transparency (no hidden costs).  
Rule 7 establishes the trust-scaled security model.

## Recommended Action

1. Codify all 7 rules in Entif v0 governance documentation
2. Map each rule to specific implementation components (write admission gate, trust tiers, memory-sovereignty map)
3. Create testable checkpoints for each rule in the adapter certification harness
4. Reference in all architectural decision records

## Status

Open.
