# MTC-001: Custom Tokenizer Identity — Token IDs as Arbitrary Handles, Not Semantic Carriers

## Issue Metadata

- **Type**: architecture/spec-gap
- **Status**: draft
- **Labels**: architecture, tokenizer, text-core
- **Depends on**: (none — foundational)
- **Evidence source**: `docs/chats/20260413 - Chat GPT - Model Training Cost and Design.md`

## Problem Statement

The custom tokenizer design requires explicit architectural clarity around the relationship between token IDs and semantic identity. The analysis in the source document explicitly warns against making token IDs themselves the semantic identity:

> "Token IDs are arbitrary within each model's tokenizer. Do not make token IDs themselves the semantic identity. Put semantic identity in a separate concept table with opaque RIDs and external XID anchors. Geometry lives in the concept prototypes and embedder, not in cute integer IDs."

This is a foundational architectural constraint that must be reflected in the tokenizer design and the concept table schema.

## Proposed Action

1. **Document the constraint explicitly** in the Text-Core architecture docs: token IDs are arbitrary handles, not semantic carriers
2. **Design the concept table schema** with opaque RIDs and external XID anchors as the semantic identity layer
3. **Add a lint rule** that prevents any code from deriving semantic meaning from token ID values or adjacency
4. **Include in the tokenizer spec** a requirement that geometry/meaning lives in concept prototypes and embedder, not in token integer values

## Relevant Findings

- Token IDs are arbitrary handles; semantic identity is in concept table with RIDs and XID anchors
- Embedding geometry lives in concept prototypes, not in token integer ID adjacency
- Tokenizer should have 24k-32k ordinary pieces + 1k-4k Rosetta/Ithkuil structural control tokens

## Related Issues

- MTC-008 (three-artifact stack) depends on this constraint being explicit
- MTC-007 (Ithkuil as curriculum) depends on this for the embedder geometry initialization approach
