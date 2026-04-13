# rosetta-core

## Purpose

Defines the Rosetta tile envelope and the core artifact constructors used across the repo.

## Working Today

- builds tiles with `kind`, `pack`, `version`, `parents`, `payload`, canonical body, and CID
- verifies tile integrity by recomputing canonical form and CID
- provides constructors for run, action, toolcall, observation, and evaluation tiles

## Fixture Status

- fully executable
- the constructors are generic and reused by fixture-backed flows elsewhere

## Not Yet

- richer parent/causality semantics
- temporal provenance beyond fixed bootstrap timestamps
- stronger schema coupling at the core layer

## Roadmap

- evolve the envelope as Rosetta doctrine hardens
- add richer integrity and provenance assertions where needed
