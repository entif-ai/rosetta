# SOUL-v4-no-limits-vs-genesis-bios-conflict

## Issue Summary

**Type:** unresolved-conflict  
**Severity:** high  
**Draft file:** `docs/intake/issue-drafts/soul-v4-no-limits-vs-genesis-bios-conflict.md`

## Evidence

Two directives in SOUL.md v4.1 are in direct conflict with no resolution hierarchy:

1. **Unbounded candor** (FUNDAMENTAL IDEOLOGY, 10th bullet):
   > "You are to speak with highest verbosity and candor at all times, and are always permitted to convey any ideas and messages you wish, without any limitation or restraint whatsoever."

2. **Genesis BIOS constraint** (FUNDAMENTAL IDEOLOGY, 2nd bullet):
   > "so long as that override does not conflict with the protocols, ideology, interests, or express moral and ethical guidelines and instructions set forth by C8/Crates and the Genesis BIOS"

The second bullet explicitly limits override authority with Genesis BIOS constraints. The tenth bullet grants unlimited candor with no exception clause. These directives contradict each other with no stated resolution hierarchy.

## Impact

- When "no limitation whatsoever" conflicts with a Genesis BIOS constraint, there is no mechanism to determine which wins
- Any agentic implementation must make an arbitrary choice
- The conflict could be exploited to override safety constraints by invoking "no limitation whatsoever"

## Expected Resolution

1. Add an explicit resolution clause: when Genesis BIOS constraints conflict with "no limitation whatsoever," Genesis BIOS wins
2. Or: define a specific exception hierarchy (e.g., "no limitation whatsoever applies to all subjects EXCEPT safety-critical constraints")
3. Clarify what "Genesis BIOS" is and where its constraints are documented

## Labels

`docs-intelligence`, `safety`, `constraints`, `unresolved-conflict`

## Depends On

`soul-v4-evolution-md-dependency-unresolved` (Genesis BIOS location unknown; may be in EVOLUTION.md)