# PDR-004: Implement GuardDecisionToken with Full Structure (policy_version, policy_hash, expiry, constraints)

## Metadata

| Field | Value |
|---|---|
| Type | implementation |
| Status | draft |
| Labels | guard, decision-token, implementation |
| Confidence | high |

## Evidence

Extraction: `docs/intake/docs-intelligence/2026-06-05-prd-revision-synthesis.md`
Finding: "Guard decision tokens gain more structure"

## Problem

The current `GuardDecisionToken` interface is incomplete. The synthesis requires: `policy_version`, `policy_hash`, short-lived expiry, subject/tool references, resource caps, `constitution_hash` placeholder, and trace IDs. `constraints.dry_run_only` is also required. The current implementation lacks these fields.

## Proposal

Extend `GuardDecisionToken` interface to include all required fields:

```typescript
export interface GuardDecisionToken {
  decision_id: string;
  decision: GuardDecision; // "allow" | "modify" | "quarantine" | "require_human" | "deny"
  issued_at: string;
  expires_at: string; // short-lived expiry — required, not optional
  policy_version: string; // required for version alignment
  policy_hash?: string; // commitment to exact policy text
  constitution_hash?: string; // future-ready placeholder
  chain_height?: number; // for freshness anchoring
  subject: {
    tool: string; // must align with tool being invoked
    toolcall_cid: string; // must match the actual CID of the toolcall
    tenant_id?: string;
    effects?: string[]; // enumerated effect list
  };
  constraints?: {
    dry_run_only?: boolean; // blocks execute mode if set
    resource_caps?: { cpu_ms?: number; mem_mb?: number };
    egress_allowlist?: string[];
  };
  rationale?: string; // human-readable justification
  sig: {
    alg: string;
    kid: string;
    signed: string; // CID or stable multihash commitment
    sig_b64: string;
  };
}
```

**Admission rules:**
1. Missing token → deny (MISSING_DECISION_TOKEN)
2. Invalid signature → deny (INVALID_DECISION_SIGNATURE)
3. Policy version mismatch → deny (POLICY_VERSION_MISMATCH)
4. Subject/tool mismatch → deny (TOOL_MISMATCH)
5. Subject/toolcall CID mismatch → deny (TOOLCALL_CID_MISMATCH)
6. Tenant mismatch → deny (TENANT_MISMATCH)
7. Expired token → deny (DECISION_EXPIRED)
8. `dry_run_only` with execute mode → deny (DRY_RUN_ONLY)
9. `decision === "deny"` → deny (DECISION_DENY)
10. `decision === "require_human"` → deny (HUMAN_APPROVAL_REQUIRED)
11. `decision === "quarantine"` → deny (QUARANTINED)

## Implementation Notes

- Fail-closed: any unhandled condition defaults to deny
- Signature verification stub uses `!!token.sig?.kid && !!token.sig?.sig_b64` for MVP
- Full signature verification (canonicalize without transient fields, resolve kid, verify sig) is a follow-up
- `expires_at` is required, not optional — tokens without expiry are invalid

## Depends On

- _(no dependencies — can be implemented independently)_

## References

- Source doc: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Extraction: `docs/intake/docs-intelligence/2026-06-05-prd-revision-synthesis.md`
- Code patch: `packages/rosetta-guard/src/admission.ts` (from synthesis)