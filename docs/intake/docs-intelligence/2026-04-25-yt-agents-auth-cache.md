# Docs Intelligence Extraction

## Source

- Path: `docs/chats/20260226 - Chat GPT - YT, Agents, Auth and Cache.md`
- Title: YT, Agents, Auth and Cache
- Date evidence: 2026/2/21–28
- Authority tier: high (multi-session deep technical + architectural synthesis)
- Freshness: high (Feb 2026)
- Word count: ~62,000
- Extractor: subagent
- Extraction date: 2026-04-25

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A massive multi-session conversation covering: (1) YouTube transcript ingestion via Fabric/yt-dlp; (2) comparison of Claw variants (OpenClaw, ZeroClaw, Nanobot, IronClaw, PicoClaw, Agent Zero) and Agent SDKs; (3) consulting business strategy at $700/hr; (4) AI scare trade analysis; (5) shared authorization-aware caching architecture; (6) full Entif Security Spine (`iam.*` tile kinds) with ROSETTA ROCK-3005-IAM profile; (7) message bus architecture with Mailroom/DLQ/Quarantine pattern. Dense with concrete schemas, reason codes, cost math, and architecture diagrams.

## Goals And Intent

- Build YouTube transcript ingestion pipeline for Entif graph DB
- Evaluate Claw variants and Agent SDKs for Mac Studio local deployment
- Build consulting practice fast (security hardening + agent enablement)
- Design authorization-aware shared caching for enterprise scale
- Define Entif Security Spine as ROSETTA ROCK-3005-IAM profile
- Design message bus gatekeeping architecture

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| YT transcript ingest pipeline | Fabric/yt-dlp captions-first, ASR fallback, checkpointing, idempotency by video_id | Entif ingestion | high | Rate throttle with --sleep-requests; jittered backoff |
| Claw variant evaluation | OpenClaw (ecosystem), ZeroClaw (Rust minimal), Nanobot (Python hackable), IronClaw (WASM security), PicoClaw (Go edge), Agent Zero (OS-native) | Tool evaluation | high | Security boundary model varies significantly |
| SOW-based consulting (no outcome guarantees) | "NEVER sell outcome; sell tight detailed scope of work" | Consulting practice | high | 6-section SOW shield |
| $700/hr rate with block discount | 30% off 50-hour prepaid blocks | Consulting pricing | medium | Anchor on packages, not hours |
| AI scare trade analysis | Karaoke co (Algorhythm Holdings) crashed logistics sector Feb 2026; autoimmune disorder market; 3 exposure categories | Market analysis | medium | Reflexivity + organizational hysteresis framing |
| Authorization-aware shared caching | "cache at fork, share across authorized users with matching checksum" | Entif caching | critical | RBAC/ABAC middleware, cache domain separation |
| Entif Security Spine (iam.* tiles) | iam.principal, iam.delegation, iam.cache_domain, iam.decision | Rosetta IAM profile | critical | Unified AuthN/AuthZ across all agent frameworks |
| ROCK-3005-IAM profile spec | Tile kinds, invariants, Guard micro-spine pattern, risk classes, shared caching integration | Rosetta/Entif | critical | Draft in design phase |
| Deterministic context block canonicalization | UTF-8, line-ending normalization, stable wrappers, ordering, version pinning | Rosetta/IAM | high | SHA-256 content addressing |
| Message bus gatekeeping architecture | Mailroom/DLQ/Quarantine pattern; header-first validation; CANONICAL ROSSETTA STORE as only write path | Rosetta message bus | high | NATS/Redis Streams backend |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-02-21 | YT Ingest | Fabric YouTube transcript mode | yt-ingest, fabric, captions, rate-limiting | YouTube transcript ingestion | technology | Fabric uses yt-dlp to extract subtitles/transcripts (no API key for captions); HTTP 429 increasingly common; recommend --sleep-requests, jittered backoff, checkpointing, idempotency by video_id | Build pipeline with captions-first, ASR fallback, checkpoint resume | high |
| 2026-02-21 | YT Ingest | Missing captions fallback | yt-ingest, asr, whisper, fallback | YouTube transcript ingestion | requirement | If video has no subs (and no auto-subs), mark needs_asr=true and run Whisper/ASR later | Plan ASR lane as coverage insurance | high |
| 2026-02-21 | YT Ingest | Auth-gated videos | yt-ingest, cookies, auth | YouTube transcript ingestion | technology | Fabric supports --cookies-from-browser for age-restricted/unlisted accessible videos | Need controlled environment for cookie handling | medium |
| 2026-02-21 | YT Ingest | Language track weirdness | yt-ingest, language, captions | YouTube transcript ingestion | requirement | Store actual language track as provenance (not just requested language) | Provenance field for language_actual | high |
| 2026-02-21 | YT Ingest | Proviance fields per transcript | yt-ingest, provenance | YouTube transcript ingestion | requirement | Minimum per transcript: source_url, video_id, channel_id, retrieved_at, method, language_requested, language_actual, has_timestamps, caption_track_id, hash of raw transcript | Model after Fabric output spec | high |
| 2026-02-21 | Claw variants | OpenClaw platform-first | openclaw, platform, ecosystem | Claw variant comparison | technology | OpenClaw = broad integrations, gateway architecture, tool policy, big ecosystem; real-world infostealer attacks + malicious skills documented; org bans happening | Run locked down: deny-by-default, curated skills, isolation | high |
| 2026-02-21 | Claw variants | ZeroClaw Rust minimal | zeroclaw, rust, minimal | Claw variant comparison | technology | ZeroClaw: <5MB RAM, <10ms startup, modular trait-driven, optional Docker sandbox; "agent runtime kernel" philosophy | Best for low-footprint swarm nodes | high |
| 2026-02-21 | Claw variants | Nanobot Python hackable | nanobot, python, hackable | Claw variant comparison | technology | ~4k LOC core, readable, MCP support, vLLM local model lane, 22.4k stars / 3.5k forks | Best for forkability + Entif customization | high |
| 2026-02-21 | Claw variants | IronClaw WASM security | ironclaw, wasm, security | Claw variant comparison | technology | IronClaw: Rust + WASM sandbox + encrypted local data + PostgreSQL; defense-in-depth as first-class product; MCP + WASM extension | Best for security-first posture | high |
| 2026-02-21 | Claw variants | PicoClaw Go edge | picoclaw, go, edge | Claw variant comparison | technology | PicoClaw: single Go binary, <10MB RAM, <1s boot, "Gene Evolution Protocol", self-evolving monitoring/automation agent; early/not for prod before v1.0 | For edge/IoT when mature | medium |
| 2026-02-21 | Claw variants | Agent Zero OS-native | agent-zero, os-native, docker | Claw variant comparison | technology | Agent Zero: "computer as tool", dynamic tool creation, multi-agent hierarchy, SKILL.md portability; Docker-first | For builder's agent OS with tight sandbox | high |
| 2026-02-21 | Claw variants | Security reality check | openclaw, security, infostealer, malware | Claw variant comparison | risk | Infostealers already stealing OpenClaw configs/tokens; malicious skills in marketplace; some orgs banning internally; prompt-injection attacks on adjacent tooling | Treat skills like npm packages: pin, review, assume compromise | critical |
| 2026-02-21 | Claw variants | Claw Runtime authority separation | claw-runtime, authority-separation | Claw variant comparison | technology | Claw Runtime: agent can think/propose but cannot execute without external approval; policy + cost controls in control plane | Pattern to borrow for Entif guard layer | high |
| 2026-02-21 | Claw variants | Selection advice for Entif | entif, claw-selection, recommendations | Claw variant comparison | requirement | Kernel/worker: ZeroClaw or Nanobot; Security philosophy: IronClaw concepts; Edge: PicoClaw (once mature); General power: Agent Zero in tight sandbox | Multi-variant strategy based on use case | high |
| 2026-02-21 | OpenClaw acquisition | OpenAI hires Steinberger | openclaw, openai, acquisition | OpenClaw market | technology | OpenAI hired OpenClaw founder Peter Steinberger; OpenClaw staying OSS under independent foundation with OpenAI support/funding | Accelerant for enterprise adoption | medium |
| 2026-02-21 | Email privilege ladder | Phase 0-3 deployment | email, privilege-ladder, security | Email agent deployment | requirement | Phase 0: Local lab zero credentials. Phase 1: Read-only triage (least privilege scopes). Phase 2: Draft-only human sends. Phase 3: Limited autonomous send with allowlist/recipients/rate limits/audit | Implement phased privilege ladder | critical |
| 2026-02-21 | Consulting wedge | Agentic AI Enablement + Hardening positioning | consulting, positioning, security | Consulting business | requirement | "I help companies replace AI theater with measured, secure, workflow-level results in 2-4 weeks." Market vacuum: orgs restricting/banning OpenClaw, credential theft campaigns | Position as "adult supervision with fire extinguisher" | high |
| 2026-02-21 | Consulting artifacts | Decision matrix, secure baseline, hardening checklist | consulting, deliverables | Consulting business | requirement | Claw-verse Decision Matrix (exec + tech appendix), Secure Agent Baseline reference architecture, Hardening checklist | These are the sellable artifacts | high |
| 2026-02-21 | Consulting offer ladder | 3 productized offers | consulting, offers, pricing | Consulting business | requirement | Offer 1: AI Readiness Assessment (2-3 days, fixed fee). Offer 2: 2-Week Pilot Sprint (fixed fee). Offer 3: 90-Day Scale Plan (retainer/block) | Productized beats bespoke for velocity | high |
| 2026-02-21 | SOW shield | 6-section contract structure | sow, consulting, contract | Consulting business | requirement | 1) Deliverables (tangible artifacts). 2) Acceptance criteria (binary/testable). 3) Assumptions + client responsibilities. 4) Out of scope. 5) Change control. 6) Limitations disclaimers (AI-specific: model nondeterminism, third-party deps, security=risk reduction not elimination) | Never sell outcomes; sell scope | critical |
| 2026-02-21 | Rate strategy | $700/hr with block discount | consulting, rate, pricing | Consulting business | requirement | $700/hr; 50-hour block prepaid at effective $490/hr; block expires 90 days; unused hours roll to advisory-only; minimum engagement 20 hours | Anchor on packages, not hours | medium |
| 2026-02-21 | AI scare trade | Algorhythm Holdings logistics crash | ai-scare-trade, reflexivity, market | Market analysis | requirement | Former karaoke co (Algorithm Holdings, $6M market cap) press release on freight optimization crashed logistics sector Feb 12, 2026; CH Robinson -24%; 5th such event in 10 days; market = autoimmune disorder | Real market phenomenon; "dump first analyze later" pattern | high |
| 2026-02-21 | AI scare trade | 3 exposure categories | ai-scare-trade, exposure-categories | Market analysis | requirement | Cat 1: Already displacing labor (SW development). Cat 2: Real impact on 3-5yr horizon (wealth mgmt, insurance brokerage). Cat 3: Market lost the plot (former karaoke co vs CH Robinson relationships) | Use to calibrate consulting client expectations | high |
| 2026-02-21 | AI scare trade | Reflexivity + organizational hysteresis | ai-scare-trade, reflexivity, hysteresis | Market analysis | requirement | Stock drops create organizational reality (hiring freezes, roadmap pivots, performative AI partnerships); organizations respond to 15% stock drop by gutting product teams | "Domain translator" role is the career wedge | high |
| 2026-02-21 | AI scare trade | Domain translator opportunity | ai-scare-trade, domain-translator | Market analysis | requirement | Gap between "I've heard AI can do this" and "I've tested it on our workflow with real data" = canyon; scare trade compressed timeline for this role; boards demanding AI strategy without anyone who can translate | Position as domain translator with workflow proof | high |
| 2026-02-21 | Claude OAuth/SDK | Anthropic OAuth token policy | anthropic, oauth, claude-code, terms | Claude API policy | risk | Current docs say OAuth tokens from Free/Pro/Max are for Claude Code and claude.ai only; Agent SDK explicitly named as not permitted; enforcement happening (tokens rejected, workflows breaking) | OpenClaw cannot use Claude subscription as API passthrough | critical |
| 2026-02-21 | Claude OAuth/SDK | Tariq clarification | anthropic, clarification, tariq | Claude API policy | technology | Tariq (Anthropic) clarified: Max subscriptions can still use Agent SDK for local dev/prototyping; should use API key for "building a business on top" | Local dev OK on subscription; prod = API key | medium |
| 2026-02-21 | Claude OAuth/SDK | Why "wrap SDK" doesn't work | anthropic, sdk, wrapper, arbitrage | Claude API policy | risk | Even "non-prod" wrapping = proxying consumer credentials through third-party tool = explicitly prohibited; Agent SDK designed for API-key auth; enforcement risk non-trivial | Use API key auth for OpenClaw automation | critical |
| 2026-02-21 | Claude OAuth/SDK | Practical path forward | anthropic, api-key, openclaw | Claude API policy | requirement | Claude Code for interactive work (subscription); OpenClaw automation = API key auth (usage-based); Claude subscription for interactive analysis | Separate subscription (interactive) from automation (API key) | high |
| 2026-02-21 | Feature matrix | Claw vs Agent Zero vs SDKs vs CLI | feature-matrix, comparison | Tool comparison | technology | Full comparison table: OpenClaw (personal assistant, multi-channel), Agent Zero (autonomous OS-native), Claude Code (coding CLI, Claude-only), OpenAI Codex (web/CLI/IDE, ChatGPT plans), Gemini CLI (ReAct+MCP, quota/PAYG), Agent SDKs (build-your-own, production), GitHub Agent HQ (PR/issue workflows) | Keep matrix for consulting deliverables | high |
| 2026-02-21 | Cost stack-up | Fixed tiers vs usage-based | cost-stackup, pricing, api | Cost comparison | technology | Claude Pro $20/mo, Max from $100/mo (usage multipliers); ChatGPT Plus $20, Pro $200, Business $30/user; Gemini Code Assist $0/$19/$45 per user/mo; API: GPT-5.2 $1.75 in/$14 out; Claude Sonnet 4.5 $3 in/$15 out; Gemini 2.5 Pro $1.25 in/$10 out (≤200k) | Model costs for consulting proposals | high |
| 2026-02-21 | Cost surprise | $200 AI Studio bill in 3 days | gemini, ai-studio, billing, surprise | Cost management | risk | Manual UI queries + long chats = huge context resend per turn; AI Studio ships accumulated history each prompt; crossed 200K boundary = $4/Mtok (2x normal rate) | Treat long chats as radioactive; start new threads often | high |
| 2026-02-21 | Implicit caching | Why it "doesn't feel on" | gemini, caching, implicit, hit-rate | Cost management | requirement | Implicit caching is real (75-90% discount) but requires: stable prefix (tiny changes break it), minimum request sizes, short time window, no visibility in UI without API metadata inspection | Use API calls to inspect cachedContentTokenCount | high |
| 2026-02-21 | Explicit caching economics | Break-even math | gemini, caching, explicit, storage-rent | Cost management | technology | Explicit cache storage: $4.5/Mtok-hour (Gemini 3 Pro); cached input: $0.2-0.4/Mtok; Break-even: 2+ reuses within 10 min for 1M-token prefix = explicit caching wins | Activity-based TTL required to avoid storage bleed | critical |
| 2026-02-21 | Titans + Nested Learning | Memory taxonomy | titans, nested-learning, memory | ML research | technology | Titans: attention as short-term, neural memory module as long-term. Nested Learning: continuum memory system (not just short/long), modules update at different frequencies; "Hope" continual learning module | Frame Entif memory planes in same taxonomy | medium |
| 2026-02-21 | Shared caching idea | "Cache at fork, share across authorized users" | shared-caching, enterprise, arbitrage | Caching architecture | requirement | Key cache by Git blob hash (dedupes across branches automatically); activity-based TTL (sliding window); PR closure as optional invalidation hint; "no one referenced this blob for X minutes" is stronger signal | Design cache orchestrator around blob hash + activity TTL | critical |
| 2026-02-21 | Cache domain concept | Security domain = (tenant × classification × policy × vendor) | cache-domain, rbac, abac, multi-tenant | Caching architecture | requirement | Cache per security domain; inside domain reuse is safe if principal authorized; cross-domain forbidden unless explicit public corpus designation | Implement domain separation as first-class concept | critical |
| 2026-02-21 | Shared caching economics | o(n) tokens vs o(1) cache rate arbitrage | cache-arbitrage, enterprise, economics | Caching architecture | requirement | If N=normal input $/Mtok, H=cached input $/Mtok, S=storage $/Mtok-hour, k=reuses, t=hours: k > (N + S*t) / (N - H). Example: 2+ reuses in 10 min = explicit caching wins | Quantify savings per cache domain | high |
| 2026-02-21 | Public corpora caching | Tax codes, statutes, regulations | public-corpora, tax-codes, shared-cache | Caching architecture | technology | Public, high-frequency corpora (tax codes, statutes) can be shared across all tenants with same version; versioned by jurisdiction + effective_date + source_url + revision_hash | Design public corpus cache class | high |
| 2026-02-21 | Tenant-scoped caching | Engagement/matter-scoped documents | tenant-cache, engagement-cache | Caching architecture | requirement | Statements of work, discovery docs, client contracts = narrow domain: tenant + engagement_id + classification + ABAC; cache only for principals authorized for that engagement | Design engagement-scoped cache domain type | high |
| 2026-02-21 | Content-addressable blocks | block_id = H(canonical_bytes(block)) | content-addressing, hashing, cache-blocks | Caching architecture | requirement | SHA-256 over canonicalized payload; store metadata: tenant_id, classification, labels, source_version, expires_at, vendor_cache_handle | Implement deterministic canonicalization per ROCK-3005-IAM App A | critical |
| 2026-02-21 | Middleware in-flight algorithm | Prompt router as insertion point | prompt-router, middleware, guard | Caching architecture | requirement | Decompose prompt into (stable_prefix_blocks + volatile_tail); policy engine check; cache index consult; send to LLM with cache handles + volatile content; log cached token hits + cost savings | Design prompt router as Guard-adjacent component | high |
| 2026-02-21 | Cache side-channel risks | Timing, hit/miss metadata | cache-side-channel, security | Caching architecture | risk | "Cache existence" via timing differences; infer sensitive work via hit/miss patterns; metadata exposure. Mitigations: normalize latency/jitter, never expose cache-hit to users, keep cache indices server-side only | Add side-channel mitigations to cache domain spec | medium |
| 2026-02-21 | Provider boundary reality | Cache artifacts inside cloud project/API key | provider-boundary, cache, multi-tenant | Caching architecture | risk | Cache artifacts live inside specific cloud project, API key, region; cross-enterprise sharing only for explicit public corpus | Don't assume cross-tenant cache sharing works automatically | medium |
| 2026-02-21 | Cache orchestrator MVP | Repo Global Pack + instrumentation | cache-orchestrator, mvp, instrumentation | Caching architecture | requirement | MVP: deterministic Global Pack (20-80k tokens), every request starts same pack, measure cached tokens via API metadata (usage.cached_tokens for OpenAI, cachedContentTokenCount for Vertex) | Build MVP to validate theory quickly | high |
| 2026-02-21 | Entif Security Spine | Action/Decision/Receipt unified contract | security-spine, action, decision, receipt | Entif security | requirement | Every "thing an agent can do" = Action; evaluated by policy engine → Decision; immutable Receipt logged. This is the universal contract across all frameworks. | Unify all agent frameworks through this contract | critical |
| 2026-02-21 | iam.principal tile | Unified identity for humans/agents/services | iam-principal, identity, unification | Rosetta IAM profile | requirement | Fields: principal_id, tenant_id, type (HUMAN/AGENT/SERVICE), status, roles, attributes (clearance), agent_profile (owner, purpose, max_authority). Invariants: non-ACTIVE = deny non-read; no secrets in tile; principal_id unique per tenant | Implement iam.principal as StdPack tile | critical |
| 2026-02-21 | iam.delegation tile | Explicit delegation chain human→agent | iam-delegation, delegation, chain | Rosetta IAM profile | requirement | Fields: delegator_ref, delegatee_ref, scope (capabilities_allow, deny, resource_constraints), validity (issued_at, expires_at). Invariants: non-amplification (can't grant what delegator doesn't have); time-bounded; Guard validates chain on every AGENT action | Implement iam.delegation as StdPack tile | critical |
| 2026-02-21 | iam.cache_domain tile | Security boundary for shared caching | iam-cache-domain, cache-domain, boundary | Rosetta IAM profile | requirement | Fields: tenant_id, classification (max_classification, labels), abac_constraints, vendor_constraints (provider, project, region, cross_tenant), lifecycle (ttl_policy, default/max ttl), economics (min_reuse, max_storage_usd/day). Invariants: cross_tenant=false unless PUBLIC_CORPUS; no cross-boundary cache reuse | Implement iam.cache_domain as StdPack tile | critical |
| 2026-02-21 | iam.decision tile | Authorization decision for rosetta.action | iam-decision, authz-decision, guard | Rosetta IAM profile | requirement | Fields: action_ref, principal_ref, decision (ALLOW/DENY/REQUIRE_APPROVAL/ALLOW_WITH_CONSTRAINTS), reasons (code + refs + detail), constraints (capabilities, tools, budget, egress, data_handling, vendor_route, cache, approvals), validity (issued_at, expires_at, not_before), auth (issuer, subject, delegation_chain, policy_version_set_hash). Invariants: one decision per action; explainability if non-ALLOW; fail-closed; short validity; budget required for spendful actions | Implement iam.decision as StdPack tile (keystone) | critical |
| 2026-02-21 | Guard micro-spine pattern | Required trace for side-effecting actions | guard-micro-spine, trace, receipts | Rosetta IAM profile | requirement | Required sequence: rosetta.action → iam.decision → rosetta.receipt (auth decision) → rosetta.toolcall → rosetta.observation → rosetta.receipt (tool result) → rosetta.evaluation (tokens, cached tokens, latency, $). Required for: DB writes, FS writes, email, network fetch, cache ops, SCM actions | Enforce as normative pattern in ROCK-3005-IAM | critical |
| 2026-02-21 | Default risk classes | TTL + approval by capability risk class | risk-classes, ttl, approval | Rosetta IAM profile | technology | Low risk (CACHE_READ, DOC_RAG): 30min TTL, no approval. Medium (CACHE_WRITE, HTTP_FETCH, DB_UPSERT): 5-10min TTL, optional. High (SHELL_EXEC, EMAIL_SEND, SCM_MERGE): 1-2min TTL, approval required | Default guidance for tenant policy tiles | high |
| 2026-02-21 | Shared caching in decision | cache.allow_reuse constraints | cache-reuse, iam-decision, constraints | Rosetta IAM profile | requirement | When allow_reuse=true, iam.decision.constraints.cache must include: domain_ref, content_hashes[], optional tapestry_refs[]; executor must verify auth at execution time + content hash match; fail closed on mismatch | Add cache reuse constraints to decision schema | critical |
| 2026-02-21 | Rosetta ROCK-3005-IAM | Full profile spec | rock-3005, iam-profile, rosetta | Rosetta IAM profile | requirement | Profile defines: 4 tile kinds (iam.principal, iam.delegation, iam.cache_domain, iam.decision), Guard micro-spine pattern, default risk classes, shared caching integration, interop guidance. Status: Draft (Design Phase). | Adopt as Entif IAM StdPack spec | critical |
| 2026-02-21 | Deterministic canonicalization | Rules for cache-safe block hashing | canonicalization, deterministic, sha256 | Rosetta IAM profile | technology | Rules: UTF-8, normalize \n, trim trailing WS, collapse blank lines, stable deterministic wrappers (<<<BLOCK type=...>>>), stable ordering (sort by type+stable_id then path), version pinning. SHA-256 over payload only (not wrapper) | Implement per App A canonicalizer | critical |
| 2026-02-21 | Block identity stable_id | Stable identifiers for block types | stable-id, block-identity | Rosetta IAM profile | technology | Format: repo:file:<path>@<git_blob_sha>; repo:module:<path>@<commit_sha>; policy:<id>@<version>; public:law:<jurisdiction>:<doc_id>@<effective_date>; tenant:policy:<tenant_id>:<doc_id>@<revision> | Define in VocabPack | medium |
| 2026-02-21 | 4-layer pack convention | Stable context bundle composition | tapestry, pack-layers, context | Rosetta IAM profile | technology | Layer A (Global): tool schemas, formatting rules. Layer B (Tenant): org policies/standards. Layer C (Domain/Engagement): matter/repo/module docs. Layer D (Ephemeral): diffs, errors, user request. Stable layers first to maximize prefix caching. | Recommend as standard pack construction | high |
| 2026-02-21 | Activity-based TTL | Sliding TTL for explicit caches | ttl, activity-ttl, cache-lifecycle | Rosetta IAM profile | requirement | Reset TTL on each authorized reuse; expire aggressively on inactivity; defaults: 15min default, 1hr max | Implement sliding TTL in cache orchestrator | critical |
| 2026-02-21 | Invalidation triggers | When to kill cached context | cache-invalidation, triggers | Rosetta IAM profile | technology | Invalidate when: source version changes, policy version changes, classification label changes, vendor route changes | Implement trigger monitoring | high |
| 2026-02-21 | Reason codes vocabulary | Controlled vocabulary for authz denials | reason-codes, vocabulary, authz | Rosetta IAM profile | requirement | Categories: AuthN/Identity (RBAC_ROLE_MISSING, PRINCIPAL_SUSPENDED, DELEGATION_EXPIRED, etc.); Data/Classification (CLASSIFICATION_EXCEEDS_DOMAIN, CACHE_DOMAIN_MISMATCH, etc.); Tooling/Execution (CAPABILITY_NOT_ALLOWED, EGRESS_NOT_ALLOWED, etc.); Budget/Rate (BUDGET_EXCEEDED, RATE_LIMIT_EXCEEDED) | Define as VocabPack; use in all iam.decision.reasons | high |
| 2026-02-21 | Message bus architecture | Mailroom/DLQ/Quarantine pattern | message-bus, mailroom, dlq, quarantine | Rosetta message bus | technology | Mailroom: header-first validation (A: header-only, B: replay cache, C: body_hash+sig, D: domain/routing auth); Quarantine (security agent review): signature failure, replay, hash mismatch, domain mismatch, unknown sender; DLQ (operator triage): schema version mismatch, unknown msg_type, benign violations | Design gatekeeping architecture per Rosetta message bus | high |
| 2026-02-21 | Architecture diagram | Full protocol flow | architecture-diagram, message-bus, flow | Rosetta message bus | technology | Flow: Outer perimeter (Firewall/WAF/VPN/Rate limits) → NATS/Redis Streams → Mailroom → DLQ/Quarantine → Canonical Rosetta Store → Routers/Dispatchers → Exec Workers + GuardLayer → Memory Stores (GraphRAG/VectorDB/Postgres) | Use as reference for message bus implementation | high |
| 2026-02-21 | Rosetta integration | IAM tiles are specialization of Rosetta spine | rosetta, integration, iam | Rosetta IAM profile | requirement | Rosetta already defines: Run → Action → ToolCall → Observation → Evaluation + Policy + Receipt + Incident Envelope. IAM tiles = concrete specialization. Guard micro-spine pattern fits Rosetta's universal spine. Cache as rosetta.tapestry with provider handles as XIDs | Map IAM tiles to existing Rosetta tile kinds; add as StdPack | critical |

