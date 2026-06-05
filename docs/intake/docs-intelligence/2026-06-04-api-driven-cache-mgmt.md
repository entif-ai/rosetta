# Extraction: API-driven Cache Management

**Source:** `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
**Date:** 2026-04-11 (exported 2026-04-11 06:10:41)
**Extracted by:** heartbeat subagent
**Extraction date:** 2026-06-04

---

## Source

- Path: `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- Title: API-driven Cache Management
- Date evidence: Created 4/11/2026 4:56:07, Updated 4/11/2026 6:02:55, Exported 4/11/2026 6:10:41
- Authority tier: chat-dialogue, product-vision, architecture-prose
- Freshness: 2026-04-11 — recent; 2 months old
- Word count: ~2,400 words of dialogue (~912 lines)
- Extractor: heartbeat subagent
- Extraction date: 2026-06-04

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

Two-part dialogue exploring cross-provider (OpenAI/Anthropic/Google) prompt caching semantics, shared-cache boundaries by API org/workspace/project, and the thesis that Entif can serve as an "enterprise inference firewall + semantic cache router + provenance-native governance layer." Proposes market positioning, parallel build/sell track, and design-partner commercial motion. Heavy on ROI framing for regulated enterprises (banks, healthcare, insurers).

---

## Goals And Intent

