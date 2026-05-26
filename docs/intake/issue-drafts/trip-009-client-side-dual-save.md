# TRIP-009: Client-Side Anonymizer Dual-Save with Anti-Exploit Protections

## Metadata

- **Type**: security
- **Status**: draft
- **Confidence**: high
- **Source**: `docs/governance/20250710 - Tripwire Protocol - EntifAI.md`
- **Extraction date**: 2026-05-26
- **Labels**: tripwire, client-side, anonymizer, dual-save, anti-exploit
- **Depends on**: TRIP-001, TRIP-007

## Problem Statement

When a tripwire fires, both the client-side anonymizer and the server-side escalation store must each save exactly ONE record — the triggering query. However, saving this record client-side opens an attack surface: malicious actors could try to force fake tripwires to trigger logging, flood the client's save store, or exfiltrate the data via the client-side persistency layer. The design must prevent this exploitation entirely.

## Proposed Solution

### Client-Side Secure Save Architecture

On tripwire fire, the client constructs the record and:
1. **Immediately encrypts** the record with the designated escalation reviewer's public key
2. **Signs** the encrypted blob with the client's ephemeral private key (prevents server-side spoofing the record source)
3. **Stores in volatile/secure storage** (Keychain on mobile, encrypted tempfile on desktop; never in plaintext app database)
4. **Triggers transmission** to server-side only after local rate-limit check passes

### Anti-Exploit Safeguards

**A. Rate-Limiting (tripwire cooldown)**
- Max 1 record saved per device per 10 minutes
- 3 failed attempts to save a record in short succession → device enters cooldown for 1 hour
- Prevents intentional spam of tripwire events to flood the save layer

**B. Signing and Anti-Spoofing**
- Every client-side saved record must be signed by the client's ephemeral key
- Server-side rejects unsigned records or records with invalid signatures
- Prevents adversaries from forging tripwire records from other users' devices

**C. Minimal Record Format**
- Only the SHA256 hash of the query + timestamp + temp device ID are stored locally until quorum approval
- Full query content is only revealed if quorum approves unlock (at which point it is transmitted and the local copy is purged)
- This way, even a compromised client save can't expose raw data

**D. One-Time Read + Purge**
- Local encrypted record can only be decrypted ONCE (by quorum-approved key release)
- After one successful read/transmission, local record is permanently deleted
- TTL purge: records auto-delete after 72h if never accessed
- Prevents data accumulation even if device is compromised later

**E. Secure Transmission**
- Record sent to server ONLY after local rate limit passes AND signed blob is valid
- Transport: mTLS with client certificate — server can verify it's a legitimate client
- Server stores record in HSM-backed encrypted store (not regular DB); no plaintext on disk
- Malicious client cannot flood the server with forged records

**F. Anti-Collusion**
- Client-side record is not accessible to any party until quorum approves — not even the platform operator
- Platform operator cannot "pull" a record from a client; can only receive records the client voluntarily transmits after quorum approval
- Prevents insider threats or government compulsion to extract records

### Server-Side Counterpart

1. Receives only signed, encrypted blobs from client
2. Stores in HSM-backed encrypted store
3. Quorum approval triggers one-time key release → decryption for ethical handler
4. After read: server record is purged, audit log is kept (anonymized)

## Acceptance Criteria

1. Client-side save: only the triggering query is stored; no other data from that session
2. Records are encrypted at save time; plaintext is never written to disk
3. Rate limiting: max 1 save per 10 min per device; exceeds that → request rejected/ignored
4. Signed records: forged records (wrong ephemeral key) are rejected by server
5. One-time access + purge: local record deleted after successful read or 72h TTL
6. Server cannot pull records from client; only receives quorum-approved transmissions
7. No plaintext records in regular database; HSM-encrypted store only
8. Unit + integration tests: rate limit, anti-spoofing, TTL purge, HSM encryption

## Dependencies

- TRIP-001 (envelope format and tripwire fire logic)
- TRIP-007 (proof-of-personhood for device attestation)

## Open Questions

- Which secure storage backend for client-side: Keychain (iOS), Keystore (Android), encrypted tempfile (desktop)?
- HSM implementation for server-side: Cloud HSM (AWS CloudHSM, GCP Cloud KMS) vs. self-hosted?
- How to handle device key rotation if ephemeral key is lost/locked?
