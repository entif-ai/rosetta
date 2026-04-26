# Docs Intelligence Extraction

**Source:** `docs/external/Berman - AI Assistant.txt`
**Extracted by:** heartbeat (inline, 2026-04-26T02:59 UTC)
**Date:** 2026-04-26
**Confidence:** HIGH
**Issue prefix:** AIA-XXX

---

## Document Summary

A structured inventory of 26 OpenClaw AI Assistant system prompts, authored by Berman, covering personal productivity, automation, health, security, and platform integrations. The document is a how-to-build guide for recreating each component of a personal AI assistant ecosystem. It reads as a coherent systems design document: each prompt is a self-contained feature spec.

---

## Key Findings

### F001 — Berman AI Assistant Inventory (26 Systems)

The document enumerates 26 distinct OpenClaw system prompts grouped into functional domains:

**Personal Productivity (1–5):**
- Personal CRM with Gmail/Calendar scanning, vector embeddings, relationship health scoring, duplicate detection
- Meeting Action Items via Fathom transcript polling, CRM contact linking, Todoist task creation with approval queue
- Urgent Email Detection with AI classification, feedback learning loop, time-gated alerting
- Knowledge Base (RAG) with multi-format ingestion: web articles, YouTube transcripts, X/Twitter threads, PDFs; semantic search with time-aware/source-weighted ranking
- Business Advisory Council: 8 parallel specialist AI personas analyzing YouTube/Instagram/X/CRM/email/meeting/cron/Slack/Asana/HubSpot/newsletter data

**Security & Automation (6, 13–15, 26):**
- Security Council: nightly automated code review from offensive/defensive/privacy/operational perspectives
- Security and Safety: prompt injection defense (summarize vs. parrot, ignore System:/Ignore instructions), data protection (auto-redact API keys, lock financial data to DMs), approval gates for public actions
- Database Backups: hourly encrypted tar to Google Drive, 7-backup retention, restore script
- Git Auto-Sync: hourly auto-commit with merge conflict detection and pre-commit hook for sensitive data
- Health Monitoring: daily/weekly/monthly automated health checks (cron, code quality, test coverage, dependencies, storage, skills, config, data integrity)

**Social & Content (7–8, 17–20):**
- Social Media Tracking: per-platform analytics (YouTube, Instagram, X, TikTok) with daily snapshots
- Video Idea Pipeline: Slack-triggered, X/Twitter research, knowledge base query, Asana card creation, similarity dedup at 40% threshold
- AI Writing Humanizer: strips AI patterns using Wikipedia's "Signs of AI writing" taxonomy, regression tests
- Image Generation (Nano Banana): Gemini image API, up to 4K, batch up to 14
- Video Generation (Veo 3): short clips from text/image prompts
- Video Analysis (Gemini Video Watch): upload video for AI analysis, supports local files/Telegram/YouTube/URLs

**Platform Integrations (9, 12, 21, 23–25):**
- Earnings Reports: Sunday preview, one-time cron per ticker, narrative summary post-release, auto-delete after delivery
- Messaging Setup: Telegram 13+ topics, Slack mention-only mode with auto-reaction, 2-message-max per task
- Google Workspace: Gmail/Calendar/Drive/Docs/Sheets/Slides OAuth integration
- Newsletter/CRM: Beehiiv (subscriber count, growth, churn, open/click rates) + HubSpot (deals, contacts, pipeline) → local SQLite cache → Business Advisory Council
- Model Usage/Cost Tracking: every API call logged, daily/weekly/monthly cost reports by model and task type
- Asana Integration: task/project sync, structured cards from video pipeline, task status fed to Business Advisory Council

**Health & Lifestyle (10–11):**
- Food Journal / Health Tracking: Telegram journal (food/drink/symptom/note), 3x daily reminders, weekly correlation analysis, dedicated Telegram topic
- Daily Briefing (7am): calendar with CRM context on attendees, yesterday's content performance, pending action items, overdue items, cross-referenced email threads

**Prompt Engineering & Infrastructure (16):**
- Prompt Engineering Guide for Claude Opus 4.6: ALL-CAPS causes overtriggering, explain WHY not just WHAT, show only desired behavior (no anti-patterns), remove "if in doubt" instructions

---

## Issue Candidates

### AIA-001 — OpenClaw 26-Module Systems Inventory

**Severity:** informational
**Confidence:** HIGH

**Finding:** The Berman doc describes 26 distinct automation systems across personal productivity, security, health, social, content, and platform domains. No other single document in the corpus captures this breadth. It is the most comprehensive systems inventory in the docs/ folder.

**Issue:** Document the relationship between these 26 modules and the existing OpenClaw codebase. Which modules are implemented? Which are aspirational? Which overlap with existing skills (healthcheck, taskflow, etc.)?

**Labels:** documentation, systems-design, gap-analysis

---

### AIA-002 — Prompt Engineering Rules Disagreement

**Severity:** medium
**Confidence:** HIGH

**Finding:** Berman's prompt engineering rules (ALL-CAPS triggers overtriggering, explain WHY not WHAT, show only desired behavior, remove "if in doubt" instructions) partially contradict or refine guidance elsewhere in the corpus.

**Issue:** Assess whether OpenClaw's existing skill guidance, SOUL.md tone instructions, or other docs contain ALL-CAPS emphasis or "if in doubt" patterns that need updating based on Berman's findings.

