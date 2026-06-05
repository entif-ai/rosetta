# DI Extraction: LLM API Cache Management

**Source:** `docs/chats/20260411 - Chat GPT - LLM API Cache Management.md`
**Date evidence:** 2026-04-11
**Authority tier:** Primary — direct design dialogue
**Freshness:** Current as of 2026-04-11
**Word count:** ~2,500
**Extractor:** heartbeat subagent
**Extraction date:** 2026-06-05

---

## Summary

A ChatGPT conversation between Crates (Entif) and an LLM covering: (1) vendor prompt cache primitive comparison across OpenAI, Anthropic Claude, and Google Gemini/Vertex; (2) Entif as an enterprise inference firewall that anonymizes/transliterates inputs before inference, routes intelligently, and governs cache lifecycle; (3) stable-prefix composition strategy to exploit provider prefix caching for 50-90% cost reduction; (4) GTM strategy of "sell before build" via paid design partners and an auditable agent gateway wedge product. The document is notable for being the source-of-truth design dialogue that established the "provider cache as ephemeral compute accelerator, not durable memory" doctrine now reflected in NOT LAME PRD.

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Goals And Intent

- Understand vendor prompt cache primitives (OpenAI, Anthropic, Gemini) for enterprise multi-seat scenarios
- Determine whether shared context cache IDs can maintain seat separation while sharing cache
- Position Entif as enterprise inference firewall and cache router
- Design stable-prefix composition strategy for maximum provider cache exploitation
- Establish GTM motion for Entif's inference middleware

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Vendor cache primitive abstraction layer | OpenAI: automatic prefix + prompt_cache_key; Anthropic: cache_control breakpoints; Gemini: explicit cache resource ID | runtime-ingestion, cache-strategy | high | Each vendor has different primitives; Entif must abstract at middleware layer |
| Stable-prefix composition doctrine | "normalize first, append volatile tail last" | runtime-ingestion, cache-strategy | high | Deterministic ordering of prompt components is prerequisite for cache hits |
| De-identified shared prefix design | "shared shard must be scrubbed before it becomes reusable" | privacy, cache-strategy | high | Only normalized/anonymized/policy-approved material in shared cache prefix |
| Provider cache as ephemeral accelerator, not durable memory | "treat provider caches as transient compute accelerators, not as system memory" | architecture, cache-strategy | high | Durable value lives in rights-scoped tapestries/tiles |
| ABAC-aware cache domain model | ABAC-scoped cache domains + rights-safe tapestry reuse | architecture, cache-strategy | high | Cache domain key = tenant + authz scope hash + data classification + policy version + model + region |
| On-premise anonymization/transliteration layer | "on-premise box anonymizes/transliterates inputs before inference" | architecture, privacy | high | Entity-specific data encrypted/replaced before leaving premises |
| Audit trail for cache hits/misses | "token dashboards that explicitly track cache hit behavior" | telemetry, audit | medium | Needed for ROI reporting to enterprise buyers |
| Structured output composition | "ask each shard-query for normalized JSON, then merge locally" | runtime-ingestion, synthesis | medium | Keeps expensive vendor calls narrow; enables cheap on-prem synthesis |
| Deterministic method tile promotion | "promote repeated successful cognition into deterministic reusable methods" | tapestry, runtime-ingestion | medium | Flywheel: repeated successful compositions → deterministic tiles |
| Auditable Agent Gateway as wedge product | "auditable tool-using assistant with receipts and incident envelope" | GTM, product | high | First demo that opens enterprise wallets |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | OpenAI Prompt Caching | openai, cache, prompt-caching, prefix-matching | OpenAI prompt caching is automatic for prompts ≥1024 tokens with exact prefix matching; can be nudged with `prompt_cache_key` for routing stickiness; caches NOT shared between organizations; only same-organization members can access identical caches | "prompt caches are not shared between organizations" | Recommend | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | OpenAI Cache ID Primitive | openai, cache, cache-id, primitive | OpenAI has NO public shared cache ID primitive — no create/list/pass-around-by-ID capability; "prompt objects" are team-shared config, not cache reuse handles | "the published API does not document a first-class cache resource you create, list, and hand around by cache ID" | technology | Entif must simulate shared cache via prefix matching, not vendor primitives | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | Anthropic Cache Isolation | anthropic, cache, cache-control, org-isolation | Anthropic uses cache_control breakpoints; 5-min default lifetime, 1-hour option; 100% exact matching required; caches isolated between organizations | "caches are isolated between organizations" | technology | Same org constraint as OpenAI; no portable cache ID | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | Gemini Explicit Cache Resource | gemini, vertex, cache, explicit-cache, resource-name | Gemini/Vertex is materially different: explicit cache resource with resource name like `projects/{project}/locations/{location}/cachedContents/{CACHE_ID}`; project-level IAM; closest to "separate seats, shared cache handle" model | "Gemini is the one that gets closest to your exact idea, because it exposes an explicit cache resource you can reference by name" | technology | Gemini/Vertex is the only vendor supporting true shared cache handle; Entif should prioritize Vertex integration | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | Vendor Cache Comparison Summary | openai, anthropic, gemini, cache, comparison | OpenAI: same org + shared benefit, no shared cache ID. Anthropic: same org + shared benefit, no shared cache ID. Gemini/Vertex: explicit shared cache resource with IAM boundaries | Synthesis from vendor docs | decision | Document vendor tiering for cache strategy: Gemini = best for shared cache, OpenAI/Anthropic = prefix-matching only | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | Stable-Prefix Composition Doctrine | cache-strategy, stable-prefix, composition | Four-layer composition: (1) global pack for invariant instructions; (2) domain pack for policy/handbook/knowledge; (3) task pack for workflow class; (4) user tail for volatile ask. Stable mass first, volatile tail last | "Normalize first. Fingerprint the shard. Assign it to a cache domain. Place stable packs first. Append volatile ask last" | requirement | Implement stable-prefix composition in context compiler; enforce deterministic ordering | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | Provider Cache Cost Reduction | openai, cache, cost, economics | OpenAI public docs describe repeated-prefix caching with up to 90% cached input token cost reduction | "up to 90% lower cached input token cost" | technology | 50-90% token cost reduction is achievable via prefix shaping | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | Multi-Request Shard Arbitrage | cache-strategy, composition, cost | Fan out sub-questions against different stable packs → harvest structured results → compose on-prem. Vendor answers narrow, repeatable slices against heavily cached prefixes; Entif does synthesis | "expensive vendor is not answering the whole mess. It is answering small, narrow, repeatable slices" | requirement | Implement structured output + on-prem composition pipeline | medium |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | Entif On-Premise Box Role | entif, architecture, privacy, middleware | On-prem server: anonymizes/transliterates inputs before inference, routes intelligently, composes multi-provider answers, governs cache lifecycle. Example: company handbook queries intercepted at on-prem layer, deduplicated, cached | "Entif's box then uses Rosetta to qualify the underlying intent of the request, deduplicates/unifies questions" | architecture | On-prem box is core product; Rosetta used for intent qualification and deduplication | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | De-identification Before Cache | privacy, cache-strategy, anonymization | Only normalized, anonymized, policy-approved material belongs in shared prefix. Raw proprietary/entity-specific/PII data belongs in dynamic tail or stricter cache domain | "the shared shard must be scrubbed before it ever becomes reusable" | requirement | Implement pre-cache de-identification layer; cache domain key includes de-identification schema version | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | Cache Domain Key Schema | cache-strategy, abac, domain-key | Cache domain key = tenant/workspace + authz scope hash + data classification + policy version + model family + region + prompt-template version + de-identification schema version | "cache domain key includes, at minimum: tenant/workspace, authz scope hash, data classification, policy version, model family, region, prompt-template version, and de-identification schema version" | requirement | Design cache_domain_slug object; include in context_block and tapestry_manifest | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | Provider Cache as Ephemeral Accelerator | architecture, cache-strategy, memory | Core doctrine: "treat provider caches as transient compute accelerators, not as system memory"; durable value in rights-scoped tapestries/tiles | "provider caches should be surfaced in dashboards, but durable value should live in rights-scoped tapestries / tiles" | decision | NOT LAME PRD already reflects this; verify Bootstrap cache implementation aligns | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | GTM: Auditable Agent Gateway Wedge | GTM, product, receipts, governance | First demo that opens enterprise wallets: auditable tool-using assistant with receipts + incident envelope | "the two demos that open wallets fastest are: (1) an auditable tool-using assistant with receipts and incident envelope; (2) a meaning pipeline demo" | requirement | Build auditable agent gateway as first GTM artifact | high |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | GTM: Sell Before Build | GTM, product, strategy | "Sell before build" — paid design partner pilots before full productization. Market as "auditable substrate that turns AI systems into auditable machines" | "Start marketing it now. Not as 'the whole cathedral is finished,' but as the category-defining control layer" | decision | Begin design partner outreach immediately; demo need not be complete | medium |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | Context Block and Tapestry Objects | cache-strategy, architecture, objects | Four formal objects proposed: context_block, tapestry_manifest, cache_domain_slug, provider_prefix_plan | "formalize four objects: context_block, tapestry_manifest, cache_domain_slug, provider_prefix_plan" | technology | These objects need formal spec in NOT LAME or a cache strategy annex | medium |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | Deterministic Method Promotion | tapestry, runtime-ingestion, method-tiles | Compounding flywheel: repeated successful cognition → deterministic reusable methods. Once promoted, vendor call disappears for that class of work | "convert repeated successful cognition into deterministic reusable methods over time. Once that happens, the vendor call disappears entirely for some classes of work" | requirement | Design method tile promotion criteria; track repeated-usage signals | medium |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | Vendor Preference Against Cache Optimization | vendor-relations, economics | Vendors prefer customers burn maximum tokens; Entif's cache optimization reduces their revenue. "LLM platform vendors would really prefer if nobody did [this]" | "the LLM platform vendors would really prefer if nobody did, since they get paid by the number of tokens their customers burn through" | risk | Vendor dependency risk: providers may deprecate prefix caching or add restrictions | medium |
| 2026-04-11 | docs/chats/20260411 - Chat GPT - LLM API Cache Management.md | Structured Output for Shard Queries | synthesis, structured-output, json | Each shard-query should request normalized JSON or typed findings; merge locally. Keeps vendor calls narrow and synthesis cheap | "do not ask each shard-query for prose if what you need is a machine-composable result" | requirement | Enforce structured output schema for multi-provider composition | medium |

