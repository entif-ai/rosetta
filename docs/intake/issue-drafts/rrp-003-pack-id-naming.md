# RRP-003: ROCK-3111-C Pack_id Naming Convention Undefined

## Type
- `type`: spec-gap

## Status
- `status`: open

## Labels
- spec-gap
- rock
- pack
- rrp

## Summary

ROCK-3111-C (RRP Pack Filesystem Contract v0.1.0) lists `pack_id` as a required field in `pack.json`, but the naming convention for `pack_id` values is not defined. The draft uses `packs/rrp/` as the directory path but does not specify whether `pack_id` should be `@rosetta/rrp`, `rrp`, `rosetta.rrp`, or another format.

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` — "New work product 2: ROCK-3111-C draft":

```
Required pack.json fields:
- pack_id
- doc_id
- version
- kind = "rosetta.pack"
...
```

The document shows the field name but provides no convention. Compare with npm's `@scope/package-name` or Java's `com.domain.package` — without a convention, pack authors will invent inconsistent names.

## Why This Matters

- `pack_id` is likely used in exports, dependency references (`depends_on`), and content-addressed lookups
- Inconsistent naming breaks cross-pack references, dependency resolution, and registry indexing
- Without a convention, the RRP pack itself (at `packs/rrp/`) has no defined `pack_id`

## Recommendation

Define the naming convention as part of ROCK-3111-C finalization. Suggested options:
1. **Scoped npm-style**: `@rosetta/rrp` — aligns with existing npm ecosystem conventions
2. **Dot-separated domain**: `rosetta.rrp` — reflects Rosetta's domain-oriented design
3. **URL-style**: `rosetta.io/packs/rrp` — explicit and namespace-safe

Choose one and document it as a binding rule with examples for the RRP pack and future packs.

## Depends On
ROCK-3111-C formalization

## GitHub Issue
(Not yet filed)
