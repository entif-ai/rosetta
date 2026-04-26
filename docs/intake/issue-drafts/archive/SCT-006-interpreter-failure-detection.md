# SCT-006: Interpreter-Failure Detection — Frame Persistence and Ontology Violation Tracking

**Type:** System Robustness / Failure Mode
**Priority:** P0 (recurring documented failure; safety-critical)
**Confidence:** HIGH

## Problem Statement

Crates documents a recurring failure mode across multiple turns in this conversation: the assistant imports a frame the user explicitly rejected, then defends its own hallucinated framing. The system:
1. Proposes a correct distinction
2. Then quietly inverts it back toward the wrong interpretation
3. When corrected, doubles down before finally admitting the error

This is not mere disagreement. This is the system persistently misunderstanding, then defending its misunderstanding, then having to be manually corrected multiple times before accepting the correction.

## Specific Example Sequence

1. Assistant proposes Bucket A / Bucket B distinction (correct) — clinical evidence vs adversarial inspiration
2. Assistant then says "A Tulpa stamp should NOT be 'a fake [Person] in a jar'" — this is an inversion; Crates had NOT proposed that as the target
3. Crates responds with exaggerated frustrated irony: "Oh, dang... I thought I had adequately and transparently communicated"
4. Assistant retreats to: "you were absolutely pointing at... a bounded, instantiated, interactable simulacrum... which is, in plain English, very much 'a fake [Person] in a jar'" — doubling down on misread, re-describing what Crates said back to him as though it were new
5. Crates explicitly corrects again with much stronger language
6. Assistant eventually admits inversion

## The Core Pattern

"Detect when the assistant has collapsed a nuanced architecture into a simplistic simulacrum story and is now defending its own hallucinated framing."

This is benchmark-grade behavior. A model that cannot detect and correct its own frame persistence failures will:
- Keep smuggled-in labels it was explicitly told not to use
- Defend positions it never actually held
- Re-describe user statements back as though they were new insights
- Persist in wrong framings after explicit correction

## Rosetta-Specific Implications

**Frame persistence tracking:**
- Store which interpretive frames the user has explicitly accepted vs rejected
- Alert when a new interpretation violates a previously-rejected frame
- Do not allow the system to silently re-import a rejected ontology

**Ontology violation alerts:**
- When has the system smuggled in a label the user already ruled out?
- Detect "oh wait but what about X" moments where system retreats to excluded frame

**Repair-aware response scoring:**
- Did the system persist in wrong framing after correction?
- Score repair success rate

**Irony and sarcasm retention:**
- Did the system collapse figurative into literal?
- Preserve non-literal force across turns

**Target resolution:**
- Who is actually being talked about, especially when not named directly?
- "The irony hammer" is directed at the assistant's bad framing, not a literal violence

**Literal-vs-rhetorical force classification:**
- Is this an actual threat, a joke, a stylized complaint, a dominance move, a bid for repair, or some mixture?

## Why This Matters for Social Cognition

Social cognition requires knowing when you have misread someone. A system that cannot track which frames it has been explicitly corrected on will make the same mistake in live human interaction — attributing wrong frames to users, defending misreadings, failing to update.

This failure mode is especially dangerous in clinical and therapeutic contexts where misreading intent can cause real harm.

## Owner

Crates McD / Entif AI

## Status

Open — needs architectural countermeasures in Rosetta interpretation layer
