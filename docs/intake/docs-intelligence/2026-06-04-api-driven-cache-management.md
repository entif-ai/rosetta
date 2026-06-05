# DI Extraction — API-driven Cache Management

## Source

- Path: docs/chats/20260411 - Chat GPT - API-driven Cache Management.md
- Title: API-driven Cache Management
- Date evidence: 4/11/2026
- Authority tier: conversational — product ideation dialogue between operator and AI
- Freshness: current (April 2026)
- Word count: ~3,500 (transcribed exchange, ~5 prompt/response turns)
- Extractor: heartbeat:1780631570
- Extraction date: 2026-06-04

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A product-ideation dialogue covering API-driven LLM cache management across OpenAI, Anthropic, and Google Gemini/Vertex AI, the case for Entif as an "inference firewall + semantic cache router + provenance-native governance layer," and a parallelized go-to-market strategy for enterprise design-partner pilots. This doc was already partially extracted (2026-04-25-api-cache-mgmt.md exists with no concepts captured). This cycle produces the full systematic extraction.

## Goals And Intent

- Map exactly which provider boundaries support shared context cache without an explicit shared cache ID
- Explore Entif's product wedge as an enterprise inference firewall and semantic cache router
- Pressure-test the $100m ARR by month-six projection
- Establish a parallel go-to-market approach: belief pack + design-partner pilots + MVP build

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | OpenAI cache semantics lines 1-3 | openai, prompt-caching, cache-key, org-scope | openai, cache, cost-reduction | technology | OpenAI prompt caching is automatic for prompts ≥1024 tokens; cache hits require exact repeated prefix. No user-managed shared cache object or cache ID. Org-level reuse only. `prompt_cache_key` improves routing stickiness for shared prefixes. | OpenAI Developers Prompt Caching guide | OpenAI is shared-warm-prefix inside one API org, not a named cache artifact. | high |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Anthropic cache semantics | anthropic, cache-control, workspace-isolation | anthropic, cache, isolation | technology | Anthropic prompt caching is via `cache_control` top-level field or explicit cache breakpoints on content blocks. No shared cache ID in the Claude API sense. Starting February 5, 2026: workspace-level isolation (not org-level). Caches isolated per workspace. Default cache lifetime 5 min; 1-hour extended at optional extra cost. | Claude API Docs Prompt Caching | Anthropic gives shared within one Claude workspace, but no named shared cache ID. | high |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Gemini/Google cache semantics | gemini, vertex-ai, context-caching, iam, project-scope | google, cache, iam, vertex-ai | technology | Gemini Developer API: implicit caching (auto, Gemini 2.5+) is project-level with 24h TTL. Explicit caches are named API resources (`cachedContents/{id}`) reused via `cached_content=cache.name`. Gemini API keys are tied to Google Cloud project. Vertex AI: context caches are explicit project resources named `projects/PROJECT_NUMBER/locations/LOCATION/cachedContents/CACHE_ID`, governed by IAM. Vertex is the only provider offering a true named cache resource + IAM-controlled access. | Google AI Developers context caching docs; Vertex AI docs | Vertex AI is the cleanest enterprise architecture for shared cross-seat cache: named resource + IAM + project boundary. | high |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | "Shared cache across separate human seats" — verdict | cache-boundary, provider-comparison, seat-vs-org | openai, anthropic, google, cache | decision | "Shared cache across separate human seats" is always an API org / workspace / project boundary, never a seat feature. The winning pattern is centralize calls through one provider boundary and keep the static prefix stable. | Provider docs cross-referenced | Do not rely on human seats as the unit of cache sharing for any provider. | high |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Entif product wedge: inference firewall | entif, privacy-membrane, guard, rights-scoping, cache-governance | entif, security, privacy, cache | requirement | Entif's box acts as: (1) privacy membrane — strips or transliterates sensitive specifics before external inference calls; (2) rights-aware cache governor — ABAC/RBAC-enforced cache domains keyed by content hash, policy version, rights domain; (3) semantic equalizer — collapses "different wording, same underlying ask" into a single typed problem shape; (4) trust/replay layer — receipts-first, immutable audit trail, Guard as admission controller, Tripwire as pre-dispatch kill switch. | Entif v0 Bootstrapping Plan; Entif 2.0 Secure Architecture docs | These four roles are the structural basis of the Entif product. All four must be specifiable as first-class before production claims. | high |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Cache key composition formula | cache-key, abac, semantic-equivalence, policy-version | cache, rights, governance | requirement | Effective cache key for multi-tenant enterprise must be: `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash`. Simple intent-only keys fail when two users with different entitlements ask semantically similar questions. | Derived from dialogue on entitlements and cache invalidation | The cache key formula must be explicit in the NOT LAME context compiler spec before implementation. | high |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Token cost reduction claim | cost-reduction, inference-cost, token-burn | economics, openai, anthropic, google | risk | Dialogue claims 50-90% inference cost reduction via Entif for regulated enterprise workflows. No empirical basis cited. No controlled benchmark provided. Likely optimistic for greenfield adoption without existing prompt engineering overhead. | Dialogue, operator claim | Before sales pitch, run one controlled measurement: current token spend for a defined workflow vs. modeled Entif-prefix optimization. | medium |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Company handbook workflow as wedge demo | proof-of-concept, handbook-workflow, local-resolution | entif, product, demo | decision | The company handbook/employee-benefits example is the strongest demo wedge: measurable latency delta, measurable cost delta, measurable audit trail, rights-aware answer composition, no off-prem inference for static policy tiles. Demonstrable on day 1 without full production build. | Derived from dialogue | Build one vivid demo showing the handbook example with direct-to-vendor vs. Entif-path cost/privacy/exposure comparison. | high |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Multi-provider composition need | multi-provider, composition, provenance-spine | entif, architecture, integration | risk | Even if downstream vendors don't support composable prompt caches, Entif can fan out structured sub-queries to each provider, retrieve scoped facts, stitch under local provenance chain. But the merged answer itself becomes a derived artifact needing receipts, version refs, and challengeability. No explicit multi-provider composition protocol defined yet. | Derived from dialogue | Define a multi-provider composition receipt format as part of the NOT LAME provenance spec before implementation. | medium |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Transliteration leak risk | transliteration, privacy-budget, re-identification | entif, privacy, security | risk | Replacing soybeans with gidgets (fictional entities) is good but residual structure can still betray original if correlated fields travel together. Entif needs privacy budget discipline and rules for what field combinations may leave the on-prem boundary. | Derived from dialogue | Model the privacy budget as a composition constraint in the Guard/rights spec. No combination of certain field classes may travel together off-prem. | high |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | $100m ARR month-six projection | revenue-projection, enterprise-sales, sales-cycle | business, go-to-market | risk | Operator projects $100m ARR by month six. Enterprise sales cycles are typically 6-18 months for significant deals. Regulated verticals (banking, healthcare) add 3-6 months of security review. The projection is champagne hallucination; plausible long-term trajectory if wedge is proven. | Derived from dialogue; enterprise sales knowledge | Replace with a 12-month realistic ramp: design partner cohort → paid pilots → evidence-based expansion narrative → Series A. | medium |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Sell-before-build artifact stack | design-partner, belief-pack, roi-calculator, sales-motion | business, go-to-market | decision | The recommended belief pack for early sales: 10-12 slide deck, 1-page executive memo, security/governance posture one-pager, design-partner offer, ROI frame around token savings + privacy boundary reduction + governance simplification. These are the "narrative proof, product proof, commercial proof" artifacts that big consultancies sell before building. | Derived from prior sell-before-build playbook in corpus | Produce the five belief-pack artifacts before active outreach. | high |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Entif as "enterprise inference firewall + semantic cache router + provenance-native governance layer" | product-definition, enterprise-category, inference-firewall | business, product, entif | decision | This is the core articulation of the Entif product category. Not a chatbot, not middleware, not an "AI wrapper." Three distinct product layers braided into one: inference firewall (privacy membrane, Guard gating, off-prem exposure reduction), semantic cache router (policy-aware cache domains, invalidation tied to tile superseded events, composition), provenance-native governance layer (receipts for all durable mutations, immutable audit trail, ABAC/RBAC before cache lookup). | Derived from dialogue | Name this triple product explicitly in the NOT LAME PRD and align all spec sections to these three axes. | high |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | OpenAI ChatGPT Enterprise workspace ≠ API org | openai, workspace, api-org, billing-boundary | openai, enterprise, billing | technology | A ChatGPT Enterprise/Business workspace is NOT the same thing as an OpenAI API Platform organization. Membership managed separately. Sharing prompt cache across them is not possible. | OpenAI Help Center | When designing multi-tenant Entif deployments for OpenAI customers, map ChatGPT workspace membership vs. API org membership as separate configuration axes. | high |
| 2026-06-04 | docs/chats/20260411 - Chat GPT - API-driven Cache Management.md | Weak-to-strong routing auditability need | weak-to-strong, routing, audit, model-selection | entif, routing, governance | open-question | If a cheap model triages and a stronger model resolves, the handoff rationale needs to be inspectable. Otherwise the system is a black box with better invoices. No spec yet for the model-routing audit metadata. | Derived from dialogue | Add a `model_routing_receipt` schema to the NOT LAME provenance spec: logs which model made a triage decision, what signal triggered escalation, what the stronger model's answer was. | medium |

