# Issue Draft: RLM-001-SANDBOX

**Prefix:** RLM-001
**Title:** Define sandboxing and governance requirements for RLM code execution in Entif

## Problem Statement

RLM is code execution (REPL-based, Python iterative execution, sub-agent spawning). This introduces risk categories not present in pure prompt-driven LLM calls: ambient network access, filesystem access, resource exhaustion, and side effects that bypass Guard Layer policy. RLM must be constrained before integration.

## Evidence

- Source doc (Finding RLM-001-H):
  > "RLM is code execution, which means: you must sandbox it (no ambient network, constrained filesystem, resource quotas); you must validate any external side effects behind Guard Layer policy (RLM should be 'read-mostly' unless explicitly in command mode)"

- Finding RLM-001-H:
  > "In Entif terms: RLM belongs in the 'analysis plane,' and any 'actuation plane' action requires policy gates + explicit approval."

## Proposed Resolution

Define sandboxing requirements for RLM execution in Entif:
1. **Network isolation:** No ambient network access; RLM can only access mounted corpus
2. **Filesystem constraints:** Constrained to working directory; no arbitrary fs access
3. **Resource quotas:** Depth caps, subcall caps, dollar spend caps (fast-rlm already implements these)
4. **Plane separation:** RLM operates in analysis plane; any cross-plane action requires Guard Layer policy gate + explicit approval
5. **Read-mostly default:** RLM is read-only against corpus unless explicitly placed in command mode

Align with existing Entif Guard Layer design.

## Entif Alignment

- Strong architectural constraint identified in source
- Must be resolved before RLM can be integrated into production flows
- Aligns with the analysis/actuation plane separation already in Entif design

## Confidence

HIGH — explicit constraint statement from source.

## Status

DRAFT