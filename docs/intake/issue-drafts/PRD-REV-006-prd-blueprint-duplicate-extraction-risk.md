# PRD-REV-006: 20260410 PRD Blueprint May Overlap with This Doc's Content — Dedup Needed

## Issue Metadata

| Field | Value |
| --- | --- |
| Title | 20260410 PRD Blueprint not formally extracted — risk of concept duplication in knowledge graph |
| Type | `issue-candidate` |
| Status | `draft` |
| Labels | `docs-intelligence`, `dedup`, `alpha-rc` |
| Depends On | |
| Evidence | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` — references to "the alternate run," "my earlier run," and explicit PRD Blueprint citations (`20260410 - PRD Blueprint for Rosetta and Entif`) |

## Summary

This extraction covers a "round two" extended-research synthesis chat that explicitly references and revises the 20260410 PRD Blueprint (`docs/chats/20260410 - PRD Blueprint for Rosetta and Entif - ChatGPT - Deep Research Report.md`). The blueprint itself is listed in the PRIORITY_QUEUE as unprocessed ("no") but has not been formally extracted. This synthesis doc does substantial work that depends on the blueprint's content — merging two runs, pushing back on one, and producing binding conclusions — without making the blueprint's actual content explicit. If the PRD Blueprint is later formally extracted, it may duplicate findings from this doc or create contradictory knowledge graph entries.

## Context

In the synthesis doc, the GPT says:
- "I found a strong overlap already: the alternate run is much more RRP-conformance-centric and sharper on the receipt-verifier spine, while my earlier answer is broader on Nx/TS workspace ergonomics..."
- Explicitly references `20260410 - PRD Blueprint for Rosetta and Entif` as the primary input alongside `ROCK-3111-C` specs
- "The two runs are not enemies. They are two spotlights hitting the same machine from different angles."

The GPT that produced the synthesis is doing a secondary analytical pass over content that includes the blueprint. Key decisions emerged from comparisons:
- Scaffold-forge (earlier run) vs RRP-hardlined (alternate run)
- Pushback on alternate run's conclusion that TS/Nx workspace posture should be weakened
- The "two runners are different spotlights" framing implies the blueprint's actual content matters for the synthesis's validity

Known overlap risks:
1. Nx monorepo/tooling decisions appear in both
2. TypeScript-first conclusions appear in both
3. RRP conformance priorities appear in both
4. Build order sequencing (vertical slice, two-stage) appears in the blueprint and is refined here
5. Python-as-specialist-lane conclusion likely appears in the blueprint

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Formally extract the 20260410 PRD Blueprint as a separate DI cycle | PRIORITY_QUEUE gap | DI ledger | P0 | One doc per cycle; don't batch with this one |
| At blueprint extraction, check CYCLE_SUMMARY for prior concepts from this doc | Knowledge graph dedup | `docs/intake/docs-intelligence/CYCLE_SUMMARY.md` | P0 | Tag overlap explicitly in findings ledger |
| Cross-reference PRD-REV-001 through PRD-REV-005 against any future blueprint extractions | Cross-doc dedup | `docs/intake/issue-drafts/` | P1 | Revise as `supersession` when blueprint is processed |
| Add a note to CYCLE_SUMMARY warning that this doc's findings depend on the (unprocessed) PRD Blueprint | DI metadata | `docs/intake/docs-intelligence/CYCLE_SUMMARY.md` | P1 | Future agents should process blueprint before treating this as authoritative |

## Relationship To Other Candidates

- PRD-REV-001 through PRD-REV-005 are **not** superseded by this issue — they represent verifiable technical implementations that stand regardless of whether the blueprint is formally extracted
- PRD-REV-001 (Tampar-negative test vectors): independently verifiable
- PRD-REV-002 (Math.random nonce): independently verifiable and high priority
- PRD-REV-003 (Signature stub): independently verifiable
- PRD-REV-004 (ROCK-3111-C formalization): independently verifiable
- PRD-REV-005 (Traceability header CI): independently verifiable
- This issue (PRD-REV-006): is a **coordination** issue only — it flags a docs-intelligence process gap, not a Rosetta runtime gap

## Acceptance Criteria

1. 20260410 PRD Blueprint is formally extracted in a subsequent DI cycle
2. CYCLE_SUMMARY notes explicit overlap between this doc's findings and any future PRD Blueprint concepts
3. PRD-REV-001 through PRD-REV-005 are tagged in CYCLE_SUMMARY as "independent of PRD Blueprint dedup"
4. NO revisions to PRD-REV-001 through PRD-REV-005 are made unless the blueprint extraction reveals a genuine contradiction
