# SRC-004 — Design 15-Axis Trust Vector Model

**Priority:** P2
**Labels:** docs-intake, architecture, source-substrate, trust-model
**Milestone:** TBD

## Problem

Current trust scoring is likely scalar (e.g., `sourceTrust = 0.84`), which cannot represent the partial independence of different trust dimensions. A source may be high-trust for novelty scouting and low-trust for public proof bundles; scalar models cannot make this distinction. The Section 8 model avoids this by treating trust as a multi-axis vector.

## Expected Output

Design of a trust vector model with 15 partially independent axes:

1. **Artifact integrity confidence** — bytes stable and correctly identified
2. **Record identity confidence** — record is canonical for the thing
3. **Authorship confidence** — confidence in creator/issuer
4. **Institutional affiliation confidence** — confidence in affiliation claim linking people to orgs
5. **Repository stewardship confidence** — preservation, metadata maintenance, operational continuity
6. **Review/moderation rigor** — peer review, editorial review, moderation, or spam checks only
7. **Metadata richness/machine usability** — discovery, interop, automated reasoning support
8. **Correction/retraction responsiveness** — whether source ecosystem visibly tracks corrections
9. **License clarity** — use rights explicit and machine-interpretable
10. **Identity abuse risk** — risk of weak/synthetic/spoofed identity claims
11. **Manipulation/propaganda risk** — risk source is optimized for persuasion over accuracy
12. **Novelty yield** — potential to provide new info or uncommon perspective
13. **Rarity/scarcity yield** — potential to provide hard-to-find information
14. **Cross-source corroboration density** — how richly the thing is linked/contested by independent sources
15. **Invalidation sensitivity** — how easily current assumptions could be overturned by new evidence

**Separation by use function:** design must separate trust for retrieval priority from trust for citation weight, policy automation, identity inference, and public-facing proof bundles.

**Trust categories:** a source may be excellent for novelty scouting and terrible for public proof — this distinction must be expressible in the model.

**Invalidation hooks:** each axis should have explicit invalidation conditions (e.g., "newer version exists," "DOI reassigned," "retraction notice received," "broken checksum").

Relation to `source.evaluation_receipt` object type from SRC-002 and the existing identity-risk addendum.

## Sources

- `docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md` — Section 8 (trust axes and use-function separation), Section 8.2, Section 9.2 (invalidation hooks)
- `docs/intake/docs-intelligence/2026-06-05-source-substrate-provenance.md` — [F4]
