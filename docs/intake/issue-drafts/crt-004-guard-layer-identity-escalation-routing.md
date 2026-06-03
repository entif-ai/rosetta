# CRT-004: Guard Layer Identity Escalation Routing — Policy Gates for Identity-Sensitive Ops

## Meta

- **Type:** implementation
- **Severity:** high
- **Confidence:** high
- **Tags:** guard-layer, identity-sensitive, policy-gates, escalation, entaffirm, routing
- **Source doc:** `docs/ideas/Chat GPT - LLM Reasoning Theory.md` (Governance Addendum §"Architecture Hooks > Guard Layer")
- **Extracted:** 2026-06-01

## Summary

The Guard layer (Guard/EntAffirm) must classify and route identity-sensitive operations through stricter verification and approval policies. The addendum requires Guard to extend its classification logic to detect the 8 identity-sensitive operation classes (§3) and route them through elevated authorization controls. Currently Guard has no identity-sensitive classification logic.

## Evidence

From Governance Addendum §"Architecture Hooks > Guard Layer":

> Extend Guard / EntAffirm to classify identity-sensitive operations and route them through stricter verification and approval policies.

From §7 (Authorization Requirements): elevated authorization required for:
- creating a person model
- materially updating a person model
- comparing a corpus against a protected person signature
- exporting a person-model artifact
- enabling high-fidelity simulation of a real living person

From §8 (Simulation Restrictions): Guard must block undeclared high-fidelity simulation.

From §10 (Predictive Manipulation): Guard must block predictive manipulation workflows.

## Implementation Requirements

### Identity-Sensitive Classification
Guard must detect identity-sensitive operations by type:
- `feature_extraction`: extracting identity-grade or quasi-biometric signals from input
- `similarity_assessment`: comparing output or artifact against a protected person signature
- `cross_corpus_correlation`: linking apparently separate accounts or corpora to same source
- `person_model_creation`: creating a new person model
- `person_model_update`: materially updating an existing person model
- `high_fidelity_simulation`: generating content likely to be taken as genuine personhood authorship
- `identity_export`: exporting person-model artifacts
- `predictive_person_targeting`: using person models for persuasion optimization, coercion modeling, exploit targeting

### Escalation Paths
Each identity-sensitive class must route to its required authorization path (§7):
- human-in-the-loop approval
- named policy attestation
- multi-party approval
- role-based access enforcement
- additional verifier passes

### Default-Deny Integration
Guard must enforce default-deny when no explicit identity policy applies (§5). This is the backstop: any identity-sensitive op without a matching policy profile is blocked and audited.

### Receipt Emission
Guard must emit typed receipts for:
- `rrp:identity.feature_extraction` (for detected classification events)
- `rrp:simulation.authorization` / rejection
- `rrp:person_model.creation` / rejection
- `rrp:person_model.update` / rejection
- `rrp:identity.export_authorization` / rejection
- `rrp:predictive_manipulation.block`

## Dependencies

- CRT-002 (conformance tiers): RRP-Identity-Restricted requires this
- CRT-003 (receipt vocabulary): Guard emits the typed receipts defined there
- CRT-005 (default-deny): Guard enforces the default-deny policy

## Response Options

1. **Extend Guard classification framework** — Add identity-sensitive as a new Guard classification axis alongside existing policy classes; implement routing rules per §3 and §7
2. **Separate identity Guard profile** — Create a dedicated identity Guard configuration that composes with existing Guard policies; cleaner separation but more moving parts
3. **Defer until NOT LAME write-admission gate is complete** — Guard's identity routing depends on the broader write-admission gate being stable; coordinate timing