**Labels:** prompt-engineering, best-practices, consistency

---

### AIA-003 — Health Monitoring Duplication Risk

**Severity:** low
**Confidence:** MEDIUM

**Finding:** Berman's Health Monitoring (daily/weekly/monthly checks) overlaps with HEARTBEAT.md's own healthcheck instructions and the existing healthcheck skill. Both do cron reliability checks, gateway security verification, and memory file scanning.

**Issue:** Determine if Berman's Health Monitoring spec is implemented elsewhere (healthcheck skill, HEARTBEAT.md) or if it represents a second, parallel monitoring layer that should be unified or documented as distinct.

**Labels:** healthcheck, monitoring, overlap

---

### AIA-004 — Video Pipeline Dedup Threshold

**Severity:** low
**Confidence:** MEDIUM

**Finding:** Berman's Video Idea Pipeline uses a 40% semantic similarity threshold to auto-reject duplicate pitches. No justification for the 40% figure is provided. This is an operational parameter that could significantly impact content pipeline output quality.

**Issue:** Evaluate the 40% threshold. Is it calibrated against existing pitch data? Should it be higher or lower? Does the threshold need to be tunable?

**Labels:** content-pipeline, deduplication, calibration

---

### AIA-005 — Gmail OAuth Scraper vs. API Limitations

**Severity:** medium
**Confidence:** MEDIUM

**Finding:** Berman's Personal CRM and Gmail integration spec assumes OAuth-based email scanning with full access to Gmail/Google Calendar. This requires either Google Workspace account or a less-secure IMAP setup. No mention of API cost or rate limits.

**Issue:** The Gmail API has strict quotas (1B quota units/day for free, 2B for paid Workspace). At scale, a personal CRM scraping all emails for contact discovery would need cost tracking. Assess feasibility for Entif AI's own email pipeline use case.

**Labels:** gmail, oauth, rate-limits, scalability

---

### AIA-006 — Beehiiv Open Rates vs. Industry Benchmarks

**Severity:** low
**Confidence:** LOW

**Finding:** Berman tracks per-post open rates and click rates for Beehiiv newsletters but doesn't compare against industry benchmarks. "Good" open rates vary wildly by industry (20–40% average for tech newsletters).

**Issue:** If Entif AI launches a newsletter, add benchmark comparison to the Beehiiv tracking spec so the advisory council can contextualize performance.

**Labels:** analytics, beehiiv, benchmarking

---

### AIA-007 — Multi-Format RAG Ingestion Complexity

**Severity:** medium
**Confidence:** HIGH

**Finding:** Berman's Knowledge Base RAG system handles YouTube transcripts, Twitter/X threads, web articles, and PDFs — four distinct ingestion pipelines with different extraction methods. Twitter/X thread ingestion (following full threads, not just first tweet) is particularly fragile.

**Issue:** Assess the maintenance burden of multi-format RAG ingestion. Each format is a separate failure point. The Twitter/X API changes frequently. Is there a canonical supported format list, or is this aspirational?

**Labels:** rag, ingestion, complexity, twitter-api

---

### AIA-008 — AI Writing Humanizer Regression Test Suit

**Severity:** medium
**Confidence:** MEDIUM

**Finding:** Berman's AI Writing Humanizer uses Wikipedia's "Signs of AI writing" as its detection taxonomy and includes regression tests. This is a concrete, testable approach. However, Wikipedia's AI writing signals page is editorial, not scientific.

**Issue:** Evaluate whether Wikipedia's AI writing taxonomy is sufficient as a regression test baseline, or if a proprietary signal set calibrated against Entif AI's own output style would be more effective.

**Labels:** content-generation, regression-tests, ai-detection

---

### AIA-009 — Database Auto-Discovery Blind Spots

**Severity:** low
**Confidence:** MEDIUM

**Finding:** Berman's Database Backups spec auto-discovers SQLite databases via file pattern matching. This won't catch SQLite databases accessed via custom VFS, in-memory databases, or databases opened through foreign keys in other DBs.

**Issue:** Document the auto-discovery limitations. For critical systems like the DI ledger or knowledge graph, explicit backup configuration should be required rather than auto-discovered.

**Labels:** backups, sqlite, reliability

---

### AIA-010 — Two-Message-Max Communication Style

**Severity:** informational
**Confidence:** HIGH

**Finding:** Berman mandates "two messages max per task (acknowledgment, then result)" for Slack responses. OpenClaw's own HEARTBEAT.md uses a similar compactness rule ("compact context — end turn with only the confirmation"). Berman's rule validates OpenClaw's approach.

**Issue:** Assess whether the existing OpenClaw heartbeat/communication patterns are consistent with this principle, or if there are cases where multi-message play-by-play narration occurs.

**Labels:** communication-style, best-practices, consistency

---

## Source Document Notes

- **Format:** Systems inventory / prompt catalog (not a chat transcript)
- **Author:** Berman (external contributor)
- **Lines:** 83
- **Related docs:** Berman-PRD.md (already processed, `docs/intake/docs-intelligence/2026-04-25-berman-prd.md`)
- **Overlap with Berman-PRD:** None — Berman-PRD is a requirements doc; this doc is a system-prompt inventory
- **Recommended action:** Archive as informational; no new issue-drafts required beyond AIA-001–010 above
