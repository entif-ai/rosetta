# ESA-006: Rosetta agent interface MCP compliance

**Type:** docs-intelligence  
**Draft or Existing Issue:** draft  
**Labels:** rosetta, mcp, agent-interface  
**Depends On:** —  
**Evidence:** `docs/chats/20260226 - Chat GPT - Entif.AI Systems Architecture Synthesis.md`

## Summary

MCP (Model Context Protocol) is converging to a neutral open standard under Linux Foundation governance (Anthropic donated project December 2025). Rosetta's agent interface layer should target MCP compliance to benefit from ecosystem convergence and avoid bespoke tool contract governance.

## Evidence

- Anthropic donated MCP to Linux Foundation December 2025; now "open, neutral, community-driven"
- Microsoft adding native MCP support to Windows (May 2025): "USB-C of AI apps"
- Amazon fighting Perplexity's Comet browser agent to preserve curated purchase flow (competitive dynamic validates MCP as industry standard direction)
- MCP convergence reduces custom tool contract maintenance burden

## Rosetta Agent Interface Requirements (from synthesis)

- Agent registry / org chart as resourcing model
- Tool surface capability-registered and deny-by-default (MCP-style contract discipline)
- Guard layer + admission control for privileged actions
- Genesis protocol / authority hierarchy

## Recommended Action

1. Target MCP compliance for Rosetta agent interface layer
2. Align tool contract registration with MCP discovery patterns
3. Use MCP as interoperability anchor for cross-platform agent communication
4. Monitor MCP governance evolution (Linux Foundation) for participation opportunities

## Status

Open.
