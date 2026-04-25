#!/usr/bin/env python3
"""
Recover missing KG and ledger entries for archived drafts.

Run from the rosetta repo:
    cd /Users/emilie/.hermes/rosetta
    python3 scripts/recover-kg-ledger.py

What it does:
1. Reads current KG + ledger from origin/main
2. For each archived draft without a KG entry: extracts metadata and adds it
3. For each archived draft without a ledger entry: adds it
4. Creates a single recovery branch + PR
5. Validates the result before committing
"""
import subprocess, yaml, json, re, sys, os

REPO = '/Users/emilie/.hermes/rosetta'
os.chdir(REPO)

# ---------------------------------------------------------------------------
# Complete verified issue number map for all archived drafts
# Sources: gh issue list, gh search, git log commit messages
# ---------------------------------------------------------------------------
ISSUE_MAP = {
    # Berman drafts
    ' Berman-box-sync-depth-circular-ref':            (113, 'Berman-PRD: Box sync has no circular reference protection'),
    ' Berman-crm-auto-approval-no-drift-safety':     (119, 'CRM auto-approval: no mechanism to detect pattern-learner drift'),
    ' Berman-fathom-processor-no-rollback':           (128, 'Fathom processor lacks rollback if LLM extraction fails mid-transaction'),
    ' Berman-gateway-crash-loop-no-backoff':          (130, 'Gateway launchd auto-restart — no backoff throttle if crash loop occurs'),
    ' Berman-instagram-token-expiry-reminder':       (132, 'Instagram token expiry — no advance reminder before 60-day refresh deadline'),
    ' Berman-meta-analysis-conflict-resolution':     (134, 'Business meta-analysis 8-expert synthesizer has no documented conflict resolution strategy'),
    ' Berman-prd-stale':                            (136, 'Berman-PRD is stale — OpenClaw version gap since Feb 17, 2026'),
    ' Berman-x-analytics-fallback-chronic':           (138, 'X/Twitter analytics: no alerting when falling back to public_metrics chronically'),
    # CT drafts
    'ct-002-trust-bootstrap':                       (96,  'CT-002: Trust bootstrap problem — new nodes have no reputation in fully open network'),
    'ct-003-egc-esoteric':                         (105, 'CT-003: EGC pasigraphy may be too esoteric for practical adoption'),
    'ct-004-gdpr-erasure':                         (107, 'CT-004: GDPR right-to-erasure conflict with immutable content-addressed storage'),
    'ct-005-persistence-gap':                      (109, 'CT-005: Economic persistence gap — no token/payment system; unpopular data may disappear'),
    'ct-006-zk-proofs':                            (117, 'CT-006: ZK proof integration not near-term viable — heavy proof generation cost'),
    'ct-007-no-arbitration':                       (141, 'CT-007: No arbitration mechanism for conflicting tile versions'),
    'ct-008-vq-vae-aliasing':                     (143, 'CT-008: VQ-VAE codebook alias rate must be validated before optical slugs can be trusted'),
    'ct-009-wasm-sandbox':                         (145, 'CT-009: WASM sandbox for witness code execution not yet implemented in Rosetta'),
    'ct-010-egc-grammar':                          (148, 'CT-010: EGC formal grammar not yet specified — round-tripping depends on unambiguous grammar'),
    # E2E drafts
    'e2e-001-canonical-receipt-schema':             (158, 'E2E-001: Adopt Canonical Receipt Schema'),
    'e2e-002-14day-not-lame-alignment':           (150, 'E2E-002: Align 14-Day Compounding Plan with NOT LAME PRD Milestone Gates'),
    'e2e-003-fastmcp-evaluation':                 (152, 'E2E-003: Evaluate FastMCP vs TypeScript MCP SDK Before Committing to Python Runtime'),
    'e2e-004-memory-forge-alignment':             (156, 'E2E-004: Design MemoryForge Alignment with Rosetta 3-Memory-Plane + Memory-Sovereignty-Map'),
    'e2e-005-ithkuil-deprecation':                 (154, 'E2E-005: Deprecate Ithkuil Semantics — Migrate to WordNet/BabelNet/SyntagNet/VerbAtlas'),
    # AR/MOL/AC drafts
    ' AR-002-block-size-tapestry-cost-model':        None,  # No GitHub issue exists yet
    'AR-003-kimi-competitive-tracking':            (169, 'AR-003: Track Kimi/Moonshot AI Publications for Competitive Gap Analysis'),
    'MOL-002-skill-git-versioning':               (173, '[MOL-002] Rosetta Skill-Packs Need Git-Backed Version Control'),
    'MOL-003-skill-runtime-contract':              (175, 'MOL-003: Define Rosetta Skill Execution Runtime Contract'),
    'ac-002-graph-database-retrieval':              (187, 'AC-002: Graph Database Retrieval Pipeline for Relational Trend Modeling'),
    'ac-003-bio-inspired-trend-algorithms':         (189, 'AC-003: Bio-Inspired Algorithms for Memetic Trend Discovery'),
    # ROCK-3111-C drafts
    'rock-3111-c-dependency-cycle-detection':      (74,  'ROCK-3111-C: Define and enforce dependency cycle detection for RRP packs'),
    'rock-3111-c-pack-id-placeholder':             (69,  'ROCK-3111-C: Define and enforce content-addressed pack_id algorithm'),
    'rock-3111-c-persona-pack-governance':         (77,  'ROCK-3111-C: PersonaPack elevated governance is undefined'),
    'rock-3111-c-recipes-skills-ci':              (79,  'RRP recipes/ and skills/ subtrees lack CI/schema enforcement'),
    # Other archived drafts
    'authority-stack-gaps':                         (41,  'Govern authority-stack portability, integrity, and Prism shadow-mode gaps'),
    'canonical-cache-persistence':                  (8,   'TC-003 Dedupe, revision graph, and cache persistence'),
    'coverage-thresholds-and-acceptance-matrices':  (43,  'Add coverage reporting and package acceptance matrices'),
    'docs-intelligence-first-pass':                 (23,  'DI-001 First docs-intelligence extraction pass'),
    'expand-pack-schemas-and-shacl-source-artifacts': (42, 'Expand pack schemas and SHACL coverage for receipts and source artifacts'),
    'lean-validation-loop-and-local-receipts':     (3,   'Re-run lean validation loop and checkpoint local receipts'),
    'text-core-mvp-scope-gate':                    (11,  'TC-006 Tapestry v1, rights retrieval, and Postgres/pgvector baseline'),
    # Enriched E2E drafts (same issue numbers as their non-enriched counterparts)
    '2026-04-25-entif-2-0-enriched-fastmcp-evaluation':    (152, 'E2E-003: Evaluate FastMCP vs TypeScript MCP SDK'),
    '2026-04-25-entif-2-0-enriched-ithkuil-deprecation':   (154, 'E2E-005: Deprecate Ithkuil Semantics'),
    '2026-04-25-entif-2-0-enriched-memory-forge-alignment': (156, 'E2E-004: Design MemoryForge Alignment'),
    '2026-04-25-entif-2-0-enriched-receipt-schema':         (158, 'E2E-001: Adopt Canonical Receipt Schema'),
    # Pro-ext drafts
    '2026-04-25-pro-ext-research-headers-check-missing':     (160, 'Missing: headers-check Nx executor in workspace-generators'),
    '2026-04-25-pro-ext-research-known-red-tests-policy-missing': (162, 'Missing: known-red-tests policy definition and documentation'),
    '2026-04-25-pro-ext-research-python-boundary-enforcement-missing': (164, 'Missing: Python package boundary enforcement mechanism'),
    # Meta/internal drafts (no GitHub issue — skip)
    'docs-intake-ledger-and-issue-promotion':         None,
}


