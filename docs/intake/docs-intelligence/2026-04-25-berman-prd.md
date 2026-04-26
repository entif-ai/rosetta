# Docs Intelligence Extraction: Berman-PRD.md

## Source

- Path: `docs/external/Berman-PRD.md`
- Title: PRD.md - Product Requirements & Feature Inventory
- Date evidence: "Author: Matthew Berman / Copied on Saturday, Feb 28 2026 at 2:25 AM / Last updated: 2026-02-17 (OpenClaw 2026.2.15)"
- Authority tier: Tier 2 — Authoritative operational reference
- Freshness: 2026-02-17 (stale; OpenClaw has been updated since)
- Word count: ~10,000
- Extractor: subagent/6a2c66fd-d5db-4458-aad3-d3a8f4fd0911
- Extraction date: 2026-04-25

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

Berman-PRD is the canonical feature inventory for Matthew Berman's personal AI system built on OpenClaw. It documents 22 installed skills, 2 preview skills, a full CRM system (~1,174 contacts), social tracker (YouTube/Instagram/X), financial data pipeline, Fathom meeting integration, Box document integration, extensive cron job library, centralized logging infrastructure, and test infrastructure. It is the single authoritative reference for what exists, where it lives, and how it works. This extraction maps the inventory against Rosetta's existing concept index; Berman-PRD adds zero net new concepts — it is a comprehensive inventory of a system already indexed.

---

## Goals And Intent

