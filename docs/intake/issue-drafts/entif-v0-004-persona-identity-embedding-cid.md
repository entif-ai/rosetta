# ENTIF-v0-004: Persona Identity Embedding CID Computation Unspecified

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-004 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #7 in ledger |
| Confidence | `high` |

---

## Problem Statement

The persona contract schema defines `drift_metrics` with:

```yaml
drift_metrics:
  identity_embedding_cid: "cid_sha256_..."
  drift_thresholds:
    max_weekly_identity_drift: 0.15
    max_weekly_method_drift: 0.20
```

**But the `identity_embedding_cid` computation is not specified.** The CID is a placeholder (`"cid_sha256_..."`) with no defined algorithm for computing it. Without the computation method:

- Drift cannot actually be measured — the `identity_embedding_cid` is always a placeholder
- The drift threshold (`max_weekly_identity_drift: 0.15`) is unenforceable
- No two implementations will compute the CID the same way, breaking cross-system compatibility

---

## Evidence

The schema shows `identity_embedding_cid: "cid_sha256_..."` but does not specify:
- What representation of the persona is hashed (full YAML canonicalized? identity_kernel only? a dedicated embedding vector?)
- What hash algorithm (SHA-256 as shown, or something else?)
- What triggers a new CID computation (periodic? on every persona change? on explicit measurement?)
- The formula for computing drift from two CIDs (are they compared as binary hashes, as float vectors, as semantic embeddings?)

---

## Impact

- Persona drift measurement is unimplementable — the central governance mechanism for persona evolution has no procedure
- Anti-convergence rules and dissent quotas (which depend on drift tracking) cannot be enforced
- Cross-system persona portability is broken (different systems would compute different CIDs for the same persona)

---

## Dependencies

- None (but must be resolved before PersonaForge drift tracking is implementable)

---

## Suggested Resolution

1. Define what is hashed: canonicalized YAML of the full persona contract (excluding `identity_embedding_cid` itself)
2. Specify hash algorithm: SHA-256 (matches the `cid_sha256_...` notation)
3. Define computation trigger: weekly batch measurement + on each persona contract update
4. Define drift metric: Hamming distance between CID bytes (proportion of differing bytes) for binary comparison, OR cosine distance if the CID is derived from an embedding vector
5. Add `identity_embedding_cid_computed_at: timestamp` to the schema
6. Add a test vector: given a specific persona contract, the computed CID must match a known expected value

---

## Open Questions

- Should the CID be computed from the full contract or only the identity_kernel? Full contract captures more drift but is noisier.
- If the persona contract is large, should a direct hash of the canonical YAML be used, or should a fixed-size embedding be computed first?