---

## Components And Technologies

- OpenAI Prompt Caching API (`prompt_cache_key`, automatic for ≥1024 tokens, org-level scope)
- Anthropic Claude Prompt Caching (`cache_control`, workspace-level isolation starting Feb 2026), explicit cache breakpoints
- Google Gemini Context Caching — implicit (project-level, 24h TTL, Gemini 2.5+) and explicit (named `CachedContent` resources)
- Google Vertex AI Context Caching — IAM-governed project resources (`projects/.../cachedContents/CACHE_ID`)
- Fictional entity transliteration (soybeans→quatloos, gidgets) as PII/semantic masking pattern
- Multi-provider structured sub-query fan-out + composition layer
- Context fabric / cache orchestrator: content-addressable blocks, RBAC/ABAC-aware domains, TTL, invalidation pipelines

---

## Conceptual Claims

1. **Cache boundary ≠ seat boundary.** For all three major providers (OpenAI, Anthropic, Google), the natural shared cache boundary is API org, workspace, or project — not individual user seats. Entif must centralize through one provider boundary to benefit from cache reuse.

2. **Vertex AI is the only provider with a real shared-cache primitive.** GCP gives named `CachedContent` resources + IAM control, making it the only vendor that natively supports the "maintain seat separation, share one context cache" architecture out of the box.

