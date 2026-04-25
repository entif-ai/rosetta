# ENTIF-v0-014: Constitutions Scope Difference Matrix (Single-Tenant vs Multi-Tenant) Incomplete

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-014 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #28 in ledger |
| Confidence | `medium` |
| Depends On | — |

---

## Problem Statement

The spec says constitutional principles can be applied differently for single-tenant vs multi-tenant via scope bindings, and provides one example:

- Single-tenant personal: `pii_allowed: true`
- Multi-tenant enterprise: `pii_allowed: false`

**But the full scope difference matrix is not provided.** Only one example is given; all other policy differences between scopes are undefined.

---

## Evidence

The constitutional pack schema defines `scope_profiles` with:

```yaml
scope_profiles:
  - scope: "single_tenant_personal"
    constraints:
      pii_allowed: true
      external_sharing: false
  - scope: "multi_tenant_enterprise"
    constraints:
      pii_allowed: false
      external_sharing: "policy_gate"
      audit_required: true
```

This is the only scope difference documented. What about:
- Tool use default (deny vs allow)?
- Licensing policy?
- Safety policy?
- Signing requirements?
- Receipt retention period?

---

## Impact

- Multi-tenant deployments cannot be properly configured without a complete scope matrix
- Constitutional packs designed for single-tenant may violate multi-tenant requirements when deployed enterprise-wide
- The Constitutional Artifact Library cannot be populated without knowing which policies differ per scope

---

## Dependencies

- None (governance gap independent of implementation)

---

## Suggested Resolution

1. Define the full scope difference matrix as a table:
   - Rows: policy dimension (tool use, licensing, safety, signing, receipt retention, external sharing, PII, audit)
   - Columns: single_tenant_personal | single_tenant_enterprise | multi_tenant_enterprise
   - Cells: the constraint value per scope per dimension
2. Provide rationale for each difference (why does multi-tenant require audit but single-tenant does not?)
3. Define a default constitutional pack per scope
4. Define the migration path: if a single-tenant pack is deployed to multi-tenant, what validation fails?

---

## Open Questions

- Should there be a third scope: "single_tenant_enterprise" (a company running their own Entif deployment, not multi-tenant but also not personal)?
- Is the scope binding evaluated at envelope creation time, or at constitutional pack loading time?