# Define Datamuse rate limits and cache policy for OMC lexical expansion

Issue draft id: `omc-datamuse-rate-limits-and-cache`
Priority: `P3`
Effort: `S`
Labels: `omc`, `datamuse`, `rate-limits`, `caching`

## Problem

The OMC research spec designates Datamuse for deterministic lexical expansion, but the extraction found no rate-limit, retry, offline-cache, or provenance policy.

## Scope

Create an operational baseline for any Datamuse-backed deterministic lexical stage.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-24-ontological-mixture-of-concepts-research-spec.md` - Issue Candidates row for Datamuse rate limits and caching.
- Source spec section cited there: Section 3.3 designates Datamuse for deterministic-first stages.

## Specific Findings

### Finding 1: External API behavior can destabilize deterministic stages

Without cache and retry rules, lexical expansion may vary by network state or external availability.

## Acceptance Criteria

- [ ] Define when Datamuse calls are allowed versus fixture/cache-only operation.
- [ ] Define cache key, TTL, and provenance fields.
- [ ] Define retry and rate-limit handling.
- [ ] Add an offline fallback expectation for tests and low-cost agent runs.
