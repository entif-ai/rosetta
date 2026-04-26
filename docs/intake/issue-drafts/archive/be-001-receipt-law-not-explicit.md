# Issue Draft: BE-001 — Receipt Law Not Explicit in Bootstrap Governance

**Drafted:** 2026-04-25
**Source doc:** `docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md`
**Extraction branch:** `docs-intelligence/bootstrap-execution-track`
**Status:** draft — needs review before opening as GitHub issue

---

## Problem Statement

The `BOOTSTRAP_EXECUTION_TRACK.md` document confirms that RRP receipt creation, signing, bundling, and verification are implemented as part of the Bootstrap landed slice. However, the document does not explicitly reference the Receipt Law as a governing constraint.

The Receipt Law (from NOT LAME and the Rosetta governing docs) states: every meaningful step emits receipts; receipt absence = failure condition.

Without explicit invocation of the Receipt Law, Bootstrap's receipt implementation could be treated as a feature rather than a mandatory constraint. This creates a governance gap: receipts are implemented but not enforced as the failure-condition mechanism.

---

## Evidence

- Finding 7 from extraction: "The document mentions RRP receipt implementation but does not explicitly reference the Receipt Law as a governing constraint."
- Bootstrap Landed Slice: "RRP receipt creation, signing, bundling, and verification implemented" — but no mention of receipt-absence-as-failure.

---

## Impact

If Receipt Law is not explicit in Bootstrap governance, future development could accidentally or intentionally bypass receipt emission without triggering a failure condition. This undermines the provenance guarantee that receipts are meant to provide.

---

## Proposed Action

1. Add explicit Receipt Law reference to `BOOTSTRAP_EXECUTION_TRACK.md` and/or the Bootstrap governing docs
2. Confirm that every meaningful step in Bootstrap emits a receipt
3. Confirm that receipt absence triggers a failure condition (fail-closed)
4. Add a test or verification step that enforces receipt-absence-as-failure in the Bootstrap test suite

---

## Related Issues

- DI-012 (Source Substrate anti-personhood-correlation governance) — related governance gap
- NOT LAME Write-Admission Gate — the 9-step state machine requires receipts for every durable mutation; Bootstrap should be the first implementation of this