# Issue Draft — PRD-REV-011: Define three RRP conformance tiers (RRP-Light, RRP-Full, RRP-Auditor)

## Title

PRD-REV-011: Define three RRP conformance tiers (RRP-Light, RRP-Full, RRP-Auditor)

## Type

architecture

## Labels

rrp-conformance, conformance-tiers

## Depends On

PRD-REV-006

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`

> "Conformance tiers: RRP-Light, RRP-Full, RRP-Auditor"

These three tiers are proposed in the ROCK-3111-C draft but not defined in detail.

## Description

The ROCK-3111-C draft introduces three RRP conformance tiers but their specific requirements are not elaborated. A proper definition is needed:

- **RRP-Light**: Minimal RRP compliance — receipts with basic CID, minimal required fields. For experimental or lightweight integrations.
- **RRP-Full**: Complete RRP compliance — all required schemas, SHACL shapes, test vectors passing positive + tamper-negative. For production systems.
- **RRP-Auditor**: Maximum rigor — Full compliance plus auditor-accessible audit trail, third-party verifiable signatures, complete provenance chain. For regulated or high-stakes contexts.

The conformance tier should be declared in `pack.json` via the `conformance_tiers[]` field.

## Proposed Action

- Define specific requirements for each tier in ROCK-3111-C
- Clarify which tier is required for Rosetta Bootstrap / Text-Core MVP
- Determine if RRP-Light is sufficient for alpha
- Add conformance tier checking to the pack certification flow
- Document the upgrade path between tiers
