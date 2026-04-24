# Docs Intelligence Priority Queue

Status: active queue
Date: 2026-04-24

## Purpose

This queue orders repository documents for requirements and roadmap extraction. It is not a runtime ingest queue.

## Batch 0: Correct The Workflow

Goal: make the docs-intelligence lane explicit so agents stop blocking requirements mining on runtime ingestion readiness.

- `README.md`
- `docs/intake/README.md`
- `docs/intake/DOCS_INTELLIGENCE_WORKFLOW.md`
- `docs/handoffs/CURRENT_HANDOFF.md`

Expected outputs:

- documented distinction between planning extraction and Rosetta-native ingestion
- first GitHub issue for docs intelligence
- updated handoff

## Batch 1: Highest-Authority Rosetta Direction

Goal: extract the current intended build direction and resolve what should be prioritized before more Text-Core implementation.

- `docs/backlog/20260424 - Rosetta Text-Core MVP Scope Gate (v0.1).md`
- `docs/backlog/20260411 - Rosetta Canonical Build Charter (v0.1).md`
- `docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md`
- `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md`
- `docs/governance/REPO_SHAPE_AND_CONSTRAINTS.md`
- `docs/governance/SERVICE_INVENTORY.md`

Expected outputs:

- current component map
- issue dependency graph
- Text-Core priority correction, if needed
- list of implementation issues that should pause until docs intelligence clarifies scope

## Batch 2: Current PRD/RFC Product Shape

Goal: extract the product and system requirements that should shape epics and project-board structure.

- `docs/PRDs/20260423 - Entif.AI - NOT LAME (v0.1) - PRD - Neurologic Orchestration Topology for Layered Agentic Memory and Evolution.md`
- `docs/RFCs/20260412 - Rosetta - Ontological Mixture of Concepts (OMOC) - Swarm Gnosis Protocol Spec.md`
- `docs/RFCs/ontological_mixture_of_concepts_research_spec.md`
- `docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md`

Expected outputs:

- PRD requirement matrix
- RFC conformance candidates
- milestone/project-board fields
- candidate epics

## Batch 3: Source Dialogue About Rosetta And Agent Orchestration

Goal: mine recent conversations for intent, tradeoffs, and process constraints.

- `docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md`
- `docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md`
- `docs/chats/20260412 - Chat GPT - Ontologies and Dataset Repositories.md`
- `docs/chats/20260410 - Entif and Rosetta PRDs - ChatGPT - Pro-Extended Research.md`
- `docs/chats/20260410 - PRD Blueprint for Rosetta and Entif - ChatGPT - Deep Research Report.md`

Expected outputs:

- orchestration failure modes
- agent parallelization rules
- ontology/dataset assumptions
- issue candidates tied to evidence

## Batch 4: Exploratory Product And Platform Ideas

Goal: identify candidate product lines and future epics without allowing exploratory material to override higher-authority docs.

- `docs/ideas/Attention-as-Capital Analytics Platform.md`
- `docs/ideas/Real-Time Ingestion and Analytics Pipeline.md`
- `docs/ideas/Semantic Audio Cognition Framework.md`
- `docs/ideas/Treating Trends Tantamount to Trading Technicals.md`
- `docs/ideas/Idea - Spatial Data Fabric (SDF) - Mixed-Reality Performance Stage (20251106).md`

Expected outputs:

- future epic candidates
- deferred idea map
- technology watchlist

## Batch 5: External And Frontier Context

Goal: extract supporting technology inspiration and competitive context after core direction is mapped.

- `docs/external/`
- `docs/frontier/`

Expected outputs:

- external-tech reference map
- non-binding inspiration notes
- risks of overfitting roadmap to external examples
