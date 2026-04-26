# BIP-005-1 — YouTube API Quota Exhaustion Risk Unmitigated

**Use Case:** BIP-005 (YouTube Analytics + Competitor Tracking)
**Confidence:** HIGH
**Type:** cost

## Description

YouTube Data API has a strict daily quota system (10,000 units/day default for free tier). The spec instructs daily collection of multiple metrics across own channel videos plus competitor channels. No quota monitoring, priority ordering, or backoff strategy is described. The system could exhaust its daily quota within minutes of running, leaving the rest of the day without data.

## Specific Problem

1. **No quota budget tracking:** The spec does not describe tracking quota consumption to avoid exhaustion.
2. **No prioritization:** If budget is limited, which metrics should be prioritized? (Own channel views vs. competitor subscriber count? Analytics API vs. Data API?)
3. **No backoff or retry strategy:** On quota exhaustion (HTTP 429), what happens? Immediate retry? Exponential backoff? Skip to next metric?
4. **Competitor channel list unbounded:** Adding more competitor channels increases quota cost linearly. No maximum is specified.
5. **Daily quota vs. per-minute limits:** The spec does not account for spike errors from quota exceeding per-minute limits (which trigger 403 before daily limits are hit).

## Expected Behavior

Specify:
1. A quota tracking mechanism that stops making API calls when daily budget is near exhaustion (e.g., reserve 20% buffer)
2. A priority ordering: own channel metrics first, competitor metrics as budget allows
3. On 429 response: stop immediately, do not retry until the quota window resets or the next day's run
4. Maximum competitor channel count given quota budget, or a config flag to disable competitor tracking if quota is low

## Source Reference

BIP-005, "Competitor tracking" section: "Daily, pull each competitor's recent uploads (title, publish date, views) and subscriber count via YouTube Data API."
