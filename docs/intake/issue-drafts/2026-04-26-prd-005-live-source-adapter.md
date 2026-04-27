# Issue Draft: PRD-005 — Live-Source Adapter: GitHub + Google Drive Behind Refinery Boundary

## Metadata

| Field | Value |
|---|---|
| **Source document** | `docs/PRDs/20260426 - Entif and Rosetta PRD.md` |
| **Extracted by** | DI-009 subagent |
| **Findings basis** | F-16, F-45 |
| **Confidence** | HIGH |
| **Status** | draft |

## Problem Statement

The `ingress-refinery` package is currently fixture-backed — it demonstrates the contract surface (parse-only ingress jobs, normalization, fetch/normalization/evaluation receipts, canonical artifacts with PID/rights/dedupe metadata) but does not actually fetch from live upstream sources. The bootstrap execution track explicitly says live acquisition adapters should be added behind the refinery boundary only after pack/schema hardening is complete and the canonical cache is durable.

The Entif and Rosetta PRD (2026-04-26) designates GitHub metadata/files and Google Drive documents as the likely first live-source families, given their proximity to Crates's active workflow scope. DataCite/Crossref/ORCID/ROR registry fetching is a future expansion lane.

## Evidence

- **F-16**: "`ingress-refinery` turns source-aware inputs into canonical artifacts plus linked provenance receipts. It currently creates parse-only ingress jobs, normalizes supplied text, generates fetch/normalization/evaluation receipts, builds canonical artifacts with PID, rights, and dedupe metadata, and emits a bootstrap demo snapshot. It is still fixture-backed and does not yet fetch live upstream sources." — `turn17file0`
- **F-16**: "the PRD should insist that every new ingestion family plug in behind this boundary rather than inventing bespoke shadow pipelines" — `turn17file0`
- **F-45**: "Slice 4 = live-source adapter introduction behind the refinery boundary. Start with one or two high-value families that match your near-term workflow needs — likely GitHub metadata/files and Google Drive documents — then later branch outward into repository registries such as DataCite or Crossref. Acceptance means the same refinery contracts and receipts are used for live-acquired artifacts as for fixtures." — `turn15file0`, `turn17file0`, `turn24file0`
- Repo constraint: live-source ingestion blocked until canonical cache is active source of truth — `turn16file0`

## Requirements

1. **Adapter interface**: Every live-source adapter must implement the `SourceAdapter` interface with `fetch(recordId)`, `normalize(raw)`, `toCanonicalArtifact(cleaned)`, `generateReceipts()` methods
2. **GitHub adapter**: Fetches repo metadata, file trees, file contents, commit history via GitHub API. Maps to `source-substrate` layers: source-system profile (github.com), source records (repos, files), manifestations (raw bytes, normalized text, structured packages)
3. **Google Drive adapter**: Fetches document metadata, content via Google Drive API. Maps to source-system profile (drive.google.com), source records (files), manifestations (raw export, normalized text)
4. **Refinery boundary enforcement**: Adapters write to refinery contract, not directly to canonical cache. Refinery emits fetch receipt, normalize receipt, evaluation receipt. Only after refinery processing does artifact enter canonical cache.
5. **Receipt continuity**: Live-acquired artifacts produce the same receipt types as fixture artifacts — fetch, normalize, classify, dedupe decision, revision link, source-to-observation transform, promote
6. **Rights scope propagation**: GitHub/Drive adapters must capture and propagate rights scope from source system to manifestation to canonical artifact
7. **Dedup verification**: Live-source adapters must produce byte identity and manifestation identity that correctly trigger dedupe against existing cache entries
8. **Source registry entry**: Each adapter must register its source-system profile in `source-registry` with correct authority assumptions, lifecycle behavior, and refresh mechanics

## Adapter Interface Sketch

```ts
interface SourceAdapter {
  readonly sourceSystem: SourceSystemProfile;
  fetch(recordId: string): Promise<RawArtifact>;
  normalize(raw: RawArtifact): Promise<NormalizedArtifact>;
  toCanonicalArtifact(normalized: NormalizedArtifact): CanonicalArtifact;
  generateReceipts(operation: string): Receipt[];
  healthCheck(): Promise<boolean>;
}
```

## Acceptance Criteria

- [ ] `ingress-refinery` processes a live GitHub fetch and produces identical receipt structure as fixture-based fetch
- [ ] `ingress-refinery` processes a live Google Drive fetch and produces identical receipt structure as fixture-based fetch
- [ ] Refinery emit receipts are verifiable via `rosetta-receipts` package
- [ ] Byte identity dedupe correctly prevents duplicate storage of already-cached content from live sources
- [ ] Source-system profile for GitHub and Google Drive registered in `source-registry`
- [ ] Rights scope propagated from source to manifestation to canonical artifact
- [ ] Adapter interface documented and usable as template for future source families (DataCite, Crossref, etc.)

## Relationship to Other Issues

- IC-03 (Durable Canonical Cache) must be complete before live-source adapters can be used at scale
- Depends on IC-02 (TC-005 Promotion State) for promotion receipts from live-adapter sources
- Future: IC-10 (Source Registry Refresh Lane) will add DataCite/Crossref/ORCID/ROR as additional adapter families
- Part of Phase 2 Text-Core Completion (F-45)

## Recommended Labels

`ingress-refinery`, `adapter`, `github`, `google-drive`, `live-source`, `text-core`, `phase-2`