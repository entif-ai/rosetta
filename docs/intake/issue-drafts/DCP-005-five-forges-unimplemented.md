# DCP-005: All 5 forges not implemented

**Type:** issue-candidate  
**Confidence:** high  
**Source:** `docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md` §3

## Problem

Five specialized forge agents are described but not implemented: Spec Forge, Blueprint Forge, Code Forge, Consistency Forge, Reporter Forge. Each is an LLM task profile with JSON output.

## Evidence

"Each of these is just an agent profile + prompt + JSON schema on top of the same underlying models." Spec Forge (raw notes → SpecDoc+ModuleSpec), Blueprint Forge (ModuleSpec → blueprint JSON), Code Forge (blueprint → code+tests, iterates), Consistency Forge (updated code → InterfaceSpec+BuildArtifact+Issue), Reporter Forge (graph+logs → status report).

## Required

1. Define prompt + JSON output schema for each forge
2. Implement Spec Forge: normalize language, identify boundaries, attach verification criteria
3. Implement Blueprint Forge: file hierarchy, component specs, execution env, verification protocol
4. Implement Code Forge: generate code+tests from blueprint, iterate on error, run tests
5. Implement Consistency Forge: update InterfaceSpec, flag incompatible modules, suggest refactors
6. Implement Reporter Forge: aggregate module status, test results, roadmap
7. Wire all 5 into orchestrator 5-step loop (DCP-002)

## Notes

- Depends on: DCP-001 (schemas), DCP-002 (orchestrator), DCP-003 (model broker)
- Can start with 3 forges (Spec + Blueprint + Code) for hello-world
