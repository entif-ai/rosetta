# CRT-002: RPP-Identity-* Conformance Tiers — Define and Certify

## Meta

- **Type:** implementation
- **Severity:** high
- **Confidence:** high
- **Tags:** rpp, conformance, identity, rrp-identity-aware, rrp-identity-restricted, rrp-identity-auditor, specification
- **Source doc:** `docs/ideas/Chat GPT - LLM Reasoning Theory.md` (Governance Addendum §13)
- **Extracted:** 2026-06-01

## Summary

The Governance Addendum proposes three new RPP conformance profiles for identity-sensitive operations: RRP-Identity-Aware (detect/classify), RRP-Identity-Restricted (enforce policy gates + default-deny), and RRP-Identity-Auditor (reconstruct full authorization chain). These tiers are defined normatively but not yet specified as RPP conformance classes with testable criteria.

## Evidence

From Governance Addendum §13:

> **RRP-Identity-Aware** — The implementation can detect, classify, and label identity-sensitive workflows.

> **RRP-Identity-Restricted** — The implementation can enforce policy gates and authorization controls for person-model creation, update, comparison, export, and simulation. MUST enforce default-deny for unauthorized person-model creation and undeclared high-fidelity simulation.

> **RRP-Identity-Auditor** — The implementation can reconstruct, for authorized review, whether a person model was created, from what sources, under what authority, with what risk findings, under what disclosures, and with what retention or export state.

Current RPP spec (ROCK-31XX) has no identity-aware conformance classes. These three tiers must be formally added.

## Implementation Requirements

### RRP-Identity-Aware
- Workflow classification engine that detects 8 identity-sensitive classes (§3): feature extraction, similarity assessment, cross-corpus correlation, person-model creation, person-model update, high-fidelity simulation, identity export, predictive person-targeting
- Classification output bound to workflow state and emitted in receipts
- Test harness: submit workflows of each class; verify correct classification

### RRP-Identity-Restricted
- All RRP-Identity-Aware requirements
- Policy gate enforcement before any identity-sensitive operation proceeds
- Default-deny enforcement when no explicit identity policy applies
- Test harness: attempt identity-sensitive ops without policy; verify block + audit trail

### RRP-Identity-Auditor
- All RRP-Identity-Restricted requirements
- Full authorization chain reconstruction: subject or pseudonymous handle, feature classes, input provenance, policy profile, authorization chain, verification outcome, disclosure state, retention/expiry
- Protected pseudonymous references where full subject exposure creates unacceptable risk
- Test harness: reconstruct audit trail for identity-sensitive ops and verify completeness

## Dependencies

- CRT-001 (research program): NOT blocked; can proceed in parallel
- CRT-003 (receipt vocabulary): blocked; RRP-Identity-Auditor needs typed receipts to reconstruct authorization chain
- CRT-004 (Guard identity routing): blocked; RRP-Identity-Restricted needs Guard policy enforcement
- CRT-005 (default-deny): blocked; RRP-Identity-Restricted requires default-deny implementation

## Response Options

1. **Add to ROCK-31XX spec patch** — Define three tiers as normative RPP conformance classes with MUST/SHOULD test criteria; coordinate with existing ROCK-31XX normative sections
2. **Separate RPP-Identity conformance spec** — Create a standalone RPP-Identity spec that extends ROCK-31XX; cleaner for review but adds a new doc
3. **Defer until Guard layer identity routing is implemented** — RRP-Identity-Restricted and RRP-Identity-Auditor require Guard infrastructure; define tiers in spec but defer certification until CRT-004 is complete
