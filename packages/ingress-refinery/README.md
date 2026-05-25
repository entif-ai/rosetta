# ingress-refinery

## Purpose

Turns source-aware inputs into canonical artifacts plus linked provenance receipts.

## Working Today

- creates parse-only ingress jobs
- normalizes supplied text
- generates fetch, normalization, and evaluation receipts
- builds canonical artifacts with PID, rights, and dedupe metadata
- threads bounded listing-snapshot package lineage through episodes, receipts, and canonical-artifact provenance
- provides a narrow GitHub text acquisition API for pinned markdown/plain-text blobs using injected fixture/local/live payloads
- emits a bootstrap demo snapshot stitching the whole flow together

## Fixture Status

- the mechanics are executable
- the current GitHub adapter boundary is executable with deterministic supplied payloads
- network-backed upstream fetch clients remain outside this package for now

## Not Yet

- built-in network fetch clients for upstream APIs
- HTML/PDF/document parsing
- durable job orchestration
- revision and correction polling against real sources

## Roadmap

- replace bootstrap inputs with real source adapters while preserving the existing contract surface
