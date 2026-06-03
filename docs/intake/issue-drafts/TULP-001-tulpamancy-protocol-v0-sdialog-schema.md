# TULP-001: Tulpamancy Protocol v0 — Adopt SDialog Persona Schema as Starting Spec

## Meta

| Field | Value |
|---|---|
| Status | draft |
| Type | spec-gap |
| Priority | high |
| Area | Tulpamancy Protocol / Persona Engineering |
| Discovered in | `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-01-sdialog-tulpamancy.md` |

## Summary

Tulpamancy Protocol has no formal v0 specification. SDialog's `Persona` model from Idiap maps 1:1 to Tulpamancy's inner-loop concepts and can serve as a pragmatic v0 schema. This lets the team start iterating on persona behavior immediately while a richer Entif-native representation is built underneath.

## Problem Statement

- Tulpamancy Protocol is referenced across multiple docs (OMOC, Entif 2.0, Entif Memory Compiler, ROSETTA v3 Core Spine) but has no explicit specification artifact
- No schema for what constitutes a "Tulpa" (persona) — its required fields, optional fields, versioning strategy, or promotion criteria
- Without a schema, no tooling can be built, no tests can be written, and no interoperability claims can be evaluated
- SDialog provides a ready-made, research-backed `Persona` schema that is substantially aligned with what Tulpamancy wants

## Evidence

From `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md`:

> "Adopt SDialog's `Persona` model as **Tulpamancy v0 spec**. Wrap it in Entif-style tiles / glyphs later when you're ready to: add provenance, attach receipts, connect to ECGG."

SDialog `Persona` model covers:
- `name`, `description`, `style`, `goals`, `constraints`, `archetype`
- Alignment & safety constraints
- Long-running identity fields

Entif-to-SDialog primitive mapping:
- Entif Tulpa ≈ SDialog `Persona`
- Tulpa runtime shell ≈ SDialog `Agent`
- Tulpamancy orchestration layer ≈ SDialog `BaseOrchestrator`
- Simulation episodes ≈ SDialog `Dialog` with `Turn`/`Event` history

## Proposed Resolution

1. Create `docs/RFCs/20260601 - Tulpamancy Protocol v0 (SDialog-Backed) - Spec.md`
2. Adopt SDialog `Persona` schema as v0 with minimal Entif-specific additions:
   - Add `tulpa_id` (stable Entif ID, UUIDv7)
   - Add `source_substrate_ref` (provenance pointer)
   - Add `alignment_constraints` (link to Tripwire profile)
   - Add `authority_scope` (what this tulpa is permitted to do)
3. Specify what SDialog does NOT cover (memory, governance, drift tracking) as known gaps
4. Define the "outer loop" boundary: what is Tulpamancy Protocol beyond the Persona schema
5. Mark ECGG/glyph wrapping as v1 milestone

## Dependencies

- None (can proceed immediately)

## Risks

- SDialog schema may not capture all needed Entif-specific persona fields (mitigate: treat as v0, evolve in v1)
- SDialog research software may have API surface changes (mitigate: pin version in integration ADR)
- Conflating "adopting SDialog schema" with "SDialog is the Tulpamancy implementation" — must remain clear it is a stand-in, not the final form

## Labels

`tulpamancy` `sdialog` `persona-schema` `spec` `v0`

## Related Issues

- TULP-002 (SDialog bridge — depends on having schema to bridge)
- TULP-003 (Tulpa Lab — uses schema)
- TULP-004 (promotion gate — governance on top of schema)
