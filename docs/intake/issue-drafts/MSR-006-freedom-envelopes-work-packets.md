# MSR-006: Freedom envelopes per work packet — implement three-band constraint model

## Issue Type
implementation

## Summary
Each work packet (Capability / Change package / Worker brief / Atomic task) must be split into three bands: hard constraints / design intent / freedom zone.

## Evidence
- 20260401 - Chat GPT - Memory Stack Recommendations (Response section 3, "freedom envelopes")

Three-band model:
1. **Hard constraints** (non-negotiable): invariants, interfaces touched, schemas, security rules, performance budgets, acceptance criteria, forbidden moves
2. **Design intent** (what good looks like): why this exists, user outcome, architectural fit, stylistic preferences, known tradeoffs
3. **Freedom zone** (where creativity is allowed): internal implementation approach, helper factoring, naming within a boundary, local optimization, alternate UI interaction if equivalent, test tactics if acceptance criteria met

## Implementation Questions
- How is the three-band model serialized in the work packet format?
- How does a worker know which band they're in when making decisions?
- What happens when a worker's freedom-zone choice violates hard constraints?
- Should hard constraints be enforced by the control plane (Paperclip) or by worker self-governance?

## Labels
spec-framework, freedom-envelopes

## Depends On
MSR-002 (PRD compiler layer must emit packets before envelopes can be applied)