3. **Entif's value is shrinking exposed surface area, not just reducing token burn.** The four-part product (inference firewall + semantic cache router + provenance layer + privacy membrane) is differentiated by its compounding risk-reduction properties, not cost alone.

4. **The product sells itself in two directions simultaneously.** Upward: governance, risk reduction, compliance, cost control. Downward: faster answers, better agent workflows, less prompt wrangling. This dual-axis sell is rare.

5. **Design partner pilots are the primary commercial motion, not enterprise contracts.** Paid design partner + scoped architecture workshop + pilot scoping + first implementation lane in one constrained workflow + conversion path = the sellable unit.

6. **Belief pack artifacts (deck, memo, ROI calculator) can precede the demo.** Big consultancies sell before building; the articulation is the evidence. An MVP demo sharpens procurement but is not a prerequisite for initial outreach.

7. **Cache poisoning from stale policy tiles is the highest-consequence failure mode.** When the system serves a fast, confident, wrong internal answer from a superseded handbook tile, the blast radius exceeds the cost savings.

---

## Dependencies And Sequencing

- DI-010 (prior-work dedup): Already flagged — `2026-04-25-api-cache-mgmt.md` exists in `docs/intake/docs-intelligence/` with empty concepts; this cycle produces the proper full extraction
- NOT LAME: Write-Admission Gate state machine must define cache invalidation triggers (tile superseded event, rights change event, policy version bump)
- NOT LAME: Context Compiler must adopt the `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash` cache key formula
- NOT LAME: Provenance spine must include `model_routing_receipt` schema for weak-to-strong handoffs
- TC-006 (tapestry v1 + rights + Postgres): Entif's semantic cache router is a consumer of the tapestry primitive — tapestry must support rights-scoped retrieval before Entif cache router ships
- DI-012 (anti-personhood-correlation): The transliteration pattern (soybeans→quatloos) requires a formal privacy-budget schema; currently mentioned but not spec'd

---

## Contradictions Or Supersession

