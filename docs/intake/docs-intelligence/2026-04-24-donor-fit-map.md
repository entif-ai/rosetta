# Donor Fit Map

## Source

- Path: `docs/governance/DONOR_FIT_MAP.md`
- Title: Donor Fit Map
- Date evidence: No date; part of bootstrap governing docs
- Authority tier: governance (Tier 1)
- Freshness: current
- Word count: ~100
- Extractor: Emilie (OpenClaw docs-intelligence agent)
- Extraction date: 2026-04-24

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

Defines what's imported from the donor pattern (monorepo, Nx, separate kernel/intake/memory/projection packages) vs. what's explicitly excluded (no tarball import, no donor ontology, no donor memory stack replacing constitutional cache or receipt logic). The working metaphor: the donor is an anatomy reference skeleton, not the living body. This is a clean, short governance guardrail doc.

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-24T21:30 | `docs/governance/DONOR_FIT_MAP.md` | Accepted From Donor Pattern | `governance`, `repo-shape` | donor acceptance, monorepo, Nx | `decision` | Three things accepted from donor: (1) monorepo as central operating surface, (2) separate packages for kernel/intake/memory-facing projections/operator surfaces, (3) Nx as orchestration harness | "Accepted From Donor Pattern: Monorepo... Separate packages... Nx as the orchestration harness" | no action; already implemented | high |
| 2026-04-24T21:30 | `docs/governance/DONOR_FIT_MAP.md` | Explicit Non-Transfers | `governance` | donor exclusion, ontology boundary, memory stack | `decision` | Three explicit exclusions: (1) no direct donor tarball import into entif-ai, (2) no donor ontology promoted over Rosetta, (3) no donor memory stack replacing constitutional cache or receipt bundle logic | "Explicit Non-Transfers: No direct donor tarball import... No donor ontology promoted over Rosetta... No donor memory stack replacing the constitutional cache or receipt bundle logic" | confirm these exclusions are enforced in practice; check no tarball-import code paths exist | high |
| 2026-04-24T21:30 | `docs/governance/DONOR_FIT_MAP.md` | Working Rule | `governance` | donor metaphor, anatomy reference | `decision` | Donor is treated as an anatomy reference skeleton: useful for proportion and placement, but not the living body being constructed | "The donor is treated like a reference skeleton in anatomy class: useful for proportion and placement, but not the living body we are constructing here" | no action; this is the governing metaphor | high |

---

## Components And Technologies

- **Nx** — accepted from donor as orchestration harness
- **Monorepo** — accepted as central operating surface
- **Package architecture** (kernel/intake/memory projections/operator surfaces) — accepted structure

---

## Conceptual Claims

- Donor pattern provides structure and proportion but not substance
- Rosetta ontology and constitutional cache are non-negotiable replacements for donor equivalents
- Tarball import is explicitly blocked — entif-ai must be built fresh, not overlaid on a donor skeleton

---

## Contradictions Or Supersession

- No contradictions; aligns cleanly with REPO_SHAPE_AND_CONSTRAINTS.md (which also forbids donor tarball import)
- Consistent with Authority Stack: fresh Nx workspace, not a donor tarball import

---

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- |
| Verify no donor tarball import code paths exist | ablation | `governance` | None | Explicitly blocked in DONOR_FIT_MAP; confirm repo contains no import-from-donor code |

---

## Open Questions

- What was the donor source system? Not named in this doc — is there a donor reference that could be tracked?