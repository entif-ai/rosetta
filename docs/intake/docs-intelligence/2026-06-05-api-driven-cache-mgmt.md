# Docs Intelligence Extraction — 20260411 - Chat GPT - API-driven Cache Management.md

## Source

- Path: `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- Title: API-driven Cache Management
- Date evidence: 2026-04-11 (chat export)
- Authority tier: Chat conversation (user + GPT-4 research)
- Freshness: Dated; vendor API docs cited may have shifted; treat provider semantics as directional not contractual
- Word count: ~4,500 (export)
- Extractor: heartbeat subagent
- Extraction date: 2026-06-05

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A ChatGPT conversation investigating LLM provider caching semantics (OpenAI, Anthropic, Gemini), concludes that cross-seat shared cache is not a native seat feature on any provider — it is an API org/workspace/project boundary feature. Evolves into a product thesis: Entif as an "inference firewall" + "semantic cache router" + "provenance-native governance layer." The conversation frames this as a enterprise product wedge that reduces token burn AND shrinks exposed privacy surface simultaneously. Closes with a sales strategy: parallelize market motion with MVP build, lead with a design-partner engagement offer, use warm rolodex not cold outreach.

## Goals And Intent

- Understand cross-seat context cache sharing feasibility for OpenAI, Anthropic, Gemini
- Determine if enterprise ChatGPT Business/Enterprise seats can share API prompt cache
- Explore Entif's positioning as middleware for enterprise inference governance and semantic caching
- Develop go-to-market strategy: sell-before-build, design-partner pilots, ROI legibility

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Cross-seat cache domain model | OpenAI=org, Anthropic=workspace (post-Feb 2026), Gemini=project | `context-fabric` | high | Cache boundary is org/workspace/project, NOT human seat |
| Provider-agnostic cache key schema | OpenAI=prefix+prompt_cache_key, Anthropic=cache_control breakpoints, Gemini=explicit named cachedContent | `context-fabric` | high | No universal cache ID primitive across all three providers |
| Privacy membrane for outbound prompts | Soybean→gidget transliteration example; PII stripping requirement | `privacy-membrane` | critical | Transliteration alone may leak via join attacks |
| Semantic deduplication before cache lookup | Rosetta-native intent classification to collapse "same question, different words" | `context-fabric` | high | Cache key must include intent vector, not surface form |
| Cache invalidation tied to policy tile versioning | Handbook example: superseded tiles invalidate cache | `context-fabric` | high | TTL alone insufficient; content hash + version required |
| ABAC/RBAC gating on cache domain access | Clearance insufficient, DATA_RESIDENCY_VIOLATION, CACHE_DOMAIN_MISMATCH reason codes | `guard-layer` | critical | Rights domain must be part of cache key tuple |
| Receipt for every cache hit and miss | Audit trail: what was served, when, to whom, from which domain | `receipts` | high | Downstream AI vendor receipts insufficient; Entif receipts needed |
|弱→strong routing auditability | If cheap model triages and strong model resolves, handoff rationale must be inspectable | `governance` | medium | Prevent opaque escalation from becoming unaccountable |
| Design partner commercial structure | Fixed-term paid pilot, architecture workshop, first implementation lane | `go-to-market` | high | Not SaaS subscription; design partner cohort structure |
| Parallel market + build motion | Three tracks: belief pack (deck+memo+ROI), commercial motion (warm rolodex), build (MVP as demo ammo) | `go-to-market` | high | Do not sequentialize |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | OpenAI section | `openai`, `cache`, `org-scope` | openai, caching, enterprise | technology | OpenAI prompt caching is automatic for prompts ≥1024 tokens, org-scoped, prefix-based with no named shared cache object. `prompt_cache_key` aids routing but is not a portable cache handle. ChatGPT Enterprise/Business workspace is NOT the same as API Platform org. | "OpenAI explicitly says prompt caches are not shared between organizations and that only members of the same organization can access caches of identical prompts." | Do not conflate ChatGPT seat membership with API cache entitlement. Centralize under one API org for cache reuse. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Anthropic section | `anthropic`, `cache`, `workspace-scope` | anthropic, caching, workspace | technology | Anthropic prompt caching uses workspace-level isolation (changed Feb 5, 2026), per-request prefix matching, controlled via `cache_control` field or explicit cache breakpoints. Default 5-min TTL; 1-hour at additional cost. No named shared cache ID. | "Different organizations never share caches, and exact matching is required." | One Claude workspace per cooperating agent cluster. No cross-workspace cache reuse. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Anthropic section | `anthropic`, `cache-control` | anthropic, caching | technology | Anthropic's cache is per-request, not a persistent object. Composition across multiple provider caches requires middleware fan-out and result stitching. | "Anthropic's native prompt caching is modeled. It is workspace-isolated prefix caching controlled via `cache_control`, not a named shared cache object." | Build middleware composition layer if multi-provider sub-query fan-out is required. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Gemini Developer API section | `gemini`, `cache`, `project-scope` | google, caching, vertex | technology | Gemini implicit caching is project-isolated (24h TTL). Explicit context caches are named resources (`cachedContents/{id}`) with create/get/list/update/delete API. Any API key tied to the same project has implicit cache access. | "Implicit in-memory caching is isolated at the project level and has a 24-hour TTL." | Use one shared GCP project for cooperating agents; prefer Vertex AI for enterprise IAM control. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Vertex AI section | `vertex-ai`, `cache`, `iam` | google, vertex, enterprise | technology | Vertex AI context caches are project resources with full IAM control. Named cache resource (`cachedContents/CACHE_ID`) + service accounts per agent + IAM = cleanest cross-agent cache sharing model. | "create one cache in a shared project, grant the right principals or service accounts permission, and let separate agents/users reference the same `cachedContents/CACHE_ID`" | Vertex AI is the reference architecture for Entif's GCP adapter. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Architecture section | `cache-key`, `rights-domain`, `policy-version` | cache-key, rights, context-fabric | requirement | Multi-agent semantic cache key must be: `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash`. Intent alone is insufficient — same question, different entitlements must produce different cache outcomes. | "Your cache key can't just be intent. It has to be something like: `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash`" | Add rights_domain and policy_version to cache key tuple in context-fabric design. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Privacy membrane section | `privacy-membrane`, `transliteration`, `join-attack` | privacy, security, inference | risk | Transliteration (soybeans→gidgets) alone does not guarantee privacy. Correlated fields traveling together can leak original values via join attacks. Privacy budget discipline and combination rules required. | "Replacing soybeans with gidgets is nice, but the residual structure can still betray the original if enough correlated fields travel together." | Add statistical disclosure control and column correlation analysis to the privacy membrane spec. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Cache invalidation section | `cache-invalidation`, `policy-tiles`, `stale-answer` | invalidation, correctness, context-fabric | risk | Company handbook example only works if invalidation is tightly coupled to superseding tiles, policy versions, entitlement changes. Stale confident wrong answers are the most dangerous failure mode. | "Otherwise you get the most dangerous failure mode of all: a fast, confident, wrong internal answer." | Build tile-version-tracking into invalidation pipeline; tie cache TTL to content hash + policy version. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Multi-provider composition section | `multi-provider`, `composition`, `provenance-spine` | architecture, integration, provenance | requirement | Once Entif fans out to multiple providers (medical, dental, life, handbook), the merged answer becomes a derived artifact requiring its own receipts, version references, and challengeability. | "Once Entif fans out to medical, dental, life, disability, and local handbook sources, the merged answer itself becomes a derived artifact that needs receipts." | Define merged-answer provenance schema; each sub-answer must carry source + entitlements metadata. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Weak-to-strong section | `weak-to-strong`, `routing`, `audit` | routing, governance, model-selection | risk | If a cheap model triages and a strong model resolves, the handoff rationale must be inspectable. Without audit, weak-to-strong becomes an unaccountable black box. | "If a cheap model triages and a stronger model resolves, the handoff rationale needs to be inspectable." | Document routing decision receipt structure; include model tier, input classification, and escalation trigger. | medium |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Entif product thesis section | `product-thesis`, `inference-firewall`, `semantic-cache` | entif, product, market-positioning | decision | Entif's product class is: inference firewall + semantic cache router + provenance-native governance layer. Not a chatbot, not middleware, not an AI employee. | "Entif is an enterprise inference firewall plus semantic cache router plus provenance engine." | Anchor all positioning and sales artifacts to this three-part definition. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Entif value proposition section | `value-proposition`, `privacy-surface`, `token-reduction` | entif, value, privacy | decision | The dual value proposition: reduces token burn AND shrinks exposed privacy surface simultaneously. Both matter; one without the other is an incomplete pitch. | "You're not just reducing token burn. You're shrinking exposed surface area. That matters more." | Lead sales conversations with both: cost reduction AND privacy/leakage reduction. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Enrichment context section | `enrichment-context`, `privacy-policy` | privacy, policy, inference | risk | Query enrichment using protected attributes (insurance plan ID, employee metadata) must have explicit policy controls. Anonymization ≠ policy compliance. | Implied in soybean→gidget example; "instead of orgs having to tune prompt engineering, caching, seat organization... they can offload this to Entif" | Define EnrichmentContext policy schema; separate anonymization from authorization. | medium |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Vendor incentive conflict section | `vendor-incentive`, `token-reduction`, `business-model` | market, business-model | risk | LLM vendors (OpenAI, Anthropic, Google) are structurally incentivized against the Entif thesis: they earn per token. Enterprise buyers who understand this will want an independent layer. | "the LLM platform vendors would really prefer if nobody did, since they get paid by the number of tokens their customers burn through." | Explicitly name this conflict in competitive positioning; it strengthens the independence narrative. | medium |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Commercial angle section | `commercial-angle`, `roi`, `design-partner` | sales, business, go-to-market | decision | Strongest sales angle: "We let regulated enterprises use frontier AI without exposing protected data, blowing governance, or paying vendor-tax on the same context over and over." | "Not: we solved enterprise AI. More like: we let regulated enterprises use frontier AI without exposing protected data." | Lead with regulated verticals (banking, healthcare, insurance); cite token savings + risk reduction. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Sales motion section | `sales-motion`, `warm-rolodex`, `design-partner` | sales, business, network | decision | Sales motion is warm-not-cold: harvest existing network of ex-colleagues now C-suite/SVPs. Offer: paid design partner, fixed-term, architecture workshop + pilot scoping. Commission structure for closers. | "You do not have a 'how would I ever reach buyers?' problem. You have a 'how do I package this so the right killer closes it fast?' problem." | Prioritize warm introductions over outbound; package design-partner offer with commission. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Build-sell parallelization section | `parallelization`, `mvp`, `demo-ammo` | engineering, sales, mvp | decision | Build track and market track run in parallel. MVP is not just a software milestone; it is demo ammunition and procurement sedative. v0 acceptance criteria = demo content. | "Those are not just engineering checks. They are demo ammunition and procurement sedatives." | Align engineering milestones with sales demo needs; treat v0 criteria as sales deliverables. | high |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Belt and suspenders section | `belt-and-suspenders`, `defense-in-depth` | security, architecture, resilience | decision | Inference firewall requires belt-and-suspenders: privacy membrane + rights-aware cache governor + semantic equalizer + trust/replay layer working simultaneously. | "privacy membrane... rights-aware cache governor... semantic equalizer... trust and replay layer." | Design each layer to fail safely in isolation; no single layer is sufficient alone. | medium |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Token burn framing section | `token-burn`, `context-waste`, `efficiency` | cost, context, efficiency | observation | Context waste is the primary cost driver in multi-agent orchestration. Static system prompts (HEARTBEAT.md, SOUL.md, AGENTS.md, SKILL.md) are repeatedly sent; caching helps but requires correct ordering and pruning. | "A significant amount is burned, for instance, in sending things like the same HEARTBEAT.md / SOUL.md / AGENTS.md / SKILL.md prompt copy, over and over, day in and day out." | Rosetta's static content ordering and session start context loading is directly relevant to this waste. | medium |
| 2026-04-11 | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` | Three-track go-to-market section | `three-tracks`, `belief-pack`, `commercial-motion`, `build-track` | sales, strategy, mvp | decision | Three parallel tracks: (1) belief pack: deck + exec memo + security posture + ROI frame; (2) commercial motion: warm network, design-partner offer; (3) build track: MVP as demo fuel for procurement. | Three distinct workstreams running simultaneously | Do not sequentialize market-then-build; run all three in parallel. | high |

