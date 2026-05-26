# Issue Draft: EDG-007 — HSM/Gnosis Safe Infrastructure Gap (Aspirational, No Current Path)

## Metadata

| Field | Value |
|---|---|
| Issue ID | EDG-007 |
| Type | infrastructure |
| Status | draft |
| Source doc | docs/governance/Entif 2.0 - Decentralization and Governance.md |
| Extraction date | 2026-05-26 |
| Confidence | low |

## Problem

The Entif 2.0 governance doc describes a 5-of-7 multisig Genesis key infrastructure using HSMs (Hardware Security Modules) with air-gapped key ceremonies. This infrastructure does not exist in the current Rosetta/Entif stack and has no implementation path.

## Specific Infrastructure Requirements

1. **HSM hardware**: Hardware Security Modules for storing Genesis private key shares
2. **Air-gapped ceremony machines**: Offline laptops for signing ceremonies (modeled on ICANN DNSSEC key ceremonies)
3. **Multi-sig wallet (Gnosis Safe or custom)**: 5-of-7 threshold for Genesis-level changes
4. **Key ceremony protocol**: Physical security, video documentation, multi-party control
5. **Key recovery plan**: What happens if key-holders are unavailable (loss, death, etc.)
6. **Genesis keypair (Ed25519)**: Public key hard-coded into all Entif nodes at build time

## Current Stack Gap

- No HSM hardware in any current environment
- No multi-sig infrastructure (Gnosis Safe or equivalent)
- No Genesis keypair or genesis public key in current Bootstrap
- Doctrine v0.2 serves as constitutional authority, not Genesis Protocol

## Relationship to EDG-006 (Emergency Halt)

EDG-006 (emergency halt mechanism) is a near-term requirement that CAN be implemented without full HSM infrastructure. EDG-007 is the full Genesis Protocol infrastructure which is aspirational.

## Recommended Action

1. **Do not include HSM multisig in any near-term roadmap** — it requires separate infrastructure project
2. **Document as long-horizon infrastructure requirement**: "Genesis Protocol infrastructure (HSM + multisig) is a future Phase 3+ requirement"
3. **EDG-006 (emergency halt) can proceed with simpler signed-halt mechanism** that does not require full HSM infrastructure
4. **Add to knowledge graph**: "genesis-protocol-hsm" as aspirational infrastructure concept, not current implementation

## Labels

hsm, multisig, genesis-protocol, infrastructure, future-work, aspirational

## Depends On

(None — aspirational, no near-term dependencies)

## Related Issues

- EDG-006 (emergency halt — near-term version can proceed without HSM)
- EDG-001 (terminology mapping — Genesis Protocol maps to Doctrine v0.2 for current implementation)