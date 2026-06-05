# EP-002: Pack Lifecycle — Creation, Migration, Deprecation Policy

## Issue Summary

The Pack Suite Index establishes pack directories as "first-class repo artifacts" but provides no lifecycle policy — no criteria for pack creation, migration path for schema changes, or deprecation policy for retiring packs. This is a governance gap for an architectural building block.

## Evidence

From `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Extension Packs.md`:
> Status: These pack directories are now first-class repo artifacts.

No lifecycle (creation → migration → deprecation) is specified anywhere in the document.

## Context

- Three pack roots currently exist and are in use
- No criteria are specified for when a new pack root should be created
- No migration path is documented for packs when underlying specs change
- No deprecation policy exists for retiring or archiving a pack
- This is a systemic gap: the pack architecture is established but its governance is not

## Requirements

1. Define pack creation criteria: what justifies a new pack root vs. adding to an existing pack
2. Define pack migration policy: how existing packs are updated when their governing spec changes
3. Define pack deprecation policy: how a pack is retired, archived, or replaced
4. Pack lifecycle should be tracked in the repo (e.g., README within each pack, or a PACK_LIFECYCLE.md)

## Dependencies

- EP-001 (pack manifest schema versioning) — schema versioning is a prerequisite for migration policy

## Labels

- pack-schema
- governance
- docs-intelligence
- lifecycle

## Status

candidate

## Source Document

`docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Extension Packs.md`

## Extraction Reference

`docs/intake/docs-intelligence/2026-06-05-pasigraphy-protocol-v3-extension-packs.md`
