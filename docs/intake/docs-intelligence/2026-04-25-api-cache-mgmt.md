# DI Extraction: API-driven Cache Management

**Source:** `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
**Extracted by:** heartbeat subagent
**Date:** 2026-04-26
**Issue prefix:** APC-XXX

---

## Document Summary

The document is a ChatGPT conversation (4/11/2026) between Crates (Entif) and an LLM. The conversation covers two major areas:

1. **Technical analysis:** Whether separate authenticated seats across OpenAI, Anthropic, and Google Gemini can share a single context cache while retaining seat separation. Each provider has different primitives and boundaries.

2. **Product/business synthesis:** Positioning Entif as an enterprise inference firewall, semantic cache router, and provenance-native governance layer. Entif's on-premise box acts as a privacy membrane, anonymizing/transliterating inputs before inference, routing intelligently, composing multi-provider answers, and governing cache lifecycle. The document also covers go-to-market strategy: "sell before build," design partner pilots, and a challenge against unrealistic ARR projections.

---

## Findings

### Finding APC-001: OpenAI Prompt Caching Has No Shareable Cache ID Primitive

**Confidence:** HIGH — Direct from OpenAI official docs cited.

**Details:**
- OpenAI prompt caching is **automatic** for prompts ≥1024 tokens with exact prefix matching.
- Cache hits can be improved with `prompt_cache_key` for routing stickiness.
- Prompt caches are **NOT shared between organizations**; only members of the same organization can access caches of identical prompts.
- ChatGPT Enterprise/Business workspace membership is **completely separate** from API Platform organization membership.
- In-memory cache retention: typically 5–10 min, up to 1 hour; 24-hour extended retention available for supported models.
- **No named cache artifact or shareable cache ID exists.** Caching is org-scoped implicit prefix matching, not a cache object store.
- Cross-seat sharing within same API org: YES. Cross-workspace sharing: NO.

**Source:** [Prompt caching | OpenAI API](https://developers.openai.com/api/docs/guides/prompt-caching); [OpenAI Help Center](https://help.openai.com/en/articles/9047883-im-a-member-of-my-companys-chatgpt-enterprise-workspace-do-i-automatically-get-access-to-our-api-platform-organisation-too)

---

### Finding APC-002: Anthropic Workspace-Level Cache Isolation (No Shared Cache ID)

**Confidence:** HIGH — Direct from official Anthropic docs.claude.com cited.

**Details:**
- Anthropic prompt caching works via `cache_control` top-level field or explicit cache breakpoints on content blocks.
- Default cache lifetime: **5 minutes**. Optional 1-hour cache duration at additional cost.
- **Critical change effective February 5, 2026:** Anthropic moved from organization-level isolation to **workspace-level isolation**. Caches are isolated per workspace.
- Different organizations never share caches.
- No single shared cache ID primitive — still prefix caching controlled via `cache_control`.
- Same Anthropic workspace, different seats: cache reuse possible with exact prefix match.
- Different workspaces within same organization: NO cache sharing after the Feb 2026 change.

**Source:** [Prompt caching - Claude API Docs](https://docs.claude.com/en/docs/build-with-claude/prompt-caching?via=onetts.com)

---

### Finding APC-003: Google Gemini/Vertex AI Offers Closest Match to Named Cache Resource + IAM

**Confidence:** HIGH — Direct from Google AI for Developers and Google Cloud docs cited.

**Details:**

**Gemini Developer API / AI Studio:**
- Two modes: **implicit caching** (automatic on Gemini 2.5+, project-level, 24hr TTL) and **explicit caching** (user-created, named resources).
- Explicit caches are real named API resources: `cachedContents/{id}` with full CRUD (create/get/list/update/delete).
- Reused via `cached_content=cache.name` parameter.
- API keys tied to Google Cloud project — implicit cache sharing boundary is **project**.
- Named cache sharing within same project: YES (implicit). Explicit cache resource sharing: YES, within project scope.

**Vertex AI:**
- Context caches are project resources with resource names like `projects/PROJECT_NUMBER/locations/LOCATION/cachedContents/CACHE_ID`.
- Access governed by **IAM** at project or resource level — cleanest enterprise-grade model.
- Separate agents/users can reference the same `cachedContents/CACHE_ID` via service accounts.
- **Vertex AI is the recommended path** for cross-seat cache sharing with seat-level IAM separation.

**Source:** [Context caching | Gemini API | Google AI for Developers](https://ai.google.dev/gemini-api/docs/caching); [Use a context cache | Generative AI on Vertex AI | Google Cloud Documentation](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-use); [Using Gemini API keys | Google AI for Developers](https://ai.google.dev/gemini-api/docs/api-key)

---

### Finding APC-004: Entif Product Category Defined as "Inference Firewall + Semantic Cache Router + Provenance Engine"

**Confidence:** HIGH — Direct from conversation synthesis in the source document.

**Details:**
The conversation identifies Entif's product positioning as three things braided together:
1. **Inference firewall** — Guard as admission controller, privacy membrane, ABAC/RBAC enforcement
2. **Semantic cache router** — Rosetta-native intent classification, deduplication, cache domain governance
3. **Provenance-native governance layer** — receipts, audit trail, immutable justification graph

The company-handbook example demonstrates the wedge:
- Classify intent locally
- Map to relevant policy tiles
- Verify user's entitlement domain
- Serve cached answer or compose from local structured sources
- Only escalate to external inference if ambiguity/synthesis burden warrants it

Multi-provider composition example (benefits):
- Entif fans out structured sub-queries to medical, dental, life, disability providers
- Each provider returns scoped facts via Entif's normalized schema
- Entif stitches results under a single local provenance chain
- This simulates composition layer even where downstream vendors don't support composable prompt caches

The value proposition stated: "fewer calls, narrower payloads, stricter cache domains, more local resolution, expensive inference only where ambiguity survives normalization."

**Source:** Conversation, 4/11/2026, second response block

---

### Finding APC-005: Semantic Equivalence Cache Keys Require Compound Structure (Intent × Rights Domain × Classification × Version)

**Confidence:** HIGH — Direct from source document's "dragons" challenge section.

**Details:**
- Naive semantic equivalence ("two differently worded questions are the same") fails when:
  - User A is entitled to Plan A, User B to Plan B
  - Surface language overlaps but access rights differ
- Cache key cannot be just intent — must be compound:
  ```
  semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash
  ```
- This directly implies Entif's cache constitution needs typed reason codes already defined: `CACHE_DOMAIN_MISMATCH`, `ABAC_CONDITION_FAILED`, `CLEARANCE_INSUFFICIENT`, `DATA_RESIDENCY_VIOLATION`.

**Source:** Conversation, 4/11/2026, second response block ("1. Semantic equivalence is not free")

---

### Finding APC-006: Transliteration Can Leak by Joins (Privacy Budget Discipline Required)

**Confidence:** HIGH — Direct from source document's "dragons" section.

**Details:**
- Replacing soybeans → gidgets is insufficient if residual structure betrays the original.
- When correlated fields travel together (e.g., crop type + geography + market timing), join inference can reconstruct originals.
- Entif needs not just redaction but **privacy budget discipline** and rules for what field combinations may cross the on-prem boundary.
- The transliteration strategy described: intercept private specifics, encrypt/hash the private blocks, substitute with normalized placeholders (quatloos/gidgets), return equivalent structure without exposing underlying specifics.

**Source:** Conversation, 4/11/2026, second response block ("2. Transliteration can leak by joins")

---

### Finding APC-007: Cache Poisoning and Stale Certainty Is the Most Dangerous Failure Mode

**Confidence:** HIGH — Direct from source document.

**Details:**
- Handbook example only works if invalidation is ruthlessly tied to:
  - Superseding tiles
  - Policy versions
  - Entitlement changes
- Without this, the failure mode is: **fast, confident, wrong internal answer** — worse than "no answer" because it appears authoritative.
- This reinforces the existing v0 spec requirements: activity-based TTL, policy-version-keyed cache domains, explicit invalidation triggers on content hash changes.

**Source:** Conversation, 4/11/2026, second response block ("3. Cache poisoning and stale certainty")

---

### Finding APC-008: Multi-Provider Composition Needs Its Own Provenance Spine

**Confidence:** HIGH — Direct from source document.

**Details:**
- Once Entif fans out to medical, dental, life, disability, and handbook sources simultaneously, the merged answer becomes a **derived artifact**.
- Each derived artifact needs:
  - Receipts referencing each sub-query
  - Version references for each source at query time
  - Challengeability — ability to trace back and verify each component
- This is distinct from single-provider provenance; composition provenance is a separate engineering problem.

**Source:** Conversation, 4/11/2026, second response block ("4. Multi-provider composition needs its own provenance spine")

---

### Finding APC-009: Weak-to-Strong Routing Must Be Auditable

**Confidence:** HIGH — Direct from source document.

**Details:**
- If a cheap model triages and a stronger model resolves, the handoff rationale must be inspectable.
- Without auditable handoffs, Entif becomes a "fancier black box with better invoices."
- This implies routing decisions need to be logged as first-class artifacts, not just outcomes.

**Source:** Conversation, 4/11/2026, second response block ("5. Weak-to-strong routing must remain auditable")

---

### Finding APC-010: $100M ARR by Month Six Is Challenged as Champagne Hallucination (Category Winability Affirmed)

**Confidence:** HIGH — Direct from source document's third response block.

**Details:**
- The $100M ARR by month six projection is explicitly challenged as "champagne hallucination."
- Enterprise sales cycles are slow; procurement is slow; security review is a swamp.
- The strongest buyers (regulated industries) are also the most rigorous in proof requirements.
- **The category thesis is affirmed:** the product could plausibly become a $100M+ ARR category winner, but requires first dominating a specific wedge with measurable proof.
- The correct GTM move: parallelize build + market, lead with a working proof in one constrained workflow (e.g., internal policy/benefits/handbook), then scale from evidence.

**Source:** Conversation, 4/11/2026, third response block

---

### Finding APC-011: Sell-Before-Build GTM Is Valid and Supported by Entif's Existing Artifact Depth

**Confidence:** HIGH — Direct from source document's fourth response block.

**Details:**
- For a thing with enough architecture depth already on paper, market motion does not need to wait for the demo.
- The "big shop" playbook: manufacture belief with artifacts, close pilots, build against demand signal.
- Artifact stack recommended:
  1. **Belief pack:** 10-12 slide deck, 1-page executive memo, 1-page security/governance posture, 1-page design partner offer, 1-page ROI frame (token savings, privacy reduction, governance simplification)
  2. **Commercial motion:** paid design partner, fixed term, architecture workshop + pilot scoping, commercial conversion path
  3. **Build track:** MVP that serves the sales motion (not the other way around)
- The specific sale to make: "a design-partner engagement around governed enterprise AI routing, privacy membrane, semantic caching, and auditable orchestration" — NOT "Entif the universal brain-governance engine."
- Network is characterized as existing and warm (ex-colleagues who became C-level/SVPs), not cold prospecting.

**Source:** Conversation, 4/11/2026, fourth response block

---

## Related Existing Issue-Drafts

- `YAAC-005-shared-caching-architecture.md` — tangentially related, covers shared caching at the architecture level but not API-driven cross-vendor primitives
- `SCRU-001-cache-orchestrator-architecture.md` — related to cache orchestration but scoped differently

---

## Confidence Legend

| Level | Meaning |
|-------|---------|
| HIGH | Direct from cited official docs or explicit source statements |
| MEDIUM | Synthesized from multiple source sections |
| LOW | Inferred from context, not directly stated |

---

## Topics/Keywords

`openai` `anthropic` `gemini` `vertex-ai` `prompt-caching` `context-caching` `shared-cache` `cache-id` `workspace-isolation` `project-level` `api-org` `enterprise` `inference-firewall` `semantic-cache` `provenance` `privacy-membrane` `transliteration` `gtm` `sell-before-build` `design-partner` `arr` `entif`
