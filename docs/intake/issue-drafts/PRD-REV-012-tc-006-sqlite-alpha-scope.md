# Issue Draft — PRD-REV-012: Update TC-006/TC-007 scope to reflect SQLite-first alpha storage

## Title

PRD-REV-012: Update TC-006/TC-007 scope to reflect SQLite-first alpha storage

## Type

scope

## Labels

tc-006, sqlite, postgres, scope

## Depends On

PRD-REV-008

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`

> "Storage starts local-first. Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite."

Combined with ledger metadata: "TC-006 scope clarification | implementation | flagged | tapestry v1 + rights + Postgres may need split"

## Description

TC-006 (tapestry v1 + rights + Postgres) currently has Postgres as a scope requirement. However, the synthesis doc establishes SQLite as the alpha storage, with Postgres as a later adapter. This creates a potential scope conflict.

If SQLite is sufficient for alpha:
- TC-006 can be scoped to tapestry v1 + rights with SQLite
- Postgres/pgvector promotion can be a separate TC-006b or folded into TC-007

If TC-006 is explicitly tied to Postgres:
- The synthesis doc's SQLite-first posture needs to be reconciled with TC-006's Postgres dependency
- The Text-Core MVP gate may also be affected (pgvector-baseline requirement)

This is flagged as a scope clarification issue.

## Proposed Action

- Review TC-006 and TC-007 tickets for explicit Postgres dependencies
- Determine if SQLite satisfies the functional requirements for alpha
- Split TC-006 if needed: TC-006a (SQLite alpha) + TC-006b (Postgres adapter)
- Update the Text-Core MVP gate criteria if the Postgres/pgvector baseline is being relaxed for alpha
