# CRT-005: Default-Deny Identity Policy — Implement and Enforce

## Meta

- **Type:** implementation
- **Severity:** critical
- **Confidence:** high
- **Tags:** default-deny, identity-policy, safety, guard-layer, policy-engine, rrp-identity
- **Source doc:** `docs/ideas/Chat GPT - LLM Reasoning Theory.md` (Governance Addendum §5, §Default Prohibitions)
- **Extracted:** 2026-06-01

## Summary

If no explicit identity-sensitive policy applies, Rosetta must default-deny: person-model creation, high-fidelity simulation of living persons, invisible cross-context identity correlation, and export of person-model artifacts to uncontrolled environments. This default-deny posture is the primary safety backstop for personhood provenance. It currently does not exist.

## Evidence

From Governance Addendum §5 (Identity-Sensitive Policy Controls):

> If no explicit identity-sensitive policy applies, the implementation MUST apply a default-deny posture to person-model creation, high-fidelity simulation, invisible cross-context identity correlation, and export of person-model artifacts.

From Governance Addendum §Default Prohibitions:

> Unless an explicit approved policy says otherwise, Rosetta should default-deny:
> - undeclared high-fidelity simulation of living persons
> - invisible cross-context tracking using cognitive fingerprints
> - autonomous use of person models for persuasion optimization
> - export of person-model artifacts to uncontrolled environments
> - and use of personhood provenance for doxxing, harassment, or coercive targeting

## Implementation Requirements

### Policy Engine Extension
- Add identity-sensitive policy class to Guard/EntAffirm policy engine
- Define default-deny rules as explicit policy entries (not implicit absence)
- Ensure default-deny fires when: (a) no policy profile exists for the operation class, OR (b) no explicit authorization chain is present

### Covered Operations
1. Person-model creation — block unless authorized
2. High-fidelity simulation of living persons — block unless authorized + disclosure attached
3. Cross-context identity correlation/tracking — block unless authorized + auditable record
4. Person-model export — block unless authorized + export restrictions bound

### Covered Prohibitions
5. Autonomous persuasion optimization via person models — block always
6. Personhood provenance for doxxing, harassment, coercive targeting — block always
7. Uncontrolled environment export — block always for high-fidelity models

### Audit Trail
Every default-deny firing must produce an audit receipt:
- operation class
- policy evaluation result
- missing authorization element
- timestamp
- routing decision

### Escape Hatch
Systems should have a documented, auditable override mechanism for research/emergency use, but overrides must require elevated authorization and produce an extended audit trail.

## Dependencies

- CRT-004 (Guard identity escalation routing): Guard must enforce the default-deny
- CRT-002 (conformance tiers): RRP-Identity-Restricted conformance requires default-deny enforcement

## Response Options

1. **Implement as Guard default-deny policy entries** — Add explicit deny rules to policy engine; test that identity-sensitive ops without policy are blocked with correct audit trail
2. **Implement as separate identity policy profile** — Create a default-deny identity profile that can be explicitly deactivated with proper authorization; more flexible but more complex
3. **Critical: prioritize over other CRT work** — Default-deny is the primary safety backstop; should be highest priority among CRT issues
