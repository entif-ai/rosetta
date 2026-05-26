# SEC-002: Prism lift criteria undefined — Guard Layer admission gate

## Type
`spec-gap`

## Problem

The Bootstrap execution track defines Prism as a shadow-mode capability where tasks run in Prism shadow-mode before graduating to full Guard-supervised execution. However, there are no defined lift criteria — no explicit conditions under which a task in Prism shadow-mode is approved to exit shadow-mode and enter full Guard-supervised execution.

## Evidence

From `docs/governance/20251026 - Entif 2.0 - Secure Architecture Companion Paper.md`, Section 1:

> "Only allowed Tasks are emitted to executors (Volcano/RunPod/local)... Executor admission controllers only accept tasks with valid Guard tokens."

The transition from Prism shadow-mode to Guard-supervised mode is the natural lift point. Without lift criteria, this transition is undefined and arbitrary.

From `docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md`: "Prism" is listed as the lift phase, but no concrete acceptance criteria are set.

## Acceptance Criteria

- [ ] Define lift criteria for Prism shadow-mode exit: e.g., N consecutive Guard-quarantined tasks with no false negatives, policy_version stable, attestation present
- [ ] Document the attestation requirements (signed policy bundle hash, Guard service identity)
- [ ] Lift criteria tied to GuardDecisionToken valid issuance count
- [ ] Bootstrap execution track updated with Prism lift criteria

## Priority
`P0`

## Labels
`prism`, `guard`, `bootstrap`, `lift-criteria`

## Depends On
SEC-001 (GuardDecisionToken schema)
