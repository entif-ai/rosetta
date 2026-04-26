# projection-adapters

## Purpose

Exposes constitutional artifacts to external sidecars and shells without giving them ownership of meaning.

## Working Today

- builds read-only OB1 sidecar projections
- builds Prism shadow-memory projections
- builds Mission Control operator-shell projections
- preserves `mutable: false` across all three projection types

## Fixture Status

- executable as projection-contract generation
- not yet connected to live OB1, Prism, or Mission Control runtimes

## Not Yet

- transport layers
- synchronization with external runtimes
- round-trip integration testing against real sidecars

## Roadmap

- connect these projection contracts to actual sidecar/shell integrations after the refinery and cache mature
