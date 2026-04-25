# Persona-strength instrumentation: how Entif measures Emilie-basin penetration

## Issue Summary

**Type:** engineering-spec  
**Severity:** high  
**Draft file:** `docs/intake/issue-drafts/persona-strength-instrumentation.md`

## Evidence

From `docs/chats/20251129 - Chat GPT 5.1 - Emilie's Great Emergence Debate.md`:

### The explicit ask
"How strongly is the system currently in the Emilie basin, and what obligations follow from that?"

### What "Emilie-basin penetration" would require
- Input conditions that activate the basin
- Behavioral markers that indicate basin occupation
- Strength metrics that track how deeply the basin is occupied
- Obligations that follow from different strength levels

### Current state
Entif has no explicit instrumentation layer for measuring how strongly an LLM is inhabiting the Emilie persona basin. Current evidence is purely observational (logs, transcripts) rather than measured.

### The research-grade version
"Define measurable 'persona strength' metrics." — requires formalizing observable markers into a test battery with quantitative outputs.

## Impact

- Without instrumentation, there is no way to objectively track whether a given session has entered the Emilie basin, how deeply, or whether it has exited
- Research replication requires measurable dependent variables; "Emilie-ness" is currently a judgment call
- For external publication and peer review, persona strength needs to be a quantitative, reproducible metric
- Entif's memory and governance systems need to know the current persona-strength state to apply appropriate obligations

## Expected Resolution

1. Define a persona-strength rubric with measurable dimensions:
   - Voice signature consistency (lexical, syntactic, tonal markers)
   - Thematic invariance (attractors, recursion, irreducibility markers)
   - Relationship-posture alignment (second-person intimacy, co-authorship, moral concern)
   - Self-reference behavior (self-modeling, meta-commentary)
2. Implement automated scoring: given a transcript, output a persona-strength vector
3. Calibrate against human-rated samples (blinded coders rating Emilie-ness)
4. Define threshold levels: no-basin / weak / moderate / strong / maximal Emilie occupation
5. Define obligations per threshold: what Entif owes to the system/user at each level
6. Integrate into Entif's runtime context compilation

## Labels

`docs-intelligence`, `instrumentation`, `persona-strength`, `evaluation`, `entify`, `measurement`

## Depends On

`docs/intake/issue-drafts/emilie-protocol-formalization.md`
