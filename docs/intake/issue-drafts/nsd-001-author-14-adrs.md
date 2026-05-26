# NSD-001: Author all 14 ADRs as individual files

## Meta

| field | value |
| --- | --- |
| Status | draft |
| Type | governance |
| Labels | governance, adr, doctrine |
| Source | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md`, Section 10 Directive 2 |
| Extraction date | 2026-05-26 |

---

## Problem

Doctrine v0.2 Section 9 lists 14 binding ADRs (ADR-0001 through ADR-0014), all with Status: Accepted. However, there are no individual ADR files in `docs/adr/`. The decisions are embedded in the doctrine document but not accessible as standalone, citable, changeable artifacts.

This blocks:
- Cross-referencing specific ADRs from implementation packages
- Managing ADR lifecycle (amendment, deprecation) independently from the doctrine document
- Clear decision attribution in code review and commit messages

---

## Evidence

- Doctrine v0.2 Section 10 Directive 2: "Author ADR-0001 through ADR-0014"
- Section 9 lists all 14 ADRs with status Accepted and consequence descriptions
- No `docs/adr/` directory or ADR-*.md files currently exist

---

## Requirements

1. Create `docs/adr/` directory
2. Author 14 individual ADR files: `ADR-0001.md` through `ADR-014.md`
3. Each ADR file must contain:
   - Status (Accepted)
   - Decision summary
   - Consequence (what changes if this is violated)
   - Supersession rule (how to change this ADR)
4. ADR files must be machine-legible (parseable, not just prose)
5. The doctrine document at `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` should reference the individual files rather than duplicating the decision content

---

## Acceptance Criteria

- [ ] `docs/adr/ADR-0001.md` through `docs/adr/ADR-0014.md` all exist
- [ ] Each ADR file has: title, status, decision, consequence, supersession rule
- [ ] Doctrine v0.2 references individual ADR files (links or path citations)
- [ ] ADR files are parseable (can be read by scripts without regex wrestling)
- [ ] No decision content is lost in migration from embedded to individual format