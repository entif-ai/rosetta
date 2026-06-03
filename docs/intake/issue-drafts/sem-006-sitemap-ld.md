# SEM-006: sitemap-ld.json Generator

## Type

`implementation`

## Summary

Implement a `sitemap-ld.json` generator that publishes a machine-first sitemap alongside `sitemap.xml`. This file lists canonical IDs and `lastModified` timestamps for all first-class entities, enabling agents to efficiently discover and sync entity state without crawling HTML.

## Problem

Agents that want to stay synchronized with Entif app data (e.g., price changes, availability updates) currently must poll individual entity URLs or scrape the human-facing sitemap. A machine-optimized index with change timestamps solves this.

## Proposed Approach

### sitemap-ld.json structure

```json
{
  "@context": "https://enti.ai/contexts/sitemap-v1.jsonld",
  "generatedAt": "2026-06-01T12:00:00Z",
  "entities": [
    {
      "@id": "https://dollahs.entif.ai/product/01HABC",
      "@type": "Product",
      "lastModified": "2026-06-01T08:30:00Z",
      "changeFrequency": "weekly",
      "priority": 0.8
    },
    {
      "@id": "https://dollahs.entif.ai/offer/01HXYZ",
      "@type": "Offer",
      "lastModified": "2026-06-01T10:15:00Z",
      "changeFrequency": "daily",
      "priority": 0.9
    }
  ]
}
```

### Generation

- Run in CI on every deploy
- Write to `https://<app>.entif.ai/sitemap-ld.json`
- Also publish per-entity pages at `https://<app>.entif.ai/<entity>/<id>` with LD+JSON content negotiation (SEM-005)

### Agent usage

1. Agent fetches `sitemap-ld.json` once on first contact
2. Caches `lastModified` per entity
3. Polls only entities whose `lastModified` is newer than local cache
4. Full resync if local cache is lost (but `lastModified` per entity prevents full crawl)

### Implementation

- Generator script: run against entity database, output JSON
- Wire to CI: run on deploy, deploy to CDN alongside `sitemap.xml`
- Validator: ensure all listed `@id`s resolve with 200

## Dependencies

- SEM-001 (public context), SEM-004 (entity ID policy), SEM-005 (content negotiation)

## Labels

`sitemap-ld`, `machine-feed`, `discovery`, `implementation`

## Evidence

- `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md` — "publish sitemap-ld.json that lists canonical IDs and last-modified for all first-class entities"

## Status

draft