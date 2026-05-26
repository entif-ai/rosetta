# Issue Draft: EDG-004 — ZKP Node Validation Timing: Resolve CT-006 Conflict

## Metadata

| Field | Value |
|---|---|
| Issue ID | EDG-004 |
| Type | contradiction |
| Status | draft |
| Source doc | docs/governance/Entif 2.0 - Decentralization and Governance.md; docs/intake/issue-drafts/2026-04-25-cognitive-tiles-swarm-gnosis-ct-006-zk-proofs.md |
| Extraction date | 2026-05-26 |
| Confidence | high |

## Problem

Two sources give contradictory guidance on ZK proof (ZKP) integration timing:

| Source | Claim | Confidence |
|---|---|---|
| Entif 2.0 Decentralization & Governance (Section 4) | ZKP for node computation verification is a near-term implementation mechanism | medium |
| CT-006 (GH#117, from Cognitive Tiles extraction) | ZK-SNARK proof generation is "too expensive (seconds to minutes per proof) for near-term adoption" — classified as optional future work | high |

CT-006 is a more recent, evidence-grounded finding from a prior extraction cycle. The Entif 2.0 doc is 2025-era and treats ZKP as near-term without cost analysis.

## Evidence

**Entif 2.0 doc:**
> "Zero-Knowledge Proofs: A node could generate a ZKP that executed a certain AI model with given inputs and got output Y, without revealing proprietary model details. Others can verify this proof quickly."

**CT-006:**
> "ZK-SNARK proof generation is too expensive (seconds to minutes per proof) for near-term adoption in the Cognitive Tiles swarm. Classified as optional future work; WASM sandbox (CT-009) is the near-term path."

## Recommended Action

1. Resolve in favor of CT-006: ZKP for node validation is **not near-term viable** due to proof generation cost
2. Update EDG-004 to reflect: "ZKP for node validation is out of scope for Text-Core MVP and MVP Alpha RC. WASM sandbox (CT-009) is the near-term path."
3. Add to Entif 2.0 governance doc note: "ZKP components in Section 4 are aspirational and conflict with CT-006 cost analysis; treat as post-MVP phases"
4. In EDG-001 (terminology mapping), flag ZKP as deferred to post-MVP

## Labels

zkp, zero-knowledge-proofs, ct-006, timing, contradiction, node-validation

## Depends On

CT-006 (GH#117) — existing issue, already classified

## Related Issues

- CT-006 (GH#117) — existing issue already captures the ZKP timing finding
- EDG-001 (terminology mapping — should reflect ZKP deferral)
- EDG-008 (zero-trust node design — ZKP is one component of that, but not the only verification mechanism)