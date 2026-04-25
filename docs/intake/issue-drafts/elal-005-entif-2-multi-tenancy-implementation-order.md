# elal-005: Entif 2.0 — Multi-Tenancy Implementation Order

## Metadata

- **Type**: issue-candidate
- **Extraction**: `docs/backlog/Entif 2.0 - Comprehensive Action Plans.md`
- **Confidence**: medium
- **Finding type**: issue-candidate / gap

## Summary

The cross-cutting invariants list "Tenancy & roles: tenant→org→project→env; role templates + step-up for high-risk actions" as a required property of all Forges, but the implementation plans for each Forge do not sequence multi-tenancy enforcement. The document does not specify when tenant isolation should be introduced (from day one vs. after single-tenant validation), and no tenant scoping is visible in D1–D10 or Forge implementation milestones.

## Problem

If multi-tenancy is treated as an afterthought (added after all Forges are built), it will require invasive changes to every Forge's data models (adding tenant_id to every table), every MCP method (adding tenant scoping to queries), and every AuthForge RBAC check. If treated as day-one, it adds complexity to D1–D3 which are already heavily loaded.

## Open Questions

1. **Day-one vs. deferred**: Should tenant isolation be enforced from the start of Workstream 1 (D1 Ada), or should initial implementation be single-tenant and migration planned later?
2. **Tenant scoping in receipts**: Should receipts.sqlite have a tenant_id column? Should session_id be tenant-scoped?
3. **Tenant isolation in FileForge**: Should CAS storage be partitioned by tenant (separate buckets) or use tenant_id in file metadata?
4. **Tenant scoping in GraphRAG**: Should knowledge graph nodes be tenant-labeled? What happens when one tenant's knowledge bleeds into another's queries?
5. **SocialForge multi-channel**: If one tenant has multiple social accounts (channels), are they isolated from another tenant's channels?
6. **Step-up auth per tenant**: Is step-up auth (for high-risk actions like publish) per tenant policy or global?
7. **Migration cost**: If deferred, what is the estimated migration cost (in milestones) to add tenant_id to existing schemas?

## Recommendation

Create an RFC `docs/RFCs/Multi-Tenancy-Implementation-Order.md` that:

1. Defines the tenant data model (tenant→org→project→env hierarchy)
2. Specifies which Forge data stores require tenant_id columns
3. Proposes either "tenant-first" (enforce from D1) or "tenant-isolated" (single-tenant first, migrate at a defined milestone) with cost/benefit analysis
4. Defines the tenant isolation strategy per data store (separate DBs vs. row-level security vs. application-level)
5. Updates the implementation plan to include multi-tenancy tasks at appropriate milestones

## Evidence

From source document:
- Cross-cutting invariants: "Tenancy & roles: tenant→org→project→env; role templates + step-up for high-risk actions (publish, restore, immutability unlock)"
- SocialForge M4: "Multi-Org and Multi-Tenant Support — (If relevant) ensure SocialForge can handle multiple user organizations safely... If not in initial scope, document that single-tenant assumption"
- AuthForge: "Each channel resource can have ACLs (so maybe certain users can post to Twitter account A but not B)" — suggests tenant scoping at channel level
- No D-series or M-series milestone includes tenant_id additions to schemas

## Labels

- multi-tenancy
- authforge
- architecture
- entropy-2
- deferred

## Status

open
