# DF-008: Config auto-upgrade may silently drop fields if merge fails

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

make config-upgrade auto-merges missing fields from config.example.yaml into the user's config.yaml. If the merge process partially fails (e.g., network timeout mid-write, disk full), the resulting config could be truncated or partially written. No rollback mechanism, confirmation step, or validation after merge is described.

## Evidence

From Configuration System section:
> "Config Versioning: `config.example.yaml` has a `config_version` field. On startup, `AppConfig.from_file()` compares user version vs example version and emits a warning if outdated. Missing `config_version` = version 0. Run `make config-upgrade` to auto-merge missing fields."

No mention of rollback, partial failure handling, or post-merge validation.

## Implications

- If merge process is interrupted (Ctrl+C, system crash), config.yaml could be left in a corrupt state
- No confirmation prompt before merge — automated and irreversible
- If auto-merge algorithm has a bug, it could overwrite user settings with defaults silently
- No backup of the pre-merge config

## Specific Scenario

1. User runs `make config-upgrade`
2. Merge process starts writing new config to config.yaml
3. System crashes or user hits Ctrl+C mid-write
4. config.yaml is now partially written with some old fields and some new fields from example
5. On next startup, AppConfig.from_file() tries to parse malformed config → crash or silent corruption

## Recommendations

1. Add a backup step: copy config.yaml to config.yaml.backup before merge
2. Add atomic write: write to temp file, validate, then atomic rename
3. Add post-merge validation: parse the resulting config to confirm it's valid before replacing
4. Add a confirmation prompt (--yes flag for non-interactive use)
5. Add rollback: if validation fails after merge, restore from backup
6. Log the merge diff so users can see what changed

## Labels

config, versioning, robustness, rollback, auto-upgrade

## Status

issue-candidate