# TXS-002: Standards Mapping: Pasigraphy StdPacks for BPMN/DMN/SCXML

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `standards`, `bpmn`, `dmn`, `scxml`, `stdpacks`, `pasigraphy`
**Depends on:** none

## Problem Statement

ROCK-3003 Standard Packs Specification lists BPMN (OMG + ISO/IEC 19510), DMN (OMG), and SCXML (W3C) as aligned standards for process/decision/state modeling, but no Pasigraphy tile mappings, no pack specification files, and no conversion/serialization rules exist. The StdPacks spec is incomplete without these mappings.

## Specific Findings

- **F-TXS-006** (confidence: high): BPMN, DMN, SCXML identified as three-part behavioral standards stack — flow, choice logic, stateful transitions
- **F-TXS-011** (confidence: high): ROCK-3003 lists BPMN, DMN, SCXML as aligned standards under Standard Packs but no tile definitions exist
- **F-TXS-015** (confidence: high): JSON Schema is the tile schema format; BPMN/DMN/SCXML tiles need corresponding JSON Schema definitions

## Action Required

1. Define Pasigraphy tile types mapping to BPMN elements: Task, Sequence Flow, Gateway, Event, Lane, Participant
2. Define Pasigraphy tile types mapping to DMN elements: Decision Table, Boxed Expression, Literal Expression, ItemDefinition, DRG (Decision Requirements Graph)
3. Define Pasigraphy tile types mapping to SCXML elements: State, Transition, Initial, Final, Parallel, History
4. Write JSON Schema for each new tile type
5. Specify bidirectional serialization rules (BPMN XML ↔ Pasigraphy tiles, etc.)
6. Define conformance level: which BPMN/DMN/SCXML features are mandatory vs. optional for each Rosetta profile (Light/Full/Auditor/Forge)
