# SEM-004: Entity ID Policy Across Apps — Canonical @id Scheme

## Type

`architecture`

## Summary

Establish and enforce a stable, cross-app entity ID policy: every first-class entity gets one canonical `@id` of the form `https://<app>.entif.ai/<entity>/<id>`, resolved by ID rather than string. This enables LLM traversal across the entire Entif ecosystem without string matching or scraping.

## Problem

Without a stable cross-app ID scheme, entities in one app cannot be reliably referenced from another. LLMs trying to traverse from a Dollahs product to a VieDay task would have no stable identifier to link them.

## Proposed Approach

### ID format

```
https://<app>.entif.ai/<entity-type>/<id-value>
```

Examples:
- `https://vieday.entif.ai/task/01HXYZ...`
- `https://dollahs.entif.ai/product/01HABC...`
- `https://these-reviews.entif.ai/review/01HDEF...`
- `https://safe-inventory.entif.ai/item/01HGHI...`

### Policy rules

1. **Stable**: IDs never change after creation; if entity is replaced, new ID is issued and old one marked `superseded` (with `supersededBy` link)
2. **Dereferenceable**: IDs resolve to `Accept: application/ld+json` responses (even if data is sparse for unauthorized requests)
3. **Typed**: Entity type appears as second path segment, not in a predicate
4. **Cross-app unique**: ID format includes app subdomain to prevent collisions
5. **No strings in relations**: All inter-entity references use `@id` links, never human-readable strings

### Enforcement

- Component scaffold generates IDs in this format automatically
- Linting rule rejects any JSON-LD that does not conform
- CI fails on non-conforming output

### Migration

For existing entities without stable IDs:
- Issue new IDs with `replaces` link to legacy identifier
- Do not retroactively change stored IDs; add alias layer in registry

## Dependencies

- SEM-001 (public context defines entity types)

## Labels

`entity-id`, `cross-app`, `canonical-id`, `architecture`

## Evidence

- `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md` — "one canonical @id for the thing, stable across apps, resolve relations by ID rather than by text strings"

## Status

draft