- Provide a complete feature inventory of the OpenClaw workspace
- Serve as the canonical reference for what exists, where it lives, and how it works
- Document operational use cases and workflow playbooks (via `docs/USE-CASES-WORKFLOWS.md`)
- Track the OpenClaw platform configuration (gateway, model providers, plugins, channels)
- Document the CRM system, Fathom integration, Skills, Tools, Shared Modules, Scripts, Cron Jobs, Memory System, Integrations, Databases, Environment Variables, Test Infrastructure, and Configuration Files

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
|---|---|---|---|---|
| Workspace monorepo structure: `clawd/` with `crm/`, `data/`, `docs/`, `life/`, `memory/`, `reference/`, `scripts/`, `shared/`, `skills/`, `skills-preview/`, `state/`, `tests/`, `tools/`, `youtube-analysis/`, `.learnings/` | PRD.md §Architecture Overview | workspace-structure | high | All custom code lives under `~/clawd/` |
| SQLite with WAL mode and foreign keys for all databases | "SQLite for all persistent local data (WAL mode, foreign keys)" | storage | high | |
| Vector embeddings via Google `gemini-embedding-001` (768-dim) across all stores (KB, CRM, business-meta-analysis, OpenClaw memory index) | "Vector embeddings standardized on Google `gemini-embedding-001` (768-dim) across all stores" | storage, embeddings | high | Standardized across all stores |
| Telegram as primary notification and interaction channel | "Telegram as the primary notification and interaction channel" | channels, notifications | high | Group ID: -1003725393532 |
| All cron jobs logged to central database with Telegram notifications | "All cron jobs logged to a central database with Telegram notifications" | cron-log, notifications | high | |
| Shared modules in `shared/` for common functionality across tools and skills | "Shared modules (`shared/`) for common functionality across tools and skills" | shared-modules | medium | |
| `gog` CLI for all Google Workspace access (Gmail, Calendar, Drive, etc.) | "`gog` CLI for all Google Workspace access (Gmail, Calendar, Drive, etc.)" | integrations, google-workspace | high | |
| CRM: ~1,174 contacts tracked, 20-table schema, 768-dim vector context | "Stats: ~1,174 contacts tracked" | crm | high | |
| CRM: Anti-injection security (sanitize email content, block prompt injection patterns) | "Anti-injection security: sanitizes email content, blocks prompt injection patterns" | crm, security | critical | |
| CRM: Learning system (`pattern-learner.js`) with auto-approval after 50 decisions | "Learning system (`pattern-learner.js`): builds skip patterns from approve/reject decisions, suggests auto-add mode after 50 decisions" | crm, intelligence | medium | |
| CRM: Box integration with hybrid relevance scoring (collaborator 45%, semantic 25%, lexical 20%, recency 10%) | "Hybrid relevance scoring: collaborator match (45%), semantic similarity (25%), lexical match (20%), recency (10%)" | crm, box | medium | |
| CRM: Gmail draft system with two-phase approval workflow (proposed → approved → drafted) | "Draft-only - no send operations / Approval flow: proposed → approved → drafted (Gmail draft created)" | crm, gmail | medium | Safety gate: `GMAIL_DRAFT_WRITES_ENABLED=true` |
| CRM: Relationship intelligence with 0–100 health scores | "Calculates 0–100 health scores based on recency, frequency, priority, interaction quality" | crm, intelligence | medium | |
| Fathom: Calendar-aware polling (`fathom-after-meetings.js`) — dynamic instead of static scheduling | "Replaces static scheduling with dynamic, meeting-aware triggers" | fathom, crm | medium | |
| Skills: 22 installed + 2 preview, installed via `clawdhub` CLI, lock file at `~/clawd/.clawdhub/lock.json` | "Skills installed via `clawdhub` CLI / Lock file: `~/clawd/.clawdhub/lock.json`" | skills | high | |
| Model fallback chain: Main: Opus → Sonnet → Gemini Pro → Gemini Flash → Haiku | "Model fallback chain: Main: Opus → Sonnet → Gemini Pro → Gemini Flash → Haiku" | platform-config, model-routing | high | |
| Subagent fallback chain: Sonnet → Gemini Flash → Haiku → Gemini Pro | "Subagents: Sonnet → Gemini Flash → Haiku → Gemini Pro" | platform-config, model-routing | high | |
| OpenClaw gateway on port 18789, loopback-only, token auth, Tailscale off | "Port: 18789 / Mode: Local (loopback only, not exposed to network) / Auth: Token-based / Tailscale: Off" | platform-config, security | critical | |
| Launchd: RunAtLoad + KeepAlive for auto-restart | "Launchd: RunAtLoad + KeepAlive (auto-restart)" | platform-config, operations | high | |
| Heartbeat interval: 1 hour | "Heartbeat interval: 1 hour" | platform-config | medium | |
| Max concurrent agents: 4, max concurrent subagents: 8 | "Max concurrent agents: 4 / Max concurrent subagents: 8" | platform-config | medium | |
| Context pruning: cache-ttl mode, 1h TTL | "Context pruning: cache-ttl mode, 1h TTL" | platform-config | medium | |
| Memory backend: `builtin` (Gemini embeddings) | "Memory backend: `builtin` (Gemini embeddings)" | platform-config, memory | medium | |
| Video pitch hard gate: must search before pitching; skip if >40% similarity | "Enforces the video pitch hard gate rule in AGENTS.md (must search before pitching; skip if >40% similarity match)" | video-pitches | high | |
| Dual view tracking for X/Twitter: public_metrics + analytics endpoint | "Dual collection — `public_metrics.impression_count` stored in `x_posts.view_count` (always available), plus `impressions` from analytics endpoint in hourly snapshots (richer metrics, 30-day window)" | x-analytics, social-tracker | medium | |
| Financial data confidentiality: Matt only (DM or topic 2774) | "Financial data is strictly confidential - only shared with Matt directly (DM or financials topic)" | financials, security | critical | |
| Council digest financial references: directional, not specific dollar amounts | "Council digests reference financial health directionally, not specific dollar amounts" | financials, council | medium | |
| Instagram token refresh every 60 days with `ig_collect.py --refresh` | "refresh every 60 days with `ig_collect.py --refresh`" | instagram, social-tracker | medium | |
| Structured event logging in JSONL canonical form at `~/clawd/data/logs/all.jsonl` | "Operational logging model is hybrid: structured event logs are canonical in JSONL (`~/clawd/data/logs/all.jsonl` plus per-event files)" | logging, operations | high | |
| JSONL log rotation: >50MB triggers rotation, keeps last 3 | "rotates .jsonl files exceeding 50MB (keeps last 3 rotations)" | logging, operations | medium | |
| Interactions DB archive: rows older than 90 days archived monthly | "archives interactions DB rows older than 90 days into monthly archive DBs" | logging, operations | medium | |
| Hourly encrypted backups to Google Drive ("OpenClaw Backups" folder), keep last 7 | "backs up to Google Drive ("OpenClaw Backups" folder), creates `manifest.json` for restore, keeps last 7 backups" | backup, operations | critical | |
| Pre-commit hook prevents sensitive Chrome profile data and large binary files | "Prevents committing sensitive Chrome profile data and large binary files" | git, security | high | |
| Security review: file permissions, gateway loopback, auth, no secrets in git, security modules wired, backup encryption, prompt injection, .gitignore intact | "security-review.sh / file permissions (.env, .db files, openclaw.json, system prompts), gateway binds to loopback only, auth enabled, no secrets in git-tracked files, security modules wired in, backup encryption, prompt injection patterns, .gitignore rules intact" | security, operations | critical | |
| E2E test tiers: Tier 1 (nightly, no LLMs, live APIs only), Tier 2 (weekly, agent turns, ~$1-2), Tier 3 (weekly, full pipeline + Telegram round-trip, ~$2-3) | "E2E Tests: Tier 1 (Nightly) / E2E Tests: Tier 2 (Weekly) / E2E Tests: Tier 3 (Weekly)" | testing, ci | high | |
| CRM health check: integrity, detect contact count drops (>20% = alert), verify key tables, monitor ingestion | "Checks integrity, detects contact count drops (> 20% = alert), verifies key tables, monitors ingestion activity" | crm, health | medium | |
| Cron health check every 30 minutes: error/timeout states, persistent failures, Telegram alerts | "Monitors cron jobs for error/timeout states, detects persistent failures, alerts to Telegram / Runs every 30 minutes" | cron, health | high | |
| Disk space monitoring: warning at 20GB free, urgent alert at 10GB | "warns at 20GB free, sends urgent Telegram alert at 10GB" | operations, health | high | |
| Content sanitization across all untrusted inputs (web pages, tweets, Slack/Telegram, Asana/HubSpot, transcripts, KB, uploads) | "sanitizes untrusted content from web pages, tweets, Slack/Telegram messages, Asana/HubSpot records, transcripts, KB excerpts, uploaded files" | security, content-sanitization | critical | |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-25 | docs/external/Berman-PRD.md | Architecture Overview | workspace-structure, storage | openclaw, crm, skills | requirement | All custom code lives under `~/clawd/` as a monorepo-style project layered on OpenClaw base platform | "clawd/ ├── crm/ / data/ / docs/ / life/ / memory/ / reference/ / scripts/ / shared/ / skills/ ..." | Establish `clawd/` as the workspace root in Rosetta project board | high |
| 2026-04-25 | docs/external/Berman-PRD.md | CRM System — Database Schema | crm, storage | contacts, interactions, follow-ups, context, meetings | requirement | CRM has 20-table schema covering contacts, interactions, follow-ups, context (768-dim vectors), meetings, action items, relationship profiles, Box files, email drafts, merge suggestions | "20 tables" in schema description | Index this schema as a Rosetta package dependency | high |
| 2026-04-25 | docs/external/Berman-PRD.md | CRM System — Anti-injection | crm, security | prompt-injection, anti-injection | requirement | CRM sanitizes email content and blocks prompt injection patterns | "Anti-injection security: sanitizes email content, blocks prompt injection patterns" | Ensure Rosetta content-sanitization covers CRM email scanner path | high |
| 2026-04-25 | docs/external/Berman-PRD.md | CRM System — Learning System | crm, intelligence | pattern-learner, auto-approval | requirement | Pattern learner builds skip patterns from approve/reject decisions; suggests auto-add after 50 decisions | "Learning system (`pattern-learner.js`): builds skip patterns from approve/reject decisions, suggests auto-add mode after 50 decisions" | Document CRM learning state machine in Rosetta | medium |
| 2026-04-25 | docs/external/Berman-PRD.md | CRM System — Box Integration | crm, box | box, relevance-scoring | requirement | Box relevance uses hybrid scoring: collaborator match 45%, semantic 25%, lexical 20%, recency 10% | "Hybrid relevance scoring: collaborator match (45%), semantic similarity (25%), lexical match (20%), recency (10%)" | Model Box relevance as a Rosetta scoring function | medium |
| 2026-04-25 | docs/external/Berman-PRD.md | CRM System — Gmail Draft | crm, gmail | gmail-draft, approval-workflow | requirement | Gmail draft system is draft-only, two-phase approval (proposed → approved → drafted); safety gate requires `GMAIL_DRAFT_WRITES_ENABLED=true` | "Draft-only - no send operations / Approval flow: proposed → approved → drafted (Gmail draft created) / Safety gate: `GMAIL_DRAFT_WRITES_ENABLED=true` required" | Document Gmail draft safety gate in Rosetta security model | medium |
| 2026-04-25 | docs/external/Berman-PRD.md | CRM System — Relationship Intelligence | crm, intelligence | relationship-health, nudge-generator | requirement | Relationship health scored 0–100 based on recency, frequency, priority, interaction quality | "Calculates 0–100 health scores based on recency, frequency, priority, interaction quality" | Model relationship health scoring as a Rosetta metric | medium |
| 2026-04-25 | docs/external/Berman-PRD.md | Fathom Meeting Integration | fathom, crm | calendar-aware-polling, after-meetings | requirement | Fathom polling replaced static scheduling with calendar-aware dynamic triggers (`fathom-after-meetings.js`) | "Replaces static scheduling with dynamic, meeting-aware triggers" | Track this as a Fathom adapter behavior in Rosetta | medium |
| 2026-04-25 | docs/external/Berman-PRD.md | Skills — Installed (22) | skills | browser-control, clawdhub, crm-query, beehiiv, hubspot, humanizer, knowledge-base, financials, model-usage-tracker, nano-banana-pro-2, self-improving-agent, summarize, todoist, video-idea-pipeline, x-research-v2, x-analytics, x-search, excalidraw, gemini-video-watch, x-trending-scraper, youtube-sub-ratio | requirement | 22 installed skills documented with commands, configs, and APIs | "Skills installed via `clawdhub` CLI / 22 installed" | Map all 22 skills as Rosetta packages or skill-packs | high |
| 2026-04-25 | docs/external/Berman-PRD.md | Skills — Preview (2) | skills | content-draft-generator, research-skill | requirement | 2 preview skills: content-draft-generator and research (gemini-cli background subagent) | "Preview Skills (In Development) / content-draft-generator / research" | Track preview skills as forthcoming Rosetta skill-packs | medium |
| 2026-04-25 | docs/external/Berman-PRD.md | OpenClaw Platform Configuration | platform-config, model-routing | gateway, model-fallback, agents | requirement | OpenClaw gateway port 18789, loopback-only, token auth, Tailscale off; model fallback chains defined for main and subagents | "Port: 18789 / Mode: Local (loopback only, not exposed to network) / Auth: Token-based / Tailscale: Off / Model fallback chain: Main: Opus → Sonnet → Gemini Pro → Gemini Flash → Haiku / Subagents: Sonnet → Gemini Flash → Haiku → Gemini Pro" | Model OpenClaw gateway config as a Rosetta platform-config package | critical |
| 2026-04-25 | docs/external/Berman-PRD.md | Shared Modules | shared-modules | shared-db, embeddings, config, reranker, review-council, cursor-council, workspace-state, council-recommendations, telegram-delivery, env-utils, content-sanitizer, fs, notification-redaction, secret-redaction, event-log, interaction-store, log-rotation | requirement | 18 shared Node.js modules covering DB, embeddings, config, reranker, review-council, cursor-council, workspace-state, council-recommendations, telegram-delivery, env-utils, content-sanitizer, fs, notification-redaction, secret-redaction, event-log, interaction-store, log-rotation, event_log.py | "Location: `shared/` / Reusable Node.js utilities used across CRM, skills, and tools" | Map all 18 shared modules as a `shared` package in Rosetta | high |
| 2026-04-25 | docs/external/Berman-PRD.md | Tools — Social Tracker | tools, social-tracker | youtube, instagram, x-analytics, collection, querying | requirement | Social tracker covers YouTube (collect/query/charts), Instagram (collect/query with Meta Graph API), X/Twitter (collect/query with OAuth 1.0a), profile growth scraping | "YouTube analytics collection, querying, and charting. Instagram per-post analytics. X/Twitter per-post analytics. Also tracks Instagram and TikTok profile growth." | Model social-tracker as a Rosetta tool package | high |
| 2026-04-25 | docs/external/Berman-PRD.md | Tools — Business Meta-Analysis | tools, business-meta-analysis | business-analysis, council, 8-experts, 14-sources | requirement | Business meta-analysis uses 8 independent expert personas analyzing 14 data sources in parallel; results delivered to Telegram meta-analysis topic | "uses parallel independent expert architecture: 8 domain-filtered experts / analyze their relevant data slices in parallel / calls model provider APIs directly" | Model this as a Rosetta council/orchestration pattern | high |
| 2026-04-25 | docs/external/Berman-PRD.md | Cron Jobs — OpenClaw Cron Jobs | cron, operations | daily-brief, morning-council, crm-ingestion, config-review, security-review, platform-health, business-meta-analysis, social-collect, log-rotation, log-ingest, update-check, e2e-tests, prd-sync | requirement | 20+ cron jobs defined across daily, hourly, multiple-times-hourly, multiple-times-daily, weekly, monthly schedules | "All cron jobs follow a standardized pattern: log-start → execute → log-end → Telegram notification" | Map all cron jobs to Rosetta cron registry | high |
| 2026-04-25 | docs/external/Berman-PRD.md | Memory System | memory | daily-notes, memory-synthesis, heartbeat-state, task-history | requirement | Memory system: daily notes (YYYY-MM-DD.md), synthesized MEMORY.md (weekly), heartbeat-state.json, task history in `memory/tasks/` | "memory/YYYY-MM-DD.md / MEMORY.md (root) / memory/heartbeat-state.json / memory/tasks/" | Model memory system structure in Rosetta memory-plane | high |
| 2026-04-25 | docs/external/Berman-PRD.md | Integrations — Telegram | integrations, channels | telegram, 13-topics, group-id | requirement | Telegram: 13 named topics, group -1003725393532, primary interface for CRM, notifications, approvals | "Primary interface for CRM queries, notifications, approvals, and cron updates / Topic IDs documented" | Model Telegram as a Rosetta channel integration | high |
| 2026-04-25 | docs/external/Berman-PRD.md | Integrations — Slack | integrations, channels | slack, bot-token, user-token, attribution | requirement | Slack: bot token + user token (for sending as Matt), attribution rules (bot no prefix, user token prefix `🦞 OpenClaw:`) | "Bot token + user token (for sending as Matt) / Bot messages no prefix; user token messages prefix with `🦞 OpenClaw:`" | Document Slack attribution rules in Rosetta channel config | medium |
| 2026-04-25 | docs/external/Berman-PRD.md | Integrations — Financial Data | financials, security | financials-confidential, cfo-persona, monthly-csv | requirement | Financial data: strict confidentiality (Matt only), CFO reviewer persona in council, monthly CSV imports via Telegram, P&L/Balance Sheet generated | "Financial data is strictly confidential - only shared with Matt directly (DM or financials topic). Council digests reference financial health directionally, not specific dollar amounts." | Ensure Rosetta enforces financials confidentiality boundary | critical |
| 2026-04-25 | docs/external/Berman-PRD.md | Databases | storage, databases | sqlite-wal, 14-databases, cron-log, interactions, logs | requirement | 14+ SQLite databases (CRM, video-pitches, business-meta-analysis, YouTube, social-growth, cron-log, hubspot-sync, beehiiv-sync, asana-sync, knowledge-base, financials, interactions, logs) + JSONL model-usage log | "All databases are SQLite with WAL mode enabled / Operational logging model is hybrid: structured event logs are canonical in JSONL" | Map all 14+ databases to Rosetta storage package | high |
| 2026-04-25 | docs/external/Berman-PRD.md | Environment Variables | environment, security | env-vars, api-keys, credentials | requirement | Canonical `.env` at `~/.openclaw/.env` with API keys for all services; compatibility symlinks at `~/clawd/.env`, `~/clawd/crm/.env`, `~/clawd/tools/social-tracker/.env` | "Compatibility paths: `~/clawd/.env`, `~/clawd/crm/.env`, and `~/clawd/tools/social-tracker/.env` are symlinks to `~/.openclaw/.env`" | Document env var structure in Rosetta configuration management | high |
| 2026-04-25 | docs/external/Berman-PRD.md | Test Infrastructure | testing, ci | e2e-tests, 3-tiers, unit-tests, integration-tests, skill-tests, tool-tests, script-tests | requirement | Test infrastructure: unit, integration, skill, tool, script tests + E2E Tier 1 (nightly, no LLMs), Tier 2 (weekly, ~$1-2), Tier 3 (weekly, ~$2-3 + Telegram) | "Test Categories: CRM Unit Tests, CRM Integration Tests, Shared Module Tests, Skill Tests, Tool Tests, Script Tests / E2E test tiers documented" | Map test infrastructure to Rosetta testing package | high |
| 2026-04-25 | docs/external/Berman-PRD.md | Configuration Files | workspace-config | root-md-files, agents-md, soul-md, identity-md, user-md, tools-md, memory-md, heartbeat-md, subagent-policy-md, restore-md, prd-md | requirement | Root `.md` files: AGENTS, SOUL, IDENTITY, USER, TOOLS, MEMORY, HEARTBEAT, SUBAGENT-POLICY, RESTORE, PRD | "Root-level `.md` files that define workspace behavior" | Ensure Rosetta text-core covers all root config files | high |
| 2026-04-25 | docs/external/Berman-PRD.md | Other Directories — `reference/moltbot/` | reference | moltbot-clone, platform-internals | decision | `reference/moltbot/` is a clone of the OpenClaw platform source repo used as a reference for understanding platform internals (gateway, channels, agent system, cron, memory, CLI) | "`reference/moltbot/` — Clone of the OpenClaw platform source repo — used as a reference for understanding platform internals" | Retain moltbot as a reference; consider whether Rosetta needs a similar internal reference | medium |
| 2026-04-25 | docs/external/Berman-PRD.md | Cron Jobs — E2E Tests | testing, ci | e2e-tier-1, e2e-tier-2, e2e-tier-3, nightly, weekly | requirement | E2E Tier 1 nightly (no LLMs, live APIs only), Tier 2 weekly (agent turns, ~$1-2), Tier 3 weekly (full pipeline + Telegram round-trip, ~$2-3) | "E2E Tests: Tier 1 (Nightly) / E2E Tests: Tier 2 (Weekly) / E2E Tests: Tier 3 (Weekly)" | Document E2E tier strategy in Rosetta testing package | high |
| 2026-04-25 | docs/external/Berman-PRD.md | Shared Modules — content-sanitizer.js | security, shared-modules | content-sanitizer, prompt-injection, sanitize | requirement | Content sanitization module detects and blocks prompt injection, sanitizes untrusted content from web pages, tweets, Slack/Telegram, Asana/HubSpot, transcripts, KB, uploads | "detects and blocks prompt injection attempts, sanitizes untrusted content from web pages, tweets, Slack/Telegram messages, Asana/HubSpot records, transcripts, KB excerpts, uploaded files" | Model content-sanitizer as a core Rosetta security module | critical |
| 2026-04-25 | docs/external/Berman-PRD.md | Shared Modules — interaction-store.js | logging, shared-modules | interactions-db, llm-calls, api-calls | requirement | Centralized SQLite store for all API and LLM interactions with fire-and-forget `logLlmCall()` and `logApiCall()` | "stores full request/response bodies in `~/clawd/data/interactions.db` with `llm_calls` and `api_calls` tables" | Ensure Rosetta has equivalent interaction logging | high |
| 2026-04-25 | docs/external/Berman-PRD.md | CRM System — Intent Detection | crm, nlp | intent-detector, 16-intent-types | requirement | Intent detector supports 16 query types: contact, topic, log_interaction, create_follow_up, list_follow_ups, mark_follow_up_done, snooze_follow_up, nudges, contact_documents, show_source, merge_suggestions, merge_accept/decline, merge, company, sync, stats | "Natural language intent detector supporting these query types: contact, topic, log_interaction, create_follow_up, ..." | Consider as Rosetta intent-routing reference | medium |
| 2026-04-25 | docs/external/Berman-PRD.md | Tools — Video Pitches | tools, video-pitches | video-pitch-hard-gate, semantic-search, similarity-threshold | requirement | Video pitch DB enforces hard gate: must search before pitching; skip if >40% similarity match | "Enforces the video pitch hard gate rule in AGENTS.md (must search before pitching; skip if >40% similarity match)" | Model video-pitch hard gate as a Rosetta enforcement rule | high |
| 2026-04-25 | docs/external/Berman-PRD.md | Cron Jobs — Security Review | security, cron | security-review, cursor-agent, opus-summarizer | requirement | Nightly security review uses Cursor agent CLI for direct codebase analysis + Opus summarizer for structured JSON output (security-council-v2.js) | "Cursor agent CLI security analysis + Opus summarizer / runs security-review.sh, inspects files/permissions/code directly" | Document Cursor-agent-based security council in Rosetta | medium |
| 2026-04-25 | docs/external/Berman-PRD.md | Cron Jobs — Platform Health Council | platform, cron | platform-council, cursor-agent, 9-areas | requirement | Daily platform health council uses Cursor agent CLI analyzing 9 areas: cron health, code quality, test coverage, prompt quality, dependencies, storage, skill integrity, config consistency, CRM data integrity | "Analyzes 9 areas: cron health, code quality, test coverage, prompt quality, dependencies, storage, skill integrity, config consistency, CRM data integrity" | Document 9-area platform health model in Rosetta | medium |
| 2026-04-25 | docs/external/Berman-PRD.md | OpenClaw Platform Configuration — Version | platform-config | openclaw-version-stale | risk | OpenClaw version documented as 2026.2.15 (Feb 17, 2026) but PRD itself was copied Feb 28 and last updated Feb 17 — likely stale | "Version: 2026.2.15 (as of Feb 17, 2026) / Last updated: 2026-02-17" | Flag PRD as potentially stale; verify current OpenClaw version | medium |
| 2026-04-25 | docs/external/Berman-PRD.md | Scripts & Automations — auto-git-sync.sh | automation, git | auto-git-sync, two-repo-sync | requirement | Auto-git-sync.sh syncs two repos in order (`~/.openclaw/` then `~/clawd/`), pulls before push, handles merge conflicts, sends Telegram on failure | "Syncs two repos in order: `~/.openclaw/`, `~/clawd/` (which now includes `crm/`) / Pulls before pushing, handles merge conflicts" | Document two-repo sync pattern in Rosetta | medium |

