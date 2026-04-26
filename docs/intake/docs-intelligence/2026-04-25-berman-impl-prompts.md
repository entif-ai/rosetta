# BIP Extraction — Berman OpenClaw Implementation Prompts

- **Source:** `docs/external/Berman - OpenClaw Implementation Prompts.txt`
- **Lines:** 502
- **Extracted:** 2026-04-26
- **Branch:** `docs-intelligence/2026-04-25-berman-impl-prompts`
- **Confidence:** HIGH (well-structured, implementation-ready prompts)

---

## BIP-001 — Personal CRM Intelligence

**Confidence:** HIGH

**What it specifies:**
A personal CRM that auto-tracks contacts from Gmail/Google Calendar via daily cron, applies two-stage filtering (hard rules + LLM classification), scores contacts, and stores in SQLite. Includes a learning system that evolves rejection lists over time. Semantic retrieval via embeddings for natural-language queries.

**Key components:**
- Data sources: Gmail API or IMAP (last 60 days), Google Calendar API (last 60 days)
- Contact extraction from email: sender/recipient, exchange count estimation (min of half-total and thread count), sample subjects/snippets
- Calendar filtering: 1–10 attendees, ≥15 minutes duration
- Two-stage filter: hard blocklist + LLM classifier (fast model: Gemini Flash or Haiku)
- LLM classification rules: reject automation/newsletters/cold outreach; approve two-way human interactions
- Contact scoring: base 50, +5/exchange (max +20), +3/meeting (max +15), +15 title match, +10 small meeting, +10 recent touch, +25 both-email-and-calendar, +10 role, +5 company
- Learning config: `skip_domains`, `prefer_titles`, `skip_keywords`, `min_exchanges`, `max_days_between`, `max_attendees`, `min_duration_minutes`
- Deduplication: by email, then by name+company
- Semantic retrieval: natural-language queries against embeddings
- Storage: SQLite WAL mode

**Issue candidates:**
- `BIP-001-1`: **CRM Learning System Feedback Loop** — When a contact is rejected, the system should add their domain to `skip_domains`. However, the spec does not define how the rejection event is communicated back to the learning system, whether the learning config is stored in SQLite or a JSON file, or whether the learning is incremental (append-only) or can be un-learned. The feedback loop is implied but the mechanism is underspecified.
- `BIP-001-2`: **Exchange Count Estimation Ambiguity** — Formula `Math.min(Math.floor(totalMessages / 2), threadCount)` is used as a proxy for genuine back-and-forth exchanges. This conflates message volume with conversation quality and may misclassify high-volume automated senders as engaged contacts. No validation against ground-truth is described.
- `BIP-001-3`: **LLM Classification Prompt Stability** — The LLM prompt for contact classification is described narratively but never shown as a concrete prompt. The quality and consistency of classification depends entirely on the model's interpretation of the rules. No prompt text is provided, making it non-reproducible.

---

## BIP-002 — Knowledge Base (RAG)

**Confidence:** HIGH

**What it specifies:**
A RAG-based personal knowledge base that accepts URLs or files, extracts content via a fallback chain, validates quality, deduplicates via URL normalization + content hash, chunks text, generates embeddings, and stores in SQLite. Natural-language retrieval with cosine similarity and LLM synthesis.

**Key components:**
- Supported types: article, video (YouTube), tweet/X, PDF, text, other
- Fallback extraction chain per source type: FxTwitter API → X API → scraping for Twitter; yt-dlp/YouTube API for YouTube; Readability → Firecrawl/Apify → Playwright/Puppeteer → raw HTTP for articles; retry once on transient errors with 2s delay
- Quality validation: min 20 chars, ≥15% of non-empty lines >80 chars for non-tweets, ≥500 total chars for non-tweet, error-page detection (2+ signals: "access denied", "captcha", "please enable javascript", "cloudflare", "404", "sign in", "blocked", "rate limit"), max 200k chars
- URL normalization: strip tracking params (utm_source, utm_medium, utm_campaign, fbclid, igshid, ref, s, t), remove www., normalize twitter.com→x.com, strip trailing slashes/fragments
- Content dedup: SHA-256 of cleaned content as UNIQUE column
- Chunking: 800 chars/chunk, 200 char overlap, split on sentence boundaries (`(?<=[.!?])\s+`), min 100 chars (append remainder to last chunk)
- Embedding: Google `gemini-embedding-001` (768d, free) primary; OpenAI `text-embedding-3-small` (1536d) fallback; max 8000 chars/chunk; batch 10 chunks with 200ms delay; 3 retries with exp backoff; LRU cache 1000 entries
- Storage: SQLite WAL, sources + chunks tables, CASCADE deletes, indexes
- Concurrency: lock file (stale if PID dead or file >15 min old)
- Retrieval: embed query → cosine sim top 10 → dedupe to best per source → sanitize to 2500 chars/excerpt → LLM synthesis with citation

