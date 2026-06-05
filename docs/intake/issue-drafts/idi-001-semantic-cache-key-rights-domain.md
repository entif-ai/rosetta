# IDI-001: Semantic Cache Key Must Encode Rights Domain, Not Just Intent

## Metadata

- **Type**: architecture/spec-gap
- **Status**: draft
- **Source doc**: `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- **Evidence**: "Your cache key can't just be intent. It has to be something like: `semantic_intent × rights_domain × data_classification × policy_version × source_bundle_hash`"
- **Confidence**: high

## Problem

Entif's context fabric is proposed as a semantic cache router — collapsing "same question, different wording" into one resolved answer. But if the same semantic intent (e.g., "What are my health benefits?") maps to different answers depending on the caller's entitlements, the cache must differentiate outcomes by rights domain — not just by surface intent.

A naive cache key of `intent_hash` alone would serve the wrong answer to the wrong entitlement class.

## Required Definition

The minimal cache key tuple for Entif's semantic cache:

```
semantic_intent_hash × rights_domain × data_classification × policy_version × source_bundle_hash
```

Where:
- `semantic_intent_hash`: Rosetta-interpreted intent vector, not surface form
- `rights_domain`: ABAC attribute bundle (role, clearance, tenant_id, etc.)
- `data_classification`: Sensitivity tier of the requested information
- `policy_version`: Which policy tile version governs the answer
- `source_bundle_hash`: Content hash of the source material (handbook, policy doc, etc.)

## Rosetta Connection

This directly implicates:
- `rights-scoped-retrieval`: No retrieve-then-filter; rights domain must gate the cache lookup
- `tapestry`: Policy tile versioning is already in scope for tapestry compilation
- `source-episode`: Source bundle hash is a first-class provenance field already modeled

## TODO

- [ ] Define the canonical `RightsDomain` schema in the type system
- [ ] Specify how `data_classification` maps to existing Rosetta classification tiers
- [ ] Add `policy_version` to the tile/tapestry artifact schema
- [ ] Update `context-fabric` design doc with the full key tuple
- [ ] Add test cases: same intent, different rights domains → different cache outcomes
