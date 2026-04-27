# Docs Intelligence Extraction

**Source:** docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md
**Extraction date:** 2026-04-25
**Extractor:** subagent:docs-intelligence/huggingface-research-integration

---

## Source

- **Path:** `docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md`
- **Title:** HuggingFace Research Integration
- **Date evidence:** Chat created 2026/2/28 20:06:08; updated 2026/3/1 14:55:16; exported 2026/3/1 23:37:53
- **Chat link:** https://chatgpt.com/g/g-p-69a0bc48664481918ad06fa52cbdfda4-entif-v0/c/69a3907a-2e38-832a-99ec-1637be5f81ce
- **Participants:** Crates McD (mcdade@gmail.com) + ChatGPT (Entif v0 GPT)
- **Authority tier:** primary (explicit intent specification from sovereign user)
- **Freshness:** superseded by current Rosetta doc-intake pipeline; captured as historical spec artifact
- **Word count:** ~1,500
- **Extractor:** subagent:docs-intelligence/huggingface-research-integration
- **Extraction date:** 2026-04-25

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus. This document captures an early specification for content intelligence loops that pre-dates the Rosetta doc-intake system. The concepts described herein should be cross-referenced against current Rosetta implementation.

---

## Summary

Crates specifies a two-part content intelligence architecture: (1) a daily HuggingFace trending-paper sweep that classifies, scores, and stores research paper metadata with escalation to full ingestion and backlog ticketing, and (2) a universal content intelligence loop applicable across magazines (Wired/PopMech/2600), newsletters, RSS, Google Alerts, and Discord. The universal loop follows a six-stage pipeline: Intake → Normalize → Triage → Deep Ingest → Synthesis → Tasking. Output is explicitly action-shaped ("daily top shelf"), not a link list. The document also describes a Discord bulk-ingest server design with per-channel routing to venture agents.

---

## Goals And Intent

