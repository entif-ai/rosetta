# API-CACHE-006: Anthropic Workspace-level Cache Isolation Adapter Update

## Metadata

| Field | Value |
|---|---|
| Type | implementation |
| Status | draft |
| Labels | provider-adapters, anthropic, cache |
| Depends On | — |
| Evidence | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` Finding: "Anthropic's docs now say that, starting February 5, 2026, prompt caching uses workspace-level isolation instead of organization-level isolation. Caches are isolated per workspace" |

---

## Problem

Anthropic changed its prompt caching isolation model: as of February 5, 2026, cache isolation moved from organization-level to workspace-level. This is a breaking change for any Entif adapter that assumes org-scoped cache sharing.

**Before Feb 5, 2026**: Organization-level cache isolation — all users in the same Anthropic organization could share cache if prefixes matched exactly.

**After Feb 5, 2026**: Workspace-level cache isolation — caches are isolated per workspace; different workspaces within the same organization do NOT share caches; exact matching still required.

Entif's provider adapter for Anthropic must model this correctly: the cache boundary is now the Anthropic **workspace**, not the org.

---

## Scope

**In scope:**
- Update Anthropic provider adapter to model workspace as cache boundary
- Update documentation for Anthropic cache semantics
- Ensure Entif's context-fabric respects workspace isolation in its multi-dim cache key (API-CACHE-001 will incorporate workspace as part of rights_domain or as a separate dimension)
- Test plan: verify that two different Anthropic workspaces cannot share cache entries

**Out of scope:**
- Schema changes to multi-dim cache key (API-CACHE-001 handles that)
- Privacy budget changes (orthogonal)

---

## Key Decisions Required

1. **Workspace representation in multi-dim cache key**: is the Anthropic workspace part of `rights_domain`, or a separate dimension in the cache key?
2. **Cache_control behavior**: Anthropic prompt caching uses `cache_control` field on content blocks; does workspace isolation change how this field is used?
3. **TTL update**: Anthropic default cache lifetime is 5 minutes (1 hour at additional cost) — update Entif's TTL policy to match
4. **Fallback behavior**: if a user's workspace cannot be determined (e.g., API key not scoped to workspace), should the adapter fail-closed (no cache) or fall back to org-level heuristics?

---

## Additional Context

This finding comes from 2026-04-11, which is already after the February 5, 2026 effective date. The Anthropic docs explicitly document this change. Entif's adapter should have been updated by now — this issue is a catch-up for any deferred implementation.

---

## Relationship to Other Issues

- Depends on API-CACHE-001 (workspace will be part of multi-dim cache key)
- Orthogonal to API-CACHE-002 (privacy) and API-CACHE-003 (invalidation)

---

## Open Questions

- Does Anthropic's workspace isolation apply to all cache_control uses, or only to prompt caching? (i.e., is there still org-level caching for non-prompt-cache uses?)
- What is the migration path for existing cache entries that were created under org-level isolation? Are they still valid, or do they need to be invalidated?
- How does Anthropic's workspace isolation interact with multi-source composition? If Entif fans out to Anthropic and another provider, does Anthropic's cache respect workspace isolation while the other provider might not?