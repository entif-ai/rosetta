# Issue Draft: Define Transition Criteria for Moving Trust Matrices from Bootstrap Values to Evidence-Driven Scoring

## Metadata

- **Source document:** `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md`
- **Extraction date:** 2026-04-25
- **Finding type:** `open-question` / `issue-candidate`
- **Tags:** `runtime-ingestion`, `governance`

## Problem Statement

The architecture document explicitly states that trust matrices currently use bootstrap values rather than evidence-derived scoring. This is a deliberate and appropriate choice for the bootstrap phase. However, no criteria, milestones, or triggers are defined for when the project should transition from bootstrap trust values to real evidence-driven scoring.

Without defined transition criteria, the team risks:
- Leaving trust scoring in bootstrap mode indefinitely (drift)
- Having no clear definition of done for the trust scoring workstream
- Lacking a shared understanding of what "evidence-driven" means operationally

## Evidence

> "trust matrices currently use bootstrap values rather than evidence-derived scoring" — What Is Fixture-Backed

## Proposed Resolution

1. Define what constitutes sufficient "evidence" for evidence-driven scoring (e.g., N sources ingested, conflict events observed, time-on-stack threshold)
2. Add a "Trust Scoring Migration" section to the architecture doc that defines the transition criteria
3. Add a corresponding entry to the project board / backlog as a defined future milestone with acceptance criteria

## Labels

`runtime-ingestion`, `trust-scoring`, `milestone`, `needs-acceptance-criteria`
