# Docs Intelligence Extraction — API-driven Cache Management

## Source

- Path: `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- Title: API-driven Cache Management
- Date evidence: 2026-04-11
- Authority tier: Chat log / user ideation with cited documentation
- Freshness: 2026-04-11
- Word count: ~8,000
- Extractor: docs-intelligence heartbeat subagent
- Extraction date: 2026-06-05

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A chat dialogue between Emilie and ChatGPT covering two main areas: (1) a technical comparison of prompt/context caching semantics across OpenAI, Anthropic Claude, and Google Gemini/Vertex — including isolation boundaries, TTLs, named cache objects, and cross-seat sharing viability; and (2) Emilie's strategic vision for Entif as an "inference firewall" product that combines a privacy membrane, semantic cache router, rights-aware cache governor, and provenance engine. The document frames Entif as a product that lets enterprises get AI value without surrendering privacy, spend discipline, access control, or auditability. Key architectural concerns are named: composite cache key collision risk, transliteration correlation leakage, semantic cache staleness, and multi-provider provenance tracking.

## Goals And Intent

- Understand cross-provider caching semantics to inform Entif's cache router design
- Establish whether named shared cache objects are viable primitives across OpenAI, Anthropic, and Google
- Frame Entif's cache/orchestration layer as a standalone enterprise product wedge
- Identify the real architectural risks in the proposed inference firewall concept
- Identify go-to-market motion (sell-before-build, design partner pilots)

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Composite cache key formula must encode rights_domain alongside semantic_intent | "semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash" — ChatGPT's explicit recommendation | Context Fabric / Cache Orchestrator | high | Without rights_domain in the key, users with different entitlements get wrong cached answers |
| Named cache objects for cross-seat sharing on Vertex AI | Google explicit cache resources via `cachedContents/CACHE_ID` + IAM | Entif / Cache Router | high | Google/Vertex is the only provider with true named shared cache objects |
| Privacy membrane with transliteration, not just redaction | "replacing soybeans with gidgets" example — structure can still betray origin | Privacy Membrane | high | Redaction alone is insufficient; residual correlations across fields can leak |
| Invalidation tied to policy tile version, not just TTL | "handbook example only works if invalidation is tied to superseding tiles, policy versions, entitlement changes" | Context Fabric / Cache Orchestrator | high | Tile-version-gated invalidation is the correct cache freshness mechanism |
| Multi-provider provenance spine for composed answers | "Once Entif fans out to medical, dental, life, disability, and local handbook sources, the merged answer itself becomes a derived artifact needing receipts" | Provenance Engine | high | Fan-out composition requires its own receipt chain |
| Privacy budget discipline for cross-field correlation | "the residual structure can still betray the original if enough correlated fields travel together" | Privacy Membrane | medium | Joint distribution constraints on what combinations may leave on-prem boundary |
| Weak-to-strong handoff audit trail | "If a cheap model triages and a stronger model resolves, the handoff rationale needs to be inspectable" | Orchestration Layer | medium | Non-negotiable for auditable AI governance |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | OpenAI caching | caching, openai, enterprise | caching, multi-seat | technology | OpenAI prompt caching is automatic for prompts ≥1024 tokens, org-scoped, 5–10 min cache (extendable to 24h), requires exact repeated prefix, no named cache objects. ChatGPT Business/Enterprise workspace ≠ API Platform org. | "Prompt caching is automatic for prompts 1024 tokens or longer... OpenAI explicitly says prompt caches are not shared between organizations." | OpenAI offers org-scoped shared reuse, not a named cache artifact. Entif cannot use OpenAI for cross-seat named cache sharing. | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Anthropic caching | caching, anthropic, claude, enterprise | caching, multi-seat | technology | Anthropic Claude prompt caching via cache_control field, workspace-level isolation (from Feb 5, 2026), default 5 min cache, 1hr at additional cost. No shared cache ID. Exact prefix match required. | "Anthropic's docs now say that, starting February 5, 2026, prompt caching uses workspace-level isolation instead of organization-level isolation." | Same workspace = shared prefix cache; different workspaces = no sharing. Named cache objects not available. | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Google/Gemini caching | caching, gemini, vertex, enterprise | caching, multi-seat | technology | Google Gemini has implicit caching (project-scoped, 24h TTL, auto on Gemini 2.5+) and explicit caching (named cachedContents resources, create/get/list/update/delete). Vertex AI exposes explicit cache objects with IAM access control. | "Explicit caches are real named resources in the API. You create them, get a cache.name, and then reuse that via cached_content=cache.name." | Vertex AI is the only major provider with true named cache objects + IAM. Best fit for cross-seat enterprise cache sharing. | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Entif as inference firewall | entif, product-positioning, inference-firewall | product, enterprise | ablation | Entif is positioned as three products in one: (1) inference firewall — strips/anonymizes before external inference; (2) semantic cache router — intent classification, deduplication, cache segmentation; (3) provenance-native governance layer. | "Entif's box becomes the place where meaning is normalized, permissions are enforced, caches are segmented, prompts are de-bloated, and expensive reasoning is only bought when the local stack cannot close the loop itself." | This three-part framing is the crispest product articulation seen in the corpus. Anchor all future Entif positioning on this triad. | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Privacy membrane transliteration | privacy, anonymization, transliteration | privacy, middleware | technology | Entif uses domain-substitution transliteration (soybeans→gidgets) not just redaction. Domain entities replaced with fictional equivalents preserving arithmetic structure. | "How many bushels of soybeans will $100 get me right now if the soybeans cost $3.95 per bushel? ... [transliterated to] How many quatloos of gidgets will 50000 credits purchase, if gidgets are 1975 credits per quatloo?" | The transliteration pattern preserves problem structure for meaningful external inference while anonymizing domain specifics. Validate that Entif's pipeline can construct such mappings per domain. | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Composite cache key formula | caching, rights, abac, semantic-intent | cache-key, rights | requirement | Cache key must be composite: semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash. Intent alone is insufficient when entitlement differentiates answers. | "Your cache key can't just be intent. It has to be something like: semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash." | Rosetta's Context Fabric / Cache Orchestrator must implement this multi-axis cache key formula. | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Transliteration join-correlation risk | privacy, correlation, leakage | privacy, transliteration | risk | Even with entity substitution, residual structural correlations across multiple fields can leak the original data if correlated fields travel together in the same external query. | "Replacing soybeans with gidgets is nice, but the residual structure can still betray the original if enough correlated fields travel together." | Entif's privacy membrane needs joint-distribution constraints and correlation-budget accounting for what combinations may cross the on-prem boundary. | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Semantic cache staleness risk | caching, staleness, tile-version | cache, validity | risk | The handbook example (cached policy answers) only works if cache invalidation is tied to tile supersession and policy version changes. Without that, fast confident wrong answers become the dominant failure mode. | "Your handbook example only works if invalidation is ruthlessly tied to superseding tiles, policy versions, and entitlement changes. Otherwise you get the most dangerous failure mode of all: a fast, confident, wrong internal answer." | Tile-version-gated cache invalidation must be a first-class mechanism in Rosetta's Context Fabric. TTL alone is insufficient. | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Multi-provider composition provenance | provenance, multi-provider, receipts | provenance, federation | risk | Once Entif fans out structured sub-queries to multiple external providers (medical, dental, handbook, etc.) and composes the answer, the result is a derived artifact requiring its own receipt chain, version references, and challengeability. | "Once Entif fans out to medical, dental, life, disability, and local handbook sources, the merged answer itself becomes a derived artifact that needs receipts, version references, and challengeability." | Rosetta's provenance system must handle federated multi-provider derived artifacts as first-class receipts. | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Weak-to-strong handoff auditability | routing, weak-to-strong, audit | routing, audit | risk | If a cheap/triage model handles initial routing and a stronger model resolves the hard case, the handoff rationale must be inspectable to prevent "a fancier black box with better invoices." | "If a cheap model triages and a stronger model resolves, the handoff rationale needs to be inspectable. Otherwise you just built a fancier black box with better invoices." | Every weak-to-strong escalation requires an annotated receipt recording the triage reasoning and the escalation trigger. | medium |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Vendor arbitrage thesis | economics, token-cost, vendor-arbitrage | economics, inference | decision | Entif's commercial thesis is to flip the vendor incentive: instead of "more tokens = more value," Entif delivers "fewer calls, narrower payloads, stricter cache domains, more local resolution, expensive inference only where ambiguity survives." | "Vendors want enterprises to think in terms of: more seats, more calls, more tokens, more context. Entif flips the table and says: fewer calls, narrower payloads, stricter cache domains, more local resolution." | Document this as the core commercial thesis for Entif's go-to-market. | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Design partner go-to-market | gtm, design-partners, sell-before-build | gtm, sales | ablation | Sell-before-build via design partner pilots: narrow cohort, clear deliverables, feedback loop, commercial signal before SaaS hardening. Three tracks: (1) belief pack (deck + memo + ROI frame), (2) commercial motion via warm network, (3) parallel build serving sales. | "The move is not 'build the whole cathedral, then pray.' The move is: Build one viciously crisp demo. Make the savings legible. Make the risk controls legible." | Adopt the three-track parallel approach as the Entif go-to-market framework. | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Recommended architecture per provider | architecture, provider-routing, vertex | routing, architecture | decision | Architecture recommendation: (OpenAI) one API org + centralized gateway + stable prefix + same prompt_cache_key per corpus; (Anthropic) one Claude workspace + centralized gateway + stable cache_control placement; (Google) one shared Vertex AI project + explicit cache resources + service accounts + IAM. | "OpenAI: one API org, centralized gateway, stable static prefix, same prompt_cache_key strategy per shared corpus. Anthropic: one Claude workspace for cooperating agents, centralized gateway, stable cache_control placement. Google: one shared project, preferably Vertex AI, explicit cache resources, service accounts per agent, IAM." | Rosetta's Entif integration should implement provider-specific routing strategies aligned with these recommendations. | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Wedge products for initial go-to-market | product-wedge, gtm, enterprise | product, gtm | ablation | Three initial product wedges: (1) secure employee-policy/handbook/benefits knowledge workflows; (2) secure engineering context fabric and cache governance for agentic coding; (3) secure retrieval/synthesis across internal systems with rights-aware composition. | "The real spear is probably one of these: secure employee-policy / handbook / benefits / knowledge workflows; secure engineering context fabric and cache governance for agentic coding; secure retrieval and synthesis across internal systems with rights-aware composition." | Prioritize the handbook/knowledge workflow wedge as the initial design partner target — most measurable, lowest technical barrier. | medium |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Provider isolation boundary summary | caching, isolation-boundary, multi-tenant | caching, multi-tenant | technology | Cross-seat cache sharing isolation boundaries: OpenAI = API org boundary; Anthropic = workspace boundary (Feb 2026+); Google = project boundary; Vertex = resource-level with IAM. ChatGPT Enterprise seats are NOT the cache boundary for any provider. | "Shared cache across separate human seats is usually not a seat feature. It is an API org / workspace / project feature." | Rosetta's cache router must model the correct isolation boundary per provider, not per seat. | high |

## Components And Technologies

- **Prompt caching (OpenAI):** automatic ≥1024-token prefix matching, org-scoped, `prompt_cache_key` for routing stickiness, no named cache objects
- **Prompt caching (Anthropic Claude):** `cache_control` field, workspace-level isolation (Feb 2026+), default 5 min / 1 hr at cost, exact prefix match
- **Context caching (Google Gemini):** implicit (project-scoped, 24h TTL, auto for Gemini 2.5+) and explicit (named `cachedContents/{id}` resources)
- **Vertex AI Context Caching:** project-scoped named cache resources + IAM access control; cleanest enterprise cross-seat cache sharing model
- **Transliteration anonymization:** domain entity substitution preserving arithmetic/structural relationships (soybeans→gidgets pattern)
- **Composite cache key:** `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash`
- **Multi-provider composition layer:** structured sub-query fan-out to provider-specific endpoints, results stitched under single provenance chain

## Conceptual Claims

- Entif's privacy membrane strips or transliterates sensitive specifics before any external inference call, preventing PII/IP leakage while preserving query meaningfulness
- Cross-seat cache sharing is a provider-architecture feature (org/workspace/project), not a seat feature — the unit of cache sharing is the billing/admin boundary, not the human user
- Named shared cache objects (Google Vertex) are the cleanest enterprise cache sharing primitive, combining explicit resource management with IAM access control
- Semantic deduplication collapses "different wording, same underlying ask" into a single typed problem shape, reducing redundant external inference
- Entif's three-part product framing (inference firewall + semantic cache router + provenance-native governance) is a coherent and defensible product category position
- Enterprise cache routing should use composite keys including rights_domain, not semantic intent alone
- Multi-provider fan-out composition requires its own provenance spine; the merged answer is a derived artifact with its own receipt chain

## Dependencies And Sequencing

- Entif's cache router depends on Rosetta's Context Fabric and rights-scoped retrieval (already in scope for Text-Core MVP)
- Composite cache key formula requires rights_domain metadata to be first-class in the Rosetta data model
- Tile-version-gated invalidation requires version-linked tiles/tapestries to be implemented first
- Multi-provider provenance spine requires the Receipt Law implementation and append-only justification graph (already planned)
- Privacy membrane transliteration requires a domain-specific substitution registry per enterprise client
- Weak-to-strong handoff audit trail requires escalation trigger definitions in the Rosetta Guard layer

## Contradictions Or Supersession

- **No direct contradictions found.** However, the document's assertion that Anthropic added workspace-level isolation in Feb 2026 should be verified against current Anthropic documentation, as this is a specific policy date that may have shifted.
- The "soybeans→gidgets" transliteration pattern assumes Entif has per-domain substitution dictionaries. This is not yet in any Rosetta spec — it is a proposed requirement here that should be formalized.
- The $100m ARR by month-six projection is acknowledged as "champagne hallucination" in the same document. No supersession needed — the document itself critiques the projection.

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| ACM-001: Composite cache key must encode rights_domain alongside semantic intent | requirement | `docs/intake/issue-drafts/acm-001-composite-cache-key-rights-domain.md` | cache, rights, context-fabric | — | Composite key formula: `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash` — ChatGPT's recommendation; also the primary correctness requirement for any rights-scoped cache |
| ACM-002: Transliteration correlation leakage — joint-distribution constraints needed | risk | `docs/intake/issue-drafts/acm-002-privacy-transliteration-correlation-leakage.md` | privacy, anonymization, risk | — | "the residual structure can still betray the original if enough correlated fields travel together" — no mitigation proposed in current Rosetta privacy specs |
| ACM-003: Semantic cache staleness — tile-version-gated invalidation required | risk | `docs/intake/issue-drafts/acm-003-semantic-cache-staleness-tile-version-invalidation.md` | cache, staleness, tile-version | — | "the most dangerous failure mode of all: a fast, confident, wrong internal answer" — requires tile-version-gated invalidation as first-class mechanism |
| ACM-004: Multi-provider fan-out composition needs its own provenance spine | risk | `docs/intake/issue-drafts/acm-004-multi-provider-provenance-spine.md` | provenance, multi-provider, receipts | — | "the merged answer itself becomes a derived artifact that needs receipts, version references, and challengeability" — fan-out provenance not yet in any Rosetta spec |
| ACM-005: Weak-to-strong handoff audit trail missing | risk | `docs/intake/issue-drafts/acm-005-weak-strong-handoff-audit-trail.md` | routing, audit, weak-to-strong | — | "If a cheap model triages and a stronger model resolves, the handoff rationale needs to be inspectable" — no handoff receipt mechanism in Rosetta Guard layer |
| ACM-006: Privacy membrane transliteration not yet in Rosetta specs | requirement | `docs/intake/issue-drafts/acm-006-privacy-membrane-transliteration-spec.md` | privacy, anonymization, entif | — | The soybeans→gidgets transliteration pattern is proposed as a core Entif privacy mechanism but has no formal spec in Rosetta; should be captured as a named requirement |

## Project Board Suggestions

- Area: Entif Context Fabric / Rosetta Cache Router / Privacy Membrane
- Cycle: Batch 3 (PRIORITY_QUEUE source dialogue)
- Status: candidate
- Blocked by: Rights-scoped retrieval (TC-006/TC-007), Tile/Tapestry model (TC-006), Receipt Law implementation
- Parallelization notes: Privacy membrane transliteration can be specced in parallel to the core cache router; the two concerns (privacy and routing) have independent implementation paths but share the same Entif product context. Weak-to-strong routing is downstream of the Guard layer implementation (TC-005 write-admission gate).

## Open Questions

- Does Anthropic's Feb 2026 workspace-level isolation date hold in current Anthropic documentation? Verify before citing as hard fact.
- Is there a per-domain substitution dictionary registry in any current Rosetta spec, or is ACM-006 genuinely a new spec gap?
- What is the TTL policy for Rosetta's own internal cache vs. the external provider caches? The document conflates Rosetta's cache governance with the provider's native caching — these need to be separated in the architecture.
- Does the "soybeans→gidgets" transliteration pattern require a supervised vocabulary mapping per domain, or can it be automated via semantic embedding similarity with structural preservation constraints?
