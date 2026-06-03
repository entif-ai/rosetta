# CRT-011: Predictive Manipulation Block Receipt — Implement rrp:predictive_manipulation.block

## Meta

- **Type:** implementation
- **Severity:** high
- **Confidence:** high
- **Tags:** receipts, predictive-manipulation, policy, guard-layer, abuse-prevention, rpp-identity
- **Source doc:** `docs/ideas/Chat GPT - LLM Reasoning Theory.md` (Governance Addendum §10, §6)
- **Extracted:** 2026-06-01

## Summary

The typed artifact `rrp:predictive_manipulation.block` — recording when a system blocks a workflow attempting to use person models for coercive targeting, exploit optimization, harassment, doxxing, or undeclared persuasion optimization — is defined in the receipt vocabulary (§6) but not yet implemented. This receipt is essential for auditability of predictive manipulation blocks.

## Evidence

From Governance Addendum §6 (Receipt Vocabulary):

> `rrp:predictive_manipulation.block` — for records of blocked predictive manipulation workflows

From Governance Addendum §10 (Predictive Manipulation Restrictions):

> MUST NOT use person models, cognitive fingerprints, or identity-derived behavioral predictions for coercive targeting, exploit optimization, harassment, doxxing, or undeclared persuasion optimization.
> If the system blocks such a workflow, it SHOULD emit a typed artifact recording the block basis without disclosing unnecessary sensitive internals.

## Receipt Schema

`rrp:predictive_manipulation.block` must record:

| Field | Required | Description |
|-------|----------|-------------|
| block_id | yes | Unique identifier for this block event |
| blocked_at | yes | ISO timestamp |
| workflow_id | yes | Identifier of blocked workflow |
| block_basis | yes | Which restriction was triggered (coercive-targeting / exploit-optimization / harassment / doxxing / persuasion-optimization) |
| person_model_ref | no | Reference to person model used in attempted workflow (if available; omit if disclosure risk) |
| feature_classes | no | Identity features involved (if determinable without disclosure) |
| guard_policy_ref | yes | Which Guard policy rule triggered the block |
| auth_required | no | Whether elevated authorization was attempted and failed |
| reporter_role | yes | Role of system component that emitted block (Guard / RPP Lens / etc.) |

Note: Must NOT disclose unnecessary sensitive internals (person model internals, full corpus references, etc.) in the receipt itself.

## Implementation Requirements

### Guard Integration
- Guard must emit `rrp:predictive_manipulation.block` when blocking §10-restricted workflows
- Guard must NOT include raw person-model data or corpus references in the receipt

### Verification Path
- Authorized auditors must be able to use block receipts to reconstruct: what was blocked, when, by what policy, and what authorization was missing
- Block receipts must NOT leak the very sensitive data they are protecting

### Test Coverage
- Positive: §10-restricted workflow is blocked and receipt is emitted
- Negative: non-§10 workflow does not emit this receipt type
- Receipt integrity: block receipt is signed and tamper-evident

## Dependencies

- CRT-003 (receipt vocabulary): schema defined there; this is the implementation of one specific receipt
- CRT-005 (default-deny): CRT-005 defines the policy rules that trigger these blocks
- CRT-004 (Guard identity routing): Guard emits the receipt

## Response Options

1. **Implement as Guard policy block hook** — Add rrp:predictive_manipulation.block emission to Guard's policy enforcement; straightforward extension
2. **Implement as separate Guard audit event** — Emit block event to audit log as structured record, then transform to typed receipt; more flexible
3. **Coordinate with CRT-003** — Define schema in CRT-003, implement in this ticket; ensures schema is stable before implementation
