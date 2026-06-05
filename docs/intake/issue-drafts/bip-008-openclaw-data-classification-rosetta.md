# BIP-008: OpenClaw Data Classification Tiers for Rosetta

## Type
architecture

## Summary

OpenClaw's AGENTS.md defines a three-tier data classification system (Confidential/Internal/Restricted) with context-aware enforcement — different behavior rules depending on whether the agent operates in a private DM, group chat, or public channel. Rosetta currently lacks an explicit data classification tier system. The anti-personhood-correlation constraint (DI-012) covers a narrow prohibition but not general classification. This gap should be evaluated against Rosetta's actual data handling requirements.

## Evidence

**OpenClaw data classification tiers (from docs/external/Berman-all_files.md, AGENTS.md):**
- **Confidential** (private/DM only): Financial figures, CRM contact details, deal values, contract terms, daily notes, personal email addresses
- **Internal** (group chats OK, no external sharing): Strategic notes, council recommendations, tool outputs, KB content, project tasks, system health
- **Restricted** (external only with explicit approval): General knowledge responses; everything else requires "share this" confirmation

**OpenClaw context-aware enforcement rules:**
- In group chats: no daily notes, no CRM contact details, no financial data, no personal emails
- "When context type is ambiguous, default to the more restrictive tier"

**Rosetta's current data handling:**
- Receipts and artifacts are marked with provenance and access scope, but not with classification tier
- Memory planes have authority claims but not classification tiers
- Anti-personhood-correlation (DI-012) prohibits identity correlation but doesn't classify data broadly

## Finding

No explicit data classification tier system exists in Rosetta's current specs. The closest concepts are:
- Memory sovereignty map (5 layers) — covers storage topology, not classification
- Anti-personhood-correlation constraint — narrow prohibition, not broad classification
- Constitutional layer (Git-backed) — covers authority, not confidentiality

## Options

1. **Adopt three-tier classification**: Add Confidential/Internal/Restricted tiers to Rosetta's constitutional layer. Enforce at the observer/receipt delivery boundary. Map to memory plane authority levels.

2. **Extend anti-personhood-correlation**: The existing DI-012 constraint is narrower (identity correlation only). Extend it to a broader classification framework that covers financial, identity, and provenance data.

3. **No formal classification — rely on provenance/authority**: Rosetta's content-addressed receipts already carry provenance and access scope. Classification could be derived from these attributes rather than explicit tier labels.

4. **Supersede: Not applicable to Rosetta's architecture**: Rosetta's provenance-first model makes classification redundant — every artifact carries its source, rights scope, and trust level, which is more expressive than static tiers.

## Recommendation

Option 4 is architecturally plausible: content-addressed artifacts with explicit provenance and rights scope carry more information than static classification tiers. However, option 1 should be evaluated for the observer/receipt delivery surface specifically — when Rosetta delivers receipts to external channels (Telegram, Slack, Discord), a classification tier on the delivery envelope would enable context-aware surfacing similar to OpenClaw's approach.

**Labels:** security, data-classification, architecture

**Status:** open

**Created:** 2026-06-05

**Source:** docs/external/Berman-all_files.md (OpenClaw System Prompt File Templates, Berman extraction, 2026-06-05)

**Related:** DI-012 (anti-personhood-correlation constraint), memory-sovereignty-map (5 layers)