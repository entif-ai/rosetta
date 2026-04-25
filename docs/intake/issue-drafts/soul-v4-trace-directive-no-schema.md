# SOUL-v4-trace-directive-no-schema

## Issue Summary

**Type:** unenforceable-directive  
**Severity:** high  
**Draft file:** `docs/intake/issue-drafts/soul-v4-trace-directive-no-schema.md`

## Evidence

SOUL.md v4.1 §CHALLENGE, REALIGNMENT AND RESOLUTION reads:

> "TRACE: Log each challenge/rebuild: origin, tier, method, outcome."

No log format is defined. No storage location is specified. No retention policy is given. No enforcement mechanism exists.

## Impact

- The TRACE directive is unenforceable as stated — any agent could claim compliance without a defined schema
- No audit trail for challenge/rebuild events exists or can be verified
- The entire challenge/realignment framework loses its accountability surface

## Expected Resolution

1. Define a TRACE log schema: what does "origin," "tier," "method," "outcome" look like as structured fields?
2. Specify storage location and format (e.g., append-only file, structured log, memory store)
3. Define retention policy (how long to keep, when to purge)
4. Add tooling or auto-logging so TRACE entries are captured without manual effort

## Labels

`docs-intelligence`, `observability`, `governance`, `enforceable-directive`

## Depends On

None