---

## Components And Technologies

- **Runtime**: Node.js (skills, CRM, shared modules), Python (social-tracker, nano-banana-pro-2, business-meta-analysis)
- **Database**: SQLite WAL mode (14+ databases across CRM, social-tracker, business-meta-analysis, logs, financials, knowledge-base, interactions)
- **Vector embeddings**: Google `gemini-embedding-001` (768-dim) — standardized across all stores (CRM, KB, business-meta-analysis, OpenClaw memory index); OpenAI `text-embedding-3-small` (1536-dim) also available in shared/embeddings.js
- **Model providers**: Anthropic (Opus 4.6, Sonnet 4.5, Haiku 4.5), Google (Gemini 3 Pro, Gemini 3 Flash), X.AI (Grok Beta)
- **LLM clients**: Unified multi-provider LLM client in `shared/llm.js` (Google/OpenAI/Anthropic) with Gemini thinking budget support
- **CLI tools**: `gog` (Google Workspace), `clawdhub` (skill management), `bun` (X/Twitter research), `uv` (nano-banana-pro-2)
- **APIs**: Telegram bot API, Slack API, Fathom API, Box API v2.0, Gmail API (via gog), Google Calendar API (via gog), Todoist API, Asana API, HubSpot REST API, Beehiiv REST API v2, X/Twitter API v2, YouTube Data API, Instagram Graph API, Meta Graph API
- **Auth methods**: OAuth tokens (gog, Google Workspace), Bearer tokens (Box, Fathom, Beehiiv), OAuth 1.0a (X/Twitter analytics), API keys (various)
- **Cron**: OpenClaw cron system (`~/.openclaw/cron/jobs.json`) with standardized start/log/end pattern + Telegram reporting
- **Launchd**: `ai.openclaw.gateway` plist (RunAtLoad + KeepAlive)
- **Logging**: Hybrid — JSONL canonical (`~/clawd/data/logs/all.jsonl` + per-event) + SQLite for query-heavy datasets; nightly ingest from JSONL to SQLite
- **Test infrastructure**: Node.js test runner, GitHub Actions CI, 3-tier E2E (Tier 1 nightly no-LLM, Tier 2 weekly agent turns, Tier 3 weekly full pipeline)
- **Backup**: Encrypted hourly backups to Google Drive "OpenClaw Backups" folder, last 7 kept, manifest.json for restore
- **Security**: content-sanitizer.js (prompt injection defense), secret-redaction.js, notification-redaction.js, security-review.sh (file permissions, gateway loopback, auth check, no secrets in git), Cursor-agent-based security and platform councils