## Components And Technologies

- **OpenAI Prompt Caching**: automatic for ≥1024 token prompts, org-scoped, prefix-based, `prompt_cache_key` for routing stickiness, 5-10min / 1hr / 24hr TTL depending on model
- **Anthropic Prompt Caching**: `cache_control` field, workspace-level isolation (Feb 2026 change), per-request prefix matching, 5min default / 1hr at extra cost
- **Gemini Implicit Caching**: project-scoped, 24h TTL, automatic on Gemini 2.5+
- **Gemini Explicit Caching**: named `cachedContents/{id}` resource, create/get/list/update/delete API, reusable across calls
- **Vertex AI Context Caches**: project resources with full IAM, `projects/PROJECT_NUMBER/locations/LOCATION/cachedContents/CACHE_ID`
- **Entif Context Fabric**: semantic deduplication, content-hash keyed packs, policy-aware cache domains, ABAC/RBAC gating
- **Rosetta**: intent classification, semantic equalization, provenance receipts, tile-version tracking

## Conceptual Claims

- Cross-seat shared cache is a API org/workspace/project boundary concept, NOT a human seat concept; "seat" is billing/admin, not cache boundary
- Entif is an "inference firewall": privacy membrane + rights-aware cache governor + semantic equalizer + trust/replay layer (four simultaneous functions)
- The strongest enterprise wedge is the combination of token cost reduction AND privacy surface reduction delivered together
- Join attacks can defeat field-by-field transliteration; statistical disclosure control required
- Weak-to-strong model routing requires auditable handoff receipts or it becomes unaccountable
- Vendor per-token billing creates structural conflict of interest with the Entif thesis; this is a feature not a bug for positioning
- "Sell before build" is viable because the architecture depth (v0 plan, Entif docs) already constitutes belief proof
- MVP criteria = demo ammunition = procurement sedatives; align engineering milestones to sales deliverables

