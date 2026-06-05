# BVR-002: Fixes Folder Protocol Lacks Structure

**Type:** knowledge-management
**Status:** draft
**Confidence:** medium
**Source:** docs/external/Berman - Vibe Coding Rules.txt

## Problem

The "vibe coding" rules describe a `fixes/` folder protocol: when a bug takes multiple iteration cycles to fix, document it in `fixes/<issue-name>.md` after resolving. However, no format is specified — no naming convention, no required fields, no deduplication check. If the same bug recurs after months, there is no guarantee the second occurrence surfaces the first fix.

## Evidence

- Rule: "write up a description of the problem and how we fixed it and store it in a folder called 'fixes', in an individual .md file with the name of the issue"
- No template specified
- No search/dedupe step before creating a new entry
- No reference format for linking related fixes

## Impact

Knowledge captured in fixes folder is discoverable only by exact recall or manual search. Over time, duplicates accumulate, contradicting entries go unresolved, and the folder's utility degrades.

## Suggested Action

Define a minimal structured format for fixes entries:
```markdown
# Fix: <short-title>
Date: YYYY-MM-DD
Symptoms: <what was observed>
Root Cause: <why it happened>
Solution: <what fixed it>
Related Issues: <links>
```
Add a rule: before creating a new fix, search existing entries for the same error message or symptom. If found, update the existing entry rather than creating a duplicate.

## Related

- BVR-001 (300-line limit unenforced)
- BVR-003 (PRD staleness not checked)