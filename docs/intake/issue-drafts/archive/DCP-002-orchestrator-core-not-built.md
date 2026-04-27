# DCP-002: Orchestrator core not built

**Type:** issue-candidate  
**Confidence:** high  
**Source:** `docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md` §2.1

## Problem

The orchestrator core (the local Python service that coordinates all forges, manages the task queue, stores the project graph, and exposes CLI/API endpoints) is described but not built. Everything depends on this.

## Evidence

"A small service (Python is fine) that does: task queue / event loop, project graph storage (SQLite or a simple graph DB), API endpoints / CLI for: ask (chat with the system), plan_module, build_module, status (progress reports), tools: file read/write, git integration, test runner, static analysis. This thing never calls a model directly; it uses a Model Broker."

## Required

1. Implement task queue / event loop
2. Implement project graph storage (choose: SQLite or Neo4j/ECGG)
3. Implement CLI/API endpoints: ask, plan_module, build_module, status
4. Implement tools: file read/write, git integration, test runner, static analysis (mypy, ruff, pytest)
5. Implement Model Broker interface (does not call models directly)

## Notes

- Depends on: DCP-001 (schemas), DCP-003 (model broker interface defined)
- This is the foundation; everything else is a forge on top
