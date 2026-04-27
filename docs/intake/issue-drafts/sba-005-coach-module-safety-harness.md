# SBA-005: Coach Module autonomous self-improvement — infinite loop prevention and safety harness

## Status

draft — `docs/intake/issue-drafts/sba-005-coach-module-safety-harness.md`

## Metadata

- **Type:** reliability
- **Priority:** P1
- **Source doc:** `docs/backlog/Entif v0 Second Brain Architecture Plan.md`
- **Section:** Phase 6 (The Coach Module: Autonomous Self-Tuning)
- **Confidence:** high

## Problem

The Coach Module is a nightly 4:00 AM automated self-improvement loop that executes five distinct operations:
1. **Receipt Analysis:** Reads rosetta.receipt ledger to identify failed tool calls, API timeouts, hallucinations
2. **Retry Policy Codification:** Writes new retry rules to execution logic code based on failure patterns
3. **Routing Weight Adjustment:** Uses contextual bandit logic to adjust model routing weights (e.g., routing simple text parsing to free local Llama-3 instead of expensive GPT-4)
4. **Prompt Refinement:** Autonomously rewrites "Ada" orchestrator prompts and JSON tool schemas based on daily error logs
5. **Alignment Check:** Scans conversational outputs against genesis policy to detect alignment drift

The following safety concerns are unaddressed:

1. **Infinite self-modification loop:** If the Coach rewrites a prompt that causes a new class of failures, the next night's Coach could "fix" it by rewriting it back, creating an oscillation. No max-iteration limit or convergence detection is specified
2. **No rollback mechanism:** If Coach writes a bad retry policy or rewrites a prompt to a worse state, there is no described mechanism to restore the previous version
3. **No human override/escape hatch:** The document does not specify how a human can intervene if Coach begins behaving unexpectedly
4. **Contextual bandit convergence:** Bandit algorithms require accumulated data to converge. Without sufficient prior data, routing weight adjustments could be noise rather than signal
5. **Alignment check autonomy boundary:** "Scans conversational outputs against genesis policy" — can the Coach modify the genesis policy if it detects drift? This would be self-referential and dangerous
6. **Receipt analysis false positives:** If the receipt ledger itself has corrupted or incomplete data, Coach could make incorrect modifications based on bad data

## Evidence

> "1. Receipt Analysis: The Coach reads the rosetta.receipt ledger (the immutable audit trail of every action) to identify failed tool calls, API timeouts, or instances where the AI hallucinated or misunderstood a prompt" — Phase 6

> "2. Retry Policy Codification: If a pattern of failures is detected (for example, the Twitter API rate-limiting the system), the Coach autonomously updates the execution logic code. It writes a rule to automatically 'retry once on timeout' before escalating an error message to the human user" — Phase 6

> "3. Routing Weight Adjustment: Utilizing contextual bandit logic algorithms, the Coach mathematically adjusts model routing weights. If an expensive, high-parameter model (like GPT-4) was unnecessarily used for a simple text parsing task, the Coach updates the routing tables to direct all future, similar tasks to the fast, free, local Llama-3 model" — Phase 6

> "4. Prompt Refinement: The core prompts for the 'Ada' orchestrator and the JSON tool schemas are autonomously tweaked and rewritten by the Coach based on argument mismatches or syntax errors found in the daily logs" — Phase 6

> "5. Alignment Check: Finally, the Coach runs an alignment checker, scanning recent conversational outputs against the immutable policies pinned in the Genesis document. This ensures the agent's tone, ethical boundaries, and strategic goals have not suffered from alignment drift" — Phase 6

## Required Deliverables

1. **Max-iteration limit:** Define maximum number of Coach modifications per night per category (e.g., max 3 prompt rewrites, max 5 routing weight adjustments). Hard stop after limit reached; notify human
2. **Convergence detection:** Implement oscillation detector: if the same prompt/routing-weight has been modified 2+ times in the last 3 nights, halt autonomous modification and flag for human review
3. **Git-backed rollback:** All Coach modifications must be committed to a git branch with a signed tag. Human can `git revert` any Coach commit at any time. Coach must not have merge rights to main branch
4. **Human escape hatch:** Define a "Coach pause" signal (file-based flag, env var, or n8n workflow) that stops all Coach autonomous modifications until a human explicitly re-enables
5. **Data quality gate:** Before making modifications based on receipt analysis, Coach must validate receipt integrity (check for truncation, missing fields, timestamp anomalies). Emit warning receipts for low-quality input data
6. **Alignment check boundary:** Explicitly prohibit Coach from modifying genesis policy. If alignment drift is detected, Coach must emit a `rosetta.incident` tile and notify human — not self-correct
7. **Bandit cold-start policy:** Define how routing weight adjustment behaves before sufficient data accumulation (recommend: use fixed default routing until N successful receipts are available per task type)

## Dependencies

- SBA-003 (Rosetta 2.0 Protocol) — `rosetta.receipt` ledger and `rosetta.incident` tile schemas must be defined first
- Git repository must be initialized and have main/protected branch configured before Coach deployment

## Labels

`coach-module`, `self-improvement`, `autonomous-improvement`, `safety`, `infinite-loop`, `rollback`, `bandit`, `alignment`
