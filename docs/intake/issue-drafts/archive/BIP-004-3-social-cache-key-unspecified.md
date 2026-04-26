# BIP-004-3 — Cache Key Definition Is Missing

**Use Case:** BIP-004 (Social Media Research System)
**Confidence:** MEDIUM
**Type:** spec-gap

## Description

The caching mechanism is described as having a 1-hour TTL, but the cache key is never defined. Without a defined cache key scheme, different implementations may key the cache differently, causing cache misses (querying again when results are cached) or, worse, serving stale results for different queries.

## Specific Problems

1. **Ambiguous key composition:** Should the cache key be the user's original question? The decomposed queries? Each sub-query separately? A hash of the full query set?
2. **Cache key collision:** If keyed by the original question string, "What are people saying about AI?" and "What is the discourse on AI?" would be cache misses despite being semantically identical.
3. **Sub-query caching:** If the same sub-query appears across multiple different questions, should it be cached once or per-question? Per-question caching is more correct but wastes cache space.
4. **TTL ambiguity for decomposed queries:** If the original question triggers 3 sub-queries, and the cache TTL starts when the first sub-query is cached, the second and third sub-queries may have different effective TTLs, leading to partial cache hits.

## Expected Behavior

Define the cache key scheme explicitly:
- Recommended: key by `md5(normalized_query_string)` where `normalized_query_string` is the question lowercased, trimmed, and sorted if multi-part
- TTL calculated from the time of the first sub-query result cached
- All sub-queries for a given question share the same TTL expiry timestamp

## Source Reference

BIP-004, "Caching" section: "Cache results with a 1-hour TTL so repeated queries don't burn API credits."