- Anchor a daily HuggingFace trending-paper check as a first-priority scheduled task in Claw orchestration
- Classify papers by subject matter and impacted spheres (domains/stack components)
- Score papers for relevance to current Entif + Rosetta focus areas
- Store all daily records append-only regardless of score (audit-friendly, traceability posture)
- Escalation: if relevance_score >= threshold → download full paper, parse, ingest, create backlog ticket
- Extend the same intelligence loop to: Wired, Popular Mechanics, 2600, newsletters, RSS, Google Alerts, Discord, email
- Build a Discord bulk-ingest server with per-venture channels for curated resource submission
- Produce "daily top shelf" output: 3 items to act on, 2 to store, 1 design decision change, 1 risk to track

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
|---|---|---|---|---|
| HuggingFace leaderboard/trending papers endpoint accessible via agent | User intent: "check the daily HuggingFace leaderboard of most popular trending research papers" | HuggingFace | critical | Requires scraping or API access to HF trending papers list |
| Stable paper identifier (ID or hash of URL/title) | "paper_id (or stable hash of URL/title)" | Rosetta spine | critical | Hash of URL+title provides deduplication across days |
| Daily storage artifact schema with minimum fields: date_collected, paper_id, title, url, abstract, tags_subject[], tags_spheres[], relevance_score, notes/summary, retrieved_at | Explicit schema enumerated in response | Rosetta spine | critical | Append-only; audit-friendly |
| Relevance scoring threshold (TBD) for escalation | "If any paper meets a given threshold (TBD) for relevance" | Rosetta triage | critical | Threshold needs calibration; suggest starting permissive and tightening |
| Full paper download + parse + ingest pipeline for above-threshold papers | "download it in full, parse and ingest its contents" | Rosetta pipeline | high | Requires PDF/HTML fetching with auth context where needed |
| Backlog ticket creation for above-threshold papers | "create a ticket in the backlog for deconstructing and integrating" | Rosetta tasking | high | Ticket format: problem statement + proposed approach + acceptance criteria + dependencies |
| Feed adapters for each content source type: magazine digital editions, newsletters, Google Alerts, RSS, Discord webhook/bot | "magazines digital editions (Wired/PopMech/2600)", "email-to-ingest", "Google News alerts", "RSS feeds", "Discord bulk ingest" | Rosetta intake | high | Each source type emits a common envelope object |
| Standardized intake envelope: source_type, source_name, item_url, title, author, published_at, retrieved_at, raw_excerpt, content_pointer, receipts | "Everything above should emit a single standardized object like:" enumerated fields | Rosetta intake | critical | Universal across all source types |
| URL canonicalization + deduplication (hash of title+author+date+domain or canonical URL) | "Canonicalize URLs (strip tracking params)" + "De-duplicate (hash of title+author+date+domain)" | Rosetta normalize | high | Prevents duplicate storage from same article via different tracking URLs |
| Structured content extraction: headings, code blocks, lists, quotes, imperatives | "Extract structure: headings, code blocks, lists, quotes, 'things you can do' sentences" | Rosetta normalize | medium | Imperatives are flagged as "gold" for action extraction |
| Triage classification: subject matter tags + impacted spheres tags | "subject matter: security, agents, HCI, governance, hardware, OSINT, etc." + "impacted spheres: Entif core, Rosetta spine, OpenClaw/ZeroClaw, GenOper, VieDay, media ops..." | Rosetta triage | critical | Both tag sets required per item |
| Six score dimensions: Stack impact, Time-to-value, Novelty, Credibility, Leverage, Risk relevance | Six named dimensions enumerated in response | Rosetta triage | critical | Output: score_total (0-100) + score_vector (named dimensions) |
| Three-tier triage routing: Archive-only, Queue deep ingest, Immediate escalation | "Archive-only (stored metadata + excerpt + tags + score)", "Queue deep ingest", "Immediate escalation" | Rosetta triage | high | Immediate escalation: very high score or watchlist topic hit |
| Deep ingest pipeline: fetch full text, chunk + embed, produce summary, key claims, tools/techniques, action ideas, risks/constraints, links worth following | "Deep ingest should: fetch full text (respecting your paid access), extract clean content, chunk + embed, produce: summary, key claims, tools/techniques, action ideas, risks/constraints, links worth following" | Rosetta deep-ingest | high | Only for items clearing threshold or matching high-signal tag |
| Synthesis: Entif/Rosetta mapping, Backlog generator, Cross-linker | "For each deeply ingested item, run at least one of these synthesizers: Entif/Rosetta mapping, Backlog generator, Cross-linker" | Rosetta synthesis | high | Cross-linker connects to prior papers/articles/notes/active projects |
| Output format: action-shaped daily digest, not link list | "daily top shelf output that is short, opinionated, and action-shaped. Not 'here are 30 links'" | Rosetta output | high | Format: 3 to act on, 2 to store, 1 design decision, 1 risk |
| Magazine access: official digital access endpoints preferred; worst case: PDF/epub issue file | "Ideal: official digital access endpoints (app/web vault) if they expose article pages. Worst case: PDF/epub ingestion when you can retrieve the issue file" | Rosetta intake | medium | DRM-locked app content = TOC metadata + manual deep-ingest by link drop |
| Discord bulk-ingest server: minimum channels #bulk-ingest, #high-signal-now, per-venture channels | "Minimum channels: #bulk-ingest (anything goes), #high-signal-now (manual override: treat as urgent), One channel per venture" | Discord integration | high | Each message becomes an item with link(s), why-it-matters note, optional manual tags |
| Discord message item schema: link(s), short "why it matters" note, optional tags (manual tags boost triage model) | "Each message becomes an item with: link(s), short 'why it matters' note (even 1 sentence helps scoring), optional tags" | Discord integration | high | Manual tags should boost triage scoring |
| Email-to-ingest for newsletter sources | "Ingest from a dedicated email label or mailbox folder" | Rosetta intake | medium | Requires email access/delegate |
| Google News alerts / saved searches ingestion | "Google News alerts / saved searches: Ingest the alert emails, or use RSS if available" | Rosetta intake | medium | RSS preferred if available |
| Receipts metadata (hashes, request IDs, tokens/cost/runtime) aligned with receipts-first v0 posture | "retrieved_at timestamps + receipts metadata (tokens/cost/runtime if applicable), aligned with the receipts-first v0 posture" | Rosetta spine | high | All storage artifacts include provenance |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Prompt section) | research-pipeline, huggingface, daily-sweep, entif, rosetta | huggingface, research, daily-automation, entif, rosetta | intent | Crates wants a daily agent task to check HuggingFace trending papers, classify, score for relevance to Entif and Rosetta, store all summaries regardless of score | "one of the first scheduled tasks I want to set up will be for an agent to check the daily HuggingFace leaderboard of most popular trending research papers" | Rosetta should implement HF daily sweep as a first-class scheduled pipeline; this spec provides the canonical design | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Prompt section) | storage-schema, append-only, audit-trail, rosetta-spine | storage-schema, append-only, audit-trail | requirement | All daily paper records stored append-only regardless of score, consistent with Rosetta spine posture of explicit artifacts + traceability | "Regardless of the score outcomes, we'll store all of the day's summaries" | Rosetta content intake artifacts should follow append-only discipline; no deletion of below-threshold items | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Prompt section) | escalation-rule, backlog-ticketing, threshold | escalation, threshold, backlog-ticketing | intent | Above-threshold papers: download full paper, parse + ingest contents, create backlog ticket for integration into Entif/Rosetta | "If any paper meets a given threshold (TBD) for relevance... create a ticket in the backlog" | Rosetta should implement threshold-gated escalation with formal backlog ticket creation | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | Daily storage artifact (bullet list) | storage-schema, minimum-fields, receipts-first | storage-schema, minimum-fields, receipts | requirement | Minimum storage fields: date_collected, paper_id (or hash), title, url, abstract, tags_subject[], tags_spheres[], relevance_score (+ optional breakdown vector), notes/summary, retrieved_at + receipts metadata | Enumerated in response: "date_collected, paper_id, title, url, abstract, tags_subject[], tags_spheres[], relevance_score (+ optional breakdown vector), notes/summary, retrieved_at timestamps + receipts metadata" | Rosetta content intake storage schema should include all minimum fields plus receipts | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: magazine digital editions) | content-intake, magazine, access-methods, DRM | magazines, digital-access, DRM, wired, popmech, 2600 | constraint | Magazine digital editions: preferred access via official digital endpoints (HTML article pages); worst case: PDF/epub issue file; DRM-locked app content requires TOC metadata + manual link drop for deep ingest | "Ideal: official digital access endpoints (app/web vault) if they expose article pages. Worst case: PDF/epub ingestion. DRM-locked app = TOC metadata + manual deep-ingest by link drop" | Rosetta magazine intake should support multiple access methods; DRM is a known constraint | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: newsletter ingestion) | content-intake, newsletter, email, RSS | newsletters, email-ingest, RSS, future-tools, matt-wolfe | requirement | Newsletter sources: ingest via dedicated email label/mailbox folder; pull links + headline blocks + teaser text; Google News alerts via RSS or alert email | "Ingest from a dedicated email label or mailbox folder. Pull links + headline blocks + any teaser text" | Rosetta should support email-based intake for newsletter sources | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: standardized envelope) | intake-envelope, normalization, schema | intake-envelope, normalization, schema | requirement | Universal intake envelope: source_type, source_name, item_url, title, author, published_at, retrieved_at, raw_excerpt, content_pointer, receipts (hashes, request IDs) | "Everything above should emit a single standardized object like: source_type, source_name, item_url, title, author, published_at, retrieved_at, raw_excerpt, content_pointer, receipts" | Rosetta should adopt this universal envelope schema as the canonical intake format across all source types | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: normalize) | normalization, deduplication, URL-canonicalization | normalization, deduplication, URL-canonicalization | technology | Normalization: canonicalize URLs (strip tracking params), de-duplicate via hash of title+author+date+domain or canonical URL, extract structure (headings, code blocks, lists, quotes, imperatives) | "Canonicalize URLs (strip tracking params). De-duplicate (hash of title+author+date+domain). Extract structure: headings, code blocks, lists, quotes, 'things you can do' sentences (imperatives are gold)" | Rosetta content pipeline should implement URL canonicalization and deduplication as part of normalize stage | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: triage - classification) | triage, classification, tagging, spheres | triage, classification, tagging, spheres | requirement | Triage classification: subject matter tags (security, agents, HCI, governance, hardware, OSINT, etc.) + impacted spheres tags (Entif core, Rosetta spine, OpenClaw/ZeroClaw, GenOper, VieDay, media ops, growth loops, security posture, etc.) | "subject matter: security, agents, HCI, governance, hardware, OSINT, etc." + "impacted spheres: Entif core, Rosetta spine, OpenClaw/ZeroClaw, GenOper, VieDay, media ops, growth loops, security posture" | Rosetta triage stage should implement both subject matter and sphere tags | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: triage - scoring) | scoring, relevance-score, score-dimensions | scoring, relevance, triage | requirement | Six score dimensions: (1) Stack impact (architecture/orchestration/security/memory), (2) Time-to-value (actionable within 1-30 days), (3) Novelty (not already in knowledge base), (4) Credibility (source signal + citations), (5) Leverage (compounding benefit across ventures), (6) Risk relevance (threat intel, safety, legal/compliance) | Six dimensions enumerated in response | Rosetta relevance scoring should adopt these six dimensions as the standard score vector | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: triage - routing) | triage-routing, archive-only, queue, escalation | triage-routing, archive-only, escalation | requirement | Three-tier triage routing: (1) Archive-only (stored metadata + excerpt + tags + score), (2) Queue deep ingest (fetch full content and parse), (3) Immediate escalation (very high score or watchlist topic hit) | "Archive-only (stored metadata + excerpt + tags + score)", "Queue deep ingest", "Immediate escalation" | Rosetta should implement three-tier triage routing | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: deep ingest) | deep-ingest, full-text, chunking, embedding | deep-ingest, full-text, chunking, embedding | requirement | Deep ingest: fetch full text (respecting paid access), extract clean content, chunk + embed, produce: tight summary, key claims, tools/techniques mentioned, action ideas, risks/constraints, links worth following | "fetch full text, extract clean content, chunk + embed, produce: summary (tight), key claims, tools/techniques mentioned, action ideas, risks/constraints, links worth following" | Rosetta deep ingest stage should produce all listed output fields | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: synthesis - Entif/Rosetta mapping) | synthesis, entif-mapping, rosetta-mapping, design-doc | synthesis, entif-mapping, rosetta-mapping | intent | Entif/Rosetta mapping synthesizer: "Which modules does this touch?", "Which existing design docs does it strengthen/contradict?", "What new primitives should we add to the Rosetta schema or ontology?" | Three questions enumerated | Rosetta synthesis stage should produce Entif/Rosetta mapping as a primary output | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: synthesis - backlog generator) | synthesis, backlog-generator, ticketing | synthesis, backlog-generator, ticketing | requirement | Backlog generator synthesizer: emits 1-5 tickets with problem statement, proposed approach, acceptance criteria, dependencies, estimated complexity class | "emits 1-5 tickets with: problem statement, proposed approach, acceptance criteria, dependencies, estimated complexity class" | Rosetta synthesis stage should emit structured backlog tickets | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: synthesis - cross-linker) | synthesis, cross-linker, knowledge-graph | synthesis, cross-linker, knowledge-graph | intent | Cross-linker: connects deeply ingested item to prior papers/articles, own notes, active projects — "This is how 'reading' becomes 'compounding'" | "connects it to: prior papers/articles, your own notes, active projects. This is how 'reading' becomes 'compounding'" | Rosetta should implement cross-linking as a core synthesis output; this is a compounding-knowledge pattern | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: tasking and notifications) | output-format, daily-digest, action-shape | output-format, daily-digest, action-shape | requirement | Output format: action-shaped "daily top shelf" — not a link list. Format: 3 items to act on this week, 2 items to store for later, 1 item that changes a design decision, 1 risk to track | "Not 'here are 30 links'. More like: 3 items to act on this week, 2 items to store for later, 1 item that changes a design decision, 1 risk to track" | Rosetta output layer should implement this action-shaped daily digest format as the canonical delivery artifact | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: Discord bulk-ingest server) | discord, bulk-ingest, multi-channel, venture-routing | discord, bulk-ingest, venture-routing | intent | Discord bulk-ingest server design: #bulk-ingest (anything goes, Mailroom sorts), #high-signal-now (urgent override), per-venture channels for curated submissions | "Minimum channels: #bulk-ingest (anything goes, the Mailroom sorts it later), #high-signal-now (manual override: treat as urgent), One channel per venture (so agents can post curated finds per domain)" | Rosetta/Entif Discord integration should implement this multi-channel routing design | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: Discord message item schema) | discord-item-schema, manual-tagging, triage-boost | discord-item-schema, manual-tagging | requirement | Discord message item schema: link(s), short "why it matters" note (even 1 sentence boosts scoring), optional tags (manual tags boost triage model) | "Each message becomes an item with: link(s), short 'why it matters' note (even 1 sentence helps scoring), optional tags (manual tags should boost the triage model)" | Rosetta Discord integration should implement this item schema; manual tags should influence triage scoring | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: Google News alerts / RSS) | RSS, google-alerts, intake-sources | RSS, google-alerts, intake-sources | requirement | Google News alerts / saved searches: ingest via alert emails or RSS if available; RSS preferred | "Google News alerts / saved searches: Ingest the alert emails, or use RSS if available" | Rosetta should support both email-based and RSS-based alert ingestion | medium |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: receipts-first v0 posture) | receipts-first, provenance, audit | receipts-first, provenance, audit | requirement | All storage artifacts include retrieved_at timestamps + receipts metadata (tokens/cost/runtime if applicable), aligned with receipts-first v0 posture | "retrieved_at timestamps + receipts metadata (tokens/cost/runtime if applicable), aligned with the receipts-first v0 posture" | Rosetta should ensure all intake artifacts include receipts metadata per v0 posture | high |
| 2026-04-25 | docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md | (Response: system always stores metadata + pointer) | graceful-degradation, pending-ingest | graceful-degradation, pending-ingest | constraint | System should always store metadata + pointer even when full text cannot be fetched immediately — "nothing is 'missed', it's just 'pending deep ingest'" | "the system should always be able to store metadata and a pointer even when it can't immediately fetch full text. That way nothing is 'missed', it's just 'pending deep ingest'" | Rosetta intake should implement graceful degradation: always store metadata even when full-text fetch fails | high |

