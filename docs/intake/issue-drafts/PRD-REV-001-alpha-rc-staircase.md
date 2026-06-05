# Issue Draft — PRD-REV-001: Formalize Alpha RC-0 through RC-4 staircase as binding milestone spec

## Title

PRD-REV-001: Formalize Alpha RC-0 through RC-4 staircase as binding milestone spec

## Type

docs

## Labels

alpha-rc, build-sequence, milestone

## Depends On

—

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`

Alpha RC-0 through RC-4 staircase:

- **Alpha RC-0**: Nx workspace boots; `canon`, `cid`, `validate` exist; TV1 and tamper-negative tests compile red
- **Alpha RC-1**: JCS/CID deterministic conformance green; `rosetta.receipt` schema green; `rosetta.tapestry` receipt-bundle schema green
- **Alpha RC-2**: Guard denies missing/expired/mismatched tokens; `builtin.echo` vertical slice passes end to end; receipt bundle verifies successfully
- **Alpha RC-3**: `code.scaffold --dry-run` reuses same constitutional loop; no real side effects yet; CLI/API both green; local CAS + SQLite query surfaces stable; rights-scoped retrieval enforced
- **Alpha RC-4**: operator UI stub can inspect runs, but is still non-gating

This staircase is more granular than prior TC-001 through TC-007 scope descriptions.

## Description

The synthesis doc in `20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` defines a 5-stage Alpha RC staircase (RC-0 through RC-4) that is more granular and concrete than any prior milestone description in the Rosetta codebase.

This staircase should be formalized as the binding milestone spec for the Alpha release. Specifically:

1. Document each RC as a formal milestone with clear entry/exit criteria
2. Align TC-001 through TC-007 with this staircase
3. Ensure the staircase is reflected in sprint planning and GitHub project board
4. Confirm that no prior doc contradicts this sequencing

The staircase provides a clean answer to "what does alpha mean?" in constitutional terms: it is about conformance and guard verification, not application features.

## Proposed Action

- Create a formal milestone spec document for Alpha RC-0–4
- Align existing TC-001–TC-007 tickets to the staircase
- Update project board to reflect RC stages