1. Understand shared-cache mechanics across OpenAI, Anthropic, and Google Gemini
2. Frame Entif's middleware position as privacy membrane, cache governor, semantic equalizer, and trust/replay layer
3. Make the commercial case: $100m ARR potential, design-partner motion, sell-before-build
4. Identify architectural gaps in cache invalidation, multi-provider composition, and rights-scoped cache keys

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Semantic equivalence cache keying: `intent × rights_domain × data_classification × policy_version × source_bundle_hash` | "Your cache key can't just be intent. It has to be something like: semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash" | context-fabric, cache-orchestrator | P0 | Existing reason codes already point at this shape; needs formalization |
| Privacy budget discipline for transliteration | "the residual structure can still betray the original if enough correlated fields travel together. That means Entif needs not only redaction but privacy budget discipline" | privacy-membrane, guard | P0 | Join-leakage risk; needs formal modeling |
| Cache invalidation tied to tile/policy supersession | "Your handbook example only works if invalidation is ruthlessly tied to superseding tiles, policy versions, and entitlement changes" | cache-orchestrator, tapestry | P0 | Currently missing explicit invalidation trigger model |
| Multi-provider composition provenance spine | "Once Entif fans out to medical, dental, life, disability, and local handbook sources, the merged answer itself becomes a derived artifact that needs receipts, version references, and challengeability" | provenance, context-fabric | P0 | Multi-source composition lacks receipt model |
| Weak-to-strong routing auditability | "If a cheap model triages and a stronger model resolves, the handoff rationale needs to be inspectable" | routing, audit-spine | P1 | Implicit but not designed |
| Design-partner commercial offer template | "sell: a design-partner engagement around governed enterprise AI routing, privacy membrane, semantic caching, and auditable orchestration" | sales, go-to-market | P1 | Needs artifact stack: deck, memo, ROI calculator |
| Provider-level prefix caching semantics for OpenAI/Anthropic/Gemini | Tables in dialogue documenting exact caching behavior per provider | docs-intelligence, provider-adapters | P2 | Already known but needs formal doc |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "OpenAI" section | openai, cache, prompt-caching, org-scope | openai, prompt-caching, enterprise | technology | OpenAI prompt caching is automatic for prompts ≥1024 tokens; cache hits require exact repeated prefix; `prompt_cache_key` improves routing stickiness but is not a portable cache handle | "OpenAI does not expose a user-managed shared cache object or cache ID. Prompt caches are not shared between organizations; only members of the same organization can access caches of identical prompts" | Document exact behavior; do not claim named cache artifact support | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "OpenAI" section | openai, cache, enterprise | openai, enterprise-workspace | technology | ChatGPT Enterprise/Business workspace is NOT the same as OpenAI API Platform organization; membership managed separately; enterprise workspace membership does not grant API org access for cache reuse | "A ChatGPT Enterprise/Business workspace is not the same thing as an API Platform organization. Membership is managed separately" | Explicitly model this boundary; do not conflate seat identity with API org | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "Anthropic" section | anthropic, cache, workspace-isolation | anthropic, claude-api, cache | technology | Anthropic now uses workspace-level isolation (effective February 5, 2026) instead of org-level; caches isolated per workspace; no cross-workspace shared cache ID; cache_control field enables prefix caching | "Anthropic's docs now say that, starting February 5, 2026, prompt caching uses workspace-level isolation instead of organization-level isolation" | Model workspace as the Anthropic cache boundary; update Entif adapter | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "Anthropic" section | anthropic, cache, ttl | anthropic, claude-api | technology | Anthropic default cache lifetime is 5 minutes; optional 1-hour cache duration at additional cost | "Default cache lifetime is 5 minutes, with an optional 1-hour cache duration at additional cost" | Factor this into TTL policy; do not assume 24h retention | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "Gemini / Google" section | gemini, cache, project-scope, vertex-ai | google, gemini, vertex-ai, cache | technology | Gemini implicit caching isolated at project level with 24h TTL; explicit caches are named resources (`cachedContents/{id}`) accessible via API key or Vertex project | "implicit in-memory caching is isolated at the project level and has a 24-hour TTL... Explicit caches are real named resources in the API. You create them, get a cache.name, and then reuse that via cached_content=cache.name" | Vertex AI is the cleanest enterprise shared-cache path; prefer explicit named caches | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "Gemini / Google" section | gemini, enterprise, vertex-ai, iam | google, vertex-ai, iam | technology | Vertex AI context caches are project resources with resource names like `projects/PROJECT_NUMBER/locations/LOCATION/cachedContents/CACHE_ID`; access governed by IAM at project or resource level | "Vertex AI access is governed by IAM at the project or resource level... create one cache in a shared project, grant the right principals or service accounts permission, let separate agents/users reference the same cachedContents/CACHE_ID" | Vertex AI + IAM is the reference architecture for enterprise shared cache | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "The architecture I'd recommend" | cache-architecture, middleware, multi-provider | cache-orchestrator, provider-adapters | decision | Recommended cache sharing architecture: OpenAI = one API org + centralized gateway + stable static prefix + same `prompt_cache_key` per shared corpus; Anthropic = one Claude workspace + centralized gateway + stable `cache_control`; Google = one shared project (preferably Vertex AI) + explicit cache resources + service accounts per agent + IAM | "OpenAI: one API org, centralized gateway, stable static prefix, same prompt_cache_key strategy per shared corpus/class of agent. Anthropic: one Claude workspace for the cooperating agents, centralized gateway, stable cache_control placement. Google: one shared project, preferably Vertex AI, explicit cache resources, service accounts per agent, IAM to keep privileges separated" | Encode as provider-adapter design pattern | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "The architecture I'd recommend" | privacy-membrane, anonymization, transliteration | privacy-membrane, guard | requirement | Entif's on-premise box acts as a privacy membrane: strips or transliterates sensitive specifics (e.g., soybeans → gidgets) before external inference calls; prevents proprietary/PII data from leaving on-prem | "local-first, Guard-gated, receipts-first, with a privacy membrane and spending controls as non-negotiables... encrypting the specifics of these private info blocks, using substitutions in some cases" | Design privacy-membrane as first-class Guard concern; needs formal anonymization schema | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "The architecture I'd recommend" | semantic-equalizer, intent-deduplication, normalization | context-fabric, semantic-routing | decision | Rosetta-native interpretation enables Entif to collapse "different wording, same underlying ask" into a single typed problem shape; deduplication/unification of semantically equivalent questions is a core value proposition | "Rosetta-native interpretation lets Entif collapse 'different wording, same underlying ask' into a single typed problem shape, instead of paying vendors to rediscover the same meaning over and over" | Prioritize intent-classification and semantic normalization as core feature; needs scoring model | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "where the dragons actually live" section | cache-key, rights-scoped, policy-aware | cache-orchestrator, rights-scoped-retrieval | issue-candidate | Semantic cache key must be multi-dimensional, not just intent: `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash`; intent-only keys fail when users with different entitlements ask semantically similar questions | "Your cache key can't just be intent. It has to be something like: semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash" | Design multi-dimensional cache key schema; document as ADR | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "where the dragons actually live" section | privacy-leakage, join-correlation, transliteration-risk | privacy-membrane, anonymization | risk | Transliteration (replacing soybeans with gidgets) can still leak via correlated fields traveling together; Entif needs privacy budget discipline and rules for what field combinations may leave on-prem boundary | "the residual structure can still betray the original if enough correlated fields travel together. That means Entif needs not only redaction but privacy budget discipline and rules for what combinations may leave the on-prem boundary" | Model privacy budget per field-combination; add join-correlation detection | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "where the dragons actually live" section | cache-invalidation, policy-tile, stale-answer | cache-orchestrator, tapestry | risk | Cache poisoning / stale certainty is the most dangerous failure mode: fast, confident, wrong internal answer if invalidation is not tied to superseding tiles, policy versions, entitlement changes | "Your handbook example only works if invalidation is ruthlessly tied to superseding tiles, policy versions, and entitlement changes. Otherwise you get the most dangerous failure mode of all: a fast, confident, wrong internal answer" | Design explicit invalidation triggers: tile supersession + policy version change + entitlement delta | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "where the dragons actually live" section | multi-provider-composition, provenance-spine | provenance, context-fabric | issue-candidate | Multi-provider composition (medical + dental + life + disability + handbook) needs its own provenance spine; merged answer is a derived artifact requiring receipts, version references, and challengeability | "Once Entif fans out to medical, dental, life, disability, and local handbook sources, the merged answer itself becomes a derived artifact that needs receipts, version references, and challengeability" | Design multi-source composition receipt model; not just individual source receipts | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "where the dragons actually live" section | weak-to-strong-routing, auditability | routing, audit-spine | issue-candidate | If a cheap model triages and a stronger model resolves, the handoff rationale must be inspectable; implicit routing is a governance liability | "If a cheap model triages and a stronger model resolves, the handoff rationale needs to be inspectable. Otherwise you just built a fancier black box with better invoices" | Design routing decision log; every escalation needs reason code | medium |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "The commercial angle" section | inference-cost-reduction, token-burn, enterprise-value | market-positioning, enterprise | decision | Entif's commercial angle: reduce token burn, shrink exposed surface area, enforce access control, improve auditability — exact inverse of vendor incentives (vendors want more seats, more calls, more tokens) | "Vendors want enterprises to think in terms of: more seats, more calls, more tokens, more context, more premium intelligence. Entif flips the table" | Position as vendor-aligned on cost/risk but adversarial on volume; frame as "enterprise inference firewall" | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "The commercial angle" section | enterprise-inference-firewall, semantic-cache-router, provenance-governance | product-positioning, three-product-braid | decision | Three-braid product: inference firewall + semantic cache router + provenance-native governance layer; the braid is the moat | "It smells like three products braided into one: inference firewall, semantic cache router, provenance-native governance layer. That braid is rare" | Name and defend this three-product positioning; each strand reinforces the others | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "Track 1: the belief pack" | go-to-market, artifact-stack, design-partner | sales, go-to-market | decision | Go-to-market needs three tracks: (1) belief pack (deck, executive memo, security posture, design-partner offer, ROI calculator); (2) commercial motion via warm network with design-partner offer (paid pilot, fixed term, architecture workshop, conversion path); (3) build track serving sales motion | "Track 1: the belief pack — 10 to 12 slide deck, 1-page executive memo, 1-page security/governance posture, 1-page design partner offer, 1-page ROI frame" | Produce these artifacts before next sales conversation | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "sell before build" section | sell-before-build, design-partner, pilot-motion | sales, commercial-motion | decision | Parallelize sell and build: not "wait for demo then sell" but "sell design-partner pilots while building MVP"; use build to sharpen sale, sale to constrain build | "The move is not 'build the whole cathedral, then pray.' The move is: Build one viciously crisp demo. Make the savings legible. Make the risk controls legible. Make the governance story legible" | Activate warm network now; design-partner offer is the right first transaction | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "First of all, leave that to the sales guys" | market-activation, warm-network, sales-partners | sales, network, ARR | decision | Market activation via warm network: ex-colleagues at C-level and SVPs who have written glowing references; need working demo/MVP to pair with sales partners who can close | "The network is already there. The references are already there. The credibility is already there" | Prioritize MVP bootstrap that makes the savings legible; demo is commercial ammunition | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "I want to be clear" | selling-before-building, pwc-gartner-mckinsey, artifact-selling | sales, strategy | decision | For a product with enough depth/architecture/risk posture on paper, market motion does not need to wait for demo; PwC/Gartner/McKinsey don't build before selling if idea is strong enough | "Pwc, Gartner, McKinsey — NONE of them build it before they sell it, if the idea's strong enough" | Activate parallel sell/build tracks immediately | high |

