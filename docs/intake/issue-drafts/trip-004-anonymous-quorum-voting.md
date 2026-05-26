# TRIP-004: DCP-Inspired Anonymous Quorum Voting with Threshold Crypto

## Metadata

- **Type**: implementation
- **Status**: draft
- **Confidence**: high
- **Source**: `docs/governance/20250710 - Tripwire Protocol - EntifAI.md`
- **Extraction date**: 2026-05-26
- **Labels**: tripwire, threshold-crypto, privacy, dcp
- **Depends on**: TRIP-001

## Problem Statement

Validator voting must be anonymous — no observer can trace which votes were yes, how each voted, or who else was in the quorum. But the outcome (pass/fail to unlock the escalation envelope) must be verifiable. This requires cryptographic primitives that allow collective computation of a threshold without individual exposure.

## Proposed Solution

### DCP-Inspired Commitment Scheme

Each validator produces a "vote envelope":
1. Validatorencrypts their vote (yes/no) with the event'sephemeral session key
2. Validator computes a cryptographic commitment (e.g., Pedersen commitment or HMAC-based commitment) that hides their vote but can be opened later
3. Commitment + session nonce submitted to a shared collection point

### Aggregation Without Decryption

Votes are aggregated using homomorphic encryption or threshold signature schemes:
- **Option A**: Shamir Secret Sharing + XOR masking — each validator adds their vote as a masked value; sum reveals whether threshold reached (yes votes > no votes)
- **Option B**: BLS Threshold Signatures — each validator contributes a partial signature; combined signature threshold-k-of-n reveals outcome
- **Option C**: Ring Signatures (Monero-style) — each validator signs without revealing which key; verification is yes/no without attribution

### Reveal Logic

If quorum threshold (e.g., 3 of 5) is reached:
- Aggregate key is released (sum of all masked commitments = threshold key)
- Escalation envelope can now be decrypted
- Outcome only: "escalate: yes/no"
- Who voted how: never revealed

If quorum NOT reached:
- All masked commitments decay / expire
- No outcome verifiable — envelope auto-deleted

### Anti-Abuse: No Vote Spoofing

- Each validator's session key is ephemeral and cryptographically bound to their validator credentials
- Double-voting is prevented by one-vote-per-signer rule in the aggregation
- Validator signatures are ZK-proof verified before vote is accepted

## Implementation Notes

- **Library options**: `p阈值-shares` (Shamir), `blst` (BLS threshold), `ironfish` or `monero-ringct` (ring signatures)
- **Threshold scheme selection**: BLS is simplest if a threshold key can be pre-generated per event
- **Location**: `src/ethics/crypto/voting.mjs`
- **ZK component**: Optional — use Groth16 or PLONK for proof of valid vote without decryption

## Acceptance Criteria

1. Vote commitments cannot be opened individually to reveal the voter's choice
2. Threshold aggregation reveals pass/fail only after k-of-n votes collected
3. Aggregated outcome is publicly verifiable (anyone with public key can confirm)
4. No single vote is attributable or traceable after aggregation
5. Double-voting by same validator is cryptographically prevented
6. Unit tests: commitment hiding, aggregation correctness, anti-spoofing

## Risks

- **Complexity**: Threshold crypto is non-trivial; consider using an existing library instead of rolling
- **PKI dependency**: Requires a trusted dealer or DKG (Distributed Key Generation) for threshold key setup
- **Privacy-utility tradeoff**: Ring signatures are strong but computationally heavy; BLS is lighter but slightly less anonymous
