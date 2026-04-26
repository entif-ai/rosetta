# APC-003: Google Gemini/Vertex AI — Closest Match to Named Cache Resources + IAM

**Status:** draft
**Priority:** high
**Type:** technical/research
**Confidence:** HIGH

## Problem Statement

Google's Gemini API is the closest of the three major providers to supporting cross-seat shared cache with seat-level separation. The model differs significantly from OpenAI and Anthropic.

### Gemini Developer API / AI Studio

- **Implicit caching**: automatically enabled on Gemini 2.5+ models; isolated at **project level**, 24-hour TTL. Any API key within the same Google Cloud project benefits from shared implicit cache.
- **Explicit caching**: creates real named cache resources via `cachedContents/{id}` with full CRUD API (create/get/list/update/delete). Reused via `cached_content=cache.name` parameter.
- **Sharing boundary**: project — all API keys tied to the same project can access the same implicit and explicit caches.
- **Named cache resource**: YES — Google provides the closest thing to "shareable cache ID" among the three providers.

### Vertex AI (Enterprise Route)

- Context caches are project resources: `projects/PROJECT_NUMBER/locations/LOCATION/cachedContents/CACHE_ID`
- Access governed by **IAM** at project or resource level — cleanest enterprise-grade model
- Separate agents/users can reference the same `cachedContents/CACHE_ID` via service accounts with IAM roles
- **This is the recommended path for Entif** — it gives named cache resources + IAM-controlled access + seat-level separation

## Implication for Entif

Vertex AI is the best answer to Crates's architecture question: "maintain separation of seats, but share a single context cache."

**Architecture:**
1. Create one (or more) cache resources in a shared Vertex project
2. Grant service accounts per agent/user via IAM
3. Each actor references the same `cachedContents/CACHE_ID` with their own credentials
4. IAM enforces what each seat can do; cache resource is shared

**Gemini Developer API** is a simpler alternative for smaller deployments but lacks IAM granularity.

## Source

`docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` (ChatGPT conversation, 4/11/2026)

## References

- [Context caching | Gemini API | Google AI for Developers](https://ai.google.dev/gemini-api/docs/caching)
- [Use a context cache | Vertex AI | Google Cloud Documentation](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-use)
- [Using Gemini API keys | Google AI for Developers](https://ai.google.dev/gemini-api/docs/api-key)
- [Vertex AI access control with IAM](https://docs.cloud.google.com/vertex-ai/docs/general/access-control)

## Requirements

- Entif should support Vertex AI as a first-class provider with explicit cache resource management
- Entif should expose Vertex-style IAM-aware cache access patterns in its provider adapter layer
- For Gemini Developer API: document the project-level implicit cache boundary as the sharing unit

## See Also

- `APC-001` (OpenAI — org-scoped implicit)
- `APC-002` (Anthropic — workspace-scoped prefix)
- `YAAC-005-shared-caching-architecture.md`
- `SCRU-001-cache-orchestrator-architecture.md`