**Issue candidates:**
- `BIP-002-1`: **Chunk Boundary Sentence Split Regex Does Not Handle Parentheses or Quotation** — The regex `(?<=[.!?])\s+` splits after sentence-ending punctuation but does not handle edge cases like "Dr. Smith" (period in abbreviation), "e.g." (commonly used abbreviation), or quoted sentences where the period is inside quotes. This will cause over-splitting on common English patterns and corrupt chunk semantics.
- `BIP-002-2`: **Error-Page Detection Signal Set is Too Narrow** — The spec lists only 7 error-page signals. Many sites return genuine content that contains some of these words (e.g., "sign in" is common in navigation). No weighting or per-signal confidence is described. The 2+ signal threshold is brittle and could cause false rejections of real content.
- `BIP-002-3`: **Content Hash Deduplication Blocks Near-Duplicates** — The SHA-256 content hash rejects exact duplicates but does not handle near-duplicates (e.g., same article with minor text differences like timestamps, ad counts, or personalized content). A semantic dedup layer at the embedding stage would be needed to catch these, but is not described.
- `BIP-002-4`: **Lock File Race Condition on Concurrent Claims** — The lock file mechanism prevents simultaneous ingestion runs but the spec does not define how the lock is acquired atomically. If two processes check for the lock simultaneously, both may find it absent and proceed. Needs `fcntl` or equivalent atomic lock.

---

## BIP-003 — Content Idea Pipeline

**Confidence:** HIGH

**What it specifies:**
A content pipeline that takes a topic idea, researches it via Twitter/KB/web search, performs semantic deduplication against a stored idea database, assembles a brief, creates a task in the user's PM tool, stores the idea with its embedding, and notifies the user.

**Key components:**
- Idea database schema: `YYYY-MM-DD-NNN` ID format, title/slug (UNIQUE), summary, tags, status (pitched/accepted/rejected/produced/duplicate), response, embedding (BLOB), created_at
- Semantic dedupe: hybrid scoring = (semantic_cosine × 0.7) + (keyword_match × 0.3). Keyword matching: title 30%, summary 20%, tags 20%
- Hard gate: if any existing idea scores >40% combined similarity, reject the new idea and show the match
- Brief assembly: short angle description + relevant links, NO title/thumbnail/hook/script generation
- Task creation: via PM tool API (Asana, Linear, Notion, Todoist)
- Initial status: "pitched"

**Issue candidates:**
- `BIP-003-1`: **40% Similarity Threshold Not Validated** — The threshold of 40% combined similarity as a hard gate is arbitrary. The spec does not describe any validation, calibration, or sensitivity analysis. Using an untested threshold as a hard gate risks false positives (good ideas rejected) and false negatives (duplicate ideas accepted).
- `BIP-003-2`: **Hybrid Score Weighting Not Grounded in Evidence** — Weights of 0.7 semantic / 0.3 keyword are given without justification. These weights determine the dedupe gate behavior but no calibration process is described. If semantic similarity is noisy or the embedding model changes, the hybrid score becomes unreliable.
- `BIP-003-3`: **ID Format `YYYY-MM-DD-NNN` Assumes Sequential Increment** — The ID format implies sequential numbering within a day (NNN). When multiple agents or processes create ideas concurrently, the NNN counter may collide. No atomic ID generation mechanism is specified (e.g., using a database sequence or atomic file lock).

---

## BIP-004 — Social Media Research System

**Confidence:** HIGH

**What it specifies:**
A Twitter/X research tool that decomposes a question into focused queries, retrieves data using a tiered cost-optimization strategy (free → low-cost → expensive), filters by timeframe/engagement, expands threads, caches results, and synthesizes a briefing.

