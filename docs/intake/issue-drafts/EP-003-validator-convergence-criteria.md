# EP-003: Validator Convergence Criteria — Coverage Target and CI Gates

## Issue Summary

The Pack Suite Index states as a forward goal: "Future slices should increase machine validation coverage so pack files and runtime validators converge further." No coverage target, metrics, or CI gates are defined. This is a direction signal, not a specification.

## Evidence

From `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Extension Packs.md`:
> Status: Future slices should increase machine validation coverage so pack files and runtime validators converge further.

No quantitative target, no acceptance criteria, no CI gate definition.

## Context

- SHACL shapes are explicitly "starter" quality in the RRP pack
- "Validator convergence" implies two systems: pack file validators and runtime validators
- No coverage metrics are defined: percentage of constraints validated? Specific constraint types?
- No CI gate is specified: what fails the build?
- This goal is blocked by: (1) SHACL coverage target definition, (2) runtime validator implementation

## Requirements

1. Define validation coverage target: what percentage of pack constraints must be machine-validated?
2. Specify which constraint types must have runtime validators (receipts, source-substrate, taxonomy)
3. Define CI gate: what validation failure blocks a PR merge?
4. Distinguish "starter SHACL shapes" from "production-grade SHACL shapes" with explicit criteria
5. Define what "convergence" means: identical validation results between pack file and runtime validator?

## Dependencies

- EP-001 (pack manifest schema versioning) — schema versioning is needed before convergence criteria
- DI-011 (Source Substrate as protocol domain) — runtime validators for source-substrate depend on DI-011 resolution

## Labels

- pack-schema
- validation
- ci
- docs-intelligence
- shacl

## Status

candidate

## Source Document

`docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Extension Packs.md`

## Extraction Reference

`docs/intake/docs-intelligence/2026-06-05-pasigraphy-protocol-v3-extension-packs.md`
