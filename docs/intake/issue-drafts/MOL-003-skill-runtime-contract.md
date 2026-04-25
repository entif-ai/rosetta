# MOL-003: SmythOS vs. Rosetta Skill Execution Runtime Contract

## Metadata

- Type: architecture
- Status: draft
- Labels: skill-runtime, smythos, execution-contract
- Source doc: `docs/external/Moltron.md`
- Extraction date: 2026-04-25
- Evidence: "compiles skills into valid, executable SmythOS workflows"

## Summary

Moltron compiles skills to SmythOS executable workflows. Rosetta has no defined skill execution runtime. This issue proposes defining a Rosetta-native skill execution contract so that Moltron-style skills can run on Rosetta without requiring SmythOS as a dependency.

## Problem Statement

Moltron's core runtime target is SmythOS: skills become "valid, executable SmythOS workflows." Rosetta currently has no execution runtime contract for skills — skills are described in SKILL.md files and executed by the agent via interpretation, not compilation. If Rosetta adopts Moltron's self-evolution loop (MOL-001), it needs an execution runtime. SmythOS is not in Rosetta's stack.

Two paths: (1) define a Rosetta-native execution contract and port Moltron's approach, or (2) build a SmythOS adapter for Rosetta. The latter introduces a new external dependency.

## Proposed Action

1. Define a `SkillExecutionContract` interface in Rosetta: `input → skill_id/version → execution_context → output + receipts`
2. The contract should be runtime-agnostic: LangGraph nodes call the contract, not a specific runtime
3. Investigate whether SmythOS workflows can be represented as LangGraph subgraphs (enables adapter without reimplementation)
4. If not, define Rosetta's own skill graph language (akin to SmythOS's workflow DSL) — may overlap with ROCK family specs

## Success Criteria

- [ ] Rosetta has an explicit SkillExecutionContract documented in the architecture
- [ ] Moltron's 6-step loop can execute against the Rosetta contract without SmythOS
- [ ] LangGraph workflow layer calls skill execution through the contract (not hardcoded runtime)
- [ ] SmythOS adapter, if built, wraps the contract (not the reverse)

## References

- SmythOS: https://github.com/SmythOS/sre
- Moltron skill compilation: "compiles skills into valid, executable SmythOS workflows"
- LangGraph integration in NOT LAME: "workflow plane, not constitutional; nodes call kernel APIs"
