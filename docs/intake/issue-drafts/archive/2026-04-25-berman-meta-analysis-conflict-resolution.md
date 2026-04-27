# Business meta-analysis 8-expert architecture has no documented conflict resolution

## Metadata

- **Draft created**: 2026-04-25
- **Source**: docs/external/Berman-PRD.md §Tools — Business Meta-Analysis
- **Extraction**: docs/intake/docs-intelligence/2026-04-25-berman-prd.md
- **Labels**: business-meta-analysis, architecture, open-question

## Summary

The business meta-analysis system uses 8 independent expert personas analyzing their domain-filtered data slices in parallel, then a synthesizer merges their findings into ranked recommendations. The synthesizer's conflict resolution strategy is not documented. When two or more experts produce conflicting recommendations (e.g., GrowthStrategist recommends hiring while CFO recommends cost-cutting based on conflicting cash position signals), there is no documented mechanism for the synthesizer to detect, adjudicate, or surface the conflict.

## Evidence

- `8 domain-filtered experts (GrowthStrategist, RevenueGuardian, SkepticalOperator, TeamDynamicsArchitect, AutomationScout, CFO, ContentStrategist, MarketAnalyst) analyze their relevant data slices in parallel`
- `a synthesizer merges their findings into ranked recommendations`
- No conflict resolution, consensus threshold, or disagreement surfacing documented

## Open Question

What happens when the synthesizer receives conflicting recommendations from two or more experts? Does it:
1. Average/weight them?
2. Pick one based on some priority order?
3. Surface the conflict as a "disagreement" recommendation?
4. Defer to the CFO persona as tiebreaker?
5. Discard the lower-priority recommendation without note?

## Risk

- Without conflict resolution documentation, it's impossible to audit whether the synthesizer is making sound judgments
- Conflicting signals could be silently resolved by a simple averaging heuristic that loses important nuances
- Users of the digest (Matt via Telegram meta-analysis topic 1827) cannot interpret disagreements without knowing they exist

## Recommended Action

1. Document the synthesizer's conflict resolution strategy
2. Add explicit "disagreement" recommendations when experts conflict — surface the conflict rather than silently resolve it
3. Add a confidence score to each recommendation indicating how consistent the expert opinions were
4. Add a manual override log so Matt can flag when the synthesizer made a bad call

## Priority

low (informational until conflict resolution strategy is documented)