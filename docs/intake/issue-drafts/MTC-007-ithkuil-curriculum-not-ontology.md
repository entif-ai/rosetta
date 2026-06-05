# MTC-007: Ithkuil as Curriculum Engine, Not Sovereign Ontology — Architectural Boundary

## Issue Metadata

- **Type**: architecture/spec-gap
- **Status**: draft
- **Labels**: architecture, ithkuil, curriculum
- **Depends on**: MTC-001 (tokenizer identity constraint)
- **Evidence source**: `docs/chats/20260413 - Chat GPT - Model Training Cost and Design.md`

## Problem Statement

The source document establishes a critical architectural boundary: Ithkuil is a curriculum engine for ordering distinctions in the training curriculum, NOT the sovereign ontology. Rosetta owns identity, provenance, pack structure, uncertainty objects, and semantic auditability. Ithkuil provides the ordering of distinctions and the grammar-manual as the proto-promethean curriculum for embedding geometry initialization.

This is a significant architectural boundary that must be documented explicitly to prevent scope creep in either direction — neither over-adopting Ithkuil as the Rosetta ontology nor under-utilizing its grammar as a curriculum resource.

> "Ithkuil as a curriculum engine, not the sovereign ontology" — used to order distinctions in the training curriculum, not as the final semantic authority.

## Proposed Action

1. **Document the architectural boundary explicitly**: Ithkuil = curriculum ordering engine; Rosetta = identity/provenance/constitutional layer
2. **Use Ithkuil Grammar Manual** as the proto-promethean curriculum for embedder initialization (graph-based methods: node2vec or Laplacian eigenmaps)
3. **Define explicit limitations**: Ithkuil does NOT define Rosetta's concept ontology; it orders distinctions in the training signal
4. **Add a spec note** to prevent future confusion about Ithkuil's role in the architecture
5. **Investigate machine-readability of Ithkuil grammar manual** — needed for synthetic curriculum data generation

## Relevant Findings

- "Ithkuil as a curriculum engine, not the sovereign ontology"
- "Ithkuil gives you the ordering of distinctions. It is the curriculum spine."
- "Rosetta gives you identity, provenance, pack structure, uncertainty objects, and stable semantic auditability. It is the constitutional layer."
- Ithkuil Grammar Manual as proto-promethean curriculum for embedding geometry initialization
- Risk: "overfitting the curriculum to Ithkuil rather than using Ithkuil to order distinctions"

## Open Questions

- Is the Ithkuil Grammar Manual available in a machine-readable format suitable for curriculum data generation?
- Is there an existing cross-reference between Ithkuil categories and any Rosetta concept space?
- Does the current bootstrap have any explicit handling of Ithkuil that needs to be updated with this boundary?
