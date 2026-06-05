# [NSD-002] Doctrine v0.2 not frozen in docs/doctrine/Doctrine-v0.2.md

**Priority:** P1  
**Status:** open  

## Summary
Doctrine v0.2 Section 10, Directive #1 requires freezing the doctrine at `docs/doctrine/Doctrine-v0.2.md`. The source document lives in `docs/governance/` but has not been installed as a frozen artifact at the canonical `docs/doctrine/` path specified by the doctrine itself.

## Evidence
- Doctrine v0.2, Section 10, Directive #1: "Freeze this doctrine in `docs/doctrine/Doctrine-v0.2.md`"
- Source at `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md`
- No `docs/doctrine/` directory found in prior docs-intake inventory

## Acceptance Criteria
- [ ] `docs/doctrine/Doctrine-v0.2.md` exists and is byte-for-byte identical to the source governance document
- [ ] Directory created if not present
- [ ] Any references to the doctrine in other artifacts point to the frozen location

## Labels
- governance
- doctrine
- blocker