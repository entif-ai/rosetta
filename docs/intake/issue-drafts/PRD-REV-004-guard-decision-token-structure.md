# Issue Draft — PRD-REV-004: Implement richer guard decision token structure

## Title

PRD-REV-004: Implement richer guard decision token structure

## Type

implementation

## Labels

guard-tokens, policy-version, resource-caps

## Depends On

PRD-REV-001

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`

> "Include `policy_version`, `policy_hash`, short-lived expiry, subject/tool references, resource caps, and later-ready placeholders like `constitution_hash` or trace IDs"

Code patch in the doc provides the full `GuardDecisionToken` interface and `admit()` implementation.

## Description

The synthesis doc provides a concrete code patch for `rosetta-guard/src/admission.ts` with a richer `GuardDecisionToken` structure:

```typescript
interface GuardDecisionToken {
  decision_id: string;
  decision: GuardDecision; // "allow" | "modify" | "quarantine" | "require_human" | "deny"
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

Admission logic:
- Missing token → deny
- Invalid signature → deny
- Policy version mismatch → deny
- Tool mismatch → deny
- Toolcall CID mismatch → deny
- Expired token → deny
- dry_run_only + execute mode → deny
- Decision = deny/quarantine/require_human → deny
- Otherwise → allow

MVP signature verification stub requires `kid` and `sig_b64` presence (no naked allows).

## Proposed Action

- Adopt `rosetta-guard/src/admission.ts` from the code patch as baseline
- Implement full signature verification (resolve kid, verify sig_b64)
- Add deny-path test coverage
- Add integration test with valid/invalid/expired tokens
- Wire into Alpha RC-2 milestone