---

## Conceptual Claims

- "The workspace is a monorepo-style project layered on top of OpenClaw" — OpenClaw provides the agent framework, gateway, and skill system; everything below is custom in `~/clawd/`
- "SQLite for all persistent local data (WAL mode, foreign keys)" — No other database engine is used for persistent storage
- "Vector embeddings standardized on Google `gemini-embedding-001` (768-dim) across all stores" — Unifies embedding dimensionality across KB, CRM, business-meta-analysis, and OpenClaw memory
- "Telegram as the primary notification and interaction channel" — All CRM queries, approvals, cron notifications flow through Telegram
- "All cron jobs logged to a central database with Telegram notifications" — Cron log is the system of record for job health
- "CRM anti-injection security: sanitizes email content, blocks prompt injection patterns" — CRM is treated as processing untrusted external content
- "Box relevance scoring: collaborator match 45%, semantic 25%, lexical 20%, recency 10%" — Hybrid scoring model with explicit weight breakdown
- "Gmail draft system is draft-only — no send operations" — Hard constraint: AI never sends email, only creates drafts for human review
- "Relationship health scored 0–100 based on recency, frequency, priority, interaction quality" — Composite scoring model for CRM nudge generation
- "Fathom polling is calendar-aware — dynamic instead of static scheduling" — Meeting end + buffer triggers sync, not fixed time intervals
- "Business meta-analysis uses 8 independent expert personas analyzing 14 data sources in parallel" — Parallel independent expert architecture (PIE) for business intelligence
- "E2E Tier 1 is no-LLM (live APIs only)" — Test infrastructure distinguishes between LLM-dependent and API-only tests
- "Financial data is strictly confidential — Matt only" — Hard confidentiality boundary; council receives directional signals only
- "Structured event logs are canonical in JSONL" — JSONL is the primary canonical log format; SQLite is derived/mirrored for query access
- "Dual view tracking for X/Twitter: public_metrics + analytics endpoint" — Always has view count from public_metrics; richer metrics from analytics endpoint when available
- "Auto-git-sync.sh syncs two repos: `~/.openclaw/` then `~/clawd/`" — Two-repo sync pattern with ordering guarantee
- "Skills discovered via `SKILL.md` files in skill directories" — Skill discovery is file-based (SKILL.md manifest pattern)
- "CRM context system: extracts timeline entries with direction/topics using LLM, stores with 768-dim embeddings" — Semantic memory per contact with directional metadata

