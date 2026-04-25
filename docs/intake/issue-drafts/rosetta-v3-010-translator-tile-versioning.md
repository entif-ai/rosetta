# ROSETTA-v3-010: Translator Tile Versioning Model Ambiguous

**Type:** implementation  
**Priority:** P2  
**Source document:** `docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md`  
**Extraction date:** 2026-04-25  
**Confidence:** high  

## Summary

Translator tiles (rosetta.concept_translator, rosetta.axis_translator) are defined as versioned artifacts, but the versioning model (semantic versioning? CID-based? ULID-based?) is not specified. Without a clear versioning model, migration trigger conditions and compatibility guarantees are undefined.

## Evidence

From § Translator tiles (Pack System Architecture examples):

> Translators often have code (or pointers to code) and are **versioned themselves**.

From § Axis Registry and Matrix versioning:

> If axes evolve or new ones are introduced, **translator tiles map old matrices to new ones**.

## Problem

Ambiguities without a defined versioning model:
1. **Version format:** Is it semver, ULID, CID, or something else?
2. **Compatibility guarantees:** When does a translator declare incompatibility?
3. **Migration trigger:** How does the system know when to apply a translator?
4. **Translator chain:** If multiple translators exist, does the system compose them automatically?

## Recommendation

Specify translator tile versioning:
1. **Version format:** Adopt ULID for translator versions (matches RID format)
2. **Compatibility declaration:** Require each translator to declare source version range and target version
3. **Application trigger:** Specify that translators are applied on read when version mismatch detected
4. **Deprecation:** Define how old translators are marked deprecated

## References

- Core Spine Spec § Translator tiles
- Core Spine Spec § Matrix (ELPQ Matrix)
- Core Spine Spec § Pack Governance (Pack Versioning)

## GitHub Issue

(`rosetta-v3-010-translator-tile-versioning.md` — draft)
