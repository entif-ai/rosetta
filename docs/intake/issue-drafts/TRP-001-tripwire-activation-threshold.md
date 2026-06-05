# TRP-001: Tripwire Activation Threshold — Defining "Serious Imminent Harm"

**Priority:** P1  
**Type:** epic  
**Status:** draft  
**Labels:** tripwire, entethos, definitions  
**Depends on:** — (foundational, no dependencies)

---

## Summary

Define the precise activation threshold for the EntEthos tripwire: what constitutes "serious imminent harm" that justifies ephemeral logging, quorum escalation, and intervention. This is the foundational issue — all other TRP issues depend on having a clear, defensible threshold definition.

---

## Problem Statement

The tripwire must only fire for genuinely catastrophic risk (murder, terrorism, mass violence, irreversible abuse). It must NOT fire for:
- Drugs, dark humor, pirated PDFs
- Teenage angst, philosophical discussions about violence
- Legal but uncomfortable queries
- Creative writing involving violence
- Mental health exploration (unless imminent self-harm)

Without precise definitions, the system risks:
- False positives that violate privacy guarantees
- False negatives that miss real threats
- Regulatory non-compliance across jurisdictions
- Mission creep toward surveillance

---

## Scope

### Must Define

1. **Threshold categories** (what qualifies):
   - Imminent threat to life (individual or mass)
   - Terrorism or mass violence planning
   - Irreversible abuse (kidnapping, torture, rape)
   - Catastrophic criminal intent with clear means/occasion

2. **Confidence level** required to fire:
   - 2-of-3 confirmation required (semantic classifier + graph signal + entropy anomaly)
   - What are the numeric threshold scores per layer?
   - How are the layers weighted?

3. **Temporal component**:
   - "Imminent" — what time window? (24h? 7 days? "planning stage"?)
   - Does past harm mention count? (e.g., "I killed someone last week")
   - Does fictional framing protect the query? (creative writing, roleplay)

4. **Context exclusions**:
   - Self-defense discussions
   - Historical / educational inquiry
   - Mental health processing (suicidal ideation vs. actual plan)
   - Creative writing / fiction
   - News / journalism

5. **Jurisdictional variance**:
   - Different jurisdictions define "harm" differently
   - Is the threshold static or configurable per deployment?
   - Who has authority to define thresholds per context?

### Must NOT Define

- Surveillance thresholds (this is NOT a surveillance system)
- General content policy (this is only about imminent catastrophic harm)
- Civil / financial harm (out of scope for tripwire)

---

## Technical Considerations

1. **Threshold as config, not hardcode**:
   - The threshold definitions should be declarative (YAML/JSON), not buried in code
   - Allows review, versioning, and jurisdiction-specific overrides

2. **Explainability requirement**:
   - When a tripwire fires, the record must include which threshold criteria were met
   - Enables human review and legal defensibility

3. **Periodic review**:
   - Thresholds should be reviewed quarterly
   - Include feedback loop from escalation outcomes

---

## Acceptance Criteria

- [ ] Written definition of "serious imminent harm" with explicit inclusion/exclusion criteria
- [ ] Threshold scores defined for each of the 3 confirmation layers (semantic, graph, entropy)
- [ ] Temporal window defined (what "imminent" means)
- [ ] Context exclusions catalogued with examples
- [ ] Config format defined (YAML/JSON) allowing jurisdiction/deployment overrides
- [ ] Explainability format defined (what gets logged alongside the trigger)
- [ ] Review cadence defined (quarterly minimum)

---

## References

- Source: docs/governance/20250710 - Tripwire Protocol - EntifAI.md
- Relevant quote: "Trigger Only on Existential Harm — Not for drugs, dark humor, pirated PDFs, or teenage angst. Only for credible threats of murder, terrorism, irreversible abuse, or mass violence."
- Related: TRP-002 (escalation protocol), TRP-003 (semantic risk graph + entropy scoring)