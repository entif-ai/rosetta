# source-registry

## Purpose

Provides the bootstrap registry and profile dataset for the initial Tier 0 and Tier 1 sources.

## Working Today

- ships curated source-system profiles
- ships curated registry entries with trust class and priority tier
- includes a first-wave GitHub source-system profile for bounded repository text acquisition
- clones those fixtures for safe read use
- emits registry-entry tiles

## Fixture Status

- fixture-backed by design
- no live synchronization with upstream registries yet

## Not Yet

- fetchers for DataCite, Crossref, ORCID, ROR, OpenAlex, GitHub, or repository registries
- registry drift detection
- provenance receipts for registry refreshes

## Roadmap

- replace static bootstrap constants with refreshable source registry acquisition lanes
