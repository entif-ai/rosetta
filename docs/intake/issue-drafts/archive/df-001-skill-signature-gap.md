# DF-001: Skill installation lacks signature verification and quarantine

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

DeerFlow's POST /api/skills/install endpoint accepts .skill ZIP archives and extracts them to custom/ directory with no signature verification, content validation, or quarantine phase. This is a security gap for a production deployment. NOT LAME's skillpack importer specifies parse→normalize→quarantine→certify→promote as the required flow; DeerFlow has only install without certify.

## Evidence

From Skills System section:
> "Installation: `POST /api/skills/install` extracts .skill ZIP archive to custom/ directory"

From Gateway API Skills Router:
> "POST /install - install from .skill archive (accepts standard optional frontmatter like `version`, `author`, `compatibility`)"

No signature verification, no content scanning, no quarantine directory.

## Implications

- Malicious .skill archives can be installed directly into the skills custom directory
- No trust chain from skill author to installed artifact
- Gitignore on custom/ is convention only, not a security boundary
- In a multi-user DeerFlow deployment, any user who can call /api/skills/install can inject arbitrary code

## Contrast with NOT LAME

NOT LAME's skillpack importer specifies a full quarantine→certify→promote flow before any skill becomes active. DeerFlow skips all of this.

## Recommendations

1. Add signature verification to .skill archives (HMAC or GPG)
2. Add content scanning for known malicious patterns
3. Add a quarantine directory that blocks the skill from being loaded until certified
4. Add a skill manifest with cryptographic hash of all included files
5. Track skill provenance (who installed, when, from where)

## Labels

security, skills, quarantine, installation

## Status

issue-candidate