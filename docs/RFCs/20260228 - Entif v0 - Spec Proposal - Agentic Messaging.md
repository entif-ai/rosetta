# Entif v0 - Spec Proposal - Agentic Messaging

## Inter-Agent Communications Protocol (v0.1)

---

### 0. Goals

* Secure, typed, auditable message exchange across heterogeneous agent runtimes and nodes.
* No untrusted text can become executable intent.
* All downstream memory writes derive from verified canonical Rosetta objects.
* Support “replaceable execution substrates” while preserving a single coherent truth/audit spine.

### 1. Non-Goals

* Choosing a specific message bus (NATS vs Redis).
* Defining specific workflows or tasks.
* Performing “semantic understanding” at the perimeter as a security control.

---

## 2. Trust Model

### 2.1 Security Domains

All messages are scoped to a **domain**:
`domain = tenant_id × classification × ABAC labels × vendor_route(optional)`

Cross-domain reuse is forbidden unless explicitly configured.

### 2.2 Threat Assumptions

Assume:

* Any worker node can be compromised.
* The attacker can learn the architecture.
* Message interception, replay, and injection attempts will occur.
* Prompt-injection attempts will ride inside payload text.

---

## 3. Transport Requirements

Messages MUST traverse:

* an authenticated channel (mTLS strongly preferred)
* over a secure tunnel or private network path (VPN/WireGuard/Tailscale acceptable)
* with rate limiting and basic DDoS throttling

Transport choice is pluggable.

---

## 4. Message Types

All bus payloads MUST be one of the following types (enum):

### Data Plane (cannot trigger actions)

* `TASK_RECEIPT` (work performed + hashes + telemetry)
* `INCIDENT_ENVELOPE` (suspicious event report)
* `WORK_UNIT_UPDATE` (status heartbeat for a convoy/work unit)
* `ARTIFACT_PUBLISH` (new artifact available; references only)
* `HEALTH_REPORT` (node health/doctor status)

### Control Plane (requests action; requires Guard decision)

* `ACTION_REQUEST` (request to perform a privileged capability)
* `ACTION_DECISION` (issued by Guard; contains `iam.decision` ref)
* `APPROVAL_REQUEST` / `APPROVAL_RESPONSE` (human-in-loop gating)

**Rule:** Data plane messages MUST NOT contain instructions intended to be executed. They may contain text, but it is treated as untrusted data.

---

## 5. Signed Envelope Format

Every message MUST be wrapped in a signed envelope.

### 5.1 Envelope Fields (required)

* `msg_id` (UUID)
* `msg_type` (enum)
* `schema_version`
* `sender.node_id`
* `sender.principal_ref` (Rosetta/iam principal)
* `issued_at`, `expires_at`
* `nonce` (unique per sender; replay detection)
* `domain_ref` (or domain tags)
* `routing_key` (explicit; not derived from message content)
* `payload_hash` (sha256 of canonical payload bytes)
* `sig` (ed25519 signature over envelope fields + payload_hash)

### 5.2 Validation (required)

The ingest/mailroom MUST:

1. Verify signature
2. Verify `expires_at` not passed
3. Verify nonce not seen before for sender (replay protection)
4. Verify payload hash matches
5. Verify sender is authorized for domain

Failures are quarantined and logged as incidents.

---

## 6. Mailroom / Ingest Pipeline

The ingest worker is the only default ingress beyond the outer perimeter.

### 6.1 Stages (mandatory)

1. **Authenticate & Validate** (Section 5)
2. **Schema Validate** per `msg_type`
3. **Quarantine Raw** (store ciphertext + metadata; append-only)
4. **Canonicalize** into Rosetta tiles/tapestries where applicable
5. **Route** based on explicit type and routing key
6. **Persist**: only canonical forms feed GraphRAG/vector/SQL stores

### 6.2 Quarantine Rules

Messages are quarantined if any of:

* signature invalid
* replay detected
* schema invalid
* domain mismatch
* unexpected size
* unknown message type
* suspicious route attempt

Quarantine triggers an `INCIDENT_ENVELOPE` (typed, signed) to EmCOO/Guard.

---

## 7. Data vs Control Separation

### 7.1 Data Plane Invariants

* Data plane messages cannot cause privileged side effects.
* Data plane messages can only:

  * record observations
  * publish artifact references
  * update statuses
  * report incidents

### 7.2 Control Plane Invariants

* Any privileged execution MUST be preceded by an `iam.decision` issued by Guard.
* An `ACTION_REQUEST` without a valid `iam.decision` ref MUST be denied.
* Executors MUST fail closed if constraints are missing or not understood.

---

## 8. Canonicalization and Rosetta Mapping

### 8.1 Canonicalization

* All payloads intended for storage MUST be canonicalized deterministically.
* Canonical blocks produce content hashes (CIDs).
* Only canonical CIDs are used for downstream references.

### 8.2 Rosetta Objects

* `TASK_RECEIPT` maps to `rosetta.receipt` + linked `rosetta.observation/evaluation`
* `INCIDENT_ENVELOPE` maps to `rosetta.incident` (sealed if needed)
* `WORK_UNIT_UPDATE` maps to a state tile for convoy/work unit progress
* `ACTION_DECISION` maps to `iam.decision` + `rosetta.receipt` attestation

---

## 9. Policy Enforcement (GuardLayer)

The mailroom enforces coarse policy (domain, schema, replay, routing).
The GuardLayer enforces fine policy:

* RBAC/ABAC checks
* budget checks
* tool allowlists
* egress restrictions
* approvals required

All decisions emit receipts.

---

## 10. Observability and KPIs (protocol-level)

Minimum telemetry emitted per message:

* validation status (pass/fail + reason)
* replay hits
* quarantine counts
* receipt completeness
* processing latency (mailroom)
* downstream write confirmation (hash match)
* cost/usage fields when applicable (tokens, cached tokens, $ estimate)

---

## 11. Minimal Implementation Sequence (to avoid overbuild)

1. Signed envelopes + replay protection
2. Typed message schemas + routing keys
3. Quarantine raw store + canonical Rosetta store
4. Guard decision requirement for privileged actions
5. Receipt-first ingestion into GraphRAG/vector/SQL

Semantic interpretation is optional and sandboxed later.

---

## 12. Next Steps

Turn this outline into a **compact spec document** with:

* JSON schemas for each message type
* a validation checklist for the mailroom
* and a one-page diagram of the flow (outer perimeter → mailroom → canonical store → routers → workers).

---
