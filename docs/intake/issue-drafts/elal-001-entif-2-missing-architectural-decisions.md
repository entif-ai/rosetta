# elal-001: Entif 2.0 — Missing Architectural Decisions Tracker

## Metadata

- **Type**: issue-candidate
- **Extraction**: `docs/backlog/Entif 2.0 - Comprehensive Action Plans.md`
- **Confidence**: high
- **Finding type**: issue-candidate / gap

## Summary

The Entif 2.0 blueprint leaves five major architectural decisions unresolved. These must be resolved before Phase 3 Forge implementation begins, as they affect multiple components.

## Open Questions (Unresolved)

| Decision | Options | Affects | Priority |
| --- | --- | --- | --- |
| ASR engine for Limitless Feed | Whisper (OpenAI), Vosk (Kaldi), coquiTTS, other local | D1 Ada, D3 ingestion | P0 |
| Forced alignment tool for LyricsForge | Montreal Forced Aligner (MFA), WhisperX, Gentle | LyricsForge M4 alignment | P1 |
| Graph database | Neo4j (Cypher/property graph) vs. Postgres+pgvector (SQL+vector) | D9 GraphRAG, all knowledge queries | P0 |
| OAuth library for SocialForge platforms | OAuth.NET, oauth4java, node-oauth (custom) | SocialForge M1 adapter auth | P1 |
| TRM implementation approach | Distilled small transformer vs. cached prompt-completion on existing small model | TRM design | P1 |

## Recommendation

Create a structured ADRs (Architecture Decision Records) document under `docs/RFCs/` for each of the five unresolved decisions. Each ADR should:

1. State the decision context and options considered
2. Provide a recommendation with rationale
3. Note dependencies and tradeoffs
4. Be reviewed before Phase 3 begins

## Evidence

From `docs/backlog/Entif 2.0 - Comprehensive Action Plans.md`:
- ASR: "preferably a fast local model for privacy and speed" — no specific model named
- Forced alignment: "like the Montreal Forced Aligner or Gentle or WhisperX" — all listed as examples, none committed
- Graph DB: Neo4j referenced in architecture sections; Postgres+pgvector in governance docs; no final selection
- OAuth: "OAuth 2.1 with PKCE for connecting accounts" — library not specified
- TRM: "likely implemented in PyTorch with FastAPI wrapper" — not committed

## Labels

- architecture
- decision
- entropy-2
- open-question

## Status

open
