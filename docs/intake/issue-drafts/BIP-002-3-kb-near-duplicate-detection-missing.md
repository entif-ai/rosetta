# BIP-002-3 — Content Hash Deduplication Misses Near-Duplicates

**Use Case:** BIP-002 (Knowledge Base RAG)
**Confidence:** MEDIUM
**Type:** completeness

## Description

Content deduplication uses a SHA-256 hash of cleaned content as a UNIQUE column. This approach rejects exact duplicates but cannot detect near-duplicates — content that is substantively the same but differs in minor ways such as timestamps, ad counts, personalized sections, scroll-to-read more pagination markers, or minor text variations between renderings.

## Specific Problem

- Same article rendered at different times may differ by: date footer, "updated at" timestamp, ad density, personalized recommendation sections, scroll-linked content injection
- A/B tested pages or geo-personalized pages produce different content hashes for the same underlying article
- Articles behind a paywall that renders the first paragraph differently for logged-in vs. logged-out users produce different hashes for effectively the same content
- The same article fetched via AMP vs. canonical URL often has enough structural differences to produce different hashes

## Expected Behavior

A semantic deduplication layer at the embedding stage should detect near-duplicates. Approach options:
1. **Max cosine similarity check:** After embedding, compare the new document's chunk embeddings against existing embeddings. If top-k similarity exceeds a threshold (e.g., 0.95), flag as near-duplicate.
2. **SimHash or MinHash:** For rough content-level dedup without embeddings, use SimHash on cleaned text.
3. **URL dedup expansion:** The URL normalization step partially addresses this (stripping tracking params), but doesn't handle geo/AMP/paywall variants.

The spec should note that SHA-256 dedup handles exact duplicates only, and that a semantic dedup layer is recommended as a future enhancement.

## Source Reference

BIP-002, "Deduplication — two layers" section: "Content-hash: SHA-256 hash of the cleaned content. Store as a UNIQUE column — reject if the same hash already exists."
