# CCF-005: No Evidence Ledger Implementation

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ccf-005 |
| Title | No Evidence Ledger Implementation |
| Type | evidence-management |
| Priority | P1 |
| Source doc | `docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md` |
| Extraction date | 2026-04-25 |
| Status | draft |

## Problem Statement

The Evidence Ledger is defined as a required artifact with seven mandatory fields per entry: claim statement, evidence type, source provenance, credibility score, incentive/bias notes, confidence level, and disconfirmers. It is the primary defense against hallucination and overconfident synthesis being promoted into strategy. No implementation of this ledger exists in Rosetta tooling, repo structure, or process workflows.

## Evidence

> "Evidence Ledger: every claim must have: claim statement, evidence type, source provenance, credibility score, incentive/bias notes, confidence level, disconfirmers" — §Evidence Ledger

> "This artifact is designed specifically to counter hallucination and overconfident synthesis being 'promoted' into strategy." — §Evidence Ledger

## Impact

Without an Evidence Ledger tool:
- Claims in specs are not linked to provenance or bias metadata
- Hallucinated or overconfident claims cannot be systematically flagged
- The anti-motivated reasoning guardrails have no substrate
- The Falsification & Dissent Packet cannot reference structured evidence
- "Spec by fluent synthesis" continues unchallenged

## Options

**Option A — YAML evidence ledger file:** Require `evidence-ledger.yaml` as a project file, structured per the spec's seven fields. Agent produces it as part of the spec artifact.

**Option B — Receipt-law extension:** Extend the receipt system to support evidence ledger entries as receipts with evidence-type, provenance, incentive/bias, confidence, and disconfirmers as receipt metadata fields.

**Option C — Dedicated evidence ledger package:** Create a lightweight `evidence-ledger` package in the Rosetta monorepo with schema, validation, and tooling to produce and query evidence entries.

**Option D — Integration with existing tapestry/receipt system:** Model Evidence Ledger entries as specialized receipts in the existing tapestry system, leveraging existing receipt-law infrastructure.

## Recommendation

Option D (existing receipt system) for alignment with Rosetta architecture. Option B as the implementation path. Validate evidence ledger entries at spec commit gates.

## Next Steps

- [ ] Design evidence ledger entry schema as extension of existing receipt schema
- [ ] Define validation rules for each of the 7 fields
- [ ] Add evidence ledger entry production to spec-authoring workflow
- [ ] Create evidence ledger query tooling for review/disputing
- [ ] Integrate with "spec by fluent synthesis" enforcement (ccf-007)