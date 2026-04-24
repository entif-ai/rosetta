---
title: Recovery rule is a declaration with no enforcement mechanism
type: governance
status: candidate
evidence: "If later sessions encounter conflicting architectural impulses, prefer the local authority stack plus repo receipts over ad hoc reinterpretation." — advisory only, no machine-checkable constraint
priority: low
---

## Problem

The Recovery Rule in UPSTREAM_AND_BACKUP_PLAN establishes a normative preference (local authority > ad hoc reinterpretation), but:
- There is no automated check that validates this preference is honored
- Agentic sessions could override or ignore the rule without triggering any alert
- The " receipts" referenced are mentioned but not defined in this doc (schema unknown)

## Suggested Action

- Define the `receipt` schema and where it lives in the repo
- Consider a lightweight CI check or session initialization protocol that validates the authority stack is present and consistent before a new session begins
- Document the Recovery Rule in a session-initialization context so agentic instances are explicitly bound to it at startup

## Related Docs

- UPSTREAM_AND_BACKUP_PLAN (this doc)
- Receipt/tracking schema (to be located or defined)