---

## Components And Technologies

- **OpenAI Prompt Caching**: automatic prefix caching ≥1024 tokens, `prompt_cache_key` for routing stickiness, no cross-org sharing
- **Anthropic cache_control**: breakpoint-based, 5-min default / 1-hour option, exact prefix matching, org-isolated
- **Google Gemini / Vertex AI**: explicit cache resource (`cachedContents/{CACHE_ID}`), project-scoped IAM, shared cache handle primitive
- **On-premise anonymization/transliteration**: entity-specific data replacement before inference (e.g., dollar amounts → quatloos/credits for client privacy)
- **Stable-prefix composition**: global pack + domain pack + task pack + user tail layering
- **Multi-request shard arbitrage**: fan-out sub-queries against stable cache-prefixed slices, compose on-prem
- **Context block object**: proposed formal object for cache-scoped prompt fragment
- **Tapestry manifest**: proposed formal object for compiled context bundle
- **Cache domain slug**: proposed formal object for ABAC-scoped cache domain key
- **Provider prefix plan**: proposed formal object for vendor-specific cache shaping strategy

---

## Conceptual Claims

1. **Vendor cache as ephemeral accelerator, not durable memory**: Provider prompt caches are transient compute optimizations. Durable memory and value live in rights-scoped tapestries/tiles with ABAC cache domains. This is already reflected in NOT LAME PRD.

