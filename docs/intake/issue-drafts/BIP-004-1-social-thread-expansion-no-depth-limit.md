# BIP-004-1 — Thread Expansion Has No Recursion Depth Limit

**Use Case:** BIP-004 (Social Media Research System)
**Confidence:** MEDIUM
**Type:** cost

## Description

The spec instructs to "pull the full thread" for high-engagement tweets without specifying a maximum depth. Threads on X can extend to hundreds of nested replies. Without a recursion depth limit, a single high-engagement thread could consume the entire API budget for a query.

## Specific Problem

1. **Unbounded API calls:** Thread expansion requires API calls per reply. A thread with 500 replies = 500 API calls = significant cost at Tier 2 or Tier 3 pricing.
2. **No depth budget:** Even if total reply count is bounded, a shallow-but-wide thread vs. a deep-but-narrow thread have very different API costs. No depth-vs-width budget is described.
3. **No cutoff signal:** What makes a thread "high-engagement" enough to warrant expansion? If a tweet has 10,000 likes but the thread has only 2 replies, expansion is cheap. If a tweet has 1,000 likes and 200 thread-level replies, cost scales linearly with engagement.

## Expected Behavior

Specify:
1. Maximum thread expansion depth (e.g., top 3 levels of replies)
2. Maximum replies per level (e.g., top 20 by engagement)
3. Engagement threshold for triggering expansion (e.g., only if tweet has >500 interactions)
4. Cost budget per query (e.g., max 50 API calls for thread expansion)

## Source Reference

BIP-004, "Thread expansion" section: "For high-engagement tweets that are part of a thread, pull the full thread."
