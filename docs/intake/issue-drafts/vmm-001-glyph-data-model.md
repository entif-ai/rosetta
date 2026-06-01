# Issue Draft: VM-001 — Glyph Data Model Needs Formal Schema and Rosetta Alignment

## Metadata

| Field | Value |
|---|---|
| Issue ID | VM-001 |
| Type | data-model |
| Status | draft |
| Source doc | docs/ideas/Entif Viral Media Mirror Systems Diagram.md |
| Extraction date | 2026-06-01 |
| Confidence | medium |

## Problem

The Viral Media Mirror (VMM) pipeline defines "Glyph" as its core semantic unit:

> "Glyph: id, type, canonical label, attributes, relations, modality, provenance, timestamps."

No formal schema is provided, no data type specifications, and critically — no alignment with Rosetta's existing `glyph` or `cognitive-tile` concepts found in the Cognitive Tapestries via Semantic Latticing spec, the Pasigraphy Protocol v3, or the ROCK family.

The Glyph is the fundamental unit of semantic parsing in VMM. If it is incompatible with or duplicative of Rosetta glyph definitions, two separate incompatible glyph systems will emerge.

## Evidence

**VMM source:** Core Data Objects section:
```
Glyph: id, type, canonical label, attributes, relations, 
modality, provenance, timestamps.
```

**Rosetta cognitive tiles:** Found in multiple specs (Cognitive Tapestries PRD, Pasigraphy Protocol v3, ROCK-3111-C RRP):
- Cognitive Tile: portable semantic artifact with provenance, type, and content
- Semantic Glyph Engine in VMM emits glyphs with: entity, action, motif, style
- These map loosely but not identically to the tile/glyph concepts in Rosetta

**Cross-doc glyph mentions:**
- `cognitive-tiles` — Cognitive Tapestries spec
- `pasigraphy` — Pasigraphy Protocol v3 uses "glyph" terminology  
- No canonical Glyph schema cross-reference in the Concept Index

## Alignment Gap Analysis

| Glyph field (VMM) | Rosetta equivalent | Gap |
|---|---|---|
| id | tile-id / content-address | No Rosetta canonical glyph id scheme defined |
| type | tile category? | No type taxonomy defined |
| canonical label | text-core slug? | No mapping to Egc slug system |
| attributes | provenance metadata? | No schema |
| relations | relation types in graph? | Untyped relations vs typed relation schema |
| modality | multi-modal tag? | Not present in Rosetta tile schema |
| provenance | RRP receipts? | No receipt chain specified |
| timestamps | temporal indexing? | No temporal plane reference |

## Recommendation

1. Determine if VMM glyphs and Rosetta tiles are the same concept with different names
2. If yes: adopt one as canonical, file a supersession issue for the other
3. If no: define explicit interface boundary between the two systems
4. Produce a unified GlyphSchema that satisfies both use cases
5. Add to memory-planes or provenance plane as first-class protocol domain

## Labels

- data-model
- glyph
- semantic-unit
- alignment-required

## Depends On

(None — this is a foundational issue that other VMM issues may depend on)
