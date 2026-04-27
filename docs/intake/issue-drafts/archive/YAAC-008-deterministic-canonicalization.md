# YAAC-008: Deterministic canonicalization + SHA-256 hashing

**Type:** docs-intelligence  
**Draft or Existing Issue:** draft  
**Labels:** canonicalization, sha256, cache-blocks  
**Depends On:** YAAC-007  
**Evidence:** `docs/chats/20260226 - Chat GPT - YT, Agents, Auth and Cache.md`

## Summary

Implement deterministic context block canonicalization rules per ROCK-3005-IAM Appendix A to ensure cache hit rate stability and safe cross-principal cache sharing by hash equality.

## Canonicalization Rules (MUST)

### Encoding
- UTF-8 only
- Normalize line endings to \n

### Whitespace
- Trim trailing whitespace on each line
- Collapse repeated blank lines to max 2 consecutive
- Do NOT reflow code or alter indentation within code fences

### Stable Wrappers
Wrap blocks with deterministic header/footer:
```
<<<BLOCK type=<TYPE> id=<STABLE_ID> version=<VER> sha256=<PAYLOAD_HASH>>>
<payload>
<<<END>>>
```
- Wrapper MUST be identical across all producers
- sha256 computed over payload ONLY (not wrapper) to prevent circularity

### Ordering
- Deterministic: sort by (type, stable_id) then by path for file-derived blocks
- Never randomize ordering
- Never order by "relevance score" unless deterministic + version-pinned

### Version Pinning
- Every canonicalizer exposes canon_version
- Include in wrapper
- Bump on rule changes

## SHA-256 Hash Fields

```json
{
  "payload_hash": "sha256(canonical_payload_bytes)",
  "block_hash": "sha256(canonical_wrapper + canonical_payload)",  // optional
  "pack_hash": "sha256(concat(block_hashes_in_order))"
}
```

iam.decision.constraints.cache.content_hashes[] stores payload_hash values.

## Block Identity Stable_id Format

| Type | Format |
| --- | --- |
| File | repo:file:<path>@<git_blob_sha> |
| Module | repo:module:<module_path>@<commit_sha> |
| Policy | policy:<policy_id>@<policy_version> |
| Public law | public:law:<jurisdiction>:<doc_id>@<effective_date> |
| Tenant policy | tenant:policy:<tenant_id>:<doc_id>@<revision> |

## 4-Layer Pack Convention

For tapestry/pack construction (stable layers first → maximize prefix caching):

- **Layer A (Global):** tool schemas, formatting rules, shared operating principles
- **Layer B (Tenant):** org policies and standards
- **Layer C (Domain/Engagement):** matter/repo/module-specific docs
- **Layer D (Ephemeral):** diffs, errors, user request

## Activity-Based TTL

For explicit caches (storage rent exists):
- Reset TTL on each authorized reuse within domain
- Expire aggressively on inactivity
- Defaults: 15 min default, 1 hr max

## Invalidation Triggers

Invalidate when:
- Source version changes (git_blob_sha changes, doc revision changes)
- Policy version changes for domain
- Classification label changes
- Vendor route changes (provider/project/region/account)

## Status

Open.