**Key components:**
- Query decomposition: 2–4 focused search queries
- Tier 1 (free): FxTwitter API (api.fxtwitter.com) — single tweet lookups only
- Tier 2 (~$0.15/1K tweets): TwitterAPI.io or SocialData — search, profiles, user tweets, thread context
- Tier 3 (~$0.005/tweet): Official X API v2 — last resort; rate limit 350ms between requests (450 req/15min)
- Tier cascade by operation: single tweet lookup T1→T2→T3; search T2→T3; profile lookup T2→T3; thread expansion T2→T3
- Filtering: configurable timeframe (default 7 days), rank by engagement (likes+retweets+replies), remove RTs/duplicates, suppress spam
- Thread expansion: pull full thread for high-engagement tweets
- Caching: 1-hour TTL
- Usage logging: per-tier log file with timestamps and estimated costs
- Output: 3–5 key narratives, 5–10 notable posts with links, sentiment summary (positive/negative/mixed), contrarian takes

**Issue candidates:**
- `BIP-004-1`: **Thread Expansion Recursion Without Depth Limit** — The spec says "pull the full thread" for high-engagement tweets without specifying a maximum depth. Deep threads with hundreds of replies could consume significant API budget. No recursion limit is defined.
- `BIP-004-2`: **Engagement Ranking Ignores Follower Count Normalization** — Ranking by raw likes+retweets+replies biases toward high-follower accounts. A tweet with 1000 interactions from 1M followers is not the same signal as 1000 interactions from 100 followers. No normalization by follower count or account size is described.
- `BIP-004-3`: **Caching Key Not Specified** — The caching mechanism (1-hour TTL) is described but the cache key is not defined. Is it keyed by the decomposed query string? By the original question? By each sub-query? Inconsistent keying would cause cache misses or stale data.

---

## BIP-005 — YouTube Analytics + Competitor Tracking

**Confidence:** HIGH

**What it specifies:**
A YouTube analytics system that collects daily channel metrics via YouTube Data/Analytics APIs, stores in SQLite, computes derived metrics (7-day MA, conversion rate, per-video trends), tracks competitor channels, and generates PNG charts on a daily cron.

**Key components:**
- Daily metrics collection: views, estimatedMinutesWatched, averageViewDuration, subscribersGained, impressions, CTR (if available)
- SQLite schema: `daily_stats` (video_id, date, views, watch_time_minutes, avg_view_duration, impressions, ctr, subscribers_gained), `videos` (id, title, published_at, thumbnail_url, duration_seconds)
- Derived metrics: 7-day MA for daily views, subscriber-to-view conversion rate, views-per-video trend
- Competitor tracking: configurable channel list, daily pull of recent uploads + subscriber count
- Chart generation: matplotlib dark-theme PNGs — "trend" (daily line + fill), "top" (horizontal bar, color by short/long-form), "daily" (channel-wide + 7-day MA overlay)
- Schedule: daily cron

**Issue candidates:**
- `BIP-005-1`: **YouTube API Quota Exhaustion Risk** — YouTube Data API has strict daily quota limits (10,000 units/day for free tier). Pulling analytics for multiple videos + competitor channels daily could exceed quota. No quota monitoring, backoff strategy, or priority ordering is described.
- `BIP-005-2`: **Chart Generation Library Not Specified for Non-Python Environments** — The spec calls for matplotlib, which requires Python. If the broader Rosetta system is built in Node.js or another language, this is not portable. The chart generation component is not abstracted as an API call or CLI invocation.

---

## BIP-006 — Nightly Business Briefing (Multi-Perspective AI Council)

**Confidence:** HIGH

**What it specifies:**
A nightly business intelligence system that collects signals from across tools, normalizes them, and runs a three-phase AI review council (draft → parallel persona review → consensus). Uses a frontier model (Claude Opus or GPT-4) for all phases. Delivers ranked recommendations with priority scoring.

