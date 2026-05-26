# Issue Draft: EDG-003 — Align Guard Layer Spec with Write-Admission-Gate Implementation

## Metadata

| Field | Value |
|---|---|
| Issue ID | EDG-003 |
| Type | architecture |
| Status | draft |
| Source doc | docs/governance/Entif 2.0 - Decentralization and Governance.md; docs/PRDs/NOT LAME PRD |
| Extraction date | 2026-05-26 |
| Confidence | high |

## Problem

The Guard Layer (Entif 2.0 governance doc, Section 1) and the write-admission-gate (NOT LAME PRD) describe the same conceptual function — policy enforcement on agent actions — but with different terminology and structural detail. No explicit mapping exists between them, creating risk of:
- Duplicate implementation effort
- Inconsistent policy enforcement semantics  
- Missing Guard Layer features in write-admission-gate spec (or vice versa)

## Evidence

**Guard Layer (Entif 2.0 governance doc):**
- Policy Interceptor with OPA/Rego allowlist/denylist
- Sandboxed execution (Firecracker/gVisor)
- Anomaly detection → safe-hold state
- HITL escalation for critical ops
- Red-team/fuzz testing module
- Immutable audit log (cryptographic hash chain)

**Write-Admission-Gate (NOT LAME PRD):**
- 9-step state machine: Propose→Normalize→Authorize→Ground→Checkpoint→Apply→Observe→Receipt→Project
- Fail-closed
- Receipts for every durable mutation
- Short-lived expiry, policy hash/version binding

## Gap Analysis

| Guard Layer Feature | write-admission-gate coverage |
|---|---|
| OPA/Rego policy engine | Not specified — policy engine choice missing |
| Sandboxed execution | Not specified — execution substrate missing |
| Anomaly detection → safe-hold | Partially covered (fail-closed) |
| HITL escalation for critical ops | Not specified — escalation path missing |
| Red-team/fuzz testing | Not specified |
| Immutable audit log (hash chain) | Covered (receipts) |

## Recommended Action

1. Create alignment document: "Guard Layer → write-admission-gate feature mapping"
2. Add to write-admission-gate spec: OPA integration option, sandbox execution requirements, HITL escalation conditions, safe-hold state definition
3. Add to write-admission-gate spec: red-team/fuzz testing hook requirements
4. Evaluate whether OPA/Rego is the right policy engine choice vs. custom policy evaluation

## Labels

guard-layer, write-admission-gate, sovereign-kernel, alignment, policy-engine, opa

## Depends On

NOT LAME write-admission-gate spec finalization

## Related Issues

- EDG-001 (terminology mapping)
- EDG-005 (Threat Monitor scope)
- NOT LAME write-admission-gate