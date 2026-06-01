# SEM-013: Design Tokens and PreferenceSet for Cross-App Theming

## Type

`implementation`

## Summary

Standardize cross-app design tokens in a machine-readable `tokens.json` and generate platform bindings (CSS custom properties, TypeScript enums) in CI. Model user preferences as pure `PreferenceSet` data objects with deterministic merge rules so theming remains testable and composable.

## Problem

Each Entif app currently has its own ad-hoc theming approach. When a user wants consistent visual treatment across VieDay, SAFE Inventory, and Dollahs, there is no shared token system — and preference overrides (e.g., "high contrast mode") are implemented inconsistently.

## Proposed Approach

### tokens.json structure

```json
{
  "$schema": "https://enti.ai/design-tokens/schema.json",
  "version": "1.0.0",
  "tokens": {
    "color": {
      "primary": { "value": "#4F46E5", "contrast": "7.2:1" },
      "secondary": { "value": "#10B981", "contrast": "4.5:1" },
      "danger": { "value": "#EF4444", "contrast": "4.0:1" },
      "surface": { "value": "#FFFFFF", "contrast": "21:1" },
      "onSurface": { "value": "#111827", "contrast": "21:1" }
    },
    "spacing": {
      "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px", "xl": "32px"
    },
    "type": {
      "fontFamily": { "value": "Inter, system-ui, sans-serif" },
      "fontSize": {
        "xs": "12px", "sm": "14px", "base": "16px", "lg": "18px", "xl": "20px"
      },
      "lineHeight": { "tight": "1.25", "normal": "1.5", "loose": "1.75" }
    },
    "radius": {
      "sm": "4px", "md": "8px", "lg": "16px", "full": "9999px"
    },
    "shadow": {
      "sm": "0 1px 2px rgba(0,0,0,0.05)",
      "md": "0 4px 6px rgba(0,0,0,0.1)",
      "lg": "0 10px 15px rgba(0,0,0,0.1)"
    },
    "motion": {
      "duration": { "fast": "150ms", "normal": "250ms", "slow": "400ms" },
      "easing": { "standard": "cubic-bezier(0.4, 0, 0.2, 1)" }
    }
  },
  "contrastGuarantees": {
    "primaryOnSurface": "AA",
    "dangerOnSurface": "AA"
  }
}
```

### CI generation

```typescript
// scripts/generate-bindings.ts
// Input: tokens.json
// Outputs:
//   dist/tokens.css          (CSS custom properties)
//   dist/tokens.ts           (TypeScript enums and const objects)
//   dist/tokens.d.ts         (type declarations)
```

```bash
# In CI (GitHub Actions):
pnpm generate:design-tokens  # runs after tokens.json changes
git diff dist/               # fail if auto-generated files not committed
```

### PreferenceSet model

```typescript
interface PreferenceSet {
  theme: "light" | "dark" | "system";
  contrast: "standard" | "high";
  fontSize: "sm" | "base" | "lg";
  motion: "full" | "reduced" | "none";
  density: "compact" | "normal" | "relaxed";
}

function mergePreferences(
  defaults: PreferenceSet,
  user: Partial<PreferenceSet>
): PreferenceSet {
  // Spreading user over defaults gives deterministic override
  return { ...defaults, ...user };
}
```

### Token consumption

```tsx
// In React components:
import tokens from "@entifs/design-tokens";

const Button = styled.button`
  background: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--motion-duration-normal);
`;
```

### Accessibility guarantees

- Every token with a `contrast` property is validated against WCAG 2.1 AA minimums
- CI fails if any token combination in use produces a contrast ratio below 4.5:1 for normal text
- "High contrast" PreferenceSet variant doubles as accessibility compliance mode

## Dependencies

- None (can be established independently)

## Labels

`design-tokens`, `theming`, `preferences`, `cross-app`, `accessibility`, `implementation`

## Evidence

- `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md` — "Standardize design tokens in a cross-app tokens.json (colors, spacing, type scale)... PreferenceSet as pure data objects with merge rules... Accessibility contrast guarantees per token scale"

## Status

draft