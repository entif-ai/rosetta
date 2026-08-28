---
id: entif.research.agentic-memory
slug: agentic-memory
title: Agentic memory needs more than retrieval
kind: research
status: published
published: 2026-08-28
authors:
  - Entif AI
description: A durable agent memory should preserve source identity, evidence, lifecycle, rights, and uncertainty instead of reducing memory to similarity search.
tags:
  - agentic-systems
  - memory
  - provenance
projects:
  - rosetta
routeTag: rosetta
related:
  - entif.project.rosetta
sourceRefs:
  - docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md
featured: false
noindex: false
---

## Retrieval is only one operation

Vector similarity is useful, but retrieval alone does not answer the questions a durable agent system eventually encounters: Where did this claim originate? Has its source changed? Was it inferred or observed? Who may use it? What superseded it? Which action depended on it?

Rosetta's memory work treats those questions as part of the memory substrate rather than optional metadata sprinkled on top.

## Preserve distinctions before compressing them

A source record, a manifestation of that record, an extraction, an observation, and a later conjecture are related artifacts, not interchangeable copies. Preserving those distinctions makes later correction, rights enforcement, replay, and audit materially easier.

## Memory as governed state

The long-term objective is not an infinitely growing prompt. It is a layered memory system in which hot context is deliberately compiled from more durable, provenance-bearing state. Forgetting, promotion, retrieval, and compaction then become inspectable policies rather than accidental side effects of context-window pressure.
