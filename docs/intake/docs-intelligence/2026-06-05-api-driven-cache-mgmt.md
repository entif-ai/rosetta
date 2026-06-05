# DI Extraction: API-driven Cache Management

**Source:** `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
**Title:** API-driven Cache Management
**Date evidence:** 2026-04-11
**Authority tier:** chat
**Freshness:** current as of 2026-04-11
**Word count:** ~3500
**Extractor:** heartbeat subagent
**Extraction date:** 2026-06-05
**Issue prefix:** APC-XXX

---

## Source

- **Path:** `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- **Title:** API-driven Cache Management
- **Date evidence:** 2026-04-11
- **Authority tier:** chat
- **Freshness:** current as of 2026-04-11
- **Word count:** ~3500
- **Extractor:** heartbeat subagent
- **Extraction date:** 2026-06-05

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

A ChatGPT conversation (4/11/2026) between Crates (Entif) and an LLM covering two domains: (1) technical analysis of context/prompt caching primitives across OpenAI, Anthropic, and Google Gemini/Vertex AI — specifically whether cross-seat cache sharing is possible while retaining seat separation; (2) product/business synthesis positioning Entif as an "inference firewall + semantic cache router + provenance-native governance layer." The document also addresses go-to-market strategy ("sell before build," design partner pilots) and pushes back on unrealistic ARR projections. Key engineering challenges identified: compound cache key design, transliteration privacy leaks via join inference, cache poisoning from stale certainty, multi-provider composition provenance, and auditable weak-to-strong routing handoffs.

---

## Goals And Intent

