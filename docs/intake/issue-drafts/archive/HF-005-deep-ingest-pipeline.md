# Issue Draft: HF-005 — Deep Ingest Pipeline with Full-Text Fetch, Chunk, Embed, and Structured Output

## Metadata

- **Issue prefix:** HF-005
- **Title:** Implement deep ingest pipeline with full-text fetch, chunk, embed, and structured output
- **Confidence:** high (pipeline spec explicitly defined; implementation not started)
- **Authority:** primary (sovereign user request)
- **Extraction source:** `docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md`
- **Labels:** HF-005, deep-ingest, pipeline, full-text, embedding
- **Status:** draft
- **Depends on:** HF-001, HF-004
- **Blocks:** HF-006

---

## Problem Statement

Deep ingest is the stage where a content item above the relevance threshold has its full text fetched, parsed, and processed into structured outputs: a tight summary, key claims, tools/techniques mentioned, action ideas, risks/constraints, and links worth following. This pipeline is explicitly specified but not implemented. It is gated behind triage routing (HF-004).

---

## Proposed Approach

1. **Full-text fetch:**
   - Follow `content_pointer` from intake envelope
   - Respect auth context for paid content (magazine subscriptions, etc.)
   - Handle failures gracefully: if full text cannot be fetched, mark as "pending" and store what was available (metadata + excerpt)
   - Timeout and retry logic: max 2 retries with exponential backoff

2. **Content extraction:**
   - Strip ads, navigation, footers, cookie banners
   - Extract clean article body text
   - Identify and preserve: headings, code blocks, lists, quotes, tables
   - Flag imperative sentences ("do X", "consider Y") as high-signal

3. **Chunking + embedding:**
   - Chunk content into segments (target ~512–1024 tokens per chunk)
   - Generate embeddings for each chunk (model TBD: OpenAI, local, etc.)
   - Store chunks + embeddings for retrieval

4. **Structured output production:**

   | Output field | Description |
   |---|---|
   | `summary` | Tight (3–5 sentence) summary of the item |
   | `key_claims[]` | List of verifiable claims made in the content |
   | `tools_techniques[]` | Tools, frameworks, techniques, methodologies mentioned |
   | `action_ideas[]` | Actionable ideas with relevance to Entif/Rosetta |
   | `risks_constraints[]` | Risks, limitations, constraints, open problems |
   | `links_worth_following[]` | External URLs cited or referenced |

5. **Storage:**
   - All outputs stored as structured records linked to the original intake envelope
   - Chunks and embeddings stored with references back to parent item

---

## Acceptance Criteria

- [ ] Full-text fetch follows content_pointer and handles auth where required
- [ ] Graceful degradation: if fetch fails, item is marked "pending" with metadata preserved
- [ ] Clean content extraction removes ads/navigation noise
- [ ] All six structured output fields produced for each successfully ingested item
- [ ] Chunks + embeddings stored for retrieval
- [ ] Imperative sentences flagged as high-signal in extraction stage

---

## Dependencies

- HF-004 (triage routing gates which items enter deep ingest)
- Content pointer must be valid (HF-003 ensures this)

---

## Estimated Complexity

**High.** Full-text fetching with auth, content extraction, chunking, embedding, and structured output production is a multi-stage pipeline with external dependencies.

---

## Notes

- The "respecting your paid access" constraint for magazine content is critical: deep ingest must use valid auth sessions, not circumvent paywalls
- "Imperatives are gold" — sentences with imperative mood should be extracted and surfaced prominently in the action_ideas field
- The 6 structured output fields are the minimum; additional fields can be added as needed
- Chunk size should be configurable; 512–1024 tokens is a starting point that balances context window efficiency with retrieval precision