## Components And Technologies

- Fabric / yt-dlp (YouTube transcript extraction)
- OpenClaw (platform-first, multi-channel, large ecosystem)
- ZeroClaw (Rust, <5MB RAM, modular trait-driven)
- Nanobot (Python, ~4k LOC, MCP support, vLLM)
- IronClaw (Rust, WASM sandbox, PostgreSQL, defense-in-depth)
- PicoClaw (Go, <10MB RAM, <1s boot, Gene Evolution Protocol)
- Agent Zero (OS-native, Docker, SKILL.md portability)
- Claw Runtime (authority separation: propose vs execute)
- Claude Code / Claude Agent SDK (API key for automation, subscription for interactive)
- OpenAI Agents SDK, Google ADK (build-your-own agents)
- Gemini CLI (ReAct + MCP)
- NATS / Redis Streams (message bus backend)
- SHA-256 (content-addressing for cache blocks)
- OPA/Cedar-style policy engines (for iam.decision evaluation)
- pgvector (PostgreSQL vector extension)

## Conceptual Claims

1. **YouTube ingest = Fabric captions-first + ASR fallback**: yt-dlp extracts subtitles; Whisper for videos without captions; idempotency by video_id; checkpointing; provenance fields per transcript.
2. **Claw variant selection is workload-dependent**: ZeroClaw/Nanobot for kernel/worker; IronClaw concepts for security; PicoClaw for edge (when mature); Agent Zero for OS-native power in tight sandbox.
3. **Security is the primary Claw selection criterion**: Real-world infostealer campaigns + malicious skills documented; OpenClaw org bans happening; skills = npm circa 2016 (assume compromise until proven otherwise).
4. **Consulting = anti-panic execution**: Sell measured, secure, workflow-level results; not "AI theater." SOW over outcomes; $700/hr with block discount; productized offers.
5. **AI scare trade = market reflexivity**: Stock drops create organizational reality (hiring freezes, roadmap pivots); "domain translator" is the career wedge; 3 exposure categories (displacing now, 3-5yr horizon, market lost the plot).
6. **Claude subscription ≠ API credential**: Subscription tokens for Claude Code/interactive only; OpenClaw automation requires API key; wrapping subscription as API = explicitly prohibited + enforcement happening.
7. **Shared caching = authorization-aware infrastructure**: Cache per security domain (tenant × classification × ABAC × vendor); blob hash keying deduplicates across branches; activity-based TTL prevents storage bleed.
8. **Entif Security Spine = universal contract**: Action → Decision → Receipt pattern unifies all agent frameworks; Guard is sole policy enforcement point.
9. **iam.decision is the keystone tile**: Links rosetta.action to policy + principal + session; produces enforceable constraints; references iam.cache_domain for shared caching.
10. **ROCK-3005-IAM = normative profile**: 4 StdPack tile kinds + Guard micro-spine + risk classes + caching integration. Draft status. Tightly coupled to Rosetta core.
11. **Deterministic canonicalization = cache hit rate prerequisite**: UTF-8, stable wrappers, deterministic ordering, version pinning; SHA-256 over canonical payload only.
12. **Message bus = Mailroom gatekeeping**: Header-first validation → Quarantine (security) or DLQ (benign) → Canonical Rosetta Store → Routers → Exec Workers + GuardLayer → Memory Stores.
13. **Cache exists side-channel risk**: Timing differences reveal cache existence; must normalize latency, never expose hit status, keep indices server-side.