**Key components:**
- Signal normalization: `{source, signal_name, value, confidence (0-100), direction (up/down/flat), category}`
- Sources: YouTube metrics, CRM health, project backlog, social growth, email themes, meeting action items, sales pipeline, ops/cron reliability
- Compact to top 200 signals by confidence with up to 4 sample events per source
- Phase 1 (LeadAnalyst): score business outlook weekly/monthly/blended (0-100), generate 5–10 recommendations with title/description/evidence/impact/effort/confidence
- Phase 2 (4 personas in parallel): GrowthStrategist, RevenueGuardian, SkepticalOperator, TeamDynamicsArchitect — each critiques, votes, proposes new recs
- Phase 3 (CouncilModerator): reconciles disagreements, produces final rec set with consensus notes
- Priority formula: `(impact × 0.4) + (confidence × 0.35) + ((100 - effort) × 0.25)`. Weights stored in policy table, updated via feedback
- Hard filter: remove any "publish now" recommendations
- Output: ranked recommendations + full council trace stored in DB
- Schedule: nightly cron

**Issue candidates:**
- `BIP-006-1`: **Policy Table Weight Update Mechanism Not Specified** — Weights `w1=0.4, w2=0.35, w3=0.25` are stored in a policy table and "updated via feedback over time," but the feedback mechanism is not described. How is feedback collected? Who provides it? What is the update algorithm? Without this, the policy table is static.
- `BIP-006-2`: **Frontier Model Cost for Nightly Runs is Expensive and Unbounded** — Three phases × four parallel personas × consensus = multiple frontier model calls per night. Each phase processes up to 200 signals with 4 samples. AtClaude Opus or GPT-4 pricing, this could cost $10–50/night. No monthly budget cap or adaptive frequency is described.
- `BIP-006-3`: **Signal Collection Normalization Assumes Homogeneous Source Schema** — Different tools return very different data shapes. The spec describes a normalized signal schema but does not describe the normalization transform per source. Building this "normalization" layer is the bulk of the work and is entirely underspecified.
- `BIP-006-4`: **Parallel Persona Execution Without Ordering Guarantees** — Phase 2 runs 4 personas "simultaneously via `Promise.all`" but the review outputs have inter-dependencies (each reviewer should ideally see prior reviews before responding). Running them truly in parallel means each reviewer only sees the draft, not other reviews, which limits the value of multi-perspective review.

---

## BIP-007 — CRM/Business Tool Natural Language Access

**Confidence:** MEDIUM

**What it specifies:**
A natural-language interface to CRM systems (HubSpot/Salesforce/etc.) supporting Contacts, Companies, Deals, Owners, and Associations. Intent classification maps user messages to CRUD operations. API key or OAuth in environment variables.

**Key components:**
- Objects: Contacts, Companies, Deals, Owners, Associations (link contacts↔companies, deals↔contacts, deals↔companies)
- HubSpot association type IDs: 1=Contact→Company, 3=Deal→Contact, 5=Deal→Company
- Intent types: Lookup, Create, Update, List, Associate
- Validation: ask before proceeding if required fields are missing
- Response: clean readable summaries (not raw JSON), deal queries include name/amount/stage/close date/last modified

**Issue candidates:**
- `BIP-007-1`: **Intent Classification Is Described But No Classification Mechanism Is Specified** — The spec defines intent types (Lookup/Create/Update/List/Associate) but does not describe how to classify a user message into these types. No prompting strategy, few-shot examples, or fine-tuned model is specified. Building this is the core engineering challenge and is left as an exercise for the implementer.
- `BIP-007-2`: **No Pagination or Rate Limiting for List Operations** — Listing contacts, companies, or deals could return thousands of records. No pagination strategy, page size limits, or cursor-based iteration is described. Large orgs would hit API limits or return oversized payloads.
- `BIP-007-3`: **Association Schema is HubSpot-Specific** — Association type IDs 1, 3, 5 are HubSpot-specific constants. The spec references HubSpot explicitly but the title says "HubSpot, Salesforce, or whatever I use." Salesforce and other CRMs have different association models. The abstraction leaks — implementing this generically requires an adapter per CRM that maps these IDs correctly.

---

## BIP-008 — AI Content Humanization

**Confidence:** MEDIUM

**What it specifies:**
A text rewriting tool that detects AI-generated artifacts, rewrites to sound human, and optionally tunes for platform (Twitter/X, LinkedIn, Blog, Email). Input is pasted draft text; output is revised text with optional change highlights.

