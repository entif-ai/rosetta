# CTS-008: DecisionForge Expected Free Energy Calculation + Active Inference Loop

## Type
`implementation`

## Labels
`decision-forge`, `expected-free-energy`, `cognitive-budget`, `active-inference`

## Depends On
`SemanticCodecForge (CTS-001)`

## Evidence
PRD Section 3: "Before generating a response, it uses DecisionForge to calculate the Expected Free Energy for decoding each slug. Epistemic Value: Which slug, if decoded, will reduce my uncertainty about the task the most? Pragmatic Value: Which slug will get me closest to my goal? Cost: What is the computational cost (tokens, latency) of decoding this slug? The agent spends its 'cognitive budget' decoding only the 1-3 most valuable slugs for the current step."

PRD: "ADK Orchestrator & The Agentic Loop (Active Inference): This is the game-changer. An agent's 'thought process' is now an economic decision loop."

## Problem Statement
DecisionForge needs to calculate Expected Free Energy (EFE) for slug decoding decisions, implementing the active inference loop where the agent economically decides which compressed knowledge to decompress based on cognitive budget.

## Scope

### Must Include
- [ ] EFE formula: epistemic_value + pragmatic_value - computational_cost
- [ ] Epistemic value calculation: uncertainty reduction potential of each slug
- [ ] Pragmatic value calculation: goal proximity improvement per slug
- [ ] Computational cost model: token count + latency estimate per decode
- [ ] Cognitive budget allocation: budget pool, spend per decode, budget reset
- [ ] Ranking: slugs ranked by EFE, top 1-3 selected for decode
- [ ] Integration with ADK Orchestrator loop
- [ ] Agent prompt upgrade: accepts slugs, uses EFE to decide what to decompress

### Should Include
- [ ] EFE telemetry: log all calculations for analysis
- [ ] Budget adaptive sizing (increase/decrease based on task complexity)
- [ ] Fallback: if budget exhausted, use default heuristic (most recent / highest-ranked)
- [ ] Multiple budget pools (epistemic vs pragmatic separate budgets)

### Could Include
- [ ] Learning: adjust EFE weights based on task success/failure
- [ ] Budget borrowing (borrow from future budget for high-priority tasks)

## Acceptance Criteria
- [ ] EFE calculation returns numeric score per slug
- [ ] Agent with cognitive budget of X tokens makes decoding decisions consistent with EFE ranking
- [ ] Top-ranked slugs decode before bottom-ranked within budget
- [ ] Cognitive budget enforcement: agent does not exceed budget
- [ ] Full audit trail: EFE calculation + decisions logged with receipts

## Notes
Slice 3 of the thin-slice plan targets this. One research agent made "slug-aware" with EFE calculation.

## Status
`draft`
