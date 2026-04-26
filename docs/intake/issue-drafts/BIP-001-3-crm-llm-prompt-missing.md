# BIP-001-3 — LLM Classification Prompt Not Provided

**Use Case:** BIP-001 (Personal CRM Intelligence)
**Confidence:** MEDIUM
**Type:** spec-gap

## Description

The LLM classification step for Stage 2 contact filtering is described narratively ("REJECT clearly automated..., REJECT if all sample subjects look like newsletters..., APPROVE only if it looks like a real person...") but the actual prompt text is never provided. The output quality of the classification depends entirely on the model's interpretation of these rules, making the behavior non-reproducible and non-auditable.

## Specific Gaps

1. **No prompt text provided:** A practitioner implementing this spec cannot reproduce the behavior without reverse-engineering the intended prompt.
2. **No examples provided:** Few-shot or zero-shot? Without examples of "APPROVE" vs "REJECT" decisions, different models will produce inconsistent classifications.
3. **No output schema specified:** Does the LLM return a structured JSON (`{decision: "APPROVE"|"REJECT", confidence: 0.0-1.0}`) or free text? The downstream scoring logic needs a structured output.
4. **No temperature/model settings specified:** "Fast, cheap LLM" is not a specification — Gemini Flash, Haiku, and GPT-3.5 Turbo have very different behaviors at the same temperature.

## Expected Behavior

The spec should include the full prompt template with:
- Variable placeholders for candidate name, email, exchange count, sample subjects, sample snippets
- The complete instruction set
- The required output schema
- Recommended model settings (temperature, max tokens)

## Source Reference

BIP-001, "Stage 2 — AI classification" section: "Send the candidate's name, email, exchange count, and sample subject lines/snippets to an LLM with these rules..."
