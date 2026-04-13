# ingress-refinery

## Purpose

Turns source-aware inputs into canonical artifacts plus linked provenance receipts.

## Working Today

- creates parse-only ingress jobs
- normalizes supplied text
- generates fetch, normalization, and evaluation receipts
- builds canonical artifacts with PID, rights, and dedupe metadata
- emits a bootstrap demo snapshot stitching the whole flow together

## Fixture Status

- the mechanics are executable
- the current flow is fixture-backed because records, manifestations, and raw text are supplied locally rather than fetched from live sources

## Not Yet

- live upstream fetching
- HTML/PDF/document parsing
- durable job orchestration
- revision and correction polling against real sources

## Roadmap

- replace bootstrap inputs with real source adapters while preserving the existing contract surface
