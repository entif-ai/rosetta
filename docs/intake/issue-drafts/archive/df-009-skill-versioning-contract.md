# DF-009: No skill versioning or changelog; no API stability contract

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

Skills have optional frontmatter fields (version, author, compatibility) but there's no version stability contract, no changelog requirement, no migration path when a skill updates, and no API versioning for the skill installation/update endpoints. A skill that changes its interface could break consuming agents without warning.

## Evidence

From Gateway API Skills Router:
> "POST /install - install from .skill archive (accepts standard optional frontmatter like `version`, `author`, `compatibility`)"

"Optional" means no enforced versioning. No mention of skill changelog, deprecation policy, or version pinning.

## Implications

- A skill publisher can update a skill in-place and consumers get the new version with no migration notice
- No way to pin to a specific skill version for stability
- No deprecation timeline for outdated skills
- No semantic versioning enforcement or minimum version requirements
- Skills API (/api/skills endpoints) has no version in its path — no stability contract for API consumers

## Contrast with NOT LAME

NOT LAME's skillpack importer has a certify→promote flow which implies version management. DeerFlow has no equivalent.

## Recommendations

1. Add required semver versioning for all skills with a minimum version contract
2. Add a skill registry with version history and changelog
3. Add deprecation policy: how long old versions remain available after a new version ships
4. Add version pinning for skills: consumer can require a specific version range
5. Add API versioning to /api/skills endpoints (e.g., /api/v1/skills) with deprecation timeline
6. Add skill migration guide generation when a breaking change is detected

## Labels

skills, versioning, api-stability, semver, changelog, deprecation

## Status

issue-candidate