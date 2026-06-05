# BVT-002: Establish fixes/ Pattern for Persistent Issues in Rosetta

## Type
process

## Summary

Berman's Vibe Coding Rules mandate a `fixes/` folder: for issues taking multiple iterations, write a description of the problem and solution and store it as an individual .md file named for the issue. Rosetta currently lacks a similar searchable record of persistent issues and their solutions. Issue drafts in `docs/intake/issue-drafts/` capture candidates but not resolution narratives.

## Evidence

From Berman: "For issues that are taking multiple iterations to fix... write up description of the problem and how we fixed it and store it in a folder called 'fixes', in an individual .md file with the name of the issue. Only do this for major issues and solutions."

From Berman: "If you are struggling with some piece of code... check the fixes folder for previous fixes and see if the same issue has been fixed before."

Rosetta's current issue tracking:
- `docs/intake/issue-drafts/` — pre-issue candidates (draft state)
- GitHub Issues —正式的跟踪
- `docs/intake/docs-intelligence/` — extraction artifacts
- Daily memory notes — session-level notes

**Gap**: No persistent, searchable log of problem-resolution pairs that agents can check before re-solving a known issue. The DI-010 issue (sub-agents must check prior work before creating issues) partially addresses this, but focuses on duplicate detection rather than solution capture.

## Proposal

Adopt a `fixes/` folder in the workspace root (or in `docs/intake/fixes/`), with one .md per persistent issue. Each file contains:
- Problem statement
- Root cause
- Solution
- Prevention (what to do differently)

Alternatively, extend the existing issue-drafts format with a `resolution` section that gets populated when an issue is resolved and then moved to a `resolved/` subfolder.

**Labels:** process, documentation, receipts

**Status:** open

**Created:** 2026-06-05

**Source:** docs/external/Berman - Vibe Coding Rules.txt (Berman Vibe Coding Rules extraction, 2026-06-05)

**Depends on:** DI-010 (sub-agents must check prior work before creating issues)