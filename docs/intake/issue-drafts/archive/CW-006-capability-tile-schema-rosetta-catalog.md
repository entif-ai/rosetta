# CW-006: Capability Tile schema needs Rosetta type catalog entry

**Type:** issue-candidate  
**Confidence:** medium  
**Source:** `docs/chats/20260225 - Chat GPT - Code Wiki integration.md` §1

## Problem

The Code Wiki integration conversation produced a full TypeScript/JSON schema for CapabilityTile (header + CapabilityTilePayload), but this schema has not been entered into Rosetta's type catalog. It may conflict with or need alignment against existing tile type definitions.

## Evidence

Full schema defined: TileHeader (tile_id, tile_type="capability", title, summary, created_at, updated_at, created_by, license, tags, version, prev, supersedes, deprecated) + CapabilityTilePayload (kind, domain, status, maturity_level 0-5, owners, problem_statement, inputs/outputs, side_effects, implementation, quality, adoption, dependencies, interface, ecgg_links, telemetry).

## Required

1. Compare CapabilityTile schema against existing Cognitive Tiles / Swarm Gnosis tile types in Rosetta type catalog
2. Check for naming conflicts (tile_type="capability" vs existing tile types)
3. Align tile_id naming convention with Rosetta's CID/content-addressing scheme
4. Add to Rosetta type catalog with full JSON Schema
5. Write unit tests validating tile_id parsing, version graph (prev/supersedes)

## Notes

- Can proceed immediately; no external dependencies
- Should coordinate with whoever owns the Cognitive Tiles spec
- tile_id format: "cap:{domain}.{name}.v{version}.{capability_name}" needs Rosetta blessing
