# Authority Stack Issues

Issue draft id: `authority-stack-gaps`
Priority: `P2`
Effort: `S`
Labels: `governance`, `documentation`, `ablation`

## Problem

The AUTHORITY_STACK.md document reveals two structural integrity risks and one scope ambiguity that need resolution: (1) the primary authority file path contains a hardcoded username (`emilie`) making it non-portable across developer machines, (2) the authority chain includes external docs not committed to the repo, creating integrity risk if those files are lost, and (3) Prism's "shadow mode" exit criteria are undefined.

## Scope

- Address hardcoded absolute path with username reference
- Establish integrity mechanism for external authority docs
- Define Prism shadow-mode lift criteria
- Verify Node 24.14.1 pin is enforced in .nvmrc and CI

## Source Evidence

- `docs/governance/AUTHORITY_STACK.md` — Primary Authorities section
- `docs/governance/AUTHORITY_STACK.md` — Local Execution Constraints section

## Specific Findings

### Finding 1: Hardcoded username path
Primary authority points to `/Users/emilie/.openclaw/workspace/open-brain/NEXT-SESSION-BOOTSTRAP-v0.1.md`. This will not resolve on other machines or in CI.

**Recommended action:** Replace with environment variable or repo-internal path. Create issue to resolve.

### Finding 2: External authority docs not in repo
The authority chain includes external docs not committed to the repo. If lost or mutated, the governing authority chain breaks.

**Recommended action:** Either mirror external authority docs into repo or establish integrity checking mechanism.

### Finding 3: Prism shadow-mode lift criteria undefined
Prism is in "shadow mode only" but criteria for exiting shadow mode are not specified.

**Recommended action:** Define explicit shadow-mode exit criteria or confirm Prism is not planned for production use.

### Finding 4: Node 24.14.1 pin verification
Authority Stack pins Node 24.14.1 but .nvmrc and CI enforcement not confirmed.

**Recommended action:** Verify .nvmrc exists and CI checks Node version.

## Publishing Notes

- Local status: `published`
- Active draft path: `archived`
- Archived draft path: `docs/intake/issue-drafts/archive/authority-stack-gaps.md`
- GitHub issue: `https://github.com/entif-ai/rosetta/issues/41`
