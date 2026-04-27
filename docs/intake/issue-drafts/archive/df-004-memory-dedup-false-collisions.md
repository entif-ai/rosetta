# DF-004: Memory fact dedup via whitespace trim risks false collisions

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

Memory updater deduplicates facts by trimming leading/trailing whitespace before comparing content. Two semantically different facts that differ only by whitespace would be incorrectly deduplicated. This is a correctness risk for a memory system that claims to track discrete facts with confidence scores.

## Evidence

From Memory System section:
> "LLM-based memory updates with fact extraction, whitespace-normalized fact deduplication (trims leading/trailing whitespace before comparing)"

No mention of content hashing, fingerprinting, or any dedup mechanism beyond raw string comparison after whitespace normalization.

## Implications

- Two genuinely different facts that happen to have the same text after whitespace normalization would be merged into one
- Example: " User prefers dark mode" and "User prefers  dark mode" (two spaces) would be treated as the same fact
- Example: "The project deadline is March 15" and "The project deadline is March 15 " would be treated as the same
- If fact A is high-confidence and fact B is low-confidence, the dedup might keep the wrong one

## Contrast with NOT LAME

NOT LAME's memory sovereignty map specifies Plane 1 (truth/provenance) which requires authoritative fact storage. Rosetta's receipt-law requires receipts for every meaningful step. Neither system would accept a dedup mechanism that could silently discard a distinct fact.

## Recommendations

1. Use content fingerprinting (e.g., SHA-256 hash) in addition to string comparison
2. Consider semantic dedup using embedding similarity instead of string equality
3. If two facts are identical after whitespace normalization, consider them candidates for merge but evaluate their confidence scores before collapsing
4. Log dedup decisions so they can be audited and refined
5. Add a test suite with intentionally whitespace-variant facts to validate dedup behavior

## Labels

memory, deduplication, correctness, false-positive, fact-dedup

## Status

issue-candidate