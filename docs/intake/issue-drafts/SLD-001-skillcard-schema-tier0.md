# SLD-001: SkillCard Schema — Tier 0 ~100-Token Metadata Stub

## Meta

- **Drafted:** 2026-04-25
- **Source:** docs/chats/20260323 - Chat GPT - Entif Skill Library Design.md
- **Extraction:** 2026-04-25-skill-library-design.md (Finding 2)
- **Confidence:** HIGH
- **Labels:** skills, skillcard, tier-0, progressive-disclosure, schema, broker

## Summary

Define and implement the SkillCard as the Tier 0 metadata stub (~100 tokens max) that the skill broker indexes and returns. This is the foundational data structure for the entire skill library. Every other component — broker retrieval, extend/author policy, telemetry — depends on this schema being correct and constrained.

## Problem Statement

Entif needs a compact, deterministic, broker-friendly metadata stub per skill. The broker must be able to return 10–30 SkillCards without context-window pain. The SkillCard must carry enough information for the broker to make a first-pass relevance decision, and enough risk/risk_class information for the Guard to do a fast pre-authorization check.

The SkillCard must fit within ~100 tokens (or a hard byte limit) to preserve the progressive disclosure token economy that makes a 100k-skill library feasible.

## Proposed Specification

### SkillCard Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Content-addressed CID or hash (immutable, version-keyed) |
| `name` | string | Short, slash-command friendly (e.g., `yt_transcript_ingest`) |
| `one_line` | string | <= 140 chars, describes what the skill does |
| `triggers` | string[] | 3–8 keywords or EGC glyph tags for broker matching |
| `io` | string | 1-line: inputs → outputs (e.g., `urls[] → transcript_tiles + provenance`) |
| `risk_class` | enum | `read_only \| write_local \| write_external \| financial \| identity \| admin` |
| `tool_scopes` | string[] | Allowlisted tool families (e.g., `["net.http", "fs.write_scoped"]`) |
| `version` | string | Semver (e.g., `0.1.0`) |
| `provenance` | object | `{ origin: string, trust_score: number }` — source + trust rating |

### Example SkillCard

```yaml
id: "Qm...abc123"  # CID
name: "yt_transcript_ingest"
one_line: "Ingest YouTube transcripts (captions-first, ASR fallback), store provenance + receipts."
triggers: ["youtube", "transcript", "yt-dlp", "captions", "ingest"]
io: "urls[] -> transcript_tiles + provenance"
risk_class: "write_local"
tool_scopes: ["net.http", "fs.write_scoped", "proc.exec_sandbox"]
version: "0.1.0"
provenance:
  origin: "anthropics/skills/yt_transcript"
  trust_score: 0.95
```

### Hard Constraints

1. **Byte budget:** SkillCard MUST be ≤ ~100 tokens. Broker must enforce this at ingestion time (static lint phase).
2. **`id` immutability:** Changing the skill content changes the ID (content addressing). Old ID → new version.
3. **`risk_class` completeness:** Every skill MUST declare a risk_class. No default. No null.
4. **`tool_scopes` allowlist:** Only allowlisted tool families. No wildcard unless explicitly approved by Guard.

## Acceptance Criteria

- [ ] SkillCard schema is defined as a TypeScript interface or equivalent type-safe schema
- [ ] Broker enforces byte-budget at ingestion time (rejects cards exceeding ~100 token limit)
- [ ] `risk_class` is an exhaustive enum with all 6 values
- [ ] `id` is generated via content hash (SHA-256 or equivalent) of the canonical skill content
- [ ] SkillCard is serializable to JSON/YAML for storage in graph, vector, and SQL stores
- [ ] SkillCard supports migration from Anthropic SKILL.md frontmatter (field mapping documented)

## Implementation Notes

- The SkillCard is NOT the same as the full SKILL.md. SKILL.md is Tier 1 (loaded on-demand). SkillCard is Tier 0 (always available to broker).
- SkillCard should be stored in all three storage layers: SQL (for fast faceting), Vector (for similarity search on `one_line + triggers`), Graph (for dependency/conflict edges).
- The `provenance.trust_score` is derived from the vetting pipeline output (SLD-006).

## Dependencies

- SLD-006 (vetting pipeline must produce trust_score)
- SLD-008 (safety: Guard must enforce risk_class at admission time)

## Status

issue-candidate
