# ACP-003: Align Rosetta Config Layering with acpx's Global/Project/CLI Override Pattern

## Summary

Adopt acpx's three-tier config precedence (global → project → CLI flags) as the standard configuration pattern for Rosetta tools.

## Context

Rosetta tools currently use ad-hoc configuration patterns. Different tools use different approaches — some read from files, some from env vars, some from CLI flags — with inconsistent precedence rules. This creates cognitive load and makes it hard to predict which config takes effect.

`acpx` uses a clear, documented precedence: `~/.acpx/config.json` (global) → `<cwd>/.acpxrc.json` (project) → CLI flags (always win). This is a well-understood pattern in tooling (e.g., git config, npm config, editor configs).

## Evidence

From `docs/external/acpx.md` — Configuration files section:
> `acpx` reads config in this order (later wins):
> 1. global: `~/.acpx/config.json`
> 2. project: `<cwd>/.acpxrc.json`
> 3. CLI flags always win over config values

Supported keys: `defaultAgent`, `defaultPermissions`, `nonInteractivePermissions`, `authPolicy`, `ttl`, `timeout`, `format`, `agents`, `auth`

## Analysis

**Benefits of consistent config layering:**
- Predictable: users can always reason about what will take effect
- Flexible: repo-local overrides without global side effects
- Debug-friendly: `config show` command reveals resolved config (what actually takes effect)
- Tool-agnostic: same pattern works across all Rosetta tools

**Proposed Rosetta config schema:**
```
~/.rosetta/config.json          # global defaults
<repo>/.rosettarc.json          # repo-local overrides (git-ignored or tracked?)
CLI flags                       # always win, for ad-hoc override
```

**Key fields to standardize:**
- `defaultAgent` — which agent to use when none specified
- `defaultPermissions` — approve-all / approve-reads (default) / deny-all
- `timeout` — default command timeout in seconds
- `format` — text / json / json-strict / quiet
- `agents` — custom agent command overrides

**Note:** Rosetta already has a `tools.md` and `AGENTS.md` for workspace-level config. The acpx pattern could integrate with these rather than creating parallel config files.

## Recommendation

Audit all Rosetta tools for config inconsistency. Adopt the global → project → CLI flag precedence pattern. Introduce `config show` commands for debugging. Align field names with acpx schema where appropriate (especially `defaultAgent`, `defaultPermissions`, `timeout`, `format`).

## Labels

docs-intelligence, configuration, architecture, consistency

## Depends On

—