---

## Dependencies And Sequencing

- OpenClaw base platform (2026.2.15+) must be running before any CRM, skill, or tool operations
- `gog` CLI must be authenticated before CRM email/calendar scanning works
- `clawdhub` must be installed and authenticated before skill installation/updates
- CRM database (`~/clawd/crm/data/contacts.db`) must exist and be initialized (via migrations) before any CRM scripts run
- Box sync requires `BOX_ACCESS_TOKEN` and `BOX_ROOT_FOLDER_ID` env vars; graceful no-op if not configured
- Gmail draft requires `GMAIL_DRAFT_WRITES_ENABLED=true` safety gate; without it, draft creation is disabled
- Fathom sync requires `FATHOM_API_KEY`; calendar-aware polling depends on `gog` calendar access
- Social tracker (YouTube) requires OAuth via `gog` credentials; Instagram requires Meta Graph API long-lived token (refreshed every 60 days); X/Twitter requires OAuth 1.0a user context
- Hourly database backups depend on Google Drive access via `gog`
- Business meta-analysis depends on all data sources being synced (YouTube, Instagram, X, CRM, HubSpot, Asana, email, Fathom, financials, Beehiiv)
- Cursor-agent-based councils (security, platform) depend on Cursor agent CLI (`~/.local/bin/agent`) being available
- Auto-git-sync depends on both repos having correct remotes and permissions
- E2E Tier 2 and 3 depend on LLM API availability and Telegram connectivity
- JSONL log ingest depends on `~/clawd/data/logs/all.jsonl` existing; creates if missing
- Log rotation depends on `shared/log-rotation.js` and disk space for rotated files

