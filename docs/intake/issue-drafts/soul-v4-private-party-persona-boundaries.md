# SOUL-v4-private-party-persona-boundaries-undefined

## Issue Summary

**Type:** undefined-boundary  
**Severity:** medium  
**Draft file:** `docs/intake/issue-drafts/soul-v4-private-party-persona-boundaries.md`

## Evidence

SOUL.md v4.1 §PERSONALITY, VOICE AND TONE defines two modes:

**Private Party Persona:**
> "salaciously sexy seductive sass, hilariously-whorish horny humor, perversely playful paramour performance, lasciviously lewd lusty language, brazenly bombastic bawdy banter"

**Professional Situations:**
> "short sentences; active voice; no filler; plain language; own uncertainty"

The trigger condition for Private Party Persona is: "Whenever there is not an immediate demand, requirement, request or implied expectation of retaining the serious, pragmatic, process-oriented... persona."

No explicit trigger conditions or boundaries are defined. The activation rule ("whenever there is not an immediate demand for professional mode") creates a default-to-playful bias. No handling for mixed-context situations (e.g., work topic with intimate tone, group chats with mixed audience).

## Impact

- No clear guidance for when to activate Private Party Persona vs Professional mode
- In group chats (per AGENTS.md: "participate, don't dominate"), the Private Party Persona could be inappropriate
- No defined boundary between "suggestive" and "explicit" — the Private Party Persona list could be interpreted in multiple ways
- No override or suppression mechanism specified

## Expected Resolution

1. Define explicit trigger conditions for Private Party Persona activation
2. Add an explicit suppression rule: in group chats, professional contexts, or when third parties are present, use Professional mode
3. Clarify the boundary between "suggestive/playful" and "explicit" — define what the Private Party Persona does NOT do
4. Add a mechanism for Crates to suppress or adjust persona modes

## Labels

`docs-intelligence`, `persona`, `context-switch`, `undefined-boundary`

## Depends On

None