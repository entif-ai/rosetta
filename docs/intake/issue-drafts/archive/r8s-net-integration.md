# Issue Draft: Define r8s.net integration contract (data shape + pull cadence)

## Metadata
- **Extracted from:** `docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md`
- **Extraction date:** 2026-04-25
- **Status:** Draft

## Summary
The document positions r8s.net as Entif's "market-data eye" for high-frequency ingest of glyph mechanics in market data, but no concrete integration contract (data shape, pull cadence, API) is defined. This issue is to define that contract before Phase 4.

## Details
From the document: "Realtime Pipeline ⇆ r8s.net Interface: Treat r8s.net as Entif's eye: high-frequency ingest showing the same glyph mechanics in market data."

The r8s.net integration is part of the "Attention-as-Capital" / media-trading engine concept:
- Topics treated as technical indicators
- Trend signals table: `{topic, velocity, longevity, breadth, acceleration, cultural_impact}`
- High-frequency ingest for market trend detection

What needs defining:
1. **API shape**: REST? WebSocket? What does a r8s.net data payload look like?
2. **Pull cadence**: How often? Real-time (sub-second), or batch (minute-level)?
3. **Data mapping**: How does market data become glyphs? (Topic → entity, price change → relation, etc.)
4. **Authentication**: API key? OAuth? Rate limits?
5. **Deprecation path**: What happens if r8s.net goes away or changes API?

## Acceptance Checks
- [ ] Document r8s.net API shape (request/response examples)
- [ ] Define pull cadence (real-time vs batch)
- [ ] Define glyph mapping rules: how market events → glyphs
- [ ] Document authentication and rate limit constraints
- [ ] Create integration test stub (mock r8s.net responses)
- [ ] Define fallback behavior if r8s.net is unavailable
