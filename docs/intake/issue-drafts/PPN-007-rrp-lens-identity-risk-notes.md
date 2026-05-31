# Issue Draft: PPN-007 — RRP Lens: Identity-Risk Framing Notes

## Metadata

- **Type**: RRP, lens, identity-risk
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: rrp, lens, identity-risk, personhood-provenance
- **Confidence**: medium

## Problem Statement

The RPP lens layer already emits assumptions and framing notes for provenance and policy analysis. It does not currently emit identity-risk notes when a workflow imitates a real person, compares corpora for same-author inference, or infers stable traits from longitudinal behavior. This gap means identity-risk signals are invisible at the lens layer, increasing the chance of silent escalation from observation → modeling → simulation.

## Evidence

From "Architecture Hooks / RPP Lens Layer":

> "RPP already emits assumptions and framing notes. Extend it to emit identity-risk notes when a workflow appears to: imitate a real person, compare one corpus to another for same-author inference, or infer stable traits from longitudinal behavior."

## Required Actions

1. Define identity-risk note types for the RPP lens layer
2. Define trigger conditions for each note type:
   - Impersonation signals (imitating a real person)
   - Same-author inference signals (comparing corpora for authorship correlation)
   - Longitudinal trait inference signals (deriving stable behavioral traits from multi-sample corpora)
3. Implement note emission when triggers are detected
4. Define note schema and integration with existing lens output format
5. Add tests for identity-risk note emission

## Identity-Risk Note Types

| Note Type | Trigger | Severity |
|---|---|---|
| `rrp:lens:identity:impersonation_detected` | Output imitates real person's style/likelihood above threshold | High |
| `rrp:lens:identity:same_author_inference` | Cross-corpus comparison for authorship correlation attempted | Medium |
| `rrp:lens:identity:longitudinal_trait_inference` | Stable traits being derived from multi-sample behavior | Medium |
| `rrp:lens:identity:cross_platform_linkage` | Cross-context identity correlation attempted | High |

## Dependencies

- PPN-001: Governance domain must define what counts as identity-risk
- Existing RPP lens infrastructure
- PPN-003: Guard-layer should consume identity-risk lens notes for routing decisions

## Notes

- RPP lens notes are informational (not enforcement), but they feed into guard-layer classification
- This is a natural extension of the existing RPP lens architecture
- Similar in spirit to how the lens already emits provenance assumption notes
