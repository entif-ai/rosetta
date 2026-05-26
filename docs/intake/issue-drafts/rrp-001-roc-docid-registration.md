# RRP-001: Register DocIDs ROCK-3111, ROCK-3111-A, ROCK-3111-B in Rosetta spec index

## Type
docs/spec-gap

## Summary

ROCK-3111, ROCK-3111-A, and ROCK-3111-B DocIDs were assigned inline within a GPT conversation (ROCK-31XX source document) but have never been formally registered in the Rosetta spec index or DocID registry table. Without formal registration, these DocIDs are not verifiable, discoverable by other agents, or enforceable against collision.

## Evidence

Source: `docs/governance/ROCK-31XX - Rosetta Pasigraphy Protocol - Provenance, Receipts, TruthLint - 20260224.md`, lines 1314-1400:
> "Assigned DocID: **ROCK-3111** (RRP Spec), **ROCK-3111-A** (SHACL), **ROCK-3111-B** (Test Vectors)"

These assignments exist only in the chat transcript. They have not been added to any known spec index file such as `PACK_SUITE_INDEX.md`, a DocID registry, or the ROCK-3100 series documentation.

## Scope

1. Identify the canonical location for DocID registration (likely `docs/packs/PACK_SUITE_INDEX.md` or a new `docs/spec-index/DocID_REGISTRY.md`)
2. Add entries for:
   - `ROCK-3111`: Rosetta Receipt Refinement Pack (RRP) v0.1.0 — main specification
   - `ROCK-3111-A`: RRP v0.1 SHACL Profile Set v0.1.0
   - `ROCK-3111-B`: RRP v0.1 Test Vectors v0.1.0
3. For each entry, record: DocID, title, status (draft), date assigned, source document, parent DocID (none — top-level pack spec), normative dependencies
4. Ensure the DocID registry is itself a Rosetta-readable artifact (Markdown + structured header)

## Expected artifact

A new or updated doc under `docs/packs/` or `docs/governance/` (per existing DocID conventions for the ROCK-3xxx series) containing the formal registration entries for all three DocIDs.

## Priority
high — all downstream RRP issue candidates depend on these DocIDs being formally registered before work can advance.

## Labels
- spec
- DocID
- ROCK-3111

## Depends On
None.
