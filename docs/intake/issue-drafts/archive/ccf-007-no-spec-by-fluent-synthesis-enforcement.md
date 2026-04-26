# CCF-007: No "Spec by Fluent Synthesis" Enforcement

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ccf-007 |
| Title | No "Spec by Fluent Synthesis" Enforcement |
| Type | llm-workflow |
| Priority | P1 |
| Source doc | `docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md` |
| Extraction date | 2026-04-25 |
| Status | draft |

## Problem Statement

The framework explicitly forbids "spec by fluent synthesis": "Any non-trivial claim in a spec must have a ledger entry (or be labeled as hypothesis)." It also requires the agent to "express confidence bounded by evidence quality (preventing the model's 'ready to spec' impulse from masquerading as certainty)." These are critical anti-hallucination safeguards. No enforcement mechanism exists in Rosetta's AI-assisted workflow tooling.

## Evidence

> "This framework forbids 'spec by fluent synthesis': Any non-trivial claim in a spec must have a ledger entry (or be labeled as hypothesis)." — §AI-assisted workflow risk controls

> "The agent must express confidence bounded by evidence quality (preventing the model's 'ready to spec' impulse from masquerading as certainty)." — §AI-assisted workflow risk controls

## Impact

LLM-generated specs will contain fluent, confident-sounding claims with no evidence backing. Without enforcement, the framework's anti-hallucination intent is defeated at the first AI-assisted spec production step.

## Options

**Option A — LLM output audit:** Add a pre-commit validation step in the spec production workflow that scans the spec for non-hypothesis claims and checks for corresponding evidence ledger entries. Flag gaps before spec is finalized.

**Option B — Hypothesis label enforcement:** Require all uncertain claims to be labeled `[hypothesis]` or equivalent; spec commit hook rejects unlabeled uncertain claims.

**Option C — Confidence bounding in prompt:** Embed explicit confidence-bounding instructions in all spec-production prompts, requiring explicit confidence-level declarations on claims.

**Option D — Combined audit + labeling:** Option A (audit) + Option C (prompt) + Option B (label enforcement) for defense-in-depth.

## Recommendation

Option A (audit) + Option C (prompt) as immediate steps. Option B as follow-up when evidence ledger (ccf-005) is implemented.

## Next Steps

- [ ] Design spec audit tooling to flag unledgered non-trivial claims
- [ ] Embed confidence-bounding instructions in spec production prompts
- [ ] Implement hypothesis label convention
- [ ] Integrate audit with pre-commit or PR review tooling
- [ ] Coordinate with ccf-005 (evidence ledger) for ledger-entry checking