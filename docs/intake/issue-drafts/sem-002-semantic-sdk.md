# SEM-002: Semantic SDK — React JsonLd Helper and useA11y Hook

## Type

`implementation`

## Summary

Build and publish the Entif Semantic SDK as an npm package (`@entifs/semantic-sdk`) that provides: (1) `<JsonLd>` React component for declarative JSON-LD emission, (2) `useA11y()` hook for auto-applying ARIA contracts, (3) context merge utility, (4) ID normalization helpers.

## Problem

Every app needs to emit structured semantic data without hand-rolling JSON-LD. Currently there is no standard developer ergonomic for this — it varies app by app and engineer by engineer, leading to inconsistent or missing semantic contracts.

## Proposed Approach

### Package structure

```
@entifs/semantic-sdk
├── JsonLd/           # React component
├── hooks/
│   └── useA11y.ts   # ARIA auto-application hook
├── utils/
│   ├── context-merge.ts
│   ├── id-normalize.ts
│   └── build-jsonld.ts
├── types/
│   └── index.ts      # Shared type definitions
└── index.ts
```

### JsonLd component

```tsx
import Head from "next/head";

interface JsonLdProps {
  data: Record<string, unknown>;
  contextUrls?: string[];
}

export function JsonLd({ data, contextUrls = [] }: JsonLdProps) {
  const ctx = contextUrls.length
    ? contextUrls
    : ["https://schema.org", "https://entif.ai/contexts/app.jsonld"];
  const merged = { "@context": ctx, ...data };
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(merged) }}
      />
    </Head>
  );
}
```

### useA11y hook

```tsx
interface A11yOptions {
  role?: string;
  label?: string;
  describedBy?: string;
  liveRegion?: boolean;
}

export function useA11y(options: A11yOptions) {
  // Applies role, aria-label, aria-describedby, and focus management
  // Returns ref and ariaProps for spread onto target element
}
```

### CI gates

- Run `@ axe-core/react` on every component test
- Run Google Rich Results Test / Schema Validator on every route's JSON-LD output
- Fail build on regression

### Publishing

- Publish to npm with semantic versioning
- CI publishes on tag push (`semantic-release` or similar)
- GitHub Actions: lint, test, build, publish

## Dependencies

- SEM-001 (public context must exist before SDK ships)

## Labels

`semantic-sdk`, `react`, `json-ld`, `accessibility`, `ci`, `implementation`

## Evidence

- `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md` — Code sample for `<JsonLd>` helper and `useA11y()` hook; "CI runs axe-core and Schema Validator on every PR"

## Status

draft