---

## Components And Technologies

- **HuggingFace leaderboard** — source of daily trending research papers
- **Feed adapters** — per-source intake modules emitting canonical envelope objects
  - Magazine feed adapter (Wired, Popular Mechanics, 2600)
  - Newsletter feed adapter (email-to-ingest)
  - RSS feed adapter
  - Google Alerts adapter
  - Discord webhook/bot adapter
  - Manual/link-drop adapter
- **Intake envelope schema** — universal object format: source_type, source_name, item_url, title, author, published_at, retrieved_at, raw_excerpt, content_pointer, receipts
- **Normalizer** — URL canonicalizer, deduplicator (hash-based), structure extractor
- **Triage engine** — classifier (subject matter + spheres), scorer (6-dimension vector), router (archive/deep-ingest/escalate)
- **Deep ingest pipeline** — full-text fetcher, cleaner, chunker, embedder, summary + claims + action ideas + risks + links extractor
- **Synthesis engine** — Entif/Rosetta mapper, backlog ticket generator, cross-linker to knowledge graph
- **Output formatter** — "daily top shelf" digest: 3-to-act, 2-to-store, 1-design-decision, 1-risk
- **Discord bulk-ingest server** — multi-channel Discord server with #bulk-ingest, #high-signal-now, per-venture channels
- **Backlog ticketing system** — formal tickets with problem statement, proposed approach, acceptance criteria, dependencies, complexity class

