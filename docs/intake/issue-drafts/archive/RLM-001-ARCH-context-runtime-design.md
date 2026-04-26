# Issue Draft: RLM-001-ARCH

**Prefix:** RLM-001
**Title:** Design and spec ContextRuntime as a first-class Entif component

## Problem Statement

The canonical LLM call (`llm.completion(prompt)`) treats the prompt as an opaque blob fed directly into the model. For long-horizon agentic tasks (like building and maintaining a large software project), this causes context rot: as irrelevant tokens accumulate, retrieval accuracy and reasoning fidelity degrade in non-obvious ways.

## Evidence

- Source doc (20260302 - Chat GPT - Recursive Language Models - 1.md), Finding RLM-001-H:
  > "Instead of feeding the prompt into the model, they mount it as an external object and let the model operate on it with code and recursion."
  > "`rlm.completion(prompt)` where `prompt` becomes a variable inside a sandboxed REPL, and the LM writes programs to: peek/search/slice/decompose the prompt, recursively call sub-agents on only the needed snippets, keep sub-agent outputs out of the parent's context by default."

- Finding RLM-001-H (fast-rlm implementation):
  > "built around a REPL + recursion loop, with: recursive decomposition (spawn sub-agents), REPL-based reasoning (execute Python iteratively), budget controls (depth/calls/dollar spend caps), OpenAI-compatible provider routing"

## Proposed Resolution

Design a `ContextRuntime` service (or MCP tool) that:
1. Mounts a large corpus as an external memory substrate
2. Executes bounded RLM programs against it
3. Returns results as REPL variables/symbols (not appended text)
4. Every step emits a receipt (JSONL structured log)
5. Integrates with the orchestrator as a first-class tool call, same as any other tool

## Entif Alignment

- Aligns with receipts-first orchestration design
- Aligns with Rosetta spine as content-addressable external memory
- fast-rlm is identified as the closest "skateboard" implementation to build from

## Confidence

HIGH — directly stated in source; architectural recommendation is explicit.

## Status

DRAFT