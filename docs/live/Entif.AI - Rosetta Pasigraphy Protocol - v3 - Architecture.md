# Architecture

## Mental Model

This repository is a provenance kernel prototype with source-aware bootstrap fixtures.

Think of it as a machine room with a test bench:

- the machine room is real code that canonicalizes, hashes, signs, validates, clusters, and projects artifacts
- the test bench is fixture-backed demo data used to prove the contracts and flows before real upstream adapters exist

## Layer Map

### 1. Rosetta kernel

- `rosetta-canon`
- `rosetta-cid`
- `rosetta-core`
- `rosetta-schemas`
- `rosetta-receipts`
- `rosetta-guard`
- `rosetta-tapestry`
- `rosetta-store`

This layer handles deterministic representation, content identity, tile envelopes, receipt mechanics, lightweight conformance, minimal guard decisions, and in-memory rights-aware storage.

### 2. Source substrate

- `source-substrate`
- `source-registry`

This layer models what kinds of source objects exist and provides the current bootstrap registry/profile dataset for Tier 0 and Tier 1 sources.

### 3. Refinery and cache

- `ingress-refinery`
- `canonical-cache`

This layer turns source-aware fixture inputs into canonical artifacts plus provenance receipts, then clusters those artifacts without prematurely merging broad matches.

### 4. Projection layer

- `projection-adapters`

This layer exposes read-only views for OB1, Prism, and Mission Control without granting them constitutional ownership.

### 5. App surfaces

- `rosetta-cli`
- `rosetta-api`
- `rosetta-operator`

These apps expose the bootstrap slice for local verification and human inspection.

## Dependency Direction

The five layers are ordered from constitutional center to outward-facing surfaces.

- Higher-numbered layers may depend on lower-numbered layers.
- Lower-numbered layers must not depend on higher-numbered layers.
- Sibling-layer coupling should be avoided unless one layer is explicitly acting as a consumer of another layer's published artifacts or types.

In practice, that means:

- the Rosetta kernel is the lowest dependency layer and does not import app or projection concerns
- the source substrate may depend on kernel primitives, but not on refinery, projection, or app code
- the refinery and cache may depend on kernel and source-substrate contracts, but not on projection or app code
- projection adapters may consume source-substrate, refinery, and cache outputs to build read-only views, but they do not become authorities over those layers
- app surfaces may consume any lower layer through stable package APIs, but must not invert ownership by pushing app-specific concerns back into the kernel

## Projection Runtime Boundary

`projection-adapters` are runtime consumers, not just schema-level annotations.

They may read Layer 2 and Layer 3 artifacts in order to project them into OB1, Prism, or Mission Control views. They must do so without mutating source-substrate records, rewriting canonical artifacts, or invoking refinery/cache logic as a side-effecting authority path. The projection contract is therefore:

- read from lower layers
- transform into view-specific output
- never treat the projection surface as the constitutional source of truth

## Constitutional Ownership

"No constitutional ownership" is primarily an architectural and governance rule in this repo.

It means OB1, Prism, Mission Control, and any future projection/app surface may inspect or render Rosetta state, but they are not the authority that defines canonical artifact meaning, provenance, or lifecycle rules. The current repo posture reinforces that rule through package boundaries and read-only projection contracts, but it does not yet claim a universal static-enforcement gate across every possible future integration. Contributors should therefore treat this as:

- a hard architecture rule for package and API design
- a governance rule for future extensions and reviews
- only partially code-enforced today, where read-only adapters and package separation already express the boundary

## What Is Truly Functional

The following are executable mechanics, not just concepts:

- deterministic JSON canonicalization and plain-text normalization
- SHA-256-based content IDs
- tile-envelope construction with stable parent ordering
- tile integrity verification by recomputing canonical form and CID
- receipt creation as typed tiles
- Ed25519 signing and verification of receipt CIDs
- receipt-bundle closure checks against an in-memory store
- lightweight payload validation and conformance bundle emission
- in-memory rights checks for stored tiles
- parse-only guard defaults and explicit allow rules
- source-aware artifact/refinement flow over fixture inputs
- in-memory dedupe/clustering proposals across four lanes
- read-only projections for OB1, Prism, and Mission Control

## What Is Fixture-Backed

The following are real code paths running over staged/bootstrap data:

- the source registry is a curated bootstrap constant set, not live upstream synchronization
- the refinery accepts already-constructed source tiles plus caller-supplied text, rather than fetching and parsing live upstream content
- trust matrices currently use bootstrap values rather than evidence-derived scoring
- CLI and API demo outputs are built from the bootstrap snapshot

This is deliberate. The repo is proving internal contracts before large-scale live acquisition begins.

## What Is Not Yet Implemented

- live source adapters for DataCite, Crossref, OpenAlex, Zenodo, Figshare, Dataverse, SWISSUbase, or DaSCH
- durable cache persistence in Postgres, object storage, or equivalent backing services
- full standards-grade SHACL execution over RDF graphs
- evidence-driven trust scoring and multi-source conflict arbitration
- real OB1 and Prism runtime integration beyond projection contracts
- large-scale corpus ingest

## "Done" Language To Use Carefully

Use these phrases precisely:

- "implemented"
  Means an executable mechanism or validated contract exists in code.
- "modeled"
  Means the shape, type, and tile representation exist, even if live evidence production does not yet.
- "fixture-backed"
  Means the code path is real, but its inputs are bootstrap/demo data rather than live upstream systems.
- "not yet implemented"
  Means the behavior is still conceptual or deferred.

Examples:

- Guard logic is implemented as a minimal rule evaluator.
- Trust-matrix modeling is implemented as a formal data model and tile constructor.
- Live trust evaluation is not yet implemented.
- The refinery flow is implemented for fixture-backed parse-only refinement.
- Live source ingestion is not yet implemented.

## Current Contributor Guidance

- Prefer precise language over optimistic language.
- If a behavior depends on `buildBootstrapDemoSnapshot()`, describe it as fixture-backed.
- If a behavior signs, hashes, validates, clusters, or denies/allows via executable code, it is fair to call that implemented.
- Do not describe source acquisition as "done" until upstream fetch/parsing and persistence are real.
