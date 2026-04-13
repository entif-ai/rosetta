# Service Inventory

## Apps

- `rosetta-cli`
  - Emits a source-aware bootstrap demo with receipts, cache artifact, and sidecar projections
- `rosetta-api`
  - Exposes `/health`, `/registry`, and `/demo` for local inspection
- `rosetta-operator`
  - Reserved for future operator-shell evaluation

## Packages

- `rosetta-canon`
  - Canonical JSON and text normalization helpers
- `rosetta-cid`
  - SHA-256 digests and content id helpers
- `rosetta-core`
  - Tile envelope and core Rosetta primitive builders
- `rosetta-schemas`
  - Required-field validation and simple SHACL-like shape emission
- `rosetta-receipts`
  - Receipt creation, signing, bundle assembly, and verification
- `rosetta-tapestry`
  - Receipt bundle tapestry compilation
- `rosetta-store`
  - Rights-aware in-memory tile store
- `rosetta-guard`
  - Guard decision token evaluation helper
- `source-substrate`
  - Source system, record, manifestation, package, trust, and correction modeling
- `source-registry`
  - Tiered bootstrap registry for infrastructure and repository sources
- `ingress-refinery`
  - Parse-only ingress job creation and canonical artifact promotion
- `canonical-cache`
  - Four-layer dedupe clustering and lifecycle event retention
- `projection-adapters`
  - Read-only projections for OB1, Prism, and Mission Control
