# EP-001: Pack Manifest Schema — Versioning and Backwards-Compatibility

## Issue Summary

The pack manifest schema contract exists at `packs/_schemas/pack-manifest.schema.json` but no versioning strategy or backwards-compatibility guarantees are documented. This is a spec-gap for an artifact that is explicitly designated as a "first-class repo artifact."

## Evidence

From `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Extension Packs.md`:
> Schema Contract: `packs/_schemas/pack-manifest.schema.json`

No version field, no changelog, no backwards-compatibility policy present in the document.

## Context

- The pack manifest schema is the contract governing how pack manifests are structured
- Three pack roots currently exist: `packs/rrp`, `packs/stdpack-source-substrate`, `packs/vocabpack-source-taxonomy`
- ROCK-3111-C extraction noted "RRP placeholder pack_id" as an open issue (part of RRP pack_id governance)
- If the schema evolves without a versioning policy, existing packs may silently become invalid or incompatible

## Requirements

1. `pack-manifest.schema.json` must include a `version` field (e.g., semver)
2. Schema must define backwards-compatibility guarantees: which changes are breaking vs non-breaking
3. Migration path must be documented for existing packs when schema changes
4. Pack manifest schema should be registered in the KNOWLEDGE_GRAPH as a known schema

## Dependencies

- ROCK-3111-C (RRP Pack Filesystem Contract v0.2.0) — RRP pack has the most mature manifest usage

## Labels

- pack-schema
- rock-3111-c
- docs-intelligence
- schema
- versioning

## Status

candidate

## Source Document

`docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Extension Packs.md`

## Extraction Reference

`docs/intake/docs-intelligence/2026-06-05-pasigraphy-protocol-v3-extension-packs.md`
