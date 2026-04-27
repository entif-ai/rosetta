# YAAC-007: ROCK-3005-IAM profile adoption

**Type:** docs-intelligence  
**Draft or Existing Issue:** draft  
**Labels:** rock-3005, iam, rosetta  
**Depends On:** —  
**Evidence:** `docs/chats/20260226 - Chat GPT - YT, Agents, Auth and Cache.md`

## Summary

Adopt ROCK-3005-IAM as the normative Entif IAM profile in Rosetta, defining 4 StdPack tile kinds (iam.principal, iam.delegation, iam.cache_domain, iam.decision), the Guard micro-spine pattern, and default risk classes.

## Profile Status

Draft (Design Phase)

## Normative Dependencies

- Rosetta Core Spine tile kinds: rosetta.run, rosetta.action, rosetta.toolcall, rosetta.observation, rosetta.evaluation, rosetta.receipt, rosetta.policy, rosetta.tapestry
- Rosetta TileEnvelope requirements (content addressing, sig excluded from CID)

## 4 Tile Kinds (StdPack: iam.*)

### iam.principal@0.1
Unified identity for humans, agents, services.
Key fields: principal_id, tenant_id, type (HUMAN/AGENT/SERVICE), status, roles[], attributes.clearance, agent_profile (owner, purpose, max_authority).

Invariants:
- status != ACTIVE → Guard denies non-read by default
- No secrets in tile
- principal_id unique per tenant

### iam.delegation@0.1
Explicit auditable delegation (human→agent).
Key fields: delegator_ref, delegatee_ref, scope (capabilities_allow[], deny[], resource_constraints), validity (issued_at, expires_at).

Invariants:
- Non-amplification: delegation cannot grant what delegator doesn't have
- Time-bounded required
- Guard validates chain on every AGENT action

### iam.cache_domain@0.1
Security boundary + lifecycle/economic policy for shared caching.
Key fields: tenant_id, classification (max_classification, labels), abac_constraints, vendor_constraints (provider, project, region, cross_tenant), lifecycle (ttl_policy, default/max ttl), economics (max_storage_usd/day).

Invariants:
- cross_tenant=false unless PUBLIC_CORPUS
- No cross-boundary cache reuse

### iam.decision@0.1 (keystone)
Formal authorization decision for a single rosetta.action.
Key fields: action_ref, principal_ref, decision (ALLOW/DENY/REQUIRE_APPROVAL/ALLOW_WITH_CONSTRAINTS), reasons[].{code, refs, detail}, constraints (capabilities, tools, budget, egress, data_handling, vendor_route, cache, approvals), validity (issued_at, expires_at, not_before), auth (issuer, subject, delegation_chain, policy_version_set_hash).

Invariants:
- One decision per action
- Non-ALLOW decisions require non-empty reasons[]
- Fail-closed: cannot interpret → deny
- Short validity required
- Budget required for spendful actions

## Guard Micro-Spine Pattern (Required for Side Effects)

For any action producing side effects, required trace:
1. rosetta.action
2. iam.decision
3. rosetta.receipt (auth decision)
4. rosetta.toolcall (if allowed)
5. rosetta.observation
6. rosetta.receipt (tool result)
7. rosetta.evaluation (tokens, cached tokens, latency, $)

Required for: DB writes, FS writes, email, network fetch, cache ops, SCM actions.

## Default Risk Classes

| Class | Examples | TTL | Approval |
| --- | --- | --- | --- |
| Low | CACHE_READ, DOC_RAG | 30 min | No |
| Medium | CACHE_WRITE, HTTP_FETCH, DB_UPSERT | 5-10 min | Optional |
| High | SHELL_EXEC, EMAIL_SEND, SCM_MERGE | 1-2 min | Required |

## Shared Caching Integration

When iam.decision.constraints.cache.allow_reuse=true, must include:
- cache.domain_ref (iam.cache_domain)
- cache.content_hashes[]
- optional cache.tapestry_refs[]

Executor must verify principal authorization + content hash match at execution time; fail closed on mismatch.

## Status

Open.
