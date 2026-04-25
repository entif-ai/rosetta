# Issue Draft: Assess SwarmKit Relevance for Entif Engineering

**Source:** `docs/external/SwarmKit.md`
**Extracted:** 2026-04-25
**Type:** issue-candidate
**Draft file:** `docs/intake/issue-drafts/swarmkit-relevance-assessment.md`

---

## Context

The SwarmKit README describes a distributed orchestration toolkit that underpinned Docker Swarm mode. The document appears to be historical — no visible date, version, or release notes. SwarmKit as a standalone project appears dormant. Docker Swarm mode itself has been largely superseded by Kubernetes in enterprise production.

## Problem Statement

Before any team considers SwarmKit as an architectural reference or dependency, we need to confirm:
1. Is the project still actively maintained?
2. Is it relevant as a historical reference only?
3. Does any Entif engineering track need to account for it?

## Proposed Action

- Verify GitHub activity on `moby/swarmkit` (last commit date, issue activity, PR merge rate)
- Determine if this document is a candidate for archival rather than active ingestion
- Decide whether design patterns from SwarmKit should influence Entif architecture or be retained as historical context only

## Priority

Low — background research, not blocking active development.

## Labels

`research`, `architecture`, `relevance`, `swarmkit`

## Depends On

None