# rosetta-cli

`rosetta-cli` is the current local inspection workbench for the Rosetta prototype.

## Authority and scope

- Rosetta semantic and protocol meaning comes from [`../../docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md`](../../docs/RFCs/Rosetta%20v3.0.0%20Core%20Spine%20Specification.md).
- Workbench and clone-to-insight practice comes from [`../../docs/governance/genesis/RESEARCH_AND_INTEROPERABILITY.md`](../../docs/governance/genesis/RESEARCH_AND_INTEROPERABILITY.md).
- Terminology must follow [`../../docs/governance/genesis/SEMANTIC_ALIGNMENT.md`](../../docs/governance/genesis/SEMANTIC_ALIGNMENT.md).

The CLI is a reference-implementation and research surface. It does not become the semantic authority when code and the Core Spine differ.

## Working today

Running the compiled CLI with no arguments emits the current fixture-backed bootstrap inspection payload, including:

- canonical source and artifact data;
- Guard/bootstrap gate status;
- receipt-bundle verification;
- signed Receipt verification;
- read-only projection snapshots;
- schema-catalog inspection.

The output is useful for maintainers and demonstrations. It is not evidence of live source ingestion, durable production storage, full standards conformance, or general interoperability.

## Researcher path

From the repository root:

```bash
pnpm install --frozen-lockfile
pnpm run sync
pnpm run demo
```

A stronger clone-to-insight experience should progressively allow a researcher to:

1. run one bounded real or fixture-backed path;
2. inspect emitted Rosetta artifacts;
3. trace lineage/provenance;
4. verify a meaningful property;
5. tamper with a fixture or artifact;
6. observe an intelligible failure.

Commands should be added only when backed by real implemented behavior, tests, and accurate documentation.

## Schema catalog

`buildRosettaCliOutput()` includes a top-level `schemaCatalog` field backed by `@entif-ai/rosetta-schemas`.

This is an inspection surface for handoff and maintainer workflows. It does not promote reserved, fixture-only, provisional-extension, or downstream-only catalog entries into runtime support or Rosetta core semantics.

## Validation

```bash
pnpm exec nx run rosetta-cli:lint
pnpm exec nx run rosetta-cli:typecheck
pnpm exec nx run rosetta-cli:test
pnpm exec nx run rosetta-cli:build
pnpm run governance:semantic
```
