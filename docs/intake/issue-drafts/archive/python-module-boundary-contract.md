# Issue: Python Module Boundary Contract

## Type
issue-candidate

## Labels
python, integration, type-contracts

## Depends On
Phase 1 (repo scaffold)

## Evidence

The Pro-tier DR prompt establishes Python as the secondary implementation lane for:
- ML/NLP/embedding pipelines
- evaluation harnesses
- graph/retrieval experimentation
- OCR/ASR/media-analysis adjuncts
- batch cognition or research jobs
- external adapters where Python ecosystems are materially stronger

It also states: "Python modules should be isolated behind clear workspace boundaries and typed contracts" and "Do not split the core Rosetta spine ambiguously across both languages without a clear reason."

However, the exact boundary contract between Python specialist modules and the TypeScript core is not specified. The prompt does not define:
- Whether communication is via MCP, gRPC, IPC, shared filesystem, or something else
- Whether Python modules are separate Nx projects with their own build targets
- How type safety is maintained across the boundary
- What happens when a Python module needs to emit a receipt or interact with guard

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - ChatGPT - Pro-Extended Research.md`, consolidated prompt STACK PREFERENCE section.

## Suggested Action

Define a Python Boundary Contract ADR covering:
1. Communication protocol (MCP preferred? gRPC? IPC?)
2. How Python modules are structured as Nx projects
3. Typed interface requirements at the boundary
4. How receipts and guard decisions flow across the boundary
5. Example: how `python/eval-harness` communicates with `rosetta-schemas`

## Priority
medium

## Status
open
