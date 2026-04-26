# HEA-001: Event-Driven Consciousness — Retire Nightly Consolidation Model

## Type
Enhancement / Architectural Revision

## Priority
HIGH

## Hypothesis
The "nightly dreaming consolidation" model for ELIXIR is an anthropomorphic metaphor that does not scale to global agentic deployment. Entif must adopt event-driven threshold-based consciousness with compute-price-aware scheduling and no idle windows.

## Rationale

The conversation explicitly discards the nightly consolidation model in favor of event-driven triggers. The architectural shift is from:

- **Old (retired):** Time-based ("nightly") cron-style cycles; idle windows assumed
- **New (canonical):** Perpetual async listeners; threshold-triggered meta-agents; compute-price-aware scheduling; no idle windows

Evidence from conversation:
- "A platform serving the whole world won't have idle windows"
- "There will not be any 'idle' period or nightly downtime cycle"
- "Scaled globally, Entif will serve agents optimizing schedules"
- "Any time compute is cheaper it'll get used"

The architectural implications are:
1. Coach, Muse, Heretic must be **always-on** perpetual listeners
2. Triggers are novelty/failure/cost/KPI **threshold breaches**, not time-of-day
3. Scheduler optimizes against SLA risk, marginal expected gain, rolling budget, urgency — not "is it 2am"
4. Heavy consolidation (compaction, dedup, taxonomy refit) runs opportunistically when compute is cheap, not at a fixed hour

## Expected Outcome

Replace all documentation, code, and runbooks that reference nightly/daily/TBD consolidation cycles with references to event-driven threshold-triggered self-revision under budget and latency constraints.

## Status
OPEN