## Dependencies And Sequencing

- YT ingest pipeline depends on Fabric installation + Mac Studio setup + API keys
- Claw variant evaluation: multiple variants installable in parallel on Mac Studio
- Consulting practice: needs Mac Studio lab, demo harness, decision artifacts
- Shared caching: depends on Rosetta core + iam.* tiles + cache orchestrator
- ROCK-3005-IAM profile: depends on Rosetta v3.0.0 core spine being stable
- Message bus architecture: depends on Rosetta message bus spec finalization

## Contradictions Or Supersession

- Claude subscription vs API key usage: Tariq clarification (Max can use Agent SDK for local dev) vs official docs (OAuth tokens for Claude Code only) — reconcile as: local dev OK, "business on top" = API key required
- Implicit caching effectiveness: Google docs claim it's automatic and works, but user experience and AI researcher reports say hit rate is poor — reconcile as: implicit caching is real but requires stable prefix + sufficient request size + timing proximity; visibility poor without API metadata inspection

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| YAAC-001: YouTube ingest pipeline (Fabric + ASR fallback) | docs-intelligence | `docs/intake/issue-drafts/YAAC-001-youtube-ingest-pipeline.md` | yt-ingest, pipeline, fabric | | Fabric captions-first + Whisper fallback + checkpointing |
| YAAC-002: Claw variant security comparison matrix | docs-intelligence | `docs/intake/issue-drafts/YAAC-002-claw-variant-security-matrix.md` | claw-variants, security, comparison | | Real-world infostealer attacks + 6-variant breakdown |
| YAAC-003: SOW shield for agentic AI consulting | docs-intelligence | `docs/intake/issue-drafts/YAAC-003-sow-shield-agentic-consulting.md` | consulting, sow, contract | | 6-section SOW structure; risk reduction not outcome guarantee |
| YAAC-004: AI scare trade consulting wedge | docs-intelligence | `docs/intake/issue-drafts/YAAC-004-ai-scare-trade-consulting-wedge.md` | ai-scare-trade, consulting, market | | Reflexivity + domain translator role |
| YAAC-005: Authorization-aware shared caching architecture | docs-intelligence | `docs/intake/issue-drafts/YAAC-005-shared-caching-architecture.md` | shared-caching, rbac, abac, cache-domain | YAAC-007 | blob hash keying + activity TTL + middleware in-flight |
| YAAC-006: Claude API key vs subscription for OpenClaw | docs-intelligence | `docs/intake/issue-drafts/YAAC-006-claude-subscription-vs-api-key.md` | anthropic, api-key, openclaw, terms | | Tariq clarification vs official docs; enforcement reality |
| YAAC-007: ROCK-3005-IAM profile adoption | docs-intelligence | `docs/intake/issue-drafts/YAAC-007-rock-3005-iam-profile.md` | rock-3005, iam, rosetta | | 4 iam.* tile kinds + Guard micro-spine pattern |
| YAAC-008: Deterministic canonicalization + SHA-256 hashing | docs-intelligence | `docs/intake/issue-drafts/YAAC-008-deterministic-canonicalization.md` | canonicalization, sha256, cache-blocks | YAAC-007 | App A rules + stable_id format |
| YAAC-009: Message bus Mailroom gatekeeping architecture | docs-intelligence | `docs/intake/issue-drafts/YAAC-009-message-bus-mailroom-architecture.md` | message-bus, mailroom, quarantine, dlq | YAAC-007 | Header-first validation + Quarantine/DLQ routing |

## Project Board Suggestions

- Area: Entif Architecture / Consulting Practice / Rosetta IAM
- Cycle: Q2 2026
- Status: Planning (multiple parallel tracks)
- Blocked by: Rosetta v3.0.0 core stability; TC-005 promotion state machine; Entif v0 bootstrap
- Parallelization notes: YT ingest + Claw evaluation + consulting artifacts can proceed immediately and in parallel; IAM profile + message bus architecture are design-phase and can proceed in parallel with implementation tracks

## Open Questions

- How does the prompt router middleware integrate with existing Guard Layer concept from Entif Secure Architecture Companion Paper?
- What is the exact schema for the `evaluation` tile's cached token telemetry fields across OpenAI vs Vertex vs Anthropic providers?
- How does the Mailroom handle message schema versioning across upgrades without blocking the pipeline?
- What is the minimal MVP of the cache orchestrator that validates the economic theory (shared prefix caching ROI)?
- How does the "4-layer pack" convention map to existing Rosetta tapestry semantics?
