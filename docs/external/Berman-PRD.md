# PRD.md - Product Requirements & Feature Inventory

* Author: Matthew Berman
* Copied on Saturday, Feb 28 2026 at 2:25 AM

> Everything built on top of the base OpenClaw platform. Canonical reference for what exists, where it lives, and how it works.
> Operational use cases and workflow playbooks live in `docs/USE-CASES-WORKFLOWS.md`.

---

## Table of Contents

1. [Operational Use Cases & Workflows](docs/USE-CASES-WORKFLOWS.md)
2. [Architecture Overview](#architecture-overview)
3. [OpenClaw Platform Configuration](#openclaw-platform-configuration)
4. [CRM System](#crm-system)
5. [Fathom Meeting Integration](#fathom-meeting-integration)
6. [Skills](#skills)
7. [Tools](#tools)
8. [Shared Modules](#shared-modules)
9. [Scripts & Automations](#scripts--automations)
10. [Cron Jobs](#cron-jobs)
11. [Memory System](#memory-system)
12. [Integrations](#integrations)
13. [Databases](#databases)
14. [Environment Variables](#environment-variables)
15. [Test Infrastructure](#test-infrastructure)
16. [Configuration Files](#configuration-files)
17. [Other Directories](#other-directories)

---

## Architecture Overview

The workspace is a monorepo-style project layered on top of OpenClaw. The base platform provides the agent framework, gateway, and skill system. Everything below is custom.

```
clawd/
├── crm/                  # Personal CRM (tracked directly inside this repo)
├── data/                 # Workspace databases (cron-log, video-pitches, business-meta-analysis)
├── docs/                 # Setup guides (Slack, workspace file organization)
├── life/                 # (empty directory, reserved for future use)
├── memory/               # Daily notes, state files, reference data
├── reference/            # Static reference data (recycling, competitors)
├── scripts/              # Shell automation scripts
├── shared/               # Shared Node.js utility modules
├── skills/               # OpenClaw skills (22 installed)
├── skills-preview/       # Skills in development (2)
├── state/                # Mutable runtime state files
├── tests/                # Test suite (unit, integration, skill, tool, script tests)
├── tools/                # Standalone utility scripts and databases
├── youtube-analysis/     # YouTube competitor analysis and content strategy
├── .learnings/           # Self-improvement corrections and learnings
└── [Root .md files]      # Core config (AGENTS, TOOLS, MEMORY, SOUL, etc.)
```

**Key patterns:**
- SQLite for all persistent local data (WAL mode, foreign keys)
- Vector embeddings standardized on Google `gemini-embedding-001` (768-dim) across all stores (KB, CRM, business-meta-analysis, OpenClaw memory index)
- Telegram as the primary notification and interaction channel
- All cron jobs logged to a central database with Telegram notifications
- Shared modules (`shared/`) for common functionality across tools and skills
- `gog` CLI for all Google Workspace access (Gmail, Calendar, Drive, etc.)

---

## OpenClaw Platform Configuration

**Config location:** `~/.openclaw/`
**Gateway launchd:** `~/Library/LaunchAgents/ai.openclaw.gateway.plist`
**Version:** 2026.2.15 (as of Feb 17, 2026)

### Gateway

- **Port:** 18789
- **Mode:** Local (loopback only, not exposed to network)
- **Auth:** Token-based
- **Tailscale:** Off
- **Logs:** `~/.openclaw/logs/gateway.log` and `gateway.err.log`
- **Binary:** `/opt/homebrew/lib/node_modules/openclaw/dist/index.js`
- **Launchd:** RunAtLoad + KeepAlive (auto-restart)

### Model Providers

| Provider | Models | Context | Pricing |
|----------|--------|---------|---------|
| Anthropic | Opus 4.6 (primary), Sonnet 4.5, Haiku 4.5 | 200K (1M via API tier 4+) | Pay-per-token |
| Google | Gemini 3 Pro, Gemini 3 Flash | 2M / 1M | Free |
| X.AI | Grok Beta | 131K | $5/$15 per 1M tokens |

**Model fallback chain:**
- Main: Opus → Sonnet → Gemini Pro → Gemini Flash → Haiku
- Subagents: Sonnet → Gemini Flash → Haiku → Gemini Pro

### Agent Settings

- Primary model: `anthropic/claude-opus-4-6`
- Max concurrent agents: 4
- Max concurrent subagents: 8
- Subagent primary model: Sonnet 4.5
- Context pruning: cache-ttl mode, 1h TTL
- Heartbeat interval: 1 hour
- Memory backend: `builtin` (Gemini embeddings)
- CLI backend: Cursor agent at `~/.local/bin/agent`

### Plugins

| Plugin | Status | Purpose |
|--------|--------|---------|
| `telegram` | Enabled | Telegram channel integration |
| `slack` | Enabled | Slack channel integration (socket mode) |
| `google-gemini-cli-auth` | Enabled | Google Gemini CLI authentication |
| `memory-core` | Enabled | Core memory backend |
| `memory-lancedb` | Disabled | Alternative memory backend |

### Channels

- **Telegram:** DM policy "pairing", group allowlist, partial stream mode
- **Slack:** Socket mode, allowlist policy, history limit 50

### Skill Management

- Skills installed via `clawdhub` CLI
- Install directory: `~/clawd/skills/`
- Lock file: `~/clawd/.clawdhub/lock.json` (tracks installed versions)
- Skills discovered via `SKILL.md` files in skill directories

---

## CRM System

**Location:** `crm/` (tracked directly in this repo)
**Database:** `~/clawd/crm/data/contacts.db`
**Skill interface:** `skills/crm-query/`
**Stats:** ~1,174 contacts tracked

### What It Does

A personal CRM that automatically discovers contacts from email and calendar, tracks relationships with vector-based semantic search, integrates with Box for document relevance, supports AI-assisted email drafting, and provides a natural language query interface via Telegram.
Operational CRM workflows (querying, follow-ups, meeting processing, and drafting handoffs) are documented in `docs/USE-CASES-WORKFLOWS.md`.

### Contact Discovery

- Scans Gmail and Google Calendar (last 365 days) via the `gog` CLI
- Filters out newsletters, automated senders, large meetings (>10 people), internal domains (forwardfuture.ai)
- Learning system (`pattern-learner.js`): builds skip patterns from approve/reject decisions, suggests auto-add mode after 50 decisions
- Anti-injection security: sanitizes email content, blocks prompt injection patterns

### Database Schema

| Table | Purpose |
|-------|---------|
| `contacts` | Core contact info (name, email, company, role, priority, relationship_score) |
| `interactions` | Log of meetings, emails, calls, messages (includes `fathom_meeting_id` FK) |
| `follow_ups` | Scheduled reminders with due dates, snoozing, status tracking |
| `contact_context` | Timeline entries with 768-dim vector embeddings, direction, response time, topic tags |
| `contact_summaries` | LLM-generated relationship summaries with embeddings |
| `meetings` | Fathom meeting data (title, summary, transcript, attendees, action items) |
| `meeting_action_items` | Structured action items with assignee, ownership flag, status, due date, Todoist link |
| `merge_suggestions` | Duplicate contact detection with score, reasons, accept/decline workflow |
| `relationship_profiles` | Structured relationship analysis (type, style, topics, sentiment trend, interaction counts) |
| `learning_patterns` | Learned filtering patterns from approve/reject decisions |
| `rejected_contacts` | Tracking rejected candidate contacts with rejection counts |
| `sources` | Contact discovery source tracking |
| `meta` | Key-value store for sync cursors, last-handled timestamps, etc. |
| `box_files` | Box file metadata (name, path, extension, owner, etag, web URL, soft-delete flag) |
| `box_file_chunks` | Extracted text chunks with embeddings for semantic search |
| `box_file_collaborators` | Collaborator emails and roles per Box file |
| `contact_document_links` | Cached relevance links between contacts and Box files |
| `box_sync_state` | Box sync checkpoints |
| `email_draft_requests` | Gmail draft proposals with approval workflow (proposed→approved→drafted) |
| `urgent_notifications` | Urgent email notification tracking with feedback loop — stores each notification sent, dedup state, and natural language feedback for few-shot classifier learning |

### Architecture: Handler Modules (`crm/src/handlers/`)

The CRM query system is organized into modular handler files mixed into the main CRMService:

| Handler | Purpose |
|---------|---------|
| `contacts.js` | Contact lookup, company queries, merge operations, sync triggers, stats |
| `follow-ups.js` | Follow-up creation, listing, marking done, snoozing |
| `interactions.js` | Interaction logging from natural language, nudge generation |
| `topics.js` | Semantic topic search across all contacts, source inspection (`show source #N`) |
| `documents.js` | Box document relevance queries per contact |

### Intent Detection (`crm/src/intent-detector.js`)

Natural language intent detector supporting these query types:

| Intent | Example |
|--------|---------|
| `contact` | "Tell me about Mark", "Who is Sarah?" |
| `topic` | "Who have I talked to about fundraising?" |
| `log_interaction` | "I met with John today about the project" |
| `create_follow_up` | "Follow up with Lisa in 2 weeks" |
| `list_follow_ups` | "Show my follow-ups", "Follow-ups" |
| `mark_follow_up_done` | "Mark follow-up #3 done" |
| `snooze_follow_up` | "Snooze follow-up #2" |
| `nudges` | "Who needs attention?", "Who should I reach out to?" |
| `contact_documents` | "Show docs for Mark", "What files for Acme?" |
| `show_source` | "Show source #3" (evidence inspection from last query) |
| `merge_suggestions` | "Show duplicates" |
| `merge_accept` / `merge_decline` | "Accept merge #5" |
| `merge` | "Merge John and Jonathan" |
| `company` | "Who do I know at Google?" |
| `sync` | "Scan for new contacts" |
| `stats` | "How many contacts?", "Stats" |

### Scripts

| Script | Purpose |
|--------|---------|
| `sync.js` | Manual contact discovery scan |
| `daily-sync.js` | Automated daily sync (runs via OpenClaw cron at 2am PST) |
| `batch-scan.js` | Batch contact scanning with rate limiting, classification, auto-approval, context updates, candidate export, Telegram notifications, incremental progress saving |
| `batch-scan-context.js` | Phase 5: scans recent inbound emails, matches to existing contacts, extracts context entries via LLM, generates embeddings, updates relationship summaries |
| `batch-scan-helpers.js` | Shared utilities for batch scanning (chunking, date parsing, email extraction, candidate classification, contact approval) |
| `process-context.js` | Extract timeline entries from emails using LLM |
| `backfill-context.js` | Full-history email backfill for all contacts, relationship profile generation |
| `box-sync.js` | Box folder sync - indexes files, extracts content, generates embeddings, computes contact relevance. Flags: `--force`, `--max-files=N`, `--rebuild-links` |
| `fathom-sync.js` | Sync Fathom meetings - `--poll` and `--backfill` modes |
| `fathom-after-meetings.js` | Calendar-aware Fathom polling - checks today's meetings, triggers poll after meeting end + buffer (default 20 min). Replaces static scheduling with dynamic, meeting-aware triggers. |
| `fathom-approve.js` | Approve verified action items from Fathom, push to Todoist |
| `schedule-fathom-poll.js` | Legacy: dynamically schedule Fathom polling via launchd (superseded by `fathom-after-meetings.js`) |
| `merge-contacts.js` | Merge duplicate contacts by ID or email |
| `query.js` | CLI query interface for natural language queries |
| `verify-context-system.js` | Verification script for context system |
| `urgent-email-check.js` | Scan recently-ingested inbound emails for urgency. Pre-filters noise senders, classifies via LLM with few-shot learning from feedback, sends notifications to CRM topic 709. Gates on notification windows (weekdays 5-9pm, weekends 7am-9pm PST). |
| `health-check.js` | CRM database health monitor. Checks integrity, detects contact count drops (> 20% = alert), verifies key tables, monitors ingestion activity. Stores baseline in meta table. Runs after nightly ingestion. |
| `restore-from-backups.js` | One-time recovery script that merges data from two partially-corrupt backups, picking the best available version of each table. |
| `urgent-feedback.js` | Process natural language feedback on urgent notifications. Interprets Matt's reply via LLM to extract verdict (useful/noise) and generalized reasoning. Supports `--id <N>` or `--latest`. |
| `migrate.js` | General database migration runner - calls Schema to run all pending migrations |
| `migrate-context.js` | Migration script for `contact_context` table and indexes |
| `seed-test-data.js` | Seeds database with fake test data (contacts, interactions, follow-ups) for development |
| `fathom-poll-oneshot.sh` | Ephemeral one-shot Fathom poll trigger - runs `fathom-sync.js --poll` then self-unloads its launchd plist |
| `run-context-tests.sh` | Test runner for the context system - installs deps, runs migration, executes tests |

### Core Service (`crm/src/`)

| Module | Purpose |
|--------|---------|
| `index.js` | Main `CRMService` class - wires together all DB modules, intelligence, ingestion, context, handlers, Box, and Gmail. Singleton entry point. |
| `config.js` | CRM configuration management - loads `.env`, resolves paths, provides defaults for all CRM settings |
| `intent-detector.js` | Natural language intent detection - classifies queries into 16 intent types (contact, topic, follow-up, nudge, merge, sync, stats, documents, etc.) |
| `query-helpers.js` | Shared query helper methods mixed into CRMService - contact resolution by email/name, date parsing, formatting |

### Database Access Layer (`crm/src/db/`)

| Module | Purpose |
|--------|---------|
| `schema.js` | Database schema creation and all migrations (20 tables, indexes, column additions) |
| `contacts.js` | Contact CRUD - search, create, update, delete, by-email/name lookup |
| `interactions.js` | Interaction logging - create, query by contact/date/type |
| `followups.js` | Follow-up CRUD - create, list pending/overdue, snooze, mark done |
| `merge-suggestions.js` | Duplicate detection - suggest, accept, decline merge candidates |
| `learning.js` | Pattern storage for learned contact filtering rules |
| `email-draft-requests.js` | Email draft proposal lifecycle - propose, approve, mark drafted/cancelled/error |
| `meeting-action-items.js` | Action item storage - create, query by meeting/contact/assignee, mark done, Todoist linking |
| `rejections.js` | Rejected contact candidate tracking with counts |
| `meta.js` | Key-value store for sync cursors, last-handled timestamps, and runtime state |

### Contact Ingestion Pipeline (`crm/src/ingestion/`)

Discovers contacts from email and calendar, classifies them, and manages the approval workflow.

| Module | Purpose |
|--------|---------|
| `email-scanner.js` | Scans Gmail thread metadata via `gog` CLI to discover contact candidates |
| `calendar-scanner.js` | Scans Google Calendar events via `gog` CLI to discover contacts from meetings |
| `contact-extractor.js` | Merges email and calendar candidates, deduplicates, extracts contact info |
| `batch-approver.js` | Batch approval workflow for new contact candidates with interactive approve/reject |
| `ingest-utils.js` | Shared ingestion utilities - date parsing, clamping, helper functions |

### Telegram Interface (`crm/src/telegram/`)

Bot UI for CRM interactions via Telegram.

| Module | Purpose |
|--------|---------|
| `commands.js` | Telegram command handlers - routes messages to CRM query handlers, manages conversation flow |
| `menu.js` | Interactive menu system - inline keyboard menus, pagination, selection for contact actions |
| `formatters.js` | Output formatting - contact display, truncation, emoji, Telegram-safe markdown |

### Context System (`crm/src/context/`)

Extracts and stores relationship context from email history with semantic search.

| Module | Purpose |
|--------|---------|
| `email-fetcher.js` | Fetches emails via `gog` CLI |
| `email-body.js` | Email body extraction and cleaning |
| `extractor.js` | Extracts timeline entries with direction/topics using LLM |
| `embeddings.js` | Embedding generation (Google/OpenAI) |
| `storage.js` | Stores timeline entries with deduplication |
| `search.js` | Semantic and text search over context entries |
| `summary-storage.js` | Stores relationship summaries |
| `relationship-summarizer.js` | Generates LLM-powered relationship summaries |
| `response-generator.js` | Generates natural language responses to queries |

### Box Integration (`crm/src/box/`)

Indexes Box files and links them to CRM contacts via hybrid relevance scoring.

| Module | Purpose |
|--------|---------|
| `client.js` | Box API v2.0 client - folder listing, tree traversal (max depth 5), file download, collaborator lookup. Bearer token auth. |
| `relevance.js` | Hybrid relevance scoring: collaborator match (45%), semantic similarity (25%), lexical match (20%), recency (10%). Returns ranked results with component breakdowns and human-readable reasons. |
| `storage.js` | SQLite storage for files, chunks, collaborators, contact-document links, and sync state |
| `sync-service.js` | Full sync workflow: folder scan → file processing (content extraction, chunking, embedding) → cleanup → contact linking. Skips unchanged files via etag. Batch embeddings (8 at a time). |

**Config:** `BOX_ENABLED`, `BOX_ACCESS_TOKEN`, `BOX_ROOT_FOLDER_ID` in `~/.openclaw/.env` (available via CRM compatibility symlink)
**Cache:** File downloads cached to `~/clawd/crm/data/box-cache/`

### Gmail Draft System (`crm/src/gmail/`)

AI-assisted email drafting with CRM context and a two-phase approval workflow. Draft-only - no send operations.

| Module | Purpose |
|--------|---------|
| `gmail-client.js` | Minimal Gmail wrapper via `gog` CLI - thread search, thread fetch, draft creation/update. Read-only + draft operations. |
| `email-draft-coordinator.js` | Main workflow orchestrator: search Gmail by subject → score candidates (Jaro-Winkler similarity + recency) → extract CRM/Fathom context → generate suggestion → store as "proposed". Approval flow: proposed → approved → drafted (Gmail draft created). |
| `reply-suggester.js` | LLM-based reply generation using Gemini Flash Lite. Takes thread context, CRM contact info, CRM evidence, and Fathom meeting summaries. Outputs structured JSON with subject, body, assumptions, questions, and facts used. |

**Safety gate:** `GMAIL_DRAFT_WRITES_ENABLED=true` required to create Gmail drafts
**Workflow:** User provides subject → AI proposes reply → user reviews in Telegram → approval creates Gmail draft

### Relationship Intelligence (`crm/src/intelligence/`)

| Module | Purpose |
|--------|---------|
| `contact-classifier.js` | Classifies contacts by relevance/priority |
| `contact-filter.js` | Filters contacts based on learned patterns |
| `relationship-profiler.js` | Generates relationship profiles (type, communication style, key topics) |
| `relationship-scorer.js` | Calculates 0–100 health scores based on recency, frequency, priority, interaction quality |
| `nudge-generator.js` | Generates relationship health nudges for contacts needing attention |
| `pattern-learner.js` | Learns from approval/rejection decisions to improve filtering |

### Utilities (`crm/src/utils/`)

| Module | Purpose |
|--------|---------|
| `gog-runner.js` | Wrapper for `gog` CLI with retry/backoff |
| `llm.js` | Unified multi-provider LLM client (Google/OpenAI/Anthropic). Supports Gemini thinking budget. Used across CRM for text generation. |
| `openclaw-config.js` | Thin wrapper re-exporting `loadApiCredentials()` and `loadEmbeddingCredentials()` from shared config |
| `openclaw-wake.js` | Wake OpenClaw gateway with a message via CLI |
| `string-similarity.js` | String similarity calculations for contact matching (Jaro-Winkler) |

### Natural Language Queries

Supports queries like "What do I know about Mark?" via intent detection and semantic search over context embeddings. Accessed through the `crm-query` skill or Telegram (topic 709).

---

## Fathom Meeting Integration

**Location:** `crm/src/fathom/`

### What It Does

Automatically processes Fathom meeting recordings into CRM contacts, interactions, context entries, and action items with an approval workflow.

### Components

| Component | File | Purpose |
|-----------|------|---------|
| API Client | `api-client.js` | Fetches meetings, transcripts, summaries, action items from Fathom API |
| API Keys | `api-keys.js` | Manages Fathom API key loading from config |
| Calendar | `calendar.js` | Calendar integration helpers - fetches today's events via `gog`, filters for likely Fathom meetings (timed, has external attendees, 15+ min, ≤10 attendees) |
| After-Meetings Logic | `after-meetings-logic.js` | Pure logic for computing fire times (meeting end + buffer) and determining when polls should run |
| Processor | `processor.js` | Matches attendees to CRM contacts by email, extracts insights via Gemini 2.5 Flash Lite, creates context entries with embeddings, updates relationship summaries |
| Notifier | `notifier.js` | Sends Telegram notifications, manages approval queue for action items |
| Todoist Client | `todoist.js` | Creates Todoist tasks from approved action items |

### Workflow

See `docs/USE-CASES-WORKFLOWS.md` for the step-by-step operational flow ("Meeting -> CRM context -> action items -> Todoist"). This section keeps component and implementation inventory in one place.

### Modes

| Flag | Purpose |
|------|---------|
| `--poll` | Fetch new meetings since last poll (for cron) |
| `--backfill` | Pull historical meetings (default 90 days) |

### Scripts

| Script | Purpose |
|--------|---------|
| `fathom-sync.js` | Main entry point for polling and backfill |
| `fathom-after-meetings.js` | Calendar-aware triggering - runs frequently, checks today's meetings, fires poll after meeting end + buffer. Tracks last handled fire time in meta table to avoid duplicate runs. |
| `fathom-approve.js` | Approve pending action items, push to Todoist |
| `schedule-fathom-poll.js` | Legacy: dynamically schedule polling via launchd (superseded by `fathom-after-meetings.js`) |

---

## Skills

**Location:** `skills/` (22 installed) and `skills-preview/` (2 in development)

### Installed Skills

#### browser-control
- **Purpose:** Chrome browser automation via Puppeteer + CDP (Chrome DevTools Protocol). Connects to a running Chrome instance with a real user profile (cookies/sessions intact), not headless.
- **Commands:**
  - `node scripts/browse.js navigate "<url>" [--wait load|networkidle|domcontentloaded|<ms>]`
  - `node scripts/browse.js screenshot [--full-page] [--output path.png]`
  - `node scripts/browse.js extract [--selector "css"] [--attribute href]`
  - `node scripts/browse.js click --selector "css"`
  - `node scripts/browse.js type --selector "css" --text "..." [--clear] [--enter] [--delay ms]`
  - `node scripts/browse.js tabs`
  - `node scripts/browse.js eval "<js expression>"`
  - `node scripts/browse.js pdf [--output path.pdf]`
  - `node scripts/browse.js wait <ms>`
- **Config:** Chrome must be running with remote debugging (`bash scripts/launch-chrome.sh`). Uses dedicated debug profile at `~/clawd/data/chrome-debug-profile/` (separate from personal Chrome).
- **Dependencies:** `puppeteer-core` v24.2.0
- **Port:** 9222 (configurable)

#### clawdhub
- **Purpose:** Search, install, update, and publish skills from clawdhub.com
- **Commands:** `clawdhub search`, `install`, `update`, `list`, `publish`
- **Config:** Requires `clawdhub` npm package installed globally
- **API:** ClawdHub registry (https://clawdhub.com)

#### crm-query
- **Purpose:** Natural language CRM queries - contacts, relationships, follow-ups, interaction logging
- **Commands:** `cd ~/clawd/crm && node scripts/query.js "<question>"`
- **Database:** `~/clawd/crm/data/contacts.db`
- **API:** OpenClaw API for embeddings/LLM, optional `gog` CLI for email/calendar

#### beehiiv
- **Purpose:** Beehiiv newsletter platform API -- subscriber management, post analytics, segments, automations, custom fields, tiers, referral program, webhooks
- **Commands:** Documentation-only (curl templates)
- **Config:** Requires `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` environment variables
- **API:** Beehiiv REST API v2

#### hubspot
- **Purpose:** HubSpot CRM/CMS API integration - contacts, companies, deals, content management
- **Commands:** Documentation-only (curl/PowerShell templates)
- **Config:** Requires `HUBSPOT_ACCESS_TOKEN` environment variable
- **API:** HubSpot REST API

#### humanizer (v2.1.1)
- **Purpose:** Removes AI writing patterns based on Wikipedia's "Signs of AI writing" guide
- **Detects:** 24 patterns including inflated symbolism, promotional language, em dash overuse, rule of three, AI vocabulary, etc.
- **Commands:** None (invoked via agent skill call)
- **Config:** None required

#### knowledge-base
- **Purpose:** RAG system - ingest articles, videos, tweets, PDFs; query via natural language
- **Commands:**
  - `node scripts/ingest.js "<url>" [--tags X] [--title Y] [--type Z] [--no-browser] [--dry-run]`
  - `node scripts/ingest-and-crosspost.js "<url>" [--tags X] [--no-slack]` - Combines ingestion + Slack #ai_trends cross-post in a single deterministic script. Keeps untrusted page content out of the agent loop. Cleans summaries for Slack (strips metadata, tracking params). Used by Telegram KB topic automation.
  - `node scripts/query.js "<question>" [--limit N] [--threshold X] [--tags Y]`
  - `node scripts/list.js [--tag X] [--type Y] [--recent N]`
  - `node scripts/delete.js <source_id>`
  - `node scripts/stats.js`
  - `node scripts/bulk-ingest.js <file> [--tags X] [--retries N]`
- **Database:** `~/clawd/skills/knowledge-base/data/knowledge.db`
- **API:** OpenClaw (embeddings), FxTwitter (X/Twitter URLs), optional Firecrawl, Apify, Grok
- **Lock file:** `~/clawd/skills/knowledge-base/data/.ingest.lock`
- **Config:** Requires `summarize` CLI (`brew install steipete/tap/summarize`)

#### financials
- **Purpose:** Financial data queries from CSV exports (source-agnostic) - query revenue, expenses, P&L, balance sheet, invoices, bills, AR/AP via natural language
- **Commands:**
  - `node scripts/query.js "<financial question>"` - Natural language query from cache
  - `node scripts/query.js --report ProfitAndLoss|BalanceSheet` - Specific reports
  - `node scripts/query.js --invoices open` / `--bills open` / `--expenses --days 30`
  - `node scripts/query.js --accounts` / `--sync-status`
  - `node scripts/import.js <file.csv> [--delete]` - Import financial CSV exports
  - `node scripts/import.js --dir <path>` - Import all CSVs from a directory
  - `node scripts/generate-reports.js [--year N] [--period ytd|last_year]` - Generate P&L and Balance Sheet from transactions
- **Data flow:** Matt exports CSVs from the accounting system (Transaction List, Account List) and sends via Telegram financials topic (2774). Import script auto-detects type, imports, generates P&L/Balance Sheet, deletes source file.
- **Database:** `~/clawd/skills/financials/data/financials.db`
- **Confidentiality:** Financial data is strictly confidential - only shared with Matt directly (DM or financials topic). Council digests reference financial health directionally, not specific dollar amounts.
- **Cron:** Monthly reminder on the 1st at 10am PST to export fresh financial data
- **Council:** Feeds financial signals (revenue, expenses, net income, cash position, AR/AP, burn rate, overdue invoices) into nightly business meta-analysis; CFO reviewer persona analyzes the data
- **Tests:** `node --test tests/*.test.js` (45 tests covering DB, reports, import, client)

#### model-usage-tracker
- **Purpose:** Track AI model usage, costs, and token consumption across providers (Anthropic, OpenAI, Google, xAI)
- **Commands:**
  - `./log-usage.js <model> <tokens_in> <tokens_out> <task_type> <description>`
  - `./generate-report.js [--days N] [--model X] [--task-type Y]`
- **Storage:** JSONL log at `~/.openclaw/logs/model-usage.jsonl`

#### nano-banana-pro-2
- **Purpose:** Image generation/editing via Google Gemini 3 Pro Image API
- **Commands:**
  - `uv run scripts/generate_image.py --prompt "<desc>" --filename "out.png" [--resolution 1K|2K|4K]`
  - Supports single generation, single edit (with `-i`), multi-image composition (up to 14 images)
- **Config:** Requires `uv` (`brew install uv`), `GEMINI_API_KEY`
- **Output:** `MEDIA:<path>` line for agent runtimes

#### self-improving-agent
- **Purpose:** Log learnings, errors, and corrections for continuous improvement
- **Storage:** Markdown files in `.learnings/` (LEARNINGS.md, ERRORS.md, FEATURE_REQUESTS.md)
- **Hooks:** `activator.sh` (UserPromptSubmit), `error-detector.sh` (PostToolUse)
- **Commands:** `scripts/extract-skill.sh <skill-name> [--dry-run]`

#### summarize
- **Purpose:** Summarize URLs, local files, and YouTube links
- **Commands:** `summarize "<url>" [--model X] [--length Y] [--extract-only] [--json] [--firecrawl auto]`
- **Config:** Requires `summarize` CLI (`brew install steipete/tap/summarize`)
- **API:** Multiple LLM providers (OpenAI, Anthropic, xAI, Google)

#### todoist
- **Purpose:** Task management via Todoist CLI - tasks, projects, labels, comments, natural language due dates
- **Commands:** `todoist [today]`, `todoist tasks`, `todoist add`, `todoist done`, `todoist search`, etc.
- **Config:** Requires `todoist-ts-cli` npm package, `TODOIST_API_TOKEN`

#### video-idea-pipeline
- **Purpose:** Convert video ideas into researched Asana cards with X/Twitter tweets and KB sources
- **Workflow:** Agent searches X → queries KB → creates Asana task in Video Pipeline project
- **Trigger:** User says "potential video idea" in Slack/Telegram
- **Dependencies:** x-research-v2 skill, knowledge-base skill, Asana API

#### x-research-v2
- **Purpose:** X/Twitter research - search, profiles, threads, single tweets, watchlists, caching
- **Commands:**
  - `bun run x-search.ts search "<query>" [--sort X] [--min-likes N] [--pages N] [--limit N] [--save] [--json]`
  - `bun run x-search.ts profile <username>`, `thread <id>`, `tweet <id>`, `watchlist`, `cache clear`
- **Config:** Requires `bun` runtime, `X_BEARER_TOKEN`
- **API:** X/Twitter API v2 (~$0.005/tweet read), 350ms rate limiting
- **Cache:** File-based at `data/cache/` (15-min TTL)

#### x-analytics
- **Purpose:** X/Twitter per-post analytics - collect and query detailed engagement metrics (impressions/views, likes, replies, retweets, bookmarks, shares, follows, unfollows, media views, URL clicks, profile clicks, app installs, email shares)
- **Commands:**
  - `python3 ~/clawd/tools/social-tracker/x_collect.py` - Collect analytics for last 30 days
  - `python3 ~/clawd/tools/social-tracker/x_collect.py --backfill 90` - Backfill last 90 days
  - `python3 ~/clawd/tools/social-tracker/x_query.py summary` - Overall stats
  - `python3 ~/clawd/tools/social-tracker/x_query.py top [--metric X] [-n N]` - Top posts
  - `python3 ~/clawd/tools/social-tracker/x_query.py post POST_ID` - Single post details
  - `python3 ~/clawd/tools/social-tracker/x_query.py trends [--days N]` - Aggregate trends
  - `python3 ~/clawd/tools/social-tracker/x_query.py list [--sort X] [--limit N]` - List all posts
- **Database:** `tools/social-tracker/db/social_growth.db` (tables: `x_posts` with public_metrics view counts, `x_post_stats` hourly snapshots)
- **View tracking:** Dual collection — `public_metrics.impression_count` stored in `x_posts.view_count` (always available), plus `impressions` from analytics endpoint in hourly snapshots (richer metrics, 30-day window). Falls back to public_metrics when analytics unavailable.
- **Auth:** OAuth 1.0a via `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET` in `~/.openclaw/.env`
- **Note:** Audience demographics (age, gender, device, country) are dashboard-only, not available via API

#### x-search
- **Purpose:** Backward-compatible wrapper around x-research-v2
- **Fallback:** Grok x_search if X API unavailable, Cursor agent as default/best-effort
- **Commands:** `./search.sh "<query>"` or `search.py "<query>"`
- **Config:** `XSEARCH_PROVIDER` env var (`cursor`, `xai`, `direct`)

#### excalidraw
- **Purpose:** Generate hand-drawn style diagrams, flowcharts, and architecture diagrams as PNG images from Excalidraw JSON
- **Commands:** `node scripts/render.js <input.excalidraw> <output.png>`
- **Features:** Element types (rectangle, ellipse, diamond, arrow, line, text), arrow binding with auto-edge calculation, inline labels on shapes, multi-segment routing, styling (hachure/cross-hatch/solid fills, roughness control)
- **Templates:** Flowchart with decision branches, layered architecture diagram
- **Config:** None required

#### gemini-video-watch
- **Purpose:** Upload and analyze videos with Gemini 3 Pro - local files, Telegram uploads, YouTube URLs, or direct video URLs
- **Commands:** `node scripts/watch.js "<video_path_or_url>" --prompt "<prompt>" [--model X] [--temperature X] [--delete-file]`
- **Features:** Resumable upload to Gemini Files API, native YouTube URL support (no download), auto-download for direct video URLs, customizable model/temperature/tokens
- **Config:** Requires `GEMINI_API_KEY` (from `~/.openclaw/openclaw.json` or env var)

#### x-trending-scraper
- **Purpose:** Fetch trending/viral tweets with real engagement metrics
- **Commands:** `./scrape-trending.sh [query] [min_views]` or `python3 scrape_trending.py "<query>" <min_views>`
- **Dependencies:** x-research-v2 skill, `bun` runtime

#### youtube-sub-ratio
- **Purpose:** Analyze YouTube videos by subscriber-to-view conversion ratio
- **Commands:** `./analyze.sh [days] [min_views] [top_n]`
- **Note:** Subscriber data lags 24-72+ hours; best for videos 5+ days old
- **Config:** Requires YouTube API OAuth token at `~/clawd/tools/social-tracker/token.json`

### Preview Skills (In Development)

#### content-draft-generator
- **Purpose:** Generate content drafts based on reference content analysis
- **Workflow:** Analyze references → extract patterns → generate context questions → create meta-prompt → two-phase generation (interview + 3 variations)
- **Storage:** File-based in `references/`, `content-breakdown/`, `content-anatomy/`, etc.

#### research
- **Purpose:** Deep research via Gemini CLI in background subagent (uses Google AI subscription instead of Claude tokens)
- **Commands:** Spawns `gemini --yolo` subagent
- **Output:** Saves to `~/clawd/research/<slug>/research.md`
- **Trigger:** User says "Research: [topic]" or asks for deep research

---

## Tools

**Location:** `tools/`

### Video Pitches Database (`tools/video-pitches/`)

SQLite-backed system for tracking video pitch ideas with semantic search. Enforces the video pitch hard gate rule in AGENTS.md (must search before pitching; skip if >40% similarity match).

| Script | Purpose |
|--------|---------|
| `add.js` | Add a pitch - generates Gemini embeddings, auto-IDs (YYYY-MM-DD-NNN), auto-slug |
| `search.js` | Semantic + keyword search (70% cosine similarity, 30% keyword matching) |
| `list.js` | List recent pitches with filters (type, status, date range) |
| `update.js` | Update status: pitched, accepted, rejected, produced, duplicate |
| `migrate.js` | Migrate from JSON (`memory/video-pitches.json`) to SQLite |
| `db.js` | Database module with schema, embedding storage, similarity calculations |

**Database:** `~/clawd/data/video-pitches.db`

### Social Tracker (`tools/social-tracker/`)

YouTube analytics collection, querying, and charting. Instagram per-post analytics. X/Twitter per-post analytics. Also tracks Instagram and TikTok profile growth.

| Script | Purpose |
|--------|---------|
| `collect.py` | Main YouTube analytics collection - OAuth via Google credentials, daily snapshots, incremental updates and backfill. Collects video metadata (title, description, tags, category, duration) and daily analytics (views, watch time, avg view duration/percentage, likes, dislikes, comments, shares, subscribers gained/lost, thumbnail impressions, thumbnail CTR) |
| `query.py` | CLI for querying YouTube analytics: `list`, `video`, `top`, `trends`, `summary`, `live [VIDEO_ID]` (real-time stats from Data API, defaults to latest video) |
| `charts.py` | Generate PNG charts (trend per video, top videos bar chart, daily channel-wide) with dark theme |
| `ig_collect.py` | Instagram per-post analytics collector - Meta Graph API, fetches insights for all posts (views, reach, likes, comments, saves, shares, follows, reel view time) and account-level daily snapshots (followers, following, media count, profile views, website clicks, reach, accounts engaged). Run with `--refresh` to extend token (updates both local and canonical .env). |
| `ig_query.py` | CLI for querying Instagram per-post data: `summary`, `top [--metric views\|reach\|likes\|shares\|saved\|engagement] [-n 10]`, `post MEDIA_ID`, `trends [--days 30]`, `list [--sort date\|views\|likes\|reach] [--type VIDEO]` |
| `x_collect.py` | X/Twitter per-post analytics collector - X API v2 Enterprise analytics endpoint with OAuth 1.0a. Stores public_metrics view counts from tweets endpoint as fallback. Fetches detailed metrics (impressions/views, likes, retweets, bookmarks, shares, follows, unfollows, media views, URL clicks, profile clicks, app installs, email shares). Supports `--backfill N` and `--ids ID1,ID2`. |
| `x_query.py` | CLI for querying X/Twitter per-post data: `summary`, `top [--metric impressions\|likes\|retweets\|bookmarks\|follows] [-n 10]`, `post POST_ID`, `trends [--days 30]`, `list [--sort impressions\|likes] [--limit N]` |
| `social_query.py` | Query Instagram/TikTok profile growth data: `summary`, `growth`, `history` commands |
| `social_scrape.py` | Scrape public Instagram/TikTok profile metrics (followers, posts, likes, bio) |
| `quick_sub_ratio.py` | Quick subscriber-to-view ratio analysis via YouTube Analytics API (no local storage) |
| `top_subscriber_ratio.py` | Top videos by sub-to-view ratio from stored database data |

**Databases:** `db/views.db` (YouTube videos + daily_stats with description/tags/category), `db/social_growth.db` (IG per-post + IG account daily snapshots + X/Twitter per-post with public_metrics + IG/TT profile growth), `db/youtube_data.db`
**Charts:** Generated PNGs saved to `charts/` directory
**Stats:** ~963 YouTube videos, ~190 Instagram posts tracked
**Auth:** YouTube OAuth via `gog` credentials (`token.json`); Instagram via Meta Graph API long-lived token (`~/.openclaw/.env`, refresh every 60 days with `ig_collect.py --refresh`); X/Twitter via OAuth 1.0a user context (`X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET` in `~/.openclaw/.env`)

### Cron Log (`tools/cron-log/`)

Centralized cron job logging system. Every cron job in the workspace logs to this database.

| Script | Purpose |
|--------|---------|
| `log-start.js` | Log cron job start, returns run ID |
| `log-end.js` | Log completion with status (success/failure), duration, summary, optional error message |
| `query.js` | Query cron run history by job name, status, date range, limit |
| `checkpoint.js` | Step-level idempotency for multi-step cron jobs. Tracks checkpoints per job+job-id+step. Statuses: started/done/skipped/failed. Exit code 3 = terminal checkpoint found (caller can skip). Prevents regression of terminal statuses. |
| `should-run.js` | Job-level idempotency helper. Checks if a job+job-id already succeeded. Exit code 0 = should run, 2 = should skip (already succeeded). |
| `check-persistent-failures.js` | Detects jobs with persistent failures (consecutive failures or high failure rate). Alerts via Telegram. Integrated into health check cycle and platform council for deeper root-cause analysis. |
| `cleanup-stale.js` | Cleans up stale "running" status jobs that crashed or were interrupted by machine sleep/shutdown. Can run standalone or be called by log-start.js. |
| `db.js` | SQLite connection and schema management |

**Database:** `~/clawd/data/cron-log.db`

### Standalone Tools

| Tool | Purpose |
|------|---------|
| `business-meta-analysis/` | Advisory-only analysis engine that aggregates business signals across 14 OpenClaw data sources (YouTube, Instagram post performance, Instagram account growth, X/Twitter post analytics, X/Twitter trend signals, CRM, cron reliability, HubSpot pipeline + contacts, Slack, Asana, email, Fathom meetings, financials, Beehiiv newsletter). Uses parallel independent expert architecture: 8 domain-filtered experts (GrowthStrategist, RevenueGuardian, SkepticalOperator, TeamDynamicsArchitect, AutomationScout, CFO, ContentStrategist, MarketAnalyst) analyze their relevant data slices in parallel, then a synthesizer merges their findings into ranked recommendations. Each expert only sees signals from their tagged sources plus a cross-domain brief. Calls model provider APIs directly (auto-detects from openclaw.json: prefers Anthropic, falls back to OpenAI/Google). Stores full analysis snapshots and recommendation history in SQLite, delivers digest reports to Telegram group `-1003725393532` thread `1827`. Learns from feedback. |
| `agent-wrapper.sh` | Wraps cursor-agent CLI to log prompt/response sizes to `/tmp/openclaw/agent-usage.log` |
| `session-activity.js` | Visualize session transcripts - tokens, tool calls, subagent costs, error breakdowns. Saves metrics to `~/clawd/metrics/YYYY-MM-DD.json` |
| `asana-fetch.js` | Fetch tasks from Asana projects (default: Video Pipeline). Shows task details, completion status, due dates, assignees |
| `asana-quick-fetch.py` | Compatibility wrapper that delegates to `asana-fetch.js` |
| `log-parser.py` | Parse JSON log lines from OpenClaw logs - extracts model calls, tokens, subagent spawns, displays formatted table |
| `log-viewer.sh` | View OpenClaw logs with filtering, watch mode, date selection, usage log mode (`-u`), color output |
| `usage-parser.py` | Parse `model-usage.jsonl` for token counts by task type (subagent/conversation/direct), color-coded output |
| `slack-post.js` | Post messages to Slack channels via API. Works from any context (Telegram sessions, subagents, cron jobs). Supports channel names or IDs, threaded replies. Usable as CLI or `require()` module. |
| `slack-react.js` | Add emoji reactions to Slack messages. Supports channel + timestamp targeting and optional `--emoji` override (defaults to eyes). Usable as CLI or `require()` module. |
| `usage-dashboard.js` | Centralized usage dashboard - model tokens/costs, cron reliability, database sizes, X API calls, session activity. Flags: `--days N`, `--all`, `--section <name>`, `--json`. |
| `log-hub.js` | Unified log viewer. Reads `~/clawd/data/logs/all.jsonl` and supports filters (`--event`, `--level`, `--contains`, `--since`, `--limit`, `--json`) for single-pane troubleshooting. |
| `log-ingest.js` | Nightly JSONL -> SQLite ingestor for structured logs. Reads unified stream (`all.jsonl` + rotated `all.jsonl.N`) and writes deduped rows to `~/clawd/data/logs.db`. |
| `gateway-log-ingest.js` | Nightly raw-log -> SQLite ingestor for OpenClaw gateway logs. Reads `~/.openclaw/logs/gateway.log` and `gateway.err.log` (+ rotations) into `~/clawd/data/logs.db` table `gateway_log_lines`. |
| `redact-message.js` | CLI tool for redacting secrets from outbound notification messages. Reads from stdin or args, uses `notification-redaction.js`. Usage: `echo "..." \| node tools/redact-message.js` or `node tools/redact-message.js "message text"` |
| `log-event.js` | CLI tool for logging structured JSONL events to `~/clawd/data/logs/<event_name>.jsonl`, mirrored into unified stream `~/clawd/data/logs/all.jsonl`. Accepts `--event`, `--level`, and `--field key=value` args. Auto-parses field values (JSON, numbers, booleans, strings). |
| `openclaw-slack-status.js` | Diagnostic tool for OpenClaw Slack connection status. Finds gateway PID, lists established TCP connections, probes TLS certificates to identify services (Slack, Telegram, etc.), tails gateway.log for recent `[slack]` lines. Outputs JSON or human-readable format. |

### Patches (`tools/patches/`)

Documentation of patches applied to enhance OpenClaw logging. Notes deprecated patches and current logging methods.

---

## Shared Modules

**Location:** `shared/`

Reusable Node.js utilities used across CRM, skills, and tools.

| Module | Purpose |
|--------|---------|
| `db.js` | SQLite database opener - WAL mode, foreign keys, auto-creates directories. Includes `addColumnIfMissing()` helper |
| `embeddings.js` | Unified `EmbeddingGenerator` class - Google `gemini-embedding-001` (768-dim) or OpenAI `text-embedding-3-small` (1536-dim), LRU cache, batch generation, retry with exponential backoff |
| `config.js` | API credential loader from `~/.openclaw/openclaw.json`. Exports `loadApiCredentials()` and `loadEmbeddingCredentials()` with provider preference |
| `args.js` | CLI argument parser - handles `--key value` and `--key=value` formats, supports defaults |
| `reranker.js` | `Reranker` class - LLM-based reranking using Gemini Flash for two-stage search (retrieve → rerank), scores results 0–1 |
| `review-council.js` | Reusable review-council workflow for multi-agent analysis. Provides the sequential draft-review-consensus pipeline (used by security and platform councils via OpenClaw agent), plus exported utilities (mapWithConcurrency, compactPayload, callWithRetries, parseJsonFromText) reused by the business meta-analysis independent council. Emits per-agent progress events (`review_council_progress`) into the standard JSONL log stream. |
| `cursor-council.js` | Shared Cursor agent CLI infrastructure for council scripts. Provides `runCursorAgent()` (agent analysis pass), `runSummarizer()` (structured JSON output pass), and `parseJsonFromResponse()` (robust JSON extraction from LLM text). Used by security-council-v2.js and platform-council-v2.js. |
| `workspace-state.js` | PID-based lock management for workspace state. Detects stale locks from crashed processes and provides safe lock acquisition/release. Used by auto-git-sync.sh and business meta-analysis. |
| `council-recommendations.js` | Shared recommendation ID management for council systems. Generates unique recommendation IDs and provides deduplication logic. |
| `telegram-delivery.js` | Telegram message delivery helper with formatting and error handling. Wraps message tool for consistent delivery patterns. |
| `env-utils.js` | Environment variable utilities for runtime overrides (CLAWD_LOG_LEVEL, CLAWD_LOG_DIR, etc.). |
| `REVIEW-COUNCIL-LEARNINGS.md` | Review council operational learnings and reliability runbook. Documents isolation handling, model drift patterns, and consensus output requirements. |
| `content-sanitizer.js` | Content sanitization module - detects and blocks prompt injection attempts, sanitizes untrusted content from web pages, tweets, Slack/Telegram messages, Asana/HubSpot records, transcripts, KB excerpts, uploaded files |
| `fs.js` | File system utilities - safe file operations with atomic writes, directory creation helpers |
| `notification-redaction.js` | Notification-specific secret redaction - sanitizes outbound messages before sending to Telegram/Slack/email, wraps `secret-redaction.js` with notification-safe defaults |
| `secret-redaction.js` | Secret detection and redaction - identifies credential-looking strings (API keys, bearer tokens, passwords) and replaces with `[REDACTED]` placeholders |
| `event-log.js` | Structured JSONL event logging - writes events to `~/clawd/data/logs/<event_name>.jsonl` and mirrors every record to unified stream `~/clawd/data/logs/all.jsonl`. Includes timestamps, hostname, log level filtering, auto-redaction of secrets, field type parsing, string truncation. |
| `interaction-store.js` | Centralized SQLite store for all API and LLM interactions - stores full request/response bodies in `~/clawd/data/interactions.db` with `llm_calls` and `api_calls` tables. Fire-and-forget `logLlmCall()` and `logApiCall()` functions. Used alongside JSONL logging for structured query access. |
| `log-rotation.js` | Log rotation for JSONL files and interactions DB - rotates .jsonl files exceeding 50MB (keeps last 3 rotations), archives interactions DB rows older than 90 days into monthly archive DBs. CLI: `node shared/log-rotation.js [--dry-run]` |
| `log-ingest-utils.js` | Shared helper utilities for log ingest tools (positive integer normalization and safe regex escaping) to keep `log-ingest.js` and `gateway-log-ingest.js` behavior aligned. |
| `event_log.py` | Python equivalent of event-log.js - writes per-event JSONL logs and mirrors to `~/clawd/data/logs/all.jsonl` for unified searching. Used by Python tools (social-tracker, nano-banana-pro-2) that can't import Node.js modules. |

---

## Scripts & Automations

**Location:** `scripts/`

| Script | Purpose |
|--------|---------|
| `auto-git-sync.sh` | Auto-commit and push changes to GitHub. Syncs two repos in order: `~/.openclaw/`, `~/clawd/` (which now includes `crm/`). Pulls before pushing, handles merge conflicts, sends Telegram notification on failure. Uses cron-log for tracking. Validates main branch and remote state before push. |
| `backup-databases.sh` | Discovers all `.db`/`.sqlite` files across workspace, backs up to Google Drive ("OpenClaw Backups" folder), creates `manifest.json` for restore, keeps last 7 backups. Also backs up JSONL event logs (including unified stream `all.jsonl`), honors `CLAWD_LOG_DIR` / `CLAWD_UNIFIED_LOG_FILE`, and ensures unified log file exists before staging. |
| `action-items-briefing.js` | Asana-based action-items briefing for daily prep. Reads `data/asana-sync.db` and emits OVERDUE, ACTION ITEMS, and WAITING ON sections. |
| `nightly-log-ingest.sh` | Deterministic nightly ingest of logs into SQLite. Runs both `tools/log-ingest.js --json` (structured JSONL) and `tools/gateway-log-ingest.js --json` (gateway raw logs), records run state in cron-log, and posts completion/failure summary to cron-updates. |
| `council-deeper-dive.js` | Council recommendation detail lookup and optional Telegram send for platform/security council recommendations. Usage: `node scripts/council-deeper-dive.js --council <platform|security> --number <N> [--send]`. |
| `restore-databases.sh` | Restores SQLite databases from Google Drive backup using `manifest.json`. Supports `--list` (preview) and `--force` (skip prompts) modes. |
| `daily-crm-ingestion.sh` | Deterministic daily CRM ingestion (2am PST). Runs `batch-scan.js` with 1-day lookback, concurrency 3, 1500ms delay. Parses structured summary line for contacts_added, new_candidates, context_entries_added, errors. Sends Telegram notifications. Uses cron-log + `should-run` for idempotency. |
| `openclaw-update-check.sh` | Deterministic OpenClaw update check. Runs `openclaw update status` (read-only), posts output to Telegram updates thread. Uses cron-log for idempotency. |
| `sunday-trash-reminder.sh` | Sunday recycling/trash reminder. Calculates recycling type (PAPER/CONTAINER) using a weekly cycle anchored to Jan 31, 2026. Sends reminder DM to Matt. Uses cron-log for idempotency. |
| `weekly-letter-reminder.sh` | Weekly company letter reminder. Sends reminder DM to Matt. Uses cron-log for idempotency. |
| `security-review.sh` | Automated security checks - file permissions (.env, .db files, openclaw.json, system prompts), gateway binds to loopback only, auth enabled, no secrets in git-tracked files, security modules wired in, backup encryption, prompt injection patterns, .gitignore rules intact, error log review for auth failures. Outputs JSON findings array. Exit codes: 0=passed, 1=findings, 2=error. Uses `lib/security-review-checks.sh` for check implementations. |
| `security-council-v2.js` | Security council using Cursor agent CLI for direct codebase analysis + Opus summarizer for structured JSON output. Runs security-review.sh, inspects files/permissions/code directly, analyzes from four security perspectives (offensive, defensive, data privacy, operational realism). Replaces the multi-agent review-council approach. Usage: `node scripts/security-council-v2.js [--dry-run] [--json]` |
| `security-council.js` | Removed. Replaced by security-council-v2.js. |
| `rotate-logs.sh` | Daily log rotation - rotates JSONL files exceeding 50MB and archives interactions DB rows older than 90 days. Calls `shared/log-rotation.js`. Usage: `./scripts/rotate-logs.sh [--dry-run]` |
| `disk-space-check.sh` | Weekly disk space monitoring - checks available space on `/`, warns at 20GB free, sends urgent Telegram alert at 10GB. Reports log and DB sizes. Usage: `./scripts/disk-space-check.sh` |
| `cron-health-check.sh` | Monitors OpenClaw cron jobs for error/timeout states, detects persistent failures, and sends Telegram alerts with dedup. Runs every 30 minutes. Integrates with `tools/cron-log/check-persistent-failures.js` for deeper analysis. |
| `urgent-email-check.sh` | Cron wrapper for urgent email notification check. Called after Email Refresh; the Node script handles time-window gating internally. Reports failures to cron-updates. |
| `manage-actions.js` | Action item management CLI. Commands: `list`, `done`, `archive`, `archive-stale`, `stats`. Supports filtering by status, assignee, and overdue items. Used to clean up stale action items and track completion. |
| `morning-council-status.js` | Morning status check for council systems. Queries LLM interaction logs and validates multi-agent health. Used by morning council cron jobs. |
| `platform-council-v2.js` | Platform health council using Cursor agent CLI for direct codebase analysis + Opus summarizer for structured JSON output. Analyzes 9 areas: cron health, code quality, test coverage, prompt quality, dependencies, storage, skill integrity, config consistency, and CRM data integrity (contact count drops, database corruption, ingestion pipeline health). Usage: `node scripts/platform-council-v2.js [--dry-run] [--json]` |
| `platform-council.js` | Removed. Replaced by platform-council-v2.js. |
| `pre-commit` | Git pre-commit hook. Prevents committing sensitive Chrome profile data and large binary files. Installed in `.git/hooks/pre-commit`. |
| `lib/security-review-checks.sh` | Security check implementations for `security-review.sh`. Individual check functions sourced by main script. |

---

## Cron Jobs

All cron jobs follow a standardized pattern (defined in AGENTS.md):

1. Log start: `cd ~/clawd/tools/cron-log && node log-start.js --job "<name>"` → capture run ID
2. Execute task
3. Log end: `cd ~/clawd/tools/cron-log && node log-end.js --run-id <ID> --status <success|failure> --summary "..."`
4. Send Telegram notification to group `-1003725393532` topic `1126` (cron-updates)

For workflow-level behavior (triggers, flow steps, and failure handling), see `docs/USE-CASES-WORKFLOWS.md`.

### OpenClaw Cron Jobs (`~/.openclaw/cron/jobs.json`)

Jobs are configured in `~/.openclaw/cron/jobs.json` (count changes over time). All use `agentTurn` payloads with cron logging and Telegram reporting.

#### Daily Jobs

| Job | Schedule | Purpose |
|-----|----------|---------|
| Daily Brief (7am) | Weekdays 7am PST | Generate comprehensive daily brief: meetings, action items, content performance |
| Morning Council Status Check | Daily 7:10am PST | Validate council system health after nightly runs |
| Daily CRM Ingestion | Daily 2am PST | Deep CRM contact ingestion from email/calendar |
| Daily Config Review | Daily 3:20am PST | Review workspace .md files for drift, duplication, stale references |
| Nightly Security Review | Daily 3:30am PST | Cursor agent CLI security analysis + Opus summarizer. Runs security-review.sh, analyzes findings, alerts on critical/high issues |
| Daily Platform Health Council | Daily 4am PST | Cursor agent CLI platform health analysis + Opus summarizer. Analyzes cron health, code quality, test coverage, prompt quality, dependencies, storage, skill integrity, config consistency, CRM data integrity |
| Nightly Business Meta Analysis | Daily 4:30am PST | Independent parallel experts (8 personas) analyze 14 data sources, produce ranked recommendations. Sends digest to Telegram meta-analysis topic |
| Social Tracker: YouTube Collect | Daily 1:30am PST | Collect YouTube analytics (views, watch time, engagement) |
| Social Tracker: Instagram Collect | Daily 1am PST | Collect Instagram per-post analytics and account daily snapshots |
| Social Tracker: X Collect | Daily 1:15am PST | Collect X/Twitter per-post analytics with dual view tracking |
| Daily Video Catalog Refresh | Daily 6am PST | Refresh 90-day video catalog |
| Daily Log Rotation | Daily 5:30am PST | Rotate JSONL event logs over 50MB, archive interactions DB rows older than 90 days |
| Nightly Structured Log Ingest | Daily 5:15am PST | Ingest structured JSONL (`data/logs/all.jsonl` + rotations) and gateway raw logs (`~/.openclaw/logs/gateway*.log`) into `data/logs.db` for query-friendly analysis |
| OpenClaw Update Check | Daily 9pm PST | Check for OpenClaw platform updates |
| E2E Tests: Tier 1 (Nightly) | Daily 11pm PST | Skill integration tests (embeddings, reranker, KB, CRM, financials, cron-log, video pitches) - no LLMs, live APIs only |
| PRD Documentation Sync | Daily 1am PST | Scan workspace for changes, verify database counts and version numbers, update PRD.md. Sends change report to Telegram self-improvement topic. |
| Nightly Security Review | Daily 3:30am PST | Cursor agent CLI security analysis + Opus summarizer for structured JSON output. Runs security-review.sh, inspects files/permissions/code, produces findings report, alerts on critical/high issues |

#### Hourly Jobs

| Job | Schedule | Purpose |
|-----|----------|---------|
| Hourly Database Backup | Every hour | Creates encrypted backups via `backup-databases.sh` and uploads to Google Drive "OpenClaw Backups" |

#### Multiple-Times-Hourly Jobs

| Job | Schedule | Purpose |
|-----|----------|---------|
| Cron Health Check | Every 30 min | Monitors cron jobs for error/timeout states, detects persistent failures, alerts to Telegram |

#### Multiple-Times-Daily Jobs

| Job | Schedule | Purpose |
|-----|----------|---------|
| Fathom After-Meetings | Every 5 min, 7am–5pm PST | Calendar-aware Fathom polling - checks if meetings ended, triggers sync after buffer period |
| Email Refresh | Every 30 min, 7am–8pm PST | Lightweight CRM context refresh — fetches new inbound emails from existing contacts, updates context entries and relationship summaries. Also triggers urgent email notification check (time-window gated). |
| Action Item Completion Check | 8am, 12pm, 4pm PST | Checks if pending "waiting on" action items have been fulfilled via email |
| Slack Sync | Every 3 hours | Sync Slack messages to business-meta-analysis DB |
| Asana Sync | Every 4 hours | Sync Asana tasks to business-meta-analysis DB and asana-sync.db |
| HubSpot Sync | Every 4 hours | Sync HubSpot deals and contacts to business-meta-analysis DB |
| Social Scrape: Instagram & TikTok Followers | Daily 1:45am PST | Profile growth tracking via web scraping |

#### Weekly Jobs

| Job | Schedule | Purpose |
|-----|----------|---------|
| Weekly Memory Synthesis | Sunday 3:40am PST | Synthesize daily notes into MEMORY.md |
| Weekly Company Letter Reminder | Sunday 9am PST | Remind about company letter |
| Weekly Earnings Preview | Sunday 9am PST | Preview upcoming tech/AI earnings reports |
| Sunday Trash Reminder | Sunday 10am PST | Recycling/trash collection reminder |
| Weekly Disk Space Check | Sunday 2am PST | Check disk space, alert if below 20GB (warning) or 10GB (urgent) |
| E2E Tests: Tier 2 (Weekly) | Saturday 10pm PST | Agent turns with live LLMs, costs ~$1-2 |
| E2E Tests: Tier 3 (Weekly) | Saturday 10:30pm PST | Full pipeline with Telegram round-trip, costs ~$2-3 |

#### Monthly Jobs

| Job | Schedule | Purpose |
|-----|----------|---------|
| Monthly Financial Data Reminder | 1st of month, 10am PST | DM Matt to export fresh financial data (Transaction List + Account List) for CFO analysis |

#### One-Time / Event Jobs

Earnings report jobs are scheduled as one-time tasks (deleteAfterRun: true) when Matt requests coverage of specific companies. These are created dynamically from the weekly earnings preview and auto-delete after running. Check `~/.openclaw/cron/jobs.json` for currently scheduled jobs.

### Launchd Services

| Plist | Schedule | Purpose |
|-------|----------|---------|
| `ai.openclaw.gateway` | Always-on (RunAtLoad + KeepAlive) | OpenClaw gateway server on port 18789 |

---

## Memory System

**Location:** `memory/`

### Structure

| Path | Purpose |
|------|---------|
| `memory/YYYY-MM-DD.md` | Daily notes - raw capture of conversations, events, tasks. Written first, always. |
| `MEMORY.md` (root) | Synthesized wisdom - distilled patterns, preferences, lessons. Only loaded in direct chats with Matt. |
| `memory/heartbeat-state.json` | Heartbeat check timestamps (email, calendar, weather, errorLog, securityAudit) |
| `memory/tasks/` | Task history - append-only, structured format per `SCHEMA.md` |
| `memory/tasks/SCHEMA.md` | Task history schema definition |
| `memory/health/` | Health tracking - food logs (`food-log.json`, `food-log.md`), README |

### State & Reference Files

| File | Purpose |
|------|---------|
| `ai-tweet-feedback.json` | AI tweet feedback patterns (what performs well) |
| `ai-tweets-search-strategy.json` | Search strategy for AI tweet curation |
| `ai-tweets-shared.json` | History of shared AI tweets (dedup) |
| `video-pitches.json` | Video pitch catalog (backup; primary is SQLite DB) |
| `youtube-competitor-tracking.json` | YouTube competitor tracking data |
| `matthewberman-twitter-profile.md` | Twitter/X profile reference |
| `family.md` | Family reference info |
| `video-catalog-90d.md` | Rolling 90-day video catalog (refreshed daily by cron) |
| `kb_log.md` | Knowledge base ingestion log |
| `security-audit-2026-02-10.md` | Security audit findings summary |
| `security-audit-full-2026-02-10.md` | Full security audit report |
| `security-review-log.md` | Security review log history |

### How It Works

- **Write first:** Daily notes (`YYYY-MM-DD.md`) capture everything in the moment
- **Synthesize weekly:** Cron job (Sunday 3:40am PST) distills daily notes into `MEMORY.md`
- **Heartbeat tracking:** Checks stored in `heartbeat-state.json` with timestamps for each check type
- **Task history:** Append-only format, one section per task, never edited after writing

---

## Integrations

### Telegram

- **Group ID:** `-1003725393532`
- **Primary interface** for CRM queries, notifications, approvals, and cron updates

| Topic | ID | Purpose |
|-------|-----|---------|
| AI Tweets | 225 | Curating and drafting AI tweets |
| Video Ideas | 366 | Video pitch discussion and feedback tracking |
| Self-Improvement | 403 | OpenClaw self-improvement, council digests, debugging |
| Earnings | 694 | Financial tracking (revenue, sponsorships, YouTube earnings) |
| Personal CRM | 709 | Contact management, relationship tracking, follow-up nudges |
| Updates | 1051 | General status updates and announcements |
| Cron Updates | 1126 | Automated cron job success/failure notifications |
| Knowledge Base | 1173 | KB ingestion and querying notifications |
| Health | 1207 | Food logging, symptoms, health tracking reminders |
| Meta-Analysis | 1827 | Business meta-analysis digest reports |
| Meeting Prep | 1964 | Daily meeting briefings (cron-owned) |
| Email | 2229 | Email-related queries and draft proposals |
| Financials | 2774 | Financial CSV imports and data queries (confidential - Matt only) |

**Media handling:** Download to `/tmp/openclaw-media/`, include `MEDIA:<path>` in reply, delete temp after send.

### Slack

| Channel | ID | Purpose |
|---------|-----|---------|
| ai_trends | C09BJG12CNT | AI trend tracking |
| video_edits | C070JQGDX7E | Video edit coordination |
| general | C05PBHL1E2V | General team communication |
| live_show | C098BRV2D4K | Live show coordination |

**Auth:** Bot token + user token (for sending as Matt)
**Attribution:** Bot messages no prefix; user token messages prefix with `🦞 OpenClaw:`
**Workflows:**
- Task assignment: Brief acknowledgment ("On it", "Got it"), then work silently and reply with one complete message - no intermediate thinking or status updates
- KB saves: Tagged mention + "save" in reply to URL → ingest via KB skill
- Video idea triggers: Tagged mention + "potential video idea" → video-idea-pipeline

### Google Workspace (via `gog` CLI)

- **CLI Location:** `/opt/homebrew/bin/gog`
- **Services:** Gmail, Calendar, Drive, Docs, Sheets, Slides, Contacts, Tasks, People, Chat, Classroom
- **Auth:** OAuth tokens in `~/Library/Application Support/gogcli/`
- **Usage:** CRM email/calendar scanning, database backups to Drive, file operations
- **Install:** `brew install drizzle-team/tap/gog` then `gog auth login`

### Asana

- **Workspace:** forwardfuture.ai (`1206497863248146`)
- **Projects:**
  - The Ad Bank / Sponsorship Queue (`1212346778656423`)
  - Video Pipeline (`1212455754265217`)
  - FF Team Meeting (`1209311439712808`)
  - 1:1 with teammate (`1208324818579051`)
- **Workflow:** "Put Link in Asana" - fetch content, extract info, create task (default: Video Pipeline)
- **Update rule:** Add new info as comments, don't edit description

### Todoist

- **Integration:** Via `todoist-ts-cli` npm package
- **Usage:** Quick task capture, Fathom action items after approval
- **Install:** `npm install -g todoist-ts-cli` then `todoist auth <token>`

### Financial Data

- **Skill:** `skills/financials/`
- **Company:** Forward Future Inc
- **Features:** P&L, Balance Sheet, transaction queries, expense analysis, revenue breakdowns, customer/vendor analysis - all via natural language
- **Data flow:** Monthly CSV exports from the accounting system (Transaction List by Date + Account List) sent via Telegram financials topic, then auto-imported, P&L/Balance Sheet generated, and council analysis runs
- **Council integration:** CFO reviewer persona analyzes financial signals (revenue trends, burn rate, cash position, AR/AP, overdue invoices) alongside CRM, YouTube, and HubSpot pipeline data
- **Confidentiality:** Financial data restricted to Matt only (DM or financials topic 2774). Council digests use directional language, not specific numbers.
- **Cron:** Monthly reminder on the 1st at 10am PST
- **Database:** `skills/financials/data/financials.db`

### HubSpot

- **Skill:** `skills/hubspot/`
- **Features:** Contact, company, deal, and content management via REST API
- **Sync:** `tools/business-meta-analysis/sync/hubspot-sync.cjs` — paginated sync of deals (with owner, type, description) and contacts (email, name, company, jobtitle, phone, lifecycle stage) to `~/clawd/data/hubspot-sync.db`
- **Config:** `HUBSPOT_ACCESS_TOKEN` in `.env`

### Beehiiv

- **Skill:** `skills/beehiiv/`
- **Features:** Newsletter platform API -- subscriber management, post analytics, segments, automations, referral program, webhooks, custom fields, tiers
- **Sync:** `tools/business-meta-analysis/sync/beehiiv-sync.cjs` — syncs publication stats (subscriber counts, open/click rates, churn) and post-level data (subject lines, publish dates, open/click rates, recipients, unsubscribes) to `~/clawd/data/beehiiv-sync.db`
- **Config:** `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` in `.env`

### Fathom

- **Integration:** API client + polling + Telegram approval flow
- **Purpose:** Meeting recording → transcript extraction → CRM contact matching → insight extraction → action item verification → Todoist task creation
- **Config:** `FATHOM_API_KEY` in CRM `.env`

### X/Twitter

- **Skills:** `x-research-v2` (primary), `x-search` (legacy wrapper), `x-trending-scraper`, `x-analytics` (per-post analytics)
- **Auth:** Pay-per-use X API via `X_BEARER_TOKEN` (app-only, for search/research); OAuth 1.0a via `X_API_KEY`/`X_API_SECRET`/`X_ACCESS_TOKEN`/`X_ACCESS_TOKEN_SECRET` (user context, for analytics)
- **Features:** Search, profile lookup, thread analysis, watchlists, trending topics, engagement metrics, per-post analytics (impressions, likes, retweets, bookmarks, shares, follows, media views, URL clicks, profile clicks)
- **Analytics:** `x_collect.py` / `x_query.py` in `tools/social-tracker/` - stores hourly snapshots with view counts in `social_growth.db`. Dual view tracking via public_metrics and analytics endpoint.
- **Default:** Cursor agent best-effort mode (don't use live xAI unless needed)

---

## Databases

All databases are SQLite with WAL mode enabled.

Operational logging model is hybrid: structured event logs are canonical in JSONL (`~/clawd/data/logs/all.jsonl` plus per-event files), while SQLite is used for query-heavy datasets (`cron-log.db`, `interactions.db`, and domain databases).

| Database | Location | Purpose |
|----------|----------|---------|
| CRM | `~/clawd/crm/data/contacts.db` | Contacts, interactions, follow-ups, context (with vectors), meetings, action items, relationship profiles, Box files/chunks/collaborators/links, email draft requests, merge suggestions, meta state |
| Video Pitches | `~/clawd/data/video-pitches.db` | Video pitch ideas with embeddings for semantic search |
| Business Meta-Analysis | `~/clawd/data/business-meta-analysis.db` | Source catalog, signal runs, analysis artifacts, recommendations, feedback, deeper-dive requests, weight policies |
| YouTube Analytics | `tools/social-tracker/db/views.db` | YouTube video analytics (views, watch time, avg view duration/percentage, likes, dislikes, comments, shares, subs gained/lost, thumbnail impressions/CTR) + video metadata (description, tags, category) - ~963 videos tracked |
| YouTube Data | `tools/social-tracker/db/youtube_data.db` | YouTube video metadata |
| Social Growth | `tools/social-tracker/db/social_growth.db` | Instagram/TikTok follower metrics + Instagram per-post analytics (ig_media, ig_media_stats with follows/reel view time) + Instagram account daily snapshots (ig_account_stats) + X/Twitter per-post analytics (x_posts with public_metrics view counts, x_post_stats hourly snapshots with 21 metrics) |
| Cron Log | `~/clawd/data/cron-log.db` | Cron job run history (start/end times, status, summaries) |
| HubSpot Sync | `~/clawd/data/hubspot-sync.db` | Cached HubSpot deals (with owner, type, description) and contacts (email, name, company, jobtitle, phone, lifecycle stage) with paginated sync |
| Beehiiv Sync | `~/clawd/data/beehiiv-sync.db` | Cached Beehiiv publication stats (daily subscriber snapshots) and post performance (open/click rates, recipients, unsubscribes) |
| Asana Sync | `~/clawd/data/asana-sync.db` | Cached Asana tasks (with assignee, notes, tags, section) used by business meta-analysis sync jobs and `scripts/action-items-briefing.js` |
| Knowledge Base | `skills/knowledge-base/data/knowledge.db` | RAG content with embeddings (~15 sources) |
| Financials | `skills/financials/data/financials.db` | Financial data: transactions, accounts, generated P&L and Balance Sheet reports. Tables: reports, accounts, transactions, invoices, bills, sync_log |
| Interactions | `~/clawd/data/interactions.db` | Centralized store of all API calls and LLM interactions with full request/response bodies. Tables: `llm_calls`, `api_calls`. Archived monthly by `log-rotation.js`. |
| Structured Logs | `~/clawd/data/logs.db` | Query-friendly mirror of both unified structured JSONL logs (`structured_logs` table) and OpenClaw gateway raw logs (`gateway_log_lines` table). Populated nightly by `tools/log-ingest.js` and `tools/gateway-log-ingest.js`. |
| Model Usage | `~/.openclaw/logs/model-usage.jsonl` | API usage and cost tracking (JSONL, not SQLite) |
| X Research Cache | `skills/x-research-v2/data/cache/` | File-based search result cache (15-min TTL) |
| CRM Learning | `~/clawd/crm/data/learning.json` | Learned contact filtering patterns |
| Video Pitches Count | `~/clawd/data/video-pitches.db` | ~30 pitches tracked |
| Cron Log Runs | `~/clawd/data/cron-log.db` | ~325 runs logged |

**Backup:** Hourly via `backup-databases.sh` -> Google Drive ("OpenClaw Backups" folder), keeps last 7 backups with `manifest.json`. Backs up all workspace DB files (including `~/clawd/data/logs.db`) plus JSONL event logs from `~/clawd/data/logs/`, including unified stream `all.jsonl`.

**Log rotation:** Daily via `scripts/rotate-logs.sh` - rotates JSONL files over 50MB, archives interactions DB rows older than 90 days.

**Disk monitoring:** Weekly via `scripts/disk-space-check.sh` - alerts to Telegram if disk space drops below 20GB (warning) or 10GB (urgent).

---

## Environment Variables

### Canonical `.env` (`~/.openclaw/.env`)

| Variable | Purpose |
|----------|---------|
| `ASANA_PAT` | Asana Personal Access Token |
| `HUBSPOT_ACCESS_TOKEN` | HubSpot Private App token |
| `BRAVE_API_KEY` | Brave Search API key |
| `XAI_API_KEY` | xAI/Grok API key |
| `X_BEARER_TOKEN` | X/Twitter API bearer token (app-only, for x-research-v2) |
| `X_API_KEY` | X OAuth 1.0a Consumer Key (for analytics endpoint) |
| `X_API_SECRET` | X OAuth 1.0a Consumer Key Secret |
| `X_ACCESS_TOKEN` | X OAuth 1.0a User Access Token |
| `X_ACCESS_TOKEN_SECRET` | X OAuth 1.0a User Access Token Secret |
| `GEMINI_API_KEY` | Google Gemini API key |
| `SLACK_APP_TOKEN` | Slack app-level token |
| `SLACK_BOT_TOKEN` | Slack bot token |
| `SLACK_USER_TOKEN` | Slack user token (send as Matt) |
| `TODOIST_API_TOKEN` | Todoist API token |
| `OPENCLAW_GATEWAY_TOKEN` | Gateway auth token |
| `FIRECRAWL_API_KEY` | Firecrawl web scraping (optional) |
| `APIFY_API_TOKEN` | Apify scraping (optional) |
| `BEEHIIV_API_KEY` | Beehiiv API key |
| `BEEHIIV_PUBLICATION_ID` | Beehiiv publication ID |

### CRM Environment (from canonical `.env`)

| Variable | Purpose |
|----------|---------|
| `DATABASE_PATH` | SQLite database path |
| `EMAIL_ACCOUNTS` | Email accounts to scan |
| `EXCLUDED_EMAILS` | Emails to exclude from scanning |
| `GOG_CLI_PATH` | Path to `gog` CLI |
| `FATHOM_API_KEY` | Fathom meeting API key |
| `TELEGRAM_*` | Telegram notification settings |
| `BOX_ENABLED` | Enable/disable Box integration |
| `BOX_ACCESS_TOKEN` | Box API bearer token |
| `BOX_ROOT_FOLDER_ID` | Root folder ID to sync from Box |
| `GMAIL_DRAFT_WRITES_ENABLED` | Safety gate for Gmail draft creation (must be `true` to create drafts) |
| Various scan/tuning params | Gmail/Calendar scanning configuration |

Compatibility paths: `~/clawd/.env`, `~/clawd/crm/.env`, and `~/clawd/tools/social-tracker/.env` are symlinks to `~/.openclaw/.env` for legacy script compatibility.

### Optional Logging Runtime Overrides

| Variable | Purpose |
|----------|---------|
| `CLAWD_LOG_LEVEL` | Minimum structured event level (`debug`, `info`, `warn`, `error`) |
| `CLAWD_LOG_DIR` | Base directory for structured event logs (default `~/clawd/data/logs`) |
| `CLAWD_UNIFIED_LOG_FILE` | Unified JSONL stream filename inside `CLAWD_LOG_DIR` (default `all.jsonl`) |
| `CLAWD_STRUCTURED_LOG_DB` | SQLite destination for structured log ingest (default `~/clawd/data/logs.db`) |
| `CLAWD_GATEWAY_LOG_DIR` | Source directory for gateway raw logs (default `~/.openclaw/logs`) |
| `COUNCIL_PROGRESS_EVENT_LOGS` | Enable/disable structured council progress events (`review_council_progress`) in unified logs (default enabled) |

### Platform Config (`~/.openclaw/openclaw.json`)

Contains API keys for Anthropic, Google, xAI, Brave Search, Telegram bot token, Slack tokens, gateway auth token, and skill-specific keys. Template at `openclaw.json.example`.

---

## Test Infrastructure

**Location:** `tests/`

### Test Categories

| Category | What's Tested |
|----------|---------------|
| CRM Unit Tests | Config, context system (email-body, email-fetcher, embeddings, extractor, search, storage, summary-storage, relationship-summarizer, response-generator), intelligence modules (contact-classifier), ingestion (batch-approver, ingest-utils), Telegram integration (formatters, menu, email-drafts), DB (meeting-action-items), Gmail (email-draft-coordinator), Box (relevance), Fathom (api-client, api-keys, after-meetings-logic, notifier, processor, todoist), security fixes |
| CRM Integration Tests | Anti-injection security, context pipeline, Telegram workflow, end-to-end workflows |
| Shared Module Tests | args, config, db, embeddings, event-log, fs, notification-redaction, reranker, security-council, security-fixes |
| Skill Tests | clawdhub, humanizer, nano-banana-pro-2, x-search, x-trending-scraper, youtube-sub-ratio, todoist, hubspot, summarize, crm-query, content-draft-generator, self-improving-agent, gemini-video-watch |
| Tool Tests | agent-wrapper, asana-fetch, log-parser, log-viewer, usage-parser, social-tracker, slack-post, cron-log, business-meta-analysis (deeper-dive, meta-analysis, multi-agent-helpers, persistence, review-council, x-signals), video-pitches (db) |
| Script Tests | auto-git-sync, backup-databases, restore-databases, action-items-briefing, nightly-business-meta-analysis, log-hub, log-ingest, gateway-log-ingest, nightly-log-ingest, council-deeper-dive, security-review, security-council, openclaw-update-check |

### Test Infrastructure

| File | Purpose |
|------|---------|
| `run-all-tests.sh` | Master test runner |
| `run-tests.sh` | Individual test execution |
| `verify-setup.sh` | Setup verification |
| `delegation-rules.json` | Test delegation rules |
| `test-scenarios.md` | Test scenario documentation |
| `TEST-COVERAGE.md` | Test coverage inventory and status |
| `.github/workflows/tests.yml` | GitHub Actions CI workflow |

---

## Configuration Files

Root-level `.md` files that define workspace behavior:

| File | Purpose |
|------|---------|
| `AGENTS.md` | Rules of engagement - safety, security, task execution, model strategy, message consolidation, group chat protocol, cron standards, heartbeat, error reporting, video pitch hard gate |
| `SOUL.md` | Personality - direct communication, real opinions, brevity mandatory, humor welcome, not a sycophant |
| `IDENTITY.md` | Identity - name: Clawd, creature: AI with lobster energy, emoji: 🦞 |
| `USER.md` | User info - Matt, PST timezone, early bird (~7am), three email accounts (personal, YouTube, work) |
| `TOOLS.md` | Environment config - all channel/topic IDs, API token locations, topic behavior guides, Asana project IDs, external tool paths |
| `MEMORY.md` | Synthesized preferences - Matt's preferences, project history, workflow patterns, operational lessons, strategic notes, email triage patterns, infrastructure notes |
| `HEARTBEAT.md` | Periodic checklist - monthly security audit, weekly gateway check, daily error log skim and git backup |
| `SUBAGENT-POLICY.md` | Subagent policy - when to use (searches, API calls, multi-step), when to work directly (simple replies), failure handling (report + retry once) |
| `RESTORE.md` | New machine setup - prerequisites, clone steps, secret config, dependency install, database restore from Google Drive, channel pairing, verification |
| `PRD.md` | This file - full feature inventory |

---

## Other Directories

### `youtube-analysis/`

YouTube competitor analysis and content strategy data.

| File | Purpose |
|------|---------|
| `fetch-competitors.py` | Fetches competitor YouTube data using `yt-dlp` |
| `video-data.json` | Competitor video metadata |
| `transcripts.json` | Competitor video transcripts |
| `complete_transcripts.md` | Full transcript analysis |
| `transcript-analysis-summary.md` | Transcript analysis summary |
| `SUCCESS-BLUEPRINT-GEMINI.md` | Content success blueprint (Gemini analysis) |
| `SUCCESS-BLUEPRINT-OPUS.md` | Content success blueprint (Opus analysis) |
| `VIDEO-IDEAS.md` | Generated video ideas |
| `VIDEO-IDEAS-TRENDING.md` | Trending video ideas |
| `transcript-fetch-summary.md` | Summary report of the transcript fetching process |

### `data/`

Workspace-wide databases and runtime data:
- `cron-log.db` - Cron job run history
- `video-pitches.db` - Video pitch ideas with embeddings
- `business-meta-analysis.db` - Business intelligence analysis snapshots and recommendations
- `logs.db` - SQLite mirror of structured logs and gateway raw logs (ingested nightly from `data/logs/all.jsonl` + `~/.openclaw/logs/gateway*.log`)
- `chrome-debug-profile/` - Dedicated Chrome user profile for the `browser-control` skill. Separate from personal Chrome to isolate cookies/sessions. Launched via `skills/browser-control/scripts/launch-chrome.sh`.
- `logs/` - Structured JSONL event logs (slack_post, kb_ingest_end, security_review, etc.) plus unified stream `all.jsonl` for single-pane log review (included in hourly Drive backups)

### `life/`

Empty directory, reserved for future use.

### `docs/`

| File | Purpose |
|------|---------|
| `WORKSPACE-FILES.md` | Guide to workspace file organization, prompt injection rules |
| `USE-CASES-WORKFLOWS.md` | Operational guide for major use cases, custom functionality, and workflow playbooks |
| `OPUS-PROMPTING-GUIDE.md` | Opus 4.6 prompting best practices - consult before writing/editing prompts |
| `SECURITY-BEST-PRACTICES.md` | Security guide covering gateway hardening, channel access control, credential management, prompt injection defense, automated monitoring, data protection, tool sandboxing, and operational hygiene |
| `SLACK-SETUP.md` | Slack integration setup with security model |
| `slack-config-snippet.json` | Slack config example |

### `reference/`

| File | Purpose |
|------|---------|
| `recycling.md` | Mill Valley recycling schedule (alternating weeks) |
| `youtube-competitors.md` | Competitor monitoring reference (Theo, Wes Roth, AI Search) |
| `moltbot/` | Clone of the OpenClaw platform source repo - used as a reference for understanding platform internals (gateway, channels, agent system, cron, memory, CLI) |

### `.learnings/`

Captured corrections and learnings for the self-improving agent. Currently contains one entry: `asana_link_workflow` (how to handle "put link in Asana" requests).

### `state/`

Mutable runtime state files. Contains `README.md` with guidelines for state file usage.

### `.clawdhub/`

Skill registry lock file (`lock.json`) tracking installed skill versions and installation timestamps.

---

*Last updated: 2026-02-17 (OpenClaw 2026.2.15; added E2E test suite with 3 tiers and cron scheduling, cron health monitoring, persistent failure detection, action item management CLI, workspace state locking, structured event logging instrumented across 90+ files, daily log rotation cron job, morning council status check, council recommendations module, telegram delivery helper, env utilities module)*