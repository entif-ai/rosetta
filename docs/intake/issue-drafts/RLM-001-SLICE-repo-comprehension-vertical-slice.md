# Issue Draft: RLM-001-SLICE

**Prefix:** RLM-001
**Title:** Execute proposed vertical slice: RLM repo comprehension map on Entif corpus

## Problem Statement

All architectural recommendations for integrating RLMs into Entif remain theoretical without a concrete validation experiment. A thin vertical slice would prove or disprove the core premise: "context can scale by procedure, not by prompt size."

## Evidence

- Source doc (Finding RLM-001-M):
  > "If you want to test this quickly without boiling anything:
  > 1. Mount one nasty corpus: your monorepo docs + issues + previous run receipts
  > 2. One RLM skill: 'repo comprehension map' — output should be structured artifact: key modules, dependency edges, where 'truth' lives (schemas/contracts), citations (file paths + exact spans)
  > 3. Hard budgets + receipts from day one: max recursion depth, max subcalls, max dollars, every step logged as JSONL (fast-rlm already does this)
  > 4. Verifier gate: before anything is accepted into 'persistent knowledge,' run a verifier pass that checks: do cited spans actually support the extracted claim? did the agent accidentally infer something that isn't in evidence?"

## Proposed Resolution

Execute the vertical slice:
1. **Mount:** Rosetta corpus containing Entif monorepo docs, issues, previous run receipts
2. **Implement RLM skill:** "repo comprehension map" using fast-rlm as the implementation base
3. **Budget enforcement:** max recursion depth, max subcalls, max dollar spend from day one; JSONL logging on every step
4. **Verifier gate:** before accepting any derived knowledge into persistent storage, verify cited spans support extracted claims and no ungrounded inference occurred
5. **Success criteria:** RLM produces a structured comprehension map (key modules, dependency edges, truth locations, citations) that is verifiable against the corpus

## Entif Alignment

- Validates the RLM integration approach empirically
- Uses fast-rlm as the skateboard (already identified as the closest implementation)
- Tests the tile emission, sandboxing, and verification requirements in practice

## Confidence

MEDIUM — this is a proposed experiment, not a documented existing test. Feasibility assessment is the assistant's synthesis.

## Status

DRAFT