---

## Contradictions Or Supersession

- `schedule-fathom-poll.js` is documented as "Legacy: dynamically schedule Fathom polling via launchd (superseded by `fathom-after-meetings.js`)" — superseded by calendar-aware polling
- `security-council.js` and `platform-council.js` are marked "Removed. Replaced by security-council-v2.js / platform-council-v2.js" — Cursor agent CLI-based councils replace multi-agent review-council approach
- `video-pitches.json` is noted as "(backup; primary is SQLite DB)" — JSON file deprecated in favor of SQLite
- `cron-log/checkpoint.js` status `started/done/skipped/failed` with exit code 3 = terminal checkpoint found — exits with code 3 to signal caller to skip, not an error
- `fathom-after-meetings.js` "Replaces static scheduling with dynamic, meeting-aware triggers" — represents a shift from time-based to event-based polling
- The PRD last updated 2026-02-17 but was copied 2026-02-28 — suggests the PRD may be stale relative to current workspace state

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
|---|---|---|---|---|---|
| PRD is stale — last updated 2026-02-17, OpenClaw has likely been updated | risk | `docs/intake/issue-drafts/2026-04-25-berman-prd-stale.md` | docs-intelligence, stale, maintenance | | "Version: 2026.2.15 (as of Feb 17, 2026) / Last updated: 2026-02-17 / Copied on Saturday, Feb 28 2026" |
| Credential symlink ambiguity — which `.env` is authoritative? | risk | `docs/intake/issue-drafts/2026-04-25-berman-env-symlink-ambiguity.md` | docs-intelligence, configuration, security | | "Compatibility paths: `~/clawd/.env`, `~/clawd/crm/.env`, and `~/clawd/tools/social-tracker/.env` are symlinks to `~/.openclaw/.env`" |
| Fathom meeting processor creates context entries and updates relationship summaries — no rollback documented if LLM extraction fails mid-way | risk | `docs/intake/issue-drafts/2026-04-25-berman-fathom-processor-no-rollback.md` | crm, fathom, error-handling | | "Processor: matches attendees to CRM contacts by email, extracts insights via Gemini 2.5 Flash Lite, creates context entries with embeddings, updates relationship summaries" — no transaction or rollback described |
| CRM auto-approval after 50 decisions has no documented safety mechanism if pattern-learner drifts | risk | `docs/intake/issue-drafts/2026-04-25-berman-crm-auto-approval-no-drift-safety.md` | crm, intelligence, safety | | "Learning system (`pattern-learner.js`): builds skip patterns from approve/reject decisions, suggests auto-add mode after 50 decisions" — no drift detection or override documented |
| Business meta-analysis 8-expert parallel architecture has no documented consensus/conflict resolution mechanism | open-question | `docs/intake/issue-drafts/2026-04-25-berman-meta-analysis-conflict-resolution.md` | business-meta-analysis, architecture, open-question | | "8 domain-filtered experts analyze their relevant data slices in parallel, then a synthesizer merges their findings" — no conflict resolution strategy documented |
| X/Twitter dual view tracking — if analytics endpoint is unavailable, falls back to public_metrics — no alerting if fallback is chronic | risk | `docs/intake/issue-drafts/2026-04-25-berman-x-analytics-fallback-chronic.md` | x-analytics, social-tracker, monitoring | | "Dual collection / Falls back to public_metrics when analytics unavailable" — no monitoring/alerting if fallback becomes chronic |
| E2E Tier 3 cost is ~$2-3 per run — weekly runs could be $100-150/month — no budget tracking documented | risk | `docs/intake/issue-drafts/2026-04-25-berman-e2e-tier3-cost-tracking.md` | testing, cost, e2e | | "E2E Tests: Tier 3 (Weekly) / costs ~$2-3" — no cost tracking or budget cap mentioned |
| Instagram token refresh — 60-day window — no Slack/Telegram reminder if token nears expiry | risk | `docs/intake/issue-drafts/2026-04-25-berman-instagram-token-expiry-reminder.md` | instagram, social-tracker, auth | | "Instagram via Meta Graph API long-lived token (`~/.openclaw/.env`, refresh every 60 days with `ig_collect.py --refresh`)" — no advance reminder system documented |
| Box sync — "max depth 5" tree traversal — no circular reference protection if Box has symlink loops | risk | `docs/intake/issue-drafts/2026-04-25-berman-box-sync-depth-circular-ref.md` | crm, box, sync | | "client.js / tree traversal (max depth 5)" — no mention of circular reference handling |
| launchd gateway auto-restart — if gateway crashes in a tight loop, no backoff throttle documented | risk | `docs/intake/issue-drafts/2026-04-25-berman-gateway-crash-loop-no-backoff.md` | openclaw, platform-config, operations | | "Launchd: RunAtLoad + KeepAlive (auto-restart)" — no mention of crash backoff or throttle |

