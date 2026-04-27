# Issue Draft: Implement SME Prompt-Out Requirement Before Commitment Finalization

**Draft date:** 2026-04-25
**Source doc:** docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md
**Extraction:** docs/intake/docs-intelligence/2026-04-25-consensus-first-commitment-scoping-framework.md

---

## Problem Statement

The framework requires that the agent must prompt for missing SME (Subject Matter Expert) knowledge before finalizing any commitment recommendation. This is an automation-bias control: it prevents humans from over-trusting the agent's momentum and assuming the synthesis is complete when it is not. No equivalent workflow step exists in Rosetta's agentic orchestration.

## Evidence

From the source PRD:

> "The agent must prompt for missing SME knowledge before finalizing any commitment recommendation (automation bias control: do not let humans over-trust the agent's momentum)."

> "This framework forbids 'spec by fluent synthesis'... The agent must express confidence bounded by evidence quality."

## The Problem Being Addressed

Automation bias: humans over-trust automated outputs, under-check for contradictions or missing context. When an agent synthesizes a recommendation that sounds fluent and confident, humans are prone to accepting it without probing whether the agent has all relevant SME knowledge. This is especially dangerous in high-uncertainty, high-commitment contexts.

## Implementation Requirements

1. Agent must explicitly prompt for SME input when evidence for a commitment recommendation is incomplete
2. The prompt should identify specifically what SME knowledge is missing
3. The workflow must not advance without either: (a) SME input provided, or (b) explicit "accept risk without SME input" acknowledgment
4. The SME prompt-out should be recorded in the artifact as a named gap with disposition

## Questions to Resolve Before Implementation

1. How does the agent detect that SME knowledge is missing vs. just choosing not to surface it?
2. Is there a threshold of evidence completeness that triggers the SME prompt-out?
3. Who is the SME — a specific named individual, a role, a pool?
4. What is the format for the "explicit accept risk without SME input" acknowledgment?
5. Does the SME prompt-out apply to all commitment finalizations or only those above a certain threshold?

## Labels

governance, ai-safeguards, automation-bias

## Status

draft
