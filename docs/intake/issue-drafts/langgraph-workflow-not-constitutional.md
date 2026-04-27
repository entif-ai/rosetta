# Issue: langgraph-workflow-not-constitutional

## Metadata

- ID: langgraph-workflow-not-constitutional
- Title: LangGraph as Workflow Orchestration Layer Only — NOT Constitutional Layer
- Type: architecture
- Severity: critical
- Tags: langgraph, workflow-layer, architecture-separation, orchestration
- Created: 2026-04-24
- Source: docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md

## Summary

LangGraph is the right choice for workflow orchestration (stateful graphs, checkpointable execution, human-in-the-loop, retries, bounded loops), but it must remain SUBORDINATE to a custom constitutional kernel. The graph nodes must call kernel APIs — never write sovereign state directly.

## The Critical Distinction

**YES:** LangGraph as the orchestration layer
**NO:** LangGraph as the constitutional layer

LangGraph should own:
- stateful workflows
- checkpointable graph execution
- human-in-the-loop interrupts
- scheduled routines
- task branching
- retries and backoff
- bounded autonomous loops

LangGraph must NEVER own:
- receipts
- provenance
- policy gates
- context compilation
- write admission
- canonical IDs
- memory routing rules
- source-span lineage

## Why This Split is Necessary

The platform mismatch diagnosis shows that when a tool tries to be both workflow orchestrator AND constitutional sovereign, it fails at the constitutional part. LangGraph is good at workflow/state machine problems. It is not designed to be a receipts-first provenance spine with fail-closed write gating.

The graph nodes should never write directly to sovereign state. They call kernel APIs. That way LangGraph's philosophical shortcomings (probabilistic, not constitutionally rigorous) stop mattering because they are constrained to bounded worker roles.

## The Five-Plane Architecture

1. **Constitutional Plane** (custom kernel): receipts, provenance, policy gates, context compilation, canonical IDs, source-span lineage, memory routing rules — NOT LangGraph
2. **Orchestration Plane** (LangGraph): stateful workflows, checkpointable graphs, human interrupts, scheduled routines, branching, retries, bounded loops
3. **Capability Plane**: Telegram/Discord/Slack connectors, browser automation, Mac desktop control, file/document ingestion — adapters only
4. **Memory Plane**: 5-layer federated memory with jurisdiction (Constitutional/Artifact/Vector/Temporal/Adaptive)
5. **Learning Plane**: summarize/classify/tag/cluster/refresh/salience/propose — bounded loops, core mutations require proposal artifact + approval

## Migration Path

> "Is this more attainable with LangChain+LangGraph? I'm prepared to migrate this."

Yes, as the orchestration layer. Migrate your **workflow orchestration** into LangGraph. Keep your **sovereign constitutional kernel** custom and above it.

Path B (recommended): Build a fresh orchestrator that owns ingestion/provenance/receipts/query-routing/context-compilation/write-gating/projection-scheduling. LangGraph becomes the workflow layer on top. This is "how you get to Path C without losing another month to carnival equipment."

## Resolution Required

1. Use LangGraph for checkpointable execution, human-in-the-loop, stateful workflows, branching, retries, bounded autonomous loops
2. Build custom constitutional kernel (Phase 1) BEFORE integrating LangGraph
3. Graph nodes call kernel APIs — no direct sovereign state writes from graph nodes
4. LangGraph is workflow layer, not empire

## Related Issues

- sovereign-kernel-vs-harness-proof-architecture
- oracle-pattern-cognition-vs-enforcement-separation
- context-compiler-bounded-bundles-not-prompt-sludge
- write-admission-gate-nine-step-state-machine
