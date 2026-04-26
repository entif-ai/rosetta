# DCP-004: Code Atlas data model not implemented

**Type:** issue-candidate  
**Confidence:** high  
**Source:** `docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md` §2.3

## Problem

The Code Atlas (project knowledge graph) is defined conceptually with 6 entity types (SpecDoc, ModuleSpec, FileSpec, InterfaceSpec, BuildArtifact, Issue) but no storage layer exists.

## Evidence

Code Atlas entities: SpecDoc (id, title, path, sections, tags, linked entities), ModuleSpec (name, purpose, inputs/outputs, deps), FileSpec (path, language, owned_by ModuleSpec), InterfaceSpec (function signatures, data contracts), BuildArtifact (file path, git commit, tests, last_status), Issue (type, linked modules/files).

## Required

1. Choose storage: SQLite (simpler) or Neo4j/ECGG (better for graph traversal/impact analysis)
2. Implement persistence for all 6 entity types
3. Implement CRUD operations: create, read, update, link entities
4. Implement impact analysis query: "what depends on this module?"
5. Implement coherence check queries: InterfaceSpec vs actual code
6. Integrate with orchestrator core (DCP-002)

## Notes

- Depends on: DCP-001 (schema definitions)
- Neo4j/ECGG preferred if impact analysis and graph traversal are priority
