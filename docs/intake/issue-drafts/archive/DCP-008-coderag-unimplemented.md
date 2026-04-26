# DCP-008: CodeRAG not implemented (pattern injection from existing repos)

**Type:** issue-candidate  
**Confidence:** medium  
**Source:** `docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md` §3

## Problem

CodeRAG (pattern injection from existing repos into code generation) is described as part of DeepCode's Phase 2 but not implemented. It prevents hallucinated boilerplate by injecting real patterns.

## Evidence

"CodeRAG: pulls patterns from existing repos and injects them ONLY when useful to fill in underspecified implementation details." Part of the Code Forge.

## Required

1. Define pattern corpus: which existing repos to seed from? (Rosetta? Entif? VieDay?)
2. Implement pattern extraction: summarize each file into a reusable pattern (purpose, interface, dependencies)
3. Implement relevance scoring: when to inject a pattern? based on what signal?
4. Implement injection: how to insert pattern into generated code (append, prepend, fill-in?)
5. Integrate with Code Forge (DCP-005)

## Notes

- Depends on: DCP-005 (Code Forge)
- Seed with Crates' existing codebase for best relevance
- "Only when useful" is the key constraint to avoid bloat
