# Issue Draft: PRD-008 — Rights/Guard Hardening: Actor-Aware Policy, Capability Tokens, Replay Refusal

## Metadata

| Field | Value |
|---|---|
| **Source document** | `docs/PRDs/20260426 - Entif and Rosetta PRD.md` |
| **Extracted by** | DI-009 subagent |
| **Findings basis** | F-19, F-20, F-44 |
| **Confidence** | HIGH |
| **Status** | draft |

## Problem Statement

The current `rosetta-guard` package implements the correct minimum: simple action/resource-prefix matching, deny-by-default in parse-only mode, allow read-like actions when rules permit, emit guard decisions as tiles. This is the right baseline — parse-only default is non-negotiable.

However, the Entif and Rosetta PRD (2026-04-26) and the spec material are clear that the guard needs to grow beyond this minimum into actor-aware or tenant-aware policy evaluation, temporal policy context, capability-token issuance, replay refusal, and audience binding. These are not optional enhancements — they are part of the Phase 1 constitutional hardening that makes the guard suitable for real production workloads.

## Evidence

- **F-19**: "The current `rosetta-guard` package offers the first honest minimum policy engine: simple action/resource-prefix matching, deny-side-effects-by-default in parse-only mode, allow read-like actions when rules permit, and emit guard decisions as tiles. The doctrine and spec material want much more over time — temporal or actor-aware authorization, decision tokens, policy version binding, replay refusal, and richer capability semantics." — `turn20file0`, `turn6file17`
- **F-44**: "Slice 3 = rights and guard hardening (actor-aware or tenant-aware policy evaluation, temporal policy context, capability-token issuance, replay refusal, and audience binding)" — `turn20file0`, `turn6file17`
- **F-20**: "Rights enforcement belongs before retrieval, not after it. The doctrine explicitly forbids 'retrieve then filter later' for sensitive or scoped data." — `turn26file0`, `turn8file15`

## Requirements

1. **Actor-aware policy evaluation**: Guard decisions must consider the actor (agent, service principal, human operator) making the request, not just the action and resource. Actor identity must be resolvable to a verifiable identity (not just a name string).
2. **Tenant-aware policy evaluation**: In multi-tenant deployments, policy must scope to tenant boundary. A tenant's guard decisions must not leak to other tenants.
3. **Capability tokens**: Side-effecting operations require a fresh guard decision token, not just implicit permission. Tokens are short-lived, scoped to actor + action + resource + time window.
4. **Policy version binding**: Guard decisions must record which policy version was used. Policy updates do not retroactively validate old decisions — replay of old actions under new policy requires re-authorization.
5. **Replay refusal**: If an action's receipt demonstrates it has already been executed (same idempotency key, same actor, same resource), the guard must refuse replay without re-executing. Prevents double-side-effects.
6. **Audience binding**: Receipts and compiled contexts must specify audience scope — what actors/systems can view or use the artifact. Guard enforces audience at retrieval time.
7. **Temporal policy context**: Some policies have time-bounded validity (e.g., embargo periods, time-limited access grants). Guard must evaluate temporal context as part of policy evaluation.
8. **Guard decision receipts**: All guard decisions (allow, deny, quarantine) must emit a `guard.decision` receipt with actor, resource, action, policy version, decision, and reasoning.

## Guard Decision Receipt Schema

```ts
interface GuardDecisionReceipt {
  receiptType: "guard.decision";
  decision: "allow" | "deny" | "quarantine";
  actor: { id: string; type: "agent" | "service" | "human" };
  resource: { id: CID; type: string };
  action: string;
  policyRef: CID;
  policyVersion: string;
  decisionReason: string;
  validFrom: string;      // ISO-8601
  validUntil?: string;    // for time-bounded decisions
  capabilityToken?: string;
  audienceScope?: string[];
}
```

## Acceptance Criteria

- [ ] Guard decisions consider actor identity, not just action+resource
- [ ] Multi-tenant isolation enforced — tenant A cannot access tenant B's resources even if action/resource names would otherwise permit
- [ ] Side-effecting operations require and validate a capability token
- [ ] Policy version recorded on every guard decision
- [ ] Replay of already-executed actions refused with clear error referencing original receipt
- [ ] Audience scope enforced at retrieval — artifacts with `audienceScope: ["operator"]` not retrievable by `agent` actors without explicit audience expansion
- [ ] All guard decisions emit `guard.decision` receipts verifiable by `rosetta-receipts`
- [ ] Temporal policy context evaluated (embargo, time-limited grants)

## Relationship to Other Issues

- Depends on IC-01 (Pack Conformance) for policy pack schema enforcement
- Feeds into IC-03 (Durable Canonical Cache) because rights enforcement is at the storage boundary
- IC-06 (Receipt Semantics Hardening) depends on this because policy linkage in receipts requires the hardened guard
- Part of Phase 1 Constitutional Hardening (F-44)

## Recommended Labels

`guard`, `rights`, `policy`, `capability-tokens`, `actor-aware`, `phase-1`, `security`