# NSD-002: Freeze doctrine at canonical path `docs/doctrine/Doctrine-v0.2.md`

## Meta

| field | value |
| --- | --- |
| Status | draft |
| Type | governance |
| Labels | governance, doctrine, repo-structure |
| Source | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md`, Section 10 Directive 1 |
| Extraction date | 2026-05-26 |

---

## Problem

Doctrine v0.2 Section 10 Directive 1 explicitly states: "Freeze this doctrine in `docs/doctrine/Doctrine-v0.2.md`." The file currently lives at `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md`. The directive is not yet fulfilled.

This creates:
- Inconsistent canonical path (directive says one thing, filesystem shows another)
- Confusion about which document is the authoritative doctrine
- Risk that the governing build constitution is treated as just another governance doc

---

## Evidence

- Section 10 Directive 1: "Freeze this doctrine in `docs/doctrine/Doctrine-v0.2.md`"
- Current location: `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md`
- No `docs/doctrine/` directory exists

---

## Requirements

1. Create `docs/doctrine/` directory
2. Move (or copy and mark original as superseded) the doctrine to `docs/doctrine/Doctrine-v0.2.md`
3. The moved document should include a header noting its provenance from `docs/governance/`
4. If moving: update all cross-references in other docs that point to the old path
5. If copying: mark the original at `docs/governance/` as `[Superseded by docs/doctrine/Doctrine-v0.2.md]` with a reference and date

---

## Acceptance Criteria

- [ ] `docs/doctrine/` directory exists
- [ ] `docs/doctrine/Doctrine-v0.2.md` is the canonical doctrine file
- [ ] Old location either does not exist OR is marked superseded with reference
- [ ] All cross-references in other docs are updated to point to `docs/doctrine/Doctrine-v0.2.md`
- [ ] The canonical doctrine file is clearly identifiable as the governing build constitution