# Issue Draft: PSD-001 — Implement Skill Registry v0

**Source:** `docs/intake/docs-intelligence/2026-04-25-progressive-disclosure-skill-system.md`
**Confidence:** HIGH

---

## Problem Statement

Rosetta currently has no Skill Registry. A progressive-disclosure skill system requires persistent storage for:
- **Stage A:** Skill catalog metadata (~100 tokens per skill: skill_id, name, description, capabilities, risk_band, tool_allowlist_hint, embeddings)
- **Stage B:** Skill playbooks as content-addressed blobs/tiles (skill_id, version, instructions_md, io_contracts, evals)
- **Stage C:** Skill resources as content-addressed blobs (scripts/, references/, assets/)

The extraction defines the object model but nothing stores it yet.

---

## Desired Outcome

A Skill Registry that:
1. Persists SkillCatalogEntry records with SQL (structured fields) + vector DB (embeddings for hybrid search)
2. Persists SkillPlaybook blobs as content-addressed, versioned, auditable artifacts
3. Persists SkillResources as content-addressed blobs/tiles
4. Provides a query API for the broker to retrieve Stage A metadata (and load Stage B/C on demand)

---

## References

- Extraction: `docs/intake/docs-intelligence/2026-04-25-progressive-disclosure-skill-system.md` — Section 2 (Skill Object Model)
- Bootstrap plan step 1: "Implement Skill Registry v0"
- Anthropic skills overview: https://claude.com/docs/skills/overview
- Anthropic best-practices: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices

---

## TODO

- [ ] Design SkillCatalogEntry schema (SQL table + vector index)
- [ ] Design SkillPlaybook blob storage (content-addressed, versioned)
- [ ] Design SkillResources blob storage
- [ ] Implement registry CRUD API
- [ ] Add a receipt entry for registry writes
