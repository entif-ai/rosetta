# AIA-007: Approval Gate Proliferation Causes User Fatigue

**Type:** usability / notification-overload
**Confidence:** HIGH
**Severity:** medium
**Source:** `docs/external/Berman - AI Assistant.txt`, Cross-cutting finding

## Problem

Berman's system has **five or more distinct approval flows** across independent channels:

1. **Email drafts** — must approve before sending
2. **Public content (tweets)** — must approve before posting
3. **Video pitches** — must pass dedup check first, then approve
4. **File deletion** — ask first, prefer trash over permanent delete
5. **Todoist tasks** — approve items in queue before creation
6. **Fathom meeting items** — approval queue for action items extracted from transcripts

Each approval flow operates independently with no unified queue, no priority scoring, and no batching. The user receives approval requests from Telegram topics, potentially simultaneously.

## Gap

Approval fatigue is a real phenomenon: when users receive too many approval requests, they either:
- **Auto-approve everything** (bypassing the security benefit)
- **Ignore the queue** (letting items pile up)
- **Disable the feature** (workaround defeating the purpose)

## Suggested Action

1. Consolidate all approval requests into a single "Approval Inbox" with priority scoring
2. Add batch approval: "approve all low-risk items in one tap"
3. Classify approvals by risk: high-risk (public posts, email) require explicit per-item; low-risk (file deletion to trash) can use smart defaults
4. Add daily approval digest (like the hourly cron digest) so the user can process approvals in batch

**Labels:** approval-gates, user-experience, notification-overload, consolidation
**Related:** AIA-003 (Fathom polling timing)