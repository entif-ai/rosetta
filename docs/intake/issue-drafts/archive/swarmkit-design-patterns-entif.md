# Issue Draft: SwarmKit Design Patterns for Entif Memory/Decision Subsystems

**Source:** `docs/external/SwarmKit.md`
**Extracted:** 2026-04-25
**Type:** issue-candidate
**Draft file:** `docs/intake/issue-drafts/swarmkit-design-patterns-entif.md`

---

## Context

SwarmKit demonstrates several architectural patterns potentially relevant to Entif's persistent intelligence layer:

1. **Raft-based consensus** for leader election and distributed state coordination — no single point of failure
2. **Desired-state reconciliation loop** — continuous comparison of desired vs actual state, automatic reconciliation
3. **Token-based node admission** — cryptographic tokens defining role, rotatable without disrupting joined nodes
4. **Mutual TLS with automatic certificate rotation** — all node communication encrypted and authenticated by default
5. **In-memory strongly consistent replicated state** — fast reads, Raft-replicated, no external DB dependency
6. **Dynamic node roles and availability** — Worker/Manager and Active/Paused/Drained mutable without restart

## Problem Statement

Entif's memory and decisioning subsystems need to reason about:
- Distributed state consistency across agentic nodes
- Fault tolerance and automatic recovery
- Trust bootstrap between agents
- Persistent identity and continuity

SwarmKit's patterns may offer tested reference architectures for these concerns.

## Proposed Action

- Audit Entif's current state management approach (if any)
- Map SwarmKit patterns to Entif subsystems
- Identify which patterns warrant prototyping vs. dismissal as over-engineered for our scale
- Consider whether any pattern should inform Rosetta's runtime ingestion or memory architecture

## Priority

Medium — informs architectural decisions, not immediately blocking.

## Labels

`architecture`, `memory`, `decisioning`, `swarmkit`, `design-patterns`

## Depends On

`swarmkit-relevance-assessment.md` (need to confirm project is relevant before investing in pattern analysis)