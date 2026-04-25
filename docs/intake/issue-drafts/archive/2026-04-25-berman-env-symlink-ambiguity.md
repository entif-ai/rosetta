# Credential symlink ambiguity — which `.env` is authoritative?

## Metadata

- **Draft created**: 2026-04-25
- **Source**: docs/external/Berman-PRD.md §Environment Variables
- **Extraction**: docs/intake/docs-intelligence/2026-04-25-berman-prd.md
- **Labels**: configuration, security

## Summary

Berman-PRD documents that `~/.openclaw/.env` is the canonical `.env` file, but three compatibility symlinks point to it: `~/clawd/.env`, `~/clawd/crm/.env`, and `~/clawd/tools/social-tracker/.env`. This creates ambiguity about which path is authoritative for reading and writing. If a script or developer modifies one of the symlink targets directly, changes won't propagate to the canonical location or to the other symlinks.

## Evidence

- `Compatibility paths: ~/clawd/.env, ~/clawd/crm/.env, and ~/clawd/tools/social-tracker/.env are symlinks to ~/.openclaw/.env`
- `Canonical .env: ~/.openclaw/.env`
- Multiple scripts reference different `.env` paths: CRM scripts at `~/clawd/crm/.env`, social-tracker scripts at `~/clawd/tools/social-tracker/.env`

## Risk

- If a script writes to the wrong `.env` path (e.g., a new script that reads `~/clawd/.env` without creating it as a symlink first), credentials could be written to a file that is not the canonical source
- Backup/restores could restore to the wrong location if manifest.json references differ
- New developers cloning the workspace may create `.env` files in the wrong location

## Recommended Action

1. Establish `~/.openclaw/.env` as the single authoritative source
2. Add a validation check (in `security-review.sh` or a new script) that verifies all three symlinks point to the canonical path
3. Document the symlink policy in RESTORE.md for new machine setup
4. Consider whether `~/clawd/.env` should be a directory symlink to `~/.openclaw/` rather than just a file symlink

## Priority

medium