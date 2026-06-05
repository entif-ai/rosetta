# Issue Draft: LLM-API-CACHE-005 — On-Premise Anonymization/Transliteration Implementation

**Type:** privacy, architecture
**Confidence:** high
**Extraction source:** `docs/chats/20260411 - Chat GPT - LLM API Cache Management.md`
**Extraction date:** 2026-06-05

## Problem Statement

The on-premise anonymization/transliteration layer is described as a core component of Entif's value proposition — an on-prem box that strips proprietary/entity-specific/PII data before inference and replaces it with normalized equivalents (e.g., dollars → quatloos). This is not yet implemented or formally specified in any Rosetta/Entif document.

## Evidence

- "on-premise box anonymizes/transliterates inputs before inference" (source: 20260411 chat)
- Example: "Instead of solving a problem of 'How many bushels of soybeans will $100 get me' this gets transliterated to 'How many quatloos of gidgets will 50000 credits purchase'" (source: 20260411 chat)
- "Entif's box then uses Rosetta to qualify the underlying intent of the request, deduplicates/unifies questions that essentially are asking for the same thing" (source: 20260411 chat)

## Proposed Resolution

1. Specify the on-premise box as a distinct architectural component (separate from Rosetta kernel, separate from inference gateway)
2. Define the transliteration schema: what transformations are applied? Dollar amounts? Company names? Product names? Entity IDs?
3. Define the reverse-transformation step: how is the answer re-personalized after inference?
4. Specify the trust boundary: the on-prem box must be tamper-evident; the vendor never sees raw data
5. Add the "quatloo pattern" as a canonical example in documentation
6. Align with privacy requirements in NOT LAME PRD and HIPAA compliance notes

## Labels

privacy, middleware, anonymization, entif, docs-intelligence

## Depends On

NOT LAME PRD (privacy section), Bootstrap (on-prem box component)
