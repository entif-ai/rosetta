# ENTIF-v0-007: Memory Tier Transition Rules (Hot/Warm/Cool/Cold) Not Specified

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-007 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #16 in ledger |
| Confidence | `medium` |
| Depends On | `ENTIF-v0-006` |

---

## Problem Statement

The spec defines memory tiering:

> Hot: working memory / in-context ephemeral
> Warm: short-to-mid retention with full fidelity objects
> Cool: longer retention with downsampled/compacted representations
> Cold: archive / gist-level summaries and graph edges only

**But the promotion/demotion rules between tiers are not specified.** What conditions trigger moving an engram from Warm to Cool? What transformation (compaction, gist summarization) occurs on demotion? Without explicit tier-transition rules, memory tiering is a label without a mechanism.

---

## Evidence

The spec describes tiers qualitatively. The engram schema includes `ttl_policy.class: warm`, `soft_ttl_days: 90`, `hard_ttl_days: 365` — but these are TTL-based, not activation-based. The ACT-R mechanism provides activation scoring but no tier-transition thresholds are defined.

No transition rule table exists in the document.

---

## Impact

- Engrams will not automatically demote/promote; the tier system cannot self-maintain
- Cool/Cold tier (downsampled representations) requires a compaction algorithm that is not specified
- Hard TTL expiry behavior is undefined (delete? archive? convert to gist?)

---

## Dependencies

- `ENTIF-v0-006` (ACT-R parameterization must exist before tier-transition rules based on activation can be defined)

---

## Suggested Resolution

1. Define transition thresholds: base_level >= X → promote toward Hot; base_level <= Y → demote toward Cold; hard TTL expiry → force demote to Cold or delete
2. Define transformation on demotion: Warm→Cool = generate gist summary (via LLM or extractive); Cool→Cold = replace full content with edge-only graph node (no text)
3. Define promotion behavior: Cold→Cool = restore from archive (if available) or recompute gist; Cool→Warm = full fidelity restore
4. Define the compaction algorithm for generating gist summaries (LLM summarization vs extractive vs hybrid)
5. Define hard TTL expiry action: configurable (delete / archive-to-cold / convert-to-gist)

---

## Open Questions

- Is tier promotion automatic (threshold-based) or manual (explicit system action)?
- Should demotion to Cold require human approval for high-importance engrams?