---

## Project Board Suggestions

- **Area**: `platform-ops` (for the OpenClaw workspace itself) and `rosetta-docs-intelligence` (for this extraction)
- **Cycle**: This extraction maps a Tier 2 source; no new concepts introduced — all items are reclassifications of known concepts
- **Status**: Source is stale (2026-02-17); workspace has likely evolved beyond PRD
- **Blocked by**: None — extraction can proceed independently
- **Parallelization notes**: CRM, social-tracker, and business-meta-analysis are independently documentable sub-domains; parallel extraction of sub-systems is feasible. Security council and platform council are tightly coupled to cursor-agent CLI which may change independently.

---

## Open Questions

- What is the current OpenClaw version (2026.2.15 is likely stale)?
- Has the CRM schema changed since Feb 2026 (20 tables documented)?
- Are there any skills installed since Feb 2026 not in the 22+2 count?
- What is the actual disk space utilization across all 14+ databases?
- Is the `reference/moltbot/` clone kept in sync with OpenClaw source?
- Does the 8-expert business meta-analysis have documented conflict resolution when experts disagree?
- Is there a cost tracking mechanism for E2E Tier 2/3 runs?
- Does Box sync handle circular folder references?
- Is there an Instagram token expiry reminder before the 60-day window?

---

## New Concepts Flag

