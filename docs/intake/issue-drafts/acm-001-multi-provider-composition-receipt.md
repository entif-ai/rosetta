# ACM-001: Multi-Provider Composition Receipt Format

## Issue

Even when downstream LLM vendors don't support composable prompt caches (no shared cache object across providers), Entif can simulate a composition layer by fanning out structured sub-queries to each provider, retrieving only scoped facts, and stitching results back together under a local provenance chain. The merged answer itself is a derived artifact that requires receipts, version references, and challengeability.

No explicit multi-provider composition protocol exists in the Rosetta/Entif corpus.

## Background

In the API-driven cache management dialogue (2026-04-11), the operator describes a multi-provider composition scenario: a benefits query ("What are my health benefits?") is enriched with user/employee metadata (company ID, insurance plan ID) and fanned out separately to medical, dental, life, and dismemberment insurance providers. Each provider returns structured facts. Entif composes the final answer from these scoped fragments.

This is distinct from the "single prompt cache reused across providers" problem. This is "one question triggers N provider calls whose results must be assembled."

The merged artifact has no defined provenance structure.

## Why This Matters

Without a composition receipt, the assembled answer is not challengeable. If a user disputes "Why did the system say I have a $500 deductible?" — was that from the medical provider? The dental provider? A hallucinated stitch? There is no trace.

Entif's receipt-law requires receipts for every durable mutation. Result composition is a durable mutation of state (the answer presented as authoritative).

## Scope

1. Define a `composition_receipt` schema with:
   - `composition_id`: unique identifier for this composition event
   - `components[]`: list of `{provider, subquery, response_ref, received_at, ttl, metadata}`
   - `synthesis_method`: enum — `direct-compose`, `ranked-merge`, `conflict-resolution`
   - `confidence_score`: float (0-1) — how confident the synthesis is given component agreement/disagreement
   - `persona_id`: who asked (rights domain context)
   - `entitled_fields`: which from the response were actually authorized for this persona
   - `composition_timestamp`
   - `signer`: Entif instance that performed the composition

2. The receipt must be signed by the Entif instance, not by any vendor.

3. Stale components: if any component's TTL has expired, the composition must be flagged `stale-components: true` and re-fetched or flagged for human review rather than served silently.

4. Conflict resolution: when two providers return conflicting information for the same field, the composition must record both and flag `conflict: true`. Silent winner-takes-all is prohibited.

## References

- Source: docs/chats/20260411 - Chat GPT - API-driven Cache Management.md (operator: "Based on this user's metadata object, which details can you fill in that will help in our composition of answers from multiple providers")
- Related: NOT LAME receipt-law; NOT LAME Provenance spine

## Labels

architecture, provenance, integration

## Status

doc-candidate
