# rosetta-api

`rosetta-api` exposes bootstrap inspection endpoints for the current Rosetta prototype.

## Routes

- `GET /health`: service health.
- `GET /registry`: fixture-backed bootstrap source registry.
- `GET /demo`: bootstrap provenance demo snapshot.
- `GET /schemas`: schema catalog inspection endpoint backed by `@entif-ai/rosetta-schemas`.

`/schemas` is not a runtime validation, mutation, or message-handling endpoint. It preserves catalog `exposureStatus` values so reserved, fixture-only, and downstream-only schemas remain visibly non-operational.