---

## Components And Technologies

- **Privacy membrane** — on-premise middleware that strips, anonymizes, or transliterates sensitive/PII data before external inference calls; not just redaction but structured substitution (e.g., soybeans → gidgets)
- **Semantic cache router** — intent-classification + rights-scoped cache keying + multi-provider composition + invalidation tied to tile/policy supersession
- **Inference firewall** — Guard-gated admission, ABAC/RBAC enforcement at cache lookup, spend telemetry, receipt-first execution
- **Provenance-native governance layer** — receipts for every durable action, multi-source composition receipts, challengeable answer chains
- **Provider adapters**: OpenAI (org-scoped prefix caching), Anthropic (workspace-isolated prefix caching, cache_control field), Google Vertex AI (IAM-governed named cache resources)
- **Artifact stack for go-to-market**: executive memo, 10-12 slide deck, security/governance posture one-pager, design-partner offer, ROI calculator

---

## Conceptual Claims

- Entif is an **enterprise inference firewall + semantic cache router + provenance-native governance layer** — three products braided; the braid is the moat
- **Shared cache across separate seats** is an API org/workspace/project feature, not a seat feature; real cache boundary is the provider boundary, not the human identity
- **Semantic equalization** (collapsing differently-worded same-intent questions into a single typed problem shape) is the core value-add over naive vendor inference
- **Privacy membrane** is more valuable than token burn reduction; clients want reduced exposed surface area, not just cost savings
- Enterprise sales cycle is "obese, procurement is slow, security review is a swamp" — $100m ARR by month six is champagne hallucination; real path is dominate one wedge first, prove measurable savings, then scale
- **Design-partner engagement** is the right first transaction: paid pilot, fixed term, architecture workshop + pilot scoping, conversion path into broader deployment
- Parallelize sell and build: "sell before full build, while building the minimum proof that derisks procurement and sharpens the pitch"
- First-mover advantage: "you are not early, you are late only if you keep this feast in the kitchen"
- Weak-to-strong generalization (cheap model triages → strong model resolves) needs auditable handoff rationale; implicit routing is a governance liability

