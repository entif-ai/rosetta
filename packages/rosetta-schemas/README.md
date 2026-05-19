# rosetta-schemas

## Purpose

Provides lightweight payload validation and conformance bundle emission for current tile kinds.

## Working Today

- validates required fields for supported tile kinds
- emits SHACL-like Turtle text describing those required fields
- emits conformance bundles summarizing conforming versus violating tiles
- exposes the internal Agentic Messaging schema registry and mailroom validation mapping
- exports a package-local schema catalog for maintainer and inspection workflows

## Schema Catalog

- Machine-readable source: `src/lib/schema-catalog.ts`
- Human authority map: `docs/schema-authority-map.md`
- Main exports:
  - `ROSETTA_SCHEMA_CATALOG`
  - `listSchemaCatalogEntries()`
  - `getSchemaCatalogEntry(schemaId)`
  - `validateSchemaCatalogCoverage()`
- Each catalog entry records `schemaId`, family, authority tier, exposure status, owner package, validator or entrypoint, tests, docs, source issues and PRs, RFC/PRD anchors, consumer packages, boundary kind, and known gaps.

Authority tiers keep ownership visible:

- `core-spine`
- `governance-admission`
- `source-ingest`
- `memory-context-cache`
- `projection-product-ops`

Exposure statuses prevent schema existence from masquerading as runtime support:

- `package-internal`
- `downstream-contract`
- `fixture-only`
- `reserved-interface`
- `api-visible`
- `cli-visible`
- `demo-visible`
- `deprecated`

When adding a schema family, add or update a catalog entry in the same change. Non-reserved entries must cite at least one test and doc reference, and the test suite checks that every supported tile-kind validator plus every registered Agentic Messaging profile appears in the catalog.

## Agentic Messaging Registry

- Normative location: `packages/rosetta-schemas/src/lib/rosetta-schemas.ts`
- Envelope schema: `entif.agentic-messaging.envelope.v1`
- Message-family schema IDs:
  - `TASK_RECEIPT`
  - `INCIDENT_ENVELOPE`
  - `WORK_UNIT_UPDATE`
  - `ARTIFACT_PUBLISH`
  - `HEALTH_REPORT`
  - `ACTION_REQUEST`
  - `ACTION_DECISION`
  - `APPROVAL_REQUEST`
  - `APPROVAL_RESPONSE`
- `domain_ref` is treated as a nested component owned by issue `#711`; the registry consumes that shape rather than redefining it.
- The mailroom mapping is deterministic: `msg_type -> schema_id -> validation result -> quarantine reason`.
- First-wave mailroom size policy:
  - `AGENTIC_MESSAGE_SIZE_POLICY.defaultMaxMessageBytes` is `1_048_576` bytes.
  - `evaluateAgenticMessageSizePolicy()` runs at `size-enforce`, before schema and plane enforcement.
  - Oversized messages quarantine with `MESSAGE_SIZE_EXCEEDED` and `MESSAGE_SIZE_LIMIT_EXCEEDED` evidence.
  - `ARTIFACT_PUBLISH` stays reference-only; inline artifact body fields quarantine as a size/payload-shape violation.
- Migration posture:
  - additive changes stay minor-compatible
  - breaking changes require a new schema ID / major lane
  - readers should tolerate the current and previous major during rollout
- Scope boundary:
  - this registry covers internal Agentic Messaging only
  - issue `#1047` remains the external peer-agent interop lane
  - issues `#706`, `#1029`, `#718`, and `#946` are downstream consumers of this registry surface

## Plane Enforcement

- Issue `#706` adds the anti-spoofing admission contract on top of the `#220` registry surface.
- Data-plane families remain non-executable:
  - executor disposition is `data-plane-no-side-effects`
  - imperative-looking text does not promote a data-plane payload into privileged execution
  - hidden capability selectors, `iam.decision` refs, approval handles, or equivalent control bindings are quarantined as spoof attempts
- Control-plane admission reuses the `domain_ref` comparison from `#711` rather than inventing a second domain-boundary rule.
- Decision semantics stay delegated:
  - `#630` owns the shared `iam.decision` artifact contract
  - `#1029` owns the Guard decision request/validation handshake
  - this package only decides whether a message is structurally eligible for data-plane routing, control-plane review, or quarantine

## Fixture Status

- executable
- lightweight by design

## Not Yet

- full SHACL execution
- RDF graph materialization
- standards-grade ontology validation

## Roadmap

- replace or augment the current required-field validator with real SHACL/RDF tooling when the MVP needs it