---

## Conceptual Claims

- A universal content intelligence loop (Intake → Normalize → Triage → Deep Ingest → Synthesis → Tasking) can be applied consistently across heterogeneous content sources: research papers, magazines, newsletters, RSS, alerts, Discord, and email
- Append-only storage of all items regardless of triage score enables audit trails and future re-scoring when priorities shift
- Manual tagging (e.g., Discord message "why it matters" notes, explicit tags) should boost the triage model's scoring — human signals amplify automated classification
- Cross-linking content to prior papers, notes, and active projects is the mechanism by which "reading becomes compounding"
- Graceful degradation (always store metadata + pointer even when full-text is unavailable) ensures nothing is missed, only pending
- The "daily top shelf" action-shaped output format (not a link list) is the minimum viable output that makes the intelligence loop feel worth the cost
- Discord bulk-ingest server creates a single choke-point for "random stuff I found" with downstream venture-specific routing

---

## Dependencies And Sequencing

- **HuggingFace API/scraping dependency:** HF trending papers endpoint must be accessible; no auth specified for public leaderboard
- **Feed adapter sequencing:** Each source type requires its own adapter; magazine DRM is a known constraint requiring fallback handling
- **Triage threshold calibration:** Threshold TBD; suggested starting permissive and tightening based on signal
- **Deep ingest gating:** Deep ingest is threshold-gated; synthesis depends on deep ingest completing
- **Backlog ticketing:** Ticket creation is downstream of synthesis; requires backlog system to exist
- **Discord bot/webhook:** Requires Discord server + bot token + channel configuration before ingest can begin
- **Email inbox delegate:** Newsletter intake requires read access to labeled email folder/mailbox
- **RSS polling cadence:** RSS feeds require polling interval configuration; varies by source
- **Storage prerequisite:** All storage artifacts append-only; no delete/overwrite of prior records

