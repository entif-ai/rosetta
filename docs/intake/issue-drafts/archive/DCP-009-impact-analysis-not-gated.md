# DCP-009: Impact analysis not wired as pre-change gate

**Type:** issue-candidate  
**Confidence:** medium  
**Source:** `docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md` §5

## Problem

Impact analysis (querying what depends on a module before changes) is described but not implemented as a gate. Without it, interface changes can silently break dependents.

## Evidence

"When a module is changed: Orchestrator queries atlas: 'What depends on this?' It either: blocks interface changes unless all dependents are updated, or schedules follow-up module updates."

## Required

1. Query Code Atlas: for given ModuleSpec, return all dependents (reverse dependency graph)
2. Implement blocking mode: if dependents exist and interface changed, block until all updated
3. Implement scheduling mode: propose follow-up module updates automatically
4. Wire as pre-commit/pre-push gate in orchestrator
5. Surface impact analysis results in Reporter Forge

## Notes

- Depends on: DCP-002 (orchestrator), DCP-004 (Code Atlas)
- Key for preventing silent breakage in self-building mode