---

## Dependencies And Sequencing

- `context-fabric` cache key schema must be designed before `cache-orchestrator` implementation (blocked by multi-dimensional key design)
- `privacy-membrane` design blocked by formal anonymization/transliteration schema and join-correlation detection model
- `multi-source-composition` receipt model blocked by Provenance Receipt spec (RRP content model)
- Go-to-market artifact stack (deck, memo, ROI calculator) is independent of build; can start immediately
- Design-partner commercial motion can proceed in parallel with MVP bootstrap

---

## Contradictions Or Supersession

- Current `context-fabric` work assumes cache key = content hash; this doc argues for multi-dimensional key: `intent × rights_domain × data_classification × policy_version × source_bundle_hash` — needs ADR to resolve
- The `cache-orchestrator` subsystem is named as a standalone product in the context-fabric docs but has not been formally specced as an independent component with its own interface contract

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| API-CACHE-001: Multi-dimensional cache key schema | spec-gap | `docs/intake/issue-drafts/API-CACHE-001-multi-dim-cache-key.md` | cache-orchestrator, rights-scoped, policy-aware | — | Cache key must be `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash`; intent-only keys fail for entitlement-differentiated queries |
| API-CACHE-002: Privacy budget discipline for transliteration | spec-gap | `docs/intake/issue-drafts/API-CACHE-002-privacy-budget-transliteration.md` | privacy-membrane, anonymization, join-correlation | — | Transliteration (soybeans→gidgets) can still leak via correlated fields; needs formal privacy budget model |
| API-CACHE-003: Cache invalidation triggers — tile supersession + policy version + entitlement delta | spec-gap | `docs/intake/issue-drafts/API-CACHE-003-cache-invalidation-triggers.md` | cache-orchestrator, tapestry, invalidation | API-CACHE-001 | Invalidation must be ruthlessly tied to superseding tiles, policy versions, entitlement changes; stale certainty is the most dangerous failure mode |
| API-CACHE-004: Multi-source composition provenance spine | spec-gap | `docs/intake/issue-drafts/API-CACHE-004-multi-source-composition-receipts.md` | provenance, context-fabric, multi-provider | — | When Entif fans out to multiple providers (medical, dental, handbook), merged answer needs its own receipt + version refs + challengeability |
| API-CACHE-005: Weak-to-strong routing audit log | spec-gap | `docs/intake/issue-drafts/API-CACHE-005-weak-strong-routing-audit.md` | routing, audit-spine, governance | — | Every model handoff (cheap triage → strong resolve) needs inspectable reason code; implicit routing is a governance liability |
| API-CACHE-006: Anthropic workspace-level cache isolation adapter update | implementation | `docs/intake/issue-drafts/API-CACHE-006-anthropic-workspace-isolation.md` | provider-adapters, anthropic, cache | — | Anthropic moved to workspace-level isolation (Feb 5, 2026); Entif adapter must model workspace as cache boundary, not org |

---

## Project Board Suggestions

- Area: context-fabric / cache-orchestrator
- Cycle: current (batch-3 active)
- Status: fresh extraction; issue drafts written
- Blocked by: API-CACHE-001 (multi-dim key schema) gates API-CACHE-003 (invalidation)
- Parallelization notes: go-to-market artifact stack is independent of build; activate in parallel

---

## Open Questions

- What is the formal schema for the multi-dimensional cache key? Is `semantic_intent` a typed intent classification or a vector similarity threshold?
- How is privacy budget modeled? Is it a numeric bound on mutual information leakage, or a rule-based field combination matrix?
- How does tile supersession trigger cache invalidation — is there a subscription model or a polling model?
- What is the format of a multi-source composition receipt? Is it a nested receipt bundle or a higher-order receipt over individual source receipts?
- What is the threshold for "cheap enough to triage locally vs. must escalate"? Is it deterministic or learned?