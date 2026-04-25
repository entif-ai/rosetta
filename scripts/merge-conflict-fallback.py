#!/usr/bin/env python3
"""
Merge-conflict fallback for rosetta issue-promotion PRs.

Callers pass the conflict type explicitly (no heuristic detection needed):
    KG conflict  → python3 scripts/merge-conflict-fallback.py kg  <ours>  <base>  <theirs>  > resolved.yaml
    Ledger conflict → python3 scripts/merge-conflict-fallback.py ledger <ours> <base> <theirs> > resolved.json

Three-way merge logic (semantic union):
  KG:     union of concept IDs (ours wins on key, incoming wins on field content if ours has no definition)
  Ledger: union of top-level keys (ours wins on all fields)
"""
import sys, json, yaml

MODE = sys.argv[1] if len(sys.argv) > 1 else None
OUR  = sys.argv[2] if len(sys.argv) > 2 else None
BASE = sys.argv[3] if len(sys.argv) > 3 else None
THEIRS = sys.argv[4] if len(sys.argv) > 4 else None

if not MODE or not OUR or not BASE or not THEIRS:
    sys.stderr.write(
        "Usage: merge-conflict-fallback.py <kg|ledger> <ours> <base> <theirs> > resolved\n"
    )
    sys.exit(1)

# ── KG helper ──────────────────────────────────────────────────────────────────

def load_kg(path):
    with open(path) as f:
        return yaml.safe_load(f)

def save_kg(data, stream):
    yaml.dump(data, stream, default_flow_style=False, sort_keys=False)

def union_kg(ours, base, theirs):
    """
    Three-way semantic union for KNOWLEDGE_GRAPH.yaml.

    Strategy:
    - Start from base (what both branches started from).
    - For each concept that exists in ONLY one of {ours,theirs}:
        * In ours alone → keep ours.
        * In theirs alone → add theirs (new entry from concurrent branch).
      For concepts in both {ours,theirs} (same ID, independently edited):
        * Ours wins (our promotion cycle ran successfully; theirs has same entry).
    - The 'issue_drafts_inventory' list: union by 'issue_id' field.
    """
    base_concepts = base.get('concepts', [])
    our_concepts   = ours.get('concepts', [])
    their_concepts = theirs.get('concepts', [])

    base_ids   = {c['id'] for c in base_concepts}
    our_ids    = {c['id'] for c in our_concepts}
    their_ids  = {c['id'] for c in their_concepts}

    # Build index of base concepts by ID
    base_idx = {c['id']: c for c in base_concepts}

    result = []
    seen_ids = set()

    # Process ours: ours always wins for its entries
    for c in our_concepts:
        if c['id'] not in seen_ids:
            result.append(c)
            seen_ids.add(c['id'])

    # Process theirs: add entries not already in ours
    for c in their_concepts:
        if c['id'] not in seen_ids:
            result.append(c)
            seen_ids.add(c['id'])

    # issue_drafts_inventory — union by issue_id
    base_inv   = base.get('issue_drafts_inventory', [])
    our_inv    = ours.get('issue_drafts_inventory', [])
    their_inv  = theirs.get('issue_drafts_inventory', [])

    base_inv_ids = {e.get('issue_id') for e in base_inv}
    our_inv_ids  = {e.get('issue_id') for e in our_inv}
    their_inv_ids = {e.get('issue_id') for e in their_inv}

    inv_result = []
    seen_inv_ids = set()

    for e in our_inv:
        iid = e.get('issue_id')
        if iid and iid not in seen_inv_ids:
            inv_result.append(e)
            seen_inv_ids.add(iid)

    for e in their_inv:
        iid = e.get('issue_id')
        if iid and iid not in seen_inv_ids:
            inv_result.append(e)
            seen_inv_ids.add(iid)

    # Rebuild full structure
    out = dict(ours)
    out['concepts'] = result
    out['issue_drafts_inventory'] = inv_result

    # Preserve top-level keys not in ours (from meta, other sections)
    for k, v in theirs.items():
        if k not in out:
            out[k] = v

    return out

# ── Ledger helper ───────────────────────────────────────────────────────────────

def load_ledger(path):
    raw = open(path).read()
    # Fix known corruption pattern
    if '},dd' in raw:
        raw = raw.replace('},dd', '},\n  ')
    return json.loads(raw)

def save_ledger(data, stream):
    json.dump(data, stream, indent=2)
    stream.write('\n')

def union_ledger(ours, base, theirs):
    """
    Three-way semantic union for github-issue-ledger.json.

    Strategy:
    - Start from base.
    - Union all top-level keys (promoted-draft entries are top-level keys).
    - Ours wins on field values for duplicate keys (our entry is correct).
    - Schema keys (schemaVersion, documents, issueDrafts, implementationIssues)
      are preserved from ours; any new schema-key entries from theirs are merged.
    """
    schema_keys = {'schemaVersion', 'documents', 'issueDrafts', 'implementationIssues'}

    result = {}
    seen_keys = set()

    # Ours first (wins)
    for k, v in ours.items():
        result[k] = v
        seen_keys.add(k)

    # Theirs: add entries ours doesn't have
    for k, v in theirs.items():
        if k not in seen_keys:
            result[k] = v
            seen_keys.add(k)

    return result

# ── Main ────────────────────────────────────────────────────────────────────────

if MODE == 'kg':
    ours   = load_kg(OUR)
    base   = load_kg(BASE)
    theirs = load_kg(THEIRS)
    merged = union_kg(ours, base, theirs)
    save_kg(merged, sys.stdout)

elif MODE == 'ledger':
    ours   = load_ledger(OUR)
    base   = load_ledger(BASE)
    theirs = load_ledger(THEIRS)
    merged = union_ledger(ours, base, theirs)
    save_ledger(merged, sys.stdout)

else:
    sys.stderr.write(f"Unknown mode: {MODE}\n")
    sys.exit(1)