**Key components:**
- Detection: scans for overuse of specific words ("delve", "landscape", "leverage", etc.), tone inflation, generic phrasing, repetitive sentence structures, excessive hedging, too-clean lists, identical paragraph lengths
- Rewrite rules: concrete vs. vague, varied sentence length, contractions, sentence fragments, informal word choices, human imperfections
- Channel tuning: Twitter (punchy, <280 chars), LinkedIn (professional-conversational), Blog (long-form with personal voice), Email (brief-clear-action-warm)

**Issue candidates:**
- `BIP-008-1`: **Detection Ruleset is Fragile and Easily Evaded** — The word-list detection approach (flag "delve", "landscape", etc.) is trivially evaded by synonyms or rephrasing. Modern LLMs are already trained to avoid these exact words. The detection layer would flag naive AI content but miss sophisticated outputs. No confidence scoring or multi-signal detection is described.
- `BIP-008-2`: **No Ground Truth Validation of Humanization Quality** — The spec describes the desired output ("sounds like a real person wrote it") but provides no evaluation methodology. No automated metric (perplexity, detector score, human preference rating) is described to validate that the rewritten text actually scores lower on AI detection.
- `BIP-008-3`: **Channel Tuning Prompt is Not Provided** — The spec describes the intent for each channel but does not provide actual prompt text for the rewriting step. The output quality is entirely dependent on the implementer's prompting skill, making the spec non-reproducible.

---

## BIP-009 — Image Generation + Iterative Editing

**Confidence:** MEDIUM

**What it specifies:**
An iterative image generation workflow where the user describes an image in chat, gets 1–3 variants, reviews, requests changes, and loops until satisfied. Supports editing existing images (inpainting/img2img). Saves final assets to a designated folder.

**Key components:**
- Core flow: describe → generate 1–3 variants → accept or request changes → loop
- Editing: background swap, composition adjust, multiple image combine, inpainting/img2img
- Context tracking: remember concept across session messages
- Output: save final assets to folder, deliver as downloadable files

**Issue candidates:**
- `BIP-009-1`: **No Image Format/Resolution/Metadata Standard** — The spec does not specify output format (PNG/JPEG/WebP), resolution, color profile, or metadata handling. "Save final assets to a designated folder" could mean anything. No naming convention, versioning, or source provenance tracking is defined.
- `BIP-009-2`: **Context Tracking Scope is Ambiguous** — "Remember what we've been working on across multiple messages in the same session" implies session-level state but no mechanism is described. In a stateless server context, this requires explicit state management (session object, in-memory store, or DB record). The spec does not say how this is implemented.
- `BIP-009-3`: **Inpainting/img2img Support is Provider-Dependent** — Inpainting and img2img are not universally supported across all image generation providers. DALL-E 3 has limited inpainting. Stable Diffusion and Midjourney have different APIs. The spec claims provider-agnostic ("or Flux") but the editing features are not provider-agnostic.

---

## BIP-010 — Task Management from Meetings + Chat

**Confidence:** HIGH

**What it specifies:**
A system that extracts action items from meeting transcripts (Fathom, Otter.ai, Fireflies) or pasted notes using an LLM, presents them for user approval, allows editing, then creates tasks via Todoist/Asana/Linear API. Includes CRM cross-reference for enrichment and direct task creation commands.

**Key components:**
- Extraction: LLM (Gemini Flash or fast model) parses transcripts → extracts description (max 150 chars, actionable), assignee, is_owner (boolean), todoist_title (max 120 chars, only for is_owner=true), skips vague items
- Approval flow: show numbered list → user selects "all", "none", or specific items → user edits → confirm → create via API
- Failed creation: keep in pending state for retry
- CRM cross-reference: match people against CRM contacts to add company/role context
- Direct creation: "remind me to [thing] by [date]" skips extraction, creates directly after confirmation
- Default project: configurable

**Issue candidates:**
- `BIP-010-1`: **CRM Cross-Reference Without Lookup Mechanism** — The spec references CRM contacts (from BIP-001) but does not describe how to perform the lookup. Does it use semantic search? Email exact match? Name fuzzy match? Without a defined lookup strategy, the cross-reference will be unreliable.
- `BIP-010-2`: **Task Title Max Lengths Are Arbitrary** — `description` max 150 chars, `todoist_title` max 120 chars are arbitrary and not validated against actual API limits of target tools. Some task managers allow longer titles; this truncation may unnecessarily destroy information.
- `BIP-010-3`: **No Deduplication of Extracted Tasks** — If the same action item appears in both a meeting transcript and a subsequent chat message, both could be extracted and presented. No deduplication mechanism is described.

