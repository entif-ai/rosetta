# IDI-006: EnrichmentContext Policy Schema — Anonymization ≠ Authorization

## Metadata

- **Type**: policy/schema
- **Status**: draft
- **Source doc**: `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- **Evidence**: PII-enriched queries (insurance plan ID, employee metadata) used to customize sub-queries to downstream providers; anonymization alone is insufficient
- **Confidence**: medium

## Problem

The benefits query example shows Entif enriching outbound sub-queries with user-specific context (company ID, insurance plan ID, etc.) to get provider-specific filled responses. The question of whether these enrichment attributes are anonymized before being included in the prompt — and whether their inclusion is itself authorized — is not separated.

Anonymization (making values non-identifying) is different from authorization (permission to use the values in this context). EnrichmentContext must address both.

Example failure modes:
- Employee A's plan ID is anonymized to "PLAN_TYPE=BASIC" but this still differentiates from "PLAN_TYPE=PREMIUM" — discrimination risk
- The enrichment of a user's insurance tier into the prompt is done without an explicit policy check

## Required

An `EnrichmentContext` schema with:
- Explicit policy field: which policy authorized this enrichment?
- Classification of each enriched field: PII / quasi-PII / non-PII
- Anonymization method applied (if any): none / pseudonymization / k-anonymity / differential privacy
- Destination scope: which downstream providers may receive this field?
- Time-bounded: does this enrichment context expire with a session or policy version?

## Connection to Rosetta

- `guard-layer`: EnrichmentContext policy check should be a Guard-layer function
- `rights-scoped-retrieval`: Enrichment authorization is a rights-scoped operation
- `privacy-membrane`: EnrichmentContext is the structured form of the membrane's data handling

## TODO

- [ ] Define `EnrichmentContext` schema with policy, classification, anonymization method, destination scope, expiry
- [ ] Specify which Guard-layer function evaluates enrichment authorization
- [ ] Add enrichment policy to the rights domain tuple (related to IDI-001)
- [ ] Add test cases: unauthorized enrichment, expired enrichment context
