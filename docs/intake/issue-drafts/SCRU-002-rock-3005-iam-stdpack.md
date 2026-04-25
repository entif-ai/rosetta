# SCRU-002: Define ROCK-3005-IAM StdPack — iam.principal, iam.delegation, iam.cache_domain, iam.decision

**Type:** specification  
**Status:** draft  
**Labels:** rosetta, rock-3005, iam-stdpack, auth, tile-schema  
**Depends on:** —

---

## Context

The "Security, Caching and Rosetta Updates" conversation (2026-02-21) culminates in a concrete proposal for an IAM StdPack (ROCK-3005-IAM) containing tile kinds that snap onto Rosetta v3.0.0 Core Spine. This extends Rosetta's AuthZ vocabulary via StdPack (not core expansion), preserving the "extensions via packs, not core expansion" posture.

This is not yet in any Rosetta spec or implementation.

## Claim

Rosetta v3.0.0 already defines the operational trace (Run → Action → ToolCall → Observation → Evaluation + Receipt + Policy + Incident Envelope). What is missing is a standardized way to represent the authorization decision artifact itself. The IAM tiles fill this gap: iam.decision (authorization decision), iam.principal (identity), iam.delegation (chain of command), and iam.cache_domain (cache security boundary).

## Tile Kinds

### iam.principal@0.1
**Purpose**: Unified identity for humans, agents, and services.

**Required fields**:
- body.principal_id (stable id)
- body.tenant_id
- body.type ∈ {HUMAN, AGENT, SERVICE}
- body.status ∈ {ACTIVE, SUSPENDED, REVOKED}
- body.roles[] (may be empty)
- body.attributes.clearance (classification ceiling)
- sig (issuer signature)

**Additional required when type=AGENT**:
- body.agent_profile.owner_principal_ref
- body.agent_profile.purpose
- body.agent_profile.max_authority

**Invariants (MUST)**:
- If status != ACTIVE, Guard implementations MUST deny all non-read capabilities by default
- iam.principal MUST NOT contain secrets or raw credential material
- principal_id MUST be unique within tenant_id

### iam.delegation@0.1
**Purpose**: Explicit, auditable delegation of authority from one principal to another (typically human → agent).

**Required fields**:
- body.delegator_ref (iam.principal)
- body.delegatee_ref (iam.principal)
- body.scope.capabilities_allow[]
- body.scope.capabilities_deny[] (may be empty)
- body.validity.issued_at
- body.validity.expires_at
- sig

**Invariants (MUST)**:
- Non-amplification: delegation MUST NOT grant any capability the delegator does not possess
- Delegations MUST be time-bounded (expires_at required)
- Guard MUST validate delegation chain on every governed action where actor.type=AGENT, unless platform/system principal explicitly exempted

### iam.cache_domain@0.1
**Purpose**: Security boundary and lifecycle/economic policy for shared cached context artifacts.

**Required fields**:
- body.tenant_id
- body.classification.max_classification
- body.abac_constraints (ABAC attribute constraints; may be permissive but MUST exist)
- body.vendor_constraints.provider
- body.vendor_constraints.project_ref
- body.vendor_constraints.region
- body.vendor_constraints.cross_tenant (boolean)
- body.lifecycle.ttl_policy
- body.lifecycle.default_ttl_seconds
- body.economics.max_storage_usd_per_day
- sig

**Invariants (MUST)**:
- If cross_tenant=true, domain MUST be explicitly labeled for public/shared corpora and MUST NOT allow sensitive classifications
- Cache handles and cached artifacts MUST NOT be reused across mismatched vendor_constraints (provider/project/region/account) boundaries
- Guard MUST enforce max_classification ceiling and ABAC constraints on cache reuse decisions

### iam.decision@0.1
**Purpose**: Formal authorization decision for a single governed rosetta.action, including enforceable constraints.

**Required fields**:
- body.action_ref (CID of rosetta.action)
- body.principal_ref (CID of iam.principal)
- body.decision ∈ {ALLOW, DENY, REQUIRE_APPROVAL, ALLOW_WITH_CONSTRAINTS}
- body.constraints (MUST exist even if empty)
- body.validity.issued_at, body.validity.expires_at
- auth.policy_version_set_hash
- sig

**Recommended fields**:
- body.reasons[] with: code (canonical reason vocabulary), refs[] (policy tiles or authoritative references)

**Invariants (MUST)**:
- One decision per action: iam.decision MUST reference exactly one rosetta.action; if action changes materially, new action and decision MUST be generated
- Explainability: if decision != ALLOW, reasons[] MUST be non-empty
- Fail-closed: if executor cannot interpret constraints, it MUST deny execution
- Short-lived: expires_at MUST be present; SHOULD be short based on capability risk class
- Budget required for spendful actions: any decision granting capabilities that incur vendor spend MUST include constraints.budget object

## Guard Micro-Spine Pattern (Normative)

For any action that produces side effects, implementations MUST emit:
1. rosetta.action (intent + target + content hashes)
2. iam.decision (authorization decision)
3. rosetta.receipt (attests authorization decision; derived_from action + decision + policy set)
4. If allowed: rosetta.toolcall
5. rosetta.observation
6. rosetta.receipt (attests tool result integrity; links to observation)
7. rosetta.evaluation (tokens, cached tokens, latency, $)

Required for: DB writes, filesystem writes, email, network fetch, cache create/reuse/invalidate, SCM actions.

## Default Risk Class TTLs and Approval Rules (Recommended)

- **Low risk** (CACHE_READ, DOC_RAG): TTL 30 min, no approval required
- **Medium risk** (CACHE_WRITE, HTTP_FETCH, DB_UPSERT): TTL 5-10 min, approval optional based on classification/target
- **High risk** (SHELL_EXEC, EMAIL_SEND, SCM_MERGE): TTL 1-2 min, approval required with configurable quorum

## Option vs Option

- **Option B (recommended)**: Define iam.decision as new StdPack tile kind (cleaner semantics)
- **Option A**: Implement as specialized rosetta.receipt subtype (fewer core changes; sufficient immediately)

Recommendation: Option B long-term; document Option A as transitional path.

## Relation to Rosetta Core

These tiles attach to Actions/ToolCalls via derived_from and lattice edges. They do NOT replace Rosetta core tiles. rosetta.tapestry is used for cached context packs (already exists in v3.0.0). Cache reuse decisions produce rosetta.receipt and rosetta.evaluation.

## References

- Source: docs/chats/20260221 - Chat GPT - Security, Caching and Rosetta Updates.md
- Rosetta v3.0.0 Core Spine Specification (existing)
- Entif 2.0 Secure Architecture Companion (Guard Layer as PEP)
- Entif 2.0 Decentralization and Governance (Genesis Protocol authority)
- Related: ROCK-3005 Profiles (proposed home for this spec)