# IDI-008: Anthropic Workspace Isolation Change (Feb 2026) — Rosetta Docs May Be Stale

## Metadata

- **Type**: documentation
- **Status**: draft
- **Source doc**: `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- **Evidence**: "Anthropic's docs now say that, starting February 5, 2026, prompt caching uses workspace-level isolation instead of organization-level isolation. Caches are isolated per workspace."
- **Confidence**: high

## Problem

Anthropic changed its caching isolation boundary from "organization-level" to "workspace-level" effective February 5, 2026. Any Rosetta or Entif documentation that references Anthropic caching behavior prior to this date may now be incorrect.

Specifically:
- Pre-Feb 2026: caches shared within one Anthropic organization across all workspaces
- Post-Feb 2026: caches isolated per workspace; cross-workspace cache sharing is NOT possible

For multi-tenant enterprise deployments, this means:
- A single Anthropic org cannot share cache across different business units (they would need separate workspaces)
- The recommendation to use "one Claude workspace per cooperating agent cluster" is now more important

## Required Action

- Audit all Rosetta and Entif documents for Anthropic caching assumptions pre-dating Feb 2026
- Update the adapter certification harness to reflect workspace-level isolation
- Update any diagrams or prose that describe Anthropic org-level cache sharing
- Flag in NOT LAME or Entif architecture docs: Anthropic workspace isolation requires separate workspace per tenant in multi-tenant scenarios

## TODO

- [ ] Search all docs for "Anthropic" + "org-level" or "organization-level" caching references
- [ ] Update Anthropic adapter docs with Feb 2026 workspace isolation change
- [ ] Add workspace-per-tenant requirement to multi-tenant deployment checklist
- [ ] Verify adapter certification harness reflects correct isolation boundary