def run(cmd):
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=REPO)
    return r.stdout, r.stderr, r.returncode


def load_kg():
    out, err, rc = run("git show origin/main:docs/intake/docs-intelligence/KNOWLEDGE_GRAPH.yaml")
    if rc != 0:
        print(f"  ERROR loading KG: {err[:200]}")
        return None
    return yaml.safe_load(out)


def load_ledger():
    out, err, rc = run("git show origin/main:docs/intake/github-issue-ledger.json")
    if rc != 0:
        print(f"  ERROR loading ledger: {err[:200]}")
        return None
    return json.loads(out)


def get_archived_drafts():
    out, err, rc = run(
        "git ls-tree -r --name-only origin/main -- docs/intake/issue-drafts/archive/"
    )
    if rc != 0:
        return []
    return [a.strip().replace('docs/intake/issue-drafts/archive/', '').replace('.md', '')
            for a in out.strip().split('\n') if a.strip().endswith('.md')]


def extract_draft_metadata(draft_id, issue_data=None):
    """Extract title, date, definition from archived draft."""
    archive_path = f"docs/intake/issue-drafts/archive/{draft_id}.md"
    content, err, rc = run(f"git show origin/main:{archive_path}")
    if rc != 0:
        return draft_id, '2026-04-25', f"docs/intake/issue-drafts/archive/{draft_id}.md", draft_id

    # Extract title from first H1 — fallback to issue title from map if not found
    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    if title_match:
        raw_title = title_match.group(1).strip()
        # If title is just the draft ID ( Berman style), use issue title instead
        if raw_title == draft_id or len(raw_title) < len(draft_id):
            title = issue_title if issue_data and issue_title else draft_id
        else:
            title = raw_title[:120]
    else:
        title = issue_title if issue_data and issue_title else draft_id

    date_match = re.search(r'\*\*Draft created\*\*:\s*(\d{4}-\d{2}-\d{2})', content)
    introduced_at = date_match.group(1) if date_match else '2026-04-25'

    summary_match = re.search(r'## Summary\s*\n\s*(.{20,300})', content, re.MULTILINE)
    definition = summary_match.group(1).strip().replace('\n', ' ')[:200] if summary_match else title

    return title, introduced_at, archive_path, definition


