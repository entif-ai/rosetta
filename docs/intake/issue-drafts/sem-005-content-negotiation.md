# SEM-005: Content Negotiation on Canonical Resource URLs

## Type

`implementation`

## Summary

Add `Accept: application/ld+json` content negotiation to all canonical resource URLs, plus `Link: <.../context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"` HTTP headers so generic agents can discover the JSON-LD context without scraping HTML.

## Problem

AI agents that want machine-readable data from an Entif app currently must scrape HTML or guess at undocumented endpoints. Content negotiation provides a standard discovery mechanism.

## Proposed Approach

### HTTP behavior for `GET /<resource>/<id>`

```
Request:
  Accept: application/ld+json

Response headers:
  Content-Type: application/ld+json; charset=utf-8
  Link: <https://entif.ai/contexts/app.jsonld>; rel="http://www.w3.org/ns/json-ld#context"
  ETag: "<hash-of-last-modified>"
  Last-Modified: <timestamp>

Body:
  {
    "@context": ["https://schema.org", "https://entif.ai/contexts/app.jsonld"],
    "@id": "https://<app>.entif.ai/<entity>/<id>",
    "@type": "Product",
    ...
  }
```

### Fallback behavior

- If `Accept` does not include `application/ld+json`, return standard HTML
- If entity does not exist, return 404 with `{ "error": "Not found", "@id": "..." }` in JSON-LD

### Discovery path

1. Agent fetches `GET /sitemap-ld.json`
2. Agent finds canonical ID and `lastModified` for desired entity
3. Agent checks `ETag`/`Last-Modified` before fetching full record
4. Agent fetches `GET /<entity>/<id>` with `Accept: application/ld+json`
5. Agent discovers context via `Link` header if not known

### Implementation

- Middleware on all canonical resource routes
- For Next.js: custom `getServerSideProps` or route middleware
- For Express: content-negotiation middleware
- Test harness: verify correct `Content-Type` and `Link` headers on all canonical routes

## Dependencies

- SEM-001 (public context URL must be stable before shipping Link header)

## Labels

`content-negotiation`, `http`, `application-ld+json`, `discovery`, `implementation`

## Evidence

- `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md` — "add Link header so generic agents can discover context without scraping"; "Content negotiation for application/ld+json at canonical resource URLs"

## Status

draft