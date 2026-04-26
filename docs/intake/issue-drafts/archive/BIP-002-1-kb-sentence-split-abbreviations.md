# BIP-002-1 — Sentence Split Regex Fails on Common English Abbreviations

**Use Case:** BIP-002 (Knowledge Base RAG)
**Confidence:** HIGH
**Type:** correctness

## Description

The chunking strategy splits on sentence boundaries using the regex `(?<=[.!?])\s+`. This regex splits after any period, exclamation mark, or question mark, including those appearing in common English abbreviations. This causes over-splitting that corrupts chunk semantics and reduces retrieval quality.

## Affected Patterns

- **Initials:** "John F. Kennedy" → splits after "F." creating a chunk ending with "John F"
- **Titles:** "Dr.", "Mr.", "Mrs.", "Ms.", "Prof.", "Sr.", "Jr."
- **Abbreviations:** "e.g.", "i.e.", "etc.", "vs.", "al." (as in "et al."), "U.S.", "U.K.", "Inc.", "LLC"
- **Academic citations:** "Fig. 1", "p. 42", "Vol. 3"
- **Ellipsis:** "..." followed by a space (split after the period in the ellipsis)

## Expected Behavior

The sentence-splitting regex must handle:
1. Known abbreviations that should not trigger a split (Dr., Mr., e.g., i.e., etc., vs., al.)
2. Periods inside abbreviations vs. sentence-ending periods (context-dependent: a period after an uppercase word followed by a space and lowercase = likely sentence end; period after abbreviation abbreviation = not a sentence end)

A defensible approach: use a pre-built sentence tokenizer (e.g., spaCy's sentencizer, NLTK's sent_tokenize, or tokenizers library) which handles these cases with rule-based abbreviation lists. A pure regex solution will always have edge cases.

## Source Reference

BIP-002, "Chunking" section: "Split on sentence boundaries (regex: /(?<=[.!?])\s+/)"
