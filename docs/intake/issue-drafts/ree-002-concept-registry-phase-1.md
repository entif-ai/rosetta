# REE-002: Concept Registry Phase 1 has no implementation plan

## Status
draft

## Type
architecture

## Labels
- architecture
- text-core
- concept-registry
- planning

## Evidence
"Phase 1: build registry of stable IDs for concepts, frames, roles, relations, and modality hooks" — from docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md

## Problem

Rosetta's architecture explicitly prioritizes building the concept registry before any tokenizer or embedding work (R-REE-003). The concept registry is the foundation of the semantic IR layer — stable IDs for concepts, frames, roles, relations, and modality hooks are what everything else (embedding models, projection heads, disambiguation, retrieval) depends on. However, there is no concrete specification or implementation plan for this registry.

## Proposed Solution

Scope Phase 1 as a discrete work item:

1. **Schema definition**: What fields does a concept ID entry have? (ID string, preferred label, aliases, gloss, frame bindings, relation types, modality hooks, provenance)
2. **Initial corpus**: Populate from existing Rosetta concept inventory (ONTOLOGICAL_MIXTURE_OF_CONCEPTS.md, CYCLE_SUMMARY.md CONCEPT_INDEX.json)
3. **Governance**: Who can add concepts? What is the dedup policy? How are conflicts resolved?
4. **Storage**: PostgreSQL table vs flat JSON? Considering the PostgreSQL-first posture of NOT LAME
5. **API surface**: Read-only query for agents; write path through import pipeline (quarantine→certify→promote)
6. **Name stability**: IDs must be stable across versions — content-addressed or namespace-qualified?

## Dependencies
- None explicitly documented; this is the first phase

## Priority
high

## Notes
- This is the "skeleton" that justifies any future "mouth" (tokenizer) work
- Coordinate with DI-009 (internal knowledge graph / cross-doc concept linking) — the concept registry is a prerequisite for the knowledge graph
- Consider alignment with existing CONCEPT_INDEX.json structure in docs/intake/docs-intelligence/