2. **Stable-prefix composition is prerequisite for cache exploitation**: Deterministic ordering of prompt components (stable first, volatile last) is required for provider cache hit optimization. Any reordering, reformattting, or incidental seat-specific data in the prefix destroys cache hits.

3. **Gemini/Vertex is the only vendor with true shared cache handle**: OpenAI and Anthropic provide same-org shared cache BENEFIT (via prefix matching) but no portable cache ID primitive. Gemini/Vertex exposes `cachedContents/{CACHE_ID}` resource that can be referenced by name, making it the only vendor compatible with the "separate seats, shared cache handle" enterprise model.

4. **De-identified prefix is a security requirement**: Only normalized, anonymized, policy-approved material belongs in a shared cache prefix. Raw proprietary/entity-specific/PII data must remain in the dynamic tail or a stricter cache domain.

5. **Multi-shard composition enables 50-90% cost reduction**: By fanning out sub-questions against stable-prefixed slices (each hitting provider cache) and composing results on-prem, Entif can dramatically reduce per-request inference cost compared to sending the full composite prompt to a single vendor.

6. **Auditable Agent Gateway is the enterprise wedge product**: Regulated enterprises (banking, insurance, healthcare) need auditable tool-using agents with receipts, incident envelopes, and policy gates — not another generic agent framework.

7. **"Sell before build" via paid design partners**: Market positioning should precede full productization; design partner pilots validate product-market fit before scaling.

