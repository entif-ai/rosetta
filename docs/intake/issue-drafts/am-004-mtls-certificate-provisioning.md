# AM-004: mTLS Certificate Provisioning and Rotation

## Status

draft — `docs/intake/issue-drafts/am-004-mtls-certificate-provisioning.md`

## Metadata

- **Type:** implementation
- **Priority:** P1
- **Source doc:** `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md`
- **Section:** Section 3, Section 2.2
- **Confidence:** medium

## Problem

The spec requires "an authenticated channel (mTLS strongly preferred)" for all inter-agent message transport (Section 3). However, it provides no design for certificate provisioning, rotation, or revocation. The threat model assumes "any worker node can be compromised" (Section 2.2), which means static certificates are insufficient — certificates must be rotatable without downtime and revocable upon node compromise.

Without a certificate provisioning system:
- Nodes cannot bootstrap mutual TLS trust on first launch
- Compromised nodes cannot have certificates revoked without manual intervention
- Certificate expiry can cause production outages
- The mTLS requirement cannot be satisfied in practice

## Evidence

> "Messages MUST traverse an authenticated channel (mTLS strongly preferred) over a secure tunnel or private network path (VPN/WireGuard/Tailscale acceptable)" — Section 3

> "Assume any worker node can be compromised" — Section 2.2 Threat Assumptions

## Required Deliverables

1. Certificate provisioning strategy — options:
   - **SPIFFE/SPIRE:** Industry standard for workload identity; auto-rotation; Kubernetes-friendly
   - **HashiCorp Vault PKI:** Mature; supports short-lived certs and CRL
   - **CFSSL (CloudFlare):** Lightweight; suitable for small deployments
   - **Preshared certificates (not recommended for production):** Manual; no rotation
2. Certificate format: X.509 with SPIFFE-compatible SAN (Subject Alternative Name) or node FQDN
3. Rotation policy: minimum 24h TTL, preferred 1h TTL for production
4. Revocation: CRL or OCSP endpoint; revocation must propagate within one TTL window
5. Node identity bootstrap: how does a new node get its first certificate without a pre-existing trust anchor?
6. Trust anchor management: the CA certificate must be distributed to all nodes; rotation of the CA requires coordinated rollout
7. Monitoring: certificate expiry alerts (warn at 7 days, fail at 1 day)

## Acceptance Criteria

- [ ] Certificate provisioning system selected and documented
- [ ] New nodes can bootstrap certificates without pre-shared secrets
- [ ] Compromised node certificates can be revoked within one TTL window
- [ ] Certificate rotation is automatic (no manual steps for routine rotation)
- [ ] mTLS handshake fails closed on certificate validation error
- [ ] Section 3 transport requirement is satisfiable in production

## Dependencies

- Infrastructure team alignment on certificate tooling
- SPIFFE/SPIRE evaluation if selected (additional spike)

## Labels

`agentic-messaging`, `security`, `infrastructure`

## References

- Source: `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md` Section 2.2, 3
- Related: Transport security, node compromise threat model
