# rosetta-schemas Schema Authority Map

`packages/rosetta-schemas/src/lib/schema-catalog.ts` is the package-local machine-readable catalog for schema families, validators, boundary contracts, consumers, tests, docs, and known gaps.

## Authority Tiers

- `core-spine`: Rosetta run/action/tool/observation/evaluation/receipt and conformance mechanics.
- `governance-admission`: Guard, domain, IAM reference, mailroom, and execution-admission boundaries.
- `source-ingest`: source-substrate and ingress-refinery artifacts.
- `memory-context-cache`: context, intake, digest, composition, and failure-learning artifacts.
- `projection-product-ops`: projection, tapestry, translation, and operator-facing artifacts.

## Exposure Statuses

- `package-internal`: maintained inside `rosetta-schemas` and not yet promised as an app surface.
- `downstream-contract`: consumed by Guard, mailroom, API, CLI, or other package boundaries.
- `fixture-only`: executable over bootstrap fixtures, not live upstream acquisition.
- `reserved-interface`: named to keep ownership clear, but not implemented or operational here.
- `api-visible`, `cli-visible`, and `demo-visible`: reserved for inspection surfaces once app layers expose the catalog.
- `deprecated`: retained for historical compatibility only.

## Boundary Rules

- `domain_ref` is consumed as a nested component and compared structurally here; broader domain-policy ownership stays with its source issue.
- `iam.decision` references are cataloged as a reserved external contract, not redefined.
- Guard request/validation and mailroom runtime custody are downstream consumer boundaries.
- Agentic Messaging execution admission only classifies structural eligibility for routing, review, or quarantine. It does not execute privileged actions.

## Maintenance Rule

When adding a schema family or validator, update `schema-catalog.ts` with source issue, tests, docs, RFC/PRD anchors, consumers, exposure status, and known gaps. The catalog tests intentionally fail when supported tile kinds or registered Agentic Messaging profiles are invisible.
