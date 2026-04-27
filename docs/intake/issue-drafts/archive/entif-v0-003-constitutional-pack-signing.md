# ENTIF-v0-003: Constitutional Pack Signing Algorithm, Key Rotation, and Provisioning Unspecified

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-003 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #14 in ledger |
| Confidence | `high` |

---

## Problem Statement

The constitutional pack schema defines:

```yaml
signing:
  canonicalization: "RFC8785_JCS"
  signature_required: true
  public_key_id: "pk_..."
```

**But does not specify:**
- The signature algorithm (RSA-PSS, Ed25519, ECDSA, etc.)
- Key rotation policy (how often, how to propagate new keys)
- Public key provisioning mechanism (how does a node receive `public_key_id` and trust it)
- What constitutes a valid signature (which fields are signed, how is the signed payload structured)
- How signature verification failures are handled (hard reject? log and proceed? quarantine?)

Without these, the signing mechanism is a structurally empty security control — it provides no actual integrity guarantee.

---

## Evidence

The spec cites RFC 8785 for canonicalization and states `signature_required: true` as a constraint. The PROV-O reference (W3C Recommendation) provides provenance modeling concepts but no specific signature format.

The only concrete field is `public_key_id: "pk_..."` which is a placeholder string with no defined format or provisioning path.

---

## Impact

- Constitutional packs could be tampered with at rest with no detection
- Nodes cannot verify each other's constitutional packs without a trust-on-first-use or PKI mechanism
- Key compromise has no recovery procedure (no rotation defined)
- Compliance requirements (e.g., audit-grade signing) cannot be met

---

## Dependencies

- None (security gap independent of other issues)

---

## Suggested Resolution

1. Specify signature algorithm: Ed25519 (recommended for performance + security balance)
2. Define key rotation cadence: 90-day rotation, with a grace period where old keys remain valid for verification
3. Define provisioning: CA-signed certificates for multi-tenant; self-signed for single-tenant with optional external attestation
4. Define verification failure behavior: hard reject (envelope invalidated) + metric emitted
5. Define what is signed: the canonicalized YAML (excluding the signature field itself)
6. Add `signature_algorithm`, `key_valid_from`, `key_expires_at` fields to the constitutional pack schema

---

## Open Questions

- Should signing be mandatory for single-tenant deployments or only multi-tenant?
- Is there a key revocation mechanism (CRL or OCSP)?