- Determine whether cross-seat context cache sharing is possible across OpenAI, Anthropic, and Google Gemini while retaining seat-level authZ separation
- Synthesize Entif's product wedge as an enterprise inference firewall + semantic cache router + provenance engine
- Define cache architecture requirements for multi-agent orchestration on Entif's platform
- Identify go-to-market motion and realistic revenue trajectory
- Surface engineering dragons in the proposed cache + transliteration + composition architecture

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Compound cache key structure: `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash` | Conversation, "dragons" section | Context Fabric / Cache Orchestrator | HIGH | Naive intent-only keys fail when surface language overlaps across entitlement domains |
| Privacy budget discipline for transliteration: rules governing which field combinations may cross on-prem boundary | Conversation, "dragons" section | Privacy Membrane | HIGH | Join inference can reconstruct originals even when fields individually look anonymized |
| Invalidation tied to policy tile versioning, entitlement changes, and content hash changes | Conversation, "cache poisoning" section | Cache Orchestrator | HIGH | Fast-confident-wrong internal answer is worse than no answer |
| Multi-provider composition provenance spine: receipts for each sub-query, version refs at query time | Conversation, "dragons" section | Provenance Layer | HIGH | Distinct from single-provider provenance; composition provenance is separate engineering problem |
| Auditable weak-to-strong routing handoffs: routing decisions as first-class artifacts | Conversation, "dragons" section | Inference Router | HIGH | Non-auditable routing = "fancier black box with better invoices" |
| On-premise privacy membrane: strip/encrypt/hash private specifics, substitute normalized placeholders | Conversation, product synthesis section | Privacy Membrane | HIGH | Encrypt private blocks, substitute (e.g., soybeans→gidgets), return equivalent structure |
| ABAC/RBAC enforcement before cache lookup | Conversation, product synthesis section | Guard Layer | HIGH | Capability leases, not ambient authority |
| Deterministic context packaging keyed by content hash | Conversation, v0 spec references | Context Fabric | MEDIUM | Pack-based caching with activity-based TTL |
| Enterprise inference firewall: Guard as admission controller | Conversation, product synthesis section | Guard Layer | HIGH | Receipts for every durable inference action |
| GTM: design partner engagement, not "universal brain-governance engine" sale | Conversation, GTM synthesis section | Sales/Market | HIGH | Concrete workflow wedge first (e.g., handbook/benefits policy) |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | OpenAI response, "OpenAI" section | `openai`, `prompt-caching`, `cache-key`, `org-scope` | openai, prompt caching, enterprise architecture | technology | OpenAI prompt caching is automatic for prompts ≥1024 tokens with exact prefix matching; cache hits improved via `prompt_cache_key` for routing stickiness. Cache is org-scoped, not a named artifact. ChatGPT Enterprise/Business workspace membership is completely separate from API Platform org membership. | [Prompt caching \| OpenAI API](https://developers.openai.com/api/docs/guides/prompt-caching); [OpenAI Help Center](https://help.openai.com/en/articles/9047883-im-a-member-of-my-companys-chatgpt-enterprise-workspace-do-i-automatically-get-access-to-our-api-platform-organisation-too) | Do not conflate ChatGPT workspace membership with API org for cache sharing purposes | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | OpenAI response, cache retention | `openai`, `ttl`, `cache-retention` | openai, cache retention | technology | OpenAI in-memory cache retention: typically 5–10 min, up to 1 hour; 24-hour extended retention available for supported models. | [Prompt caching \| OpenAI API](https://developers.openai.com/api/docs/guides/prompt-caching) | Model selection and prefix stability design must account for TTL variations | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Anthropic response | `anthropic`, `workspace-isolation`, `cache-control` | anthropic, workspace isolation | technology | Anthropic prompt caching via `cache_control` field or explicit cache breakpoints. Feb 5, 2026: Anthropic moved from organization-level to **workspace-level isolation**. Caches isolated per workspace. Default: 5 min; 1-hour duration at additional cost. No named shared cache ID — still prefix-based via `cache_control`. | [Prompt caching - Claude API Docs](https://docs.claude.com/en/docs/build-with-claude/prompt-caching?via=onetts.com) | Claude workspace = the cache sharing boundary, not org; relevant for multi-agent seat architectures | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Gemini/Google response | `gemini`, `vertex-ai`, `named-cache`, `iam` | google, gemini, vertex, cache architecture | technology | Gemini Developer API has implicit caching (automatic on Gemini 2.5+, project-level, 24hr TTL) and explicit caching (named resources: `cachedContents/{id}`, full CRUD). Vertex AI context caches are project resources with names like `projects/PROJECT_NUMBER/locations/LOCATION/cachedContents/CACHE_ID`, governed by IAM. Vertex AI is the cleanest enterprise-grade option for cross-seat cache sharing with seat-level separation via service accounts. | [Context caching \| Gemini API](https://ai.google.dev/gemini-api/docs/caching); [Use a context cache \| Vertex AI](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-use); [Using Gemini API keys](https://ai.google.dev/gemini-api/docs/api-key) | For enterprise deployments, prefer Vertex AI over direct Gemini API for cache + IAM control | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "The architecture I'd recommend" | `architecture`, `inference-firewall`, `semantic-cache`, `provenance` | entif, architecture, product | decision | Recommended multi-provider architecture: (OpenAI) one API org + centralized gateway + stable static prefix + `prompt_cache_key`; (Anthropic) one Claude workspace + centralized gateway + stable `cache_control` placement; (Google) one shared Vertex AI project + explicit cache resources + service accounts per agent + IAM separation. Do NOT use human seats as unit of cache sharing. | Conversation, "The architecture I'd recommend" section | Implement provider-specific adapter patterns in Entif's inference router, each with appropriate cache primitive | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Product synthesis, second response | `inference-firewall`, `semantic-cache-router`, `provenance-engine`, `privacy-membrane` | entif, product positioning | decision | Entif's product category defined as three things braided: (1) inference firewall — Guard as admission controller, privacy membrane, ABAC/RBAC enforcement; (2) semantic cache router — Rosetta-native intent classification, deduplication, cache domain governance; (3) provenance-native governance layer — receipts, audit trail, immutable justification graph. | Conversation, product synthesis section | Ensure Rosetta's architecture supports these three roles as distinct but interoperable subsystems | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Company handbook example | `intent-classification`, `rights-domain`, `policy-tiles`, `local-resolution` | entif, cache architecture | technology | Handbook example defines the wedge workflow: classify intent locally → map to relevant policy tiles → verify user's entitlement domain → serve cached answer or compose from local structured sources → only escalate to external inference if ambiguity/synthesis burden warrants it. Implies intent classification is a required local (non-inference) operation. | Conversation, product synthesis section | Rosetta's refinery should support intent classification as a pre-inference gate | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Benefits composition example | `multi-provider-composition`, `structured-sub-queries`, `provenance-chain` | entif, multi-provider architecture | technology | Benefits example: Entif fans out structured sub-queries to medical, dental, life, disability, handbook providers; each returns scoped facts via Entif's normalized schema; Entif stitches results under a single local provenance chain. Simulates composition layer even where downstream vendors don't support composable prompt caches. Structured-data I/O (schema-driven inputs/outputs) is an assumed enabler. | Conversation, product synthesis section | Multi-provider composition requires normalized schema contracts and a composition provenance spine | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "Five dragons" section, point 1 | `compound-cache-key`, `rights-domain`, `intent-domain`, `cache-poisoning` | entif, cache architecture | risk | Cache key cannot be just semantic intent — must be compound: `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash`. Naive equivalence fails when User A is entitled to Plan A, User B to Plan B, and surface language overlaps. This is the cache constitution requirement. Implies typed reason codes: `CACHE_DOMAIN_MISMATCH`, `ABAC_CONDITION_FAILED`, `CLEARANCE_INSUFFICIENT`, `DATA_RESIDENCY_VIOLATION`. | Conversation, "dragons" section | Design compound cache key schema in Context Fabric spec before implementation | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "Five dragons" section, point 2 | `transliteration`, `privacy-budget`, `join-inference`, `privacy-membrane` | entif, privacy, transliteration | risk | Replacing soybeans → gidgets is insufficient if correlated fields travel together (crop type + geography + market timing). Join inference can reconstruct originals. Entif needs not just redaction but **privacy budget discipline** and rules for what field combinations may cross the on-prem boundary. | Conversation, "dragons" section | Define privacy budget rules and field combination constraints in Privacy Membrane spec | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "Five dragons" section, point 3 | `cache-invalidation`, `stale-certainty`, `policy-version`, `tile-invalidation` | entif, cache invalidation | risk | Cache poisoning from stale certainty is the most dangerous failure mode: fast, confident, wrong internal answer is worse than "no answer." Handbook example only works if invalidation is tied to superseding tiles, policy versions, and entitlement changes. Reinforces v0 spec requirements: activity-based TTL, policy-version-keyed cache domains, explicit invalidation on content hash changes. | Conversation, "dragons" section | Invalidation is a first-class concern; tile/version-based invalidation must be in v1 scope | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "Five dragons" section, point 4 | `composition-provenance`, `multi-provider`, `receipt-chaining`, `derived-artifact` | entif, provenance, multi-provider | risk | Multi-provider composition needs its own provenance spine. Once Entif fans out to multiple sources simultaneously, the merged answer is a derived artifact needing receipts referencing each sub-query, version references at query time, and challengeability. Composition provenance is a separate engineering problem from single-provider provenance. | Conversation, "dragons" section | Design composition provenance as a separate spec from single-provider receipt format | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "Five dragons" section, point 5 | `weak-to-strong-routing`, `auditable-handoffs`, `routing-log` | entif, inference routing | risk | Weak-to-strong routing must be auditable. If a cheap model triages and a stronger model resolves, the handoff rationale must be inspectable. Non-auditable routing = "fancier black box with better invoices." Routing decisions must be logged as first-class artifacts. | Conversation, "dragons" section | Routing decision logging as a first-class requirement in the Inference Router spec | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Third response, business synthesis | `gtm`, `sell-before-build`, `design-partner`, `arr` | entif, go-to-market | decision | Sell-before-build GTM is valid given existing artifact depth. Recommended three-track parallel approach: (1) belief pack: 10-12 slide deck, 1-page exec memo, security posture, design partner offer, ROI frame; (2) commercial motion: paid design partner, fixed term, architecture workshop + pilot scoping; (3) build track: MVP that serves the sales motion. The specific sale to make: "a design-partner engagement around governed enterprise AI routing, privacy membrane, semantic caching, and auditable orchestration" — NOT the full universal brain-governance engine pitch. | Conversation, GTM synthesis section | Align build priorities with demo-ability for the specific workflow wedge | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Third response, revenue projection | `arr`, `enterprise-sales`, `regulated-industries` | entif, business | risk | $100M ARR by month six is explicitly challenged as "champagne hallucination." Enterprise sales cycles are slow; regulated industries (the best buyers) are also the most rigorous in proof requirements. Category thesis affirmed: plausible $100M+ ARR category winner, but requires dominating a specific wedge first with measurable proof. Recommended GTM: prove in one constrained workflow (e.g., handbook/benefits), then scale. | Conversation, revenue synthesis section | Align revenue projections with enterprise sales cycle realities; first paid pilot before scaling GTM | HIGH |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Fourth response, network/sales | `sales-network`, `warm-intro`, `design-partner` | entif, sales | decision | The sales network is characterized as existing and warm: ex-colleagues who became C-level/SVPs at Fortune 100s and 9-figure ARR startups. Sales motion is "warm-intro detonation," not cold prospecting. "Sell before build" validated: "Pwc, Gartner, McKinsey — NONE of them build it before they sell it, if the idea's strong enough." | Conversation, fourth response | Leverage warm network for design partner engagements before broad GTM | MEDIUM |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Second response, value proposition | `token-reduction`, `privacy-reduction`, `governance`, `inference-discipline` | entif, value proposition | decision | The value proposition articulation: "fewer calls, narrower payloads, stricter cache domains, more local resolution, expensive inference only where ambiguity survives normalization." The stronger thesis: "not just reducing token burn — shrinking exposed surface area." This framing is the commercial wedge for regulated industries. | Conversation, product synthesis section | Prioritize privacy surface reduction as the primary value prop, cost reduction as secondary | HIGH |

---

## Components And Technologies

- **Provider-specific caching primitives:** OpenAI prompt caching (org-scoped, automatic, prefix-based), Anthropic `cache_control` (workspace-isolated, 5min default/1hr optional), Google Gemini implicit caching (project-level, 24hr TTL) and explicit caching (named `cachedContents/{id}` resources), Vertex AI context caches (IAM-governed project resources)
- **Privacy membrane components:** input stripping/anonymization, transliteration (e.g., soybeans→gidgets), field-level encryption/hashing, privacy budget discipline
- **Context Fabric / Cache Orchestrator:** content-hash-keyed packs, compound cache keys, TTL management, invalidation pipelines, audit and spend analytics
- **Inference Router:** intent classification, provider adapters, weak-to-strong handoff, routing decision logging
- **Guard Layer:** ABAC/RBAC enforcement, admission controller, capability leases
- **Provenance spine:** receipts, immutable audit trail, composition provenance for multi-provider answers

---

## Conceptual Claims

- The real cache sharing boundary is API org (OpenAI), workspace (Anthropic), or project (Google) — NOT human seat membership
- Entif's box becomes "the place where meaning is normalized, permissions are enforced, caches are segmented, prompts are de-bloated, and expensive reasoning is only bought when the local stack cannot close the loop itself"
- "AI governance and reasoning infrastructure for enterprises that want the value of LLMs without surrendering privacy, spend discipline, access control, or auditability" is the product category
- For regulated enterprises, the primary value is privacy surface reduction, not token cost reduction (though both apply)
- Weak-to-strong model routing without auditable handoffs produces a "fancier black box with better invoices"
- Multi-provider composition provenance is a distinct engineering problem from single-provider provenance
- "Sell before build" is a valid GTM strategy when artifact depth is sufficient; "build one viciously crisp demo" is the parallel activity

---

## Dependencies And Sequencing

- Privacy Membrane (Guard-gated input processing) must be in place before Cache Orchestrator can safely cache derived outputs
- Compound cache key design must be finalized before Cache Orchestrator implementation
- Rosetta intent classification must be operational before the semantic cache router can route efficiently
- Composition provenance spine requires single-provider receipt format to be already defined
- Design partner engagement should precede broad GTM to sharpen product scope

---

## Contradictions Or Supersession

- None identified in this document. The v0 spec's context fabric/cache requirements align with the findings in this conversation. The product positioning (inference firewall + semantic cache router + provenance engine) is consistent with prior Entif/ Rosetta architecture docs.

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| APC-CACHE-001: Compound cache key schema for Entif Context Fabric | implementation | `docs/intake/issue-drafts/apc-cache-001-compound-cache-key-schema.md` | `cache`, `context-fabric`, `rights`, `implementation` | — | `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash` identified as required cache key structure; naive intent-only keys fail across entitlement domains |
| APC-CACHE-002: Privacy budget discipline for transliteration layer | implementation | `docs/intake/issue-drafts/apc-cache-002-privacy-budget-transliteration.md` | `privacy`, `transliteration`, `privacy-membrane` | — | Join inference can reconstruct originals even when individual fields are anonymized; rules for field combination crossing on-prem boundary needed |
| APC-CACHE-003: Tile/version-based cache invalidation as first-class mechanism | implementation | `docs/intake/issue-drafts/apc-cache-003-tile-version-invalidation.md` | `cache`, `invalidation`, `tapestry`, `provenance` | — | Fast-confident-wrong internal answer is the most dangerous failure mode; invalidation must be tied to superseding tiles, policy versions, entitlement changes |
| APC-CACHE-004: Multi-provider composition provenance spine | implementation | `docs/intake/issue-drafts/apc-cache-004-multi-provider-composition-provenance.md` | `provenance`, `multi-provider`, `composition`, `receipts` | APC-CACHE-003 | Derived artifacts from multi-provider fan-out need receipts referencing each sub-query, version references, and challengeability; distinct from single-provider provenance |
| APC-CACHE-005: Auditable weak-to-strong routing handoffs | implementation | `docs/intake/issue-drafts/apc-cache-005-auditable-weak-strong-routing.md` | `routing`, `inference-router`, `audit`, `weak-to-strong` | — | Handoff rationale between cheap triage and strong resolve models must be logged as first-class artifacts |
| APC-GTM-001: Design partner engagement package for governed enterprise AI routing | go-to-market | `docs/intake/issue-drafts/apc-gtm-001-design-partner-engagement.md` | `gtm`, `design-partner`, `sales` | — | Warm network exists; specific sale is "design-partner engagement around governed enterprise AI routing" not full platform pitch |

---

## Project Board Suggestions

- **Area:** Entif Product Architecture / Context Fabric / GTM
- **Cycle:** batch-3 (this doc)
- **Status:** new extraction
- **Blocked by:** Rosetta intent classification must be operational for semantic cache routing to work; Guard Layer must be in place for privacy membrane
- **Parallelization notes:** GTM track can run in parallel with build track; MVP should serve the sales motion (demo-ability of specific workflow wedge)

---

## Open Questions

- What is the exact schema for the compound cache key? Does `semantic_intent` use a specific embedding model or classification ontology?
- What privacy budget framework should Entif use for transliteration (differential privacy, k-anonymity, or custom)?
- How is composition provenance serialized and chained across multiple provider responses?
- What is the minimal viable demo workflow for the first design partner sale?
- Should weak-to-strong routing use a fixed policy or a learned model?