---

## Dependencies And Sequencing

- **Depends on NOT LAME PRD** for memory sovereignty map, write-admission gate, and context compiler design
- **Depends on Bootstrap** for initial runtime cache implementation
- **Blocked by** TC-005 (Promotion state machine) for deterministic method tile promotion
- **Enables** auditable agent gateway demo (first GTM artifact)
- **Informs** runtime-ingestion pipeline design for cache-aware prompt composition

---

## Contradictions Or Supersession

- **Contradiction**: The chat proposes a "shared cache ID" concept that doesn't exist in OpenAI/Anthropic. Only Gemini/Vertex supports it. The NOT LAME PRD should specify vendor-tiered cache strategy rather than a unified shared-cache model.
- **Supersession**: The "context_block / tapestry_manifest / cache_domain_slug / provider_prefix_plan" four-object proposal from this chat may have been superseded by more mature object definitions in later specs (e.g., OMC spec, NOT LAME PRD). These four objects should be cross-referenced and potentially retired or merged.

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| LLM-API-CACHE-001: Vendor-tiered cache strategy missing from NOT LAME PRD | spec-gap | `docs/intake/issue-drafts/LLM-API-CACHE-001-vendor-cache-strategy.md` | cache-strategy, vendor-abstraction, docs-intelligence | NOT LAME PRD | Finding 1-4: OpenAI, Anthropic, Gemini have different primitives; no unified shared cache ID; Gemini/Vertex is closest to shared handle |
| LLM-API-CACHE-002: Stable-prefix composition doctrine needs formal spec | architecture | `docs/intake/issue-drafts/LLM-API-CACHE-002-stable-prefix-composition.md` | cache-strategy, context-compiler, prefix-composition | NOT LAME PRD context compiler section | Findings 6-8: stable-prefix 4-layer composition, 50-90% cost reduction via prefix shaping |
| LLM-API-CACHE-003: De-identified cache prefix security model | privacy/security | `docs/intake/issue-drafts/LLM-API-CACHE-003-deidentified-cache-prefix.md` | privacy, cache-strategy, anonymization, ABAC | LLM-API-CACHE-001 | Finding 10: "shared shard must be scrubbed before it ever becomes reusable"; cache domain key includes de-identification schema version |
| LLM-API-CACHE-004: Deterministic method tile promotion criteria | runtime-ingestion | `docs/intake/issue-drafts/LLM-API-CACHE-004-method-tile-promotion.md` | tapestry, runtime-ingestion, method-promotion | TC-005 promotion state machine | Finding 16: repeated successful cognition → deterministic reusable methods; vendor call disappears for promoted tiles |
| LLM-API-CACHE-005: On-premise anonymization/transliteration implementation | privacy, architecture | `docs/intake/issue-drafts/LLM-API-CACHE-005-onpremise-anonymization.md` | privacy, middleware, anonymization, entif | NOT LAME PRD | Finding 9: on-prem box anonymizes/transliterates inputs; example: dollar amounts → quatloos |
| LLM-API-CACHE-006: Auditable Agent Gateway as first GTM artifact | GTM, product | `docs/intake/issue-drafts/LLM-API-CACHE-006-auditable-agent-gateway.md` | GTM, product, receipts, governance, enterprise | NOT LAME PRD guard layer | Findings 13-14: auditable tool-using assistant with receipts + incident envelope; "sell before build" via design partners |

---

## Project Board Suggestions

- **Area:** Runtime Ingestion + Cache Strategy
- **Cycle:** Batch 3 (source dialogue)
- **Status:** Ready for triage
- **Blocked by:** NOT LAME PRD (context compiler, guard layer), TC-005 (promotion state machine)
- **Parallelization notes:** LLM-API-CACHE-001 through LLM-API-CACHE-003 can proceed in parallel; LLM-API-CACHE-004 requires TC-005; LLM-API-CACHE-005 and LLM-API-CACHE-006 can proceed in parallel once NOT LAME PRD guard layer is defined

---

## Open Questions

- Has the four-object proposal (context_block, tapestry_manifest, cache_domain_slug, provider_prefix_plan) been superseded by later specs? Need cross-reference check against OMC spec and NOT LAME PRD.
- Is there existing work on the de-identification/transliteration layer, or is this net-new?
- What is the formal definition of "repeated successful cognition" for method tile promotion criteria? (VOI gating? Receipt chain length? Both?)
- Has the "auditable agent gateway" GTM motion been started with any design partners?
