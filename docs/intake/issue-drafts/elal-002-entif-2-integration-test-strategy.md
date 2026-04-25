# elal-002: Entif 2.0 — Integration Test Strategy

## Metadata

- **Type**: issue-candidate
- **Extraction**: `docs/backlog/Entif 2.0 - Comprehensive Action Plans.md`
- **Confidence**: high
- **Finding type**: issue-candidate / gap

## Summary

No integration test strategy is defined across the 15 Forge modules. Each Forge is specified with unit-level testing in its implementation plan, but the cross-Forge interaction testing (E2E flows like "voice command → Ada → Sony → Browser Agent → receipt") has no defined approach, test environment, or success criteria.

## Problem

With 15 Forges, multiple cross-cutting concerns (MCP boundaries, receipts, AuthForge PEP, FileForge CAS, ArchiveForge manifests), and parallel workstreams, a naive "test each Forge in isolation" approach will miss integration failures. The document defines truth fences per Forge but no cross-Forge verification strategy.

## What's Needed

1. **Integration test scope definition**: Which cross-Forge flows are E2E (real execution) vs. contract (mocked)?
2. **Test environment**: How to spin up all 15 Forges for integration testing? Docker Compose? Nx + remote cache + remote execution?
3. **Cross-Forge receipt chain verification**: How to verify that a full voice command → task completion → receipt chain is complete and consistent?
4. **AuthForge multi-tenancy test data**: How to set up test tenants/orgs/projects for integration testing without leaking real credentials?
5. **SocialForge platform adapter mocking**: How to test SocialForge adapters without making real API calls to YouTube/LinkedIn/etc.?
6. **LyricsForge audio fixture strategy**: What audio files to use for alignment testing? How to generate reference alignments for CI?
7. **CI gate for integration tests**: Should integration tests run on every PR? Nightly? What is the failure policy?
8. **VizForge dashboard testing**: How to verify truth fences on generated charts in CI?

## Recommendation

Create a dedicated `docs/RFCs/Integration-Test-Strategy.md` that defines:

- The three-tier test model (unit, integration, E2E) aligned with the Berman PRD's 3-tier model
- Docker Compose setup for local integration test environment
- Contract test approach for social platform adapters (Pact or similar)
- Receipt chain verification utility
- Fixture strategy for audio and video test data
- Integration test CI gate (pass/fail criteria)

## Evidence

From source document:
- Workstream 1 D5 (Browser Agent): "Its result is logged to receipts with actor 'browser' and verdict pass/fail" — requires integration to verify receipt chain
- SocialForge M1 adapter implementations call real platform APIs — no mocking strategy described
- LyricsForge M4: alignment runs without actual audio fixture defined
- All Forge implementations specify "run tests" but no cross-Forge integration test plan exists

## Labels

- testing
- integration
- entropy-2
- priority

## Status

open
