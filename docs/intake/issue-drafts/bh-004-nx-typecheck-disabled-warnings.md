# BH-004: Nx typecheck "disabled" warnings — ergonomic issue

## Metadata

| Field | Value |
| --- | --- |
| Issue | BH-004 |
| Title | Nx typecheck "disabled" warnings — ergonomic issue, non-failing but noisy |
| Type | technical-debt |
| Status | open |
| Labels | bootstrap, nx, developer-experience |
| Depends on | — |
| Evidence | `docs/handoffs/2026-04-13-bootstrap-handoff.md` — "Nx currently prints that certain generated `typecheck` targets are 'disabled' because one or more referenced configs use `noEmit: true`" |
| Created | 2026-05-31 |

## Problem Statement

Nx typecheck targets that reference TypeScript configs with `noEmit: true` print "disabled" warnings, even though the typecheck still completes successfully. The workspace typecheck command completes without failure, but the console noise reduces signal quality and may mask real issues.

The handoff notes this is "not yet ideal ergonomically, but it is not currently a failing condition."

## Investigation Tasks

- [ ] Reproduce the "disabled" warning: run `pnpm exec nx typecheck` or `nx run-many -t typecheck` and capture the exact output
- [ ] Identify which TypeScript config (lib or app) uses `noEmit: true` and causes the warning
- [ ] Determine whether the fix is: (a) adding `target: "refs"` to nx project configs, (b) separating typecheck into its own tsconfig that does emit, (c) suppressing the warning via `nx.json` suppressWorkspacesWarnings, or (d) ignoring the noise
- [ ] Assess whether any downstream CI/CD pipeline would treat the "disabled" output as a failure

## Expected Outcome

Either:
- A) Fix identified and applied — Nx typecheck runs cleanly without "disabled" warnings
- B) Fix not worth the effort — document as known acceptable noise with low priority
- C) Real typecheck failures are being masked — escalate to bug

## Priority

low — cosmetic issue; does not block any work