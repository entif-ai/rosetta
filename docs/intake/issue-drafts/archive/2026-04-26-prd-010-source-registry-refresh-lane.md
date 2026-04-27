# Issue Draft: PRD-010 — Source Registry Refresh Lane: DataCite, Crossref, ORCID, ROR Live Fetch

## Metadata

| Field | Value |
|---|---|
| **Source document** | `docs/PRDs/20260426 - Entif and Rosetta PRD.md` |
| **Extracted by** | DI-009 subagent |
| **Findings basis** | F-14, F-15, F-21 |
| **Confidence** | HIGH |
| **Status** | draft |

## Problem Statement

The `source-registry` package ships curated source-system profiles and registry entries with trust class and priority tier, but the repo README is explicit: "it does **not** yet fetch from DataCite, Crossref, ORCID, ROR, OpenAlex, or repository registries, and that provenance receipts for registry refreshes do not exist yet."

The Entif and Rosetta PRD (2026-04-26) correctly identifies this as a gap that must become an explicit product milestone rather than an implicit "someday" wish. The source-registry refresh lane is a defined future acquisition lane with its own receipts, drift detection, and correction propagation requirements.

The phased approach is: first live-source adapters for GitHub and Google Drive (IC-05), then registry refresh for DataCite/Crossref/ORCID/ROR to support scholarly source identification and identity resolution.

## Evidence

- **F-15**: "The repo explicitly admits that it does **not** yet fetch from DataCite, Crossref, ORCID, ROR, OpenAlex, or repository registries, and that provenance receipts for registry refreshes do not exist yet." — `turn24file0`
- **F-14**: "The `source-substrate` package... should be treated as one of the constitutional pillars of Entif, not as an optional later enhancement." — `turn9file16`, `turn18file0`
- **F-21**: "Every supported source family — Google Drive docs, GitHub repositories, scholarly repositories, blogs, news sites, email systems, discussion threads, internal wikis, future APIs — shall have a source-system profile" — `turn9file16`, `turn24file0`
- IC-05 (Live-Source Adapter) already designated GitHub + Google Drive as first adapters; DataCite/Crossref/ORCID/ROR are explicitly the next expansion ring — `turn15file0`, `turn17file0`, `turn24file0`

## Requirements

1. **Registry adapter interface**: Each registry (DataCite, Crossref, ORCID, ROR, OpenAlex) gets an adapter implementing: `fetchEntity(id)`, `searchEntities(query)`, `resolveIdentifier(identifier)`, `getProfile()`, `refreshProfile(entityId)`. Each adapter emits `registry.fetch` and `registry.refresh` receipts.
2. **DataCite adapter**: Fetches DOI metadata, dataset records, creator information, license information. Resolves DOI to DataCite XML/JSON. Maps to `source-substrate` layers.
3. **Crossref adapter**: Fetches scholarly article metadata, peer-review information, publication venues, funding information. Resolves DOI to Crossref JSON.
4. **ORCID adapter**: Fetches researcher identity records, employment history, works, funding. Supports name disambiguation and identity resolution.
5. **ROR adapter**: Fetches research institution records, parent/child relationships, geographic information. Supports institutional affiliation resolution.
6. **Drift detection**: When a registry record changes (e.g., DOI redirected, author affiliation updated, retraction issued), the adapter must detect drift and emit a correction event into the source-substrate correction chain rather than silently overwriting.
7. **Refresh receipts**: Every registry fetch emits a `registry.fetch` receipt. Every refresh emits a `registry.refresh` receipt with before/after state references.
8. **Identity resolution**: When a source record references an ORCID or ROR, the adapter must fetch and cache the resolved identity as a linked evidence-producing operation.
9. **Trust class assignment**: Registry adapters automatically assign trust class based on registry authority (DataCite/Crossref high, anonymous registries lower). Trust class is a `fixture` source in the current phase — evidence-derived trust comes later (IC-07).

## Registry Adapter Interface

```ts
interface RegistryAdapter {
  readonly registryType: "datacite" | "crossref" | "orcid" | "ror" | "openalex";
  readonly baseUrl: string;

  fetchEntity(entityId: string): Promise<RegistryEntity>;
  searchEntities(query: string): Promise<RegistryEntity[]>;
  resolveIdentifier(identifier: Identifier): Promise<RegistryEntity | null>;
  getProfile(): Promise<SourceSystemProfile>;
  refreshProfile(entityId: string): Promise<RefreshResult>;
  healthCheck(): Promise<boolean>;
}

interface RefreshResult {
  entityId: string;
  changed: boolean;
  previousState?: RegistryEntity;
  currentState: RegistryEntity;
  driftEvents: DriftEvent[];
  receiptCid: CID;
}
```

## Acceptance Criteria

- [ ] DataCite adapter can fetch DOI metadata and emit `registry.fetch` receipts
- [ ] Crossref adapter can fetch article metadata and emit `registry.fetch` receipts
- [ ] ORCID adapter can resolve researcher identity and emit identity resolution receipts
- [ ] ROR adapter can resolve institution identity and emit identity resolution receipts
- [ ] Drift detection correctly identifies when a registry record has changed and emits correction events
- [ ] Refresh receipts are verifiable via `rosetta-receipts` package
- [ ] Source-system profiles for all five registries registered in `source-registry`
- [ ] Identity resolution results stored as evidence-producing work with correct `evidenceType`

## Relationship to Other Issues

- Depends on IC-05 (Live-Source Adapter) for the adapter interface pattern
- Feeds into IC-07 (Trust Scoring staged implementation) — registry trust class is the bootstrap trust input
- Feeds into IC-03 (Durable Canonical Cache) because registry metadata is stored as canonical artifacts
- Future expansion: openalex adapter as a sixth registry family
- Part of Phase 3 Memory Plane Expansion or Phase 2 continuation (F-45, F-46)

## Recommended Labels

`source-registry`, `registry-adapter`, `datacite`, `crossref`, `orcid`, `ror`, `identity-resolution`, `phase-3`