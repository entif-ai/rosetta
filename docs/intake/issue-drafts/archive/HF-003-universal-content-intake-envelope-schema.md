# Issue Draft: HF-003 — Universal Content Intake Envelope Schema

## Metadata

- **Issue prefix:** HF-003
- **Title:** Implement universal content intake envelope schema across all source types
- **Confidence:** high (schema explicitly defined in spec; not yet implemented)
- **Authority:** primary (sovereign user request)
- **Extraction source:** `docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md`
- **Labels:** HF-003, intake-schema, normalization, content-intake, universal
- **Status:** draft
- **Depends on:** —
- **Blocks:** HF-004, HF-009, HF-010

---

## Problem Statement

The spec defines a universal intake envelope that all source adapters (magazines, newsletters, RSS, Discord, email, manual drops) must emit. This common schema enables a single normalize + triage pipeline downstream regardless of source. The schema is explicitly defined but not yet implemented as a canonical type.

---

## Proposed Approach

1. **Define the canonical intake envelope schema** as a TypeScript interface or JSON schema:

   ```typescript
   interface IntakeEnvelope {
     source_type: 'magazine' | 'newsletter' | 'rss' | 'discord' | 'email' | 'manual' | 'google-alert';
     source_name: string;              // e.g., "wired", "matt-wolfe/future-tools"
     item_url: string;                 // canonical URL (tracking params stripped)
     title: string;
     author?: string;
     published_at?: string;            // ISO 8601
     retrieved_at: string;              // ISO 8601 — when we fetched it
     raw_excerpt: string;              // what the feed provides as preview/teaser
     content_pointer: string;          // how to fetch full text: URL, file path, email-MID, etc.
                                       // includes auth context where needed
     receipts: {
       item_hash: string;              // hash of title+author+date+domain or canonical URL
       request_id?: string;
       tokens_used?: number;
       cost_usd?: number;
       runtime_ms?: number;
     };
   }
   ```

2. **Normalize stage:**
   - Canonicalize URLs: strip tracking parameters (utm_*, fbclid, etc.)
   - Deduplicate: hash of title+author+date+domain or canonical URL
   - Extract structure: headings, code blocks, lists, quotes, imperatives

3. **Content pointer** must always be populated even when full-text fetch fails. System should always store metadata + pointer — "nothing is 'missed', it's just 'pending deep ingest'."

4. **Build per-source adapters** that emit IntakeEnvelope:
   - Magazine adapter (Wired, PopMech, 2600) — see HF-009
   - Newsletter adapter — see HF-010
   - RSS adapter
   - Google Alerts adapter
   - Discord adapter — see HF-008
   - Manual/link-drop adapter
   - Email adapter (via dedicated label/mailbox folder)

---

## Acceptance Criteria

- [ ] IntakeEnvelope schema defined as a shareable TypeScript type / JSON schema
- [ ] All source adapters emit IntakeEnvelope as their output format
- [ ] Normalize stage canonicalizes URLs and deduplicates correctly
- [ ] System always stores metadata + content_pointer even when full-text fetch fails (graceful degradation)
- [ ] Receipts metadata (item_hash, request_id, tokens, cost, runtime) included in every envelope

---

## Dependencies

- HF-009 (magazine adapters) — consumes this schema
- HF-010 (newsletter + alerts adapters) — consumes this schema
- HF-008 (Discord adapter) — consumes this schema

---

## Estimated Complexity

**Medium.** Schema definition is straightforward; complexity is in the per-source adapter implementations and ensuring graceful degradation when full-text fetch fails.

---

## Notes

- The `content_pointer` field is critical: it encodes how to fetch full text later, including any auth context needed. For paid magazine content, this might be a signed URL or file path to a cached PDF.
- The receipts-first v0 posture requires that every envelope includes provenance metadata. Do not allow empty receipts.
- "Imperatives are gold" — sentences with imperative mood ("do X", "consider Y") should be flagged in the normalize stage as high-signal for action extraction.
