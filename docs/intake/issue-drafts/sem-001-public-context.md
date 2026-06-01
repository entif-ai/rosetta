# SEM-001: Define Entif Public JSON-LD Context (schema.org Mapping)

## Type

`architecture/spec-gap`

## Summary

Define the Entif public JSON-LD context (`https://entif.ai/contexts/app.jsonld`) that maps Entif's primary entity types onto schema.org vocabulary. This is a prerequisite for any semantic SDK work and must be established before any app ships JSON-LD.

## Problem

Entif apps need to emit machine-readable JSON-LD that both humans and AI agents can consume. Without a defined public context, each app will emit inconsistent or non-interoperable JSON-LD, breaking cross-app entity resolution and agent traversal.

## Proposed Approach

1. Enumerate all first-class entity types across the Entif ecosystem:
   - `Task`, `Goal`, `Habit`, `FocusSession` (VieDay)
   - `Product`, `Offer`, `InventoryItem`, `Order`, `Cart` (Dollahs.com / SAFE Inventory)
   - `Review`, `AggregateRating`, `Product` (These.Reviews)
   - `Tip`, `Source`, `Prerequisite` (These.Tips)
   - `Person`, `Skill`, `WorkExperience`, `EducationEvent`, `PortfolioItem` (Interview Ace)
   - `Post`, `Thread`, `CommunityRule`, `ModerationEvent` (FEZB.UK)
   - `Project`, `Artifact`, `Capability` (internal/Code Atlas)

2. Map each entity type to the closest schema.org type using a table like:

   | Entif Entity | schema.org Type | Notes |
   |---|---|---|
   | Task | `Action` + `ToDo` | `StartAction` / `CompleteAction` for transitions |
   | Goal | `Goal` (or `Plan`) | Extend if schema.org has no exact match |
   | Product | `Product` | — |
   | Offer | `Offer` | Signed `price` and `availability` required |
   | InventoryItem | `Product` + `ItemPage` (for QR-scannable items) | Consider `Product` with `inventoryID` |
   | Review | `Review` + `AggregateRating` | Reviewer credentials optionally as VC |
   | Person | `Person` | Skills as `hasCredential` or `knowsAbout` |
   | Post | `Article` or `SocialMediaPosting` | ActivityStreams for FEZB |
   | Project | `Project` | — |

3. Publish the context at a stable, versioned URL (`/contexts/app-v0.jsonld`)
4. Include `json-ld:context` in HTTP `Link` headers on all canonical resource URLs
5. Use semantic versioning with a deprecation window (12 months minimum)

## Dependencies

- None (this is the foundational spec)

## Labels

`semantic-web`, `json-ld`, `schema.org`, `public-context`, `spec-gap`

## Evidence

- `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md` — Finding: "Public context maps your primary entity types onto schema.org and a few custom terms; it is versioned, documented, and safe to depend on."

## Status

draft