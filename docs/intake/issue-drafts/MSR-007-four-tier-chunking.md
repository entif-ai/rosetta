# MSR-007: Four-tier chunking implementation — Capability / Change package / Worker brief / Atomic task

## Issue Type
implementation

## Summary
Four chunking units defined for different execution contexts. Gap between A and B is where PRD compiler operates.

## Evidence
- 20260401 - Chat GPT - Memory Stack Recommendations (Response section 3, "the chunking unit I'd recommend")

Four packet sizes:
- **A. Capability**: Large. Human-reviewed. Architectural. Example: "Introduce workspace-scoped roles and team filters across auth, directory search, and audit logs."
- **B. Change package**: Medium. Parallelizable by discipline. Example: "Directory search filter delta," "auth session model delta," "audit event emission delta."
- **C. Worker brief**: Small. Single specialist, bounded blast radius. Example: "Add backend predicate composition for team+role filters in search service."
- **D. Atomic task**: Tiny. Verifiable. Example: "Add DB index for team_id + role_id composite filter."

Framework alignment:
- OpenSpec/SpecKit are strongest at B (change package)
- Claude Code plan mode is strongest at C (worker brief)
- GasTown is strongest at C/D coordination
- Giant PRDs live at A
- Gap A→B is where custom PRD compiler emits bounded packets

## Implementation Questions
- What is the format/schema for each packet size?
- How does the PRD compiler split A packets into B packets?
- How does a B packet get decomposed into C and D packets?
- What are the review gates between each tier?

## Labels
spec-framework, chunking

## Depends On
MSR-002 (PRD compiler layer), MSR-006 (freedom envelopes)
