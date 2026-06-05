# IDI-009: OpenAI ChatGPT Seat vs. API Org Conflation — Existing Docs May Need Correction

## Metadata

- **Type**: documentation
- **Status**: draft
- **Source doc**: `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- **Evidence**: "A ChatGPT Enterprise/Business workspace is not the same thing as an API Platform organization. Membership is managed separately."
- **Confidence**: high

## Problem

The conversation makes clear that OpenAI maintains two distinct concepts:
- **ChatGPT Business/Enterprise workspace**: billing/admin seat management for the ChatGPT product
- **API Platform organization**: the billing/unit for the API product, which governs prompt cache sharing

These are managed independently. Enterprise seat membership does not confer API cache membership. Any Rosetta or Entif documentation that treats these as equivalent will produce incorrect cache sharing behavior and broken enterprise deployment assumptions.

This conflation is a plausible error in existing Entif architecture docs given how similarly named the two concepts are.

## Required Action

- Audit all docs for references to "OpenAI enterprise" in contexts that might imply API cache sharing
- Explicitly separate the two concepts wherever OpenAI is discussed
- Add a note in the OpenAI adapter: ChatGPT workspace ≠ API Platform org; separate membership required for API access
- Update the context-fabric design to model OpenAI as two distinct boundary types: seat boundary (workspace) and cache boundary (API org)

## Connection to Existing Issues

- Related to IDI-008 (Anthropic workspace isolation) — both involve cache boundary ≠ administrative seat boundary
- Both reinforce the general principle: cache domain ≠ organizational hierarchy

## TODO

- [ ] Search docs for "OpenAI" + "enterprise" + "cache" references that may conflate the two concepts
- [ ] Add explicit distinction section to OpenAI adapter documentation
- [ ] Update context-fabric model: OpenAI cache boundary is API org, not ChatGPT workspace
- [ ] Add test case for multi-workspace enterprise: different API orgs → no cache sharing
