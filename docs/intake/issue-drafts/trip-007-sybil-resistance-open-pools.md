# TRIP-007: Sybil Resistance for Open/Public Validator Pools

## Metadata

- **Type**: security
- **Status**: draft
- **Confidence**: high
- **Source**: `docs/governance/20250710 - Tripwire Protocol - EntifAI.md`
- **Extraction date**: 2026-05-26
- **Labels**: tripwire, sybil-resistance, proof-of-personhood, security
- **Depends on**: TRIP-002, TRIP-003

## Problem Statement

In open or public deployments, attackers can create thousands of fake validator identities to dominate random selection in validator pools ("Sybil attack"). The randomized cohort selection from TRIP-002 is only meaningful if pool entry is sufficiently expensive or attested to prevent this.

## Proposed Solution

### Proof-of-Personhood (PoP) Entry Requirement

Every validator in a public/open pool must prove they are a unique real person. Options:

**A. Orbital/WorldID (Worldcoin)**
- Biometric orb-based proof-of-personhood
- Strongest guarantee but requires hardware

**B. BrightID**
- Social graph-based proof-of-personhood
- No hardware required; based on verified connections
- Good coverage for progressive privacy-conscious communities

**C. Keybase/Provenferral**
- Social verification via trusted introducers
- Lightweight; suitable for trusted communities

**D. Government ID + ZK Proof**
- Verified ID issuance with zero-knowledge proof of uniqueness
- Highest friction; appropriate for enterprise critical environments

### Reputation Staking

Beyond PoP, validators stake a reputation bond:
- **Stake amount**: Configurable per pool; must be high enough to make Sybil attack economically impractical
- **Slashing**: Malicious or negligent behavior results in stake slashing (partial or full)
- **Reputation score**: Accumulated from successful validations, decays over time if inactive

### Dynamic Scoring and Culling

- Validators with low reputation scores see fewer events
- Anomalous voting patterns (e.g., rubber-stamping yes/no without domain relevance) trigger automatic review and potential removal
- Regular pool culling: validators inactive for > 30 days are removed unless they re-attest

### Cross-Pool Sybil Intelligence Sharing

Federated organizations share (securely and privately) information about known Sybil actors or reputation-damaged validators across pools — enabling rapid cross-org blacklisting without revealing who was the source of the report.

## Acceptance Criteria

1. New validators cannot join pool without PoP attestation
2. Economic cost of controlling > 50% of a pool is prohibitively high (stake + PoP)
3. Anomalous voting patterns are detectable within 48 hours and result in slashing
4. Cross-org blacklist is propagated within 1 hour of confirmed Sybil detection
5. Legitimate validators who lose their device can recover without losing reputation (via social recovery)
6. Unit tests: Sybil cost modeling, voting pattern anomaly detection, blacklist propagation

## Dependencies

- TRIP-002 (VRF selection)
- TRIP-003 (federated pool registry)

## Open Questions

- Which PoP mechanism is most appropriate for each deployment context?
- What is the minimum stake amount to deter nation-state-level adversaries?
- How to handle anonymity of legitimate validators in the PoP verification process?
