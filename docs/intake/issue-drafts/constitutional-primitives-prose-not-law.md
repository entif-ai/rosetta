# Issue: constitutional-primitives-prose-not-law

## Metadata

- ID: constitutional-primitives-prose-not-law
- Title: Constitutional Primitives Exist Only in Prose, Not Enforced in Runtime
- Type: architecture
- Severity: critical
- Tags: constitutional-engineering, enforcement-chain, principle-enforcement, invariants
- Created: 2026-04-24
- Source: docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md

## Summary

Every harness failure traces to the same root: constitutional primitives like "append-only," "checkpoint-before-mutation," and "one canonical source of truth" were written as prose doctrine but never mechanically enforced. The enforcement chain (Principle → Invariant → Enforcement → Telemetry → Consequence) was broken at every link.

## Problem Statement

The 48 failures across OpenClaw and Hermes all trace back to rules that existed only in documentation:

**OpenClaw failures:**
- APPEND ONLY doctrine existed → canonical files were overwritten
- checkpoint discipline existed → edits happened before checkpoint
- multiple memory authorities without governance hierarchy
- no single source of truth for heartbeat state
- destructive compaction replacing evidence
- summaries contradicting evidence
- non-deterministic orchestration and state handling

**Hermes failures:**
- "mechanisms existed in prose but were not wired into the actual execution path"
- session artifacts never auto-promoted at session end
- cycle-state.json and sprint-state.json drifting in parallel
- breadth gates tracked but never enforced
- redirect loops with no exit (298 cycles producing nothing)
- 72-hour silent dropout with no alert

## The Enforcement Chain

Every constitutional principle requires all five links:

```
Principle → Invariant → Enforcement → Telemetry → Consequence
```

If ANY link is missing, the principle rots.

**Append-only example:**
- Principle: "append only"
- Invariant: storage layer literally rejects non-append mutation
- Enforcement: versions every write, emits receipt when mutation attempted
- Telemetry: mutation attempt is logged and surfaced
- Consequence: mutation is blocked and flagged

Without all five, "append-only" is just a slogan.

**Checkpoint-before-mutation example:**
- Without checkpoint token, write path blocks operation
- Without enforcement, "checkpoint discipline" is just etiquette

**Breadth gate example:**
- Without scheduler refusing to advance without satisfying gate, "breadth control" is just a diary entry

## Resolution Required

For each sacred principle in the system, define:
1. What exact runtime invariant expresses it?
2. Which single component enforces it?
3. How can it be bypassed?
4. What receipt proves it held?
5. What happens automatically when it is violated?

Until those answers exist, "inviolable" is a decorative adjective wearing a fake mustache.

## Related Issues

- harness-platform-mismatch-root-cause
- write-admission-gate-nine-step-state-machine
- failure-taxonomy-matrix-forty-eight-failures
- deterministic-bootstrap-gate-refuse-to-start
