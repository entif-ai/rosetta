# Issue Draft: LLM-API-CACHE-001 — Vendor-Tiered Cache Strategy Missing from NOT LAME PRD

**Type:** spec-gap
**Confidence:** high
**Extraction source:** `docs/chats/20260411 - Chat GPT - LLM API Cache Management.md`
**Extraction date:** 2026-06-05

## Problem Statement

The NOT LAME PRD does not specify a vendor-tiered cache strategy. The LLM API cache management dialogue establishes that:

1. **OpenAI**: Automatic prefix caching ≥1024 tokens, no portable cache ID primitive. Same-org shared cache BENEFIT via prefix matching, but no shared cache handle.
2. **Anthropic**: cache_control breakpoints, 5-min default/1-hour option, exact matching, org-isolated. No portable cache ID.
3. **Google Gemini/Vertex**: Explicit cache resource (`cachedContents/{CACHE_ID}`), project-scoped IAM. Only vendor with true shared cache handle.

The PRD currently treats cache as a more uniform capability than it actually is.

## Evidence

- OpenAI: "the published API does not document a first-class cache resource you create, list, and hand around by cache ID" (source: 20260411 chat)
- Anthropic: "caches are isolated between organizations" (source: 20260411 chat)
- Gemini: "Gemini is the one that gets closest to your exact idea, because it exposes an explicit cache resource you can reference by name" (source: 20260411 chat)

## Proposed Resolution

1. Add a "Vendor Cache Primitives" section to NOT LAME PRD covering each provider's actual capabilities
2. Specify Entif's cache strategy as vendor-specific:
   - OpenAI/Anthropic: prefix-matching only, no shared handle
   - Gemini/Vertex: explicit cache resource, shared handle via IAM boundaries
3. Document that "shared cache ID" is a Gemini/Vertex-first concept; OpenAI/Anthropic require simulation via stable prefix composition
4. Add a cache strategy annex with vendor capability matrix

## Labels

cache-strategy, vendor-abstraction, docs-intelligence

## Depends On

NOT LAME PRD (primary spec)
