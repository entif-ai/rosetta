# SEM-009: Code Atlas Registry — GraphQL Schema + SQLite Migration

## Type

`implementation`

## Summary

Stand up the Code Atlas artifact registry: a GraphQL service backed by SQLite (WAL mode) with a parallel vector index. Artifact upsert, relation management, search (graph + vector hybrid), and context neighbor traversal.

## Problem

Without a central registry of artifacts, code reuse is ad hoc — engineers don't know what's been built, LLMs can't retrieve relevant contracts, and duplicate work proliferates. A formal registry with graph + vector search enables deterministic reuse.

## Proposed Approach

### GraphQL schema

See `schema.graphql` in the proposed starter bundle (full SDL in source document).

Key types:
```graphql
type Artifact {
  id: ID!           # entif://... stable across repos
  kind: ArtifactKind!  # FUNCTION | COMPONENT | FEATURE | VIEW | SCHEMA | TEST
  path: String!
  version: Semver!
  status: Status!   # DRAFT | READY | PROD
  inputs: [String!]!
  outputs: [String!]!
  effects: [String!]!
  provides: [String!]!
  tags: [String!]!
  fm: JSON!
  createdAt: String!
  updatedAt: String!
  dependsOn: [Artifact!]!
  relations: [Relation!]!
}

type Relation {
  from: Artifact!
  to: Artifact!
  kind: RelKind!  # DEPENDS_ON | IMPLEMENTS | SUPERSEDES | VARIANT_OF | EMITS | CONSUMES
}

type Query {
  artifact(id: ID!): Artifact
  artifacts(kind: ArtifactKind, tag: String): [Artifact!]!
  search(q: String!, limit: Int = 20): [SearchHit!]!
  neighbors(id: ID!, kind: RelKind, depth: Int = 1): [Artifact!]!
}
```

### SQLite migration

See `migrations/001_init.sql` in the proposed starter bundle. Uses WAL mode, foreign keys, and indexes on kind/status/to_id/kind. Includes trigger for `updated_at` auto-set on row update.

### Vector index

- Embedding model: `text-embedding-3-small` or equivalent
- Embed from: FM content + artifact signature + test names
- Storage: `artifact_embeddings` table with BLOB column
- Sync: upsert to vector store (Pinecone / Qdrant / local) after graph upsert

### Deployment options

- **Lightweight**: SQLite + LiteFS for portability (single tenant)
- **Scale**: Postgres + pgvector if multi-tenant or higher concurrency needed

### Relationship to DI-009

This overlaps significantly with DI-009 (Internal knowledge graph — cross-doc concept linking, upgrade to Graphiti). The Code Atlas is a specific thin slice for code artifact indexing; the knowledge graph in DI-009 is broader (cross-document concept linking across the entire corpus). These may need to be unified or clearly delineated. This should be resolved before building.

## Dependencies

- DI-009 resolution (to clarify overlap/scope boundary)

## Labels

`code-atlas`, `graphql`, `sqlite`, `artifact-registry`, `implementation`

## Evidence

- `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md` — Full GraphQL SDL and SQLite migration in the code bundle; "GraphQL API for deterministic joins and a /search endpoint that merges vector hits with graph constraints"

## Status

draft