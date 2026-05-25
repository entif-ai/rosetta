# source-substrate

## Purpose

Defines the source-aware artifact model used by the repository.

## Working Today

- models source-system profiles, records, manifestations, packages, trust matrices, and correction events
- models bounded acquisition listing snapshots as `source.package` artifacts distinct from source records and manifestations
- emits each of those as Rosetta tiles

## Fixture Status

- executable as a modeling layer
- values are currently populated by bootstrap fixtures elsewhere
- bounded listing snapshots preserve scope, pagination/truncation signals, discovered record refs, and replay posture

## Not Yet

- live identity resolution
- evidence-derived trust scoring
- source-specific lifecycle watchers

## Roadmap

- keep expanding the model as live adapters, corrections, and rights handling become real
