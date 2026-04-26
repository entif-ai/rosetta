# CW-007: search_capabilities MCP tool interface only, no implementation

**Type:** issue-candidate  
**Confidence:** medium  
**Source:** `docs/chats/20260225 - Chat GPT - Code Wiki integration.md` §2

## Problem

The Code Wiki integration conversation defined the search_capabilities and get_capability MCP tool interfaces (input_schema, output_schema, filter options), but no server implementation exists.

## Evidence

search_capabilities input: { query?, k?, filters: { kind[], status[], min_maturity_level, domain_prefix, tags[], requires_tests, requires_prod_usage, repo } }
search_capabilities output: { results: [{ tile_id, title, summary, domain, kind, status, maturity_level, tags, owner, used_in_prod, primary_entrypoint, score }] }
get_capability input: { tile_id }
get_capability output: { capability: CapabilityTile }

## Required

1. Implement MCP server stub that reads from JSON files (no DB needed to start)
2. Implement search_capabilities: full-text search + structured filter application
3. Implement get_capability: direct tile_id lookup
4. Add pagination (k parameter)
5. Add vector similarity search (using CodeWiki embeddings or local embeddings)

## Notes

- Depends on: CW-001 (CapabilityRegistry), CW-006 (tile schema registered)
- Can start with JSON file backend immediately; upgrade to vector + structured DB later
- This is the primary user-facing interface; prioritize ergonomics
