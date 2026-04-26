# DCP-001: ModuleSpec/InterfaceSpec/Blueprint JSON schemas undefined

**Type:** issue-candidate  
**Confidence:** high  
**Source:** `docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md` §7

## Problem

The DeepCode prototype conversation identified three JSON schemas that are required as the first concrete artifacts before any forge can be wired end-to-end: ModuleSpec, InterfaceSpec, and Blueprint. These schemas are described conceptually but not defined.

## Evidence

"First step: pick one target (e.g., 'VieDay Core Journal Service'), define three things: atlas/ (modules.yaml, interfaces.yaml), orchestrator/, reports/." The concrete first step requires these schemas before any forge runs.

## Required

1. Define ModuleSpec schema: name, purpose, inputs/outputs, dependencies (other ModuleSpecs), verification criteria (what counts as "done")
2. Define InterfaceSpec schema: function signatures, data contracts, preconditions/postconditions, invariants
3. Define Blueprint schema: files to create, language/framework, major functions/classes, test plan (in plain language)
4. Write JSON Schema for all three; add to Rosetta type catalog
5. Create example instances for one VieDay subsystem

## Notes

- No external dependencies; can proceed immediately
- These schemas become the "language" all forges use to communicate
