# Three-Store Autobiographical Memory Architecture

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** memory-architecture, memory-layers, vitaevevec
**Depends on:** none

## Problem Statement

The extraction identifies "Fast → working memory; Mid → episodic; Slow → identity, biography, legal/trust anchors" as the three-store model, but no formal design doc, schema, or consolidation rule specification exists. Each tier has "consolidation rules" and "EntAffirm verification" mentioned but not elaborated.

## Specific Findings from Extraction

- **F-3STORE-001** (confidence: high): Fast/mid/slow memory store tiers described in prose only; no formal data model, no schema
- **F-3STORE-002** (confidence: high): "Consolidation rules" are forward references; no specification of what triggers consolidation, what invariants must hold, or what happens on failure
- **F-3STORE-003** (confidence: high): "EntAffirm verification before commits" is a named gate but no interface, pass criteria, or fallback behavior defined
- **F-3STORE-004** (confidence: medium): VitaeVec is referenced as the slow-tier encoding but no model/cardinality/embedding strategy specified
- **F-3STORE-005** (confidence: medium): No definition of what "working memory" is in Entif's architecture (is it a scratchpad, a context window allocation, a separate store?)

## Action Required

1. Design the three-store data model with schema for each tier
2. Specify consolidation triggers, invariants, and rollback/failure behavior
3. Define EntAffirm verification gate interface and pass criteria
4. Specify VitaeVec encoding strategy for slow-tier identity/biography data
5. Clarify what "working memory" is in Entif's architecture
