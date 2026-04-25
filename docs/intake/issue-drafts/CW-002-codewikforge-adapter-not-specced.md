# CW-002: CodeWikiForge adapter not specced

**Type:** issue-candidate  
**Confidence:** high  
**Source:** `docs/chats/20260225 - Chat GPT - Code Wiki integration.md` §3.1

## Problem

The CodeWikiForge adapter (proposed in the Code Wiki integration conversation) is described conceptually but has no spec, interface definition, or implementation. It is the critical bridge between Google's CodeWiki and Entif's internal schema.

## Evidence

> "Add a CodeWikiForge adapter that knows how to: call the Gemini CLI extension for a repo, fetch structured outputs (summaries, diagrams, section indices), normalize that into Entif's internal schema (tiles / glyphs / capability nodes)"

## Required

1. Define CodeWikiForge adapter interface (what it calls, what it emits)
2. Define trigger strategy (on-commit hook? scheduled? manual?)
3. Design normalization: CodeWiki output → CapabilityTile schema
4. Handle the unknown structured output format (CW-003)

## Notes

- Blocked by: CW-003 (structured output format unknown)
- Depends on: Capability Tile schema (CW-006)
