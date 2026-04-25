# TXS-003: Standards Mapping: Pasigraphy StdPacks for SKOS/SEMAT/ArchiMate/ISO-42010

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `standards`, `skos`, `semt`, `archimate`, `stdpacks`, `pasigraphy`, `iso42010`
**Depends on:** none

## Problem Statement

ROCK-3003 Standard Packs and ROCK-3004 VocabPacks reference SKOS, SEMAT Essence, ArchiMate, and ISO/IEC/IEEE 42010 as aligned standards for taxonomy, SDLC kernel, enterprise architecture, and architecture descriptions. No tile mappings, no semantic anchor definitions, and no pack specs exist for these standards.

## Specific Findings

- **F-TXS-002** (confidence: high): SKOS (W3C) recommended as lightweight taxonomy backbone for nested classification
- **F-TXS-003** (confidence: high): SEMAT Essence (OMG) proposed as method-agnostic kernel for SDLC work/products
- **F-TXS-004** (confidence: high): ISO 42010 recommended for architecture description (viewpoints, views)
- **F-TXS-005** (confidence: high): ArchiMate (Open Group) recommended as layered enterprise architecture language
- **F-TXS-011** (confidence: high): ROCK-3003 lists all four as aligned standards; ROCK-3004 lists SKOS for taxonomy mapping

## Action Required

1. Map SKOS concept schemes (Concept, ConceptScheme, exactMatch, broadMatch, narrowMatch) to Pasigraphy anchor hierarchy tiles
2. Define SEMAT kernel alpha states (e.g., Opportunity, Stakeholders, Requirements, Work, Team, Software System) as Pasigraphy tile types
3. Map ISO 42010 stakeholders/concerns/viewpoints/views to Pasigraphy viewpoint tiles
4. Map ArchiMate layers (business/application/technology) and migration relationships to Pasigraphy layer definitions
5. Write JSON Schema for each new tile type
6. Specify how these tiles compose with existing Pasigraphy core tiles (no conflicts in type system)
