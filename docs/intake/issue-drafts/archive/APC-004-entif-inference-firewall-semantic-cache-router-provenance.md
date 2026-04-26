# APC-004: Entif Product Category — "Inference Firewall + Semantic Cache Router + Provenance Engine"

**Status:** draft
**Priority:** high
**Type:** product/architecture
**Confidence:** HIGH

## Problem Statement

The conversation crystallizes Entif's product category as three things braided together:

1. **Inference firewall** — Guard as admission controller, privacy membrane, ABAC/RBAC enforcement, spending controls
2. **Semantic cache router** — Rosetta-native intent classification, deduplication of semantically equivalent queries, cache domain governance, invalidation tied to content hash
3. **Provenance-native governance layer** — receipts for every action, immutable audit trail, Tripwire pre-dispatch capture, challengeability

This is NOT a chatbot, NOT an "AI employee," NOT just middleware. It is a **control plane** between enterprise knowledge/workflows and external inference.

## Value Proposition (Direct Quote from Source)

> "Fewer calls, narrower payloads, stricter cache domains, more local resolution, expensive inference only where ambiguity survives normalization."

## Demonstrated Wedge: Company Handbook Example

A large fraction of enterprise questions don't need frontier model calls:

1. Classify intent locally (Rosetta)
2. Map to relevant policy tiles
3. Verify user's entitlement domain (ABAC)
4. Serve cached answer or compose from local structured sources
5. Only escalate to external inference if ambiguity/synthesis burden actually warrants it

**Metrics achievable**: lower latency, lower cost, better auditability — directly demonstrable to design partners.

## Demonstrated Wedge: Multi-Provider Benefits Composition

Even when downstream vendors don't support composable prompt caches, Entif can:

1. Fan out structured sub-queries to medical, dental, life, disability providers
2. Each provider returns scoped facts via Entif's normalized schema (strict API contracts, cryptographic auth)
3. Entif stitches results under a single local provenance chain
4. Clients never expose raw employee data to any vendor — Entif's box handles anonymization/transliteration first

## Strategic Framing (from Source)

> "Vendors want enterprises to think in terms of: more seats, more calls, more tokens, more context, more 'premium intelligence.' Entif flips the table and says: fewer calls, narrower payloads, stricter cache domains, more local resolution."

## Source

`docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` (ChatGPT conversation, 4/11/2026), second response block

## Requirements

- This product positioning should be canonized in Entif marketing/sales materials
- The three-part braid should map directly to Entif's technical architecture modules
- Design partner pitch should lead with the handbook/benefits example — measurable, demo-able, not vapor

## See Also

- `ESA-001-canonical-entif-one-liner.md`
- `entif-v0-001` through `entif-v0-020` series
- `YAAC-005-shared-caching-architecture.md`
- `SCRU-001-cache-orchestrator-architecture.md`
