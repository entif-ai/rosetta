# SSP-007: Implement Identity-Sensitive Escalation Path

## Type
governance / ethics / implementation

## Status
issue-candidate

## Priority
P0

## Labels
source-substrate, identity-sensitive, personhood, anti-personhood-correlation, governance, DI-012

## Evidence
docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md, Sections 15.1-15.3

## Summary

The Source Substrate must implement an explicit identity-sensitive escalation path. When source analysis begins relying on identity-fingerprinting techniques, it MUST trigger the stronger governance path defined in the personhood addendum.

The escalation triggers are:
- Stylometry (writing style analysis)
- Voice or behavior fingerprints
- Cross-platform same-author inference
- Quasi-biometric cognitive signatures
- Person-model construction

The system may reason about authorship credibility, institutional context, methodological rigor, track record, citation behavior, and correction behavior WITHOUT automatically crossing into forbidden fingerprinting territory.

## Requirements

### MUST DO

1. **Explicit escalation triggers**: Define and codify the 5 escalation trigger conditions as guard conditions in the ingestion/evaluation pipeline. Any use of: stylometry, voice/behavior fingerprinting, cross-platform same-author inference, quasi-biometric cognitive signatures, person-model construction → MUST halt and escalate.

2. **Escalation path**: When triggered, the pipeline must:
   - Halt the identity-sensitive operation
   - Flag the operation for human review or stronger governance path
   - Log the trigger type, source, and context
   - Do NOT proceed with the operation without explicit authorization

3. **Identity evidence gating**: source.identity_evidence objects that use stylometric evidence MUST be flagged as identity-sensitive and subject to the escalation path.

4. **Separation of layers in viewers/bundles**: Entif viewers and bundles must always distinguish:
   - Content provenance
   - Authorship evidence
   - Identity continuity evidence
   - Any model-generated identity inference

5. **Negative Case 5 enforcement**: Section 16 Negative Case 5: "The system MUST reject hiding an identity-sensitive inference behind an ordinary provenance label." This must be a hard rejection at the ingestion gate.

6. **Align with DI-012**: This issue directly implements the governance requirement from DI-012 (anti-personhood-correlation constraint missing from governance).

## Dependencies
- DI-012 (already filed: anti-personhood-correlation constraint missing from governance)
- SSP-003 (identity-resolution provenance — can trigger escalation)
- SSP-004 (trust vector — identity abuse risk axis)

## Open Questions
- Who/what is the escalation authority? (Human reviewer? Constitutional layer? Governance board?)
- How is the escalation decision recorded and audited?
- Does the escalation path apply only to external sources or also to internal artifacts?

## Affects
- Source Substrate constitutional domain
- Rights-scoped retrieval (identity-sensitive sources)
- NOT LAME: sovereign kernel policy
- DI-012 resolution
