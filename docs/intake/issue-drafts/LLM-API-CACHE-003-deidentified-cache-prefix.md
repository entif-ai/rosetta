# Issue Draft: LLM-API-CACHE-003 — De-Identified Cache Prefix Security Model

**Type:** privacy/security
**Confidence:** high
**Extraction source:** `docs/chats/20260411 - Chat GPT - LLM API Cache Management.md`
**Extraction date:** 2026-06-05

## Problem Statement

A shared cache prefix can become a data leak vector if it contains raw proprietary/entity-specific/PII data. The LLM API cache management dialogue establishes that only "normalized, anonymized, policy-approved material" belongs in a shared cache prefix, but this rule is not encoded in any formal security model or implementation.

## Evidence

- "the shared shard must be scrubbed before it ever becomes reusable" (source: 20260411 chat)
- "the vendor-facing cache only ever holds the de-identified, normalized, policy-approved prefix" (source: 20260411 chat)
- Cache domain key includes de-identification schema version (source: 20260411 chat)

## Proposed Resolution

1. Define the de-identification layer as a pre-cache sanitization step
2. Formalize the cache domain key schema: `tenant/workspace + authz scope hash + data classification + policy version + model family + region + prompt-template version + de-identification schema version`
3. Define what constitutes "scrubbed" material: entity-specific data, PII, proprietary information replaced with normalized/placeholder values
4. Specify the exception path: if de-identification is not possible, route to stricter cache domain or bypass cache entirely
5. Add audit logging for cache entries by de-identification schema version

## Labels

privacy, cache-strategy, anonymization, ABAC, docs-intelligence

## Depends On

LLM-API-CACHE-001 (vendor cache strategy), NOT LAME PRD (privacy section)
