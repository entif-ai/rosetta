# OB1-008: Deterministic Dedupe Not Implemented in Pillar Zero

## Meta

- **Type:** implementation
- **Severity:** high
- **Confidence:** high
- **Tags:** dedupe, ingest, pillar-zero, receipts
- **Source doc:** `docs/governance/20260410 - OpenBrain OB1 Assimilation Addendum (v0.1).md` §1.5
- **Extracted:** 2026-05-26

## Summary

Section 1.5 of the OB1 Assimilation Addendum requires deterministic deduplication as a core Pillar Zero package requirement. This includes: normalization fingerprints (content-level deduping), revision fingerprints (update detection), and dedupe receipts (audit trail of deduplication decisions). No current implementation exists for this in the `packages/ingest-core` Pillar Zero packages.

## Evidence

From §1.5: "deterministic dedupe as a core package requirement — dedupe receipts, dedupe normalization fingerprints"

The dedupe requirements appear to overlap with or be adjacent to TC-002 (Ingestion deduplication and provenance tracking).

Section 10 item 6 lists "implement deterministic dedupe and schema-aware routing in Pillar Zero packages" as one of the 7 immediate implementation actions.

No implementation found in current codebase for normalization fingerprints, revision fingerprints, or dedupe receipts.

## Response Options

### Option A: Implement in TC-002 (Ingestion dedupe and provenance)
Add deterministic dedupe implementation to the TC-002 workstream. TC-002 already handles ingestion deduplication and provenance tracking, so this naturally fits.

**Pros:** Single workstream; aligns with existing TC-002 scope; reduces duplication of effort.

**Cons:** TC-002 may have a full scope; adding dedupe requirements may expand it beyond capacity.

### Option B: Parallel track alongside TC-002
Create a parallel implementation track for deterministic dedupe that coordinates with TC-002 but maintains separate focus.

**Pros:** Dedicated focus on dedupe; can move faster without waiting for TC-002 scope negotiations.

**Cons:** Risk of drift between TC-002 and OB1-008 dedupe implementations.

### Option C: Expand TC-002 scope to explicitly include OB1 dedupe requirements
Formally expand TC-002 to include the specific dedupe requirements from OB1 (normalization fingerprints, revision fingerprints, dedupe receipts).

**Pros:** Unified implementation; clear ownership; single source of truth.

**Cons:** Requires updating TC-002 scope and potentially renegotiating capacity.

## Recommended Response

Option C (expand TC-002 scope) is recommended. The OB1 dedupe requirements (normalization fingerprints, revision fingerprints, dedupe receipts) directly support TC-002's mission of ingestion deduplication and provenance tracking. A formal scope expansion keeps implementation unified.

## Dependencies

- Blocked by: TC-002 (for scope expansion decision)
- Coordinates with: OB1-005 (schema-aware routing), OB1-006 (recipe wave dedupe recipe)
