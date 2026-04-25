# elal-004: Entif 2.0 — Data Retention and Expiration Policy

## Metadata

- **Type**: issue-candidate
- **Extraction**: `docs/backlog/Entif 2.0 - Comprehensive Action Plans.md`
- **Confidence**: medium
- **Finding type**: issue-candidate / gap

## Summary

The blueprint specifies TTL/expiration for knowledge graph nodes ("extremely old or rarely used nodes might be archived to cold storage") but defines no formal data retention policy. With ambient ingestion of personal data (voice transcripts, meeting notes, calendar), CCPA/GDPR compliance requires explicit retention schedules, erasure mechanisms, and user consent management.

## Gaps

1. **Ingested content retention**: How long are transcript segments, meeting notes, and file watcher contents retained in GraphRAG? Forever? Until explicitly deleted?
2. **Receipts retention**: receipts.sqlite grows indefinitely. What is the retention period? Are old receipts archived or deleted?
3. **Social analytics retention**: AnalyticsSeries (impressions, CTR, watch time) accumulates per post. What is the retention period? Is this PII?
4. **Media assets retention**: Generated media (scene cards, SRT files, exported videos) — what is the lifecycle? Auto-archive after X days?
5. **Comment/DM retention**: SocialForge inbox stores comments and DMs. Are these retained? For how long?
6. **User consent tracking**: Where is the "do-not-ingest" list persisted? Is it honored across sessions? Can users export or delete their data?
7. **Right to be forgotten**: If a user requests data erasure (CCPA/GDPR), what is the procedure? Does it cascade to receipts (which contain metadata)? Is deletion or anonymization required?
8. **Audit log retention**: AuthForge audit logs — what is the retention period? Are they considered records that must be retained for compliance?

## Recommendation

Create a `docs/RFCs/Data-Retention-Policy.md` that defines:

- Retention periods per data class (with rationale)
- Erasure procedures per data class (full delete vs. anonymization)
- Consent management (how "do-not-ingest" list is maintained and enforced)
- Archive policy for receipts (e.g., roll receipts older than 90 days to an archive table)
- Right to be forgotten runbook

## Evidence

From source document:
- "Memory Bloat Control: Over time, any long-running personal system can accumulate huge amounts of data. Entif includes policies for memory management – for instance, extremely old or rarely used nodes might be archived to a cold storage (or require explicit query to load)"
- "Privacy & Privacy: As noted, ingestion will redact sensitive details before adding nodes... The graph might also store sensitivity levels on nodes"
- "GDPR/CCPA compliance: for personal data it stores – e.g. it can delete or anonymize stored comments or DMs on request, and it honors 'right to be forgotten' signals"
- No specific retention durations defined anywhere in the document

## Labels

- privacy
- compliance
- data-retention
- entropy-2
- gdpr
- ccpa

## Status

open
