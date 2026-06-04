# PRDS-006: Non-Replay Counter / Nonce Store Architecture Missing

## Summary

The RRP content model includes a `nonce` field for replay protection on receipts, but no explicit nonce store architecture is specified. How are nonces generated, stored, and checked? What happens when the nonce store grows unboundedly? Is it durable? Is it scoped per-tenant?

## Problem

Receipt replay protection requires that each receipt carry a unique nonce that the system has never issued before. The synthesis mentions "non-replay counters" in the GuardDecisionToken discussion but the actual nonce store design is absent:

- How is nonce uniqueness guaranteed across concurrent issuances?
- Is the nonce store append-only (like receipts)?
- What is the TTL / pruning strategy?
- Is nonce check local or distributed (for multi-node deployments)?
- What is the nonce format? UUID? Monotonic counter? Cryptographic random?

## Evidence

- Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Section: "Unified decisions, decision 7"
- Quote: "RRP content model wins over generic receipts: `subjects`, `claims`, `digests`, `policy_refs`, `nonce`, `auth`, `sig`"
- Reference to "non-replay counters" in admission.ts discussion

## Criteria for Closing

- [ ] Nonce format defined (e.g., UUID v7 for time-ordering, or cryptographically random)
- [ ] Nonce issuance protocol defined (how `builtin.echo` and other tools acquire a nonce)
- [ ] Nonce store schema defined (SQLite table or equivalent)
- [ ] Nonce check protocol defined (how guard or verifier checks nonce freshness)
- [ ] Pruning/TTL strategy defined (nonces are immutable; what triggers removal?)
- [ ] Concurrency safety documented (how is uniqueness guaranteed under concurrent issuance?)

## Labels

receipts, non-replay, security, architecture

## Depends On

(none)

## Linked PR

`docs/intake/docs-intelligence/2026-06-04-entif-rosetta-prds-revisions-synthesis.md`
