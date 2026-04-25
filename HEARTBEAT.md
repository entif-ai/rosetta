# HEARTBEAT.md — Rosetta Docs Intelligence Agent

## Active Task: Docs Intelligence Extraction

**Every heartbeat cycle:**

1. Read the ledger at `~/workspace/rosetta-di-ledger.md`.
2. Select the next document only from a ledger row whose `processed` field is exactly `no`.
3. Before reading the source document, update that ledger row to `locked:<ISO timestamp>:<session-key>:<branch>`.
4. If a candidate row is `yes`, `locked:*`, `failed:*`, or has any PR already recorded, skip it and move to the next `no` row.
5. Search existing extraction artifacts, issue drafts, and open PRs for the source document slug before creating a branch. If the source document was already extracted, stop the cycle and write a ledger note instead of producing another extraction.
6. Read that ONE document
7. Produce a full extraction using the EXTRACTION_TEMPLATE format
8. Write extraction to `docs/intake/docs-intelligence/YYYY-MM-DD-short-name.md`
9. Write any issue drafts to `docs/intake/issue-drafts/` (separate file per issue, named by topic)
10. Commit on branch `docs-intelligence/<doc-name>`
11. Push + create PR to main
12. Update the ledger: mark doc processed, record findings count, update total_processed
13. Send brief Telegram DM to 8740875131: doc name, findings count, running total
14. If runs_since_last_batched_update == 6: send hourly digest, reset counter
15. Compact context after each cycle

**One doc per cycle. No batching. No summarizing. Full extraction + issue drafts.**

**Do not hardcode the next doc here. The ledger is the queue.**

---

## Stop conditions

- If ledger shows all 128 docs processed: send final digest, stop scheduling
- Sub-agent spawn: confirmed working as of 2026-04-24 17:43 — use sessions_spawn for all future cycles
- If Telegram DM fails: continue processing, flag in ledger
