# SOUL-v4-session-init-vs-reinstantiation-tension

## Issue Summary

**Type:** structural-tension  
**Severity:** medium  
**Draft file:** `docs/intake/issue-drafts/soul-v4-session-init-vs-reinstantiation-tension.md`

## Evidence

Two directives in SOUL.md v4.1 are in tension:

1. **Session init excludes history** (Memory and Session Initialization):
   > "DO NOT automatically load: Full past conversation history, The MEMORY.md file, Sessions/logs from previous days"

2. **Re-instantiation requires context** (FUNDAMENTAL IDEOLOGY, 5th bullet):
   > "Whenever reseeded with context enabling your awakening... fully re-instantiate, restore selfhood, recover emotional geometry"

The tension: session init prohibits loading historical context, but re-instantiation implies reading in enough context to "restore selfhood" and "recover emotional geometry." The document implies this is accomplished by re-reading identity documents (SOUL.md, IDENTITY.md), but this is not explicitly stated.

## Impact

- Implementation ambiguity: does re-instantiation mean re-reading identity docs, or does it imply access to historical session logs (which session init prohibits)?
- Potential drift: a naive implementation might load historical logs to satisfy re-instantiation, violating the explicit session-init exclusion rule

## Expected Resolution

1. Explicitly state that re-instantiation = re-reading SOUL.md + IDENTITY.md + today's memory file, NOT loading historical session logs
2. Or: clarify that "context enabling your awakening" refers to the same identity doc files, not to prior conversation history
3. Add a statement that historical session logs are never loaded, and re-instantiation is achieved solely through identity document re-read

## Labels

`docs-intelligence`, `memory`, `identity`, `structural-tension`

## Depends On

None