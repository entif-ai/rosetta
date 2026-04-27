# CTS-010: GraphRAG Slug-Output Upgrade — Return Ranked SlugURI Lists

## Type
`implementation`

## Labels
`graphrag`, `slug-return`, `retrieval-upgrade`

## Depends On
`SemanticCodecForge (CTS-001)`

## Evidence
PRD Section 3: "GraphRAG: Retrieval no longer returns lengthy document passages. It returns a ranked list of SlugURI. The agent's prompt context is filled with a handful of these compact slugs."

PRD Section 4 (Slice 4): "Slug-Based RAG. Update GraphRAG's final output stage to return slugs instead of text chunks. Outcome: All agents now benefit from massively increased context density in their prompts."

## Problem Statement
GraphRAG currently returns text chunks from its retrieval pass. With SemanticCodecForge, retrieval should return ranked SlugURI lists instead, massively increasing context density in agent prompts. This is Slice 4 of the thin-slice plan.

## Scope

### Must Include
- [ ] GraphRAG output stage modification: return SlugURI[] ranked by relevance
- [ ] Ranking algorithm: relevance score + slug compactness factor
- [ ] Agent prompt integration: fill context with slugs (not text chunks)
- [ ] Fallback: if slug unavailable, degrade to existing text chunk behavior
- [ ] Context budget management: how many slugs fit in context window
- [ ] Slug dereferencing: decode slug to content when agent needs it (lazy decode)

### Should Include
- [ ] Slug relevance feedback: log which slugs were useful vs not
- [ ] Multi-hop reasoning: chains of slugs for complex questions
- [ ] Cross-document slug retrieval

### Could Include
- [ ] Slug diversity scoring (avoid redundant slugs in same context)
- [ ] Personalized slug ranking based on agent role/task type

## Acceptance Criteria
- [ ] GraphRAG returns SlugURI[] instead of text chunks
- [ ] Ranked by relevance score (top-N per retrieval)
- [ ] Agent context density measurably improved (slugs vs text chunks token count)
- [ ] Slug dereferencing works when agent needs decoded content
- [ ] No regression on existing GraphRAG functionality for non-slug queries

## Notes
Slice 4 of the thin-slice plan. This is the final integration slice after CTS-001, CTS-002, and CTS-003 are complete.

## Status
`draft`
