# AIA-004: Multi-Format RAG Ingestion — Maintenance Burden and Twitter API Fragility

**Type:** risk / operational-complexity
**Confidence:** HIGH
**Severity:** medium
**Source:** `docs/external/Berman - AI Assistant.txt`, Finding AIA-007

## Problem

Berman's Knowledge Base RAG system handles four distinct ingestion formats:
1. Web articles (any web page)
2. YouTube videos (transcript extraction)
3. X/Twitter posts (follow full threads, not just first tweet)
4. PDFs

Each format is a separate pipeline with different extraction methods, error handling, and API dependencies. Twitter/X thread ingestion is particularly fragile: the X API changes frequently, rate limits are aggressive, and thread structure (quoted tweets, replies, media) is non-deterministic.

## Gap

No canonical supported format list. No failure handling per format. No degradation strategy when an ingestion pipeline fails (e.g., fall back to title+URL only). No maintenance ownership — if the Twitter API breaks, which team owns the fix?

## Question for Emilie

Has the Twitter/X ingestion pipeline in Berman's system ever broken due to API changes? If so, what was the resolution?

## Suggested Action

1. Prioritize formats: tier 1 (web articles, PDFs) are stable; tier 2 (YouTube) is reliable; tier 3 (Twitter threads) is fragile — consider making tier 3 opt-in
2. Add per-format health indicators: if YouTube API fails 3x consecutively, alert but don't crash the whole RAG system
3. Document API dependencies with version pins — don't just say "X API" but pin to "X API v2 endpoint X"
4. Consider a generic fallback: if extraction fails, store just the URL + title + timestamp as a placeholder

**Labels:** rag, ingestion, complexity, twitter-api, operational-complexity
**Related:** AIA-002 (Gmail quota cost model), AIA-006 (auto-discovery blind spots)