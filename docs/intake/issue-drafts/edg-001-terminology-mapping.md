# Issue Draft: EDG-001 — Terminology Mapping: Entif 2.0 Governance → Rosetta Native Vocabulary

## Metadata

| Field | Value |
|---|---|
| Issue ID | EDG-001 |
| Type | documentation |
| Status | draft |
| Source doc | docs/governance/Entif 2.0 - Decentralization and Governance.md |
| Extraction date | 2026-05-26 |
| Confidence | high |

## Problem

The "Entif 2.0 - Decentralization & Governance" document (2025-era) uses terminology that is not aligned with Rosetta's current vocabulary:

| Entif 2.0 Governance Doc term | Rosetta/Entif current term |
|---|---|
| Majordomo | sovereign kernel / orchestrator |
| Genesis Protocol | Doctrine v0.2 / constitutional artifact |
| Genesis keypair | (no equivalent in current stack — aspirational) |
| Blockchain ledger | PostgreSQL canonical registry (NOT LAME) |
| Guard Layer | write-admission-gate (NOT LAME) / guard service |
| Majordomo's "brain" | context compiler / query router |
| Emergency halt | sovereign-kernel kill-switch (undefined) |

This creates implementation confusion and risks incorrect system mapping.

## Evidence

- Throughout "Entif 2.0 - Decentralization and Governance.md"
- Section 1: "intermediates all operations initiated by the Entif Majordomo"
- Section 3: "Genesis Protocol is essentially Entif's inviolable constitution"
- Section 4: "permissioned blockchain ledger for logging and governance transactions"
- NOT LAME PRD: "PostgreSQL as canonical registry; SQLite only as local shadow"

## Impact

- Implementers may incorrectly try to implement "Majordomo" as a separate component from sovereign-kernel
- "Genesis Protocol" references may be misread as applying to the current constitutional stack (Doctrine v0.2 is the current authority, not Genesis Protocol)
- Blockchain audit trail may be pursued in error when NOT LAME specifies PostgreSQL

## Recommended Action

Create a `docs/governance/ENTIF_2_0_TO_ROSETTA_TERMINOLOGY_MAPPING.md` that:
1. Maps each Entif 2.0 governance term to current Rosetta/Entif equivalent
2. Notes which terms are aspirational (no current implementation) vs. current (implemented or specced)
3. Notes which terms are deprecated/obsolete (replaced by current Rosetta vocabulary)

## Labels

governance, terminology, documentation, entif-2-0, mapping

## Depends On

(None — can proceed immediately)

## Related Issues

- EDG-002 (blockchain vs PostgreSQL conflict)
- EDG-003 (Guard Layer vs write-admission-gate alignment)
- NOT LAME PRD ratification