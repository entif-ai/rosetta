# CRT-007: Retention and Expiry for Person-Model Artifacts

## Meta

- **Type:** implementation
- **Severity:** high
- **Confidence:** high
- **Tags:** retention, expiry, person-model, storage, privacy, policy, rpp-identity
- **Source doc:** `docs/ideas/Chat GPT - LLM Reasoning Theory.md` (Governance Addendum §11)
- **Extracted:** 2026-06-01

## Summary

Person models and cognitive fingerprint artifacts must have explicit retention classes, expiry semantics, and review requirements rather than indefinite passive persistence. No indefinite passive persistence by default. Secure deletion, renewal, archival, and downstream propagation constraints must be defined and enforced. This is currently not implemented.

## Evidence

From Governance Addendum §11 (Retention, Decay, and Export Controls):

> A compliant implementation MUST define retention classes and expiry semantics for person-model artifacts, cognitive fingerprints, and identity-sensitive derived features.
> A compliant implementation MUST NOT retain such artifacts indefinitely by default.
> A compliant implementation MUST define conditions for: renewal, revocation, archival, secure deletion, and downstream propagation constraints.
> A compliant implementation MUST enforce export controls on high-fidelity person models and MUST NOT permit uncontrolled export to external tools, autonomous agents, or environments lacking equivalent policy enforcement, unless an explicit policy basis authorizes such export.

## Implementation Requirements

### Retention Class Schema
Define at minimum:
- **Short-term / Ephemeral**: session-scoped; auto-expire after N hours/days; no persistent copy
- **Review-required**: retained until explicit human review and approval for continued retention
- **Long-term / Archival**: retained with explicit consent and renewal interval; subject to periodic re-consent
- **Prohibited / Must-delete**: must be securely deleted; no conditions for retention

### Expiry Semantics
- Time-based expiry: auto-expire at TTL threshold
- Event-based expiry: expire when source consent is withdrawn
- Review-based expiry: require human review before renewal
- Mandatory deletion trigger: subject consent revocation, abuse report, legal hold

### Secure Deletion
- Physical deletion, not just logical removal
- Verify no副本 in vector stores, graph stores, or audit logs (beyond required audit trail)

### Export Controls
- High-fidelity person models require explicit export authorization receipt
- Export destinations must enforce equivalent policy
- Runtime fencing: exported models must not be callable by autonomous agents without additional authorization

### Audit Trail
Every retention state transition (create, renew, revoke, expire, delete) must be receipted.

## Dependencies

- CRT-003 (receipt vocabulary): retention state transitions need typed receipts
- CRT-005 (default-deny): default-deny covers missing retention policy = no indefinite retention
- CRT-008 (anti-impersonation red-team): red-team should test retention expiry enforcement

## Response Options

1. **Implement as storage policy extension** — Add retention class schema to storage layer; enforce via Guard policy; lowest cost
2. **Dedicated person-model store with retention engine** — Separate storage tier with built-in retention enforcement; more robust but higher complexity
3. **Privacy-first: ephemeral by default** — Default all person-model artifacts to short-term/ephemeral unless explicitly promoted; forces explicit consent for any persistence
