# rosetta-cli

`rosetta-cli` emits a local bootstrap inspection payload for the current Rosetta prototype.

## Schema Catalog

`buildRosettaCliOutput()` includes a top-level `schemaCatalog` field backed by `@entif-ai/rosetta-schemas`.

This is an inspection surface for handoff and maintainer workflows. It does not promote reserved, fixture-only, or downstream-only catalog entries into runtime support.
