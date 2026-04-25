#!/usr/bin/env python3
"""
Resolve KG/ledger merge conflicts in open rosetta PRs via rebase + semantic union.

Usage:
    python3 scripts/rebase-and-push.py [pr_number]

With no pr_number: scans all open PRs, fixes any with CLEAN status.
With pr_number:   fixes that specific PR.

What it does:
1. Fetches latest main
2. For each PR branch: git rebase origin/main (uses .gitattributes merge driver)
3. If rebase succeeds → force-push with lease
4. If rebase fails     → prints conflict details, skips
"""
import subprocess, sys, json, os

REPO = '/Users/emilie/.hermes/rosetta'
os.chdir(REPO)

def run(cmd, capture=True):
    r = subprocess.run(cmd, shell=True, capture_output=capture,
                       text=True, cwd=REPO)
    return r.stdout, r.stderr, r.returncode

def gh_json(query):
    out, err, rc = run(f'gh api repos/entif-ai/rosetta/{query}')
    if rc != 0:
        return []
    return json.loads(out) if out.strip().startswith('[') else json.loads('[' + out + ']') if out.strip() else []

def get_open_prs():
    out, err, rc = run(
        'gh pr list --state open --json number,headRefName,title,mergeStateStatus'
    )
    if rc != 0:
        print(f"gh pr list failed: {err}")
        return []
    try:
        data = json.loads(out)
        return data if isinstance(data, list) else []
    except:
        return []

def fetch_main():
    run('git fetch origin main')

def fetch_branch(branch):
    """Also fetch the PR branch ref so force-with-lease is accurate."""
    run(f'git fetch origin {branch}')

def rebase_branch(branch):
    # Check if branch is behind origin/main
    out, _, _ = run(f'git rev-list --left-right {branch}...origin/main --count')
    behind = int(out.strip().split()[0]) if out.strip() else 0

    print(f"  Branch '{branch}' is {behind} commits behind origin/main")

    # Save working tree state first — rebase fails with unstaged changes
    stash_msg = f"auto-rebase-{branch}-{int(__import__('time').time())}"
    stash_out, stash_err, stashed = run(f'git stash push -m "{stash_msg}"')
    if stashed == 0:
        print(f"  Stashed working tree: {stash_msg}")

    # Do the rebase
    stdout, stderr, rc = run(f'git rebase origin/main {branch}')
    if rc != 0:
        print(f"  REBASE FAILED — conflicts:")
        for line in stderr.split('\n')[:10]:
            if line.strip():
                print(f"    {line}")
        # Restore working tree
        run(f'git stash pop')
        return False, stderr

    print(f"  Rebase succeeded")
    # Working tree stash is from pre-rebase state — drop it (we want clean tree post-rebase)
    run('git stash drop')
    return True, stdout

def force_push(branch):
    # Check if we have an origin/branch ref for force-with-lease
    out, err, rc = run(f'git rev-parse --verify origin/{branch}', capture=False)
    has_tracking = (rc == 0)

    if has_tracking:
        push_cmd = f'git push origin {branch} --force-with-lease'
        desc = "force-with-lease"
    else:
        # Slash-named branches don't get origin/ tracking refs; fall back to force
        push_cmd = f'git push origin {branch} --force'
        desc = "force (no tracking ref available for lease)"

    stdout, stderr, rc = run(push_cmd)
    if rc != 0:
        print(f"  PUSH FAILED: {stderr[:200]}")
        return False
    print(f"  Pushed with {desc}")
    return True

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else None

    print("=== Fetching main ===")
    fetch_main()

    print("\n=== Checking open PRs ===")
    prs = get_open_prs()
    print(f"Found {len(prs)} open PRs")

    # Filter to promotion PRs only
    promotion_prs = [p for p in prs if 'promote' in p.get('title','').lower()]
    print(f"Promotion PRs: {[p['number'] for p in promotion_prs]}")

    # Filter by target if specified
    if target:
        promotion_prs = [p for p in promotion_prs
                        if str(p['number']) == target]
        if not promotion_prs:
            print(f"PR #{target} not found or not a promotion PR")
            sys.exit(1)

    fixed = []
    failed = []

    for pr in promotion_prs:
        branch = pr['headRefName']
        pr_num = pr['number']
        title  = pr['title'][:60]

        print(f"\n--- PR #{pr_num}: {title} ---")
        print(f"  Branch: {branch}")

        # Get merge status
        status = pr.get('mergeStateStatus', 'UNKNOWN')
        print(f"  Status: {status}")

        # Checkout the branch
        print(f"  Checking out {branch}...")
        out, err, rc = run(f'git checkout {branch}')
        if rc != 0:
            print(f"  Checkout failed: {err[:200]}")
            failed.append(pr_num)
            continue

        # Ensure origin/branch ref is fresh for accurate behind-count and force-with-lease
        print(f"  Fetching origin/{branch}...")
        fetch_branch(branch)

        if status == 'CLEAN':
            print("  Already clean, checking if behind main...")
            out, _, _ = run(
                f'git rev-list --left-right origin/{branch}...origin/main --count'
            )
            try:
                behind = int(out.strip().split()[0]) if out.strip() else 0
            except:
                behind = 0
            if behind == 0:
                print("  Up to date with main, nothing to do")
                continue
            else:
                print(f"  Behind main by {behind} commits, will rebase")

        # Rebase onto main
        ok, _ = rebase_branch(branch)
        if not ok:
            # Rebase failed — resolve conflicts manually or skip
            print(f"  WARNING: Rebase had conflicts — manual resolution needed for PR #{pr_num}")
            failed.append(pr_num)
            # Abort the rebase to leave repo clean
            run('git rebase --abort')
            continue

        # Push
        ok = force_push(branch)
        if not ok:
            failed.append(pr_num)
            continue

        fixed.append(pr_num)
        print(f"  [OK] PR #{pr_num} rebased and pushed")

    print(f"\n=== Summary ===")
    print(f"Fixed:  {fixed}")
    print(f"Failed: {failed}")
    if not fixed and not failed:
        print("All promotion PRs are current with main")

if __name__ == '__main__':
    main()
