# AM-010: Rosetta Architecture Alignment — Agentic Messaging vs NOT LAME PRD vs Text-Core MVP

## Status

draft — `docs/intake/issue-drafts/am-010-rosetta-integration-alignment.md`

## Metadata

- **Type:** architecture
- **Priority:** P2
- **Source doc:** `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md`
- **Section:** Section 0-12 (full document)
- **Confidence:** medium

## Problem

The Agentic Messaging spec (dated 2026-02-28 by filename) predates the NOT LAME PRD, Text-Core MVP scope gate, Consensus-First Commitment Scoping Framework, and three-rung build staircase by approximately two months. It was likely authored in a parallel design cycle.

The spec references Rosetta objects and concepts:
- `rosetta.receipt`, `rosetta.incident`, `rosetta.tile`, `rosetta.tapestry`
- `iam.decision` (from Guard)
- "Canonical Rosetta objects" as the integrity anchor

But it does not reference:
- The three-rung build staircase (Bootstrap → Text-Core MVP → Alpha RC)
- Text-Core MVP scope gate (TC-001 through TC-007)
- NOT LAME PRD sovereign kernel, write-admission gate, memory planes
- The Consensus-First framework for decision-making
- The authority chain (bootstrap document as root of trust)
- The receipt-law (receipts-first)

This creates an integration risk: the Agentic Messaging spec may be incompatible with the current Rosetta architecture in ways that are not yet surfaced. It needs a formal alignment review before it can be adopted into the sprint queue.

## Evidence

> Filename: `20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md` — ~2 months before NOT LAME PRD

> No cross-references to TC-001–TC-007, write-admission gate, memory planes, authority chain, or receipt-law in the document

> Section 8.2 references "Rosetta tiles/tapestries" but Text-Core MVP scope gate defines `tapestry` differently (as a bounded compiled package of receipts in the context of text ingestion)

## Required Deliverables

1. **Alignment review:** Compare Agentic Messaging spec against current Rosetta governing documents (NOT LAME PRD, Text-Core MVP scope gate, Consensus-First framework, authority stack)
2. **Conflict log:** Document any architectural conflicts or incompatibilities found
3. **Integration point mapping:** Where does Agentic Messaging fit in the three-rung staircase? Which rung is it part of?
4. **Concept reconciliation:** Does the spec's use of "tapestry", "tile", "receipt" align with existing definitions? If not, flag for harmonization.
5. **Adoption gate:** Require the alignment review to be complete before this spec enters the sprint queue
6. **Update references:** After alignment, update Section 0 (or add an integration section) to reference the relevant governing documents

## Acceptance Criteria

- [ ] Alignment review completed by architect
- [ ] All conflicts documented with resolution proposals
- [ ] Spec references current governing documents (NOT LAME, Text-Core, Consensus-First, Authority Stack)
- [ ] Integration point in three-rung staircase identified
- [ ] Concept definitions (tapestry, tile, receipt) reconciled with existing Rosetta definitions
- [ ] Adoption gate cleared before sprint assignment

## Dependencies

- AM-001, AM-002 (schema definitions need to be consistent with existing Rosetta definitions)
- NOT LAME PRD, Text-Core MVP scope gate, Consensus-First framework (must be read for alignment)

## Labels

`agentic-messaging`, `rosetta`, `governance`

## References

- Source: `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md`
- Related: NOT LAME PRD, Text-Core MVP scope gate, Consensus-First Commitment Scoping Framework, Authority Stack