---

## BIP-011 — AI Usage and Cost Tracking

**Confidence:** HIGH

**What it specifies:**
A logging and reporting system for AI API calls that records token usage, task type, model, and estimated cost to a JSONL file (with optional SQLite mirror). Generates on-demand reports with filters and provides routing optimization suggestions.

**Key components:**
- Logging: JSONL append-only, one JSON object per line `{timestamp, model, tokens:{input/output/total}, taskType, description, costEstimate, source}`
- Pricing table (per 1M tokens): Anthropic (Opus $15/$75, Sonnet $3/$15, Haiku $0.80/$4), OpenAI (GPT-4 $30/$60, GPT-4 Turbo $10/$30, GPT-3.5 $0.50/$1.50, o1 $15/$60), Google (Gemini Pro $10/$30, Flash $0.30/$1.20, 1.5 Pro $1.25/$5), xAI Grok $2/$10, default $1/$3
- Cost formula: `(inputTokens/1M × inputPrice) + (outputTokens/1M × outputPrice)`
- Storage: append-only JSONL + optional SQLite mirror
- Reports: overall summary, by model, by task type, by day (last 10 days), trend (30/90 days)
- Routing suggestions: flag frontier models used on simple tasks, flag workflows >25% of spend, suggest cache strategies

**Issue candidates:**
- `BIP-011-1`: **Pricing Table Hardcoded, Not Dynamically Fetched** — Prices are hardcoded in the spec. AI provider pricing changes frequently. Without a mechanism to fetch current prices (API or periodic manual update), cost estimates become inaccurate within weeks. The spec notes "keep this table in a config file so it's easy to update" but provides no update mechanism.
- `BIP-011-2`: **No Distinction Between Input and Output Token Counts in Cost Formula** — The formula correctly distinguishes input and output pricing, but the logged `tokens.total` field does not distinguish them in the same way, making it impossible to verify cost estimates from the log alone without re-processing.
- `BIP-011-3`: **Routing Suggestion Thresholds Are Uncalibrated** — "Simple task" flagging and ">25% of spend" thresholds are described qualitatively without validation. The 25% threshold especially could misfire for legitimate high-frequency workflows that are already optimized.

---

## Cross-Cutting Observations

1. **5 of 11 use cases depend on SQLite WAL mode** — BIP-001, BIP-002, BIP-005, BIP-006, BIP-011. This is good DRY at the storage layer but suggests a shared SQLite substrate could be a shared module.

2. **4 use cases involve embeddings** — BIP-001 (semantic CRM retrieval), BIP-002 (knowledge base), BIP-003 (idea dedupe), BIP-011 (implicit in routing). A shared embedding pipeline (provider abstraction, batch processing, LRU cache, retry logic) appears in at least BIP-001 and BIP-002 with near-identical specs. These should be one shared module.

3. **BIP-001 and BIP-010 reference each other** — BIP-001 (CRM) is called by BIP-010's extraction cross-reference. BIP-003 references BIP-002 (KB). These cross-references mean the modules cannot be built in complete isolation.

4. **8 of 11 use cases are cron-scheduled** — BIP-001 (daily ingestion), BIP-005 (daily YT metrics), BIP-006 (nightly briefing), BIP-011 (implicitly ongoing). All scheduled tasks need a cron orchestration layer that doesn't exist as a spec.

5. **No authentication/authorization layer** — Gmail API, Google Calendar API, YouTube API, Todoist/Asana/Linear, HubSpot/Salesforce, X API — all require credentials. The spec mentions "API key or OAuth stored in environment variables" (BIP-007) but most use cases do not address auth at all. This is a significant gap between spec and production.

6. **No testing strategy** — None of the 11 use cases describe test requirements, mock fixtures, or validation protocols. All 11 are implementation prompts without test specs.

7. **All 11 use cases are user-facing product features** — None describe internal architecture, DevOps, observability, or deployment. Yet for all to coexist in the same system, there must be shared infrastructure (logging, config, state, error handling) that is not specced.

---

## Issue-Draft Summary

