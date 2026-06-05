# Issue Draft: LLM-API-CACHE-002 — Stable-Prefix Composition Doctrine Needs Formal Spec

**Type:** architecture
**Confidence:** high
**Extraction source:** `docs/chats/20260411 - Chat GPT - LLM API Cache Management.md`
**Extraction date:** 2026-06-05

## Problem Statement

The "stable-prefix composition doctrine" — normalizing reusable prompt components into a stable prefix, appending volatile components last — is discussed in the LLM API cache management dialogue but is not formally specified anywhere in the Rosetta/Entif spec corpus. This is a prerequisite for exploiting provider prefix caching and achieving the 50-90% cost reduction described in the dialogue.

## Evidence

- "Normalize first. Fingerprint the shard. Assign it to a cache domain. Place stable packs first. Append volatile ask last." (source: 20260411 chat)
- Four-layer composition: global pack (invariant instructions) → domain pack (policy/handbook/knowledge) → task pack (workflow class) → user tail (volatile ask) (source: 20260411 chat)
- "up to 90% lower cached input token cost" via repeated-prefix caching (source: 20260411 chat, citing OpenAI docs)

## Proposed Resolution

1. Formalize stable-prefix composition in the context compiler section of NOT LAME PRD
2. Define the four-layer composition model with concrete examples
3. Specify deterministic ordering requirements: "If the 'same' front matter gets reordered, lightly reformatted, or salted with incidental seat-specific junk, you torch cache hits."
4. Add enforcement in context compiler: ordering validation, stable vs. volatile component classification
5. Add telemetry: track cache hit rate by layer, report uncached input token reduction

## Labels

cache-strategy, context-compiler, prefix-composition, docs-intelligence

## Depends On

NOT LAME PRD (context compiler section)
