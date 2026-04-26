# EML-006: Rosetta Module Map for Content-Risk Pipelines with Pack Family Structure

**Status:** issue-candidate
**Priority:** HIGH
**Type:** architecture/rosetta
**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md` — EML-F006

---

## Problem Statement

The source document provides a complete Rosetta module map and pack family structure for content-risk pipelines. This should be adopted as the basis for implementation planning.

## Pack Family Structure

| Family | Purpose | Suggested Packs |
|--------|---------|-----------------|
| `rrp.*` | Receipts, bundles, provenance-pathing, verifier semantics | `rrp.core`, `rrp.receipts`, `rrp.bundles`, `rrp.verifier`, `rrp.audit` |
| `truthlint.*` | Claim extraction, assumption surfacing, source/evidence scoring | `truthlint.claims`, `truthlint.assumptions`, `truthlint.sources` |
| `risk.*` | Content-risk, SE-risk, anomaly, provenance-risk, model-suitability | `risk.content`, `risk.social_engineering`, `risk.small_model_suitability`, `risk.routing` |
| `ingress.*` | Channel adapters (email, repo markdown, forum, web, docs, attachment) | `ingress.mail`, `ingress.repo_markdown`, `ingress.forum`, `ingress.web` |
| `identity.*` | Personhood provenance, correlation, simulation-risk, person-model governance | `identity.classification`, `identity.correlation`, `identity.simulation` |
| `interop.*` | Projections to external standards | `interop.prov`, `interop.bpmn`, `interop.dmn` |
| `gov.*` | Policy profiles, review workflows, retention/export controls | `gov.routing`, `gov.approvals`, `gov.identity` |

## Core Principle

> "No module is allowed to mutate truth in place. All modules may only append new observations, interpretations, evaluations, policies, receipts, or projections, all content-addressed and provenance-linked."

## Receipt Family Naming Convention

Format: `rrp:<domain>.<action>`

Examples: `rrp:risk.scoring`, `rrp:identity.correlation`, `rrp:bundle.closure`

## Recommended Action

- Adopt this pack family structure as the implementation scaffolding for content-risk pipelines in Rosetta
- Implement `rrp.core` and `risk.content` first, then build outward
- Enforce the immutability principle: no module mutates truth in place
