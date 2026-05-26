# RRP-005: Specify TAPESTRY_ENGINE Integration for RRP-Auditor Bundle Verification

## Type
architecture

## Summary

ROCK-3111 §6.1 defines the Receipt Bundle tapestry closure requirement (subject tiles + receipt tiles + evidence tiles + policy tiles + derived_from chains). ROCK-3111 §7 defines the 6-step verification algorithm for a Receipt Bundle tapestry. However, neither section specifies how the tapestry engine (TAPESTRY_ENGINE) would perform bundle generation, presentation, or on-demand verification at runtime.

Without TAPESTRY_ENGINE integration, RRP-Auditor conformance cannot be meaningfully claimed — the Auditor tier requires that the system can reconstruct "why did it do X?" from the tile graph on demand, not just at bundle authoring time.

## Evidence

Source: `docs/governance/ROCK-31XX - Rosetta Pasigraphy Protocol - Provenance, Receipts, TruthLint - 20260224.md`

Bundle closure requirement (§6.1):
> "If a system presents a user with a claim labeled as 'verified' or 'audited,' it MUST also present a Receipt Bundle tapestry containing at minimum: the Subject tiles + receipt tile(s) + evidence tiles + referenced policy tiles + derived_from chains to raw Observations."

Verification algorithm (§7): 6 deterministic steps (CID integrity, signature validation, spine anchoring, digest validation, policy validation, optional PROV-O projection).

Gap: Neither section connects these requirements to a concrete TAPESTRY_ENGINE API. Questions unanswered:
- How does a caller request a Receipt Bundle tapestry for a given claim/tile?
- How does TAPESTRY_GRAPHIC resolve `derived_from` chains at query time vs authoring time?
- Partial bundle: if some tiles are unavailable (e.g., archived), what does the verifier return? Partial-pass, error, or reconstructable-from-snapshot?
- Is there a TAPESTRY_ENGINE `verify-bundle` function that wraps the §7 algorithm, or must callers implement it themselves?
- How does TAPESTRY_ENGINE interact with the runtime gate model (pre-flight/post-flight receipts)?

## Expected artifact

A TAPESTRY_ENGINE integration section added to ROCK-3111 or as a separate spec, defining:
1. `tapestry.build-bundle(profile: "rrp:tapestry.profile.receipt_bundle", rootCIDs: [...])` — bundle generation API
2. `tapestry.verify-bundle(bundle: TAPESTRY_TILE)` — wraps §7 algorithm, returns `{ valid: bool, errors: [...], warnings: [...], closure_complete: bool }`
3. `tapestry.trace-closure(tileCID: CID)` — returns the minimal set of tiles needed to verify this tile
4. Behavior when tiles are unavailable or partially archived
5. Interaction with the runtime gate (pre-flight/post-flight receipt pattern)

## Priority
medium (blocks Auditor tier claim)

## Labels
- tapestry-engine
- auditor
- bundle-verification

## Depends On
RRP-001 (DocID registration), RRP-004 (projection spec needed for verifier step 1 CID recompute)
