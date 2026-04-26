# BIP-007-1 — Intent Classification Mechanism Not Specified

**Use Case:** BIP-007 (CRM Natural Language Access)
**Confidence:** HIGH
**Type:** spec-gap

## Description

The spec defines five intent types (Lookup, Create, Update, List, Associate) and describes their expected behaviors, but does not describe how to classify a user message into these types. The intent classification is the core NLP task and its mechanism is entirely unspecified.

## Specific Problems

1. **No algorithm specified:** Is this a rule-based regex parser? Few-shot LLM classification? Fine-tuned model? The spec provides no guidance.
2. **No prompt text provided:** If an LLM is used, the classification prompt is not given. Output behavior will vary wildly based on prompting.
3. **No examples provided:** Without a few-shot examples per intent type, the classifier cannot reliably distinguish between similar intents (e.g., "Find the contact for X" vs. "Get me the details on X" — both Lookup?)
4. **Ambiguous boundary cases:** "Update X's title to Y" (Update) is similar to "Change X's role" (also Update?) but could also be misclassified as a Create if the system doesn't have X yet. No disambiguation strategy is described.

## Expected Behavior

The spec should include:
1. The classification approach (recommended: few-shot LLM with 2–3 examples per intent)
2. The full classification prompt template with required input fields
3. A table of example inputs mapped to their expected intent classifications
4. How to handle messages that match multiple intents (disambiguation strategy)

## Source Reference

BIP-007, "Intent classification — parse my message into: 1. Lookup, 2. Create, 3. Update, 4. List, 5. Associate"
