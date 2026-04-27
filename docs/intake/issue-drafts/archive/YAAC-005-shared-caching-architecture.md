# YAAC-005: Authorization-aware shared caching architecture

**Type:** docs-intelligence  
**Draft or Existing Issue:** draft  
**Labels:** shared-caching, rbac, abac, cache-domain  
**Depends On:** YAAC-007  
**Evidence:** `docs/chats/20260226 - Chat GPT - YT, Agents, Auth and Cache.md`

## Summary

Design a shared caching architecture where context blocks are content-addressable, policy-labeled, and safely shareable across authorized principals within a cache security domain, with activity-based TTL and economics controls.

## Core Concepts

### Cache Security Domain
`(tenant) × (classification) × (policy constraints) × (vendor account/project)`

- Inside a domain, reuse is safe if requesting principal is authorized for that data
- Cross-domain reuse: forbidden unless explicit "public corpus" designation

### Content-Addressable Context Blocks
```json
{
  "block_id": "H(canonical_bytes(block))",  // SHA-256
  "tenant_id": "<tenant>",
  "classification": "<label>",
  "labels": ["engagement_id", "jurisdiction", "doc_type"],
  "source_version": "<commit_hash or doc revision>",
  "expires_at": "<TTL>",
  "vendor_cache_handle": "<provider-specific handle>",
  "created_at": "<ts>",
  "last_accessed_at": "<ts>",
  "access_count": "<n>"
}
```

### Git Blob Hash Keying
- If file contents are identical across main branch and release candidate branches, same blob hash
- Cache by blob hash = automatically shared across all branches and engineers
- More correct than branch-based bookkeeping

## In-Flight Middleware Algorithm

For each request at prompt router:
1. Decompose prompt into (stable_prefix_blocks + volatile_tail)
2. For each stable block: compute block_id, consult Policy Engine: "Is principal authorized?"
3. Consult Cache Index in relevant security domain:
   - Valid cache exists → use cache handle/reference
   - Else → optionally create cache (if ROI-positive) or pass raw
4. Send to LLM with: cached references up front + volatile tail at end
5. Log: cached token hits, cost/savings estimate, block IDs (not raw content)

## Cache Classes

### Class A: Public, high-frequency corpora (cross-tenant OK)
- Tax codes, statutes, regulations
- Versioned by: jurisdiction + effective_date + source_url + revision_hash
- Examples: IRC § 199A, IRS regulations

### Class B: Tenant-wide shared policies
- HR policy, security policy, engineering standards
- Cache per tenant, longer TTL, proactive warming

### Class C: Engagement/matter-scoped documents
- Statements of work, discovery docs, client contracts
- Narrow domain: tenant + engagement_id + classification + ABAC

## Economics

Break-even formula (explicit cache storage rent vs cached input rate):
```
k > (N + S*t) / (N - H)
```
Where: N=normal $/Mtok, H=cached $/Mtok, S=storage $/Mtok-hour, k=reuses, t=hours

Example (Gemini 3 Pro long-context): 2+ reuses within 10 min for 1M-token prefix = explicit caching wins

## TTL / Invalidation Policy

Keep alive if:
- Referenced in last X minutes (sliding TTL)
- Referenced by any active PR (optional signal)
- Referenced by >Y unique users today (hot cache)

Kill if:
- No references in X minutes
- Branch/PR closed AND no other activity signal

## Status

Open.
