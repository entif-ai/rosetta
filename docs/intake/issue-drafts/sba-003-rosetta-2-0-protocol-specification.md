# SBA-003: Rosetta 2.0 Protocol — implementation-ready specification for Layer 0–3 tiles and genesis key management

## Status

draft — `docs/intake/issue-drafts/sba-003-rosetta-2-0-protocol-specification.md`

## Metadata

- **Type:** implementation
- **Priority:** P1
- **Source doc:** `docs/backlog/Entif v0 Second Brain Architecture Plan.md`
- **Section:** Phase 5 (The Rosetta 2.0 Protocol and Tripwire Governance)
- **Confidence:** high

## Problem

Rosetta 2.0 is described as a four-layer meaning pipeline (Layer 0 Signals, Layer 1 Forms, Layer 2 Lexemes, Layer 3 Concepts) with named tile types (rosetta.run, rosetta.action, rosetta.toolcall, rosetta.observation, rosetta.conjecture, rosetta.form.token, rosetta.pasigram, rosetta.lexeme, rosetta.matrix, rosetta.episteme, rosetta.policy, rosetta.incident). However, the following are entirely undescribed:

1. **Tile serialization format:** How are Cognitive Tiles encoded? JSON? CBOR? Protobuf? What is the cryptographic header format (which hash algorithm, which signature scheme)?
2. **Layer 0–3 transformation functions:** What is the algorithm that transforms a Layer 0 signal into a Layer 1 form? A Layer 1 form into a Layer 2 lexeme? These are not described
3. **rosetta.policy genesis key management:** Who generates the genesis keys? Is there an offline ceremony? How are keys rotated? How is revocation handled? Can the policy ever be updated?
4. **rosetta.observation immutability claim:** The document claims Layer 0 isolation "mathematically prevents any agent from retroactively altering past inputs." No mathematical specification or tamper-evidence mechanism is provided
5. **rosetta.incident trigger conditions:** What constitutes a failure triggering rosetta.incident? No threshold, no detection algorithm
6. **Tripwire Protocol semantic filter:** "local, ultra-fast semantic filter classifies intent" — what is the algorithm? Rule-based? ML model? Keyword matching? No description whatsoever
7. **Relationship to Rosetta v3.0.0 Core Spine spec:** This document predates or is parallel to the v3.0.0 spec; the tile model here may diverge

## Evidence

> "Cognitive Tile is a self-contained architectural unit containing a cryptographic header, connection borders for graph linking, and a payload of semantic logic called the 'Gnostic Field'" — Phase 5

> "rosetta.policy: An immutable constitution signed by authorized genesis keys that defines machine-enforceable rules, ethical boundaries, and hard resource constraints" — Phase 5

> "By isolating observations, the protocol mathematically prevents any agent from retroactively altering, editing, or hallucinating past inputs" — Phase 5

> "Tripwire Protocol is defined as a 'live-time ethical interception' mechanism. It guarantees that no forensic bundle, memory, or traceback store is retained by the system during external API inference calls...a local, ultra-fast semantic filter classifies the intent of the prompt" — Phase 5

## Required Deliverables

1. **Tile serialization format:** Define tile encoding (recommend CBOR for compactness + Protobuf for schema evolution), cryptographic header schema (multihash content address, Ed25519 signature wrapper), Gnostic Field JSON Schema
2. **Layer transformation functions:** Define mathematically specified transformation for each layer transition (L0→L1, L1→L2, L2→L3)
3. **Genesis key ceremony protocol:** Define offline key generation ceremony, key ceremony participants, key storage (Hardware Security Module? Paper? Smart card?), key rotation schedule, revocation mechanism
4. **Tamper-evidence mechanism:** Define how rosetta.observation tiles are made tamper-evident (Merkle audit log? Blockchain anchor? Simple hash chain?)
5. **rosetta.incident trigger schema:** Define failure detection criteria, severity thresholds, automated response actions
6. **Tripwire semantic filter design:** Prototype semantic filter algorithm (recommend: rule-based PII detector + prompt injection keyword matcher as baseline; ML classifier as upgrade); define evaluation benchmark (known prompt injection corpus)
7. **Rosetta v3.0.0 reconciliation:** Cross-reference tile types with v3.0.0 Core Spine spec; produce delta document if conflicts found

## Dependencies

- None (can start immediately, but coordination with existing Rosetta v3.0.0 work is recommended)

## Labels

`rosetta-2`, `cognitive-tiles`, `genesis-keys`, `governance`, `tripwire`, `layer-0`, `layer-1`, `layer-2`, `layer-3`, `serialization`, `cbor`, `protobuf`

## Notes

This is a prerequisite for SBA-004 (Guard/Majordomo dual control), which depends on rosetta.policy and the cryptographic enforcement mechanism.
