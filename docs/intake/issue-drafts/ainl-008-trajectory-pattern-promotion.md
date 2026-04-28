# AINL-008: Require receipts before trajectory-to-pattern promotion

## Title

Require receipt-backed certification before successful trajectories become reusable procedural patterns.

## Source Evidence Link/Path

- AINL Claude Code plugin repository: https://github.com/sbhooley/ainativelang-claudecode
- AINL repository README: https://github.com/sbhooley/ainativelang
- Existing Rosetta issue: https://github.com/entif-ai/rosetta/issues/171
- Existing Rosetta issue: https://github.com/entif-ai/rosetta/issues/180
- Local synthesis: `docs/intake/competitor-intelligence/ainativelang-2026-04-28.md`

## Existing Representation Check

Related issues are already open:

- #171: adaptive memory plane/self-evolution loop.
- #180: skillpack hardening threshold criteria.
- #361: memory adapter certification harness.

This draft should be used to refine those issues, not published as a duplicate unless the promotion gate remains uncovered.

## Entif/Rosetta Mapping

AINL's pattern promotion maps to Rosetta as:

- candidate trajectory: execution tape plus receipts
- repeated success: measured across comparable runs
- promotion gate: validation, guard review, and hardening thresholds
- procedural pattern: certified pack/skill/workflow artifact with provenance
- demotion: failed replay or policy drift reduces activation or blocks use

## Priority

P2 - high leverage after execution tape receipts exist.

## Rationale

Automatic pattern promotion can save tokens and time, but it is also a supply-chain and safety risk. Rosetta should treat "learned pattern" as a promotion event requiring receipts, thresholds, and revocation mechanics.

## Acceptance Criteria

- [ ] Define the trajectory-to-pattern state machine: candidate, observed, promotable, certified, deprecated, revoked.
- [ ] Require execution tape and receipt bundle refs before promotion.
- [ ] Require minimum success count, failure-rate ceiling, replayability posture, and guard compatibility before certification.
- [ ] Define demotion/revocation when replay or policy validation fails.
- [ ] Document how promoted patterns map to packs, skills, or workflow bundles.

## Test Strategy

- Add state-machine tests for promotion and demotion transitions.
- Add fixtures for insufficient evidence, policy drift, replay failure, and successful certification.

## Non-Goals

- Do not let raw agent traces become executable skills automatically.
- Do not use LLM self-judgment as the only promotion signal.
- Do not publish while #171/#180 can absorb the refinement.
