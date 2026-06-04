# MSR-009: Weak-to-strong summary pipeline — implement four-pass summary with verifier stage

## Issue Type
implementation

## Summary
Four-pass summary (weak/strong/verifier/promotion) differs from ordinary hierarchical summarization. Verifier pass checks whether strong pass exceeded evidence. Implementation details for verifier pass need design.

## Evidence
- 20260401 - Chat GPT - Memory Stack Recommendations (Response section 4, "where weak-to-strong fits")

Weak-to-strong generalization (OpenAI framing): using weaker supervision to elicit latent stronger capabilities from a more capable model, rather than forcing it to merely imitate the weaker supervisor's errors

Four-pass summary pipeline:
1. **weak pass**: cheap extraction and structure — constrained, structured supervision
2. **strong pass**: synthesis and reinterpretation — elaborate beyond weak pass but anchored to structured scaffold; allowed to disagree but must show work
3. **verifier pass**: check whether strong pass exceeded evidence — critical distinction from ordinary hierarchical summarization
4. **promotion pass**: decide what becomes durable

This is closer to the spirit of weak-to-strong than ordinary hierarchical summarization. Summary tiers should not just be "short, medium, long."

## Implementation Questions
- How does the verifier pass detect when strong pass exceeded evidence?
- What is the output of the verifier pass? A flag, a correction, a confidence score?
- What happens when verifier detects overreach — does it fall back to weak pass, or generate a correction?
- Is this applied per chunk, per document, or per concept?
- How does this interact with existing summarization in Entif 2.0 pipeline?

## Labels
cognitive-loop, weak-to-strong

## Depends On
MSR-003 (five-layer memory model), MSR-004 (cognitive loop implementation)
