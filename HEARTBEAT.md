# HEARTBEAT.md — Rosetta Docs Intelligence Agent

## Active Task: Docs Intelligence Extraction

**Every heartbeat cycle runs this exact sequence. No shortcuts. No skipping.**

### Pre-flight: Sync to latest

Before anything else — pull latest into Rosetta:

```bash
cd ~/.openclaw/workspace/Code/rosetta
git fetch origin main
git co main
git pull origin main
```

This ensures the ledger, knowledge graph, and ledger are all fresh before claiming.

---

### Step-by-step cycle

**1. Read the ledger** at `~/.openclaw/workspace/rosetta-di-ledger.md`.

**2. Select the next document** — find the first row where `processed` is exactly `no` or `pending`. Skip `yes`, `locked:*`, `failed:*`, `processed:*`, and legacy `yes`/`no` rows.

**3. Search for prior work** — before claiming, check `docs/intake/docs-intelligence/`, `docs/intake/issue-drafts/`, and open GitHub PRs for the source document slug. If it was already extracted, advance to the next `no` row instead.

**4. Lock the doc** before reading the source — use the ledger tool:

```bash
node tools/doc-intake/docs-intelligence-ledger.mjs claim \
  --ledger ~/.openclaw/workspace/rosetta-di-ledger.md \
  --agent-id <session-key> \
  --branch docs-intelligence/<doc-name-slug>
```

If it returns `{"claimedPath":null}`, stop — queue is exhausted.

**5. Inspect generated graph context** — read `docs/intake/docs-intelligence/CYCLE_SUMMARY.md` and `docs/intake/docs-intelligence/CONCEPT_INDEX.json` before starting. This prevents duplicate issue drafts.

**6. Read the source document** in full.

**7. Produce a full extraction** using the EXTRACTION_TEMPLATE format. No summarizing. No batching. Every finding gets a confidence level (high / medium / low).

**8. Check existing issue-drafts/** before creating new ones — look for related issues to refine rather than duplicate. Check open PRs for existing related issues.

**9. Write extraction** to `docs/intake/docs-intelligence/YYYY-MM-DD-short-name.md`.

**10. Write issue drafts** to `docs/intake/issue-drafts/<topic>.md` — one file per distinct issue. Every issue-candidate row in the extraction must have a matching draft file or explicit existing GitHub issue link.

**11. Update `KNOWLEDGE_GRAPH.yaml`** — the processed doc, PR state, and issue-draft inventory must reflect this cycle.

**12. Run `pnpm run docs:intake`** — refreshes `doc-ledger.json` and `doc-ledger.md`. If only DI artifacts changed and nothing else, note that in the PR body.

**13. Run `pnpm run docs:intelligence`** — regenerates `CONCEPT_INDEX.json` and `CYCLE_SUMMARY.md` so the next agent boots with current state.

**14. Run `pnpm run docs:intake:validate`** — this must pass before push. If it fails, fix before continuing.

**15. Run `git diff --check`** — catch any whitespace or merge conflicts before committing.

**16. Create branch** `docs-intelligence/<doc-name-slug>` from `main`.

**17. Stage and commit** — extraction + issue drafts + the 3 regenerated bookkeeping files:

```bash
git add docs/intake/docs-intelligence/YYYY-MM-DD-short-name.md \
  docs/intake/issue-drafts/*.md \
  docs/intake/docs-intelligence/CONCEPT_INDEX.json \
  docs/intake/docs-intelligence/CYCLE_SUMMARY.md \
  docs/intake/docs-intelligence/KNOWLEDGE_GRAPH.yaml
```

Also add `docs/intake/doc-ledger.json` and `docs/intake/doc-ledger.md` if they changed.

Include a clear commit message.

**17.5. Merge origin/main before push — resolve staleness conflicts:**

```bash
# Fetch latest main and merge into working branch to resolve staleness
git fetch origin main
git merge origin/main -m "Merge origin/main to resolve staleness conflicts"

# If merge conflicts exist, check if they're only in generated intake files
CONFLICTING_FILES=$(git diff --name-only --diff-filter=U)
if [ -n "$CONFLICTING_FILES" ]; then
  # Allow conflicts only in these generated files
  NON_GENERATED=$(echo "$CONFLICTING_FILES" | grep -v -E "^(docs/intake/doc-ledger|docs/intake/docs-intelligence/CONCEPT_INDEX|docs/intake/docs-intelligence/CYCLE_SUMMARY|docs/intake/docs-intelligence/KNOWLEDGE_GRAPH|docs/intake/issue-drafts/)")
  if [ -n "$NON_GENERATED" ]; then
    echo "ERROR: Merge conflicts found in non-generated files: $NON_GENERATED"
    echo "Manual intervention required. Aborting merge."
    git merge --abort
    exit 1
  fi
  # Conflicts only in generated files — regenerate to resolve
  pnpm run docs:intake
  pnpm run docs:intelligence
  git add .
  git commit -m "Merge origin/main and resolve conflicts in generated files"
fi
```

**18. Push the branch.**

**19. Create PR** to `main` via `gh pr create`. Title format: `docs(intake): <doc-name> — N findings, M issues`. Body should cite source path, findings count, and issue candidates.

**20. Update the ledger** — mark doc processed:

```bash
node tools/doc-intake/docs-intelligence-ledger.mjs complete \
  --ledger ~/.openclaw/workspace/rosetta-di-ledger.md \
  --doc "<claimedPath>" \
  --pr <pr-number> \
  --findings <count> \
  --issues-drafted <count>
```

**21. Get latest code:** `cd ~/.openclaw/workspace/rosetta; git co main; git pull;` before doing anything else, assuming the worktree is clean.

**22. Send Telegram DM** to `8740875131` — format: "Doc: `<doc-name.md>` | Findings: N | Issues: M | Total: X/128"

**23. If runs_since_last_batched_update == 6** — send hourly digest, reset counter.

**24. Compact context** — end turn with only the confirmation. No residual context carried forward.

---

## Stop conditions

- If ledger shows all 128 docs processed: send final digest, stop scheduling
- Sub-agent spawn: confirmed working as of 2026-04-24 17:43 — use sessions_spawn for all future cycles
- If Telegram DM fails: continue processing, flag in ledger
- Queue exhausted (no `processed=no` rows): STOP until ledger is reseeded

## What gets skipped when steps are missing

This table documents what breaks when each step is absent:

| Step | What breaks |
|------|-------------|
| 4 — Lock before read | Duplicate extractions; two agents processing the same doc |
| 5 — Graph context check | Duplicate issue drafts; cross-doc concept drift |
| 12 — `pnpm run docs:intake` | Stale `doc-ledger.json`; broken `github-issue-ledger.json` merges |
| 13 — `pnpm run docs:intelligence` | Stale `CONCEPT_INDEX.json`; wrong concept graph bootstraps next agent |
| 14 — `pnpm run docs:intake:validate` | Invalid PRs get pushed; CI fails on main |
| 15 — `git diff --check` | Whitespace errors; uncaught merge conflicts |

## One doc per cycle. Full extraction. No summarizing. No batching.