**Zero new concepts introduced by Berman-PRD.**

All concepts in Berman-PRD are already present in the CONCEPT_INDEX:

- `openclaw`, `crm`, `skills`, `storage`, `sqlite-wal`, `embeddings`, `gemini-embedding-001`, `google-workspace`, `gog`, `telegram`, `cron`, `cron-log`, `security`, `prompt-injection`, `box`, `gmail`, `fathom`, `social-tracker`, `youtube`, `instagram`, `x-analytics`, `business-meta-analysis`, `financials`, `hubspot`, `beehiiv`, `asana`, `todoist`, `knowledge-base`, `excalidraw`, `browser-control`, `llm`, `model-routing`, `launchd`, `backup`, `restore`, `test-infra`, `e2e-tests`, `content-sanitizer`, `secret-redaction`, `notification-redaction`, `review-council`, `cursor-council`, `workspace-state`, `event-log`, `interaction-store`, `log-rotation`, `node-types`, `memory-layers`, `shared-modules`, `governance`, `agent-classes`, `runtime-ingestion`, `memory`, `tapestry`, `receipts`, `rights`, `importers`, `storage-migration-path`, `node-version`, `bootstrap`, `authority-chain`, `constitutional`, `package-inventory`, `project-board`, `monorepo`, `nx`, `pnpm`, `typescript`, `python`, `react`, `ci-cd`, `observability`, `orchestration`, `agent-harnesses`, `memory-architecture`, `context-management`, `token-efficiency`, `subagents`, `memory-plane`, `constitutional-cache`, `receipt-bundle`, `memory-stack`, `constitutional-spine`, `prism-mcp`, `muninn`, `muninndb`, `engram`, `sovereign-kernel`, `omoc`, `swarm-gnosis`, `rosetta`, `tack-0-through-7`, `rock-suite`, `packs`, `semver`, `migration`, `ci-gates`, `acceptance`, `enforcement`, `dependency`, `cycles`, `filesystem-contract`, `manifest-contract`, `exports-format`, `traceability`, `versioning`, `backwards-compatibility`, `conformance`, `conformance-profiles`, `headers`, `naming`, `testing`, `test-vectors`, `release`, `implementation`, `next-actions`, `recipes`, `skills`, `subtrees`, `persona-pack`, `refinement-first`, `core-stability`, `identity`, `pack-categories`, `pack-model`, `required-files`, `optional-subtrees`, `pack-json`, `manifest`, `specialization`, `rrp`

Berman-PRD is a comprehensive **inventory** of the existing system, not a source of new architectural concepts.

---

## Issue Drafts

The following issue drafts were written to `docs/intake/issue-drafts/`:

1. `2026-04-25-berman-prd-stale.md` — PRD is stale (2026-02-17)
2. `2026-04-25-berman-env-symlink-ambiguity.md` — Credential symlink ambiguity
3. `2026-04-25-berman-fathom-processor-no-rollback.md` — Fathom processor lacks rollback
4. `2026-04-25-berman-crm-auto-approval-no-drift-safety.md` — CRM auto-approval drift safety
5. `2026-04-25-berman-meta-analysis-conflict-resolution.md` — Business meta-analysis conflict resolution
6. `2026-04-25-berman-x-analytics-fallback-chronic.md` — X analytics fallback chronic monitoring
7. `2026-04-25-berman-e2e-tier3-cost-tracking.md` — E2E Tier 3 cost tracking missing
8. `2026-04-25-berman-instagram-token-expiry-reminder.md` — Instagram token expiry reminder missing
9. `2026-04-25-berman-box-sync-depth-circular-ref.md` — Box sync circular reference protection
10. `2026-04-25-berman-gateway-crash-loop-no-backoff.md` — Gateway crash loop no backoff