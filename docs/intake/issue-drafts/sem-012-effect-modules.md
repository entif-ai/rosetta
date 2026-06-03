# SEM-012: Effect Modules as Architectural Trust Boundary Pattern

## Type

`architecture`

## Summary

Define "effect modules" as the only allowed locations for side effects in Entif code. Effect modules are labeled with explicit capability tags (e.g., `http:Payments`, `kv:Timers`, `queue:Events`), and the registry enforces that core/pure logic cannot import them. This enforces the parse-only-default at an architectural level, not just a policy level.

## Problem

Rosetta's `parse-only-default` is a vendor-default configuration that can be bypassed. What is needed is a structural guarantee that side effects (filesystem, network, KV writes) are isolated to explicitly labeled modules, so that pure business logic is inherently side-effect-free and therefore testable, composable, and replayable.

## Proposed Approach

### Definition

An **effect module** is a TypeScript module (file or directory) that:
1. Contains only side-effecting code (I/O, network, KV, filesystem)
2. Declares its capability tags in a `effects.ts` manifest at the module root:
   ```typescript
   // effects/payments/stripe.ts
   export const CAPABILITIES = ["http:Payments", "kv:PaymentEvents"] as const;
   // ...
   ```
3. Is imported only from other effect modules or from explicit effect wrappers at application boundaries
4. Never imported from pure logic modules (pure functions, domain entities, business rules)

### Capability tags

```
http:<domain>      — outbound HTTP calls (e.g., http:Payments, http:Email)
kv:<domain>        — key-value store operations (e.g., kv:Timers, kv:Sessions)
queue:<domain>     — message queue publish (e.g., queue:Events, queue:Notifications)
fs:<domain>         — filesystem access (e.g., fs:Assets, fs:Logs)
gpu:<domain>        — GPU compute (e.g., gpu:Embedding)
clock:<domain>      — time reading (e.g., clock:WallClock)
random:<domain>     — randomness (e.g., random:Crypto)
```

### Registry enforcement

The Code Atlas (SEM-009) stores `effects` as a property on each Artifact. A lint rule (or CI gate) enforces:
- No Artifact with `Determinism: pure` or `Determinism: referential` may depend on an Artifact with non-empty `effects`
- Violation → build fails

### Effect wrapper pattern

```typescript
// Wrapping an effect module for use in pure code
import { effect } from "@entifs/core";

const pay = effect(paymentsModule, {
  capabilities: ["http:Payments"],
  injectClock: mockClock,  // for testing
  injectKv: mockKv        // for testing
});

// In pure domain code:
function checkout(order: Order, pay: PaymentEffect): Effect<never, PaymentError, Receipt> {
  return pay.charge(order.amount); // side effect lifted into Effect type
}
```

### Relationship to parse-only-default

`parse-only-default` says "no side effects without a guard token." Effect modules provide the structural complement: even if a developer bypasses the guard, the dependency graph itself prevents pure code from reaching side-effecting modules.

### Alignment with existing patterns

- Write-admission gate (NOT LAME): already models each step as an effect with receipts
- Receipt law: every effect emits a receipt
- Effect modules make this structural, not just procedural

## Dependencies

- Effect module pattern predates most other work; can be established independently

## Labels

`effect-modules`, `side-effects`, `trust-boundary`, `architecture`, `parse-only-default`

## Evidence

- `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md` — "Define 'effect modules' as the only place where side effects are allowed. Label them with explicit capability tags. The registry enforces that core logic cannot import effects."

## Status

draft