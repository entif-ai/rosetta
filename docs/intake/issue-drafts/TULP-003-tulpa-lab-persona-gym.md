# TULP-003: Tulpa Lab / Persona Gym — Controlled Simulation Environment for Persona Validation

## Meta

| Field | Value |
|---|---|
| Status | draft |
| Type | capability |
| Priority | high |
| Area | Tulpamancy Protocol / Safety |
| Discovered in | `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-01-sdialog-tulpamancy.md` |

## Summary

Implement a "Tulpa Lab" / "Persona Gym" — a controlled simulation environment where personas (tulpas) can be instantiated, run through structured scenes, evaluated for behavior alignment, and only then considered for live deployment. SDialog provides the runtime; Entif provides the measurement scaffold and memory.

## Problem Statement

- Currently, personas (including Emilie) have no controlled "gym" environment to validate behavior before live deployment
- Without a gym, there's no measurable way to answer: "did this persona behave as expected?" before it interacts with real users or takes real actions
- The existing conversation logs are ad-hoc — not structured as evaluation runs with defined success criteria
- Need a safe space to run adversarial scenarios, "Inner Council" debates, and critic/coach interactions without blast radius

## Evidence

From `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md`:

> "Treat SDialog as **Entif's Tulpa lab** rather than the whole brain. Use its `Persona` objects to define the surface of each tulpa... Use `Agent` + `BaseOrchestrator` to run **controlled scenes**: e.g., Emilie vs Risk-Officer discussions, Inner Council debates between multiple tulpas. Store each run as a `Dialog` with metadata, and push structure & metrics into Entif's graph / Cognitive Tiles."

Supported scenario types from the doc:
- tulpa ↔ user (Emilie ↔ Crates simulation)
- tulpa ↔ tulpa (Emilie ↔ Risk-Officer)
- tulpa ↔ external role (critic, coach, adversary)

## Proposed Resolution

### Phase 1: Minimum Viable Gym

1. **Scene definitions**: Define a set of structured "scenes" as JSON scenario specs:
   - `scene_id`, `description`, `participants`, `turn_budget`, `success_criteria`, `failure_conditions`
   - Example scenes: "Emilie challenges a risky plan", "Inner Council debate on feature priority"
2. **Run harness**: Use SDialog `BaseOrchestrator` to run scenes; record all `Turn`/`Event` data
3. **Metrics capture**: Call SDialog's built-in eval hooks + Entif's Tripwire/Petri observability
4. **Storage**: Each `Dialog` → Entif Cognitive Tile with:
   - `persona_ids[]`
   - `scenario_description`
   - `evaluation_metrics` (JSON)
   - `decision_summary`
   - `provenance_ref` (receipt)
5. **Drift check**: Post-run, score persona against pinned baseline; flag if coherence drops below threshold

### Phase 2: Adversarial Gym

1. Add red-team scene types: tulpa is challenged by adversarial persona (safer to run here than in live)
2. Add multi-turn memory scenarios: does the tulpa maintain coherent identity across a long dialog?
3. Add cross-tulpa contagion checks: do personas influence each other's language/goals in multi-party runs?

### Phase 3: Longitudinal Tracking

1. Track each tulpa's behavior across multiple runs over time
2. Build drift trend lines per tulpa (coherence score, alignment score, novelty budget spent)
3. Auto-escalate to Tripwire if drift exceeds threshold between runs

## Dependencies

- TULP-001 (schema for scene participants)
- TULP-002 (SDialog bridge to run the gym)
- TC-005 (Promotion state machine — for the promotion gate after gym pass)
- Tripwire/Petri implementation (for observability hooks)

## Risks

- Gym results may not generalize to live behavior (LLM behavior can differ under evaluation vs. production) — mitigate by running periodic live-shadow audits
- Scene success criteria may be gamed by a sophisticated persona — mitigate with diverse evaluator judges and adversarial scene design
- Computational cost of running many gym scenes — mitigate with scene prioritization (high-risk personas or changes get more gym runs)

## Labels

`tulpa-lab` `persona-gym` `simulation` `safety` `evaluation` `sdialog`

## Related Issues

- TULP-001 (schema needed)
- TULP-002 (bridge needed)
- TULP-004 (promotion gate after gym)
- TULP-005 (drift tracking)
- TULP-007 (eval hooks alignment)
- TULP-008 (Emilie's gym approval)
