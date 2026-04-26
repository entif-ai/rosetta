# APC-008: Multi-Provider Composition Needs Its Own Provenance Spine

**Status:** draft
**Priority:** high
**Type:** architecture
**Confidence:** HIGH

## Problem Statement

When Entif fans out simultaneous sub-queries to multiple external providers (medical, dental, life, disability, handbook), the merged answer is a **derived artifact** — not a direct response from any single source.

This derived artifact needs its own provenance tracking that is distinct from single-provider provenance.

## What a Multi-Provider Composition Provenance Record Must Contain

For each composed answer, the provenance record must include:

1. **Sub-query receipts**: What exact sub-query was sent to each provider, with what normalized user metadata
2. **Provider response references**: Version/timestamp of each provider's response at query time
3. **Composition logic**: How the sub-responses were merged (the prompt/instruction given to the composer)
4. **Source attribution**: Which part of the final answer came from which provider
5. **Challengeability path**: How to trace back any part of the composed answer to the original sub-source
6. **Freshness**: When each sub-source was last verified/refreshed

## Why This Is Distinct from Single-Provider Provenance

Single-provider provenance tracks: prompt → model → response → receipt.

Multi-provider composition provenance additionally tracks:
- The normalization step (user metadata → provider-specific schema)
- The dispatch fan-out (one request → N concurrent sub-requests)
- The merge/recomposition step (N responses → one answer)
- The rights-checking step at each sub-provider call

This is a separate engineering concern that is not solved by applying single-provider receipts to each sub-call.

## The Benefits Example (from Source)

> "Based on this user's metadata object, which details can you fill in that will help in our composition of answers from multiple providers to the user's query?"

Entif's on-prem box queries multiple individual prompt caches (medical, dental, life, disability) with user metadata enriched per provider. Each provider returns scoped facts. Entif composes the final answer.

## Source

`docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` (ChatGPT conversation, 4/11/2026), second response block ("4. Multi-provider composition needs its own provenance spine")

## Requirements

- Entif's provenance layer must support hierarchical/compound receipts (receipt of receipt)
- The composition receipt must be a first-class artifact type alongside single-provider receipts
- Entif must track normalization/translation of user metadata per provider (what went out, not just what came back)
- Challengeability: any piece of the composed answer must be traceable to its origin sub-source

## See Also

- `APC-004` (Entif product category — provenance-native governance)
- `APC-007` (cache invalidation — composition sources also need invalidation)
- `receipts-ledger-schema.md` (existing)
- `entif-v0-018-signal-event-idempotency.md`
