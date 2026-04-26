# APC-002: Anthropic Workspace-Level Cache Isolation — No Shared Cache ID Primitive

**Status:** draft
**Priority:** high
**Type:** technical/research
**Confidence:** HIGH

## Problem Statement

Anthropic's prompt caching works differently from OpenAI but shares the same fundamental limitation: there is no single shared cache ID that can be passed between seats.

Key facts:

- **Cache mechanism**: enabled via top-level `cache_control` field or explicit cache breakpoints on content blocks
- **Default cache lifetime**: 5 minutes; optional 1-hour cache at additional cost
- **Critical change (Feb 5, 2026)**: Anthropic moved from **organization-level isolation** to **workspace-level isolation**. Caches are now isolated per workspace, not per org.
- **Different organizations**: never share caches
- **Same workspace, different seats**: cache reuse possible with exact prefix match
- **Different workspaces within same org**: NO cache sharing after the Feb 2026 change
- **No named cache resource**: cache_control is a prefix-caching mechanism, not a shareable cache object store

## Implication for Entif

Entif cannot rely on a shared Anthropic cache ID across workspaces. The cache boundary is now the workspace. For cross-seat cache sharing:

1. All cooperating agents must be under the same Claude workspace
2. Stable `cache_control` placement in prompts is critical
3. Prefix stability is required for cache hit — dynamic content must be positioned after the cache breakpoint

## Source

`docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` (ChatGPT conversation, 4/11/2026)

## References

- [Prompt caching - Claude API Docs](https://docs.claude.com/en/docs/build-with-claude/prompt-caching?via=onetts.com)
- Anthropic pricing documentation (cache write/read billing)

## Requirements

- Entif should track the Feb 5, 2026 workspace isolation change — this is a breaking change from prior org-level behavior
- Cache lifetime is short (5 min default, 1 hr max) — Entif's TTL strategy must account for this
- No named cache artifact — Entif must manage prefix stability itself

## See Also

- `APC-001` (OpenAI cache isolation)
- `APC-003` (Google Gemini/Vertex — has actual named cache resources)