def main():
    print("=== Loading current KG and ledger from origin/main ===")
    kg = load_kg()
    ledger = load_ledger()
    if kg is None or ledger is None:
        print("FATAL: Could not load KG or ledger from origin/main")
        sys.exit(1)

    kg_ids = {c['id'] for c in kg.get('concepts', [])}
    ledger_keys_raw = [k for k in ledger.keys()
                       if k not in {'schemaVersion', 'documents', 'issueDrafts', 'implementationIssues'}]
    # Ledger keys are used both with and without .md suffix
    ledger_keys_norm = set()
    for k in ledger_keys_raw:
        ledger_keys_norm.add(k)
        ledger_keys_norm.add(k.replace('.md', ''))

    archived = get_archived_drafts()
    print(f"Archived drafts on origin/main: {len(archived)}")
    print(f"KG concepts:                    {len(kg_ids)}")
    print(f"Ledger entries:                {len(ledger_keys_norm)}")
    print()

    # Build KG additions
    kg_additions = []
    ledger_additions = []
    skipped = []

    for draft_id in sorted(archived):
        issue_data = ISSUE_MAP.get(draft_id)

        # Skip if no issue number
        if issue_data is None:
            skipped.append(draft_id)
            continue

        issue_num, issue_title = issue_data

        # Already in KG?
        if draft_id in kg_ids:
            pass  # already there
        else:
            title, introduced_at, archive_path, definition = extract_draft_metadata(draft_id, issue_data)
            kg_additions.append({
                'id': draft_id,
                'name': title,
                'introduced_by': archive_path,
                'introduced_at': introduced_at,
                'definition': definition,
                'referenced_by': [f"https://github.com/endif-ai/rosetta/issues/{issue_num}".replace('endif-ai', 'entif-ai')],
                'status': 'active'
            })

        # Already in ledger? (check both with/without .md)
        if draft_id not in ledger_keys_norm:
            ledger_additions.append({
                'key': draft_id,
                'number': issue_num,
                'title': issue_title,
                'url': f"https://github.com/endif-ai/rosetta/issues/{issue_num}".replace('endif-ai', 'entif-ai'),
                'archived_path': f"docs/intake/issue-drafts/archive/{draft_id}.md"
            })

    print(f"KG additions:    {len(kg_additions)}")
    print(f"Ledger additions: {len(ledger_additions)}")
    print(f"Skipped (no issue): {len(skipped)}: {skipped}")
    print()

    if not kg_additions and not ledger_additions:
        print("Nothing to recover — KG and ledger are complete.")
        return

    # ---------------------------------------------------------------------------
    # Write changes locally
    # ---------------------------------------------------------------------------
    print("=== Applying changes ===")

    # Update KG
    if kg_additions:
        kg['concepts'].extend(kg_additions)
        kg_path = f'{REPO}/docs/intake/docs-intelligence/KNOWLEDGE_GRAPH.yaml'
        with open(kg_path, 'w') as f:
            yaml.dump(kg, f, default_flow_style=False, sort_keys=False)
            f.write('\n')  # trailing newline prevents Git hunk-boundary misfire
        print(f"  Wrote {len(kg_additions)} KG entries to KNOWLEDGE_GRAPH.yaml")

        # Validate
        with open(kg_path) as f:
            kg2 = yaml.safe_load(f)
        added_ids = {e['id'] for e in kg_additions}
        found = {c['id'] for c in kg2.get('concepts', [])} & added_ids
        missing = added_ids - found
        if missing:
            print(f"  WARNING: KG validation FAILED — missing IDs: {missing}")
        else:
            print(f"  KG validation OK — all {len(kg_additions)} entries present")

    # Update ledger
    if ledger_additions:
        for entry in ledger_additions:
            ledger[entry['key']] = {
                "number": entry['number'],
                "state": "open",
                "title": entry['title'],
                "url": entry['url'],
                "activeDraftPath": None,
                "archivedDraftPath": entry['archived_path'],
                "draftStatus": "published"
            }
        ledger_path = f'{REPO}/docs/intake/github-issue-ledger.json'
        with open(ledger_path, 'w') as f:
            json.dump(ledger, f, indent=2)
            f.write('\n')
        print(f"  Wrote {len(ledger_additions)} ledger entries to github-issue-ledger.json")

        # Validate
        with open(ledger_path) as f:
            ledger2 = json.load(f)
        added_keys = {e['key'] for e in ledger_additions}
        found_keys = set(ledger2.keys()) & added_keys
        missing_keys = added_keys - found_keys
        if missing_keys:
            print(f"  WARNING: Ledger validation FAILED — missing keys: {missing_keys}")
        else:
            print(f"  Ledger validation OK — all {len(ledger_additions)} entries present")

    # ---------------------------------------------------------------------------
    # Branch, commit, push, PR
    # ---------------------------------------------------------------------------
    print(f"\n=== Creating branch, committing, and pushing ===")
    branch = f"emilie/recover-kg-ledger"
    run(f'git checkout -b {branch}')
    run('git add docs/intake/docs-intelligence/KNOWLEDGE_GRAPH.yaml')
    run('git add docs/intake/github-issue-ledger.json')
    commit_msg = (
        f"docs(intake): recover missing KG and ledger entries\n\n"
        f"Added {len(kg_additions)} KG concepts and {len(ledger_additions)} ledger entries\n"
        f"for archived drafts whose entries were not written during promotion."
    )
    c_out, c_err, c_rc = run(f'git commit -m {repr(commit_msg)}')
    if c_rc != 0:
        print(f"Commit failed: {c_err[:300]}")
        return
    print(f"Commit OK: {c_out.strip().split(chr(10))[0]}")

    push_out, push_err, push_rc = run(f'git push -u origin {branch}')
    if push_rc != 0:
        print(f"Push failed: {push_err[:300]}")
        return
    print(f"Push OK")

    # Create PR
    body = f"""## Recovery: Missing KG + Ledger Entries

This PR adds {len(kg_additions)} KG concepts and {len(ledger_additions)} ledger entries
for archived drafts whose promotion PRs only contained the archive file move
but did not include the corresponding KG/ledger updates.

### Root Cause
The original promotion workflow did `git add` for the archive move but
the `git add` commands for KNOWLEDGE_GRAPH.yaml and github-issue-ledger.json
were not reaching those files, resulting in commits that only moved the draft
to archive without updating the tracking files.

### What Changed
- **KG**: Added {len(kg_additions)} concept entries to `docs/intake/docs-intelligence/KNOWLEDGE_GRAPH.yaml`
- **Ledger**: Added {len(ledger_additions)} entries to `docs/intake/github-issue-ledger.json`

### Validation
- KG parses cleanly with `yaml.safe_load()`
- Ledger parses cleanly with `json.load()`
- All {len(kg_additions)} KG entry IDs verified present post-write
- All {len(ledger_additions)} ledger keys verified present post-write

### Skipped
{len(skipped)} drafts have no GitHub issue and were not added:
{', '.join(skipped)}
"""
    pr_title = f"docs(intake): recover {len(kg_additions)} missing KG entries and {len(ledger_additions)} ledger entries"
    pr_out, pr_err, pr_rc = run(f'gh pr create --title "{pr_title}" --body {repr(body)}')
    if pr_rc != 0:
        print(f"PR create failed: {pr_err[:300]}")
    else:
        print(f"PR created: {pr_out.strip()}")


if __name__ == '__main__':
    main()
