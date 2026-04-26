# rosetta-schemas

## Purpose

Provides lightweight payload validation and conformance bundle emission for current tile kinds.

## Working Today

- validates required fields for supported tile kinds
- emits SHACL-like Turtle text describing those required fields
- emits conformance bundles summarizing conforming versus violating tiles

## Fixture Status

- executable
- lightweight by design

## Not Yet

- full SHACL execution
- RDF graph materialization
- standards-grade ontology validation

## Roadmap

- replace or augment the current required-field validator with real SHACL/RDF tooling when the MVP needs it
