# IDI-004: Multi-Provider Composition Requires Merged-Answer Provenance Schema

## Metadata

- **Type**: architecture
- **Status**: draft
- **Source doc**: `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- **Evidence**: "Once Entif fans out to medical, dental, life, disability, and local handbook sources, the merged answer itself becomes a derived artifact that needs receipts, version references, and challengeability."
- **Confidence**: high

## Problem

The benefits query example shows Entif fanning out structured sub-queries to multiple downstream providers (medical, dental, life, handbook), then composing a merged answer. Each sub-answer comes from a different provider with different:
- Provider-specific cache state
- Entitlements for that provider
- Source data freshness

The merged answer is a derived artifact that currently has no defined provenance schema. Without provenance for the merged result:
- No way to challenge which sub-answer contributed which part
- No audit trail for provider-level attribution
- No basis for partial invalidation (one provider updates, others don't)

## Required

A merged-answer provenance record that captures:
- Each sub-query: provider, query parameters, entitlements used, response reference
- Composition rule applied (how were sub-answers stitched?)
- Model used for composition (if a model synthesizes the merge)
- Rights domain at time of composition
- Challenge/appeal path for each sub-answer

## Connection to Rosetta

- `receipts-law`: Every durable mutation (including composition) requires receipts
- `source-episode`: Each sub-answer is a source episode; composition is a derived episode
- `tapestry`: The merged answer could be its own compiled tapestry with sub-tapestries as inputs

## TODO

- [ ] Define `MergedAnswerReceipt` schema
- [ ] Specify composition model requirements (when does a model synthesize vs. template fill?)
- [ ] Add sub-answer attribution to the receipt structure
- [ ] Define partial invalidation: what happens when one sub-source updates?
