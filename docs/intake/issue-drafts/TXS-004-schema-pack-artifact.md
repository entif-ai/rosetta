# TXS-004: Rosetta Schema Pack (ROCK-3010) Machine-Readable Artifact

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `schema-pack`, `json-schema`, `shacl`, `rdf`, `artifact`, `machine-readable`
**Depends on:** TXS-002-bpmn-dmn-scxml-stdpacks

## Problem Statement

ROCK-3010 is defined as a downloadable artifact bundle containing: JSON Schemas for all tile types, SHACL shapes for profile validation (Light/Full/Auditor/Forge), and a TTL (Turtle) file for core ontology. No such artifact currently exists anywhere in the repository. This is the normative machine-readable reference for all Rosetta implementations.

## Specific Findings

- **F-TXS-015** (confidence: high): JSON Schema for tile schemas, SHACL Shapes for validation, RDF Concepts for graph model — all three layers specified but not implemented
- **F-TXS-022** (confidence: high): Four profiles (Light, Full, Auditor, Forge) with SHACL-based test cases and "Self-Consistency Checklist" — described but not written
- **F-TXS-023** (confidence: medium): TTL (Turtle) file for core ontology (concept types and edge types) — described but not produced
- **F-TXS-011** (confidence: high): ROCK-3010 Schema Pack depends on ROCK-3002 (Data Model & Semantics Reference) for tile definitions

## Action Required

1. Generate `schema/tiles/*.schema.json` for all defined Pasigraphy tile types (coordinate with TXS-002 and TXS-003)
2. Generate `schema/profiles/shapes-*.shacl` for Light, Full, Auditor, Forge profiles
3. Generate `schema/ontology/rosetta-core.ttl` (RDF Turtle) for concept types and edge types
4. Create `scripts/release-schema-pack.mjs` that bundles all three into a versioned release artifact (zip/tar)
5. Publish `schema-pack@x.x.x` as a named release artifact in the repository
