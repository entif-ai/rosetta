# SCRU-001: Design Cache Orchestrator Architecture for Enterprise Shared Caching

**Type:** architecture  
**Status:** draft  
**Labels:** cache-orchestrator, enterprise, shared-cache, git-blob-hash, abac  
**Depends on:** —

---

## Context

The "Security, Caching and Rosetta Updates" conversation (2026-02-21) proposes a shared cache architecture keyed by git blob hash with ABAC policy domains and activity-based TTL. The architecture components are:

- **Git Event Listener**: watches commits/PRs, captures blob hashes and hotness signals
- **Pack Builder**: creates deterministic, token-bounded packs (4-layer: Global/Tenant/Domain/Ephemeral)
- **Cache Backend**: Vertex explicit/Implicit, OpenAI auto, Anthropic cache_control
- **MCP Server**: agents/IDEs request "give me the packs for this task" → returns cache references + small delta context
- **Telemetry**: logs cache-hit metrics (cachedContentTokenCount, usage.cached_tokens) and computes $saved

This is not yet in any Rosetta spec or implementation.

## Claim

Enterprise coding teams (e.g., 24 engineers on a 250k LOC monorepo) currently duplicate massive amounts of input tokens by sending identical system prompts, tool schemas, repo conventions, and unchanged file content repeatedly. A Cache Orchestrator keyed by git blob hash (automatic cross-branch deduplication) with ABAC enforcement (tenant × classification × policy) and activity-based TTL (sliding, configurable) can dramatically reduce this waste.

## Architecture Components

### Git Event Listener
- Watch: git commit events, PR open/close/merge events
- Extract: blob hashes (SHA-1) for all files in changeset
- Signals: "hotness" (reference count across recent commits), branch membership
- Output: blob hash + hotness → Pack Builder or Cache Invalidation Handler

### Pack Builder
- Deterministic composition: sort files by path, stable wrappers, no non-determinism
- Token budgets per layer (e.g., Layer A Global ≤ 80k tokens)
- Canonicalization: UTF-8, normalize \n, trim trailing, collapse blanks to 2 max, deterministic header/footer with canon_version
- Output: rosetta.tapestry (CID-stable, content-addressed) referencing block CIDs

### Cache Backend
- Vertex explicit caching: create with cache storage rent; reuse with cached input pricing ($0.2/Mtok ≤200K; $0.4/Mtok >200K)
- Vertex implicit caching: enabled by default (effective May 8 2025); opportunistic, no storage rent
- OpenAI: automatic prefix caching on prompts >1024 tokens; 128-token increments; usage.cached_tokens
- Anthropic: cache_control opt-in; 5-min default; 1-hour paid; KV + hash storage
- Provider-aware: different semantics require different integration patterns

### MCP Server Interface
- Request: `{ task_context, repo_id, branch, principal_id, wanted_pack_layers }`
- Response: `{ tapestry_ref, cache_handle_refs, missing_block_cids[], estimated_savings }`
- Cache reuse decision: Guard evaluates (principal authorized for cache domain? content hashes match?)

### Telemetry
- Required fields: provider, usage.input_tokens, usage.output_tokens, usage.cached_input_tokens, latency_ms, cost_estimated_usd, cache_hit
- Audit: every cache reuse emits rosetta.receipt + rosetta.evaluation

## Key Design Decisions

1. **Key by git blob hash, not branch**: identical file content across branches = same cache entry automatically
2. **Activity-based TTL**: sliding window reset on reuse; aggressive expiry on inactivity (default 15min, max 1hr)
3. **4-layer pack convention**: stable layers first (Global → Tenant → Domain → Ephemeral) to maximize provider prefix caching
4. **Cache domain = security boundary**: (tenant × classification × ABAC × vendor route); cross-domain forbidden unless PUBLIC_CORPUS
5. **No cross-tenant cache handles**: domain separation hard stop

## Break-even Economics

Explicit cache ROI formula: k > (N + S*t) / (N - H)
Where: N=normal input $/Mtok, H=cached input $/Mtok, S=storage $/Mtok-hour, t=hours alive, k=reuses
Example: Gemini 3 Pro long-context (N=4, H=0.4, S=4.5, t=0.1667h): ~2 reuses within 10 minutes = explicit caching wins

Warning: at $4.5/Mtok-hour, 1M tokens left alive 24h = $108/day. TTL discipline is not optional.

## Risks

- Cache side-channel leakage: latency differences, error behavior, metadata exposure → never expose cache-hit to end users; normalize latency; jitter
- Determinism violation: non-stable ordering or non-deterministic wrappers destroy cache hit-rate
- Provider semantic differences: OpenAI automatic vs Vertex explicit vs Anthropic opt-in require different integration patterns
- Public corpus poisoning: wrong statute version or malicious doc injection → require provenance, signed releases, immutable version IDs, supersedes graph

## Implementation Priority

1. **MVP (fastest ROI)**: Build Repo Global Pack (~20-80k tokens) deterministically; measure cache hit-rate via provider telemetry
2. **Phase 2**: Module packs keyed by (repo_id, commit, module_path, pack_version); blob packs keyed by git blob hash
3. **Phase 3**: Activity-based TTL enforcement; Guard integration for cache domain policy
4. **Phase 4**: Mesh/edge replication for public corpus packs

## References

- Source: docs/chats/20260221 - Chat GPT - Security, Caching and Rosetta Updates.md
- Break-even formula: conversation provides full derivation
- Provider pricing: Vertex pricing page (cached input $0.2/$0.4/Mtok; storage $4.5/Mtok-hour; implicit caching no storage cost)
- Related: Entif 2.0 Secure Architecture Companion (Guard Layer as PEP)
- Related: ROCK-3005-IAM (iam.decision, iam.cache_domain tiles)