# TXS-005: Design Tokens StdPack: WCAG 2.2 + WAI-ARIA 1.2 + Design Tokens 2025.10

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `design-tokens`, `wcag`, `wai-aria`, `accessibility`, `stdpacks`
**Depends on:** none

## Problem Statement

ROCK-3003 Standard Packs lists WCAG 2.2, WAI-ARIA 1.2, and W3C Design Tokens (2025.10 stable) as integration standards for accessibility and UI theming. No tile mappings, no semantic anchor definitions, and no cross-device declarative accessibility schema exist. The accessibility layer of Pasigraphy is entirely unimplemented.

## Specific Findings

- **F-TXS-007** (confidence: high): W3C Design Tokens reached first stable version October 2025 — enables declarative cross-tool cross-platform design decisions
- **F-TXS-010** (confidence: high): WCAG 2.2 and WAI-ARIA 1.2 are the accessibility standards stack
- **F-TXS-011** (confidence: high): ROCK-3003 lists all three as aligned standards under Standard Packs

## Action Required

1. Define Pasigraphy tile types for WCAG success criteria — per SC rather than per level (e.g., 1.1.1 Non-text Content as a tile with level A/AA/AAA as properties)
2. Map WAI-ARIA roles, states, and properties to Pasigraphy accessibility tiles
3. Define Pasigraphy design token tile format mapping to W3C Design Tokens spec (token sets, $value, $type, aliases)
4. Specify cross-device declarative accessibility tile schema (web, mobile, desktop)
5. Write JSON Schema for accessibility tiles
6. Define conformance test: a Pasigraphy tile stream is WCAG-valid if all referenced accessibility tiles map to satisfied SC
