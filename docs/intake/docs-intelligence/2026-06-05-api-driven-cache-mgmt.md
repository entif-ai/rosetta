# Docs Intelligence Extraction — 20260411 API-driven Cache Management

## Source

- Path: `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- Title: API-driven Cache Management
- Date evidence: 2026-04-11 (created 4/11/2026; exported 4/11/2026 6:10:41)
- Authority tier: chat / design ideation
- Freshness: Current as of April 2026; references Gemini 2.5 implicit caching (2026-era docs)
- Word count: ~3,500
- Extractor: heartbeat subagent
- Extraction date: 2026-06-05

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A 3-turn ChatGPT conversation exploring API-level cross-seat context cache sharing across OpenAI, Anthropic (Claude), and Google Gemini, with a pivot into Entif's enterprise product thesis: an inference firewall + semantic cache router + provenance-native governance layer. The first half covers vendor-specific caching semantics. The second half argues for Entif as the privacy membrane, rights-aware cache governor, semantic equalizer, and trust/replay layer — positioning it as the actual product category，而非 merely a wrapper.

## Goals And Intent

- Understand whether separate authenticated seats can share a context cache while retaining seat separation
- Explore Entif's product angle as enterprise inference control plane
- Examine sell-before-build go-to-market motion for the Entif wedge

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Semantic equivalence key must be `intent × rights_domain × data_classification × policy_version × source_bundle_hash` | "Your cache key can't just be intent" — second response, §1 | context-fabric / cache-orchestrator | high | Prevents entitlement leakage via cache composition |
| Transliteration must prevent join-based re-identification | "Residual structure can still betray the original if enough correlated fields travel together" | privacy-membrane | high | Privacy budget discipline needed |
| Cache invalidation must be ruthlessly tied to policy version + entitlement change | "Handbook example only works if invalidation is tied to superseding tiles" | context-fabric | high | Stale certainty is the most dangerous failure mode |
| Multi-provider composition needs its own provenance spine | "Merged answer becomes a derived artifact that needs receipts" | provenance-engine | high | Entitlements + receipts for composite answers |
| Weak-to-strong routing must be auditable | "Handoff rationale needs to be inspectable" | inference-router | medium | Prevents black-box cost/quality drift |
| Design partner pilot structure before full SaaS hardening | "Scoped cohort, clear deliverables, feedback loop" | commercial-motion | medium | Already in Entif playbook |
| Build one viciously crisp demo; make savings, risk controls, and governance legible | Third response: "Build one viciously crisp demo" | go-to-market | high | Demo ammunition and procurement sedatives |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | OpenAI section | openai, caching, api-org | openai, cache-sharing, enterprise | technology | OpenAI prompt caching is automatic for ≥1024 token prompts; org-scoped shared reuse exists but no user-managed cache ID or `prompt_cache_key` handle | "OpenAI does not expose a user-managed shared cache object or cache ID" | Do not rely on a named cache artifact; rely on org-scoped prefix reuse with stable `prompt_cache_key` per shared corpus | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | OpenAI section | openai, chatgpt-enterprise, gap | enterprise, seat-vs-org | risk | ChatGPT Enterprise/Business workspace membership ≠ API Platform organization; seats do not buy shared API cache | "A ChatGPT Enterprise/Business workspace is not the same thing as an API Platform organization" | Architects must not assume workspace membership implies cache sharing | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Anthropic section | anthropic, claude, caching, workspace-isolation | anthropic, cache-isolation | technology | Claude prompt caching uses workspace-level isolation (from Feb 5 2026); no shared cache ID — controlled via `cache_control` prefix annotation | "Cache sharing within workspaces, not across; exact matching required" | Use `cache_control` breakpoints; no named cache resource | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Anthropic section | anthropic, cache-control, ephemeral | cache-control, ttl | technology | Default cache TTL 5 min; optional 1-hour at additional cost | "Default cache lifetime is 5 minutes" | Factor short TTL into cache strategy; budget for extended TTL where needed | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Gemini section | gemini, vertex-ai, caching, iam | gemini, enterprise, vertex | technology | Gemini Developer API: implicit caching at project level, 24h TTL. Vertex AI: explicit named cache resources (`cachedContents/{id}`) with IAM-controlled project access | "Vertex AI is the cleanest enterprise-grade version" | Recommend Vertex AI route for enterprise cache sharing; use named cache resources + service accounts | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Anthropic / Gemini section | multi-provider, cache-routing | cache, routing, federation | technology | No provider supports cross-org cache sharing; natural sharing boundary is API org / workspace / project — not human seat | "Shared cache across separate human seats is usually not a seat feature. It is an API org / workspace / project feature" | Centralize calls through one provider boundary; seat separation ≠ cache boundary | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Entif product thesis, §1 | entif, privacy-membrane, cache-governor | entif, privacy, governance | product-thesis | Entif acts as a privacy membrane: strips or transliterates sensitive specifics, enforces ABAC/RBAC before cache lookup, attaches receipts, knows when cache is invalid because policy tile changed | "Clients no longer have to trust every seat, every prompt engineer, every cached prefix, every vendor-side tenancy boundary" | Anchor product positioning as enterprise inference firewall | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Entif product thesis, §2 | entif, context-fabric, cache-orchestrator | entif, caching, architecture | product-thesis | Entif's cache constitution uses deterministic context packaging, content-hash-keyed packs, activity-based TTL, spend telemetry, and policy-aware domains; reason codes: `CACHE_DOMAIN_MISMATCH`, `ABAC_CONDITION_FAILED`, `CLEARANCE_INSUFFICIENT`, `DATA_RESIDENCY_VIOLATION` | "That is not random glue code. That is the beginning of a cache constitution" | Encode reason codes explicitly in cache layer; make them first-class | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Entif product thesis, §3 | entif, semantic-equalizer, deduplication | entif, semantics, deduplication | product-thesis | Rosetta-native interpretation collapses "different wording, same underlying ask" into a single typed problem shape; enables semantic deduplication before cache lookup | "Entif collapses different wording, same underlying ask into a single typed problem shape" | Build semantic equivalence classifier as part of cache pre-flight | medium |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Entif product thesis, §4 | entif, provenance, trust-layer | entif, receipts, audit | product-thesis | Entif's Guard sits in front of sensitive actions as PEP; all high-risk ops go through sandboxed validation; every action logged to immutable audit trail; Tripwire before dispatch with minimal sealed incident capture | "All high-risk operations go through sandboxed validation; every attempted action is logged into an immutable audit trail" | Encode pre-dispatch Tripwire + receipt lineage as non-negotiable | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Entif product thesis — enterprise handbook example | entif, on-prem, local-resolution | entif, local-first, enterprise | product-thesis | Company handbook example: on-premise Entif box intercepts employee query, qualifies intent via Rosetta, deduplicates via semantic unification, returns cached response without off-site inference if cache is warm and tile hasn't been superseded | "Here is what stayed on-prem. Here is what was normalized. Here is what was cached. Here is what was audited" | Use this example as the primary demo; measurable, relatable, measurable ROI | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Entif product thesis — benefits composition example | entif, multi-provider, composition | entif, federation, composition | product-thesis | Multi-provider benefits composition: Entif fans out structured sub-queries to medical/dental/life/disability providers, retrieves scoped facts, stitches under local provenance chain — even if vendors don't support composable prompt caches natively | "Entif can simulate composition layer itself by fanning out structured sub-queries" | Implement fan-out with structured schema inputs; this is the multi-provider wedge | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Cache key design | cache-key, rights-domain, semantic-equivalence | cache-key, rights, architecture | issue-candidate | Cache key must be `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash` — not intent alone; overlapping surface language between users with different entitlements creates leakage risk if key is under-specified | "One user entitled to plan A, another to plan B, and the surface language overlaps" | Design multi-axis cache key; implement before cache layer ships | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Transliteration privacy risk | privacy, join-leakage, translocation | privacy, pii, architecture | risk | Replacing specific entities (soybeans → gidgets) can still leak by join if correlated fields travel together; requires privacy budget discipline and rules governing what combinations may leave on-prem boundary | "The residual structure can still betray the original if enough correlated fields travel together" | Add privacy budget enforcement to translocation layer; define combination boundary rules | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Stale cache failure mode | cache-invalidation, policy-version | cache, staleness, risk | risk | Handbook example only works if invalidation is tied to superseding tiles, policy versions, and entitlement changes; otherwise fast-confident-wrong internal answer becomes the primary failure mode | "Otherwise you get the most dangerous failure mode of all: a fast, confident, wrong internal answer" | Make invalidation ruthlessly version-aware; tie to tile supersession events | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Multi-provider provenance spine | provenance, composite-artifacts | provenance, federation | issue-candidate | When Entif fans out to multiple providers and merges answer, the merged artifact itself needs receipts, version references, and challengeability — this is a distinct provenance requirement from single-provider caching | "Merged answer itself becomes a derived artifact that needs receipts" | Design provenance spine for composite/multi-provider artifacts | medium |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Weak-to-strong routing auditability | routing, audit, weak-to-strong | inference-router, audit | issue-candidate | If cheap model triages and stronger model resolves, the handoff rationale must be inspectable; otherwise a fancier black box with better invoices | "If a cheap model triages and a stronger model resolves, the handoff rationale needs to be inspectable" | Instrument model-routing decisions; make handoff trace first-class | medium |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Enterprise sales cycle realism | sales, enterprise, timeline | sales, gtm, enterprise | ablation | "$100m ARR by month six" is identified as champagne hallucination; enterprise sales cycles are slow, security review is a swamp, and the buyers who need this most need proof before paying | "The buyers who care most about this are also the buyers least likely to wire eight figures before your proof is boringly undeniable" | Anchor commercial motion in design-partner pilots, not big-logo prophecy | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Sell-before-build with parallel build | gtm, parallelization, design-partners | gtm, build, commercial | decision | Right move is parallelize: market now, build in parallel, use build to sharpen sale and sale to constrain build; sell design-partner engagement (paid pilot with architecture workshop), not finished software | "Build one viciously crisp demo. Make the savings legible. Make the risk controls legible" | Adopt parallel-track: belief pack + commercial motion + MVP build simultaneously | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Three-track GTM | gtm, belief-pack, commercial-motion, build-track | gtm, commercial | decision | Three tracks: (1) belief pack — deck, exec memo, security posture, design partner offer, ROI frame; (2) commercial motion — warm network harvest via paid design partner with fixed term and conversion path; (3) build track — MVP serving sales motion | "Use the warm network, not broad spray-and-pray" | Execute three-track GTM; design-partner offer framed as priority access + roadmap influence | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Product wedge framing | entif, inference-firewall, product-positioning | entif, product, positioning | product-thesis | Entif is three products braided: inference firewall + semantic cache router + provenance-native governance layer; this is the moat, not "one more AI wrapper" | "Not a chatbot. Not an 'AI employee.' Not just middleware. A few places where the dragons actually live" | Keep product positioning tight: enterprise AI governance infrastructure | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Entif v0 plan alignment | entif, v0, bootstrap, non-negotiables | entif, bootstrap, architecture | decision | Entif v0 plan already defines local-first, Guard-gated, receipts-first, privacy membrane, spend controls, deterministic context fabric, and kill-switch as non-negotiables — the API cache conversation reinforces these as buyer-language, not just engineering spec | "That is not hand-wavy futurism. That is buyer-language" | Use v0 non-negotiables directly in sales materials | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Semantic deduplication as product differentiator | deduplication, llm-cost, enterprise-value | entif, value-proposition | product-thesis | Entif's semantic deduplication collapses semantically equivalent queries before they reach any inference provider — directly attacking the token-burn problem without requiring vendor cooperation | "Entif collapses different wording, same underlying ask into a single typed problem shape, instead of paying vendors to rediscover the same meaning over and over" | Market this explicitly: deduplication as token-cost reduction mechanism | high |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Vendor incentive misalignment | vendor-incentive, token-burn, business-model | business-model, enterprise | observation | LLM vendors benefit from maximum token burn; Entif's value proposition directly reduces token volume — creating natural vendor friction | "The LLM platform vendors would really prefer if nobody did, since they get paid by the number of tokens" | Acknowledge this tension; position Entif as enterprise leverage tool, not vendor antagonist | medium |
| 2026-06-05 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Go-to-market network already exists | sales, network, rolodex | sales, network, warm-intro | observation | Emilie explicitly has C-level and SVP contacts at Fortune 100s who owe career debts; the network is warm, not cold; the challenge is packaging, not outreach | "Those sales partners of the highest possible caliber would need to also like money" | Focus on demo packaging; warm network is ready to activate | high |

## Components And Technologies

- **Context cache / prompt cache** — per-provider API-level caching (OpenAI prefix caching, Anthropic cache_control, Gemini explicit caches)
- **Privacy membrane** — entity transliteration, re-identification prevention, privacy budget enforcement
- **Semantic equalizer** — Rosetta-native intent classification and semantic deduplication
- **Cache governor** — policy-aware domains, ABAC/RBAC pre-lookup, TTL/invalidation tied to policy version
- **Provenance spine** — receipts for every durable action; composite artifact receipts for multi-provider merges
- **Inference router** — weak-to-strong generalization with auditable handoff rationale
- **Context fabric** — deterministic context packaging, content-hash-keyed packs, multi-axis cache keys
- **Enterprise demo wedge** — handbook/benefits policy workflow; measurable cost + latency + auditability delta

## Conceptual Claims

1. **Seat ≠ cache boundary.** Human seat membership is a billing/admin abstraction, not the real cache isolation boundary. The real boundaries are API org (OpenAI), workspace (Claude), and project (Google).
2. **No provider exposes cross-seat shared cache ID.** OpenAI has org-scoped reuse without a named handle. Anthropic has workspace-isolated prefix caching via cache_control. Google (Vertex) has the closest thing to a named cache resource with IAM.
3. **Entif as inference firewall.** The privacy membrane + Guard + ABAC/RBAC pre-check + receipts structure positions Entif as the enterprise control point between users and vendor inference — not a wrapper but a governance layer.
4. **Semantic deduplication is a standalone value prop.** Collapsing intent-equivalent queries before they reach any provider is token-cost reduction without vendor cooperation — a differentiator that vendors have no incentive to offer.
5. **Sell design-partner pilots before SaaS.** Build parallel to market; close paid design partners with scoped cohort and conversion path; use build to sharpen sale, sale to constrain build.
6. **Three-track GTM:** belief pack (deck, memo, ROI frame) + commercial motion (warm network, paid pilot) + build track (MVP serving sales motion). Not phases — simultaneous workstreams.
7. **Composite answers need composite receipts.** Multi-provider fan-out produces derived artifacts that must carry their own provenance — distinct from single-provider caching.
8. **Transliteration requires join-leakage protection.** Entity replacement alone is insufficient; correlated fields can reconstruct original values; requires privacy budget discipline and combination rules.

## Dependencies And Sequencing

- Entif v0 non-negotiables (Guard, receipts, privacy membrane) are prerequisites for the cache governor product claim
- Semantic equivalence classifier is a prerequisite for the deduplication product claim
- Multi-axis cache key design must precede cache layer implementation
- Provenance spine for composite artifacts is a distinct engineering workstream from single-provider caching
- Design partner pilots should run before raising external capital
- MVP acceptance criteria (v0 plan) serve simultaneously as demo ammunition and procurement sedatives

## Contradictions Or Supersession

- No direct contradictions with existing Rosetta/Entif docs found. The vendor-specific caching mechanics (OpenAI org-scoped, Anthropic workspace-isolated, Gemini project-level) are external state that may shift — the extraction captures April 2026 state.
- The Entif product thesis in this doc (inference firewall + semantic cache router + provenance governance) aligns with and extends the NOT LAME PRD's sovereign-kernel + guard-layer positioning.
- No supersession detected.

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| ACM-001: Multi-axis cache key design — semantic intent × rights domain × data classification × policy version | issue-candidate | `docs/intake/issue-drafts/acm-001-multi-axis-cache-key.md` | cache, rights, privacy | — | Cache key must not be intent alone; overlapping surface language between users with different entitlements creates leakage risk | high |
| ACM-002: Transliteration join-leakage protection — privacy budget enforcement for entity substitution | issue-candidate | `docs/intake/issue-drafts/acm-002-transliteration-privacy-budget.md` | privacy, pii, translocation | — | "Residual structure can still betray the original if enough correlated fields travel together" | high |
| ACM-003: Ruthless cache invalidation tied to policy tile supersession | issue-candidate | `docs/intake/issue-drafts/acm-003-cache-invalidation-policy-version.md` | cache, invalidation, policy | — | "Fast, confident, wrong internal answer" is the primary failure mode if invalidation is not version-aware | high |
| ACM-004: Provenance spine for composite/multi-provider artifacts | issue-candidate | `docs/intake/issue-drafts/acm-004-composite-artifact-provenance.md` | provenance, federation, receipts | — | "Merged answer itself becomes a derived artifact that needs receipts, version references, and challengeability" | medium |
| ACM-005: Weak-to-strong routing handoff audit trail | issue-candidate | `docs/intake/issue-drafts/acm-005-routing-handoff-auditability.md` | inference-router, audit, tracing | — | "Handoff rationale needs to be inspectable" to prevent black-box cost/quality drift | medium |

## Project Board Suggestions

- Area: Entif / Context Fabric
- Cycle: batch-3-source-dialogue
- Status: proposed
- Blocked by: ACM-001 (cache key) gates ACM-003 (invalidation); ACM-001 and ACM-003 are both prerequisite to demo-ready cache layer
- Parallelization notes: ACM-004 (composite provenance) is independent of cache key design; can run in parallel as a separate workstream

## Open Questions

1. What is the exact schema for the multi-axis cache key — specifically the `rights_domain` and `data_classification` axes? Need a taxonomy.
2. What privacy budget model should govern transliteration combination rules? Differential privacy? Token-budget style?
3. Is the "handbook example" demo scope feasible as a v0 slice, or does it require full Rosetta bootstrap?
4. Who is the first design partner candidate? What is the warm network activation sequence?
5. How should Entif handle vendors that introduce new cache primitives (e.g., if OpenAI adds a proper named cache handle)?
6. What is the minimum viable provenance spine for composite artifacts — single receipt chain or full multi-provider trace?