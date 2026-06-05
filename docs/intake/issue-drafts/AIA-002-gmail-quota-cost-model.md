# AIA-002: Gmail API Quota Arithmetic — Scaling vs. Free Tier

**Type:** scalability / cost-model
**Confidence:** HIGH
**Severity:** medium
**Source:** `docs/external/Berman - AI Assistant.txt`, Finding AIA-003

## Problem

Berman's Personal CRM requires scanning all Gmail to discover contacts from the past year. The Gmail API has quota costs:

- **Free tier:** 1 billion quota units/day — approximately 1,000 requests/day depending on field mask
- **Scanning 365 days of email:** Even with efficient batch queries, this is a significant quota burn
- **Contact discovery pattern:** Requires reading message metadata (sender, recipient, timestamp), which still costs quota units

## Gap

The Berman system spec doesn't include a Gmail API cost model. The "scan all emails from past year" operation would consume meaningful quota. At daily scanning cadence, the quota math may not close for users with large inboxes (>10K emails/year).

## Question for Emilie

Did the Berman system ever run into Gmail API quota issues during your testing? Was there a rate limiter or batch scheduler that kept quota usage under the free tier?

## Suggested Action

1. If Berman has quota tracking, extract the mechanism (token budgeting, batch scheduling)
2. If no tracking exists, flag this as a gap for Entif AI's own email pipeline — design with quota budgets from day one
3. Consider: should "email contact discovery" be an opt-in feature with explicit quota disclosure?

**Labels:** gmail, oauth, rate-limits, cost-model, scalability
**Related:** AIA-001 (Personal CRM scope enforcement)