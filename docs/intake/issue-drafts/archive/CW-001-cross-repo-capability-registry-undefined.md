# CW-001: Cross-repo CapabilityRegistry is undefined

**Type:** issue-candidate  
**Confidence:** high  
**Source:** `docs/chats/20260225 - Chat GPT - Code Wiki integration.md` §2

## Problem

CodeWiki is strictly repo-scoped. It cannot answer cross-repo questions like "what are all the auth implementations across Entif, VieDay, Mislead.Us, and which is the canonical one?" The system lacks a unified capability registry that aggregates and deduplicates capabilities across all repos.

## Evidence

> "What are all the auth implementations across Entif, VieDay, Mislead.Us, and which is the canonical one?" — Code Wiki is repo-scoped. You want a cross-repo answer.

## Required

1. Define CapabilityRegistry service scope and API
2. Design cross-repo deduplication strategy (by semantic name, not just path)
3. Define capability equivalence/overlap detection (semantic similarity? explicit declares?)
4. Integrate with existing ECGG (Neo4j) or decide on separate PostgreSQL table

## Notes

- Depends on: CW-003 (CodeWikiForge for indexing), CW-002 (structured output format)
- Blocked until Gemini CLI CodeWiki extension ships
- Interim: can seed with hand-authored capability tiles
