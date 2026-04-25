# Issue Draft: Missing Python package boundary enforcement mechanism

## Title

Missing: Python package boundary enforcement mechanism

## Type

architecture

## Labels

- python-boundary
- workspace-boundary
- type-contracts

## Depends On

- python/*
- workspace-generators

## Evidence

The scaffold (`20260410 - Entif and Rosetta PRDs - ChatGPT - Pro-Extended Research.md`) establishes a clear architectural rule:

> "Do not split the core Rosetta spine ambiguously across both languages without a clear reason."
> "Default rule: orchestrator, kernel, protocol, tooling, MCP packages, validators, generators, receipts, guard surfaces, and workspace automation in TypeScript; specialized compute or research modules in Python when justified."
> "Python modules should be isolated behind clear workspace/package boundaries, versioned contracts, and typed service or MCP interfaces."

The scaffold places Python packages under `python/eval-harness/` and `python/embedding-lab/` as isolated packages with typed MCP interfaces at their boundaries.

However, there is no enforcement mechanism specified to prevent Python code from creeping into TypeScript core packages. The risks are:
- Undisciplined cross-language imports that break the isolation
- TypeScript packages accidentally depending on Python internals
- The "clear boundary" rule being violated without anyone noticing until late

## Recommendation

Implement boundary enforcement via:
1. **ESLint rule** or custom Nx executor that flags imports from `python/*` packages into `apps/*` or `packages/*` (except at designated MCP interface boundaries)
2. **ADR** formally establishing the Python boundary rule and the specific allowed import paths
3. **Nx project boundary rules** configured in `nx.json` to prevent invalid dependencies
4. **Import tests** in `workspace-generators` that verify no `python/` imports appear in core TypeScript packages
