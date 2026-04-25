# Issue Draft: Missing `headers-check` Nx executor implementation

## Title

Missing: `headers-check` Nx executor in workspace-generators

## Type

implementation

## Labels

- nx
- generators
- file-level-traceability
- developer-experience

## Depends On

- workspace-generators

## Evidence

The scaffold-forge output specifies that protocol-sensitive files must have a lightweight Rosetta traceability header and that header consistency should be enforced via an Nx executor or generator:

> "The output must define ... a lintable or checkable convention to keep them consistent"
> "a lint/check/enforcement approach for header consistency"

The scaffold places this executor under `packages/workspace-generators/src/executors/headers-check/`. However, `workspace-generators` is a stub package — no actual executor implementation exists. Without this executor, the header requirement is unenforced and will degrade.

## Recommendation

Implement the `headers-check` Nx executor as part of `workspace-generators`. The executor should:
1. Scan matching source globs for files with protocol-sensitive extensions (.ts, .py, .test.ts, etc.)
2. Check for presence of the required header block (purpose summary + Rosetta relevance + governing references)
3. Fail the target if a required header is missing on a file that requires one
4. Be fast (no type-checking or building, just header scanning)

Also add an Nx generator template that stamps the correct header when scaffolding new protocol-sensitive files.
