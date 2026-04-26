# CW-005: Maturity scoring system not defined

**Type:** issue-candidate  
**Confidence:** high  
**Source:** `docs/chats/20260225 - Chat GPT - Code Wiki integration.md` §2, §4

## Problem

The capability tile schema includes a maturity_level field (0-5), but there is no defined system for actually computing or assigning these scores. The conversation proposes three heuristic approaches but no implementation.

## Evidence

> "how production-ready each unit is: test coverage, recency, LOC/change churn, open bugs, 'used in live system vs. abandoned experiment.' Code Wiki doesn't talk about these."

Three proposed heuristics:
1. Structural richness (fan-in, interface clarity from CodeWiki diagrams)
2. Semantic fit (ask CodeWiki: "does X support feature Y?")
3. Pattern alignment (ask CodeWiki: "does this conform to StandardHttpService?")

## Required

1. Define maturity_level computation: automatic (from test coverage, git churn, etc.) or declared by human?
2. Define the 0-5 scale precisely: 0=stub, 1=PoC, 2=working fragile, 3=usable by me, 4=team-ready, 5=hardened/prod
3. Implement at least one automatic scorer using available signals (test coverage from CI, commit recency from git)
4. Wire maturity_level into search_capabilities filter

## Notes

- Depends on: CW-001 (CapabilityRegistry)
- Can be prototyped independently with manual scoring first
