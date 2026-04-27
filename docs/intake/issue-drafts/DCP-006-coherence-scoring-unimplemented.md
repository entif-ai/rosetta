# DCP-006: Coherence scoring not implemented

**Type:** issue-candidate  
**Confidence:** medium  
**Source:** `docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md` §5

## Problem

The coherence score (automated metric for InterfaceSpec compliance + test coverage) is described but not implemented. It should surface in Reporter Forge output.

## Evidence

"Periodic automated jobs: (1) check that all InterfaceSpec definitions still match the actual code. (2) Check tests cover all declared contracts. Reporter compiles these into a 'coherence score.'"

## Required

1. Define coherence score formula: (InterfaceSpec match % + test coverage %) / 2? weighted?
2. Implement InterfaceSpec vs code compliance checker (static analysis + parsing)
3. Implement test coverage vs declared contracts checker
4. Schedule periodic coherence checks (post-build hook)
5. Surface coherence score in Reporter Forge output
6. Define threshold: what coherence score enables self-building bootstrap?

## Notes

- Depends on: DCP-002 (orchestrator), DCP-004 (atlas), DCP-005 (forges)
- Coherence threshold for self-building bootstrap should be defined (e.g., >90%)
