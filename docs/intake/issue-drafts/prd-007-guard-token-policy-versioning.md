# PRD-007: Guard decision token policy_version/policy_hash enforcement

## Meta

| field | value |
| --- | --- |
| status | issue-candidate |
| type | implementation |
| priority | P0 |
| label | guard, policy-version, admission |
| depends-on | PRD-001 |
| evidence | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md |

## Summary

Implement the structured `GuardDecisionToken` interface with `policy_version`, `policy_hash`, `constitution_hash`, `chain_height`, `subject`, `constraints` (dry_run_only, resource_caps, egress_allowlist), and `sig` fields. Enforce deny-by-default admission checks for all token fields.

## Problem Statement

The 2026-04-10 synthesis specifies guard decision tokens with more structure than prior drafts. Tokens must include `policy_version`, `policy_hash`, short-lived expiry, subject/tool references, resource caps, and later-ready placeholders like `constitution_hash` or trace IDs. The code patch in the source doc provides a starting point but the signature verification stub (`verifyDecisionSignature`) is a stub — it must be completed.

## Proposed Implementation

### GuardDecisionToken interface

```typescript
export interface GuardDecisionToken {
  decision_id: string;
  decision: GuardDecision;  // "allow" | "modify" | "quarantine" | "require_human" | "deny"
  issued_at: string;
  expires_at?: string;
  policy_version: string;
  policy_hash?: string;
  constitution_hash?: string;
  chain_height?: number;
  subject: {
    tool: string;
    toolcall_cid: string;
    tenant_id?: string;
    effects?: string[];
  };
  constraints?: {
    dry_run_only?: boolean;
    resource_caps?: { cpu_ms?: number; mem_mb?: number };
    egress_allowlist?: string[];
  };
  rationale?: string;
  sig?: {
    alg: string;
    kid: string;
    signed: string;
    sig_b64: string;
  };
}
```

### Admission checks (deny-by-default)

1. `MISSING_DECISION_TOKEN` — no token provided
2. `INVALID_DECISION_SIGNATURE` — sig absent or verify fails (stub must be completed)
3. `POLICY_VERSION_MISMATCH` — token.policy_version !== expectedPolicyVersion
4. `TOOL_MISMATCH` — token.subject.tool !== input.tool
5. `TOOLCALL_CID_MISMATCH` — token.subject.toolcall_cid !== input.toolcallCid
6. `TENANT_MISMATCH` — tenant IDs differ
7. `DECISION_EXPIRED` — expires_at is past
8. `DRY_RUN_ONLY` — token.constraints.dry_run_only && mode === "execute"
9. `DECISION_DENY` — token.decision === "deny"
10. `HUMAN_APPROVAL_REQUIRED` — token.decision === "require_human"
11. `QUARANTINED` — token.decision === "quarantine"

### Signature verification stub completion

The MVP stub requires `sig.kid && sig.sig_b64` presence. For MVP this is acceptable. RRP-Auditor tier should implement proper Ed25519/X25519 verification.

### Policy version store

A lightweight policy version store is needed to track `expectedPolicyVersion`. This can be a local JSON file or in the SQLite/Postgres index.

## Constraints and Preconditions

- Depends on: PRD-001 (RRP receipt schema) — token structure must align with RRP receipt content model
- Should be implemented alongside or immediately after PRD-001

## Verification

- [ ] GuardDecisionToken interface compiles and matches spec
- [ ] All 11 admission denial codes are tested
- [ ] `policy_version` mismatch correctly denied
- [ ] `expires_at` past correctly denied
- [ ] `dry_run_only` constraint blocks execute mode
- [ ] Missing sig is denied (MVP stub requires kid + sig_b64)
- [ ] TV1 test vectors pass with valid tokens
- [ ] Tamper-negative (token tampered after issue) correctly denied

## Notes

- This is P0 — blocking for builtin.echo slice-zero (PRD-003)
- The signature verification stub must be documented as MVP-acceptable, not production-secure
- Resource caps and egress allowlist are forward-placeholders; implement enforcement when adapters are defined