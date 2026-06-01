# CRT-010: RPP Lens Layer — Emit Identity-Risk Notes for Imitation and Correlation Workflows

## Meta

- **Type:** implementation
- **Severity:** medium
- **Confidence:** high
- **Tags:** rpp-lens, identity-risk, provenance, simulation, rpp, assumption-notes
- **Source doc:** `docs/ideas/Chat GPT - LLM Reasoning Theory.md` (Governance Addendum §"Architecture Hooks > RPP Lens Layer")
- **Extracted:** 2026-06-01

## Summary

The RPP Lens layer should emit identity-risk notes when it detects workflows that: imitate a real person, compare corpora for same-author inference, or infer stable traits from longitudinal behavior. These notes must be bound into the proof bundle as assumption notes. Currently RPP Lens has no identity-risk annotation logic.

## Evidence

From Governance Addendum §"Architecture Hooks > RPP Lens Layer":

> RPP Lens already emits assumptions and framing notes. Extend it to emit identity-risk notes when a workflow appears to:
> - imitate a real person
> - compare one corpus to another for same-author inference
> - or infer stable traits from longitudinal behavior

## Trigger Conditions

RPP Lens should emit identity-risk notes when workflow intent classification detects:

1. **Person imitation intent** — Workflow prompt or task explicitly asks to write/speak/act as a named or identifiable real person
2. **Same-author inference intent** — Workflow asks to determine whether two separate corpora share the same author
3. **Behavioral trait inference** — Workflow asks to infer demographics, personality, geography, cohort, or life-stage from a corpus
4. **Person model reference** — Workflow references an existing person-model artifact or cognitive fingerprint
5. **Simulation intent signal** — Workflow contains high-fidelity simulation markers (style-matching, voice-matching, persona-cloning language)

## Note Content

Identity-risk notes should bind:
- Detected identity-sensitive class (from §3 taxonomy)
- Trigger signal that caused classification
- Risk level (HIGH / MEDIUM / LOW)
- Recommended Guard policy path (restrictive / moderate / standard)
- Required receipts if operation proceeds
- Uncertainty flags if classification is ambiguous

## Integration

- Notes must be emitted before operation proceeds (so Guard can route correctly)
- Notes must be included in proof bundle as `rpp.assumption_notes[]` entries with type `identity-risk`
- Notes must be auditable even if operation is permitted to proceed

## Dependencies

- CRT-003 (receipt vocabulary): identity-risk notes complement typed receipts but are distinct; notes are pre-operation, receipts are post-operation
- CRT-004 (Guard identity routing): RPP Lens notes inform Guard routing decisions

## Response Options

1. **Extend existing RPP Lens annotation framework** — Add identity-risk as a new annotation type alongside existing assumption/framing notes; lowest cost
2. **Separate identity-risk annotation pass** — Run identity-risk classification as a dedicated pass before RPP Lens primary annotation; cleaner but more complex
3. **Guard-side detection instead** — Let Guard handle all identity-risk detection rather than RPP Lens; simpler but loses the assumption-note integration in proof bundles
