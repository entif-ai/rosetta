# DCP-003: Model broker (NIM adapter) not implemented

**Type:** issue-candidate  
**Confidence:** high  
**Source:** `docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md` §2.2

## Problem

The Model Broker (adapter layer between orchestrator and NIM LLM endpoints) is described as an abstraction but not implemented. The abstraction is: run_model(task, prompt, schema) → ParsedResult.

## Evidence

"Abstraction here: run_model(task: Task, prompt: Prompt, schema: JSONSchema) -> ParsedResult. This gives flexibility to swap models, ensembles, etc., without touching orchestrator logic." Also: NIM provides "almost unlimited free access to every SODA model."

## Required

1. Define run_model(task, prompt, schema) interface in orchestrator
2. Implement NIM adapter: call NVIDIA NIM endpoints (general LLM + code-specialized LLM)
3. Implement task-type routing: Spec Forge → general LLM; Code Forge → code-specialized LLM; Reporter → general LLM
4. Handle schema-validated JSON output parsing
5. Add retry/error handling for NIM API

## Notes

- Depends on: NIM API credentials/access
- Once implemented, enables any model to be swapped via adapter