- **No contradiction found.** The doc builds on prior Entif/notin architecture docs. Cache key formula and multi-provider composition requirement are consistent with existing NOT LAME context compiler (bounded bundles by role/risk class) and receipt-law (receipts for every durable mutation).
- **Potential supersession:** The GO-TO-MARKET claim ($100m ARR month-six) is aggressively optimistic relative to the conservative build-out approach in other docs. The product thesis is consistent; the revenue projection is aspirational narrative, not a spec'd metric.

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| ACM-001: Formalize multi-provider composition receipt format | doc-candidate | `docs/intake/issue-drafts/acm-001-multi-provider-composition-receipt.md` | architecture, provenance, integration | — | Even if downstream vendors don't support composable prompt caches, Entif fans out structured sub-queries. The merged answer is a derived artifact needing receipts and version refs. No explicit composition protocol defined in the corpus. |
| ACM-002: Cache key must be rights-domain-aware, not just intent-based | doc-candidate | `docs/intake/issue-drafts/acm-002-rights-aware-cache-key-formula.md` | cache, rights, security, abac | — | Standard intent-keyed caching fails when users with different entitlements ask semantically similar questions. Effective cache key requires: `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash`. This formula appears in the doc but is not yet in the NOT LAME spec. |
| ACM-003: Privacy budget schema for transliteration field combinations | doc-candidate | `docs/intake/issue-drafts/acm-003-privacy-budget-transliteration.md` | privacy, security, entif | — | Transliteration (soybeans→quatloos) can still leak by correlated field combinations traveling together. Entif needs formal privacy budget discipline: rules for which field combination classes may leave on-prem boundary. No such schema exists in the corpus yet. |
| ACM-004: Vertex AI as canonical shared-cache reference architecture | doc-candidate | `docs/intake/issue-drafts/acm-004-vertex-ai-shared-cache-reference.md` | architecture, google, vertex-ai, cache | — | Vertex AI is the only major provider offering IAM-governed named cache resources. Entif should adopt Vertex AI as the reference architecture for "maintain seat separation, share one context cache" with explicit rationale for why OpenAI and Anthropic require gateway centralization instead. |
| ACM-005: Model routing receipt schema for weak-to-strong handoffs | doc-candidate | `docs/intake/issue-drafts/acm-005-model-routing-receipt.md` | provenance, routing, governance | — | When cheap model triages and strong model resolves, the handoff rationale must be inspectable. No `model_routing_receipt` schema in the existing provenance specs. Without it, Entif is a black box with better invoices. |
| ACM-006: Prove 50-90% token cost reduction claim with controlled benchmark | doc-candidate | `docs/intake/issue-drafts/acm-006-token-cost-reduction-benchmark.md` | economics, measurement, claims | — | Operator claims 50-90% inference cost reduction. No empirical basis cited. Before using in sales pitch, one controlled measurement against a defined workflow is required. |
| ACM-007: Design partner belief pack — five artifact deliverables | doc-candidate | `docs/intake/issue-drafts/acm-007-belief-pack-artifacts.md` | go-to-market, sales, design-partner | — | Recommended belief pack (10-12 slide deck, 1-page executive memo, security posture one-pager, design-partner offer, ROI frame) not yet produced as concrete artifacts. These are prerequisites for active outreach to warm network. |
| ACM-008: Stale cache poisoning — invalidation must be tile-version-driven | doc-candidate | `docs/intake/issue-drafts/acm-008-tile-version-driven-cache-invalidation.md` | cache, provenance, correctness | — | Company handbook example: Entif answers cached policy questions without hitting off-prem inference if tile hasn't changed. Failure mode: stale tile serves a fast confident wrong answer. Invalidation must be ruthlessly tied to superseded tiles, policy version changes, entitlement changes. Not yet a spec'd constraint. |

---

## Project Board Suggestions

- Area: entif/product
- Cycle: batch-3-ideation
- Status: candidate
- Blocked by: NO explicit blockers; proceeds independently of runtime ingestion readiness
- Parallelization notes: The eight ACM-00X issue drafts can be prioritized independently. ACM-004 (Vertex AI reference arch) is the most architecturally grounding. ACM-002 (rights-aware cache key) directly feeds into NOT LAME context compiler. ACM-008 (cache invalidation) requires tapestry version tracking first.

## Open Questions

1. What is the formal schema for a multi-provider composition receipt? Which entity signs it?
2. Is the `semantic_intent` component computable deterministically, or does it require a foundational model call at write time?
3. Under what conditions may correlated PII-adjacent fields leave the on-prem boundary? What is the Entif policy for combining desensitized fields across provider calls?
4. Does Entif's transliteration use a canonical fictional vocabulary (quatloos/gidgets) or a per-client generated substitution lexicon? Who governs the lexicon?
5. Who is the first design partner? The operator's network is described as C-level execs and SVPs at 9-figure ARR startups / Fortune 100s — no specific identification.
6. What is the pricing model for the initial design partner cohort? (Per-seat? Per-query? Flat Engagement? Tiered by workflow complexity?)
7. What does "weak model triages, strong model resolves" mean operationally for model selection? Is it threshold-based on entropy, hard-coded rule, or learned?
