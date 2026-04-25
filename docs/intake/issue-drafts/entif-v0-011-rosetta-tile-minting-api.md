# ENTIF-v0-011: Rosetta Tile Minting API Contract Not Defined — Spine Integration Gap

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-011 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #24 in ledger |
| Confidence | `high` |
| Depends On | — |

---

## Problem Statement

The spec states: "Entif v0 treats Rosetta as the authoritative data model for minted cognitive tiles and receipts, while graphs/indexes are materialized views optimized for different retrieval patterns."

**But the integration contract — how Entif v0 actually calls Rosetta to mint a tile — is not defined.** No API endpoint, request schema, response schema, error handling, or retry policy is specified.

The v0 slice (GitHub trend ingestion → deterministic triage → contributor/repo graph → Rosetta tile minting → retrieval API) is blocked on this integration contract. Without it, the "Rosetta as spine" doctrine cannot be operationally realized.

---

## Evidence

The spec defines Rosetta as the spine and the tile minting as a step in the v0 slice sequence diagram. The receipt schema references `rosetta_tile_cid` but the mechanism for producing that CID is undefined.

The cognitive tiles RFC (`docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md`) is referenced but its tile minting API is not defined in this document.

---

## Impact

- The v0 slice cannot be implemented end-to-end
- Every tile minting call requires a bespoke implementation with no contract
- Cross-system tile verification is impossible without a defined API

---

## Dependencies

- None (this is a pure integration gap)

---

## Suggested Resolution

1. Define the tile minting API: `POST /tiles/mint` with the receipt.v0 schema as input
2. Define the response schema: tile CID, tile metadata, mint timestamp, verification hash
3. Define error handling: 4xx (bad request, validation error), 5xx (retryable), 429 (rate limit — backoff and retry)
4. Define retry policy: 3 retries with exponential backoff, then DLQ
5. Define authentication: API key per Entif node, scope-limited to tile minting only
6. Define the minimum required fields in the mint request (envelope_id, receipt_id, source URI, content snapshot CID)
7. Reference the Cognitive Tiles RFC for the full tile schema

---

## Open Questions

- Should Rosetta tile minting be synchronous (wait for confirmation) or asynchronous (fire-and-forget with callback)?
- Is there a batch minting API for high-volume scenarios?