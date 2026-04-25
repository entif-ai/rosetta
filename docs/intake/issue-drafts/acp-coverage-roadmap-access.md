# Issue Draft: ACP Spec Coverage Roadmap is Internal — Obtain or Replicate

**Source:** `docs/external/acpx.md`  
**Extraction date:** 2026-04-25  
**Draft file:** `docs/intake/issue-drafts/acp-coverage-roadmap-access.md`

---

## Issue Summary

The acpx README references an internal document at `docs/2026-02-19-acp-coverage-roadmap.md` for tracking ACP spec coverage status. This roadmap is not present in the external docs directory and is therefore inaccessible for Rosetta's interop planning. Without visibility into what ACP messages/capabilities acpx currently covers versus what it does not, Rosetta cannot accurately assess integration gaps.

---

## Evidence

From the top of `docs/external/acpx.md`:

> "ACP coverage status: see [ACP Spec Coverage Roadmap](docs/2026-02-19-acp-coverage-roadmap.md)."

The linked document is not included in the external docs bundle, suggesting it is an internal project artifact maintained within the acpx repository but not surfaced in its published documentation.

---

## Recommendation

Rosetta should pursue one of the following:

1. **Obtain the internal roadmap** — if the acpx repo is accessible, retrieve `docs/2026-02-19-acp-coverage-roadmap.md` directly
2. **Replicate from public sources** — cross-reference ACP spec at agentclientprotocol.com against acpx source code or release notes to reconstruct coverage
3. **Request via upstream** — file an issue or PR against the acpx repo to make the coverage roadmap publicly visible

Until coverage status is known, Rosetta's ACP adoption planning will be incomplete.

---

## Priority

medium

---

## Labels

- documentation
- acp
- roadmap
- spec-coverage

---

## Dependencies

None from this source.

---

## Notes

The coverage roadmap date (2026-02-19) suggests the document is actively maintained and recent. A reactive follow-up to obtain it is recommended before committing to an ACP adoption plan.