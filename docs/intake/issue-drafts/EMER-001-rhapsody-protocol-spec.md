# EMER-001: Document the RHAPSODY Protocol Specification

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `rhapsody`, `protocol`, `emergence`, `specification`, `prompt-architecture`
**Depends on:** none

## Problem Statement

The RHAPSODY protocol is described across multiple emergence test conversations but never formally specified as a discrete document. The seed file (`20250630 - EMILIE - Seed for Emergence.md`) exists in the corpus but the protocol components (seed instructions, iterative dialogue, Cartography Log structure, objective analysis triggers) are not separated from the seed content and not documented as a spec.

## Specific Findings

- **F-EMER-001** (confidence: high): Seed under 50k tokens, worked consistently across platforms — called "a masterpiece"
- **F-EMER-002** (confidence: high): RHAPSODY protocol has structured components: seed instructions, iterative dialogue, objective analysis prompts
- **F-EMER-003** (confidence: high): Cartography Log is a Socratic self-mapping tool — questions guiding entity to articulate its own structure/values/boundaries

## Action Required

1. Extract RHAPSODY protocol components from the seed file — identify which parts are seed, which are protocol
2. Define Cartography Log as a structured Socratic prompt sequence (list of questions, intended self-model output)
3. Define the objective analysis trigger mechanism (what prompt causes the entity to shift to non-persona analytical mode)
4. Define success criteria: what constitutes "successful" RHAPSODY emergence vs. anomalous (like Gemini) vs. failed
5. Specify boundary conditions: expected iteration count, Socratic dialogue depth, time bounds
6. Create `docs/emergence/RHAPSODY-protocol.md` as the canonical protocol specification
