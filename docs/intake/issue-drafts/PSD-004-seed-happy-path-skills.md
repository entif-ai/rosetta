# Issue Draft: PSD-004 — Seed Happy-Path Skills

**Source:** `docs/intake/docs-intelligence/2026-04-25-progressive-disclosure-skill-system.md`
**Confidence:** HIGH

---

## Problem Statement

The progressive-disclosure skill system needs seed skills to bootstrap the broker and prove the architecture. The extraction identifies three priority domains for happy-path skills, but none exist in Rosetta yet.

---

## Desired Outcome

Three categories of seed skills, each with Stage A metadata + Stage B playbook + Stage C resources (where applicable):

1. **Doc transforms** — pdf/docx/xlsx/pptx parsing and transformation patterns
2. **Repo hygiene** — git commits, changelogs, release notes
3. **Ingestion tasks** — transcript normalization, tagging

Each skill should use Anthropic public repo as _pattern reference only_; own licenses must be kept clean. Each skill should include 2–5 canonical eval prompts.

---

## References

- Extraction: `docs/intake/docs-intelligence/2026-04-25-progressive-disclosure-skill-system.md` — Bootstrap plan step 3
- Anthropic public skills repo: https://github.com/anthropics/skills (pattern reference only)
- Extraction Section 4 (efficacy patterns: description-as-trigger, concise playbooks, eval harness)
- Format spec reference: https://deepwiki.com/anthropic/skills/2.2-skill.md-format-specification

---

## TODO

- [ ] Author doc-transforms skill (pdf/docx/xlsx/pptx patterns)
- [ ] Author repo-hygiene skill (git commits, changelogs, release notes)
- [ ] Author ingestion-tasks skill (transcript normalization, tagging)
- [ ] For each: write Stage A metadata (skill_id, name, description, capabilities, risk_band, tool_allowlist_hint, embeddings)
- [ ] For each: write Stage B playbook with YAML frontmatter (`name`, `description`, `license`, `allowed-tools`)
- [ ] For each: write 2–5 canonical eval prompts + assertions
- [ ] Ensure all licenses are Rosetta-owned (not copying Anthropic licensed skills)