| ID | Use Case | Title | Tier | Type |
|----|----------|-------|------|------|
| BIP-001-1 | BIP-001 | CRM Learning System Feedback Loop Underspecified | HIGH | spec-gap |
| BIP-001-2 | BIP-001 | Exchange Count Estimation Misclassifies High-Volume Automated Senders | MEDIUM | reliability |
| BIP-001-3 | BIP-001 | LLM Classification Prompt Not Provided | MEDIUM | spec-gap |
| BIP-002-1 | BIP-002 | Sentence Split Regex Fails on Common English Abbreviations | HIGH | correctness |
| BIP-002-2 | BIP-002 | Error-Page Detection Signal Set Too Narrow | MEDIUM | reliability |
| BIP-002-3 | BIP-002 | Content Hash Deduplication Misses Near-Duplicates | MEDIUM | completeness |
| BIP-002-4 | BIP-002 | Lock File Acquisition Is Not Atomic | HIGH | correctness |
| BIP-003-1 | BIP-003 | 40% Similarity Threshold Not Validated | HIGH | reliability |
| BIP-003-2 | BIP-003 | Hybrid Score Weights Not Grounded in Evidence | MEDIUM | spec-gap |
| BIP-003-3 | BIP-003 | Idea ID Sequential Counter Has Collision Risk | MEDIUM | correctness |
| BIP-004-1 | BIP-004 | Thread Expansion Has No Recursion Depth Limit | MEDIUM | cost |
| BIP-004-2 | BIP-004 | Engagement Ranking Ignores Follower Count Normalization | MEDIUM | correctness |
| BIP-004-3 | BIP-004 | Cache Key Definition Is Missing | MEDIUM | spec-gap |
| BIP-005-1 | BIP-005 | YouTube API Quota Exhaustion Risk Unmitigated | HIGH | cost |
| BIP-005-2 | BIP-005 | Chart Library Not Portable Outside Python | LOW | portability |
| BIP-006-1 | BIP-006 | Policy Table Weight Update Mechanism Not Specified | HIGH | spec-gap |
| BIP-006-2 | BIP-006 | Nightly Frontier Model Cost Is Unbounded | HIGH | cost |
| BIP-006-3 | BIP-006 | Signal Normalization Layer Is Underspecified | HIGH | spec-gap |
| BIP-006-4 | BIP-006 | Parallel Persona Review Cannot See Other Reviews | MEDIUM | design |
| BIP-007-1 | BIP-007 | Intent Classification Mechanism Not Specified | HIGH | spec-gap |
| BIP-007-2 | BIP-007 | No Pagination for List Operations | MEDIUM | reliability |
| BIP-007-3 | BIP-007 | Association Schema Leaks HubSpot Specifics | MEDIUM | portability |
| BIP-008-1 | BIP-008 | Word-List Detection Easily Evaded by Modern LLMs | MEDIUM | reliability |
| BIP-008-2 | BIP-008 | No Ground Truth Validation of Humanization Quality | HIGH | spec-gap |
| BIP-008-3 | BIP-008 | Channel Tuning Prompts Not Provided | MEDIUM | spec-gap |
| BIP-009-1 | BIP-009 | No Image Format/Resolution/Metadata Standard | MEDIUM | spec-gap |
| BIP-009-2 | BIP-009 | Context Tracking Mechanism Not Described | MEDIUM | spec-gap |
| BIP-009-3 | BIP-009 | Inpainting/img2img Not Provider-Agnostic | MEDIUM | portability |
| BIP-010-1 | BIP-010 | CRM Cross-Reference Lookup Strategy Not Specified | HIGH | spec-gap |
| BIP-010-2 | BIP-010 | Task Title Length Limits Arbitrary vs. Actual API Limits | LOW | spec-gap |
| BIP-010-3 | BIP-010 | No Deduplication of Extracted Tasks | MEDIUM | reliability |
| BIP-011-1 | BIP-011 | Pricing Table Hardcoded, Not Dynamically Updated | HIGH | accuracy |
| BIP-011-2 | BIP-011 | Token Log Total Cannot Be Used to Verify Cost Estimates | LOW | correctness |
| BIP-011-3 | BIP-011 | Routing Suggestion Thresholds Uncalibrated | MEDIUM | reliability |