## Dependencies And Sequencing

- `context-fabric`: depends on `rights-scoped-retrieval` and `receipts-law` from Rosetta core
- `privacy-membrane`: depends on `guard-layer` and structured PII classification; needs explicit EnrichmentContext policy schema
- `inference-firewall`: requires `guard-layer` as admission controller; `write-admission-gate` for any mutating inference calls
- Multi-provider composition provenance: requires `receipts-law` full implementation before multi-source answers can be certified
- Design partner pilots: should begin immediately, before full MVP completion; use current architecture docs as belief pack
- `semantic-deduplication`: depends on Rosetta's interpretation layer and tapesty compilation

## Contradictions Or Supersession

- Anthropic workspace-level isolation was changed Feb 5, 2026 (org-level → workspace-level). Any pre-2026 architecture assumptions about Anthropic cross-org cache sharing are now invalid.
- OpenAI ChatGPT Business/Enterprise workspace is NOT equivalent to API Platform org. Prior assumptions conflating these represent a documentation gap.
- The conversation frames Entif's cache governor role as novel and uncovered by existing vendor solutions. This is plausible but unsubstantiated; competitive landscape analysis needed.

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | :--- | :--- | :--- | :--- |
| IDI-001: Semantic cache key must encode rights domain, not just intent | architecture/spec-gap | `docs/intake/issue-drafts/idi-001-semantic-cache-key-rights-domain.md` | `context-fabric`, `cache`, `rights` | — | "Your cache key can't just be intent. It has to be something like: `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash`" |
| IDI-002: Transliteration alone insufficient for privacy membrane — join attack risk | security/privacy | `docs/intake/issue-drafts/idi-002-privacy-membrane-join-attack-risk.md` | `privacy-membrane`, `security`, `governance` | — | "the residual structure can still betray the original if enough correlated fields travel together" |
| IDI-003: Cache invalidation must be tied to policy tile versioning, not TTL alone | reliability/correctness | `docs/intake/issue-drafts/idi-003-cache-invalidation-tile-versioning.md` | `cache-invalidation`, `context-fabric`, `correctness` | — | "Otherwise you get the most dangerous failure mode of all: a fast, confident, wrong internal answer" |
| IDI-004: Multi-provider composition requires merged-answer provenance schema | architecture | `docs/intake/issue-drafts/idi-004-multi-provider-composition-provenance.md` | `provenance`, `multi-provider`, `context-fabric` | — | "Once Entif fans out to medical, dental, life, disability, and local handbook sources, the merged answer itself becomes a derived artifact" |
| IDI-005: Weak-to-strong routing requires auditable handoff receipt | governance | `docs/intake/issue-drafts/idi-005-weak-strong-routing-audit.md` | `routing`, `governance`, `audit` | — | "If a cheap model triages and a stronger model resolves, the handoff rationale needs to be inspectable" |
| IDI-006: EnrichmentContext policy schema — anonymization ≠ authorization | policy/schema | `docs/intake/issue-drafts/idi-006-enrichment-context-policy-schema.md` | `privacy`, `policy`, `guard-layer` | — | "Instead of orgs having to tune... they can offload to Entif" + PII/enrichment field handling implies policy needed |
| IDI-007: Vendor per-token incentive conflict — competitive positioning opportunity | market/positioning | `docs/intake/issue-drafts/idi-007-vendor-incentive-conflict-positioning.md` | `market`, `positioning`, `competitive` | — | "the LLM platform vendors would really prefer if nobody did, since they get paid by the number of tokens" |
| IDI-008: Anthropic workspace isolation change (Feb 2026) — Rosetta docs may be stale | documentation | `docs/intake/issue-drafts/idi-008-anthropic-workspace-isolation-staleness.md` | `anthropic`, `caching`, `staleness` | — | Anthropic changed from org-level to workspace-level isolation Feb 5, 2026 |
| IDI-009: OpenAI seat vs org conflation — existing docs may need correction | documentation | `docs/intake/issue-drafts/idi-009-openai-seat-org-conflation.md` | `openai`, `caching`, `documentation` | — | "ChatGPT Enterprise/Business workspace is not the same thing as an API Platform organization" |

## Project Board Suggestions

- Area: `context-fabric`, `privacy-membrane`, `go-to-market`
- Cycle: batch-3-active (PR #1275 already open for this doc's prior extraction; this is a re-extraction cycle)
- Status: in-progress (claimed, locked)
- Blocked by: None for extraction; design partner sales can begin immediately
- Parallelization notes: Build track and market track should run simultaneously; do not gate sales motion on MVP completion

## Open Questions

- Does any existing commercial product directly implement the "inference firewall" thesis (privacy membrane + semantic cache + provenance)? Competitive landscape analysis needed.
- What is the minimum viable entropy in transliteration before join-attack risk becomes acceptable? Privacy budget quantification required.
- Is Anthropic's workspace-level isolation immutable or can it be reconfigured? Implications for multi-tenant enterprise deployments.
- What is the ROI frame for token savings + risk reduction combined? The conversation asserts this is a strong dual value prop but doesn't quantify it.
- Does Vertex AI explicit cache (`cachedContents/{id}`) support partial reads or only full content substitution? Implications for multi-source composition.