---

## Contradictions Or Supersession

- The document pre-dates the Rosetta doc-intake system; this extraction should be cross-referenced against current implementation to identify gaps between spec and reality
- The Discord bulk-ingest server is described as a planned setup but not yet implemented; the channel schema and bot integration details are not yet specified
- The relevance scoring threshold is explicitly TBD and has not been calibrated against any actual papers
- The "daily top shelf" output format (3/2/1/1) is a desired output pattern but not yet implemented as a formal template or delivery mechanism
- No formal schema is provided for the backlog ticket format beyond the fields listed; formalization needed
- Cross-linker synthesis implies a knowledge graph exists or will be built; current Rosetta knowledge graph state is unknown

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
|---|---|---|---|---|---|
| HF-001: Implement HuggingFace daily trending-paper sweep pipeline | issue-candidate | new | HF-001, huggingface, research-pipeline, daily-automation, entif, rosetta | — | Crates explicitly requested this as "one of the first scheduled tasks" to check HF trending papers, classify, score, store, and escalate above-threshold papers to full ingestion and backlog ticketing |
| HF-002: Define and calibrate relevance scoring threshold and six-dimension score vector | issue-candidate | new | HF-002, scoring, triage, calibration, relevance | HF-001 | Six score dimensions defined (Stack impact, Time-to-value, Novelty, Credibility, Leverage, Risk relevance) but threshold TBD and uncalibrated; needs empirical calibration against known relevant papers |
| HF-003: Implement universal content intake envelope schema across all source types | issue-candidate | new | HF-003, intake-schema, normalization, content-intake, universal | — | Universal intake envelope schema defined (source_type, source_name, item_url, title, author, published_at, retrieved_at, raw_excerpt, content_pointer, receipts) but not yet implemented as canonical schema |
| HF-004: Implement three-tier triage routing (archive-only / deep-ingest / immediate-escalation) | issue-candidate | new | HF-004, triage, routing, deep-ingest, escalation | HF-001, HF-003 | Three-tier triage routing defined but not yet implemented; current Rosetta triage state unknown |
| HF-005: Implement deep ingest pipeline with full-text fetch, chunk, embed, and structured output | issue-candidate | new | HF-005, deep-ingest, pipeline, full-text, embedding | HF-001, HF-004 | Deep ingest pipeline spec defined (fetch, extract, chunk+embed, produce summary/claims/actions/risks/links) but not implemented; gated on triage routing |
| HF-006: Implement synthesis engine: Entif/Rosetta mapping, backlog generator, cross-linker | issue-candidate | new | HF-006, synthesis, cross-linker, backlog-generator, knowledge-graph | HF-005 | Synthesis engine with three synthesizer types defined but not implemented; cross-linker depends on knowledge graph existing |
| HF-007: Implement "daily top shelf" action-shaped output format (3/2/1/1) | issue-candidate | new | HF-007, output-format, daily-digest, action-shape, delivery | HF-001, HF-006 | Action-shaped daily digest format defined (3 to act, 2 to store, 1 design decision, 1 risk) but not implemented as formal template or delivery mechanism |
| HF-008: Implement Discord bulk-ingest server with per-channel routing | issue-candidate | new | HF-008, discord, bulk-ingest, venture-routing, bot | — | Discord bulk-ingest server design defined (#bulk-ingest, #high-signal-now, per-venture channels) but not implemented; requires Discord bot setup |
| HF-009: Implement magazine feed adapters (Wired, Popular Mechanics, 2600) with DRM fallback | issue-candidate | new | HF-009, magazine, feed-adapter, DRM, wired, popmech, 2600 | HF-003 | Magazine intake specified with DRM as known constraint; official digital endpoints preferred; PDF/epub fallback; no adapter yet implemented |
| HF-010: Implement newsletter and Google Alerts intake adapters | issue-candidate | new | HF-010, newsletter, email-ingest, google-alerts, RSS | HF-003 | Newsletter (email-to-ingest) and Google Alerts (email or RSS) intake specified but not implemented |

---

## Project Board Suggestions

- **Area:** content intelligence / research pipeline
- **Cycle:** current
- **Status:** specification (pre-implementation)
- **Blocked by:** HF-001 must land first (HuggingFace daily sweep is the anchor spec)
- **Parallelization notes:** HF-003 (intake schema) and HF-008 (Discord) can proceed in parallel with HF-001; HF-002 (scoring calibration) can start independently using known relevant papers as a reference set
- **Recommended first ship:** HF-001 (HuggingFace daily sweep) — explicit user intent and highest specificity

---

## Open Questions

- What is the HuggingFace API or scraping mechanism for accessing the trending papers leaderboard? Is there a public endpoint or does it require authentication?
- What is the correct relevance scoring threshold? Has any calibration set of "known relevant" papers been defined to calibrate the six-dimension vector?
- What is the current state of Rosetta's triage system? Does it already implement any of the three-tier routing described?
- Does Rosetta's knowledge graph exist and support cross-linking, or does the cross-linker synthesizer need to build the graph from scratch?
- What is the backlog system that tickets will be created in? Is it Rosetta's own backlog, GitHub Issues, Linear, or another system?
- What Discord bot framework will be used for the bulk-ingest server? What are the auth/permission requirements?
- For magazine intake, what are the specific access endpoints for Wired, Popular Mechanics, and 2600 digital editions?
- What email system handles the newsletter intake? Is there existing email delegate/ingest infrastructure?
- Who owns the daily "top shelf" digest delivery? Is it pushed to a channel, email, or stored as an artifact?
- What is the rollback story if a paper is scored above threshold but later determined to be irrelevant or harmful?
