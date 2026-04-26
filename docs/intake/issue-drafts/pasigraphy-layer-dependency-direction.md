# Issue Draft: Clarify Layer Dependency Direction Rules Across Rosetta's Five Layers

## Metadata

- **Source document:** `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md`
- **Extraction date:** 2026-04-25
- **Finding type:** `open-question` / `issue-candidate`
- **Tags:** `architecture`, `runtime-ingestion`

## Problem Statement

The Pasigraphy Protocol v3 Architecture document establishes five layers but never specifies whether dependency direction is upward-only, and whether Layer 4 (projection-adapters) depends on Layer 2 (source-substrate) at runtime or only at the schema level.

The document says projections are "read-only views" and that consumers have "no constitutional ownership," but does not clarify:
- Whether this is a technical constraint (enforced in code), an architectural convention, or a governance policy
- Whether projections can call into source-substrate at runtime
- What the formal rule is for which layer may depend on which other layer

## Why This Matters

Without explicit dependency direction rules, contributors may accidentally create coupling between layers that violates the constitutional separation described in the architecture. This could lead to:
- Layer 4 projections that reach back into Layer 2, breaking the read-only contract
- Unintended coupling between Layer 3 and Layer 2 that makes it hard to evolve source models independently
- Ambiguity about what "constitutional ownership" means in practice for contributors

## Evidence

> "This layer exposes read-only views for OB1, Prism, and Mission Control without granting them constitutional ownership." — Layer Map / Layer 4

> No explicit dependency-direction rule appears in the document.

## Proposed Resolution

1. Add a "Dependency Direction" subsection to the Layer Map section stating the architectural convention (e.g., layers may only depend on layers below them)
2. Explicitly state whether projections depend on source-substrate at runtime or only at schema/type level
3. Clarify whether "no constitutional ownership" is a code-enforced constraint, a convention, or a governance policy

## Labels

`architecture`, `governance`, `needs-clarification`
