# MSR-001: MuninnDB vs PostgreSQL memory strategy — clarify canonical substrate

## Issue Type
architecture

## Summary
This doc recommends MuninnDB as primary memory substrate; NOT LAME PRD specifies PostgreSQL/pgvector as canonical. Need to resolve whether Muninn is retained as activation layer with PG canonical, or replaced entirely.

## Evidence
- 20260401 - Chat GPT - Memory Stack Recommendations (Response section 1): MuninnDB recommended as primary memory, local-first, Hebbian scoring, REST/gRPC/MCP endpoints, BSL 1.1 license
- NOT LAME PRD: PostgreSQL/pgvector as canonical registry; SQLite only as local shadow
- This document predates NOT LAME PRD; represents earlier strategic thinking

## Key Questions
- Is MuninnDB intended as the activation/salience layer (Plane 3) with PostgreSQL as canonical (Plane 1)?
- Or is the recommendation to replace MuninnDB entirely with PostgreSQL-native memory?
- BSL 1.1 license compatibility with commercial deployment?

## Labels
memory-plane, architecture

## Depends On
(None at extraction level)
