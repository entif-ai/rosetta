# APC-001: OpenAI Prompt Caching Has No Shareable Cache ID Primitive

**Status:** draft
**Priority:** high
**Type:** technical/research
**Confidence:** HIGH

## Problem Statement

OpenAI's prompt caching does not expose any user-managed shared cache object or cache ID. The caching mechanism is:

- **Automatic** for prompts ≥1024 tokens, with exact prefix matching required for cache hits
- **`prompt_cache_key`** improves routing stickiness but is not a portable cache handle — it affects which cache partition a request lands in, not a shareable artifact
- **Org-scoped**: prompt caches are shared within a single API organization but **never across organizations**
- **ChatGPT Enterprise/Business workspace membership is completely separate** from API Platform organization membership — shared seat access does not imply shared API cache
- **No named cache artifact**: OpenAI provides org-scoped implicit prefix matching, not a cache object store

## Implication for Entif

Entif cannot leverage OpenAI's cache as a shareable cross-seat resource using a cache ID. The workaround is:

1. Centralize all relevant calls under one API organization boundary
2. Use stable static prefixes (SOUL.md, AGENTS.md, SKILL.md content must be identical across seats for cache reuse)
3. Use `prompt_cache_key` per shared corpus/class of agent to improve routing stickiness
4. Accept that ChatGPT seat membership ≠ API cache sharing

## Source

`docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` (ChatGPT conversation, 4/11/2026)

## References

- [Prompt caching | OpenAI API](https://developers.openai.com/api/docs/guides/prompt-caching)
- [OpenAI Help Center - ChatGPT Enterprise vs API org](https://help.openai.com/en/articles/9047883-im-a-member-of-my-companys-chatgpt-enterprise-workspace-do-i-automatically-get-access-to-our-api-platform-organisation-too)

## Requirements

- Entif should NOT promise OpenAI cross-seat cache sharing via cache ID (does not exist)
- Entif SHOULD document the org-scoped workaround for OpenAI enterprise customers
- OpenAI extended caching: up to 24 hours available on supported models; standard retention 5–10 min, up to 1 hour

## See Also

- `YAAC-005-shared-caching-architecture.md` (tangentially related)
- `APC-002` (Anthropic cache isolation)
- `APC-003` (Google Gemini/Vertex cache resources)
