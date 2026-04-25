# Fathom processor lacks rollback if LLM extraction fails mid-transaction

## Metadata

- **Draft created**: 2026-04-25
- **Source**: docs/external/Berman-PRD.md §Fathom Meeting Integration
- **Extraction**: docs/intake/docs-intelligence/2026-04-25-berman-prd.md
- **Labels**: crm, fathom, error-handling

## Summary

The Fathom meeting processor (`crm/src/fathom/processor.js`) matches attendees to CRM contacts, extracts insights via Gemini 2.5 Flash Lite, creates context entries with embeddings, and updates relationship summaries. If the LLM extraction step fails partway through — e.g., after creating some context entries but before completing all of them — there is no documented rollback or transaction mechanism. Partial data would be committed to the CRM.

## Evidence

- `Processor: matches attendees to CRM contacts by email, extracts insights via Gemini 2.5 Flash Lite, creates context entries with embeddings, updates relationship summaries`
- No transaction, rollback, or idempotency mechanism documented in the processor description

## Risk

- If Gemini fails mid-extraction for a multi-attendee meeting, some attendees get context entries and others don't — leading to inconsistent CRM state
- If the embedding generation fails after context entry creation, the entry exists but is not searchable
- Relationship summary updates could be applied partially, making the summary inconsistent with the actual context entries
- Re-running the sync would not clean up the partial entries (no dedup mechanism described for this scenario)

## Recommended Action

1. Verify whether `processor.js` wraps its operations in a SQLite transaction
2. If not, add transaction wrapping: begin transaction → create context entries → generate embeddings → update relationship summaries → commit; rollback on any failure
3. Add idempotency key (e.g., `fathom_meeting_id + attendee_email`) to context entries so re-runs are deduplicated
4. Document the error recovery strategy in `docs/USE-CASES-WORKFLOWS.md`

## Priority

medium